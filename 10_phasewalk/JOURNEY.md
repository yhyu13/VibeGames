# JOURNEY — 四相行者 PHASEWALK 是怎么被做出来的

> 本文回答一个问题：**这个游戏从一句世界观到一段可玩的 demo，走了哪条路、长成了什么样。**
> 读者：所有人（团队 + 未来 agent onboarding + 评审）。这不是设计 doc（那是 `GDD.md` / `TDD.md` / `docs/design/*`），这是它们的**制作全景索引**——一份「我们做了这个，为什么，怎么做的，接下来做什么」的评审稿。
>
> 结构按你要求分四块：
> 1. **核心特性清单**（供评审）
> 2. **概念**（是什么 / 不是什么）
> 3. **逻辑脉络**（主干 / 分支 / 树叶）
> 4. **行动项**（做什么 / 不做什么 / 分别什么结果）

---

## 0. 一句话

**PHASEWALK（四相行者）** 是一个 3D 平台解谜游戏：同一个空间里，固/液/气/等离子**四层同时可见、彼此重叠**。玩家用 **Tab + 圆圈四象限菜单**在四相之间切换（切相 = 换碰撞组 = 换关卡），用**四种独立的移动动词**各自爬塔，用**相灵弹**这套「子弹交互由玩家当前相决定」的系统战斗，最终拼回相核碎片、登上四相塔顶。

一句话卖点：**没有 3D 游戏做过「四层同时可见」的空间阅读**——你同时看见四个世界，只站在其中一个上。

---

## 1. 核心特性清单（供评审）

> 状态标记：✅ = 已 ship 并验证 · 🕐 = 冻结待里程碑 · 🔒 = 数据冻结（类型在、内容空）· M2+ = 路线池（提案，未解冻）

### 1.1 核心机制（命题证明）

| # | 特性 | 一句话 | 状态 |
|---|---|---|---|
| C1 | **四相同现** | 固/液/气/焰四层几何**同时渲染**，当前相 100% alpha + 墨线，幽灵层 15% alpha −40% 饱和度 + 0.15m 视差 | ✅ |
| C2 | **切相** | Tab 按住呼出四象限圆圈菜单（↑气 ↓固 ←液 →焰），松开切换；冷却 0.15s；**纯数据操作**（换碰撞数组，零物理引擎） | ✅ |
| C3 | **相弹** | 空中切相 = 二段跳；**动量守恒**（velocity 不变、重力倍率瞬时换档、零特例） | ✅ |
| C4 | **四种移动动词** | 固=跳(+二段跳) / 液=泳(按住上浮) / 气=飘(按住悬浮) / 焰=爆冲(0.4s 冷却) | ✅ |
| C5 | **物质动词** | 固=固化造路(冻相液池成桥) / 气=穿过(免疫子弹) / 焰=吸收反弹；液=分离 冻结(M2+) | 🟡 3/4 |
| C6 | **相灵弹系统** | 相灵眼发射器射中性慢速子弹；交互由**玩家当前相**决定：固=死 / 液=打散回固 / 气=穿过 / 焰=吸收反弹摧毁发射器 | ✅ |
| C7 | **坠落永不致死** | 地面 y=0 对**所有相**碰撞；死亡只来自 hazard（无相区/雷云）+ 固相中弹；死亡→重生点+相位重置固+相尘保留 | ✅ |
| C8 | **金门胜利** | 相尘 ≥3/4 AND 无存活守层者 → 金门开 → 走近登塔；`layer_clear`/`victory` 由层索引判定 | ✅ |
| C9 | **相位陷阱** | 相锁区(phase_lock: 区内禁切相) + 逆相栅(phase_fence: 只放行本相)；`resolveTraps` 为 `step()` 前置步 | ✅ |
| C10 | **相灵守层者** | 每层守门 boss 眼（石翁/流姬/息童/焰司，F1–F4）追踪开火；焰相反射摧毁才开门（≥3 相尘 AND 无存活守层者）；F5 无 boss | ✅ |

### 1.2 视觉（皮影剪纸·纸叠）

| # | 特性 | 一句话 | 状态 |
|---|---|---|---|
| V1 | Toon 管线 | `MeshToonMaterial` 4 阶 gradientMap + 倒置壳(1.03)轮廓 + 硬投影(2048) | ✅ |
| V2 | 四相调色板 | 固砂岩金 `#f2c57c` / 液湖青 `#2ec4b6` / 气冷云白 `#eef4f8` / 焰电紫 `#b26bff`；**黄色只属于固相** | ✅ |
| V3 | 相位图标 | 固=方■ / 液=圆环◯ / 气=三点∴ / 焰=折线∿（形状编码，色弱可玩） | ✅ |
| V4 | 零资产 | 纸纹/幕布/4 阶 ramp 全部 canvas 程序化生成，仓库无 PNG/WAV | ✅ |
| V5 | 唯一后处理 | 仅 CSS vignette；**无 bloom / 无反射 / 无点光** | ✅ |

