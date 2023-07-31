---
tags: [javascript, sandbox]
date: 2019-10-25
---

# 动手实现一个 JavaScript 沙箱

> 沙箱的存在不只是为了安全问题，也是为了解决一些隔离性的问题，这里只考虑隔离性问题，不考虑恶意注入。要为了安全隔离恶意代码的话，请使用 iframe 之类的方案解决。

## 前言

这几天项目中有涉及到各项目间代码隔离的内容，所以针对`JS`中的沙箱实现做了一些尝试，基本实现了正常代码间的运行隔离，这里记录一下实现过程。

想看下最终效果的可以直接看下方 [举个 🌰](#举个-🌰)

## 动手

### 代码执行

要实现沙箱，首先，得让一段代码受控的跑起来，代码得转成字符串，然后使用字符串调用代码。

这里很容易就想到了 eval 和 Function。

```js
const exec1 = code => eval(code);

const geval = eval;
const exec2 = code => geval(code);

const exec3 = code => {
    'use strict';
    eval(code);
};

const exec4 = code => {
    'use strict';
    geval(code);
};

const exec5 = code => Function(code)();
```

总共有上述 5 中方式可以实现代码的运行：

-   eval 会影响调用的上下文
-   geval 不会影响上下文，但是会直接在全局作用域下执行，变量等会挂到全局
-   严格 eval 可以读写上下文的变量，但是不能新增，代码执行为严格模式
-   严格 geval 同上，但是在全局作用域下执行
-   Function 相当于在全局作用域下创建一个匿名函数执行

geval 可以看最下方知识点。我们选择 Function 来实现（eval 也可以实现，稍微麻烦一点，`Function('code')();` 基本等价于 `const geval = eval; geval('function() {"code"})()');`），

### 初版实现

```js
const global = this;
(function () {
    let outterVariable = 'outter';
    const createSandbox = () => {
        return code => {
            Function(`
                ;${code};
            `)();
        };
    };
    const sandbox = createSandbox();
    sandbox(`
        var a = 1;
        var b = 2;
        // 期待打出 1 2
        console.log(a, b);
        outterVariable = 'sandbox';
        console.log(outterVariable);
    `);
    try {
        console.log(a, 'fail');
    } catch (e) {
        console.log('success');
    }
    try {
        console.log(b, 'fail');
    } catch (b) {
        console.log('success');
    }
    console.log(outterVariable);
})();
console.log(outterVariable);
```

除了全局变量的问题，貌似一切 OK，再想想怎么解决全局变量这个大麻烦

![](https://stg.heyfe.org/images/emot-dydx.jpg)

改变代码的作用域，除了 eval、Function 就只能想到 with 了，不过 with 的功能是将给定的表达式挂到作用域的顶端，全局变量好像不太行？等等，那试试 Proxy 呢。

### 进阶实现

```js
const global = this;
(function () {
    let outterVariable = 'outter';
    const createSandbox = () => {
        const context = {};
        const proxy = new Proxy(context, {
            set: (obj, prop, value) => {
                console.log(prop);
                obj[prop] = value;
            },
            get: (obj, prop) => {
                if (prop in obj) return obj[prop];
                return undefined;
            },
            has: (obj, prop) => {
                return true;
            }
        });
        return code => {
            Function(
                'proxy',
                `
                with(proxy) {
                    ;${code};
                }
            `
            )(proxy);
        };
    };
    const sandbox = createSandbox();
    sandbox(`
        var a = 1;
        var b = 2;
        // 期待打出 1 2
        console.log(a, b);
        outterVariable = 'sandbox';
        console.log(outterVariable);
    `);
    try {
        console.log(a, 'fail');
    } catch (e) {
        console.log('success');
    }
    try {
        console.log(b, 'fail');
    } catch (b) {
        console.log('success');
    }
    console.log(outterVariable);
})();
console.log(outterVariable);
```

通过 with 改变作用域链，以及 Proxy 的 has 阻断变量的查询，就能将对变量的访问锁死在沙盒环境中。然而，报错了。

![当场去世](https://stg.heyfe.org/images/emot-qnqs.jpg)

由于阻断了变量的查询，全局对象上的正常属性也都无法访问了，这就不妙了。如何在阻断后还能访问到全局变量呢，把我们上面的 context 里塞上 window 的属性就好啦。当然不能一个个复制，这时候我们可以直接使用继承，这样不止能访问到全局，还能让对全局对象的修改只影响到 context 而不影响 window，可喜可贺 可喜可贺。

```js
const global = this;
(function () {
    let outterVariable = 'outter';
    const createSandbox = () => {
        const context = Object.create(global);
        const proxy = new Proxy(context, {
            set: (obj, prop, value) => {
                obj[prop] = value;
            },
            get: (obj, prop) => {
                return obj[prop];
            },
            has: () => {
                return true;
            }
        });
        return code => {
            Function(
                'proxy',
                `
                with(proxy) {
                    ;${code};
                }
            `
            )(proxy);
        };
    };
    const sandbox = createSandbox();
    sandbox(`
        var a = 1;
        var b = 2;
        // 期待打出 1 2
        console.log(a, b);
        outterVariable = 'sandbox';
        console.log(outterVariable);
    `);
    try {
        console.log(a, 'fail');
    } catch (e) {
        console.log('success');
    }
    try {
        console.log(b, 'fail');
    } catch (b) {
        console.log('success');
    }
    console.log(outterVariable);
})();
console.log('outterVariable' in global);
```

貌似离成功不远了，全局变量的访问通过原型链完成，变量的隔离通过 with 和 Proxy 的 has 属性锁死在 context 中，不过还有些问题：

1. 可以直接通过 window、self、this、globalThis 来访问全局变量，并影响全局属性
2. 通过拿到一些全局属性的引用后可以篡改全局属性的值
3. Function('return this') function(){return this} 和 eval('this') 可以拿到真实的 window

第一个点比较好解决，访问这些属性时直接返回 proxy 就行了，this 可以通过将 Function bind proxy 解决第二个就比较麻烦了，由于全局变量很多都是引用类型，要解决除非一层层深克隆（要处理各种奇怪问题），或者一层层代理（也会出现各种各样的问题），所以放弃了，毕竟篡改全局变量不是什么好代码，一般场景下也很少出现这样的代码，不过我们可以通过白名单或者黑名单的方式，让沙盒中的代码只能访问必要的全局变量，防止重要的全局变量被篡改

![我能怎么办](https://stg.heyfe.org/images/emot-wxwm.jpg)

第三个也很麻烦，Function 和间接 eval 是直接在全局下执行的，实在想解决的话，Function 和 eval 可以通过抛出自定义的 eval 和 Function 来实现，而 function 的话可以通过启用沙箱的严格模式来实现

然而还是可以绕过，比如使用 (function(){}).constructor

![](https://stg.heyfe.org/images/emot-sbz.jpg)

### 最终实现

考虑到各种上述的各种实现上的问题，以及还有很多因为篡改了 window 导致的方法错误的问题，改版后的最终实现看这里：https://github.com/ZxBing0066/z-sandbox

## 使用场景

上面可以看出来，在面对恶意代码时，使用 JavaScript 本身去实现的沙箱是无法绝对安全的（甚至没考虑防注入），不过这个不是很安全的沙箱也有它的使用场景，比如面对内部代码虽然安全，但是又不可控的全局变量可能会导致代码间互相影响而导致 crash 的，比如需要在同一个页面运行多个版本库的（正常会相互冲突）

## 举个 🌰

想看 DEMO 效果的可以直接看这里： [![Edit quirky-microservice-8oqog](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/quirky-microservice-8oqog?fontsize=14&hidenavigation=1&theme=dark)

效果基本如期，其中还有一些比较细节实现，有兴趣的可以关注下最终实现库，源码不到 100 行 [![](https://stg.heyfe.org/images/github-star.jpg)](https://github.com/ZxBing0066/z-sandbox)

通过下面的代码我们可以很方便的将 React15 和 16 跑在一起，而不需要担心它们互相干扰。

```js
import './styles.css';
import { createSandbox } from 'z-sandbox';
import axios from 'axios';

document.getElementById('app').innerHTML = `
<div id='container1'>
</div>
<div id='container2'>
</div>
`;

(function () {
    console.log(window.screen);
    const sandbox15 = createSandbox({}, { useStrict: true });
    const sandbox16 = createSandbox({}, { useStrict: true });

    const getReactCode15 = () =>
        axios.get('https://unpkg.com/react@15.6.2/dist/react-with-addons.js').then(res => res.data);
    const getReactCode16 = () =>
        axios.get('https://unpkg.com/react@16.11.0/umd/react.development.js').then(res => res.data);
    const getReactDOMCode15 = () =>
        axios.get('https://unpkg.com/react-dom@15.6.2/dist/react-dom.js').then(res => res.data);
    const getReactDOMCode16 = () =>
        axios.get('https://unpkg.com/react-dom@16.11.0/umd/react-dom.development.js').then(res => res.data);
    Promise.all([getReactCode15(), getReactCode16(), getReactDOMCode15(), getReactDOMCode16()]).then(
        ([reactCode15, reactCode16, reactDOMCode15, reactDOMCode16]) => {
            console.log(reactCode15.length, reactCode16.length, reactDOMCode15.length, reactDOMCode16.length);
            sandbox15(`
      console.log(Object.prototype)
    `);
            sandbox15(reactCode15);
            sandbox15(reactDOMCode15);
            sandbox16(reactCode16);
            sandbox16(reactDOMCode16);
            sandbox15(`
    ReactDOM.render(React.createElement('div', {
      onClick: () => alert('I am a component using React' + React.version)
    }, 'Hello world, try to click me'), document.getElementById('container1'))
    `);
            sandbox16(`
      ReactDOM.render(React.createElement('div', {
        onClick: () => alert('I am a component using React' + React.version)
      }, 'Hello world, try to click me'), document.getElementById('container2'))
    `);

            console.log(sandbox15.context.React.version);
            console.log(sandbox16.context.React.version);
        }
    );
})();
```

## 局限性

由于变量的拦截借助于最新的 Proxy API，存在兼容问题

## 扩展阅读

> If you use the eval function indirectly, by invoking it via a reference other than eval, as of ECMAScript 5 it works in the global scope rather than the local scope. This means, for instance, that function declarations create global functions, and that the code being evaluated doesn't have access to local variables within the scope where it's being called. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)

MDN 有描述，当 **间接调用** eval 时，将会在 **全局环境** 下执行而不会影响到作用域中的本地变量。所以一般也称为全局 eval

## 参考文献

[writing-a-javascript-framework-sandboxed-code-evaluation](https://blog.risingstack.com/writing-a-javascript-framework-sandboxed-code-evaluation/)
