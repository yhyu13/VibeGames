# TDD — DDGI 数值与契约权威文档

> **角色**：数值 + 契约权威（number & contract authority）。「确切的数字与签名是什么」。
> **生成方式**：反推自 `src/`（`constants.ts`、`DdgiSystem.ts`、`DdgiProbeVolume.ts`、`DdgiBvh.ts`、`main.ts`）与运行时报告。**只记录已在源码/报告中读到的内容**；无法独立核实的项标 `[待确认]`。
> **版本**：本文档 HEAD 与 `AGENTS.md` 同源。数字唯一来源：本文档 + `src/core/constants.ts`（冻结参数表）。

---

## 1. 冻结参数表（Frozen parameter table）

来源：`src/core/constants.ts`（源自 RTXGI 默认值，research §12）。此表与 GPU kernel 1:1 镜像。

| 常量 | 值 | 说明 |
|---|---|---|
| `PROBE_NUM_RAYS` | `256` | 每探针每帧射线数 |
| `PROBE_IRRADIANCE_INTERIOR_TEXELS` | `6` | 辐照度图集 interior 尺寸 → 含 1-texel border 为 8×8 |
| `PROBE_DISTANCE_INTERIOR_TEXELS` | `16` | 距离图集 interior 尺寸 → 含 1-texel border 为 18×18 |
| `PROBE_HYSTERESIS` | `0.97` | EMA 滞后系数 |
| `PROBE_DISTANCE_EXPONENT` | `50` | 距离权重 cos^50 |
| `PROBE_ENCODING_GAMMA` | `5` | 存储 gamma（`γ`），编码 `pow(v, 1/γ)`，解码 `pow(v, γ·0.5)` |
| `PROBE_IRRADIANCE_THRESHOLD` | `0.25` | 辐照度大变化阈值（触发历史丢弃） |
| `PROBE_BRIGHTNESS_THRESHOLD` | `0.1` | 亮度脉冲钳制阈值 |
| `PROBE_RANDOM_BACKFACE_THRESHOLD` | `0.1` | 随机射线 backface 阈值 |
| `PROBE_FIXED_BACKFACE_THRESHOLD` | `0.25` | 固定射线 backface 阈值 |
| `PROBE_VIEW_BIAS` | `0.1` | 视图 bias（world units，与缩放相关） |
| `PROBE_NORMAL_BIAS` | `0.1` | 法线 bias（world units，与缩放相关） |
| `PROBE_MIN_FRONTFACE_DISTANCE` | `1.0` | 最小 frontface 距离（world units） |
| `PROBE_MAX_RAY_DISTANCE_FACTOR` | `1.5` | 最大射线距离 = `× length(spacing)` |
| `NUM_FIXED_RAYS` | `32` | relocation/classification 固定射线子集 |
| `CHEBYSHEV_MIN_WEIGHT` | `0.05` | Chebyshev 权重下限（回退永不为 0） |
| `CHEBYSHEV_CRUSH_THRESHOLD` | `0.2` | 小权重塑形阈值 |
| `WRAP_SHADING_FLOOR` | `0.2` | wrap-shading 权重下限（永不 → 0） |

## 2. 派生常量（Derived，src 内定义）

| 派生量 | 值/公式 | 来源 |
|---|---|---|
| `IRRADIANCE_TILE` | `6 + 2 = 8` | `DdgiProbeVolume.ts`：interior + 1-texel border |
| `DISTANCE_TILE` | `16 + 2 = 18` | `DdgiProbeVolume.ts`：interior + 1-texel border |
| `workgroupSize` | `(64, 1, 1)` | `DdgiProbeVolume.ts:48` |
| blend dispatch | `ceil( numProbes × (8² + 18²) / 64 )` | `DdgiProbeVolume.ts:140` |
| BVH transform 结构 | 40-float stride（注入 emissive 扩展） | `DdgiBvh.ts` |

## 3. 场景配置（`src/main.ts`）

| 项 | 值 |
|---|---|
| `probeCounts` | `[5, 3, 5]` → **75 探针** |
| `probeSpacing` | `[1.5, 1.3, 1.5]`（world units） |
| `origin` | `[0, 1.2, 0]` |
| 自发光卡片 emissive | `THREE.Color(5, 1.5, 0.5)`（线性，暖色） |
| 渲染器 | WebGPU, ACESFilmicToneMapping, exposure 1.0, pixelRatio `min(dpr, 2)` |
| 相机 | PerspectiveCamera(60, aspect, 0.1, 100)，pos `(0.6,1.6,3.4)`，lookAt `(0,1,-0.6)` |

**最大射线距离**（可推导）：`length(spacing) = √(1.5²+1.3²+1.5²) ≈ 2.488`，× `PROBE_MAX_RAY_DISTANCE_FACTOR 1.5` ≈ **3.73**。与 `renderdoc-ddgi-debug-report.md` 运行时 `maxRayDistance≈3.73` 一致 ✓。

