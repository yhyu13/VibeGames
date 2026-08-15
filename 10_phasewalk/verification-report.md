# verification-report.md — PHASEWALK（四相行者）可玩性文档

## v4.1 打磨轮（2026-08-15）✅ — correctness + visual + perf + determinism

**正确性**：切相队列在强制重置（死亡 / 重开 / 登层 / 打散 / 换层）后清空（`InputManager.clearQueuedInput`），杜绝"重生瞬间重放冷却期排队的相请求"造成的虚假 min-switch；`layer_intro` 跳跃开始不再顺带触发首帧跳跃；死亡 / 打散 / 重开 / 登层后 `lastPhase` 重同步（消除虚假切换音）；删除死状态 `introT` / `INTRO_DURATION`（types / constants / phasePhysics / GameSim 全链路）。

**视觉**：幽灵层 −40% 饱和度改作用于 `material.color`（r185 只采样 ramp R 通道作标量步进，原"ramp 预降"无效）；相尘 shard 补 4 阶 gradientMap + 幽灵降饱和 + 描边 1.15→1.03；玩家头部补相位 gradientMap（`setPhase` 同步换 ramp）；共享调参抽到 `constants.ts`（`GHOST_ALPHA` / `GHOST_DESAT` / `OUTLINE_SCALE`）。

**性能 / 确定性**：`__perf` 帧时环缓冲（60fps 验证门）；结算屏显示历史最少切相（`bestSwitches` 求和）；雷云云团改种子 PRNG（`mulberry32` 按 hazard id 播种）→ 场景逐层可复现。

**验证**：`tsc --noEmit` 0 error + `npm run build` green。

## v4 四相重做（2026-08-15）✅ — 基线（v4.1 打磨其上）

> **推翻 v3 的自动寻路**：液/气/焰三相互动从"骑管 / 乘风 / 沿电线"（零选择零手感）重做为**独立（垂直）又互补**的四套技能，并加入**相灵弹（子弹事件）** + **Tab 圆圈 UI**。v3 的管道 / 风井 / 电线全部删除。详见 `docs/design/03-phase-interaction-v4.md`。
>
> 以下各小节标题带「历史」者 = 已被本节取代，保留作踩坑记录，不代表当前玩法。

### 四相 = 物质态（一个移动动词 + 一个物质动词）

| 相 | 移动动词 | 物质动词 | 子弹交互 |
|---|---|---|---|
| 固 solid | **跳**（精准平台跳跃 + 二段跳，基线） | **固化造路**——走近相液池凝成桥，跨过无相区 | 中弹 → **死亡**（被吃相） |
| 液 liquid | **泳**（按住空格上浮 / WASD 三维转向 / 松缓沉） | **分离**——流体过窄缝（数据冻结 M2+） | 中弹 → **打散**（软惩罚：逼回固相 + 清动量，不死） |
| 气 gas | **飘**（极轻 + 强横向漂移 + 按住空格悬浮，无跳） | **穿过**——无形 | 子弹**直接穿过**（免疫） |
| 焰 plasma | **爆冲**（按空格能量爆冲，二段爆 + 冷却 0.4s） | **吸收反弹**——吸弹反射回发射器 | 吸收 → **反射拆塔** |

**互补链**：固冻结成桥 → 气穿弹绕行 → 焰反射拆发射器（液=移动机动）。四相各回答一个不同问题，不是"怎么往上走"的四次重复。

### 子弹系统（相灵弹 / 相灵眼）

- **发射器 Emitter（相灵眼）**：固定位置，周期发射慢速中性子弹（可躲）。F1 有 2 个：em1 东侧横射焰/气路（快），em2 出生台前横穿主路（慢，教学弹）。
- **交互由玩家当前相决定**（上表第 4 列）。焰相反射的子弹飞回发射器，命中即摧毁（金色爆裂粒子）。

### 输入：Tab + 圆圈 UI

- **按住 Tab** → 圆形四象限菜单淡入；**WASD/方向键**高亮某象限；**松开 Tab** → 切到高亮相。
- 象限映射：**↑=气 · ↓=固 · ←=液 · →=焰**。删除 `1/2/3/4` 数字键。
- **快切**：Tab+方向连击 = 近瞬切（不驻留菜单），保住相弹手速。

