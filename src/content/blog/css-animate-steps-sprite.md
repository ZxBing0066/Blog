---
title: css steps 动画应用 - 雪碧图动画
pubDate: '2022-10-18'
tags:
    - CSS
    - Animation
---

# css steps 动画应用 - 雪碧图动画

之前在时间函数那篇文章里有写到 `css` 动画除了支持贝塞尔曲线绘制平滑动画外，还支持使用 `steps` 来绘制定格/逐帧动画，但是一直没想到使用场景，直到前两天在网上看到一篇说合金弹头的帖子，突然想起来可以使用逐帧动画配合雪碧图，就可以很轻松的实现游戏中常见的雪碧图动画了，说干就干，下面我们一起来试一下。

## 雪碧图

雪碧图就是将很多小的图片素材拼凑成一张大图，当需要使用其中一个素材时就直接将大图设置为背景图，然后通过 `background-position` 来指定显示的位置渲染对应的小图。

早期的 `web` 开发中经常会使用雪碧图来减少图片数量，避免过多的图片请求，而现在雪碧图在 `web` 开发中其实已经很少会使用，因为随着工程化的健全和 `http2.0` 的普及，小图大部分会被直接转成 `base64` 编码直接打包进代码中，而大图使用雪碧图的话在更新时会导致缓存失效率过高，而且存在图片过大的问题，所以已经很少会见到。

## 逐帧动画

逐帧动画在以前的小游戏中经常会被使用，所以以前的游戏素材中会看到很多的小图，这些小图拼在一起只要保证小图切换够快就会行成动画，就和在影院看电影一样，都是一幅幅图片给人留下的视觉残留。

## 实操

下面我们就来实操使用 `css steps` 来制作一个雪碧图动画，首先要找到一张雪碧图，这个可以上网搜一搜，我这边随便找了一个洛克人的雪碧图。找到雪碧图后我们需要测量一下每一帧的大小，大部分的动画雪碧图会等分每一帧，但是如果不幸找了一张非等分的（我就是 🤦‍♂️），可能就需要费点劲将每个帧对应的 `background-size` 测量出来。

定义好容器的大小，背景图后，我们在 `keyframes` 中定义关键帧即可，由于我的雪碧图不太标准，无奈我只能定义多个关键帧：

```css
#rock {
    width: 130px;
    height: 120px;
    background-image: url(https://www.gamedesigning.org/wp-content/uploads/2020/10/Sprite-Sheet.jpg);
    background-position: -20px 0;
}
@keyframes rock {
    0%,
    to {
        background-position: -20px -10px;
    }
    10% {
        background-position: -136px -10px;
    }
    20% {
        background-position: -252px -10px;
    }
    30% {
        background-position: -368px -10px;
    }
    40% {
        background-position: -494px -10px;
    }
    50% {
        background-position: -20px -132px;
    }
    60% {
        background-position: -136px -132px;
    }
    70% {
        background-position: -252px -132px;
    }
    80% {
        background-position: -368px -132px;
    }
    90% {
        background-position: -494px -132px;
    }
}
```

如果你找到的雪碧图很规范，大可不必这么麻烦，直接定义第一帧和倒数第二帧的位置即可，当然你也可以配合使用 `jump-both` 直接定义倒数第一帧。

```css
@keyframes your-sprite-ani {
    0%,
    to% {
        background-position: 0 0;
    }
    90% {
        background-position: -1000px;
    }
}
```

注意定义的关键帧百分比分布由你的雪碧图的总帧数来决定，比如我的雪碧图由 10 张小图组成，所以我的百分比为 10% 一份。

定义好动画后我们直接为动画容器添加上：

```css
@keyframes rock {
    animation: 0.8s infinite steps(1, start) rock;
}
```

注意这里的 `steps` 数量时每个关键帧中切换所需要的数量，因为我的雪碧图不标准，所以我是在关键帧定义中写死了位置，每一帧只需要一个 `step`，如果你是标准动画雪碧图，记得将其改为你的动画关键帧数量。

修改完成后我们就能看到这样一个动起来的小洛克人：

![picture 1](https://stg.heyfe.org/images/blog-css-animate-steps-sprite-49.gif)

不过原地跑步有点奇怪 🤔，还是给他加个移动效果吧：

```css
#rock {
    width: 130px;
    height: 120px;
    background-image: url(https://www.gamedesigning.org/wp-content/uploads/2020/10/Sprite-Sheet.jpg);
    background-position: -20px 0;
    position: absolute;
    animation: 0.8s infinite steps(1, start) rock, 10s infinite linear move;
}
@keyframes move {
    0% {
        left: 0;
    }
    100% {
        left: 100%;
    }
}
```

为了让跑步自然一点，记得把时间曲线修改为线性函数，不然你会发现他时快时慢 😂。

![picture 2](https://stg.heyfe.org/images/blog-css-animate-steps-sprite-94.gif)

动画完成，不过还是有一丢丢奇怪，我们再来给他加个折返跑，不然感觉像洛克人学会了瞬间移动，不过我们只有一张雪碧图，没有折返跑的雪碧图，但是不怕，我们有 `CSS`，直接给他来个镜像翻转：

```css
@keyframes move {
    0% {
        left: -10%;
    }
    50% {
        left: 110%;
        transform: rotateY(180deg);
    }
    100% {
        left: -10%;
        transform: rotateY(180deg);
    }
}
```

![picture 3](https://stg.heyfe.org/images/blog-css-animate-steps-sprite-79.gif)

我晕，😂 这不对劲，忘了从 0% 到 50% 反转也会有动画了，优化一下：

```css
@keyframes move {
    0% {
        left: -10%;
    }
    49% {
        left: 110%;
        transform: rotateY(0deg);
    }
    50% {
        left: 110%;
        transform: rotateY(180deg);
    }
    100% {
        left: -10%;
        transform: rotateY(180deg);
    }
}
```

总算是正常了，可以看下效果和代码：

https://code.juejin.cn/pen/7155478158421016590

## 不一定要雪碧图

当然我们也可以看到，`steps` 动画本身是按照 `keyframes` 中定义的关键帧来切换的，如果 `step` 为 1 时，其实不使用雪碧图也是可以的，我们可以直接像一些小游戏一样，将人物状态拆成多张图片，然后直接在 `keyframes` 中切换 `background-image`，不过这样得在动画前预先做好图片预加载，否则可能会导致人物跑着跑着某一帧变成空白图片的问题。

## 总结

`css steps` 动画的使用场景应该还有一些，只是个人接触的较少，想不到更多了 🤦‍♂️。最近掘金在搞创意挑战赛，学会使用 `css` 逐帧动画，不妨去试试。
