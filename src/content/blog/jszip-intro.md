---
title: 直接在前端做 zip 压缩/解压
pubDate: '2022-10-12'
tags:
    - javascript
    - zip
---

前段时间研究前端是如何解析 `excel` 表格的时候了解到 `jszip` 这个库，可以直接在前端对 `zip` 包进行压缩和解压缩，今天稍微水一篇。

## 使用

安装就不说了，直接 `npm install jszip` 即可。

### 读取本地文件

要读取本地 `zip` 文件，我们只需要使用 `loadAsync` 传入文件对象即可，先创建一个 `file input` 用于选择文件：

```html
<input type="file" id="file" name="file" />
```

然后在文件选择后我们调用 `loadAsync` 来读取文件内容：

```js
document.querySelector('#file').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    const zip = await JSZip.loadAsync(file);
});
```

读取完成后我们可以到返回的 `zip` 对象中的 `files` 属性中看到所有的压缩包中的文件：

```js
const zip = {
    files: {
        'Hello.txt': ZipObject,
        'images/': ZipObject,
        'images/smile.gif': ZipObject
    }
};
```

所有的文件、文件夹都会按照路径挂在 `files` 中，而 `ZipObject` 中则包含了该文件压缩信息，但是要注意，此时该文件的内容还是被压缩的，所以我们不能将其当作一般的 `file` 文件来使用，使用前我们还需要二次转换，比如我们要读取上面的 `Hello.txt` 中的内容，我们可以先讲其转换为 `blob` 对象后，再使用 `fileReader` 读取：

```js
const txtBlob = await zip.files['Hello.txt'].async('blob');
const fileReader = new FileReader();
file.onload = r => console.log(r.target.result);
reader.readAsText(f);
// log: Hello World\n
```

当然，我们也可以直接使用内置的方法直接转为 `string`：

```js
const text = await zip.files['Hello.txt'].async('string');
```

在浏览器端 `jszip` 支持以下几种数据类型：

-   `array`
-   `arraybuffer`
-   `base64`
-   `blob`
-   `string`
-   `uint8array`

而在 `node` 端，`jszip` 还支持 `nodebuffer` 和 `nodestream`。

### 读取远端文件

除了读取本地文件外，`jszip` 还支持读取远程的 `zip` 文件：

```js
new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent('/jszip/test/ref/text.zip', function (err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
})
    .then(JSZip.loadAsync)
    .then(function (zip) {
        return zip.file('Hello.txt').async('string');
    });
```

这里使用了 `zip.file` 方法来读取文件，和上面使用 `files` 读取是相通的。通过官方提供的 `JSZipUtils.getBinaryContent` 函数可以直接获取远端文件进行读取，封装的很便利。

### 压缩文件

除了上面说到的解压文件外，`jszip` 还支持直接在浏览器端对文件进行压缩，首先我们要先说实例化一个 `zip` 对象：

```js
const zip = new JSZip();
zip.file('Hello.txt', 'Hello world\n');
```

通过 `file` 向对象中加入文件，然后就可以通过 `generateAsync` 来生成 `blob` 文件：

```js
const blob = await zip.generateAsync({ type: 'blob' });
```

生成后即可进行文件下载，可直接通过 `FileSaver` 的 `saveAs` 下载：

```js
saveAs(blob, 'hello.zip');
```

emm，这封装的，真香。

## zip 压缩解压原理

再浅显的聊几句关于压缩解压原理。由于个人对压缩解压算法没什么研究，这里也不打算聊太多的深度的内容，只是个人去了解了一下相关的内容，这里很浅显的说一下：`zip` 压缩主要是将连续的字符进行合并来完成压缩的，可以简单的认为比如遇到 `44444999999` 这样的字符， `zip` 压缩会将其压缩为 `4,5,9,6` 这个的形式，从而达到压缩的目的。当然，实际算法比这要复杂很多，有兴趣的可以看下这两篇文：

-   https://cloud.tencent.com/developer/article/1081978
-   https://cloud.tencent.com/developer/article/1081963

通过原理就可以看出，其实压缩解压没有什么 `web` 盲区，只是算法复杂，但是用到的能力比较基础，只是能将文件数据取出，就可以进行解析，所以前端确实是可以实现的。而因为前端压缩解压的场景太少了，这也是很少有人知道前端能做压缩解压的原因，压根没往这方面想过。🤦‍♂️

## 使用场景

实际业务需求中其实很少会用到前端来压缩或者解压缩的场景。个人能想到的实际使用场景就以下几个：

-   在线压缩解压的工具网站
-   解析 `excel` 文件等其它依赖于 `zip` 压缩的文件
-   工具类网站上传 `zip` 包资源解析使用

## 总结

`jszip` 总体感觉上来说 `API` 设计的还是非常不错的，使用简单，没有那么多麻烦的事情，加上使用 `Promise`，配合 `async/await` 真是香。如果以后遇到需要的场景时不失为一个好选择。