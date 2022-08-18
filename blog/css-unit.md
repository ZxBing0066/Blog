# 扫盲 CSS 中的单位

在 CSS 中，对于尺寸属性的值一般可以分为以下几类：

-   关键字
-   数值
-   百分比

关键字一般有 initial、unset 等，百分比则是相对值，常见的是相对于上级 BFC 元素的比例。

当然还有包括纯数字值的如 line-height 可以为纯数字，本文主要讨论常见数值。

数值一般由数字和单位来组成，如角度中的 90deg、长度 100px、时间 0.3s 等，其中 0 较为特殊，某些时候可以省略单位。

下面会主要讨论几种类型的单位：

## 角度单位

角度一般用在 css 渐变、旋转等场景下，包含以下四种单位：

-   deg
-   grad
-   rad
-   turn

我们最常用的是 deg，就是我们常说的角度的度数，一圈为 360 度。

grad 则为 Gradian，表示梯度，了解较少，一般会在地质学中使用，对应的一圈为 400 度。

rad 则表示弧度，和 π 相关，对应的一圈为 2π 即 6.2832rad。

turn 是最简单的，代表一圈。

所以 1turn = 6.2832rad = 400grad = 360deg，常用的记住 turn 和 deg 即可。

## 时间单位

时间主要用在 css 动画、渐变之中，只包含两个单位：s 和 ms。

需要注意的是不同于长度单位和角度单位，0 在用于时间时不可以省略单位，即 0 无法代表 0s，如果使用了会导致 css 表达式失效。

## 长度单位

在说下我们最常用的长度单位，除了最常见的 px 和 em 外，长度单位中还包括了多大几十个单位，下面分为三类来说下：

### 绝对长度单位

绝对长度单位最好理解，就是和屏幕的像素点相关，除了 px 外，还包括 cm、mm、Q、in、pc、pt 这几种，都是在平时的网页开发中很少使用的单位。

px 为像素，但是不是对应屏幕的像素点，而是对应系统分辨率渲染的像素点。

另外几个单位可以看到很多熟悉的物理尺寸，他们都是主要应用于打印，web 开发中则很少使用，要注意这里的 cm 等单位在屏幕中的展示并不等同于物理世界中的物理尺寸，而是和屏幕的 PPI 相关。只有在打印领域才会和真实物理尺寸相关。

### 字体相对单位

字体相对单位包括常用的 em、rem，还有一些比较冷门的如 ex、ch、ic，另外还有几个实验性质的包括 cap，lh、rlh。

em 为相对当前元素的字号，比如当前元素字号为 12px，1.5em 则为 18px，rem 和 em 类似，不过是相对于 root 元素的字号，一般指 html。

ex、ch、ic 三个单位都是和字体相关，ex 代表将当前字体中 x 的高度作为单位，ch 则代表将当前字体中的 0 的高度作为单位，ic 则是将当前字体中的 `水` 字高度作为单位。

而后面新增的 cap 和上述三个很类似，代表着大写字母的高度。

lh、rlh 和 em、rem 很类似，一个相对于当前的行高，一个相对于根元素的行高。

### 视口相对单位

除了上面和字体、字号相关的尺寸，还有一些和视口（viewport）相关的相对单位，如常见的 vh、vw、vmin、vmax，和 vb、vi。

vh 指视口高度的百分之一，vw 则为视口宽度的百分之一，即 viewport 的高度 = 100vh，viewport 宽度 = 100vw。

vmin 和 vmax 则是相对于视口中较长或较小的边，如视口宽度大于高度，则 vmin 代表视口高度的百分之一，反之则为视口宽度的百分之一。

vb 和 vi 则是相对于浏览器初始化的视口，目前只有最新版 firefox 支持。

## 分辨率

除了上述几个常见单位外，css 还包含分辨率的单位，一般用于媒体查询中：

```css
@media print and (min-resolution: 300dpi) {
}
```

主要有三个单位：dpi、dpcm、dppx，dpi 还有个别名为 x。