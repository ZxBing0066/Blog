---
title: 利用 Cloudflare 和 Gmail 实现域名邮箱
description: 记录下如何利用 Cloudflare 和 Gmail 实现域名邮箱。
pubDate: '2025-03-13'
tags:
    - Cloudflare
---

当拥有一个网站后，不想把自己的私人邮箱暴露在网站上，这时候就可以利用 Cloudflare 和 Gmail 来实现域名邮箱。

## 正文

### 收件

第一步为了能够使用域名邮箱收到邮件，我们可以借助 Cloudflare 的邮箱服务来实现。

首先需要注意将自己的域名挂靠到 Cloudflare 上，然后按照以下步骤操作：

1. 进入 Cloudflare 对应域名页面，点击左侧栏的电子邮箱菜单，如果没有开启过邮箱服务会提示开启，点击开始即可。注意可能会提示你创建邮箱，直接跳过即可。 ![](https://stg.heyfe.org/images/blog-cloudflare-gmail-1741839580945.png)
2. 进入后可以看到提示“电子邮件路由当前被禁用，没有在路由电子邮件。”，点击“启用”按钮按照操作添加即可。![](https://stg.heyfe.org/images/blog-cloudflare-gmail-1741839650545.png)
3. 进入路由规则面板，打开 Catch-All 规则，并点击后方的编辑按钮。![](https://stg.heyfe.org/images/blog-cloudflare-gmail-1741839799651.png)
4. 将操作从“删除”改成“发送到电子邮件”，并选择你想要转发的邮箱。如果没找到自己的邮箱，需要在“目标地址”面板中将邮箱添加到目标地址中。

这样操作后，所有发送到你域名的邮件都会被转发到你设置的邮箱中。可以测试一下，**注意不要从目标邮箱发送测试邮件**，部分邮箱不支持这么操作。

### 发件

配置完成后虽然收件没问题了，但是会件时还是使用的自己的邮箱地址，依然会暴露自己的私人邮箱。还需要在 Gmail 中操作一下来。

1. 进入 Gmail 邮箱，点击右上角的设置按钮 - 选择全部设置 - 进入账号设置，可通过 [此链接](https://mail.google.com/mail/u/0/#settings/accounts) 进入。 ![](https://stg.heyfe.org/images/blog-cloudflare-gmail-1741840206290.png)
2. 点击 Send mail as - Add another email address，添加自己的域名邮箱。 ![](https://stg.heyfe.org/images/blog-cloudflare-gmail-1741840375655.png)
3. 在弹窗中填入想要支持发件的自定义域名邮箱并设置一个别名。![](https://stg.heyfe.org/images/blog-cloudflare-gmail-1741840456244.png)
4. 在下一步填写 `smtp.gmail.com` 作为 SMTP 服务器，email 的邮箱地址做用户名，密码需要使用 `App Password`。![](https://stg.heyfe.org/images/blog-cloudflare-gmail-1741840559476.png)
5. 打开 [App Password 页面](https://security.google.com/settings/security/apppasswords)，随便输入一下密码名称点击创建密码，即可生成一个 App Password。注意删除密码中的空格后复制到刚刚弹窗中的密码框中。
6. 保存后可以看到刚刚添加的邮箱地址出现在列表中，然后 Gmail 会收到一份 `Gmail Confirmation - Send Mail as` 的邮件，点击邮件中的链接确认即可。如果没收到需要在列表中点击 verify 链接重新发送确认邮件。

发邮件或回复时直接在上方点击会显示一个选择菜单，选择想要使用的邮箱地址即可。

![](https://stg.heyfe.org/images/blog-cloudflare-gmail-1741840931658.png)