---
title: 动动手指几分钟，给微信公众号接入 AI
pubDate: '2025-02-21'
heroImage: >-
    https://stg.heyfe.org/images/blog-wechat-offical-account-ai-bot-coze-1733666307507.png

tags:
    - AI
    - 微信公众号
---

最近看到 Coze（扣子） 智能体可以一键接入各种平台，包括微信公众号，所以就试了一下，比预想的简单得多，几分钟就搞定了。

## 创建智能体

首先没账号的可以先去 `https://www.coze.cn/` 注册一下，基础版账号就行，完成后进入主页面，点击左上角按钮即可开始创建智能体。

![](https://stg.heyfe.org/images/blog-wechat-offical-account-ai-bot-coze-1733652948962.png)

![](https://stg.heyfe.org/images/blog-wechat-offical-account-ai-bot-coze-1733653179626.png)

想要可控性强一点的可以使用标准创建，我就直接使用 AI 创建了，随便输入一下需求：

![](https://stg.heyfe.org/images/blog-wechat-offical-account-ai-bot-coze-1733653333391.png)

他会自动帮你生成一个智能体配置，还会生成个 AI 头像：

![](https://stg.heyfe.org/images/blog-wechat-offical-account-ai-bot-coze-1733653374395.png)

点击确定后，就可以看到他已经自动生成了一部分配置：

![](https://stg.heyfe.org/images/blog-wechat-offical-account-ai-bot-coze-1733653538745.png)

包括：

-   AI 的 Prompt
-   一些插件
-   开场白

由于公众号交互能力有限，有些插件可能无法按照预期运行，所以可以根据需求自行调整。我添加了必应搜索、链接读取和必应图片搜索等插件，这样可以简单的实现一些搜索的功能。

上方可以进行模型的切换，除了豆包自己的模型外，还支持`通义千问`、`智谱`和 `kimi` 等，可按需选择。

除了这些基础配置外，它还支持记忆、知识库等配置，可以根据需求自行添加，比如将公众号文章内容放入知识库，用户即可直接和 AI 对话询问发布的内容。

配置完成后可在右侧与智能体互动，直接点击右上角`发布`按钮，即可开始将创建的 AI 智能体发布到微信公众号中。

![](https://stg.heyfe.org/images/blog-wechat-offical-account-ai-bot-coze-1733659385977.png)

## 连接微信公众号

发布时 Coze 会默认勾选扣子商店，微信订阅号是无法勾选的，需要先点击后面的`配置`按钮，打开配置菜单，然后到 `微信公众平台`：https://mp.weixin.qq.com/ 进行配置。

![](https://stg.heyfe.org/images/blog-wechat-offical-account-ai-bot-coze-1733663911062.png)

在`设置与开发`=》`开发接口管理`中找到`开发者ID(AppID)`并复制，如果没开通的话需要先开通一下。将 ID 粘贴到刚刚的弹窗中点击保存。扣子会进入授权页面，需要使用管理员微信扫码进行授权。授权完成后回到发布页面记得勾选微信`订阅号平台`再点击右上角`发布`。

发布完成后会进入审核状态，不过审核速度很快，几分钟就通过了，然后就可以在微信公众号中和 AI 对话了。

## 对话测试

我用的是默认的豆包模型，下面浅试一下对话效果，先打个招呼，还挺热情。

![](https://stg.heyfe.org/images/blog-wechat-offical-account-ai-bot-coze-1733664833416.png)

然后再问问天气，类似的问题智能体会自动调用`bing搜索`插件，不过感觉总结的不是很好，估计是 prompt 的原因。

![](https://stg.heyfe.org/images/blog-wechat-offical-account-ai-bot-coze-1733666307507.png)

再随便问几个小问题，虽然等差数列没能找出题目的问题，不过整体表现还不错。

![](https://stg.heyfe.org/images/blog-wechat-offical-account-ai-bot-coze-1733666441854.png)

## 最后

就这样，有兴趣的可以尝试接入到自己的公众号中，还是很快的。也可以直接关注我的公众号玩一玩试试效果。

![](https://blog.heyfe.org/weixin-qrcode.jpg)