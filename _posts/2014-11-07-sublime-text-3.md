---
layout: post
title: "Sublime Text3 安装&配置"
date: 2014-11-7 10:16:43
author: ZxBing
blogid: 20141107002
categories: sublimetext
tags: sublimetext
---

##`Sublime Text3`安装&配置

####下载
>下载地址链接:[http://www.sublimetext.com/3](http://www.sublimetext.com/3)
>本人下载的是绿色版`portable version`,下载后解压打开ST3.

####安装`Package Control`

#####`Package Control`官网地址:[https://packagecontrol.io/installation#st3](https://packagecontrol.io/installation#st3)

>使用`ST Console`安装
>使用`` Ctrl+` ``快捷键或`View->Show Console`来打开`Console`,输入如下代码:


<pre class="prettyprint linenums Lang-python">
import urllib.request,os,hashlib; h = '7183a2d3e96f11eeadd761d777e62404' + 'e330c659d4bb41d3bdf022e94cab3cd0'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
</pre>

>下载后直接安装
>点击`Preferences > Browse Packages`菜单,进入打开的目录的上层目录,然后再进入`Installed Packages/`目录,下载[Package Control.sublime-package](https://packagecontrol.io/Package%20Control.sublime-package)并复制到`Installed Packages/`目录即可.

>安装成功后会在菜单栏多出`Preferences > Package Control`菜单,若是未出现可重启一下试试.

####`Package Control`使用

>`Ctrl+Shift+P`打开面板,输入`Package Control`可看到所有可使用的命令.
#####常用命令
*  `Install Package`安装插件的命令,执行后将会列出所有可用的插件列表,然后选择插件便可直接安装
*  `Remove Package`删除已安装的插件
*  `List Packages`列出所有已安装的插件
*  `Disable Package`暂停使用某插件
*  `Enable Package`启用某插件

####插件推荐

#####本段参考自[http://ipestov.com/the-best-plugins-for-sublime-text/](http://ipestov.com/the-best-plugins-for-sublime-text/)&[http://www.oschina.net/translate/20-powerful-sublimetext-plugins](http://www.oschina.net/translate/20-powerful-sublimetext-plugins)

>#####[`Emmet`](http://emmet.io/)
>以前的`Zen-Coding`改名叫`Emmet`,附上官网地址[http://emmet.io/](http://emmet.io/),里面有教程之类的~

>#####[`Git`](https://github.com/kemayo/sublime-text-git)
>将`Git`整合进`Sublime Text`中,不过我个人还是比较习惯用`Shell`操作`Git`

>#####[`MarkDown Editing`](https://github.com/SublimeText-Markdown/MarkdownEditing)
>`Sublime Text`不仅仅是能够查看和编辑`Markdown`文件，但它会视它们为格式很糟糕的纯文本。这个插件通过适当的颜色高亮和其它功能来更好地完成这些任务。

>#####[`FileDiffs`](https://github.com/colinta/SublimeFileDiffs)
>这个插件允许你看到`Sublime Text`中两个不同文件的差异。你可以比较的对象可以是从剪贴板中复制的数据，或工程中的文件，当前打开的文件等。

>#####[`DocBlockr`](https://github.com/spadgos/sublime-jsdocs)
>`DocBlockr`可以使你很方便地对代码建立文档。它会解析函数，变量，和参数，根据它们自动生成文档范式，你的工作就是去填充对应的说明。

>#####`Snippets`
>`Snippets`，你一定已经听说了，可以帮你快速书写代码。但它不是像上面提到的插件那样使用缩写，它是重用代码块以节省您的时间。你甚至可以创建自己的代码段，这完全取决于你自己。

>#####[`WebInspector`](https://github.com/sokolovstas/SublimeWebInspector)
>这个插件把`Sublime Text`打造成了一个`Javascript`调试工具,貌似把`Chrome`中的主要的调试功能都整合进来了.

>#####[`BracketHighlighter`](https://sublime.wbond.net/packages/BracketHighlighter)
>这个插件可以显示出当前光标所在的开合部分
>![插图](http://zxspace.qiniudn.com/2014-11-7-img-0.jpg)

>#####[`Sublimall`](https://sublimall.org/)
>这个插件能在你注册帐号后将你的`Sublime Text`所有配置同步,略吊~

>#####[`AutoFileName`](https://github.com/BoundInCode/AutoFileName)
>自动索引文件目录,补全文件名

>#####[`PlainTasks`](https://github.com/aziz/PlainTasks)
>把`Sublime Text`打造成`Task`管理工具,好叼的样子~
>![插图](http://zxspace.qiniudn.com/2014-11-7-img-1.jpg)

(2014年11月8日, AM 07:06:35修改)
>#####`Gist`
>可在`Sublime Text`上使用和编辑`Gist`的插件
(2014年11月8日, AM 07:06:35修改)







####主题推荐

#####[colorsublime,一个主题提供站点](http://colorsublime.com/)

>#####[`SpaceGray`](http://kkga.github.io/spacegray/)
>![主题图片](http://zxspace.qiniudn.com/2014-11-7-img-2.jpg)

>#####[`Centurion`](https://github.com/allanhortle/Centurion)
>![主题图片](http://zxspace.qiniudn.com/2014-11-7-img-3.jpg)

>#####[`flatland`](https://github.com/thinkpixellab/flatland)
>![主题图片](http://zxspace.qiniudn.com/2014-11-7-img-4.jpg)

>#####[`predawn`](https://github.com/jamiewilson/predawn)
>![主题图片](http://zxspace.qiniudn.com/2014-11-7-img-5.jpg)

>#####[`itg.​flat`](https://sublime.wbond.net/packages/Theme%20-%20itg.flat)
>![主题图片](http://zxspace.qiniudn.com/2014-11-7-img-6.jpg)









