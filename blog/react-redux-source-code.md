---
lastUpdate: 2023-7-31
date: 2022-7-29
tags: [React, redux, 源码解析]
cover: https://stg.heyfe.org/images/blog-react-isr-demo-1690810719572.png
---

# React-Redux 源码解析

此处源码版本为：`720f0ba`

## 文件结构

老规矩，先看下文件结构（去掉一些不太重要的文件）。

```sh
├── components
│   ├── Context.ts
│   ├── Provider.tsx
│   └── connect.tsx
├── connect
├── exports.ts
├── hooks
│   ├── useDispatch.ts
│   ├── useReduxContext.ts
│   ├── useSelector.ts
│   └── useStore.ts
├── index.ts
├── next.ts
├── types.ts
└── utils
```

说实话看源码前我一直以为 `react-redux` 会比 `redux` 代码量更小，失算了。🤦‍♂️

## 源码分析

### 核心源码

不同于 `redux`，这里导出包裹两部分，一个是 `index.ts` 中导出的 `batch`（就是 `react-dom/react-native` 中的 `unstable_batchedUpdates`），一个是 `exports.ts` 中的导出。

```ts
export {
    Provider,
    ReactReduxContext,
    connect,
    useDispatch,
    useSelector,
    useStore,
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    shallowEqual
};
```

其中 `ReactReduxContext` 就是 `Provider` 用到的默认的 `Context`，`shallowEqual` 就是一个浅比较函数。

首先我们看下 `subscription`，因为 `Provider` 和 `connect` 中都有使用。代码我就不贴了，贴下定义：

```ts
function createSubscription(store: any, parentSub?: Subscription): Subscription;
const subscription: Subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe,
    tryUnsubscribe,
    getListeners: () => listenerCollection
};
```

源码中 `listenerCollection` 也叫 `listeners`，为了避免混淆，下面称为 `listenerCollection`

-   `parentSub` 可以认为是最顶层的 `subscription` 实例
-   `trySubscribe` 会调用 `addNestedSub` 订阅 `handleChangeWrapper`，其实就是将 `subscription.onStateChange` 添加到 `parentSub` 或 `store` 的订阅中，然后调用 `createListenerCollection` 创建 `listenerCollection`。`onStateChange` 需要手动添加，后面可以看到。
-   `listenerCollection` 中有以下几个方法
    -   `subscribe` 添加订阅，这里的 `listener` 为链表结构
    -   `clear` 清空所有的订阅
    -   `notify` 调用 `batch` 触发所有的 `listener`
    -   `get` 将 `listener` 转换为数组返回
-   `tryUnsubscribe` 会调用 `clear`
-   `notifyNestedSubs` 调用 `notify`
-   `addNestedSub(listener)` 调用 `trySubscribe` 并添加 `listener`

说实话逻辑有点绕，我们再看下 `Provider`，正好看下 `subscription` 的使用

```ts
function Provider<A extends Action = AnyAction>({ store, context, children, serverState }: ProviderProps<A>) {
    const contextValue = useMemo(() => {
        const subscription = createSubscription(store);
        return {
            store,
            subscription,
            getServerState: serverState ? () => serverState : undefined
        };
    }, [store, serverState]);

    const previousState = useMemo(() => store.getState(), [store]);

    useIsomorphicLayoutEffect(() => {
        const { subscription } = contextValue;
        subscription.onStateChange = subscription.notifyNestedSubs;
        subscription.trySubscribe();

        if (previousState !== store.getState()) {
            subscription.notifyNestedSubs();
        }
        return () => {
            subscription.tryUnsubscribe();
            subscription.onStateChange = undefined;
        };
    }, [contextValue, previousState]);

    const Context = context || ReactReduxContext;
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
```

可以看到 `Provider` 除了 `store` 外还接受 `context` 和 `serverState`，`context` 用于自定义 `context`。

这里还用到 `useIsomorphicLayoutEffect`，该 `hook` 可以认为就是 `useLayoutEffect`，只是因为在 `ssr` 时使用 `useLayoutEffect` 会报错，所以在服务端替换为 `useEffect`。这里主要用来处理 `subscription` 的注册和取消。

```ts
export const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;
```

可以看到这里 `subscription` 的 `onStateChange` 就是 `notifyNestedSubs`，所以在被包裹的组件中调用 `notifyNestedSubs` 时会触发此处的此处 `subscription` 的 `notifyNestedSubs`，从而将发布向上传递。讲真这里的代码是真的绕，感觉可以重新梳理一遍，比如可以保存 `parentSub` 然后调用其方法来将发布向上传递。

