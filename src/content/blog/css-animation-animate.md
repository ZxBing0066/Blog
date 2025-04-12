---
title: 嘿，朋友，其实 CSS 动画超简单的 - animation 动画篇
pubDate: '2022-09-29'
tags: []
---

上篇讲完了渐变动画，本篇我们讲一下 `animation` 动画，`animation` 动画相比渐变动画来讲功能更丰富，使用也更复杂，不过其中相通之处也很多，建议看完上篇再来看本篇可以更方便吸收。

## 常见使用场景

上篇也提到渐变动画主要用来优化状态样式切换的体验，而 `animation` 动画的场景会更小，最主要场景就是拉升逼格、吸引用户的眼球，当然还有一些 `loading` 效果也会经常用到。

常见的比如在官网首页增加一些炫酷的动效，或是在登陆页添加一些彩蛋等。

## animation 动画的两个要素

要生成 `animation` 动画，同样有两个要素：

-   `keyframe` 定义
-   `animation` 定义

`keyframe` 用于定义动画的关键帧，`animation` 用于定义元素要应用的动画配置，类似于 `transition`。

## keyframe 定义

`keyframe` 就是常说的动画关键帧，关键帧是动画形成的关键要素，做过动画或者用过 `PS` 绘制动画的应该都比较熟悉，如果实在不熟悉的可以先稍微了解一下。

在渐变动画中，其实存在两个隐性关键帧，及起始状态和目标状态，动画直接通过关键帧中的数据定义，使用时间函数计算出每个时间点的数据即可。

比如 `width` 从 100px 变为 200px，定义时间函数为线性函数，那在动画时间进行一半的时候，`width` 对应的就是 150px。

而在 `animation` 动画中，我们可以借助 `keyframe` 完成更强大的关键帧定义：

```css
@keyframe ani-spin {
    0% {
        transform: rotate(0turn);
    }
    100% {
        transform: rotate(3turn);
    }
}
```

在 `keyframe` 中，我们使用 `@keyframe` 来定义一个新的动画，后面跟上 `keyframe` 的名称，然后我们代码块中使用百分比来定义一个关键帧，在关键帧的块中写上该关键帧的信息。

关键帧中定义的字段属性和 `transition` 动画支持的属性一致，为了方便查看这里再贴一遍

-   `width,height,padding,margin,font-size,border-width,left,right,top,bottom` 等尺寸
-   `color,background-color,border-color` 等颜色
-   `border-radius,box-shadow` 等较为特殊的属性
-   `transform` 的各种旋转、偏移等

如上述的 `keyframe` 定义即在起始的关键帧中，元素的旋转角度为 0，在结束的关键帧中，元素的旋转角度为 3\*360=1080 度。所以产生的动画效果为元素旋转 3 圈。

除了使用百分比来表示关键帧的位置外，还可以使用 `from`、`to` 来表示 0% 和 100%：

```css
@keyframe ani-spin {
    from {
        transform: rotate(0turn);
    }
    to {
        transform: rotate(3turn);
    }
}
```

此外，我们还可以一次定义多个关键帧，合并信息相同的关键帧：

```css
@keyframe ani-spin {
    0%,
    to {
        transform: rotate(0turn);
    }
    50% {
        transform: rotate(3turn);
    }
}
```

上述定义即表示在起始帧和结束帧，元素的旋转角度均为 0，所以产生的动画效果为元素先正向旋转 3 圈，再逆向旋转 3 圈。

再来一个复杂一点的 `keyframe` 定义讲一讲：

```css
@keyframe ani-a-little-complex {
    50% {
        width: 100px;
    }
    75% {
        background-color: pink;
    }
    to {
        transform: rotate(1turn);
    }
}
```

## animation 定义

`animation` 属性的用途与 `transition` 类似，但是功能更强大，子属性也更多：

