---
title: 关于 Mac Preview（预览） 卡死的解决办法
description: |-
    最近使用 Mac 的 Preview 去看一些 pdf 书籍，发现在进行标记的时候经常容易卡死不动，然后便无法恢复，强关重开后过会又会出现。记录一下解决方案。
pubDate: '2022-04-16'
heroImage: 'https://stg.heyfe.org/images/blog-2022-mac-preview-stunk-1690814279537.png'
tags:
    - Troubleshooting
    - 生产力
---

# 关于 Mac Preview（预览） 卡死的解决办法

最近使用 `Mac` 的 `Preview` 去看一些 `pdf` 书籍，发现在进行标记的时候经常容易卡死不动，然后便无法恢复，强关重开后过会又会出现。

如果遇到这种情况记的先强制关闭 `Preview`，然后执行以下命令：

```bash
sudo rm -rf ~/Library/Containers/com.apple.Preview/*
```

然后重新打开，就可以了。

::: tip 原因猜测

`~/Library/Containers/` 里主要包含的时对应程序的一些缓存数据、支持文件、临时文件等。

猜测卡死应该就是这些文件在程序升级后不兼容所导致的。

:::
