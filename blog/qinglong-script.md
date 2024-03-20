---
lastUpdate: 2023-3-19
date: 2023-3-19
---
# 青龙面板 - 写个签到脚本

本文我们尝试写一个 JS 的签到脚本，然后通过青龙面板对其进行管理。

## 脚本编写

编写脚本时，我们可以选择 nodejs、python、bash 脚本，此处以 nodejs 脚本为例。

首先我们先使用 Chrome 的网络请求面板找到签到网站中的签到请求，然后右键对应的请求：

![picture 1](https://stg.heyfe.org/images/blog-qinglong-script-62.png)

然后我们选择 `Copy as Node.js fetch`，Chrome 就会将请求所需要的配置、cookie、headers 等自动生成一段 fetch 请求代码，比如：

```js
fetch('https://xxxxx.com/api/sign_in', {
    headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ko;q=0.6',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'XMLHttpRequest',
        cookie: 'xxxxxxxxxxxxxx',
        Referer: 'https://xxxxx.com',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    body: 'action=sign_in&id=5',
    method: 'POST'
});
```

我们就可以将该段代码放到脚本中直接运行，我们先创建一个文件，为了安全我们可以抽离出其中的 cookie 信息放到环境变量中，然后添加上一些日志等。

```js
const cookie = process.env.XXX_COOKIE;

(async () => {
    try {
        const res = fetch('https://xxxxx.com/api/sign_in', {
            headers: {
                // ...
                cookie
            },
            body: 'action=sign_in&id=5',
            method: 'POST'
        });
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.error(e);
    }
})();
```

然后我们在青龙面板中打开 `脚本管理` 面板，然后点击右上角的添加按钮：

![picture 2](https://stg.heyfe.org/images/blog-qinglong-script-87.png)

然后我们选择本地文件类型，将刚刚的文件上传上去，便可以在右侧看到上传的文件：

![picture 3](https://stg.heyfe.org/images/blog-qinglong-script-29.png)

## 环境变量

添加环境变量时我们直接在环境变量面板中点击右上角的新建变量，然后输入变量名称即可：

![picture 6](https://stg.heyfe.org/images/blog-qinglong-script-79.png)

比如上述脚本我们可以在名称中输入 `XXX_COOKIE`，然后在值中输入对应的 cookie 值。

并且青龙面板中可以添加多个同名称的环境变量，多个环境变量在执行时会被合并一个，使用`&` 进行连接，所以如果我们有多个账号时，我们可以使用如下方式来进行执行：

```js
(async function () {
    const cookies = process.env.XXX_COOKIE.split('&');
    for (const cookie of cookies) {
        try {
            await run(cookie);
        } catch (error) {
            console.error(error);
        }
    }
})();
```

## 任务定义

然后我们进入定时任务面板，点击右上角的新建任务，然后输入对应的名称等：

![picture 4](https://stg.heyfe.org/images/blog-qinglong-script-4.png)

此处的命令我们可以直接使用 `task filename`，此时这样青龙面板会在定时器触发时随机生成一个延时时间，然后在延时时间结束后执行改脚本文件。

task 除了默认的延时触发外，还提供了如下参数：

-   `task <file_path>` - 依次执行，如果设置了随机延迟，将随机延迟一定秒数
-   `task <file_path> now` - 依次执行，无论是否设置了随机延迟，均立即运行，前台会输出日，同时记录在日志文件中
-   `task <file_path> conc <env_name> <account_number>(可选的)` - 并发执行，无论是否设置了随机延迟，均立即运行，前台不产生日，直接记录在日志文件中，且可指定账号执行
-   `task <file_path> desi <env_name> <account_number>` - 指定账号执行，无论是否设置了随机延迟，均立即运行
-   `task -m <max_time> <file_path>` - 设置任务超时时间
-   `task -l <file_path>` - 实时打印任务日志，创建定时任务时，不用携带此参数

而定时规则对应的是 crontab，直接使用 crontab 规则进行编写即可。如： `30 8 * * *` 即表示每天的 8:30 分执行任务。

添加完成后我们可以在列表中看到刚刚添加的任务，并可对其进行操作，如立即执行、查看日志等等：

![picture 5](https://stg.heyfe.org/images/blog-qinglong-script-80.png)

## 最后

如此我们便可完成一个自定义定时的任务脚本。
