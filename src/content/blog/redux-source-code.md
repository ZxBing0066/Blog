---
title: Redux 源码全解析
pubDate: '2022-07-29'
heroImage: 'https://stg.heyfe.org/images/blog-react-isr-demo-1690810719572.png'
tags:
    - React
    - redux
    - 源码解析
---

# Redux 源码全解析

前排提示：

-   如果需要配合源码使用，请 `git clone git@github.com:reduxjs/redux.git` 然后切到 `9eef8ff6` 进行，避免代码版本不一致。
-   部分代码较分散的我会标注上代码路径，如 `createStore.ts:111` 表示在 `createStore.ts` 的第 111 行，可直接通过 ide 复制快捷跳转查看。
-   部分代码过多，会进行适当删减后放出（如很长的报错信息等），建议配合源码一起观看。

## 文件结构

```sh
├── applyMiddleware.ts
├── bindActionCreators.ts
├── combineReducers.ts
├── compose.ts
├── createStore.ts
├── index.ts
├── types
│   ├── actions.ts
│   ├── middleware.ts
│   ├── reducers.ts
│   └── store.ts
└── utils
    ├── actionTypes.ts
    ├── formatProdErrorMessage.ts
    ├── isPlainObject.ts
    ├── kindOf.ts
    ├── symbol-observable.ts
    └── warning.ts
```

## 源码分析

### 核心功能代码

我们先从入口文件看起，入口文件 `export` 出了几个东西:

```ts
export { createStore, combineReducers, bindActionCreators, applyMiddleware, compose, __DO_NOT_USE__ActionTypes };
```

其中最重要的，便是 `createStore`，它是一个函数，代码在 `createStore.ts` 中：

```ts
export default function createStore<S, A extends Action, Ext = {}, StateExt = never>(
    reducer: Reducer<S, A>,
    preloadedState?: PreloadedState<S>,
    enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
```

可看到他接收 `reducer`、`preloadedState`、`enhancer`，返回一个 `store`：（此处有三种重载，为了节省篇幅、这里只放最典型的部分）

再看下 `reducer` 的结构：

```ts
export type Reducer<S = any, A extends Action = AnyAction> = (state: S | undefined, action: A) => S;
```

他是一个函数，接收 `state` 和 `action` 参数，再返回 `state`：

最后看下 `store`，包含了 `dispatch`、`subscribe`、`getState`、`replaceReducer` 这几个属性：

```ts
const store = {
    dispatch: dispatch as Dispatch<A>,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
} as unknown as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext;
```

以上就是 `Redux` 最重要的部分了：`reducer`、`store`、`dispatch`、`action`、`state`。

我们再具体看下实现，首先是 `state` 相关的部分：（`createStore.ts:71-108` 跳过，主要是重载的逻辑处理）

`createStore.ts:111`

```ts
let currentState = preloadedState as S;
```

`createStore.ts:134`

```ts
function getState(): S {
    if (isDispatching) {
        throw new Error('You may not call store.getState() while the reducer is executing.');
    }
    return currentState as S;
}
```

`createStore:238`

```ts
function dispatch(action: A) {
    if (!isPlainObject(action)) {
        throw new Error(`Actions must be plain objects.`);
    }

    if (typeof action.type === 'undefined') {
        throw new Error('Actions may not have an undefined "type" property. ');
    }

    if (isDispatching) {
        throw new Error('Reducers may not dispatch actions.');
    }

    try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
    } finally {
        isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i];
        listener();
    }

    return action;
}
```

可以看到 `state` 相关的代码就这三块。第一块是 `preloadedState` 赋值为 `state` 的初始值；第二个是 `getState` 获取 `state`；第三块为 `dispatch` 函数。

看下 `dispatch`，他接收 `action` 参数，然后调用 `reducer` 处理 `action` 获得处理后的 `state`，随后调用了所有 listener。

从报错处理可以看出：

1. `action` 必须为纯对象，不能是其它数据类型或者是其它各种类（如 `Data`、`RegExp` 对象等）
2. `action` 必须包含 `type`

再看下 `subscribe`：

`createStore.ts:169`

```ts
function subscribe(listener: () => void) {
    if (typeof listener !== 'function') {
        throw new Error(`Expected the listener to be a function. Instead, received: '${kindOf(listener)}'`);
    }
    if (isDispatching) {
        throw new Error('You may not call store.subscribe() while the reducer is executing. ');
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
        if (!isSubscribed) {
            return;
        }
        if (isDispatching) {
            throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ');
        }
        isSubscribed = false;
        ensureCanMutateNextListeners();
        const index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
        currentListeners = null;
    };
}
```

调用 `subscribe` 会将传入的 `listener` 添加到 `nextListeners` 中，然后返回一个 `unsubscribe` 函数，用于取消该订阅。

### 其它部分

#### replaceReducer

`replaceReducer` 用途为替换 `reducer`，主要使用场景如：一部分 `reducer` 异步加载，加载后通过 `replaceReducer` 更新现有的 `reducer`。

`createStore.ts:283`

