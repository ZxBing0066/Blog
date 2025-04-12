---
title: 阿里云 AIGC 白嫖 FC 搭建 stable diffusion
pubDate: '2023-04-12'
heroImage: 'https://stg.heyfe.org/images/blog-stable-diffusion-models-1690811336594.png'
tags:
  - AI绘画
  - AIGC
  - Stable Diffusion
---

# 阿里云 AIGC 白嫖 FC 搭建 stable diffusion

下午瞎逛在 V 站看到阿里在做推广，正好这几天在研究 stable-diffusion，就进去看了看，活动地址： https://developer.aliyun.com/topic/aigc 。

主要就是阿里云的 FC 免费提供 3 个月的试用（注意，只有 150 元额度，所以重度使用可能一会就玩没了），可以快速搭建 AiGC 服务。

## 安装

注意阿里云官方有提供试用，有比较完整的教程，可以直接进入 [试用教程](https://developer.aliyun.com/adc/scenario/exp/e71ae1062a4f405e8ed80c0dd0ea2156?) 查看，我这里只做最基础的记录。

首先进入活动页面，点击立即参与，现在参与的人数好像还不多。

![picture 1](https://stg.heyfe.org/images/blog-stable-diffusion-aliyun-fc-1681294274442.png)

然后选择免费开通试用。

![picture 2](https://stg.heyfe.org/images/blog-stable-diffusion-aliyun-fc-1681294306017.png)

![picture 3](https://stg.heyfe.org/images/blog-stable-diffusion-aliyun-fc-1681294439158.png)

之后按照步骤一步步确定并购买。

![picture 4](https://stg.heyfe.org/images/blog-stable-diffusion-aliyun-fc-1681294457681.png)

购买完成后进入 FC 页面，进入应用面板，创建应用，搜索一下 `stable-diffusion` 可以看到官方提供的镜像。

![picture 5](https://stg.heyfe.org/images/blog-stable-diffusion-aliyun-fc-1681294524329.png)

创建时选择直接部署，并点击按钮进行角色的授权。

![picture 6](https://stg.heyfe.org/images/blog-stable-diffusion-aliyun-fc-1681294657749.png)

然后需恩泽好地域等就可以直接创建了。

![picture 7](https://stg.heyfe.org/images/blog-stable-diffusion-aliyun-fc-1681294721852.png)

创建完成后需要注意会需要等待很久，在应用详情里有生成的域名，用于访问 `stable-diffusion-webui`。

![picture 8](https://stg.heyfe.org/images/blog-stable-diffusion-aliyun-fc-1681295316539.png)

如果部署没有完成的话进入页面会看到如下页面，然后他会一直加载中，加载超时还会报错。

![picture 9](https://stg.heyfe.org/images/blog-stable-diffusion-aliyun-fc-1681295323411.png)

等大概 20 分钟左右进入就可以成功展示 WebUI 的页面了。

![picture 10](https://stg.heyfe.org/images/blog-stable-diffusion-aliyun-fc-1681296949334.png)

## 使用

使用就不多说了，就是普通的 WebUI，不过他的版本稍微旧了点，需要注意进入页面后手动选择 model，然后点击生成也没有进度条，要等好一会他会把图片展示出来就是生成成功了。

## 问题

### 无法安装插件

由于该镜像启动 WebUI 使用了 `--host` 让 http 服务可以从外部访问，但是并没有添加 `--enable-insecure-extension-access`，所以无法直接安装插件。（也许设置环境变量可以）

### 无法安装 model（目前看来）

由于 FC 使用镜像启动，然后控制台上也没有找到任何可以进入 container 的命令行入口等，插件又被封禁，我目前已知的安装 model 的方式都无法使用，只能使用自带的 SD-1.5。

### 偶尔图片加载不出来

有时候生成的图片无法加载，我猜测是碰到了安全检测之类的。因为该 WebUI 地址和图片地址是可以提供给他人使用的，估计为了防止被请喝茶所以。

### 图片管理不方便

每次图片生成后只能右键保存下来，不然一会就找不到了，没有文件管理等功能。（好像可以挂载到 OSS 或者 NAS 上，不过对于白嫖的我来说等于没有）。

### WebUI 存在一定问题

用 FC 搭建的 WebUI 在使用时有一些小问题，比如点击生成后没有进度条、`Hires.fix` 和 `Show extra network` 打开速度巨慢等，不知道是不是由于镜像所使用的版本原因导致的。

### 速度慢

看了下配置 FC 好像也是 Tesla T4，但速度完全比不上 Colab。

![picture 6](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-fc-1681307878852.png)

## 生成图展示

下面放一些随便生成的图：

![picture 1](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-fc-1681306078347.png)

```
masterpiece, super detailed, virtual robot, unreal engine, big sense, volumetric lighting, 8k,
```

![picture 2](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-fc-1681306101712.png)

```
big sense, daytime,  unreal engine, city made out of glass : : close shot : : 3 5 mm, realism, octane render, 8 k, exploration, cinematic, trending on artstation, realistic, 3 5 mm camera, unreal engine, hyper detailed, photo – realistic maximum detail, volumetric light, moody cinematic epic concept art, realistic matte painting, hyper photorealistic, concept art, volumetric light, cinematic epic, octane render, 8 k, corona render, movie concept art, octane render, 8 k, corona render, cinematic, trending on artstation, movie concept art, cinematic composition, ultra – detailed, realistic, hyper – realistic, volumetric lighting, 8 k
```

![picture 3](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-fc-1681306175732.png)

```
 unreal engine, city made out of glass : : close shot : : 3 5 mm, realism, octane render, 8 k, exploration, cinematic, trending on artstation, realistic, 3 5 mm camera, unreal engine, hyper detailed, photo – realistic maximum detail, volumetric light, moody cinematic epic concept art, realistic matte painting, hyper photorealistic, concept art, volumetric light, cinematic epic, octane render, 8 k, corona render, movie concept art, octane render, 8 k, corona render, cinematic, trending on artstation, movie concept art, cinematic composition, ultra – detailed, realistic, hyper – realistic, volumetric lighting, 8 k
```

![picture 4](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-fc-1681306182978.png)

```
city made out of glass : : close shot : : 3 5 mm, realism, octane render, 8 k, exploration, cinematic, trending on artstation, realistic, 3 5 mm camera, unreal engine, hyper detailed, photo – realistic maximum detail, volumetric light, moody cinematic epic concept art, realistic matte painting, hyper photorealistic, concept art, volumetric light, cinematic epic, octane render, 8 k, corona render, movie concept art, octane render, 8 k, corona render, cinematic, trending on artstation, movie concept art, cinematic composition, ultra – detailed, realistic, hyper – realistic, volumetric lighting, 8 k
```

![picture 5](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-fc-1681306191335.png)

```
city made out of glass : : close shot : : 3 5 mm, realism, octane render, 8 k, exploration, cinematic, trending on artstation, realistic, 3 5 mm camera, unreal engine, hyper detailed, photo – realistic maximum detail, volumetric light, moody cinematic epic concept art, realistic matte painting, hyper photorealistic, concept art, volumetric light, cinematic epic, octane render, 8 k, corona render, movie concept art, octane render, 8 k, corona render, cinematic, trending on artstation, movie concept art, cinematic composition, ultra – detailed, realistic, hyper – realistic, volumetric lighting, 8 k
```

## 总结

用阿里云 FC 部署 WebUI 还是挺方便的，不过问题也挺多，如果就是想尝试一下也可以，如果已经有其它方式运行了就没必要了，白嫖不是长久之计。当然，上面的很多问题都可以尝试通过自定义镜像去解决。
