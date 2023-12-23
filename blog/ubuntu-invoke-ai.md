---
lastUpdate: 2023-7-31
date: 2023-4-8
tags: [AI绘画, AIGC, Stable Diffusion, linux]
cover: https://stg.heyfe.org/images/blog-stable-diffusion-models-1690811336594.png
---

# Ubuntu 中安装 InvokeAI

安装过程基本比较顺利，InvokeAI 官方提供的一键安装脚本非常友好。

## 安装前准备

我的 Ubuntu 版本为 22，首先使用一键脚本安装前需要先安装好 python 环境：

```sh
sudo apt update
sudo apt install -y python3 python3-pip python3-venv
sudo update-alternatives --install /usr/local/bin/python python /usr/bin/python3.10 3
```

这样可以安装好需要的 python 版本并且将 python 的默认版本设置为 python3，其它版本可以参考教程。

然后安装一些其它的包，不清楚是不是必要的：

```sh
sudo apt update && sudo apt install -y libglib2.0-0 libgl1-mesa-glx
```

安装完成后下载安装器，进入 https://github.com/invoke-ai/InvokeAI/releases/latest 找到当前最新版本的包，然后下载：

```sh
wget https://github.com/invoke-ai/InvokeAI/releases/download/v2.3.3/InvokeAI-installer-v2.3.3.zip
```

下载完成后通过 unzip 解压：

```sh
unzip InvokeAI-installer-v2.3.3.zip
```

然后进入解压后的文件夹后执行 ./install.sh 进行一键安装即可。

## 注意

需要注意的是安装脚本默认会安装较新的 numba，然后回出现告警：

```
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
numba 0.56.4 requires numpy<1.24,>=1.18, but you have numpy 1.24.2 which is incompatible.
```

但是脚本并不会中断，而会继续执行知道后面报错，如果遇到这个问题需要手动安装下 numpy 为 1.23 `pip3 install numpy==1.23`，并且需要删除掉原有的安装目录，否则重新安装使用原有路径时依旧会使用目录中安装的交心的 numpy 版本，导致一直报错。

## 参考链接

-   https://github.com/invoke-ai/InvokeAI
-   https://invoke-ai.github.io/InvokeAI/installation/010_INSTALL_AUTOMATED/
