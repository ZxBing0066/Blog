---
layout: post
title: "Jekyll on Windows安装"
date: 2014-9-12 22:02:12
categories: github
tags: github jekyll
---
[Jekyll on Windows英文教程](http://jekyll-windows.juthilo.com/ "Jekyll on Windows")

## 安装Jekyll ##

* 安装ruby [ruby下载地址](http://rubyinstaller.org/downloads/) (注意勾选 `Add Ruby executables to your PATH` 将Ruby添加到环境变量)

* 安装Ruby DevKit [Ruby DevKit下载地址](http://rubyinstaller.org/downloads/) 到 `C:\RubyDevKit\` (建议)

<pre class="prettyprint linenums Lang-bash">
cd C:\RubyDevKit
ruby dk.rb init
ruby dk.rb install
C:\GitHub> cd C:\RubyDevKit
C:\RubyDevKit> ruby dk.rb init
[INFO] found RubyInstaller v2.0.0 at C:/Ruby200-x64
Initialization complete! Please review and modify the auto-generated
'config.yml' file to ensure it contains the root directories to all
of the installed Rubies you want enhanced by the DevKit.
C:\RubyDevKit> ruby dk.rb install
[INFO] Updating convenience notice gem override for 'C:/Ruby200-x64'
[INFO] Installing 'C:/Ruby200-x64/lib/ruby/site_ruby/devkit.rb'
</pre>

* 安装Jekyll Gem

<pre class="prettyprint Lang-bash">
gem install jekyll
</pre>

* 安装python [python下载地址](https://www.python.org/download/releases/2.7.8/)

* 设置python环境变量