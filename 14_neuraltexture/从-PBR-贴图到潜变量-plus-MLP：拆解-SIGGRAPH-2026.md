> 摘要
> 
> 神经材质并不是让一个大模型在渲染时“想象”材质。[SIGGRAPH 2026](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=SIGGRAPH+2026&zhida_source=entity) 课程 An Introduction to Neural Shading 展示了一条更具体的路线：把复杂材质在不同位置、观察方向和光照方向下的响应，压缩到一张潜变量纹理和一个很小的 MLP 中，再让 Shader 在运行时解码。课程从最小实现出发，逐步加入 [Rusinkiewicz 方向参数化](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=Rusinkiewicz+%E6%96%B9%E5%90%91%E5%8F%82%E6%95%B0%E5%8C%96&zhida_source=entity)、可学习的着色坐标系、材质编码器、GPU 自动微分与 Cooperative Vector 加速。它很适合用来理解神经材质的基本结构，同时也暴露了当前示例的边界：只学习材质求值，没有学习[重要性采样](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E9%87%8D%E8%A6%81%E6%80%A7%E9%87%87%E6%A0%B7&zhida_source=entity)和 PDF，也没有给出完整的产品级[压缩率](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%8E%8B%E7%BC%A9%E7%8E%87&zhida_source=entity)与渲染性能数据。

[实时渲染](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%AE%9E%E6%97%B6%E6%B8%B2%E6%9F%93&zhida_source=entity)中的材质，通常是一组纹理加一段固定的 BRDF 代码。基础 PBR 材质可能包含 Base Color、Normal、Roughness、Metallic 等贴图；更复杂的材质会叠加清漆、织物纤维、薄膜、[各向异性](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%90%84%E5%90%91%E5%BC%82%E6%80%A7&zhida_source=entity)和程序化节点。

这套表达很直接，但复杂度会同时增长在两个地方：

-   材质参数越来越多，需要读取和过滤更多纹理；
-   [材质函数](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E6%9D%90%E8%B4%A8%E5%87%BD%E6%95%B0&zhida_source=entity)越来越长，[实时计算](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%AE%9E%E6%97%B6%E8%AE%A1%E7%AE%97&zhida_source=entity)复杂分层模型的成本也越来越高。

SIGGRAPH 2026 的_An Introduction to Neural Shading_课程没有试图设计另一套固定材质模型，而是把材质本身当成一个需要近似的函数。给定表面位置、入射方向和出射方向，小型神经网络直接预测材质的反射响应。

这篇文章只讨论课程中的神经材质部分。[自动微分](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=2&q=%E8%87%AA%E5%8A%A8%E5%BE%AE%E5%88%86&zhida_source=entity)、神经纹理和硬件加速会保留必要内容，但不会展开成一门机器学习课。

## 神经材质保存的不是最终颜色

先明确网络在预测什么。

课程示例使用一个导出的 MDL 陶瓷材质作为参考。在训练时，参考材质接收 UV、入射方向 wi 和出射方向 wo，返回这个方向组合下的 BSDF 值。BSDF 描述光从一个方向到达表面后，有多少能量被[散射](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E6%95%A3%E5%B0%84&zhida_source=entity)到另一个方向；它是材质属性，不是已经乘上灯光和曝光的最终像素颜色。

网络学习的是同一个查询：

```text
material_eval(uv, wi, wo) -> RGB response
```

如果把完整 UV 直接交给 MLP，网络需要同时记住空间纹理和方向变化，网络规模很容易失控。课程把任务拆成两部分：

1.  用 UV 从潜变量纹理中取得一个很短的局部代码；
2.  用一个所有纹素共享的 Decoder MLP，把局部代码和方向信息解码成 RGB 材质响应。