```ts
function replaceReducer<NewState, NewActions extends A>(
    nextReducer: Reducer<NewState, NewActions>
): Store<ExtendState<NewState, StateExt>, NewActions, StateExt, Ext> & Ext {
    if (typeof nextReducer !== 'function') {
        throw new Error(`Expected the nextReducer to be a function. Instead, received: '${kindOf(nextReducer)}`);
    }
    (currentReducer as unknown as Reducer<NewState, NewActions>) = nextReducer;
    dispatch({ type: ActionTypes.REPLACE } as A);

    return store as unknown as Store<ExtendState<NewState, StateExt>, NewActions, StateExt, Ext> & Ext;
}
```

可以看到其中用到一个特殊的 `action` - `ActionTypes.REPLACE`，这个在 `combineReducers` 中的 `getUnexpectedStateShapeWarningMessage` 会用到，主要用于开发环境的各种检测告警。

#### combineReducers

`combineReducers` 的 `ts` 定义也有三层重载，主要是 `ts` 定义的重载，没有逻辑上的重载，我们依旧拿最典型的看下：

```ts
export default function combineReducers<M extends ReducersMapObject>(
    reducers: M
): Reducer<CombinedState<StateFromReducersMapObject<M>>, ActionFromReducersMapObject<M>>;
```

可以看到 `combineReducers` 接受一个 `reducers` 的 `map` 对象，然后返回一个新的 `reducer`，该 `reducer` 的 `state` 和 `action` 由 `reducers` 中的所有对象整合起来。

下面看下主要代码，代码较多进行了删减。

`combineReducers.ts:125`

```ts
function combineReducers(reducers: ReducersMapObject) {
    const reducerKeys = Object.keys(reducers);
    const finalReducers: ReducersMapObject = {};
    for (let i = 0; i < reducerKeys.length; i++) {
        const key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    const finalReducerKeys = Object.keys(finalReducers);

    return function combination(state: StateFromReducersMapObject<typeof reducers> = {}, action: AnyAction) {
        let hasChanged = false;
        const nextState: StateFromReducersMapObject<typeof reducers> = {};
        for (let i = 0; i < finalReducerKeys.length; i++) {
            const key = finalReducerKeys[i];
            const reducer = finalReducers[key];
            const previousStateForKey = state[key];
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
        return hasChanged ? nextState : state;
    };
}
```

代码中将 `reducers` 所有的 `reducer` 取出，然后返回 `combination` 函数，每次 `combination` 触发时会调用所有的 `reducer`，将返回的 `state` 整合成一个整体的 `state` 返回。所以可以借助 `combineReducers` 来实现 `reducer` 的拆分。

#### compose

`compose` 将 `compose(f, g, h)` 转换为 `(...args) => f(g(h(...args)))`，从而避免方法嵌套。

#### applyMiddleware

`applyMiddleware` 需要配合 `createStore` 的 `enhancer` 函数来来使用。

createStore.ts:87

```ts
return enhancer(createStore)(reducer, preloadedState as PreloadedState<S>) as Store<
    ExtendState<S, StateExt>,
    A,
    StateExt,
    Ext
> &
    Ext;
```

先看下 `enhancer`，当存在 `enhancer` 是，会将 `createStore` 传入 `enhancer` 处理后再进行创建。

```ts
export default function applyMiddleware(...middlewares: Middleware[]): StoreEnhancer<any> {
    return (createStore: StoreEnhancerStoreCreator) =>
        <S, A extends AnyAction>(reducer: Reducer<S, A>, preloadedState?: PreloadedState<S>) => {
            const store = createStore(reducer, preloadedState);
            let dispatch: Dispatch = () => {
                throw new Error('');
            };

            const middlewareAPI: MiddlewareAPI = {
                getState: store.getState,
                dispatch: (action, ...args) => dispatch(action, ...args)
            };
            const chain = middlewares.map(middleware => middleware(middlewareAPI));
            dispatch = compose<typeof dispatch>(...chain)(store.dispatch);

            return {
                ...store,
                dispatch
            };
        };
}
```

再看下 `applyMiddleware`，可以看到 `store` 创建后，会通过 `middleware` 生成 `chain`，然后通过 `compose` 函数将 `chain` 合并成一个 `dispatch` 函数，再返回，所以进行的变更主要作用在 `dispatch` 上。

这里结合使用场景看一下：

```ts
function logger({ getState }) {
    return next => action => {
        console.log('will dispatch', action);
        const returnValue = next(action);
        console.log('state after dispatch', getState());
        return returnValue;
    };
}

const store = createStore(todos, ['Use Redux'], applyMiddleware(logger));
```

在 `dispatch` 触发后，进入中间件中，`next` 就是原 `store.dispatch`，这样可以通过中间件做一些统一的操作，一般会用做数据转化、格式化、数据持久化、日志记录等。

## 总结

上面就是 `redux` 的所有源码了，从上面可以看出来，`redux` 就是一个发布订阅设计模式的实现，`createStore` 创建一个订阅中心，通过 `subscribe` 方法订阅，通过 `dispatch` 发布。然后在其中添加了 `action` 和 `state`，从而实现通过 `reducer` 处理 `action` 更新 `state`（注意每个独立的 `reducer` 只会拿到自己的 `state`）。

`redux` 还添加了 `combineReducers` 来方便 `reducer` `的拆分，applyMiddleware` 来方便使用中间件处理 `action`。
