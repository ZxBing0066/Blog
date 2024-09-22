---
lastUpdate: 2023-7-31
date: 2022-4-24
tags: [安全, Troubleshooter]
---

# 深究 :visited 伪类和隐私安全那点事

好久前码代码时，想将网页上已阅读的链接做些特殊的样式处理，然而发现很多事情做不了，当时做了下笔记，这里整理下。

## 现象

a 标签的 :visited 伪类用于指定被访问过的链接的样式，一般我们会针对 :visited 设定标签的字色、背景色等。尝试过的可能知道，针对其设定高度、字号等都无法生效。可能你会觉得哪里写错了（我一开始就是这么以为的），但不用怀疑，不是你的锅，而是浏览器限制了伪类的功能。

可尝试以下代码：

```html
<a class="lure-link" href="https://github.com"></a>
<style>
    .lure-link {
        color: green;
        line-height: 20px;
    }
    .lure-link:visited {
        color: red;
        line-height: 30px;
    }
</style>
```

会发现链接颜色变化了，但行高却没变化。

其实并不只是 css 上的限制，连 js 也同样设了限制。

```js
getComputedStyle(document.querySelector('.lure-link')).color;
```

会发现返回的是 green，而不是 red。

![picture 1](https://stg.heyfe.org/images/emot-amazing.png)

好家伙，眼见为虚，不知道的还以为红绿色盲了。

## 原因

为什么 :visited 伪类这么特殊，只能设定很少的部分样式？这主要是出于安全性考虑。

:visited 是一个特殊的伪类，他会给用户展示告诉客户该连接是否访问过，如果访问过，那么它就会按照 :visited 的设定来显示。

那就会造成一定的风险：假设现在有个网站，他隐藏了一个不可见的链接，然后设定该链接的 :visited 样式：

```html
<a class="lure-link" href="https://xxxhub.com"></a>
<style>
    .lure-link {
        display: block;
        width: 0;
        height: 0px;
        visibility: hidden;
    }
    .lure-link:visited {
        height: 1px;
    }
</style>
```

然后呢他悄摸摸的写了段脚本：

```js
const visited = getComputedStyle(document.querySelector('.lure-link')).height === '0px';
report(userId, visited);
```

好家伙，你访问某某 hub 的事情败露了，emm，别人一看，这家伙肯定是个爱学习的仔（别误会，我说 Github）。

![picture 1](https://stg.heyfe.org/images/emot-sbz.jpg)

所以呢浏览器直接把 :visited 的这些样式取消了，那为啥保留了颜色这类样式呢？不是一样会暴露吗？

其实当你使用 js 获取 :visited 链接的颜色时，获取到的是未应用 :visited 规则的样式。

那为啥不对其它非颜色样式做同样的事情，css 生效，但是 js 获取的时候，返回的是未应用 :visited 规则的样式呢？

因为其它大部分样式会影响到别的元素的展示，比如如果高度变化，那它的容器高度就会发生变化，攻击者依旧可以使用别的方法去获取链接的状态，比如父元素的高度或者兄弟元素的偏移位置等。

![picture 2](https://stg.heyfe.org/images/emot-hjh.png)

所以浏览器为了你的隐私考虑，不得不对 :visited 做出诸多限制。毕竟爱学习这种事情，不能随便暴露。

## 具体限制

### CSS 中的限制

-   CSS 中 visited 只能设置如下几个样式：

    -   color
    -   background-color
    -   border-color
    -   outline-color
    -   column-rule-color
    -   text-decoration-color
    -   text-emphasis-color
    -   fill、stroke 相关的颜色

    可以看到，全是颜色值。

    并且上述值不可使用带透明度的颜色，如 transparent、rgba(0,0,0,0.5) 等，透明度都会被忽略。具体原因并没有找到相关文献，网络上有猜测和 `pixel perfect timing attack` 相关，猜测是因为透明度会影响渲染时间（颜色混合），然后攻击者可以通过时间差来猜测是否应用了透明色从而得出链接的状态。

    ![picture 1](https://stg.heyfe.org/images/emot-amazing.png)

    至于为什么要禁止背景图片，因为背景图会发送请求，连 JS 都不用写就直接给你上报上去了。如：

    ```css
    a.xxxhub:visited {
        background-image: url(/log/visited/xxxhub);
    }
    ```

-   并且，使用使用 :visited 做兄弟选择器时是无效的，比如：

    ```css
    a:visited + span {
        color: red;
    }
    ```

    会发现不会生效。

-   而用作父子/后代选择器时，则同样只能生效上述颜色类的样式。

    ```css
    a:visited span {
        color: red;
        font-size: 20px; // 不会生效
    }
    ```

### JS 中的限制

这些限制不仅包括链接元素，也包括使用 visited 伪类做父子/后代选择器应用的样式

-   getComputedStyle 获取的样式不会应用 :visited 规则

    类似上面提到的，看着是红的，浏览器却告诉你，真的绿了。（emm 没别的意思）

-   element.querySelector 时不会应用 :visited 选择器

    为了防止攻击者从获取的元素中获取到 :visited 链接。

## 其它

:visited 相关的漏洞其实是 2010 年才修复的，所以如果你有幸穿越回到 2010 年前，千万记得学习后要清空浏览器缓存记录。

## 相关文档

[Privacy and the :visited selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Privacy_and_the_:visited_selector)
