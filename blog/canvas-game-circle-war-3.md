---
ignoreInList: true
---

# 从 0 手撸 canvas 小游戏：圆圆战争 - 帧率计算、垃圾回收篇

上篇我们为圆圆战争增加了鼠标控制射击方向，还增加了子弹与敌人的碰撞检测。本篇我们会为游戏做一些简单的垃圾回收操作，而在游戏中为了随时知道我们游戏的性能，常用的手段就是帧率计算器，也是我们本篇的目标之一。

先看下本章最后的成果：

https://code.juejin.cn/pen/7158076182519349285

## 帧率计算器

首先制作前我们要先搞清什么是帧率：

> 帧率（英语：frame rate）是用于测量显示帧数的度量。测量单位为“每秒显示帧数”（frame per second，FPS）或“赫兹”，一般来说 FPS 用于描述视频、电子绘图或游戏每秒播放多少帧。

所以我们只需要测量每秒 `loop` 执行的次数即可，此处我们直接将其作为一个绘制元素即可，看下代码：

```ts
class FrameRater {
    count: number;
    time: number;
    frameRate?: number;
    timer?: ReturnType<typeof setTimeout>;
    duration: number;
    constructor() {
        this.count = 0;
        this.time = Date.now();
        this.duration = 3000;
        this.loop();
    }
    loop() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.compute();
            this.loop();
        }, this.duration);
    }
    compute() {
        const now = Date.now();
        this.frameRate = (this.count / (now - this.time)) * 1000;
        this.time = now;
        this.count = 0;
    }
    action() {
        this.count++;
    }
    draw() {
        if (!this.frameRate) return;
        ctx.font = '14px serif';
        ctx.fillStyle = 'black';
        ctx.shadowBlur = 0;
        ctx.fillText(this.frameRate.toFixed(2) + '', 20, 20);
    }
}
```

我们在帧率计算器中要使用定时器来定时计算帧率，不过定时器的时间并不能保证，所以在计算时为了准确我们最好记录下前后的事件，使用时间差来计算。每次 `action` 中我们为帧数加一以此来计算该事件段内的总帧数，要注意定时器的事件，如果使用 1s 可能会导致帧率数字一直刷新反而不方便观看，所以我们将定时器事件设置为 3s。

用 `canvas` 绘制文字则比较简单，设置好文字样式后，我们使用 `fillText` 将帧率进行绘制即可，后面的 20,20 为文字的坐标。当然我们也可以直接添加一个 `span`，然后在 `draw` 时设置 `span` 的 `innerText` 也可以达到同样的效果，并且可以避免每帧绘制，性能更好。

然后我们在 `game` 的 `loop` 中只需要调用 `frameRater` 的 `action` 即可，`frameRater` 会自行收集帧率信息并更新，然后在进行绘制时调用 `frameRater` 的 `draw` 即可：

```ts
const game = {
    start() {
        // ...
        this.frameRater = new FrameRater();
        this.loop();
    },
    loop() {
        // ...
        this.frameRater.action();
    },
    draw() {
        // ...
        this.frameRater.draw();
    }
};
```

此处要注意，不同于定时器，`requestAnimationFrame` 的帧率由浏览器来决定，基本大部分情况下都是 60 帧，所以此处会发现帧率只可能小于等于 60。

## 垃圾回收

在游戏中我们会创建很多的子弹和敌人对象，然而子弹会离开屏幕并消失，敌人也会因为子弹的攻击而消失，但是我们的对象却未清理，所以此处我们需要手动进行垃圾回收。为了方便管理，我们也顺便将每一帧每个对象要做的事情放到 `action` 中统一管理，这样就不用每个对象的操作都在 `game` 对象中管理。

首先我们需要在每一帧中检测子弹是否离开绘制区域，如果离开则将子弹的 `state` 置为 0，这个比较简单，只需要检测子弹的坐标是否离开坐标系即可，为了避免边界和敌人相撞，我们给坐标留一些 `buffer`。

