# Cloudflare 配合 iptables 屏蔽未知流量

由于我的机器的 Web 服务在 Cloudflare 后面，然而通过 IP 也可以直接访问，感觉有些不太安全。由于我的服务都开启了 Cloudflare proxy，于是决定直接把从非 Cloudflare 的流量直接屏蔽掉，这就可以借助 iptables 来进行。

简单的说要达到上述的效果只需要两条 iptables 规则：

-   一条放行来自 Cloudflare IP 的流量的规则
-   一条禁止其它 IP 的流量的规则

然后到 Cloudflare 找到了 [allow-cloudflare-ip-addresses](https://developers.cloudflare.com/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/) 这篇文章，里面有较为详细的说明。

## 实操

针对 IPV4 为例，我们首先在 https://www.cloudflare.com/ips-v4 可以找到 Cloudflare 所有的 ipv4 的记录。

要实现上述效果我们只需要所有的 ip 全部拼接成字符串，然后通过 iptables 添加对应规则 `iptables -I INPUT -p tcp -m multiport --dports http,https -s $ip -j ACCEPT`，修改后记得使用 iptables-save 将其保存到 rules 文件中，也可以直接修改 `/etc/iptables/rules.v4` 文件中的规则。此处的 `$ip` 就是我们上面整理好的 ip 列表变量，可以手动替换，也可以直接通过 shell 添加变量。

通过上述规则，现在所有来自 Cloudflare 的流量就可以直接通过了，然后我们再进行第二步：禁止其它流量通过。我们只需要再使用 iptables 添加一条新的 DROP 规则即可： `iptables -A INPUT -p tcp -m multiport --dports http,https -j DROP`。这样所有的 http 和 https 请求都会被 iptables 拦截并抛弃。

做完上述操作一定要注意：

1. 如果使用的是 iptables 命令添加的规则一定要记得使用 iptables-save 保存。
2. 修改完成后一定要记得使用 iptables-restore 将其应用到内核中，不然无法生效。
3. 最后一定要住自己本身是否有其它规则存在冲突，比如 `-A INPUT -p tcp --dport 80 -j ACCEPT` 等，有的话一定要记得删除，否则 iptables 可能会优先匹配到 ACCEPT 规则，导致 DROP 规则无法生效。

最后的最后，可以尝试使用 IP 和域名分别访问，如果域名访问成功但是 IP 无法访问，那我们的目的就达成了。

## 简易脚本

如果不想自己动手修改也可以直接尝试以下 shell 脚本：

```bash
ipList=$(curl -s "https://www.cloudflare.com/ips-v4")
ips=($(echo "$ipList" | tr '\n' ',' | sed 's/,$//'))
iptables -I INPUT -p tcp -m multiport --dports http,https -s $ip -j ACCEPT
iptables -A INPUT -p tcp -m multiport --dports http,https -j DROP
sudo iptables-save > /etc/iptables/rules.v4
sudo iptables-restore < /etc/iptables/rules.v4
```

不过如果存在其它冲突规则记得手动处理。

## 其它安全措施

如果对安全要求较高的还可以注意使用以下措施来保护自己的 IP，降低 IP 暴露的风险

-   关闭 ping
-   修改 ssh 端口号

## 记录

### DROP、REJECT 规则的区别

DROP 和 REJECT 都是 iptables 中的两个拒绝动作，但是 DROP 会直接丢弃该数据包，并且不会给客户端任何的响应，而 REJECT 则会给客户端发送错误信息，并且可以通过 `--reject-with` 定义错误类型。

### —I 和 —A 的区别

iptables 的 -I 和 -A 都是用来在规则链中插入规则，主要查别是插入的规则在规则链中的顺序。如果使用 -I 进行添加，iptables 会将该规则放置到规则链的顶端，从而可以保障其被优先匹配到，而如果使用 -A 则会被添加到尾端，该规则最后才能匹配到。

而 iptables 的规则链是按照从前到后的顺序来匹配的，所以规则可以直接生效，靠后的规则只有前面规则未匹配时才会进行应用，类似于漏斗形。

## 参考资料

-   https://developers.cloudflare.com/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/
