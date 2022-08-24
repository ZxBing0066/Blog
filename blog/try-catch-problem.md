# 朋友，进来刷点 try-catch 看看你能全对吗（答应我，请务必看到最后 🫣）

随着这几年前端的高速发展，前端逻辑的复杂度越来越高，质量要求越来越高，再加上 `async`、`await` 的横行，`try-catch` 在前端的使用率越来越高。然而 `try-catch` 中可能隐藏着一些不为人知的小秘密㊙️，今天一起通过几道小题目看看这些秘密㊙️。

## 第一题

```js
try {
    throw new Error('test');
} catch () {
    console.error('error');
}
```

先看第一道，可以试着猜猜执行结果是什么。

---

答案是：上述代码将会因为语法错误而报错。

因为 `catch` 中的 `error` 是不能省略的，为固定语法。说实在的我自己写了这么久的 `try-catch` 一直没注意过这点，都是按照固定的模版来编写一直将 `catch` 中的 `error` 当作形参来理解，直到有一天心血来潮。🤦‍♂️

同样的，下面的代码也会报语法错误。

```js
try {
    throw new Error('test');
} catch (e, info) {
    console.error('error');
}
```

## 第二题

```js
try {
    try {
        throw new Error('test');
    } finally {
        console.log('finally');
    }
} catch (error) {
    console.error('catch');
}
```

再看看第二道，猜猜代码将会怎么执行。

---

答案是：会打印出 `finally` 和 `catch`。`try-catch` 中的 `catch` 块是可以被省略的，但是此时由于没有 `catch` 块会导致错误继续沿着调用栈向上抛出，然后被外层的 `try-catch` 捕获。

## 第三题

```js
try {
    setTimeout(() => {
        throw new Error('test');
    }, 0);
} catch (e) {
    console.error('error');
}
```

看看第三题，猜猜运行结果是什么。

---

这里的错误将无法被捕获，`try-catch` 只能捕获到当前调用栈中的错误，而 `setTimeout` 作为一个宏任务将会脱离外层 `try-catch` 调用栈运行，导致无法被外层 `try-catch` 所捕获。

如果需要处理这种错误需要在 `setTimeout` 内部去捕获。也可以直接在 `windows` 上监听 `onError` 来做处理。

## 第四道

```js
const throwError = async () => {
    throw new Error('test');
};
(async () => {
    try {
        await throwError();
    } catch (e) {
        console.log('catch');
    }
})();
```

看完第三题，我们再看看使用 `try-catch` 捕获 `await` 会发生什么。

---

注意，这里的 `try-catch` 是可以正确捕获到错误的。`async-await` 不止是写法和同步代码一样，它的调用栈同样类似于同步代码。并且在转译器中，`async-await` 会被转换为 `Promise`，而外层的 `try-catch` 将会被转换为 `Promise.catch`。上述代码将会等效于：

```js
const throwError = () => {
    return Promise.resolve().then(function () {
        throw new Error('test');
    });
};

(() => {
    return Promise.resolve()
        .then(function () {
            return Promise.resolve()
                .then(function () {
                    return throwError();
                })
                .catch(function (e) {
                    console.log('catch');
                });
        })
        .then(function () {});
})();
```

## 第五题

```js
console.log(
    (() => {
        try {
            return 'try';
        } catch (e) {
            return 'catch';
        } finally {
            return 'finally';
        }
    })()
);
```

```js
console.log(
    (() => {
        try {
            throw new Error('test');
        } catch (e) {
            return 'catch';
        } finally {
            return 'finally';
        }
    })()
);
```

看看这最后一道题目，猜一猜他们会怎样运行。

---

答案是：都会打印出 `finally`。

`finally` 在 `try-catch` 中经常会用到，比如请求接口无论报错与否都需要隐藏 `loading` 之类的需求，可以减少 `try-catch` 中的重复代码。

然而在使用时很少有人知道 `finally` 运行顺序是什么，一般都会直觉的认为先运行 `try` 的代码块，如果报错则进入 `catch` 块运行，最后运行 `finally` 块。在一般情况下上述的理解其实没什么毛病，但是在你想要跳出代码块时：如 `try、catch` 中存在 `return、break` 等等语句时，`finally` 将会霸道的拦截跳出语句，至今进入 `finally` 块运行，这就导致如果你在 `try` 或 `catch` 中存在跳出语句，而在 `finally` 中同样存在跳出语句，那你的 `try、catch` 块中的跳出语句将永远无法运行。

## 总结

`try-catch` 语法虽然就那么几句，却因为其特殊性存在着一些让人不得而知的小秘密㊙️。前四道都是比较容易暴露的问题，而 `finally` 的问题则是很多人容易忽略的，所以使用时请务必注意。当然你也可以直接使用 `eslint`，`eslint` 中就存在 `no-unsafe-finally` 规则检测可能存在风险的 `finally` 跳出语句 🐶。
