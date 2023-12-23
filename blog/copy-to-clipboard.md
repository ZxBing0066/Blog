---
lastUpdate: 2023-7-9
date: 2022-8-10
tags: [开源, 源码解析]
---

# copy-to-clipboard 源码解析，隐藏的内容比想象的要多

本文针对的源码版本为：[193826f](https://github.com/sudodoki/copy-to-clipboard/tree/193826f9859923d4e83c35093f3c436be00a162b)

[copy-to-clipboard](https://github.com/sudodoki/copy-to-clipboard) 是一个 js 的剪切板库，可用来复制内容到剪切板，看源码后发现其中隐藏的内容着实不少，今天一起来解读下其源码。

## 使用方式

我们先看下使用方式：

```js
import copy from 'copy-to-clipboard';

copy('Text');

// Copy with options
copy('Text', {
    debug: true,
    message: 'Press #{key} to copy'
});
```

可以看到 API 非常简单。

该库只抛出一个 copy 函数，函数接口为：copy(text: string, options: object): boolean。

第一个参数为一个文本值为用来复制的内容。

options 包含 4 个参数：

-   debug - 是否开启调试模式，开启后会将复制信息打印到 console 中
-   message - 通过 prompt 模式兼容时的提示信息
-   format - 设置复制内容的 mime type
-   onCopy - 复制后的回调，接口为：function onCopy(clipboardData: object): void

## 源码解读

该库源码比较简单，其中使用到了一个依赖库：[toggle-selection](https://www.npmjs.com/package/toggle-selection)，作用是取消和恢复当前选中的文本的选中状态。

### 主体方案

先看看主体部分：

```js
reselectPrevious = deselectCurrent();

range = document.createRange();
selection = document.getSelection();

mark = document.createElement('span');
mark.textContent = text;

// ...
mark.addEventListener('copy', function (e) {
    // ...
});
document.body.appendChild(mark);

range.selectNodeContents(mark);
selection.addRange(range);

var successful = document.execCommand('copy');
if (!successful) {
    throw new Error('copy command was unsuccessful');
}
success = true;
```

这部分首先取消了当前页面中已有的选择状态，然后创建了一个 range，range 可用来包含文本或节点片段。随后通过 getSelection 获得了一个 Selection 对象，该对象包含当前用户选中的或鼠标所在的内容。

然后它创建了一个 span 元素，将要复制的内容设置为该元素的文本，然后通过各种样式设置等，主要是为了避免该元素被发现、被读取、无法复制等问题。随后它在该元素中添加了 copy 事件，将元素添加到 body，然后通过 range.selectNodeContents 和 selection.addRange 选中该元素，并通过 document.execCommand 调用 copy 命令即可将选中的内容进行复制。

下面再看一下 copy 事件的处理：

```js
e.stopPropagation();
if (options.format) {
    e.preventDefault();
    if (typeof e.clipboardData === 'undefined') {
        // IE 11
        debug && console.warn('unable to use e.clipboardData');
        debug && console.warn('trying IE specific stuff');
        window.clipboardData.clearData();
        var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting['default'];
        window.clipboardData.setData(format, text);
    } else {
        // all other browsers
        e.clipboardData.clearData();
        e.clipboardData.setData(options.format, text);
    }
}
if (options.onCopy) {
    e.preventDefault();
    options.onCopy(e.clipboardData);
}
```

主要是分两部分，一部分是当存在自定义 format 时会组织默认的复制行为，然后通过 clipboardData.setData 重新设置内容格式，其中包含一部分 IE 兼容的代码。第二部分则是调用 onCopy 回调，这里要注意，使用 onCopy 后它会阻止默认事件，此时你需要自己将内容设置到剪切板中。

### 兼容方案

在上述使用 execCommand 报错后，它会尝试使用 clipboardData 做第二次尝试，这个主要是针对 IE 所做的兼容：

```js
window.clipboardData.setData(options.format || 'text', text);
options.onCopy && options.onCopy(window.clipboardData);
success = true;
```

如果该方案依旧失败，则会降级到终极方案 - prompt：

```js
message = format('message' in options ? options.message : defaultMessage);
window.prompt(message, text);
```

其中 format 主要是为了让 prompt 框的提示信息中的 ctrl 在 mac 中替换为 command。

在老浏览器中 prompt 会弹出弹窗，内容区域显示要复制的信息，然后提示区域提示用户 ctrl+c 复制。

### 收尾

复制完成后，它会将之前的 selection、range 和 mark 进行清理，并通过 reselectPrevious 恢复之前的选择状态。

```js
if (selection) {
    if (typeof selection.removeRange == 'function') {
        selection.removeRange(range);
    } else {
        selection.removeAllRanges();
    }
}

if (mark) {
    document.body.removeChild(mark);
}
reselectPrevious();
```

## 兼容性

该库兼容几乎所有的主流浏览器版本，包括 IE，因为 execCommand 虽然被废弃，但是兼容性很高，然后它还使用了 clipboardData 做 IE 兼容，并且使用了 prompt 做降级方案。

不过文档中提示在一些老的 IOS 设备中，由于无法定制 prompt 内容，所以无法兼容。

## 总结

该库虽然源码很简短，但是用到了相当多平时编程中很少甚至不会用到的 API，如：

-   Range
-   Selection
-   execCommand
-   clipboardData
-   style.all
-   style.clip

不过代码依然有优化的空间，如大量引用 mark.style 处可创建引用、随处可见的 debug 可做成预处理函数、兼容方案中 onCopy 行为不一致等。
