---
title: 可玩性超高的文字像素图 - 像素图转换器新增文字像素图功能
pubDate: '2022-10-22'
tags: []
---

# 可玩性超高的文字像素图 - 像素图转换器新增文字像素图功能

![picture 1](https://stg.heyfe.org/images/blog-text-shadow-pixel-image-8.png)

前排先提问，请问用 `CSS` 实现图中的效果需要多少需要几步？

之前只做了一个可以将图片转换为像素风格的转换器，并且可以使用 `box-shadow` 来实现一些特别的效果，这两天在其中加上了更有趣的实现方式：`text-shadow`。

所以答案是只需要两步，只需打开编辑器引入图片，然后修改为 `text-shadow` 模式即可直接导出样式。

## text-shadow

先介绍下 `text-shadow`，`text-shadow` 其实和 `box-shadow` 非常类似，同样是包括了横纵坐标、模糊距离和阴影颜色，并且一样可以直接设置多层：

```css
#target {
    text-shadow: 16px 16px 2px red, 0 0 1em blue, 0px 40px 2px #00ff16;
}
```

https://code.juejin.cn/pen/7156973456188244009

不过 `box-shadow` 和容器相关，所以会呈现出容器的形状，借助 `border-radius` 可以呈现出各种好玩的图形，比如方形、圆形甚至椭圆形。而其实从这个角度来说，`text-shadow` 比 `box-shadow` 更强大，因为他呈现的形状是由容器中的文字决定的，所以我们可以使用各种文字来控制他的呈现，比如各种字母、汉字甚至是 `emoji`。

## 编辑器实现

![picture 5](https://stg.heyfe.org/images/blog-text-shadow-pixel-image-18.png)

在像素编辑器中，我新增了一些与文字相关的选项，如 "使用 `text-shadow"` 用来开启 `text-shadow` 模式（默认为 `box-shadow`），"自定义 `text-shadow` 文字" 来控制 `text-shadow` 的图案文字，"`text-shadow` 文字比例" 用来控制 `text-shadow` 的尺寸（由于部分文字较小，如 `.*` 等，容易导致图案不清晰）。

当开启 `text-shadow` 选项是，编辑器将会根据 `canvas` 中的 `imageData` 来获取色块颜色，然后输出 `text-shadow` 样式，代码如下：

```js
const outputShadow = (size: number) => {
    const shadowArr = [];
    const ratio = imageDOM.naturalHeight / imageDOM.naturalWidth;
    for (let y = 0; y < precision * ratio; y++) {
        for (let x = 0; x < precision; x++) {
            const p = offscreenCtx.getImageData(x, y, 1, 1).data;
            if (dropTransparent && p[3] === 0) {
                continue;
            }
            if (dropWhite && p[3] !== 0 && p[0] === 255 && p[1] === 255 && p[2] === 255) {
                continue;
            }
            const colorInfo = [...p];
            colorInfo.length = 4;
            const color = dropAlpha
                ? '#' + ('000000' + rgbToHex(p[0], p[1], p[2])).slice(-6)
                : `rgba(${colorInfo.map((v, i) => (i === 3 ? +(v / 255).toFixed(3) : v)).join(',')})`;
            shadowArr.push(
                `${color} ${x * size}px ${y * size}px` +
                    (y === 0 && x === 0 ? (` 0 ${size}px` + textShadow ? '' : ` inset`) : '')
            );
        }
    }
    return randomShadow ? shuffle(shadowArr).join(',') : shadowArr.join(',');
};
```

通过遍历 `imageData` 数据，然后将其中的颜色取出，然后按照色块尺寸和 "`text-shadow` 文字比例" 选项中的比例来计算出内容。

不过要注意的是 `text-shadow` 和 `box-shadow` 有一个较大的差异点，之前也介绍过 `box-shadow` 本身会被容器本身遮挡，所以第一个色块会被遮住，解决方案有两个，一个是使用 `inset` 类型的 `box-shadow`，还有个办法是直接设置容器的背景色。而 `text-shadow` 不存在色块遮挡的问题，但是却存在被文字本身遮挡的问题，解决方案倒也简单，直接将容器的文字色设置为 `transparent` 即可。

## 使用案例

下面放几张制作的效果图：

使用 `#` 组成的我全都要

![picture 3](https://stg.heyfe.org/images/blog-text-shadow-pixel-image-59.png)

还有使用 `💩` 组成的熊猫头

![picture 4](https://stg.heyfe.org/images/blog-text-shadow-pixel-image-39.png)

是不是感觉很有意思 😂。

## 其它更新

编辑器中除了增加了对 `text-shadow` 的支持外，页面布局重新优化了一下，还增加了几个小动画：

![picture 2](https://stg.heyfe.org/images/blog-text-shadow-pixel-image-19.gif)

动画代码如下：

```css
.card-info .title {
    background: radial-gradient(circle, #80ffc1 0%, #ff6161 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: bg-move 2s infinite ease, bg-gradient 4s infinite linear;
    animation-direction: alternate, alternate;
    font-size: 2rem;
    margin: 0;
    line-height: 2.2em;
}
```

主要是用到了 `background-clip:text`，它会将背景按照文字进行裁切，这样便可以在文字中显示出背景，而在文字外隐藏背景。然后我们配合渐变背景，在动画中使用背景移动动画，即可实现漂亮的彩色文字效果。

```css
@keyframes bg-gradient {
    from {
        background-image: radial-gradient(circle, #80ffc1 0%, #ff6161 100%);
    }
    to {
        background-image: radial-gradient(circle, #e8e551 0%, #8a4fc5 100%);
    }
}
```

## 最后

像素图转换器在 GitHub 开源，链接如下：

-   GitHub 地址：https://github.com/ZxBing0066/pixel-converter
-   转换器地址：https://pixel.heyfe.org/
