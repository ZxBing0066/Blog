---
tags: [Chrome]
summary: 在 MacOS 中如何打开多个 Chrome 实例，以及如何同时运行多个版本的 Chrome。
---

# MacOS 中打开多个 Chrome 实例

前端开发偶尔会遇到一些特殊情况（如某 API 不支持跨域，但又急需使用）可能需要临时关闭 Chrome 的安全策略，一般情况下可以通过命令行参数 `--disable-web-security` 来关闭安全策略，但这样需要关闭 Chrome 窗口，然后重新添加参数后再打开，而且很容易搞混，麻烦又不安全。在 MacOS 中可以通过命令行启动多个 Chrome 实例，这样就可以在不关闭原有 Chrome 窗口的情况下打开一个新的 Chrome 实例，这样就可以在新的 Chrome 实例中添加命令行参数，而不影响原有的 Chrome 实例。

## 命令行打开 Chrome 实例

在 MacOS 中可以通过命令行启动多个 Chrome 实例，命令如下：

```bash
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir=/Users/$USER/Library/Application\ Support/Google/ChromeInsecure --disable-web-security
```

![](https://stg.heyfe.org/images/blog-chrome-multiple-instances-1710953225661.png)

注意这里需要设置 `--user-data-dir` 参数区分默认的数据文件夹，这样第一是可以避免新的 Chrome 实例使用原有的用户数据，第二是如果不添加，Chrome 判定后还是会使用单个实例的方式进行启动。

使用上述命令中每一个新的 `--user-data-dir` 参数值都可以启动一个新的 Chrome 实例。

为了方便可以直接使用 `alias` 来简化命令：

```bash
alias chrome-insecure='open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir=/Users/$USER/Library/Application\ Support/Google/ChromeInsecure --disable-web-security'
```

## 多版本 Chrome

使用上述方法启动的 Chrome 实例都是同一个程序的，这就导致启动出来的程序名称都叫 `Google Chrome`，这样就很难区分不同的 Chrome 实例。所以为了区分，可以直接复制一份 Chrome 程序，然后修改程序名称，这样就可以区分不同的 Chrome 实例。

借助这个思路，可以直接下载不同版本的 Chrome，然后分别修改程序名称，这样就可以在同一台 Mac 上同时运行多个版本的 Chrome，可用来进行一些兼容性测试。

历史版本的 Chrome 可以到：https://google-chrome.en.uptodown.com/mac/versions 进行下载。安装时记得修改程序名称，如 `Google Chrome 90`。然后就可以创建一条新的 `alias` 来启动这个新的 Chrome 实例。

```bash
alias chrome-90='open -n -a /Applications/Google\ Chrome\ 90.app/Contents/MacOS/Google\ Chrome --args --user-data-dir=/Users/$USER/Library/Application\ Support/Google/Chrome90'
```

由于 Chrome 会进行自动更新，重启很可能就被更新成最新版本，所以启动前需要先关闭自动更新。

可以运行以下命令关闭全局自动更新：

```bash
defaults read com.google.Keystone.Agent checkInterval
defaults write com.google.Keystone.Agent checkInterval 0
```

或者关闭对应包的自动更新。右键应用程序文件，点击 `显示包内容`，然后找到 `Contents/Info.plist` 文件，将其中的 `<string>https://tools.google.com/service/update2</string>` 修改为 `<string>https://localhost/service/update2</string>`。这样它就无法连接到 Google 的服务器进行更新了。

## 快捷方式启动

在 MacOS 中可以通过 `/Applications/Utilities/ScriptEditor.app` 创建一个 AppleScript 脚本。

```applescript
do shell script "/Applications/Google\\Chrome\\ 90.app/Contents/MacOS/Google\\ Chrome --user-data-dir=/Users/$USER/Library/Application\\ Support/Google/Chrome90 > /dev/null 2>&1 &”
```

![](https://stg.heyfe.org/images/blog-chrome-multiple-instances-1710955824761.png)

记得保存类型设置为应用程序，这样就可以直接双击启动。

不过这样有个缺点就是每次启动都会打开一个 Script 的应用图标，然后再打开 Chrome，强迫症患者可能会不太喜欢。

## 参考资料

-   https://gkedge.gitbooks.io/install-two-versions-of-chrome-on-os-x/content/
-   https://zhoukekestar.github.io/notes/2017/11/01/install-multi-chrome.html
