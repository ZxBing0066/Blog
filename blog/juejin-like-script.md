# 脚本水掘金，转眼到先锋 - 助力掘金新等级

> 前排提示：轻撸怡情、小撸开心、强撸停不下来

> 太长不看的直接点击：[掘金一键点赞](https://greasyfork.org/en/scripts/447739-%E6%8E%98%E9%87%91%E4%B8%80%E9%94%AE%E7%82%B9%E8%B5%9E) 安装脚本

今早打开掘金一看，好家伙，全是在刷等级的。果然成就、等级才是人类永恒的动力。

## 等级积分获取

新等级除了每日发文、发沸点得分较高外，能持续获取分数的就是互相点赞了。

![level](https://stg.heyfe.org/images/blog-juejin-like-script-68.png)

## 脚本助力

看到一群掘友在沸点互赞的场景，作为一个前端，怎么可以自己动手呢，当然是写个脚本了。

### 初级

先试试点进某 JY 的沸点列表，然后直接给所有按钮来个马杀鸡。

```js
document.querySelectorAll('.like-action:not(.active)')?.forEach(node => node.click());
```

### 中级

然而某些 JY 实在太能水了，沸点一批批，一边滚一边点，害、麻烦，还是自动滚动吧。

```js
const clickLike = () => {
    const btns = document.querySelectorAll('.like-action:not(.active)');
    if (btns?.length) btns.forEach(node => node.click());
    scrollTo(0, document.body.offsetHeight);
};
setInterval(clickLike, 1000);
```

### 高级

写个油猴脚本吧，不然老是要点开 console 面板复制代码。

```js
// ==UserScript==
// @name         掘金一键点赞
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://juejin.cn/user/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=juejin.cn
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let latestOffsetHeight = document.body.offsetHeight;
    let counter = 0;
    const sleep = t => new Promise(resolve => setTimeout(resolve, t));
    const clickLike = async () => {
        const btns = document.querySelectorAll('.like-action:not(.active)');
        if (btns?.length) btns.forEach(node => node.click());
        scrollTo(0, document.body.offsetHeight);
        await sleep(500);
        if (document.body.offsetHeight === latestOffsetHeight) {
            counter++;
        } else {
            counter = 0;
        }
        latestOffsetHeight = document.body.offsetHeight;
        if (counter < 3) await clickLike();
    };
    const handleClick = async () => {
        btn.disabled = true;
        btn.innerText = '点赞中...';
        await clickLike();
        btn.disabled = false;
        btn.innerText = '已完成';
    };
    const btn = document.createElement('button');
    btn.innerText = '一键点赞';
    btn.className = 'btn';
    btn.style = 'position: fixed;left: 0;bottom: 10%;';
    btn.addEventListener('click', handleClick);
    document.body.appendChild(btn);
})();
```

添加后会在掘金用户页面左下角显示一键点赞按钮，点击后会自动滚动窗口并进行点赞，顺便给按钮加了几个状态。

好了，可以拿脚本去互刷了。

不过小心账号被风控哦。🐶 保命。

脚本安装地址：[掘金一键点赞](https://greasyfork.org/en/scripts/447739-%E6%8E%98%E9%87%91%E4%B8%80%E9%94%AE%E7%82%B9%E8%B5%9E) 安装脚本

有一点小问题，为了避免在其它页面显示按钮影响阅读，所以匹配的是 user 的路由，如果从其它页面跳进 user 页面会导致按钮无法显示，需要刷新下。有空再改、下次一定。
