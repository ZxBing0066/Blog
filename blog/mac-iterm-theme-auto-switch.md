---
tags: []
---

# Mac iTerm2 跟随系统主题自动切换

前情提要：[VSCode 如何根据系统主题自动更换主题](./2022-vscode-auto-theme.md)

最近在 VPS 上折腾点东西，所以会频繁使用 iTerm2，白天再见果然暗色主题太吃力，所以找了找有没有办法让 iTerm2 自动切换主题。

## 方案

iTerm2 自动切换需要借助脚本，并且官方提供了完整的案例：[Change Color Presets On Theme Change](https://iterm2.com/python-api/examples/theme.html)

具体脚本代码如下：

```python
#!/usr/bin/env python3

import asyncio
import iterm2

async def update(connection, theme):
    # Themes have space-delimited attributes, one of which will be light or dark.
    parts = theme.split(" ")
    if "dark" in parts:
        preset = await iterm2.ColorPreset.async_get(connection, "Dark Background")
    else:
        preset = await iterm2.ColorPreset.async_get(connection, "Light Background")

    # Update the list of all profiles and iterate over them.
    profiles=await iterm2.PartialProfile.async_query(connection)
    for partial in profiles:
        # Fetch the full profile and then set the color preset in it.
        profile = await partial.async_get_full_profile()
        await profile.async_set_color_preset(preset)

async def main(connection):
    app = await iterm2.async_get_app(connection)
    await update(connection, await app.async_get_variable("effectiveTheme"))
    async with iterm2.VariableMonitor(connection, iterm2.VariableScopes.APP, "effectiveTheme", None) as mon:
        while True:
            # Block until theme changes
            theme = await mon.async_get()
            await update(connection, theme)


iterm2.run_forever(main)
```

## 使用方式

### 直接导入官方案例脚本

官网事例 [Change Color Presets On Theme Change](https://iterm2.com/python-api/examples/theme.html) 下方点击下载，将会下载一个 its 文件（应该是 iTerm script 的缩写），该文件为一个包，里面包含了一些配置信息、运行环境等。

下载完成后点击该文件 iTerm2 会自动导入脚本，或者在 iTerm2 菜单中找到 Scripts > Manage > Import 选择该文件即可。

![Picture](/image/blog-mac-iterm-theme-auto-switch-17.png)

选择后一般会提示是否自动启动，选择是。如果是第一次使用 iTerm2 python 脚本还会提示安装运行环境，按照提示确认安装即可。

安装完成后重启即可实现根据系统主题自动切换 iTerm2 主题配色。

如果想要自定义暗色和亮色配色，打开脚本文件，Scripts > Manage > Reveal Scripts in Finder，打开 AutoLaunch > theme > theme > theme.py 文件，修改对应的代码为指定的配色即可。

```python {2,4}
    if "dark" in parts:
        preset = await iterm2.ColorPreset.async_get(connection, "Dark Background")
    else:
        preset = await iterm2.ColorPreset.async_get(connection, "Light Background")
```

配色名称可在 iTerm2 配置 > Profiles > Colors > Color Presets 中查看。

修改后记得重启来生效。

![picture 4](/image/blog-mac-iterm-theme-auto-switch-95.png)

### 自行创建 iTerm2 脚本

在 iTerm2 菜单中找到 Scripts > Manage > New Python Script，按照提示选择环境、输入名称等创建，然后贴入上面的脚本即可。
