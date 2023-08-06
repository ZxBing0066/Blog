---
tags: [next.js, React, SSG, 源码解析]
summary: 解析 next.js 中的 getStaticProps、getStaticPaths 相关的源码，SSG 的相关实现等。
cover: https://stg.heyfe.org/images/blog-next.js-1690694536769.webp
---

# next.js 源码解析 - getStaticProps、getStaticPaths 篇

> 😂 好久前写了关于 `getStaticProps` 和 `getStaticPaths` 的内容，然而半年过去了源码解析就一直忘记了，不久前有人提醒才想起来，补下坑。

本文主要是解读下 `getStaticProps`、`getStaticPaths` 相关的源码，不了解这两个 `API` 的建议先看下之前的文章再看。👀

## getStaticProps

首先 `getStaticProps` 是应用于 `SSG` 场景，我们先看下 `packages/next/server/render.tsx` 中相关的代码：

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

`isFallback` 可以先不管。可以看到 `getStaticProps` 同样可以为异步函数，而是否为 `SSG` 就是由是否存在 `getStaticProps` 函数来决定的，`SSG` 场景下的 `pageIsDynamic` 则必须配合 `getStaticPaths` 使用，可以看到 `getStaticProps` 会接收几个参数：

-   `params` 是在动态页面的路由参数
-   `previewData` 和 `preview: preview` 模式的相关数据
-   `locales, locale` 和 `defaultLocale` 多语言相关参数

执行完成后 `getStaticProps` 的返回值会被放入 `pageProps` 中。

再看看 `invalidKeys` 相关部分，除了 `revalidate`、`props`、`redirect` 和 `notFound` 外别的属性都会被视为非法。

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

`notFound` 会使用 `renderOpts.isNotFound` 来标识，而 `redirect` 则会在 `props` 中通过 `__N_REDIRECT` 相关的参数来进行标识。

当然这里省略很多的校验，比如 `getStaticProps` 和 `getServerSideProps` 冲突、`getStaticPaths` 的检查、`notFound` 和 `redirect` 不能同时存在等。

```ts
props.pageProps = Object.assign({}, props.pageProps, 'props' in data ? data.props : undefined);
```

然后其中还包含了一部分与 `revalidate` 相关的内容，主要是一些检测和值的处理，主要与 `ISR` 相关的此处先跳过。

## getStaticPaths

`getStaticPaths` 的相关的调用源码主要在 `packages/next/build/utils.ts` 文件中的 `buildStaticPaths` 中，`buildStaticPaths` 会在两个时候被调用，一个是 `next.js` 构建的时候，第二个是 `next.js` 的 `devServer` 中。在 `next.js` 遇到动态路由时，会按照 `buildStaticPaths` 和 `getStaticProps` 来决定是否启用 `SSG` 模式，启用则会调用 `buildStaticPaths` 获取该动态路由所对应的需要构建的所有静态页面。

```ts
if (getStaticPaths) {
    staticPathsResult = await getStaticPaths({ locales, defaultLocale });
}

if (!staticPathsResult || typeof staticPathsResult !== 'object' || Array.isArray(staticPathsResult)) {
    throw new Error(
        `Invalid value returned from getStaticPaths in ${page}. Received ${typeof staticPathsResult} ${expectedReturnVal}`
    );
}

const invalidStaticPathKeys = Object.keys(staticPathsResult).filter(key => !(key === 'paths' || key === 'fallback'));

if (invalidStaticPathKeys.length > 0) {
    throw new Error(
        `Extra keys returned from getStaticPaths in ${page} (${invalidStaticPathKeys.join(', ')}) ${expectedReturnVal}`
    );
}

if (!(typeof staticPathsResult.fallback === 'boolean' || staticPathsResult.fallback === 'blocking')) {
    throw new Error(`The \`fallback\` key must be returned from getStaticPaths in ${page}.\n` + expectedReturnVal);
}

const toPrerender = staticPathsResult.paths;

