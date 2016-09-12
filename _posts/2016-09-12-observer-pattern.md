---
layout: post
title: "观察者模式 发布/订阅模式"
date: 2016-09-12 5:53:02
author: ZxBing0066
blogid: 2016091201
categories: design-patterns
tags: design-patterns
---

### 介绍

观察者模式指一个主题对象维护了一个依赖他的观察者对象的列表,能够在状态变化时自动的通知到这些观察者的一种设计模式.

当状态变化主题对象需要通知观察者时,他会给观察者发送一个广播.当观察者不再需要关注这个主题对象的状态变化时,可以直接从观察者列表中去除.

观察者模式大家其实都早有涉及,浏览器的事件机制其实就是观察者模式.

### 代码示例

<iframe style="padding: 20px 0;" width="100%" height="400" src="//jsfiddle.net/ZxBing0066/2oeg4oqm/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 代码解析

上面是`javascript设计模式`一书中关于观察者模式的例子,`ObserverList`为观察者列表,其中包含了`add`,`count`,`get`,`remove`等一系列函数.`Subject`为主题对象,包含了添加删除观察者和发布事件等函数,`Observer`就是观察者了,点击`addNewObserver`按钮时,将会创建一个新的`checkbox`和一个新的观察者对象,并且将两者绑定,然后将观察者添加到主题对象的观察者列表中.`controlCheckbox`点击时将会将它的`check`状态发送给列表中的所有观察者,观察者则会将自己绑定的`checkbox`设置为`controlCheckbox`的`check`状态,一个简单的全选功能就完成了.

### 优势

  * 让代码解耦从而利于管理和方便重用
  * 主题对象和观察者之间的动态的关系使得代码可以更灵活

### 缺点

  * 主题对象出错的话观察者没办法知道
  * 主题对象会盲目的发送事件给所有的观察者
  * 动态的依赖关系导致升级时无法被追踪

### 注意事项

使用观察者模式可能会导致内存泄露,比如在一个单页应用中的一个页面有一个观察者,如果这个页面退出时没有将这个观察者取消观察,就会导致这块的内存泄露.所以需要在退出页面时必须取消观察.

### 观察者模式和发布/订阅模式

`javascript`设计模式一书中认为这两种模式是不同的,很多网上的文章也认为两者之间存在着差异,不过个人感觉其实就是同一种思想,设计模式思想相同代码存在少量差异也不能说就变成两种模式了吧.

<iframe width="100%" height="300" src="//jsfiddle.net/ZxBing0066/wqz4noow/2/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

上面我自己写的一个发布/订阅模式的小例子,并不觉得和观察者模式有任何的区别...

### 参考文献

[Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)