### 1.3 音频（Web Audio 合成）

| # | 特性 | 一句话 | 状态 |
|---|---|---|---|
| A1 | 音叉四频 | 切相声 220/330/440/660 Hz = 固/液/气/焰（世界观节奏铁律） | ✅ |
| A2 | 数据驱动 | `sfx.ts` 14 条 recipe（波形/起止频/时长/音量），`AudioManager` 薄合成器，零硬编码音频 | ✅ |
| A3 | 滑音语义 | 上行=获得(收集/反射)，下行=失去(死亡/打散/摧毁) | ✅ |

### 1.4 UI / 输入

| # | 特性 | 一句话 | 状态 |
|---|---|---|---|
| U1 | Tab 径向菜单 | 按住呼出四象限、方向高亮、松开切换；快速切相 Tab+方向近瞬发（保相弹手速） | ✅ |
| U2 | HUD 教学阶梯 | hint 阶梯教四个动词 + 凝桥 + 子弹；HUD 即时显示，首条 hint 限前 30s | ✅ |
| U3 | 固定 3/4 镜头 | `CameraRig` 固定偏移 (7,5.5,8) 指数阻尼跟随，不环绕（塔=柜式 diorama） | ✅ |

### 1.5 关卡（F1 启示厅，唯一已建层）

| # | 特性 | 一句话 | 状态 |
|---|---|---|---|
| L1 | 中央塔 14×14m | 金门在塔顶，四条相路从四侧爬同一座塔汇聚（固=西面石阶 / 液=自由泳 / 气=开放缺口 / 焰=爆冲台+反射） | ✅ |
| L2 | 相液池 | 池1 与东侧无相区 hA 同 x/z 覆盖 → 固化造路就是解 hazard 的桥 | ✅ |
| L3 | 3 发射器 | em1 东侧快弹(1.5s/5mps)、em2 出生点前慢弹(2.8s/3mps)、石翁守层眼(追踪开火) | ✅ |
| L4 | 4 相尘 | 每相 1 颗，相位专属可见/可收集，bobPhase 错开 | ✅ |
| L5 | 3 hazard | 无相区 ×2(全相即死) + 雷云(仅气相，挂在气相尘旁=公平死亡) | ✅ |

### 1.6 工程（怎么做的骨架）

| # | 特性 | 一句话 | 状态 |
|---|---|---|---|
| E1 | C.A.T 架构 | `core/` 平台纯净(零 three/react/zustand/DOM) + `engine/` three 适配 + `components/` React/zustand 覆盖层 | ✅ |
| E2 | 固定 dt 1/60 | `GameSim.step` 单一 reducer，step 顺序 load-bearing（见 §3 主干） | ✅ |
| E3 | 冻结契约 | `types.ts` / `constants.ts` / `levels.ts` 冻结；Record 键强制相位全覆盖（加相即编译错） | ✅ |
| E4 | 零测试框架 | 门 = `tsc --noEmit` 0 error + 浏览器 playtest；dev 端口 5187 strictPort | ✅ |
| E5 | 存档 | `localStorage` 键 `10-phasewalk.v1.progress`，防御式 try/catch | ✅ |
| E6 | Devtools | `window.__sim/__phase/__teleport/__shards/__beginPlay`，仅 DEV | ✅ |
| E7 | 体积 | 761 KB / gzip 208 KB | ✅ |

---

## 2. 概念（是什么 / 不是什么）

### 2.1 是什么（What it is）

- **一个空间阅读游戏**：核心挑战不是反应，是「在四层重叠的同一空间里，读对『哪一层现在对我实心』」。纸叠美术让这个阅读一眼可读（颜色 = 触达性）。
- **一个世界观复刻器**：体验 = 世界观的复刻，不是「玩法 + 世界观皮肤」。玩家在前 5 分钟亲身重演「四相裂变」这个宇宙事件（见 `00-worldview-first.md` 9 事实 + 剧本）。
- **一个纯数据平台解谜**：切相 = 换碰撞数组（无物理引擎、无 Rapier），所以「切相」成本趋近于零，是最便宜的机制、最高的唯一性×成本×偏好乘积（review.md D1/D6）。
- **一个四动词塔爬升器**：四个相是四种**独立（垂直）又互补**的移动/物质动词——每个相回答一个不同问题（造路 / 机动 / 绕行 / 战斗），不是「怎么往上走」×4。

