---
title: Mac M1（arm 系列芯片）如何安装 Chromium | Puppeteer
description: >-
    解决在Mac M1芯片上安装Chromium和使用Puppeteer时遇到的各种问题，包括手动安装Chromium、解决损坏提示和API Keys缺失等问题。

pubDate: '2023-04-27'
heroImage: 'https://stg.heyfe.org/images/blog-ubuntu-puppeteer-1690811141540.png'
tags:
    - pupeteer
---

最近写个脚本用到 puppeteer，然后安装 Chromium 出现一点问题，这里记录一下解决方案。

## Puppeteer 自动安装失败

在 Puppeteer 安装时会自动安装 Chromium，然而却总是报错 502 导致下载失败，直接下载可以下载，命令行 wget 也可以，猜测是因为 Puppeteer 开启了新的 process 来安装导致环境变量丢失，然后就科学上网失败了。

这会回头看了看 Puppeteer 的安装脚本，好像可以使用 `npm_config_https_proxy` 等配置来科学上网。

```js
function overrideProxy() {
    // Override current environment proxy settings with npm configuration, if any.
    const NPM_HTTPS_PROXY = process.env['npm_config_https_proxy'] || process.env['npm_config_proxy'];
    const NPM_HTTP_PROXY = process.env['npm_config_http_proxy'] || process.env['npm_config_proxy'];
    const NPM_NO_PROXY = process.env['npm_config_no_proxy'];
    if (NPM_HTTPS_PROXY) {
        process.env['HTTPS_PROXY'] = NPM_HTTPS_PROXY;
    }
    if (NPM_HTTP_PROXY) {
        process.env['HTTP_PROXY'] = NPM_HTTP_PROXY;
    }
    if (NPM_NO_PROXY) {
        process.env['NO_PROXY'] = NPM_NO_PROXY;
    }
}
```

不过当时没看就直接打算手动安装 Chromium 了，要手动安装在安装 Puppeteer 时需要先关闭自动下载：

```bash
PUPPETEER_SKIP_DOWNLOAD='true' pnpm add puppeteer
```

这样就可以跳过 Puppeteer 中自动的 Chromium 安装。

## 手动安装 Chromium

### 失败尝试

手动安装首先是使用了 homebrew 的方式，但是由于之前玩 Stable Diffusion 一些依赖包的兼容问题，我的 homebrew 切到了 x86 版本，所以安装后的是 intel 芯片版本的 Chromium，导致无法打开，打开就会显示弹窗：

```
You can't open the application "Chromium" because this application is not supported on this Mac.
```

![picture 1](https://stg.heyfe.org/images/blog-mac-arm-chromium-1682603658586.png)

无奈就去官网： https://download-chromium.appspot.com/ 手动下载，结果不成想官网挂的也是 intel 版本：

![picture 2](https://stg.heyfe.org/images/blog-mac-arm-chromium-1682603749717.png)

不死心的下载试了一下，果然不行。

### 成功安装

然后无奈的搜了一下，发现了这个问题： https://stackoverflow.com/questions/66002337/is-the-homebrew-chromium-m1-optimised ，其中提及到 homebrew 中安装的脚本：

```ruby
 arch = Hardware::CPU.intel? ? "Mac" : "Mac_Arm"
 ...
 url "https://commondatastorage.googleapis.com/chromium-browser-snapshots/#{arch}/#{version}/chrome-mac.zip
```

原来只需要将地址中的架构类型变更更换为想要的版本就可以了。

而官网对应的下载地址是： https://download-chromium.appspot.com/dl/Mac?type=snapshots ，所以我将其中的 Mac 替换为 Mac_Arm 得到如下地址： https://download-chromium.appspot.com/dl/Mac_Arm?type=snapshots ，打开果然成功下载了。

下载完成后解压，就拿到了 Arm 版本的 Chromium。 然而打开时又出现了新的问题：

```
Chromium is damaged and can't be opened. You should move it to the Trash.
```

![picture 3](https://stg.heyfe.org/images/blog-mac-arm-chromium-1682603999935.png)

遇到这个报错必须要移除对应的验证：

```bash
xattr -c /Applications/Chromium.app
```

好了，终于可以打开了，可喜可贺。

### API Keys missing

然而当我打开后又发现 Chromium 上飘着一行提示：

```
Google API Keys are missing. Some functionality of chromium will be disabled.
```

不过此时的 Chromium 已经可以正常使用了，但是子曾经曰过："遇到问题不能坐以待毙"，还是处理下好了。

查了一下原因是 Chromium 的一些功能如 Google 账号同步等等需要使用 Google API Keys，要处理这个提示大体是两种思路：

1. 可以选择禁用这个提示，但是这样 Chromium 的一些功能也就无法使用了。
2. 申请 Google API keys，并填入。

如果想要禁用提示可以编辑 `Chromium.app > Contents > Info.plist` 文件并添加以下内容：

```xml
<key>LSEnvironment</key>
<dict>
    <key>GOOGLE_API_KEY</key>
    <string>no</string>
    <key>GOOGLE_DEFAULT_CLIENT_ID</key>
    <string>no</string>
    <key>GOOGLE_DEFAULT_CLIENT_SECRET</key>
    <string>no</string>
</dict>
```

而如果想要填入 Google API Keys 则需要去 Google Cloud 申请 API Keys，具体的流程可以参考： https://www.chromium.org/developers/how-tos/api-keys/#acquiring-keys

还有一种方法就是直接使用网上流出的 API Keys，比如这个：

```bash
export GOOGLE_API_KEY="AIzaSyCkfPOPZXDKNn8hhgu3JrA62wIgC93d44k"
export GOOGLE_DEFAULT_CLIENT_ID="811574891467.apps.googleusercontent.com"
export GOOGLE_DEFAULT_CLIENT_SECRET="kdloedMFGdGla2P1zacGjAQh"
```

在 bash 执行上述代码将 API Keys 设置到环境变量重启 Chromium 即可生效。

但是一定需要注意 ⚠️：**使用了 API Keys 可能会导致数据信息泄漏问题，所以如果有敏感信息切勿使用他人提供的 Key！！！**

### 在 Puppeteer 中使用

由于 Chromium 不是由 Puppeteer 安装的，所以 Puppeteer 会找不到 Chromium 位置，需要在 Puppeteer 的配置文件中添加 `executablePath` 来指定 Chromium 的位置：

```js
const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    // Changes the cache location for Puppeteer.
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
    executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium'
};
```

## 参考资料

-   https://stackoverflow.com/questions/66002337/is-the-homebrew-chromium-m1-optimised
-   https://stackoverflow.com/questions/21276763/google-api-keys-missing-warning-message-when-using-chromium-portable
-   https://groups.google.com/a/chromium.org/g/chromium-dev/c/cTPJG7KnBpI?pli=1
-   https://www.chromium.org/developers/how-tos/api-keys/#acquiring-keys