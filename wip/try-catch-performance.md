# try catch 代码性能测试

```js
(() => {
    const a = 1,
        b = 2,
        c = 3;
    const f = i => {
        const v = a + b + c + i;
    };
    const count = 100000;

    console.time('without try-catch');
    new Array(count).fill(null).forEach((v, i) => {
        f(i);
    });
    console.timeEnd('without try-catch');

    console.time('with try-catch');
    try {
        new Array(count).fill(null).forEach((v, i) => {
            f(i);
        });
    } catch (error) {}
    console.timeEnd('with try-catch');

    console.time('with inner try-catch');
    new Array(count).fill(null).forEach((v, i) => {
        try {
            f(i);
        } catch (error) {}
    });
    console.timeEnd('with inner try-catch');
})();
```
