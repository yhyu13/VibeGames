# Patapong 3D 鈥?Patapon 鈫?Patapong 美术翻译参考 (v2.0)

> **目的**:把 PSP 经典 *Patapon*(2008, Sony) 的视觉语言**体素化 + PBR 化**,
> 迁移到 Patapong 3D v2.0 的 3 人军队 + Moloch boss + 4 面鼓上。
>
> 本文档是 `02-art-direction.md` 的子文档,细化 PBR 体素 Patapon 的具体规格。
> 参考图来源:`references/patapon-raw/`(原版截图)+ `references/p1-pata-emerald.png`
> (v1.0 生成的青绿 Patapon 参考,继续作为军队外观基准)。

## 1. Patapon 原始美术语言(要翻译什么)

### 1.1 标志性特征(必保)

| 特征 | 说明 | 重要度 |
|---|---|---|
| 单只大眼 | 圆形身体 + 白巩膜 + 黑瞳孔,占身体 ~60% | 必保 |
| 球状身体 | 圆鼓鼓,几乎一个完整圆 | 必保 |
| 3 根羽毛 | 头顶,Patapon 视觉签名 | 强烈推荐 |
| 细棍手脚 | 极细手臂/腿,对比身体形成"大头娃娃"感 | 强烈推荐 |
| 黑色高对比 | 黑色实心剪影 + 纯色高亮 | 强烈推荐 |

### 1.2 配色(从原画提取)

- 基础色:#000000 黑(剪影底色)
- 鲜艳高亮:红 `#d72e2e` / 黄 `#ffd83a` / 蓝 `#3a8aff` / 青 `#3affc8` / 紫 `#c83aff`
- 军队三色:青绿 `#3affc8` / 青柠 `#9aff3a` / 青蓝 `#3ac8ff`(对应 `patapons.ts`)
- Moloch:红 `#ff3a3a` 身体 + 金 `#ffd83a` 角 + 淡黄 `#fff3a0` 眼
- 鼓:PATA 青 / PON 金 / DON 蓝 / CHAKA 粉(对应 `colors.ts` NOTE_*)

## 2. PBR 升级规格(Translation Rules)

> 用户明确要求"不是 three.js 默认渲染"。每条都是 Patapong 与默认
> MeshStandardMaterial 的关键差异。

### 2.1 渲染管线(必须)

| 项目 | Three.js 默认 | Patapong 要求 |
|---|---|---|
| 材质 | MeshStandardMaterial 默认 | MeshStandardMaterial + clearcoat 眼睛 / 统一 PBR 参数表 |
| 光照 | 1 Directional + 1 Ambient | Key(暖)+ Fill(冷)+ Rim + Hemisphere(蓝紫 + 暗红) |
| 阴影 | 1 ShadowMap 2048虏 | **关闭**(性能红线),AO 靠体素密度模拟 |
| 环境 | 无 | RoomEnvironment(Three.js 自带 IBL,零外部 HDR) |
| 后处理 | 无 | UnrealBloom(轻)+ Vignette |
| 色彩管理 | LinearSRGB | `outputColorSpace = SRGBColorSpace`(正确 PBR 输出) |
| Tone mapping | NoToneMapping | `ACESFilmicToneMapping`,exposure 1.1 |

### 2.2 材质参数(Material Parameters)

| 部位 | albedo | roughness | metalness | emissive | emissiveIntensity | 备注 |
|---|---|---|---|---|---|---|
| 军队身体 | 3 色模板 | 0.45 | 0.0 | 同 albedo | 0.15(觉醒 0.35) | 哑光 + 微发光 |
| 大眼(白) | #ffffff | 0.05 | 0.0 | 同 albedo | 0.45(觉醒 0.9) | 类玻璃,高光反射 |
| 瞳孔 | #0a0a0a | 0.2 | 0.0 | 无 | 鈥?| 深色实心 |
| 羽毛 | 紫/青/黄 | 0.5 | 0.0 | 同色 | 0.25 | 三色经典 |
| Moloch 身体 | #ff3a3a | 0.45 | 0.0 | 同色 | 0.15(enrage 0.5) | 开场仅轮廓 |
| Moloch 角 | #ffd83a | 0.3 | 0.1 | 同色 | 0.4 | 金属感 + 微发光 |
| 鼓垫 | 4 色 | 0.35 | 0.1 | 同色 | 0.35(敲击 1.0) | 强自发光,Bloom 加持 |
| 棍棒手脚 | #0a0a0a | 0.5 | 0.0 | 无 | 鈥?| 哑光黑 |

### 2.3 AO(环境光遮蔽)

身体下侧 / 羽毛根部应有明显 AO。v2.0 用**体素密度 + RoomEnvironment IBL**
模拟,不做手工 aoMap(无贴图文件)。

