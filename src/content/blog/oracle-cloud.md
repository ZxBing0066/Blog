---
title: 甲骨文白嫖云
pubDate: '2023-03-26'
tags:
    - 白嫖
    - 云服务
---

最近在甲骨文申请了一台免费的主机实例，`VM.Standard.A1.Flex`、4OCPU、24G 内存，准备把一些 docker 服务迁移上去。

## 注册

1. 需要使用真实信息
2. 尽量关闭 VPN 等工具
3. 网上有猜测注册通过率与外币卡登记有关，外币卡等级越高越好
4. 网上有说使用 edge 浏览器通过率更高，可以尝试

## 资源

很多区都缺少永久免费资源，注册时只说了韩区和日区，但实际上新加坡也没有资源，随便是 `VM.Standard.A1.Flex` 还是 `VM.Standard.E2.1.Micro`，尽量选择别的区。

如果一定要在这些区申请，可以去网上找找脚本，尝试用脚本来购买，甲骨文会定时回收一些不活跃的资源，所以无资源区域偶尔会放出一定资源。

还有一个方法就是升级为付费账号，然后直接购买 `VM.Standard.A1.Flex`，由于甲骨文每月提供 3000 小时 OCPU 时长，所以可以申请 4OCPU 和 24G 内存的机器。由于是付费账号，所以不会被限制购买，但是由于免费策略的存在也不会收费。

## 开启 http 服务

要在机器中开启 http 服务遇到一些坑，记录一下，需要注意以下几点：

1. 确保机器绑定了公网 IP，可在实例列表或详情页面查看 ![picture 2](https://stg.heyfe.org/images/blog-oracle-cloud-43.png)
2. 在机器上安装 nginx 或其他服务并启动。
3. 在虚拟云网络（networking/vcns）中开放入站规则，按需添加 80 和 443 的入站流量规则。 ![picture 1](https://stg.heyfe.org/images/blog-oracle-cloud-12.png)
4. 最需要注意的是 iptables 规则，由于甲骨文的云主机默认的 iptables 规则禁用了大部分流量，所以必须要修改规则后才可。（我使用的是 `Canonical-Ubuntu-22.04-aarch64-2023.02.15-0` 镜像，无法确认其它镜像是否存在相同问题）。

### iptables 配置

这里主要说下 iptables 的配置，由于坑比较多。

针对 IPV4 的规则文件为 `/etc/iptables/rules.v4`，我们可以直接通过 `vim` 进行编辑，然后在当前规则中插入如下两行规则：

```
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT
```

这样便可以让 iptables 放行来自 80 和 443 端口的 tcp 流量，然后记得一定要通过 `iptables-restore` 将其加载到内核中进行规则生效：

```bash
sudo iptables-restore < /etc/iptables/rules.v4
```

在修改是需要注意以下几点：

1. iptables 哪怕将其服务关闭后规则依然会生效（不能确定，从现象中来说是这样，GPT 的回答中解释是因为规则已经写入内核，与服务无关），只有修改规则后重新生效才能影响到现有规则。
2. iptables-save 用于将使用 iptables 命令修改的 iptables 规则存储到规则文件中，但是无法令其生效。

## 参考资料

-   https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm