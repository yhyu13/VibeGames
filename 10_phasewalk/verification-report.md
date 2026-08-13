# verification-report.md — PHASEWALK（四相行者）可玩性文档

> 本文件是**可玩性文档**：用静态截图 + 动画 GIF 证明游戏端到端可玩——启动 → 切相 → 揭示 → 相弹 → 管道 → 风井 → 电线 → 金门结算。所有资产由 puppeteer（headless Edge）+ ffmpeg 自动采集，对应 `10_phasewalk` 当前代码状态。

---

## 0. 快速上手（How to play）

| 按键 | 动作 |
|---|---|
| `W` `A` `S` `D` | 移动 |
| `1` `2` `3` `4` | 切相：固 / 液 / 气 / 等离子 |
| `Space` | 跳跃；**气相按住=悬浮**、**液相按住=上浮**、**电线末端=离场跳** |
| `Enter` | 确认启示厅层卡 / 进入游戏 |
| `R` | 重开本层 |
| `Esc` / `P` | 暂停 |

**目标**：收集 4 枚相尘（固/液/气/等离子各一），随后走进金门通关。切相 = 切层——当前相的物块为实体，其余三相变幽灵纸片（非实心）。

**四相物理**（`constants.ts` 冻结契约）：

| 相 | 颜色 | 重力倍率 | 下落上限 | 移动机制 |
|---|---|---|---|---|
| 固 solid | 金黄 `#f2c57c` | 1.0 | 25 m/s | 地面（y=0 实心） |
| 液 liquid | 青 `#2ec4b6` | 0.6 | 4 m/s | 管道顺流 / 按住跳游泳 |
| 气 gas | 冷白 `#eef4f8` | 0.18 | 3 m/s | 风井抬升 / 按住跳悬浮 |
| 等离子 plasma | 紫 `#b26bff` | 0.9 | 25 m/s | 电线滑行（无跳跃） |

---

## 1. 端到端可玩性演示

> 以下 9 张截图 + 6 张 GIF 按通关顺序排列。截图 960×540。

### 1.1 启动 → 出生（boot → spawn）

<img src="screenshots/doc-01-boot.png" alt="启动覆盖层" width="720">

*启动覆盖层：点击进入四相塔。*

<img src="screenshots/doc-02-intro.png" alt="启示厅层卡" width="720">

*启示厅层卡（按 Enter 进入）。*

<img src="screenshots/doc-03-spawn.png" alt="出生：仅固相石阶 + 灰白无相区" width="720">

*出生：仅**固相**石阶实体可见，其余三相为隐藏幽灵（符合世界观剧本 0:00–0:12 出生拍）。*

### 1.2 四相同现揭示（first switch → four-phase reveal）⭐①

首次切相触发**四相同现**：幽灵层 0.3s 淡入 + 音叉三连音（液 330 / 气 440 / 焰 660 Hz）。

<img src="screenshots/gifs/reveal.gif" alt="四相同现揭示动画" width="720">

<img src="screenshots/doc-04-four-phase.png" alt="揭示后：四层同现" width="720">

*揭示后：固相石阶转幽灵、液管/气井/电线淡入显现。*

### 1.3 相弹拖尾（air switch → momentum trail）⭐②

空中切相动量守恒，触发 0.5s 动量拖尾 + 上行滑音 300→700 Hz。

<img src="screenshots/gifs/phasebounce.gif" alt="相弹拖尾动画" width="720">

<img src="screenshots/doc-05-trail.png" alt="相弹后气相 + 拖尾" width="720">

### 1.4 液相管道顺流（liquid pipe）

切液相 → 贴近流槽即被捕获，沿中线弧长推进过拐角（解析投影，不甩出）。

<img src="screenshots/gifs/pipe-flow.gif" alt="液相管道顺流动画" width="720">

<img src="screenshots/doc-06-liquid-pipe.png" alt="液相管道" width="720">

### 1.5 气相风井抬升（gas vent）

切气相 → 进入风井被气流抬升，收集气相相尘 s4。

<img src="screenshots/gifs/gas-rise.gif" alt="气相风井抬升动画" width="720">

<img src="screenshots/doc-07-gas-vent.png" alt="气相风井" width="720">

