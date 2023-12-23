---
lastUpdate: 2023-7-31
date: 2022-10-24
ignoreInList: true
---

# 从 0 手撸 canvas 小游戏：圆圆战争 - 方向控制、碰撞测试篇

上文讲到本人决定从 0 开始手撸一只 `canvas` 小游戏，圆圆战争，上篇已经讲到使用面向对象如何的创建游戏，并且让游戏动起来，本篇我们来为圆王添加上使用鼠标控制子弹发射方向的功能，以及子弹与敌人的碰撞测试。

先看下本章最后的成果：

https://code.juejin.cn/pen/7157697952537346081

## 鼠标控制子弹方向

为了控制子弹方向，游戏决定直接使用当前鼠标的位置来进行控制，所以我们需要通过通过当前的鼠标位置来计算出子弹射出的方位，然后在后续的子弹移动中我们要使用该方位来计算出子弹的方向。此处我们需要使用到初中的几何知识：直角三角形的角度计算。

![picture 8](https://stg.heyfe.org/images/blog-canvas-game-circle-war-2-34.png)

让我们来稍微回忆一下直角三角形的角度如何计算，首先我们根据鼠标的位置以及圆王的位置，可以得到 `x` 轴的偏移量和 `y` 轴的偏移量，即直角三角形的两个直角边，然后我们便可以使用勾股定理得到斜边的长度。

```js
const c = Math.sqrt(x * x + y * y);
```

而按照直角三角形的角度计算 `sin(a) = y/c`，所以 `a = arcsin(y/c)`，使用 `js` 计算代码如下：

```js
const angle = (Math.asin(y / c) * 180) / Math.PI;
```

计算出角度后，我们在生成子弹时即可根据子弹位置来计算出子弹的角度。为了方便使用，我们直接使用一个 `Mouse` 类来记录位置和角度信息：

```ts
const computeAngle = (x: number, y: number) => {
    const distance = Math.sqrt(x * x + y * y);
    const angle = (Math.asin(y / distance) * 180) / Math.PI;
    return +(x > 0 ? angle : 180 - angle).toFixed(2);
};

class Mouse {
    angle = 0;
    x = 0;
    y = 0;
    moveHandler = (e: MouseEvent) => {
        const clientRect = canvas.getClientRects()[0];
        const x = e.pageX - clientRect.x;
        const y = e.pageY - clientRect.y;
        this.x = x;
        this.y = y;
        this.angle = computeAngle(x - centerCoord[0], y - centerCoord[1]);
    };
    on() {
        document.addEventListener('mousemove', this.moveHandler);
    }
    off() {
        document.removeEventListener('mousemove', this.moveHandler);
    }
}
```

注意 `x` 为负值时角度需要使用 180 来减计算出的角度值。然后我们在实例化子弹时即可将角度赋予子弹，在子弹移动时，我们即可根据角度来计算移动的坐标。

```js
class Bullet {
    constructor(angle: number) {
        this.angle = angle;
    }
    private move() {
        this.x += Math.cos((this.angle * Math.PI) / 180) * this.speed;
        this.y += Math.sin((this.angle * Math.PI) / 180) * this.speed;
    }
}
```

看下效果，为了方便观看增加上了辅助线绘制：

https://code.juejin.cn/pen/7157692688257515528

## 碰撞测试

下面我们来为子弹增加碰撞测试，不过在那之前，我们先优化一下敌人的生成和子弹的生成逻辑，我们通过 `CD` 来计算生成时机。

```ts
const BULLET_CD = 30;
const ENEMY_CD = 300;
const game = {
    bulletCD: 0;
    enemyCD: 0;
    cd() {
        if(this.bulletCD-- < 1) {
            this.bullets.push(new Bullet(this.mouse.angle));
            this.bulletCD = BULLET_CD;
        }
        if(this.enemyCD-- < 1) {
            this.enemies.push(new Enemy);
            this.enemyCD = ENEMY_CD;
        }
    }
};
```

这样便能统一使用 `requestAnimationFrame` 来控制生成，且利于后续扩展。

碰撞测试即计算出两个物体合适接触，几乎每个游戏都需要使用到，而我们这里需要计算的是子弹与敌人之间的碰撞，即两个圆形是否有相交。从复杂度上来说，其实圆形物体的碰撞是最好计算的，我们只需要计算出两个圆心点的距离即可：

![picture 9](https://stg.heyfe.org/images/blog-canvas-game-circle-war-2-41.png)

两个圆形是否相交，我们只需要计算出两个圆的圆心的距离，如果该距离小于两个圆的半径之和，即代表两圆相交。而距离通过勾股定理即可算出。

```js
const intersectionDetection = (circle: Circle, anotherCircle: Circle) => {
    const distance = Math.sqrt(Math.pow(circle.x - anotherCircle.x, 2) + Math.pow(circle.y - anotherCircle.y, 2));
    return distance < circle.radius + anotherCircle.radius;
};
```

然后我们在每次 `loop` 中检测子弹是否与敌人相碰撞：

```ts
const game = {
    intersectionDetection() {
        this.bullets.forEach(bullet => {
            bullet.intersectionDetection(this.enemies);
        });
    }
};
```

为了方便扩展，增加了 `damage` 来存储子弹的伤害信息。然后给子弹加上碰撞的检测，找出第一个碰撞的敌人，并调用敌人的 `hurt` 进行伤害计算，并将子弹的状态设置为 0 及被消耗，然后 `draw` 时按照子弹状态决定是否绘制：

```ts
class Bullet {
    damage: number;
    state: number;
    constructor(angle: number) {
        this.damage = 3;
        this.state = 1;
    }
    draw() {
        if (!this.state) return;
        drawCircle(this.x, this.y, this.radius, this.color, true);
    }
    intersectionDetection(enemies: Enemy[]) {
        const intersectionEnemy = enemies.find(enemy => {
            return enemy.state && intersectionDetection(enemy, this);
        });

        if (intersectionEnemy) {
            this.state = 0;
            intersectionEnemy.hurt(this);
        }
    }
}
```

给敌人加上状态和血量，在被子弹伤害到时计算血量伤害，死亡时修改状态，并且在 `draw` 时同样按照状态来决定是否绘制：

```ts
class Enemy {
    state: number;
    hp: number;
    constructor() {
        this.state = 1;
        this.hp = 3;
    }
    draw() {
        if (!this.state) return;
        drawCircle(this.x, this.y, this.radius, this.color, true);
    }
    hurt(bullet: Bullet) {
        this.hp -= bullet.damage;
        if (this.hp <= 0) {
            this.state = 0;
        }
    }
}
```

## 结语

至此我们便可以在每次移动后检测子弹与敌人的碰撞，来判断敌人是否被消灭，为了判断敌人消灭和子弹消失，我们要给敌人和子弹都加上状态标识，完整代码请至顶部 `demo` 中查看。下篇会进行一些简单的性能优化、帧率计算、分数、敌人的随机生成等。
