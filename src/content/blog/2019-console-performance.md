---
title: JavaScript 代码性能优化 - 从排查到处理
description: 一次性能优化的实践
pubDate: '2019-11-14'
tags:
    - javascript
    - 性能
---

近期在对我们的控制台做性能优化，这次记录下代码执行方面的性能排查与优化（纯 JS 上的不包含 DOM 操作等优化）。其它的优化点以后有机会再分享。

控制台地址：https://console.ucloud.cn/

## 性能问题排查与收集

首先需要排查出需要优化的点，这个我们可以借助 Chrome 的 DevTool 来排查网站中的性能问题。

> 最好在隐身模式下收集信息，避免一些插件的影响。

### Performance

第一种方式可以借助 Performance 面板来采集信息，展开 Main 面板，可以看到代码运行的信息。不过 Performance 面板中内容较多，还包含了渲染、网络、内存等其它的信息，视觉干扰比较严重。虽然很强大但是做纯 JS 性能排查时不推荐使用，今天主要介绍另一种方式。

![picture 5](https://stg.heyfe.org/images/blog-2019-console-performance-85.png)

### JavaScript Profiler

还有一种方式是借助 JavaScript Profiler，JavaScript Profiler 默认是隐藏的，需要在 DevTool 右上角的更多按钮（三个点的按钮） => More tools 中打开。

![picture 6](https://stg.heyfe.org/images/blog-2019-console-performance-83.png)

可以看到 JavaScript Profiler 面板较 Performance 面板比起来简单多了，左侧最上方一排按钮可以收集、删除、垃圾回收（可能是用来强制执行 GC 的，不太确定），可以收集多次 Profiler 进行比对。

右侧是 Profiler 的展示区域，上方可以切换展示模式，包括 Chart、Heavy、Tree 三种模式，这里推荐 Chart，最直观，也是最易懂的。

Chart 面板上方为图表，纵轴为 CPU 的使用率，横轴是时间轴，纵轴是调用栈深度。下方为代码执行的时间片段信息，长度较长的时间片段会在页面中造成明显的卡顿，需要重点排查。

在 Chart 面板中，上下滚动会将图形进行放大缩小，左右滚动为滚动时间轴，也可以在图表中进行鼠标圈选和拖动。CMD + f 可以进行搜索，在想要查找对应代码性能的时候比较方便。

通过 JavaScript Profiler 面板可以很方面的排查出性能异常的代码。

![picture 7](https://stg.heyfe.org/images/blog-2019-console-performance-4.png)

比如图中的 n.bootstrap，执行时间为 354.3ms，显然会造成比较严重的卡顿。

![picture 9](https://stg.heyfe.org/images/blog-2019-console-performance-71.png)

还可以顺着时间片段往下深究到底是哪个步骤耗时较长，从上面可以看到其中 l.initState 耗时 173ms，下面是几个 forEach，显然是这里的循环性能消耗比较大，点击时间片段会跳转到 source 面板的对应代码中，排查起来非常方便。

借助 JavaScript Profiler，我们可以将所有时间较长、可能有性能问题的代码全部整理出来，放到代办列表中，等待进一步排查。

### console.time

借助 Profiler 进行问题代码整理很方便，但是在实际调优过程中却有点麻烦，因为每次调试都需要执行一次收集，收集完了还需要找到当前调试的点，无形中会浪费很多时间，所以实际调优过程中我们会选择其他的方式，比如计算出时间戳差值然后 log 出来，不过其实有更方便的方式 - console.time。

```js
const doSomething = () => {
    return new Array((Math.random() * 100000) | 0).fill(null).map((v, i) => {
        return i * i;
    });
};
// start a time log
console.time('time log name');
doSomething();
// log time
console.timeLog('time log name', 1);
doSomething();
// log time
console.timeLog('time log name', 2);
doSomething();
// log time and end timer
console.timeEnd('time log name', 'end');
```

console.time 目前大部分浏览器已经支持，通过 console.time 可以很方便的打印出一段代码的执行时间。

-   console.time 接收一个参数标识并开启一个 timer，随后可使用这个 timer 的标识来执行 timeLog 和 timeEnd
-   timeLog 接收 1-n 个参数，第一个为 timer 标识，其后的为可选参数，执行后会打印出当前 timer 的差时，以及传入的其它可选参数
-   timeEnd 和 timeLog 类似，不同的是不会接受多余可选参数并会在执行后关闭这个 timer
-   不能同时启用多个同样标识的 timer
-   一个 timer 结束后，可以再次开启一个同名 timer

![picture 10](https://stg.heyfe.org/images/blog-2019-console-performance-64.png)

通过 console.time 我们可以直观的看到一段代码的执行时长，每次改动后页面刷新就能看到 log，从而看到改动后的影响。

## 性能问题整理和优化

借助 JavaScript Profiler，从控制台中排查出多处性能优化点。（以下时间为本地调试并开着 DevTool 时的数据，比实际情况较高）

| 名称               | 位置                                             | 单次耗时       | 首次执行次数 | 切换执行次数 |
| ------------------ | ------------------------------------------------ | -------------- | ------------ | ------------ |
| initState          | route\.extend\.js:148                            | 200ms \- 400ms | 1            | 0            |
| initRegionHash     | s_region\.js:217                                 | 50ms \- 110ms  | 1            | 0            |
| getMenu            | s_top_menu\.js:53                                | 0 \- 40ms      | 4            | 3            |
| initRegion         | s_region\.js:105, QuickMenuWrapper/index\.jsx:72 | 70ms \- 200ms  | 1            | 0            |
| getProducts        | s_globalAction\.js:73                            | 40ms \- 80ms   | 1            | 2            |
| getNav             | s_userinfo:58                                    | 40ms \- 200ms  | 2            | 0            |
| extendProductTrans | s_translateLoader\.js:114                        | 40ms \- 120ms  | 1            | 1            |
| filterStorageMenu  | QuickMenu\.jsx:198                               | 4ms \- 10ms    | 1            | 0            |
| filterTopNavShow   | EditPanel\.jsx:224                               | 0 \- 20ms      | 7            | 3            |

根据列出的排查的点，具体排除性能问题。下面列一些比较典型的问题点。

### 拆分循环中的任务

```js
var localeFilesHandle = function (files) {
    var result = [];
    var reg = /[^\/\\\:\*\"\<\>\|\?\.]+(?=\.json)/;
    _.each(files, function (file, i) {
        // some code
    });
    return result;
};

var loadFilesHandle = function (files) {
    var result = [];
    var reg = /[^\/\\\:\*\"\<\>\|\?\.]+(?=\.json)/;
    _.each(files, function (file, i) {
        // some code
    });
    return result;
};

self.initState = function (data, common) {
    console.time('initState');
    // some code
    _.each(filterDatas, function (state, name) {
        var route = _.extend({}, common, state);
        var loadFiles = loadFilesHandle(route['files']);
        var localeFiles = localeFilesHandle(route['files']);

        route['loadfiles'] = _.union(route['common_files'] || [], loadFiles);
        route['localeFiles'] = localeFiles;
        routes[name] = route;
        $stateProvider.state(name, route);
    });
    // some code
    console.timeEnd('initState');
};
```

initState 中，filterDatas 为一个近 1000 个 key 的路由 map，初始化是需要去 ui-router 中注册路由信息，$stateProvider.state 是没办法省略了，但是 两个 files 可以延后化处理，在拉取文件时再去获取文件列表。

```js
self.initState = function (data, common) {
    console.time('initState');
    // some code
    //添加路由到state
    _.each(filterDatas, function (state, name) {
        var route = _.extend({}, common, state);
        routes[name] = route;
        $stateProvider.state(name, route);
    });
    // some code
    console.timeEnd('initState');
};

// when load files
!toState.loadfiles &&
    (toState.loadfiles = _.union(toState['common_files'] || [], $UStateExtend.loadFilesHandle(toState['files'])));
!toState.localeFiles && (toState.localeFiles = $UStateExtend.localeFilesHandle(toState['files']));
```

经过减少迭代中的任务，initState 速度提升了 30% - 40%。

### 理清逻辑

```js
var bitMaps = {
    // map info
};
function getUserRights(bits, key) {
    var map = {};
    _.each(bitMaps, function (val, key) {
        map[key.toUpperCase()] = val;
    });
    return map && map[(key || '').toUpperCase()] != null ? !!+bits.charAt(map[(key || '').toUpperCase()]) : false;
}
```

getUserRights 中可以看到每次都会去对 bitMaps 做一次遍历，而 bitMaps 本身不会有任何变化，所以这里其实只需要在初始化时做一次遍历就可以了，或者在初次遍历后做好缓存。

```js
var _bitMaps = {
    // map info
};
var bitMaps = {};
_.each(_bitMaps, function (value, key) {
    bitMaps[key.toUpperCase()] = value;
});

function getUserRights(bits, key) {
    key = (key || '').toUpperCase();
    return bitMaps[key] != null ? !!+bits.charAt(bitMaps[key]) : false;
}
```

经过上述改动，getUserRights 的效率提升了 90+%，而上述很多性能问题点中都多次调用了 getUserRights，所以这点改动就能带来明显的性能提升。

### 善用位运算

```js
var buildRegionBitMaps = function (bit, rBit) {
    var result;
    if (!bit || !rBit) {
        return '';
    }
    var zoneBit = (bit + '').split('');
    var regionBit = (rBit + '').split('');
    var forList = zoneBit.length > regionBit.length ? zoneBit : regionBit;
    var diffList = zoneBit.length > regionBit.length ? regionBit : zoneBit;
    var resultList = [];
    _.each(forList, function (v, i) {
        resultList.push(parseInt(v) || parseInt(diffList[i] || 0));
    });
    result = resultList.join('');
    return result;
};
var initRegionsHash = function (data) {
    // some code
    _.each(data, function (o) {
        if (!regionsHash[o['Region']]) {
            regionsHash[o['Region']] = [];
            regionsHash['regionBits'][o['Region']] = o['BitMaps'];
            regionsList.push(o['Region']);
        }
        regionsHash['regionBits'][o['Region']] = buildRegionBitMaps(
            o['BitMaps'],
            regionsHash['regionBits'][o['Region']]
        );
        regionsHash[o['Region']].push(o);
    });
    // some code
};
```

buildRegionBitMaps 是将两个 512 位长（看当前代码，长度未必固定）的权限位二进制字符串进行合并，计算出实际的权限，目前的代码将二进制字符串拆解为数组，然后遍历去计算出每一位的权限，效率较低。initRegionsHash 中会调用多次 buildRegionBitMaps，导致这里的性能问题被放大。

这里可以使用位运算来方便的计算出权限，效率会比数组遍历高很多。

```js
var buildRegionBitMaps = function (bit, rBit) {
    if (!bit || !rBit) {
        return '';
    }
    var result = '';
    var longBit, shortBit, shortBitLength;
    if (bit.length > rBit.length) {
        longBit = bit;
        shortBit = rBit;
    } else {
        longBit = rBit;
        shortBit = bit;
    }
    shortBitLength = shortBit.length;
    var i = 0;
    var limit = 30;
    var remainder = shortBitLength % 30;
    var mergeLength = shortBitLength - remainder;
    var mergeString = (s, e) =>
        (parseInt('1' + longBit.substring(s, e), 2) | parseInt('1' + shortBit.substring(s, e), 2))
            .toString(2)
            .substring(1);
    for (; i < mergeLength; ) {
        var n = i + limit;
        result += mergeString(i, n);
        i = n;
    }
    if (remainder) {
        result += mergeString(mergeLength, shortBitLength);
    }
    return result + longBit.slice(shortBitLength);
};
```

通过上述改动，initRegionHash 运行时间被优化到 2ms - 8ms，提升 90+%。注意 JavaScript 中位运算基于 32 位，超过 32 位溢出，所以上面拆解为 30 位的字符串进行合并。

### 减少重复任务

```js
function () {
    currentTrans = {};
    angular.forEach(products, function (product, index) {
        setLoaded(product['name'],options.key,true);
        currentTrans = extendProduct(product['name'],options.key, CNlan);
    });
    currentTrans = extendProduct(Loader.cname||'common',options.key, CNlan);
    if($rootScope.reviseTrans){
        currentTrans = Loader.changeTrans($rootScope.reviseNoticeSet,currentTrans);
    }
    deferred.resolve(currentTrans[options.key]);
}
```

上述代码被用来进行产品语言的合并，products 中是路由对应的产品名，会有重复，其中 common 的语言较大，有 1W 多个 key，所以合并时耗时较为严重。

```js
function () {
    console.time('extendTrans');
    currentTrans = {};
    var productNameList = _.union(_.map(products, product => product.name));
    var cname = Loader.cname || 'common';
    angular.forEach(productNameList, function(productName, index) {
        setLoaded(productName, options.key, true);
        if (productName === cname || productName === 'common') return;
        extendProduct(productName, options.key, CNlan);
    });
    extendProduct('common', options.key, CNlan);
    cname !== 'common' && extendProduct(cname, options.key, CNlan);
    if ($rootScope.reviseTrans) {
        currentTrans = Loader.changeTrans($rootScope.reviseNoticeSet, currentTrans);
    }
    deferred.resolve(currentTrans[options.key]);
    console.timeEnd('extendTrans');
}
```

这边将 product 中的产品名去重减少合并次数，然后将 common 和 cname 对应的语言合并从遍历中剔除，在最后做合并来减少合并次数，减少前期合并的数据量。经过改动后 extendTrans 速度提高了 70+%。

### 尽早退出

```js
user.getNav = function () {
    var result = [];
    if (_.isEmpty($rootScope.USER)) {
        return result;
    }
    _.each(modules, function (list) {
        var show = true;
        if (list.isAdmin === true) {
            show = $rootScope.USER.Admin == 1;
        }
        var authBitKey = list.bitKey ? regionService.getUserRights(list.bitKey.toUpperCase()) : show;
        var item = _.extend({}, list, {
            show: show,
            authBitKey: authBitKey
        });
        if (item.isUserNav === true) {
            result.push(item);
        }
    });
    return result;
};
```

getNav 中的 modules 为路由，上面也提到过，路由较多有近千，而在这里的遍历中调用了 getUseRights，导致性能损失严重，并且又一个非常严重的问题是，大部分的数据会被 isUserNav 筛除掉。

```js
user.getNav = function () {
    var result = [];
    if (_.isEmpty($rootScope.USER)) {
        return result;
    }
    console.time(`getNav`);

    _.each(modules, function (list) {
        if (list.isUserNav !== true) return;

        var show = true;
        if (list.isAdmin === true) {
            show = $rootScope.USER.Admin == 1;
        }
        var authBitKey = list.bitKey ? regionService.getUserRights(list.bitKey.toUpperCase()) : show;
        var item = _.extend({}, list, {
            show: show,
            authBitKey: authBitKey
        });
        result.push(item);
    });
    console.timeEnd(`getNav`);
    return result;
};
```

通过将判断提前，尽早结束无意义的代码，和之前对 getUserRights 所做的优化，getNav 的速度提高了 99%。

### 善用 lazy

```js
renderMenuList = () => {
    const { translateLoadingSuccess, topMenu } = this.props;

    if (!translateLoadingSuccess) {
        return null;
    }

    return topMenu
        .filter(item => {
            const filterTopNavShow = this.$filter('filterTopNavShow')(item);
            return filterTopNavShow > 0;
        })
        .map((item = [], i) => {
            const title = `INDEX_TOP_${(item[0] || {}).type}`.toUpperCase();
            return (
                <div className='uc-nav__edit-panel-item' key={i}>
                    <div className='uc-nav__edit-panel-item-title'>{formatMessage({ id: title })}</div>
                    <div className='uc-nav__edit-panel-item-content'>
                        <Row gutter={12}>{this.renderMenuProdList(item)}</Row>
                    </div>
                </div>
            );
        });
};
```

上述代码在控制台的一个菜单编辑面板中，这个面板只有用户点击了编辑才会出现，但是现有逻辑导致这块数据会经常，一进页面会执行 7 次 filterTopNavShow，并且还会重新渲染。

```js
renderMenuList = () => {
    const { translateLoadingSuccess, topMenu, mode } = this.props;

    if (!translateLoadingSuccess) {
        return null;
    }
    if (mode !== 'edit' && this._lazyRender) return null;
    this._lazyRender = false;

    const menuList = topMenu
        .filter(item => {
            const filterTopNavShow = this.$filter('filterTopNavShow')(item);
            return filterTopNavShow > 0;
        })
        .map((item = [], i) => {
            const title = `INDEX_TOP_${(item[0] || {}).type}`.toUpperCase();
            return (
                <div className='uc-nav__edit-panel-item' key={i}>
                    <div className='uc-nav__edit-panel-item-title'>{formatMessage({ id: title })}</div>
                    <div className='uc-nav__edit-panel-item-content'>
                        <Row gutter={12}>{this.renderMenuProdList(item)}</Row>
                    </div>
                </div>
            );
        });
    return menuList;
};
```

这边简单的通过添加一个 \_lazyRender 字段，将渲染和计算延迟到初次打开时再去做，避免了页面初始化时的不必要操作。

## 成果

先看下改造前后的时间对比

| 名称               | 单次耗时       | 优化效果                      |
| ------------------ | -------------- | ----------------------------- |
| initState          | 200ms \- 400ms | 120ms \- 300ms，减少 30%\-40% |
| initRegionHash     | 50ms \- 110ms  | 2ms \- 8ms，减少 90%          |
| getMenu            | 0 \- 40ms      | 0ms \- 8ms，减少 80%          |
| initRegion         | 70ms \- 200ms  | 3ms \- 10ms，减少 90%         |
| getProducts        | 40ms \- 80ms   | 3ms \- 10ms，减少 90%         |
| getNav             | 40ms \- 200ms  | 0ms \- 2ms，减少 99%          |
| extendProductTrans | 40ms \- 120ms  | 10ms \- 40ms 减少 70%         |
| filterStorageMenu  | 4ms \- 10ms    | 0ms \- 2ms，减少 80%          |
| filterTopNavShow   | 0 \- 20ms      | 初次加载不再执行，展开执行    |

对比还是比较明显的，大部分时间都控制在了 10ms 以内。

可以再看一下改造前后的 Profiler 的图形。

改造前： ![picture 11](https://stg.heyfe.org/images/blog-2019-console-performance-67.png)

改造后： ![picture 12](https://stg.heyfe.org/images/blog-2019-console-performance-24.png)

经过优化可以看到很多峰值都已经消失了（剩余的是一些目前不太好做的优化点），进入页面和切换产品时也能明显感受到差异。

## 总结

从上述优化代码中可以看到，大部分的性能问题都是由循环带来的，一个小小的性能问题在经过多次循环后也会带来严重的影响，所以平时代码时很多东西还是需要尽可能注意，比如能尽快结束的代码就尽快结束，没有必要的操作一概省略，该做缓存的做缓存，保持良好的编程习惯，可以让自己的代码哪怕在未知情况下也能保证良好的运行速度。

借助 JavaScript Profiler 和 console.time，性能排查和优化可以做到非常简单，排查到问题点，很容易针对问题去做优化方案。