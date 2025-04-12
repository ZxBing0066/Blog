---
title: 关于 Mac 12.3 出现 python not found 的解决方法
pubDate: '2022-04-17'
heroImage: 'https://stg.heyfe.org/images/blog-2022-mac-preview-stunk-1690814279537.png'
tags:
  - Troubleshooting
  - 生产力
  - python
---

# 关于 Mac 12.3 出现 python not found 的解决方法

## 原因

由于 macOS 12.3 版本开始，水果将 python 2 直接移除了，导致原先很多使用 python 执行的脚本都失效了。

如我安装的很多 Alfred workflow，执行后都会出现 `command not found: python` 导致无法执行。

并且 Homebrew 很早就已经移除了 python 2 版本（[Homebrew-and-Python](https://docs.brew.sh/Homebrew-and-Python)），所以我们无法使用 Homebrew 来进行安装。

## 方案

可以使用 pyenv 来进行安装和版本管理，这样可以方便的切换 python 版本。

具体使用方法可以参考： [pyenv - 简单易用的 python 的版本管理器](./2022-pyenv.md)

通过 pyenv 安装 python 2.7.\* 后，设定全局版本，就可以正常执行脚本了。

```bash
pyenv install 2.7.18
pyenv global 2.7.18
```

## Alfred 处理

### 现象

通过 pyenv 设置全局版本后，使用 shell 执行对应 python 脚本的问题已经可以解决了，但是 Alfred 的 workflow 依旧会报错。

### 原因

原因是 Alfred 的执行环境为了保障一致性，会固定 PATH 环境变量，导致 pyenv 无法注入。

可参考 Alfred 环境变量的说明：[Alfred 脚本环境变量](https://www.alfredapp.com/help/workflows/advanced/understanding-scripting-environment/)

简单说就是 Alfred 为了保证脚本环境的一致性，而将的脚本 PATH 环境变量固定为 `/usr/bin:/bin:/usr/sbin:/sbin`，而 pyenv 是依赖注入 `~/.pyenv/shims` 到 PATH 来实现注入的，所以在这种情况下无法生效。

### 解决方案

解决方案可以有几种，可以看自己需要使用：

1. 修改 workflow 中的执行命令，将其中的 `python` 替换为绝对路径，如 `~/.pyenv/shims/python`，也可自行添加软链到 `/usr/local/bin/python`，然后饮用软链地址。

![picture 18](https://stg.heyfe.org/images/blog-2022-mac-12-3-python-not-found-85.png)

2. 在 workflow 中添加环境变量，如 `PATH=${PATH}:~/.pyenv/shims`，等于手动注入 pyenv，这样就可以正常执行 python 了。

![picture 17](https://stg.heyfe.org/images/blog-2022-mac-12-3-python-not-found-62.png)

当然也可以在 workflow 中直接 source rc 文件来注入，但是由于 rc 文件本身可能依赖其他的环境变量，所以这种方式不太可靠。并且 rc 文件一般内容较多，很容易影响 workflow 的速度。workflow 每次调用都会执行整个命令，等于一直在 source rc 文件。

失败方案：

那有没有可以直接修复，不需要改动 workflow 的方案，抱歉目前还没发现。

原先考虑过直接将 python 软链到 `/usr/bin`，这可以 Alfred 不做任何改动来实现修复，但是，软链失败了，会提示 `Operation not permitted`，查了一下 Mac 从很早之前开始就禁止修改很多系统内核部分文件，哪怕 root 权限也没用，所以这条路被堵死了。（当然好似可以通过关闭 csrutil 来实现权限放开，不过影响较大，不太推荐）
