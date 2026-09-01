# GDD — DDGI 动态漫反射全局光照渲染演示

> **角色**：设计权威文档（design authority）。回答「这个 demo 是什么、为什么这样做、做/不做哪些」。
> **生成方式**：反推（reverse-documentation）自 `AGENTS.md`、`JOURNEY.md`、`verification-report.md`、`renderdoc-ddgi-debug-report.md` 与 `src/` 实际代码。所有数值/契约以 `TDD.md` 为准，本文不重复定义数字。

---

## 1. 这是什么

`12_ddgi` 是一个 **DDGI（Dynamic Diffuse Global Illumination，动态漫反射全局光照）探针系统的独立 WebGPU 工程**。

- **技术栈**：three.js `r185` + WebGPU + TSL（three shading language），构建于 `three-mesh-bvh/webgpu`。
- **形态**：Vite 6 + TypeScript strict + vitest，零运行时资源（无贴图/模型文件，场景全部用代码构造）。
- **端口**：`5189`（strictPort，避免与 11_blackhole 的 5188 冲突）。
- **里程碑**：M1（纯数学 core + 黄金向量单测）→ M2（WebGPU trace/blend/border + 探针场）→ M3（着色期查询，GI 真正照到表面上）已落地。JOURNEY 记录 M3 之后 bounce 与 border-wrap 尚未开工。

---

## 2. 核心技术手段

DDGI 是探针式动态 GI，非实时路径追踪的暴力采样。本工程的关键手段：

1. **探针体积（Probe Volume）**：一个轴对齐的探针网格覆盖场景（demo 为 `5×3×5 = 75` 个探针，间距约 1.5 米）。每个探针是一个「虚拟摄影机」，记录其所在位置的入射辐照度场。
2. **逐探针逐帧光线追踪**：每探针每帧向场景发射 `256` 条射线（球面 Fibonacci 低差异方向 + 每帧四元数旋转做时间抖动），用 BVH（`three-mesh-bvh/webgpu`）求交，得到辐射度与遮挡距离。
3. **八面体图集（Octahedral Atlas）**：把每个探针的半球辐照度/深度场参数化到一张方形纹理（Cigolle et al. 2014），避免立方体图接缝。
4. **时间滞后（Hysteresis / EMA）**：辐照度在 gamma 编码空间做指数移动平均，带阈值触发的历史丢弃与脉冲钳制（忠实 RTXGI 原公式）。
5. **着色期查询（M3）**：材质对表面点做 surface bias → 三线性取周围 8 探针 → wrap-shading 加权 → Chebyshev 可见性拒绝 → 八面体双线性采样 → gamma 解码 → ×2π，得到该点的间接辐照度。

**场景**：Cornell 盒 + 自发光暖色卡片（DDGI 唯一光源，经 BVH transform 缓冲注入 emissive）+ 厚墙（漏光测试）+ 探针 gizmo + 屏幕四角八面体辐照度图集叠层。材质为自定义 lambert 节点材质：`color = albedo × (direct N·L + DDGI indirect)`，three 的三盏内置灯已移除。

---

## 3. 目标（Goals）

- **做一份「能跑、能验证、能提交」的 DDGI 探针系统独立工程**，作为 `references/ddgi/research.md` 调研文档的可运行消费者（§10.0 门：demo 场景即 v1 消费者）。
- **CPU/GPU 数值一致**：射线方向集由纯数学 core 在 CPU 生成上传，GPU kernel 只消费；常量单一来源，WGSL 只做 `${}` 插值。核心铁律。
- **验证漏光被阻断**：厚墙后探针全暗（`hitFrac=1` 但非自发光 → 0 辐射），探针层证伪厚墙漏光。
- **把 GI 真正照到表面（M3）**：不只算出探针场，而是通过自定义 lambert 材质把间接辐照度接到材质上。
- **黄金向量单测**：core 纯数学有 50 条手算黄金向量测试（曾抓到 3 处作者自身的期望错误）。

## 4. 非目标（Non-Goals，当前明确不做/未做）

- **间接反弹项**：trace 只取 emissive，未做「探针采样探针」的无限反弹（M3/M4）。
- **border 正确 wrap**：当前是 same-edge clamp；八面体映射要求折叠到对侧边缘（opposite-edge），`borderKernel.ts` 留了 NOTE，M3+ 修。
- **WebGL2 回退**：baked `LightProbeGrid` 未实现。
- **Relocation / Classification kernel（M4）**：探针再定位/分类未实现。
- 作为「正式可发布游戏」的 art-bible / ux / release 阶段不在本工程范围内（这是技术渲染演示，非完整产品）。

---

## 5. 分层架构（C.A.T）

- `src/core/`：纯数学，**禁止 import THREE/WebGPU/DOM**。`octahedral`、`fibonacci`（Arvo 四元数旋转）、`probeGrid`、`chebyshev`、`hysteresis`、`moments`、`constants`、`vec3`。
- `src/engine/`：WebGPU 适配器。`DdgiSystem`（编排）、`DdgiProbeVolume`（探针体积）、`DdgiBvh`（BVH 子类 + emissive 注入）、`DdgiMaterialNode`（着色期查询）、`ProbeDebug`（gizmo）。
- `src/engine/wgsl/`：WGSL 辅助函数。
- 已知限制（`AGENTS.md` 明确记录）：间接反弹、border wrap、WebGL2 回退均未做。

---

## 6. 设计依据 / 参考

设计源头是 `references/ddgi/research.md`（§2 探针体积、§3 八面体、§4 球面 Fibonacci、§5 混合累加、§6 着色期查询 + Chebyshev、§7 滞后）与 `implementation-plan.md`。参数表冻结于 `src/core/constants.ts`（源自 RTXGI 默认值，research §12）。
