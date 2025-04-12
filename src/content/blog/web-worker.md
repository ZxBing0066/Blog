---
title: 聊一聊浏览器中的 Worker - Web Worker
pubDate: '2022-08-01'
tags:
    - worker
---

# 聊一聊浏览器中的 Worker - Web Worker

## 什么是 Worker

`Worker` 是浏览器提供的一种可以创建独立后台线程运行代码的方式。

`Worker` 在国内虽然一般场景下使用不多，可能没有什么存在感，但是其实是一项挺久远的技术了，只是由于一般情况下没什么必要性，属于锦上添花形 `feature`，很少会使用，不过在一些特殊场景下可以极大提高开发和用户体验。比如一些大型计算、数据加密等，还有诸如使用 `OffscreenCanvas` 来进行图片处理等。

`Worker` 主要包括以下几种：

1. 常见的 `Web Worker`，几乎所有浏览器都很早就支持，
2. `Shared Worker`，一种特殊的 `Web Worker`，可以被多个窗口共享
3. `Service Worker`，主要使用在 `PWA` 应用中，可以帮助构建离线应用
4. `Worklet`，现在还属于实验性质，算是一种轻量级的 `Web Worker`，但是他可以做到访问一些渲染相关的 `API`

本篇先聊一聊最常用的 `Web Worker`。

`Web Worker` 会在浏览器中创建一个独立的后台线程，然后执行传入的脚本，和主线程的通信主要是通过 `postMessage` 和 `onmessage` 来实现。不过 `Web Worker` 中只能使用一部分的 `API`，如 `WebSocket`、`Date` 等，而像一些 `DOM` 相关的 `API` 是无法使用的，原因很好理解，主要是为了避免线程冲突，一旦 `Web Worker` 线程可以操作 `DOM`，那诸如各种时间锁就要出现了。

## 创建

要创建一个 `Web Worker`，我们只需要建立一个独立的 `worker.js` 文件，然后通过 `new Worker('./worker.js')` 来引用即可：

```js
const worker = new Worker('./worker.js');
```

当然也可以通过 `createObjectURL` 来创建虚拟 `url` 来创建，如之前说过的 `use-worker` 便是使用这种方式。

## 通信

而通信则通过 `postMessage` 来完成，如主线程需要发送消息给 `worker`：

```js
worker.postMessage('Hello, my worker');
worker.addEventListener('message', e => {
    console.log(e);
});
```

而 `worker` 文件的主体则是一个 `onmessage` 函数：

`worker.js`

```js
onmessage = function (e) {
    console.log('Message received:', e);
    postMessage('Yes, my lord');
};
```

当接收到主线程消息后，则会进入 `onmessage` 函数，而 `worker` 的 `postMessage` 不需要主体，直接调用即为发送给创建它的主线程。

## 销毁

要销毁一个 `worker`，只需要调用 `terminate` 方法即可：

```js
worker.terminate();
```

调用后 `worker` 会立刻终止并关闭，类似于操作系统中 `kill` 一段进程。当然 `worker` 也可以直接调用 `close` 来自行关闭：

```js
close();
```

## 错误处理

`worker` 的事件除了 `message` 外还包括 `error`、`messageerror`、`rejectionhandled`、`unhandledrejection`，可监听对应的事件来处理对应的错误。

-   `error`：普通执行错误
-   `messageerror`：`postMessage` 数据错误，一般出现在传递的数据类型不合法的情况
-   `rejectionhandled`：所有的 `Promise reject` 时触发
-   `unhandledrejection`：`Promise reject` 未处理时触发

## 引入外部脚本

在 `Worker` 中还可以通过 `importScripts` 来导入外部脚本：

```js
importScripts('lodash.js');
```

要注意 `importScripts` 为同步请求，会阻塞 `worker` 线程。如果在外部脚本中有导出，可通过挂载在全局变量中，要注意在 `worker` 中，全局变量需通过 `self` 引用，而非 `window`，上述的 `close` 一样可以通过 `self` 来进行调用。

```js
importScripts('lodash.js');
_.each([1, 2, 3], n => {
    console.log(n);
});
```

上述便是关于 `Web Worker` 的内容，下面会聊一聊其它几种 `worker`。
