---
tags: [Troubleshooting, next.js]
---

# Next.JS Serializing big strings XXX impacts deserialization performance 错误处理

最近写个新项目配置好后启动就开始告警：`[webpack.cache.PackFileCacheStrategy] Serializing big strings (XXXkiB) impacts deserialization performance (consider using Buffer instead and decode when needed)`，有点莫名，搜了半天终于找到解决方案。看起来是 `mantine` 尺寸所导致的。

解决方案是在 `next.config.mjs` 中添加以下配置，对 `mantine` 强制启用包优化：

```js
experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'];
}
```

## 参考

-   https://github.com/vanilla-extract-css/vanilla-extract/issues/374#issuecomment-1802054411
