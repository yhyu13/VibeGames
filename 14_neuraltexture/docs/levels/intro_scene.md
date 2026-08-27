# Intro scene plan — 14_neuraltexture

12 章节。单一事实源。

## 1. 一句话 + Why

浏览器里证明：潜变量纹理 + 共享小 MLP 能近似 `BRDF(uv, ωi, ωo)`。课程原路径（Slang + CoopVec + 4K MDL）进不了 WebGPU；intro 用 GGX teacher + 标量 MLP 说同一句话。

## 2. 范围（冻结）

见 `GDD.md` 范围表。Q1=A 砍 CoopVec/MDL/4K；Q2=A 12 章；Q3=A 无限 polish，用户说停。

## 3. Scene 规格

- 世界：三球，x = {−2.15, 0, +2.15}，半径 0.72
- 相机：(0, 1.15, 5.4) lookAt 原点，FOV 42°
- 灯：r=2.4、y=1.6 的圆轨道，ω = 0.35 rad/s
- 材质：`materialAt(uv)` 夜釉金缮
- 视口语义：左 teacher / 中 neural / 右 |error|×8（由 `worldPos.x` 分档，同一 shader）

## 4. 美术资产清单

见 `docs/design/01-art-direction.md` 4 tier。全部程序化。

## 5. 程序实现（P0–P7）

| 阶段 | 目标 | 验收 |
|---|---|---|
| P0 | core 数学 + vitest | teacher 地平线=0，零权 decode=1 |
| P1 | Adam 短训 loss 下降 | 40 step < 初值 |
| P2 | `npm run bake` 写 baked.ts | val L1 有限 |
| P3 | WebGPU 三球 + 轨道灯 | 页面出图 |
| P4 | latent atlas + HUD | 8 条带可见 |
| P5 | CPU/GPU 公式对齐 | `__neural.evalNeural` 可调用 |
| P6 | ACES / fog / 基座 | 夜工作室 |
| P7 | tsc + test + build + Playwright | 门禁全绿 |

## 6. 验证门

```
cd 14_neuraltexture
npm run typecheck
npm run test
npm run build
# Playwright: 三球 + window.__neural + 0 GPU error
```

## 7. 「完美」定义

- **视觉**：8 秒内金线高光在左右球对齐；误差球以黑为主
- **手感**：拖相机灯光仍跟；无需说明书
- **性能**：独显 ≥ 60 fps @ 1080p；集成 ≥ 30
- **可重玩**：bake 可复现（seed=1）；无 console error

## 8. 已知冲突 + 决策

| 冲突 | 决策 |
|---|---|
| 课程 4096² vs 浏览器显存 | 64² |
| 课程 MDL ceramic vs 无 MDL | GGX 同构 teacher |
| 幻灯片 4-D latent vs 仓库 8-D | **8-D**（仓库合同） |
| NTC vs neural appearance | 只做 appearance |
| `wgslFn` 要 `fn compute(` | 入口名为 compute；helpers 走 `wgsl()` include，kernel 字符串只留一个 `fn` |

## 9. 顺序与节奏

P0–P7 一次做完。polish loop：截图 → 看高光 → 若糊则加步数/改采样，不改架构。

## 10. Polish loop

观察三球 → 金线是否糊 / 粘土是否偏色 / 误差是否闪 → 改 core 公式（同步 WGSL）→ bake → 再看。

## 11. 文件产出

新建：本目录全部 Vite/C.A.T 文件。保留：知乎原文作研究附件。仓库外：`references/neural-shading/research.md`。

## 12. 状态

| 阶段 | 状态 |
|---|---|
| 研究 | ✅ |
| P0–P7 | ✅ |
| polish | 🕐 人工看高光 |
