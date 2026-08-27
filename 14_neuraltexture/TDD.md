# TDD — 技术设计 (14_neuraltexture)

## 架构（C.A.T）

```
src/
  core/                 # 零 THREE / DOM
    types.ts            # Vec3, Latent8, DecoderInput, MlpWeights
    constants.ts        # 8 / 64 / 14→32→32→3 / 1635 params / Adam
    vec3.ts
    material.ts         # 夜釉金缮 SVBRDF + 固定 8-D encoder
    ggx.ts              # Cook-Torrance teacher（含 n·l）
    rusinkiewicz.ts     # half/diff + 训练采样
    mlp.ts              # 前向 + L1 反传
    train.ts            # Adam + cosine LR
    mlp.test.ts
  engine/
    baked.ts            # scripts/bake.ts 生成
    NeuralMaterial.ts   # TSL wgslFn 片段 MLP
    SceneManager.ts     # WebGPURenderer + 3 球
    devtools.ts         # window.__neural
  main.ts
scripts/bake.ts
```

## 关键决策

1. **Teacher 是 GGX，不是 MDL ceramic。** 课程 teacher 需要 Slang MDL runtime；浏览器里用同一套 WGSL/TS 公式，才能做 A/B。
2. **Encoder 固定打包，不训练。** 潜变量 = `(albedo.rgb, roughness, metallic, albedo.r*metallic, 1-roughness, clayish)`。Decoder 学方向响应。这比直接优化 64²×8 纹素快一个数量级，且 atlas 仍然「不可读」。
3. **输出激活 = exp。** 与 course steps 01–03 一致。Teacher 的 `f·n·l` 对单灯通常 < 10；`min(x,12)` 防 overflow。
4. **权重行主序，行 = 输出神经元。** `W0[r, c] = data[r * 14 + c]`。WGSL 必须同序。
5. **不在页面训练。** 8000 × 256 在 Node 里跑完写入 `baked.ts`。

## 数值表

| 符号 | 值 |
|---|---|
| latent | 64 × 64 × 8 fp32 |
| decoder | 14→32→32→3, leaky ReLU 0.01, exp |
| params | 1635 |
| Adam | β1=0.9 β2=0.999 ε=1e-8 |
| LR | cosine 1e-3 → 1e-5 / 8000 steps / batch 256 |
| 训练采样 | uniform Rusinkiewicz, reject n·l 或 n·v ≤ 1e-3 |
| 损失 | 均值 L1(rgb, teacher) |

## 验证锚点

- `evalTeacher` 在地平线下 = `[0,0,0]`。
- 镜面釉的对镜峰值 > 粘土岛。
- 零权重 decode = `exp(0) = 1`。
- `window.__neural.evalNeural(uv, wi, wo)` 与 CPU `decode` 同输入应对齐（fp32 舍入内）。
- bake 后 val L1 应明显低于 Xavier 初值（经验：< 0.08 对 intro 足够「像」）。

## 性能

- 每像素 ≈ 1568 MAC + 8 通道双线性。集成 GPU 1080p 目标 ≥ 30 fps，独显 ≥ 60。
- DPR cap 2。ACES 1.0, exposure 0.85。

## 构建门禁

- `tsc --noEmit`（strict + noUnusedLocals + noUnusedParameters）
- `vitest run`
- `vite build`
- Playwright：三球可见、零 GPU error、`window.__neural` 存在
