---
title: AI 加成？翻译贼 6？deepl 踩坑记
description: "大家好，我是嘿嘿 \U0001F601，昨儿个老板突然让把某官网文档翻译成英文，文档是 markdown 写的，好像有上百篇吧，人工翻译是不可能了，所以找到了 deepl 的 API，打算让我脚本快速翻一下。所以就成..."
pubDate: '2022-07-29'
tags: []
---

大家好，我是嘿嘿 😁，昨儿个老板突然让把某官网文档翻译成英文，文档是 markdown 写的，好像有上百篇吧，人工翻译是不可能了，所以找到了 deepl 的 API，打算让我脚本快速翻一下。所以就成功让我水出了本篇。

## 介绍

先说 deepl，官网就是这个 https://www.deepl.com/。

和常见的翻译软件/网站一样，它提供了免费的网页翻译，并且可以一次翻译最多 5000 个字符，试了一下翻译效果，确实比一般某些水文机翻好一些。他还提供了免费的文档翻译，可以上传 PDF、Word、PPT 进行直接翻译。不过这和我本篇水文无关，咱是冲着他的 API 来的。

然后随便点了点网页，突然一行大字映入眼帘：

![picture 1](https://stg.heyfe.org/images/blog-deepl-api-usage-31.png)

喂，xd，路走窄了啊，违反广告法了你知道吗？哦，你在德国啊，那没事了。

好了进入正题，开始踩坑。

## 踩坑之路

### 第一坑 - 注册

先打开 API 页面，上来就让注册，然后我发现，这货只能在欧洲和美国、日本等几个国家注册。嘿，不信邪的我掏出了美国地址生成器，拿着同事的海外信用卡一顿操作，终于。。。我放弃了。这什么破生成器，连注册都过不去 😭。没办法，然后老板想到了某宝。好家伙，不愧是万能的某宝，几块钱就搞定了。

我拿着买好的账号登陆进去，然后开始查看 API 文档，闭眼开始寻找 demo，然后就找到了无比简陋的 demo，代码都没得，就一个请求体。

```sh
GET /v2/translate?auth_key=[yourAuthKey]&text=Translate it HTTP/1.0
Host: api.deepl.com
User-Agent: YourApp
Accept: */*
```

行吧，好家伙，反正能看出来咋用了，无非就是拿着 authKey 和 text 发请求，连个签名操作都不需要，够无脑。

### 第二坑 - 失踪的 authKey

等等 authKey 在哪？🧐 我在用户信息页面翻了半天，总算在某次点击后在页面的最下方找到了，好家伙，这货是异步渲染的，速度还比较慢，所以我好几次点进来没看到就直接跳走了。

好了现在随便写几行代码来个请求。

```ts
import axios from 'axios';
import fs from 'fs';

const authKey = fs.readFileSync('./authKey.key', 'utf8');

const translate = async (content: string) => {
    const res = await axios.post(
        `https://api.deepl.com/v2/translate`,
        new URLSearchParams({
            auth_key: authKey,
            text: content,
            target_lang: 'EN',
            source_lang: 'ZH_CN'
        })
    );
    return res.data;
};

translate('你好，世界！');

export default translate;
```

我以为一切都如想象中那么美好，然而这一切不过是刚开始。

### 第三坑 - 报错开始

当我将这段代码跑起来，没几秒，他就报错了 `Wrong endpoint. Use https://api.deepl.com`，这是几个意思？我寻思着我这地址也没错啊。然后我去网上一堆搜索，emm 同样的报错一般都出现在 authKey 错误的清空下，我仔细核对也没问题啊，无果后又重新生成 authKey 再试，依旧无果。

emmm，难道是我姿势不对？纳闷了，然后再搜索中我突然发现，这货原来有 sdk。。。，傻了（事后我发现，文档页面上方就是 SDK，然而我只顾着找实例代码，压根没把他放在眼里 🤦‍♂️），所以我又重新安装 sdk 重新操作了一通。

依旧是一段平平无奇的代码：

```ts
import * as deepl from 'deepl-node';
import fs from 'fs';

const authKey = fs.readFileSync('./authKey.key', 'utf8');
const translator = new deepl.Translator(authKey);

const translate = async (content: string) => {
    return (await translator.translateText(content, 'zh', 'en-US')).text;
};

translate('你好，世界！');

export default translate;
```

保存、执行、报错一气呵成。嘿，好家伙，还是那个报错，难道他们自己的 sdk 也有问题？这不太科学啊，于是我又去看了下账户信息，看看 authKey 是不是有啥问题。然后我发现，这买的是个 pro 账号，根本没有 API 的权限。🤦‍♂️

### 第四坑 - 账号类型

这货的付费有两种类型，一个是团队用、一个是开发用，然后团队版有免费试用，老板买的账号就是免费试用的，然而只有开发版本才有 API 权限 🤦‍♂️，当场我就拿着 🔪 去找老板了（误。

