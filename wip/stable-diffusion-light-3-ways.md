# 3 ways to control lighting in Stable Diffusion

Lighting plays a crucial role in photography and has a significant impact on the overall quality and mood of an image. You can use lighting to enhance the subject, create depth and dimension, convey emotions, and highlight important details.

In this post, you will learn about the following methods to control lighting

-   lighting keywords
-   Regional prompting
-   ControlNet img2img

## Software

We will use [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui) Stable Diffusion GUI to create images. You can use this GUI on [Google Colab](https://stable-diffusion-art.com/automatic1111-colab/), [Windows](https://stable-diffusion-art.com/install-windows/), or [Mac](https://stable-diffusion-art.com/install-mac/).

## Use lighting keywords

The simplest way is to add **lighting keywords** to the prompt.

I will use the following base prompt and negative prompt to illustrate the effect.

> fashion photography, a woman

> disfigured, ugly, bad, immature, cartoon, anime, 3d, painting, b&w, nsfw

Model: [DreamShaper v6](https://civitai.com/models/4384/dreamshaper) (c249d7853b)

Width: 512

Height: 768

CFG scale: 7

Seed: 94858136 – 94858143

Example images generated with the base prompt. They are well-lit and good looking, but the lighting is uninteresting.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-8.png?resize=512%2C768&ssl=1)

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-9.png?resize=512%2C768&ssl=1)

**Volumetric lighting** is distinct light beams on the image. It is used in photography to increase the sense of volume.

Adding the keyword **volumetric** to the prompt:

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-10.png?resize=512%2C768&ssl=1)

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-11.png?resize=512%2C768&ssl=1)

**Rim lighting** adds a lit outline to the subject. It may render the subject darker. You can combine with other lighting terms to light up the subject.

Adding the keyword **rim lighting** to the prompt:

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-12.png?resize=512%2C768&ssl=1)

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-13.png?resize=512%2C768&ssl=1)

**Sunlight** adds… sunlight to the image. It tends to render a nature background.

Adding the keyword **sunlight** to the prompt.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-14.png?resize=512%2C768&ssl=1)

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-42.png?resize=512%2C768&ssl=1)

**Backlight** puts the light source behind the subject. You can produce some stylish effects by adding this one keyword.

Adding **backlight** to the prompt.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-15.png?resize=512%2C768&ssl=1)

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-16.png?resize=512%2C768&ssl=1)

It is well-known that Stable Diffusion won’t produce dark images unguided. There are many ways to solve this, including using models and LoRA. But an easier way is to add some dim-lighting keywords.

Adding **dimly lit** to the prompt.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-18.png?resize=512%2C768&ssl=1)

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-19.png?resize=512%2C768&ssl=1)

**Crepuscular rays** adds light ray breaking through clouds. It can create stunning visual effects.

This prompt and [portrait aspect ratio](https://stable-diffusion-art.com/common-problems-in-ai-images-and-how-to-fix-them/#Use_portrait_size) normally renders full-body images, and adding **crepuscular rays** zooms out. I use **crepuscular rays, face** to zoom in on the face a bit.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-26.png?resize=512%2C768&ssl=1)

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-27.png?resize=512%2C768&ssl=1)

Tips

-   Increase the [weight](https://stable-diffusion-art.com/prompt-guide/#Keyword_weight) of the keyword if you don’t see the effect.
-   These lighting keyword doesn’t always work. Test with generating a few images at a time.
-   Find more lighting keywords in the [Prompt Generator](https://stable-diffusion-art.com/standalone-prompt-generator).

## Control regional lighting

Lighting keywords in the prompt applies to the whole image. You can further dial-in the lighting effect to specific areas of the image.

You will need the [**Regional Prompter**](https://stable-diffusion-art.com/regional-prompter/) extension. Read the article for the installation instructions.

In this example, you will apply different lighting to the upper and the lower part of the image.

In the **txt2img** page, expand the **Regional Prompter** section.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-20.png?resize=750%2C543&ssl=1)

-   **Active**: Yes
-   **Use common prompt**: Yes
-   **Split mode**: Vertical
-   **Divide Ratio**: 2,3

Click **visualize and make template** to confirm that the image is split into two vertical regions.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-21.png?resize=128%2C128&ssl=1)

Put in the prompt:

> fashion photography, a woman  
> BREAK  
> ( hard light:1.2), (volumetric:1.2), well-lit  
> BREAK  
> (dimly lit:1.4)

And use the same negative prompt:

> disfigured, ugly, bad, immature, cartoon, anime, 3d, painting, b&w, nsfw

All other parameters stay the same.

You will get some images that are well-lit on top but dark on the bottom.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-22.png?resize=512%2C768&ssl=1)

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-23.png?resize=512%2C768&ssl=1)