if (!Array.isArray(toPrerender)) {
    throw new Error(
        `Invalid \`paths\` value returned from getStaticPaths in ${page}.\n` +
            `\`paths\` must be an array of strings or objects of shape { params: [key: string]: string }`
    );
}
```

在 `buildStaticPaths` 第一部分是获取 `getStaticPaths` 的返回值，并对其返回值进行检查：

1. `getStaticPaths` 可以为 `async` 方法
2. `getStaticPaths` 接受两个参数：`locales` 和 `defaultLocale`
3. 返回值必须为 `{paths: Array, fallback: boolean | 'blocking'}` 结构

而在拿到 `toPrerender` 之后，`next.js` 会将其转换为 `prerenderPaths` 和 `encodedPrerenderPaths`，这两个 `set` 的数据集基本一致，只是一个 `path` 为已经被解码，一个没有，猜测是为了性能考虑空间换时间。

```ts
toPrerender.forEach(entry => {
    if (typeof entry === 'string') {
        entry = removeTrailingSlash(entry);

        const localePathResult = normalizeLocalePath(entry, locales);
        let cleanedEntry = entry;

        if (localePathResult.detectedLocale) {
            cleanedEntry = entry.slice(localePathResult.detectedLocale.length + 1);
        } else if (defaultLocale) {
            entry = `/${defaultLocale}${entry}`;
        }

        const result = _routeMatcher(cleanedEntry);
        if (!result) {
            throw new Error(`The provided path \`${cleanedEntry}\` does not match the page: \`${page}\`.`);
        }

        // If leveraging the string paths variant the entry should already be
        // encoded so we decode the segments ensuring we only escape path
        // delimiters
        prerenderPaths.add(
            entry
                .split('/')
                .map(segment => escapePathDelimiters(decodeURIComponent(segment), true))
                .join('/')
        );
        encodedPrerenderPaths.add(entry);
    } else {
        // ...
    }
});
```

针对 `string` 类型的 `entry`，简单的处理下语言、路径即可。

```ts
const _validParamKeys = Object.keys(_routeMatcher(page));
if (typeof entry === 'string') {
    // ...
} else {
    const invalidKeys = Object.keys(entry).filter(key => key !== 'params' && key !== 'locale');

    if (invalidKeys.length) {
        throw new Error('...');
    }

    const { params = {} } = entry;
    let builtPage = page;
    let encodedBuiltPage = page;

    _validParamKeys.forEach(validParamKey => {
        const { repeat, optional } = _routeRegex.groups[validParamKey];
        let paramValue = params[validParamKey];
        if (
            optional &&
            params.hasOwnProperty(validParamKey) &&
            (paramValue === null || paramValue === undefined || (paramValue as any) === false)
        ) {
            paramValue = [];
        }
        if ((repeat && !Array.isArray(paramValue)) || (!repeat && typeof paramValue !== 'string')) {
            throw new Error('...');
        }
        let replaced = `[${repeat ? '...' : ''}${validParamKey}]`;
        if (optional) {
            replaced = `[${replaced}]`;
        }
        builtPage = builtPage
            .replace(
                replaced,
                repeat
                    ? (paramValue as string[]).map(segment => escapePathDelimiters(segment, true)).join('/')
                    : escapePathDelimiters(paramValue as string, true)
            )
            .replace(/(?!^)\/$/, '');

        encodedBuiltPage = encodedBuiltPage
            .replace(
                replaced,
                repeat
                    ? (paramValue as string[]).map(encodeURIComponent).join('/')
                    : encodeURIComponent(paramValue as string)
            )
            .replace(/(?!^)\/$/, '');
    });

    if (entry.locale && !locales?.includes(entry.locale)) {
        throw new Error('...');
    }
    const curLocale = entry.locale || defaultLocale || '';

    prerenderPaths.add(`${curLocale ? `/${curLocale}` : ''}${curLocale && builtPage === '/' ? '' : builtPage}`);
    encodedPrerenderPaths.add(
        `${curLocale ? `/${curLocale}` : ''}${curLocale && encodedBuiltPage === '/' ? '' : encodedBuiltPage}`
    );
}
```

而对于 `Object` 类型的 `entry`，则会先检查确保是 `{params, locale}` 结构，然后使用 `params` 对动态路由进行替换拼接。 `_validParamKeys` 是该动态路由页面中的参数的 `key` 数组。然后一样是路径和语言的处理。最终的返回值如下：

```ts
return {
    paths: [...prerenderPaths],
    fallback: staticPathsResult.fallback,
    encodedPaths: [...encodedPrerenderPaths]
};
```

当需要时 `next.js` 就会使用这里的 `paths` 来生成对应的静态页面，从而实现动态路由的 `SSG`。

## 总结

`getStaticProps`、`getStaticPaths` 相关的源码其实大部分都是在处理关于数据检查、处理这类的事情，因为这两个 `API` 的指责也都很简单：`getStaticPaths` 负责为动态路由的 `SSG` 场景提供页面列表，`getStaticProps` 则为 `SSG` 页面提供对应的页面数据。
