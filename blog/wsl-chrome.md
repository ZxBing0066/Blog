---
tags: [WSL, chrome]
cover: https://stg.heyfe.org/images/blog-wsl-chrome-1690811688446.png
---

# WSL 中安装 google-chrome

要在 WSL 中安装 chrome 首先需要确保满足以下条件：

-   WSL 版本为 WSL 2
-   X Server 即 Linux GUI 已经配置完成

不满足可先看下之前的文章。

## 安装依赖

首先需要安装对应的依赖：

```bash
sudo apt update
sudo apt install -y curl unzip xvfb libxi6 libgconf-2-4
```

## 安装 Chrome

安装 Chrome 需要使用 deb 文件安装：

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb
```

通过 wget 下载最新安装包，然后通过 apt install 安装。安装成功后可通过命令查看是否安装成功。

```bash
google-chrome --version
```

## 安装 ChromeDriver

要让 Chrome 跑起来，还需要安装 ChromeDriver，需要注意的是 ChromeDriver 版本需要和 Chrome 相匹配。可以到 https://chromedriver.chromium.org/ 下找到对应的版本，一般版本号与安装的 Chrome 一致即可。

```bash
wget https://chromedriver.storage.googleapis.com/{version}/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
sudo mv chromedriver /usr/bin/chromedriver
sudo chown root:root /usr/bin/chromedriver
sudo chmod +x /usr/bin/chromedriver
```

注意把 {version} 替换成匹配的版本。安装完成后通过以下命令进行安装检测：

```bash
chromedriver --version
which chromedriver # should be /usr/bin/chromedriver
```

## 启动 Chrome

安装完成后，可直接通过 `google-chrome` 启动 chrome，即可打开 Chrome 窗口：

![picture 1](https://stg.heyfe.org/images/blog-wsl-chrome-38.png)

## FAQ

### [1023/204234.433299:ERROR:exception_handler_server.cc(361)] getsockopt: Invalid argument (22)

一般为 ChromeDriver 未安装或者安装版本不匹配。

## 参考链接

-   https://www.gregbrisebois.com/posts/chromedriver-in-wsl2/
-   https://github.com/microsoft/WSL/issues/637
