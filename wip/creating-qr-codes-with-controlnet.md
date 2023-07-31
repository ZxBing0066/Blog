---
tags: []
---

# Creative AI Generated QR Codes with Stable Diffusion & ControlNet

> ## Excerpt
>
> A guide on how to create Beautiful QR codes with Stable Diffusion & ControlNet

---

QR codes seem to be the latest trend on stable diffusion, so let's dive in and see how we can create our own!

Here's a decent video tutorial if you prefer it over the detailed written tutorial below.

<iframe width="200" height="113" src="https://www.youtube.com/embed/OJLD0SlB7nI?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" title="Make This QR Code With AI - Full Stable Diffusion Tutorial"></iframe>

Making QR codes with Stable Diffusion

A super detailed tutorial with new insights from Sebastian Kampth on AI QR Codes using Stable Diffusion:

<iframe width="200" height="113" src="https://www.youtube.com/embed/HOY5J9UT_lY?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" title="Ultimate QR Guide. What All Other Guides Miss."></iframe>

Ultimate QR Guide. What All Other Guides Miss. - Sebastian Kamph

## Workflow 1: Best for full pose characters (Img2Img)

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-combo-1.jpg)

Make your own AI QR Code by combining the QR code and art together with Stable Diffusion's ControlNet on ThinkDiffusion

### Step 1. Create Normal QR Code

-   Firstly, we need to create a QR code. You can create one here for free at
    [https://keremerkan.net/qr-code-and-2d-code-generator/](https://keremerkan.net/qr-code-and-2d-code-generator/?ref=learn.thinkdiffusion.com)

![](https://learn.thinkdiffusion.com/content/images/2023/06/Generate_QR_Code.png)

-   Enter your url and it helps to use URL shortening. Set the error correction level to high as we are going to be blending the image with our own
    image.
-   We can then generate a QR code and save it to your local pc.

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR_Code.png)

### Step 2: Create Art for Combining with the QR Code

We can now either find an image we like or generate some from the txt2Img tab within Stable Diffusion. I am going to generate one within the **txt2Img
tab**.

If you don't have Stable Diffusion installed locally, you can head over to
[ThinkDiffusion](https://www.thinkdiffusion.com/?ref=learn.thinkdiffusion.com) to follow along. Simply select A1111 and launch a machine to get
started.

(The screenshots below are from Automatic1111 or A1111 for short, it's the de facto UI for Stable Diffusion)

Alrighty, let's do it!

![](https://learn.thinkdiffusion.com/content/images/2023/06/txt-img-tab2.jpg)

-   **(1)** The model is **revAnimated_v122**
-   **(2)** Sampling method is **DPM++ 2S a Karras**
-   **(3)** Sampling steps **is 20**
-   **(4)** Resolution **768 x 768**
-   **(5)** CFG scale **11**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-combine.jpg)

-   For the positive prompts, because we are using ControlNet_OpenPose_Full, it is best to include 'full body' in the positive prompts as we are
    mimicking the stance of our image. You can even change the resolution to width 512 and height 768 to make it a portrait, so that it interferes
    less with our QR code

**Positive Prompts:**  
_futobot, cyborg, ((masterpiece),(best quality),(ultra-detailed), (full body:1.2), 1 female, solo, hood up, upper body, mask, 1 girl, female focus,
black gloves, cloak, long sleeves_

**Negative Prompts:**  
_paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots,
acnes, skin blemishes, age spot, glans, nsfw, nipples, (((necklace))), (worst quality, low quality:1.2), watermark, username, signature, text,
multiple breasts, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal
quality, jpeg artifacts, signature, watermark, username, blurry, bad feet, single color, ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)),
(((tranny))), (((trans))), (((trannsexual))), (hermaphrodite), extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)),
(((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), (((disfigured))), (bad anatomy), gross
proportions, (malformed limbs), ((missing arms)), (missing legs), (((extra arms))), (((extra legs))), mutated hands,(fused fingers), (too many
fingers), (((long neck))), (bad body perspect:1.1)_

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-combine2.jpg)

AI generated image using Stable Diffusion on ThinkDiffusion.com

### Step 3: Combine the Image with the QR Code

-   We can then send this to the img2img tab, or upload your image to the img2img tab if you already have one you want to use. We can enter the same
    positive and negative prompts.
-   **IMPORTANT:** You have to enter prompts within the img2img tab for this to work

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-1.jpg)

-   **(1)** We can then select the sampling method as **DPM++ 2S** **a Karras**,
-   **(2)** Sampling steps **60**
-   **(3)** A resolution of **768 x 768**
-   **(4)** A CFG Scale of **11**
-   **(5)** And a Denoising strength as **1.0**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-2.jpg)

-   We then need to go into ControlNet for it to do its magic! For **ControlNet Unit 0**, we need to upload the image again that was generated in the
    txt2img tab or your own image if you already have one.

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-3.jpg)

-   **(1)** Make sure to tick the checkbox to **Enable** ControlNet within ControlNet Unit 0
-   **(2)** Select **OpenPose** as the Control Type, **openpose_full** as the pre-processor and **control_sd15_openpose** as the ControlNet model
-   **(3)** We can leave the **Control Weight** at **1** as we are going to inform controlnet that our QR code should be weighted heavier
-   **(4)** We can leave the the **Starting Control Step** at **0** and the **Ending Control Step** at **1** as we want our image to be generated from
    the initial start.
-   **(5)** Select **Balanced** as the Control Mode
-   **(6)** And **Resize and Fill** for the Resize Mode.

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-4B.jpg)

