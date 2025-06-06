---
title: React SSR 如何实现
description: SSR 即 Server Side Rendering，是被讨论最多的渲染模式，记录下 SSR 的使用场景，以及如何实现。
pubDate: '2023-07-31'
heroImage: 'https://stg.heyfe.org/images/blog-react-isr-demo-1690810719572.png'
tags:
  - 渲染模式
  - React
---

今天写个小 `Demo` 来从头实现一下 `react` 的 `SSR`，帮助理解 `SSR` 是如何实现的，有什么细节。

## 什么是 SSR

`SSR` 即 `Server Side Rendering` 服务端渲染，是指将网页内容在服务器端中生成并发送到浏览器的技术。相比于客户端渲染（`CSR`），`SSR` 一般用于以下场景：

1. `SEO` （搜索引擎优化）：由于部分搜索引擎对 `CSR` 内容支持不佳，所以 `SSR` 可以提升网站在搜索引擎结果中的排名。
2. 首屏加载速度：由于 `SSR` 可以在服务器端生成完整的 `HTML` 页面，用户打开网页时能够更快地看到内容，不会看到长时间的白屏，可以提升用户体验。
3. 隐藏某些数据：由于 `CSR` 需要从服务器将数据下载下来进行动态渲染，所以一些数据很容易被他人获取，而 `SSR` 由于数据到渲染的过程在服务端实现，所以可以用来隐藏一些不想让他人轻易获得的数据。

## 如何实现

简单的 `SSR` 其实实现很简单，只需要在服务端导入要渲染的组件，然后调用 `react-dom/server` 包中提供的 `renderToString` 方法将该组件的渲染内容输出为字符串后返回客户端即可。

### Server 端的组件

下面写一个简单的例子：

服务端代码：

```tsx
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../ui/App';

const app = express();

app.get('/', (_: unknown, res: express.Response) => {
    res.send(renderToString(<App />));
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
```

此处要注意**服务端需要支持 `jsx` 语法的解析**，我这里直接使用 `esno` 执行 `ts` 代码，在 `tsconfig.json` 中配置 `jsx` 即可。

其实看到这里就能明白为什么在 `SSR` 的页面上使用 `window`、`localstorage` 等浏览器 `API` 需要放到 `useEffect` 里了，因为**该页面的组件都会被 `server` 端读取解析，而 `server` 端并没有这些 `API`**。

然后看下 `App` 组件的代码：

```tsx
import React, { useCallback } from 'react';

export default () => {
    const log = useCallback(() => {
        console.log('Hello world');
    }, []);

    return (
        <div>
            <p>react ssr demo</p>
            <button onClick={log}>Click me</button>
        </div>
    );
};
```

启动服务器后 `server` 端就会使用 `renderToString` 将 `<App />` 渲染成 `html` 字符串，然后通过 `send` 返回给前端，下面就是服务端返回的 `html` 内容：

```html
<div>
    <p>react ssr demo</p>
    <button>Click me</button>
</div>
```

打开浏览器访问该地址即可看到服务端返回了该 `html` 片段：

![picture 1](https://stg.heyfe.org/images/blog-ssr-react-0-1-1687072015983.png)

### hydrate 复活组件

如果你跟着上面的操作很快就会发现问题：为什么点按钮没法操作了？

其实原因很简单，因为我们只拿到了一个 `html` 并没有任何的 `js`，事件绑定等自然是无法实现的，要复活组件的交互我们还需要很重要的一步 - `hydrate` 也就是常说的水合。

`hydrate` 即通过 `react` 将对应的组件重新渲染到 `SSR` 渲染的静态内容上，类似于 `render` 差异点在于 `render` 会忽略 `root` 元素中现有的 `dom` 而 `hydrate` 则会复用并会进行内容匹配检查。

```
Hydration failed because the initial UI does not match what was rendered on the server.
```

如果遇到上述错误即表示在客户端执行 `hydrate` 时服务端返回的初始的 `dom` 和 `hydrate` 接收到的需要进行渲染的 `dom` 不匹配。

说了这么多我们再来看下代码如何编写，首先要进行 `hydrate` 我们需要客户端的代码来执行：

```tsx
import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from './App';

hydrateRoot(document.getElementById('root')!, <App />);
```

然后将该代码进行编译打包，我这里就直接使用 `webpack` 进行打包：

```js
const path = require('path');

module.exports = {
    entry: './ui/index.tsx',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            }
        ]
    }
};
```

打包完成后生成一个 `bundle.js` 即可在客户端使用它来进行 `hydrate`。

然后我们再修改下 `server` 端的代码：

```ts
app.get('/', (_: unknown, res: express.Response) => {
    res.send(
        `
<div id="root">${renderToString(<App />)}</div>
<script src="/bundle.js"></script>
`
    );
});

app.use(express.static('static'));
```

我们在静态内容的外层套上 `root` 元素，然后在下方引入我们刚刚编译的脚本，然后就可以在客户端看到我们想要的结果：

![picture 2](https://stg.heyfe.org/images/blog-ssr-react-0-1-1687073831757.png)

可以看到事件可以正常触发了。

此处还有个注意点，在 `server` 端要注意将静态字符串包裹在 `root` 元素中不要添加换行空格等，不然 `react` 在 `hydrate` 时依旧会因为内容不匹配而提示 `Hydration failed`（仅在 `hydrateRoot` 时出现，如果使用 `hydrate` 不会报错，不过 18 中 `hydrate` 已经被弃用。）

### 动态数据

此时有些同学可能发现一些问题：前面的内容所渲染的内容都是静态的，如果要针对用户渲染出不同的内容比如用户信息等如何是好？

其实很简单，只需要在服务端将对应的信息作为 `props` 进行渲染即可，我们下面使用 `userName` 模拟一下：

```tsx
app.get('/', (_: unknown, res: express.Response) => {
    const userName = ['张三', '李四', '王五', '赵六'][(Math.random() * 4) | 0];
    res.send(
        `
<div id="root">${renderToString(<App userName={userName} />)}</div>
<script src="/bundle.js"></script>
`
    );
});
```

可是客户端要如何与服务端匹配呢？此处有两种解决方案：

1. 客户端获取对应的信息并在信息获取完成后再进行 `hydrate` 操作。
2. 服务端将获取到的信息放在页面中。

可以看出方案 1 会带来明显的延时，所以一般会采用方案 2，实现一般可以使用全局变量或特定标签来实现：

```tsx
app.get('/', (_: unknown, res: express.Response) => {
    const userName = ['张三', '李四', '王五', '赵六'][(Math.random() * 4) | 0];
    res.send(
        `
<div id="root">${renderToString(<App userName={userName} />)}</div>
<script>
window.__initialState = { userName: '${userName}' };
</script>
<script src="/bundle.js"></script>
`
    );
});
```

```tsx
import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from './App';

hydrateRoot(document.getElementById('root')!, <App {...window.__initialState} />);
```

## 总结

1. `React` 中的 `SSR` 可以通过 `renderToString` 来实现，但是只能输出静态内容，要让页面支持交互需要搭配 `hydrate` 使用。
2. 实现 `SSR` 时服务端需要支持 `jsx` 语法的解析，因为服务端也需要读取组件。
3. `hydrate` 会检查服务端与客户端的内容是否匹配。
4. 要实现动态数据需要在客户端与服务端之间做好如何使用初始 `props` 的约定。

## 最后

本文的 `demo` 代码放置在 [React SSR Demo](https://github.com/ZxBing0066/playground-public/tree/master/react-ssr) 中，可自行取阅。