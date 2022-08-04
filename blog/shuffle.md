# 写了个乱序，可我不知道它够不够乱，咋整

几个月前因为某个需求，需要写一个乱序函数，于是乎就撸了一个，然而撸完又开始思考，怎么证明结果够不够乱呢，接下来我们看下。

> 别问为啥要重复造这么小的轮子，就是没写过随便写写。

## 怎么写乱序函数

先定义一下我们的乱序函数，首先它支持接受一个数组或一个字符串，然后会将数组或字符串中的元素乱序输出。

代码使用 `TS` 编写，先定义接口：

```ts
function shuffle(target: string): string;
function shuffle<T = any>(target: T[]): T[];
```

为了兼容两种数据类型且有良好的类型推断，这里使用了重载。

实现很简单，如果为字符串，我们需要先将其转换为数组；如果是数组，为了避免影响原数组，就 `clone` 一份：

```ts
const isString = typeof target === 'string';
let shuffleTarget: T[] | string[];
if (isString) {
    shuffleTarget = target.split('');
} else {
    shuffleTarget = target.slice();
}
```

随后呢，我们将数组中的元素进行打乱，打乱的方式有很多种，我这里选择每次从数组中随机一个元素然后将其放到最末端，然后每次将末端索引向前移动，这样即可保证一个元素只被操作一次。

```ts
const randomIndex = (l: number) => Math.floor(Math.random() * l);

let l = shuffleTarget.length;
while (l) {
    let i = randomIndex(l--);
    const tmp = shuffleTarget[i];
    shuffleTarget[i] = shuffleTarget[l];
    shuffleTarget[l] = tmp;
}
```

这种方式之后在 `lodash` 文档中看到，叫做 [Fisher–Yates_shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)。

当然乱序还有很多种办法，比如：

-   创建一个新数组，每次随机从数组中选取一个元素，然后将其丢入新数组中
-   使用 `sort` 随机返回 -1 或 1
-   或者每次随机两个索引后让它们交换位置

不过综合看下来，还是上述的方案性能更高（还有改进的地方，比如 `l` 为 1 时就可退出了，不过无伤大雅），效果最好。

## 问题出现

这么小的一个乱序，咋还能出问题呢，别急，真不是我菜 🐶，主要是字符串太骚。

大家应该都知道，很多字符串长度不为 1，主要就是因为它超出了 `Unicode` 编码单字符的范围，所以需要使用多个 `Unicode` 编码区来表示，而大部分语言中的长度，都是 `Unicode` 编码单字符的长度。最常见的就是 `emoji` 了，比如 👷‍♀️ 这个 `emoji`，它的 `length` 就是 5，这带来的问题不只是会出现在字符长度中，还出现在字符串分割中，上面我们使用 `split('')` 来分割字符串，就会导致这个 `emoji` 被分割为 ['\uD83D', '\uDC77', '‍', '♀', '️'] 这 5 个字符，显然并不是我们想要的结果。

比较简单的解决方案是，我们直接使用 `Array.from` 或数组解构来拆解字符串，但是他只能拆解比较简单的 `emoji`，如 '📦' 可以成功，但是遇到上面的 '👷‍♀️' 依旧要躺，🤦‍♂️ 这个就超纲了， 需要配合专业库来解决。

## 怎么证明它够乱

写完随之而来的一个问题便是，怎么证明这个函数够不够乱呢，虽然代码看着没毛病，但是咱还是得靠数据说话。

于是乎，我想到将一组数据乱序上万次，然后将乱序后的数据分布统计出来这个办法。咱先上图看看效果：

![](https://github.com/ZxBing0066/zlib/raw/master/packages/shuffle/shuffle-distribution-chart.png)

这是我将 `A-P` 16 个字母进行 10W 次乱序，然后统计出来的分布图表。我为每个字母生成了一个颜色，然后横坐标是每个索引和出现在该索引处的字符，纵坐标为对应的次数。

从图表可以看出，每个字母出现在每个索引位置的次数基本相同，都在 6250 左右（100000/6），没有出现分布不均的情况，由此可见，果然够乱。🐶

再顺手贴上图表的[地址](https://codesandbox.io/s/z-shuffle-distribution-chart-2j33q?fontsize=14&hidenavigation=1&theme=dark&file=/src/index.js)和代码：

```js
import shuffle from 'z-shuffle';

const LetterCount = 16;
let t = 100000;
const chartCodeOfA = 'A'.charCodeAt(0);
const array = new Array(LetterCount).fill(null).map((v, i) => String.fromCharCode(i + chartCodeOfA));

const distributionMap = {};
for (const letter of array) {
    distributionMap[letter] = new Array(LetterCount).fill(0);
}

while (t--) {
    const arrayAfterShuffle = shuffle(array);
    for (const index in arrayAfterShuffle) {
        const letter = arrayAfterShuffle[index];
        distributionMap[letter][index]++;
    }
}

const datasets = [];
const l = Object.keys(distributionMap).length;
const d = Math.floor(255 / l);
for (const key in distributionMap) {
    const distribution = distributionMap[key];
    const code = key.charCodeAt(0) - chartCodeOfA;
    datasets.push({
        label: key,
        data: distribution,
        backgroundColor: `rgb(${d * code}, ${255 - d * code}, ${255 - code})`
    });
}

const data = {
    labels: new Array(l).fill(null).map((v, i) => i),
    datasets
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right'
            }
        }
    }
};

new window.Chart(document.getElementById('myChart'), config);
```

## benchmark

乱是够乱了，那就顺手再测试下性能好了，具体代码可以看下 [benchmark.js](https://github.com/ZxBing0066/zlib/blob/master/packages/shuffle/benchmark.js) 就不贴了，贴下测试结果。

```sh
 lodash/shuffle:
    1 357 426 ops/s, ±1.60%   | slowest, 26.89% slower

  array-shuffle:
    1 856 774 ops/s, ±0.64%   | fastest

  shuffle-array:
    1 807 762 ops/s, ±1.66%   | 2.64% slower

  z-shuffle:
    1 792 127 ops/s, ±0.61%   | 3.48% slower

  z-shuffle pure=false:
    1 769 492 ops/s, ±1.22%   | 4.7% slower
```

基本上测下来性能都差不多，因为我这里还有几个参数判断，以及刚刚上面说到的循环多了一次，所以稍微慢一丢丢，不过 `lodash` 这。。。

最后吹嘘一波：本库 `ts` 编写，`MIT` 协议，尺寸不到 400B，无依赖，100% 测试覆盖率，支持 `tree-sharking`，支持 `worker`，支持 `esm`、`cjs`、`umd` 各种，支持字符串和数组，童叟无欺，欢迎使用。🐶 保命。

好了本篇水文到此为止，顺手贴下该库的 [`github` 地址](https://github.com/ZxBing0066/zlib/tree/master/packages/shuffle)，欢迎大家三连 🐶。