| 属性名                      | 描述                                 | 默认值    |
| --------------------------- | ------------------------------------ | --------- |
| `animation-delay`           | 动画开始的延时                       | 0s        |
| `animation-direction`       | 动画的播放方向，可以控制动画逆向播放 | `normal`  |
| `animation-duration`        | 一轮动画所需的时常                   | 0s        |
| `animation-fill-mode`       | 动画结束后如何展示元素的状态         | `none`    |
| `animation-iteration-count` | 动画持续的次数                       | 1         |
| `animation-name`            | 指定动画的关键帧配置名称             |           |
| `animation-play-state`      | 控制动画的播放状态                   | `running` |
| `animation-timing-function` | 时间函数                             | `ease`    |

要使 `animation` 定义生效，我们只需要定义 `name` 和 `duration` 即可：

```css
.ani-target {
    animation: 1s ani-spin;
}
```

使用其它属性时需要注意属性顺序：`duration easing-function delay iteration-count direction fill-mode play-state name`。

或者干脆直接使用子属性名称算了，毕竟这个属性有点多，记顺序太难记了。（反正我是记不住 🤦‍♂️）

另外，`animation` 还可以声明多条：

```css
.ani-target {
    animation: 1s ani-1, 2s ani-2;
}
```

这样可以将动画方便的拆解为多个独立的 `keyframe`。

### delay

`animation-delay` 的值可以为正值或负值，正值时会延迟动画的执行，而负值则会直接将动画从对应的时间开始播放，如 `duration` 为 3s，`delay` 为 -1s 时动画则会从 2s 的状态开始播放。

https://code.juejin.cn/pen/7148416008665956383

### direction

`animation-direction` 可以控制动画的方向，让动画正向或逆向进行。还可以使用 `alternate` 让动画进行正反向轮流播放。

https://code.juejin.cn/pen/7148420410143408158

### fill-mode

`animation-fill-mode` 用于控制动画停止时元素展示哪一帧的状态。默认会取消所有关键帧中的样式，可以使用 `forwards`、`backwards` 来应用第一或最后一帧，或使用 `both` 让其自动停在动画停止时的所在帧。

实测 `forwards` 也会让动画停止在停止的那一帧，不一定是最后一帧。

https://code.juejin.cn/pen/7148420928559382567

### iteration-count

`animation-iteration-count` 用于控制动画播放的次数，一般为正整数，可以使用 `infinite` 来让动画持续播放。另外还可以设置为小数。

https://code.juejin.cn/pen/7148424079941304352

### play-state

`animation-paly-state` 用于控制动画的播放状态，常见如 `hover` 时将其设置为 `running` 或 `hover` 来达到鼠标移入或移出才播放动画的效果。

https://code.juejin.cn/pen/7148424750325301259

### timing-function

`animation-timing-function` 和 `transition-timing-function` 相同，使用函数曲线来控制帧之间的数值计算。

## 小技巧

-   `animation-delay` 可以为负值，可以用来控制动画的初始化状态，但是需要注意，他会扣减你的动画总时间，比如你的 `duration` 为 2s，`count` 为 2，总动画时长则为 4s，如果将 `delay` 设置为 -3s，动画所剩的时间就只有 1s
-   `animation-delay` 只在首次动画开始时生效，如果循环动画想要在中间暂停，可以通过定义两个相同的关键帧来实现
-   如果动画较为复杂，建议将其拆解为多个 `keyframe`，然后在 `animation` 组合来实现，不然可能会导致 `keyframe` 较难维护

## 注意点

-   如果制作的是循环动画，一定要注意让起始关键帧和结束关键帧的展示一致，不然会导致切帧时的闪烁。
-   和渐变动画一样，为了更好的性能，应当尽量减少 `animation` 动画导致的重排或使用 `BFC` 缩小重排范围。

## 总结

虽然 `animation` 上手难度较渐变动画更高，但是能做到的事情也更多，可以更精细的控制动画的效果展现。其实动画最终难的不是使用，而是设计。