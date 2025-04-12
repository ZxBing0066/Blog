---
title: 玩转 GitHub Pages
pubDate: '2022-08-18'
tags: []
---

# 玩转 GitHub Pages

`pages` 是 `github` 提供的静态页面服务，你可以使用他来为你的项目提供文档页面、搭建 `blog` 以及任何其它静态页面。

## 创建

`pages` 分为两类，一类是个人或组织的页面，需要在创建对应的 `GitHub` 仓库，仓库名称为 `用户名.github.io` 或 `组织名.github.io`；另一类是项目的页面，需要在 `settings` 中启用：`settings` => `pages`，并选择对应的分支和目录。一般会选择使用主分支的 `docs` 目录或直接使用 `gh-pages` 分支（早期 `github` 会固定使用该分支作为 `pages` 分支）。

## jekyll

`jekyll` 是一个开源的 `Markdown` 静态博客生成器，`pages` 很早就内置支持，一般会默认启用 `jekyll` 作为引擎，支持 `markdown`、`html`、模版和 `front matter` 等，并且还提供了丰富的主题，作为一个老牌静态博客生成器，网上的主题商店也不少。

如果需要关闭可以在 `pages` 根目录下创建 `.nojekyll` 文件，否则 `markdown` 和一些特定文件可能会被 `jekyll` 处理导致问题。

想要使用的可以到 [jekyll 官网](https://jekyllrb.com/) 查看相关文档。

## 域名

对于个人或组织页面，页面地址同仓库名称，即 `用户名.github.io` 或 `组织名.github.io`，如果时项目页面，页面地址为个人或组织的子目录 `用户名.github.io/项目名`。

自定义域名有两种方式，一种是在 `pages` 根目录下创建 `CNAME` 文件，里面写上自定义域名；另一种则是直接在 `settings` 中设置域名。

记得在域名 `DNS` 配置处添加 `CNAME` 记录到当前的 `github.io` 域名。现在也支持添加 `A` 记录或 `AAAA` 记录。

`A` 记录：

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

`AAAA` 记录

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

注意如果个人或组织页面用了自定义域名，其所属的项目域名也会跟着变更。当然，也可以通过上述方法为项目设置域名。

## 自动化发布

`GitHub Actions` 发布后，我们在启用了 `pages` 后可以在 `actions` 界面中看到一条默认的 `pages-build-deployment workflow`，里面默认会使用 `jekyll` 来 `build` 页面，上传制品，然后进行 `deploy` 发布页面。通过 `action` 进度可以清晰的看到发布的情况，不会像以前一样根本不知道啥时候生效。

不过默认的 `workflow` 只能支持 `jekyll` 和静态页面，如果文档或站点使用了一些其它的工具需要构建，则可以借助其他的 `workflow` 来完成，如 [github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)

可以通过如下 `workflow` 来完成每次 `push` 后便会进入 `docs` 目录，执行 `pnpm install` 和 `pnpm run build` 构建文档并将构建后的文档 `docs/.rvpress/dist` 内容推到 `gh-pages` 分支来完成文档构建和发布。同样支持自定义分支、目录等，具体可以查看上面该 `workflow` 的文档。

```yml
name: Build and Deploy Pages
on: [push]
permissions:
    contents: write
jobs:
    build-and-deploy:
        concurrency: ci-${{ github.ref }} # Recommended if you intend to make multiple deployments in quick succession.
        runs-on: ubuntu-latest
        steps:
            - name: Checkout 🛎️
              uses: actions/checkout@v3

            - name: Install pnpm
              uses: pnpm/action-setup@v2.0.1
              id: pnpm-install
              with:
                  version: 7
                  run_install: false

            - name: Install and Build 🔧 # This example project is built using npm and outputs the result to the 'build' folder. Replace with the commands required to build your project, or remove this step entirely if your site is pre-built.
              run: |
                  cd docs
                  pnpm install
                  pnpm run build
            - name: Deploy 🚀
              uses: JamesIves/github-pages-deploy-action@v4
              with:
                  folder: docs/.rvpress/dist # The folder the action should deploy.
```

## 其它进阶

除了上述的基础内容外，`pages` 还有其它相关功能：

-   支持强制 `https`，可在 `setting` 中进行配置
-   支持自定义 404 页面，通过创建 404.`html` 来实现
-   构建时自动拉取 `submodules`

此外如果你需要在 `GitHub pages` 中实现 `SPA` 的效果，可以参考我之前的一篇文章。
