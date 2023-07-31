---
tags: [babel]
cover: https://stg.heyfe.org/images/blog-we-can-see-babel-everywhere-1690811931000.png
---

# 无处不在的 babel

`babel` 作为前端生态圈举足轻重的一员，在前端工程化等领域起着非常重要的作用。今天一起来看看那些常见的 `babel` 使用场景，看一看 `babel` 的生态圈有多庞大。

## webpack：babel-loader

虽说这一年来 `vite` 大火，但是 `webpack` 依旧占据着主流地位。`babel` 和 `webpack` 可以说是相互成就，基本配置 `webpack` 时必不可少的插件就是 `babel-loader`，`webpack` 帮助前端开发者解决了工程化打包、开发的问题，而 `babel` 则帮助我们解决了 `JS` 的兼容问题。

随着 `babel` 最近几年的更新，在 `webpack` 中的配置也是越来越简单，我们只需要下载 `babel-loader @babel/core @babel/preset-env` 这三个依赖包，然后在 `webpack.config.js` 中配置好 `babel` 的配置即可。还记得早期 `webpack` 和 `babel` 刚盛行的时候，需要下载和配置一堆的 `babel` 插件，而现在 `babel` 通过 `preset` 方案大大降低了配置成本。

## rollup：@rollup/plugin-babel

`rollup` 在库开发中的地位和 `webpack` 在普通项目开发中的地位相当，而且 `vite` 还是深度依赖 `rollup` 来进行打包，包括它的插件设计都是参考 `rollup` 的插件来的。然而在实际使用中，为了保障代码能够正常运行，我们依旧需要使用 `@rollup/plugin-babel` 来帮助解决转译和 `polyfill` 问题。

## vite：@vitejs/plugin-legacy

`vite` 在最近的一年里热度上升迅速，大有赶超 `webpack` 的趋势，然而如果你想让你的产品安心上线，就需要考虑浏览器的兼容问题，特别是在国内。于是 `vite` 团队开发了 `@vitejs/plugin-legacy` 插件来解决兼容问题。

而其实 `@vitejs/plugin-legacy` 就是使用 `babel` 来实现兼容的，不过不同于在 `webpack` 和 `rollup` `中的使用，@vitejs/plugin-legacy` 使用的是 `@babel/standalone`，所以不需要额外的插件等依赖包，而且配置也是被 `@vitejs/plugin-legacy` 封装好的，不需要自行编写，所以在使用时让开发者几乎感觉不到 `babel` 的存在。

## @babel/cli

`babel` 本身也提供了 `cli` 工具用来进行直接的代码转译。一般使用在开发开源库时，有些包除了会将库使用 `webpack` 等工具进行打包外，还会再使用 `@babel/cli` 直接进行文件转译，这样可以方便进行文件级别的按需加载，当然在 `tree-shaking` 到来后，这种需求正在慢慢减少。

## @babel/standalone

`@babel/standalone` 上面也提到过，在 `@vitejs/plugin-legacy` 中使用的就是它了，它是另一个 `babel` 官方提供的能够直接调用 `babel` 能力的包。不同于使用 `@babel/core` 需要自行安装或配置各种插件，`@babel/standalone` 将 `babel` 自身几乎所有的插件全部内置，并且它可以直接在浏览器运行，当然带来的问题就是它庞大的体积和略差的性能。一般情况下不推荐使用，只有在一些浏览器需要在线编译的特殊场景才会用到。

## eslint：@babel/eslint-parser

现代前端开发者 `eslint` 也是不可或缺的一员，然而 `eslint` 本身的 `parser` 所支持的语法速度有时会和项目中所用到的有所差别，此时便可以通过 `@babel/eslint-parser` 来让 `eslint` 识别这些语法，保证开发提示和编译的统一性。

## react：@babel/preset-react

当我们在开发 `react` 应用时，必然需要处理 `jsx` 的编译问题，`babel` 一样提供了方案，通过 `@babel/preset-react`，不但可以解决 `jsx` 的编译问题，它还能帮忙自动添加 `displayName`，还支持自定义 `jsx` 实现。

## typescript：@babel/preset-typescript

在 `TS` 无比流行的现在，我们在开发时必然绕不开 `TS` 的编译问题，此时 `babel` 的 `@babel/preset-typescript` 插件便可以派上用场，使用后可以一站式解决编译转译问题，不需要再借助额外的 `ts-loader` 等。

## codemod - jscodeshift

此外，`babel` 在 `codemod` 中也起着重要的作用，如 `jscodeshift` 中就是使用 `babel` 来生产 `AST` 并进行节点遍历来实现 `codemod`。

## 总结

除了上面讲到的这些常见的工具、库等需要用到 `babel` 外，还有很多如 `jest`、`vue` 等等也会有和 `babel` 相关的内容。总之，只要你想使用新语法、新 `API`，而你的产品使用用户的使用环境又存在着与你想要使用的语法的兼容问题，那 `babel` 基本会成为项目中必不可少的部分。