`serverState` 则是在 `SSR` 时客户端 `hydration` 时使用。这里结合文档看下场景：

```ts
const preloadedState = window.__PRELOADED_STATE__;

const clientStore = configureStore({
    reducer: rootReducer,
    preloadedState
});

hydrateRoot(
    document.getElementById('root'),
    <Provider store={clientStore} serverState={preloadedState}>
        <App />
    </Provider>
);
```

服务端将初始化的 `state` 写入 `window` `下，hydrate` 时会将该 `state` 传入 `serverState`，从而避免注水后 `state` 不一致的问题。

再看下 `contextValue`，其中除了刚刚讲到的 `getServerState`，还有传入的 `store` 和 `subscription`。`store` 就是 `redux` 的 `createStore` 创建的 `store`。

再看下 `connect` 部分，居然有七八百行，离谱。先看下 `ts` 定义：

```ts
function connect<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}, State = unknown>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
    {
        pure,
        areStatesEqual = strictEqual,
        areOwnPropsEqual = shallowEqual,
        areStatePropsEqual = shallowEqual,
        areMergedPropsEqual = shallowEqual,
        forwardRef = false,
        context = ReactReduxContext
    }: ConnectOptions<unknown, unknown, unknown, unknown> = {}
): unknown;
```

看下几个参数：

-   `mapStateToProps` 将 `store` 的 `state` 转换为 `props`
-   `mapDispatchToProps` 将 `dispatch` 转换为 `props`
-   `mergeProps` 将上述的 `props` 和原有的 `props` 进行合并
-   下面几个 `equal` 函数默认是 `strictEqual` 用于比较各种 `props`，特殊情况可以做一些性能优化或精细比较
-   可以看到这里还有 `context` 参数，由于 `Provider` 可以接受自定义 `context`，如果不在此处声明会导致 `connect` 中的 `context` 丢失。

返回值则是一个 `hoc` 方法：`wrapWithConnect`，`connect` 的主要逻辑也都在其中。

`connect` 上方的代码主要是处理 `mapStateToProps`、`mapDispatchToProps` 和 `mergeProps` 几个函数，并通过 `mapStateToProps` 来确定 `shouldHandleStateChanges`，用于判定 `state` 变更时是否需要处理。

下面从 `wrapWithConnect` 提出几个重要部分代码看下具体逻辑：

```ts
const displayName = `Connect(${wrappedComponentName})`;
const selectorFactoryOptions: SelectorFactoryOptions;
function ConnectFunction<TOwnProps>(props: InternalConnectProps & TOwnProps);
let Connect = React.memo(ConnectFunction);
Connect.WrappedComponent = WrappedComponent;
Connect.displayName = ConnectFunction.displayName = displayName;
if (forwardRef) {
    Connect = React.forwardRef(function forwardConnectRef(props, ref) {
        return <Connect {...props} reactReduxForwardedRef={ref} />;
    });
}
return hoistStatics(Connect, WrappedComponent);
```

此处的 `WrappedComponent` 即 `hoc` 中传入的原始组件。首先是处理 `displayName` ，然后到 `connect.ts:518` 处的 `ConnectFunction` 便是 `hoc` 后返回的新组件了，紧接着就是 `forwardRef` `的处理，displayName` 的挂载和 `hoistStatics` 进行静态变量的提升。

这里说下静态变量的提升，主要是为了避免 `connect` 后组件的静态变量丢失的情况，如一些早期常用的一些 `defaultProps`、`propTypes` 等。

重点看下 `ConnectFunction`，此处代码较多，且比较复杂，就不贴了，我大概梳理下逻辑：

1. 该组件中会创建自己的 `subscription`
2. 该组件会包裹 `Context` 并将 `subscription` 覆盖向下传递
3. 其中会判定 `store` 的来源做一些区分处理

简单说就是通过 `connect` 可以将顶部的 `store` 配合 `mapStateToProps` 等转换为 `props`，并且其中每个 `connect` 都会包裹 `Context`，并且将 `subscription` 覆盖向下传递，实现了类似事件的冒泡机制。

### 其它部分

其它还包括 `useDispatch`、`useReduxContext`、`useStore` 源码比较简单，`useSelector` 现挖个坑，后面有时间再补。

## 总结

从上面可以看出，`react-redux` 的源码不太适合阅读，本身常用的 `API` 不多，只是 `Provider` 和 `connect`，而且都很好理解，这源码没必要还是不要看了，太绕了一点都不享受 🤦‍♂️。
