---
title: 如何解决青龙重启后依赖丢失的问题
description: >-
  青龙的依赖会在重启后丢失，导致每次重启后脚本都需要等待依赖安装完成。且容易导致资源占用过高。本文介绍如何将青龙的依赖保存到宿主机上，以解决重启后依赖丢失的问题。
pubDate: '2025-02-21'
heroImage: 'https://stg.heyfe.org/images/blog-qinglong-install-1740152682200.png'
tags:
  - 青龙
  - Docker
  - NAS
---

青龙用了有一段时间了，主要用来跑一些自动化签到脚本之类的，然而用了之后搞得我 NAS 都不管关机了，因为一旦关机青龙就会重启，然后重启后就会发现依赖丢失，导致脚本无法运行。每次安装依赖又要等好久，得了点空还是处理下这个问题吧。

## 正文

依赖丢失的问题很容易理解，Docker 在重启时会将容器内的数据重置，那就要想办法将依赖保存到宿主机上，这样重启后就可以直接挂载上去。主要是不知道青龙的依赖目录，所以先找到青龙的依赖目录。搜了一下找到了这个帖子：https://github.com/whyour/qinglong/issues/1855，其中作者给出了青龙的依赖目录：

- /root/.local/share/pnpm/global
- /usr/local/lib/python3.10/site-packages
- /var/cache/apk

应该分别对应的是 NodeJS、Python 和 Linux 的依赖，那就修改下 docker compose 文件将这三个目录挂载到宿主机上，然后重启容器即可。

```yaml
services:
  web:
    image: whyour/qinglong:latest
    volumes:
      - ./data:/ql/data
      # 增加以下映射
      - ./pnpm-global:/root/.local/share/pnpm/global
      - ./python-packages:/usr/local/lib/python3.10/site-packages
      - ./apk:/var/cache/apk
    ports:
      - "0.0.0.0:5700:5700"
    environment:
      - PUID=1000
      - PGID=10
      - TZ=Asia/Shanghai
    restart: unless-stopped
```

配置修改完后记得重启青龙测试一下，如果重启后到依赖管理页面检查依赖和重启前保持一致即代表配置成功。

## 结语

拖延症真可怕，说起来这问题也挺久了，不过一直拖着没处理，搞得我 NAS 每次升级我都不敢点。😂

## 引用

- 重启依赖丢失的相关 issue：https://github.com/whyour/qinglong/issues/1855