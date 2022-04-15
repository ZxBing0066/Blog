---
tags: [javascript, module]
date: 2020-06-18
---

# 前端模块简史 - CJS & \*MD & ES Modules & SystemJS & Webpack

> 最近这些年前端发展速度迅猛，而前端的模块化方案也在不断的更新，这里记录整理下工作 8 年所了解的一些关于前端模块化的知识，顺便 “考下古” ，由于涉及的内容较多不是每个都很了解，只能尽量保证输出内容的准确性。

配合 demo [ FE-module-examples](https://github.com/ZxBing0066/fe-module-examples) 食用更佳

## 文件模块

在没有前端模块化规范前，我们通过抽离公共逻辑放到公共代码中，而后在不同的页面中直接引用想要的文件来实现代码模块化和模块共享。

page1.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Demo</title>
        <script src="https://code.jquery.com/jquery-1.1.1.js"></script>
        <script src="/header.js"></script>
        <script src="/footer.js"></script>
        <script src="/menu.js"></script>
        <script src="/page1.js"></script>
    </head>
    <body></body>
</html>
```

page2.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Demo</title>
        <script src="https://code.jquery.com/jquery-1.1.1.js"></script>
        <script src="/header.js"></script>
        <script src="/footer.js"></script>
        <script src="/menu.js"></script>
        <script src="/page2.js"></script>
    </head>
    <body></body>
</html>
```

模块的定义方式也在不断的进化

### 全局变量

早期的会将变量都暴露在全局，这样方便调用但是却会严重污染全局变量。

header.js

```js
window.login = function() {
    ...
}
window.logout = function() {
    ...
}
```

main.js

```js
window.login();
```

### 命名空间

而后出现了使用命名空间来减少对全局作用域的影响，但是由于代码都在全局作用域执行很容易造成意外的污染。

header.js

```js
var header = window.header = {};
header.login = function() {
    ...
}
header.logout = function() {
    ...
}
```

main.js

```js
window.header.login();
```

### IIFE 包裹

然后大家开始使用 IIFE（自执行/立即执行函数）通过函数作用域包裹代码，进一步减少对全局作用域的污染。

header.js

```js
window.header = (function () {
    return {
        login: function () {},
        logout: function () {}
    };
})();
```

main.js

```js
window.header.login();
```

## 模块系统

随着时间的推移，社区开始出现各种模块系统。

### CommonJS（以下称 CJS）

最先是 CJS，早期叫 ServerJS，推出 Modules/1.0 规范后在 nodejs 逐渐发展为内置模块系统。CJS 通过 require 和 module 来导入和导出模块。

a.js

```js
module.exports = function (log) {
    console.log(log);
};
```

demo.js

```js
var a = require('./a');
a('test');
```

其实现基于 IIFE，CJS 模块在 nodejs 中被函数包裹

```js
(function (exports, require, module, __filename, __dirname) {
    module.exports = function (log) {
        console.log(log);
    };
});
```

从而实现模块的隔离与定义。

### AMD

而由于 CJS 不适用于浏览器，AMD 规范由于各种原因从 CJS 阵营分离出来，自成一家，代表作就是 require.js。

a.js

```js
define(function () {
    return {
        log: function (log) {
            console.log(log);
        }
    };
});
```

b.js

```js
define(['a'], function (a) {
    return {
        loga: a.log,
        logb: function (log) {
            console.log(log);
        }
    };
});
```

main.js

```js
require(['a', 'b'], function (a, b) {
    a.log('a');
    b.logb('b');
    b.logb('b');
});
```

```!
require.js 虽然被广泛支持，但是有些库为了兼容某些使用情况，会注入到全局变量，如 lodash。
```

### CMD

然而 AMD 与 CJS 存在一些差异导致一些人的不认可。

CJS

```js
// 只有当 require 模块时，CJS 才会加载模块，并执行
var a = reuqire('js');
```

AMD

```js
define(['a'], function (a) {
    // 在这里哪怕没有用到 a 模块，a 模块的代码也已经下载并执行完成
});
```

由于浏览器的限制，要做到和 CJS 一样同步下载并执行没有办法（其实有办法，不过不太好）于是国内大牛玉伯，开发了 sea.js 并推广了 CMD 规范。 sea.js 与 require.js 最大的不同，就是关于模块的执行时机。

CMD

```js
define(function (require) {
    // 这里 a 模块虽然下载完成，但是它的 factory 并没有执行
    var a = require('a'); // 当 a 模块被首次 require 时，它的 factory 才开始执行
});
```

```!
这里很多人对 CMD 有误解，以为 CMD 是懒加载，其实 CMD 不是懒加载，而是懒执行。由于浏览器的限制，其实这种语法是无法实现懒加载的。
```

不过随着 require.js 的更新，在之后的 require.js 也实现了懒执行，并且在支持了 CJS 的模块（伪支持）。

具体的关于 AMD、CMD 标准之争的历史想考古的同学可以看这里： [前端模块化开发那点历史](https://github.com/seajs/seajs/issues/588)

### UMD

随着模块标准越来越多，对一些类库出现了困扰，类库为了兼容各模块系统，又出现了 UMD 规范，标准的 UMD 主要兼容了 CJS、AMD 以及全局变量三种模块方式。

```js
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? factory(exports, require('react'))
        : typeof define === 'function' && define.amd
        ? define(['exports', 'dep'], factory)
        : ((global = global || self), factory((global.module = {}), global.dep));
})(this, function (exports, dep) {
    // code
});
```

通过判断所在环境，可以让类库适配各种模块系统。

UMD 中也可以添加 CMD 的支持，不过由于前端的发展，CMD 已经逐渐被退出舞台。

### ES Modules

而随着 ES 标准的更新，逐渐出现了原生的模块化语法 ES Modules。

import 支持两种语法

#### 静态声明 import 'module'

首先是作为静态声明

b.js

```js
import a from 'a';
const b = {};
export default b;
```

静态声明的 import 类似于 CJS 的 require，但是也存在不同之处：

1. import 必须在顶部声明，不得包裹在块或函数中
2. import 导入的引用为 live bindings（活引用），即在原引用变更时，import 的引用也会变更
3. import 是将模块按需导入的，而 require 是整个导入文件中所有导出的内容

live bindings 可以认为是目前为止 JS 中第一次出现按引用传递。

```!
live bindings 虽然在 webpack 中有实现（通过合并模块或将引用修改为模块的属性），但是使用 babel 直接转义代码时，import 会等价于 require，所以使用中需要注意，并且如果是从在 lib 中导出，在其它 lib 中使用时，webpack 也是没办法的
```

a.js

```js
let v = 1;
export { v };

setInterval(() => {
    console.log(`v updated`, ++v);
}, 1000);
```

main.js

```js
import { v } from './a.js';

setInterval(() => {
    console.log(v);
}, 1000);
```

#### 动态导入 import('module')

同时 import 也支持动态导入模块

dep1.js

```js
console.log('dep1 ready to run');
export default {
    log: (...args) => console.log('this is dep1', ...args)
};
```

dep2.js

```js
console.log('dep2 ready to run');
export default {
    log: (...args) => console.log('this is dep2', ...args)
};
```

main.js

```js
(async () => {
    const [dep1, dep2] = await Promise.all([import('./dep1.js'), import('./dep2.js')]);
    console.log(dep1, dep2);
})();
```

配合 await 可以方便的异步导入模块（真懒加载和懒执行），不过从总体速度上会比前置批量加载更影响速度，当然可以通过头部提前导入来优化。注意这里返回值是模块对象，不是 export default 的值（此处返回值类似 require('module') 的值）。

### SystemJS

除了上述的模块加载器，还有 SystemJS，在国内好像不是太常见，但是作为 Angular2 的推荐选项，国外用的还是比较多。

SystemJS 模块的定义

```js
System.register(['react', 'react-dom'], function (_export, _context) {
    'use strict';
    var React, ReactDOM;
    return {
        setters: [
            function (_react) {
                React = _react.default;
            },
            function (_reactDom) {
                ReactDOM = _reactDom.default;
            }
        ],
        execute: function () {
            ReactDOM.render(
                React.createElement('button', null, 'A button created by React'),
                document.getElementById('react-root')
            );
            System.register([], function (_export, _context) {
                _export('foo', { name: 'foo' });
            });
        }
    };
});
```

SystemJS 可以通过各种插件，实现对 AMD、UMD 的加载，并且借助运行时编译器，可以实现对 ES Modules 和 CJS 模块的直接加载，不过官方也不建议用在生产环境，会影响到页面的性能，但作为玩具时还是很方便。

## 模块打包

除了通过上述的模块管理系统，还有很多在编译时进行模块化管理的工具，如 webpack。

### webpack

#### CJS

先看下 webpack 将 CJS 代码进行打包的结果

源码

cjs.js

```js
const { v } = require('./cjsDep');

setInterval(() => {
    console.log(v);
}, 1000);
```

```js
let v = 1;

setInterval(() => {
    v++;
}, 1000);

module.exports = { v };
```

webpack 打包后的模块部分代码

```js
webpackModuleFactory([
    function (e, t, n) {
        const { v: r } = n(1);
        setInterval(() => {
            console.log(r);
        }, 1e3);
    },
    function (e, t) {
        let n = 1;
        setInterval(() => {
            n++;
        }, 1e3),
            (e.exports = { v: n });
    }
]);
```

源码中开发之使用 CJS 或者 ES Modules 的语法进行编写，打包时 webpack 将每个模块包裹到 function 中进行隔离，然后用模块的数组（也可能是对象） id 进行模块标识，在使用时执行模块函数返回模块值

#### ES Modules

再看下 ES Modules 代码打出来的包：

源码

es.js

```js
import { v } from './esDep';

setInterval(() => {
    console.log(v);
}, 1000);
```

esDep.js

```js
let v = 1;

setInterval(() => {
    v++;
}, 1000);

export { v };
```

webpack 打包后的模块部分代码

```js
webpackModuleFactory({
    2: function (e, t, r) {
        'use strict';
        r.r(t);
        let n = 1;
        setInterval(() => {
            n++;
        }, 1e3),
            setInterval(() => {
                console.log(n);
            }, 1e3);
    }
});
```

为了实现 live bindings，webpack 将 dep 和 es 打包到了一起。

而当 dep 被其它 entry 共享时，webpack 将会把 dep 的输出打包成模块，而将 import 的变量转换为模块对象的属性，以此来实现 live bindings。

```js
webpackModuleFactory([
    function (e, t, r) {
        'use strict';
        r.r(t),
            r.d(t, 'v', function () {
                return n;
            }),
            console.log(123);
        let n = 1;
        setInterval(() => {
            n++;
        }, 1e3);
    },
    function (e, t, r) {
        'use strict';
        r.r(t);
        var n = r(0);
        setInterval(() => {
            console.log(n.v);
        }, 1e3);
    }
]);
```

同时 webpack 也支持动态 import 和动态 require 语法，原理是分包后通过 webpackJsonp 来加载模块文件。

webpack 5 中出现的 [Module Federation](https://webpack.js.org/concepts/module-federation/#root) 也弥补了 webpack 原先跨项目模块引用的缺陷。可以预见 ModuleConcatenation 会对大型前端项目、前端微服务的玩法带来一定的变化。

## 总结

虽然大部分开发者现在都转到 webpack 阵营，但是一些浏览器端的模块加载器还是有它的使用场景，比如多项目间的模块共享，使用一些公共 CDN 的模块等，所以 require.js、SystemJS 等模块化管理工具还是有用武之地，并且随着 http 2.0 的普及，模块分包越来越细。也许不久的将来还会有其它的模块化方案出现。

其实还有很多其它的模块化方案，比如 angularjs 的依赖注入等，由于不是太熟悉这里就不再多说。

## 最后

-   本文涉及的 demo 代码整理在这里 [FE-module-examples](https://github.com/ZxBing0066/fe-module-examples)

> 如果有用欢迎点赞，如果有误欢迎留言
