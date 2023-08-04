---
tags: [next.js, React, SSG]
summary: 介绍 next.js 中的 getStaticProps、getStaticPaths 如何使用，SSG 如何实现等。
cover: https://stg.heyfe.org/images/blog-next.js-1690694536769.webp
---

# next.js - getStaticProps、getStaticPaths 篇

之前讲过 `next.js` 中的 `getServerSideProps`，今天来讲一讲另一个很类似的 `API`：`getStaticProps`，以及和 `getStaticProps` 紧密相关的 `getStaticPaths`。

`getStaticProps` 主要用于构建时落地一些静态数据，但不同于 `getServerSideProps`，`getStaticProps` 默认情况下只会在构建时执行一次，之后的每次请求都会使用构建时的数据。在 `ISR`、`SSG` 等场景下还有不同的表现。

而 `getStaticPaths` 则用于配合 `getServerSideProps` 实现动态路由的构建，`next.js` 会在构建时根据 `getStaticPaths` 的返回值来生成对应的静态页面。

## 使用

先看下 `getStaticProps` 如何使用，其实和 `getServerSideProps` 用法差不多：

```ts
export default function GetStaticProps({ content }: { content: string }) {
    return (
        <div>
            <header>getStaticProps</header>
            <main>{content}</main>
        </div>
    );
}

export const getStaticProps = async () => {
    const content = 'Hello World';
    console.log('call getStaticProps');

    return {
        props: {
            content
        }
    };
};
```

只需要在 `page` 中导出 `getStaticProps` 函数，然后在函数中返回 `props` 即可。在 `page` 渲染组件中就可以直接通过 `props` 即可获得数据。

## 调用时机

再来看下 `getStaticProps` 的调用时机，这里和 `getServerSideProps` 存在很大差异：

-   当执行 `next build` 时
-   当 `getStaticPaths` 返回 `fallback` 不为 `false` 时
-   当使用了 `revalidate` 时

上面给出的例子是 `getStaticProps` 最简单的一个例子，只有在执行 `next build` 时才会调用 `getStaticProps`，之后的每次请求都会使用构建时的数据。

构建时 `next.js` 会将其构建为 `html`，并且还会构建一份 `json` 文件，存储 `getStaticProps` 的返回值，在访问时初次进入页面为该页面时会直接使用 `html` 内容，而非初次进入则会去请求该 `json` 文件获取数据进行渲染。

`json` 文件中的数据如下：

```json
{ "pageProps": { "content": "Hello World" }, "__N_SSG": true }
```

可以看到和之前讲到的 `getServerSideProps` 的返回值是基本一致的，只是将 `__N_SSP` 参数变更为 `__N_SSG`，用以区分两个数据的类型。

## 开发时的 getStaticProps

需要注意的是，**在开发时也就是 `next dev` 时，`getStaticProps` 会在每次页面访问时被请求**，也就是和 `getServerSideProps` 行为基本一致，刚上手时很容易对这里感到困惑。

## 使用 getStaticPaths

`getStaticPaths` 主要用于动态路由中的静态页面构建，简单说就是将一个动态路由通过 `getStaticPaths` 转换为多个静态页面。

下面看下一个简单的例子：

`pages/get-static-paths/[id].tsx`

```tsx
function GetStaticPaths({ post }: { post: string }) {
    return (
        <div>
            <h1>Post: {post}</h1>
        </div>
    );
}

export async function getStaticPaths() {
    const paths = new Array(10).fill(0).map((_, i) => ({
        params: { id: i + 1 + '' }
    }));

    console.log('paths', paths);

    return { paths, fallback: true };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    console.log('params', params);

    return { props: { post: `post ${params.id}` } };
}

export default GetStaticPaths;
```

此处是一个简单的动态路由，通过 `getStaticPaths` 我们可以定义该动态路由的匹配的路由值，通过 `paths[number]` 中的 `params` 参数和动态路由中的参数进行匹配。以下是 `next.js` 将其转换为静态页面的步骤中 `getStaticPaths` 和 `getStaticProps` 相关的部分。

1. 调用 `next build` 命令，`next.js` 会进行页面数据的收集，检测到动态路由时会尝试调用 `getStaticPaths` 并获取其返回值。
2. 将返回值中的 `paths` 进行遍历，依次取出和动态路由进行匹配，匹配后进行静态页面的生成步骤。
3. 将 `path` 中的 `params` 传入 `getStaticProps` 中，执行 `getStaticProps` 获取返回值。
4. 通过返回值生成相应的 `html` 和 `json` 文件

所以上述代码我们在 `next build` 时将会生成 10 个静态页面 `[1-10].html` 和 10 个 `JSON` 文件 `[1-10].json`，生成的文件可以到 `.next/server/pages/` 下查看。

![picture 1](https://stg.heyfe.org/images/blog-next-js-getStaticProps-1.png)

### fallback

此外上面的 `DEMO` 中可以看到 `fallback` 参数，`fallback` 其实有三个可选值：`true`、`false` 和 `blocking`，主要是用于控制**访问动态路由时该地址未落地成静态页面时的处理**。

`false` 时基本就只有上述行为，当访问不存在的页面时会返回 404 页面，比如上面访问到 `/get-static-paths/11` 时会返回 404。

而 `fallback` 为 `true` 时会有一些不同，当访问不存在的页面时不会返回 404，而是会返回动态路由页面，并且使用页面参数去请求 `getStaticProps` 数据，然后生成静态页面和 `JSON` 文件并将 `JSON` 文件返回动态渲染到页面中。而二次访问该页面时由于已经有了静态页面，就和其他已存在页面行为一致了。可以理解为一种 `lazy build`。

`fallback` 为 `blocking` 时行为和 `true` 基本一致，但不同的是当访问不存在的页面时会等待 `getStaticProps` 执行完成后再返回页面，不需要进行二次数据请求。所以初次访问表现不一致，一个为异步一个为同步。

![picture 2](https://stg.heyfe.org/images/blog-next-js-getStaticProps-2.png)

### 注意点

这里还有一个比较需要关注的问题是 `getStaticPaths` 中的 `params` 中的**参数需要为字符串**，否则将会导致无法匹配，猜测为 `next.js` 中进行了类型判断或 `map` 操作，这个在后续源码分析中细看。

此外和 `getStaticProps` 一样，在开发环境下 `getStaticPaths` 也会在每次访问时被调用。

## 和 getServerSideProps

需要注意 `getStaticProps` 和 `getServerSideProps` 无法混用，在 `next.js` 的定位中，`getStaticProps` 主要用于 `SSG` 场景，而 `getServerSideProps` 主要用于 `SSR` 场景，在同一页面中使用时将会提示：`You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`。

当然，个人觉得从设计上进行混用也没啥问题，`getStaticProps` 落地静态数据、`getServerSideProps` 落地动态数据，然后动态覆盖静态即可，`next.js` 这么设计可能是为了遵循单一职能原则。

## 总结

最后来聊一聊什么场景下我们应该使用 `getStaticProps`，其实官方使用文档里有列出推荐的使用场景，我这边说下自己的想法：如果页面中的数据是通过发布行为来进行更新的，那么就可以使用 `getStaticProps`。当然，要注意数据的安全性等问题。如果遇到页面中既有动态数据又有静态数据，那还是老老实实使用 `getServerSideProps` 吧。

当然，有同学可能发现上面只讲了两种 `getStaticProps` 的场景，而 `revalidate` 的场景没讲到，由于 `revalidate` 和 `ISR` 相关，这个后面再说（下次一定，逃～）。
