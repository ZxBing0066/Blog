---
title: NAS 中使用 Docker 部署 Clash
description: NAS 中部署 Clash，实现 NAS 的科学上网自给自足
pubDate: '2025-02-21'
heroImage: 'https://stg.heyfe.org/images/blog-nas-docker-clash-1740151206808.png'
tags:
    - NAS
    - Docker
    - Clash
---

NAS 中部署的一些服务经常需要科学上网才能正常工作，比如青龙中安装依赖、prowlarr 中更新索引器等。虽然可以通过本地电脑共享给 NAS 使用，但某些时候很不方便，比如服务偶尔重启但本地电脑未开机等。所以决定在 NAS 中部署一下 Clash，自给自足。

## 正文

目前使用的是现成的镜像 [clash-and-dashboard](https://github.com/LaoYutang/clash-and-dashboard)，包含了 Clash 和 Clash Dashboard，方便通过 UI 进行管理。

### Docker Compose 配置

```yaml
services:
    clash:
        image: laoyutang/clash-and-dashboard:latest
        container_name: clash
        restart: always
        ports:
            - '7888:8080'
            - '7890:7890'
        logging:
            options:
                max-size: '1m'
        volumes:
            - ./clash/:/root/.config/clash/
```

直接通过 docker compose 启动，配置极其简洁，两个端口映射，一个用于 Dashboard，一个用于 Clash 代理，如果需要用到其他端口如 socks 可自行添加；一个 volume 映射，用于保存配置文件。

### Clash 配置文件

Clash 配置文件则直接使用自己已有的配置，目前大部分机场提供的都是订阅模式，不过这个镜像还不支持自动更新订阅，所以直接通过订阅链接下载配置文件即可。下载完成后在启动目录下创建 `clash` 文件夹，并将该文件命名为 `config.yaml` 放入文件夹即可。如果需要更新配置，需要重新下载并覆盖替换，替换完成后记得重启容器。

![](https://stg.heyfe.org/images/blog-nas-docker-clash-1740150945177.png)

也可直接 ssh 连接到 NAS 中，使用 `curl` 命令下载配置文件：

```bash
curl -o ./config.yaml https://xxx.com/link/xxx
```

### Console 界面

当 Docker Compose 配置和 Clash 配置文件都准备好后即可启动容器，启动完成后访问 `http://nas-ip:7888`（需要按照自己配置的端口映射） 即可看到 Clash Dashboard 界面，可以在这里进行代理切换、查看连接、规则等。

![](https://stg.heyfe.org/images/blog-nas-docker-clash-1740151206808.png)

另外这里需要特别注意，必须要开启 `允许来自局域网的连接`，否则其他服务或设备将无法连接。

![](https://stg.heyfe.org/images/blog-nas-docker-clash-1740151282487.png)

如果发现 `允许来自局域网的连接` 默认关闭，强烈介意手动更改 `config.yaml` 文件，将 `allow-lan` 设置为 `true`，**否则每次服务重启都需要手动打开开关**。

```yaml
port: 7890
socks-port: 7891
redir-port: 7892
# 这里修改
allow-lan: true
mode: rule
```

然后重启容器检查，如果重启后开关正常打开，这表示配置生效。

### 外部控制

![编辑外部控制设置弹窗](https://stg.heyfe.org/images/503299638f6d0e53adf0699b5fecb095e077e1d61ceafc39d1174a32023ebf22.png)

如遇到启动后不停的弹窗 `编辑外部控制设置`，大概率是因为你的 `config.yaml` 中没有设置 `external-controller`，可以在 `config.yaml` 中添加以下配置：

```yaml
external-controller: '0.0.0.0:9090'
```

然后重启容器即可。

## 结语

Clash 在 NAS 中部署后，即可实现 NAS 的科学上网自给自足，不用再依赖其他设备。而且 NAS 作为长期开机设备，也可以作为一个稳定的代理设备，方便其他局域网设备使用，比如 Switch 等。

## 引用

- 所用镜像 GitHub 地址：https://github.com/LaoYutang/clash-and-dashboard
- 核心库镜像地址：https://hub.docker.com/r/dreamacro/clash