```ts
class Bullet {
    check() {
        if (
            this.x > WIDTH + OUTER_RANGE ||
            this.x < 0 - OUTER_RANGE ||
            this.y > HEIGHT + OUTER_RANGE ||
            this.y < 0 - OUTER_RANGE
        ) {
            this.state = 0;
        }
    }
}
```

然后我们将子弹的所有操作全部集中到 `action` 中：

```ts
class Bullet {
    action(enemies: Enemy[]) {
        this.move();
        this.intersectionDetection(enemies);
        this.check();
    }
}
```

而垃圾回收则需要 `game` 对象进行统一管理，为了避免频繁的垃圾回收导致性能问题，我们可以为垃圾回收设定一个 `CD`：

```ts
const GC_CD = 60;
const game = {
    gc() {
        this.bullets = this.bullets.filter(bullet => bullet.state);
        this.enemies = this.enemies.filter(enemy => enemy.state);
    },
    cd() {
        if (this.bulletCD-- < 1) {
            this.bullets.push(new Bullet(this.mouse.angle));
            this.bulletCD = BULLET_CD;
        }
        if (this.enemyCD-- < 1) {
            this.enemies.push(new Enemy());
            this.enemyCD = ENEMY_CD;
        }
        if (this.gcCD-- < 1) {
            this.gc();
            this.gcCD = GC_CD;
        }
    }
};
```

这样我们每 60 帧就会进行一次垃圾回收操作，避免内存无限增长。

而在 `game` 中我们将操作类代码进行集中化，这样可以让每个方法的职责更为明确：

```ts
const game = {
    loop() {
        requestAnimationFrame(() => this.loop());
        this.draw();
        this.action();
        this.cd();
    },
    action() {
        this.enemies.forEach(enemy => enemy.action());
        this.bullets.forEach(bullet => bullet.action());
        this.frameRater.action();
    },
    cd() {
        if (this.bulletCD-- < 1) {
            this.bullets.push(new Bullet(this.mouse.angle));
            this.bulletCD = BULLET_CD;
        }
        if (this.enemyCD-- < 1) {
            this.enemies.push(new Enemy());
            this.enemyCD = ENEMY_CD;
        }
        if (this.gcCD-- < 1) {
            this.gc();
            this.gcCD = GC_CD;
        }
    }
};
```

## 敌人随机生成

由于现在敌人就从一条线出现，使得游戏毫无难度，所以我们需要在敌人初始化时从随机位置生成，为了让敌人不要出现的太突兀，我们需要将生成位置控制在屏幕外侧，并且不能太远，为此我们可以直接复用之前子弹离屏计算中的 `OUTER_RANGE`：

```ts
const random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};
const randomBol = () => {
    return Math.random() < 0.5;
};

const randomXCord = (out?: boolean) => {
    if (out) {
        return randomBol() ? random(-OUTER_RANGE, 0) : random(WIDTH, WIDTH + OUTER_RANGE);
    }
    return random(0, WIDTH);
};
const randomYCord = (out?: boolean) => {
    if (out) {
        return randomBol() ? random(-OUTER_RANGE, 0) : random(HEIGHT, HEIGHT + OUTER_RANGE);
    }
    return random(0, HEIGHT);
};

class Enemy {
    constructor() {
        if (randomBol()) {
            this.x = randomXCord(true);
            this.y = randomYCord();
        } else {
            this.x = randomXCord();
            this.y = randomYCord(true);
        }
        this.angle = computeAngle(this.x - C_X, this.y - C_Y);
    }
    private move() {
        this.x -= Math.cos((this.angle * Math.PI) / 180) * this.speed;
        this.y -= Math.sin((this.angle * Math.PI) / 180) * this.speed;
    }
}
```

移动时计算同子弹的轨迹计算，只需要将方向进行反转即可。

## 结语

至此我们完成了敌人随机生成、帧率计算、垃圾回收，已经完成了一个圆圆大战的几个基本要素，可以进行简单的游玩了。完整代码可至顶部 `DEMO` 查看。下篇计划会进行关卡、分数计算、输赢判断、暂停方面的开发。
