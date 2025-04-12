---
title: 孤陋寡闻了，才知道已经可以用 JS 来控制 CSS 动画了
description: "最近翻 MDN 突然发现一套叫 Web Animations API 的东东，点进去看才知道，原来是一套控制 css animation 的 API，而且已经有段时间了 \U0001F926‍♂️，而我居然一直不知道..."
pubDate: '2022-08-17'
tags:
    - JavaScript
    - CSS
    - Animation
---

最近翻 `MDN` 突然发现一套叫 `Web Animations API` 的东东，点进去看才知道，原来是一套控制 `css animation` 的 `API`，而且已经有段时间了 🤦‍♂️，而我居然一直不知道。

## 介绍

`Web Animations API` 主要包含两个 `API`：`animate` 来执行动画，`getAnimations` 来获取当前元素的动画。

并且 `getAnimations` 不止可以获取到 `animate` 创建的动画，`css` 中的动画同样可以获取到。

## getAnimations

先来个小 `Demo`：

https://code.juejin.cn/pen/7132756019978338315

如上 `Demo` 所示，通过 `getAnimations` 我们可以获取到当前元素的正在运行的动画的 `Animate` 对象，如果传入参数 `{subtree: true}` 还能获取到包括其所有子元素、伪元素的动画。

通过拿到的 `animate`，我们可以直接对其进行各种操作，如：

-   `pause` - 暂停动画
-   `play` - 播放动画
-   `cancel` - 取消动画状态
-   `reverse` - 反向执行动画到开始状态
-   `finish` - 直接跳到动画结束阶段

此外还有一些其他比较少用的方法，如 `commitStyles`、`persist` 等。

通过上述 `API`，我们可以轻易的通过 `JS` 来控制动画的执行，而不需要像以前一样通过改写 `CSS` 样式来控制。

除了上述的一些操作方法外，`animate` 中还有很多动画的属性，包括运行状态的 `Promise`、`timeline`、`effect` 等。

其中如 `finished` 等 `Promise` 在动画控制时也很好用，比如创建一个动画后需要在动画完成后做一些处理直接 `await finished` 即可，不需要像以前一样监听 `dom` 状态或是设定倒计时。

其它需要了解的可以点击[这里查看](https://developer.mozilla.org/en-US/docs/Web/API/Animation#methods)。

## animate

`animate` 方法则可通过 `JS` 给元素添加动画：`Element.animate(keyframes, options)`

```js
anim.animate(
    [{ transform: 'translateX(0)' }, { transform: 'translateX(100px)' }, { transform: 'translateX(0)' }],
    1000
);
```

这里的 `keyframes` 是一个数组，不同于 `css keyframes`，这里不需要定义每一个关键帧的百分比，此处会默认按照等比拆分关键帧，如果需要定义百分比，可直接在关键帧中添加 `offset` 参数：

```js
anim.animate(
    [{ transform: 'translateX(0)' }, { transform: 'translateX(100px)', offset: 0.3 }, { transform: 'translateX(0)' }],
    1000
);
```

此处 `keyframe` 参数主要包含两种属性，第一种是对应的 `css` 属性的 `js` 表示，如 `left`、`paddingLeft`、`transform` 等（注意此处 `css` 中的 `float`、`offset` 需要写成 `cssFloat`、`cssOffset`），第二种是上面说到的 `offset` 一类的通用控制参数，除了 `offset` 外，还可设置 `easing` 为每个关键帧设定动画曲线：

```js
anim.animate([{ opacity: 1, easing: 'ease-out' }, { opacity: 0.1, easing: 'ease-in' }, { opacity: 0 }], 1000);
```

以及 `composite` 参数来控制动画合成方式。

此外，`keyframes` 还支持第二种格式：

```js
anim.animate(
    {
        opacity: [0, 0.9, 1],
        offset: [0, 0.8], // Shorthand for [ 0, 0.8, 1 ]
        easing: ['ease-in', 'ease-out']
    },
    1000
);
```

可直接传入一个对象，将对象中的属性通过数组表示来表示对应的关键帧。

`options` 则可以直接传入数字，代表动画事件或是传入动画参数：

```js
anim.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(100px)' }, { transform: 'translateX(0)' }], {
    duration: 1000
});
```

参数和 `CSS` 中差不多，包括：

-   `delay` - 动画延迟
-   `direction` - 动画运行方向
-   `duration` - 动画运行时间
-   `easing` - 动画运行曲线
-   `endDelay` - 动画结束后的延迟
-   `fill` - 动画完成后的填充
-   `iterations` - 动画重复次数
-   `composite` - 动画合成

此外还有 `iterationStart`、`iterationComposite`，需要了解可[点击查看](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#parameters)。

## 兼容和 polyfill

当然，该系列 `API` 兼容并不佳，要能够完整体验需要至少 `Chrome` 84 以上版本，`IE` 则完全没戏。

不过还好有 `polyfill` 的存在：[web-animations-js](https://github.com/web-animations/web-animations-js)

## 总结

通过 `Web Animations` 系列 `API` 可以方便的控制已有的 `CSS` 动画、添加动画等，而不需要像以前一样使用 `JS` 来模拟动画，在某些特定场景下可以提高动画性能、简化动画代码。