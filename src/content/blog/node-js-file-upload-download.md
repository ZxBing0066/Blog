---
title: 如何实现上传文件到 nodejs 和文件下载
pubDate: '2022-10-13'
heroImage: >-
    https://stg.heyfe.org/images/blog-node-js-file-upload-download-1690812036240.png


tags:
    - node.js
    - next.js
---

最近拿 `next.js` 做个全栈项目，需要文件上传和下载，这里记录下实现方式。

## 文件上传

要实现文件上传，首先需要在页面中拿到文件，`demo` 里我们简单的写一下：

```html
<input type="file" id="file" />
```

```js
document.querySelector('#file').addEventListener('change', e => {
    if (e.target.files?.[0]) doUpload(e.target.files[0]);
});
```

为了简化一下我们这里例子中使用单文件上传。再来实现下 `doUpload`，上传文件我们需要使用到 `FormData`：

```js
const doUpload = async file => {
    const body = new FormData();
    body.append('file', file);
    const response = await fetch('/api/file', {
        method: 'POST',
        body
    });
};
```

我们需要先实例化一个 `FormData`，然后使用 `append` 将文件作为 `form` 字段添加进去，然后可以直接通过 `fetch` 发送 `formData` 到 `node` 端，当然也可以使用 `axios` 等库或 `xhr` 来实现。

```js
axios.post('/api/file', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
```

需要注意在使用 `xhr` 时要主动配置下请求头中的 `Content-Type`。

这样在选择文件后就会将文件 `post` 发送到 `node` 端 `/api/file` 中，然后我们再在做下 `node` 端处理下发送过来的请求：

```js
import formidable from 'formidable';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false
    }
};

const saveFile = async file => {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/${file.name}`, data);
    await fs.unlinkSync(file.path);
    return;
};

export default (req, res) => {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            await saveFile(files.file);
            return res.status(201).send('');
        });
        post(req, res);
    }
};
```

由于篇幅有限，删除了一些异常处理代码。这里我们使用 `formidable` 来解析 `FormData`，注意由于 `next.js` 默认会启用 `bodyParser`，所以需要 `config` 中显示的禁用 `bodyParser`。

而 `formidable` 会将文件放到一个临时目录中，我们直接从临时目录读取该文件然后存到指定目录即可，注意转存完成后使用 `unlink` 释放缓存文件，也可以直接使用 `rename` 移动文件位置。

```js
await fs.renameAsync(file.path, `./public/${file.name}`);
```

这样一个简单的文件上传功能就完成了，而如果使用原生 `node` 的话差别不大：

```js
http.createServer(function (req, res) {
    if (req.url == '/api/file' && req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            await saveFile(files.file);
            return res.status(201).send('');
        });
        post(req, res);
    }
}).listen(3000);
```

只是需要自己判断路由地址，实现代码并无差别。

## 文件下载

实现完了文件上传，我们再看下文件下载，文件下载其实只需要实现一个静态文件服务器即可，最简单的办法是通过流管道了：

```js
export default (req, res) => {
    if (req.method === 'GET') {
        const filePath = path.join(process.env.FILE_PATH, req.url);
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
        readStream.on('finish', () => {
            readStream.close();
        });
    }
};
```

我们直接将文件读取流通过管道接到相应中，即可完成文件下载。`node` 端代码和上面上传相同，只是做路径上的识别，别的并无差别。

此外我们还可以通过直接发送文件内容的方式来返回文件，下面为原生 `node` 代码示例：

```js
const fileContent = fs.readFileSync(filePath);
res.writeHead(200, { 'Content-Type': contentType });
res.end(content, 'utf-8');
```

而在页面上我们只需要使用 `a` 标签的 `download`，即可实现下载，也可以通过 `window.open` 等其它方式，不过要注意做好防拦截处理：

```html
<a download="fileName.png" href="/node/static/fileName.png">点击下载</a>
```

## 总结

`node` 端实现文件上传和下载的难度并不大，但是要额外注意的是安全隐患等问题，避免被恶意上传木马，这块后面会单独写一篇。