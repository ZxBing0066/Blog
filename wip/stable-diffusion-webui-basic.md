# AI 绘画基础 - Stable Diffusion WebUI 入门应知应会 【魔导士入门指南】

## 模型分类

Stable Diffusion， checkpoint， 主模型
- .ckpt
- 基于 stable diffusion 模型训练的模型
- 大小 2G - 7G
- webui/models/Stable-diffusion

Textual Inversion
- 文本编码器模型，改变文字向量
- .pt
- 很小，一般只有 kb 量级
- webui/embeddings

Hypernetworks
- 调整模型神经网络权重，风格微调
- .pt
- webui/models/hypernetworks
- 20-200M


**LoRA** LyCORIS: 
- 微调模型，控制人物、画风
- 4-300M
- LyCORIS 可调节范围更大，需要额外的扩展
- webui/models/Lora


ControlNet：

- 做画面控制、动作控制、色深控制、色彩控制
- 需要扩展
- webui/models/ControlNet

VAE
- 亮度和饱和度、画面较正和补光
- .pt
- webui/models/ControlNet
- 335 823

## 模型后缀

safetensors

- hugging face 发明
- 所有类型的模型都可用
- 保证安全

