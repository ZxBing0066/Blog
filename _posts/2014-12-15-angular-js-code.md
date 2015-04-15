---
layout: post
title: "angular.js 源码 1"
date: 2014-12-15 15:25:00
author: ZxBing0066
blogid: 20141215001
categories: js-framework angular-js
tags: angularjs 扒源码攒姿势
---


{% highlight javascript %}
/**
 * documentMode is an IE-only property
 * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
 */
msie = document.documentMode;
{% endhighlight %}

>`documentMode`是一个IE的特有属性,官方文档显示当页面渲染未完成时可能返回值会为0

5 Internet Explorer 5 mode (also known as "quirks mode").

7 Internet Explorer 7 Standards mode.

8 Internet Explorer 8 Standards mode.

9 Internet Explorer 9 Standards mode.

10 Internet Explorer 10 Standards mode.