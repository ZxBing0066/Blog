---
lastUpdate: 2023-7-31
date: 2023-2-4
tags: [three.js]
cover: https://stg.heyfe.org/images/blog-three-js-rabbit-0-1690812321314.png
---

# 使用 GUI 方便 three.js 开发调试

上一篇聊到如何调用模型中的内置动画从而让模型动起来，而该模型中其实有两个动画，而我们只看到了其中一种。本篇我们聊一聊如何使用 GUI 方便我们调试 three.js，操控界面参数。

一般而言，three.js 生态常用到两个 GUI 库，一个 [DAT.GUI](https://www.npmjs.com/package/dat.gui)，还有一个是近期被 three.js 内置的 [lil.gui](https://lil-gui.georgealways.com/)。两个库主要都是为了方便通过 UI 来调试参数，实时看到效果，从而方便开发。本篇主要使用 lil.gui，下面简称 GUI。

## lil.gui

要使用 GUI 我们首先需要先进行实例化。

```ts
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const panel = new GUI({ width: 310 });
```

然后我们就可以在右上角看到这样一个操控面板，不过此时还没有任何内容：

![picture 1](https://stg.heyfe.org/images/blog-three-js-rabbit-2-33.png)

上面我们只设置了 width，此外它还提供了其它很多自定义参数，可查看 [GUI Class 文档](https://lil-gui.georgealways.com/#GUI)。

面板创建完成后，我们就可以尝试为其增加操控项，比如要控制页面的 title 展示，我们可以这样：

```ts
panel.add(document, 'title');
```

此时就会出现这样的一条操控项，并且当你修改后会看到页面的 title 会跟着变化，这也是为什么 GUI 的 API 设计成这样的原因：这样可以方便的拿到引用进行赋值从而达到一种双向绑定的效果。

![picture 2](https://stg.heyfe.org/images/blog-three-js-rabbit-2-12.png)

## GUI 新增操控项

GUI 新增操控项是什么形式按照传入的类型来进行判断的。

```ts
const controllers = {
    myBoolean: true,
    myString: 'lil-gui',
    myNumber: 1,
    myFunction: function () {
        alert('hi');
    }
};

gui.add(controllers, 'myBoolean'); // checkbox
gui.add(controllers, 'myString'); // text field
gui.add(controllers, 'myNumber'); // number field
gui.add(controllers, 'myFunction'); // button
```

-   当值为 boolean 时，则展示为 checkbox
-   当值为 string 时，则展示为 input 输入框
-   当值为 number 时，则展示为数字输入框
-   当值为 function 时，则展示为按钮，点击按钮会调用该 function

![picture 3](https://stg.heyfe.org/images/blog-three-js-rabbit-2-68.png)

此外当类型为 number 时，可以通过 min 和 max 设定最大最小值、step 设定步进值。

当然，还可以直接通过 add 增加参数将其设置为 slider，更方便操作：

```ts
obj = { number1: 1, number2: 50 };

gui.add(obj, 'number1', 0, 1); // min, max
gui.add(obj, 'number2', 0, 100, 10); // min, max, step
```

![picture 4](https://stg.heyfe.org/images/blog-three-js-rabbit-2-63.png)

另外 GUI 还支持颜色项、下拉菜单项以及用于将项目分组的文件夹项。

## 操控 three.js

介绍完 GUI，我们看看怎么利用 GUI 来方便我们调试 three.js，操控我们的小兔子。

我们先看下需要 GUI 操控那些部分：

-   这个兔子模型因为内置两种动画，我们需要有按钮来切换动画
-   模型较大，需要有 slider 方便调试 scale 的大小
-   需要有 slider 来调试模型的方向
-   通过颜色菜单控制场景的背景色

梳理清楚后我们就可以很快写出如下代码：

```ts
const controller = {
    idle: () => {
        idleAction.play();
        walkAction.stop();
    },
    walk: () => {
        walkAction.play();
        idleAction.stop();
    },
    scale: 0.4,
    rotateY: Math.PI / 2
};

const createPanel = () => {
    const panel = new GUI({ width: 310 });
    panel.add(document, 'title');
    panel.add(controller, 'idle');
    panel.add(controller, 'walk');
    panel.add(controller, 'scale', 0.1, 2, 0.01).onChange(value => {
        model.scale.set(value, value, value);
    });
    panel.add(controller, 'rotateY', -Math.PI, Math.PI, 0.1).onChange(value => {
        model.rotation.set(0, value, 0);
    });
    const colorFormats = {
        string: '#000000',
        int: 0x000000,
        object: { r: 1, g: 1, b: 1 },
        array: [1, 1, 1]
    };
    panel.addColor(colorFormats, 'string').onChange(value => {
        app.scene.background = new THREE.Color(value);
    });
};
```

这里有几个注意点：

-   动画切换时我们需要停止当前动画，因为在 three.js 中多个动画动作是可以同时发生的。
-   由于操控的 scale 和 rotateY 都无法直接赋值，当值变化时我们需要监听 onChange 然后进行处理。
-   不同于其它操控项，颜色类型需要使用 addColor 来进行添加。
-   设定背景色需要使用 THREE.Color 来实例化，不能直接赋值字符串。

好了，我们看下效果。

![picture 6](https://stg.heyfe.org/images/blog-three-js-rabbit-2-8.gif)

## 最后

本篇我们介绍了通过 GUI 方便的开发调试 three.js，此外还介绍了如何更新 scale、rotateY、background 以及如何切换动画。当然 GUI 库本身并不局限于 three.js 场景下，如果你的其他应用程序也存在此类调试场景，也可以直接使用。

-   源码地址: https://github.com/ZxBing0066/playground-public/tree/master/three-js-rabbit-2
-   预览地址：https://playground.heyfe.org/three-js-rabbit-2/
