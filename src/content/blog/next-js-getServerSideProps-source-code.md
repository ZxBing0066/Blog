---
title: next.js 源码解析 - getServerSideProps 篇
description: 解析 next.js 中的 getServerSideProps 相关的源码，SSR 实现等。
pubDate: '2022-10-10'
heroImage: 'https://stg.heyfe.org/images/blog-next.js-1690694536769.webp'
tags:
  - next.js
  - React
  - SSR
  - 源码解析
---

老规矩，昨天写了关于 `getServerSideProps` 的内容，今天趁热写一下 `getServerSideProps` 相应的源码，看看 `next.js getServerSideProps` 是怎么实现的，还有什么从文档无法知晓的细节。

## SSR 处理

我们先从 `SSR` 时相关的 `getServerSideProps` 处理看起，源码排查步骤上一步已经有所介绍，本篇不再多说，在 `SSR` 时，`next.js` 会调用 `doRender` 来进行渲染，其中会再次调用 `renderHTML`，进过各种判断和调用最终会进入 `packages/next/server/render.tsx` 中的 `renderToHTML` 进行处理。

```ts
// const SERVER_PROPS_ID = "__N_SSP";
if (getServerSideProps) {
    props[SERVER_PROPS_ID] = true;
}
```

`next.js` 会先将 `props` 中的 `SERVER_PROPS_ID` 设置为 `true`，用做标识。

```ts
try {
    data = await getServerSideProps({
        req: req as IncomingMessage & {
            cookies: NextApiRequestCookies;
        },
        res: resOrProxy,
        query,
        resolvedUrl: renderOpts.resolvedUrl as string,
        ...(pageIsDynamic ? { params: params as ParsedUrlQuery } : undefined),
        ...(previewData !== false ? { preview: true, previewData: previewData } : undefined),
        locales: renderOpts.locales,
        locale: renderOpts.locale,
        defaultLocale: renderOpts.defaultLocale
    });
    canAccessRes = false;
} catch (serverSidePropsError: any) {
    if (isError(serverSidePropsError) && serverSidePropsError.code === 'ENOENT') {
        delete serverSidePropsError.code;
    }
    throw serverSidePropsError;
}

if (data == null) {
    throw new Error(GSSP_NO_RETURNED_VALUE);
}

if ((data as any).props instanceof Promise) {
    deferredContent = true;
}

const invalidKeys = Object.keys(data).filter(key => key !== 'props' && key !== 'redirect' && key !== 'notFound');
if (invalidKeys.length) {
    throw new Error(invalidKeysMsg('getServerSideProps', invalidKeys));
}
```

注意这里的 `getServerSideProps` 是从外层传进来了，因为涉及的代码较多，就不贴了，主要是通过 `packages/next/server/load-components` 中的 `loadComponents`，将路由文件中的 `getServerSideProps` 通过从 `require` 后的页面中取出。~~不过挺好奇他在 `node` 端是怎么 `require` 页面代码而不报错的，毕竟页面代码中很可能会存在依赖浏览器环境的代码，估计是做了一些类似于 `runtime shim` 之类的操作？此处先挖个坑，以后有空研究下~~。突然想起页面都是 `SSR` 了，初始化代码肯定都做过处理了 😂。

上面的代码可以看出 `SSR` 的时候是直接调用 `getServerSideProps` 传入 `context` 内容，`context` 的内容也一目了然。然后 `next.js` 会校验返回值是否为空，或者是否包含非法参数等。

然后回去检查 `notFound` 和 `redirect` 参数，进行特殊处理。

```ts
if ('notFound' in data && data.notFound) {
    if (pathname === '/404') {
        throw new Error(`The /404 page can not return notFound in "getStaticProps", please remove it to continue!`);
    }

    (renderOpts as any).isNotFound = true;
    return null;
}

if ('redirect' in data && typeof data.redirect === 'object') {
    checkRedirectValues(data.redirect as Redirect, req, 'getServerSideProps');
    (data as any).props = {
        __N_REDIRECT: data.redirect.destination,
        __N_REDIRECT_STATUS: getRedirectStatus(data.redirect)
    };
    if (typeof data.redirect.basePath !== 'undefined') {
        (data as any).props.__N_REDIRECT_BASE_PATH = data.redirect.basePath;
    }
    (renderOpts as any).isRedirect = true;
}
```

此外从上面这段代码还发现一个有意思的就是 `props` 是可以为 `Promise` 的：

```ts
if ((data as any).props instanceof Promise) {
    deferredContent = true;
}
```

返回 `Promise` 时，`next.js` 会在异常处理完毕后获取值：

```ts
if (deferredContent) {
    (data as any).props = await(data as any).props;
}
```

最后 `next.js` 会将获取到的 `props` 值放入到顶层的 `props` 中：

```ts
props.pageProps = Object.assign({}, props.pageProps, (data as any).props);
(renderOpts as any).pageData = props;
```

在 `SSR` 时，我们在页面中看到的用于 `hydrate` 的 `__NEXT_DATA__` 中的 `props` 就是这个 `props`，可以再看一眼其中的数据：

```html
<script id="__NEXT_DATA__" type="application/json">
    {
        "props": {
            "pageProps": {
                "feature": {
                    "name": "xxxx",
                    "desc": "xxxx",
                    "tags": ["xxx"],
                    "id": "account-manage"
                }
            },
            "__N_SSP": true
        },
        "page": "/feature/[fid]",
        "query": { "fid": "account-manage" },
        "buildId": "development",
        "isFallback": false,
        "gssp": true,
        "scriptLoader": []
    }
</script>
```

可以看到 `pageProps` 和 `__N_SSP` 都是上面放进去的。

## 动态加载处理

看完了 `SSR` 场景下，`next.js` 如何处理 `getServerSideProps`，我们再看下页面为动态加载时的处理。

通过跳转时发起请求的调用栈，我们很轻松就能找到在页面为动态加载时，`next.js` 将会通过 `packages/next/shared/lib/router.ts` 中的 `getRouteInfo` 来获取要跳转的页面信息，然后会通过 `routeInfo` 的 `__N_SSP` 判定是否要去获取数据：

```ts
const shouldFetchData = routeInfo.__N_SSG || routeInfo.__N_SSP;
if (shouldFetchData) {
    const { json, cacheKey: _cacheKey } = data?.json
        ? data
        : await fetchNextData({
              dataHref: this.pageLoader.getDataHref({
                  href: formatWithValidation({ pathname, query }),
                  asPath: resolvedAs,
                  locale
              }),
              isServerRender: this.isSsr,
              parseJSON: true,
              inflightCache: this.sdc,
              persistCache: !isPreview,
              isPrefetch: false,
              unstable_skipClientCache
          });

    return {
        cacheKey: _cacheKey,
        props: json || {}
    };
}
```

然后通过 `fetchNextData` 来获取数据，而我们上文提到的 `_next/data/development/{url}.json?{query}` 这段 `URL` 就是由 `formatWithValidation` 构建生成的。

而请求发送后服务端的处理就七绕八绕逻辑太深了，这里不一一列举代码，简单说下：`next.js` 会通过 `/_next/data/` 匹配请求判断是否是数据请求，如果是数据请求将会一样执行 `SSR`代码，然后可以理解为走的就是上面 `SSR` 初始化时的那套逻辑，只是最后会按照数据请求标识，将 `props` 抽离出来，放到响应中中返回。

## 总结

`getServerSideProps` 相关的源码还是有点绕的，其中应该还少了一些其它场景的相关代码，不过只看主场景应该就是这些了。