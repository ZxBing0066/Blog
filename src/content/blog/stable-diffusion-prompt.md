---
title: AI 绘画咒语入门 - Stable Diffusion Prompt 语法指南 【成为初级魔导士吧！】
description: "要用好 Stable Diffusion，最最重要的就是掌握 Prompt（提示词）。由于提示词对于生成图的影响甚大，所以被称为魔法，用得好惊天动地，用不好魂飞魄散 \U0001F436。\n\n因此本篇整理下提示词的语..."
pubDate: '2023-04-22'
heroImage: 'https://stg.heyfe.org/images/blog-stable-diffusion-models-1690811336594.png'
tags:
  - AI绘画
  - AIGC
  - Stable Diffusion
---

# AI 绘画咒语入门 - Stable Diffusion Prompt 语法指南 【成为初级魔导士吧！】

要用好 Stable Diffusion，最最重要的就是掌握 Prompt（提示词）。由于提示词对于生成图的影响甚大，所以被称为魔法，用得好惊天动地，用不好魂飞魄散 🐶。

因此本篇整理下提示词的语法（魔法咒语）、如何使用（如何吟唱）、以及一些需要注意的细节问题（避免翻车）。

## 基础语法

在提示词中我们使用 `,` 对提示词进行分割，而每个部分的提示语可以有不同类型，比如：自然语法、标签语法、emoji 或者是颜文字。

### 自然语法

Stable Diffusion 的提示词支持自然语法，比如告诉它 `a girl is touching a cat` 可以得到如下图片:

![picture 1](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1681952420419.png)

也支持一定程度的中文、日文，比如 `睡觉的狗`：

![picture 2](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1681952533841.png)

但是中文理解力支持十分有限，所以一般都会使用英文来作为提示词。

### 标签语法/Tag

除了自然语法外， 提示词中最常用的是标签语法，以单词或短语来给 AI 做提示，比如 `masterpiece, best quality, 1dog, 1cat, sun, grass`：

![picture 3](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1681952652705.png)

会得到一张有狗、猫、太阳和草坪的图片。

### emoji

除了一般语言外，我们还可以使用 emoji 来作为提示词，比如使用 `😭` 可以让 Stable Diffusion 画出这样的表情：

![picture 4](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1681952971458.png)

使用 `😄` 可以得到这样的图：

![picture 5](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1681953105752.png)

想要使用 emoji 的可以参考 [这个 wiki](https://unicode.org/emoji/charts/emoji-list.html) 查看各个 emoji 代表的意思。

### 颜文字

此外 Stable Diffusion 还支持使用颜文字来作为提示词，比如可以使用 `XD` 来让人物笑起来：

![picture 6](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1681993750447.png)

用 `T_T` 让人物表现伤心：

![picture 7](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1682034602230.png)

如果想要用颜文字可以参考 [这个 wiki](https://zh.wikipedia.org/wiki/%E8%A1%A8%E6%83%85%E7%AC%A6%E8%99%9F%E5%88%97%E8%A1%A8) 查看颜文字代表的意思。

虽然 Stable Diffusion 的提示词支持多种写法，但是日常使用一般建议

1. 以 **标签语法为主**，试需求使用自然语法
2. **尽量使用英文而不是中文作为提示词**
3. 除了一些常见的提示词所有 model 都支持外，**很多提示词需要 model 的支持**
4. 提示词一定要注意拼写，**一旦拼写错误或者是用到了 AI 无法识别的提示词 AI 将会将其拆解成他可以理解的部分，甚至可能拆分成字母**
5. **emoji 和颜文字实际测试使用效果很差，可能是我所使用的 model 的原因**，一般不建议使用
6. 提示词尽量越清晰越好

## 权重语法

除了基本语法外，我们还可以使用一些语法来调节每个提示词的权重。调节权重包含以下几种方式：

1. 默认情况下越靠前的提示词权重越高
2. 通过 `(提示词:权重数值)` 手动设置权重，比如： `(1cat:1.3),(1dog:0.8)`
3. 通过 `() {} []` 设置权重：
    - `{提示词}` 等价于 `(提示词:1.05)`
    - `(提示词)` 等价于 `(提示词:1.1)`
    - `[提示词]` 等价于 `(提示词:0.952)` 即 `1/1.05`

且 `() {} []` 语法可嵌套使用，比如 `(((提示词)))` 就等价于 `(提示词:1.331)`。

一般情况下建议使用 `(提示词:权重数值)` 语法，可读性、可控性更高。

**注意一般情况下权重不建议超过 1.5，不然会对画面造成巨大影响。**

## 模型引用语法

除了基础提示语外，类似于 Lora 模型也是需要使用提示语来饮用的，语法： `<lora:模型⽂件名:权重>`。

比如如果要使用知名的模型墨心，提示词是这样的 `<lora:MoXinV1:1>`：

![picture 14](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1682134559723.png)

需要注意**模型的名称会按照实际的文件名来**，可直接使用 WebUI 中的 Lora 面板来生成。

## 进阶语法

### OR

OR 语法一般用于提示词的混合，比如在绘制头发时通过 `[purple|sliver|green]_hair` 可以绘制出这样的混色的发色：

![picture 8](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1682090586589.png)

也可以搭配 `multicolor hair` 生成这样的头发：

![picture 9](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1682090682234.png)

也可以使用 `[horse|bird]` 来生成长翅膀的马，不过细节很难控制：

![picture 10](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1682090834342.png)

### AND

AND 语法和 OR 语法十分类似，实战下来效果也差不多，可能是我姿势不对。

比如 `purple hair AND sliver hair AND green hair` 可以生成这样的发色：

![picture 12](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1682091153297.png)

此外 AND 语法还支持为某个片段增加权重，比如 `gold hair :1.2 AND sliver hair :0.8 AND green hair` 可以让发色更多金色：

![picture 13](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1682091241308.png)

使用 `bird AND lion AND horse` 可以生成：

![picture 11](https://stg.heyfe.org/images/blog-stable-diffusion-prompt-1682091093923.png)

emm，不知道为啥鸟飞一边去了。

不过据说 DDIM 采样 不支持 AND 语法。

### 步骤控制语法

Stable Diffusion 还支持通过步骤控制语法来让某些元素从第几步开始绘制，到第几步结束。

比如 `[cat:10]` 指从第十步开始画猫，而 `[cat::20]` 表示在第二十步结束画猫。也可以组合使用，比如： `[[cat::20]:10]` 代表从第十步开始第二十步结束。

### 关键字占比控制

此外还有通过占比语法控制关键字的绘制占比的。

比如 `[dog:girl:0.9]` 表示总绘制步骤的前 90% 画狗，后面画女孩，而 `[dog:girl:30]` 则表示前三十步画狗，后面画女孩。

## 魔法宝典

网上有很多整理好的提示词字典，可以用于快速创建出不同的风格，有需要的可以进行参考。

-   [元素宝典](https://aiguidebook.top/index.php/category/ysfd/)
-   [元素宝典](https://docs.qq.com/doc/DWHl3am5Zb05QbGVs)
-   [标签超市](https://tags.novelai.dev/)
-   [魔咒百科词典](https://aitag.top/)
