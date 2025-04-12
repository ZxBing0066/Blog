---
title: 复刻解析一个流光溢彩炫到掉渣的 CSS 动画按钮
pubDate: '2022-10-11'
tags:
    - css
    - 动画
---

最近在看 `next.js` 官网是被引流到 `conf` 页面，发现上面有一个炫酷的按钮，按钮的边框色彩不断变动给人感觉是光在随着按钮旋转一般，感觉挺酷的，复刻一下讲解下原理。

## 结构复刻

先复刻下结构，原版有非常多的 `DOM` 节点，而且按钮什么的都是通过定位去放到框里的，很容易在元素偏移时导致按钮跑出边框，咱复刻归复刻，顺路给他优化优化：

```html
<div class="shining-gradient-svg_wrapper">
    <div class="shining-gradient-svg_gradient shining-gradient-svg_rainbowGradient">
        <div class="shining-gradient-svg_childWrapper">
            <button class="cta-button_root reset_reset" type="button">
                <div class="avatar_avatarContainer">
                    <img
                        src="https://avatars.githubusercontent.com/ZxBing0066"
                        width="24"
                        height="24"
                        decoding="async"
                        class="avatar_avatar"
                    />
                </div>
                Go and explore
                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.3335 8H12.6668"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                    ></path>
                    <path
                        d="M8 3.33331L12.6667 7.99998L8 12.6666"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                    ></path>
                </svg>
            </button>
        </div>
    </div>
</div>
```

按钮中间空空荡荡会影响观感，所以我连内部的头像、文字、图标就一起复刻了。原版边框和按钮为同级，我这里改造下将按钮嵌入进去，所以后续代码与原版并不一致，但是自适应程度会好很多，不需要写死宽高、固定定位。

## 流光复刻

外层的样式随便写一下，为了让光彩更漂亮我们背景一样选择黑色，毕竟大白天的极光哪有晚上看起来好看。

```css
:root,
body {
    height: 100%;
    background-color: #000;
}

.shining-gradient-svg_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100%;
}
```

还有按钮的样式就随便抄一下，就一些 `border-radius`、`flex` 啥的，这里不贴了。

研究了下他的边框流光效果，发现其实并不是 `border` 或 `outline` 一类的东西，而是 `background`，然后通过 `-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);` 使用 `mask` 将内容区域进行遮挡，导致看起来只剩下一个边框。

```css
.shining-gradient-svg_wrapper {
    --full-gradient: radial-gradient(#c42d01 0%, #c42d01 10%, #fcf26e 40%, #00e754 60%, #00eef4 70%, #0070f3 100%);
}

.shining-gradient-svg_gradient:before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: calc(var(--b) * -1);
    height: 100%;
    width: 100%;
    background: var(--full-gradient);
    background-size: 300% 300%;
    padding: var(--b);
    border-radius: 32px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
}
```

在 `.shining-gradient-svg_gradient` 使用 `before` 伪元素，将其绝对定位，再通过 `inset` 和 `padding` 将其面积扩大，这里用了一个变量，方便控制溢出背景的大小。然后使用渐变背景，并将尺寸扩大到 3 倍。

再通过 `mask-composite` 和 `mask` 进行背景遮照，就可以将渐变背景变得只剩下边框。不过这俩属性兼容并不佳，其实有挺多其它方案来实现相同的效果，比如直接设置按钮区域的背景色，由于按钮区域层级在伪元素之上，中间的背景色直接就被覆盖了。

如果去掉背景截取，我们可以看到效果是这样：

![picture 1](https://stg.heyfe.org/images/blog-cool-gradient-next-js-conf-btn-2.png)

感觉还不错的样子。核心样式我们已经复刻完成了，我们再来加上动画。要制造出光线移动的效果，我们只需要慢慢的移动背景，由于渐变色颜色过渡都是循序渐进的，这样在只剩下边框时，就会有一种边框色在流动的感觉。

```css
@keyframes shining-gradient-svg_translateGradient {
    0% {
        background-position: -20% -20%;
    }

    25% {
        background-position: 30% 80%;
    }

    50% {
        background-position: 110% 110%;
    }

    75% {
        background-position: 80% 30%;
    }

    to {
        background-position: -20% -20%;
    }
}
.shining-gradient-svg_gradient:before {
    animation: shining-gradient-svg_translateGradient var(--animation-speed) linear infinite;
    will-change: background-position;
}
```

定义一下 `keyframes`，之前写过很多篇关于动画内容的，这里就不解释 `keyframes` 和 `animation` 中的属性了，此处可以加上 `will-change`，可以让浏览器提前知道哪些属性会变动，能有有利于浏览器性能。

## 总结

借助渐变背景色和背景移动动画，我们可以制造出这种边框光在边框中流动的感觉，感觉还是蛮有趣的。果然动画创意才是精髓。