---
lastUpdate: 2022-9-29
date: 2022-9-29
tags: ['JavaScript']
---

# 独家配方 - Promise 使用小技巧

虽然现在前端开发中大部分的异步代码中的回调都在慢慢的被 `Promise` 所取代，然而大部分的原生 `API` 和一些库都还只有回调的调用方式。于是很多时候我们需要将一些库、原生 `API` 转换成 `Promise`，此时不可避免的就是写一个 `Promise` 将其包裹：

```js
const readFile = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsString(file);
        reader.addEventListener('load', e => {
            resolve(e.result);
        });
        reader.addEventListener('error', e => {
            reject(e);
        });
    });
};
```

然而，在 `n` 年前的一天，我突然看这段代码不顺眼，好不容易拜托了回调地狱，又来了一层 `Promise`，我表示很难受，于是我将它改成了这样：

```js
const readFile = file => {
    let resolve, reject;
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    const reader = new FileReader();
    reader.readAsString(file);
    reader.addEventListener('load', e => {
        resolve(e.result);
    });
    reader.addEventListener('error', e => {
        reject(e);
    });
    return promise;
};
```

乍看之下，为了节省一个层级缩进，增加了 `n` 行代码，不过别着急，这里还有优化的空间：

```js
const controllerFactory = () => {
    let resolve, reject;
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    return [promise, resolve, reject];
};

const readFile = file => {
    const [controller, success, error] = controllerFactory();
    const reader = new FileReader();
    reader.readAsString(file);
    reader.addEventListener('load', e => {
        success(e.result);
    });
    reader.addEventListener('error', e => {
        error(e);
    });
    return controller;
};
```

这样将 `Promise` 的实例化部分的代码抽离出来，我们就得到一个比较干净的 `readFile` 了，看起来舒服多了 😌。

这样的写法好处就是，当你有个超大的方法需要转换为 `Promise` 写时，不用再跑到方法头尾加上 `Promise` 包裹，直接在将实参里的 `success`、`error` 去掉，添加 `factory` 代码并返回即可：

源代码：

```js
const myFunc = (success, error) => {
    // ...
    // a lot of code
    if (e) {
        error(e);
    } else {
        success(result);
    }
};
```

`Promise` 改造后：

```js
const myFunc = () => {
    return new Promise((resolve, reject) => {
        // ...
        // a lot of code
        if (e) {
            reject(e);
        } else {
            resolve(result);
        }
    });
};
```

或是需要判断包裹区域进行包裹：

```js
const myFunc = () => {
    // ...
    // a lot of code
    return new Promise((resolve, reject) => {
        if (e) {
            reject(e);
        } else {
            resolve(result);
        }
    });
};
```

使用 `controllerFactory` 改造：

```js
const myFunc = () => {
    const [controller, success, error] = controllerFactory();
    // ...
    // a lot of code
    if (e) {
        error(e);
    } else {
        success(result);
    }
    return controller;
};
```

个人感觉这样代码看起来更舒适，当然，这种写法是好是坏见仁见智，欢迎指点讨论。
