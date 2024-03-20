---
lastUpdate: 2022-9-16
date: 2022-9-16
tags: ['CSS', 'Animation']
---

# 几个 div，一段 css，还你一个活灵活现的可爱小幽灵 👻

前排先放效果图，通过几个 div 的拼接，和 css 的样式加成，便可制作出这样一个可爱的小幽灵。下面一起看下制作过程吧。

## 结构确定

首先看下我们的小幽灵主要分为两部分，一个是他的身体，一个是他周围的装饰物。身体主要由眼睛 👀、身体、脚组成。即可确定如下 dom 结构。

```html
<div class="ghost-box">
    <div class="ghost">
        <div class="ghost-eyes">
            <div class="eye-left"></div>
            <div class="eye-right"></div>
        </div>
        <div class="ghost-footer">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</div>
```

然后我们再在 box 中添加几个 div 用作装饰，再添加一个 div 用作小幽灵底部的小光阴，增加一些趣味。

```html
<div class="symbol"></div>
<div class="symbol"></div>
<div class="symbol"></div>
<div class="symbol"></div>
<div class="symbol"></div>
<div class="symbol"></div>
<div class="ghost-shadow"></div>
```

## 样式

然后我们再确定下小幽灵的身体颜色和眼睛颜色，以及整个背景色、光影的颜色。

```css
:root {
    --color-eyes: white;
    --color-body: #d4e8ee;
    --color-background: #131a24;
    --color-shadow: rgb(230, 211, 211);
    background-color: var(--color-background);
}
```

因为幽灵 👻 一般夜间出没，所以背景选择暗色，给个淡淡的蓝色作为幽灵身体的颜色，光影用淡淡的颜色，眼睛就偷懒直接弄成白色了。

```css
.ghost-box {
    padding: 15px 25px 25px;
    width: 150px;
    position: relative;
    box-sizing: border-box;
}
.ghost-box * {
    box-sizing: border-box;
}
.ghost-box .ghost {
    background: var(--color-body);
    width: 100px;
    border-radius: 100px 100px 0 0;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 20px;
    height: 130px;
    background-clip: content-box;
}
.ghost-box .ghost .ghost-eyes {
    position: absolute;
    left: 50%;
    top: 30%;
    height: 12px;
    width: 70px;
    transition: all 0.05s ease-out;
}
.ghost-box .ghost .ghost-eyes .eye-left,
.ghost-box .ghost .ghost-eyes .eye-right {
    width: 12px;
    height: 12px;
    background: var(--color-eyes);
    border-radius: 50%;
    margin: 0 10px;
    position: absolute;
}
.ghost-box .ghost .ghost-eyes .eye-left {
    left: 0;
}
.ghost-box .ghost .ghost-eyes .eye-right {
    right: 0;
}
.ghost-box .ghost .ghost-footer {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}
.ghost-box .ghost .ghost-footer div {
    flex-grow: 1;
    position: relative;
    top: -10px;
    height: 20px;
    border-radius: 100%;
    background-color: var(--color-body);
}
.ghost-box .ghost .ghost-footer div:nth-child(2n) {
    top: -12px;
    margin: 0 0px;
    border-top: 15px solid var(--color-background);
    background: transparent;
}
```

通过上面一段简单的样式，即可画出小幽灵的身体、眼睛、脚等部位，脚为了做出波浪的感觉，采用了与背景色相同的颜色来做遮挡。

然后通过如下样式，绘制出圆、十字、叉号几种样式。

