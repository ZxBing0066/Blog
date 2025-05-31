---
title: 将 Cursor 工具侧边栏重置为 VSCode 风格
description: 鉴于看到一些关于 Cursor UI 太难适应的吐槽，这里提供一个将 Cursor UI 重制为 VSCode 默认风格的方法
pubDate: 2025-04-13
tags: [Cursor, VSCode]
heroImage: https://stg.heyfe.org/images/ae4518a2313bf00a22f17bf8ad4d695901d5679ba66931b1d7483b95adc56955.png
---

群里看到有人吐槽 Cursor 的 UI 太难适应，其实 Cursor 是基于 VSCode 的，为了风格化而将 VSCode 的 UI 默认配置进行了修改，只需要改回来即可。

## 正文

默认情况下，Cursor 的工具栏 UI 是水平放置的，而 VSCode 的 UI 是垂直放置的。大家用惯了 VSCode 的垂直工具栏，会感觉 Cursor 的 UI 很别扭。我自己也是，长时间无法适应。而且横向工具条空间少，按钮小，使用起来也不是很方便。

![Default Cursor UI](https://stg.heyfe.org/images/464a1638640e19b5e9db0611612fd035a18c35ad6f1bf9413cd8505142d1b0fe.png)

要修改很简单，只需要在 Cursor 的 `Settings` 中，搜索 `workbench.activityBar.orientation`，将其设置为 `vertical` 即可。

![Cursor UI After Change](https://stg.heyfe.org/images/bd65890b018c7d8f28c92be80907db87a5c08d8766c7f5fa0a260d61b4b14482.png)
