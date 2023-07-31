# 如何让 cypress 在远程机器的 WSL 中跑起来

工作中习惯使用 Mac 进行开发，而公司代码由于限制只能保存在 Windows 中，故而在使用 Mac 开发时需要远程到 Windows 中进行开发。为此使用 [VSCode SSH Remote](./vscode-remote-ssh.md) 到 Windows 中进行开发。然而由于 Windows 的开发环境与 Mac 相差甚远，为了方便决定通过 VSCode SSH Remote 到 Windows 中的 WSL 进行开发。开发时又遇上 cypress 无法启动的问题，故有了此系列文章。

## 目标

本文的目标是为了让开发者在 Mac 中使用 VSCode SSH Remote 到远程 Windows 中的 WSL 中进行开发，且可以正常启动远程 WSL 中的 cypress 和 GUI 应用等。

## 步骤

要实现上述目标，主要分以下几部分完成，由于篇幅较长做了拆分。方便按步查阅。

### 安装 WSL

安装 WSL 网络上有很多教程，因为我已经安装好不再重新做了所以这块不写了，需要的可以参考以下链接：

-   https://learn.microsoft.com/en-us/windows/wsl/install
-   https://dulunar.github.io/2019/10/14/windows10%E4%B8%8BWSL%E7%9A%84%E4%BD%BF%E7%94%A8%E5%92%8C%E9%85%8D%E7%BD%AE/

### WSL 配置 SSH

配置 SSH 主要包含在 WSL 中安装 SSH 和配置开机启动、防火墙等。

有需要的可在 [WSL SSH 设置和开机启动](./wsl-ssh-startup-set.md) 中查看。

### WSL 升级

由于部分 Windows 版本问题，默认安装的 WSL 版本为 1，而 1 由于 chrome 不支持的原因，所以无法启动 cypress，因此需要升级为 WSL 2。

有需要的可在 [WSL 从 1 升级为 2](./wsl-upgrade.md) 中查看。

### 配置 WSL GUI

由于 cypress 依赖于浏览器，而浏览器依赖于 GUI，所以要想让 cypress 跑起来，需要先配置好 WSL 的 GUI 环境。

有需要的可在 [WSL 展示 Linux GUI - VcXsrv](./wsl-vcxsrv.md) 中查看。

### 安装 chrome

配置完 GUI 后需要安装 chrome。

可参考 [WSL 中安装 google-chrome](./wsl-chrome.md)。

## 效果

成功在 VSCode SSH Remote 到 WSL 时运行 `cypress run`。

![picture 1](https://stg.heyfe.org/images/blog-cypress-on-remote-wsl-58.png)

执行 `cypress open` 时会在远程桌面中打开窗口。

![picture 2](https://stg.heyfe.org/images/blog-cypress-on-remote-wsl-46.png)

## 进阶

原来想在 Windows 下可以通过 VcXsrv 启动 Linux GUI，那么是不是在 Mac 中也可以通过软件，让软件打开远程 Linux 中的 GUI，这样遇到要使用 cypress GUI 的场景下就不需要远程桌面看了。但是在看了[这篇文章](https://uisapp2.iu.edu/confluence-prd/pages/viewpage.action?pageId=280461906)后尝试了 XQuartz 几次后失败了。

文章中也有提到使用 VNC 来解决，不过那也是远程桌面了，好似没有多大必要，故没有继续探究。

## FAQ

### cypress 白屏

一般是 Chrome 启动失败，可参考 Chrome 安装处成功安装并启动 Chrome 后再试。

### Timed out waiting for the browser to connect

一般也是由于 Chrome 启动失败，导致 cypress 无法连接 Chrome。
