---
lastUpdate: 2023-7-31
date: 2023-2-11
tags: [VSCode, GitHub]
cover: https://stg.heyfe.org/images/blog-vscode-js-debug-terminal-1690811194402.jpg
---

# VSCode Markdown 图片上传到 GitHub 图床

VSCode 中有一个插件 [Markdown Image](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image) 还算好用，可以一键将图片上传然后将链接粘贴到 Markdown 中。

之前都是把 Markdown 直接贴在对应项目里，然后通过相对链接访问，使用的时候发现一些问题：

-   项目的相对路径未必是上传后的真实路径，导致每次都要手动编辑地址。比如我的 Blog 中的上传图片的地址是 `/public/image`，但 public 到了发布时会被 copy 到根路径，此时自动生成的相对地址就不匹配了。
-   Markdown 复制到别的地方时，图片资源要再做一次复制粘贴。比如我要把 Blog 中的某一篇发到 Juejin，由于源码是相对路径，而直接复制内容又担心样式问题，所以每次都需要把图片再复制一遍。

不过 Markdown Image 中有提供其它图床功能，决定将图片放到图床中，最终决定将图片放到 GitHub 图床。

## GitHub 图床创建

![picture 1](https://stg.heyfe.org/images/blog-vscode-markdown-image-upload-40.png)

首先去 GitHub 中创建一个空仓库，这里后面会使用 GitHub Pages，所以设置为 Public，如果使用其它 host 服务，可按需选择。然后后面 host 服务可按需选择，这里举例两个：

### 直接使用 jsdelivr

我未直接使用 jsdelivr 主要是当心它挂掉（曾经遇到过几次）。使用 jsdelivr 则什么都不需要做，直接使用即可：

![](https://cdn.jsdelivr.net/gh/zxbing0066/stg@master/images/blog-vscode-markdown-image-upload-40.png)

格式为：`https://cdn.jsdelivr.net/gh/${username}/${repository}@${branch}/${filepath}`。

-   username 为 GitHub 用户名
-   repository 为你的仓库名称
-   branch 为分支名
-   filepath 为文件路径

### 使用 Pages 和 Cloudflare

![picture 2](https://stg.heyfe.org/images/blog-vscode-markdown-image-upload-5.png)

完成后去项目设置中开启 Pages 服务，并进行设置。自定义域名可按需设置，这边使用 Cloudflare 做域名解析和加速。

设置完成后访问格式极为： `https://stg.heyfe.org/${filepath}`。

这个方案好处是不用担心 jsdelivr 挂掉，但是坏处是 pages 服务启用有点慢，上传完成后 GitHub Pages 生效中间大概存在 10 分钟的间隙，此段时间访问图片就访问不到了。

## Markdown Image 配置 GitHub 图床

这是卡我最久的一步，主要是 Markdown Image 中一个配置项很容易让人误解。

在 Markdown Image 中配置 GitHub 图床主要需要以下几个参数：

![picture 3](https://stg.heyfe.org/images/blog-vscode-markdown-image-upload-34.png)

> 此处不小心将 token 也带上去了，不过该 token 已经删除，大家截图时也要注意此类安全隐患。

-   CDN 即上面我们讲的 host 服务，按照配置修改即可
-   Path 是将图片上传到的路径
-   Repository 即项目的仓库地址
-   Token 需要去 GitHub Token 页面进行生成

此处 CDN 和 Path 都没什么好说的，重点说下 Repository 和 Token

### Repository

此处配置的 Repository 地址不同于我们平时使用 git 时的地址，所以一定要自己看好格式是： `https://github.com/${username}/${repository}` 而不是 `https://github.com/${username}/${repository}.git`，我习惯性的认为是 git 中的地址，导致一直上传失败各种搜索、排查了十来分钟才找到原因。

### Token

Token 我们需要去 [GitHub 设置](https://github.com/settings/tokens) 中去生成，早期 GitHub 中的 Token 权限设计存在一些安全隐患，现在推出了新的 Token。而我们的 Token 是给插件使用的，无法完全保证起安全性，所以建议使用新 Token。

![picture 6](https://stg.heyfe.org/images/blog-vscode-markdown-image-upload-79.png)

点击创建后会跳到 Token 生成页面，此处要注意的是 Expiration 和 Repository access 以及下方的权限设置。

![picture 7](https://stg.heyfe.org/images/blog-vscode-markdown-image-upload-63.png)

此处建议过期时间设置为 1 年，最大就一年，所以后期要记得上传失败过来检查下 Token 是否失效。老 Token 有永久 Token，但是权限设置存在安全隐患，强烈不建议。

至于 Repository access 则建议只选择对应的仓库。

而 Permissions 只需要勾选 Contents 即可。

![picture 8](https://stg.heyfe.org/images/blog-vscode-markdown-image-upload-55.png)

创建后复制 Token 将其粘贴到配置中。

## 效果

然后我们在 VSCode 即可通过快捷键或命令粘贴剪切板中的文件。

![picture 11](https://stg.heyfe.org/images/blog-vscode-markdown-image-upload-4b89efc92959becbb2ed226ae7436cf6d2091cc5cee7a7ff1e5af08e77973901.png)

## FAQ

### 图片上传失败

如果出现如下两种错误，大概率是 Markdown Image 中的配置出错了，请仔细检查配置，特别要注意 Repository 字段。

`An SSL error has occurred and a secure connection to the server cannot be made. Would you like to connect to the server anyway?`

![picture 5](https://stg.heyfe.org/images/blog-vscode-markdown-image-upload-49.png)

`upload File Failed: Upload file failed: Not Found.`

![picture 9](https://stg.heyfe.org/images/blog-vscode-markdown-image-upload-79.png)

### 上传没有反应

开发者面板会出现 `Get 0 Images` 的提示。大概率是由于你的剪切板中没有可粘贴的图片。

### Remote 时上传失效

当项目为 Remote 项目时，粘贴会不生效，猜测是因为插件运行在 Remote 机器上，访问不了当前机器的剪切板导致的。暂时未找到什么解决方案。
