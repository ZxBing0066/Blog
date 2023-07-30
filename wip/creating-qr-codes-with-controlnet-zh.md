---
tags: []
---

# 利用Creative AI生成带有稳定传播和ControlNet的QR码

> ## 摘要
>
> 如何使用稳定传播和ControlNet创建漂亮的QR码的指南

---

QR码似乎是稳定传播的最新趋势，所以让我们深入研究一下，看看我们如何创建自己的QR码！

如果您喜欢视频教程，这里有一个不错的视频教程供您参考。您也可以在下面详细的文字教程中进行操作。

<iframe width="200" height="113" src="https://www.youtube.com/embed/OJLD0SlB7nI?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" title="Make This QR Code With AI - Full Stable Diffusion Tutorial"></iframe>

使用稳定传播制作QR码

一篇由Sebastian Kampth撰写的详细教程，介绍了使用稳定传播生成AI QR码的新见解：

<iframe width="200" height="113" src="https://www.youtube.com/embed/HOY5J9UT_lY?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" title="Ultimate QR Guide. What All Other Guides Miss."></iframe>

Ultimate QR指南。其他指南中所遗漏的内容。- Sebastian Kamph

## 工作流程1：适用于全身姿势（Img2Img）

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-combo-1.jpg)

通过将QR码与艺术品结合，使用稳定传播的ControlNet在ThinkDiffusion上制作您自己的AI QR码。

### 第1步：创建常规QR码

-   首先，我们需要创建一个QR码。您可以在[https://keremerkan.net/qr-code-and-2d-code-generator/](https://keremerkan.net/qr-code-and-2d-code-generator/?ref=learn.thinkdiffusion.com)免费创建一个QR码。

![](https://learn.thinkdiffusion.com/content/images/2023/06/Generate_QR_Code.png)

-   输入您的URL，并尽量使用URL缩短。将错误纠正级别设置为高，因为我们将把图像与我们自己的图像混合在一起。
-   然后，我们可以生成一个QR码并将其保存到您的本地电脑中。

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR_Code.png)

### 第2步：创建与QR码混合的艺术品

现在，我们可以找到一幅自己喜欢的图像，或者在稳定传播的文本转图像选项卡中生成一些图像。我将在**txt2Img选项卡**中生成一个图像。

如果您尚未在本地安装稳定传播，请转至[ThinkDiffusion](https://www.thinkdiffusion.com/?ref=learn.thinkdiffusion.com)以跟随操作。只需选择A1111并启动一个虚拟机即可开始。

（下面的屏幕截图来自Automatic1111或A1111，它是稳定传播的默认用户界面）

好的，我们开始吧！

![](https://learn.thinkdiffusion.com/content/images/2023/06/txt-img-tab2.jpg)

-   **(1)** 模型是**revAnimated_v122**
-   **(2)** 采样方法是**DPM++ 2S a Karras**
-   **(3)** 采样步骤为**20**
-   **(4)** 分辨率为**768 x 768**
-   **(5)** CFG缩放值为**11**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-combine.jpg)

-   对于正向提示，因为我们使用的是ControlNet_OpenPose_Full，最好在正向提示中包含'full body'，因为我们要模仿图像的姿势。您甚至可以将分辨率更改为宽度512和高度768，使其成为一幅竖版画，这样它对我们的QR码的干扰会更少。

**正向提示：**    
_futobot，cyborg，((masterpiece),(best quality),(ultra-detailed), (full body:1.2), 1 female, solo, hood up, upper body, mask, 1 girl, female focus, black gloves, cloak, long sleeves_

**负向提示：**    
_paintings，sketches，（worst quality:2），（low quality:2），（normal quality:2），lowres，normal quality，（monochrome），（grayscale），skin spots，acnes，skin blemishes，age spot，glans，nsfw，nipples，（（necklace）），（worst quality，low quality:1.2），watermark，username，signature，text，multiple breasts，lowres，bad anatomy，bad hands，text，error，missing fingers，extra digit，fewer digits，cropped，worst quality，low quality，normal quality，jpeg artifacts，signature，watermark，username，blurry，bad feet，single color，（（（ugly））），（（（duplicate））），（（morbid）），（（mutilated）），（（tranny）），（（trans）），（（trannsexual）），(hermaphrodite)，extra fingers，mutated hands，（（poorly drawn hands）），（（poorly drawn face）），（（mutation）），（（deformed）），（（ugly）），blurry，（（bad anatomy）），（（bad proportions）），（（extra limbs）），（（disfigured）），bad anatomy，gross proportions，(malformed limbs)，（missing arms），（missing legs），（（extra arms）），（（extra legs）），mutated hands，(fused fingers)，(too many fingers)，（（long neck）），（bad body perspect:1.1）_

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-combine2.jpg)

在ThinkDiffusion.com上使用稳定传播生成的AI图像

### 第3步：将图像与QR码结合

-   然后，我们可以将此图像发送到img2img标签页，或者如果您已经有要使用的图像，可以将您的图像上传到img2img标签页。我们可以输入相同的正向和负向提示。
-   **重要提示：**您必须在img2img标签页中输入提示才能使其正常工作。

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-1.jpg)

-   **(1)** 然后，我们可以选择采样方法为**DPM++ 2S a Karras**，
-   **(2)** 采样步骤为**60**
-   **(3)** 分辨率为**768 x 768**
-   **(4)** CFG Scale为**11**
-   **(5)** 去噪强度为**1.0**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-2.jpg)