## 4. 关键类型与签名（Contracts）

### `core/constants.ts`
```ts
export interface DdgiVolumeConfig {
  origin: Vec3                     // 体积中心世界坐标
  probeSpacing: Vec3               // 各轴探针间距
  probeCounts: Vec3                // 各轴探针数（≥1 整数）
  probeNumRays?: number            // 每探针射线数（默认 PROBE_NUM_RAYS）
  numFixedRays?: number            // 固定射线数（默认 NUM_FIXED_RAYS）
}
export function defaultProbeNumRays(cfg): number
export function defaultNumFixedRays(cfg): number
```

### `core/probeGrid.ts`
```ts
probeGridShift(spacing: Vec3, counts: Vec3): Vec3
probeWorldPosition(cfg: DdgiVolumeConfig, coords: Vec3): Vec3
gridCoordsOf(cfg: DdgiVolumeConfig, x: Vec3): Vec3
trilinearWeights(cfg: DdgiVolumeConfig, x: Vec3): TrilinearResult   // 8 probes + 权重
wrapShadingWeight(x, probePos, surfaceNormal: Vec3): number         // w² + FLOOR
biasedQueryPosition(x, surfaceNormal, cameraDirection, normalBias, viewBias): Vec3
probeMaxRayDistance(cfg): number                                    // ‖spacing‖ × FACTOR
```

### `core/chebyshev.ts`
```ts
chebyshevBound(mean, meanSq, distToProbe): number   // σ²/(σ²+v²)，dist≤mean 时=1
chebyshevWeight(mean, meanSq, distToProbe, minWeight=0.05, crushThreshold=0.2): number
```

### `core/hysteresis.ts`
```ts
luminance(v: Vec3): number                // BT.709: 0.2126r+0.7152g+0.0722b
encodeGamma(v, gamma=5): Vec3             // pow(v, 1/γ)
decodeGamma(v, gamma=5): Vec3             // pow(v, γ·0.5)
blendRadiance(newRadiance, history: Vec3, p: HysteresisParams = {}): Vec3
distanceHysteresis(historyMean, historyMeanSq, hysteresis=0.97): number
blendDistance(newDistance, history: number, hysteresis=0.97): number
```
`blendRadiance` 内部阈值行为（已读源码确认）：`history` 为零 → **`h=0` 且跳过脉冲钳制**，即这一帧写入的就是测量值本身；否则 LARGE change（`maxComponent(sub(history,result)) > irradianceThreshold`）→ `h = max(0, h−0.75)`，脉冲钳制 `luminance(delta) > brightnessThreshold → delta × 0.25`。

零历史跳过钳制是必须的：零历史是**没有历史**，没有「累积帧」需要被冲量保护。两条分支若都生效，`h=0` 声明本次写入是测量值、钳制却只留 1/4，于是首次写入只推进 `(1−h) × 0.25 = 0.75%`（而非 3%）。`kernels/blendKernels.ts` 的 irradiance 内核用 `!histZero` 守住这条，`constant-parity.test.ts` 逐字校验。

钳制只是「图集升温」的**两个节流阀之一**，实测效果因此是部分的：`DdgiProbeVolume.update()` 每帧重新随机化全部光线，于是每一帧都是新样本，图集以 `(1−h)`/帧 对它们求平均——第二个节流阀不受本修复影响。在最吃 GI 的区域上各测三次：恢复到「距稳定值 5 个亮度单位以内」由 4024/4113/4291 ms 变为 3030/3050/3080 ms，而**凹陷深度不变**（约 14.2 单位）。即本修复只买到重建后洗白时间的大约四分之一，其余来自 EMA 的节奏。一旦某 texel 有了任何历史，钳制照常生效——那才是它被写出来要处理的场景。

`distanceHysteresis` 是 distance 分支的「零历史」策略：两个原始矩（mean、meanSq）都为零 → 返回 `0`，否则返回调用方给的 `hysteresis`。零历史是**没有历史**，不是「距离为零的测量」——与 `blendRadiance` 对零辐照历史的读法一致。缺少这一条时两侧不对称：重建后辐照图集一帧内贴上真值，距离图集却以 `hysteresis`/帧 从零爬升（0.97 → 约 220 帧），期间 `chebyshevBound` 对每个 probe 都为 0（方差为 0，且任何表面都比「均值 0」更远），全部 probe 被压到 `minWeight` 下限，GI 随之消失。`kernels/blendKernels.ts` 的 distance 内核用同一条件、同一个 `h` 写这两个矩（`constant-parity.test.ts` 逐字校验两处一致）。

### `core/moments.ts`
```ts
normalizeIrradiance(sum: Vec3, weightSum: number, epsilon=1e-6): Vec3   // ÷(2·Σcosθ)
accumulateDistanceMoments(samples: DistanceSample[], opts): DistanceMoments  // pow(cos,50)，÷2·Σw
```
**注意**：距离归一化使用 `2·Σw`（`renderdoc-ddgi-debug-report.md §4.4` 标记为「疑似问题」，RTXGI 原论文惯例是 `÷Σw`；CPU/GPU 当前保持一致，query 端 ×2 补偿）`[待确认]`。

