# Cloudflare 的加密模式配置

Cloudflare 可以免费提供 DNS 服务，此外还可通过配置加密模式为网站强行开启 https。（注意加密模式仅对 Proxy 记录生效）

## 全站加密模式

可以在 SSL/TLS 面板切换加密模式：

![picture 1](https://stg.heyfe.org/images/blog-cloudflare-https-91.png)

-   Off - 不会变更源站的加密模式。
-   Flexible - 会加密从浏览器到 Cloudflare 之间的流量，但是 Cloudflare 到源站的流量会遵循源站。
-   Full - Cloudflare 除了会加密浏览器到它的流量外，还会加密从 Cloudflare 到源站的的流量，但是 Cloudflare 并不会验证证书的可信性（是否由可信 CA 机构颁布）。
-   Full (strict) - 和 Full 相同，但是还会服务器证书必须可信。

需要注意此处的加密模式会影响到所有的开启了 Proxy 的 DNS 记录，而如果有某些 DNS 记录存在特殊需求，可以使用 Rules 来进行配置。

## 指定加密模式

通过 Rules 我们可以为特定的请求生效特定的加密模式。

![picture 2](https://stg.heyfe.org/images/blog-cloudflare-https-24.png)

以针对某域名开启特定的加密模式为例，在 Rules 中的 Configuration Rules 中可以新增一条规则。

首先在规则中通过 hostname 进行匹配：

![picture 3](https://stg.heyfe.org/images/blog-cloudflare-https-8.png)

然后在下方的 SSL 配置中选择对应的配置：

![picture 4](https://stg.heyfe.org/images/blog-cloudflare-https-67.png)

然后只需要发布后规则即可生效。

## 模式选择

最后聊下针对站点的加密模式的选择。

-   如果源站支持 SSL 加密，那么就直接开启 `Full (strict)`，比如各种服务如：GitHub Pages、Vercel、GitLab Pages、Firebase Pages 等，又或者源站本身已经有可信的证书。
-   如果源站不支持 SSL 加密，那么可以直接开启 `Flexible`，然后配合 iptables 屏蔽从 Cloudflare 外来的流量。
-   如果想要更安全可以直接使用一些脚本自动生成 self-signed 证书，然后选择 `Full` 模式。
