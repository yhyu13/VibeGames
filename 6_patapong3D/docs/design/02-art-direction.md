# 02 · 美术方向(Art Direction)

> 供:Agent-engine 阅读
> 本文档细化 GDD §6 美术数值;TDD §4.5 是冻结色卡。

---

## 1. 视角(Camera)

| 参数 | 值 | 说明 |
|---|---|---|
| FOV | 45° | 透视适中(过宽会扭曲体素) |
| Position | (0, 0, 18) | 居中,略后 |
| LookAt | (0, 0, 0) | 看向球场中心 |
| Up | (0, 1, 0) | 标准 |
| Near | 0.1 | 近裁剪 |
| Far | 100 | 远裁剪 |

**视角选择理由**:
- 正交不行(失去体素透视感)
- FOV 45° 是"街机"标准(Atari Pong / 早期 3D)
- Z=18 略后(球拍和球在 Z∈[-5, 5] 之间,留出反应空间)

---

## 2. 灯光(Lights)

### 2.1 三点光(简化)

| 灯 | 类型 | 位置 | 强度 | 颜色 | 备注 |
|---|---|---|---|---|---|
| 主光 | DirectionalLight | (5, 8, 6) | 1.0 | #ffffff | 暖白,主照射 |
| 补光 | HemisphereLight | sky #4a3aff / ground #ff3a8a | 0.4 | — | 蓝紫上 + 暗红下,氛围 |
| 边缘光 | PointLight | (0, 0, -8) | 0.5 | #ff3aaa | 球场后部,边缘高光 |

### 2.2 灯光互动

- **Milestone 触发**:`emissiveIntensity` 短暂 bump(所有材质 +0.3,持续 100ms,lerp 回落)
- **Audience 跳**:`PointLight` 强度短促 +0.2(200ms)
- **球被击中**:`emissiveIntensity` bump(球自身 +0.5,100ms)

**无阴影**(`castShadow = false`):性能优先 + 无 shadow acne 烦恼。

---

## 3. 材质(Materials)

### 3.1 全场共用材质(8 个实例,性能预算 §3.5)

| 名称 | 用途 | color | emissive | roughness | metalness |
|---|---|---|---|---|---|
| `matFloor` | 球场地面 | #2a1a4a | #1a0a3a × 0.2 | 0.5 | 0.2 |
| `matFloorLine` | 球场边线 | #ff3aaa | #ff3aaa × 0.5 | 0.3 | 0.1 |
| `matP1` | P1 球拍 | #3affc8 | #1a8a5a × 0.3 | 0.4 | 0.1 |
| `matP1Eye` | P1 眼睛 | #ffffff | #ffffff × 1.0 | 0.2 | 0.0 |
| `matAI` | AI 球拍 | #ff7a3a | #8a3a1a × 0.3 | 0.4 | 0.1 |
| `matAIEye` | AI 眼睛 | #ffffff | #ffffff × 1.0 | 0.2 | 0.0 |
| `matBall` | 球 | #ffd83a | #ffd83a × 1.0 | 0.3 | 0.0 |
| `matAudience` | 观众(6 色随机) | 6-pool | 同 × 0.2 | 0.5 | 0.1 |

### 3.2 配色(hex 冻结,TDD §4.5 同步)

```ts
export const COLORS = {
  FLOOR_BASE: '#2a1a4a',
  FLOOR_LINE: '#ff3aaa',
  BG_TOP: '#0a0a2a',
  BG_BOTTOM: '#1a0a3a',
  P1_BODY: '#3affc8',
  P1_EYE: '#ffffff',
  AI_BODY: '#ff7a3a',
  AI_EYE: '#ffffff',
  BALL: '#ffd83a',
  AUDIENCE_POOL: ['#ff3a8a', '#3a8aff', '#8aff3a', '#ff8a3a', '#3affc8', '#c83aff'],
} as const;
```

---

## 4. 球场布局(Court Layout)

### 4.1 球场体素(共 ~800 个 cube,程序生成)