### 截图 + GIF（新机制）

**Tab 圆圈 UI**（按住 Tab 呼出四象限菜单，方向高亮）：

<img src="screenshots/v4-01-tab-radial.png" alt="Tab 圆圈四象限切相菜单" width="720">

<img src="screenshots/gifs/v4-radial.gif" alt="Tab 圆圈切相动画" width="720">

**相灵眼 + 子弹**（发射器金色虹膜 + 飞行中的中性子弹）：

<img src="screenshots/v4-02-emitters.png" alt="相灵眼发射器 + 子弹" width="720">

**固化造路**（固相走近相液池，把它凝成可踩的桥）：

<img src="screenshots/v4-03a-pool-liquid.png" alt="相液池（未凝固，半透明）" width="720">

<img src="screenshots/v4-03b-pool-solidified.png" alt="相液池凝固成桥（不透明 + 金色描边）" width="720">

<img src="screenshots/gifs/v4-solidify.gif" alt="固化造路动画" width="720">

**液相游泳**（按住空格上浮）：

<img src="screenshots/v4-04-liquid-swim.png" alt="液相游泳上浮" width="720">

**焰相反射拆塔**（子弹命中焰相 → 反射回发射器 → 摧毁，金色爆裂）：

<img src="screenshots/gifs/v4-reflect.gif" alt="焰相反射子弹拆发射器动画" width="720">

**结算**：

<img src="screenshots/v4-05-victory.png" alt="结算画面" width="720">

### v4 验证门（实测全过）

