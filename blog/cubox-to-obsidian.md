---
tags: [Cubox, Obsidian, 瞎折腾]
---

# 将 Cubox 内容导入到 Obsidian

Cubox 是一个比较方便的“稍后读”软件，Obsidian 则是一个很优秀的笔记软件。一般收藏使用 Cubox，但是知识整理时还是放到 Obsidian 会更方便。但 Cubox 本身并没有导出的功能。

要实现将 Cubox 内容导入到 Obsidian 需要借助 Cubox 的“自定义快捷动作”和 Obsidian 的 Advanced URI 插件。

首先在 Obsidian 的插件市场中找到 Advanced URI 并安装启用。这个插件是支持通过 URL Schema 的方式对 Obsidian 进行文件创建、修改、导航等等功能。

![](https://stg.heyfe.org/images/blog-cubox-to-obsidian-1711983489205.png)

安装完成后就可以到 Cubox 中进行快捷动作的创建。

![](https://stg.heyfe.org/images/blog-cubox-to-obsidian-1711983613381.png)

选择喜欢的图标，输入名称和快捷动作链接即可。

![](https://stg.heyfe.org/images/blog-cubox-to-obsidian-1711983686544.png)

Cubox 提供了常用的标题、描述、缩略图、注解、Markdown 等参数，可以按需求使用。这里贴一下我的链接。

```
obsidian://advanced-uri?vault=notes&filepath=/Cubox/[card_title].md&mode=overwrite&data=---%0Atags: [Cubox]%0Areference: [web_url]%0Adesc: [card_des]%0A---%0A![cover]([cover_url])%0A[content_markdown]
```

链接分为以下几部分，

| 格式 | 描述 |
| --- | --- |
| obsidian://advanced-uri? | URL Schema 协议，用于唤起 Obsidian 的 Advanced URI 插件 |
| vault=notes | Obsidian 中的目标 vault 名称 |
| filepath=/Cubox/[card_title].md | 目标文件的路径，这里我存到 notes 库的 Cubox 文件夹下，文件名为`文章标题.md` |
| mode=overwrite | 调用模式，包含 new (新增文件，重名会自动生成数字 id 避免重复)、write（写入已有文件）、overwrite（复写已有文件）、append（将信息添加到文件头部）以及 prepend（将文件添加到文件尾部） |
| data=[content_markdown] | 写入到文件中的内容 |

关于写入的内容，我这里使用的比较多：

`---%0Atags: [Cubox]%0Areference: [web_url]%0Adesc: [card_des]%0A---` 是拼接然后来写入 frontmatter 的，虽然 Advanced URI 支持 frontmatter 功能，但是无法与写入文件同时通过一个链接来调用。其中的回车符被编码过变成了 `%0A`，格式化后如下：

```md
---
tags: [Cubox]
reference: [web_url]
desc: [card_desc]
---
```

就是添加了 tags、原文链接以及文章描述。

后面的 `%0A![cover]([cover_url])%0A[content_markdown]` 则是添加了封面图和文章内容。

保存自定义快捷方式后，在想要导入的文章右上角点击自定义的快捷动作会弹出调用 Obsidian 的提示，点击确认后就会打开 Obsidian 并创建和打开目标文件。

![](https://stg.heyfe.org/images/blog-cubox-to-obsidian-1711985256889.png)

美中不足的是其中的一些样式比如阅读时间信息格式都不太对，然后 Cubox 也不支持将其中的标签进行导出。所以还是需要自己在进行二次修剪。

## 参考资料

-   https://vinzent03.github.io/obsidian-advanced-uri/
-   https://pkmer.cn/Pkmer-Docs/10-obsidian/obsidian%E4%BD%BF%E7%94%A8%E6%8A%80%E5%B7%A7/cubox-%E9%80%9A%E8%BF%87-advanced-uri-%E6%8F%92%E4%BB%B6%E5%AF%BC%E5%85%A5-obsidian/