![](https://pica.zhimg.com/v2-af358024acc0065640a85fe25a051d48_1440w.jpg)

图 1：最小神经材质由潜变量纹理和 Decoder MLP 组成。UV 负责找到局部代码，入射与出射方向决定当前角度下的响应。来源：课程幻灯片第 187 页。

幻灯片中的最小示例使用 4 维潜变量，Decoder 是一个 10 → 32 → 32 → 3 的小型 MLP：4 个潜变量加上 wi、wo 的 6 个[方向分量](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E6%96%B9%E5%90%91%E5%88%86%E9%87%8F&zhida_source=entity)，经过两层 32 维隐藏层，输出 RGB。公开仓库中的递进示例统一使用 8 维潜变量，并逐步加入更适合材质的方向编码。

这个结构可以理解成一种“共享材质基底”。传统贴图直接保存可解释参数，例如[粗糙度](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E7%B2%97%E7%B3%99%E5%BA%A6&zhida_source=entity)为 0.2、法线朝向某个方向；潜变量纹理中的每个通道没有预先规定的物理含义。Decoder 在训练中学会怎样组合这些数值，使它们共同表达局部颜色、粗糙表面、高光和法线变化。

它不等同于自动获得压缩。潜变量有多少通道、使用什么精度、纹理分辨率多高、Decoder 多大，都会影响实际内存。课程证明了表示方式能够工作，没有给出一套产品级压缩率。

## 最小网络能拟合，但高光明显不对

训练过程并不神秘：

1.  随机选择 UV、\`wi\` 和 \`wo\`；
2.  分别调用 MDL 参考材质和神经材质；
3.  计算两者误差；
4.  通过 Slang 的反向自动微分得到梯度；
5.  用 Adam 更新潜变量纹理和[网络权重](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E7%BD%91%E7%BB%9C%E6%9D%83%E9%87%8D&zhida_source=entity)。

BSDF 的输出可能远大于 1。镜面材质会把能量集中到很窄的方向，峰值可以很高。课程没有直接对原始数值做普通 L1 损失，而是先进行幂变换，压缩[动态范围](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4&zhida_source=entity)，避免少数极高样本支配训练。

最初结果已经能还原大部分纹理，却在高光附近出现明显偏色和[形状误差](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%BD%A2%E7%8A%B6%E8%AF%AF%E5%B7%AE&zhida_source=entity)。

![](https://pic3.zhimg.com/v2-bbb6f71d00e854de005234416600a124_1440w.jpg)

图 2：左侧是参考材质，中间是最初的神经材质，右侧显示潜变量纹理。基础纹理接近，但高光区域仍有明显误差。来源：课程幻灯片第 199 页。

原因首先出在训练样本。若在两个半球上均匀选择 wi 和 wo，大量样本落在平淡的[漫反射](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E6%BC%AB%E5%8F%8D%E5%B0%84&zhida_source=entity)区域，狭窄的[镜面波瓣](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E9%95%9C%E9%9D%A2%E6%B3%A2%E7%93%A3&zhida_source=entity)只占很小一部分。网络看过很多“容易且相似”的样本，却很少看到真正决定材质质感的高光变化。

课程随后采用 Rusinkiewicz 参数化。它用半程向量

```text
wh = normalize(wi + wo)
```

以及把 wi 旋转到 wh [坐标系](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=2&q=%E5%9D%90%E6%A0%87%E7%B3%BB&zhida_source=entity)后得到的[差分向量](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%B7%AE%E5%88%86%E5%90%91%E9%87%8F&zhida_source=entity) wd，重新描述一对光照与观察方向。对常见微表面 BRDF 来说，高光波瓣主要随半程向量变化，Fresnel 又与观察方向和半程向量的夹角密切相关。把这些结构直接交给网络，比让小 MLP 从六个原始方向分量里重新推导更有效。

训练样本也改为在半程/差分角空间中分布，使高光区域得到更多关注。课程对比中，Rusinkiewicz 采样与参数化比简单的微表面偏置采样更接近参考结果。

![](https://pic2.zhimg.com/v2-8fdd62228ad04932ca0174dda36d4179_1440w.jpg)

图 3：参考材质、Rusinkiewicz 采样与参数化、简单微表面采样的结果对比。来源：课程幻灯片第 217 页。

这部分是课程最值得注意的技术点之一。[神经网络](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=2&q=%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C&zhida_source=entity)没有取消材质理论，反而更依赖合适的材质理论。网络很小，容量有限；提前把 BRDF 中已知的对称性和方向关系编码进输入，可以把有限参数留给难以手工建模的部分。

普通[法线贴图](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E6%B3%95%E7%BA%BF%E8%B4%B4%E5%9B%BE&zhida_source=entity)会先构造局部着色坐标系，再把光照和观察方向旋转到这个坐标系。这个过程包含[归一化](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%BD%92%E4%B8%80%E5%8C%96&zhida_source=entity)、点积、叉积和方向旋转。

课程用一个很小的[线性层](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E7%BA%BF%E6%80%A7%E5%B1%82&zhida_source=entity)，从潜变量中预测局部法线和[切线](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%88%87%E7%BA%BF&zhida_source=entity)，形成可学习的 Shading Frame。半程向量和差分向量先旋转到这个局部坐标系，再进入 Decoder。最终示例使用两个可学习坐标系，为网络提供两组旋转后的方向。

这不是简单地让网络多输出几个数字。它把“局部表面朝向如何改变材质响应”从一个难学的黑盒关系，拆成了显式[坐标变换](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%9D%90%E6%A0%87%E5%8F%98%E6%8D%A2&zhida_source=entity)和剩余材质响应两部分。

![](https://pic3.zhimg.com/v2-b3ac998ec1e620e37cb3c46a9bcf5ff6_1440w.jpg)

图 4：加入 Shading Frame Encoding 后，网络能更准确地恢复局部法线变化与高光位置。来源：课程幻灯片第 243 页。

课程还用插值举了一个类似例子：小型 MLP 并不擅长稳定地复现乘法和双线性权重。已知的过滤运算可以继续由传统 Shader 完成，网络负责难以显式表达的[映射](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E6%98%A0%E5%B0%84&zhida_source=entity)。把成熟[图形算法](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%9B%BE%E5%BD%A2%E7%AE%97%E6%B3%95&zhida_source=entity)全部塞进 MLP，通常只会增加训练难度和误差。

## 材质编码器解决 4K 训练问题

直接优化潜变量纹理还有一个[工程问题](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%B7%A5%E7%A8%8B%E9%97%AE%E9%A2%98&zhida_source=entity)：每个纹素都是独立参数。

从 512×512 提升到 4096×4096，[纹素](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=3&q=%E7%BA%B9%E7%B4%A0&zhida_source=entity)数量增加 64 倍。如果训练样本总量不变，每个潜变量得到的更新会少很多；如果维持相同[采样密度](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E9%87%87%E6%A0%B7%E5%AF%86%E5%BA%A6&zhida_source=entity)，训练时间又会随分辨率迅速增长。潜变量纹理和 Decoder 的[收敛速度](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E6%94%B6%E6%95%9B%E9%80%9F%E5%BA%A6&zhida_source=entity)也不一致。

课程的后续方案加入一个 Material Encoder。它读取参考材质中较容易取得的属性，包括法线、切线、[反照率](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%8F%8D%E7%85%A7%E7%8E%87&zhida_source=entity)、粗糙度和各 BSDF 层权重，再输出 8 维潜变量。示例支持两层 BSDF 属性，并把 Mip 层级也作为输入。

![](https://picx.zhimg.com/v2-380573402ce581767b1e4d0abf26153b_1440w.jpg)

图 5：Material Encoder 把显式 BRDF 参数转成潜变量，Decoder 再结合方向信息预测材质响应。来源：课程幻灯片第 255 页。

Encoder 的意义在于共享：参数相近的纹素通过同一个网络生成相近的潜变量，不需要从零独立学习。训练完成后，可以把 Encoder 对整套参考纹理的输出烘焙成潜变量纹理；运行时只保留潜变量和 Decoder，不必执行较大的 Encoder。

课程展示的 4K 结果中，Encoder 版本比直接训练同分辨率潜变量更接近参考材质。

![](https://pica.zhimg.com/v2-9f39610264ea33ca409822cf4d66bad0_1440w.jpg)

图 6：4K 参考材质与 Encoder 方案的结果。来源：课程幻灯片第 263 页。

神经材质和普通神经[纹理压缩](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E7%BA%B9%E7%90%86%E5%8E%8B%E7%BC%A9&zhida_source=entity)的分工由此变得清楚：潜变量纹理负责保存局部信息，Decoder 负责解释局部信息在方向变化下怎样表现；Material Encoder 用于训练阶段，把原始材质参数映射到更适合 Decoder 的紧凑代码。三者不一定都在运行时存在。

## 为什么小 MLP 最近才适合直接放进 Shader

Decoder 只有几层，但它会在每个需要材质求值的着色点执行。一次 MLP 推理的主要工作是矩阵-向量乘法。如果每个 Shader Invocation 都用普通标量或[向量指令](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%90%91%E9%87%8F%E6%8C%87%E4%BB%A4&zhida_source=entity)计算，网络即使很小，也可能比传统 PBR 代码贵。

Cooperative Vector 的目标正是这个执行模式。对于[开发者](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%BC%80%E5%8F%91%E8%80%85&zhida_source=entity)，它看起来仍像当前线程持有一个向量并执[行矩阵](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E8%A1%8C%E7%9F%A9%E9%98%B5&zhida_source=entity)\-向量乘法；GPU 可以在底层把同一 Subgroup 中多个线程的计算组合起来，利用专门的矩阵乘加单元。与 Cooperative Matrix 相比，它更适合“每个像素各自运行一次小网络”，也不要求开发者手工把所有输入拼成共享矩阵。

课程使用 FP16 权重和 Cooperative Vector 完成前向计算，也演示了训练所需的[反向传播](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E5%8F%8D%E5%90%91%E4%BC%A0%E6%92%AD&zhida_source=entity)：

```glsl
u = Mv + B
 
dM += du outer_product v
dB += du
dv = transpose(M) du
```

权重和偏置梯度需要跨线程原子累加。Slang 允许为 Cooperative Vector 内建函数提供自定义反向导数，再由 bwd\_diff 把整个材质[损失函数](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E6%8D%9F%E5%A4%B1%E5%87%BD%E6%95%B0&zhida_source=entity)转换成反向传播代码。

![](https://pic3.zhimg.com/v2-d9042bf9a0a26b152045d6192bb2652e_1440w.jpg)

图 7：课程中的神经纹理训练基准。在 RTX 3090 和 RTX 5090 上，Cooperative Vector 相比已优化的非 Cooperative Vector 实现获得超过 3 倍加速。来源：课程幻灯片第 174 页。

这里要注意数据范围。图 7 测试的是输入为 100MB PNG 的**神经纹理训练**，不是本文陶瓷神经材质的端到端渲染时间。它证明 Cooperative Vector 能显著加速同类小网络训练，不能据此声称神经材质比传统 PBR 快 3 倍。

目前课程的完整 neural/ 示例要求 Windows 或 Linux、NVIDIA GPU 和 Vulkan Cooperative Vector。标量 MLP、部分 SlangPy 示例与 UTracer 可以在 Metal 上运行，但 macOS 路径不支持 Cooperative Vector。硬件和 API 覆盖仍然是落地时必须考虑的条件。

## 八个示例实际在逐步解决什么

课程代码把神经材质拆成八步，顺序很有参考价值：

|步骤|加入的内容|解决的问题|
|---|---|---|
|1|潜变量纹理 + Decoder|建立最小可训练材质|
|2|Rusinkiewicz 方向采样|减少训练样本过度集中在平淡方向|
|3|半程/差分方向参数化|把 BRDF 的方向结构显式交给网络|
|4|调整输出[激活函数](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E6%BF%80%E6%B4%BB%E5%87%BD%E6%95%B0&zhida_source=entity)|适应 BSDF 的高动态范围|
|5|颜色增强|改善训练初期的通道学习|
|6|可学习 Shading Frame|表达法线与局部方向变化|
|7|Material Encoder|让相似纹素共享知识，缓解高分辨率训练|
|8|多实例训练与裁汰|降低小网络陷入较差局部最优的概率|

最后一步从 64 组随机初始化开始，依次保留 16、4、1 个网络，同时把 Batch 从 8×8 提高到 64×64。课程幻灯片估算，提前淘汰较差网络可把朴素的 64 倍训练成本降到约 21 倍。示例为了便于阅读，由 Python 逐个提交网络训练，并不是高性能的多实例实现。

## 它距离通用材质替代方案还有多远

课程很适合说明神经材质的构造方式，但不能把教学结果直接当成完整产品方案。

首先，示例主要学习 eval(uv, wi, wo)。路径追踪中的材质通常还要提供 sample() 和 pdf()，让渲染器有效抽样狭窄高光。配套 UTracer 对神经材质使用余弦半球采样，再用网络求值；对于高光材质，这不是高效的重要性采样方案。

其次，网络输出没有显式保证[能量守恒](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E8%83%BD%E9%87%8F%E5%AE%88%E6%81%92&zhida_source=entity)、互易性或所有方向上的稳定性。[训练集](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E8%AE%AD%E7%BB%83%E9%9B%86&zhida_source=entity)覆盖不足时，画面上没出现问题不代表未观察方向也符合物理约束。

课程也没有给出这套陶瓷材质的完整显存占用、压缩率、单次求值耗时和传统材质对照。图像结果能说明方法可行，尚不足以判断它在哪个复杂度点一定比普通 PBR 更划算。

从工程角度看，神经材质更可能先用于以下情况：

-   原材质是昂贵的程序化或分层模型，难以直接实时求值；
-   大量相关贴图之间存在冗余，潜变量与共享 Decoder 有机会减少带宽；
-   材质允许离线训练和烘焙，运行时只需要固定的小网络；
-   目标平台具备合适的矩阵[计算能力](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=%E8%AE%A1%E7%AE%97%E8%83%BD%E5%8A%9B&zhida_source=entity)和 Shader 接口。

对于一张 Base Color、一张 Normal 和少量标量就能表达清楚的材质，引入训练、网络权重、专用硬件路径和误差控制未必值得。

## 这门课程给出的技术脉络

神经材质的重点不在“用 AI 替换 Shader”，而在重新划分数据与计算：潜变量纹理保存局部差异，小型 Decoder 保存全材质共享的方向响应规律，传统图形代码继续处理坐标系、过滤和已知的物理关系。

课程中最有效的改进——Rusinkiewicz 参数化、Shading Frame Encoding、Material Encoder——都来自对渲染问题的拆解，而不是单纯扩大网络。Cooperative Vector 和 [Slang 自动微分](https://zhida.zhihu.com/search?content_id=280284986&content_type=Article&match_order=1&q=Slang+%E8%87%AA%E5%8A%A8%E5%BE%AE%E5%88%86&zhida_source=entity)则补齐了执行与训练工具，使这些小网络能够直接进入图形管线。

它展示了一种可信的技术方向，也保留了足够多的未完成部分。下一步若要成为通用运行时材质系统，还需要更好的重要性采样、物理约束、量化与过滤方案，以及跨硬件的稳定性能数据。

参考资料

1\. \[Slang at SIGGRAPH 2026：课程介绍与资料入口\]([https://shader-slang.org/landing/siggraph-26/](https://link.zhihu.com/?target=https%3A//shader-slang.org/landing/siggraph-26/))。

2\. \[Neural Shading SIGGRAPH 2026 官方课程仓库\]([https://github.com/shader-slang/neural-shading-s26](https://link.zhihu.com/?target=https%3A//github.com/shader-slang/neural-shading-s26))。

3\. \[完整课程幻灯片\]([https://github.com/shader-slang/neural-shading-s26/blob/main/slides/Neural\_Shading\_Course\_Slides\_2026.pdf](https://link.zhihu.com/?target=https%3A//github.com/shader-slang/neural-shading-s26/blob/main/slides/Neural_Shading_Course_Slides_2026.pdf))。

4\. \[八个神经材质递进示例\]([https://github.com/shader-slang/neural-shading-s26/tree/main/neural](https://link.zhihu.com/?target=https%3A//github.com/shader-slang/neural-shading-s26/tree/main/neural))。

5\. \[Slang 自动微分文档\]([https://shader-slang.org/slang/user-guide/autodiff](https://link.zhihu.com/?target=https%3A//shader-slang.org/slang/user-guide/autodiff))。

6\. \[Vulkan \`VK\_NV\_cooperative\_vector\` 设计说明\]([https://docs.vulkan.org/features/latest/features/proposals/VK\_NV\_cooperative\_vector.html](https://link.zhihu.com/?target=https%3A//docs.vulkan.org/features/latest/features/proposals/VK_NV_cooperative_vector.html))。

7\. \[NVIDIA RTX Neural Shading SDK\]([https://github.com/NVIDIA-RTX/RTXNS](https://link.zhihu.com/?target=https%3A//github.com/NVIDIA-RTX/RTXNS))。

8\. \[课程仓库第三方素材说明\]([https://github.com/shader-slang/neural-shading-s26/blob/main/THIRD\_PARTY\_NOTICES.md](https://link.zhihu.com/?target=https%3A//github.com/shader-slang/neural-shading-s26/blob/main/THIRD_PARTY_NOTICES.md))。