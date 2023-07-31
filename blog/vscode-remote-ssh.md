---
tags: [VSCode, SSH]
cover: https://stg.heyfe.org/images/blog-vscode-js-debug-terminal-1690811194402.jpg
---

# VSCode Remote - SSH 入门保姆级教程

> 本文针对环境为本地机器：`MacOS`，远程环境 `Windows 10`。

![picture 1](https://stg.heyfe.org/images/blog-vscode-ssh-remote-27.png)

## 什么是 VSCode Remote - SSH

`VSCode Remote` 为 `VSCode` 提供的远程开发的功能，通过各种技术方案可以直接在本地机器中对远程代码进行开发，方便各种安全开发、统一环境等场景。

`SSH Remote` 为 `VSCode Remote` 中提供的使用 `SSH` 协议来进行远程开发的方案，类似于 `SSH` 登陆到远程主机进行开发，不过 `VSCode` 内部进行了封装和优化。

## 本机环境配置

由于本地使用 `MacOS`，无需特殊配制安装，开箱即用，不过记得提前安装 `developer tools`。

如果使用的是非 `MacOS`，可参考 [文档](https://code.visualstudio.com/docs/remote/troubleshooting#_installing-a-supported-ssh-client) 安装 `SSH` 客户端。

## 远程环境配置

由于远程使用的 `win10`，所以需要安装 `OpenSSH`。

首先确认 `OpenSSH` 的安装状态：

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

如果没有安装可按照需要选择安装客户端和服务端：

```powershell
# Install the OpenSSH Client
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

# Install the OpenSSH Server
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

然后启动 `sshd` 服务：

```powershell
Start-Service sshd
```

将 `sshd` 添加到自动启动：

```powershell
Set-Service -Name sshd -StartupType 'Automatic'
```

为了确保安全需要确保防火墙规则配置：

```powershell
if (!(Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue | Select-Object Name, Enabled)) {
    Write-Output "Firewall Rule 'OpenSSH-Server-In-TCP' does not exist, creating it..."
    New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
} else {
    Write-Output "Firewall rule 'OpenSSH-Server-In-TCP' has been created and exists."
}
```

## 可能的错误和处理

### `Add-WindowsCapability failed. Error code - 0x800f0954`

![picture 2](https://stg.heyfe.org/images/blog-vscode-remote-ssh-61.png)

解决方案：

1. 运行 `gpedit.msc` 打开策略组编辑器
2. 打开 `Computer Configuration\Administrative Templates\System\Specify settings for optional component installation and component repair`，中文对应 `计算机配置\管理模版\系统\指定可选组件安装和组件修复的设置`。![picture 3](https://stg.heyfe.org/images/blog-vscode-remote-ssh-28.png)
3. 将其修改为启用后重新尝试。

参考链接：https://social.technet.microsoft.com/Forums/en-US/42bfdd6e-f191-4813-9142-5c86a2797c53/windows-10-1809-rsat-toolset-error-code-of-0x800f0954?forum=win10itprogeneral

## 配置

在本地 `VSCode` 中安装 `Remote Development extension pack` 或者 `Remote - SSH` 插件，即可开始使用 `Remote SSH` 进行开发。`Remote Development extension pack` 包含 `Remote - SSH` 等三个包。

安装后可以看到 `VSCode` 界面多出两个按钮，一个是左下角的 `Remote` 状态按钮：

![picture 2](https://stg.heyfe.org/images/blog-vscode-ssh-remote-13.png)

一个是左侧按钮栏的 `Remote Explorer`：

![picture 3](https://stg.heyfe.org/images/blog-vscode-ssh-remote-85.png)

点击 `Remote` 按钮，可以进入 `Remote` 菜单，也可使用 `Show Remote Menu` 进入：

![picture 4](https://stg.heyfe.org/images/blog-vscode-ssh-remote-67.png)

## 连接

### 新连接

创建新连接有多个手段，如果是新的 `SSH` 连接，我们可以通过 `Connect To Host`，然后 `Add New SSH Host` 按照提示输入 `SSH` 连接命令，一般而言直接输入 `username@host` 即可，`username` 为远程机器的用户名，`host` 没有特殊配置一般则为远程机器的 `IP`，`windows` 中的 `IP` 可通过 `cmd` 使用 `ipconfig` 命令查看。回车后需要如果连接成功将会提示输入密码，输入 `windows` 账号对应的密码即可。

需要注意首先需要确保远程机器可以正常使用 `SSH` 进行连接，如果远程机器 `IP` 无法直接访问，比如在公司内网，则可能需要连入公司 `VPN` 后再进行连接。使用前可直接使用 `ssh username@host` 命令尝试连接。

此外，还可以通过将 `SSH` 命令添加到 `ssh config` 文件中来方便连接，如果使用上面的 `Add New SSH Host`，`VSCode` 会自动将配置添加到 `ssh config` 文件中，我们也可以主动更改文件，一般 `MacOS` 中直接修改 `~/.ssh/config` 文件即可，使用 `Remote Menu` 中的 `Open SSH Configure File` 也可以直接使用 `VSCode` 打开对应的配置文件。一般一条 `SSH` 配置包含以下内容：

```bash
Host SSH-name # 名称标识
    HostName 1.1.1.1 # host name，一般为 IP
    User hello # user name
```

如用到其它自定义参数，如 `ControlPersist`、`ControlPath` 等，可自行按需配置。

### 二次连接

按照上述添加成功后，以后连接则可直接在 `Remote Menu` 中选择对应的连接，或者在 `Remote Explorer` 中直接选择对应的配置进行连接。

![picture 5](https://stg.heyfe.org/images/blog-vscode-ssh-remote-82.png)

![picture 6](https://stg.heyfe.org/images/blog-vscode-ssh-remote-45.png)

### 连接后

如果连接时未选择开发对应的文件夹，点击左侧的 `Open Folder` 后 `VSCode` 将会提示你选择需要开发的文件夹：

![picture 7](https://stg.heyfe.org/images/blog-vscode-ssh-remote-88.png)

且此处的 `Clone Repository` 也是将仓库 `Clone` 到远程机器上。

连接后左下角的 `Remote` 按钮将会展示当前 `Remote` 连接的方式和名称，且 `Remote Menu` 菜单中将会多出 `Setting` 等几个菜单。

## 使用

开发时一般情况下就可以直接当做本地开发，不过需要知道，除了 `VSCode` 是我们本地机器上的，其它的如代码、`shell` 等全部都是在远程机器上，所以一定要搞清楚环境是在远程而不是在本地。

开发时体验基本与本地开发无异，但是在远程机器较为卡顿是还是会发现无论是创建文件、`terminal` 中输入命令等都会存在一定的延迟。`VSCode` 也对这些做了一定的优化，比如在 `terminal` 中会用灰色来提示当前输入还在传输中：

![picture 8](https://stg.heyfe.org/images/blog-vscode-ssh-remote-71.png)

或者是文件操作是 `Explorer` 会展示 `loading` 提示操作中：

![picture 9](https://stg.heyfe.org/images/blog-vscode-ssh-remote-51.gif)

### 端口映射

此外还有一个远程开发时常见的问题，服务访问。如我们在进行开发时，本地需要起 `server` 来预览，然而由于 `shell`、环境、代码等都是远端的，所以 `http` 服务也是远端机器提供，此时要访问远端机器提供的服务，则需要端口转发。`VSCode Remote` 自带了端口转发的功能：

![picture 10](https://stg.heyfe.org/images/blog-vscode-ssh-remote-91.png)

可以看到 `VSCode Remote` 在下方多了一个 `Port Forward` 状态栏按钮，且面板区域多了一个 `PORTS` 面板，点开后可以配置端口的映射。

以 `create-react-app` 为例，`create-react-app` 默认端口为 3000，我们可以添加一个 3000 到 3000 的端口映射，则我们在访问本地的 `localhost:3000` 时， `VSCode` 会将请求转发到远端机器的 3000 端口上，以此完成本地机器直接访问远程服务的目的。且 `VSCode` 会自动监听端口的服务访问，比如 `create-react-app` 启动后 `VSCode` 会自动添加一个 3000 到 3000 的映射。

![picture 11](https://stg.heyfe.org/images/blog-vscode-ssh-remote-41.png)

此外如果想要修改映射关系可在映射项目右键，可修改对应的本地和远程端口，以及访问协议。比如需要需要让 `create-react-app` 应用以 `https` 协议运行，我们可以使用 `HTTPS=true npm start` 启动项目，然后将端口映射的协议修改为 `https`，即可在本地的 `https://localhost:3000` 中访问到。

## 总结

总的来说，`VSCode Remote` 的 `SSH` 配置简单，使用方便，在一些场景下可以发挥巨大作用。比如：

-   紧急情况下直接调试开发远程机器中的代码
-   远程机器存在特殊环境
-   代码因为安全问题无法直接访问

此外 `VSCode Remote` 还提供了其它多种 `Remote` 连接的方式，以用于不同的场景，只能说一句：真香。

![picture 1](https://stg.heyfe.org/images/blog-vscode-remote-ssh-16.png)

## 参考资料

-   https://code.visualstudio.com/docs/remote/ssh#_ssh-hostspecific-settings
-   https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui
