---
title: Cypress 踩坑记 - DOM 遮挡
pubDate: '2023-05-16'
heroImage: >-
    https://stg.heyfe.org/images/blog-cypress-hard-point-dom-covered-1690810838694.png

tags:
    - cypress
    - 源码解析
---

> `Cypress` 是一个非常流行的测试工具，然而实际使用过程中发现一些问题，这里做些记录。

## 问题发现

在 `Cypress` 下 `click` 是非常常用的指令，然而在一些特殊场景下 `click` 并不能如想象中那般正常工作。

比如现在有一个弹窗，我们需要测试在点击遮罩层时是否可以正常关闭弹窗。

![picture 1](https://stg.heyfe.org/images/wip-cypress-hard-point-1684240200898.png)

测试代码比较简单：

```js
/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3300/Modal');
    });

    it('Override', () => {
        cy.get('.mantine-Button-root').click();
        cy.get('.mantine-Modal-root').should('exist');
        cy.get('.mantine-Modal-overlay').click();
    });
});
```

然后执行 `Cypress`，发现一切如想象中那般简单，很顺利就通过了。

![picture 2](https://stg.heyfe.org/images/wip-cypress-hard-point-1684240349883.png)

然而当往 `Model` 中填充了一些内容后，却发现突然这里就报错了。

![picture 3](https://stg.heyfe.org/images/wip-cypress-hard-point-1684240550385.png)

当然，报错是没问题，遮罩层确实被内容遮挡了。问题是刚刚明明也是一样被遮挡，为何就不报错，只是因为内容多了一点就报错，这就很不合适了。

查看文档会发现 `click` 还支持坐标或位置参数。

![picture 4](https://stg.heyfe.org/images/wip-cypress-hard-point-1684241089587.png)

然而，并没有什么用，也就是说这个点击位置无关，应该是和 `Cypress` 判断元素遮挡有关系，看起来 `Cypress` 遮挡计算还需要优化。

## 原因排查

排查源码可以发现 `Cypress` 的 `click` 会经过一些判定：

```ts
if (force !== true) {
    // now that we know our element isn't animating its time
    // to figure out if it's being covered by another element.
    // this calculation is relative from the viewport so we
    // only care about fromElViewport coords
    $elAtCoords =
        options.ensure.notCovered && ensureElIsNotCovered(cy, win, $el, coords.fromElViewport, options, _log, onScroll);
    Cypress.ensure.isNotHiddenByAncestors($el, name, _log);
}
```

其中比较重要的参数是 `coords.fromElViewport`，其数值长这样：

```json
{
    "top": 0,
    "left": 0,
    "right": 1000,
    "bottom": 660,
    "topCenter": 330,
    "leftCenter": 500,
    "x": 500,
    "y": 330
}
```

注意其中的 `x` 和 `y`，可以认为就是中心点的坐标。

然后 `Cypress` 会使用该坐标获取该位置最顶层的元素：

```ts
const getElementAtPointFromViewport = function (fromElViewport) {
    // get the element at point from the viewport based
    // on the desired x/y normalized coordinations
    let elAtCoords;

    elAtCoords = $dom.getElementAtPointFromViewport(win.document, fromElViewport.x, fromElViewport.y);

    if (elAtCoords) {
        $elAtCoords = $dom.wrap(elAtCoords);

        return $elAtCoords;
    }

    return null;
};

const ensureDescendents = function (fromElViewport) {
    // figure out the deepest element we are about to interact
    // with at these coordinates
    $elAtCoords = getElementAtPointFromViewport(fromElViewport);
    debug('elAtCoords', $elAtCoords);
    debug('el has pointer-events none?');
    ensureElDoesNotHaveCSS($el, 'pointer-events', 'none', name, log);
    debug('is descendent of elAtCoords?');
    ensureIsDescendent($el, $elAtCoords, name, log);

    return $elAtCoords;
};
```

可以发现这里直接使用 `x` 和 `y` 去获取元素，然后和当前目标元素去做了对比。

这也就是为什么 `click` 有时候可以点，有时候不可以的原因了，简单说就是中心点被遮了就可以点，没被遮就不可以点，还真是简单粗暴 😂。这也导致了 `click` 的不稳定现象。

## 结果验证

那我们来验证下是不是如此，首先我们先创建一个非常小的遮挡元素，然后放在中央位置，测试下是不是会出问题。代码如下：

```tsx
import style from './Covered-1.module.css';
const Covered = () => {
    return (
        <div className={style.parent} data-test-id='parent'>
            <div className={style.mask} data-test-id='mask'></div>
            <div className={style.child} data-test-id='child'></div>
        </div>
    );
};
export default Covered;
```

```css
.parent {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mask {
    background: rgb(0, 0, 0, 0.3);
    position: absolute;
    inset: 0;
}
.child {
    background: purple;
    width: 5px;
    height: 5px;
    z-index: 10;
}
```

测试用例就点击 `mask` 即可。

```js
/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3300/Covered-1');
    });

    it('Override', () => {
        cy.get('[data-test-id="mask"]').click();
    });
});
```

结果果然不出所料：

![picture 1](https://stg.heyfe.org/images/wip-cypress-hard-point-dom-covered-1684246337600.png)

为了严谨，我们再测试下另一个 `case`，我们将四周全部用元素遮挡住，只留下中心一点，然后点击，验证下是不是可以正常。代码如下：

```tsx
import style from './Covered-2.module.css';
const Covered = () => {
    return (
        <div className={style.parent} data-test-id='parent'>
            <div className={style.mask} data-test-id='mask'></div>
            <div className={style.child + ' ' + style.left} data-test-id='child'></div>
            <div className={style.child + ' ' + style.right} data-test-id='child'></div>
            <div className={style.child + ' ' + style.top} data-test-id='child'></div>
            <div className={style.child + ' ' + style.bottom} data-test-id='child'></div>
        </div>
    );
};
export default Covered;
```

```css
.parent {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mask {
    background: rgb(0, 0, 0, 0.3);
    position: absolute;
    inset: 0;
}
.child {
    background: purple;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
}
.left,
.right {
    width: 49%;
    height: 100%;
}
.right {
    right: 0;
    left: unset;
}
.top,
.bottom {
    height: 49%;
    width: 100%;
}
.bottom {
    top: unset;
    bottom: 0;
}
```

测试代码无需更改：

```js
/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3300/Covered-2');
    });

    it('Override', () => {
        cy.get('[data-test-id="mask"]').click();
    });
});
```

不出所料，果然可以点击。

![picture 2](https://stg.heyfe.org/images/wip-cypress-hard-point-dom-covered-1684246780981.png)

## 最后

说实在的 `Cypress` 这样的遮挡检查方式不太妥当，过于简单粗暴而且很容易让人困惑。理论上而言可以使用 `layer` 层层比对交叉区域来判定更为妥当。不知道是不是有什么文档导致放弃了。

还有点击的方式感觉也可以再优化一下，比如提供了坐标或者方位，那就应该以提供的坐标或方位来做遮挡判定，现在遇到这种情况只能使用 `force`，然而使用了 `force` 这个测试的意义就少了一大半。