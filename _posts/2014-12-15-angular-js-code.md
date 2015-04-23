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

`lowercase`,`uppercase`：小写大写
`manualLowercase`,`manualUppercase`: 手动小写大写化

{% highlight javascript %}
// String#toLowerCase and String#toUpperCase don't produce correct results in browsers with Turkish locale
{% endhighlight %}

土耳其语言环境的浏览器下有问题?不明觉厉

`isArrayLike`: 判断是否是类数组对象(NodeList, Arguments, String等)

`forEach`: 遍历函数 类数组 对象等

`forEachSorted`: 将对象的`key`排序后进行遍历

`reverseParams`: 反转传入的参数

`nextUid`: 获取`uid`

`setHashKey`: 设置或清除一个对象的`hash`

`baseExtend`: 继承属性,传入deep可深入继承

`extend`: 继承,无法深度继承

`merge`: 深度继承

`toInt`: 取整数

`inherit`: 继承

`noop`: 空函数

用途:
{% highlight javascript %}
function foo(callback) {
	var result = calculateResult();
	(callback || angular.noop)(result);
}
{% endhighlight %}

疑点:
{% highlight javascript %}
noop.$inject = []; //这是干嘛的
{% endhighlight %}

`identity`: 返回传入的第一个参数...

用途:
{% highlight javascript %}
function transformer(transformationFn, value) {
	return (transformationFn || angular.identity)(value);
};
// (好奇葩..脑子不够用了,咋感觉还不如下面的语义化点)
function transformer(transformationFn, value) {
	return transformationFn ? transformationFn(value) : value;
};
{% endhighlight %}

疑点:同上

`valueFn`: 返回取值函数(妈蛋,这些奇葩函数真的有用吗...)

判断类型函数: `isUndefined`, `isDefined`, `isObject`, `isString`, `isNumber`, `isDate`, `isArray`, `isFunction`, `isRegExp`, `isWindow`, `isScope`, `isFile`, `isFormData`, `isBlob`, `isBoolean`, `isPromiseLike`, 'isTypedArray', `isElement`

`TypedArray`: `TypedArray`是一种通用的固定长度缓冲区类型，允许读取缓冲区中的二进制数据。

`trim`: 去左右空格

`escapeForRegexp`: 使用正则来转义特殊字符

`makeMap`: 将字符串转换为`Map`

`nodeName_`: 获取元素名称(小写)

`includes`: 判断是否包含在数组里

`arrayRemove`: 删除数组中的某个元素(值等匹配)

`copy`: 拷贝对象(不能`copy` `window`对象)