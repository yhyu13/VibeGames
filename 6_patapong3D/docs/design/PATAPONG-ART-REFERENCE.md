# Patapong 3D — Patapon → Patapong 美术翻译参考

> **目的**:把 PSP 经典 *Patapon*(2008-2011, Sony) 的视觉语言,**体素化 + PBR 化**,迁移到 Patapong 3D 项目的 P1 / AI 球拍角色上。
>
> **本文档是 02-art-direction.md 的子文档**,细化 PBR 体素 Patapon 的具体规格。
>
> **参考图原始来源**:Quark 百科"啪嗒砰"词条(`https://baike.quark.cn/baike?id=88fe27bf62034fec8243bf7128fbfcec`)+ 多轮 web search / 163 / 哔哩哔哩 / gamespot + 本地下载参考图(`/6_patapong3D/references/patapon-raw/`)。
>
> **生成分镜**:`/6_patapong3D/references/{p1-pata-emerald, ai-pata-coral, p1-with-paddle, court-preview}.png`(2K/1K,2048² 或 2752×1536)

---

## 1. Patapon 原始美术语言(What we're translating)

### 1.1 标志性特征(Iconic Features, 必保留)

| 特征 | 说明 | 重要性 |
|------|------|--------|
| **单只大眼** | THE 签名特征:圆形身体,白巩膜 + 黑瞳孔,占身体 ~60% | 🔴 必保留 |
| **球形身体** | 圆鼓鼓,几乎一个完整圆 | 🔴 必保留 |
| **3 根羽毛/触角** | 头顶,Patapon 视觉签名 | 🟡 强烈推荐 |
| **细棒手脚** | 极细的手臂/腿,对比身体形成"大头娃娃"感 | 🟡 强烈推荐 |
| **黑色高对比** | 黑色实心剪影 + 纯色高亮(武器/装饰) | 🟡 强烈推荐 |
| **扁平 / 皮影感** | 横版 PSP 2D,无 PBR | 🟢 升级机会 |

### 1.2 配色(从原画提取)

- **基础色**:#000000 黑(剪影底色)
- **鲜色高亮**:红 `#d72e2e` / 黄 `#ffd83a` / 蓝 `#3a8aff` / 绿 `#3affc8` / 紫 `#c83aff`
- **P1 翻译**:青绿 `#3affc8`(青绿版 Patapon 配色)
- **AI 翻译**:橙红 `#ff7a3a`(红 Patapon 配色,经典 Hatapon 主角色)
- **球**:金黄 `#ffd83a`(PATA drum 黄色)

---

## 2. PBR 升级规格(Translation Rules)

> 用户明确要求"**不是 three.js 默认渲染**"。下面每条都是 Patapong 角色与 Three.js 默认 MeshStandardMaterial 的关键差异。

### 2.1 渲染管线(必须)

| 项 | Three.js 默认 | Patapong 要求 |
|---|---|---|
| **材质** | `MeshStandardMaterial` 默认(roughness 1, metalness 0) | `MeshPhysicalMaterial` 启用 clearcoat / sheen / iridescence |
| **光照** | 1 Directional + 1 Ambient | 1 Key (warm) + 1 Fill (cool) + 1 Rim + Hemisphere(蓝紫 + 暗红) |
| **阴影** | 1 ShadowMap 2048² | 软 PCF + baked AO(procedural aoMap) |
| **HDRI 环境** | 无 | RoomEnvironment(Three.js 自带) 或程序化 HDR |
| **后处理** | 无 | UnrealBloom(轻)+ Vignette |
| **色彩管理** | 默认 LinearSRGB | `outputColorSpace = SRGBColorSpace`(正确 PBR 输出) |
| **Tone mapping** | 默认 NoToneMapping | `ACESFilmicToneMapping`,exposure 1.1 |

### 2.2 材质参数(Material Parameters)

| 部位 | albedo | roughness | metalness | emissive | emissiveIntensity | 备注 |
|---|---|---|---|---|---|---|
| **球形身体** | `#3affc8`(P1)/ `#ff7a3a`(AI) | 0.45 | 0.0 | 同步 albedo | 0.15 | 哑光 + 微发光 |
| **大眼(白)** | `#ffffff` | 0.05 | 0.0 | 同步 albedo | 0.3 | **类玻璃/高光反射** |
| **眼瞳孔** | `#0a0a0a` | 0.2 | 0.0 | 无 | — | 深色实心 |
| **头顶羽毛** | 紫 `#c83aff` / 绿 `#3affc8` / 黄 `#ffd83a` | 0.5 | 0.0 | 同步 | 0.2 | 三个不同色(经典 Patapon 配色) |
| **球拍** | 球拍配色 | 0.3 | 0.6 | 同步 | 0.4 | **金属感**+ 微发光 |
| **球** | `#ffd83a` | 0.2 | 0.1 | `#ffd83a` | **1.0** | 强自发光,Bloom 加强 |
| **棒手脚** | `#0a0a0a` | 0.5 | 0.0 | 无 | — | 哑光黑 |

