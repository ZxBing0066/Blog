---
lastUpdate: 2023-7-31
date: 2022-8-26
---
# 玩转 GitHub profile - 打造自己的特色 GitHub 主页

今天介绍下 `GitHub` 的一项特色功能 - `GitHub profile`，以及一些列开源工具、项目来帮助打造自己特色的 `GitHub profile`。

`GitHub profile` 也是最近两年 `GitHub` 才新加的功能，开发者可以通过编写 `README` 打造属于自己的个人 `GitHub` 首页。

先贴一张我自己的 [GitHub 首页](https://github.com/ZxBing0066)。

## 创建

要创建属于自己的 `GitHub profile`，只需要创建自己账户同名的 `GitHub` 仓库即可：

![picture 3](https://stg.heyfe.org/images/blog-github-profile-readme-14.png)

`profile` 属于彩蛋类功能，创建时在下方将会出现提示。如果勾选自动创建 `README`，将会创建一个特殊的 `README` 模版，长这样：

```md
### Hi there 👋

<!--
**GULU-H/GULU-H** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
```

直接编辑 `README` 文件，然后到你的 `GitHub` 首页即可在上方看到效果。可直接使用官方提供的模版修改作为自己的 `profile`。

注意 `README` 可以使用相对路径引用该仓库下的文件，简单说就是在该仓库中的预览会直接展示在首页中，不会因为位置不同导致路径问题。

## 模版

如果觉得自己捏 `profile` 太麻烦，也可以参考很多出彩的 `profile` 进行改造。下面推荐几个模版网站：

### awesome-github-profile

先上地址：https://zzetao.github.io/awesome-github-profile/

![picture 4](https://stg.heyfe.org/images/blog-github-profile-readme-88.png)

该项目提供了丰富的模版，可以从中选择喜爱的模版进行二次开发。

### Awesome-Profile-README-templates

上地址：https://github.com/kautukkundan/Awesome-Profile-README-templates

该仓库没有概览图，可以进入项目目录点击各 `markdown` 文件进行查看。

类似的项目还有：https://github.com/durgeshsamariya/awesome-github-profile-readme-templates

### gh-profile-readme-generator

老规矩，上地址：https://rahuldkjain.github.io/gh-profile-readme-generator/

使用该网站可通过表单式问卷为你生成 `profile`，如果懒得二次定制可以使用该网站进行生成。

## 模块

除了使用上述模版二次定制外，`profile` 还可以使用一些有趣的模块，比如常见的各大开源项目中使用的 `badge`，或是一些特色的 `profile` 模块。

### `badge` 模块

-   https://shields.io/

![shields](https://img.shields.io/badge/style-for--the--badge-green?logo=appveyor&style=for-the-badge)

-   https://badgen.net/

![badgen](https://badgen.net/badge/icon/windows?icon=windows&label)

### `waka` 时间展示

https://github.com/marketplace/actions/waka-readme

### github-profile-trophy

展示 `GitHub stars` 等信息

-   https://github.com/ryo-ma/github-profile-trophy

![trophy](https://github-profile-trophy.vercel.app/?username=ryo-ma)

-   https://github.com/anuraghazra/github-readme-stats

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)

### 有趣的 snk

snk 可以将你的 `GitHub contributions` 绘制成贪吃蛇游戏，十分有趣：

https://github.com/Platane/snk

![snk](https://raw.githubusercontent.com/zxbing0066/zxbing0066/output/github-contribution-grid-snake.svg#gh-light-mode-only)

### profile views

可以展示 profile 的访问量

![](https://komarev.com/ghpvc/?username=your-github-username&style=flat-square)

## 技巧

### 暗色模式兼容

注意很多模块由于是图片，而 `GitHub` 现在支持暗色模式，很容易导致暗色模式下图片颜色不合适，此时可以通过一些特殊的技巧来处理。

```md
![GitHub Snake Light](https://raw.githubusercontent.com/zxbing0066/zxbing0066/output/github-contribution-grid-snake.svg#gh-light-mode-only) ![GitHub Snake Dark](https://raw.githubusercontent.com/zxbing0066/zxbing0066/output/github-contribution-grid-snake-dark.svg#gh-dark-mode-only)
```

可以在图片或者外层链接的 `hash` 上添加 `gh-light-mode-only` 和 `gh-dark-mode-only` 来让其在不同主题下自动切换。

其实这个像魔法一样的操作是借助 `GitHub` 中的样式表来实现的：

```css
@media (prefers-color-scheme: light) :root[data-color-mode=auto] .entry-content [href$="#gh-dark-mode-only"],
    :root[data-color-mode=auto] .comment-body [href$="#gh-dark-mode-only"],
    :root[data-color-mode=auto] .readme [href$="#gh-dark-mode-only"] {
    display: none;
}
```

`GitHub` 通过亮暗色媒体查询和 `href` 的后缀匹配来达成这样的效果。

### 使用 `GitHub` 样式

除了上述暗色主题兼容外，还可借助其他 `GitHub` 中的内置样式来达成一些好看的效果：

![picture 5](https://stg.heyfe.org/images/blog-github-profile-readme-95.png)

比如此处的灰色块便是借助 `GitHub` 的 `code` 样式来实现，图片也是来源于 `GitHub` 各处的图标图片。

## 总结

借助 `GitHub profile` 可以让开发者方便的打造自己的 `GitHub` 首页，在全球最大交友网站中有特色的介绍自己 🐶。

最后祝大家都能打造出属于自己的 `GitHub` 首页。
