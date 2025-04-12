---
title: react-live 源码解析
pubDate: '2022-08-13'
heroImage: 'https://stg.heyfe.org/images/blog-react-isr-demo-1690810719572.png'
tags:
    - React
    - 源码解析
---

`react-live` 是一个 `react` 的实时编辑器，可直接编辑 `react` 代码，并实时预览。可以看下官方的预览图：

![](https://user-images.githubusercontent.com/17658189/63181897-1d67d380-c049-11e9-9dd2-7da2a3a57f05.gif)

本文针对的源码版本为 [e36630b](https://github.com/FormidableLabs/react-live/tree/e36630bdf821aac702684130a85867b4bec82318)

## 文件目录

老规矩先看下文件目录：

```sh
src
├── components
│   ├── Editor
│   │   └── index.js
│   └── Live
│       ├── LiveContext.js
│       ├── LiveEditor.js
│       ├── LiveError.js
│       ├── LivePreview.js
│       ├── LiveProvider.js
│       └── LiveProvider.test.js
├── constants
│   └── theme.js
├── hoc
│   └── withLive.js
├── index.js
└── utils
    ├── test
    │   ├── errorBoundary.test.js
    │   ├── renderer.js
    │   └── transpile.test.js
    └── transpile
        ├── errorBoundary.js
        ├── evalCode.js
        ├── index.js
        └── transform.js
```

## 源码解读

### 输入内容

先看下导出内容，包括：

-   `Editor`：编辑器
-   `LiveProvider`：实时编辑环境的 `Provider`，`Context.Provider`
-   `LiveEditor`：实时编辑上下文的编辑器
-   `LiveError`：实时编辑上下文的报错
-   `LivePreview`：实时编辑上下文的预览
-   `LiveContext`：实时编辑的 `Context`
-   `withLive`：实时编辑上下文的 `HOC`

文件结构和组件拆分一目了然。

### Provider

先看下 `Provider`，它提供了以下内容：

-   `element`：实时编辑输出的元素
-   `error`：当前的报错信息
-   `code`：当前编辑的代码
-   `language`：代码语言
-   `theme`：代码编辑器主题
-   `disabled`：是否禁用
-   `onError`：报错的回调
-   `onChange`：代码编辑时的回调

`Provider` 用来收集代码变更，然后通过 `transpileAsync` 将代码编译生成组件实例：

```js
function transpileAsync(newCode) {
    const errorCallback = error => {
        setState({ error: error.toString(), element: undefined });
    };

    try {
        const transformResult = transformCode ? transformCode(newCode) : newCode;

        return Promise.resolve(transformResult)
            .then(transformedCode => {
                const renderElement = element => setState({ error: undefined, element });

                // Transpilation arguments
                const input = {
                    code: transformedCode,
                    scope
                };

                if (noInline) {
                    setState({ error: undefined, element: null }); // Reset output for async (no inline) evaluation
                    renderElementAsync(input, renderElement, errorCallback);
                } else {
                    renderElement(generateElement(input, errorCallback));
                }
            })
            .catch(errorCallback);
    } catch (e) {
        errorCallback(e);
        return Promise.resolve();
    }
}
```

`renderElementAsync` 可以先无视，主要是用于 `noInline` 模式下调用 `render` 进行渲染，逻辑与非 `noInline` 模式下类似。

### generateElement

实时预览的核心部分就在这里了，它会将代码先进行编译，然后执行代码，取得返回值。

```js
const generateElement = ({ code = '', scope = {} }, errorCallback) => {
    // NOTE: Remove trailing semicolon to get an actual expression.
    const codeTrimmed = code.trim().replace(/;$/, '');

    // NOTE: Workaround for classes and arrow functions.
    const transformed = transform(`return (${codeTrimmed})`).trim();
    return errorBoundary(evalCode(transformed, { React, ...scope }), errorCallback);
};
```

代码如上，它会先去掉头尾空白，然后去掉结尾的分号，这一步是为了下一步的 `return` 拼接能够正常返回。通过 `return` 拼接让 `react-live` 能够支持下述语法直接渲染：

直接写一个匿名函数：

```jsx
() => <h3>So functional. Much wow!</h3>;
```

直接写 `jsx`：

```jsx
<h3>Hello World!</h3>
```

单 `class` 组件：

```jsx
class Comp extends React.Component {
    render() {
        return <center>component</center>;
    }
}
```

不过也导致了一定的学习成本，如果写多个函数，多个组件，嵌套等情况下会让人觉得语法很奇怪。

`transform` 就是将代码通过 `sucrase` 进行转译，处理 `jsx`、`class` 这些语法，可以理解为通过 `babel` 转译。早期的 `react-live` 通过 `buble` 进行转译，能够支持 `jsx` 注释，现在由于 `sucrase` 不支持 `jsx` 注释，所以新版无法使用 `jsx` 注释来控制 `jsx` 渲染引擎。

```jsx
/** @jsx mdx */
// 新版上述注释会失效
```

随后将转译的代码通过 `evalCode` 转换为 `React element`，此处会将 `scope` 和 `React` 传入 `evalCode` 中。

```js
const evalCode = (code, scope) => {
    const scopeKeys = Object.keys(scope);
    const scopeValues = scopeKeys.map(key => scope[key]);
    return new Function(...scopeKeys, code)(...scopeValues);
};
```

`evalCode` 中使用 `new Function` 来构造函数，`scope` 就是在这里作为参数进行注入。如果对 `new Function` 不理解的可以看我之前一篇关于 `JS` 沙箱的文章。

`errorBoundary` 则是一个简单的 `HOC`，用来捕获生成的组件运行时的错误信息，通过 `errorCallback` 抛出。

```js
const errorBoundary = (Element, errorCallback) => {
    return class ErrorBoundary extends Component {
        componentDidCatch(error) {
            errorCallback(error);
        }

        render() {
            return typeof Element === 'function' ? <Element /> : React.isValidElement(Element) ? Element : null;
        }
    };
};
```

上面就是 `react-live` 能够实时预览的核心代码了。下面再看下其它几个组件，都比较简单。

### 其他组件

`LivePreview` 会接受 `Provider` 中的 `Element`，将其渲染。

`LiveError` 接受 `Provider` 中的 `error` 进行渲染。

`LiveEditor` 则是接收 `Provider` 的 `code`、`language`、`theme`、`disabled`、`onChange`，提供编辑功能。

它的编辑器则是通过 `useEditable` 编辑，`Prism` 进行代码高亮。

## 总结

上述便是 `react-live` 的核心代码，内容并不多，通过 `sucrase` 实时编译代码，然后通过 `new Function` 构造函数注入 `scope` 来生成 `element` 实现实时预览，设计上通过拆离 `Editor`、`Error`、`Preview` 三部分，可以让使用者自由组合组件的位置、样式。