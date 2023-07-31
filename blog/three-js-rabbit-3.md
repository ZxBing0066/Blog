# three.js 模型动画控制、混合、状态面板

上一篇我们聊了如何使用 GUI 方便我们调试 three.js，本篇聊一聊如何控制模型动画，将多个动画进行混合，以及程序的状态面板。

## 程序状态面板

three.js 内置了相当丰富的工具链，其中包含了程序状态的面板 Stats，可以展示程序的 FPS、内存占用、单帧耗时。

要使用帧率面板，首先我们需要导入 Stats 模块实例化，然后将 dom 添加到容器 dom 中：

```ts
import Stats from 'three/examples/jsm/libs/stats.module.js';
let stats;

const init = () => {
    stats = Stats();
    app.el.appendChild(stats.dom);
};
```

然后记得要在 render 时更新 stats。

```ts
const render = () => {
    stats.update();
    requestAnimationFrame(render);
};
```

然后我们就可以在左上角看到状态面板。

![picture 1](https://stg.heyfe.org/images/blog-three-js-rabbit-3-88.png)

## 动画 weight

然后我们再来看下我们的兔子动画，上文我们讲到如何切换动画控制，主要是使用 play 和 stop 进行小兔兔的动画控制。此外我们还能用另一种方式来控制动画：weight。

我们先看下什么是 weight：

> The degree of influence of this action (in the interval [0, 1]). Values between 0 (no impact) and 1 (full impact) can be used to blend between several actions. Default is 1.

简单说就是某个动画动作的影响占比。然后我们可以通过 `action.setEffectiveWeight(weight);` 来控制动画动作的 weight。

我们先使用 GUI 来帮助我们调试看下 weight 的效果。首先我们创建一个 actions 来保存 weight：

```ts
const actions = {
    idle: { weight: 1, action: null },
    walk: { weight: 0, action: null }
};
```

然后我们在面板中添加一个文件夹，然后添加 idleWeight 和 walkWeight 的控制项，修改时我们修改对应 action 的 weight。

```ts
function setWeight(action, weight) {
    action.setEffectiveWeight(weight);
}

const createPanel = () => {
    const folder = panel.addFolder('Animate');

    folder
        .add(actions.idle, 'weight', 0, 1)
        .name('idleWeight')
        .listen()
        .onChange(value => {
            setWeight(idleAction, value);
        });
    folder
        .add(actions.walk, 'weight', 0, 1)
        .name('walkWeight')
        .listen()
        .onChange(value => {
            setWeight(walkAction, value);
        });
};
```

然后我们需要在加载后将两个动画全都启动，然后设置默认的 weight。

```ts
const init = () => {
    loader.load(
        new URL('/assets/rabbit.glb', import.meta.url) + '',
        function (gltf) {
            [idleAction, walkAction] = [mixer.clipAction(animations[0]), mixer.clipAction(animations[1])];
            actions.idle.action = idleAction;
            actions.walk.action = walkAction;
            idleAction.play();
            walkAction.play();
            setWeight(idleAction, actions.idle.weight);
            setWeight(walkAction, actions.walk.weight);
            createPanel();
            render();
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
};
```

![picture 2](https://stg.heyfe.org/images/blog-three-js-rabbit-3-36.png)

此时我们就可以使用 slider 来操控 weight 了，一起看下 weight 的效果。

![picture 3](https://stg.heyfe.org/images/blog-three-js-rabbit-3-99.gif)

## 使用 weight 来切换动画

了解了 weight 的作用，我们就可以使用 weight 来操控切换动画。

```ts
const controller = {
    idle: () => {
        setWeight(idleAction, 1);
        setWeight(walkAction, 0);
        actions.idle.weight = 1;
        actions.walk.weight = 0;
    },
    walk: () => {
        setWeight(idleAction, 0);
        setWeight(walkAction, 1);
        actions.idle.weight = 0;
        actions.walk.weight = 1;
    }
};
```

当切换动画时，我们直接将动画的 weight 重制即可，顺便更新下 weight。此处可以看到我们直接使用 actions.idle.weight 就可更新 GUI 项的值，这里主要是由于我们上面使用了 listen，GUI 中会使用 requestAnimationFrame 来监听值的变化，将其更新到 UI，可以看下相关的源码：

```ts
export default class Controller {
    listen(listen = true) {
        this._listening = listen;
        if (this._listenCallbackID !== undefined) {
            cancelAnimationFrame(this._listenCallbackID);
            this._listenCallbackID = undefined;
        }
        if (this._listening) {
            this._listenCallback();
        }
        return this;
    }

    _listenCallback() {
        this._listenCallbackID = requestAnimationFrame(this._listenCallback);
        const curValue = this.save();
        if (curValue !== this._listenPrevValue) {
            this.updateDisplay();
        }
        this._listenPrevValue = curValue;
    }
}
```

## 最后

本篇我们介绍了如何使用程序状态面板，如何使用 weight 进行动画混合和控制。

-   源码地址: https://github.com/ZxBing0066/playground-public/tree/master/three-js-rabbit-1
-   预览地址：https://playground.heyfe.org/three-js-rabbit-1/