-   然后，我们需要进入ControlNet让它施展魔法！对于**ControlNet Unit 0**，我们需要再次上传在txt2img标签页生成的图像，或者如果您已经有一个图像，也可以上传您自己的图像。

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-3.jpg)

-   **(1)** 确保选中复选框以**启用**ControlNet Unit 0内的ControlNet
-   **(2)** 选择**OpenPose**作为控制类型，**openpose_full**作为预处理器，**control_sd15_openpose**作为ControlNet模型
-   **(3)** 我们可以将**控制权重**设置为**1**，因为我们要告诉ControlNet我们的QR码应该有更高的权重
-   **(4)** 我们可以将**起始控制步骤**设置为**0**，将**结束控制步骤**设置为**1**，因为我们希望从起始点开始生成我们的图像。
-   **(5)** 选择**平衡**作为控制模式
-   **(6)** 和**缩放和填充**为调整模式。

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-4B.jpg)

-   现在，我们需要进入controlNet unit 1标签页（如果您看不到此标签页，则需要进入设置>controlNet并将滑块更改为显示超过1个controlNet标签）

![](https://learn.thinkdiffusion.com/content/images/2023/06/Multi_ControlNet.png)

-   然后，我们可以将我们的QR码上传到controlNet Unit1标签页

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-5.jpg)

-   **(1)** 确保我们点击**启用**以确保ControlNet处于激活状态
-   **(2)** 选择**tile**作为控制类型，
-   **(3) tile_resample**作为预处理器
-   **(4) control_v11f1e_sd15_tile**作为controlNet模型（您可能有不同版本的controlNet tile模型）
-   **(5)** 将控制权重设置为**1.2**，以告知控制网络我们的QR码比图像略为重要！
-   **(6)** 将起始控制步骤设置为**0.23**，结束控制步骤设置为**1**。这样可以确保我们的图像在渲染QR码之前开始生成，这在视觉上更美观！
-   **(7)** 将控制模式设置为**平衡**
-   **(8)** 将调整模式设置为**调整大小和填充**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-6.jpg)

### 第4步：击掌庆祝！

恭喜，现在我们可以点击生成按钮，我们应该得到我们混合了图像的QR码！

