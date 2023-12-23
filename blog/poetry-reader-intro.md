---
lastUpdate: 2023-7-31
date: 2022-8-21
---
# 为了在掘金水篇文，我写了个诗词朗诵网站 🤦‍♂️

最近参加掘金的更文挑战，着实被榨干 🤦‍♂️，日更实在是太可怕了。为了今天的日更，不得不花了大几十分钟写了个诗词朗诵的网站。前排先放链接：[poetry-reader](https://poetry-reader.heyfe.org/)

先放个动图吧：

![picture 1](https://stg.heyfe.org/images/blog-poetry-reader-intro-45.gif)  


`emm`，不过动图没声音，想要体验的还是去上面的网站去看下吧。

下面介绍下站点用到的一些东西。

## 诗词数据

诗词数据主要来自这个 [chinese-poetry](https://github.com/chinese-poetry/chinese-poetry) 库，其中包含了几十万首唐诗宋词，然而里面主要是静态数据，要直接用在站点要么得搞个服务端、要么得直接把数据都扒下来，然后无意间在[该库的网站](https://shici.store/huajianji/)中找到了关于今日诗词 API 的鸣谢。然后果断使用了[今日诗词](https://www.jinrishici.com/doc/) 的 `API`。

直接通过 `npm install` 安装

```sh
npm -i jinrishici --save
```

然后引入即可：

```ts
import { load, Res } from 'jinrishici';
load(result => {
    poetry.value = result;
});
```

至于官网的示例代码：

```js
const jinrishici = require('jinrishici');
jinrishici.load(result => {
    console.log(result);
});
```

由于使用 `vite3` 改成了 `import`，由于今日诗词 `API` 没有提供 `ts` 描述，所以自己补充了下描述文件。

```ts
declare module 'jinrishici' {
    interface Res {
        status: 'success' | 'error';
        data: {
            id: string;
            content: string;
            popularity: number;
            origin: {
                title: string;
                dynasty: string;
                author: string;
                content: string[];
            };
            matchTags: string[];
            recommendedReason: string;
        };
        token: string;
        ipAddress: string;
        warning: null;
    }

    interface LoadHandler {
        (poetry: Res): void;
    }
    interface Load {
        (handler: LoadHandler): void;
    }
    export const load: Load;
    export { Res };
}
```

## 朗读

朗读直接使用 [`Web Speech API`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)，将诗词通过 `speechSynthesis` 进行播放，也遇到一些问题：

### 无法主动播放音频

就是无法通过脚本主动调用播放的 `API`，比如进入页面后直接播放当前诗歌，会直接报错 `not-allowed`，了解了下大概还是被滥用，导致和弹窗一样被浏览器限制了，必须由用户行为触发才能正常播放。

所以无奈的将进入页面自动播放取消了，改成了点击按钮才能播放。

### 部分浏览器无法播放

调用 `speechSynthesis.speak()` 时，`Safari` 无效果，并且在 `Safari` 下，`getVoices` 列表是空的，在 `stackoverflow` 找到了[对应的提问](https://stackoverflow.com/questions/72027048/speechsynthesis-getvoices-returns-an-empty-array-on-safari)但是却没回答。

由于事件原因没多研究，只能随手加了个报错处理解决了一下。

## 动画

为了避免页面太单调，使用了 [`Web Animations API`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) 快速随手写了个渐入动画。之前一篇文有介绍该系列 `API`：[孤陋寡闻了，才知道已经可以用 `JS` 来控制 `CSS` 动画了](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

由于 `Web Animations API` 可以方便的插入动画，并在动画完成后做处理，写起来非常简单：

```ts
const doAnimate = async (target: keyof typeof selector, index: number = 0) => {
    const dom = document.querySelectorAll(selector[target]);
    const animate = dom[index]?.animate(keyframes, animateOptions);
    await animate.finished;
    (dom[index] as HTMLElement).style.opacity = '1';
};
```

## 开发

开发使用 `vite+ts+vue3` 进行，直接 `pnpm create vite` 快速创建项目，`vite` 虽说现在 `bug` 还是不少，不过做一些小玩具项目体验还是不错。

## 部署

最后部署则是直接使用 `GitHub pages` 进行，通过 `GitHub actions` 在推送后自动构建并部署到 `GitHub pages` 中。然后自定义域名挂在 `cloudflare` 上，可以通过 `cloudflare` 加速访问。

## 开源

源码托管在 `GitHub` 中，有兴趣的同学可以点进去查看：[poetry-reader](https://github.com/ZxBing0066/poetry-reader)

## 缺憾

`Chrome` 中使用的好像是 `google` 的语音助手（`Google` 普通话（中国大陆）），朗诵效果着实不理想。

## 后续

本项目完全是一时兴起，后续可能做的更新：

-   根据诗歌内容，加载对应的背景图
-   试试接入其它 `speech` 引擎
-   使用语音识别，增加用户朗诵对比功能
-   优化动画效果

鉴于本人拖延症晚期，上述一切预期可以当作没看到。手动狗头 🐶，有兴趣的可以提 `PR`。
