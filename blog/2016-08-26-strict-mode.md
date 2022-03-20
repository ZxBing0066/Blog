---
date: 2016-08-26 18:08:18
tags: [javascript]
---

# Javascript 严格模式

> 严格模式是在 ES5 中新增的指令,他不是一个声明,而是一个字面表达式,这样在老版本的浏览器中会被忽视而不至于会引起错误.

### 兼容版本

| IE  | Chrome | Firefox | Safari | Opera |
| --- | ------ | ------- | ------ | ----- |
| 10+ | 13+    | 4+      | 5.1+   | 12+   |

### 宣告严格模式

```js
'use strict';
x = 3.14; // 进入严格模式这里会报错
```

严格模式需要在一段脚本或者函数的开头宣告才能被识别,在脚本开头这个脚本中的代码都将以严格模式执行,函数开头宣告则只有这个函
数中的代码会进入严格模式.(类似 javascript 的函数作用域)

```js
x = 3.14; // 这里不会报错,因为不是严格模式
myFunction();

function myFunction() {
    'use strict';
    y = 3.14; // 这里是严格模式会报错
}
```

### 严格模式中不允许的代码

-   变量未声明不可使用

    ```js
    'use strict';
    x = 3.14; // x未声明所以报错
    ```

-   不可删除变量和函数

    ```js
    'use strict';
    var x = 3.14;
    delete x; // 变量无法删除报错
    ```

    ```js
    'use strict';
    function x() {}
    delete x; // 函数无法删除报错
    ```

-   不允许定义重复的形参

    ```js
    'use strict';
    function x(p1, p1) {} // 形参重复报错
    ```

-   不支持八进制数字字面表达式

    ```js
    'use strict';
    var x = 010; // 字面量八进制数报错
    ```

-   不允许转义字符

    ```js
    "use strict";
    var x = \010;  // 转义字符报错
    ```

-   不允许写只读属性

    ```js
    'use strict';
    var obj = {};
    Object.defineProperty(obj, 'x', { value: 0, writable: false });

    obj.x = 3.14; // 只读不可写,报错
    ```

-   不允许写只能 get 的属性

    ```js
    'use strict';
    var obj = {
        get x() {
            return 0;
        }
    };

    obj.x = 3.14; // x属性之定义了getter,没有setter,报错
    ```

-   不允许删除一个不可删属性

    ```js
    'use strict';
    delete Object.prototype; // prototype不可删,报错
    ```

-   eval 字符串不能作为变量名

    ```js
    'use strict';
    var eval = 3.14; // eval不可定义为变量,报错
    ```

-   不能定义 arguments 变量

    ```js
    'use strict';
    var arguments = 3.14; // 不能定义arguments变量,报错
    ```

-   不可使用 with

    ```js
    'use strict';
    with (Math) {
        x = cos(2);
    } // 不可使用with,报错
    ```

-   出于安全原因考虑,eval 语句不允许创建变量

    ```js
    'use strict';
    eval('var x = 2');
    alert(x); // 报错,未定义
    ```

-   在严格模式的函数中的 this 将会变为 undefined 而不是 window 或者其他全局对象

    ```js
    'use strict';
    function a() {
        console.log(this);
    }
    a(); // undefined
    ```

-   前瞻性考虑

    严格模式中一些将来可能用到的新增关键字将不允许使用:

    -   implements
    -   interface
    -   let
    -   package
    -   private
    -   protected
    -   public
    -   static
    -   yield

### 注意事项

"use strict"必须在脚本或者函数的最上方定义,不然浏览器将不会解析为严格模式.

### 参考文献地址

[w3schools](http://www.w3schools.com/js/js_strict.asp)
