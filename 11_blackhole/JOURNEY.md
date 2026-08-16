# JOURNEY — 11_blackhole（Kerr 旋转黑洞）

> 本文回答一个问题：**这个黑洞可视化从一句立项到一张能上网晒的图，你和我各自做了什么、走了哪条路。**
> 读者：你（+ 未来 agent onboarding）。这不是设计 doc（那是 `GDD.md`）、也不是验证稿（那是 `verification-report.md`）——这是**协作时间线**：左列 = 你说的话 / 拍板的决定，右列 = Claude 落地的动作。
> 全旅程 4 个 commit、6 个阶段：从「物理正确」一路走到「视觉网红」。

---

## 0. 一句话

一个基于 **Kerr 测地线逐像素光线追踪**的旋转黑洞可视化：从史瓦西起步，做到「数值精度 + 光子环」的物理正确，再被一句「离网红差很远」拉回，最终调成 Interstellar「Gargantua」式的**近贴盘面 + 白热内缘 + 强辉光光子环**，最后用蓝噪声抖动把 8-bit 色带磨平。五个 commit：`2d12180` → `397d191` → `a221e5a` → `f42ae3c` → `e01c1c2`。

---

## 1. 时间线（两列：你 / Claude）

| 阶段 | 你（User） | Claude |
|---|---|---|
| **A · 史瓦西起步** | 立项：做一个基于逐像素测地线光线追踪的黑洞引力透镜实时可视化（史瓦西起步）。 | 搭 Schwarzschild 版：RK4 逐像素积分、影子 / 爱因斯坦环**自然涌现**（非贴图）、程序化星空、`HalfFloat → UnrealBloom → OutputPass(ACES + sRGB)` 后处理、C.A.T 分层（core 纯净 / engine 适配 / components 覆盖）、`window.__blackhole` 物理探针 + smoke 门。→ commit `2d12180` |
| **B · Kerr 化** | 推进：要旋转黑洞——自旋 â、帧拖拽。 | 升级 Kerr：Carter 分离测地线、守恒量 (λ, η)、ZAMO 反变四元组种子、Δ 因式分解 `(r−r₊)(r−r₋)` 防 float32 相消、BPT ISCO、D 形影子、顺行开普勒盘、多普勒 + 引力红移 `g = 1/[u^t(1−Ωλ)]`、帧拖拽左右不对称。→ commit `397d191` |
| **C · 数值精度 + 光子环** | 「exec no question ask」+「plan long phase work all day」——授权长时间自主推进「数值精度 + 光子环」阶段。 | Mino 时间 `dτ = Σ dλ` 去除 1/Σ 刚性 + DOPRI5(4) 7 级嵌入对 + PI 步长控制（rtol 1e-8 / atol 1e-12）；俘获边界守恒 λ 精确命中 `b_crit = 2.5981`（**0.00% 误差**，修正早前「1.3% 偏低」的几何假象）；光子环子像 index 0→3、半径向光子球收敛（0.677 → 0.663）；CPU/GPU 一致性 IoU 0.82；新增 `scripts/kerr-adaptive-validate.ts`。→ commit `a221e5a` |
| **D · 最佳画质渲染** | 「ok now use whatevery best quality/performance option to render a image for me」 | 写 `scripts/render-image.mjs`（4K + hardware→swiftshader 降级），渲染 `render/blackhole-4k.png`。 |
| **D′ · 视觉纠偏** | 「that is quite far away from what is popular from the internest / search for reference implementations using swarm agents」——指出 4K 图不像网红黑洞。 | 跑 swarm（Workflow 8 agents）调研 Interstellar「Gargantua」/ EHT M87 参考实现 → 产出 7 问题 12 改动的 spec → 逐条落地（见 §2）→ 重渲染 + QA 全绿。→ commit `f42ae3c` |
| **E · 旅程归档** | 「write a JOURNEY.md that fully describe what we did through timeline one col being me another is your」 | 写这份 JOURNEY.md（本文件）。 |
| **F · 去色带** | 「can you see the banding there … the banding is not acceptable」——指出 4K 图有可见色带。 | 定位为 **8-bit 色调分层**：平滑 HDR 辉光流经 `HalfFloat → UnrealBloom → OutputPass(ACES+sRGB)`，只在最终 canvas 写入时才量化到 8-bit，且无抖动 → 每个灰阶持续几十上百像素 = 可见色带。在 OutputPass 后加蓝噪声 dither（±0.5 LSB IGN，RGB 同偏移保色相）→ A/B 实测（同参数）：可见色带（≥20px 平坦游程）降 **3.5×**、≥50px 降 **4×**；离线渲染步数 256→512。→ commit `e01c1c2` |