| 门 | 结果 |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run build` | ✅ green |
| 四相移动逐项 trace | ✅ 固跳 vy=10.5 / 液泳 vy=4.7 / 气悬浮 vy=1.8 / 焰爆冲 vy=11.6 |
| Tab+W 圆圈切相 → 气相 | ✅ phase=gas |
| 子弹交互（确定性：传送进 em2 弹道） | ✅ 固中弹死 deaths 0→1 / 液中弹打散回固 / 气穿弹 0 死 / 焰反射摧毁 em2 |
| 固化造路 | ✅ pool1.solidified=true |
| 金门 3 相尘 → victory | ✅ gamePhase=victory, finished=true |
| 0 console/page error | ✅ |

---

## 中央塔 v3 redesign（2026-08-14, playtest round 2）✅（历史）

用户反馈：坠落死亡重置"no go" + 重设计 intro 层。自审根源：① 地面只对固相碰撞 = 空中切相即被世界吞噬（设计错误）；② v2 大厅 22×20m 太大、四路入口离出生点远；③ 雷云悬在风井正上方 = 惩罚路线教学行为；④ 风井助推后无减速 = 火箭撞云。

| 项 | v3 设计 | 实测 |
|---|---|---|
| 坠落永不致死 | **地面全相实心**；虚空死亡删除（安全网 y<−6 仅兜底） | gas 5m 坠落到地面 0 死亡 ✓ |
| 紧凑大厅 | 14×14m 中央塔；金门在塔顶；四路从塔四面攀塔，出生点一眼四路汇聚；路线平台锁链金描边 + 出生金环 | 截图 06 ✓ |
| 固路 | 南面石阶 p0→p6；上升进入薄平台落台面（速度判向碰撞） | 跳上 p1 落顶 ✓ |
| 液路 | 西面流槽→塔顶上方 0.6m 停驻→切固落地 | 全骑乘 + s2 + 落地 ✓ |
| 气路 | 北面风井 + **巡航悬停**（超速阻尼回 4 m/s，修风井火箭 bug）；雷云改为**东侧方向护栏**（井柱内永远安全，漂错方向撞可见云团） | 3s 悬停 0 死亡 + s4 + 漂移落 p6 ✓；向东漂 = 公平死亡 ✓ |
| 焰路 | 东面电线→端点停驻→离场跳/切相落地 | s3 + 落地 ✓ |
| 危险 | 无相区 hB（石阶北侧坠台）/ hA（电线台东侧跳空）/ 雷云；全部可视化 | hB 击杀 ✓ 雷云只杀气 ✓ |
| 金门 | 3/4 相尘 → 胜利 | ✓ |

**截图**：`screenshots/06-tower-hall-v3.png`（塔式大厅四路汇聚）

---

## 四路汇聚 redesign（2026-08-14, playtest 反馈）✅（历史）

用户反馈：让玩家会死、四相各有通关路、死亡不回原地点、探索不同相才有解法。

| 项 | 设计 | 实测 |
|---|---|---|
| 四路汇聚 | 固=石阶(最稳) / 液=上行流槽 / 气=风井+悬停 / 焰=电线；四路终点都在金门平台 p6 | 液路骑满→终点停驻→切固落地 ✓ 气路采 s4 ✓ 焰路到端点落地 ✓ |
| 探索驱动 | 金门 3/4 相尘 = 必须掌握 ≥3 相；HUD 探索阶梯提示（0枚→换相探索→差2→差1→金门） | gate 3 相尘→victory ✓ |
| 死亡有代价 | 危险：无相区灰斑(全相即死) / 引流管 pipe2_drain(液陷阱,吸进虚空) / 雷云(气专属) / 虚空；死亡→出生点+相位重置固+坠落计数，**无同点重试** | 引流管坠亡 ✓ 无相区击杀固相 ✓ 雷云击杀气相 ✓ 固相穿云安全 ✓ |
| 相弹进平台 bug | 液管终点原在 p6 底面下，切相动量把玩家顶进薄平台被推穿 → ①碰撞改**速度判向**（下落=落台面/上升=顶天花）②管道终点抬高至台面上方 1m | 跳上 p1 ✓ 电线落地 ✓ 液路落地 ✓ |
| 无相区压管道 bug | hA 全相即死区恰好盖住液管主线 → 拆成两块夹住管道留走廊 | 液路 0 死亡过区 ✓ |

**截图**：`screenshots/05-four-routes.png`（四路汇聚布局）

---

> 本文件是**可玩性文档**：用静态截图 + 动画 GIF 证明游戏端到端可玩。顶部「v4 四相重做」为**当前玩法**（启动 → 切相 → 相弹 → 固化造路 → 泳/飘/爆冲 → 反射拆塔 → 金门结算）；下文带「历史」的小节演示的是已被 v4 删除的 v3 管/线/风井路线。所有资产由 puppeteer（headless Edge）+ ffmpeg 自动采集。

---

## 0. 快速上手（How to play）

| 按键 | 动作 |
|---|---|
| `W` `A` `S` `D` | 移动（按住 Tab 时 = 指向四象限选相） |
| `Tab` | 按住呼出**圆圈四象限菜单**，松开切到高亮相（↑气 ↓固 ←液 →焰） |
| `Space` | 动词：**固=跳**（可二段跳）· **液=按住上浮** · **气=按住悬浮** · **焰=爆冲**（二段爆） |
| `Enter` | 确认启示厅层卡 / 进入游戏 |
| `R` | 重开本层 |
| `Esc` / `P` | 暂停 |

**目标**：收集 3 枚相尘开门（≥3 相），随后走进金门通关。切相 = 切层——当前相的物块为实体，其余三相变幽灵纸片（非实心）。**四相各回答一个问题**：固造路（凝固相液池）/ 液机动（泳）/ 气穿弹绕行 / 焰反射子弹拆发射器。

**四相物理**（`constants.ts` 冻结契约）：

| 相 | 颜色 | 重力倍率 | 下落上限 | 移动机制 | 子弹交互 |
|---|---|---|---|---|---|
| 固 solid | 金黄 `#f2c57c` | 1.0 | 25 m/s | 跳 11（二段跳） | 中弹死 |
| 液 liquid | 青 `#2ec4b6` | 0.6 | 4 m/s | 泳：按住上浮 →5 m/s 封顶 | 中弹打散回固 |
| 气 gas | 冷白 `#eef4f8` | 0.18 | 3 m/s | 飘：按住悬浮 →4 m/s | 穿弹免疫 |
| 焰 plasma | 紫 `#b26bff` | 0.9 | 25 m/s | 爆冲 12 m/s（二段爆，冷却 0.4s） | 吸弹反射 |

