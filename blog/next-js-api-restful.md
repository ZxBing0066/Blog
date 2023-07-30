---
tags: [next.js, React, restful]
summary: 在使用 next.js 开发时如何方便封装 handler，来实现 restful 风格 API。
cover: https://stg.heyfe.org/images/blog-next.js-1690694536769.webp
---

# next.js 中如何实现 restful 风格 API handler 封装

最近在做个 `next.js` 的内部项目，由于 `next.js` 可以通过文件 `API` 路由的方式快速创建一个 `API`，因此选择了使用 `restful` 风格，这样可以利用好 `next.js` 文件路由的优势。

## 问题暴露

不过这样做了一段时间后便发现了一些问题：

-   每个 `handler` 中都需要去按照 `request method` 来判断操作逻辑，导致每个 `API` 路由文件中充斥着各种 `=== 'GET' === 'POST'` 判断，并且会导致代码层级变深导致代码更丑陋。
-   为了有更好的开发体验使用了 `ts` 开发，然而每次 `API handler` 中都要手动声明一次 `request` 类型和 `response` 类型，着实麻烦。
-   `handler` 中的报错必须要随时捕获不然就会被 `next.js` 处理返回 500 页面。
-   `handler` 中要返回的数据必须要手动调用 `res.json`。

基于上面这些麻烦事儿，作为一个爱偷懒的程序员，我还是决定给他封装一层。

## wrapper 封装

上面列出的这些问题，其实只需要做一层简单的函数封装即可，使用时我们只需要将 `handler` 包在封装函数中。

`/pages/api/handler.ts`

```ts
import handlerWrapper from '../../handler-wrapper';

export default handlerWrapper(async (req, res) => {
    // ....
});
```

而在 `handlerWrapper` 中，我们则可以对 `handler` 做些简单的封装

`/handler-wrapper.ts`

```ts
import { NextApiHandler } from 'next';

export const handlerWrapper = (handler: NextApiHandler) => (req, res) => {
    try {
        await handler(req, res);
    } catch (e) {
        logger.error(e);
        res.status(500).json({
            message: 'error: ' + e
        });
    }
};
```

这样我们就可以通过 `handlerWrapper` 来掌控 `handler` 的行为，通过这样一层简单封装，我们可以解决掉上面所提到到的需要手动声明 `handler` 中参数类型的问题，还解决了代码报错时会返回 500 页面的问题。这样当代码中存在参数错误等情况时，我们就可以直接 `throw`，这样外层就可以统一封装成标准化的输出进行返回了。

```ts
import handlerWrapper from '../../handler-wrapper';

export default handlerWrapper(async (req, res) => {
    if (!req.query.id) throw new Error('Missing required id!');
    //
});
```

如此开发时遍可以少写大把的 `res.status(500).json()`，对一些未捕获的异常也无需心虚，自然会被 `handlerWrapper` 所捕获。当然也不能太过掉以轻心，比如一些异步回调函数中的报错或者是一些 `error` 事件等还是需要自己去处理的。

## 封装返回值

做完这些，我们可以再继续解决返回值封装的问题，只需要在现在的基础上做些小小的改动，`res.status(200).json()` 也可以不用写了：

```ts
import { NextApiHandler } from 'next';

export const handlerWrapper = (handler: NextApiHandler) => (req, res) => {
    try {
        const result = await handler(req, res);
        res.status(200).json(result);
    } catch (e) {
        logger.error(e);
        res.status(500).json({
            message: 'error: ' + e
        });
    }
};
```

```ts
import handlerWrapper from '../../handler-wrapper';

export default handlerWrapper(async (req, res) => {
    if (!req.query.id) throw new Error('Missing required id!');
    return {
        dataList: await redisClient.json.get('xxx', { path: req.query.id })
    };
});
```

我们在 `handler` 中只负责逻辑处理、返回和 `throw`，别的都交给 `handlerWrapper` 来处理即可。

## 封装 method 处理

然而第一个问题：处理 `method` 逻辑分支的问题我们还没有解决，不过这种问题我们可以通过**策略模式**来快速搞定：

```ts
import { NextApiHandler } from 'next';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const handlerWrapper = (handlerMap: Partial<Record<Method, NextApiHandler>>) => (req, res) => {
    const handler = handlerMap[req.method as Method];
    if (!handler) {
        res.status(500).json({
            message: 'Unsupported method'
        });
        return;
    }
    try {
        const result = await handler(req, res);
        res.status(200).json(result);
    } catch (e) {
        logger.error(e);
        res.status(500).json({
            message: 'error: ' + e
        });
    }
};
```

```ts
export default handlerWrapper({
    GET: async function handler(req, res) {
        if (!req.query.id) throw new Error('Missing required id!');
        return {
            dataList: await redisClient.json.get('xxx', { path: req.query.id })
        };
    },
    POST: async function handler(req, res) {
        if (!req.query.id) throw new Error('Missing required id!');
        await redisClient.json.set('xxx', path, req.body);
        return {
            message: 'success'
        };
    }
});
```

我们只需要将 `handlerWrapper` 中的 `handler` 修改给 `handlerMap` 即可，这样我们就可以从策略映射表中取出 `method` 相应的处理函数，而未支持的 `method` 也可以直接交给 `handlerWrapper` 来进行统一判定。

## 结语

通过上面的封装，不需要多少时间就可以将 `next.js` 的 `API` 处理简化数倍，且让程序健壮性更高，后续的可维护性也大大提升。当然封装后也有一定的局限性，比如如果此时要用到 `res.pipe` 直接推送流就会需要做一些额外的处理。当然目前的封装还不算结束，后期预计还会封装一些请求参数判定、统一日志记录等。