### 2.4 后处理(Post-FX)

- UnrealBloom:threshold 0.85,strength 0.6,radius 0.8 鈫?让眼睛/鼓/角发光。
- Vignette:dark 0.3 鈫?战场外暗角。
- **不要**:SSR / SSAO / 动态天空(性能红线,TDD 搂3)。

## 3. 视觉规则清单(实现必须匹配)

基于 v2.0 实际战场 + 开场效果:

| 规则 | 描述 | 三方件检查项 |
|---|---|---|
| 球体必须用 cube 拼出 | 身体是 N 个 BoxGeometry 堆叠成球,不是球面 mesh | `VoxelRenderer` 用 `InstancedMesh<BoxGeometry>`,N 个 instance 拼球 |
| 眼是玻璃球 | 球面 mesh(非 cube),清晰反射环境 | 大眼单独 `MeshStandardMaterial` + clearcoat,roughness 0.05 |
| 羽毛是 3 根 voxel 柱 | 3 根细立方体柱,不是平面 mesh | 3 个 BoxGeometry 贴在头顶 |
| 脚是 2 根 voxel 棍 | 2 根细立方体棍 | 2 个 BoxGeometry |
| 鼓垫是 voxel 圆片 | 扁平 BoxGeometry(4x0.25x4),不是薄面 | `BoxGeometry(4, 0.25, 4)` |
| 观众是 mini Patapon | 一群小一号体素 Patapon,不同颜色 | `InstancedMesh` 12 个,见 `core/data/audience.ts` |
| 战场是 voxel 地面 + 发光线 | 地面 cube 拼,边缘是 emissive cube 排 | 见 `core/data/court.ts` |

## 4. 错误示范(要避免)

| 错误 | 描述 | 怎么避免 |
|---|---|---|
| 默认 lambert/blinn | 平面光,没层次 | MeshStandardMaterial + 统一 PBR 参数 |
| 无 HDRI | 反射是黑色,死气沉沉 | RoomEnvironment 程序化 IBL |
| 球眼被 plane 平面化 | 失去"凸"感 | 球眼必须 SphereGeometry + 类玻璃材质 |
| 鼓垫是长条 plane | 失去"块"感 | 鼓垫必须 BoxGeometry 有深度 |
| 羽毛是三角片 | 失去 voxel 美学 | 羽毛 = 长方体 BoxGeometry |
| 平面贴图代替发光 | 鼓不发光,emissive 失效 | 鼓 `emissiveIntensity = 1.0`(敲击),开 Bloom |
| v1.0 残留:球拍/球/双方对打 | 版本错乱 | 已删除;新视觉一律军队 vs boss + 鼓 |

## 5. 实现路径(与开场 Part 2 对应)

| 阶段 | 任务 | 验证 |
|---|---|---|
| P0 | 鼓圈 4 面鼓垫 + 暗场灯光(Intro Darkness) | 黑场中 4 色鼓可见 |
| P1 | 军队/ boss 开场轮廓(身体压暗、眼睛关闭) | 觉醒前无光眼 |
| P2 | 鼓击发光 + 眼睛逐只点亮 | 敲 4 次全部觉醒 |
| P3 | Moloch 咆哮(红光 + 震 + 粒子) | 觉醒高潮帧 |
| P4 | 标题 bloom 入场 + 观众渐入 | 结尾帧可截图 |
| P5 | 相机缓推 + 涟漪 + 字幕 | 全程无 console error |

## 6. 验收对照(Acceptance Check)

| 维度 | 默认渲染 | Patapong 目标 |
|---|---|---|
| 眼反射 | 黑、无 | 清晰反射环境 + 高光 |
| 身体侧光 | 平 | 明显 emissive + 侧光高光 |
| 鼓发光 | 暗 | Bloom + 强 emissive |
| AO | 无 | 身体下侧 + 连接处明显暗 |
| 整体 | flat | **有层次的 PBR 渲染** |
| 开场 | 无 | 黑场 鈫?敲鼓 鈫?觉醒 鈫?boss 咆哮,全程 20~30s |

## 7. 一句话总结

> **Patapon 的"单眼 + 黑色剪影 + 纯色高亮"美学,在 Patapong v2.0 里通过
> cube 球体 + 玻璃眼 + 发光鼓 + ACES tone mapping,升级成 PBR 时代的
> 高饱和 + 高反射 + 高发光街机 3D 风;开场则把"节奏即光线"拍成 30 秒的
> 觉醒仪式。**

---

*文档版本 v2.0 路 2026-08-09 路 删除 v0.1/v1.0 球拍/球/AI 内容,改为军队 + boss + 鼓圈*
