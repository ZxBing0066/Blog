# PerformanceObserver - 配合 performance 掌控页面性能数据

`PerformanceObserver` 是一个强大的 `API`，他可以用来配合 `performance` 使用，从而达到 `performanceEntry` 类事件发生时可以及时通知的效果。下面一起来看下如何使用吧。

## 如何使用

`PerformanceObserver` 与其它几个 `Observer` 类似，使用前需要先进行实例化，然后使用 `observe` 监听相应的事件：

```js
function callback(list, observer) {
    console.log(list);
}
const observer = new PerformanceObserver(callback);
observer.observe({ entryTypes: ['source'] });
```

如上述代码将会在 `source` 类的 `performanceEntry` 触发时调用传入的 `callback`，而回调的第一个参数则为 `performanceEntry` 列表数据，此处要注意，该参数我们需要调用 `getEntries` 或其它 `get` 才能获取到其中的数据条目。第二个参数依旧是 `observer` 实例的引用。

此外 `PerformanceObserver` 还支持 `takeRecords`，可以通过 `takeRecords` 获取已经发生了但是 `observer` 还未调用的事件。当然还有 `disconnect` 用来销毁所有的监听，不过并未提供 `unobserve`。

## 使用场景

### 靠谱、简单的性能上报

个人能想到的使用场景是使用 `performance API` 来统计浏览器的性能相关数据，并通过 `mark`、`measure` 等来进行性能测试、事件埋点等操作。然后使用 `PerformanceObserver` 进行监听和事件处理。比如当网站发起资源请求时，`PerformanceObserver` 被调用，然后便可以在回调中处理请求的数据并上报到平台进行处理。

如果有性能数据上报、资源加载统计之类的需求，使用 `performance API` 配合 `PerformanceObserver` 可以极大的降低开发成本，减少相关代码的耦合度，并且配合 `web-worker` 还可以避免主页面代码受到影响。

想象一下，如果你需要监听网站中的网络请求，你可能需要统一整个网站的请求 `API`，在封装的请求 `API` 中进行数据上报，而如果你的团队开发者操作不规范，你可能根本就无法通过这种方式来拿到可靠的数据。无奈之下你可能只好去重写全局的 `XHR` 对象，这样就可以控制所有 `XHR` 请求。然而你的团队中开发者可能使用了 `fetch`，无奈你可能又要再去将 `fetch` 进行重写。这种方案的风险性可想而知，而且如果你想监听页面中的资源请求，那常规方案几乎无法做到。而如果你使用 `performance API` 配合 `PerformanceObserver`，你只需要在脚本加载完后处理下当前的存量 `entries`，然后通过 `Observer` 去监听新的请求即可，可以想像性价比会高出很多，并且不需要担心因为重写导致可能出现的各种 `bug` 和风险。

我们可以简单的写一段代码来看下实现：

```js
const onInitial = async () => {
    const handler = (list) => {
        axios.post('/report', {
            data: list.getEntries();
        })
    };
    const observer = new PerformanceObserver(handler);
    observer.observe({ entryTypes: PerformanceObserver.supportedEntryTypes });
    await axios.post('/report', {
        data: performance.getEntries().map(entry => {
            entry.toJSON();
        })
    });
};
onInitial();
```

如此便可获取到页面中所有的性能相关数据。

### 自定义控制台面板

还有一种使用场景就是我们可以利用 `performance` 中的所有 `performanceEntry` 拼凑出如 `chrome` 中的 `performance` 面板、`network` 面板等页面，这样在为用户排查问题时，可以使用该用户最近的访问来尝试还原现场。当然由于 `performanceEntry` 中不存在数据等详细信息，所以只能做出比较简陋版本的控制台面板。

## 兼容

要注意的是该 `API` 并不支持所有的 `entry` 类型，可以通过 `PerformanceObserver.supportedEntryTypes` 来获取当前浏览器所支持的 `entry` 类型。

还要注意的是该 `API` 兼容性并不佳：

![picture 6](/image/blog-performance-observer-63.png)

并且没有什么比较靠谱的 `polyfill`。所以理想很丰满、现实很骨感，生产基本是没法用了，只能当个玩具耍耍。当然，我们也可以尝试自己实现一个 `polyfill`，毕竟如果你遇到如上的需求，可能写一个 `PerformanceObserver polyfill` 是性价比更高的选择。
