---
lastUpdate: 2023-7-31
date: 2022-9-16
tags: ['CSS']
---

# 给我一个 div + 三行 css，还你一个超级马里奥

前排先上效果图。

如上的马里奥，只需要一个 div 加上三行 css 即可实现，一起看看吧。

## 实现原理

要靠一个 div 实现如上效果，我们就要借助一个神奇的 css 属性：box-shadow。box-shadow 可以传入多个阴影值，通过阴影量的偏移，即可实现类似色块的效果。

```css
#div {
    box-shadow: 6em 0em red, 8em 0em blue, 10em 0 yellow;
}
```

将阴影的 spread 和 blur 设置为 0，即可制造出一个与目标 div 相同大小的色块，然后通过 x、y offset 设置阴影的偏移量，即可控制色块的位置，一个马赛克图就诞生了。

所以要实现一个马赛克马里奥，只需要一个 div：

```html
<div id="mario" />
```

加上三行 css：

```css
#mario {
    width: 1em;
    height: 1em;
    box-shadow: 6em 0em 1px red, 7em 0em 1px red, 8em 0em 1px red, 9em 0em 1px red, 10em 0em 1px red, 11em 0em 1px red,
        5em 1em 1px red, 6em 1em 1px red, 7em 1em 1px red, 8em 1em 1px red, 9em 1em 1px red, 10em 1em 1px red,
        11em 1em 1px red, 12em 1em 1px red, 13em 1em 1px red, 14em 1em 1px red, 11em 2em 1px #3e2d2b, 12em 2em 1px
            #fbba2d, 5em 2em 1px #3e2d2b, 6em 2em 1px #3e2d2b, 7em 2em 1px #3e2d2b, 8em 2em 1px #fbba2d,
        9em 2em 1px #fbba2d, 10em 2em 1px #fbba2d, 4em 3em 1px #3e2d2b, 5em 3em 1px #fbba2d, 11em 3em 1px #3e2d2b, 6em
            3em 1px #3e2d2b, 7em 3em 1px #3e2d2b, 8em 3em 1px #fbba2d, 9em 3em 1px #fbba2d, 10em 3em 1px #fbba2d,
        12em 3em 1px #fbba2d, 13em 3em 1px #fbba2d, 14em 3em 1px #fbba2d, 4em 4em 1px #3e2d2b, 5em 4em 1px #fbba2d, 12em
            4em 1px #3e2d2b, 6em 4em 1px #3e2d2b, 7em 4em 1px #3e2d2b, 8em 4em 1px #fbba2d, 9em 4em 1px #fbba2d,
        10em 4em 1px #fbba2d, 11em 4em 1px #fbba2d, 13em 4em 1px #fbba2d, 14em 4em 1px #fbba2d, 15em 4em 1px #fbba2d, 4em
            5em 1px #3e2d2b, 5em 5em 1px #3e2d2b, 6em 5em 1px #fbba2d, 7em 5em 1px #fbba2d, 8em 5em 1px #fbba2d,
        9em 5em 1px #fbba2d, 10em 5em 1px #fbba2d, 11em 5em 1px #3e2d2b, 12em 5em 1px #3e2d2b, 13em 5em 1px #3e2d2b, 14em
            5em 1px #3e2d2b, 6em 6em 1px #fbba2d, 7em 6em 1px #fbba2d, 8em 6em 1px #fbba2d, 9em 6em 1px #fbba2d,
        10em 6em 1px #fbba2d, 11em 6em 1px #fbba2d, 12em 6em 1px #fbba2d, 13em 6em 1px #fbba2d, 5em 7em 1px red, 6em 7em
            1px red, 7em 7em 1px #37448e, 8em 7em 1px #37448e, 9em 7em 1px red, 10em 7em 1px red, 11em 7em 1px red, 12em
            7em 1px red, 11em 8em 1px #37448e, 4em 8em 1px red, 5em 8em 1px red, 6em 8em 1px red, 7em 8em 1px #37448e, 8em
            8em 1px #37448e, 9em 8em 1px red, 10em 8em 1px red, 12em 8em 1px red, 13em 8em 1px red, 14em 8em 1px red, 11em
            9em 1px #37448e, 3em 9em 1px red, 4em 9em 1px red, 5em 9em 1px red, 6em 9em 1px red, 7em 9em 1px #37448e, 8em
            9em 1px #37448e, 9em 9em 1px red, 10em 9em 1px red, 12em 9em 1px red, 13em 9em 1px red, 14em 9em 1px red, 15em
            9em 1px red, 5em 10em 1px red, 6em 10em 1px #37448e, 11em 10em 1px #fcea3d, 12em 10em 1px #37448e,
        13em 10em 1px red, 2em 10em 1px #fbba2d, 3em 10em 1px #fbba2d, 4em 10em 1px #fbba2d, 7em 10em 1px #fcea3d, 8em
            10em 1px #fcea3d, 9em 10em 1px #37448e, 10em 10em 1px #37448e, 14em 10em 1px #fbba2d, 15em 10em 1px #fbba2d,
        16em 10em 1px #fbba2d, 2em 11em 1px #fbba2d, 3em 11em 1px #fbba2d, 4em 11em 1px #fbba2d, 5em 11em 1px #fbba2d, 6em
            11em 1px #37448e, 7em 11em 1px #37448e, 8em 11em 1px #37448e, 9em 11em 1px #37448e, 10em 11em 1px #37448e,
        11em 11em 1px #37448e, 12em 11em 1px #37448e, 13em 11em 1px #fbba2d, 14em 11em 1px #fbba2d,
        15em 11em 1px #fbba2d, 16em 11em 1px #fbba2d, 2em 12em 1px #fbba2d, 3em 12em 1px #fbba2d, 4em 12em 1px #fbba2d, 5em
            12em 1px #37448e, 6em 12em 1px #37448e, 7em 12em 1px #37448e, 8em 12em 1px #37448e, 9em 12em 1px #37448e,
        10em 12em 1px #37448e, 11em 12em 1px #37448e, 12em 12em 1px #37448e, 13em 12em 1px #37448e,
        14em 12em 1px #fbba2d, 15em 12em 1px #fbba2d, 16em 12em 1px #fbba2d, 2em 13em 1px #fbba2d, 3em 13em 1px #fbba2d,
        4em 13em 1px #fbba2d, 5em 13em 1px #37448e, 6em 13em 1px #37448e, 7em 13em 1px #37448e, 8em 13em 1px #37448e,
        9em 13em 1px #37448e, 10em 13em 1px #37448e, 11em 13em 1px #37448e, 12em 13em 1px #37448e, 13em 13em 1px #37448e,
        14em 13em 1px #fbba2d, 15em 13em 1px #fbba2d, 16em 13em 1px #fbba2d, 5em 14em 1px #37448e, 6em 14em 1px #37448e,
        7em 14em 1px #37448e, 11em 14em 1px #37448e, 12em 14em 1px #37448e, 13em 14em 1px #37448e, 4em 15em 1px #3e2d2b,
        5em 15em 1px #3e2d2b, 6em 15em 1px #3e2d2b, 12em 15em 1px #3e2d2b, 13em 15em 1px #3e2d2b, 14em 15em 1px #3e2d2b,
        3em 16em 1px #3e2d2b, 4em 16em 1px #3e2d2b, 5em 16em 1px #3e2d2b, 6em 16em 1px #3e2d2b, 12em 16em 1px #3e2d2b, 13em
            16em 1px #3e2d2b, 14em 16em 1px #3e2d2b, 15em 16em 1px #3e2d2b;
}
```

