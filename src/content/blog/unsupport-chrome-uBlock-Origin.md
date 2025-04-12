---
title: Google 正在逐步禁用 uBlock Origin 插件
pubDate: '2025-03-04'
heroImage: >-
    https://stg.heyfe.org/images/blog-unsupport-chrome-uBlock-Origin-1741054993098.png


tags:
    - Chrome
    - 动向
---

# Google 正在逐步禁用 uBlock Origin 插件

最近看到很多人反映自己的 uBlock Origin 插件无法正常使用。这是因为 Google 正在逐步禁用使用 Manifest V2 的插件，而 uBlock Origin 使用的就是 Manifest V2。

![](https://stg.heyfe.org/images/blog-unsupport-chrome-uBlock-Origin-1741052952885.png)

uBlock Origin 是一个开源的广告拦截插件，它的广告拦截效果非常好，而且占用资源较少。目前 uBlock Origin 在 Chrome 应用市场记录的用户数量是 39,000,000，项目的 GitHub 仓库也有 50k Star。

当然，uBlock Origin 早就推出了 Manifest V3 版本 uBlock Origin Lite，大部分的 uBlock Origin 用户并没有切换到 Manifest V3 版本。

![](https://stg.heyfe.org/images/blog-unsupport-chrome-uBlock-Origin-1741053316956.png)

当前 uBlock Origin Lite 的用户数量为 2,000,000，只有 uBlock Origin 的 1/20。一方面是由于用户可能并没有意识到 uBlock Origin 会被强制禁用，另一方面是由于 uBlock Origin Lite 的广告拦截效果不如 uBlock Origin。

uBlock Origin 的官网虽然也放出了 uBlock Origin Lite 的下载链接，但是从位置和颜色就能看出推荐的还是 uBlock Origin。

![](https://stg.heyfe.org/images/blog-unsupport-chrome-uBlock-Origin-1741054944501.png)

而 Google 想对 MV2 动手也不是一天两天了，但是因为开发者的反对，被迫推迟了多次。加上受影响最大的就是各种广告拦截插件，所以很多人质疑 Google 是不是为了保障自家的广告业务。

## 什么是 Manifest V2 和 Manifest V3

MV2 和 MV3 是 Chrome 插件的两种规范，MV2 是 Chrome 插件的旧规范，MV3 是 Chrome 插件的新规范。在进行插件开发时，需要为插件指定规范的版本，不同的规范版本有不同的功能和限制。 MV3 在安全性和性能上有所提升，但是相对的也多了一些限制。

## Manifest V3 对 uBlock Origin 的影响

MaV3 对 uBlock Origin 的影响主要体现在权限的限制上。MV3 中，webRequest API 的权限被限制，uBlock Origin 重度依赖 webRequest API，因此 uBlock Origin 虽然推出了 MV3 版本，但新版本只能使用 declarativeNetRequest API（可理解为阉割版的 webRequest API，缺乏动态能力），因此插件的进阶拦截效果会受到影响。

## 替代方案

目前官网给出的替代方案是：

-   使用 uBlock Origin Lite，接受部分功能的损失
-   使用 FireFox 等目前还支持 Manifest V2 的浏览器
-   使用其他插件，如 AdGuard、AdBlock 等

## 最后

虽然 Chrome 强行停止了部分用户的 uBlock Origin 插件，但其实用户依然可以手动在管理插件页面启用 uBlock Origin 插件。目前猜测是 Google 在试探用户的反应，就和以前禁用 Chrome App 一样。

后续如果 Chrome 真的强行停止了 MV2 的支持，Edge 等浏览器也会被迫跟进，不知道 FireFox 能支持到几时。

## 参考

-   https://www.reddit.com/r/youtube/comments/1j2ec76/ublock_origin_is_gone/
-   https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en
-   https://ublockorigin.com/
-   https://github.com/gorhill/uBlock
