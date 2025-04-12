---
title: 换肤 - 一文看破常用的网站主题切换
pubDate: '2022-08-02'
tags: []
---

现在大部分主流网站都不约而同的添加了暗色主题，让我们一起看看这些常用的切换方案、实现方式以及注意点。

## 切换方案

### 暴力刷新

该方案出现在最早期，开发者会在构建时针对每个主题构建一套样式文件，然后当用户切换主题后，网站会切换到另外的指向对应主题的地址，或是将主题存入本地缓存然后刷新后读取对应主题加载对应主题文件并进行切换，由于切换体验不佳，随着各种动态切换方案的出现，该方案已经很少看到。

一段平平无奇的伪代码：

`html` 中读取主题，加载对应文件。

```html
<script>
    const theme = localStorage.getItem('theme');
    const themeFile = `${theme}.css`;
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = `/css/themes/${themeFile}`;
    document.head.appendChild(themeLink);
</script>
```

```js
const switchTheme = theme => {
    localStorage.setItem('theme', theme);
    location.reload();
};
```

### 类名切换

在该方案中，开发者会将所有的主题文件打包在一处，然后通过在 `root` 或 `body` 上增加类名来控制主题生效。

```html
<body>
    <p>Some content</p>
</body>
```

```css
body {
    background: #fff;
}
body.theme-dark {
    background: #000;
}
```

```js
let currentTheme;
const switchTheme = theme => {
    currentTheme && document.body.classList.remove(`theme-${currentTheme}`);
    document.body.classList.add(`theme-${(currentTheme = theme)}`);
};
```

虽然该方案实现了动态切换，但却导致样式文件体积过大，影响页面加载速度。

### 补丁文件

一般而言该方案会存在主主题和副主题之分，副主题会依赖于主主题声明，通常副主题只包含变更的部分，一般为颜色，而其它部分都只存在于主主题之中，这样可以减少副主题的体积。

在切换到对应副主题时，会将副主题作为补丁文件添加到页面中，覆盖主主题中的声明，从而达到切换主题的目的。

```js
const switchTheme = theme => {
    const themeFile = `${theme}.patch.css`;
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = `/css/themes/${themeFile}`;
    document.head.appendChild(themeLink);
};
```

该方案也有一定缺陷，由于副主题和主主题相互独立，在维护时很容易因为疏漏出现覆盖不全的问题，并且如果存在动态加载的其它样式，所有的样式都需要做对应处理，维护成本过高。

方案也存在一部分变种，比如直接通过变量生成多套全量主题，然后直接将全量副主题作为补丁文件覆盖，解决维护疏漏的问题，不过这样也减少了该方案的体积优势。

### 文件替换

该方案类似于全量补丁文件，但是全量补丁文件存在一定限制，必须要主题文件间需要完全一致，才能避免覆盖不全的问题，而一些库的第三方主题间并无法保证其一致性（如 `bootstrap` 主题），所以该方案中的改进是在新样式生效后，移除旧样式文件

```js
const switchTheme = async theme => {
    const themeFile = `${theme}.css`;
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = `/css/themes/${themeFile}`;
    document.head.appendChild(themeLink);
    await themeLink.onLoad(); // 伪代码示意，监听 link 的 onload 事件
    const oldThemeLink = document.querySelector(`link[href*="${themeFile}"]`);
    oldThemeLink && oldThemeLink.remove();
};
```

### CSS in JS

在主流的 `css-in-js` 库中，基本都存在主题的定义，此时切换主题只需要更改主题变量的定义即可。

```js
const theme = {
    background: '#fff',
    color: '#000',
    fontSize: '14px'
};
const darkTheme = {
    ...theme,
    background: '#000',
    color: '#fff'
};
const App = () => {
    const [theme, setTheme] = useState(theme);
    return (
        <ThemeProvider theme={theme === 'dark' ? darkTheme : theme} setTheme={setTheme}>
            <div></div>
        </ThemeProvider>
    );
};
```

同样也可以将主题文件作为补丁来异步加载。不过该方案虽然方便，但是却依赖于团队的技术栈，如果团队中存在使用 `css` 来描述样式，就需要配合其它方案来实现。

### css 变量

随着 `css` 变量的使用越来越广泛，在主题切换切换中，同样大放异彩。

```css
:root {
    --background: #fff;
    --color: #000;
    --font-size: 14px;
}
```

`dark.vars.css`

```css
:root {
    --background: #000;
    --color: #fff;
}
```

切换时可通过补丁文件或嵌入 `style` 的方式来覆盖变量的定义，从而实现主题切换。

```js
const switchTheme = theme => {
    const themeFile = `${theme}.vars.css`;
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = `/css/themes/${themeFile}`;
    document.head.appendChild(themeLink);
};
```

然而由于某毒瘤的兼容性，想要使用并不容易，建议使用优雅降级，在毒瘤上直接关闭切换主题。

### 暴力滤镜

该方案借助 `css filter`，直接转换页面颜色，从而暴力实现主题切换。

```js
const switchTheme = theme => {
    if (theme === 'dark') {
        document.body.style.filter = 'invert(100%)';
    } else {
        document.body.style.filter = 'invert(0%)';
    }
};
```

由于过于暴力，展示效果往往会比较奇怪，并且一些特殊元素如图片、视频等也会被影响，需要特殊处理。当然如果哪天老板突然让你上个暗色主题，也可以用来应应急，毕竟 他快啊。

```css
img:not([src*='.svg']),
video {
    filter: invert(100%);
}
```

该方案一般用于一些特殊节日时为网站变灰使用，一段代码即可搞定。

```css
:root {
    filter: grayscale(100%);
}
```

## 总结

在主题切换中，各方案都存在自己的缺陷和自己的局限性，最终选择还是需要结合网站的受众、团队的技术栈、后续维护成本等因素，综合考虑最适合的方案。