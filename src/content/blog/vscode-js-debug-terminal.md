---
title: Node 调试利器，前端、Node 开发必备 - VSCode JS Debug Terminal
pubDate: '2023-05-15'
heroImage: 'https://stg.heyfe.org/images/blog-vscode-js-debug-terminal-1690811194402.jpg'
tags:
    - VSCode
    - Node.js
---

经常看到有同学抱怨 `Node` 调试麻烦或者是搞不清怎么调试各种脚本、`Jest`、`Webpack` 等等，而偶尔看到的调试相关的文章又全都是在写 `inspect`、`launch.json` 这些方案，其实有一定学习成本。

而其实在 `VSCode` 中早已内置了相当无脑的 `Debug` 方式，就是 `JavaScript Debug Terminal`，利用它我们只需要负责打断点，别的什么 `inspect`、`launch.json` 都不需要关注，主打的就是一个无脑、简单。

## 使用

要启用 `JavaScript Debug Terminal` 过程实在是太无脑了，不过还是说一下吧，要开启只需要一步：在 `Terminal` 中新开一个 `JavaScript Debug Terminal`，然后所有的脚本全都用它来启动即可。

![picture 1](https://stg.heyfe.org/images/blog-vscode-js-debug-terminal-1684074500790.png)

## 实战测试

空口无凭，下面我们通过几个案例来测试一下有多好用。

### node 脚本

首先我们创建一个 `test.js` 脚本，然后在需要调试的行数前方点击添加上断点，并进入 `Debug Terminal` 通过 `node test.js` 来执行。

![picture 2](https://stg.heyfe.org/images/blog-vscode-js-debug-terminal-1684074668409.png)

可以看到执行后直接就开启了 `VSCode` 的 `debug` 模式，并且成功在断点出停住。

### npm script

再来试试 `npm script` 方式，我们先新建一个 `package.json`，然后在 `scripts` 中添加一条：`"start": "node test.js"`，随后在 `Debug Terminal` 执行 `npm run start`。

![picture 3](https://stg.heyfe.org/images/blog-vscode-js-debug-terminal-1684075322522.png)

注意这次我们使用的是 `debugger` 来添加断点，可以发现同样成功进入断点。

### typescript debug

不止于此，我们再试试 `typescript`，新建一个 `test.ts`，然后通过 `npx tsx test.ts` 启动。

![picture 4](https://stg.heyfe.org/images/blog-vscode-js-debug-terminal-1684075558239.png)

可以发现 `typescript` 一样可以成功调试。

### webpack

上面都属于比较简单的场景，实际场景我们可能经常会在打包或写单测时遇到一些问题需要调试。现在我们先来随便找个 `webpack` 模版试试 `webpack`。

![picture 5](https://stg.heyfe.org/images/blog-vscode-js-debug-terminal-1684112828720.png)

可以看到在 `webpack` 源码中打断点同样也可以支持。

### jest

再来试试 `jest`，随便拿 `react` 源码里的单测跑一下。

![picture 6](https://stg.heyfe.org/images/blog-vscode-js-debug-terminal-1684152319997.png)

不出所料，毫无问题。

## 其他方式

除了上面说的主动打开 `Debug Terminal` 的方式进行调试外，`VSCode` 还在 `npm script` 中集成了一些操作。

比如在 `package.json` 中的 `scripts` 上方的 `Debug` 按钮，点击后会让你选择项目中的 `script` 并启动 `Debug Terminal` 进行调试。

![picture 7](https://stg.heyfe.org/images/blog-vscode-js-debug-terminal-1684155078050.png)

也可以在某个 `script` 的名字上 `hover` 后点击出现的悬浮按钮中的 `Debug` 直接调试对应的 `script`。

![picture 8](https://stg.heyfe.org/images/blog-vscode-js-debug-terminal-1684155096585.png)

## 总结

可以看出 `VSCode` 的 `JS Debug Terminal` 基本支持了所有我们常用的调试场景，无论是 `node`、`typescript`、`webpack` 还是 `jest`，全部拿捏。并且使用绝对无脑，可以放心食用。

当然在使用过程中也遇到一些小问题，比如在跑 `jest` 时由于会启动多个子进程此时点击断点工具条中的断开可能会导致 `Debug Terminal` 后续失效，也有时会卡住。不过瑕不掩瑜，用了就知道 `JS Debug Terminal` 真香。