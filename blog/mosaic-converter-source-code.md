# 制作了一个马赛克图片转换器 - 实现篇

上文有讲到我制作了一个马赛克图片转换器，可以将图片转换成马赛克风格，并可转换为 `css box-shadow` 进行输出。前排还是先放效果图、转换器地址和 `GitHub` 地址：

![picture 1](/public/image/blog-mosaic-converter-44.gif)

转化器地址：https://mosaic.heyfe.org/

GitHub 地址：https://github.com/ZxBing0066/mosaic-converter

## 实现

上文有大概讲到原理的几个步骤：

1. 将图片绘制到较小的画布中
2. 从较小的画布中二次绘制到较大的画布中
3. 通过解析画布中的数据，获取颜色信息，将其转换为 `box-shadow`

原理就是将图片塞到小画布中，让浏览器自动把图压缩成小图生成一张小型图片，再将其等比放大就是一张马赛克图片了。

下面说下具体实现中的实际步骤：

### 读取文件

首先我们转换所需的图片是 `file input` 中的文件，而要将图片渲染到画布中，我们需要使用 `drawImage`，而 `drawImage` 需要接收到的图片参数需要为 `ImageElement` 或 `CanvasElement` 等，所以需要将文件进行转换，为此我们需要先将文件转换为 `DataURL`：

```ts
const readFile = (file: File): Promise<string> => {
    const [controller, success, error] = controllerFactory();
    const reader = new FileReader();

    reader.addEventListener('loadend', e => {
        if (e.target?.result) {
            success(e.target.result);
        } else {
            error(new Error('Read file fail'));
        }
    });
    reader.addEventListener('error', e => {
        error(e);
    });
    reader.readAsDataURL(file);
    return controller;
};
```

然后将 `url` 绘制到 `ImageElement` 中：

```ts
const loadImage = (url: string, imageDOM?: HTMLImageElement): Promise<HTMLImageElement> => {
    const [controller, success, error] = controllerFactory<HTMLImageElement>();
    const img = imageDOM ?? new Image();
    img.src = url;
    img.onload = () => {
        success(img);
    };
    img.onerror = e => {
        error(e);
    };
    return controller;
};
```

这里需要注意必须等待图片加载完成后才可将其渲染到画布中。

当我们需要绘制到第一个小型画布中时，我们直接调用即可：

```ts
const imgUrl = await readFile(file);
await loadImage(imgUrl, imageDOM);
```

此时我们已经将文件加载到 `image` 标签中。

### 将文件绘制到画布中

将文件渲染到 `image` 标签中后，我们就可以直接使用 `drawImage` 绘制到小型画布中：

```ts
const ratio = imageDOM.naturalHeight / imageDOM.naturalWidth;
offscreenCanvas.width = precision;
offscreenCanvas.height = Math.round(precision * ratio);
offscreenCtx.drawImage(imageDOM, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
```

此处我们通过获取原图的宽高，计算出宽高比，而小图的大小则由宽高比和编辑器中设置的精度相关，设置完后我们直接使用 `DrawImage` 即可，此时我们的第一步已经完成。

### 将小画布绘制到大画布中

然后我们需要将小画布中的数据绘制到大画布中：

```ts
canvas.width = canvasWidth = Math.min(640, imageDOM.naturalHeight);
canvas.height = canvasWidth * ratio;
ctx.imageSmoothingEnabled =
    (ctx as any).mozImageSmoothingEnabled =
    (ctx as any).webkitImageSmoothingEnabled =
    (ctx as any).msImageSmoothingEnabled =
        false;
ctx.drawImage(offscreenCanvas, 0, 0, canvasWidth, canvasWidth * ratio);
```

此处我们根据宽高比设置画布大小，需要注意的是：`imageSmoothingEnabled`，默认情况下浏览器拿到一张像素较低的图片要将其绘制时，为了更好的观感会进行平滑处理，为了保证我们的像素图的像素性，我们需要强制关闭浏览器这一特性，可以看下关闭前后的对比图：

![picture 6](/public/image/blog-mosaic-converter-source-code-89.png)

![picture 5](/public/image/blog-mosaic-converter-source-code-98.png)

可以明显看到默认情况下像素格都被平滑过渡消失了，为了在画布中绘制出马赛克风格的图片，我们需要将 `imageSmoothingEnabled` 关闭。关闭后我们可直接将 `offscreenCanvas` 绘制到大画布中。

也可以从小画布中获取图片数据，再生成图片绘制：

```ts
const smallImgUrl = offscreenCanvas.toDataURL();
const smallImg = await loadImage(smallImgUrl, mosaicImageDOM);
ctx.drawImage(smallImg, 0, 0, canvasWidth, canvasWidth * ratio);
```

### 将画布数据转换为 box-shadow

为了方便的让马赛克图转换成各种风格，我们可以使用 `box-shadow` 来绘制，绘制只需要获取每个像素点的颜色即可：

```ts
const outputBoxShadow = (size: number) => {
    const shadowArr = [];
    const ratio = imageDOM.naturalHeight / imageDOM.naturalWidth;
    for (let y = 0; y < precision * ratio; y++) {
        for (let x = 0; x < precision; x++) {
            const p = offscreenCtx.getImageData(x, y, 1, 1).data;
            if (dropTransparent && p[3] === 0) {
                continue;
            }
            if (dropWhite && p[3] !== 0 && p[0] === 255 && p[1] === 255 && p[2] === 255) {
                continue;
            }
            const colorInfo = [...p];
            colorInfo.length = 4;
            const color = dropAlpha
                ? '#' + ('000000' + rgbToHex(p[0], p[1], p[2])).slice(-6)
                : `rgba(${colorInfo.map((v, i) => (i === 3 ? (v / 255).toFixed(3) : v)).join(',')})`;
            shadowArr.push(`${color} ${x * size}px ${y * size}px` + (y === 0 && x === 0 ? ` 0 ${size}px inset` : ''));
        }
    }
    return shadowArr.join(',');
};
```

通过 `getImageData` 将每个像素点的颜色获取，然后拼接出我们想要的 `box-shadow`，即可使用 `box-shadow` 绘制出马赛克图，其中还有一些细节处理，不多说。

借助 `box-shadow` 的一些特性，可以让图片风格更丰富。

![picture 1](/public/image/blog-mosaic-converter-source-code-82.png)

## 总结

借助浏览器绘制小图片然后将其放大即可绘制出简单的马赛克图，而不需要使用算法去计算，借助 `box-shadow` 的特性可以让马赛克图更多变。