### `core/octahedral.ts`
```ts
signNotZero(x): number
octEncode(direction: Vec3): [number, number]
octDecode(uv: [number, number]): Vec3
octNormalizedCoords(threadCoords, interiorTexels): [number, number]
```

### `core/fibonacci.ts`
```ts
sphericalFibonacci(i: number, n: number): Vec3
randomUnitQuaternion(rng: () => number): [x,y,z,w]
rotateByQuaternion(dir: Vec3, q): Vec3
frameRaySet(numRays, numFixed, rng): { rotated: Vec3[]; fixed: Vec3[] }
averageCosine(dir: Vec3, rays: Vec3[]): number
```

### `engine/DdgiSystem.ts`
```ts
export interface DdgiSystemOptions {
  config: DdgiVolumeConfig
  objects: THREE.Object3D[]                 // 参与 BVH 的网格（需已入场景）
  emissive?: Map<THREE.Object3D, THREE.Color>
  debugProbes?: boolean
  volume?: DdgiProbeVolume                  // 预建体积（M3 查询节点需在网格之前）
}
readonly bvh: DdgiBvh
readonly volume: DdgiProbeVolume
readonly debug: ProbeDebug | null
update(): void                              // 每帧：updateTransforms → volume.update → debug.tick
readProbeSummary(): Promise<Float32Array>   // numProbes×4: (avgL,avgL,avgL,hitFraction)
```
`readProbeSummary` 的 hit 判定当前为 `src[o+3] < 1e20`（`DdgiSystem.ts:76`）——**已确认 BUG**：会把 backface 的负距离也算作命中（`renderdoc-ddgi-debug-report.md §4.2`，P1，未修）。窗口钩子 `window.__ddgi = { config, readProbeSummary }`。

### `engine/DdgiProbeVolume.ts`
```ts
readonly config / numProbes / numRays / numFixedRays / probesPerRow / maxRayDistance
readonly irradianceInterior=6 / irradianceTile=8 / distanceInterior=16 / distanceTile=18
readonly workgroupSize = Vector3(64,1,1)
constructor(config: DdgiVolumeConfig)
build(): void
attach(bvh: DdgiBvh): void
update(renderer: WebGPURenderer): void
probeWorldPositions(): Vec3[]
```

### `engine/DdgiBvh.ts`
```ts
extends BVH 基类（three-mesh-bvh/webgpu）
setEmissive(object: THREE.Object3D, color: THREE.Color): this
update(): void          // 基类覆写前先换用 40-float stride 扩展 transform 结构
updateTransforms(): void
```
`DdgiBvh` 把每个物体的 `emissive: vec3f` 注入 transform 缓冲的 `EMISSIVE_SLOT`（40-float stride），即 DDGI 可见的光源。

### `engine/DdgiMaterialNode.ts`
```ts
export interface DdgiQuery { ... }                       // 着色期查询节点
export function buildDdgiQuery(volume: DdgiProbeVolume): DdgiQuery
```
查询链（verification-report §M3）：surface bias → 三线性 8 探针 → wrap-shading → **Chebyshev 拒绝** → 八面体双线性（`textureLoad`，无 sampler）→ decode（pow(sample, γ·0.5) → 归一 → 平方 → ×2π）。GPU 查询端缺 Chebyshev crush（`renderdoc-ddgi-debug-report.md §4.7`，P2，`[待确认]`是否已对齐 CPU）。

## 5. 运行时/测试基线

- 黄金向量单测：`npm run test` = **50/50 通过**（core 纯数学）。
- 门禁四道：`npm run typecheck` 0 错误 / `npm run test` 全绿 / `npm run build` 成功 / 浏览器 0 GPU 错误 + `readProbeSummary()` 可调用。
- 运行时探针摘要长度：`75 × 4 = 300`（renderdoc 报告，2026-08-20）`[待确认]` 与当前 main.ts 是否一致（main.ts 的 probeCounts 仍为 5×3×5，匹配）。

## 6. `[待确认]` 清单

1. `readProbeSummary` 的 backface bug（§4.2）是否已修复 —— 从当前 `DdgiSystem.ts` 源码看**未修**（仍是 `< 1e20`）。
2. distance 归一化 `2·Σw` 是否符合预期（§4.4，CPU/GPU 当前一致）。
3. GPU 查询端 Chebyshev crush 是否已与 CPU 对齐（§4.7）。
4. `probesPerRow` 的精确值与公式（renderdoc 报告记 9，未在源码独立核对）`[待确认]`。
5. 间接反弹（bounce）是否已实现 —— 从 trace kernel 描述看**未做**（只采 emissive）。
6. border 是否已从 same-edge clamp 升级为 opposite-edge wrap —— 从 `AGENTS.md` 看**未做**（M3+）。