### 2.3 AO(环境光遮蔽)

- **身体下侧** / **球拍与身体连接处** / **羽毛根部** 应该有明显 AO
- 实现:`aoMap` 手动烘焙(预生成在 02-art-direction §3 的 materials 里附 aoMap)
- 或:用 `RoomEnvironment` 自带的 IBL 模拟

### 2.4 后处理(Post-FX)

- **UnrealBloom**:threshold 0.85,strength 0.6,radius 0.8 → 让眼/球拍/球发光
- **Vignette**:dark 0.3 → 球场外景暗角
- **不要**:SSR / SSAO / 动态天空(性能纪律,见 TDD §3.5)

---

## 3. 视觉规则清单(What the implementation MUST match)

基于 `court-preview.png` 实际渲染效果反推:

| 规则 | 描述 | 三方件检查项 |
|------|------|---|
| **球体必须由 cube 拼出** | 身体是 N 个 BoxGeometry 堆叠成球,不是球面 mesh | `VoxelRenderer` 用 `InstancedMesh<BoxGeometry>`,N 个 instance 拼球 |
| **眼是 glass sphere** | 球面 mesh(非 cube),清晰反射环境 | 大眼 = 单独 `MeshPhysicalMaterial`,roughness 0.05 |
| **羽毛是 3 根 voxel 柱** | 3 根细立方体柱,不是平面 mesh | 3 个 `BoxGeometry`,贴在头顶 |
| **脚是 2 根 voxel 棒** | 2 根细立方体棒 | 2 个 `BoxGeometry` |
| **球拍是 voxel 板** | 长方形扁 BoxGeometry,不是薄面 | `BoxGeometry(3, 4, 1)`(见 TDD §4.5 paddle size) |
| **观众是 mini Patapon** | 一群小一号体素 Patapon,不同色 | `InstancedMesh` 12 个,见 `core/data/audience.ts` |
| **球场是 voxel 地面 + 发光线** | 地面由 cube 拼,边线是 emissive cube 排 | 见 `core/data/court.ts` 370+ voxels |

---

## 4. 错误示范(What to AVOID)

参考生成过程中发现的问题,M1+ 避免:

| 错误 | 描述 | 怎么避免 |
|------|------|----------|
| ❌ 默认 lambert/blinn | 平面灰,没层次 | 用 `MeshPhysicalMaterial` + 启用 clearcoat |
| ❌ 无 HDRI | 反射是黑色,死气沉沉 | 挂 `RoomEnvironment` 或程序化 HDR |
| ❌ 球眼被 plane 平面化 | 失去"凸"感 | 球眼必须 `SphereGeometry` + 玻璃材质 |
| ❌ 球拍是长条 plane | 失去"块"感 | 球拍必须 `BoxGeometry` 有深度 |
| ❌ 羽毛是三角片 | 失去 voxel 美学 | 羽毛 = 长方体 `BoxGeometry` |
| ❌ 平面贴图代替发光 | 球不发光,emissive 失效 | 球的 `emissiveIntensity = 1.0`,启用 Bloom |

---

## 5. 实现路径(M1.4 → M3.3 演进)

| M | 任务 | 验证 |
|---|---|---|
| **M1.4** | SceneManager + VoxelRenderer 基础,无 PBR 优化(默认材质) | 能看见球场 + 球拍 + 球 |
| **M1.5** | 切换 `MeshPhysicalMaterial`,启用 clearcoat,挂 `RoomEnvironment` | 眼睛反光可见 |
| **M2.4** | 加 `UnrealBloom`(轻量) | 球 + 球拍发光感 |
| **M2.5** | 调材质参数(roughness / metalness / emissive) | 与 `court-preview.png` 风格对齐 |
| **M3.3** | 完整后处理(ACES tone mapping + sRGB output) | 最终画质 |

---

## 6. 验收对照(Acceptance Check)

实现完成后,以下**视觉差异**必须达到:

| 维度 | Three.js 默认 | Patapong 目标 |
|------|--------------|---------------|
| 眼反射 | 黑/无 | 清晰反射环境 + 高光 |
| 身体侧光 | 平 | 明显 emissive + 侧光高光 |
| 球发光 | 弱 | Bloom + 强 emissive |
| 球拍 | 哑光 | 金属感 + 自发光 |
| AO | 无 | 身体下侧 + 连接处明显暗 |
| 整体 | flat | **有层次的 PBR 渲染** |

---

## 7. 一句话总结

> **Patapon 的"扁 + 黑色剪影 + 单眼"美学,在 Patapong 里通过 cube 球体 + 玻璃眼 + 金属球拍 + ACES tone mapping,升级为 PBR 时代的"高饱和 + 高反射 + 高发光"街机 3D 风。**

---

*文档版本 v0.1 · 2026-08-07 · 适用 6_patapong3D 项目*
