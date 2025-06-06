---
title: React ISR 如何实现
description: ISR 即 Incremental Static Regeneration，记录下 ISR 的使用场景，以及如何实现。
pubDate: '2023-07-31'
heroImage: 'https://stg.heyfe.org/images/blog-react-isr-demo-1690810719572.png'
tags:
  - 渲染模式
  - React
---

之前写了两个 `demo` 讲解了如何实现 `SSR` 和 `SSG`，今天再写个 `demo` 说在 `ISR` 如何实现。

## 什么是 ISR

`ISR` 即 `Incremental Static Regeneration` 增量静态再生，是指在 `SSG` 的前提下，可以在收到请求时判定页面是否需要刷新，如果需要则重新构建该页面，这样既拥有了静态页面的优势又可以避免页面长时间未更新导致信息过时。且由于在页面维度验证，所以每次可以只构建特定的页面。

`ISR` 一般适用于符合 `SSG` 场景，但是却对页面的时限性有一定要求时。

## 如何实现

简单的 `ISR` 实现也很简单，只需要在收到页面请求时按照更新策略判断是否需要需要重新生成页面，如果需要触发页面的构建更新。需要注意一般情况下生成页面不会影响页面的响应，而是后台去做构建。

现在就基于之前写的 `SSG demo`，做一下改造让其支持 `ISR`。

### 修改构建脚本

由于 `ISR` 构建会同时在构建脚本和服务器中触发，所以需要对之前的代码做一些小小的改动。

首先抽离出一个通用的构建函数（由于服务器会使用到尽量避免同步代码）：

```tsx
import fs from 'fs/promises';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Post from './ui/Post';
import List from './ui/List';

async function build(type: 'list'): Promise<void>;
async function build(type: 'post', name: string): Promise<void>;
async function build(type: 'list' | 'post', name?: string) {
    if (type === 'list') {
        const posts = await fs.readdir('posts');
        await fs.writeFile(
            'dist/index.html',
            `<div id="root">${renderToString(
                <List
                    list={posts.map(post => {
                        delete require.cache['posts/' + post];
                        return { ...require('./posts/' + post), key: post.replace('.json', '') };
                    })}
                />
            )}</div>`
        );
    } else {
        delete require.cache['posts/' + name];
        const postInfo = require('./posts/' + name);
        const fileName = `dist/posts/${name}.html`;
        await fs.writeFile(fileName, `<div id="root">${renderToString(<Post data={postInfo} />)}</div>`);
    }
}

export default build;
```

这样就可以通过 `build` 函数来构建指定的 `post` 或者 `list` 页面。

然后再将原先的构建脚本做一下简单的修改：

```ts
import fs from 'fs';
import build from './build-util';

// make sure the dir exists
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}
if (!fs.existsSync('dist/posts')) {
    fs.mkdirSync('dist/posts');
}

// get all the files in posts
const posts = fs.readdirSync('posts');

(async () => {
    for await (const post of posts) {
        await build('post', post.replace('.json', ''));
    }
    await build('list');
})();
```

### 服务器

由于 `ISR` 需要在请求时做是否构建的判定，所以原先的静态服务器方案无法继续使用，我们换成 `express` 来实现：

```typescript
import express from 'express';
import path from 'path';
import fs from 'fs';
import build from '../build-util';

const app = express();

const expiresTime = 1000 * 60 * 10;

app.use(function (req, res, next) {
    setTimeout(() => {
        const filename = req.path.indexOf('.html') >= 0 ? req.path : req.path + 'index.html';

        // get the file's create timestamps
        fs.stat(path.join('./dist', filename), function (err, stats) {
            if (err) {
                console.error(err);
                return;
            }
            if (Date.now() - +stats.mtime > expiresTime) {
                console.log(filename, 'files expired, rebuilding...');
                if (filename === '/index.html') {
                    build('list');
                } else {
                    build('post', path.basename(filename).replace('.html', ''));
                }
            }
        });
    });

    next();
});

app.use(express.static('dist'));

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
```

我们增加一个 `express` 的中间件，让其来判定文件是否过期，这里以十分钟为例，实际场景可按需定义过期判定。这里过期后就会调用 `build` 文件来重新构建该文件。要注意此处先返回再构建，所以用户不会等待构建，并且此次访问依旧是旧的内容，构建完成后访问的才是新的内容。

![picture 1](https://stg.heyfe.org/images/blog-isr-react-demo-1687878476704.png)

### 更多细节

-   注意给构建任务加锁，避免一个页面过期后多个请求同时触发多个同样的构建任务
-   给构建任务加队列，避免请求过多时同时出现过多的后台构建任务导致服务器资源问题
-   可以为每个文件制定特定的过期判定条件，比如 `post` 源文件的修改时间等等

## 总结

`ISR` 对比 `SSG` 可以有效的控制页面的时效性，但也要付出额外的代价：

-   需要额外的开发成本
-   需要额外的服务器资源投入
-   无法使用一般的静态文件服务器

没有最佳，只有最适合，所以实际场景下还是按需选用。

## 最后

本文的 `demo` 代码放置在 [React ISR Demo](https://github.com/ZxBing0066/playground-public/tree/master/react-isr) 中，可自行取阅。