### 2.2 不是什么（What it is NOT）

> 每一条「不是」都是 scope 护栏，防范围蔓延。完整 anti-feature 清单见 `expansion-plan.md` §4。

- **不是 PBR / 光追项目**：明确是 9_3dplatform 的反面——「颜色可读性 > 光照物理」。无 MeshPhysicalMaterial、无光追、无点光、无 bloom。
- **不是 4 个「自动寻路」**：v3 的液=骑管 / 气=乘风 / 焰=沿电线（traverse.ts）已删除——自动寻路零选择零手感，v4 全部改成技能动词。
- **不是「往上走 ×4」**：四相不是四种移动方式的重皮，而是四个互补的问题（造路/机动/绕行/战斗）。
- **不是多人 / 开放世界 / RPG**：共振平台只留本地单人语义；塔+区 = 关卡制；相尘 ≠ 经验，商店只换皮。
- **不是有对白的叙事**：零对白、零 NPC、零过场——世界自己讲故事（叙事纪律 frozen）。
- **不是五个相**：四相 = 世界观边界；「叠相」是组合，不是新相。
- **不是「坠落即死」**：虚空吞噬 = 挫败不是难度（v2 教训），坠落永不致死。

---

## 3. 逻辑脉络（主干 / 分支 / 树叶）

> 整棵树只有一个根：**世界观 9 事实**（`00-worldview-first.md` §1）。每一条机制都要能引用其中一句事实；引不到的，砍掉（一致性审计 Q1）。

### 3.1 主干（Trunk）——一条命题链，从宇宙事件到胜利条件

```
事实①「世界裂成四层」  ──→  玩法命题「4 层同时可见，切相 = 换碰撞组 = 换关卡」
                                    │
       事实④「相弹是裂变的重演」  ──→  交互命题「每个相一个独立移动动词 + 一个物质动词」
                                    │
       事实⑦「四相灵是失职的守卫」 ──→  事件命题「相灵弹：子弹交互由玩家当前相决定」
                                    │
       事实⑤「相尘是相核的碎屑」  ──→  胜利命题「相尘 ≥3/4 且除守层者 → 金门开 → 登塔」
                                    │
       事实⑨「塔是轴心」         ──→  范围命题「塔内才同时可见 → 关卡制，非开放世界」
```

**这条链的 load-bearing 细节**（改任何一处都会塌）：

1. **固定 dt step 顺序**（`GameSim.step`，**不可重排**）：
   `stepPlayer` → `solidifyFluids`（先固化，本帧即可踩）→ `resolveCollisions` → `stepBullets`（中弹死则早退）→ `applyPickups` → `applyHazards` → `checkGate`
2. **相弹动量守恒**（frozen）：velocity 不变、重力倍率瞬时换档、**零特例**——调重力倍率，不加速度乘子。
3. **死亡政策**：地面全相碰撞、坠落永不致死；死亡只 = hazard + 固相中弹；重生=出生点+相位重置固+**相尘保留**（损失 = 旅程，不是收集）。

### 3.2 分支（Branch）——每条命题分叉成子系统

| 命题 | 分叉出的分支 | 落点文件 |
|---|---|---|
| 玩法命题 | 移动动词分支（4 相） | `core/simulation/phasePhysics.ts` |
| 玩法命题 | 碰撞分支（按相过滤 + 凝桥 + 大厅边界） | `core/simulation/collision.ts` |
| 事件命题 | 子弹交互分支（4 相反应） | `core/simulation/bullets.ts` |
| 胜利命题 | 收集/死亡/门分支 | `core/simulation/pickups.ts` |
| — | 编排分支（单一 reducer） | `core/simulation/GameSim.ts` |
| 视觉 | Toon 纸叠分支 | `engine/ToonRenderer.ts` + `SceneManager.ts` + `PaperFX.ts` |
| 输入 | Tab 径向分支 | `engine/InputManager.ts` + `components/RadialMenu.tsx` |
| 音频 | 音叉合成分支 | `core/data/sfx.ts` + `engine/AudioManager.ts` |
| 关卡 | F1–F5 内容分支 | `core/data/levels.ts` |
| 外壳 | React 循环分支 | `App.tsx` + `store.ts` + `components/*` |

### 3.3 树叶（Leaf）——具体落点（文件 / 常量 / 值）

