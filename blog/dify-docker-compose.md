---
tags: [Dify, Docker, Troubleshooting]
summary:
cover:
---

# 如何部署 Dify 服务

Dify 是一款开源的大语言模型(LLM) 应用开发平台。可以用于构建自己的聊天助手、Agent、工作流。为了方便使用，决定在 NAS 的 Docker 上部署一下。

## 正文

如果想要部署 Dify 服务，**为了避免出现奇怪的情况最好严格按照以下步骤**。

### Clone Dify 项目到本地或 NAS 上

```bash
git clone https://github.com/langgenius/dify.git
```

Dify 对工作目录文件有一些要求，无法直接通过一个 compose 文件简单部署，官方 repo 中已经准备好了需要的文件，所以需要 clone 项目到工作目录。

### 创建 docker compose 文件 和 .env 文件

官方项目中已经存在 docker 文件夹，其中已有默认的 docker compose 文件，.env 文件需要自己复制一份 `.env.example` 文件并重命名为 `.env`。compose 文件最好不要乱改，需要修改的地方都在 .env 文件中。

### 启动服务

可以直接使用 `docker-compose up -d` 启动服务，NAS 中也可直接导入 compose 文件，然后启动服务。目前 Dify 项目中有 10 个，db、plugin-daemon、web、API 等等。

### 开始使用

启动后可以通过浏览器访问 `http://{ip}:{port}` 来访问 Dify 的 web 界面，然后可以开始使用了。

![](https://stg.heyfe.org/images/blog-dify-docker-compose-1740280649986.png)

## FAQ

如果部署后无法启动先查看启动日志，确定问题后再解决。

### 权限问题

先看看启动日志，排除是否存在权限问题。比如：`mkdir: can't create directory '/var/lib/postgresql/data/pgdata': Permission denied`

一般情况下不会出现这种问题，如果出现了不要尝试去修改目录权限，而是按照正文中的步骤重新做一次，很可能是因为

### 端口占用

查看日志中是否存在端口占用问题，比如：`Error starting userland proxy: listen tcp4 0.0.0.0:5432: bind: address already in use`。

当机器上服务较多时，很容易出现端口冲突问题。如果好奇哪个进程占用了端口，可以参考 [Linux 排查端口占用进程详情](./linux-who-occupy-port.md)。要解决端口冲突问题，需要修改 `.env` 文件中的端口号，并且具体问题具体分析，一定要搞清楚端口是哪个服务的。比如上面的例子，在 Dify 项目中有非常多的服务使用了 5432 端口，但是大部分都是服务内部使用，只有 db 服务映射到了宿主机，所以只需要修改 db 服务的端口即可。然而 docker compose file 中映射端口使用的是 `EXPOSE_DB_PORT` 变量，而 `.env` 文件中并没有定义这个变量，只定义了 `DB_PORT`，所以需要手动添加上去。

```json
EXPOSE_DB_PORT=7777
```

而且千万注意不要修改 `DB_PORT`，目前未看出有什么作用，但是修改了之后 db 服务会无法连接。猜测也是 db 服务内部读取了这个变量，但是 db 的端口映射配置确实写死的 `${EXPOSE_DB_PORT:-5432}:5432`。

### 其他问题

如果遇到 db 或 plugin-daemon 无法启动或不停重启的情况，一般是 db 没启动或者是启动了但是 plugin daemon 连不上所导致。如果上述方案都无法解决，删除服务、删除 Dify 目录，重启设备然后严格按照正文中的步骤重新做一次。

## 结语

## 引用
