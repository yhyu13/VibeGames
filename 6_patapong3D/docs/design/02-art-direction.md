# 02 路 美术方向 (Art Direction) v2.0

> 读者:美术 + 程序(占位实现)。本文档细化 GDD 搂6 的美术决策;数值权威是
> TDD 搂4 / `src/core/constants.ts`,颜色权威是 `src/core/data/colors.ts` +
> `src/core/data/patapons.ts`。PBR 规则细节见 `PATAPONG-ART-REFERENCE.md`。
>
> 版本轨迹:v0.1 Pong(2026-08-07)鈫?v1.0 4-key 1v1 格斗(2026-08-09)鈫?
> **v2.0 神圣之鼓**(2026-08-09)。本文档从 v1.0 完全重写为 v2.0:鼓手 + 3 人
> 军队 vs Moloch,不再是双方 Patapon 对打。

## 1. 一句话美术目标

> **黑暗中的一圈鼓就是全部舞台:每一次敲击点亮世界。**

黑场开幕(90%+ 像素是黑),唯一的光来自:4 面鼓、军队的眼睛、Moloch 的轮廓。
每一次 PATA/PON/DON/CHAKA 都是一次"点亮",节奏即光线。

## 2. 相机(Camera)

| 参数 | 值 | 说明 |
|---|---|---|
| FOV | 40掳 | 透视适中,装下军队 +  boss |
| Position | (0, 2, 18) | 居中的略高机位,俯视鼓圈 |
| LookAt | (0, 0, 0) | 望向战场中心 |
| Near / Far | 0.1 / 100 | 标准 |

- 菜单/开场:同一机位做缓慢推进(18 鈫?14),鼓圈保持画面下方 1/4。
- 战斗中:机位固定,只允许 `CameraShake` 偏移,不允许自由视角。

## 3. 灯光(Lights)

### 3.1 战斗三点光(PBR)

| 灯 | 类型 | 位置 | 强度 | 颜色 |
|---|---|---|---|---|
| Key | DirectionalLight | (6, 10, 6) | 1.2 | #fff0d0 暖白 |
| Fill | DirectionalLight | (-8, 4, 4) | 0.5 | #88aaff 冷蓝 |
| Rim | DirectionalLight | (0, 6, -10) | 0.6 | #ff7a3a 橙红 |
| Hemi | HemisphereLight | sky #6a4aff / ground #ff3a8a | 0.6 | 蓝紫 + 暗粉 |
| Point | PointLight | (0, 0, -8) | 0.5 | #ff3aaa 洋红 |

### 3.2 开场暗场(Intro Darkness)

开场阶段把 Key / Fill / Hemi 强度按 `darkness 0..1` 线性压暗(1 = 只剩 Rim
轮廓 + 鼓的 emissive),营造"世界还没醒"的压迫感。军队/ boss 觉醒时逐帧回
到战斗亮度。

### 3.3 灯光交互

- 每面鼓敲击:`PointLight` 瞬时 bump(0.3,200ms 衰减)。
- Fever:全场 emissive 短暂 bump(+0.3)。
- 无实时阴影(`castShadow = false`):性能红线,见 TDD 搂3。

## 4. 材质(Materials, PBR)

> 全程序化:无贴图文件。`MeshStandardMaterial` + per-instance color +
> emissive;眼睛用 `MeshPhysicalMaterial` 类玻璃高光(见 PATAPONG-ART-REFERENCE)。

| 名称 | 用途 | color | roughness | metalness | emissive | emissiveIntensity |
|---|---|---|---|---|---|---|
| matCourt | 地板/边缘/后墙 | 见 colors.ts | 0.5 | 0.2 | 同色 | 0.2~0.6 |
| matArmyBody | 3 个 Patapon 身体 | #3affc8 / #9aff3a / #3ac8ff | 0.45 | 0.0 | 同色 | 0.15(觉醒 0.35) |
| matEye | 单眼(玻璃) | #ffffff | 0.05 | 0.0 | #ffffff | 0.45(觉醒 0.9) |
| matFeather | 三根羽毛 | 紫/青/黄 | 0.5 | 0.0 | 同色 | 0.25 |
| matBossBody | Moloch 身体 | #ff3a3a | 0.45 | 0.0 | 同色 | 0.15(enrage 0.5) |
| matBossEye/Horn | 眼/角 | #fff3a0 / #ffd83a | 0.3 | 0.1 | 同色 | 0.4 |
| matDrum | 4 面鼓垫 | PATA 青 / PON 金 / DON 蓝 / CHAKA 粉 | 0.35 | 0.1 | 同色 | 0.35(敲击 1.0) |
| matAudience | 观众 6 色池 | 6-pool | 0.5 | 0.1 | 同色 | 0.2 |
| matParticle | 粒子 | 动态 | 0.4 | 0.1 | 同色 | 0.8 |

