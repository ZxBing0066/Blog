---
title: Stable Diffusion WebUI 各操作系统安装教程
pubDate: '2023-04-16'
heroImage: 'https://stg.heyfe.org/images/blog-stable-diffusion-models-1690811336594.png'
tags:
    - AI绘画
    - AIGC
    - Stable Diffusion
---

最近几天在 2 台 Mac、2 台 PC、一台云无 GPU 的 Linux 安装了 Stable Diffusion WebUI，这里记录下如何安装，以及一些注意点和坑。

以下内容针对 Windows（N 卡）、MacOS（m 系列芯片）、Linux（Ubuntu、无 GPU）。

## Windows 安装

Windows 安装算是比较简单的，首先直接到 https://www.python.org/downloads/release/python-3106/ 最下方下载 Windows Installer（**注意官方建议版本是 3.10.6，不要使用太新的或太旧的版本，存在部分包不兼容的问题**），然后点击安装，建议选择默认安装方式并**勾选上 PATH**，这样后面就不用自己设置 PATH 环境变量了：

![picture 1](https://stg.heyfe.org/images/blog-stable-diffusion-webui-install-1681566777970.png)

最后的 PATH 最大长度限制的解除可选可不选。然后就可以 clone WebUI 仓库了，如果没有安装过 git 的记得先安装一下：

```powershell
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
```

clone 完成后进入 WebUI 目录双击 `webui-user.bat` 即可打开 WebUI，WebUI 会自动安装需要的依赖并启动，首次运行需要下载的依赖较多可能需要等待比较久的时间。

## MacOS 安装

MacOS 安装同样需要先安装依赖，注意先安装好 homebrew，由于 m 系列芯片支持两个版本的 homebrew，所以一定要注意，**需要使用 x86 版本的 homebrew**，可以使用 `which brew` 查看，如果是 `/usr/local/bin/brew` 则是 x86，如果不是最好卸载重装后再继续下面的操作。

确认 homebrew 无误后，使用 homebrew 安装需要的依赖，并 clone Stable Diffusion WebUI：

```sh
brew install cmake protobuf rust python@3.10 git wget
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
```

上述操作都就绪后，就可以进入 WebUI 目录，然后使用 `./webui.sh` 启动，WebUI 会自动安装需要的依赖并启动，首次运行需要下载的依赖较多可能需要等待比较久的时间。

## Linux 安装

我的云主机操作系统是 Ubuntu 22，并且由于是白嫖的甲骨文的免费云，没有 GPU，所以只能用纯 CPU 跑。

在 Linux 上跑也是一样的路子，先安装依赖，再 clone WebUI：

```sh
sudo apt install wget git python3 python3-venv
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
```

然后进入 WebUI 目录执行 `./webui.sh` 启动即可，同样的，WebUI 会自动安装需要的依赖并启动，首次运行需要下载的依赖较多可能需要等待比较久的时间。

不过需要注意的是由于机器没有 GPU，在启动时候需要添加参数来使用 GPU：

```sh
./webui.sh --skip-torch-cuda-test --precision full --no-half --use-cpu all
```

还需要注意，有一些 model 的参数需要 GPU 的支持，所以使用 CPU 跑图很可能会发现跑半天出现不支持 CPU 的错误，所以**如果不是没办法强烈不建议使用 CPU 来跑**。

## 启动

### 在 Windows 启动时添加参数

由于 Windows 上启动时使用的是 bat 文件，而不是命令行，所以需要添加参数时和其它系统不同，需要编辑 `webui-user.bat` 文件，然后将在其中的 `set COMMANDLINE_ARGS=` 后面加上需要添加的参数来运行。

### Serve 给其它机器使用

默认情况下 WebUI 只会监听本机的 host，如果需要从其他机器访问，比如在局域网通过另一台机器访问服务器上的 WebUI 则需要增加 `--listen` 参数。添加参数后如果需要使用插件要添加 `--enable-insecure-extension-access` 参数，不然会出现最下方的问题。

当然其实也可以直接用 Nginx 反代就不会触发 WebUI 的安全问题。

## Nginx 反代

如果想用 Nginx 反代 WebUI，需要注意：WebUI 里面用到 websocket，所以反代也需要考虑到，不然 WebUI 中发出的 ws 请求 `/queue/join` 会一直报错，下面放一下我的反代的配置：

```conf
server {
    listen 80;
    listen [::]:80;
    server_name xxx.xxx.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name xxx.xxx.com;

    ssl_certificate /etc/nginx/cert/xxx.pem;
    ssl_certificate_key /etc/nginx/cert/xxx.key;

    proxy_connect_timeout              60s;
    proxy_send_timeout                 60s;
    proxy_read_timeout                 60s;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Upgrade           $http_upgrade;
    proxy_set_header Connection        $connection_upgrade;
    proxy_set_header X-Forwarded-Proto $scheme;

    location / {
        proxy_pass http://localhost:7860;
    }
}
```

使用上述配置还需要在 nginx.conf 中的 http 模块中添加上如下声明，不然会报错：

```conf
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
```

## 速度

从几台机器和结合最近几天在其它平台上的经验来看，速度差异非常大，我两台 Mac 都是 m1-16G，PC 由于显卡太老旧根本跑不起来（GTX660），Linux 是甲骨文的 VM.Standard.A1.Flex-4VCPU-24G，对比后速度如下：

-   Linux 跑一张默认图耗时大概 9 分钟左右
-   m1-16G 跑一张默认图的耗时大概在 50 秒
-   Colab 的 T4 跑一张默认图耗时大概在 4 秒左右
-   阿里云的 A10 跑一张默认图都是秒出的

如果稍微复杂点的模型我的这台 Linux 一晚上都跑不出几张图，m1 勉强能用，所以哪怕是 Colab 现在的免费时长缩短到一小时，其实也比在其他机器上瞎跑好多了，效率摆在这里。

## FAQ

### AssertionError: extension access disabled because of command line flags

当使用 WebUI 安装插件时报错，这个是因为使用了 `--listen` 参数，WebUI 为了安全（因为此时可以外网通过 IP 访问 WebUI）会默认禁用插件安装的权限，此时可以通过 `--enable-insecure-extension-access` 参数关闭插件的安全检测。

参考链接： https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/4215

### WebSocket 连不上，queue/join 报错

正常出现在使用 nginx 反代时，一般由于没有反代 websocket 导致 websocket 无法连接。

### 没有 GPU 怎么办

没有 GPU 时在启动时需要添加 `--skip-torch-cuda-test --no-half --use-cpu all` 这几个参数，关闭 CUDA 并强制开启使用 CPU。

### Mac 报错： have 'arm64', need 'x86_64'

一般这种情况下是安装了 arm 版的 homebrew，导致安装的其他依赖包也是 arm 版本，而有些依赖包没有 arm 版本就会造成依赖缺失，所以遇到后需要检查自己的 homebrew 版本并切换成 x86 版本并重新安装依赖。

## 注意

**最后一定要注意：在调试时出现问题需要重新安装依赖时，一定、一定、一定要记得先清理干净 WebUI 目录下的缓存，比如 `__pycache__`、`venv` 这几个目录，否则会一直使用缓存中的配置。**