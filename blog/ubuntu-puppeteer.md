---
tags: [pupeteer, linux]
cover: https://stg.heyfe.org/images/blog-ubuntu-puppeteer-1690811141540.png
---

# Ubuntu 下安装 Puppeteer

> 最近把一些项目从本地放到白嫖的甲骨云服务器上了，主要是为了方便在家里和公司都能访问到一样的环境，然后之前写的一些脚本有用到 Puppeteer，直接 install 并没有自动安装 Chromium，这里记录下手动安装方式。

1. 首先安装 Puppeteer

```sh
sudo pnpm install puppeteer -D
```

这里按需选择包管理器和安装位置。

2. 安装 Chromium，在 Mac 上安装 Puppeteer 时会触发 install 然后自动安装 Chromium，但是 Ubuntu 下不会触发，所以需要手动安装。

```sh
sudo apt-get install chromium-browser
```

3. 安装 Chromium 的依赖包

```sh
sudo apt-get install libx11-xcb1 libxcomposite1 libasound2 libatk1.0-0 libatk-bridge2.0-0 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6
```

大部分都是一些要在 Ubuntu 下运行 GUI 程序所需要的依赖包。

然后便可以使用 Puppeteer 调用 headless Chromium 了。安装整个过程比较顺利，暂时没遇到什么问题。

而 Chromium 也可以使用其他浏览器替换，比如 Firefox，只需要修改 Puppeteer 配置即可，
