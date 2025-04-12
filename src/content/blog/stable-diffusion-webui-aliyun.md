---
title: 阿里云 PAI 免费试用搭建 stable-diffusion-WebUI
pubDate: '2023-04-15'
heroImage: 'https://stg.heyfe.org/images/blog-stable-diffusion-models-1690811336594.png'
tags:
    - AI绘画
    - AIGC
    - Stable Diffusion
---

# 阿里云 PAI 免费试用搭建 stable-diffusion-WebUI

最近玩 stable-diffusion 一直在 Colab 上，前几天发现阿里云的 PAI 有免费试用，就玩了一下，发现速度比 Colab 还快，然后可以免费试用三个月（如果不关机的话估计就只能玩 1 个月）。

## 搭建

首先在阿里云首页免费试用菜单下面点击了解更多：

![picture 4](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-1681258434946.png)

然后在最下方找到 PAI-DSW 的免费试用，点击立即试用，我这里因为试用过了就没法点了，建议查看教程：[试用教程](https://help.aliyun.com/document_detail/615220.html?spm=5176.28008736.J_6443120770.16.7f7b3e4dVoCmib&pipCode=learn&goodsId=960469&scm=20140722.M_960469._.V_1)，这里只记录一些可能会有困惑的地方。

![picture 5](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-1681258443786.png)

进入试用页面后按照指引选择即可，忘记截图了这里不展示。

试用资源领取完毕后进入 PAI 控制台选择 DSW 并创建实例：

![picture 15](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-1681434481586.png)

**这里要注意选择 GPU 类型的 `ecs.gn7i-c8g1.2xlarge` 或 `ecs.gn6v-c8g1.2xlarge` 型号**，不要选错了，GPU 只有这两个型号是可以用免费资源抵扣的，不过现在好像阿里云已经把这两个默认型号放到前面的默认为之去了，所以到不太容易搞错。建议选择 A10，V100 太贵玩不了几天， A10 性能已经比 Tesla T4 好不少，足够完了。

![picture 3](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-1681258417850.png)

创建完成后就可以进入 DSW 实例页面，点击实例名称打开：

![picture 2](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-1681258405748.png)

然后点击详情页中的打开按钮就会进入 Workshop 页面，在 Workshop 页面可以通过点击 Launcher 中的快速开始打开 Notebook 或 Terminal。

![picture 1](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-1681258396745.png)

剩下的就按照教程一步步向下复制执行，注意教程中主要使用的是 Notebook，每次按照教程将代码复制到一个块中，然后点击前方的执行：

![picture 16](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-1681478602236.png)

当然有些代码也可以直接用 terminal 执行，比如在 Notebook 中执行这段代码：

```python
! git clone https://github.com/huggingface/diffusers
! cd diffusers && pip install . && pip install --upgrade transformers
! pip install --upgrade accelerate
```

等价于在 terminal 中执行下面这段代码：

```sh
git clone https://github.com/huggingface/diffusers
cd diffusers && pip install . && pip install --upgrade transformers
pip install --upgrade accelerate
```

当代码块执行后下方会展示 log，确认 log 没有奇怪的报错后就可以继续在下方代码块继续新的操作，不建议直接覆盖之前的代码块。

![picture 7](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-1681259073501.png)

按照教程执行到最后的代码后会在 log 中输出 WebUI 的地址：

![picture 17](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-1681478861982.png)

此时我们就可以点击改地址进入 WebUI 了，会生成一个临时的域名用于访问，注意这个域名不能公开，只能自己访问，会有账号权限检测。

打开后就可以使用 WebUI 进行使用了。

![picture 18](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-1681479004485.png)

## 使用

### 模型下载

在使用 WebUI 时需要注意，如果你需要下载新的 model 可以直接在 terminal 中使用 wget 进行下载，比如：

```bash
# 进入目标 model 目录
cd stable-diffusion-webui/models/Stable-diffusion
# 使用 wget 下载
wget https://huggingface.co/xxx.safesensors
```

当然，也可以通过 Notebook 代码块使用类似的方法进行下载。

注意由于不可说的网络环境，部分模型源是连不上的，比如 civitai 等，所以要下载模型最好到 huggingface 下载，当然，你也可以在上面挂 “工具” 强行下载。

### 性能

在性能上 A10 比 Colab 的 Telsa T4 强了不少，默认配置基本秒出图，所以个人玩耍基本完全够用。哪怕钩上 Hire.fix 2 倍也能在十秒内出图，速度还是很快的。

### 存储

在 PAI-DSW 中存储是需要令外挂在 OSS 或者 NAS，作为白嫖党我是拒绝的（也许可以配合 OSS 的免费试用试用），运行后容器会自带 500G 存储，但是 **这个存储是临时的，所以如果关机或者不小心挂了，里面的数据就没有了**。

不过貌似也有别的方法可以解决，比如将运行中的镜像保存下来，这样就可以连同里面的文件等一起保存了，下次关机后使用这份镜像创建新的实例就可以了。

或者就和我一样不要关机，不过。。。**在写这篇文章的时候我正好在经历莫名其妙保存的情况**（数据全都没存！！！），所以。。。自行选择吧。😂

![picture 19](https://stg.heyfe.org/images/blog-stable-diffusion-webui-aliyun-1681480241145.png)

### 试用时间

官方虽然说免费试用三个月，但是其实有计算时长的限制，一共 `5000CU*H`，而我们选择的 A10 机型每小时花费 `6.99CU*H`，所以大概可以玩 `5000/6.99/24=29.8` 天，不用的时候也可以关机保命，**不过一定要记得保存数据**。
