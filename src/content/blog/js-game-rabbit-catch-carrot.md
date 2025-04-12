---
title: 'js 写个 🐰 接 🥕 小游戏'
pubDate: '2023-02-08'
tags:
    - Game
---

今天使用 JS 写一个类似于接金币的小游戏，老规矩首先设计场景。

## 场景设计

```html
<div id="stage">
    <div id="score">0</div>
    <div id="player">
        <div id="rabbit">🐰</div>
        <div id="car">🚗</div>
    </div>
</div>
```

结构非常简单， 包括了场景容器、分数、角色（由我们的兔年主角 🐰 担当，开上心爱的 🚗）。然后添加一些简单的样式：

```css
#stage {
    width: 600px;
    height: 400px;
    position: relative;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
}

#score {
    position: absolute;
    right: 15px;
    top: 15px;
}

#player {
    bottom: 5px;
    position: absolute;
    left: 0px;
    transition: left 0.1s linear;
}

#car,
#rabbit {
    position: absolute;
    font-size: 40px;
    bottom: 0px;
}

#rabbit {
    bottom: 20px;
    left: 10px;
    font-size: 30px;
    z-index: 10;
}

.carrot {
    position: absolute;
    transition: top 0.1s linear;
}

.carrot::after {
    content: '🥕';
}
```

胡萝卜我们一样使用 emoji 来做。（amazing，有剩下找素材的时间）此处注意 carrot 和 player 都会移动，所以我们为其添加上 transition，这样可以在移动时更加顺滑。此时的画面长这样：

![picture 1](https://stg.heyfe.org/images/blog-js-game-rabbit-catch-carrot-92.png)

## 逻辑代码

### 移动控制

然后我们为其添加上按钮控制移动的代码：

```js
const player = document.getElementById('player');
const stage = document.getElementById('stage');
const scoreDOM = document.getElementById('score');

const range = 600,
    playerWidth = 0,
    speed = 20,
    carrotSpeed = 2,
    carrots = new Set();
let score = 0;

const onKeyPress = e => {
    let left = +player.style.left.replace('px', '');
    if (e.keyCode === 97) {
        left = Math.max(0, left - speed);
    } else if (e.keyCode === 100) {
        left = Math.min(range - playerWidth, left + speed);
    }
    player.style.left = left + 'px';
};

document.addEventListener('keypress', onKeyPress, true);
```

控制代码为了方便，我们直接使用 keypress，不过 keypress 不支持方向键，所以我们使用 A、D 作为控制方向替代。按下对应的按键后我们在当前的 player 的 left 属性进行移动操作，注意移动范围的处理。此时我们就可以使用方向键来控制小兔兔的移动了。

![picture 2](https://stg.heyfe.org/images/blog-js-game-rabbit-catch-carrot-71.gif)

## 胡萝卜随机生成

移动完成后我们需要补足胡萝卜的生成逻辑

```js
const generateCarrot = () => {
    const x = (Math.random() * range) | 0;
    const dom = document.createElement('div');
    dom.className = 'carrot';
    dom.style.left = x + 'px';
    dom.style.top = 0;
    stage.appendChild(dom);
    return dom;
};
let coldDown = 10;

const tick = () => {
    if (coldDown <= 0) {
        carrots.add(generateCarrot());
        coldDown = Math.random() * 100 + 60;
    } else {
        coldDown--;
    }
    requestAnimationFrame(tick);
};

tick();
```

此处我们使用 requestAnimationFrame 来进行动画控制和生成倒计时，使用 random 随机生成的时间差和生成的位置。

## 碰撞判断和分数计算

然后就是最后的胡萝卜抓取判定和分数计算的环节了。

```js
const clearCarrot = carrot => {
    stage.removeChild(carrot);
    carrots.delete(carrot);
};
const getScore = carrot => {
    clearCarrot(carrot);
    scoreDOM.innerText = score++;
};

const updateCarrots = () => {
    const playerX = +player.style.left.replace('px', '');
    carrots.forEach(carrot => {
        let top = +carrot.style.top.replace('px', '');
        top += carrotSpeed;
        const carrotX = +carrot.style.left.replace('px', '');
        if (top > 360) {
            if (carrotX >= playerX - 10 && carrotX <= playerX + 50) {
                getScore(carrot);
                return;
            }
        }
        if (top > 400) {
            clearCarrot(carrot);
        } else {
            carrot.style.top = top + 'px';
        }
    });
};
```

此处我们在每次 requestAnimationFrame 更新胡萝卜的位置，然后通过判定胡萝卜的位置与小兔兔位置的关系来判定是否被小兔兔抓到，抓到后清空胡萝卜并加一分。如果位置到达底部则清空该胡萝卜。如果没有判定中则更新胡萝卜的位置。

## 最后

好了，就这样总计一百多行代码，我们的小兔子抓胡萝卜游戏就完成了。

源码地址：https://github.com/ZxBing0066/playground-public/tree/master/websites/js-game-rabbit-catch-carrot

预览地址：https://playground.heyfe.org/js-game-rabbit-catch-carrot/