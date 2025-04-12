---
title: MutationObserver - 监听你的 DOM 是否有变动
pubDate: '2022-10-08'
tags:
    - JavaScript
    - WebAPI
---

# MutationObserver - 监听你的 DOM 是否有变动

`MutationObserver` 可用来监视 `DOM` 的变化，算是一个比较老的 `API`，但是却鲜为人知，他的前身是 `MutationEvent`：一系列监听 `DOM` 变更的 `event` 事件 - `DOMAttrModified`、`DOMNodeInserted`、`DOMSubtreeModified` 等。

个人能想到的使用场景一个是监听 `DOM` 的变化，防止用户篡改 `DOM` 结构，比如可以在被篡改后直接 `document.write('请勿篡改')` 来避免用户篡改重要页面并进行截图作秀。又或者是使用 `contenteditable` 时监听内容变更，在富文本编辑器领域可能会有所应用。还可以监听一些浏览器插件修改 `DOM` 节点的行为。

## 用法

与其它 `Observer` 类似，使用 `MutationObserver` 首先需要实例化一个 `observer`，然后调用它的 `observe` 来监听目标元素：

```js
const observer = new MutationObserver((mutationList, observer) => {
    mutationList.forEach(mutation => {
        console.log(mutation);
    });
});
observer.observe(target, { attributes: true, childList: true, subtree: true });
```

这里 `observe` 一定要通过传入 `options` 明确传入需要监听的改动类型等参数，其中要 `childList`、`attributes`、`characterData` 至少一个为 `true`：

-   `childList`： 表明是否监听子元素的增删
-   `attributes`： 表明是否监听属性的变动
-   `attributesFilter`： 用来声明需要监听的属性名称，如果传入了则 `attributes` 默认为 `true`
-   `attributeOldValue`： 设置为 `true` 后可以在 `mutation` 信息中拿到 `attribute` 变动前的值
-   `characterData`： 表明是否需要监听字符数据的变化，可以理解为文本节点的变化，注意添加删除文本节点触发的是 `childList`，只有改的时候才会触发 `characterData` 变化
-   `characterDataOldValue`： 同 `attributeOldValue` 类似，设置为 `true` 后可以在 `mutation` 信息中拿到 `characterData` 变化前的值
-   `subtree`： `subtree` 比较特殊，表示是否需要监听子元素的变动，子元素监听选项将会从此处 `option` 继承

回调中接受两个参数：`mutationList` 为变动的 `mutation` 事件列表，`observer` 还是老样子，上面 `observer` 实例的一个引用。

`mutation` 中字段较多，可以从中直接获得 `DOM` 变更的细节：

-   `type`： 标识本次变动的类型，包含三种类型，同上面 `option` 中的三种监听类型：
    -   `attributes` 表示 `dom` 的属性变动
    -   `characterData` 表示文本节点的变动
    -   `childList` 表示其它的 `node` 节点变动
-   `target`： 当前 `mutation` 影响的 `DOM` 节点，三种类型下有些许区别：
    -   `attributes` 类为属性变化的元素
    -   `characterData` 类则为变动的文本节点
    -   `childList` 类为变动的 `child` 的父元素
-   `addedNodes`： 为添加的节点
-   `removedNodes`： 为删除的节点
-   `previousSibling`： 删除或添加的节点的前一个兄弟节点
-   `nextSibling`： 删除或添加的节点的后一个兄弟节点
-   `attributeName`： 变动的属性名称
-   `attributeNamespace`： 变动的属性的 `namespace`，很少用到
-   `oldValue`： 变动前的属性，内容视类型和配置中的 `oldValue` 相关配置决定

需要注意，`mutationList` 是所有改动事件的合集，比如一次性改动 `n` 个属性，将会生成 `n` 个 `mutation`。

## 其它 API

同样除了 `observe` 外，`MutationObserver` 也提供了 `disconnect` 来取消所有监听，但是居然没有提供 `unobserve`，`emm`。

`observer` 还提供了 `takeRecords`，用来获取所有已经发生的改动但是却还没进入回调处理的事件，一般用于在 `disconnect` 前处理还未被处理的改动。

## 总结

`MutationObserver` 在日常使用中场景非常少见，然而在特定场景下可以发挥出强大的作用。
