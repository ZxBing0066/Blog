---
tags: [wsl]
---

# WSL 从 1 升级为 2

由于公司机器 win 系统为企业版，默认安装的为 WSL 1 版本，最近在运行 cypress 存在问题，发现需要升级，故记录。

## 查看 WSL 版本

首先先确认自己安装的 WSL 版本：

```bash
wsl -l -v
# or
wsl --list --verbose
```

![picture 1](/image/blog-wsl-upgrade-26.png)

运行后 VERSION 字段对应的即为该 WSL 的版本，如果为 1 则继续下面的步骤。

## 安装依赖

使用命令对当前安装的指定 WSL 进行升级：

```bash
wsl --set-version Ubuntu-22.04 2
```

如果升级是出现如下报错：

![picture 2](/image/blog-wsl-upgrade-21.png)

下载： https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi 安装，完成后重试。

注意如果是 ARM64 架构，需要下载：https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_arm64.msi。

## 升级

重新执行 `--set-version` 后，需要等待一段时间，不放心可以使用 `-l -v` 查看当前状态：

![picture 3](/image/blog-wsl-upgrade-27.png)

`Converting` 则表示当前正在转换中。

## 网络

升级完成后，可以打开 WSL，需要注意的是 WSL 2 与 WSL 1 网络架构不同，WSL 2 有自己的独立虚拟网卡，而 WSL 1 则是网络桥接。可以在 CMD 中 ipconfig 查看：

![picture 4](/image/blog-wsl-upgrade-93.png)

如果需要从远程 SSH 访问 WSL，会发现无法访问，此时可以有两种方案：

1. 将 WSL 2 网络修改为桥接网络，恢复到 WSL 1 的网络状态。
2. 使用转发将流量从 windows 转发到 WSL。

此处说下第二种，主要通过 netsh 设置 portproxy：

```powershell
netsh interface portproxy add v4tov4 listenport=2222 listenaddress=0.0.0.0 connectport=2222 connectaddress=localhost
```

此处表示将从所有网卡发来的到 2222 的流量转发到 localhost 的 2222 端口下。connectaddress 应该设置为 WSL 的 IP，但是由于 WSL 的 IP 可能会变动，而发送到 localhost 下的流量可以自动找到 WSL 下的监听。此处的 listenport 和 connectport 则是对应的 SSH 端口号。

## 最后

此时 WSL 已经升级为 WSL 2 了，并且网络访问问题也已解决。

## 参考链接

-   https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package
-   https://learn.microsoft.com/en-us/windows/wsl/install
-   https://learn.microsoft.com/en-us/windows/wsl/networking
-   https://stackoverflow.com/questions/61002681/connecting-to-wsl2-server-via-local-network
-   https://superuser.com/questions/1586386/how-to-find-wsl2-machines-ip-address-from-windows
-   https://github.com/microsoft/WSL/issues/4192
