---
title: React SSG 如何实现
description: SSG 被很多开源库所应用，比如 VitePress、Next.js、Docusaurus，本文记录下 SSG 的使用场景，以及实现原理。
pubDate: '2023-07-31'
heroImage: 'https://stg.heyfe.org/images/blog-react-isr-demo-1690810719572.png'
tags:
  - 渲染模式
  - React
---

上次写了一个 `SSR` 的 `DEMO`，今天写个小 `Demo` 来从头实现一下 `react` 的 `SSG`，来理解下 `SSG` 是如何实现的。

## 什么是 SSG

`SSG` 即 `Static Site Generation` 静态站点生成，是指将在构建时就提前生成静态 `HTML` 页面，速度很快，一般用于以下场景：

1. `SEO` （搜索引擎优化）：由于部分搜索引擎对 `CSR` 内容支持不佳，所以 `SSG` 可以提升网站在搜索引擎结果中的排名。
2. 静态站点：比如博客、`CMS` 系统输出站点等，由于内容以静态内容居多，都可以使用 `SSG`。

## 如何实现

简单的 `SSG` 和 `SSR` 实现原理差不多，只是时机不同： `SSR` 渲染 `HTML` 的过程在服务端，而 `SSG` 则在构建时。渲染同样是通过在 `Node` 端导入要渲染的组件，然后调用 `react-dom/server` 包中提供的 `renderToString` 方法将该组件的渲染内容输出为 `HTML` 保存。

### 系统设计

下面使用 `SSG` 实现一个简单的静态博客系统：

-   每篇博文都使用一个 `JSON` 文件来记录其中的信息（为了简化没有使用 `markdown`，可以理解为 `markdown` 博文信息已提前转换为 `JSON` 文件）
-   构建时会将博文编译为静态 `HTML` 文件，并生成一个博文列表的 `HTML` 文件
-   通过静态文件服务器启动即可展示博文

### 组件设计

可以看出我们只需要两个组件：

-   一个 `Post` 组件，用于接收博文信息展示博文
-   一个 `List` 组件，用于接受博文列表展示博文清单

简单的实现一下：

```tsx
import React from 'react';

export default ({
    data
}: {
    data: {
        title: string;
        content: { title: string; content: string }[];
    };
}) => {
    return (
        <div>
            <h1>{data.title}</h1>
            <div>
                {data.content.map(({ title, content }) => (
                    <article key={title}>
                        <h2>{title}</h2>
                        <p>{content}</p>
                    </article>
                ))}
            </div>
        </div>
    );
};
```

```tsx
import React from 'react';

export default ({ list }: { list: { title: string; key: string }[] }) => {
    return (
        <div>
            <ul>
                {list.map(({ title, key }) => (
                    <li key={title}>
                        <a href={`/posts/${key}.html`}>{title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
```

### 构建脚本

然后再来实现下构建脚本，首先构建脚本一样**需要支持 `JSX` 的解析**，然后构建脚本读取博文数据文件夹下的所有文件，将其依次解析为静态 `HTML`，并且再生成一份列表的 `HTML`。

代码也非常简单：

```tsx
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Post from './ui/Post';
import List from './ui/List';

// get all the files in posts
const posts = fs.readdirSync('posts');

// make sure the dir exists
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}
if (!fs.existsSync('dist/posts')) {
    fs.mkdirSync('dist/posts');
}

posts.map(post => {
    const postInfo = require('./posts/' + post);
    const fileName = `dist/posts/${post.replace('.json', '.html')}`;
    // make sure file exists
    fs.writeFileSync(fileName, `<div id="root">${renderToString(<Post data={postInfo} />)}</div>`);
});

fs.writeFileSync(
    'dist/index.html',
    `<div id="root">${renderToString(
        <List list={posts.map(post => ({ ...require('./posts/' + post), key: post.replace('.json', '') }))} />
    )}</div>`
);
```

首先通过 `readdirSync` 读取博文信息目录，这里只处理了单层，复杂点的需要递归处理下多层目录结构。然后将每篇博文通过 `renderToString` 渲染为静态 `HTML` 并写入文件。最后再输出列表对应的 `HTML` 文件即可。

通过该脚本可以通过以下的博文：

![picture 1](https://stg.heyfe.org/images/blog-ssg-react-demo-1687601729866.png)

生成以下 `HTML`：

![picture 2](https://stg.heyfe.org/images/blog-ssg-react-demo-1687601768232.png)

### 静态文件服务

`HTML` 生成后，只需要启动静态文件服务器，将静态 `HTML` 丢过去即可，可以使用 `nginx` 或者 `serve` 包。

![picture 3](https://stg.heyfe.org/images/blog-ssg-react-demo-1687601874435.png)

![picture 4](https://stg.heyfe.org/images/blog-ssg-react-demo-1687601883634.png)

### 更多细节

上面只是一个最简单的例子，要实现一个完整的系统还需要考虑以下几个方面：

-   样式支持 - 在渲染静态文件时添加上 `link` 引入即可。
-   `hydrate` - 本文并没有实现 `hydrate`，其实实现逻辑差不多，在静态文件渲染时嵌入脚本，然后脚本在客户端进行 `hydrate`，不过一般的 `SSG` 场景下动态的内容不多，所以如果没有交互可以忽略。

## 总结

`React` 中的 `SSG` 本质也是通过 `renderToString` 来实现，但是时机与 `SSR` 不同，是在构建时进行。

## 最后

本文的 `demo` 代码放置在 [React SSG Demo](https://github.com/ZxBing0066/playground-public/tree/master/react-ssg) 中，可自行取阅。