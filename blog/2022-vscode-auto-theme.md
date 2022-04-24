---
tags: [VSCode, 生产力]
---

# VSCode 如何根据系统主题自动更换主题

近期疫情被隔离在家办公，平时在办公室都是电脑暗色主题，但是在家白天不想关窗户，暗色主题没法看清，所以想白天使用亮色主题，晚上切成暗色。然而手动切换太麻烦了，现在操作系统都支持自动切换主题，所以想让 VSCode 也同步进行切换。

## autoDetectColorScheme

VSCode 配置中存在一个配置项 `window.autoDetectColorScheme`：

```json
{
    // If set, automatically switch to the preferred color theme based on the OS appearance. If the OS appearance is dark, the theme specified at `workbench.preferredDarkColorTheme` is used, for light `workbench.preferredLightColorTheme`.
    "window.autoDetectColorScheme": false
}
```

当设置为 true 时，VSCode 将会根据系统主题自动切换主题，如果系统主题是暗色，则会切换到 `workbench.preferredDarkColorTheme`，如果系统主题是亮色，则会切换到 `workbench.preferredLightColorTheme`。

所以要实现自动切换主题，需要配置中开启 `window.autoDetectColorScheme`，并为 `workbench.preferredDarkColorTheme` 和 `workbench.preferredLightColorTheme` 设置对应的主题值。

以下是我的配置：

```json
{
    "window.autoDetectColorScheme": true,
    "workbench.preferredDarkColorTheme": "One Dark Pro",
    "workbench.preferredLightColorTheme": "Atom One Light"
}
```

可以直接修改配置文件，或者 `cmd+shift+p` 后输入 `Open Settings (UI)`，搜索 `autoDetectColorScheme` 就可以看到对应的配置项。

![picture 2](/image/blog-2022-vscode-auto-theme-83.png)

## 问题

添加自动切换主题后，系统每次切换主题时，VSCode 会按照配置将 `preferredDarkColorTheme` 或 `preferredLightColorTheme` 写入到 `colorTheme` 来进行主题切换。这就导致，如果你使用了配置同步，几台电脑的 VSCode 都会切换主题写入配置文件，然后进行同步，这会导致后来的写入失败，VSCode 会提示错误并自动打开配置文件。而且这里好像有些 bug，偶尔打开配置文件会失败，而显示一个看不见的未保存文件，只能重启窗口解决。

当然，直接不需要关注配置文件内容关闭即可，无伤大雅，不过项目开的多的时候需要关闭很多个配置文件，需要一个个关闭就比较麻烦了，希望 VSCode 后面能优化一下，不要再写入 `colorTheme` 直接按照 `autoDetectColorScheme` 来读取 `preferredDarkColorTheme` 或 `preferredLightColorTheme` 做主题就好了。

## 插件实现

也可以通过插件来实现自动切换：[Sundial – Automatic night mode and settings switch](https://marketplace.visualstudio.com/items?itemName=muuvmuuv.vscode-sundial)，该插件可以自定义日出日落的时间，然后根据日出日落时间来进行切换，而不依赖于系统主题。
