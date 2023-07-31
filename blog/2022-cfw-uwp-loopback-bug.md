---
ignoreInList: true
tags: [clash, FAQ]
---

# 如何解决 Clash for Windows 的 UWP Loopback 无法打开的问题

CFW 最近自带的 UWP Loopback 工具存在问题，打开后无法正常显示 app 列表，如图，一片空白：

![picture 1](https://stg.heyfe.org/images/blog-2022-cfw-uwp-loopback-bug-10.png)

搜索后发现为 UWP Loopback 版本问题，替换为新版即可：首先下载最新版 Fiddler Classic，然后从安装目录中提取 EnableLoopback.exe 到 CFW 的 EnableLoopback.exe 目录下覆盖即可。

具体操作如下：

1. 首先去 [Fiddler 官网](https://www.telerik.com/download/fiddler) 下载最新版 Fiddler Classic，安装后打开安装目录，可右键快捷方式从属性窗口中打开：

    ![picture 2](https://stg.heyfe.org/images/blog-2022-cfw-uwp-loopback-bug-95.png)

2. 然后从安装路径中提取 EnableLoopback.exe：

    ![picture 3](https://stg.heyfe.org/images/blog-2022-cfw-uwp-loopback-bug-34.png)

3. CFW 的 EnableLoopback.exe 目录为 CFW 安装目录下的 `\resources\static\files\win\common`

    ![picture 4](https://stg.heyfe.org/images/blog-2022-cfw-uwp-loopback-bug-28.png)

    也可通过打开 CFW 的 UWP Loopback，然后右键任务栏程序图标，再右键程序打开属性：

    ![picture 5](https://stg.heyfe.org/images/blog-2022-cfw-uwp-loopback-bug-21.png)

    即可看到其安装位置：

    ![picture 6](https://stg.heyfe.org/images/blog-2022-cfw-uwp-loopback-bug-33.png)

4. 将从 Fiddler 中复制的 EnableLoopback.exe 粘贴替换后重新从 CFW 中打开 UWP Loopback，即可正常显示 app 列表：

    ![picture 7](https://stg.heyfe.org/images/blog-2022-cfw-uwp-loopback-bug-9.png)

参考链接：

-   [相关的 github issue](https://github.com/Fndroid/clash_for_windows_pkg/issues/2830)
-   [Fiddler 官网下载地址](https://www.telerik.com/download/fiddler)
