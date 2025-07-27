---
title: remark-directive 导致 markdown 引用块被打乱
description: ccc
pubDate: 2025-06-19
heroImage: https://stg.heyfe.org/images/3a40382057c9dfe40656b012ea6710ddd5f03a1b27a39b872f7659c810c7dd3c.png
tags: [markdown]
---

最近发现部分文章里的引用块样式不太对，经过排查发现是因为使用了 `remark-directive` 插件导致的。

```markdown
> test (:1) (:2)
```

会被渲染为

> test (:1) (:2)

