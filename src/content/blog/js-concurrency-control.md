---
title: JS 并发控制
description: 通过模拟线程的方式快速简单的实现 JS 的并发控制
pubDate: '2023-09-08'
tags:
    - JavaScript
---

近期刷到了一些关于前端并发控制的文章，感觉有些人对并发控制有些误解，想起自己很多年前写一个扫描脚本的时候，由于数据量过大，为了让脚本能够运行的更快些写了一个并发控制的库： [node-job-runner](https://github.com/ZxBing0066/node-job-runner/tree/master)，现在回头看来着实有些简陋。想想不如乘机写~~水~~一篇。

想要直接看方案~~抄作业~~的可直接跳到下方 [伪线程方案](#伪线程方案) 查看。

## 并发控制

咱们先从什么是并发控制唠起。并发控制其实在后端算是一个比较困难的问题，因为后端的并发控制大部分情况下指的是高并发场景下多个用户或程序同时访问或修改数据时对操作进行管理。这就涉及到资源锁定、操作排序、隔离等等。

不过在前端所聊的并发控制就很简单了，一般指的是前端发起请求或其他一些异步操作时为了控制并发的请求或操作数量而做的控制。

## 使用场景

常见的使用并发控制的场景如下：

1. 浏览器请求并发量控制：每个浏览器都存在并发请求上限（`http 2.0` 之前），所以如果一次发送的请求过多，将会阻塞后续的其他请求。比如有一个表格需要一次性加载几万条数据，需要每次 100 条从 `API` 拉取，这就需要创建几百个请求任务，如果一次性将这些请求全部打满，后续万一有了更高优先级的请求则一定会需要排队等待前面的几百个请求完成才可以。
2. `nodejs` 脚本扫描并发量控制：如果需要使用 `nodejs` 去做一些扫描任务，通常需要并发大量请求来提高执行速度，然而如果并发过高则会出现请求直接报错或者是描述符超限的情况。

所以如果异步任务并发较高且容易导致问题的场景就需要做好并发控制。

## 实现方案

### 计数器方案

要实现并发控制，最简单常见的方案便是通过计数器来控制并发数量，我们以 `Promise` 实现来演示：

```js
const axios = require('axios');

const concurrency = (urls, limit) => {
    const result = [];
    let count = 0;
    const len = urls.length;
    return new Promise(resolve => {
        const next = () => {
            if (count === len) return resolve(result);

            let current = count++;
            axios
                .get(urls[current])
                .then(res => {
                    result[current] = { result: res.data };
                })
                .catch(err => {
                    result[current] = { error: err };
                })
                .finally(() => {
                    next();
                });
        };
        while (count < limit) {
            next();
        }
    });
};

const urls = new Array(10).fill('https://www.baidu.com');
concurrency(urls, 3).then(console.log);
```

事例中通过 `count` 来控制并发数量，第一个 `while` 当 `count` 小于 `limit` 时，就会继续执行 `next` 方法，从而在一开始将并发数量提升到 `limit` 个，然后后续每次 `next` 执行完成后都会继续调用下一个 `next` 来填补空余，从而将并发数量一直维持在 `limit` 个。每次请求的执行结果都通过索引将其保存到 `result` 中的对应位置，当最后一个请求完成后 `count === len` 就会触发 `resolve`，从而返回结果。

但其实，上述的代码存在一些漏洞：

1. 如果 `urls` 的长度 小于等于 `limit`，那么就会导致第一个 `while` 语句时 `count === len` 从而提前 `resolve`，解决倒也简单，直接增加一个完成的计数器，然后把完成的条件判断放到每个任务完成时判定即可。
2. 如果 `urls` 的长度为 0，将永远无法触发 `resolve`，这个问题也很好解决，提前判断一下 `urls` 的长度即可。

所以最终改造后的代码如下：

```js
const axios = require('axios');

const concurrency = (urls, limit) => {
    const result = [];
    let count = 0,
        completed = 0;
    const len = urls.length;
    if (len === 0) return Promise.resolve([]);
    return new Promise(resolve => {
        const next = () => {
            if (count === len) return;

            let current = count++;
            axios
                .get(urls[current])
                .then(res => {
                    result[current] = { result: res.data };
                })
                .catch(err => {
                    result[current] = { error: err };
                })
                .finally(() => {
                    if (++completed === len) {
                        resolve(result);
                    } else {
                        next();
                    }
                });
        };
        while (count < limit) {
            next();
        }
    });
};

const urls = new Array(10).fill('https://www.baidu.com');
concurrency(urls, 3).then(console.log);
```

### 伪线程方案

再来看看我平时用到的另一种更简单的方案，我不太清楚怎么命名，姑且称之为**伪线程方案**。主要思路就是模拟线程的设计，开几个线程，每个线程去任务栈中取任务，当所有线程都完成时则代表所有任务完成即可返回结果。

```js
const axios = require('axios');

const concurrency = async (urls, limit) => {
    const result = [];
    const len = urls.length;
    const next = async () => {
        while (urls.length) {
            const index = len - urls.length,
                url = urls.pop();
            try {
                result[index] = { result: (await axios.get(url)).data };
            } catch (error) {
                result[index] = { error };
            }
        }
    };

    await Promise.all(new Array(limit).fill(null).map(() => next()));

    return result;
};

const urls = new Array(10).fill('https://www.baidu.com');
concurrency([...urls], 3).then(console.log);
```

乍看之下可能会觉得代码量差不多，实则不然，这种方案的可读性和代码量其实都优于上一个方案。首先通过 `new Array` 快速创建出一个长度为 `limit` 的线程池，然后在每个线程中会去 `urls` 中一个个拿取带处理的数据，通过 `while/await` 直到将数据全部处理完成。也不用担心 `urls` 长度小于 `limit` 等边界情况。

如果不需要返回结果，那么这种方案就会显得更为简洁。

```js
const axios = require('axios');

const concurrency = async (urls, limit) => {
    const next = async () => {
        while (urls.length) {
            await axios.get(urls.pop());
        }
    };

    await Promise.all(new Array(limit).fill(null).map(() => next()));
};

const urls = new Array(10).fill('https://www.baidu.com');
concurrency([...urls], 3).then(console.log);
```

可以看出，核心代码不过数行，而且可读性也很高。个人觉得时目前最简单的并发控制方案。

## 总结

其实可以看出，前端的并发控制其实非常简单，做好限制并想办法依次处理未处理的数据即可。