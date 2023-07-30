---
tags: [next.js, React, SSR]
summary: 介绍如何在 next.js 中关闭 SSR，已经常见的 hydration 错误的原因和解决方案。
cover: https://stg.heyfe.org/images/blog-next.js-1690694536769.webp
---

# next.js - 如何关闭 SSR 及处理 hydration 错误

今天聊一聊上手 `next.js` 使用中常会出现的一类报错：`hydration fail`，估计大部分使用过 `next.js` 开发的同学对下面的报错信息一定都很熟悉：

```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

报错的原因报错信息中已经说的很清楚：由于 `hydration` 后的 `UI` 和服务端渲染的 `UI` 不一致导致 `hydration` 失败。不过虽然报错信息写着 `Hydration failed`，但实际上还是会以 `Hydration` 后的 `UI` 为准的，其实勉强算是 `hydration` 成功的。

## 实际场景

下面讲一个实际的场景。开发中我们经常会将一些不重要的或者不需要同步的数据存储在本地，在客户端我们可以获取到这些存储在本地的数据，而在服务端获取不到。比如我们有一些存储在 `localStorage` 中的配置信息，而页面会根据该配置信息来进行渲染，然而服务端是无法获取客户 `localStorage` 中的信息的，这就导致服务端渲染时与客户端渲染时的数据产生差异从而导致错误的发生。

比如如下代码：

```tsx
export default function R() {
    const [expand, setExpand] = React.useState(() => localStorage.getItem(EXPAND_STORAGE_KEY) === '1');
    return (
        <div>
            <NavSidebar expand={expand} onExpand={setExpand} />
        </div>
    );
}
```

我们有一个 `sidebar`，用户可以对其进行展开或收起，为了用户体验我们经常会将它保存在本地，但是由于启用了 `SSR`，我们的页面代码会在服务端执行，然而由于我们在 `state` 初始化时使用了 `localStorage`，这就导致页面在服务端渲染时就报错了，因为 `node` 中可没有 `localStorage`。于是我们就修改了一下代码：

```tsx
export default function R() {
    const [expand, setExpand] = React.useState(() =>
        typeof window === 'undefined' ? false : localStorage.getItem(EXPAND_STORAGE_KEY) === '1'
    );
    return (
        <div>
            <NavSidebar expand={expand} onExpand={setExpand} />
        </div>
    );
}
```

通过 `window` 检查是 `node` 环境还是 `window` 环境，然后再去按照环境采取不同的措施，然后，就会出现我们一开始提到的错误了。其实这段代码在逻辑上看是没有问题的，并且在纯 `SSR` 场景下也 `OK`，其实在 `vue` 的 `SSR` 检查里经常会看到这样的代码，比如 `vitepress` 中的 `N` 哦 `SSR` 就是通过 `window` 来判断。但是在 `SSR` + `hydration` 的场景下，`React` 的 `hydration` 会检查 `UI` 的一致性，前后数据不一致就会导致 `hydration` 错误的发生。

## 其实不是 next.js 的检查

其实这段检查并不是 `next.js` 中所做的，而是在 `react-dom` 的 `hydration` 中做的，我们可以简单看下 `react-dom` 中相关的源码：

```js
if (!tryHydrate(fiber, nextInstance)) {
    if (shouldClientRenderOnMismatch(fiber)) {
        warnNonhydratedInstance(hydrationParentFiber, fiber);
        throwOnHydrationMismatch();
    }
}
function throwOnHydrationMismatch(fiber) {
    throw new Error('Hydration failed because the initial UI does not match what was ' + 'rendered on the server.');
}
function shouldClientRenderOnMismatch(fiber) {
    return (fiber.mode & ConcurrentMode) !== NoMode && (fiber.flags & DidCapture) === NoFlags;
}
```

`react-dom` 中的 `hydration` 会使用 `tryHydrate` 来尝试进行 `hydrate` 操作，如果尝试失败，将会进行模式和标志位的检查，然后抛出该错误。

## 解决方案

### useEffect/componentDidMount

而要解决上面的问题，官方推荐的解决方案就是使用 `useEffect`：

```tsx
const [expand, setExpand] = React.useState(true);

// to avoid ssr error
useEffect(() => {
    setExpand(localStorage.getItem(EXPAND_STORAGE_KEY) === '1');
}, []);
```

由于在服务端渲染时，`effect` 并不会执行，所以并不会报错，当然，也可以使用类组件，然后在 `componentDidMount` 中进行 `localStorage` 的获取。

不过这个解决方案会带来一些问题，比如如果 `sideBar` 的展开收起存在动画，那用户进入页面就会看到一个多余的动画，会比较奇怪，解决方案的话就是我们在默认情况下不要渲染 `sidebar`。😂 然而这样 `SSR` 的效果就没预想的那么好，要么就是初始化时把动画关掉之类的，具体的就要视实际场景进行取舍了，颇有些鱼和熊掌不可兼得的味道。

### 开源库解决 react-no-ssr

还有一种常见的解决方案就是使用一些开源库，比如 `react-no-ssr`，其实 `react-no-ssr` 本身也是使用上面的方案来实现的，可以看下源码：

```js
import React from 'react';

const DefaultOnSSR = () => <span></span>;

class NoSSR extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            canRender: false
        };
    }

    componentDidMount() {
        this.setState({ canRender: true });
    }

    render() {
        const { children, onSSR = <DefaultOnSSR /> } = this.props;
        const { canRender } = this.state;

        return canRender ? children : onSSR;
    }
}

export default NoSSR;
```

可以看到 `NoSSR` 在 `componentDidMount` 才会设置 `canRender`，从而渲染包裹的内容，以此来确保内容导致的问题。

### 关闭 SSR

此外我们还可以通过关闭存在 `hydration` 问题的组件的 `SSR` 来解决问题，其实上面的 `react-no-ssr` 就是其中的一种，不过 `next.js` 官方还提供了一些自带的方案：通过 `dynamic` 加载组件并关闭 `ssr`，以上面的 `sidebar` 场景为例：

```jsx
import dynamic from 'next/dynamic';

const DynamicSidebarWithNoSSR = dynamic(() => import('../components/Sidebar'), {
    ssr: false
});

export default function R() {
    return (
        <div>
            <DynamicSidebarWithNoSSR />
        </div>
    );
}
```

我们只需要将存在问题的组件进行抽离，然后使用 `dynamic` 来加载该组件并传入 `ssr` 参数为 `false`，即可关闭该组件的服务端渲染。

当然，为了方便我们可以进行一些简单的封装：

`components/NoSSR.jsx`

```jsx
import dynamic from 'next/dynamic';
import React from 'react';

const NoSSR = props => <React.Fragment>{props.children}</React.Fragment>;

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false
});
```

然后我们只需要在需要使用的时候在直接调用该组件将不兼容组件进行包裹即可：

```jsx
import dynamic from 'next/dynamic';

import Sidebar from '../components/Sidebar';

export default function R() {
    return (
        <div>
            <NoSSR>
                <Sidebar />
            </NoSSR>
        </div>
    );
}
```

## 总结

从体验上来讲，`SSR` 确实会给我们的应用带来很大的提升，不过也会带来一些开发的问题。由于不同于 `CSR` 只需要在浏览器中运行，`SSR` 需要我们的代码初始化时在 `node` 中也能够运行，这就让我们在开发中会遇到一些做纯 `CSR app` 遇不到的一些问题和挑战。如果对 `hydration fail` 错误的解决有其它方案的同学欢迎留言。
