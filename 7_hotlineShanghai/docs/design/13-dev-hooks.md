# 13 — DEV 调试钩子(`window.__*` 总览)

> **本文档 = `window.__*` 全部调试钩子的目录**。
> 实现: [`src/engine/devtools.ts`](../../src/engine/devtools.ts)。
> 改本文件 = `[DESIGN-LAYER-CHANGE]`(Mavis 签核)。

## 1. 钩子清单(2026-08-09 v3.1)

| 钩子 | 用途 | 何时用 | 例 |
|------|------|-------|-----|
| `window.__gameManifest()` | 返回完整 game state 快照 JSON | QA 报告 bug 时 | `console.log(window.__gameManifest())` |
| `window.__sim` | Simulation 实例(直接调方法) | 程序员调试 | `__sim.tick(0.016)` |
| `window.__simEvents()` | 最近 16 个 SimEvent 环 | QA 报告"动作没生效" | `__simEvents()` 看 fire 事件 |
| `window.__rcPipeline` | RC 管线状态(live 引用,非快照) | RC 性能 / 视觉问题 | `__rcPipeline.state()` |
| `window.__rcSetConfig(partial)` | 改 RC 配置(部分) | DEV 调参 | `__rcSetConfig({ baseRayCount: 8 })` |
| `window.__lightField` | v3.1 新增,lightField 几何 downsample 快照 | 灯池判定问题 | `__lightField.downsample[120][67]` |
| `window.__rcLab`(独立页面) | RC 算法 7 场景断言 | 改 shader | 进 `/rc-lab/` |
| `window.__audioVoices` | 当前 voice 池状态 | 音频问题 | `__audioVoices.length` |

## 2. 详解

### 2.1 `__gameManifest()`

**签名**:`() => string`(= JSON.stringify 全 state)

**返回**:
```json
{
  "version": "v3.1",
  "currentScene": "Room1",
  "currentRoom": "m1_workshop_room1",
  "playerState": { "pos": [2, 6], "hp": 1, "weapon": "knife", "mask": "actor" },
  "enemyStates": [{ "id": "e1", "pos": [4, 4], "archetype": "flashlight_patrol", "hp": 1, "lightShielded": false }],
  "lights": [{ "kind": "oil_lamp", "pos": [5, 1], "intensity": 0.55 }],
  "rcPipeline": { ... },
  "audioVoices": 3
}
```

**何时用**:
- QA 报告 bug → 必带 `__gameManifest()` 输出
- 程序员调状态 → 直接读字段

**入口**:`window.__gameManifest()`

### 2.2 `__sim`(Simulation 实例)

**类型**:`core/simulation/Simulation.ts` 实例

**常用方法**:
- `__sim.tick(dt)` — 强制 tick(默认 rAF 自动调)
- `__sim.apply(event)` — 强制发 input event
- `__sim.state()` — 返回当前 sim state
- `__sim.reset()` — 重置 sim(回 Room 1 起点)

**警告**:直接调 sim 方法会**跳过** engine 协调(不走 input 管线),仅用于单元测试或现场调试。

**入口**:`window.__sim`

### 2.3 `__simEvents()`

**签名**:`() => SimEvent[]`(最近 16 个)

**返回事件类型**:
- `playerMoved` `{ from: [x,y], to: [x,y], dt: 0.016 }`
- `playerAttacked` `{ weaponId: 'knife', aimTarget: 'e1', hit: true }`
- `enemyKilled` `{ enemyId: 'e1', cause: 'melee' | 'ranged' | 'thrown' | 'lightSmash' }`
- `lightSmashed` `{ lightId: 'oil_lamp_1', cause: 'melee' }`
- `lightShielded` `{ enemyId: 'e1', lightLevel: 0.45 }`
- `roomEntered` `{ roomId: 'm1_workshop_room1' }`
- `roomExited` `{ roomId: 'm1_workshop_room1', score: 0.85 }`
- `missionEnded` `{ missionId: 'm1_workshop', success: true, score: 0.92, grade: 'S' }`

**何时用**:
- QA 报告"开了一枪没击毙"→ 看 `playerAttacked.hit` + `enemyKilled`
- 报告"拆了灯没生效"→ 看 `lightSmashed`

**注意**:
- B08 修复:稳态返回最近 16 事件环(不会空)
- 实时调取(不在 event loop 里 poll)

**入口**:`window.__simEvents()`

### 2.4 `__rcPipeline`(RC 管线状态)

**类型**:`engine/RcPipeline` 实例

