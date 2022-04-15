---
tags: [javascript]
date: 2020-07-04
---

# 是时候学习/推广一波可选链（Optional chaining）和空值合并（Nullish coalescing ）了

> 最近工作中发现团队有些同学不太了解 `Optional chaining` 和 `Nullish coalescing` 两个新的操作符，正好推广一波。

## 背景

`Optional chaining` 和 `Nullish coalescing` 目前都已经纳入 `ECMA-262` 标准中，不过兼容性还差得远，如下： ![MDN 兼容表](/image/blog-2020-es-features-92.png) 两个操作符的兼容几乎一致，不过现在有了 `babel`，兼容都不是问题。不过还是要注意使用前一定要确认项目是否支持这俩操作符，切勿只顾一时爽，至于如何兼容可以看下方。

## `Optional chaining` 介绍

`Optional chaining` 是为了解决程序中铺天盖地的 `Cannot read property 'foo' of undefined` 错误或者是满屏幕的 `a && a.b && a.b.c && a.b.c.d` 逻辑与运算符或者是三元操作符。有了 `Optional chaining`，我们可以十分优雅的去获取某些可能不存在的数据。

`Optional chaining` 操作符的定义是：当左操作数为空值时（`null`、`undefined`）中断取值操作并返回 `undefined`。（方法调用为方法为空值时中断调用并返回 `undefined`）。

```js
const foo = a?.b?.c?.d;
```

比起一长串的逻辑与运算符，不但优雅美观，而且方便、可读性更高，逻辑与有时候会偷懒不写，不过自从用了 `Optional chaining`，再也不用偷懒了，属性取值如此简单稳定，再也不怕属性找不到了。

`Optional chaining` 有三种标准语法：

```js
// 静态属性
a?.b?.c.d;
// 动态属性
a?.[b]?.c.d;
// 方法调用
a?.b?.();
```

不过也需要注意 `Optional chaining` 后不能跟数字，因为存在语法上的重合。

```js
a ? 0.3 : 0;
a?.[3];
```

所以需要接数字时记得使用 `[]`。

同时 `Optional chaining` 也支持 `delete`:

```js
delete a?.b?.c;
```

注意上述操作无论 `a.b` 的值只会删除 `a.b.c` 不会删除 `a.b`。

## `Nullish coalescing` 介绍

再来看看 `Nullish coalescing`，`Nullish coalescing` 和 `Optional chaining` 算是一对好基友，主要用来做一些默认值的设置。

`Nullish coalescing` 操作符的定义是：当左操作数为空值时（`null`、`undefined`）返回右操作数，否则返回左操作数。

```js
const foo = a?.b?.c?.d ?? 'bar';
```

有的同学可能好奇这不是和逻辑或一样吗？

```js
const foo = a?.b?.c?.d || 'bar';
```

其实还是不一样的 `Nullish coalescing` 从名字可以看出来：空值合并，也就是只有左操作数为空值时才会应用右操作数，而逻辑或使用的是假值进行判断，在一些边界情况下如左操作数为 `0`、`''` 空字符串时 `Nullish coalescing` 会更合理，可以减少一些边界值的判断。

```js
null ?? 'foo'; // 'foo'
undefined ?? 'foo'; // 'foo'
0 ?? 'foo'; // 0
'' ?? 'foo'; // ''

null || 'foo'; // 'foo'
undefined || 'foo'; // 'foo'
0 || 'foo'; // 'foo'
'' || 'foo'; // 'foo'
```

## 如何使用

这两个新的操作符其实现在已经包含在新版的 `preset-env` 中，如果你的项目 `preset-env` 较新的化，那恭喜 🎉，你不需要做什么额外的操作就可以用上了。

不过如果是较旧版的 `preset-env`，那么需要安装上相应的插件来进行启用：

```shell
yarn add @babel/plugin-proposal-optional-chaining @babel/plugin-proposal-nullish-coalescing-operator --dev
```

