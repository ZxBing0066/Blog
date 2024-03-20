---
lastUpdate: 2022-9-5
date: 2022-9-5
tags: ['JavaScript', 'WebAPI']
---

# 十数行代码为你的网站添加语音小助手

前面一篇文章有讲到通过 `Web Speech API` 来朗诵诗歌，写了个诗歌朗诵的小网站。

而 `Web Speech API` 除了语音输出外，还支持语音识别，你可以通过 `Web Speech API` 收集用户的语音指令，为你的网站添加一些有趣的功能：比如在小说阅读网站上添加语音指令，让你可以语音控制翻书、下一章等，让你可以更方便的一边看小说一边吃薯片。🐶

先上下写的 `DEMO` 页面地址，配合页面实用文章更佳：https://speech-recognition.heyfe.org。

## 十数行代码添加语音小助手

只需要如下十数行代码，即可为你的网站添加一个语音小助手，让你可以语音控制页面的刷新、后退、首页等。

```js
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'zh-CN';
const commands = {
    刷新: () => location.reload(),
    后退: () => history.back(),
    首页: () => history.pushState(null, '/')
};
recognition.onresult = event => {
    const l = event.results.length;
    const result = event.results[l - 1][0].transcript.replaceAll(/[.,，。：？?!！:]/g, ' ').trim();
    commands[result]?.();
};
recognition.start();
```

下面一起看看这短短的代码的含义。

## 简单语音识别

语音识别主要涉及到的 `API` 为 `SpeechRecognition` - 语音识别，通过 `SpeechRecognition` 可以借助浏览器调用操作系统原生的语音识别。

使用首先要注意该 `API` 兼容欠佳，截至目前为止 `chrome` 仍然需要通过前缀 `API` `webkitSpeechRecognition` 来调用，而在 `iOS` 端需要使用 `Safari` 才可生效，`Android` 端小米测试 `chrome` 无法调用。

还需要注意电脑是否有麦克风，网站是否已授予麦克风权限等。

下面先看下最简单的使用方法：

```ts
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
```

首先直接实例化一个 `SpeechRecognition` 对象。

```ts
recognition.continuous = false;
recognition.lang = 'zh-CN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
```

实例的属性通过直接修改来生效，主要包含以下几个属性：

-   `lang`：设置语音识别的语言，如美式英语 `en-US`、中文简体 `zh-CN` 等，注意默认为当前网页的语言
-   `continuous`：决定返回的结果是否为连续的，默认为非连续的。语音识别会按照用户的语音停顿将文字分断返回，如果设置返回结果为连续的那后面的返回结果会在前面的结果数组中进行追加。
-   `interimResults`：设置是否支持返回临时判定结果？文档描述有些不太清楚，测试也未测试出有什么效果。猜测是设置为 `true` 后可以支持一边说话一边实时返回？
-   `maxAlternatives`：设置每个识别结果中的最多可选数量，默认为 1。即语音识别会识别出几个语句，供开发者选择。
-   `grammars`：用于设置语音识别系统可以理解的语法。（猜测为限制语音识别的内容为限定的词法，目前测试没实验出效果）

此外实例还包含三个方法：

-   `start`：开始语音识别
-   `stop`：停止语音识别，并且返回目前为止收集到的所有的语音识别内容
-   `abort`：停止语音识别，但是没有返回值

按照自己的需求设置属性后，即可调用 `start` 来启动语音识别，此时浏览器会申请麦克风权限：

```ts
recognition.start();
```

权限确定后设备麦克风会被启用，此时对麦克风说话，将会触发语音识别实例的 `result` 事件，所以需要添加事件监听器，可通过 `onevent` 属性或 `addEventListener` 添加：

```js
recognition.onresult = event => {
    const l = event.results.length;
    console.log('results:', event.results);

    const result = event.results[l - 1];
    console.log('result:', result);
};
```

识别会按照用户语音断句返回，每次停顿后会调用 `result` 返回本次识别的结果。

注意，事件中的 `results` 为伪数组，如果 `continuous` 为 `true` 时，本次语音识别的每次内容将会追加到伪数组，如果 `continuous` 为 `false`，则 `results` 数组只包含最新的一项。

通过 `length` 取得最新的 `result` 后，`result` 中的内容依旧是伪数组，其中元素数据结构如下：

```ts
{
    confidence: number;
    transcript: string;
}
```

`confidence` 为该条判定的准确率，`transcript` 为猜测的识别内容。`result` 中的判定数量会按照 `maxAlternatives` 改变。

通过上面几段的代码，一个简单的语音识别网站就诞生了，可以到 https://speech-recognition.heyfe.org 进行体验。

## 扩展

除了上述的 `result` 事件外，`SpeechRecognition` 还包含了以下事件：

-   `audiostart`、`audioend`
-   `start`、`end`
-   `error`
-   `nomatch`
-   `soundstart`、`soundend`
-   `speechstart`、`speechend`

本文不做过多深入，有兴趣的可自行了解或关注下我后续会进行更新。

## 踩坑

这里要注意 `continuous`，在 `iOS` 端 `Safari` 测试发现该参数第一句话还有效，但是从第二句话开始，后面的结果又变为连续的。

原来准备写个对话的小机器人来做演示的，但是由于之前一篇文章中提到的关于浏览器对 `speak` 的限制，导致机器人无法自动发出语音，所以放弃了 🤦‍♂️。

## 总结

由于兼容问题，`SpeechRecognition` 很难在业务上广泛的去应用，不过在个人玩具项目中，可以使用它来给自己的项目添加几分特色（bigger）。