> 树叶 = 分支长出来的具体可改参数。**改树叶不改树干**：调一个数字可以，加一个相不行（会编译错，设计上故意如此）。

**移动动词树叶**（`constants.ts`，`Record<PhaseId, number>` 强制全覆盖）：

| 相 | 重力倍率 | 移速 | 跳速 | 关键常量 |
|---|---|---|---|---|
| 固 solid | 1.0 | 5.5 | 11（二段跳） | — |
| 液 liquid | 0.6 | 6 | 0 | `LIQUID_SWIM_ACCEL=8`、`MAX_VY=5`、`MAX_FALL=4` |
| 气 gas | 0.18 | 6.5 | 0 | `GAS_HOVER_ACCEL=11`、`MAX_VY=4`、`MAX_FALL=3` |
| 焰 plasma | 0.9 | 8 | 0 | `PLASMA_BURST_VY=12`、`BURST_H=8`、`BURST_COOLDOWN=0.4` |

**物质动词树叶**：`SOLIDIFY_RADIUS=1.6`（固化造路）· `BULLET_RADIUS=0.28`、`BULLET_REFLECT_SPEED=16`、`BULLET_LIFE=6`（相灵弹）· `GATE_OPEN_SHARDS=3`（金门）。

**相位陷阱树叶**：`traps: Trap[]`（`phase_lock`/`phase_fence`，AABB min/max）· `resolveTraps`（相锁区取消 `switchPhase` 请求）+ `isPhaseLocked`（HUD）· 逆相栅在 `collision.ts` 按 `t.phase !== player.phase` 门控。

**守层者树叶**：`Emitter.boss?: boolean`（追踪开火 `aim:'player'`）· `gateOpen()` = ≥3 相尘 AND 无存活 boss · boss 眼渲染猩红（`#3c1f2a` 体 + `#e5534b` 虹膜）· HUD「守层者还在守门」。

**通用树叶**：`PHASE_SWITCH_COOLDOWN=0.15` · `COYOTE_TIME=0.10` · `JUMP_BUFFER_TIME=0.12` · `MAX_FALL_SPEED=25` · `PLAYER_RADIUS=0.35` · `PLAYER_HALF_HEIGHT=0.6`。

**视觉树叶**：`PHASE_PALETTE`（每相 5 色）· `GHOST_PARALLAX=0.15` · `GHOST_RENDER_RADIUS=8` · `REVEAL_DURATION=0.3` · `RAMP_STEPS=4` · `OUTLINE_SCALE=1.03`。

**音频树叶**：`PHASE_FREQ` 220/330/440/660 Hz。

**关卡树叶**（`levels.ts` F1–F5，每层 4 相尘 = 20 总，3/4 开门）：F1 启示厅（固=西面石阶跳 + 凝池成桥，3 发射器含石翁，3 hazard）· F2 流廊（液=断口上浮，2 发射器含流姬，2 hazard）· F3 息井（气=无阶竖井飘，3 发射器含息童，2 hazard）· F4 焰网（焰=爆冲反射拆 4 发射器含焰司，1 hazard）· F5 相核室（4 连切收官，1 发射器，2 hazard）。

---

## 4. 行动项（做什么 / 不做什么 / 分别什么结果）

### 4.1 做什么（Do）—— 当前里程碑行动项

> 原则：**每步只扩 1 个维度**（intro-scene-until-perfect）。先塔内完美，再塔外世界。

| 行动项 | 内容 | 结果（验收） |
|---|---|---|
| **M1 垂直切片** ✅ | F1–F2 可玩（固/液 + 切相 + 相弹）+ toon 管线 + 展位级 HUD | tsc 0 error · 双相切换 playtest 0 晕 · F2 断口 ≤2 次死亡 |
| **M2 内容完整** ✅（2026-08-15 落地） | F3–F5（气/焰/4 连切）+ 20 相尘 + 菜单/暂停/结算 + 存档 + 音频 + 粒子 | 全塔 5 层端到端 0 console error · 4 连切 ≤2 死（playtest 待补） |
| **M3 敌人与打磨**（当前） | 相位陷阱 ✅ + 相灵守层者 ×4 ✅（石翁/流姬/息童/焰司，2026-08-15）+ polish loop | 每层 boss 有独立教学 · 「完美」4 维全勾 |
| **RC** | 全流程打磨 + 平衡 + 更新 verification-report | 60fps · 新手 15 分钟通关 |
| **Polish loop（无限）** | 观察→找问题→改→验证→再观察 | 停止条件 = **用户说停** |

