---
date: 2015-06-29 17:47:00
tags: [微信, 图片上传]
---

# 微信在线相册制作 - 图片篇

> 最近做了个微信上的在线相册的玩意,设计到了无数的坑,就此扯两句...

## 图片选择

图片选择涉及到单选多选的问题,`file`标签的新属性`multiple`,贴上该属性的文档描
述[点这里](http://www.w3schools.com/tags/att_input_multiple.asp).

`PC`上浏览器支持除了`IE`基本没啥问题,但是到移动端,貌似`Android`上还没有支持,无用武之地啊.

还有个问题就是这个属性只能标志单选、多选,不能限制选择数量,也是个问题.

## 图片上传

图片上传主要就是将图片的`file`对象使用`ajax`发送到后台,不过会有一个问题,图片上传一般比较慢,所以肯定会同时上传多张图片,而
浏览器本身存在同域名下的并发连接数限制的问题,一般是 6~10,此时如果有其他请求就会引起阻塞,所以这时需要对图片上传做点处理,
比如一个请求上传多张图片、代码中做限制,将同时上传的图片数设置为较小值、或者将图片服务器域名换成几个等.

## 图片预览

选择图片后基本都需要在本地预览选中的图片,这时就要用到`FileReader`了,主要使用到的是`FileReader`的`readAsDataURL`方法将图
片选择的`File`对象读取为`base64URL`[FileReader 文档](https://developer.mozilla.org/en-US/docs/Web/API/FileReader),然后可
以直接将起嵌入到图片的`src`标签当中就可以成功预览图片了,不过有个问题就是`base64`可能会比较长.

## 图片压缩

`base64`太长,就需要压缩图片了,而且移动端性能瓶颈的问题,图片还是压缩一下的好,压缩主要就是用到`canvas`来实现,使
用`canvas`将`base64`塞进去渲染成对应大小的图片,然后使用`canvas.toDataURL`得到压缩后的`base64`.

可能某些需求会需要将压缩后的图片上传而不是原图片,可以直接将`base64`上传到后台,当然也可以使用`BlobBuilder`或者`Blob`将其
转为`Blob`然后上传.

## 图片方向

拍摄时设备会将拍照时的方向存到图片的`Exif`中的`Orientation`里,而有时某些软件会忽视`Orientation`属性,这是就会出现图片方向
不对的问题,此时需要做一些处理,比如将`Orientation`读取后图片旋转,然后在上传到服务器,或者服务器做处理,一般的图片处理工具都
会处理好这部分功能.

## canvasResize

`canvasResize`是一个简单的图片处理的库,里面封装了图片压缩、旋转等一些基本功能,还有将`base64`转为`Blob`等,依赖于`Exif`库
,`Exif`库里封装了一些对图片`Exif`处理的方法,包括了上文的图片方向解决.

参考的 Blog 和文章有:

-   [http://blog.csdn.net/ouyangtianhan/article/details/29825885](http://blog.csdn.net/ouyangtianhan/article/details/29825885)
-   [https://github.com/xiangpaopao/blog/issues/7](https://github.com/xiangpaopao/blog/issues/7)
