---
tags: [worker]
---

# 聊一聊浏览器中的 Worker - Service Worker

Service Worker 是一项比较特殊的技术，它赋予了前端各种新的能力：离线缓存、版本控制、消息推送、脱离窗口等，给了前端开发者更多的可能性。为了方便描述，以下简称 Service Worker 为 SW。

## 生命周期

不同于 Web Worker，Service Worker 可以离线执行，导致它的使用方式完全不同于 Web Worker。开发者需要注册 Service Worker 并控制其更新。其主要包含以下生命周期：

-   installing
-   installed/waiting
-   activating
-   activated
-   redundant

要注册一个 Service Worker 需要调用 `navigator.serviceWorker.register(url)`，和 Web Worker 想同，他同样需要一个独立的文件地址。调用 register 后，浏览器会开始下载代码并进入 installing 状态，脚本执行完成后如果当前页面已经被一个 service worker 所控制，则会进入 waiting 状态，否则会进入 installed 状态。

注意 service worker 脱离于窗口运行，其控制着它的域下的所有页面，所以只要其中有一个页面还在被控制，那这个旧的 sw 就无法被替换，新的 service worker 就会一直处于 waiting 状态。

## 注意点

service-worker 必须在 https 环境下使用，本地调试时可使用 http。

## 万能简单应用

## 坑

-   本地调试时，同样的页面经常因为之前存在 Service Worker 导致奇怪的问题而难以发现。
-   使用不当很容易导致版本错乱，缓存无法清除，

## 工具

-   workbox
