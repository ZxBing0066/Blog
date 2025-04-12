---
title: 在 Cursor 中使用自定义模型 - DeepSeek
pubDate: '2024-09-28'
tags:
    - 瞎折腾
---

# 在 Cursor 中使用自定义模型 - DeepSeek

Cursor 免费试用过期后迫于贫穷，只能看看能不能用自定义模型来平替一下，看到有人推荐了 `DeepSeek`，就试试看。

首先到 [平台官网](https://platform.deepseek.com/) 注册一下账号，会送 10 元免费额度（5M tokens），一个月有效期。然后即可到 API keys 页面中新建一个 API key。完成后回到 Cursor 中，打开 Cursor Settings 界面，参考下图进行配置即可。

![image](https://github.com/ZxBing0066/picx-images-hosting/raw/master/image.4xuifdq65c.png)

-   在 Model Names 中增加模型名称 `deepseek-coder`，尽量关闭其他模型，不然 `cursor` 调用请求时会选择其他模型。
-   在 API Key 中填入刚刚新建的 API key。
-   展开 Base URL 设置为 `https://api.deepseek.com/beta`。

保存后，点击 `Verify` 按钮进行校验，通过即可正常使用。

## 自定义模型的限制

Cursor 虽然支持自定义模型，相比于官方的模型，自定义模型有一些限制，比如无法使用 `Composer`，比如 `⌘ K` 补全功能就无法使用。迫于贫穷，只能将就一下了。