### 1.6 等离子电线滑行（plasma wire）

切等离子 → 贴近电线即被捕获，滑行至末端停驻（可按住 Space 离场跳）。

<img src="screenshots/gifs/wire-slide.gif" alt="等离子电线滑行动画" width="720">

<img src="screenshots/doc-08-plasma-wire.png" alt="等离子电线" width="720">

### 1.7 金门 → 结算（gate → victory）

集满相尘后切回固相，走进金门触发结算。

<img src="screenshots/gifs/gate-victory.gif" alt="金门结算动画" width="720">

<img src="screenshots/doc-09-victory.png" alt="结算画面" width="720">

---

## 2. 本轮修复（2026-08-13，等离子电线 ×2）

`src/core/simulation/traverse.ts` 的 `applyWires` 两个真实 bug，均经 puppeteer 逐帧 trace 定位：

| # | 症状 | 根因 | 修复 | 验证 |
|---|---|---|---|---|
| W1 | 玩家骑线时震荡、被抛飞（vy −44.9 → +28.4，y 冲到 21.6） | `if (velocity.y > 2.5) return false` 误释放——电线陡段的骑线速度本身 3.49–5.08 m/s > 2.5，每帧都被判定为「离场」 | 删除该速度阈值；释放只由 `wireReleased`（离场跳）控制 | trace：y 1.2→6.5 平滑滑行，无震荡/抛飞 ✓ |
| W2 | 电线末端**缓慢下沉** ~0.45 m/s（设计意图是「末端停驻」），且污染冻结关卡数据 | `atEnd` 分支 `position = wire.points[last]` 是**引用赋值**；下一帧 `stepPlayer` 的 `position.y += vy*dt` 直接改写了共享的 `wire.points[last].y`（即 `LAYERS` 冻结数据），端点永久下沉并传染后续骑线 | 改为**克隆端点** `{x,y,z}`，不再引用 | trace：末端 y=6.5 恒定 25+ 帧，零下沉 ✓ |

> W2 是一个隐蔽的**数据污染** bug（不只是观感）：每次骑线到末端都会改写 `levels.ts` 的 wire 端点，直到刷新页面才复位。液相 `applyPipes` 无此问题，因为 `pointAt` 每次返回新对象。

---

## 3. 资产清单（screenshots/）

| 资产 | 类型 | 内容 | 采集方式 |
|---|---|---|---|
| `doc-01-boot.png` | 截图 | 启动覆盖层 | `page.screenshot` |
| `doc-02-intro.png` | 截图 | 启示厅层卡 | `page.screenshot` |
| `doc-03-spawn.png` | 截图 | 出生：仅固相实体 | `page.screenshot` |
| `doc-04-four-phase.png` | 截图 | 揭示后四层同现 | `page.screenshot` |
| `doc-05-trail.png` | 截图 | 相弹后气相 + 拖尾 | `page.screenshot` |
| `doc-06-liquid-pipe.png` | 截图 | 液相管道 | `page.screenshot` |
| `doc-07-gas-vent.png` | 截图 | 气相风井 | `page.screenshot` |
| `doc-08-plasma-wire.png` | 截图 | 等离子电线 | `page.screenshot` |
| `doc-09-victory.png` | 截图 | 结算画面 | `page.screenshot` |
| `gifs/reveal.gif` | 动画 | 四相同现揭示（700ms @12fps） | 帧序列 → ffmpeg |
| `gifs/phasebounce.gif` | 动画 | 相弹拖尾（600ms @15fps） | 帧序列 → ffmpeg |
| `gifs/pipe-flow.gif` | 动画 | 管道顺流（2000ms @10fps） | 帧序列 → ffmpeg |
| `gifs/gas-rise.gif` | 动画 | 风井抬升（1500ms @10fps） | 帧序列 → ffmpeg |
| `gifs/wire-slide.gif` | 动画 | 电线滑行（2200ms @10fps） | 帧序列 → ffmpeg |
| `gifs/gate-victory.gif` | 动画 | 金门结算（1800ms @10fps） | 帧序列 → ffmpeg |

> 采集脚本为一次性 throwaway（`_capture.mjs` / `_probe.mjs` / `_dbgwire.mjs` + `screenshots/_frames/` 原始帧），交付前删除，不进 git。

