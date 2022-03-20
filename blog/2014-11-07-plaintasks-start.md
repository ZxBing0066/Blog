---
date: 2014-11-7 21:23:43
tags: [sublimetext]
---

# SublimeText PlainTasks 使用教程

## `PlainTasks`使用教程(所有快捷键为`win`下的快捷键,`mac`需要自行替换)

-   在`SublimeText`中输入`Ctrl+P`打开面板,执行`Tasks: New document`命令来新建一个 TODO 文件,或者自己手动创建一个.

-   输入文字后加`:`,将会自动将此行视为一个组的标题,换行后继续执行分组操作将会使该分组视为子分组,若需创建同级分组需要在中
    间空一行

-   使用`Ctrl+Enter`或者`Ctrl+I`来插入一个`task`,也可使用`Tasks: New`命令来插入

-   使用`Ctrl+D`来切换`task`的完成状态,也可使用`Tasks: Complete`命令来切换

-   使用`Alt+C`来切换`task`的取消状态,也可使用`Tasks: Cancel`命令来切换

-   使用`Ctrl+Shift+U`将会使用默认浏览器打开光标所在的`url`链接,也可使用`Tasks: Open URL`命令来打开

-   使用`@`来插入一个标签,(`@tag`)

-   使用`Ctrl+R`可快速跳转

-   使用`Ctrl+Shift+UP/DOWN`来移动`task`的顺序

-   输入`s`然后按`Tab`两次将会自动生成`@started(14-11-07 22:28)`,当某个`task`包含此类标签时将会在完成的时候计算所花的时
    间

-   输入`tg`然后按`Tab`两次将会自动生成`@toggle(14-11-07 22:59)`,表示暂停`task`,再次使用表示重启,将会在最后计算时间是去
    掉暂停时间

-   输入`t`然后按`Tab`将会自动生成`@today`

-   可以使用`.\filename\`或`./another filename/`来添加一个文件链接,在`ST3`中`.\filename>symbol\`来指向一个`symbol`(没试
    出来,试了一下在后面加上`:string`倒是会调到对应的文字,不明觉历),在`ST2`中`.\filename"any text"`来指向一段文字

-   使用`Alt+O`来打开对应的文件链接

-   使用`Ctrl+Shift+A`来将所有完成的或取消的`task`移到`archives`组中去

-   支持的文档类型有:
    -   TODO
    -   \*.todo
    -   \*.todolist
    -   \*.taskpaper
    -   \*.tasks
