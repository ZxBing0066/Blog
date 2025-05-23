---
title: Jekyll on Windows 安装
description: Jekyll 是一个由 GitHub 推出的静态页面生成工具，可以方便的搭建 Blog，本文记录如何在 Windows 中进行 Jekyll 的安装。
pubDate: '2014-09-12'
heroImage: >-
  https://stg.heyfe.org/images/blog-2014-09-12-how-to-use-jekyll-1690763385048.png
tags:
  - GitHub
  - Jekyll
  - blog
---

> `jekyll`是一个简单的静态页面生成工具,主要用于搭建静态简易`Blog`

## 安装 ruby

[ruby 下载地址](http://rubyinstaller.org/downloads/) (注意勾选 `Add Ruby executables to your PATH` 将 Ruby 添加到环境变量)

## 安装 Ruby DevKit

[Ruby DevKit 下载地址](http://rubyinstaller.org/downloads/)

执行后解压到 `C:\RubyDevKit\` (建议)

```bash
cd C:\RubyDevKit
ruby dk.rb init
ruby dk.rb install
```

## 安装 Jekyll Gem

```bash
gem install jekyll
```

如果出现连接错误请修改`gem`源,万恶的`XXX`,具体可看[ruby.taobao](http://ruby.taobao.org/)

```bash
gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/
```

## 安装 python

[python 下载地址](https://www.python.org/download/releases/2.7.8/) (同样记得勾选添加环境变量,不然就手动添加吧)

## 代码高亮

`jekyll`默认使用的`markdown`引擎的代码块高亮写法比较蛋疼,可以改为`GFM`方式解析,在`_config.yml`中添加配置.

```xml
kramdown
    input: GFM
```

然后添加上`highlight.js`之类的高亮库就可以脱离蛋疼的代码高亮写法使用`GFM`方式来编写了

参考文档:

-   [Jekyll on Windows 英文教程](http://jekyll-windows.juthilo.com/ 'Jekyll on Windows')