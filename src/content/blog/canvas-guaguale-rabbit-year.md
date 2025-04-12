---
title: 几十行代码搞定刮刮乐
pubDate: '2023-02-09'
tags:
    - javascript
    - canvas
---

# 几十行代码搞定刮刮乐

今年是兔年，随手写个兔年祝福语刮刮乐，祝大家新年快乐（迟到的祝福）。

![picture 1](https://stg.heyfe.org/images/blog-canvas-guaguale-rabbit-year-16.gif)

## 刮刮乐设计

刮刮乐大家都知道，无论是实体票子的刮奖还是虚拟活动的电子刮奖基本都使用这种方式。我们先来做下刮刮乐的设计。

首先刮刮乐分为涂层和底下的中奖文字，所以我们也可以将其分为两层，这样可以减少渲染。底层使用一个文字涂层，上层使用一个 canvas 作为遮挡的刮奖层。当 canvas 上的颜色消失时我们的奖品文字自然就会展示出来了。

因此我们可以写下如下的结构代码：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>兔年刮刮乐</title>
    </head>

    <body>
        <div id="container">
            <div id="text"></div>
            <canvas id="canvas"></canvas>
        </div>
        <script src="./index.js"></script>
        <style>
            #container,
            #text,
            #canvas {
                position: absolute;
                width: 300px;
                height: 150px;
                user-select: none;
            }

            #container {
                position: relative;
                margin: 0 auto;
            }

            #text {
                text-align: center;
                font-size: 30px;
                font-weight: 900;
                display: flex;
                align-items: center;
                justify-content: center;
                letter-spacing: 1em;
                text-indent: 1em;
                color: rgb(246, 169, 3);
            }
        </style>
    </body>
</html>
```

我们讲文字和画布进行重叠。注意使用 user-select 来防止用户刮奖时 dom 被选中造成体验问题。

## 刮奖代码

然后开始我们的核心代码了，初始化时我们在文字涂层渲染上随机的兔年祝福语文字，然后在画布涂层涂上刮奖颜料颜色。

```js
const canvas = document.querySelector('#canvas');
const text = document.querySelector('#text');
const ctx = canvas.getContext('2d');

const sentances = ['兔然暴富', '兔年大吉', '兔飞猛进', '钱兔似锦', '大展宏兔', '扬眉兔气'];

text.innerText = sentances[(Math.random() * sentances.length) | 0];

canvas.width = 300;
canvas.height = 150;

ctx.fillStyle = '#eeddcc';
ctx.fillRect(0, 0, 300, 150);
```

然后就是刮奖时的渲染了，首先我们可能第一时间想到的是鼠标拖动时使用透明颜色覆盖经过的路径，不过由于透明颜色会和当前画布的颜色混合，所以最终什么都不会发生。再然后熟悉的同学可能就会想到绘制的混合模式：globalCompositeOperation，具体的可以在 [mdn](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation) 中进行查看，简单的说就是可以控制画布中绘制的内容与现有内容如何进行混合。此处我们用到的混合模式为 `destination-out`，他会将原图中的新图存在颜色的位置全部擦除，从而实现我们想要的刮刮乐效果。

```js
let brushing = false;

canvas.addEventListener('mousedown', e => {
    brushing = true;
});

document.addEventListener('mouseup', e => {
    brushing = false;
});

canvas.addEventListener('mousemove', e => {
    if (!brushing) return;

    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, 20, 0, 2 * Math.PI);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fill();
    ctx.closePath();
});
```

首先我们使用 brushing 来记录当前的鼠标状态，注意 mouseup 需要在 document 中绑定，避免移出后导致检测错误。然后我们在鼠标的移动路径上绘制上圆形，通过混合模式将该区域进行擦除即可。

## 开奖

上面我们已经基本完成了我们的刮刮乐效果，不过电子刮刮乐在最后还需要清空所有遮挡区域显示全部文字，这样可以让体验更好，如果要细致一点的实现会非常复杂，需要收集所有擦除区域的面积，然后计算占比，不过我们这里使用一种非常简单的方式来做这件事情。

```js
document.addEventListener('mouseup', e => {
    brushing = false;
    if (map.size > 50) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = '#eeddcc';
        ctx.fillRect(0, 0, 300, 150);
    }
});

const map = new Map();

canvas.addEventListener('mousemove', e => {
    if (!brushing) return;

    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, 20, 0, 2 * Math.PI);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fill();
    ctx.closePath();
    map.set(`${x}|${y}`, 1);
});
```

简单的说就是当擦除时，我们将擦除的坐标点进行记录，去重，然后在鼠标松开时，我们直接检测擦除的点的数量。这样就可以达到一个简单的开奖效果了。

## 最后

通过上述的设计，我们只需要简单的几十行代码就能实现一个完整的刮刮乐功能，是不是很赞呢～

-   源码地址: https://github.com/ZxBing0066/playground-public/tree/master/websites/canvas-guaguale
-   预览地址：https://playground.heyfe.org/canvas-guaguale/
