---
title: IntersectionObserver - 监视你的 DOM 元素相交
pubDate: '2022-10-06'
tags:
    - JavaScript
    - WebAPI
---

# IntersectionObserver - 监视你的 DOM 元素相交

`IntersectionObserver` 用于监听元素是否进入视口（与视口是否存在相交），在图片懒加载等场景中被广泛应用，不过除了这个基础的用法，他还有更强大的能力。

## 使用场景

目前已知的 `IntersectionObserver` 常用使用场景包括：

-   图片或其它内容的懒加载
-   滚动加载
-   判断用户是否能看见内容并作一些特定优化如停止动画、暂停视频等

其它的还有如用作广告是否出现在可视区域来判断是否计费等。

## 如何使用

要使用 `IntersectionObserver` 首先需要实例化一个 `observer`，然后通过调用它的 `observe` 来监听对应元素，元素在视口中的占比变化时会调用回调函数，默认情况下会在元素进入视口和脱离视口时触发。

```js
const observer = new IntersectionObserver(callback, options);
observer.observe(target);
```

回调中接收到的参数主要为 `entries` 和 `observer`，`observer` 就是上面定义的 `observer` 的引用。因为一个 `observer` 可以 `observe` 多个元素，所以 `entries` 为数组：

```js
const callback = entries => {
    entries.forEach(entry => {
        console.log(entry);
    });
};
```

解释下面 `entry` 属性前先讲下以下几个概念：

-   `root`：`root` 为监视的相对元素，默认为浏览器视口，也可以自行设置
-   `rect`：`rect` 为一个矩形定义，一般包含宽高、位置等信息，常见的有 `getBoundingClientRect` 获取元素的渲染矩形

`entry` 中主要包含一下几个属性：

-   `boundingClientRect`： 元素的 `boundingClientReact`，同 `getBoundingClientRect` 返回
-   `intersectionRect`： 元素进入 `root` 的部分的 `rect`
-   `intersectionRatio`： 元素的 `intersectionRect` 与 `boundingClientRect` 的比例，可理解为相交部分的占比
-   `isIntersecting`： 元素与 `root` 是否有相交
-   `rootBounds`： `root` 元素的 `rect`
-   `target`： 时间触发的目标元素，同 `event.target`
-   `time`： 回调触发的时间，注意不是时间戳而是相对于页面加载的 `time origin` 的时间差

### options

`options` 包含三个可选参数：`root`、`rootMargin` 和 `threshold`，都有着很常见的用途：

#### root

设定监听的 `root` 元素，默认为浏览器视口，可自行定义。

#### rootMargin

设定视口的边距，值同 `css margin`，可以为 `10px` 或 `10px 20px` 等格式，并且支持百分比。

通过 `rootMargin`，可以控制触发事件的边界距离。

#### threshold

设置阈值，可以是为单个值，也可以是数组 `[0, 0.3, 1.0]`。

通过设置阈值，可以方便的控制事件的触发时机，不需要不停的判断元素进入的位置，也不需要额外做防抖节流等操作来优化性能。

## 其它 API

除了 `observe` 用于添加元素监听外，`IntersectionObserver` 还提供了以下几个 `API`：

-   `unobserve`： 来解除元素的监听
-   `disconnect`： 关闭所有监听
-   `takeRecords`： 可获取 `observer` 下所有的元素最后触发的 `entry`

## 兼容与 polyfill

`IntersectionObserver` 的兼容性较佳，除了 `IE` 外基本主流浏览器都早已支持：

-   `chrome` 51
-   `edge` 15
-   `firefox` 55
-   `opera` 38
-   `safari` 12.1

如果要兼容可以使用 `google chrome lib` 提供的 `polyfill`：https://github.com/GoogleChromeLabs/intersection-observer

## 问题

实际使用中发现 `rootMargin` 在使用中会存在一些问题，时间有限没有继续深入，此处记录后续更新。

## 总结

利用 `IntersectionObserver` 我们可以很方便的对元素是否展示、展示区域的大小、比例进行监听。
