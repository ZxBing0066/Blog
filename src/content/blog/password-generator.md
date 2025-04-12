---
title: 开源个密码生成库
pubDate: '2022-08-12'
tags: []
---

几个月前因为某个需求参考了 `Chrome` 的密码生成的源码撸了一个 `js` 的密码生成器，这里分享一下。

前排先上下 [GitHub 链接](https://github.com/ZxBing0066/zlib/tree/master/packages/generate-password)。

## 使用

使用很简单，直接通过 `npm install` 即可。

```sh
npm install z-generate-password
```

也可通过 `cdn` 引入：

```html
<script src="https://cdn.jsdelivr.net/npm/z-generate-password@latest/umd/index.min.js"></script>
```

随后即可在代码中使用：

```js
const password = zGeneratePassword();
```

## 自定义规则

该库除了上述基本使用外，还提供了丰富的自定义功能。

默认情况下，生成规则为：

-   至少包含一个小写字母
-   至少包含一个大写字母
-   至少包含一个数字
-   不能存在连续的 `-` 或者是 `_`（默认规则不使用符号，使用符号时该规则生效）

不能存在连续的 - 或者是 `_`，主要是因为某些字体库连续的中划线或下划线会被解析成其它字符，影响密码的可读性。除此之外默认的字符集中还排除了 `1`、`l`、`0`、`o`、`O` 这几个比较容易混淆的字符。

库中提供了多个自定义规则：

```ts
{
    /** length of the password, pass a [min, max] as length range */
    length?: number | [number, number] | undefined;
    /** custom your symbol collection */
    symbols?: string | true | undefined;
    /** custom your digit collection */
    digits?: string | undefined;
    /** custom your lowercase char collection */
    lowerCaseChars?: string | undefined;
    /** custom your uppercase char collection */
    upperCaseChars?: string | undefined;
    /** add your own char collection */
    customChars?: string | undefined;
}
```

通过 `length`，可以设定密码的长度，也可使用数组来表示密码长度的生成范围。

默认生成时不会使用 `symbols`，如果需要使用 `symbols`，可以传入 `true`，此时符号的字符集为 `-_.:!`，或者传入一个字符串，表示使用的符号集。

```js
const newPassword = generatePassword({
    symbols: true
});
// MS2_!U9ni.4QHaMk
```

```js
const newPassword = generatePassword({
    symbols: '@&*^'
});
// q2V^ppADRVEC3BVb
```

`digits` 为数字集合，默认为 `23456789`，为了可读性排除了 1 和 0。

`lowerCaseChars` 为小写字符集，默认为 `abcdefghijkmnpqrstuvwxyz`，为了可读性排除了 `l` 和 `o`。

`upperCaseChars` 为大写字符集，默认为 `ABCDEFGHJKLMNPQRSTUVWXYZ`，为了可读性排除了 `I` 和 `O`。

`digits`，`lowerCaseChars`，`upperCaseChars` 就可通过传入 `string` 来自定义字符集，如果需要关闭该字符集，可将其设置为 `null`。

```js
const newPassword = generatePassword({
    digits: null
});
// fcQDHXaPWgsTtdUD
```

如果有自定义字符的需求，可使用 `customChars` 设置。

```js
const newPassword = generatePassword({
    customChars: '我是中国人'
});
// RVg59M6CKP中i国4zT
```

生成的密码会至少包含提供的每个字符集中至少一个字符。

## 安全性

虽然默认的规则生成的密码看起来可能不是很安全，其实只是错觉，安全性是针对硬破解次数而定的，随机生成的密码不存在字典匹配的问题，只需通过计算硬破解次数即可判断密码的安全性。经过计算默认生成规则的熵值约为 `88bits - 5.26 \* 10^26`，计算公式为 `61^15-53^15-37^15-37^15+29^15+29^15+13^15-5^15`，可使用 `js` 计算 `Math.log2(61**15-53**15-37**15-37**15+29**15+29**15+13**15-5**15)）`。

安全性计算逻辑可参考 [chrome-generated-passwords-not-high-entropy](https://security.stackexchange.com/questions/190796/chrome-generated-passwords-not-high-entropy)

## 技术实现

生成密码逻辑参考了 [chrome 密码生成相关代码](https://github.com/chromium/chromium/blob/c4d3c31083a2e1481253ff2d24298a1dfe19c754/components/password_manager/core/browser/generation/password_generator.cc#L94)， 具体生成流程如下：

1. 填充一个大写字母、小些字母、数字（如有提供其它字符集，也会从中随机一个字符进行填充）
2. 从总字符集中抽取字符填充至 16 位（或填充至自定义位数）
3. 将生成的字符乱序
4. 进行可读性检测（存在 `_` 或 `-` 时）

`js` 没有 `shuffle` 函数，故采用 `Fisher–Yates shuffle` 算法编写了 `shuffle` 进行乱序，上一篇关于乱序的文章也是因为本需求所做的。

## 其它

本库使用 `ts` 编写、经过完善测试、`MIT` 协议、支持 `tree-shaking`、支持 `umd` 和 `esm` 等多种格式、无依赖、体积只有 `800B`，欢迎使用。😉

贴下 [GitHub 地址](https://github.com/ZxBing0066/zlib/tree/master/packages/generate-password)，欢迎三连。