**字段**(`__rcPipeline.state()` 返回):
- `activeCascades: number`(当前 cascade 数,1-3,降级路径会 ≤ 1)
- `lightCount: number`(RC 注册光源数)
- `jfaPasses: number`(= log2(min(W,H)))
- `lastFrameTime: number`(ms)
- `lastCascadeTime: number`(ms)
- `lastFinalTime: number`(ms)
- `lastLightFieldUpdate: number`(ms,v3.1 新增)
- `currentMode: 'normal' | 'downgraded' | 'disabled'`
- `ditherEnabled: boolean`
- `useColorSpace: 'srgb' | 'linear'`

**B16 状态**:`state()` 返回**live 引用**(非快照),改 config 后读反映新值。

**何时用**:
- 性能问题 → 看 `lastFrameTime` + `activeCascades`
- 视觉问题 → 看 `activeCascades` + `currentMode`
- v3.1 lightField → 看 `lastLightFieldUpdate` 应 ≤ 0.4ms

**入口**:`window.__rcPipeline.state()`

### 2.5 `__rcSetConfig(partial)`

**签名**:`<T extends Partial<RcConfig>>(partial: T) => void`

**可改字段**(DEV only):
- `baseRayCount`(默认 4,2-8 之间)
- `maxCascades`(默认 3,1-3)
- `jitter`(默认 1.0,0-2)
- `ditherEnabled`(默认 true)
- `debugOverlay`(默认 false,显示 cascade 分割线)

**警告**:
- 只在 DEV 模式(NODE_ENV=development)生效
- 不写入 localStorage(只本次会话)
- 改完跑 `visual-check.mjs` 看效果

**入口**:`window.__rcSetConfig({ baseRayCount: 8 })`

### 2.6 `__lightField`(v3.1 新增)

**类型**:`world/lightField.ts::LightFieldCache.downsample 只读快照`

**字段**:
- `width: number`(默认 240)
- `height: number`(默认 135)
- `downsample: Float32Array`(linear 强度 0..1,长度 240 × 135 = 32400)
- `mode: 'enabled' | 'disabled'`(cascade=0 时 disabled)
- `updateTime: number`(ms)

**何时用**:
- 玩家报"光下无敌没生效"→ 查玩家位置 `__lightField.downsample[Math.floor(playerY * 13.5) * 240 + Math.floor(playerX * 24)]`
- 报"暗处被击毙"→ 查敌人位置 lightField 值是否 > 0.10(EXPOSED)

**注意**:
- linear 空间,**不**做 sRGB 转换(06 §3.1.2)
- 240×135 是 8×8 downsample(1080p / 8 = 135)
- disabled 时全部返 0(等同"无光护甲"状态)

**入口**:`window.__lightField.downsample`

### 2.7 `__rcLab`(独立页面 `/rc-lab/`)

**用途**:RC 算法 7 场景断言 + Tweakpane 实时调参。

**何时用**:
- 改 shader / pipeline 前先在 rc-lab 调通
- 改算法(probe 数 / cascade 策略)→ 7 场景必须全绿

**入口**:浏览器 `http://localhost:5184/rc-lab/`

### 2.8 `__audioVoices`

**字段**:
- `length: number`(当前 voice 数,≤ 6)
- `voices: Array<{ recipeId: string, gain: number, startTime: number }>`

**何时用**:
- 报告"音效没播"→ 看 `__audioVoices.length` 是否满 6
- 报告"音效太吵"→ 看 `voices[].gain` 是不是叠加超 1

**入口**:`window.__audioVoices`

## 3. 添加新钩子的 SOP

- [ ] **1. 定位**:`src/engine/devtools.ts`
- [ ] **2. 命名规范**:`__<scope>`(双下划线开头,避免冲突)
- [ ] **3. 注释**:`/** 用途 / 何时用 / 入口 */`
- [ ] **4. 仅 DEV 生效**:`if (import.meta.env.DEV)` 包起来
- [ ] **5. 加进本文档 §1 / §2**
- [ ] **6. 跑 12 §2 回归门**

## 4. 钩子禁用条件

- **生产构建**(NODE_ENV=production):`__sim` / `__simEvents` / `__rcSetConfig` / `__lightField` 全部 undefined
- `__rcPipeline` 仍可用(只读 state)
- `__gameManifest` 仍可用(QA 报告需要)

## 5. 状态

| 项 | 状态 |
|----|------|
| 13 DEV 钩子总览 | ✅ 2026-08-09 新建 |
| 8 个钩子详细 | ✅ 本文档 §2 |
| 添加新钩子 SOP | ✅ 本文档 §3 |
| 生产禁用 | ✅ 本文档 §4 |
| hooks 集中收口到 `devtools.ts` | ✅ |
| 钩子单测 | 🕐 |
