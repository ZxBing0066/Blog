# 前端数据转文件下载方案

## 数据转文件

### 前端数据转文件

https://www.wenjianbaike.com/filetypes/text

#### 转 JSON

```js
const json = { name: 'test', interest: ['basketball'] };
const str = JSON.stringify(json, null, 2);
const url = `data:,${str}`;
```

#### 转 CSV

```js
const rows = [
    ['name1', 'city1', 'some other info'],
    ['name2', 'city2', 'more info']
];

let csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');

const fileUrl = encodeURI(csvContent);
```

#### 转纯文本

#### 转图片

### 二进制数据转文件

```js
const res = await axios({
    method: 'get',
    url: 'test.xlsx',
    responseType: 'blob'
});

const fileUrl = window.URL.createObjectURL(res.data);

await download();

window.URL.revokeObjectURL(fileUrl);
```

```js
const res = await axios({
    method: 'get',
    url: 'test.xlsx',
    responseType: 'arraybuffer'
});
const blob = new Blob([res.data], {
    type: 'application/vnd.ms-excel'
});

const fileUrl = window.URL.createObjectURL(blob);

await download();

window.URL.revokeObjectURL(fileUrl);
```
