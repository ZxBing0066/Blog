# PushDeer 消息推送服务

PushDeer 是一个好用的跨平台消息推送服务，可以用于进行一些消息推送，客户端支持 iPhone、MacOS、Android。比如自己有一些脚本信息、服务器状态等消息，需要推送消息来让自己知晓时便可以使用。

类似的服务还有 Server 酱、微信机器人等，不过大部分都有限制或者收费，目前用了一段时间 PushDeer 服务稳定且跨平台，并且还支持服务自建。

官方文档中表示它是在线服务收费，不过目前没看到任何收费点：

![picture 1](https://stg.heyfe.org/images/blog-push-deer-3.png)

## 注册

PushDeer 使用非常简单，只需要按照如下步骤即可：

1. 到 [官网](https://www.pushdeer.com/official.html) 安装 app
2. 登陆（支持 apple 账号和微信登陆）
3. 到设备页面点击右上角的加号添加当前设备
4. 到 key 页面点击右上角的加号新增一个 key

此时我们就可以使用生成的 key 来给注册的设备发送消息了。

## 发消息

PushDeer 发送消息非常简单，只需要直接使用 key 调用 API 即可：https://api2.pushdeer.com/message/push?pushkey=key&text=要发送的内容。

以 axios 为例：

```js
const res = await axios.post('https://api2.pushdeer.com/message/push', null, {
    params: {
        pushkey: pushDeerKey,
        text: 'title',
        desp: messages.join('\n'),
        type: 'text'
    }
});
if (res.code !== 0) {
    console.error(JSON.stringify(res.data));
}
```

PushDeer 还支持图片类型和 markdown 类型消息，具体的参数如下：

| 参数    | 说明                   | 备注                                             |
| ------- | ---------------------- | ------------------------------------------------ |
| pushkey | PushKey                |                                                  |
| text    | 推送消息内容           |                                                  |
| desp    | 消息内容第二部分，选填 |                                                  |
| type    | 格式，选填             | 文本=text，markdown，图片=image，默认为 markdown |

## 最后

PushDeer 除了上述的消息发送 API 外还提供了大量其他的 API，具体的可参考： https://www.pushdeer.com/dev.html 。

PushDeer 作为一个消息推送服务，满足我目前的所有需求：跨平台、免费、无限制。

## 参考链接

-   https://www.pushdeer.com/official.html
