---
title: IDE AI 自动补全插件 TabNine
description: TabNine 是一个自动补全的编码插件，不同于一般的自动补全插件，它使用了 深度学习 来帮助我们补全代码。并且开箱即用，不需要额外配置。
pubDate: '2019-11-06'
tags:
    - 生产力
---

# IDE AI 自动补全插件 TabNine

## 介绍

**TabNine** 是一个自动补全的编码插件，不同于一般的自动补全插件，它使用了 **深度学习** 来帮助我们补全代码。并且开箱即用，不需要额外配置。

> TabNine uses deep learning to help you write code faster.

先来个官网的例子感受一下：

![python_demo_1.gif](https://stg.heyfe.org/images/blog-2019-tab-nine-0.gif)

## 支持

目前 TabNine **支持大部分主流的 IDE**，**理论上支持几乎所有的语言**（没有找到对应的语言列表，尝试几乎主流语言都是支持的）。能找到一些第三方文章列出的语言列表：`Python，JavaScript，Java，C ++，C，PHP，Go，C＃，Ruby，Objective-C，Rust，Swift，TypeScript，Haskell，OCaml，Scala，Kotlin，Perl ，SQL，HTML，CSS，Bash`。

支持的 IDE 列表

-   VS Code
-   IntelliJ
-   Sublime Text
-   Vim
-   Atom
-   Emacs

具体安装看这里：https://tabnine.com/install

VSCode 可直接到插件商店搜索 TabNine 下载。

## 使用感受

安装这个插件也好几个月了，一开始基本感觉不到什么存在感，不过用了一段时间发现，真的会少些很多的代码，经常会在一些意想不到的地方给出补全建议。

它会根据已有的代码去补全后面的类似代码，这点给一般的自动补全工具做了很好的补充。

![](https://stg.heyfe.org/images/blog-2019-tab-nine-1.gif)

## 指令

通过一些指令，可以对 TabNine 做一些配置，目前的支持以下指令

-   `TabNine::config` 打开配置面板
-   `TabNine::version` 显示版本号
-   `TabNine::config_dir` 显示配置存储文件夹
-   `TabNine::active` 检查是否处于激活状态
-   `TabNine::restart` 重启
-   `TabNine::become_beta_tester` 加入 beta 测试
-   `TabNine::disable_auto_update` 关闭自动更新，默认开启
-   `TabNine::enable_auto_update` 开启自动更新
-   `TabNine::ignore_semantic` 忽略自动补全的错误消息
-   `TabNine::unignore_semantic` 不忽略自动补全的错误消息
-   `TabNine::sem` 打开当前语言的自动补全
-   `TabNine::no_sem` 禁用当前语言的自动补全

指令使用方法很简单，就是在你打开的任意文件中直接输入指令文字就可以了。

`TabNine::config_dir` 这个指令有点问题，会先触发 config 😂。然后导致输入中断

## 配置面板

通过 `TabNine::config` 指令可以打开配置面板，开启后可以看到一些基本信息，以及使用本地学习、云上学习、激活、申请 key、日志等等。

## 上车

目前 TabNine 还处于 beta 阶段，在配置面板中可以免费申请 Professional 版的密钥，官网 [subscribe](https://tabnine.com/subscribe) 页面也可以申请，趁现在赶紧上车吧。（不过不清楚后期会不会失效）申请完成后在配置页面进行激活。

Professional 版本支持使用云算力来加速自动补全（在配置面板中开启）。

![](https://stg.heyfe.org/images/blog-2019-tab-nine-2.png)

## 链接

-   TabNine https://tabnine.com/
-   GitHub https://github.com/zxqfl/TabNine/
-   Blog https://tabnine.com/blog/deep
