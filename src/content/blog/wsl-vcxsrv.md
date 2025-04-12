---
title: WSL 展示 Linux GUI - VcXsrv
pubDate: '2023-02-10'
heroImage: 'https://stg.heyfe.org/images/blog-wsl-chrome-1690811688446.png'
tags:
    - WSL
---

# WSL 展示 Linux GUI - VcXsrv

要在 WSL 中使用 cypress 需要依赖于浏览器如 Chrome，而 Chrome 又依赖于 Linux GUI，先看下如何配置 Linux GUI。

## 安装依赖

首先要使用 VcXsrv 需要在 WSL 中安装对应的依赖：

```bash
sudo apt update
sudo apt install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

## 安装 VcXsrv

到 https://sourceforge.net/projects/vcxsrv/ 中下载 vcxsrv 进行安装，并启动。

启动后展示如下界面：

![picture 1](https://stg.heyfe.org/images/blog-wsl-vcxsrv-68.png)

此处 Multiple windows 表示 Linux GUI 应用回作为独立程序存在，打开单独的 window 窗口，而其他的则类似于整个窗口，可以理解为 Linux 桌面，由于我没有安装 Linux 桌面，进入直接是黑屏，这里采用 Multiple windows 的方式。点击下一步最后会出现 Disable access control 选项，建议勾选不然后面会一直需要确认。完成后 Multiple windows 模式什么都不会发生，只会出现一个 xclient 的小图标，点击可以查看链接的 GUI 数量和退出，其他模式会打开 Linux 的桌面。

## 连接 GUI

要将 linux 连接到 VcXsrv 需要配置下 DISPLAY 参数：

```bash
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
```

使用上面的脚本会自动将 DISPLAY 设置为 IP:0.0，建议添加到 rc 文件自动执行。完成后可尝试启动 GUI 应用查看是否成功，比如使用 xeyes 会打开如下窗口：

![picture 2](https://stg.heyfe.org/images/blog-wsl-vcxsrv-77.png)

能看到则代表已经 GUI 已经配置成功。

## 桌面

如果想要使用 Linux 桌面可以安装 xfce4：

```bash
sudo apt install xfce4
```

然后通过 `startxfce4` 启动，即可成功看到 Linux 桌面。

![picture 3](https://stg.heyfe.org/images/blog-wsl-vcxsrv-24.png)

## FAQ

### Missing X server or $DISPLAY

可能是因为 $DISPLAY 未设置，或 x 未安装，也可能英文 $DISPLAY 值不对，一般为 IP 不正确。

## 参考链接

-   https://medium.com/@dhanar.santika/installing-wsl-with-gui-using-vcxsrv-6f307e96fac0
-   https://github.com/microsoft/WSL/issues/648
