---
date: 2014-12-17 15:29:00
tags: [nodejs]
---

# NodeJS 搭建简易网站

> 朋友让帮忙在他的`Windows Azure`里搭个简单的`nodejs`服务器,好吧,其实真的很无脑,看了就知道.搭建环境是`Ubuntu 14.10`.

## 安装`nodejs`

既然是`nodejs`服务器,第一步当然是安装`nodejs`啦.

```bash
$ sudo apt-get install nodejs
```

然后`Ubuntu`下的`node`命令默认被其它应用占用了,所以需要再装个`nodejs-legacy`.

```bash
$ sudo apt-get install nodejs-legacy
```

## 安装`npm`

`npm`是`nodejs`的模块管理器,安装不多说,就一行命令

```bash
$ sudo apt-get install npm
```

好了,下面就可以使用`npm`来安装模块了

## 安装`express`

`express`是一个`nodejs`的`web`程序框架,使用`npm`安装一下吧(`-g`参数的意思是安装为全局模块,而不是直接安装到当前文件夹下的`node_modules`里,但是可能需要配置环境变量,不想配置直接装到项目文件夹就行)

```bash
$ sudo npm install express -g
```

## 创建文件并启动

在项目文件夹中创建入口文件,然后直接启动

```bash
$ touch app.js
$ vim app.js
```

`app.js`的文件内容如下(代码含义见注释):

```javascript
var express = require('express'); // 引用express模块
var app = express(); // 调用express并获取引用
var APP_PORT = 80; // 服务器端口号

// 当反问路径为/时的处理函数
app.get('/', function (req, res) {
    res.send('hello world');
});

// app监听端口启动
app.listen(APP_PORT);
```

下面直接使用`nodejs`来启动吧

```bash
$ node app.js
```

若是有报错可能需要注意下端口是否被占用,就这么点代码应该没啥别的问题~

然后在浏览器里输入服务器地址+端口号查看吧,OK,一个`hello world`搞定了.

## 静态文件服务器

`express`的静态文件服务器搭建也是很无脑

```javascript
app.use('/static', express.static(__dirname + '/public'));
```

添加一行代码就可以将项目文件夹下的目录下的文件映射为静态文件

比如上面的代码直接输入服务器地址+端口号+/static/+项目文件夹下的/public 中的对应文件名就可访问文件了.

## 打完收工

好了,最简单的就是这么多,下面就随便玩玩吧.

[我的测试地址](http://168.63.150.67:8089/static/index.html)
