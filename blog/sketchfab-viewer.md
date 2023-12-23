---
lastUpdate: 2023-7-31
date: 2023-2-8
---
# 展示 3D 模型也许不用 three.js，sketchfab viewer 挺好的

之前写了一些关于如何使用 three.js 展示 3D 模型的例子。然而在一些场景下用 three.js 进行模型展示的开发要求可能相对会高一点，我们还有更简单的方法：sketchfab-viewer。

## sketchfab

sketchfab 是一个模型展示和售卖的网站，它里面包含了大量的 3D 模型，并且它支持所有模型的在线预览、骨架展示、动画等等功能。官方网址如下：https://sketchfab.com/ 。

## sketchfab viewer

sketchfab viewer 是 sketchfab 官方提供的一个模型展示工具，我们可以直接使用它来在我们的应用中展示 sketchfab 中的模型，而不需要去自己使用 three.js 进行开发。

## 使用

sketchfab viewer 使用非常简单，主要分三步：

1. 添加 sketchfab-viewer 的官方脚本
2. 添加一个空的 iframe 作为容器
3. 进行 viewer 的实例化

下面用一个非常简单的例子，展示一个兔年小兔兔模型：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sketchfab Viewer</title>
        <script type="text/javascript" src="https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js"></script>
    </head>

    <body>
        <iframe
            src=""
            id="api-frame"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            web-share
            allowfullscreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            width="1000"
            height="500"
        ></iframe>
        <style>
            #api-frame {
                margin: 0 auto;
                display: block;
            }
        </style>
        <script src="./index.js"></script>
    </body>
</html>
```

然后在脚本中，我们直接实例化 viewer：

```js
var iframe = document.getElementById('api-frame');
var uid = '7ab75a9c956340bbb917e5851c714536';

var client = new Sketchfab(iframe);

client.init(uid, {
    success: function onSuccess(api) {
        api.start();
        api.addEventListener('viewerready', function () {
            console.log('Viewer is ready');
        });
    },
    error: function onError() {
        console.log('Viewer error');
    }
});
```

这样一个和 sketchfab 官网同样强大的模型预览工具就生成了。

![picture 1](https://stg.heyfe.org/images/blog-sketchfab-viewer-29.png)

注意此处的 UID 是模型的唯一 id，可以在每个模型的链接最后找到。比如如下模型的 UID 就是链接最后的 `d45c2cfa06094235a9e8783aa454ffb6`:

![picture 2](https://stg.heyfe.org/images/blog-sketchfab-viewer-55.png)

## 进阶

sketchfab viewer 除了最基本的用法外，还提供了其它进阶的 API，比如设置背景、设置环境、控制动画等等，可以在 https://sketchfab.com/developers/viewer/functions 中进行查看。

## 总结

本文介绍了 sketchfab-viewer 的基本使用和功能展示，在面对一些简单的模型展示需求时，使用 sketchfab-viewer 不失为一个好的选择。
