---
lastUpdate: 2023-7-30
date: 2023-7-30
tags: [next.js, React, 源码解析]
summary: 解析 next.js 中的 dynamic import 相关的源码实现。
cover: https://stg.heyfe.org/images/blog-next.js-1690694536769.webp
---

# next.js 源码解析 - dynamic 篇

上文我们一起看完了在 `next.js` 中如何解决 `hydration fail` 的错误和如何局部关闭 `SSR` 的几个方案，其中聊到了 `next.js` 的 `dynamic API`。老规矩，今天我们一起来看看 `dynamic API` 的源码实现。

## API

因为昨天的文章中主要讲到如何使用 `dynamic` 关闭组件 `SSR`，并未讲到其它细节，所以先看下 `dynamic` 的具体 `API` 设计。`dynamic` 的设计很容易让人想到 `React.lazy`，事实上也确实差不多，不过 `dynamic` 比 `React.load` 多了一些功能。`dynamic` 除了 `ssr` 外，还支持 `suspense` 和 `loading` 参数。

当 `suspense` 为 `true` 时类似 `React.lazy` 的常见写法，我们需要使用 `Suspense` 来包裹异步组件：

```jsx
const DynamicHeader = dynamic(() => import('../components/header'), {
    suspense: true
});

export default function Home() {
    return (
        <Suspense fallback={`Loading...`}>
            <DynamicHeader />
        </Suspense>
    );
}
```

而当使用提供的 `loading` 参数时，我们则可以直接将 `fallback` 作为 `loading` 参数传入：

```jsx
const DynamicHeader = dynamic(() => import('../components/header'), {
    loading: () => <div>Loading...</div>
});
```

这种情况下 `next.js` 会在组件加载过程中显示 `loading` 的内容来占位，这里其实在内部使用的是 `react-loadable`。

## 源码

我们再来看下源代码，`dynamic` 所在的文件位置为 `packages/next/shared/lib/dynamic.tsx`，我们下面分块解析一下，先看下接口部分：

```tsx
function dynamic<P = {}>(
    dynamicOptions: DynamicOptions<P> | Loader<P>,
    options?: DynamicOptions<P>
): React.ComponentType<P>;
export type DynamicOptions<P = {}> = LoadableGeneratedOptions & {
    loading?: (loadingProps: DynamicOptionsLoadingProps) => JSX.Element | null;
    loader?: Loader<P> | LoaderMap;
    loadableGenerated?: LoadableGeneratedOptions;
    ssr?: boolean;
    suspense?: boolean;
};
```

看接口就可以猜到其实 `dynamic` 可以只接受一个参数，将 `loader` 放在属性中就行了：

```tsx
const DynamicHeader = dynamic({
    loading: () => <div>Loading...</div>,
    loader: () => import('../components/header')
});
```

`loading`、`suspense` 和 `ssr` 参数我们上面都提到了，但是这里还有个 `loadableGenerated` 参数，别急我们一会就会看到。

```tsx
import Loadable from './loadable';

let loadableFn: LoadableFn<P> = Loadable;

let loadableOptions: LoadableOptions<P> = options?.suspense
    ? {}
    : {
          loading: ({ error, isLoading, pastDelay }) => {
              if (!pastDelay) return null;
              if (process.env.NODE_ENV === 'development') {
                  if (isLoading) {
                      return null;
                  }
                  if (error) {
                      return (
                          <p>
                              {error.message}
                              <br />
                              {error.stack}
                          </p>
                      );
                  }
              }

              return null;
          }
      };
```

可以看到这里用到了 `Loadable`，其实就是 `react-loadable` 这个库，只是 `next.js` 将源码放在了自己的仓库中，然后根据是否为 `suspense` 初始化 `loadableOptions`。这里可以看到默认的 `loading` 参数，在开发环境下如果异步组件加载有报错将会进行展示。

然后 `next.js` 将会判断接收的参数类型将 `dynamicOptions` 和 `options` 参数合并到 `loadableOptions`：

```tsx
if (dynamicOptions instanceof Promise) {
    loadableOptions.loader = () => dynamicOptions;
} else if (typeof dynamicOptions === 'function') {
    loadableOptions.loader = dynamicOptions;
} else if (typeof dynamicOptions === 'object') {
    loadableOptions = { ...loadableOptions, ...dynamicOptions };
}
loadableOptions = { ...loadableOptions, ...options };
```

紧接着会对环境和参数进行参数检查，如 `suspense` 开启时不能关闭 `ssr`，`suspense` 时不能使用 `loading`，接着会处理我们上面看到的 `loadableGenerated` 参数：

```tsx
if (loadableOptions.loadableGenerated) {
    loadableOptions = {
        ...loadableOptions,
        ...loadableOptions.loadableGenerated
    };
    delete loadableOptions.loadableGenerated;
}
```

`loadableGenerated` 会被合并到 `loadableOptions` 中。然后就到了最后一段逻辑：

```tsx
if (typeof loadableOptions.ssr === 'boolean' && !loadableOptions.suspense) {
    if (!loadableOptions.ssr) {
        delete loadableOptions.ssr;
        return noSSR(loadableFn, loadableOptions);
    }
    delete loadableOptions.ssr;
}

return loadableFn(loadableOptions);
```

可以看到当 `ssr` 参数被设置为 `false` 时并且非 `suspense` 时，将会直接返回 `noSSR`，否则将会直接调用 `react-loadable`，将上面拼接出的 `loadableOptions` 进行传入，我们再看下 `noSSR`：

```tsx
const isServerSide = typeof window === 'undefined';
export function noSSR<P = {}>(
    LoadableInitializer: LoadableFn<P>,
    loadableOptions: DynamicOptions<P>
): React.ComponentType<P> {
    // Removing webpack and modules means react-loadable won't try preloading
    delete loadableOptions.webpack;
    delete loadableOptions.modules;

    if (!isServerSide) {
        return LoadableInitializer(loadableOptions);
    }

    const Loading = loadableOptions.loading!;
    return () => <Loading error={null} isLoading pastDelay={false} timedOut={false} />;
}
```

可以看到这里一样会使用 `window` 来判断代码环境，如果为客户端渲染，将会直接调用 `react-loadable`，而服务端将会使用 `loading` 参数进行渲染。

到这里源码解读就结束了，可能又同学会疑惑，在 `ssr` 关闭的情况下，客户端依旧会使用 `react-loadable` 进行渲染，而服务端则会直接渲染 `Loading`，那为啥不会出现 `hydration fail` 的错误？我一开始也愣了一下，想了想 `react-loadable` 在客户端初始化渲染的也是 `loading` 的内容，所以确实没问题的。😂

## 存疑

在 `noSSR` 中使用到两个参数 `webpack` 和 `modules`，看注释此处表示如果使用了 `webpack` 和 `modules` 参数，`react-loadable` 将会进行预加载，不过我目前没找到这两个参数是什么时候注入的，`dynamic` 中打断点确实存在，猜测为打包时注入的，先记录下。

## 总结

综上可以看出 `next.js` 的 `dynamic` 其实是将 `React.lazy` 和 `react-loadable` 两个方法进行了组合，本身代码量也并不算多，一定程度上对异步组件的使用进行了收口，有利于项目中的代码规范和代码的一致性。
