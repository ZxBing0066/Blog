---
lastUpdate: 2023-3-19
date: 2023-3-19
tags: ['瞎折腾', '青龙', 'Docker']
summary: 青龙是一个 `定时任务管理面板` 的开源项目，我们可以使用它来实现一些自动化的任务管理，比如自动签到等等。
cover: https://stg.heyfe.org/images/blog-qinglong-install-1740152682200.png
---

# 青龙面板 - 介绍与安装

[青龙](https://github.com/whyour/qinglong)是一个 `定时任务管理面板` 的开源项目，我们可以使用它来实现一些自动化的任务管理，比如自动签到等等。

## 安装

此处推荐使用 docker-compose 进行安装。因此我们需要提前安装好 docker 和 docker-compose。

青龙安装非常简单，我们只需要创建目录，然后下载官方提供的 compose 模版即可：

```bash
mkdir qinglong
wget https://raw.githubusercontent.com/whyour/qinglong/master/docker/docker-compose.yml
```

然后通过 docket-compose up 直接启动：

```bash
docker-compose up -d
```

compose 模版中内容也很简单：

```yml
version: '2'
services:
    web:
        image: whyour/qinglong:latest
        volumes:
            - ./data:/ql/data
        ports:
            - '0.0.0.0:5700:5700'
        restart: unless-stopped
```

只是定义了镜像名称以及端口映射关系。

## 配置

安装后我们可以打开 `http://localhost:5700` 访问面板页面：

![picture 1](https://stg.heyfe.org/images/blog-qinglong-6.png)

此时会提示进行初始化，然后可以设置通知方式，以及账户密码等：

![picture 2](https://stg.heyfe.org/images/blog-qinglong-61.png)

此处如果使用的是 iPhone 可尝试使用 pushDeer，使用上手较为简单。其它的服务可能有一定技术门槛或一定使用限制。

设置完成后进行登陆会进入面板管理页面。

![picture 3](https://stg.heyfe.org/images/blog-qinglong-7.png)

## 功能

青龙面板的功能较为丰富，主要功能包括以下几块：

-   定时任务
-   订阅管理
-   环境变量
-   配置文件
-   脚本管理
-   依赖管理
-   日志管理
-   对比工具
-   系统设置

平时只需要关注以下几块：

-   脚本管理 - 编写上传我们的定时任务脚本
-   定时任务 - 定义定时任务来运行脚本
-   依赖管理 - 青龙面板中的任务脚本都是单文件，如果脚本使用到了一些模块包，就需要在此处进行依赖安装
-   环境变量 - 一般脚本为了安全或方便等，会将 token 等使用环境变量进行管理

## 最后

好了，先说这么多，后面写个 demo 脚本再顺便深入一下面板具体的使用。

## 参考链接

-   https://github.com/whyour/qinglong
