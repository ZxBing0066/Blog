---
title: 微信在线相册制作 - 微信篇
description: 2015 年 1 月,微信放出了JS-SDK,提供了多类 API 接口,方便了开发,然而也带来了无数的坑,Android新版的微信中的webview都被疼讯换成了X5内核,一大波坑袭来...
pubDate: '2015-06-30'
tags:
    - 微信
---

> 2015 年 1 月,微信放出了`JS-SDK`,提供了多类 API 接口,方便了开发,然而也带来了无数的坑,`Android`新版的微信中的`webview`都被疼讯换成了`X5`内核,一大波坑袭来...

## wx.ready

除了`wx.config`,几乎其它所有的调用`微信SDK`的方法都需要放在`wx.ready`中才行,不然就会出现偶尔失效的问题...我就被坑了,只怪自己看文档不够细心...

## wx.chooseImage

`微信SDK`提供的选择图片有几个问题:

-   不能设置选择几张图片

-   默认是被压缩的图片,无法程序控制

所以最后使用浏览器的`File`来解决了

> `微信SDK`提供的`API`其实总的来说质量还是不错的,但是把内核改成`X5`就是坑爹到极致了,虽然不知道有些坑安卓的`原生webkit`中是否存在,但是`X5`是真的存在的,坑到极致.

## css 冲突

`tranform`和`mask`同时作用是,`mask`属性就直接失效了.

## dom 属性获取错误

改变`Dom`之后获取属性时常会遇到取值不正确的现象,不知道是不是渲染与脚本线程并行产生的问题,比如新增一个子`dom`后获取父`dom`的宽度,常常出现值没有变化的现象,坑爹的只能使用`setTimeout`延迟脚本执行

> 现在碎片化这么严重,微信居然又插一脚,o(︶︿︶)o 唉..