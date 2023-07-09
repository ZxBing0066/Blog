---
tags: [开源, 性能]
---

# benny 介绍 - 一个简单的 benchmark 框架

`benny` 是一个简单的 `benchmark` 框架，当你需要测试自己的库或是方法性能时，可使用它来进行对其进行基准测试。

前排先上 [GitHub 地址](https://github.com/caderek/benny)

官方标榜的特性为：

-   可以简单的编写任何同步或异步代码
-   可为每个用例单独配置
-   可选择性跳过或只执行特定的用力
-   支持多种结果类型：
    -   `JSON`
    -   `CSV`
    -   `HTML Table`
    -   `HTML Chart`
-   不需要额外的设置几个输出
-   套件结果为 `Promise`

## 使用

先看下使用方法：

```js
const b = require('benny');

b.suite(
    'Example',
    b.add('Reduce two elements', () => {
        [1, 2].reduce((a, b) => a + b);
    }),

    b.add('Reduce five elements', () => {
        [1, 2, 3, 4, 5].reduce((a, b) => a + b);
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: 'reduce', version: '1.0.0' }),
    b.save({ file: 'reduce', format: 'chart.html' })
);
```

如上定义了一组套件，名称为 `Example`，然后通过 `add` 添加两个用例，`cycle` 用来定义用例的输出，可传入函数来自定义，`complete` 默认为输出基准测试结果，同样可传入函数来自定义处理。

随后的 `save` 则是用来保存结果，`file` 为文件名称，`format` 为输出的格式。支持的格式上面已经写过，不再赘述。

可尝试执行上述 `benchmark` 文件然后查看输出结果：

```sh
Running "Example" suite...
Progress: 100%

  Reduce two elements:
    213 985 744 ops/s, ±0.61%   | fastest

  Reduce five elements:
    109 395 371 ops/s, ±0.66%   | slowest, 48.88% slower

Finished 2 cases!
  Fastest: Reduce two elements
  Slowest: Reduce five elements

Saved to: benchmark/results/reduce.json

Saved to: benchmark/results/reduce.chart.html
```

默认会输出用例名称及其执行效率，如上 `Reduce two elements` 部分为该用例名称，`213 985 744 ops/s` 为执行效率表示该方法每秒执行了 `213 985 744` 次，±0.61% 为单案例执行时采集结果的误差范围值，`fastest` 表示其为最快的用例，`slowest` 其为最慢的用例，非最快用例后会标注效率的百分比差。

如果使用了图表还可打开图表查看，会更直观，如上结果对应的图表为：

![picture 1](/image/blog-benny-introduce-90.png)

图表可直接将输出的图表 `html` 打开查看，其中使用 `chart.js` 进行渲染。

## 其他功能

除了上述基础使用，`benny` 还提供了一些其他的功能，比如可以通过调用 `add.skip` 来跳过某个用例，或 `add.only` 来跳过所有其他用例只执行该用例。

如果用例代码为异步代码，直接将用例定义为 `async` 即可。

```js
add('Async benchmark without setup', async () => {=
    await delay(0.5);
    // 结果为 2 ops/s
});
```

除此之外 `benny` 还支持一些自定义选项：

-   `delay` - 每次测试用例执行后的休息时间
-   `initCount` - 每次测试用例执行前的初始化次数
-   `maxTime` - 执行的最大次数
-   `minTime` - 执行的最小次数
-   `minSamples` - 最小采样次数

配置的方式有两种，一种是通过 `configure` 的 `cases`：

```js
b.configure({
    cases: options
});
```

即可为所有用例添加配置，也可在 `add` 时为单个用例添加配置：

```js
b.add(
    'Reduce two elements',
    () => {
        [1, 2].reduce((a, b) => a + b);
    },
    options
);
```

除了上述配置外，`configure` 还可配置一些全局配置，不过目前只有一个 `minDisplayPrecision`，用来配置输出内容的精度，默认为 2。

## 总结

通过 `benny` 可以方便的为一些方法等进行基准测试，方便查看函数的执行效率，测量各种代码的性能，并且支持多种输出结果，方便各种场景下展示结果。

如果有类似需要测量函数性能，或者想要测量某些变更对性能的影响程度时，不妨试试看。
