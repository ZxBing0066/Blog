# 一文看懂 babel 的工作原理

`babel` 在前端快速发展的最近几年，为前端的工程化提供了莫大的帮助，解决了前端各种浏览器兼容问题导致的 `js` 崩溃，让我们可以放下的用上新的各种 `es6`、`es7` 等新语法，今天聊一聊 `babel` 的工作原理。

## babel 为何而诞生

聊之前我们先讲讲 `babel` 为何而诞生，浏览器的生态环境大家都清楚，特别是在国内，哪怕是微软已经给 `IE` 判了死刑的现在，依旧还是丢不掉的包袱。对于 `web` 应用而言，`css` 的兼容可以说一定程度上会自行“优雅降级”，大部分情况下只会影响到页面的展示，但是 `js` 的兼容却很容易导致程序的崩溃和线上的问题。`babel` 也应运而生，特别是在 `es6` 出现后，一下子出现了一大批好用的语法：`let`、`const`、`Promise`、`Class`、扩展运算符等等，让人眼馋不已，也让 `babel` 逐渐在前端生态圈中变得不可或缺。

## babel 做了什么

我们先看看 `babel` 为了让我们能够不再关心 `JS` 的语法兼容而做了什么：

-   语法检查
-   语法转译
-   `polyfill` 导入

### 语法检查

首先 `babel` 会按照自己当前的版本和配置，对你的代码进行解析，如果你使用了不支持的语法，或者语法错误他都会报错，从而避免未支持的对应语法被丢上生产，或者一些降级后可能没有报错的代码在编译时能够及时发现，比如 `const` 重复赋值等。

### 语法转译

语法转译即 `babel` 会按照你所配置的目标环境，将语法转进行译降级到目标环境可以解析的语法。

如 `Class`、`const`、`let`、`async`、`await`，如果你的目标环境都支持，那它会保持这些语法原封不动，而如果你的目标环境中存在不兼容的，那它就会对语法做降级处理，如 `Class` 将会按照组合继承的方式进行转译（如果有继承的话），比如以下这段代码：

```js
class Z {
    dd = () => {
        console.log('dd');
    };
}

class A extends Z {
    constructor() {
        console.log('hello');
    }
    do = () => {
        console.log('do');
    };
}
```

将会被解析成为这样（删减后）：

```js
'use strict';

function _inherits(subClass, superClass) {
    // ...
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        // ...
        return _possibleConstructorReturn(this, result);
    };
}
function _possibleConstructorReturn(self, call) {
    // ...
    return _assertThisInitialized(self);
}
function _createClass(Constructor, protoProps, staticProps) {
    // ...
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _defineProperty(obj, key, value) {
    // ...
}
var Z = /*#__PURE__*/ _createClass(function Z() {
    _classCallCheck(this, Z);
    _defineProperty(this, 'dd', function () {
        console.log('dd');
    });
});
var A = /*#__PURE__*/ (function (_Z) {
    _inherits(A, _Z);
    var _super = _createSuper(A);
    function A() {
        var _this;
        _classCallCheck(this, A);
        console.log('hello');
        return _possibleConstructorReturn(_this);
    }
    return _createClass(A);
})(Z);
```

而 `let`、`const` 则可能会被转译为 `var`，数组扩展符被解析成 `concat` 等，这样便可保证代码在目标环境中的安全运行，再配合语法检查这套组合拳，便可让开发者放下的使用新语法。

### polyfill 导入

`babel` 通过语法检查和转译，已经解决了新语法的问题，但是这还没结束，除了新语法外，在浏览器上运行还存在一个障碍，就是各种新的方法和对象，如 `Promise`、`Array.from` 等，这些 `API` 需要通过导入 `polyfill` 来解决，早期的 `babel` 采用 `babel-polyfill` 直接将所有的 `polyfill` 进行打包，然后开发者直接引入全量的 `polyfill` 包，然后随着发展，该方案逐渐被 `core-js` 所取代，`core-js` 除了支持导入全量的 `polyfill` 外，还支持按需导入，比如这样的一段代码：

```js
Array.from(new Set([1, 2, 3, 2, 1]));
```

如果 `babel` 发现你的目标环境不支持 `Array.from` 时，他将会把代码转换成这样：

```js
'use strict';

require('core-js/modules/es.array.from.js');
require('core-js/modules/es.string.iterator.js');
require('core-js/modules/es.array.iterator.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.set.js');
require('core-js/modules/web.dom-collections.iterator.js');
Array.from(new Set([1, 2, 3, 2, 1]));
```

这样 `babel` 就能按照你的代码所缺少的环境依赖按需导入对应的 `polyfill` 了，甚至通过配置他还能做到按需导入且不会影响全局环境：

```js
'use strict';

var _interopRequireDefault = require('@babel/runtime-corejs3/helpers/interopRequireDefault');
var _from = _interopRequireDefault(require('@babel/runtime-corejs3/core-js-stable/array/from'));
var _set = _interopRequireDefault(require('@babel/runtime-corejs3/core-js-stable/set'));
(0, _from.default)(new _set.default([1, 2, 3, 2, 1]));
```

这样 `babel` 就会将相应的 `polyfill` 作为 `lib` 导入并使用，而不是直接注入到环境中。

## babel 怎么做到的

那么 `babel` 是如何做到这三件事情的呢，其实最主要靠的就是 `AST`。

简单的说，`babel` 会将你的文件解析成 `AST` 也就是抽象语法树，然后它会按照你的配置，遍历相应的节点。比如如果需要转译 `let`、`const`，那它就会将 `AST` 中的 `let`、`const` 语法块变更为 `var` 语法块。而语法检查则是在解析成 `AST` 这一步所做的，对于不认识的语法，它将无法解析成功，就会报错。而 `polyfill` 其实也是相同的原理，`babel` 会遍历整个语法树，找出目标环境不支持的方法和 `API`，然后将其对应的 `polyfill` 模块进行导入，如果是配置了不影响全局的情况下还会对对应的语法块做转译。

## 总结

`babel` 通过 `AST`，解决了困扰着前端届的 `JS` 兼容问题，一定程度上已经成为了前端生态的基石。了解 `babel` 为何出现、做了什么、怎么做的可以帮助我们更好的了解自己的程序是如何运行的。
