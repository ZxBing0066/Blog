---
tags: [next.js, React]
summary: 介绍 next.js 中的 API 路由设计，动态路由和路由参数等。
cover: https://stg.heyfe.org/images/blog-next.js-1690694536769.webp
---

# next.js - API 路由篇

> `next.js` 作为最热门的 `react` 框架，不过这么久了好像国内使用率一直不太高。最近在研究做个小项目正好做下笔记，有兴趣的可以一起来学习。

`next.js` 首页标榜的 12 个特性之一就是 `API routes`，简单的说就是可以 `next.js` 直接写 `node` 代码作为后端服务来运行。因此我们可以直接使用 `next.js` 直接维护一个全栈项目，听起来很香的样子。

## 使用方式

`next.js` 中使用文件路径作为路由，所以在 `API routes` 中也是一样，一般的页面文件我们会放在 `pages` 下，而 `API routes` 文件我们则需要放在 `pages/api` 下，`emmm`，其实我觉得这个设计有点奇怪，为啥不是在外层增加一个 `server` 或者 `api` 的文件夹呢，放在 `pages` 下面感觉怪怪的。而请求时，需要请求对应的 `/api/` 下的文件地址，`emmm`，好吧，真的挺奇怪的。

所以我们要新增一个 `API` 只需要在 `pages/api/` 目录下新建一个文件即可。

## API 路由匹配

而 `API` 的文件命名有三种方式：

-   `pages/api/route.js`
-   `pages/api/route/[param].js`
-   `pages/api/route/[...slug].js`

第一种很好理解，就是会处理发送到 `/api/route` 的请求，第二种会接受来自 `/api/route/xxxx` 的请求，并将 `xxxx` 作为参数放到 `param` 中，而第三种则是会接收所有的到 `/api/route/` 下的请求，比如 `/api/route/a/b/c` 等。

当请求过来进行匹配时， `next.js` 将会按照从上到下的优先级来匹配应该处理的路由，比如上面三个文件同时存在，那么发送到 `/api/route` 的请求将会从被第一个文件所处理，而 `/api/route/a` 的请求会被第二个文件所处理，剩余的请求才会进入第三个文件中处理。

## API 处理

而在处理文件中，会调用默认的导出函数来处理请求：

```js
export default function handler(req, res) {
    res.status(200).json({ foo: 'bar' });
}
```

如上代码表示请求的响应体 `http` 状态码为 200，响应体中是一段 `json`。

除了 `nodejs` 原生中包含的一些属性和方法外，`next` 还在 `res` 中扩展了以下几个常用的方法：

-   `res.status(code)` 响应的 `http` 状态码
-   `res.json(body)` `json` 响应体
-   `res.send(body)` 其它响应体，可以是 `string`、`object`、`Buffer`
-   `res.redirect([status,] path)` 重定向
-   `res.revalidate(urlPath)` 重新进行校验

而在 `req` 中则扩展了以下几个常用属性：

-   `req.cookies` 请求包含的 `cookies`
-   `req.query` 请求的 `query` 参数
-   `req.body` 请求体

是不是很熟悉，没错就是 `express.js` 的一些功能。

## API 配置

除了 `export` 默认的处理函数处理请求外，还可 `export` 一个 `config` 对象来配置：

```js
export const config = {
    api: {
        // 请求体处理
        bodyParser: {
            sizeLimit: '1mb'
        },
        // 响应体的大小限制
        responseLimit: '8mb',
        // 用于指定请求是否被外部服务处理，这个暂时还没搞清楚是怎么工作的，等研究完了再来更新
        externalResolver: true
    }
};
```

## 边缘计算支持

此外，`next.js` 的 `API routes` 还支持最近很火的边缘计算，不过边缘计算的运行时和 `node` 运行时差异较大，需要注意改动。由于暂时对这方面没有研究，不做过多深入。

## 自定义 API

除了默认的请求处理，还可以借助外部 `server` 来处理请求，比如 `graphql`：

```js
import { createServer } from '@graphql-yoga/node';

const typeDefs = /* GraphQL */ `
    type Query {
        users: [User!]!
    }
    type User {
        name: String
    }
`;

const resolvers = {
    Query: {
        users() {
            return [{ name: 'Nextjs' }];
        }
    }
};

const server = createServer({
    schema: {
        typeDefs,
        resolvers
    },
    endpoint: '/api/graphql'
});

export default server;
```

## 注意点

另外需要注意的是，如果配置了 `pageExtensions`，`API` 文件的命名也会受影响。

还有如果同时存在 `pages/api/route/[param].js` 和 `pages/api/route/[param1].js` 不知道会发什么什么，回头有空试试。

## 总结

使用 `next.js` 的 `API routes`，我们可以直接在项目中编写 `nodejs` 后端代码，轻松完成全栈开发。

再多说几句，经过这么多年的发展，前后端终于分离了，然而最近几年，前端又开始干起后端的活，梦回 `php`、`jsp`。古人云的好：风水轮流转，前后不分家。