无奈的我去账号页面看了一眼，发现可以切换账号类型，害，我就切成了 API 付费账号。再跑，结果第二个报错来了：`Authorization failure, check auth_key`。🤔️ 这不对劲啊，我再去核对了一眼 authKey，发现切换账号后，authKey 会自己更新，行吧，替换完 authKey，终于跑成功了。接下来就简单了，把所有 md 文件都跑一遍就完事了。

依旧是一段平平无奇的代码：

```ts
import * as fs from 'fs';
import path from 'path';
import translate from './translate';

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(function (dirent) {
        if (currentDirPath.includes('node_modules') || currentDirPath.includes('_script_')) return;
        var filePath = path.join(currentDirPath, dirent.name);
        if (dirent.isFile()) {
            callback(filePath, dirent);
        } else if (dirent.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}
const files = [];
walkSync('../', function (filePath, stat) {
    if (filePath.endsWith('.bak.md') || filePath.endsWith('.bak')) {
        fs.unlinkSync(filePath);
    } else if (filePath.endsWith('.md')) {
        files.push(filePath);
    }
});

const skipFiles = [],
    failFiles = [],
    successFiles = [];
(async () => {
    for await (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        if (!!content.trim() && /[\u4e00-\u9fa5]+/.test(content)) {
            try {
                const result = await translate(content);
                if (!result) throw new Error('res empty');
                fs.writeFileSync(file, result);
                console.log('translate ' + file);
                successFiles.push(file);
            } catch (error) {
                console.error(`translate ${file} fail`, error + '');
                failFiles.push(file);
            }
        } else {
            console.log('skip ' + file);
            skipFiles.push(file);
        }
    }
    console.log('failFiles', failFiles);
})();
```

把所有 md 文件跑一遍，顺便把某些人保留的一些没用的备份删咯。

为了避免同时请求数过多导致报错，我就单线程跑了，不过这 API 速度真是有点慢。好几秒才跑一个文件，然后，这货又报错了。

我从上到下看了下报错，先是 `Error: texts parameter must be a non-empty string or array of non-empty strings`，看样子是有几个空的 md 文件。。。不是，写文档的兄弟，你这拿着 git 不当备份就算了，你这搞这么多空文件算怎么回事。然后是 `Error: Connection failure: timeout of 7366ms exceeded`，害，看样子是某些文档太大，翻译超时了，不过 sdk 有超时参数，问题不大，拉长点就是了。

改完后终于松了口气，没报错了，不过速度这么慢这谁顶得住，行吧我去喝口清水顺便放个浊水。

回来接着搬砖后文件有点多，我也没有盯着看，然后过了大概几、也许十几、或许几十分钟后，我终于想起他。他。。。又报错了。

### 第五坑 - 我号没了？

`Authorization failure, check auth_key` 又回来了。😭 好家伙，这又咋了。我上账号又去检查了一下 authKey，然后发现，我号没了！

![picture 2](https://stg.heyfe.org/images/blog-deepl-api-usage-44.png)

行吧，切账号的时候我就估计可能行不通，看样子账号校验有点延迟。无奈，剩下还有十几篇没翻译完的文档，我就找百度翻译搞了。

一段丑陋的代码，从百度的例子复制过来 var 都没改就用了：

```ts
import axios from 'axios';
import fs from 'fs';

import MD5 from './md5';

const keyConfig = fs.readFileSync('./bd.key', 'utf-8');
const { appid, key } = JSON.parse(keyConfig);

const translate = async (content: string) => {
    var salt = new Date().getTime();
    var query = content;
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'zh';
    var to = 'en';
    var str1 = appid + query + salt + key;
    var sign = MD5(str1);
    const res = await axios.post(
        `https://fanyi-api.baidu.com/api/trans/vip/translate`,
        new URLSearchParams({
            q: query,
            appid: appid,
            salt: salt as unknown as string,
            from: from,
            to: to,
            sign: sign
        })
    );
    if (!res.data.trans_result) console.log(res.data);
    return res.data.trans_result?.map(v => v.dst).join('\n');
};

export default translate;
```

百度翻译会将文本切段进行翻译，所以返回后需要自己拼接，然后百度还有个坑，会将 md 中的 # 后的空格去掉 🤦‍♂️。

### 第六坑 - 翻译质量

行吧，勉强能用。我把更新提交到 GitHub，然后同事校验发现。。。 deepl 的 API 好像有点智障，发现好几段重复文本，还有丢失的。然而网页版测试好像也没问题啊。好家伙，还得人工检查一下。

然而没多久，老板走过来说：那个不用搞了，我们文档系统可以把所有文件导出成一个 pdf 文件，我拿 deelp pro 账号直接线上翻译完了。 我。。。

## 完结撒花

行吧，虽然最终我的工作没有任何输出，不过也踩了这么多坑，记录一下，等待有缘人看见了能少踩几个吧。