# 利用 Cloudflare Access - 打造个人私密站点

最近在白嫖云上搭建了一些小的服务，为了方便使用，这些服务一般会提供 WebUI，然而我并不想让其他人能够使用这些搭建在公网上的个人工具站点。之前也讲到我的白嫖云上的服务都是挂在 Cloudflare 上这样可以很好的隐藏机器的真实 IP 并屏蔽未知的流量，所以想看看 Cloudflare 有没有这样的服务：在进入我的站点前拦截请求并要求进行验证，验证通过后再放行。只能说 **Cloudflare 从不让人失望**，产品力太强了，果然有提供类似的功能，并且比我预想的还要完善，就是 Cloudflare Access。

## 使用

要使用 Access 功能，我们需要先从侧边栏进入 Zero Trust：

![picture 1](https://stg.heyfe.org/images/blog-cloudflare-access-1680920254081.png)

然后从 Zero Trust 的侧边栏进入 Access -> Application：

![picture 2](https://stg.heyfe.org/images/blog-cloudflare-access-1680920332807.png)

然后点击 Add an application：

![picture 3](https://stg.heyfe.org/images/blog-cloudflare-access-1680920419991.png)

此时可以选择类型，由于我的是用于拦截 Cloudflare 中的 Proxy 站点，所以我直接选择 Self-hosted，Sass 类型主要针对的是一些 Sass 服务和内网，并没有研究这里不多说。

选择好类型后我们需要输入对应的配置，包括程序的名称、session 的失效时长、域名地址、自定义 Logo 的地址以及认证方式。

![picture 4](https://stg.heyfe.org/images/blog-cloudflare-access-1680920975977.png)

此处的域名地址支持子域名、主域名和路径，比如我要拦截到 access.heyfe.org 请求就可以将子域名配置为 access，主域名选择 heyfe.org，然后路径留空即可。

至于认证方式默认情况下只有 One-time PIN 这一种，如果需要更多的认证方式可以到 Setting -> Authentication -> Login methods 中添加：

![picture 6](https://stg.heyfe.org/images/blog-cloudflare-access-1680921208375.png)

具体的添加不细说，点击选择后 Cloudflare 会有详细的指引，基本就是 OAuth 接入流程，但是 Cloudflare 会提供认证回调服务，所以不需要自己搭建任何服务。

当前面的配置都填写完成后点击下一步便会进入具体的规则配置页面：

![picture 7](https://stg.heyfe.org/images/blog-cloudflare-access-1680927807811.png)

此处我们需要先为策略起一个名字并选择策略的类型是 Allow 还是 Block，还有 Session 的过期时间。

策略类型 Allow 可以理解为白名单，即符合该策略规则的用户可以通过，而 Block 则为黑名单规则相反，此外还有 Bypass 和 Service Auth。

一般而言此处回选择 Allow， Session 则保持默认即可。然后便可以配置具体的规则：

![picture 8](https://stg.heyfe.org/images/blog-cloudflare-access-1680928049129.png)

此处可以配置多条匹配规则，且规则类型可以是 include、exclude 和 require，然后规则匹配可以使用邮箱、邮箱后缀、IP 范围、国家、认证方式等等。基本可以满足绝大多数可以想到的需求。

![picture 9](https://stg.heyfe.org/images/blog-cloudflare-access-1680928239092.png)

此处以邮箱为例，可以通过邮箱匹配可以通过的邮箱账户。这里有一个需要注意的地方，**录入的邮箱必须是小写字母**，其实绝大多数的邮箱认证匹配等都会将邮箱转换为小写，因为我的 Gmail 注册的时候有使用大写字母，所以习惯使用大写，然后这里第一次认证发现没通过。

除了这些基础配置外，Access 还提供了一些进阶配置，可以配置临时认证、申请等功能。

在完成上述配置后，点击下一步 Access 还提供了跨域、Cookie 等配置，一般情况下无需修改：

![picture 1](https://stg.heyfe.org/images/blog-cloudflare-access-application-1680928553548.png)

当一切都配置完成后，就可以点击 Add Application 按钮创建了，创建完成后再次打开页面可以看到页面被拦截了进入了 Access 认证页面：

![picture 3](https://stg.heyfe.org/images/blog-cloudflare-access-application-1680928785674.png)

当你输入邮箱后 Cloudflare 会给你的邮箱发送一份认证邮件，可以使用邮件中的 Code 进行登陆，也可以直接点击邮箱中的快速认证链接。认证完成后，如果你有权限访问站点，就会进入原始站点，如果没有的话则会展示拦截页面。

如果觉得认证页面和拦截页面不太好看，也可以进入 setting -> General 中进行自定义，不过要注意，只能修改有限的文字、Icon 和背景色等。

![picture 4](https://stg.heyfe.org/images/blog-cloudflare-access-application-1680929022777.png)

## 价格

忘记说了，上面的功能基本上可以认为是完全免费的：

![picture 5](https://stg.heyfe.org/images/blog-cloudflare-access-application-1680929107027.png)

## 最后

用 Cloudflare 也有好多年了，不得不说， Cloudflare 基本能够实现我想象的所有功能，基本算是唯一一个让我完全没有槽点的产品，只能说真的太强了。对于个人开发者而言，提供的所有功能基本都可以免费用到，香是真的香。