| 区域 | 位置 | 数量 | 颜色 | 形态 |
|---|---|---|---|---|
| 地板(中心) | y = -8, x ∈ [-12, 12], z ∈ [-4, 4] | 24×9 = 216 | #2a1a4a | 实心 |
| 地板边线(4 条) | 围绕地板四周 | 4×24 = ~96 | #ff3aaa | 1 cube 厚 |
| 后墙装饰(发光) | z = -5, 间隔 | ~50 | #3a8aff | 竖向条纹 |
| 前墙(可选,M2) | z = +5, 半透明 | 30 | #2a1a4a × 0.5 | 半透明 |
| 装饰灯柱(4 角) | (±13, 5, ±5) | 4 | #ff3aaa | 高 3, 发光 |

> **球拍和球**单独走 InstancedMesh(2 + 1 = 3 instance),球场部分(800)再 1 个 InstancedMesh = **共 4 个 InstancedMesh**。

### 4.2 球场尺寸(冻结)

| 维度 | 值(u) | 说明 |
|---|---|---|
| X 长度 | 24 | -12 ~ +12 |
| Y 高度 | 16 | -8 ~ +8 |
| Z 深度 | 10 | -5 ~ +5 |

> **球拍移动范围**:Y ∈ [-6, +6](球拍高 4,留 2 单位缓冲)
> **球飞行范围**:Y ∈ [-7, +7], X ∈ [-10, +10](出 X 边界 = 失分)

---

## 5. 球拍设计(Paddle Design)

### 5.1 P1 / AI 球拍(体素模型)

```
俯视(top view):
  ┌──┐
  │██│  Z=0.5
  │██│
  │██│
  │██│  Z=0
  │██│
  │██│  Z=-0.5
  └──┘
   ↑
   3u 宽

正视(front view):
   ┌────┐
   │ ●● │  ← 眼睛(2 个 0.3u×0.3u 黑色 emissive)
   │    │  ← 身体
   │    │
   └────┘
    ↑
    4u 高
```

- **尺寸**:3u 宽 × 4u 高 × 1u 深
- **眼睛**:2 个 0.3u × 0.3u 立方体,中心 Y=+1.2,X=±0.5,Z=+0.5
- **Squash & Stretch**:Hit 瞬间 `scale.x = 1.2, scale.y = 0.85`(80ms),然后 lerp 回 1.0
- **可动**:仅 Y 平移;X/Z 固定

### 5.2 球(Ball)

- **尺寸**:1u × 1u × 1u
- **颜色**:#ffd83a(emissive 1.0,自发光)
- **旋转**:不旋转(简化;体素 ball 转不转视觉差异小)
- **Glow**:emissive + 后处理 Bloom 加成

---

## 6. 观众(Audience)

- **数量**:12(M1 占位,M3 激活)
- **位置**:z = -8 后方,排列 4 行 3 列
  - 行 1:y = +5, 行 2:y = +2, 行 3:y = -2, 行 4:y = -5
  - 列:x = -8, 0, +8
- **尺寸**:0.8u × 1.2u × 0.8u
- **颜色**:6-pool 随机分配,每只一种
- **动作**:
  - 平时静止
  - Milestone 时:`bounceAmount = 1.0`,200ms 内 lerp 回 0(`position.y = baseY + bounceAmount * 0.5`)
- **M3 才激活**(M1/M2 阶段:仅在场,不跳)

---

## 7. 后处理(Post-FX)

### 7.1 启用项(M1 + M2 + M3 渐进)

| M | 后处理 | 强度 | 备注 |
|---|---|---|---|
| M1 | 无 | — | 性能最简 |
| M2 | Vignette | dark 0.3 | 仅边缘暗角,几乎无开销 |
| M3 | UnrealBloom + Vignette | bloom strength 0.6, threshold 0.85 | 球 + 眼睛 + 边线发光感 |

### 7.2 EffectComposer 装配

```ts
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(vignettePass);  // 自定义 ShaderPass
if (M3) composer.addPass(unrealBloomPass);
```

---

## 8. 渲染策略(Rendering Strategy)

### 8.1 InstancedMesh 分配(4 个)