---

## 2. 视觉纠偏到底改了什么（D′ 阶段 12 处）

> 这是「物理正确 ≠ 视觉网红」的关键一课：Phase C 的图在物理上全对（俘获边界 0.00% 误差），但看起来「离网红差很远」——原因是**美学参数全错**，不是物理错。

| # | 问题（swarm spec 诊断） | 改动 | 落点 |
|---|---|---|---|
| 1 | 黑体近似在 40000 K 产生青色伪影 | Tanner-Helland 黑体拟合（1000–40000 K：深红 → 暖白 → 蓝白） | GLSL `blackbody()` + `core/physics/blackbody.ts` |
| 2 | 零扭矩内缘让 ISCO 反而变暗 | 去掉 `(1−√(isco/r))` 因子 → 内缘最热最亮（白热内缘 → 红外缘） | GLSL `sampleDiskKerr` + `kerrDiskEmissivity`/`kerrDiskTemperature` |
| 3 | 相机太俯视（9°），盘是斜的 | 近贴盘面 tilt 0.16→0.05 rad（≈2.9°）→ 远侧盘透镜成竖直爱因斯坦环 | `CAMERA_TILT_DEFAULT` |
| 4 | 默认自旋 0（无帧拖拽特征） | 默认自旋 0→0.9 | `SPIN_DEFAULT` |
| 5 | 盘太散（外径 24） | 盘外径 24→10 | `DISK_OUTER_DEFAULT` |
| 6 | 盘太透（50%） | 盘不透明度 ~90%（`trans *= 0.1`） | GLSL |
| 7 | 光子环太糊（风数上限 8） | 光子壳风数 8→32 → 更锐利的光子环 | GLSL + `kerrTracePhoton` |
| 8 | 辉光太弱 / 阈值太高 | bloom radius 0.25→0.55、threshold 0.4→0.1、strength 0.4→1.2 | `SceneManager` + `DEFAULT_PARAMS` |
| 9 | 盘温 9000 K 偏蓝、亮度偏暗 | diskTempK 9000→5500、diskBrightness 1.0→1.5 | `DEFAULT_PARAMS` |
| 10 | 曝光 / 步数 / 星空不足 | exposure 1.05→1.15、steps 128→160、starDensity 0.6→0.8 | `DEFAULT_PARAMS` |
| 11 | 俯仰下限太宽 | `CAMERA_POLAR_MIN` 0.06→0.02 | `constants.ts` |
| 12 | 渲染脚本仍用旧参数 | `scripts/render-image.mjs` 覆盖参数对齐新 spec | `scripts/render-image.mjs` |

---

## 3. 成果快照（当前状态）

- **交付物**：`render/blackhole-4k.png`（3840×2160，avg luma ≈ 21.8）——暗 D 形影子 + 顶部透镜环 + 白热内缘褪成红 + 多普勒左右不对称。
- **物理锚点**（`verification-report.md`，全命中）：视界 r₊/₋、BPT ISCO、开普勒 Ω、u^t、俘获边界 `b_crit = 2.5981`（0.00%）、D 形影子轮廓。
- **验证门**（复跑即复核）：`npm run typecheck`（tsc 0 error）→ `npm run build`（vite）→ `node smoke/verify.mjs`（SMOKE PASS：物理 8 项 + CPU/GPU 一致性 IoU 0.77 + 渲染非空/有对比）。
- **工程骨架**：C.A.T 分层；GLSL 与 CPU 参考同构（GPU 逐像素渲染 / CPU 高精度校验，互为 parity 参考）。

---

*整理：Claude（执行）· 事实来源 = git log（5 commit）+ `GDD.md` + `verification-report.md` + 两轮会话记录 · 版本 v1（2026-08-16）*
