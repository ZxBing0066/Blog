---
tags: [python]
---

# pyenv - 简单易用的 python 的版本管理器

pyenv 是一个 python 的版本管理器，可以让我们轻松的安装、卸载、切换 python 版本。

简单说就是： pyenv 之于 python 等于 nvm 之于 nodejs

这里先放一张官方截图：

![pyenv](/image/blog-2022-pyenv-61.png)

官方仓库地址：[https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv)

## 安装

Mac 下安装可直接使用 brew 安装：

```bash
brew install pyenv
```

注意安装后需要手动配置环境变量，我是用 zsh，修改如下：

```bash
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

其它安装方式可查看官方仓库，有详细说明。

## 常用命令

### 列出所有安装的版本

```bash
pyenv versions
```

### 查看当前版本

```bash
pyenv version
```

### 安装指定版本

```bash
pyenv install 3.7.0
```

### 查看和设置全局默认版本

```bash
pyenv global

pyenv global 2.7.18
```

## 原理

pyenv 会将 python 安装的特定的目录下，Mac 下默认为 `~/.pyenv/versions`，可使用 `pyenv root`。初始化时通过环境变量，将 python 相关的命令劫持到 `~/.pyenv/shims` 下，然后调用当前设定的 python 版本来执行。
