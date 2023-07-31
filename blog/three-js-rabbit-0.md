---
tags: [three.js]
cover: https://stg.heyfe.org/images/blog-three-js-rabbit-0-1690812321314.png
---

# 用 three.js 画只 🐰 有多简单

![picture 1](https://stg.heyfe.org/images/blog-three-js-rabbit-0-97.gif)

three.js 是一个非常流行的图形库，通过它可以让开发者方便的进行开发。而通过几十行代码就能做成这样一个兔子模型展示网页，下面一起看下代码。

## 寻找模型

首先我们需要找一个可用的兔子模型，网上有非常多的网站可以帮助我们找到想要的模型，不过需要注意模型的版权。这里推荐一个比较有名的 [Sketchfab](https://sketchfab.com/)，可以方便的检索想要的模型。我这边使用的模型是这个： [兔子模型](https://sketchfab.com/3d-models/rabbit-squat-08d4bf632019457bbfb87c3a9b3b9803)。

3D 模型有很多格式，这里我们使用 GLB 文件，注意下载 three.js 支持的模型格式，官方提供的 loader 包括：

-   3DMLoader
-   DRACOLoader
-   FontLoader
-   GLTFLoader
-   KTX2Loader
-   LDrawLoader
-   MMDLoader
-   MTLLoader
-   OBJLoader
-   PCDLoader
-   PDBLoader
-   PRWMLoader
-   SVGLoader
-   TGALoader

当然其中并不全是 3D 模型格式。注意 GLB 使用的也是 GLTFLoader。

## 基础概念

编码前我们需要了解一些图形编程中比较基础的概念：renderer、scene、camera。

renderer 主要用于画面的渲染，three.js 提供了几种类型的 renderer，一般使用 WebGLRenderer。

scene 则是场景，需要有对应的场景才能对场景进行渲染，而要渲染的内容都是放到场景中才能渲染的。

camera 则是相机，相机表示了渲染的视角，可以理解为 scene 为一个真实的世界场景，而 camera 则是我们的眼睛，我们眼睛从不同的位置、不同角度对场景进行观察都会看到不一样的画面，而 renderer 则根据 camera 和 scene 来渲染出我们所观察到的画面。

## 开始编码

### 创建 renderer

首先我们需要先创建一个 renderer：

```ts
import * as THREE from 'three';

let app = {
    el: document.getElementById('app'),
    scene: null,
    renderer: null,
    camera: null,
    controls: null
};

const init = () => {
    const renderer = (app.renderer = new THREE.WebGLRenderer({ antialias: true }));
    app.renderer.setSize(window.innerWidth, window.innerHeight);
    app.el.appendChild(app.renderer.domElement);
};

init();
```

这里我们选择 WebGLRenderer，然后通过 setSize 将其渲染大小设置为窗口大小。此处 antialias 用于配制抗锯齿，可以让画面更平滑，但是也更耗费资源。

注意 renderer 初始化后，我们需要手动将 renderer 的 domElement 添加到我们准备好的渲染 dom 中。

### 创建 scene、加载模型

然后我们就可以开始创建场景、加载兔子模型了：

```ts
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

const init = () => {
    const scene = (app.scene = new THREE.Scene());
    loader.load(
        new URL('/assets/rabbit_squat.glb', import.meta.url) + '',
        function (gltf) {
            app.scene.add(gltf.scene);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
};
```

创建 scene 非常简单，加载模型则需要实例化 loader 后加载对应的模型文件，然后将模型中的 scene 添加到我们的 scene 中。

### 创建 camera

然后就是创建 camera 了：

```ts
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const init = () => {
    const camera = (app.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    app.controls = new OrbitControls(app.camera, app.renderer.domElement);
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = 50;
};
```

这里我们使用 PerspectiveCamera，然后再创建一个 OrbitControls，可以方便我们去控制摄像机的转向、缩放。

### environment

此时我们已经创建了 scene、camera、renderer，还将兔子模型加载进去，但是会发现兔子依然没有渲染，那是因为： 太黑了 😂。

没有光线就好像我们的眼睛在黑夜中，什么都看不到，此时我们有几种方案可以解决：

1. 使用光线
2. 修改渲染物体的材质
3. 通过 environment

此处为了简单，我们直接使用 RoomEnvironment 来解决：

```ts
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const init = () => {
    const scene = (app.scene = new THREE.Scene());
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
};
```

我们直接实例化一个 RoomEnvironment，然后修改 scene 的 environment。此时就可以发现，我们可爱的小兔子渲染出来了。

## 全部代码

完整代码如下：

```ts
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const loader = new GLTFLoader();

let app = {
    el: document.getElementById('app'),
    scene: null,
    renderer: null,
    camera: null,
    controls: null
};

const init = () => {
    const renderer = (app.renderer = new THREE.WebGLRenderer({ antialias: true }));
    app.renderer.setSize(window.innerWidth, window.innerHeight);
    app.el.appendChild(app.renderer.domElement);

    const scene = (app.scene = new THREE.Scene());
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = (app.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    app.controls = new OrbitControls(app.camera, app.renderer.domElement);
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = 50;

    loader.load(
        new URL('/assets/rabbit_squat.glb', import.meta.url) + '',
        function (gltf) {
            app.scene.add(gltf.scene);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
};

const render = () => {
    app.renderer.render(app.scene, app.camera);
    app.controls.update();
    requestAnimationFrame(render);
};

init();
render();
```

## 最后

-   源码地址: https://github.com/ZxBing0066/playground-public/tree/master/three-js-rabbit-0
-   预览地址：https://playground.heyfe.org/three-js-rabbit-0/
