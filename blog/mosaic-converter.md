# 制作了一个马赛克图片转换器

制作了一个马赛克图片转换器，可以将图片转换成马赛克风格，并可转换为 `css box-shadow` 进行输出。前排先放效果图、转换器地址和 `GitHub` 地址：

![picture 1](https://stg.heyfe.org/images/blog-mosaic-converter-44.gif)

转化器地址：https://mosaic.heyfe.org/

`GitHub` 地址：`https://github.com/ZxBing0066/mosaic-converter`

## 转换器功能

转换器会将传入的图片转换为马赛克风格，并将马赛克风格的图片以 `box-shadow` 进行转换，借助 `box-shadow`，我们可以直接用 `css` 来渲染该图片，且可以通过 `box-shadow` 的一些特性来达成一些比较好玩的效果，比如用间隙来加重马赛克风格：

![picture 2](https://stg.heyfe.org/images/blog-mosaic-converter-84.png)

或者直接将间隙拉到顶，达成类似点阵图的效果：

![picture 3](https://stg.heyfe.org/images/blog-mosaic-converter-55.png)

又或者借助 `border-radius`，实现圆点图效果：

![picture 4](https://stg.heyfe.org/images/blog-mosaic-converter-71.png)

制作出想要的效果后，可以在右侧点击 `复制 box-shadow 样式` 按钮复制其样式。

## 实现原理

关于 `box-shadow` 实现马赛克图的原理之前有一篇文章中有提到，这里不再赘述。此处大概说一下图片转换为马赛克图再转为 `box-shadow` 的过程。

转换器在拿到图片后，会将图片绘制在一个非常小的画布中，以此来降低图片的精度，然后将画布中绘制的低精度图片进行二次渲染，渲染到较大的画布中，此时由于图片被拉伸，就会形成一定的马赛克效果。随后为了将马赛克效果图转换为 `box-shadow`，转换器会去读取画布中的绘制信息，将其生成为一组二维数组，再根据其中的颜色转换为 `box-shadow` 中的属性。至此转换器的功能就完成了。

当然其中还有一些细节（浏览器会默认启用平滑绘制导致马赛克失效等问题），本篇不打算细说，会在下篇专门写一篇来讲一下具体实现。

## 最后

本转换器原先是在[码上掘金挑战赛某次文章](https://juejin.cn/post/7144859921173970951)中构想 ，然后在第二次制作[类似效果](https://juejin.cn/pin/7145607433426042887)时干脆使用脚本来完成了，最近有空就将其稍微优化了一下进行开源。目前一些细节还有点欠缺，待改进。

再贴一下地址：

转化器地址：https://mosaic.heyfe.org/

`GitHub` 地址：https://github.com/ZxBing0066/mosaic-converter

## 相关文章

-   [给我一个 div + 三行 css，还你一个超级马里奥](https://juejin.cn/post/7144859921173970951)

