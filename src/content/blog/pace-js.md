---
title: PACE - 为你的网站添加页面加载进度条
pubDate: '2022-08-12'

tags: []
---

`pace-js` 是一个为网站添加页面加载进度条的库，可以为任意网站自动添加上页面加载进度条，提供了多种主题样式，先看下效果：

https://code.juejin.cn/pen/7127635551796068386

## 使用

使用该库只需要将该库的脚本和选择的主题添加到页面 `head` 中即可：

```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pace-js@latest/pace-theme-default.min.css" />
</head>
```

该库会自动监听页面中的加载状态，包括 `document` 的状态、`ajax` 请求、事件滞后，并且在单页应用切换时也可监听。另外还支持检测特定元素的出现来判定等。如果只是普通使用场景，直接添加脚本后选择喜欢的主题即可。

## 主题

可在官网中选择喜爱的主题：[pace](https://codebyzach.github.io/pace/)

以下是官方提供的主题的截图： ![picture 2](https://stg.heyfe.org/images/blog-pace-js-13.png)

直接下载喜欢的主题样式即可，也可对主题做二次开发，或直接参考官方主题开发自己的主题。

## 自定义

如果使用 `script` 标签加载脚本，可使用 `data-pace-options` 来定义配置：

```html
<script data-pace-options='{ "ajax": false }' src="pace.min.js"></script>
```

如果使用模块化导入，可手动调用 `pace.start(options)` 来启动：

```js
pace.start({
    document: false
});
```

监听的配置项包括：

-   `ajax`
-   `document`
-   `eventLag`
-   `elements`

### ajax

`ajax` 配置默认为

```json
{
    "trackMethods": ["GET"],
    "trackWebSockets": true,
    "ignoreURLs": []
}
```

表示默认会监听 `GET` 请求和 `WebSocket` 连接，通过 `ignoreURLs` 可以忽略特定的 `ajax` 请求。

### document

默认会监听 `document` 的加载，如需关闭可设置为 `false`。

### eventLag

`eventLag` 为监听脚本执行的延迟，可设置为 `false` 关闭（文档描述不是太清楚）

### elements

通过 `elements` 可以监听特定元素的出现并隐藏加载，适用于如单页应用中指定渲染了 `content` 则视为加载完成的这种场景。

```js
paceOptions = {
    elements: {
        selectors: ['.timeline,.timeline-error', '.user-profile,.profile-error']
    }
};
```

除了文档中这几个 `options`，其实还有很多可设置选项，后面写一篇源码分析再列一下。

## API

`pace` 暴露了几个方法：

-   `pace.start`：显示加载进度条，在直接使用 `script` 加载时会自动启动
-   `pace.restart`：重新显示加载进度条
-   `pace.stop`：主动停止 `pace` 进度条和监听
-   `pace.track`：主动监听请求
-   `pace.ignore`：主动忽略监听请求

`restart` 会在如触发 `ajax` 时、单页切换时（`pushState`、`replaceState`）自动调用

## 事件

`pace` 存在五类事件：

-   `start`：`pace` 初始化开始时或重启时
-   `stop`：`pace` 主动调用 `stop` 时，或重启时
-   `restart`：`pace` 重启时
-   `done`：`pace` 完成时
-   `hide`：`pace` 隐藏时

可通过 `pace.on`、`pace.off` 和 `pace.once` 来控制事件监听。

## 总结

`pace` 作为一个全局加载进度条，使用方便，有较为丰富的自定义选项用于定制，如果有类似的需求，不妨尝试一下。当然如果是自己的小玩具里，可以肆无忌惮的随意使用。