---

## 1. 端到端可玩性演示（历史 — v3 管/线/风井）

> ⚠️ 本节演示的是**已被 v4 删除**的管/线/风井玩法，仅作历史记录。当前玩法见顶部 **v4 四相重做** 一节。
>
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

## 2. 本轮修复（2026-08-13，等离子电线 ×2）（历史）

`src/core/simulation/traverse.ts` 的 `applyWires` 两个真实 bug，均经 puppeteer 逐帧 trace 定位：

| # | 症状 | 根因 | 修复 | 验证 |
|---|---|---|---|---|
| W1 | 玩家骑线时震荡、被抛飞（vy −44.9 → +28.4，y 冲到 21.6） | `if (velocity.y > 2.5) return false` 误释放——电线陡段的骑线速度本身 3.49–5.08 m/s > 2.5，每帧都被判定为「离场」 | 删除该速度阈值；释放只由 `wireReleased`（离场跳）控制 | trace：y 1.2→6.5 平滑滑行，无震荡/抛飞 ✓ |
| W2 | 电线末端**缓慢下沉** ~0.45 m/s（设计意图是「末端停驻」），且污染冻结关卡数据 | `atEnd` 分支 `position = wire.points[last]` 是**引用赋值**；下一帧 `stepPlayer` 的 `position.y += vy*dt` 直接改写了共享的 `wire.points[last].y`（即 `LAYERS` 冻结数据），端点永久下沉并传染后续骑线 | 改为**克隆端点** `{x,y,z}`，不再引用 | trace：末端 y=6.5 恒定 25+ 帧，零下沉 ✓ |

> W2 是一个隐蔽的**数据污染** bug（不只是观感）：每次骑线到末端都会改写 `levels.ts` 的 wire 端点，直到刷新页面才复位。液相 `applyPipes` 无此问题，因为 `pointAt` 每次返回新对象。

---

## 2.5 本轮修复（2026-08-14，焰路端点自动通关 + v3 全路复验）（历史）

| # | 症状 | 根因 | 修复 | 验证 |
|---|---|---|---|---|
| W3 | 焰路骑线至终点附近**自动通关**（(0.85,7.91,-0.52) 距门 0.97m），跳过"落地"步骤；与液路（终点距门 1.94m，须切固落地）不一致 | 电线端点 (0.5,8.4,0) 距金门 (0,8.3,0) 仅 0.51m < 1.2m 触发半径 | 端点移到 p6 东缘 (1.5,8.6,-0.5)，距门 1.61m；y 8.4→8.6 对齐液管"台面上方 0.6m"（同时消除切相时脚陷 p6 的 0.2m 重叠） | trace：骑线末端停驻 (1.5,8.6,-0.5) vy=0、phase 仍 `playing`（3 相尘不自动通关）→ 切固 grounded 落地 p6 → 走向门 victory ✓ |

**v3 全路 + 危险逐帧复验（puppeteer，headless Edge）**：

| 项 | 实测 |
|---|---|
| 无相区 hA/hB（全相即死） | 击杀固相 deaths++ ✓ |
| 雷云 hC（只杀气） | 击杀气相 ✓；固相穿云 0 死亡 ✓ |
| 坠落永不致死 | gas 10m 坠落 0 死亡 ✓ |
| 气路巡航悬停（超速阻尼） | 按住 Space vy 8.72→4.0 阻尼回落，s4 采集，无火箭 ✓ |
| 液路流槽 | 全骑乘 + s2 + 终点停驻 ✓ |
| 焰路电线 | 停驻 → 切固落地 → 金门 victory ✓ |
| 金门 | 3/4 相尘 → victory ✓ |

---

## 2.6 本轮修复（2026-08-14，audit round 3 — 固路可达 + 手感 + 危险电报）（历史）

并行 audit（代码 / 可玩性 / 视觉 / 边界）产出 11 项修复，按严重度分级：