-   We now need to go into the controlNet unit 1 tab (If you don't see this then you need to go into settings > controlNet and change the slider to
    show more than 1 controlNet tab

![](https://learn.thinkdiffusion.com/content/images/2023/06/Multi_ControlNet.png)

-   We can then upload our QR code to the controlNet Unit1 tab

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-5.jpg)

-   **(1)** Ensure we click **enable** to make sure ControlNet is activated
-   **(2)** Select **tile** as the Control Type,
-   **(3) tile_resample** as the pre-processor
-   **(4) control_v11f1e_sd15_tile** as the controlNet model (You may have a different version of the controlNet tile model)
-   **(5)** Set the control weight to **1.2** to inform control net that our QR code is slightly more important than our image!
-   **(6)** Set the starting control step to **0.23** and the ending control step to **1**. This ensures that our image will start rendering before
    the QR code is rendered. It's more aesthetically pleasing on the eye this way!
-   **(7)** Set the control mode to **balanced**
-   **(8)** and the resize mode to **Resize and fill**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-v2-6.jpg)

### Step 4: High five!

Congrats, we can now click generate and we should have our QR code blended with our image!

![](https://learn.thinkdiffusion.com/content/images/2023/06/00013-2096516915.png)

QR Code created with AI using Stable Diffusion with ControlNet on ThinkDiffusion.com

---

## Workflow 2: A wider array of possibilities (Txt2Img)

![](https://learn.thinkdiffusion.com/content/images/2023/06/LadyGaga-2.png)

QR Code created with AI using Stable Diffusion with ControlNet on ThinkDiffusion.com

### Step 1: Create our prompts

-   We can start with entering our positive and negative prompts

> **Positive Prompts:** _Lady gaga in the style of Alberto Seveso, 8k, ultra detailed, (masterpiece:1.5)_

> **Negative Prompts:** _blurry, lowres, text, nsfw_

-   **(1)** Set the stable diffusion checkpoint to **revAnimated**
-   **(2)** the sampling method as **DPM++ 2M Karras**
-   **(3)** sampling steps to **30**
-   **(4)** enable restore faces ✅
-   **(5)** set the resolution to **768 x 768**
-   **(6)** and a CFG scale of **11**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-t2iA-2.jpg)

### Step 2: ControlNet Unit 0

-   **(1)** Click the **ControlNet dropdown**
-   **(2)** and **upload** our qr code.
-   **(3)** Click **Enable** to ensure that ControlNet is activated ✅
-   **(4)** Set the Control Type to be **All**
-   **(5)** the Preprocessor to be **inpaint_global_harmonious**
-   **(6)** and the ControlNet model to be **control_v1p_sd15_brightness**
-   **(7)** Set the Control weight to be **0.35**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-t2i-unit0-1.jpg)

### Step 3: ControlNet Unit 1

-   **(1)** Click over to the **ControlNet Unit 1 Tab**
-   **(2)** Within ControlNet Unit 1 we want to **upload our qr code again**
-   **(3)** Click **Enable** to ensure that ControlNet is activated ✅
-   **(4)** Set the Control Type to **All**
-   **(5)** the Preprocessor to **inpaint_global_harmonious**
-   **(6)** and the ControlNet model to **control_v11f1e_sd15_tile**
-   **(7)** Set the Control Weight to **0.5**
-   **(8)** the starting Control Step to **0.35**
-   **(9)** and the ending control step to **0.70**

![](https://learn.thinkdiffusion.com/content/images/2023/06/QR-codes-t2i-unit1-1.jpg)

### Step 4: High Five!

-   Click generate...!

![](https://learn.thinkdiffusion.com/content/images/2023/06/LadyGaga-2.png)

QR Code created with AI using Stable Diffusion with ControlNet on ThinkDiffusion.com

## Other examples using the same txt2Img workflow

**Lion**

**Positive Prompts:** _Full Photo shot of a lion, Yoji Shinkawa style, Jean-baptiste Monge, general plan, central composition, entirely on a sheet,
Ink painting, expressive painting, watercolor, bold brushstrokes, Concept art, orange, (purple:1.2), gray and white, stylize, intricate detail, 8k,
transparent background, (white background:1.4), 3D vector_

**Negative Prompts:** _Watermark, Text, censored, deformed, bad anatomy, disfigured_

![](https://learn.thinkdiffusion.com/content/images/2023/06/Lion.png)

QR Code created with AI using Stable Diffusion with ControlNet on ThinkDiffusion.com

**City**

**Positive Prompts:** _8k, RAW photo, best quality, (masterpiece:1.2), (realistic, photo-realistic:1.37), octane render, ultra high res,
ultra-detailed , professional lighting, photon mapping, radiosity, physically-based rendering, ue5, ((island sanctuary)), ((ancient fallen kingdom)),
((drowned city))_

**Negative Prompts:** _cartoon, painting, illustration, (worst quality, low quality, normal quality:2), nsfw_

![](https://learn.thinkdiffusion.com/content/images/2023/06/City.png)

QR Code created with AI using Stable Diffusion with ControlNet on ThinkDiffusion.com

Please note that you can play around with the control weight of both images to find a happy place! Also, you can tweak the starting control step of
the QR image. I find these settings tend to give a decent look but also works as a QR code. They don't always scan though, just keep generating and
tweaking to get the exact outcome you desire!

If you’re having issues with installation or slow hardware, you can try any of these workflows on a more powerful GPU in your browser with
[ThinkDiffusion](https://www.thinkdiffusion.com/?ref=learn.thinkdiffusion.com).

If you’d like to have more control over your character art in Step 2, check out my post to using OpenPose
[here](https://learn.thinkdiffusion.com/controlnet-openpose/). Happy creating!

![](https://learn.thinkdiffusion.com/content/images/2023/06/giphy.gif)

Keep up the good SD work, let's go!