```css
.ghost-box .symbol:nth-child(1) {
    opacity: 0.2;
}
.ghost-box .symbol:nth-child(1):before,
.ghost-box .symbol:nth-child(1):after {
    content: '';
    width: 12px;
    height: 4px;
    background: var(--color-body);
    position: absolute;
    border-radius: 5px;
    bottom: 65px;
    left: 0;
}
.ghost-box .symbol:nth-child(1):before {
    transform: rotate(45deg);
}
.ghost-box .symbol:nth-child(1):after {
    transform: rotate(-45deg);
}
.ghost-box .symbol:nth-child(2) {
    position: absolute;
    left: -5px;
    top: 30px;
    height: 18px;
    width: 18px;
    border: 4px solid;
    border-radius: 50%;
    border-color: var(--color-body);
    opacity: 0.2;
}
.ghost-box .symbol:nth-child(3) {
    opacity: 0.2;
}
.ghost-box .symbol:nth-child(3):before,
.ghost-box .symbol:nth-child(3):after {
    content: '';
    width: 12px;
    height: 4px;
    background: var(--color-body);
    position: absolute;
    border-radius: 5px;
    top: 5px;
    left: 40px;
}
.ghost-box .symbol:nth-child(3):before {
    transform: rotate(90deg);
}
.ghost-box .symbol:nth-child(3):after {
    transform: rotate(180deg);
}
.ghost-box .symbol:nth-child(4) {
    opacity: 0.2;
}
.ghost-box .symbol:nth-child(4):before,
.ghost-box .symbol:nth-child(4):after {
    content: '';
    width: 15px;
    height: 4px;
    background: var(--color-body);
    position: absolute;
    border-radius: 5px;
    top: 10px;
    right: 30px;
}
.ghost-box .symbol:nth-child(4):before {
    transform: rotate(45deg);
}
.ghost-box .symbol:nth-child(4):after {
    transform: rotate(-45deg);
}
.ghost-box .symbol:nth-child(5) {
    position: absolute;
    right: 5px;
    top: 40px;
    height: 12px;
    width: 12px;
    border: 3px solid;
    border-radius: 50%;
    border-color: var(--color-body);
    opacity: 0.2;
}
.ghost-box .symbol:nth-child(6) {
    opacity: 0.2;
}
.ghost-box .symbol:nth-child(6):before,
.ghost-box .symbol:nth-child(6):after {
    content: '';
    width: 15px;
    height: 4px;
    background: var(--color-body);
    position: absolute;
    border-radius: 5px;
    bottom: 65px;
    right: -5px;
}
.ghost-box .symbol:nth-child(6):before {
    transform: rotate(90deg);
}
.ghost-box .symbol:nth-child(6):after {
    transform: rotate(180deg);
}
```

再通过 box-shadow 绘制出小幽灵的光影：

```css
.ghost-box .ghost-shadow {
    height: 20px;
    box-shadow: 0 50px 15px 5px var(--color-shadow);
    border-radius: 50%;
    margin: 0 auto;
}
```

通过高度压扁，设置 border-radius，制造一个椭圆形，然后通过 box-shadow 制造出立体光圈的感觉。

## 动画

为了让小幽灵更活灵活现，我们简单的为其添加一些动画：

```css
@keyframes ghost-float {
    0%,
    to {
        opacity: 0;
        transform: translateY(5px) scale(0.9);
    }
    50% {
        opacity: 1;
        transform: translateY(15px) scale(1);
    }
}
.ghost-box .ghost {
    animation: ghost-float 8s ease-in-out infinite;
}
```

先给小幽灵增加一些小动画，忽隐忽现、上下移动，加上一些细微的大小变化。

```css
@keyframes ghost-shadow {
    0%,
    to {
        opacity: 0;
        transform: scale(0.8);
    }
    50% {
        opacity: 1;
        transform: scale(1);
    }
}
.ghost-box .ghost-shadow {
    animation: ghost-shadow 8s ease-in-out infinite;
}
```

给光影也加上类似的动画，注意要和小幽灵动画保持同步，毕竟光阴是小幽灵带来的。

```css
@keyframes ghost-eyes {
    0%,
    to {
        left: 0%;
    }
    40%,
    60% {
        left: 30%;
    }
}
.ghost-box .ghost .ghost-eyes {
    animation: ghost-eyes 5s ease-in-out infinite;
}
```

然后给眼睛一点移动动画，让小幽灵有活着的感觉。点睛之笔 👀

最后我们给周围的小装饰也来点动画：

```css
@keyframes shine {
    0%,
    to {
        box-shadow: #fff 0 0 5px;
        opacity: 1;
    }
    50% {
        box-shadow: #fff 0 0;
        opacity: 0;
    }
}
.ghost-box .symbol:nth-child(1) {
    opacity: 0.2;
    animation: shine 4s ease-in-out 3s infinite;
}
```

然后给不同的小装饰给不同的动画时常，可以让动画随机感更强，看起来更有趣、真实。

## 总结

好了，以上就是小幽灵的绘制过程了，有兴趣的同学也可以对小幽灵进行改造，换个皮肤什么的。
