# 这不该是 hooks - 吐槽向

React hooks 对前端掀起的变革毋庸置疑，从各大库的跟进便可见一斑。然而随之带来的是各种奇奇怪怪的 hook 化，无论是否合适、必要不必要，一股脑 hook 化，强行为了 hook 而 hook，今天吐槽吐槽常见的滥用。

本文纯属个人观点，如有不同意见，欢迎理性讨论。

## 将纯函数当 hook

### useFavicon

看到好多个库中存在 `useFavicon` 的 hook，先简单的看下代码：

```js
import { useEffect } from 'react';

const useFavicon = (href: string) => {
    useEffect(() => {
        const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = href;
        document.getElementsByTagName('head')[0].appendChild(link);
    }, [href]);
};

export default useFavicon;
```

调用这个 hook 便会将 `<link rel="shortcut icon" href="href">` 插入到 `<head>` 中。然而，这波操作和 hook 并没有半毛钱的关联，我们来改写一下：

```js
const setFavicon = (href: string) => {
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
};
```

明显针对这种和声明周期不相关的函数，hook 化后不但减少了该代码的可复用性，还提高了理解成本。可以看到 setFavicon 语义非常明确，可以在任何代码而不只是 react 函数组建中使用。而 useFavicon 总会让人纳闷这到底是获取当前的 favicon，还是设置 favicon，多次调用又会有什么后果。虽然 hook 中包裹了 useEffect，可以减少在某些特殊场景需要频繁变更 favicon 的代码，然而考虑 favicon 使用的场景，再结合节省的代码量、提高的理解成本和降低的可用性，真的值得吗。

### useTitle



### useThrottle

### useAntdTable

useLazyLoad


hooks 虽香，但切莫贪杯啊。