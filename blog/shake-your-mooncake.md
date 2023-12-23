---
lastUpdate: 2022-9-10
date: 2022-9-10
---
# 中秋快乐，快来摇出你的本命月饼吧

中秋节到了，吃月饼必不可少，为了让大家能够更愉快的过中秋，我花了一晚的功夫开发了一个摇一摇的页面，通过页面摇一摇，可以摇出各种各样的月饼，快来试试你的本命月饼是什么吧。

由于使用摇一摇来抽取月饼，所以需要使用手机打开才行，可手机打开我的网站地址尝试：https://shake-your-mooncake.heyfe.org/ 。

该网站源码地址：https://github.com/ZxBing0066/shake-your-mooncake

注意玩耍时如果摇不出可尝试加大摇一摇幅度哦。不过请小心练出麒麟臂 💪，并在无人环境下进行，避免被误以为发病（🐶）。

注意一共收集了 25 种月饼，越少见的月饼越难摇出，看看你能收集到哪些月饼吧。

## 技术实现

下面稍微讲一下技术实现的内容。

### 摇一摇

首先是关于摇一摇部分，摇一摇的实现主要使用的是浏览器中的 `devicemotion` 事件，该事件可以获取到设备的速度变化、位置、方向等信息。

```ts
window.addEventListener('devicemotion', e => {
    const devicemotion = {
        accelerationIncludingGravityX: e.accelerationIncludingGravity.x!,
        accelerationIncludingGravityY: e.accelerationIncludingGravity.y!,
        accelerationIncludingGravityZ: e.accelerationIncludingGravity.z!
    };

    if (latestDevicemotion) {
        // 摇一摇的幅度
        const thresholdCount = Math.max(
            Math.abs(latestDevicemotion.accelerationIncludingGravityX - devicemotion.accelerationIncludingGravityX),
            Math.abs(latestDevicemotion.accelerationIncludingGravityY - devicemotion.accelerationIncludingGravityY),
            Math.abs(latestDevicemotion.accelerationIncludingGravityZ - devicemotion.accelerationIncludingGravityZ)
        );

        // 大于一定幅度才计算
        if (thresholdCount > 20) {
            shakeCount += 8;
        }

        shakeCount = Math.max(0, shakeCount - 2);
    }

    latestDevicemotion = devicemotion;
});
```

代码如上，通过 `devicemotion` 事件数据，可以获取到三个方向的加速度，然后将其和之前的数值进行比对即可得出摇一摇的幅度，然后通过 `shakeCount` 来模拟记录持续摇一摇的时长，从而实现模拟摇一摇触发的效果。

需要注意的是，在安卓设备中，需要在 `https` 环境下才能正常触发 `devicemotion` 事件，所以本地开发时会有些麻烦，必须对本地开发工具启用 `https`。而在 `iOS` 中，除了必须是在 `https` 环境外，还需要使用 `DeviceMotionEvent.requestPermission` 获取到权限后才能监听到事件，所以我将事件绑定抽取出来，根据环境来进行调用，具体相关代码如下：

```ts
if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
    (DeviceMotionEvent as any)
        .requestPermission()
        .then((permissionState: string) => {
            if (permissionState === 'granted') {
                bindEvent();
            }
        })
        .catch(() => {
            alert('获取权限失败');
        });
} else {
    bindEvent();
}
```

### 震动与音效

当摇动幅度和摇动时间达到一定阈值后，摇一摇事件触发，会从月饼列表中抽取随机抽取一个月饼，并且会调用手机震动和播放音效来提醒摇一摇的用户出货了。🐶

```ts
if (thresholdCount > 80 && shakeCount > 100) {
    window.navigator.vibrate?.(200);

    const audio = document.createElement('audio');
    audio.src = '/success.mp3';
    document.body.appendChild(audio);
    audio.onended = () => document.body.removeChild(audio);
    audio.play();
}
```

不过实际月饼抽取逻辑略有些出入，并不是摇一摇后触发，而是预先选定，有兴趣的可以看下源码。

需要注意的是，无论是震动、还是播放音效，在 `iOS` 中由于兼容问题和系统限制，均无法实现。🤦‍♂️ 真不是我的锅。所以各位 `iOS` 用户在玩耍时还得看好手机，出货了就停止，不然。。。手臂真的会很累的。

## 总结

本文主要是就着中秋节这个档口，正好试试浏览器的 `devicemotion` 事件的使用，实际过程中坑还是挺多的，因为浏览器不触发事件也没有报错，都不知道 `https` 和 `iOS` 中申请权限的问题，导致浪费了一些时间去查资料。

不过该事件还是很有趣，有创意可以玩出很多花样，依稀记得很久以前 `Google` 有个绝地武士将手机当光剑的游戏来着。
