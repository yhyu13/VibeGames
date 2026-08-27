# GDD — NEURAL TEXTURE (14_neuraltexture)

## 一句话

一张 8 维潜变量纹理 + 一个 1635 参数的 Decoder MLP，在浏览器里实时近似陶瓷 SVBRDF；三球对照（teacher GGX | neural | 误差热图）证明命题，而不是再造一套 PBR。

## 体验目标

打开页面即见三颗夜釉金缮陶瓷球。左边是解析 GGX teacher，中间是神经解码，右边是放大 8 倍的绝对误差。一盏暖色 key light 绕场公转，高光在釉面与金线上滑动。8 秒内必须出现「哇」：金线高光形状在两球上对齐，误差球几乎全黑、只在脊线残留细缝。

## 玩家幻想

你是对着 SIGGRAPH 课程幻灯片的图形程序员。你没有 NVIDIA Cooperative Vector，没有 Slang autodiff，没有 4K MDL 陶瓷。你有的是：WebGPU 片段着色器里的标量矩阵-向量乘，和一张被烘焙进 8 个数的材质。

## 核心机制（命题）

```
z(uv)     = encode(albedo, roughness, metallic)     # 8-D, 固定编码器
(wh, wd)  = Rusinkiewicz(wi, wo)
rgb       = DecoderMLP(z, wh, wd)                   # 14→32→32→3, leaky ReLU, exp
```

网络预测的是 **unit-light 的 `f_r · n·l`**，不是最终像素。灯光颜色与衰减在解码之后乘。

## 范围（冻结）

| 类别 | 内容 |
|---|---|
| **ship** | 1 个 intro scene：3 球 + 1 灯 + 潜变量 atlas HUD；64²×8 latent；`8+6→32→32→3`；离线 Adam 烘焙 |
| **数据冻结** | learned shading frame（course step 06）、Material Encoder MLP（step 07） |
| **M2+** | 在页训练可视化、WebGL2 回退、path tracer、importance sampling、NTC |

## 美学

夜工作室：`#05060a` 底、暖钨丝 key、冷蓝 fill。陶瓷本体近黑釉（roughness 0.07），金缮线 metallic 0.96，粘土岛 roughness 0.72。极致 case = 高光波瓣窄到几个像素宽 —— 这是 Rusinkiewicz 参数化必须证明的东西。

## 交互

- 拖拽轨道相机（禁止平移）。
- 灯光自动公转；无需键盘。
- HUD 只读：decoder 结构、bake L1、fps、灯光角。