### 4.2 不做什么（Don't）—— 反特性 + 结果

> 每一条「不做」都有一个「如果做了会怎样」的结果，写清楚是为了防止未来某个 agent 把它「顺手加回来」。

| 不做什么 | 为什么 | 如果做了 → 结果 |
|---|---|---|
| ❌ 不回到自动寻路（骑管/乘风/沿电线） | 零选择零手感，四相沦为「往上走 ×4」 | v3 重做的原始动机复辟；四相互补命题破产 |
| ❌ 不做多人 / 开放世界 / 无缝 | 塔+区 = 关卡制；共振平台只留单人语义 | 范围爆炸，intro scene 永远 ship 不完 |
| ❌ 不做数值成长 / 装备 | 相尘 ≠ 经验；商店只换皮 | 机制被 RPG 数值稀释，核心「空间阅读」失焦 |
| ❌ 不做语音 / 大量对白 | 叙事纪律 frozen（世界自己讲故事） | 破坏「静滞 = 叙事」的出生点设计 |
| ❌ 不做第 5 相 | 四相 = 世界观边界 | 加相即编译错（Record 全覆盖守卫），且「叠相」已定义为组合 |
| ❌ 不做 bloom / 反射 / 点光 / Sobel 主轮廓 | 皮影纸叠 = 平涂 + 墨线 | 相位色被材质细节淹没（review S/W① 致命风险复活） |
| ❌ 不加速度乘子调相弹 | 相弹动量守恒是宇宙法不是游戏规则 | 直觉破坏，空中手感漂移 |
| ❌ 不做坠落致死 | 虚空吞噬 = 挫败不是难度（v2 教训） | 玩家被无意义惩罚打断「启示节奏」 |

### 4.3 优先级裁定规则（冲突时怎么砍）

当一个扩展项与当前里程碑冲突，按此顺序砍（`expansion-plan.md` §5）：

1. 不影响「4 层同时可见」命题的**装饰项**先砍
2. **新相 > 新机制 > 新敌人 > 新皮肤**（新相最难，M2+ 前禁止）
3. 每个里程碑只允许引入 **1 个新动词**（M1=切相，M2=相弹精通，M3=对抗式切相）

---

## 附录 A. 制作方法速查（怎么被做出来的五步）

| 步骤 | 动作 | 产出 |
|---|---|---|
| 1 概念评审 | `docs/review.md` Phase B 诚实评估 → GO | D1–D6 六决策 + 晋升条件 |
| 2 世界观先行 | `00-worldview-first.md` 9 事实 + 5 分钟剧本 | 唯一事实源 |
| 3 三件套 doc | `GDD.md` / `TDD.md` / `01-art-direction.md` | 设计/代码/美术 |
| 4 C.A.T 分层实现 | core(纯净) → engine(three) → components(React) | 可玩 demo |
| 5 验证 + polish loop | tsc 0 error + playtest + 截图/GIF + 无限打磨 | `verification-report.md` |

## 附录 B. 已知 doc drift（诚实清单）

> 这些是**当前已知的文档不一致**，不是 bug，但下次改动前要先修：

1. `docs/review.md` 描述的是 v0.1（无敌人）；v4 已解冻「无敌人」引入相灵眼发射器/子弹。

> **本次 commit 已修**（2026-08-15 polish round 2）：分离动词全域 demote（GDD/03/TDD/verification-report 原写「液=分离过窄缝」但类型/关卡/碰撞零实现，现标注冻结 M2+）；HUD「前 45s 不显示」改为「即时显示」（代码自 v4 起即时渲染 HUD）；`TDD.md` §3 纯 sim API 块重写为真实签名（`createInitialState(layerIndex,bestSwitches,totalPhaseDust)` / `step` / `stepPlayer` / `restartLayer` / `beginPlay` / `forcePhase`，删 `switchPhase`/`layerCleared`/`toVictory`）；§4 audio 配方更新为真实 14 条（删 wire/vent/layer-clear，加 death/clear/reflect/disperse/destroy/solidify/jump/burst/land/shot）；§2 树补 `RadialMenu.tsx` + devtools 真实 globals；`AGENTS.md` 删 `switchPhase()`。

> 结论：**核心代码与 v4 设计完全一致**（tsc 0 error、build green、17+6 playtest 全过），剩余 drift 集中在「讲述 v0.1 旧事的 review.md」。

---

*整理：Claude（执行）+ Mavis（评审）· 版本 v1（2026-08-15）· 事实来源 = 5 片 gather（core/data/engine/ui/docs）*