## 5. 舞台布局(Court)

### 5.1 战场(来自 `core/data/court.ts`)

| 区域 | 位置 | 数量 | 颜色 |
|---|---|---|---|
| 地板 | y = -7, x 鈭?[-11, 11], z 鈭?[-3, 3] | 23x7 | #2a1a4a |
| 霓虹边缘 | 地板四周 | 52 | #ff3aaa |
| 后墙装饰 | z = -4.5 | 11 | #ff3aaa |
| 四角灯柱 | (卤10, 卤2.5) | 16 | #ffd83a |
| 节奏条基线 | y = -7, z = 0, x 鈭?[-8, 8] | 17 | #ff3aaa |

### 5.2 角色站位

| 角色 | 初始位置 | 说明 |
|---|---|---|
| 军队 3 人 | x = -4, z = -0.8 / 0 / +0.8 | emerald / lime / teal,朝 +X |
| Moloch | x = 6, 朝 -X(背对镜头,面朝军队) | scale 1.7,带双角 |
| 鼓圈 | 画面下方 y = -6.5, z = 3(相机前) | 4 面鼓一字排开(PATA PON DON CHAKA) |

> 鼓圈是 v2.0 开场新增的可视元素:战斗中被 UI 的 4-lane 音符代替,开场中
> 它是"鼓手"的化身。鼓手本体**不渲染 mesh**(玩家就是镜头后的神)。

## 6. 角色设计(Characters)

### 6.1 军队 Patapon(3 人,通用模板)

- 球状 voxel 身体(半径 3 格的壳)+ 单只大眼睛 + 3 根彩色羽毛 + 细棍手脚。
- 状态机:`idle / march / attack / defend / charge / rally / retreat /
  volley / heavy / berserk / hit / defeat`(见 `core/types.ts`)。
- 开场专属:觉醒前眼睛不发光、身体压暗;觉醒时眼睛瞬间点亮 + 羽毛发亮。

### 6.2 Moloch(唯一 boss)

- 红色身体 + 金色双角 + 淡黄大眼,scale 1.7,占据画面右 1/3。
- 开场:仅轮廓可见(Rim 光 + 微弱红色 emissive),眼睛两粒暗金光;咆哮时
  眼睛爆亮 + 红光闪 + 镜头震。

### 6.3 观众(Audience)

- 12 个 mini Patapon(0.6u voxel),z = -8,4 行 x 3 列,6 色随机。
- 开场阶段隐藏(暗场中不出现),觉醒时渐入 + 欢呼。

## 7. 资源清单(Asset Tier, 开场范围)

### Tier 1 MUST(没有不能 ship)

- 4 面鼓垫(PATA/PON/DON/CHAKA 4 色,敲击发光)
- 军队 3 人(身体/眼/羽毛/手脚)
- Moloch 轮廓(身体/眼/角)
- 地板 + 霓虹边缘 + 后墙 + 节奏条

### Tier 2 juice 必备

- 鼓击脉冲光(鼓面 emissive 1.0 瞬闪 + 粒子 4~16 颗)
- 眼睛觉醒(暗 鈫?亮,0.3s)
- boss 咆哮红光闪 + CameraShake
- 标题 bloom 入场 / 觉醒 chord SFX

### Tier 3 装饰(有加分可缺)

- 观众渐入 + 欢呼
- bgPad 背景低音
- 开场相机缓推(18 鈫?14)

### Tier 4 可迟(polish 无限)

- 字幕逐字渐显 / 提示呼吸动画
- 鼓圈涟漪 ring 扩散
- 开场可跳过(任意键)

## 8. 冲突与禁忌(Forbidden List)

- **禁用外部素材文件**:一切程序化生成,`references/` 仅供美术方向参考,永不
  被运行时加载。
- **禁用 v0.1/v1.0 视觉残留**:球拍、球、双方对打 Patapon、AI 角色、比分
  dot 条都不允许再出现(已删除)。
- **禁用画布文字**:所有文字走 React overlay(Tailwind),3D 场景零文字。
- **禁用颜色承载唯一信息**:HP/状态必须同时有形状/数字冗余,防止色盲不可玩。
- **禁用实时阴影 / SSAO / SSR**:性能红线(TDD 搂3)。

## 9. 依赖文档

- GDD:`../GDD.md`(设计权威)
- TDD:`../TDD.md` 搂3 性能 + 搂4 数值
- PBR:`PATAPONG-ART-REFERENCE.md`
- 开场规划:`05-intro-scene-plan.md`(Part 2 新增)
- 代码契约:`src/core/data/colors.ts` / `src/core/data/patapons.ts`

---

*文档版本 v2.0 路 2026-08-09 路 神圣之鼓重写(删除 v1.0 双方对打内容)*