为了让马赛克更马赛克，我将所有阴影的 blur 设置为 1px，这样在色块的交接处会形成 1px 的线条，制造出方块感。

## 绘制过程

先看下参考的原图：

![picture 1](https://stg.heyfe.org/images/blog-css-mosaic-mario-70.png)

要绘制马里奥，我们需要照着图，将图进行格子化，然后一个格子一个格子的绘制。。。。 那是不可能的！

作为一个程序员，这么多色块都要手动绘制，开玩笑，这不是折磨人吗。

所以我直接将上方的原图整理成了如下的数据：

```js
const red = 'red';
const black = '#3e2d2b';
const orange = '#fbba2d';
const yellow = '#fcea3d';
const blue = '#37448e';

const define = [
    { '6-11': red },
    { '5-14': red },
    { '5-7': black, '8-10': orange, 11: black, 12: orange },
    { 4: black, 5: orange, '6-7': black, '8-10': orange, 11: black, '12-14': orange },
    { 4: black, 5: orange, '6-7': black, '8-11': orange, 12: black, '13-15': orange },
    { '4-5': black, '6-10': orange, '11-14': black },
    { '6-13': orange },
    { '5-6': red, '7-8': blue, '9-12': red },
    { '4-6': red, '7-8': blue, '9-10': red, 11: blue, '12-14': red },
    { '3-6': red, '7-8': blue, '9-10': red, 11: blue, '12-15': red },
    { '2-4': orange, 5: red, 6: blue, '7-8': yellow, '9-10': blue, 11: yellow, 12: blue, 13: red, '14-16': orange },
    { '2-5': orange, '6-12': blue, '13-16': orange },
    { '2-4': orange, '5-13': blue, '14-16': orange },
    { '2-4': orange, '5-13': blue, '14-16': orange },
    { '5-7': blue, '11-13': blue },
    { '4-6': black, '12-14': black },
    { '3-6': black, '12-15': black }
];
```

首先定义好要用到的颜色，然后通过 define 来定义图片的属性，每个数组元素代表一行色块，然后通过 `start-end` 来定义一个色条，这样大大减少了枯燥的绘制过程。

将图片转换为数据定义后，再通过如下代码，将定义生成为 box-shadow 属性：

```js
const output = define
    .map((lineDefine, row) => {
        let line = [];
        for (const key in lineDefine) {
            const range = key.split('-');
            let [start, end] = range.map(v => +v);
            if (!end) end = start;
            // console.log(start, end, lineDefine[key]);
            for (let col = start; col <= end; col++) {
                // console.log(line);
                line.push(`${col}em ${row}em 1px ${lineDefine[key]}`);
            }
        }
        return line.join(',');
    })
    .join(',');
```

一个马里奥马赛克就诞生啦。

## 注意事项

不过有一点需要注意的是，如果你的原点需要绘制像素点，通过这种方法是不行的，因为阴影只能在原 div 的外部展示，所以绘制时一定要注意，当然如果你一定要绘制的话也可以通过其它方法：

-   为 div 直接设置背景色
-   将 第一个点的阴影修改为内阴影

## 进阶

除此之外，我们还可以通过 em 单位，来方便的控制马赛克图的大小，因为色块的大小按照原 div 来定义，所以我们只需要修改原 div 的大小，所有色块的大小便会同步变化，然后将色块的偏移量也适用 em 来控制，即可实现通过修改原 div 的字体大小达到变更马赛克图大小的目的。

此外我们的色块也不一定要是正方形，我们还可以通过 border-radius，为原 div 增加弧度，这样每个色块也会跟着变化。

此外我们还可以修改原 div 的宽高比例，同步变更阴影中 x、y 的 offset 的比例，即可制造出长方形马赛克、椭圆形马赛克等。
