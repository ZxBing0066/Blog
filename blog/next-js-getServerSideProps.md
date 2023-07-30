---
tags: [next.js, React, SSR]
summary: 介绍 next.js 中的 getServerSideProps 如何使用，有哪些细节。
cover: https://stg.heyfe.org/images/blog-next.js-1690694536769.webp
---

# next.js - getServerSideProps 篇

`getServerSideProps` 是 `next.js` 中的一项特色功能，可以让我们在给页面设置一些初始的 `props` 参数。

## 使用

`getServerSideProps` 是定义在页面中的 `API`，但是其执行环境是 `node` 端，而不是客户端，一般常见使用场景为：

-   页面前置权限校验
-   页面必备参数获取

使用时需要在对应的 `page` 文件中 `export getServerSideProps`

```js
const Page = props => {
    return <div>page</div>;
};
export async function getServerSideProps(context) {
    return {
        props: {}
    };
}
export default Page;
```

这样便可以从页面组件中直接使用 `props` 来获取 `getServerSideProps` 注入的 `props` 了。

## ts 定义

如果是在 `TS` 中 `next.js` 也提供了 `GetServerSideProps` 接口来方便智能提示。

```ts
import { GetServerSideProps } from 'next';
export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {}
    };
};
```

## context

`getServerSideProps` 中的 `context` 参数包含了常用的请求的 `req`、`res`、`params`、`query` 等参数，还包含了 `preview`、`previewData`、`resolvedUrl`、`locale` 等参数

## 实现

当 `getServerSideProps` 所在页面为 `SSR` 服务端渲染时，`getServerSideProps` 中的数据将会被放到全局的 `_NEXT_DATA` 中，用于 `hydrate`。

而非 `SSR` 情况下，进入该页面 `next.js` 将会自动发请求到： `_next/data/development/{url}.json?{query}`，其中 `development` 为开发环境下地址段，该请求的返回值为：

```json
{
    "pageProps": "返回的 props 数据内容",
    "__N_SSP": true
}
```

从而将 `getServerSideProps` 返回值在页面挂载时注入进去。

## 请求 API

需要注意 `getServerSideProps` 为 `node server` 端代码，无法在其中直接请求内部 `API`，因为会找不到地址（外部 `API` 可以请求，认为是这段代码是独立的 `node` 端代码就行了）。如果想要调用内部 `API` 可以将对应的 `API handler` 拆解，作为方法调用。

```ts
// api/test.ts
export const getContent = async () => {
    return content;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<T[]>>) {
    res.status(200).json({
        code: 0,
        data: await getContent()
    });
}
```

```ts
// pages/page.tsx
import { getContent } from './api/test.ts';

export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: await getContent()
    };
};
```

## 问题

还有一点需要注意的是，虽然 `getServerSideProps` 为 `server` 端代码，但是客户端打包时好似仍然会将对应的代码打包到页面中，所以应当尽量避免其中有过于复杂的逻辑或引入一些较大的包。

## 特殊处理 - 404、跳转、异常

`getServerSideProps` 返回值除了可以设置 `props` 外还可以使用 `notFound` 来强制页面跳转到 404。

```tsx
export async function getServerSideProps(context) {
    const data = await getData();

    if (!data) {
        return {
            notFound: true
        };
    }

    return {
        props: { data }
}
```

或者是使用 `redirect` 来将页面重定向。

```tsx
export async function getServerSideProps(context) {
    const data = await getData();

    if (!data) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    return {
        props: { data }
    };
}
```

并且如果 `getServerSideProps` 报错了，`next.js` 将会直接跳转到 500 页面，又省下一段异常处理代码，可喜可贺。

## 总结

通过 `next.js` 的 `getServerSideProps`，我们在开发中可以很好的协调前后端数据，一些页面初始化数据、页面鉴权可以直接在 `getServerSideProps` 中进行处理，这样可以大大简化页面逻辑，还保障前后端的统一性。
