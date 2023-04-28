# MacOS 开机启动控制

在 MacOS 中一般存在两种开机启动的控制方式：

1. 在系统设置中设置开机启动项列表
2. 在程序的设置中控制程序的开机启动

这些都很简单就可以修改，而有那么一些程序，就是不按套路出牌，常见的如很多 VPN 工具： Pulse Secure、Cisco Anyconnect、Open VPN 等等，针对这些软件需要一些非常规手段来关闭它们的开机启动。

## Mac 的开机启动清单

在 MacOS 中，有几个文件夹会专门用来放置开机启动的文件项目：

-   /Library/LaunchAgents
-   /Library/LaunchDaemons
-   ~/Library/LaunchAgents


## 相关问题

-   如何关闭 Pulse Secure 在 Mac 中的开机启动
-   Mac 开机启动关闭不生效
