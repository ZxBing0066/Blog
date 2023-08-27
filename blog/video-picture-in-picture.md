---
tags: []
summary: 浏览器的视频画中画特性有几年了，最近又增加了文档画中画，顺便复习下视频画中画。
attractor-title: 浏览器视频画中画（Picture In Picture），一篇就够
---

# 视频画中画

> 记得小时候家里买了一台我觉得非常帅气的电视机，因为那台电视机支持画中画功能，就是在屏幕的角落里可以显示另外一个独立的画面，这样就可以在等待广告的时候将频道放到小窗口，然后大窗口去调别的节目光看，大大提高了观看体验。

视频画中画允许用户将某一个视频悬浮在桌面播放，而不会影响到用户浏览其它的网站或程序。浏览器的视屏画中画功能推出已有一段时日，近期又推出了文档画中画功能，乘此机会先复习下视频画中画。

![](https://stg.heyfe.org/images/blog-video-picture-in-picture-1692800866314.png)

## API 介绍

首先看看浏览器提供的相关的 `API`。

### requestPictureInPicture 和 exitPictureInPicture

`requestPictureInPicture` 是 `video` 元素的方法，当我们想要让某个 `video` 元素进入画中画模式时即可调用该元素的 `requestPictureInPicture` 方法。`requestPictureInPicture` 返回值是一个 `pictureInPictureWindow` 的 `Promise`，`pictureInPictureWindow` 则包含了 `height`、`width` 和 `onresize` 三个属性。可以看出它支持 `onresize` 事件，在用户调整悬浮窗口时会触发。

而 `exitPictureInPicture` 则是 `document` 的方法，与全屏的 `API` 同样的设计，估计是因为全局只能存在一个画中画窗口。`exitPictureInPicture` 也同样是一个 `Promise`，不过 `resolve` 时并没有值。

### pictureInPictureEnabled 和 pictureInPictureElement

`document.pictureInPictureEnabled` 用于检测浏览器是否允许使用画中画功能，也可以用来判断浏览器支不支持。在默认情况下浏览器是启用画中画的，但是还在试验中的 `Permissions-Policy` 功能可以让站点控制相应的权限开关。

`document.pictureInPictureElement` 则是当前处于画中画状态的元素 `DOM`，可用于判断当前是否已开启画中画。

### enterpictureinpicture 和 leavepictureinpicture

`enterpictureinpicture` 和 `leavepictureinpicture` 是画中画进入和退出的事件，支持冒泡可以直接在 `document` 上监听来获取页面中的画中画状态。

### disablePictureInPicture

`disablePictureInPicture` 则是 `video` 的属性，当为 `true` 时对应的 `video` 则无法进入画中画状态。使用 `requestPictureInPicture` 会报错：`Failed to execute 'requestPictureInPicture' on 'HTMLVideoElement': "disablePictureInPicture" attribute is present.` 自带的切换按钮也会变为禁用或是隐藏。

![](https://stg.heyfe.org/images/blog-video-picture-in-picture-1693138474793.png)

## Demo

下面是一个简易的使用按钮来切换画中画模式的 `DEMO`：

![](https://stg.heyfe.org/images/blog-video-picture-in-picture-1692973372531.png)

```html
<div class="container">
    <video src="./demo1.mp4" id="video" autoplay loop muted controls></video>
    <button id="toggle-button">Toggle Picture In Picture</button>
</div>
<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        height: 200vh;
    }

    video {
        margin: 0 auto;
        display: block;
    }
</style>
```

```js
const button = document.getElementById('toggle-button');
const video = document.getElementById('video');

function onEnterPip(e) {
    console.log('Picture-in-Picture mode activated!', e);
}
function onLeavePip(e) {
    console.log('Picture-in-Picture mode deactivated!', e);
}

document.addEventListener('enterpictureinpicture', onEnterPip);
document.addEventListener('leavepictureinpicture', onLeavePip);

async function enterPictureInPicture() {
    const pictureInPictureWindow = await video.requestPictureInPicture();
    console.log(pictureInPictureWindow);
    function onPipWindowResize(e) {
        console.log(e, pictureInPictureWindow);
    }
    pictureInPictureWindow.addEventListener('resize', onPipWindowResize);
}

function togglePictureInPicture() {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else {
        enterPictureInPicture();
    }
}

button.onclick = togglePictureInPicture;
```

## 应用场景

画中画最大的优势就是可以让用户在观看视频时依旧可以操纵电脑进行其它操作，所以场景也比较明确，常见的比如：

-   在在线学习网站中让用户可以一边看视频一边查资料、记笔记
-   在视频会议时，避免其它操作导致视频被遮挡
-   在娱乐视频网站中，让用户可以一边查看当前视频，一边寻找其它视频

上述场景在移动端很多 `APP` 中都已经被使用。

## 细节探究

下面来探究下在使用画中画功能时的细节问题。

### 切换方式

首先是进入画中画状态的几种切换方式。

除了上述通过编程调用 `API` 的方式外，我们还可以通过 `video` 的菜单中的画中画功能来切换：

![](https://stg.heyfe.org/images/blog-video-picture-in-picture-1692974077240.png)

当该视频已经进入画中画状态时会变成退出：

![](https://stg.heyfe.org/images/blog-video-picture-in-picture-1692974130347.png)

在视频的右键菜单中同样可以切换：

![](https://stg.heyfe.org/images/blog-video-picture-in-picture-1692974241330.png)

在画中画窗口可以通过返回和关闭退出画中画模式：

![](https://stg.heyfe.org/images/blog-video-picture-in-picture-1692974314836.png)

当然，这些支持都取决于浏览器。

### 状态提示

此外浏览器还会标识出当前画中画所在的 `tab`。（视浏览器而定）

![](https://stg.heyfe.org/images/blog-video-picture-in-picture-1692974436413.png)

### 权限

然后是关于进入画中画模式的权限问题，如果遇到以下报错，则代表你在浏览器不允许的情况下调用了 `requestPictureInPicture`：

> DOMException: Failed to execute 'requestPictureInPicture' on 'HTMLVideoElement': Must be handling a user gesture if there isn't already an element in Picture-in-Picture.

因为安全的问题，浏览器只允许在用户的主动触发下调用 `requestPictureInPicture`，判定逻辑与之前提到的 `Web Speech API` 以及 `window.open` 等逻辑一致，**只有在用户主动进行了点击或键盘（目前了解的就这两种，移动端触摸与电脑端等价）操作后的一小段时间内调用该 `API` 才是允许的**。

不过在画中画场景有个例外，就是当前如果已经存在画中画窗口（无论是哪个页面的），那么都可以随时调用 `requestPictureInPicture`，比如一个视频网站如果用户已经开启了画中画窗口，那么就可以做到一边下滚一边更换画中画的视频而不会报错。但要注意，这里**仅限于存在的画中画窗口与网站处于同一个用户下的情况**，比如如果你的 `Chrome` 有两个用户，一个用户开启了画中画窗口，另一个用户的网站是无法直接替换画中画视频的。

### 重复 request

如果重复请求进入画中画，那么新的视频将会替换旧的视频。也就是说，**每个浏览器只会存在一个画中画视频**，无论是多个用户还是隐身窗口。

### 无效 exitPictureInPicture

当当前窗口不存在画中画视频是调用 `exitPictureInPicture` 会报错。

> DOMException: Failed to execute 'exitPictureInPicture' on 'Document': There is no Picture-in-Picture element in this document.

### 启用画中画状态下设置 disablePictureInPicture

然后是如果当前的 `video` 已经处于画中画的状态为其设置 `disablePictureInPicture` 会发生什么？尝试了一下浏览器已经会保持该视频当前的画中画状态。

![](https://stg.heyfe.org/images/blog-video-picture-in-picture-1693138328788.png)

### 移动端

画中画在移动端的行为基本一致，唯一的差异是**所有浏览器共享一个画中画视频额度**。

## 最后

-   文章的在线 `DEMO` 地址：https://playground.heyfe.org/picture-in-picture/video.html
-   `DEMO` 的源码地址：https://github.com/ZxBing0066/playground-public/tree/master/websites/picture-in-picture
