# 从 0 手撸 canvas 小游戏：圆圆战争 - 游戏设计、canvas 基础绘制篇

决定从 0 开始手撸一只 canvas 小游戏，游戏设定为一只圆之国的国王，惨遭万圆围攻，只得拿起王家镇国之宝 - 圆之枪守卫王国的故事。

本游戏中主要的三个元素：圆之国的国王简称圆王、圆王发射出的子弹、进攻的敌人，为了呼应游戏名称，所有的出场元素全都是圆形（其实是懒得找素材）。

先看下本章最后的成果：

https://code.juejin.cn/pen/7157665779939278884

前排提醒，因为码上掘金编辑器不支持 class properties 特性，所以只能将 class 中的 `hp=100` 改为 `hp:number;`，然后在 constructor 中赋值。

## 代码结构设计

首先我们先设计下代码结构，由于游戏中存在的元素需要操控和针对性处理，所以使用面向对象方式来编写会显得更为合适，代码风格就敲定为面向对象，其中可以想到的几个类包括圆王、子弹、敌人：

```ts
class King {
    hp: number;
    x: number;
    y: number;
    color: string;
    constructor() {
        this.hp = 100;
        this.x = 400;
        this.y = 400;
        this.color = 'purple';
    }
    draw() {
        drawCircle(this.x, this.y, 16, this.color, true);
    }
}
```

先看圆王，由于圆王可以发射子弹，所以我们再下面先添加上子弹列表，然后还有 draw，可以等价认为是 React 组件中的 render，每次更新视图，我们就调用 draw 来进行绘制。

```ts
class Bullet {
    damage: number;
    x: number;
    y: number;
    speed: number;
    state: number;
    color: string;
    constructor() {
        this.damage = 3;
        this.x = 400;
        this.y = 400;
        this.speed = 4;
        this.state = 1;
        this.color = 'yellow';
    }
    draw() {
        if (!this.state) return;
        drawCircle(this.x, this.y, 4, this.color, true);
    }
    move() {
        this.x += this.speed;
    }
}
```

子弹由于包含了绘画、移动、碰撞等，我们也单独作为一个实例，然后添加上子弹的坐标、伤害、移动角度、移动速度等属性。

```ts
class Enemy {
    x: number;
    y: number;
    speed: number;
    color: string;
    constructor() {
        this.x = -10;
        this.y = 400;
        this.speed = 0.2;
        this.color = 'red';
    }
    draw() {
        drawCircle(this.x, this.y, 6, this.color, true);
    }
    move() {
        this.x += this.speed;
    }
}
```

敌人同样需要移动和绘制，所以也需要速度、坐标等属性，然后使用 draw 来绘制，使用 move 来移动

## 图形绘制

我们再来看下 canvas 中如何绘制圆形：

```ts
function drawCircle(cx: number, cy: number, radius: number, color: string, shadow?: string) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.shadowColor = shadow;
    ctx.shadowBlur = shadow ? radius : 0;
    ctx.fillStyle = color;
    ctx.fill();
}
```

canvas 中绘制圆形需要使用 arc 来绘制，其中 cx 和 cy 为圆形的坐标，radius 则为圆形的半径，`2 * Math.PI` 则表示圆弧的角度为 360 度。为了让圆看起来没那么生硬，增加了阴影。

https://code.juejin.cn/pen/7157652212641562628

## game 对象

然后我们来写一下游戏主体对象的相关代码，该对象需要控制和存储所有的数据：

```ts
const game = {
    start() {
        this.king = new King();
        this.enemies = [];
        this.bullets = [];
        this.loop();
        setInterval(() => {
            this.bullets.push(new Bullet());
            this.enemies.push(new Enemy());
        }, 300);
    },
    loop() {
        requestAnimationFrame(() => this.loop());
        this.draw();
        this.move();
    },
    draw() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        this.king.draw();
        this.enemies.forEach(enemy => enemy.draw());
        this.bullets.forEach(bullet => bullet.draw());
    },
    move() {
        this.enemies.forEach(enemy => enemy.move());
        this.bullets.forEach(bullet => bullet.move());
    }
};
```

我们将圆王、敌人和子弹全部挂在 game 对象下，然后通过 requestAnimationRequest 调用 loop，在 loop 中执行 draw 和 move，这样就可以完成子弹和敌人的移动。

## 结语

本篇我们先完成了游戏中的主要元素的设计、代码风格选择已经基本的图形绘制、动画制作，游戏雏形已经可以展现，下一章我们来进行子弹的方向控制、子弹的攻击、敌人的攻击，主要涉及到角度计算、距离计算和碰撞测试等内容，有兴趣可继续关注。
