---
lastUpdate: 2023-7-31
date: 2023-4-19
tags: [AI绘画, AIGC, Stable Diffusion]
cover: https://stg.heyfe.org/images/blog-stable-diffusion-models-1690811336594.png
---

# Stable Diffusion 是如何工作的？【译】

> 最近在学习 Stable Diffusion 相关的内容，看到这篇文章，感觉不错所以翻译一下。

> 原文地址：[How does Stable Diffusion work?](https://stable-diffusion-art.com/how-stable-diffusion-work/)
>
> 原文作者：[Andrew](https://stable-diffusion-art.com/author/andrewon2/)

Stable Diffusion 是一个深度学习模型，让我们深入了解下 Stable Diffusion 在底层是如何工作的。

为什么你需要知道？除了问题本身是一个迷人的主题外，对内部机制的一些了解会使你成为一个更好的艺术家。你可以更正确地使用这个工具，达到更精确、更想要的效果。

text-to-image（文字转图像） 和 image-to-image（图像转图像）之间有什么不同? CFG 值是什么? 什么是去噪强度? 你将会在本文中找到答案。

我们开始吧。

## Stable Diffusion 能做什么？

以最简单的形式来理解，Stable Diffusion 是一种 text-to-image 的模型。给它一个文本提示，它将会返回一个与文本相匹配的图像。

![Stable diffusion 将文本提示变成图像](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681811067940.png)

## 扩散模型（Diffusion model）

Stable Diffusion 属于一类被称为扩散模型的深度学习模型。它们是生成类模型，这意味着它们被设计用来生成与它们在训练中所看到的相似的新数据。在 Stable Diffusion 的场景下，这些数据就是图像。

为什么它被称为 Diffusion 模型？因为它的数学原理看起来非常像物理学中的扩散。让我们来看看什么是扩散。

假设我只用两种图像训练了一个扩散模型：猫和狗。在下图中，左边的两组代表了猫和狗的图像组。

### 前向扩散（Forward diffusion）

![前向扩散把照片变成噪音](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681811710752.png)

前向扩散过程将噪声添加到训练图像中，逐渐将其变成非特征性的噪声图像。前向过程将把任何猫或狗的图像变成一个噪声图像。最终，你将无法分辨它们最初是狗还是猫。（这很重要）

这就像一滴墨水掉进了一杯水里，这滴墨水在水中扩散。几分钟后，它随机地分布在水里，你就再也无法分辨它最初是落在中心还是靠近边缘。

下面是一个正在进行前向扩散的图像的例子，猫的图像变成了随机噪音。

![猫图像的正向扩散](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681818160283.png)

### 反向扩散（Reverse diffusion）

激动人心的部分来了，如果我们能逆转扩散呢？就像倒放视频一样，回到过去，我们将能看到最初添加墨滴的位置。

![反向扩散过程恢复图像](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681818253708.png)

从一个嘈杂的、无意义的图像开始，反向扩散以恢复一个猫或一个狗的图像。这就是核心思想。

从技术上讲，每个扩散过程都有两个部分：

1. 漂移或定向运动
2. 随机运动

反向扩散会向猫或狗的图像漂移，但没有任何中间的东西。这就是为什么结果可能是一只猫或一只狗。

## 训练是如何进行的

反向扩散的想法无疑是聪明且优雅的。但是，最重要又最困难的问题是，“如何才能做到这一点?”

为了反向扭转扩散，我们需要知道有多少噪音被添加到图像中。答案就是**教一个神经网络模型来预测添加的噪声**。它被称为 Stable Diffusion 中的 noise predictor（噪声预测器）。它是一个 **U-Net 模型**。训练的过程如下：

1. 选一张训练图片，比如一张猫的照片。
2. 生成随机噪声图像。
3. 通过一定次数的添加噪声图像的步骤来破坏这个训练图像。
4. 教 noise predictor 来告诉我们添加了多少噪音，通过调整它的权重和告诉它正确答案来完成。

![噪声在每个步骤中依次加入，noise predictor 估算每个步骤加起来的总噪声](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681819131727.png)

经过训练，我们就拥有了一个能够预估图像中所添加的噪音的 noise predictor。

### 反向扩散

现在我们有了 noise predictor。该如何使用它呢？

我们首先生成一个完全随机的图像，要求噪声预测器告诉我们噪声。然后我们从原始图像中减去这个估计的噪声。重复这个过程数次，你将得到一个猫或狗的图像。

![反向扩散的工作原理是从图像中先后减去预测的噪声](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681819373636.png)

你可能注意到我们无法控制的生成猫或狗的形象。我们将在谈论调节（Conditioning）时解决这个问题。现在，图像生成是无条件的。

您可以在 [这篇文章](https://stable-diffusion-art.com/samplers/) 中阅读有关反向扩散采样和采样器的更多信息。

## Stable Diffusion 模型

现在我需要告诉你一些坏消息：我们刚才谈到的**并不是 Stable Diffusion 的工作方式**！因为上述扩散过程是在图像空间中进行的！原因是，上述扩散过程是在图像空间中进行的。它的计算速度非常、非常慢。你将无法在任何单一的 GPU 上运行，更不用说你笔记本电脑上的蹩脚 GPU 了。

图像空间是巨大的。想一想：一个有三个颜色通道（红、绿、蓝）的 512×512 图像是一个 786,432 维的空间！（你需要为一个图像指定这么多的值。）

像谷歌的 [Imagen](https://imagen.research.google/) 和 Open AI 的 [DALL-E](https://openai.com/dall-e-2/) 这样的扩散模型是在像素空间中。他们使用了一些技巧来使模型更快，但仍然不够。

### 潜扩散（Latent diffusion）模型

Stable Diffusion 是为了解决速度问题而设计的。具体方法如下。

Stable Diffusion 是一个潜扩散模型。它不是在高维图像空间中操作，而是首先将图像压缩到潜空间。潜空间小了 48 倍，所以它获得的好处是计算的数字少了很多。这就是为什么它的速度要快得多。

### 变量自动编码器（Variational Autoencoder）

它是通过一种叫做变量自动编码器的技术完成的。是的，这就是 VAE 文件是干什么用的，但我将在后面更详细的解释。

变量自动编码器（VAE）神经网络有两个部分：

1. 编码器
2. 解码器

编码器将图像压缩到潜空间中的低维表示。解码器从潜空间恢复图像。

![VAE 将图像与潜空间进行转换](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681820244061.png)

Stable Diffusion 模型的潜空间是 4x64x64，比图像像素空间小 48 倍。我们谈到的所有正向和反向扩散实际上都是在潜空间中完成的。

因此，在训练期间，它不是生成一个有噪声的图像，而是在潜空间中生成一个随机张量（潜噪声）。它不是用噪声破坏图像，而是用潜噪声破坏图像在潜空间的表示。这样做的原因是由于潜空间较小，所以速度会快很多。

### 图像分辨率

图像分辨率反映在潜像张量的大小上。潜像的大小是 4x64x64，只适用于 512×512 的图像。对于 768×512 的肖像图像，它是 4x96x64。这就是为什么生成一个更大的图像需要更长的时间和更多的 VRAM。

由于 Stable Diffusion v1 是在 512×512 的图像上进行微调的，所以生成大于 512×512 的图像可能会导致重复的对象，例如，臭名昭著的[两个头](https://stable-diffusion-art.com/common-problems-in-ai-images-and-how-to-fix-them/)。如果你一定要这样做，至少要把一面保持在 512 像素，并使用 [AI 升频器](https://stable-diffusion-art.com/ai-upscaler/)来提高分辨率。

### 为什么潜空间是可行的？

你可能想知道为什么 VAE 可以将图像压缩到一个更小的潜空间而不丢失信息。原因是，不出所料，自然图像并不是随机的。它们具有很高的规律性：一张脸遵循眼睛、鼻子、脸颊和嘴巴之间的特定的空间关系；一只狗有四条腿，并且是一个特定的形状。

换句话说，图像的高维度是人为的。自然图像可以很容易地被压缩到更小的潜空间而不损失任何信息。这被称为机器学习中的[流形假说](https://en.wikipedia.org/wiki/Manifold_hypothesis)。

### 潜空间中的反向扩散

下面是 Stable Diffusion 中的潜反向扩散是如何工作的：

1. 生成一个随机潜空间矩阵。
2. 噪声预测器估算潜矩阵的噪声。
3. 然后从潜矩阵中减去估算的噪声。
4. 重复步骤 2 和步骤 3 直到特定的取样步骤。
5. VAE 的解码器将潜矩阵转换为最终图像。

### 什么是 VAE 文件？

[VAE 文件](https://stable-diffusion-art.com/how-to-use-vae/)在 Stable Diffusion v1 中用于改善眼睛和面部。它们就是我们刚才谈到的自动编码器的解码器。通过对解码器的进一步微调，模型可以画出更精细的细节。

你可能意识到我之前提到的情况并不完全正确。将图像压缩到潜空间确实会丢失信息，因为原来的 VAE 没有恢复精细的细节。相反，VAE 解码器负责绘制精细的细节。

## 调节（Conditioning）

上面我们的理解是不完整的：文字提示在哪里进入图片呢？没有它，Stable Diffusion 就不是一个文本转图像的模型。你要么得到一个猫的图像，要么得到一个狗的图像，而没有任何方法来控制它。

这就是调节的作用。调节的目的是引导噪声预测器，使预测的噪声在从图像中减去后能给我们带来我们想要的东西。

### 文本调节（文本转图像）

以下是文本提示如何被处理并送入噪声预测器的概述。标记器（Tokenizer）首先将提示中的每个词转换为一个称为标记（token）的数字。然后，每个标记都会被转换为一个 768 值的向量，称为嵌入（embedding）。(是的，这与你在 AUTOMATIC1111【译注：即 Stable Diffusion WebUI】 中使用的嵌入相同）然后嵌入被文本转换器处理，并准备被噪声预测器使用。

![如何处理文本提示并将其输入到噪声预测器中来引导图像生成](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681821588088.png)

现在让我们仔细看看每个部分。如果上面的高层次概述对你来说已经足够了，你可以跳到下一节。

#### 标记器（Tokenizer）

![标记器](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681821770239.png)

文本提示首先由 [CLIP 标记器](https://huggingface.co/docs/transformers/model_doc/clip)进行标记。CLIP 是一个由 Open AI 开发的深度学习模型，用于产生任意图像的文本描述。Stable Diffusion v1 使用 CLIP 标记器。

符号化（Tokenization）是计算机理解单词的方式。我们人类可以阅读文字，但计算机只能阅读数字。这就是为什么文本提示中的单词首先被转换为数字。

一个标记化器只能对它在训练中看到的词进行标记化。例如，在 CLIP 模型中有 "dream" 和 "beach"，但没有 "dreambeach"。标记器会把 "dreambeach" 这个词分解成两个标记： "dream "和 "beach"。因此，一个单词并不总是意味着一个标记！

另一个细节是空格字符也是一个标记的一部分。在上面的例子中，"dream beach" 这个短语产生了两个标记 "dream" 和 "[空格]beach"。这些标记与 "dreambeach" 产生的标记不一样，后者是 "dream" 和 "beach"（beach 前没有空格）。

Stable Diffusion 模型被限制在一个提示中使用 75 个标记（现在你知道为什么它和 75 个单词不一样了！）。

#### 嵌入（Embedding）

![嵌入](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681822234567.png)

Stable Diffusion V1 使用 Open AI 的 [ViT-L/14](https://github.com/CompVis/stable-diffusion) 剪辑模型。嵌入是一个 768 值的向量。每个标记都有它自己独特的嵌入向量。嵌入是由 CLIP 模型固定的，它是在训练中学习的。

为什么我们需要嵌入？这是因为有些词彼此之间密切相关。我们想利用这一信息。例如，man、gentleman 和 guy 的嵌入几乎是相同的，因为它们可以互换使用。Monet、Manet 和 Degas 都以印象派风格作画，但方式不同。这些名字有接近但不完全相同的嵌入。

这与我们讨论的用关键字触发样式的[嵌入](https://stable-diffusion-art.com/embedding/)相同。嵌入可以创造奇迹。科学家们已经证明，找到适当的嵌入可以触发任意的对象和风格，这种微调技术被称为[文本反转（textual inversion）](https://textual-inversion.github.io/)。

#### 向噪声预测器输送嵌入

![从嵌入到噪声预测](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681822864331.png)

嵌入需要由文本转换器进一步处理，然后再送入噪声预测器。变换器就像一个通用的调节适配器（a universal adapter for conditioning）。在这种情况下，它的输入是文本嵌入向量，但它也可以是其它东西，如类标签、图像和[深度图](https://stable-diffusion-art.com/depth-to-image/)。变换器不仅进一步处理数据，而且还提供了一个机制来涵盖不同的调节模式。

#### 交叉关注（Cross-attention）

文本转换器的输出会被整个 U-Net 的噪声预测器多次使用。U-Net 通过一个交叉关注机制来消耗它。这就是提示与图像相遇的地方。

让我们以 "A man with blue eyes" 的提示为例。Stable Diffusion 将 "blue" 和 "eyes" 这两个词配对在一起（提示中的自我关注（self-attention）），这样它就会生成一个有蓝色眼睛的男人，但不是一个穿蓝色衬衫的男人。然后它利用这一信息将反向扩散引向含有蓝眼睛的图像。(提示和图像之间的交叉关注)

题外话：Hypernetwork 是一种对 Stable Diffusion 模型进行微调的技术，它劫持了交叉关注网络来插入风格。[LoRA 模型](https://stable-diffusion-art.com/lora/)修改交叉关注模块的权重来改变风格。仅仅修改这个模块就可以对 Stable Diffusion 模型进行微调，这一事实告诉你这个模块有多么重要。

### 其它条件

文字提示并不是 Stable Diffusion 模型的唯一条件。

文字提示和深度图像都被用来调节[深度图转图像（depth-to-image）](https://stable-diffusion-art.com/depth-to-image/)模型。

[ControlNet](https://stable-diffusion-art.com/controlnet/) 用检测到的轮廓、人的姿势等对噪声预测器进行调节，并实现了对图像生成的出色控制。

## Stable Diffusion 逐步分解讲解

现在你知道了 Stable Diffusion 的所有内部机制，让我们通过一些例子来了解下在内部发生的事情。

### 文本转图像（Text-to-image）

在文本转图像中，你给 Stable Diffusion 一个文本提示，然后它返回一个图像。

第一步： Stable Diffusion 在潜空间中生成一个随机张量。你通过设置随机数发生器的[种子](https://stable-diffusion-art.com/know-these-important-parameters-for-stunning-ai-images/#Seed)来控制这个张量。如果你把种子设置为某个值，你将总是得到相同的随机张量。这就是你在潜空间的图像。但现在它还是噪音。

![在潜空间中生成一个随机张量](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681824780504.png)

第二步：噪声预测器 U-Net 将潜噪声图像和文本提示作为输入，并预测噪声，操作也都是在潜空间（4x64x64 张量）。

![第二步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681824859204.png)

第三步：从潜图像中减去潜噪音。这就成为你的新潜像。

![第三步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681824983969.png)

重复步骤 2 和 3 一定数量的采样步骤，例如 20 次。

第四步：最后，VAE 的解码器将潜像转换回像素空间。这就是你运行 Stable Diffusion 后得到的图像。

![第四步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681825317742.png)

以下是图像在每个采样步骤中的演变情况。

![每个采样步骤的图像](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681825489957.gif)

### 噪音表（Noise schedule）

图像从嘈杂变为干净。你是否怀疑噪声预测器在最初的步骤中没有很好地工作？事实上，这只是部分事实。真正的原因是我们试图在每个采样步骤中达到一个预期的噪声。这就是所谓的噪声时间表。下面是一个例子。

![15个取样步骤的噪音时间表](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681825711632.png)

噪声时间表是我们定义的东西。我们可以选择在每一步减去相同数量的噪声。或者我们可以在开始时减去更多，就像上面那样。采样器（sampler）在每一步减去足够的噪声，以达到下一步的预期噪声。这就是你在分步图中看到的情况。

### 图像转图像（Image-to-image）

图像转图像是 [SDEdit](https://arxiv.org/abs/2108.01073) 方法中首次提出的方法。SDEdit 可以应用于任何扩散模型。因此，我们的 Stable Diffusion（一种潜在的扩散模型）有图像转图像功能。

在 "图像转图像" 中，一个输入图像和一个文本提示被提供作为输入。生成的图像将由输入的图像和文字提示决定。例如，用这幅业余绘画作品和提示 "photo of perfect green apple with stem, water droplets, dramatic lighting"（带有茎、水滴、戏剧性灯光的完美绿苹果的照片）作为输入，图像转图像可以把它变成一幅专业绘画：

![图像转图像](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681825961750.png)

这是它的步骤：

第一步：输入图像被编码到潜空间。

第二步：噪声被添加到潜像中。[去噪强度（Denoising strength）](https://stable-diffusion-art.com/inpainting_basics/#Denoising_strength)控制加入多少噪音。如果它是 0，就不添加噪音。如果它是 1，则添加最大数量的噪声，使潜像成为一个完整的随机张量。

![第二步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681826070815.png)

第三步：噪声预测器 U-Net 将潜噪声图像和文本提示作为输入，并预测潜空间（4x64x64 张量）中的噪声。

![第三步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681826117817.png)

第四步：从潜像中减去潜噪音。这就成为你的新潜像。

![第四步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681826179232.png)

重复步骤 3 和 4 达到一定数量的采样步骤，例如 20 次。

第五步：最后，VAE 的解码器将潜像转换回像素空间。这就是你在运行图像转图像后得到的图像。

![第五步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681826266690.png)

所以现在你知道什么是图像转图像了：它所做的就是用一点噪声和一点输入图像来设置初始潜像。如果将去噪强度设置为 1，就完全相当于文本转图像，因为初始潜像完全是随机的噪声。

### 修图（Inpainting）

修图实际上只是图像转图像的一个特殊情况。噪声被添加到你想去画的图像部分，噪声的数量同样是由去噪强度控制的。

### 深度图转图像（Depth-to-image）

深度图转图像是一种增强型的图像转图像；它使用深度图生成具有额外条件的新图像。

第一步：输入图像被编码为潜状态

![第一步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681862803411.png)

第二步：[MiDaS](https://github.com/isl-org/MiDaS)（一个人工智能深度模型）从输入图像中估计出深度图。

![第二步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681862880085.png)

第三步：噪声会被添加到潜像中。去噪强度控制加入多少噪音。如果去噪强度为 0，则不添加任何噪声。如果去噪强度为 1，则加入最大的噪声，使潜像成为一个随机张量。

![第三步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681862938197.png)

第四步：噪声预测器以文本提示和深度图为条件估计潜空间的噪声。

![第四步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681862989246.png)

第五步：从潜图像中减去潜噪音。这就成为你的新潜像。

![第五步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681863032032.png)

第六步：VAE 的解码器对潜像进行解码。现在你就从深度图转图像中得到了最终的图像。

![第六步](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681863100041.png)

## 什么是 CFG 值？

如果不解释一下无分类器指引（Classifier-Free Guidance - CFG），这篇文章就不完整，这是人工智能艺术家们每天都在修补的一个价值观。为了理解它是什么，我们需要先谈谈它的前身 - 分类器指引（classifier guidance）。

### 分类器指引（Classifier guidance）

[分类器指引](https://arxiv.org/abs/2105.05233)是将图像标签纳入扩散模型的一种方式。你可以使用标签来指导扩散过程。例如，标签 "猫" 引导反向扩散过程，生成猫的照片。

分类器指引尺度（classifier guidance scale）是一个参数，用于控制扩散过程应多大程度地遵循标签。

下面是我从[这篇论文](https://arxiv.org/abs/2207.12598)中偷出来的一个例子。假设有 3 组图像，标签分别是 "猫"、"狗 "和 "人"。如果扩散是无指引的，模型将从每组的总人口中抽取样本，但有时它可能会抽取可能符合两个标签的图像，例如，一个男孩抚摸着一只狗。

![分级指引。左: 无指引。中: 小指引尺度。右: 大指引尺度。](https://stg.heyfe.org/images/blog-how-does-stable-diffusion-work-1681863477838.png)

在高分类器指引下，扩散模型产生的图像会偏向于极端或不明确的例子。如果你让模型寻找一只猫，它就会返回一张毫不含糊的猫的图像，而不是其他图像。

分类器指引尺度控制着指引的严格程度。在上图中，右边的采样比中间的采样有更高的分类器指引尺度。在实践中，这个比例值就是对具有该标签的数据的漂移项的乘数。

### 无分类器指引（Classifier-free guidance）

尽管分类器指引取得了破纪录的表现，但它需要一个额外的模型来提供这种指引，这给训练带来了一些困难。

[无分类器指引](https://arxiv.org/abs/2207.12598)，用其作者的话说，是一种实现 "不实用分类器的分类指引" 的方法。他们没有使用分类标签和单独的模型进行指引，而是提议使用图像标题并训练一个条件扩散模型（conditional diffusion model），与我们在文本转图像中讨论的模型完全一样。

他们把分类器部分作为噪声预测器 U-Net 的条件，实现了图像生成中所谓的 "无分类器"（即没有单独的图像分类器）指导。

在文字转图像中文字提示提供了这种指导。

#### CFG 值

现在我们有一个可调节的无分类扩散过程，我们如何控制应该遵循多少指引？

无分类指引（CFG）尺度是一个控制文本提示对扩散过程的影响程度的值。当它被设置为 0 时，图像生成是无条件的（也就是说，提示会被忽略）。

## Stable Diffusion v1 和 v2

这已经是一篇很长的文章了，但如果不比较 V1 和 [V2](https://stable-diffusion-art.com/how-to-run-stable-diffusion-2-0/) 版本之间的差异，这篇文章就不完整。

### 模型差异

Stable Diffusion v2 使用 [OpenClip](https://stability.ai/blog/stable-diffusion-v2-release) 进行文本嵌入。Stable Diffusion v1 使用 Open AI 的 CLIP [ViT-L/14](https://github.com/CompVis/stable-diffusion) 进行文本嵌入。这一变化的原因是：

-   OpenClip 大了五倍。更大的文本编码器模型提高了图像质量。
-   尽管 Open AI 的 CLIP 模型是开源的，但这些模型是用专有数据训练的。切换到 OpenClip 模型，让研究人员在研究和优化模型时有更透明度。将更有利于长期发展。

### 训练数据差异

Stable Diffusion v1.4 的[训练数据](https://huggingface.co/CompVis)：

-   在分辨率为 256×256 的 [laion2B-en](https://huggingface.co/datasets/laion/laion2B-en) 数据集上，训练了 23.7 万步。
-   在分辨率为 512×512 的 [laion-high-resolution](https://huggingface.co/datasets/laion/laion-high-resolution) 上训练了 19.4 万步。
-   在分辨率为 512×512 的 "[Laion-aesthetics v2 5+](https://laion.ai/blog/laion-aesthetics/)" 上，训练了 22.5 万步，并降低了 10% 的文本调节。

Stable Diffusion v2 的[训练数据](https://huggingface.co/stabilityai/stable-diffusion-2-base)：

-   在分辨率为 256x256 的 [LAION-5B](https://laion.ai/blog/laion-5b/) 子集上，使用 [LAION-NSFW 分类器](https://github.com/LAION-AI/CLIP-based-NSFW-Detector) 通过 punsafe=0.1 和[审美评分](https://github.com/christophschuhmann/improved-aesthetic-predictor)>=4.5 的过滤了一些露骨素材后，执行了 55 万步。
-   在分辨率 >=512x512 的同一数据集上，使用分辨率 512x512 的图像训练了 85 万步。
-   在同一数据集上使用 [v-objective](https://arxiv.org/abs/2202.00512) 训练了 15 万步。
-   在 768x768 的图像上又训练了 14 万步。

Stable Diffusion v2.1 在 v2.0 基础上进行了微调：

-   在同一数据集上增加 5.5 万步（punsafe=0.1）。
-   又用 punsafe=0.98 多训练了 15 万步

所以基本上，他们在最后的训练步骤中关闭了 NSFW 过滤器。

### 结果不同

用户普遍认为使用 Stable Diffusion v2 控制风格和生成名人更难。虽然 Stability AI 没有明确地过滤掉艺术家和名人的名字，但他们的效果在 v2 中要弱得多。 这可能是由于训练数据的不同。Open AI 的专有数据可能有更多的艺术品和名人照片，他们的数据可能是经过高度过滤的，所以所有的东西和人看起来都很好，很漂亮。

## 译者说

第一次翻译文章，如有问题多多包涵，最近在学习各种 Stable Diffusion 相关的内容，发现这篇文章，感觉解答了很多我自己这几天使用 Stable Diffusion 的困惑。

由于之前没有接触过相关知识，在使用过程中经常会冒出各种疑问：

1. Stable Diffusion 是怎么生成图像的？
2. WebUI 中的各种 mode 是做什么用的？
3. 采样方法、采样步数、CFG 是干什么的？
4. 图生图是怎么实现的？

等等问题，然后看完这篇文章大脑中对很多问题都有了一些清晰的脉络，所以才想翻译出来。

不过没想到翻译的过程还是蛮痛苦的，这篇英文原文有点长，加上里面太多的没涉及的专业词汇（没接触过人工智能相关的知识）让我完全不知道如何翻译，比如 Latent Space、Latent Image、Latent Diffusion 等等，就算是使用了各种翻译软件，得到的内容也是奇奇怪怪，最终就凭感觉全都翻译成了 “潜”。

所以各位如果以后看到优秀的翻译作品，不妨点个赞，背后的辛苦可能比想象的要多得多。
