---
tags: [wsl, ssh]
---

# WSL SSH 设置和开机启动

由于平时使用 Mac 工作，而代码在 win 上，需要远程，可是公司电脑的 ssh server 会定时被禁用，估计是什么安全策略，加上 windows 的开发环境着实不太方便，所以使用 WSL 来进行开发。

## WSL SSH 安装

直接安装 `openssh-client` 和 `openssh-server` 即可。

```bash
sudo apt install openssh-client openssh-server
```

## 配置 SSH 服务和端口

修改 /etc/ssh/sshd_config 配置：

```bash
sudo vim /etc/ssh/sshd_config
```

修改一下配置：

```bash
Port 2222
ListenAddress 0.0.0.0
```

然后修改 `/etc/ssh/ssh_config`：

```bash
Port 2222
```

由于默认的端口为 22 端口，会和 windows 中的端口冲突，因此修改为 2222，可按需修改。

## 服务启动和状态

```bash
# 启动服务
sudo service ssh start
# 查看服务状态
sudo service ssh status
```

## 设置开机启动

```bash
sudo systemctl enable ssh
```

然而在 WSL 中设置后好像不起作用。

## 开机启动 WSL 并启动 SSH

我们可以在开机启动 WSL 中一起解决开机启动 SSH 的问题。

首先在 /etc/sudoers 中添加权限声明：

```bash
sudo vim  /etc/sudoers
```

在文件中添加以下内容：

```bash
%sudo\tALL=(ALL) NOPASSWD: /usr/sbin/service ssh --full-restart
```

操作后可以让 ssh 不需要密码也能 sudo 运行。

然后使用 `运行` 执行 `shell:startup`:

![picture 1](https://stg.heyfe.org/images/blog-wsl-ssh-startup-set-10.png)

打开开机启动文件夹后，在其中创建一个 `startubuntu.vbs` 的脚本文件。开机启动文件夹中的内容会在 windows 启动后自动执行。然后将以下内容添加到脚本中：

```vbscript
Set ws = WScript.CreateObject("WScript.Shell")
ws.run "wsl -d Ubuntu-22.04 -u root /usr/sbin/service ssh --full-restart", vbhide
```

脚本的意思是使用 shell 执行 wsl -d 运行对应的 wsl 系统，然后使用 root 启动 ssh 服务。vbhide 是避免该脚本启动后弹出窗口。

此处注意将 `Ubuntu-22.04` 换成自己的 WSL 名称。完成后重启对应的 WSL 和 WSL 中的 SSH 就都启动了。

## 防火墙设置

如果需要从外部连接到 WSL，需要为上面设置的 SSH 端口配置防火墙。

![picture 2](https://stg.heyfe.org/images/blog-wsl-ssh-startup-set-29.png)

打开防火墙配置，然后添加入口规则：

![picture 3](https://stg.heyfe.org/images/blog-wsl-ssh-startup-set-33.png)

然后输入上面设置的 SSH 端口号：

![picture 4](https://stg.heyfe.org/images/blog-wsl-ssh-startup-set-70.png)

防火墙设置完成后，就可以在外部通过 ssh 访问 WSL 了。

## 参考链接

-   https://dulunar.github.io/2019/10/14/windows10%E4%B8%8BWSL%E7%9A%84%E4%BD%BF%E7%94%A8%E5%92%8C%E9%85%8D%E7%BD%AE/