| # | 级别 | 症状 | 根因 | 修复 | 验证 |
|---|---|---|---|---|---|
| R3-1 | **critical** | 固路 p5→p6 跳不上去——p5 被 p6 吞没（垂直间隙 0.6m < 玩家高 1.2m），固路实际断在 p5 | p5 在 p6 正下方，p6 底 7.4 < p5 顶 7.2+1.2 | p5 西移（x −4.0..−3.0，与 p4 同 z 对齐）＋ p6 抬高 0.6m（y 8.0..8.3）＋ 固相 MOVE_SPEED 8→5.5（台阶落地台 1m，8 m/s 会冲过头） | trace：p5 站立 ✓ → p6 跳上落顶（feet 8.3）✓ |
| R3-2 | **major** | 暂停/结算会"存时间"——恢复后 dt 追补，玩家瞬移/坠亡 | `App.tsx` 无条件 `acc += dt`，暂停帧也累加 | 只在 `playing`/`layer_intro` 累加 | trace：暂停 2s 恢复 drift=0.000，无时间扭曲 ✓ |
| R3-3 | **major** | 空中跳（二段跳）无法触发——落地前按跳无效 | `canJump` 缺 `jumpsUsed === 1`（第一跳后空中不可再跳） | 加 `jumpsUsed === 1` 条件（固/液/气各一次空中跳，焰无跳） | trace：jumps 0→1→2，第 3 次忽略 ✓ |
| R3-4 | **major** | 结算屏"相尘 4/4"读成累计值，误导 | `VictoryScreen` 用 `totalPhaseDust`（跨局累计） | 改 `phaseDust / 4`（本局） | ✓ |
| R3-5 | **major** | 无相区读成安全灰——与出生金环同色 `#cfcfd4`，玩家误踩 | 危险色 = 安全色 | 无相区 `#cfcfd4`→`#b0556a`（opacity 0.55）；出生金环保留 `#cfcfd4` | 像素分析：无相区 rose/mauve 787px（旧灰 0）✓ |
| R3-6 | **major** | 雷云（只杀气）颜色平淡 `#8f8fa8`、实际跨度大于击杀盒 → 不可见死亡 | 云硬编码 ±1.6 跨度 > 击杀盒 | 云 `#9a6a7c`（opacity 0.6）；blob 分布 clamp 到 `(w−1,h−1,d−1)` | ✓ |
| R3-7 | minor | HUD"坠落 3 次"与新死亡语义不符 | 死亡 = 被吃相（无相区/雷云），非坠落 | 改"被吃相 N 次" | ✓ |
| R3-8 | minor | 重生后 coyote/jumpBuffer 残留 → 落地瞬间误跳 | respawn 未清输入缓冲 | `respawnAtSpawn` 加 `coyote=0`/`jumpBuffer=0` | ✓ |
| R3-9 | minor | 相尘切相后变幽灵，丢失自发光 | `setPhase` 只切 `phaseMat`，相尘无 per-phase 材质 | 每枚相尘建 `current`/`ghost` 两份 toon 材质（自发光保留） | 切相相尘发光不灭 ✓ |
| R3-10 | minor | 玩家身体切相只是改 `.color`，梯度贴图没换 → 相弹颜色脏 | `playerBody.material.color.set` | 改 `material = mats[phase].solid`（换 gradientMap） | ✓ |
| R3-11 | minor | 气相图标冷白与纸色 `#f4f2ea` 分不清 | gas active 色 = 纸色 | 改 `#eef4f8`（冷云白） | ✓ |

另有 3 处代码卫生修复（非 bug）：`applyVents` 硬编码 `* 0.016` → `* dt`（帧率无关）；`setPhase` traverse guard 让流动点（`THREE.Points`）按幽灵处理（原来误当 mesh）；死亡强制相位重置不再触发切相音（`lastPhase` 死亡后同步，非玩家切相）。

**本轮关键判定（p10 不动）**：audit 曾建议把 p10（焰路起点台）改成 plasma 相以增强"焰路专属"，但焰相无跳跃（`JUMP_VELOCITY=0`）且 p10 若变 plasma 实体会挡住地面电线捕获，破坏焰路——故 p10 保持 solid（无害地标）。

---

## 2.7 本轮修复（2026-08-15，v4 polish round 1 — 相灵弹场外残留）