Now try swapping the lighting assignment.

> fashion photography, a woman  
> BREAK  
> (dimly lit:1.4)  
> BREAK  
> ( hard light:1.2), (volumetric:1.2), well-lit

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-24.png?resize=512%2C768&ssl=1)

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-25.png?resize=512%2C768&ssl=1)

The lighting swaps accordingly.

Tips:

-   Adjust the [weights](https://stable-diffusion-art.com/prompt-guide/#Keyword_weight) of the keywords if you don’t see the effect.
-   Regional prompting doesn’t work 100% of the time. Prepare to generate more and cherry-pick.

## Control light with ControlNet

Nowadays, any tutorial is not complete without mentioning ControlNet… So here you go!

This method allows you to control illumination precisely.

You will need the ControlNet extension installed. Follow [this tutorial](https://stable-diffusion-art.com/controlnet/) to install.

### Txt2img settings

On the **txt2img** page, generate an image as usual.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-28.png?resize=750%2C620&ssl=1)

Pick an image you want to add lighting to.

Save it to your local Storage (We will need it later for ControlNet).

Press **Send to img2img**.

### Img2img settings

Your prompt, negative prompt, image size, and seed value are now ported to the img2img page.

On the **img2img** page, navigate to the ControlNet section.

Upload the image you just saved to **ControlNet Unit 0**.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-30.png?resize=750%2C881&ssl=1)

Use the following settings.

-   **Enable**: Yes
-   **Pixel Perfect**: Yes
-   **Allow preview**: Yes
-   **Control Type**: Depth
-   **Preprocessor**: depth_zoe
-   **Model**: control_xxxx_depth
-   **Control** **Weight**: 0.6

Scroll up to the **img2img canvas**. Remove the image.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-31.png?resize=750%2C595&ssl=1)

We will use the following image to control lighting. This image specifies a spotlight near the top.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/spotlight2.png?resize=750%2C535&ssl=1)

Upload this image to the **img2imag canvas**.

Set the **resize mode** to Just Resize.

Set [**denoising strength**](https://stable-diffusion-art.com/inpainting_basics/#Denoising_strength) to 0.95.

Press **Generate**.

You should get images with the light source on top.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-33.png?resize=512%2C768&ssl=1)

You can zoom in on a region of the img2img canvas using the **Edit Tool** (the pencil icon) in the top right corner.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-34.png?resize=750%2C598&ssl=1)

After clicking the pencil icon, drag the corner of the highlighted region to resize. There’s currently a bug in this tool. You may need to do it twice.

For example, the screenshot below shows the same image was cropped so that the light source is on the top left.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-35.png?resize=750%2C592&ssl=1)

See the face and the left-hand side of the hat is lit up more than the previous image.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-36.png?resize=512%2C768&ssl=1)

Likewise, light up the image from the bottom left using the light source below.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-37.png?resize=750%2C596&ssl=1)

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-38.png?resize=512%2C768&ssl=1)

Or a higher contrast diagonal light.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-41.png?resize=750%2C600&ssl=1)

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-40.png?resize=512%2C768&ssl=1)

Below are some examples of light source patterns.

![](https://i0.wp.com/stable-diffusion-art.com/wp-content/uploads/2023/06/image-39.png?resize=597%2C299&ssl=1)

Use them without change or zoom into a region to achieve the desired lighting effect.

You don’t have to use the depth control model. Other models, such as [canny](https://stable-diffusion-art.com/controlnet/#Canny) and [line art realistic](https://stable-diffusion-art.com/controlnet/#Line_Art_Realistic), will also work. Experiment with the preprocessors to see which one works for you.

Reduce the **Cotrolnet weight** if you see unnatural colors.

Adjust the denoising strength and observe the effect.