---

## 4. 验证门

| 门 | 结果 |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run build` | ✅ green（757 KB / gzip 206 KB） |
| dev server 5187 + 浏览器加载 | ✅ 0 console error |
| 端到端采集（7 段：spawn/reveal/trail/pipe/gas/wire/victory） | ✅ 全命中目标状态 |
| 电线末端停驻 | ✅ y=6.5 恒定（W1/W2 修复后） |

---

## 附录：历史轮次（M1 → Polish → Polish round 2）

### Polish round 2（极致时刻①四相同现 + 极致时刻②相弹拖尾 + 纸纹）— 已修复 ✅

按 `worldview-first §4` 极致时刻验收 + `TDD §5` toon 管线补齐 5 项：

| # | 项 | 实现 | 验证 |
|---|---|---|---|
| R1 | 四相同现揭示 | 幽灵层出生隐藏（opacity 0），首次切相 0.3s 淡入至 15%（`SceneManager.reveal()` + `revealAlpha`） | 像素分析：liquid 0→274、gas 0→384、solid 2294→617 |
| R2 | 音叉三连音 | 首次切相 3 连音琶音（液 330 / 气 440 / 焰 660 Hz，间隔 0.1s） | 0 console error |
| R3 | 纸纹颗粒 | `PaperFX.ts`：128px canvas 噪声 `map`（~4% 明度抖动）叠加 toon 材质 + 幕布背景 | 0 console error |
| R4 | 幽灵层 8m 渲染半径 | `GHOST_RENDER_RADIUS=8`，玩家 8m 外幽灵层 `visible=false` | 远距等离子线剔除 |
| R5 | 相弹 0.5s 拖尾 | `ParticleSystem` 空中切相触发 0.5s 动量拖尾 + 上行滑音 300→700 | 空中切相 grounded:false 触发 |

### Polish round（playtest 反馈 4 项 + 自审）— 已修复 ✅

| # | 问题 | 修复 |
|---|---|---|
| U1 | 气相读成黄色、跳跃不像气 | 气改冷云白 `#eef4f8`；气相悬浮（按住跳 +11 m/s² 至 4 m/s 封顶）+ 下沉上限 3 m/s |
| U2 | 水相不沿流/无法控制 | 解析投影 + 弧长推进（贴中线过拐角）；液相游泳 |
| U3 | 水相穿过冰管 | 改**开放式流槽**（墨线环 + 流动粒子） |
| U4 | 等离子图标是闪电 | 图标 ⚡ → ∿ |
| 自审 | 等离子离线永远漂浮 / 电线端点抖动 / 无教学 | 等离子重力 0.9 + 电线端点停驻 + 离场跳（`wireReleased`）+ HUD 上下文提示 |

**管道 bug 根因**（重要踩坑）：`nearestArc` 的 9 点粗采样产生**不动点**——最近采样点滞后于真实弧长，`pointAt(arc+流速)` 又落回原地。修复 = 解析投影（点到线段投影取全局最近）。

### M1 原型（垂直切片落地 ✅）

世界观先行文档 + 5 分钟体验剧本先行，随后原型按剧本 1:1 实现。

| 门 | 结果 |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run build` | ✅ green |
| dev server 5187 + 浏览器加载 | ✅ 0 console errors |
| 启动流 | ✅ boot → 启示厅层卡 → playing |
| 键盘切相 | ✅ Digit2 → liquid，切相计数 +1 |
| 相弹法则（动量守恒） | ✅ 切相前后 velocity 逐分量相等 |
| 液相管道 | ✅ 顺流 |
| 气相风井 | ✅ y 1.0 → 2.4 上升 |
| 等离子电线 | ✅ 滑行 |
| 收集 + 金门 | ✅ 3/4 相尘开门 → 触门 → victory |

### 待办里程碑

- [ ] M1 收尾：全键盘 5 分钟剧本手动通关 ×3
- [ ] M2 — F2–F5 + 20 相尘 + 菜单/持久化全量 + 音频配方补全
- [ ] M3 — 相灵 mini-boss + 相位陷阱 + polish loop
- [ ] RC — 60fps 全塔 + 15 分钟首通
