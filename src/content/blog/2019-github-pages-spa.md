---
title: GitHub Pages 如何实现 SPA
description: 如何使用 GitHub Pages 中实现 SPA 效果
pubDate: '2019-11-05'
tags:
  - github
---

## 前因

这两天在 GitHub Pages 里面托管了一个小 DEMO，但是 DEMO 是 SPA 的，然而 **GitHub Pages 是无法支持 SPA 配置的**，这里记录一下解决方案。

## 404

GitHub Pages 虽然不支持 SPA，但是支持自定义 404 页面。参考：[GitHub Pages 404](https://help.github.com/en/github/working-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)。

> You can display a custom 404 error page when people try to access nonexistent pages on your site.

通过创建一个 404.html（或者 404.md，不过需要做一些配置，具体可查看上方链接），访问不存在的页面都会跳转到 404 的页面。

## 初次方案

既然可以使用 404 页面捕获不存在的页面请求，那么就可以 **借助 404 页面进行跳转**。

```html
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>404</title>
        <script>
            // 或者特定的路径
            location.href = location.origin;
        </script>
    </head>
    <body></body>
</html>
```

借助 404 页面，可以让所有页面跳转到 index 中，算是简单的实现了 SPA。

## 进阶方案

虽然实现了 404 到 index 的跳转，但是离真正的 SPA 体验还是差了，每次进入页面只能跳转到首页。

差的就是 **跳到 index 但是路由信息却丢失了**，这时候可以想到想办法保存下跳转前的路由信息，然后跳转后还原就可以了。大概步骤如下：

1. 在 404 页面，将当前的路由信息记录下来
2. 携带路由信息跳转到 index
3. 进入 index 后检查路由信息，进行还原

    404.html

```html
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>404</title>
        <script>
            location.href =
                location.origin + '/?page=' + encodeURIComponent(location.href.replace(location.origin, ''));
        </script>
    </head>
    <body></body>
</html>
```

index.html

```html
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>index</title>
        <script>
            (function () {
                if (location.search) {
                    var params = {};
                    location.search
                        .replace(/^\?/, '')
                        .split('&')
                        .forEach(s => {
                            var v = s.split('=');
                            params[v[0]] = v[1];
                        });
                    if (params.page) {
                        history.replaceState(null, null, decodeURIComponent(params.page));
                    }
                }
            })();
        </script>
    </head>
    <body>
        <script type="text/javascript" src="main.min.js"></script>
    </body>
</html>
```

通过上述步骤可以将路由信息完整的带到 index 中还原，从而实现 SPA 的效果，当然，会看到浏览器地址栏中路由的跳转，体验上稍微差了点，不过功能上已经基本无异。

## 最终效果

可以看下效果： ![github-spa.gif](https://stg.heyfe.org/images/2019-github-pages-spa.gif)

网站地址：[https://rapiop.github.io/vue/](https://rapiop.github.io/vue/)

GitHub 地址：[https://github.com/rapiop/rapiop.github.io](https://github.com/rapiop/rapiop.github.io)

## 注意事项

-   大部分 GitHub Pages 有自己的项目路径，如 `test.github.io/test/`，这时候需要对上述逻辑做一些处理，不能直接套用。
-   URL 参数中的 page 可以自定义，注意不要和已有路由信息冲突。
-   除了 URL 传参，也可以通过 localStorage 之类的手段传递路由，不过极小概率会有问题，比如 404 页面还没跳转时关闭了页面，下一次到首页打开可能会跳到之前存储的路由中去之类的。

## 参考

-   [GitHub Pages 404](https://help.github.com/en/github/working-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)
-   [spa-github-pages](https://github.com/rafrex/spa-github-pages)