![](https://learn.thinkdiffusion.com/content/images/2023/06/00013-2096516915.png)

使用Stable Diffusion和ControlNet在ThinkDiffusion.com上创建的AI生成QR码

---

## 工作流程2：更广泛的可能性（Txt2Img）

![](https://learn.thinkdiffusion.com/content/images/2023/06/LadyGaga-2.png)

使用Stable Diffusion和ControlNet在ThinkDiffusion.com上创建的AI生成QR码

### 第1步：创建我们的提示

-   首先，我们可以输入我们的正向和负向提示

> **正向提示：** _Lady gaga以Alberto Seveso的风格，8k，超高清，（杰作:1.5）_

> **负向提示：** _模糊，低分辨率，文字，不宜观看内容_

-   **(1)** 将稳定传播检查点设置为**revAnimated**
-   **(2)** 将采样方法设置为**DPM++ 2M Karras**
-   **(3)** 将采样步骤设置为**30**
-   **(4)** 启用恢复人脸 ✅
-   **(5)** 将分辨率设置为**768 x 768**
-   **(6)** 将CFG缩放值设置为**11**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-t2iA-2.jpg)

### 第2步：ControlNet Unit 0

-   **(1)** 点击**ControlNet下拉菜单**
-   **(2)** 并**上传**我们的QR码。
-   **(3)** 点击**启用**以确保ControlNet处于激活状态 ✅
-   **(4)** 将控制类型设置为**All**
-   **(5)** 预处理器设置为**inpaint_global_harmonious**
-   **(6)** ControlNet模型设置为**control_v1p_sd15_brightness**
-   **(7)** 将控制权重设置为**0.35**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-t2i-unit0-1.jpg)

### 第3步：ControlNet Unit 1

-   **(1)** 切换到**ControlNet Unit 1标签页**
-   **(2)** 在ControlNet Unit 1中，我们需要**再次上传我们的QR码**
-   **(3)** 点击**启用**以确保ControlNet处于激活状态 ✅
-   **(4)** 将控制类型设置为**All**
-   **(5)** 将预处理器设置为**inpaint_global_harmonious**
-   **(6)** 将ControlNet模型设置为**control_v11f1e_sd15_tile**
-   **(7)** 将控制权重设置为**0.5**
-   **(8)** 将起始控制步骤设置为**0.35**
-   **(9)** 将结束控制步骤设置为**0.70**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-t2i-unit1-1.jpg)

### 第4步：击掌庆祝！

-   点击生成按钮......！

![](https://learn.thinkdiffusion.com/content/images/2023/06/LadyGaga-2.png)

使用Stable Diffusion和ControlNet在ThinkDiffusion.com上创建的AI生成QR码

## 使用相同的txt2Img工作流程的其他示例

**狮子**

**正向提示：** _一只狮子的全身照，Yoji Shinkawa风格，Jean-baptiste Monge，总平面图，中央构图，完全在一张纸上，水墨画，表现性绘画，水彩，大胆的笔触，概念艺术，橙色，（紫色：1.2），灰色和白色，风格化，精细细节，8k，透明背景，（白色背景：1.4），3D矢量_

**负向提示：** _水印，文字，已审查，弯曲，不好的解剖，畸形_

![](https://learn.thinkdiffusion.com/content/images/2023/06/Lion.png)

使用Stable Diffusion和ControlNet在ThinkDiffusion.com上创建的AI生成QR码

**城市**

**正向提示：** _8k，RAW照片，最高质量，（杰作:1.2），真实，照片逼真（1.37），光子映射，辐射度，基于物理的渲染，ue5，（海岛圣地），（古代沉没王国），（淹没的城市）_

**负向提示：** _卡通，绘画，插图，（最差质量，低质量，正常质量:2），不宜观看内容_

![](https://learn.thinkdiffusion.com/content/images/2023/06/City.png)

使用Stable Diffusion和ControlNet在ThinkDiffusion.com上创建的AI生成QR码

请注意，您可以调整两幅图像的控制权重以找到一个满意的平衡点！此外，您还可以调整QR码的起始控制步骤。我发现这些设置通常可以获得不错的外观，并且QR码也可正常扫描。但是，有时QR码无法扫描，请继续生成和调整以获得您所需的精确结果！

如果您遇到安装问题或硬件速度较慢，您可以尝试在浏览器中使用更强大的GPU执行任何这些工作流程，请前往[ThinkDiffusion](https://www.thinkdiffusion.com/?ref=learn.thinkdiffusion.com)。

如果您希望在第2步中更好地控制您的角色艺术作品，请查看我关于使用OpenPose的帖子[这里](https://learn.thinkdiffusion.com/controlnet-openpose/)。祝您创作愉快！

![](https://learn.thinkdiffusion.com/content/images/2023/06/giphy.gif)

继续保持良好的稳定传播工作，加油！