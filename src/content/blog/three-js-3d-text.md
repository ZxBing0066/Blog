---
title: three.js 立体字
pubDate: '2023-02-06'
heroImage: 'https://stg.heyfe.org/images/blog-three-js-rabbit-0-1690812321314.png'
tags:
    - three.js
---

# three.js 立体字

three.js 可以直接将文字渲染成立体图形，配合 3D 模型场景效果非常赞。本篇一起看一下如何在 three.js 中渲染出 3D 文本。

![picture 1](https://stg.heyfe.org/images/blog-three-js-3d-text-82.png)

## TextGeometry

three.js 中的几何图形都是通过各种 Geometry 类来生成，3D 文本也不例外。要生成一个 3D 文本，我们可以直接使用 TextGeometry 来生成：

```js
new TextGeometry('兔然暴富', {
    font: font,

    size: size,
    height: height,
    curveSegments: curveSegments,

    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelEnabled: true
});
```

不过要注意的是，此处的 font 为必填项。而此处的 font 不同于我们在 css 中的 font-family，必须是 three.js 中的 font。

## fontLoader

three.js 中的 font 需要使用 FontLoader 进行加载，且加载的不是我们常见的字体文件，而是 typeface 格式的 JSON 文件。

```js
const loader = new FontLoader();
loader.load('/fonts/font.typeface.json', function (response) {
    font = response;
    refreshText();
});
```

加载完成后通过更新文本渲染，文本便会变为加载后的字体。

## ??? 异常原因

在使用 TextGeometry 会经常出现文字渲染不出显示问好的情况。这是因为 three.js 无法在 typeface 中找到对应文字的信息，遇到这种情况我们可以自己生成一份 typeface 文件。比如 three.js 官网中的 demo 中便不支持中文符号。

## typeface 生成

typeface 生成首先需要准备一份字体文件，注意确保你要使用的文字在该字体文件中支持。可以到 [100font](https://www.100font.com/) 下载，免费、没广告、不用登陆。

下载完成后我们可以找一个在线的 typeface 转换工具，比如我使用的是：http://gero3.github.io/facetype.js/ 。使用工具转换后就可以将 typeface 文件用于 three.js 中了。

## 完整代码

最后一起看下完整的代码：

```ts
import * as THREE from 'three';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

THREE.Cache.enabled = true;

let container;

let camera, cameraTarget, scene, renderer, controls;

let group, textMesh1, textGeo, materials, font;

const height = 20,
    size = 70,
    hover = -60,
    curveSegments = 4,
    bevelThickness = 2,
    bevelSize = 1.5;

const fontMap = {
    helvetiker: 0,
    optimer: 1,
    gentilis: 2,
    'droid/droid_sans': 3,
    'droid/droid_serif': 4
};

const weightMap = {
    regular: 0,
    bold: 1
};

const reverseFontMap = [];
const reverseWeightMap = [];

for (const i in fontMap) reverseFontMap[fontMap[i]] = i;
for (const i in weightMap) reverseWeightMap[weightMap[i]] = i;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
    camera.position.set(0, 400, 700);
    cameraTarget = new THREE.Vector3(0, 150, 0);

    scene = new THREE.Scene();

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);

    scene.background = new THREE.Color().setHex(0xffffff);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.color.setHex(0xff0000);
    pointLight.position.set(0, 100, 90);
    scene.add(pointLight);

    materials = [
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
    ];

    group = new THREE.Group();
    group.position.y = 100;

    scene.add(group);

    loadFont();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
}

function loadFont() {
    const loader = new FontLoader();
    loader.load('/fonts/longzhuti.typeface.json', function (response) {
        font = response;
        refreshText();
    });
}

function createText() {
    textGeo = new TextGeometry('兔然暴富', {
        font: font,

        size: size,
        height: height,
        curveSegments: curveSegments,

        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: true
    });

    textGeo.computeBoundingBox();

    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    console.log(centerOffset);
    textMesh1 = new THREE.Mesh(textGeo, materials);

    textMesh1.position.x = centerOffset;
    textMesh1.position.y = hover;
    textMesh1.position.z = 0;

    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;

    group.add(textMesh1);
}

function refreshText() {
    group.remove(textMesh1);

    createText();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.lookAt(cameraTarget);
    controls.update();
    renderer.clear();
    renderer.render(scene, camera);
}
```

## 最后

本篇我们介绍了如何在 three.js 中绘制 3D 文本，以及 typeface 和 typeface 的制作。

-   源码地址: https://github.com/ZxBing0066/playground-public/tree/master/websites/three-js-3d-text
-   预览地址：https://playground.heyfe.org/three-js-3d-text/
