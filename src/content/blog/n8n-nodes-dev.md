---
title: n8n 节点开发调试
pubDate: 2025-06-21
heroImage: https://stg.heyfe.org/images/4b5e4e0be3d904dc71db13d39f8cdfc757d7dabf2e6be4e7080dd9bb8ddef734.png
tags: [n8n]
---

开发 n8n 社区节点总会遇到需要调试的情况，但官方这方面的文档比较模糊，这里记录下。

官方推荐的调试方式是全局安装 `n8n`，然后使用 `n8n start` 启动。不过个人推荐还是直接新建一个本地目录进行开发。

在你喜欢的位置创建一个文件夹，比如 n8n-dev-project，然后进入这个目录。

```bash
mkdir n8n-dev-project
cd n8n-dev-project
```

初始化项目并本地安装 n8n 和 sqlite3

```bash
# 初始化一个 package.json 文件
pnpm init

# 本地安装 n8n 和 sqlite3
pnpm add n8n sqlite3
```