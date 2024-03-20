---
lastUpdate: 2022-10-18
date: 2022-10-18
---
# 强大的 performance API - PerformanceEntry 篇（你想要的性能指标，都逃不过我的掌控 🫴）

很久前写的一篇性能优化的文章中有提到我们可以使用 `performance.now` 来获取程序运行的时间，今天再来介绍一个鲜为人知却又无比强大的 `API` - `performance` 中的一个很强大的功能：`getEntries`，简单的说通过 `getEntries` 系列 `API`，浏览器中的自带的一切性能相关指标我们都可以直接获取到，下面一起来看下里面藏着哪些信息。

## performance.getEntries - 获取页面中的性能数据条目

前排先提醒下，`PerformanceEntry` 中的时间相关数据全部是相对时间，即从进入页面到该事件发生的时间差。我们先不介绍直接上手使用 `getEntries` 看下输出：

```js
const entries = performance.getEntries();
```

在控制台执行上述代码，你将会发现打印了一长串的 `Performance*` 对象数组，其中包含如 `PerformanceNavigationTiming`、`PerformanceResourceTiming`、`PerformancePaintTiming` 等等。一般而言，数组的第一项将会是 `PerformanceNavigationTiming` 实例，我们看下里面有哪些信息：

## navigation - 页面导航耗时信息

```js
const performanceEntry = {
    connectEnd: 4.100000023841858,
    connectStart: 4.100000023841858,
    decodedBodySize: 144049,
    domComplete: 1328.7000000476837,
    domContentLoadedEventEnd: 1023.6000000238419,
    domContentLoadedEventStart: 1021,
    domInteractive: 964.8000000715256,
    domainLookupEnd: 4.100000023841858,
    domainLookupStart: 4.100000023841858,
    duration: 1330,
    encodedBodySize: 29554,
    entryType: 'navigation',
    fetchStart: 4.100000023841858,
    initiatorType: 'navigation',
    loadEventEnd: 1330,
    loadEventStart: 1329.4000000953674,
    name: 'https://github.com/',
    nextHopProtocol: 'h2',
    redirectCount: 0,
    redirectEnd: 0,
    redirectStart: 0,
    requestStart: 185.30000007152557,
    responseEnd: 906.9000000953674,
    responseStart: 855.7000000476837,
    secureConnectionStart: 4.100000023841858,
    serverTiming: [],
    startTime: 0,
    transferSize: 29854,
    type: 'navigate',
    unloadEventEnd: 0,
    unloadEventStart: 0,
    workerStart: 0
};
```

我们挑其中比较典型的几个属性说一下：

-   `domainLookupStart`、`domainLookupEnd` 是页面 `DNS` 查找的开始和结束时间
-   `encodedBodySize`、`decodedBodySize` 是 `document` 请求的压缩前后的尺寸
-   `requestStart` 为 `document` 请求开始的时间，`responseStart` 是服务器响应的时间，`responseEnd` 则是服务器响应后到响应体接收完成的时间

其它的还有很多很容易看出来的如 `domComplete`、`domInteractive` 等，是不是发现很多需要统计的性能指标都可以直接拿到。

## paint - 你想要的 FP、FCP 都在这了

不过有同学可能会发现，我们常用的 `FP` 和 `FCP` 指标怎么没看到呢？别急，我们把到数组最后看看，可以看到两个 `PerformancePaintTiming` 对象，这就是你想要找的了，我们一起看看数据：

```js
const performanceEntryFP = {
    name: 'first-paint',
    entryType: 'paint',
    startTime: 804.6000000238419,
    duration: 0
};
const performanceEntryFCP = {
    name: 'first-contentful-paint',
    entryType: 'paint',
    startTime: 804.6000000238419,
    duration: 0
};
```

简单粗暴，就一个 `startTime`。（注意此处的 `duration` 是个摆设，永远为 0，应该是实现的父类的属性）

上面已经可以满足我们平时要上报的性能指标的大部分需求。然而 `PerformanceEntry` 中可远不止这些，如果你的页面加载后你在页面中进行过任何操作如鼠标点击、输入等操作，那你会看到一条 `PerformanceEventTiming` 记录，但是在那之前，为了让我们能够更精确快速的获取到我们想要的 `PerformanceEntry` 条目，我们先介绍一下另外两个 `API`：`getEntriesByName` 和 `getEntriesByType`。

