# 新开窗口的那些事：拦截、安全、target

前端开发经常会遇到需要新开窗口的需求，而某些时候，新窗口的地址需要通过接口返回，经常就会遇到新开窗口被拦截的情况，这里说一下新开窗口的几种方式、被拦截的原因以及如何避免被拦截、新窗口安全、`target` 的秘密。

## 方式

主流的新开方式分为两种：

### window.open

`window.open` 也是比较常用的一种弹窗方式，可以直接脚本打开新窗口，且可控制窗口是否弹出、大小等。

```js
window.open(url, name, features);
```

### 模拟 a 标签

第三种方式是创建一个 `a` 标签，然后通过触发它的点击事件来打开新窗口，也算是比较常用的方式。

```ts
const openLink = (link: string) => {
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.click();
};
```

除了上述几种常用方式，还有可以使用弹窗提示用户再次点击跳转、预先请求链接完成后再渲染按钮等，这里不做讨论。

## 拦截和避免

然而无论是 `window.open` 还是模拟 `a` 标签点击，都会遇到被拦截的情况，原因是很多黑产滥用弹窗功能，导致浏览器对这块功能收紧，当浏览器弹窗不是由用户发起时，便会拦截该操作。那浏览器是怎么判定是否由用户发起的呢？其实是当用户进行了点击行为一段时间内，浏览器都会认为该操作是用户的行为。并且该时间段内只能触发一次合法弹窗，多次弹窗依旧会被拦截。同时如果该时间段内触发的 `setTimeout`，会以 `setTimeout` 调用的时间为准，即只需要 `setTimeout` 在指定时间内调用，而不管 `setTimeout` 中的 `window.open` 或模拟点击的时间。

通过上面的分析，我们可以知道，如果用户点击后，一段时间内还没拿到 `url` 进行新窗口打开的操作，浏览器就会进行拦截，这个时间段各浏览器中好像并不一致。

通过上面的信息，为了避免被拦截，可以想到以下方案：

通过 `setTimeout` 定时一段足够请求返回的时间段，获取请求到的数据，打开新窗口，这种方式过于死板，不推荐。

在点击后直接打开窗口，然后等待请求返回后，再将新窗口重定向到返回的地址，这也是使用最为广泛的方式。

```ts
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const getUrl = async () => {
    await sleep(1000);
    return 'https://www.baidu.com';
};
const newWindow = window.open('about:blank', '_blank');
newWindow.location.href = await getUrl();
```

不过该方式体验上也有点问题，因为打开窗口触发后窗口便会弹出，而等待请求的这段时间里该窗口都会是一片空白，还有接口报错后窗口依旧保留，这里可以做一些小小的优化。

```ts
const newWindow = window.open('about:blank', '_blank');
newWindow.document.write('waiting...');
try {
    newWindow.location.href = await getUrl();
} catch (error) {
    newWindow.close();
    alert('open failed');
}
```

其它的还有通过将请求改为同步请求等方式，这里不做讨论。

## 安全

通过 `window.open` 或者 `a` 链接打开的标签可以通过 `window.opener` 拿到原页面的 `window` 引用，如果新窗口为外部页面，可能会导致信息泄漏、被钓鱼等安全问题。为了避免该情况，需要在 `a` 标签中添加 `rel='noopener'` 或 `rel='noreferrer'`，在 `window.open` 中添加 `noopener` 或 `noreferrer` 的 `features`。

注意 `noreferrer` 包含 `noopener` 的作用，并且会影响到窗口请求的 `referrer` 头，会影响到一些导流分析统计数据。

不过经测试最新 `chrome` 中使用 `a` 标签点击时，`opener` 默认为 `null`，必须要显示使用 `rel='opener'` 才能拿到 `opener` 引用。

## target

在打开窗口时我们也经常用到 `target`，一般包含四个内置值：

-   `_self` 当前窗口打开
-   `_blank` 新窗口打开
-   `_parent` 父窗口打开，`iframe` 的父窗口
-   `_top` 顶层窗口，同样是 `iframe` 中的最顶层窗口

其实除了这几个常用值，`target` 还可以为任何字符串，该字符串会作为窗口的名称也就是 `window.name`，如果存在同名窗口，则会在对应窗口中打开链接，如果不存在则会创建一个新窗口。

当某些窗口全局只能存在一个时，该属性会非常有效，比如登陆页面，可以设置其 `name` 为 `my_login`，当在其它页面需要登录时，直接将 `target` 设置为 `my_login`，就可以直接进入登陆页面，避免用户打开一堆新窗口。
