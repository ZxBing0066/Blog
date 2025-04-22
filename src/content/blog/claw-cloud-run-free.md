---
title: Claw Cloud Run 免费部署云服务
description: Claw Cloud Run 提供了永久免费的云服务部署额度，介绍下注册流程，免费策略，以及如何部署、使用等。
pubDate: 2025-04-22
heroImage: https://stg.heyfe.org/images/97813945ef783d1f5be26be544772915a00e026d7be2acbf26d8268a0538dd67.jpg
tags: ['白嫖', '云计算', '部署']
---

Claw Cloud Run 从 4 月 1 日开始提供永久免费的云服务部署额度。目前，只要你的 GitHub 账号注册超过 180 天，通过 GitHub 注册即可享受每月 5 美元的免费额度，无需任何信用卡或其他认证。

你可以使用这些免费额度来部署各种服务和应用。应用市场提供了大量开源应用，支持一键部署，包括：

-   AI 相关服务：如 `n8n`、`Dify`、`FastGPT` 等
-   工具类服务：如 `Excalidraw`、`Umami` 等
-   各种数据库
-   `WordPress`
-   `Minecraft` (MC) 服务器
-   等等

建议立即点击 [Claw Cloud Run](https://console.run.claw.cloud/signin?link=DNH1CAF5LX42) 注册账号并绑定你的 GitHub 账号，以便后续深入了解。这类免费额度活动很可能在一段时间后结束，就像之前的 Railway 一样，现在就已经关闭了。

## 正文

### Claw Cloud Run 是什么

在介绍 Claw Cloud Run 之前，先简单了解一下 Claw Cloud。这是一家云服务公司，目前主要提供云服务器、游戏服务器等云产品。Claw Cloud Run 是其推出的云服务应用部署平台，类似于 Vercel、Railway 等，可以方便快捷地部署各种应用程序。

从官方的介绍来看，Claw Cloud Run 的主要目标是与 Railway 竞争，而且这次的活动和之前 Railway 的活动几乎一致。Railway 刚结束免费额度活动没多久，Claw Cloud Run 的活动就开始了。

### Claw Cloud Run 能做什么

Claw Cloud Run 主要提供云服务应用的部署功能，支持一键部署各种应用。可以用来部署网站、API、数据库、DevBox 等。从 UI 看像是一个云操作系统，包括了应用市场、控制台、启动器等功能。

![Claw Cloud Run Dashboard](https://stg.heyfe.org/images/f2136932b2192871ff5b6fec5390f2a39b8b1cffa77043f8f86fb151db52cf74.png)

在应用市场中包含了大量的开源应用，可以一键部署，几乎 0 门槛，普通用户也可以轻松上手。

![Clad Cloud Run App Store](https://stg.heyfe.org/images/731ed1764a83541e028b7c9e3ca19b492d8666f4c37b5076590e087a879321b6.png)

部署后如果需要公网服务也可以直接访问，对于非商业化项目来说是相当够用了。

### Claw Cloud Run 如何使用

下面简单介绍下如何使用 Claw Cloud Run。

#### 注册账号

访问 [Claw Cloud Run](https://console.run.claw.cloud/signin?link=DNH1CAF5LX42) 注册账号，使用 GitHub 账号注册。理论上 Google 账号也可以，但需要在注册后进入用户设置中绑定 GitHub 账号才能获得免费额度。

注册完成后，应该能看到如下界面，可直接跳过或按需选择 _Deploy From Template_ 等。

![Claw Cloud Run Tutorial](https://stg.heyfe.org/images/df0bb6c47c9d1905a3b4afadf234b59b633dcf3b3d940e1cb7134f100553c396.png)

#### 验证免费额度

如果不确定自己是否获得了永久免费额度，可在右上角菜单点击 _Plan_ 查看当前的计划，应该能看到如下界面：

![Free Credit Check](https://stg.heyfe.org/images/20c09b836cc4725ac4f35c72fb08482cda1e61e71bec021005700a8017296cbe.png)

如果看到 `Monthly Gift Credits` 中显示 $5，说明你已经获得了免费额度资格。如果没有显示，请在 `Account Setting` 中检查是否绑定了 GitHub 账号，或者 GitHub 账号是否超过 180 天。

#### 服务部署和操作介绍

下面简单介绍下如何使用 Claw Cloud Run 部署一个 n8n 服务。

进入应用市场，搜索 `n8n`，点击进入详情

![n8n](https://stg.heyfe.org/images/733146ba129394f1d63eca81a4af0e9383fc9d8aaaff9e6ab3afdcd34a7423b3.png)

点击 _Deploy_ 按钮，选择需要的配置，点击 _Deploy_ 即可，边上会显示应用的预估价格，n8n 的预估价格是 $0.1 每天，5 刀的免费额度完全够用。

![Price and Deploy](https://stg.heyfe.org/images/5a98ca9270fab80a7837fcc64a1ea25b4f5ecb2f543147923c8c9a4f96643a7f.png)

部署完成后点击进入应用详情，可以看到应用的状态、日志、配置等信息。n8n 需要网络访问，在详情中的 _Network_ 中可以看到公网地址，点击即可访问。初次启动会比较慢地址可能打不开，耐心等待，一般一两分钟即可。

打开成功后应该可以看到 n8n 初始的管理员账号设置页面。

![n8n initial admin account setup](https://stg.heyfe.org/images/70551f4a9cba4c2fc31ca39ff544287743985944067e3e4b93e4708fb3175dbd.png)

不过应用市场上默认的 n8n 镜像比较老了，要升级的话需要在**列表页面**中选择应用的 _update_ 菜单更改对应的版本：

![update app configurationƒ](https://stg.heyfe.org/images/6936f58b90a961889cc62a5d7b0e14fc4587dd5d4b08d8b45b13198752596f7f.png)

需要自定义服务域名的也可以在此处下方的 _Network_ 中进行修改：

![Custom Domain](https://stg.heyfe.org/images/35605df6284264d6539968503d53052a66c7532835dd5d5a716fe697b384e0fa.png)

### 价格

Claw Cloud Run 的价格是按照使用量来收费的，按照 CPU、内存、存储、网络等实际用量来收费。免费账号不需要绑定信用卡，完全不需要担心会被扣费。使劲造就是了，顶多也就是被停机，下个月又是一条好汉。目前看来免费额度可以部署一个免费的 n8n 服务 + 一个免费的 wordpress，完全够用。

如果打算用在商业化项目上，可以在 [Claw Cloud Run 价格明细](https://run.claw.cloud/pricing) 中查看详细的价格信息。

## 结语

虽然活动开始不到一个月的时间，但很难预测能持续多久，所以建议大家尽快注册一个账号，防止手慢无。

## 引用

-   [Claw Cloud Run 注册](https://console.run.claw.cloud/signin?link=DNH1CAF5LX42)
-   [Claw Cloud Run 免费计划博客](https://blog.run.claw.cloud/88/)
-   [Claw Cloud Run 价格明细](https://run.claw.cloud/pricing)
