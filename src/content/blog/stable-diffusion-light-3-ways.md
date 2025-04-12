---
title: 在 Stable Diffusion 中控制光线的三种方式
description: >-
    这是一片译文，主要讲解了在 Stable Diffusion 中如何通过提示词、Regional Prompter 插件以及 ControlNet 来进行光线的控制以增强图片的效果。

pubDate: '2023-08-14'
heroImage: >-
    https://stg.heyfe.org/images/blog-stable-diffusion-light-3-ways-1692021833858.jpeg

tags:
    - AI绘画
    - AIGC
    - Stable Diffusion
---

# 在 Stable Diffusion 中控制光线的三种方式

> 在 Stable Diffusion Art 网站上看到一片关于在 Stable Diffusion 中如何控制光线的网站，感觉讲的很通俗易懂，做个翻译。
>
> 原文地址： https://stable-diffusion-art.com/control-lighting/

光线在摄影中扮演着至关重要的角色，并对图像的整体质量和意境产生重要影响。你可以利用光线来增强主题，创造深度和立体感，传达情感，并突出重要细节。

在本文中，你将了解通过以下方法来控制光线：

-   光线提示词
-   区域光线控制
-   ControlNet img2img

## 软件

我们将使用 [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui) 的 `Stable Diffusion GUI` 来进行图片生成。你可以在 `Google Colab`、`Windows` 或者 `Mac` 上使用这个 `GUI`。

## 使用光线提示词

最简单的方法是将 **光线提示词** 添加到提示中。

我将使用以下基本提示和负面提示来说明效果。

> fashion photography, a woman

> disfigured, ugly, bad, immature, cartoon, anime, 3d, painting, b&w, nsfw

-   Model: [DreamShaper v6](https://civitai.com/models/4384/dreamshaper) (c249d7853b)
-   Width: 512
-   Height: 768
-   CFG scale: 7
-   Seed: 94858136 – 94858143

使用基本提示生成的示例图像。它们的光线充足，外形美观，但照明效果并不有趣。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-8.png)

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-9.png)

**Volumetric lighting**（立体光线）是指图像上的明显光线束。在摄影中，它被用于增加体积感。

向提示中添加提示词 **volumetric**：

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-10.png)

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-11.png)

使用 **Rim lighting**（边缘光线）为主体添加了一个发亮的轮廓。这可能会使主体变暗。你可以与其他光线提示词结合使用以突出主体。

向提示中添加提示词 **rim lighting**：

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-12.png)

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-13.png)

使用 **Sunlight**（阳光）在图像中添加阳光效果。它通常用于渲染大自然背景。

向提示中添加提示词 **sunlight**：

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-14.png)

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-42.png)

**Backlight**（背光）会将光源放在图片主体后面。通过添加这个提示词，你可以产生一些时尚的效果。

向提示中添加 **backlight**：

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-15.png)

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-16.png)

众所周知，Stable Diffusion 不会无人指导地生成暗图像。解决这个问题的方法有很多，包括使用模型和 LoRA。但一个更简单的方法是添加一些昏暗的光线提示词。

向提示中添加 **dimly lit**：

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-18.png)

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-19.png)

**Crepuscular rays**（晨光射线）用于添加光线穿过云层，产生的光线效果。它可以创造出令人惊叹的视觉效果。

该提示和纵横比通常用于生成全身图像，添加 **crepuscular rays** 会放大图像。我使用 **crepuscular rays, face** 略微放大了面部。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-26.png)

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-27.png)

提示：

-   如果未看到效果，请增加提示词的权重。
-   这些光线提示词并不总是有效的。尝试一次生成几张图像进行测试。

## 区域光线控制

提示中的光线提示词适用于整个图像。你可以使用工具进一步调整光线效果以适应特定区域。

你需要安装 **Regional Prompter** 扩展。请查阅文章以了解安装说明。

在这个例子中，你将为图像的上部和下部应用不同的光线。

在 **txt2img** 页面上，展开 **Regional Prompter** 部分。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-20.png)

-   **Active**: Yes
-   **Use common prompt**: Yes
-   **Split mode**: Vertical
-   **Divide Ratio**: 2,3

点击 **visualize and make template**，确认图像被分为两个垂直区域。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-21.png)

输入提示：

> fashion photography, a woman  
> BREAK  
> ( hard light:1.2), (volumetric:1.2), well-lit  
> BREAK  
> (dimly lit:1.4)

并使用下面的负面提示：

> disfigured, ugly, bad, immature, cartoon, anime, 3d, painting, b&w, nsfw

其他参数保持不变。

你将得到一些在顶部光线良好但底部较暗的图像。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-22.png)

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-23.png)

现在试试交换光线分配。

> fashion photography, a woman  
> BREAK  
> (dimly lit:1.4)  
> BREAK  
> ( hard light:1.2), (volumetric:1.2), well-lit

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-24.png)

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-25.png)

光线相应地交换了。

提示：

-   如果未看到效果，请调整提示词的权重。
-   区域提示并不总是百分之百有效。生成多一些的图片，并挑选出最好的结果。

## 使用 ControlNet 控制光照

现在，任何教程都离不开提到 `ControlNet`... 所以本文也不可避免！

这种方法允许你精确控制光线。

### Txt2img 设置

在 **txt2img** 页面上，按照通常的方式生成图像。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-28.png)

选择要添加光线的图像。

将其保存到本地存储（我们稍后会用到 `ControlNet`）。

点击 **Send to img2img**。

### Img2img 设置

你的提示、负面提示、图像大小和种子值现在已经传输到 `img2img` 页面。

在 **img2img** 页面上，导航到 `ControlNet` 部分。

上传刚才保存的图像到 **ControlNet Unit 0**。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-30.png)

使用以下设置。

-   **Enable**: Yes
-   **Pixel Perfect**: Yes
-   **Allow preview**: Yes
-   **Control Type**: Depth
-   **Preprocessor**: depth_zoe
-   **Model**: control_xxxx_depth
-   **Control** **Weight**: 0.6

滚动到 **img2img canvas**，删除图像。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-31.png)

我们将使用以下图像来控制光线。该图像指定了靠近顶部的聚光灯。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-spotlight2.png)

将此图像上传到 **img2img canvas**。

将 **resize mode** 设置为 `Just Resize`。

将 **denoising strength** 设置为 `0.95`。

按下 **Generate**。

你应该得到带有光源在顶部的图像。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-33.png)

你可以使用位于右上角的 **Edit Tool**（铅笔图标）来放大 `img2img` 画布中的某个区域。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-34.png)

点击铅笔图标后，拖动突出显示区域的角来调整大小。目前该工具中存在一些问题，你可能需要执行两次。

例如，下面的截图显示了将相同的图像裁剪，以便光源位于左上角。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-35.png)

请参考面部和帽子的左侧，比之前的图像更亮。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-36.png)

同样地，使用光源位于左下角，从底部左侧照亮图像。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-37.png)

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-38.png)

或者使用更高对比度的对角光。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-41.png)

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-40.png)

以下是一些光源图案的示例。

![](https://stg.heyfe.org/images/stable-diffusion-light-3-ways-image-39.png)

使用它们就可以不需要针对某个区域进行修改而实现所需的光线效果。

你可以不使用深度控制模型。而可以使用其他模型，如 `canny` 和 `line art realistic`。尝试不同的预处理器，看看哪个适合你。

如果看到不自然的颜色，请降低 **Controlnet weight**。调整降噪强度并观察效果。
