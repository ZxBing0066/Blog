---
title: ResizeObserver - 监视 DOM 大小的变化
pubDate: '2022-10-07'
tags:
    - JavaScript
    - WebAPI
---

# ResizeObserver - 监视 DOM 大小的变化

`ResizeObserver` 用于监听元素的大小尺寸变化，常见用于监听自适应大小的元素变化引起的宽高变化时处理应宽高变化而需要 `JS` 做特定处理的场景。

说下我自己使用中遇到的三个场景：

-   `Tabs` 组件的头部区域在超过宽度/高度时需要展示出超出滚动按钮
-   组件中存在超出隐藏的场景，如多个标签超出一行后将剩余标签进行压缩等
-   `Table` 组件横向滚动如果存在某几列数据需要固定展示的情况下需要根据宽度来计算是否需要出现滚动条和滚动体室阴影

可以看出上面几个场景共性：当样式需要自适应宽高，而脚本又需要按照元素宽高来执行某些操作时。这些场景使用 `ResizeObserver` 就可以比较方便的进行处理。

## 使用

使用 `ResizeObserver` 第一步同样是先需要实例化一个 `observer`，第二步便是使用 `observer` 的 `observe` 将需要监听的元素添加到监视列表中：

```js
const observer = new ResizeObserver((entries, observer) => {
    entries.forEach(entry => {
        console.log(entry);
    });
});
observer.observe(target);
```

实例化时只需要接受一个参数：尺寸变化时的回调，回调函数中的 `entries` 则是所有添加到监视列表中的元素的 `entry` 信息列表，而 `observer` 同样是上面实例化的 `observer` 的引用。

## entry

`entry` 中包括以下五个属性：

-   `borderBoxSize`： 监听元素的 `borderBox` 尺寸
-   `contentBoxSize`： 监听元素的 `contentBox` 尺寸
-   `devicePixelContentBoxSize`： 监听元素的 `contentBox` 尺寸，不过是设备像素维度，而不是展示维度
-   `contentRect`： 监听元素的 `contentRect` 信息，同 `getClientRects`
-   `target`： `entry` 所属的监听元素

`borderBox` 和 `contentBox` 就是我们常说的 `CSS` 盒模型中的 `borderBox` 和 `contentBox`，`entry` 中的 `borderBoxSize` 和 `contentBoxSize` 中包含两个属性：`blockSize` 和 `inlineSize`，这两个属性的值与页面元素的 `writing-mode` 相关，默认情况下 `blockSize` 为纵向尺寸一般为高度，`inlineSize` 为横向尺寸一般为宽度。而当书写模式为纵向时，`blockSize`、`inlineSize` 的纵横向关系会调换。

而 `devicePixelContentBoxSize` 则和设备像素比相关，在移动设备或是高分辨率屏幕中会与 `CSS` 像素存在差异。

## 其它 API

除了 `observe` 外，`observer` 还提供了 `unobserve` 来解除某个元素的监听，或直接调用 `disconnect` 来关闭对所有元素的监听。

## 兼容与 polyfill

`ResizeObserver` 的兼容性较差，一般情况下推荐需要使用 `polyfill` 来进行补全：

-   `chrome` 64
-   `edge` 79
-   `firefox` 69
-   `safari` 13.1
-   `ie` 不支持

常用的 `polyfill`：https://www.npmjs.com/package/resize-observer-polyfill
