---
lastUpdate: 2022-7-11
date: 2022-7-11
tags: [Troubleshooter, Chrome-Extension, Fixed]
---

# 关于 Chrome 插件页面中滚动条异常的问题

最近开发某 Chrome 插件时发现，在 Mac 上使用该插件时滚动条不见了，测试了一下发现和 Mac 的配置有关，默认情况下在使用触控板时，Mac 会自动隐藏滚动条，可以在系统配置中进行配置来复现：将 `System Preferences > General > Show scroll bars` 改为 `When scrolling` 即可。应该是 Chrome 的 bug，论坛里有对应的 issue 但是一直没被修复。

## 现象

具体的触发条件是：

1. Mac 下处于滚动条自动隐藏状态
2. 在页面中存在固定高度或最小高度的元素
3. 该元素在初始化被其它元素撑开并撑开 body

会发现滚动条无法正常被触发，且页面无法滚动。

## 复现

创建如下 html 文件：

```html
<html>
    <body>
        <div id="app" style="min-height: 600px">
            <!-- some content -->
        </div>
    </body>
</html>
```

然后在页面初始化后填充 app 中的内容，导致高度超过 600px，会发现无论如何都无法滚动。

## 方案

该 bug 哪怕固定 html 或 body 的高度，然后为其添加 `overflow: auto` 也无法修复，现发现几种修复方式。

1. 为 app 添加 `overflow: auto`

    由于该 bug 只影响 html 和 body，所以可以直接将滚动条加到下层

2. 为 body 添加 `overflow: scroll`

    为 body 添加固定滚动后，可以修复，为 html 添加尝试无效

3. 为 body 添加 `min-height: 601px`

    由于 Chrome extension popup 的最大高度为 600px，初始化将 body 设置为 601px 即可在初始化时强制出现滚动条从而避免该问题，但是会导致页面一直出现滚动条，可在脚本中将 min-height 再改回 600px 即可。也可修改其它元素的高度，只要让其初始化时能够出现滚动条即可。

4. 不要给 app 使用固定高度或最小高度

    该 bug 的触发条件就是初始化时固定高度，且固定高度无法触发滚动条，所以让该条件不成立即可。

## 参考资料

-   https://stackoverflow.com/questions/65398584/chrome-extension-popup-page-scroll-not-working-on-mac-os
-   https://bugs.chromium.org/p/chromium/issues/detail?id=1161137

## 更新

此 bug 已于 2022 年被修复，具体可查看 [Chromium Issue 40738633](https://issues.chromium.org/issues/40738633)，看日志在 107 后的版本均已正常。
