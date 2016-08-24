---
layout: post
title: "Proxy--Shadowsocks搭建"
date: 2014-12-6 12:10:23
author: ZxBing0066
blogid: 2014120601
categories: proxy
tags: shadowsocks ss proxy 翻墙
---

{% include proxy_tips.html %}

> 这两天疯狂的找翻X工具,各种插件、VPN等,最终决定搭个shadowsocks.(主要是朋友搞了半年的免费`Microsoft Azure`帐号)

## 搭建环境

`Microsoft Azure`平台上的`Ubuntu Server 14.10`虚拟机

## 安装`nodejs`环境

由于使用的是`shadowsocks-nodejs`,所以首先当然是要安装`nodejs`环境啦.

使用`apt-get`安装:

```bash
$ sudo apt-get install nodejs
```

或自己下载源码安装:

```bash
$ wget http://nodejs.org/dist/vXXX/node-vXXX.tar.gz
$ tar xf node-vXXX.tar.gz
$ cd node-vXXX/
$ ./configure
$ make -j2 && sudo make install
```

安装`npm`模块管理器:

```bash
$ sudo apt-get install npm
```

## 安装`shadowsocks`

使用`npm`安装:

```bash
$ npm install shadowsocks
$ cd node_modules/shadowsocks
```

使用`git`下载源码(请先安装`git`哦):

```bash
$ git clone git://github.com/clowwindy/shadowsocks-nodejs.git
$ cd shadowsocks-nodejs
```

## 配置`config`文件

使用`vim`或其它编辑工具修改`cnfig.json`文件:

```bash
{
    "server":"my_server_ip", //服务器地址
    "server_port":8388, //服务器接口
    "local_port":1080, //本地接口
    "password":"barfoo!", //密码
    "timeout":600, //超时时常
    "method":"table" //加密方式
}
```

然后遇到一个奇葩问题,将`server`设置为公网地址时不知道为什么会报错,所以之后改为了`0.0.0.0`才搞定了.

在`Azure`中端口需要自己添加,有些其他的云平台应该也是,所以需要注意端口问题

## 启动`shadowsocks`

使用`nodejs`启动`shadowsocks`:

```bash
$ nohup node bin/ssserver &
```

若是没有问题,OK,基本可以算是大功告成,可以进入下一步了~
也可以将`shadowsocks`加入到开机自启,没咋玩`linux`,也就没高兴研究~


## 本地客户端,准备开始翻X吧

客户端可选择使用刚刚`clone`的`shadowsocks-nodejs`,也可使用其它的客户端

[其它客户端下载地址:http://shadowsocks.cn/clients.html](http://shadowsocks.cn/clients.html)

`shadowsocks-gui for Windows`:
下载完毕后解压直接打开如图,然后输入你的服务器公网地址、端口号、密码以及本地端口号即可.

![gui](http://zxspace.qiniudn.com/blog/2014-12-6-img-0.png)

`shadowsocks-nodejs client`:
下载还是和上面的`git`下载`shadowsocks`一样:

```bash
$ npm install shadowsocks
$ cd node_modules/shadowsocks
```

然后修改`cnfig`文件,一样同上

最后启动客户端:

```bash
$ node bin/sslocal
```

## 配置`PAC File`

右键`shadowsocks-gui`小图标,选择`Edit PAC File`然后会看到一段`javascript`代码(应该是...),然后就把你想要代理的网站添加到上面的列表里吧,比如`,"google.com":1`

`nodejs`客户端没找到这功能在哪~(基本用的`gui`,懒得找,嘿嘿)

## 总结

`shadowsocks`总体来说还是比较容易搭建的,效果也很不错,速度嗖嗖的,不过不知道为什么感觉不稳定,偶尔会连不上,而且客户端隔一段时间需要重启一下才能正常~也不知道是不是由于我自己机器网络不太稳定的缘故,反正玩玩还是很好的~


[shadowsocks github地址](https://github.com/clowwindy/shadowsocks)


## Trouble Shooting

使用`zsh`时需注意使用`nohup node bin/ssserver &`然后`exit`退出时zsh会检测当前的`jobs`然后将其退出,所以使用`zsh`启动需要注意`disown`一下,具体的有三种方式(!和|好像是zsh特有的方式):

```bash
$ nohup node bin/ssserver &!
$ nohup node bin/ssserver &|
$ nohup node bin/ssserver & disown
```

[stackoverflow 地址](http://stackoverflow.com/questions/19302913/exit-zsh-but-leave-running-jobs-open)

`centos`默认防火墙可能会导致端口无法访问,可以修改`iptables`规则,或者直接清除规则,清除使用`iptables -F`,然后`iptables -A INPUT -p tcp --dport 8388 -j ACCEPT`添加端口到`iptables`

[issuse 地址](https://github.com/shadowsocks/shadowsocks/issues/133)