安装完成后不要忘记在 `babel` 配置中启用：

```json
{
    "plugins": ["@babel/plugin-proposal-optional-chaining", "@babel/plugin-proposal-nullish-coalescing-operator"]
}
```

## Babel 转义

顺便看一下 `babel` 是如何转义 `Optional chaining` 和 `Nullish coalescing` 的。

`Optional chaining` 的转义

```js
a?.b?.[c]?.();
delete a?.b?.c;
// babel 转义后 =====>
('use strict');
var _a, _a$b, _a$b$c, _a2, _a2$b;
(_a = a) === null || _a === void 0
    ? void 0
    : (_a$b = _a.b) === null || _a$b === void 0
    ? void 0
    : (_a$b$c = _a$b[c]) === null || _a$b$c === void 0
    ? void 0
    : _a$b$c.call(_a$b);
(_a2 = a) === null || _a2 === void 0 ? true : (_a2$b = _a2.b) === null || _a2$b === void 0 ? true : delete _a2$b.c;
```

细心的同学可以发现有几个比较值得注意的点。

### 注意点

1. `babel` 会在每次属性取值时将属性值进行缓存而不是像平时代码中常写的直接 `a && a.b && a.b.c`，这是为了保证和原生实现的一致性，保证每个属性取值只会取一次，避免在一些 getter 属性获取时造成取值次数不一致差异性。
2. `babel` 在判断值是否为空时并没有直接使用 `== null` 而是使用了比较繁琐的 `=== null || === void 0`，这个主要是为了兼容 `document.all`，关于 `document.all` 写在后面。

`Nullish coalescing` 的转义

```js
a ?? b;
// babel 转义后 =====>
('use strict');
var _a;
(_a = a) !== null && _a !== void 0 ? _a : b;
```

可以注意到同样是为了兼容 `document.all`，`Nullish coalescing` 也使用了 `=== null || === void 0` 来进行判断。

### `document.all`

`document.all` 是一个比较奇怪的值，它是 `document` 中所有元素的集合，但是它是一个假值，并且是一个特殊的空值。

```js
document.all || 1; // 1
document.all == null; // true
document.all === null; // false
document.all === undefined; // false
```

`document.all` 是一个残留的属性，这些特性也是为了一些以前的兼容考虑。HTML5 中已经将它废弃，可以不做过多了解。有兴趣的可以看下 [MDN Document.all](https://developer.mozilla.org/en-US/docs/Web/API/Document/all) 的文档。

### `loose`

由于 `document.all` 是一个废弃的属性，现实开发中其实不会遇到使用的场景，既然如此我们就没必要因为一个废弃的属性而导致 babel 转义出大量无意义代码。我们可以通过启用插件的 `loose` 属性来实现：

```json
{
    "plugins": [
        ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
        ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }]
    ]
}
```

如果是 `preset-env` 中集成的更简单，直接将 `preset-env` 中的 `loose` 设为 `true` 就行了。

再看下编译的代码：

```js
a?.b?.[c]?.();
// babel 转义后 =====>
('use strict');
var _a, _a$b, _a$b$c;
(_a = a) == null ? void 0 : (_a$b = _a.b) == null ? void 0 : (_a$b$c = _a$b[c]) == null ? void 0 : _a$b$c.call(_a$b);
```

```js
a ?? b;
// babel 转义后 =====>
('use strict');
var _a;
(_a = a) != null ? _a : b;
```

代码瞬间简洁了许多。如果当心团队有同学误用 `document.all` 也可以在 `eslint` 中添加告警。

## 总结

`Optional chaining` 和 `Nullish coalescing` 已经纳入标准一段时间了，使用后可以大大增加属性获取、默认值设置等代码的优雅、可读性，减少各种 `Cannot read property 'foo' of undefined` 的错误情况。等什么，赶紧用起来吧。

> 如果觉得本文有用，请不要吝啬您的赞 👍
