---
tags: [Cloudflare]
summary: 介绍在 Cloudflare 中如何进行重定向的配置，几种方案和可能遇到的问题的分析解决。
cover: https://stg.heyfe.org/images/blog-cloudflare-1690700083116.png
---

# Cloudflare 重定向配置

最近把之前的一个网站域名换成另一个域名，想要添加一下重定向，避免流量流失（虽然本来就没流量）。然后在 Cloudflare 配置时尝试多次都失败了，遇到各种 `Your connection is not private` 或者 `Webpage Temporarily Down or Moved Permanently` 报错，还有跳到 404 页面等各种问题。最后终于解决，这里记录一下。

## Cloudflare 重定向配置的几种方案

要在 Cloudflare 中配置重定向有非常多的方式，进入 Cloudflare 域名管理的 Rules 页面可以看到右侧有非常多的规则可供配置，其中有好几个可以实现重定向，这里挑最简单的 Page Rules 和 Redirect Rules 说一下。

### Page Rules

Page Rules 算是比较早期的功能，免费额度较少只有 3 个，配置重定向只需要参考下图：

![picture 0](https://stg.heyfe.org/images/blog-cloudflare-redirect-1689404416009.png)

其中 \* 和 $1 是使用通配符匹配 URL 的后缀并将其携带到新地址。配置过 Nginx 的应该都了解，也可以理解为简单的正则替换。

在清单页面可以进行规则的排序和开启关闭，规则从前到后依次应用，如果有规则冲突则需要注意排序问题。

![picture 1](https://stg.heyfe.org/images/blog-cloudflare-redirect-1689404597891.png)

### Redirect Rules

Redirect Rules 是近期才推出的功能，专门用于解决重定向问题，所以使用起来可能会更好理解，配置可参考下图：

![picture 2](https://stg.heyfe.org/images/blog-cloudflare-redirect-1689404808172.png)

这里不需要写通配符，如果需要保留 URL 后缀通过勾选最下方的 Preserve query string 即可。

在清单页面同样可以进行排序和开启关闭操作。

![picture 3](https://stg.heyfe.org/images/blog-cloudflare-redirect-1689404937391.png)

另外 Cloudflare 还提供了 Bulk Redirects，可以用于批量重定向的配置，比如网站迁移后 URL 规则变更了，可能就需要使用类似的功能。

### Header Modification 和 Workers

另外 Header Modification 可用于修改请求和响应的 Header 信息，理论上为 response headers 添加上 location 头也可以实现重定向的功能。

而 Workers 功能更强大，可直接拦截请求后返回 301 重定向，不过有一定上手成本。

## 问题原因

再说说我遇到的问题，其实问题的原因很简单，因为我**忘记为被重定向的域名配置 DNS** 了。Cloudflare 中的一系列功能其实是需要流量通过它的 Proxy 才能实现的，而如果没有为域名配置 DNS，请求发起时浏览器无法从 DNS 服务器获取到域名的 IP 地址，也就无法发出请求。

所以要实现重定向，我们可以想一下流量的走向：

1. 首先浏览器拿到 URL 后对域名进行解析，所以这一步要求我们**必须为被重定向的域名添加 DNS 记录**。
2. 浏览器拿到目标 IP 后发起请求，这里要注意如果拿到的不是 Cloudflare 的 IP，Cloudflare 就无法帮我们进行重定向的操作。所以这里要求我们为**被重定向的域名添加的 DNS 记录必须开启了 Proxy 功能**。
3. 浏览器接收到返回的 HTTP response，进行重定向操作。

另外添加的 DNS 记录最好使用 CNAME 记录指向到目标域名，其中的问题是什么暂时我还没搞清楚。