| Mesh | 数量上限 | 内容 | 更新策略 |
|---|---|---|---|
| `courtMesh` | 1000 | 球场体素(地板 + 边线 + 装饰) | 静态(只创建时 setMatrixAt) |
| `paddleMesh` | 2 | P1 + AI 球拍(每球拍 16 sub-cube) | 动态(每帧 setMatrixAt) |
| `ballMesh` | 1 | 球 | 动态(每帧 setMatrixAt) |
| `particleMesh` | 256 | 粒子 | 动态(每帧 setMatrixAt,空闲位置隐藏) |

> **每实例 = 12 三角形**(BoxGeometry)。总三角形 = (1000 + 2×16 + 1 + 256) × 12 ≈ 15k 三角形(预算 30k 之内)。

### 8.2 性能 checklist

- [x] 静态体素 = 1 InstancedMesh(球场)
- [x] 动态体素 = 3 InstancedMesh(paddle / ball / particle)
- [x] 共享 BoxGeometry(全场 1 个 `new BoxGeometry(1, 1, 1)`)
- [x] 共享 Material(全场 8 个实例,见 §3.1)
- [x] 无阴影
- [x] 无 SSAO / SSR / 动态天空
- [x] Antialias = false(便宜设备友好;后处理 Bloom 自带柔化)
- [x] Frustum culling 默认开
- [x] WebGLRenderer `powerPreference: 'high-performance'`

---

## 9. UI 视觉(React Overlay)

### 9.1 HUD(在球场上方覆盖)

```
┌─────────────────────────────────────┐
│  P1: 3              AI: 5            │  ← 比分(左对齐,大字号)
│                  Rally: 7            │  ← rally hits(右对齐)
│                                       │
│           [3D 球场]                    │
│                                       │
└─────────────────────────────────────┘
```

- 字体:JetBrains Mono / monospace
- 比分字号:48px,emerald vs coral 配色(对应 P1 / AI)
- Rally 字号:24px,白色 emissive

### 9.2 Menu(主菜单)

```
┌─────────────────────────────────────┐
│                                       │
│                                       │
│           PATA-PONG                   │  ← 标题,80px,emissive 球色
│                                       │
│                                       │
│          [   PLAY   ]                 │  ← 大按钮
│                                       │
│     W/S: Move  |  Space: Launch       │  ← 控件说明
│                                       │
│         Highscore: 5 (vs AI)          │  ← localStorage 读出
│                                       │
└─────────────────────────────────────┘
```

- 背景:全黑 50% 透明 + Vignette
- 标题:打字机效果(每字符 50ms 渐入)

### 9.3 WinScreen

```
┌─────────────────────────────────────┐
│                                       │
│                                       │
│            VICTORY                    │  ← 60px,emerald 色
│                                       │
│        7 - 3                          │  ← 比分
│                                       │
│    [REMATCH]      [MENU]              │  ← 两按钮
│                                       │
└─────────────────────────────────────┘
```

- 背景:全黑 70% 透明 + Bloom 加强
- VICTORY 文字:逐字弹跳进入(每字 100ms delay,Spring 弹跳)

---

## 10. 配色板(色卡 swatch)

```
FLOOR_BASE   ████  #2a1a4a
FLOOR_LINE   ████  #ff3aaa
BG_TOP       ████  #0a0a2a
BG_BOTTOM    ████  #1a0a3a
P1_BODY      ████  #3affc8
P1_EYE       ████  #ffffff
AI_BODY      ████  #ff7a3a
AI_EYE       ████  #ffffff
BALL         ████  #ffd83a
AUDIENCE:
  pink       ████  #ff3a8a
  blue       ████  #3a8aff
  green      ████  #8aff3a
  orange     ████  #ff8a3a
  teal       ████  #3affc8
  purple     ████  #c83aff
```

**整体调性**:**霓虹复古 + 暗紫底**。参考:Sayonara Wild Hearts / Crossy Road / Thumper。

---

## 附录:文档版本

| 版本 | 日期 | 作者 | 变更 |
|------|------|------|------|
| v0.1 | 2026-08-07 | Mavis (设计阶段) | 初稿 |

## 附录:依赖文档

- GDD:`../GDD.md` §6
- TDD:`../TDD.md` §4.5(冻结色卡)
- Audio:`03-audio-direction.md`
- UX:`04-ux-pacing.md`
