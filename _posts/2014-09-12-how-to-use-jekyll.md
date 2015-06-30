---
layout: post
title: "Jekyll on Windows安装"
date: 2014-9-12 22:02:12
author: ZxBing0066
blogid: 20140912001
categories: jekyll
tags: github jekyll blog
---

> `jekyll`是一个简单的静态页面生成工具,主要用于搭建静态简易`Blog`

## 安装ruby

[ruby下载地址](http://rubyinstaller.org/downloads/) (注意勾选 `Add Ruby executables to your PATH` 将Ruby添加到环境变量)

## 安装Ruby DevKit

[Ruby DevKit下载地址](http://rubyinstaller.org/downloads/)

执行后解压到 `C:\RubyDevKit\` (建议)

```bash
cd C:\RubyDevKit
ruby dk.rb init
ruby dk.rb install
```

## 安装Jekyll Gem

```bash
gem install jekyll
```

如果出现连接错误请修改`gem`源,万恶的`XXX`,具体可看[ruby.taobao](http://ruby.taobao.org/)

```bash
gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/
```

## 安装python

[python下载地址](https://www.python.org/download/releases/2.7.8/) (同样记得勾选添加环境变量,不然就手动添加吧)

## 代码高亮

`jekyll`默认使用的`markdown`引擎的代码块高亮写法比较蛋疼,可以改为`GFM`方式解析,在`_config.yml`中添加配置.

```xml
kramdown
    input: GFM
```

然后添加上`highlight.js`之类的高亮库就可以脱离蛋疼的代码高亮写法使用`GFM`方式来编写了

参考文档:

* [Jekyll on Windows英文教程](http://jekyll-windows.juthilo.com/ "Jekyll on Windows")