| # | 症状 | 根因 | 修复 | 验证 |
|---|---|---|---|---|
| W4 | 相灵弹飞出场外（塔墙 x/z=±10）仍继续穿行至 ±25，6s 生命期内最多 6-8 枚幽灵弹残留虚空（观感杂物） | `stepBullets` 只按 `BULLET_LIFE` 计时清除，无场界判定；相灵弹无形穿过塔墙后仍在雾中可见 | `constants.ts` 加 `BULLET_STAGE_MARGIN=3`；子弹越过 `hallHalf + margin`（±10）即 splice 清除 | 确定性 trace：em1 弹 x 5→-9.33（t=2.5s，life=3.13）→ x<-10 清除；em2 弹 →x 9.45（t=3.25s，life=2.35）→ x>10 清除。两者均在 life=0 前 ~3s 于场界清除 ✓ |

---

## 3. 资产清单（screenshots/）

### v4 新增资产（当前状态）

| 资产 | 类型 | 内容 |
|---|---|---|
| `v4-01-tab-radial.png` | 截图 | Tab 圆圈四象限菜单（→焰高亮） |
| `v4-02-emitters.png` | 截图 | 相灵眼 + 飞行中子弹 |
| `v4-03a-pool-liquid.png` | 截图 | 相液池未凝固（半透明青） |
| `v4-03b-pool-solidified.png` | 截图 | 相液池凝固成桥（不透明 + 金描边） |
| `v4-04-liquid-swim.png` | 截图 | 液相游泳上浮 |
| `v4-05-victory.png` | 截图 | 结算画面 |
| `gifs/v4-radial.gif` | 动画 | Tab 圆圈切相（呼出→高亮→切换） |
| `gifs/v4-solidify.gif` | 动画 | 固化造路（相液池→桥） |
| `gifs/v4-reflect.gif` | 动画 | 焰相反射子弹拆发射器 |

### v3 历史资产（已被 v4 取代）

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
| `npm run build` | ✅ green（761 KB / gzip 208 KB） |
| dev server 5187 + 浏览器加载 | ✅ 0 console error |
| v3 全路 + 危险逐帧复验（spawn / 固液气焰 4 路 / 3 危险 / 坠落 / 金门） | ✅ 全命中目标状态（见 §2.5） |
| 电线末端停驻 | ✅ (1.5,8.6,-0.5) 恒定 vy=0、无自动通关（W3 修复后） |
| **round 3** 固路 p5→p6 跳上 | ✅ p5 站立 → p6 落顶（feet 8.3） |
| **round 3** 二段跳 | ✅ jumps 0→1→2，第 3 次忽略 |
| **round 3** 暂停时间扭曲 | ✅ 暂停 2s 恢复 drift=0.000 |
| **round 3** 危险电报颜色 | ✅ 无相区 rose/mauve（旧灰 0）；雷云 `#9a6a7c` |

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

### M2 内容完整（F2–F5 落地 ✅，2026-08-15）

全塔 5 层落地：F2 流廊 / F3 息井 / F4 焰网 / F5 相核室 + `advanceLayer`（层间前进，run 级累计 phaseDust/switches/deaths/elapsed 携带）+ `SceneManager.rebuild`（逐层拆除重建四层场景，F1 塔柱只在 F1）+ 层清卡 `LayerClear` / 全塔结算 `VictoryScreen`（20 相尘）。登层机制：金门 → `layer_clear` → Enter/Space → `advanceLayer` → 下一层 `layer_intro`；F5 → `victory`；胜利 R → `restartRun` 回 F1。

| 门 | 结果 |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run build` | ✅ green（58 modules） |
| headless 核心逻辑（esbuild+node 临时脚本） | ✅ 25/25（5 层数据 · advanceLayer 累计携带 · restartRun · checkGate） |
| dev server 5187 + 浏览器端到端 playtest | ⏳ 待补（本次无浏览器桥） |

### 待办里程碑

- [ ] M1 收尾：全键盘 5 分钟剧本手动通关 ×3
- [x] M2 — F2–F5 + 20 相尘 + 结算落地（端到端 playtest 待补）
- [ ] M3 — 相灵 mini-boss + 相位陷阱 + polish loop
- [ ] RC — 60fps 全塔 + 15 分钟首通
