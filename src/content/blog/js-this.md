---
title: JS 中的 this
pubDate: '2022-08-18'
tags:
    - javascript
---

# JS 中的 this

经常在群里看到一些初学前端的兄弟对 `this` 一知半解，其实 `js` 中的 `this` 真的不算难理解，`this` 本身是一个面向对象编程中的概念，指的就是调用方法的对象。

想看结论的可以直接看最后总结。

个人总结可以用一句话概括就是：`this` 指向着方法的调用者。

只需要关注 `this` 所在的函数体是如何被调用的即可判定（箭头函数除外）。

当然还有一些特殊情况，如箭头函数、构造函数等，不过这些场景下都很好理解。

下面我们分几种调用情况来具体说下。

-   函数调用
-   方法调用
-   构造函数调用
-   间接/绑定调用
-   箭头函数

最后还有一类比较特殊的情况：事件调用。

## 区分方法和函数

一般对于 `this` 的困惑都是都是出现在作为方法/普通函数调用时。首先需要分清方法调用和函数调用的区别。当函数被作为一个对象的属性调用时，我们称其为方法调用。

注意，方法是一种特殊的函数，但本文中的函数仅指代普通函数。

举例说明一下：

```js
const foo = {
    bar: function () {
        console.log(this);
    }
};
```

如果调用 `foo.bar()`，则此时 `bar` 作为 `foo` 的方法来调用。而如果如下将 `bar` 抽离出来单独调用，则 `bar` 作为函数调用来考虑。

```js
const bar = foo.bar;

foo.bar(); // 此处为方法调用
bar(); // 此处为函数调用
```

## 函数调用

在函数调用中，`this` 指向和在全局执行环境中的代码执行时 `this` 是一样的，都是 `window` 对象，在 `node` 中则为 `global` 对象。还有个例外情况，就是严格模式下（很多打包工具会将你的代码打包成严格模式代码），`this` 为 `undefined`。不过鉴于各种原因，我们都不应该在函数调用中使用 `this`。

```html
<script type="text/javascript">
    console.log(this); // window
</script>
```

以下是常见的函数调用的例子：

```js
function foo() {
    console.log(this);
}
foo();
```

```js
const foo = {
    bar: function () {
        console.log(this);
    }
};
const bar = foo.bar();

bar();
```

```jsx
class Demo extends React.Component {
    foo() {
        console.log(this);
    }
    render() {
        return <button onClick={this.foo}> Click Me </button>;
    }
}
```

## 方法调用

作为方法调用时，`this` 指向调用该方法的对象，这里比较容易有疑惑的是多层嵌套的情况：`a.b.c.d()`，其实只需要看该方法被谁调用即可，即方法所属的对象，上面的 `d` 方法则属于 `a.b.c` 对象。

```js
a.b(); // a
a.b.c(); // a.b
a.b.c.d(); // a.b.c
a.b.c['d'](); // a.b.c
```

## 构造函数调用

当一个函数被作为构造函数调用时，很好理解，`this` 指向创建出来的实例化对象。

```js
function Foo() {
    this.a = 1;
}
const foo = new Foo(); // foo: {a: 1}
```

```js
class Foo {
    constructor() {
        this.a = 1;
    }
}
const foo = new Foo(); // foo: {a: 1}
```

## 间接调用/绑定调用

此处的间接调用指代使用 `call`、`apply` 来调用函数的情况，同样很好理解，`call` 和 `apply` 时 `this` 指向着 `call` 和 `apply` 指定的 `context` 对象。而 `bind` 后返回的函数调用的 `this` 则是指向 `bind` 时绑定的 `context` 对象。

无论是 `call`、`apply`、`bind` 都可以认为是在提供的 `context` 上挂载该函数后调用的情况，很多模拟 `call`、`apply`、`bind` 的方法同样适用该操作来模拟。

```js
function foo() {
    console.log(this);
}
const bar = { a: 1 };

const bind = (context, func) => {
    return function () {
        const bindSymbol = Symbol('bind');
        context[bindSymbol] = func;
        context[bindSymbol](...arguments);
        delete context[bindSymbol];
    };
};

const fooAfterBind = bind(bar, foo);

fooAfterBind(); // bar
```

## 箭头函数

不同于其它函数调用时的 `this`，箭头函数的 `this` 上下文在其定义时就被绑定了而非在调用时。所以如果 `this` 所在的函数体为箭头函数时，`this` 指向的是其定义时的上下文。

常见的情况包括：

```js
const obj = {
    i: 10,
    b: () => console.log(this)
};
obj.b(); // window
```

此处 `b` 在 `obj` 字面量中定义，定义时此段代码中的 `this` 上下文按照上面的定义为 `window`，所以箭头函数中的 `this` 上下文将绑定该上下文。

```js
class C {
    a = 1;
    autoBoundMethod = () => {
        console.log(this.a);
    };
}

const c = new C();
c.autoBoundMethod(); // 1
```

在类中的箭头函数，可能会令人比较疑惑，其实在这里，`autoBoundMethod` 是在其实例化时才创建的，此时才会定义箭头函数，可以将该代码转换为普通代码来理解：

```js
function C() {
    this.a = 1;
    this.autoBoundMethod = () => {
        console.log(this.a);
    };
}
```

## DOM 事件调用

注意，`DOM` 事件调用较为特殊，因为其中的函数是由浏览器调用，而非开发者主动调用。

在原生 `JS` 的事件处理中，`this` 都会指向该事件监听的绑定元素。

```html
<button id="btn">Click Me</button>

<script>
    const btn = document.getElementById('btn');
    btn.addEventListener('click', function () {
        console.log(this);
    });
</script>
```

```html
<button id="btn">Click Me</button>

<script>
    const btn = document.getElementById('btn');
    btn.onclick = function () {
        console.log(this);
    };
</script>
```

如上，无论是 `addEventListener` 还是直接使用 `onclick`，`this` 都指向着 `btn` 的 `DOM` 对象。因为此处调用由浏览器来执行，可以认为浏览器在执行时执行了 `bind`。

当然，如果是 `html` 中直接绑定事件的话，依旧符合我们上面总结的几条规律。

```html
<!-- 此处点击打印 window -->
<button id="btn" onclick="bar()">Click Me</button>
<script>
    const foo = {
        bar() {
            console.log(this);
        }
    };
    const bar = foo.bar;
</script>
```

```html
<!-- 此处点击打印 foo -->
<button id="btn" onclick="foo.bar()">Click Me</button>
<script>
    const foo = {
        bar() {
            console.log(this);
        }
    };
</script>
```

## 总结

下面总结下 `this` 的指向。

`this` 的指向和他所在的函数体相关，下面称为 `this` 函数体：

1. `this` 函数体如果为箭头函数，则 `this` 指向该箭头函数所定义时的 `this` 上下文。
2. `this` 函数体被调用时如果为 `call`、`apply`、`bind` 等间接调用方式，则指向对应的方式所指定的 `this` 上下文。
3. `this` 函数体被调用时如果是被浏览器事件等调用，则指向该事件所绑定的元素。
4. `this` 函数体如果作为方法被调用则指向该方法所属的对象。
5. 否则 `this` 指向 `window/global` 或 `undefined`。

所以除了箭头函数中的 `this` 上下文和函数体定义时的上下文相关，其它的情况直接看 `this` 函数体时如何被调用的即可判定。