## getEntriesByType - 获取指定的性能数据条目

`getEntriesByType` 可以传入 `PerformanceEntry` 的 `type` 让我们过滤出我们制定类型的性能数据条目，比如上面的 `PerformanceNavigationTiming` 的 `entryType` 即 `navigation`，我们便可以直接使用 `performance.getEntriesByType('navigation');` 来获取，当然，你也可以直接使用 `filter` 筛选。

## first-input - 用户首次操作记录

下面我们再来看一下我们刚刚说到的那条 `PerformanceEventTiming` 记录，我们可以使用 `performance.getEntriesByType('first-input')` 来获取该条记录，获取前千万记得要先执行一次操作，我们来看下其中的数据：

```js
const performanceEntry = {
    name: 'pointerdown',
    entryType: 'first-input',
    startTime: 2077.7000000476837,
    duration: 16,
    processingStart: 2080.4000000953674,
    processingEnd: 2080.600000023842,
    cancelable: true
};
```

哇哦，可以看到 `performance` 中帮我们记录了操作的开始时间、执行耗时、事件类型，真是棒棒的。

不过先不要急着感叹，还有更厉害的。

## resource - 所有的请求，都能在我这里找到

我们在尝试一下使用 `performance.getEntriesByType('resource')`，如果你测试的网页较大，你会发现这次返回了超多的数据，数据条目中的 `initiatorType` 包括各种 `script`、`img`、`link`、`xmlhttprequest`、`fetch` 等等，简单说出了 `document` 请求，所有的其它请求的数据都在这里了，哇哦。这些数据条目中的属性基本一致，并且与 `navigation` 条目存在很高的重合度，因为 `navigation` 本身包含了 `document` 请求的性能数据，这里不在重复贴数据内容，有兴趣的自行打开 `console` 试一下就行了。

通过 `resource` 类的数据条目，我们可以轻易的获取到前端各种资源的加载耗时、资源大小等等，并且由于请求的数据也一样可以获取到，以后就可以在 `API` 慢的时候拿着数据去找后端的茬了，有理有据（🐶 保命）。

看到这里相信不知道 `performance` 的已经后悔了，后悔没早点知道导致自己在性能上报时打了埋了一堆点到最后还不知道时间靠不靠谱。不过先别急，这还没完。

## mark 和 measure - 自定义性能埋点的好帮手

`performance` 还提供了 `mark` 和 `measure`，让我们可以进行自定义性能埋点。通过调用 `performance.mark('custom')` 我们就可以创建一条自定义的 `mark` 条目，还可以在第二个参数中传入我们想要记录的信息。

```js
performance.mark('custom', { detail: 'hahaha' });
// {
//     "name": "custom",
//     "entryType": "mark",
//     "startTime": 56635,
//     "duration": 0,
//     "detail": "hahaha"
// }
```

此外，通过配合 `measure`，你开可以轻松获得两个 `mark` 之间的耗时：

```js
performance.mark('start');
doSomething();
performance.mark('end');
performance.measure('measure start to end', 'start', 'end');
```

然后你就会得到一条 `measure` 条目：

```js
{
    "name": "measure start to end",
    "entryType": "measure",
    "startTime": 103982.20000004768,
    "duration": 2598.399999976158
}
```

并且，在 `Chrome` 中你的 `mark` 和 `measure` 也会在 `Performance` 面板中出现。好了，还开发什么埋点系统，一个 `performance` 全搞定，只需要做个数据统计平台就完事了。

## worker 小助手 - 让你的性能上报与代码解耦

除了上面那些强大的 `API` 可以让我们获取到各种性能指标外，我们还可以直接在 `web worker` 中使用 `performance` 系列 `API`，这样我们就可以彻底做到性能上报与代码的解藕，并且不需要担心处理性能数据时影响程序的性能，组合拳，太香了。

## 总结

使用 `performance` 我们可以轻松的获得浏览器的各种性能指标、前端资源加载情况、后端 `API` 请求耗时等等，甚至还可以通过 `mark` 和 `measure` 来搞自定义事件，配合 `web worker`，简直香的不行。
