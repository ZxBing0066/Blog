---
tags: [next.js, React, SSG, ISR, 源码解析]
summary: 解析 next.js 中的 getStaticProps、getStaticPaths 相关的源码，SSG、ISR 的相关实现等。
cover: https://stg.heyfe.org/images/blog-next.js-1690694536769.webp
---

# next.js 源码解析 - getStaticProps、getStaticPaths 篇

😂 好久前写了关于 getStaticProps 和 getStaticPaths 的内容，然而半年过去了源码解析就一直忘记了，不久前有人提醒才想起来，补下坑。

## SSG 处理

首先 `getStaticProps` 是应用于 SSG 场景，我们先看下 `packages/next/server/render.tsx` 中相关的代码：

```ts
const isSSG = !!getStaticProps;
const pageIsDynamic = isDynamicRoute(pathname);

if (isSSG && !isFallback) {
    let data: UnwrapPromise<ReturnType<GetStaticProps>>;

    try {
        data = await getStaticProps!({
            ...(pageIsDynamic ? { params: query as ParsedUrlQuery } : undefined),
            ...(isPreview ? { preview: true, previewData: previewData } : undefined),
            locales: renderOpts.locales,
            locale: renderOpts.locale,
            defaultLocale: renderOpts.defaultLocale
        });
    } catch (staticPropsError: any) {
        // ....
    }
    // ...
}
```

isFallback 可以先不管。可以看到 getStaticProps 同样可以为异步函数，而是否为 SSG 就是由是否存在 getStaticProps 函数来决定的，pageIsDynamic 则必须配合 getStaticPaths 使用，可以看到 getStaticProps 会接收几个参数：

-   params: 在动态页面的路由参数
-   previewData 和 preview: preview 模式的相关数据
-   locales, locale 和 defaultLocale: 多语言相关参数

执行完成后 getStaticProps 的返回值会被放入 pageProps 中。

再看看 invalidKeys 相关部分，除了 `revalidate`、`props`、`redirect` 和 `notFound` 外别的属性都会被视为非法。

```ts
const invalidKeys = Object.keys(data).filter(
    key => key !== 'revalidate' && key !== 'props' && key !== 'redirect' && key !== 'notFound'
);

if (invalidKeys.includes('unstable_revalidate')) {
    throw new Error(UNSTABLE_REVALIDATE_RENAME_ERROR);
}

if (invalidKeys.length) {
    throw new Error(invalidKeysMsg('getStaticProps', invalidKeys));
}
```

然后还有关于 `notFound` 和 `redirect` 的处理：

```ts
if ('notFound' in data && data.notFound) {
    if (pathname === '/404') {
        throw new Error(`The /404 page can not return notFound in "getStaticProps", please remove it to continue!`);
    }

    (renderOpts as any).isNotFound = true;
}

if ('redirect' in data && data.redirect && typeof data.redirect === 'object') {
    checkRedirectValues(data.redirect as Redirect, req, 'getStaticProps');

    if (isBuildTimeSSG) {
        throw new Error(
            `\`redirect\` can not be returned from getStaticProps during prerendering (${req.url})\n` +
                `See more info here: https://nextjs.org/docs/messages/gsp-redirect-during-prerender`
        );
    }

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

notFound 会使用 `renderOpts.isNotFound` 来标识，而 redirect 则会在 props 中通过 \_\_N_REDIRECT 相关的参数来进行标识。

当然这里省略很多的校验，比如 getStaticProps 和 getServerSideProps 冲突、getStaticPaths 的检查、notFound 和 redirect 不能同时存在等。

```ts
props.pageProps = Object.assign({}, props.pageProps, 'props' in data ? data.props : undefined);
```

## ISR 处理

然后是与 `revalidate` 相关的内容，也就是 ISR 相关的逻辑

```ts
if ('revalidate' in data) {
    if (typeof data.revalidate === 'number') {
        if (!Number.isInteger(data.revalidate)) {
            throw new Error(
                `A page's revalidate option must be seconds expressed as a natural number for ${req.url}. Mixed numbers, such as '${data.revalidate}', cannot be used.` +
                    `\nTry changing the value to '${Math.ceil(
                        data.revalidate
                    )}' or using \`Math.ceil()\` if you're computing the value.`
            );
        } else if (data.revalidate <= 0) {
            throw new Error(
                `A page's revalidate option can not be less than or equal to zero for ${req.url}. A revalidate option of zero means to revalidate after _every_ request, and implies stale data cannot be tolerated.` +
                    `\n\nTo never revalidate, you can set revalidate to \`false\` (only ran once at build-time).` +
                    `\nTo revalidate as soon as possible, you can set the value to \`1\`.`
            );
        } else if (data.revalidate > 31536000) {
            // if it's greater than a year for some reason error
            console.warn(
                `Warning: A page's revalidate option was set to more than a year for ${req.url}. This may have been done in error.` +
                    `\nTo only run getStaticProps at build-time and not revalidate at runtime, you can set \`revalidate\` to \`false\`!`
            );
        }
    } else if (data.revalidate === true) {
        // When enabled, revalidate after 1 second. This value is optimal for
        // the most up-to-date page possible, but without a 1-to-1
        // request-refresh ratio.
        data.revalidate = 1;
    } else if (data.revalidate === false || typeof data.revalidate === 'undefined') {
        // By default, we never revalidate.
        data.revalidate = false;
    } else {
        throw new Error(
            `A page's revalidate option must be seconds expressed as a natural number. Mixed numbers and strings cannot be used. Received '${JSON.stringify(
                data.revalidate
            )}' for ${req.url}`
        );
    }
} else {
    // By default, we never revalidate.
    (data as any).revalidate = false;
}
```
