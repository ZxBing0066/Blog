---
lastUpdate: 2022-7-16
date: 2022-7-10
tags: [FAQ, chrome-extension]
---

# 如何获取网站对应的 favicon 图标

最近在开发一个 `chrome` 插件，其中需要读取到对应网站的 favicon 图标，遇到一些问题记录一下。

太长不看的可以直接跳到最后总结部分。

## 几种常用方案

### chrome favicon

格式： `chrome://favicon/<url>`

`chrome://favicon/` 可以获取到对应网站在 **当前 chrome 中** 的使用 favicon 图标，对应着该网站在书签栏的图标或上次打开时的图标。图标使用的是 chrome 本地的缓存，所以速度很块。

但是该方案无法使用在网页中，chrome 会提示 `Not allowed to load local resource`。只可用于 chrome 插件中，并且需要为 v2 版本的 manifest 添加 `permissions: ["chrome://favicon/"]`，v3 版本 目前还没有替代方案。

### google favicons

格式：`https://www.google.com/s2/favicons?domain=<url>&size=<size>`

`www.google.com/s2/favicons` 可使用 google 服务来获取对应网站的 favicon 图标，url 是网页的完整 URL 地址，无需转化为域名，并且如果同域名网站有多个 favicon，可以获取到对应的 icon，还可自定义 icon 尺寸。

不过由于某些不可说的原因，对网络存在要求。

### duckduckgo icons

格式：`https://icons.duckduckgo.com/ip3/<domain>.ico`

`icons.duckduckgo.com` 和 `google favicons` 服务类似，不过只能获取域名下的 favicon，无法精确到 url。

### 直接获取域名对应的 favicon 图标

格式：`https://<domain>/favicon.ico`

由于大部分的网站都会使用 favicon 的默认路径，所以可以直接拼接获取域名对应的 favicon 图标。只是简单的场景可以尝试使用。

### 后端获取

get url 对应的 html，然后 parse 出 url 中的 favicon 配置的 url，即可获取到对应的 favicon 图标。需要使用后端获取主要是因为前端会出现跨域问题。

```js
const html = await fetch(url).then(res => res.text());
const favicon = html.match(/<link rel="icon" href="(.*?)"/)[1];
```

代码只是举例说明，并不严谨。

## 方案总结

| 方案 | 预览 | 格式 | 自定义大小 | 支持任意 URL（无需转换为域名） | 优势 | 劣势 |
| --- | --- | --- | --- | --- | --- | --- |
| `chrome://favicon/` | 无法预览 | `chrome://favicon/<url>` | ❌ | ⭕️ | 本地缓存，速度快 | 使用场景过于局限，只适用于使用 v2 manifest 的 chrome 插件 |
| `www.google.com/s2/favicons` | ![](https://www.google.com/s2/favicons?domain=https://www.github.com/ZxBing0066&size=32) | `https://www.google.com/s2/favicons?domain=<url>&size=<size>` | ⭕️ | ⭕️ | 精确到 url、支持修改大小 | 国内访问受限 |
| `icons.duckduckgo.com` | ![](https://icons.duckduckgo.com/ip3/www.github.com.ico) | `https://icons.duckduckgo.com/ip3/<domain>.ico` | ❌ | ⭕️ | 本地缓存，速度快 | 使用场景过于局限，只适用于使用 v2 manifest 的 chrome 插件 |
| 直接获取域名对应的 favicon 图标 | ![](https://www.github.com/favicon.ico) | `https://<domain>/favicon.ico` | ❌ | ❌ | 简单 | 遇到自定义地址就躺 |
| 后端获取 | 无 | 无 | ❌ | ⭕️ | 不依赖于外部服务，自食其力 | 需要开发成本，需要后端开发去获取 |

## 参考资料

-   https://stackoverflow.com/questions/10301636/how-can-i-get-the-bookmark-icon-in-chrome
