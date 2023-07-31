---
tags: [three.js]
cover: https://stg.heyfe.org/images/blog-three-js-rabbit-0-1690812321314.png
---

# 让 three.js 中的 🐰 模型动起来

上一篇我们聊了关于在 three.js 如何使用模型快速渲染出一只兔子，以及 three.js 中的一些基础知识，这篇我们聊聊怎么简单的让兔子模型动起来。

![picture 5](https://stg.heyfe.org/images/blog-three-js-rabbit-1-43.gif)

## 模型动画

一般而言模型中都保存有内置动画，而要调用这些内置动画我们需要取出其中的动画信息，调用合成器进行动画合成。

为了展示动画效果，本次使用的模型是：[兔子模型](https://sketchfab.com/3d-models/rabbit-rigged-e7213589744d436b9d96e2dbb31198a5)

![picture 4](https://stg.heyfe.org/images/blog-three-js-rabbit-1-62.png)

```ts
loader.load(
    new URL('/assets/rabbit.glb', import.meta.url) + '',
    function (gltf) {
        gltf.scene.rotateY(Math.PI / 2);
        gltf.scene.scale.set(0.4, 0.4, 0.4);
        app.scene.add(gltf.scene);

        const animations = gltf.animations;
        console.log(animations);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);
```

由于而该模型默认的朝向是向前，然后尺寸较大，所以这边加载完成后做了一些默认处理：

1. 通过 `gltf.scene.rotateY(Math.PI / 2);` 将模型旋转 90 度，注意此处 rotateY 是一个 function，而 position.x 等则是变量，所以修改方式不同。然后旋转值接受的值均为 angle，不是我们常用的角度。
2. 通过 `scale.set(0.4, 0.4, 0.4);` 将模型变小，此处又是一种新的 API 风格，😂。

模型内置的动画信息存储在模型的 animations 中，该属性为一个数组，可以打印出来看下：

![picture 2](https://stg.heyfe.org/images/blog-three-js-rabbit-1-60.png)

可以看到 animation 中存储了包括动画的混合模式、动画时长、动画信息等。

## mixer

```ts
let idleAction, walkAction, mixer;
loader.load(
    new URL('/assets/rabbit.glb', import.meta.url) + '',
    function (gltf) {
        mixer = new THREE.AnimationMixer(gltf.scene);

        walkAction = mixer.clipAction(animations[0]);
        walkAction.play();
        render();
    },
    undefined,
    function (error) {
        console.error(error);
    }
);
```

three.js 执行动画我们需要创建一个 mixer，然后将内置动画信息通过 mixer clip 创建 action，然后我们就可以直接使用 play 来播放对应的动画了。mixer 可以认为是一种特殊的播放器，他可以读取动画轨迹，然后按照当前时钟渲染对应的模型状态。

不过此时你还无法看到动画，因为我们还需要自行创建动画的更新，所以我们使用 requestAnimationFrame 来执行动画更新：

```ts
const clock = new THREE.Clock();
const render = () => {
    const delta = clock.getDelta();
    mixer.update(delta);
    app.renderer.render(app.scene, app.camera);
    app.controls.update();
    requestAnimationFrame(render);
};
```

此处我们通过 clock 来获取一个内部时钟，然后让 mixer 按照当前时钟来执行对应的动画信息。此时便可以看到我们的小兔子动画动起来了，注意不要忘记了使用 requestAnimationFrame。

## 最后

本篇我们介绍了通过 mixer、clock 和 requestAnimationFrame 调用模型内部的动画，使其动起来。

-   源码地址: https://github.com/ZxBing0066/playground-public/tree/master/three-js-rabbit-1
-   预览地址：https://playground.heyfe.org/three-js-rabbit-1/
