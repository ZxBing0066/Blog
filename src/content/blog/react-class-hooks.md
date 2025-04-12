---
title: 嗯？你能在 Class 组件下用 hooks？
pubDate: '2022-08-07'
heroImage: 'https://stg.heyfe.org/images/blog-react-isr-demo-1690810719572.png'
tags:
    - React
---

hooks 的火热程度无需多言，然而我最近逛 GitHub 时发现几年前就有人将 hooks 搬运到 Class 组件下了，一起看看吧。

> 前排警告 ⚠️，该 lib 稳定性存疑，且用法有待商榷，不建议上生产使用，本文仅是分享，而非推荐，看个乐呵即可。

## 在 Class 组件中的 hooks

不多说直接先放链接：https://github.com/salvoravida/react-class-hooks

该库导出了一批 class 中可用的 hooks，如：

-   useClassState
-   useClassEffect
-   useClassMemo
-   useClassCallback
-   useClassReducer
-   useClassRef
-   useClassContext
-   useClassLayoutEffect
-   useClassImperativeHandle

可以看到，和普通的 hooks 是一一对应的，再来看下使用方法：

```jsx
import { useClassState, useClassCallback, useClassEffect } from 'react-class-hooks';
import { useClassWindowSize } from './hooks';

class MyComponent extends React.PureComponent {
    render() {
        const { width, height } = useClassWindowSize();

        return (
            <div>
                <p>
                    windowSize : {width} x {height}
                </p>
            </div>
        );
    }
}
```

```js
import { useClassState, useClassEffect } from 'react-class-hooks';

export const useClassWindowSize = () => {
    const [size, setSize] = useClassState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const handle = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };
    useClassEffect(() => {
        window.addEventListener('resize', handle);
        return () => {
            window.removeEventListener('resize', handle);
        };
    }, []);
    return size;
};
```

可以看到，使用方式和普通的 hooks 基本一致，只是将 render 函数视为函数体，替换 hooks 的名称，然后在其中调用 hooks 即可，自定义 hooks 的方式也基本相当。

## 一统江湖

然而这会导致函数组件和 class 组件需要准备两套 hooks 代码，无疑大大增加了开发量，于是该作者又搞出了另一个库：[react-universal-hooks](https://github.com/salvoravida/react-universal-hooks)。

该 lib 会直接改写 react 中的 hooks 定义，从而使得 hooks 在 class 组件和函数组件下都可以一样工作：

使用时需要先行引入该库：

```jsx
import 'react-universal-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

引入后 React 中的 hooks 就会被该库所拦截篡改，从而做到在两类组件中同时使用一套代码。

有兴趣可以看下 [demo](https://codesandbox.io/s/interesting-architecture-pgt46d?file=/src/App.js)

## 后排注意

本文仅是针对该库做一个简单介绍，虽然这个做法看起来很香，感觉以后公共 hooks 函数组件也能一起用了，不过 class 组件和函数组件各有各的特点，说实在的没必要强行将 hooks 带到 class 组件中去。如果想要复用代码，可以一些简单的 hooks 可以直接转 HOC 来使用，也可以将代码逻辑抽离成公共方法，也许这也是这个库最终没有火起来的原因。当然上述仅我个人观点，欢迎理性讨论。

后面有时间我会分享下该库的源码解析，代码其实和 react 中的 hooks 逻辑差不多。