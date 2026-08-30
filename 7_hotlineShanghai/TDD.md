# Hotline Shanghai / 热线上海 — Technical Design Document (TDD) v3.7

> **版本声明(2026-08-30 对齐)**:头部版本号与 `AGENTS.md` 统一为 v3.7。注意:正文部分章节仍是 v2 文本,正文与代码/验证门冲突时**以已验证代码与 `JOURNEY.md:303` 门禁结果为准**,v4 将按 contract-from-code 从代码反向重推(见 `GAME-SOP.md` §8)。

> **本文档是冻结的工程契约(Frozen Contract)**:所有 coder / agent 必须按本文件实现。
> **接口签名、状态机、默认数值一律以本文件为准**。与本文件冲突的实现视为 bug。
> **设计层权威**:`GDD.md`(下文简称 GDD)+ `docs/design/01..04-*.md`(01 + 04 已同步 v2)。
> **变更规则**:v2 起,§5(契约速写)与 §4(FSM / 数据表)中的签名、状态名、默认数值不得擅自修改;需要调整时必须:① 更新本变更日志;② 通知全部 agent 重读本文件;③ 提交一个独立 commit 标注 `[TDD-CONTRACT-CHANGE]`。

---

## 0. 封面与变更日志(Cover & Change Log)

| 项 | 值 |
|---|---|
| 游戏名 | Hotline Shanghai / 热线上海 |
| 团队 | VibeGames(KIMI3 DDD 多代理工作流) |
| 文档角色 | 技术设计 / 契约所有者(Technical Design / Contracts Owner) |
| 引擎 | intro:Canvas2D `SceneManager` source + 专用 `RcPresenter` + 原生 WebGL2 `RcPipeline` |
| 平台 | Web(桌面 Chrome / Edge 优先;1080p 预算) |
| 周期 | M0→M4(共 4 周,非 72h jam) |
| 端口 | **5184**(4_chunbai=3000, 5_gamejam_1=5173, 6_patapong3D=5183,本项目独占 5184) |
| 状态 | v3 重冻结(2026-08-09,重置裁决;v2 正文保留,v3 覆盖见 §0.1) |

| 版本 | 日期 | 作者 | 变更摘要 |
|------|------|------|----------|
| v1 | 2026-08-08 | Mavis (设计阶段) | 初稿:冻结 C.A.T 架构、2D RC 管线契约、FSM、契约速写、Agent 拆分、性能预算 |
| v2 | 2026-08-08 | Mavis (设计阶段) | ① 操作契约加入 **F 切换近战/远程**(§4.5.1)与 **E 长按投掷**;② 武器 8→35 / 面具 6→25 铺量路线(§4.6 扩展表);③ RC 管线按 `radiance-cascades-demo` 真实算法冻结:JFA pass 数 = `log2(min(W,H))`、probe 数学(`spacing=sqrt(baseRayCount^index)`、`rayCount=baseRayCount^(index+1)`、interval 幂级数)、`uPropagationRate`/`uMixFactor` 调参项(§4.4.6/§15);④ 背景对齐淞沪会战 / 血战上海滩(GDD §2);⑤ 契约速写增补 `Mode`/`WeaponMode`/`throwWeapon`/`toggleMode` 输入 |
| v2-cut | 2026-08-08 | Kilo + Mavis (评审) | 瘦身提升到根目录(2026-08-08 Q1-Q5 裁决):**空手 LMB = 拳头(1 击)、投掷唯一入口 = E 长按 0.25s**(§5.1 注,R16);GDD 去双写(数值唯一真相源 = 本文件);本文件自 `v2/TDD.md` 提升;docs/design 01+04 已同步 v2 |
| v1.1 | 2026-08-08 | Mavis (对照 HM 真机) | **[TDD-CONTRACT-CHANGE] 视觉契约 v1.1**(对照 32 张 HM 真机截图,见 `references/hotline-miami-screenshots/`):① viewport 44×28u → **32×18u**(1080p 下 60 像素/tile,匹配 HM 真机比例);② `PLAYER_BOUND` ±22/±14 → **±16/±9**(随 viewport);③ 调色板推更饱和(HM 80% + 上海 20%):`PAL_LANTERN` #c8421c→**#e54a1a**、`PAL_NEON` #9c2c2c→**#ff2a44**、`PAL_BLOOD` #a02020→**#d8201a**,另增 10 个 HM-借鉴色(条带紫/青/粉、砖块墙、霓虹青等,§4.4.8);④ `RoomLayout` 增 4 个**可选**字段:`floorPalette?` / `wallPattern?` / `furniture?` / `decorativeLights?`(§5.1,旧房间数据零迁移);⑤ 新增常量 `VIEWPORT_W/H`、`TILE_PIXELS=60`、`STRIPE_HEIGHT=2` 与 `FurnitureKind`(§4.4.8);⑥ 核心差异点表述更新:"HM 平涂基底 + 1937 题材 + RC 现代层"(§2) |
| final-intro | 2026-08-09 | self-play polish | 用户明确扩展 scope：“self play review until polished work until done”。P5/P6/P7 完成且仅在已验证处标记完成：确定性 flashlight sweep、0.4s warning、death/retry、lit block/dark OHK、mission score/replay、HUD trim；`intro-polish:check`、`combat-loop:check`、`e2e:playtest` 为最终门。RC 权威固定为 one-cascade visual-only；`GeometricLightField` 独占 gameplay 判定。最终截图见 `smoke/hotline-e2e-*.png`。 |
| v1.2 | 2026-08-08 | Codex (实机 bugfix 批) | **[TDD-CONTRACT-CHANGE] 实机修复入档**:① 独立 `MISSION_BRIEF_IN` 阶段已删除(D4:简报并入 MASK_SELECT intro,§4.3 图例以本行为准);② `SimEvent.playerKilled` 增 `cause: DeathCause`(§5.1);③ `SimSnapshot` 增 `paused: boolean`(Tab 暂停,B04);④ 新增常量 `ROOM_START_GRACE_S=1.0`(B01 出生宽限)、`THROWN_PICKUP_DELAY_S=0.5`(B23 投掷物拾取封锁)、`EXIT_REACH_RADIUS=1.2`(B03 走门切房);⑤ §4.4.7 muzzle_flash/explosion → `#ffaa3a`、blood_splash → `#d8201a`(对齐 v1.1 调色板);⑥ tileMap 碰撞/子弹遮挡/视线遮挡正式接入 Simulation(B02,§4.1 机制映射) |
| v3 | 2026-08-09 | Codex (评审入档) | **[TDD-CONTRACT-CHANGE] 重置回冻结(v3)** — 触发 = 2026-08-09 用户判决"视觉 clunky + 移动失效"(B33,关卡/场景/移动已归档 `_archive-2026-08-09/`):① viewport 语义改为**像素锚定**(默认 1920×1080、tile 基准 48px、相机始终容纳房间;v1.1 的 32×18u/60px 契约覆盖);② 新增光暗机制:`SHADOW_SHOT_MISS=true`(阴影中敌弹落空 / 灯下必中)+ `ENEMY_AIM_TELEGRAPH_S=0.4`(OHK 可读性);③ `MODE_SWITCH_DURATION` 0.15s → **0s**;④ 死亡清空武器/弹药/面具/击杀数(B14 定稿);⑤ 任务 v1 = 2(`m1_workshop` + `m4_postman`),m2/m3 砍;⑥ M1 评分 = 通过/失败,S/A/B/C 后置;⑦ RC 里程碑改"先无 RC 基线 → 单级 final-pass → cascade M2 优化"(6 阶段仍是最终形态);⑧ M1 范围 = 1 房间/knife/1 敌人/油灯+霓虹/0 面具/0 任务 UI;⑨ 输入手感预算 4-5 天,禁止"2-3 天做手感"式排期。覆盖条目以 §0.1 为准 |
| v3.1 | 2026-08-09 | Codex (BLINDSIDE 整合入档) | **[TDD-CONTRACT-CHANGE] BLINDSIDE×HS 整合(v3.1)** — 权威规范 = [docs/design/09-blindside-integration.md](docs/design/09-blindside-integration.md);B29 #1 全量采纳:① §4.4.1 玩家表追加 14 个光暗/拆灯常量(`LIGHT_SHIELD_THRESHOLD=0.30` / `LIGHT_EXPOSED_THRESHOLD=0.10` / `BREAKABLE_LIGHT_HP=2` / `LIGHT_POOL_DOWN_S=0.1` / `LAMP_FLICKER_HZ=12` / `FLASH_RADIUS=0.4u` / `FLASH_DURATION=0.5s` / `FORTUNETELLER_FAKE_LIGHT=1` / `FORTUNETELLER_DARKNESS_S=0.3s` / `SHADOW_SHOT_MISS=true` / `ENEMY_AIM_TELEGRAPH_S=0.4` / `AIMFOCUS_PUSH_DIST=0.4u` / `LMB_LIGHT_PRIORITY_RANGE=2.0u`);② §4.4.3 面具 6→9,新增 `lampmaker` / `darkwatch` / `fortuneteller`(v3 增强 `righteous` / `dancer` / `waiter` 的光暗子项);③ §4.4.4 敌人表追加 `FLASHLIGHT_CONE_ARC_DEG=50` / `FLASHLIGHT_SWEEP_HZ=0.6` + `ENEMY_INVULN_WHILE_LIT=true`;④ §4.4.7 光源 5 静态里 3 个(`oil_lamp`/`neon_sign`/`searchlight`)加 `breakable=true / hp=2`,`surgical`/`disco` 剧情用 = false;⑤ §4.5.3 玩家模式切换保持 0s 瞬时;⑥ **新增 §4.5.4 LMB 优先级 + §4.5.5 敌人 FSM + INVULNERABLE 强制检查**;⑦ **新增 §4.6 光暗反制层**(`LightField` 接口 / `LightSource` 类型 / 5 个动作动词 / `tryDamageEnemy` / CPU-side cache / BOSS 改造 / 评分加成);⑧ **新增 §4.7 决策点 D1-D8** 待 M1.0 spike 实证;⑨ §3.5 性能预算加 `lightField.update 0.2ms`;⑩ §3.6 降级路径加 cascade=0 → 屏蔽 lightSmash + 停电动画硬底(C8 决策);⑪ §8.2 重切:插入 **M1.0 BLINDSIDE spike 3 天**(2026-08-09 起,作为 M1.1 前置) |
| v3.2 | 2026-08-09 | Mavis (zone-based 美术方向入档) | **[TDD-CONTRACT-CHANGE] 民国蒸汽波 + 4 atmospheric zones**(02 §0.6 / §3.1 / §10.5 锁定):① §4.4.8 末尾新增 **Zone palette 子节** — 4 zone × 4 字段 = `ZONE_PALETTES: Record<ZoneId, ZonePalette>` + `ZoneId` 枚举('bund'/'concession'/'lilong'/'creek')+ `ZonePalette` 类型(primary/secondary/ambient/cascadeCount/decayMul);② §5.1 `RoomLayout` 增 `zone?: ZoneId` 可选字段(**默认 'lilong'**,旧房间数据零迁移);③ §3.5 性能预算按 zone 区分 cascade 数:**lilong=1 / bund=2 / concession=3 / creek=3+雾衰减**;④ §3.6 降级路径新增 `zone='lilong'` 时 cascade=0 退化到 cascade=1(不归零,保最简 case 可玩);⑤ §4.4.7 光源与 zone 关系:`oil_lamp` 默认绑定 `lilong` / `neon_sign` 默认绑定 `bund` / `searchlight` 默认绑定 `creek`,可在 `RoomLayout.decorativeLights[]` 显式 override;⑥ 与 v3.1 BLINDSIDE 兼容:`LightField` 与 `ZonePalette` 正交(zone 染色 = RC cascade tint,LightField = 玩家视野判定);⑦ M1 范围仍 = 1 房间/knife/1 敌人/lilong 油灯/0 面具/0 任务 UI(zone=lilong 1 zone 1 cascade,与 v3 不冲突)。覆盖条目以 §0.2 为准 |
| v3.7 | 2026-08-10 | Codex (tower-compound review remediation) | **[TDD-CONTRACT-CHANGE] 正式采纳连接式哨塔大院与生产 RC profile**:① M1 运行范围 = `m1_tower_compound` 单房 / 3 地面巡逻 + 1 静态哨塔守卫 / 中央电源油灯 + 探照灯 / southeast exit;② 新增结构化 `EnemySpawn`,`RoomLayout.enemySpawns: EnemySpawn[]`,敌人增加 `role` / `patrolAxis` / `patrolLength`;③ 静态哨塔守卫在 patrol/suspicious/alert/engaging 全状态位置不变,断电后仅允许旋转/警觉;④ 生产 RC = 3 cascades / `baseIntervalPx=6` / `resolutionScale=0.5` / `twoLoop=true`,intro 每帧关闭 dither;⑤ 敌人视锥 RC emission 与玩家随身暖光均 visual-only,几何 LOS/LightField 继续独占 gameplay authority。正式 contract-change commit 前仍须依 23-signoff-protocol 取得项目所有者签核。 |

---

### 0.1 v3 契约覆盖(2026-08-09)

> 2026-08-09 B33 重置触发设计重判(GDD §0.5)。下表覆盖 v2 正文对应条目;**与下表冲突的 v2 数值以本表为准**。

| 条目 | v2 | v3 |
|------|----|----|
| viewport | `VIEWPORT_W=32` / `VIEWPORT_H=18` / `TILE_PIXELS=60`(tile 数 = 视口) | **像素锚定**:默认 1920×1080 原生,tile 基准 `TILE_PIXELS=48`,房间以 tile 设计,相机始终容纳整个房间(不露 void);`PLAYER_BOUND` 由相机/房间推导,不再固定 ±16/±9 |
| 光暗机制 | RC = 视觉层 | **机制**:`SHADOW_SHOT_MISS=true` —— 玩家完全在阴影中时敌弹 100% 落空,灯下敌弹必中;新增 `ENEMY_AIM_TELEGRAPH_S=0.4`(敌人开火前 0.4s 瞄准提示,HM "!") |
| F 切换 | `MODE_SWITCH_DURATION=0.15s` | **0s**(瞬时切换,节奏靠音效;R13 覆盖) |
| 死亡 | 任务进度 / 拾取保留 | **清空武器 / 弹药 / 面具 / 击杀数**,从任务 Room 1 重开(B14 定稿) |
| 任务 | 4 个(含隐藏) | **2 个**:`m1_workshop` + `m4_postman`;`m2_teahouse` / `m3_print` 砍;孤岛邮差解锁 = 任务 1 通关 |
| 评分 | S/A/B/C | M1 = 通过/失败;S/A/B/C 后置 M2+ 再入契约 |
| RC 里程碑 | M1 直接上 6 阶段全管线 | **先 ship 无 RC 基线(纯 base color)→ 单级 final-pass(油灯+霓虹+枪火)→ cascade 3 级 = M2 性能目标**;§3.6 降级梯保留 |
| M1 范围 | 1 房 + RC 全管线 + F 切换 + HUD | **v3.7 最终运行范围**:1 个连接式 `m1_tower_compound` / 3 地面巡逻 + 1 静态哨塔守卫 / 中央电源油灯 + 探照灯 / knife + C96 射击 + 掷枪 / southeast exit / score+replay；0 面具 / 0 任务选择 UI |
| 输入手感预算 | M1.1 2-3 天 | **4-5 天**;移动/瞄准手感是 M1 主交付,不得用"F 切换硬直"式排期充数 |

### 0.2 v3.2 契约覆盖(2026-08-09)

> 2026-08-09 02 v1.2 锁定 4 atmospheric zones 触发本节。下表覆盖 §4.4.8 调色板 / §5.1 RoomLayout / §3.5 性能预算 / §3.6 降级路径 对应条目;**与下表冲突的 v3 / v3.1 数值以本表为准,但 v3.1 的 14 个光暗常量与 LightField 机制完全保留**。
> 核心设计:Zone palette = **RC cascade 染色 + 衰减曲线** = 视觉签名;LightField(v3.1) = 玩家/敌人视野判定 = 机制层。两者**正交**,不互相覆盖。

| 条目 | v3.1 | v3.2 |
|------|------|------|
| 调色板体系 | 单一 PAL_* 12 + HM-借鉴 10 = 22 色,跨场景通用 | **保留 22 色作为通用基底 + 新增 4 zone palette 子表**(每个 zone = primary/secondary/ambient/cascadeCount/decayMul) |
| `RoomLayout.zone?` | 不存在 | **新增可选字段**;缺省 = `'lilong'`(M1 默认);同 mission 房间必须同 zone(防视觉撕裂,02 §0.7) |
| RC cascade 数 | 固定 6 阶段(全管线) | **v3.7 生产 intro 覆盖**:`m1_tower_compound=3`；历史 zone 值保留为未来内容基线，不再控制当前 intro |
| 性能预算 | 1080p@60fps 固定 | **按 zone 动态预算**:`lilong 1 cascade` ≈ 0.3ms / `concession 3 cascade` ≈ 1.0ms;总预算仍 16ms/帧 |
| 降级路径 | cascade=0 → 屏蔽 lightSmash | **新增 zone-aware 退化**:`lilong` 时 cascade 不可归零(最低 1),保"漆黑+1 灯笼"可玩;`bund/concession/creek` cascade=0 同 v3.1 行为 |
| 光源默认绑定 | light kind 独立 | **`oil_lamp`↔lilong / `neon_sign`↔bund / `searchlight`↔creek / `disco`↔bund / `surgical`↔concession**,可在 `RoomLayout.decorativeLights[]` 显式 override;override 不破坏 zone 调色(光源色保留,只换 zone) |
| M1 范围 | 1 房/knife/1 敌/油灯+霓虹 | **v3.7 覆盖**:`m1_tower_compound` 单房 + 3 ground patrols + 1 static tower guard + power lamp/searchlight；生产 intro 固定 3 cascades、半分辨率 RC work buffers；所有 v3.1 光暗常量继续生效 |

> **不覆盖**:v3.1 全部 14 个光暗常量(`LIGHT_SHIELD_THRESHOLD` 等)、`LightField` 接口、`SHADOW_SHOT_MISS=true`、`ENEMY_INVULN_WHILE_LIT=true`、`AIMFOCUS_PUSH_DIST=0.4u`、面具表 9 项、敌人表、§4.5.5 FSM、§4.7 D1-D8 决策点。

---

## 1. 目录(Table of Contents)

- §0 封面与变更日志
- §1 目录
- §2 引言(目的 / 技术目标 / 目标平台 / 外部工具 / 团队角色 / 时间线 / 设计层对账与裁决)
- §3 技术总览(命名规范 / 技术栈表 / 数据布局 / DEV 钩子 / 性能预算 / 风险降级)
- §4 游戏机制即架构(机制→模块映射 / 主循环 / 全局 FSM 规格 / 状态转移表 / 默认数值表 / RC 管线规格)
- §5 契约速写(**冻结**,真实 TS)
- §6 模块文件树(完整 src/ 布局)
- §7 每 Tick 数据流
- §8 构建创建(里程碑 M1/M2/M3/M4 + 验收标准)
- §9 资源管理与文件格式
- §10 分支政策
- §11 工具指令
- §12 风险登记册
- §13 验证计划
- §14 代理任务拆分(原子级,文件所有权白名单)
- §15 2D RC 管线契约(本项目最重模块,独立章节,按 demo 真实算法)

---

## 2. 引言(Introduction)

### 2.1 目的(Purpose)

玩家扮演 1937 上海淞沪会战 / 孤岛期地下抵抗组织的一名"线人",接电话 → 进入房间 → 用一击必杀的节奏清除占领军 / 伪警 / 特务 → 拿面具 → 下一任务。整局 3-5 分钟,纯前端,零资产文件。**整局所有灯光 = 真实 2D Radiance Cascades 全管线**(prepscene → JFA → distfield → cascade probes → final composite),不是 fake additive。RC 让枪火 / 油灯 / 霓虹 / 爆炸都是真实软阴影光源,1937 弄堂的"灯下黑"质感是本项目核心辨识度。

### 2.2 技术目标(Technical Goals)

1. **C.A.T 硬规则**:`core/` 平台纯净(零 THREE / 零 DOM / 零 zustand 导入),side effect 只以 `SimEvent` 类型事件泄漏;`engine/` 是平台适配层,包含 WebGL2 RC 管线。
2. **2D RC 必须是真实全管线**:6 阶段(prepscene → prepjfa → JFA → distfield → cascade → final)+ dither 回压,probe 数学与 `radiance-cascades-demo` 对齐(§15),不是单 pass additive。
3. **60 FPS @ 1080p 稳定**(预算见 §3.5),低端集显可跑(降级路径降 cascade 数 / 降分辨率 / 关 RC)。
4. **资产边界**:用户批准的唯一运行时 PNG 例外是 intro curated set。权威批准 manifest=`references/sprite-samples/approved-intro-assets.json`，处理器=`scripts/process-intro-sprites.mjs`；输出限定 `public/sprites/intro/` 与生成的 `src/engine/sprites/intro-manifest.ts`。其余 sprite、全部音频与地图仍按程序化合同。
5. **一击必杀 + 任务式 + 面具系统 + F 切换武器模式** 全部按 Hotline Miami 范式工作。
6. **DEV 可观测性**:`window.__gameManifest()`(世界即文本)+ `window.__sim`(Simulation 实例只读)+ `window.__rcPipeline`(RC 管线状态只读)。
7. **降级路径自动化**:frame time watchdog 检测到持续超标时,自动降级 RC(§3.6)。

### 2.3 目标平台(Target Platform)

| 项 | 最低 | 推荐 |
|---|---|---|
| 硬件 | 2018+ 集显笔记本 | 独显 / 近五年台式 |
| 浏览器 | Chrome / Edge 108+(WebGL2、`EXT_color_buffer_float` 可选) | Chrome 120+ |
| 分辨率 | 1280×720(降级后) | 1920×1080(预算基准) |
| Node(构建期) | ≥ 18(Vite 6 下限) | 20.19+ / 22 LTS |

### 2.4 外部工具与团队角色(External Tools & Roles)

| 工具 | 用途 | 角色 |
|---|---|---|
| Vite 6 + React 19 | 构建 / HMR / dev server 5184 | agent-ui |
| Three.js 0.170 | 渲染器 / EffectComposer / 着色器基座 | agent-engine |
| 原生 WebGL2 framebuffer | RC 管线的 pass 编排 | agent-engine |
| Web Audio API | 全部音频合成(零文件) | agent-audio |
| zustand 5 | UI 状态(仅 UI) | agent-ui |
| Tailwind 3.4 | HUD/菜单样式 | agent-ui |
| Tweakpane(**可选,仅 DEV**) | RC 参数调参;不写进生产 import 图 | agent-engine |

团队:agent-core(纯核心)/ agent-engine(渲染 + RC 管线 / 最大头)/ agent-audio(音频适配)/ agent-ui(UI 覆盖层)/ agent-qa(集成验证,无文件所有权)。

### 2.5 时间线(M0→M4 Timeline)

| 阶段 | 周期 | 交付 | 签核人 |
|---|---|---|---|
| M0 | 2026-08-08 | GDD v2 / TDD v2 / 项目骨架(`tsc -b` 0 error) | agent-qa + 用户 |
| M1 | M0 后 1 周 | 1 房间 + 1 任务 + 走位 + F 切换 + 开火 + RC 全管线(单房间验证) | agent-qa + 用户 |
| M2 | M1 后 1 周 | 任务 1 全部 3 房间 + BOSS + 评分 + 面具解锁 | agent-qa + 用户 |
| M3 | M2 后 1 周 | 任务 2-4 + 隐藏 + 标题 / 选择 / 死亡流程 | agent-qa + 用户 |
| M4 | M3 后 1 周 | RC 性能调优 / Web Audio 调音 / 浏览器冒烟 + 部署 | agent-qa + 用户 |

### 2.6 设计层对账与裁决(Reconciliation & Adjudication)

设计文档共 4 份:`docs/design/01-concept-core-loop.md`(核心循环与数值)、`02-art-direction.md`(美术)、`03-audio-direction.md`(音频)、`04-radiance-cascades-pipeline.md`(RC 管线),其中 01 + 04 为设计层权威(01 = 游戏层,04 = 渲染层)。GDD v2 §0-§11 数值全部纳入 §4.4 冻结默认表。

| # | 冲突点 | 裁决(技术负责) |
|---|---|---|
| R01 | GDD §4.1 移动加速度 60 / 目标速度 8 | **冻结**:60 / 8(§4.4) |
| R02 | GDD §4.2 一击必杀 | **冻结**:玩家一击毙命 + 任务 BOSS 3 击(§4.4 `BOSS_HITS`) |
| R03 | GDD §4.3 武器 v1 8 件(铺 35) | **冻结**:8(§4.4);扩展表 35 件走 M2+ 里程碑 |
| R04 | GDD §4.4 面具 v1 6 个(铺 25) | **冻结**:6(§4.4);扩展表 25 个走 M2+ 里程碑 |
| R05 | GDD §4.5 敌人视野 8u 锥 60° | **冻结**:8u / 60°(§4.4) |
| R06 | GDD §5.1 RC 光源 8 类 | **冻结**:8 类(§4.4);每类签名在 `core/data/lights.ts` |
| R07 | GDD §5.2 RC cascade 数 = 3 | **冻结**:3 cascades(§4.4);probe 数学按 demo |
| R08 | GDD §5.4 RC 性能预算 | **冻结**:6ms / 8ms(§3.5 + §4.4) |
| R09 | GDD §6.3 任务清单 4 件 | **冻结**:4(任务 4 隐藏) |
| R10 | 端口 | **5184**(本项目独占) |
| R11 | 一击必杀 + 翻滚无敌 0.4s | **冻结**:0.4s(§4.4) |
| R12 | 评分 S/A/B/C | **冻结**:基于"完成时间 + 拾取率 + 受弹数"(§4.4 `MissionScore`) |
| R13 | **F 切换近战/远程(硬直 0.15s)** | **冻结**:0.15s(§4.4 `MODE_SWITCH_DURATION`);手感触手可调走 `[TDD-CONTRACT-CHANGE]` |
| R14 | **E 长按投掷当前武器** | **冻结**:0.25s 长按阈值(§4.4 `THROW_HOLD_DURATION`) |
| R15 | **JFA pass 数** | **冻结**:`log2(min(W,H))`(demo 原式),非固定 5 |
| R16 | **空手攻击 / 投掷入口**(GDD §4.1 歧义裁决) | **冻结**:空手 LMB = 拳头(1 击);投掷唯一入口 = E 长按 0.25s(`throwStart`);无"空手投掷"分支 |

---

## 3. 技术总览(Technical Overview)

### 3.1 命名规范(Naming Conventions)

| 类别 | 规则 | 示例 |
|---|---|---|
| 文件 | core/engine 用 `camelCase.ts`;组件 `PascalCase.tsx`;内容数据 `camelCase.ts`;shader `snake_case.{vert,frag}` | `weapons.ts` / `RcPipeline.ts` / `rc.frag` |
| 类型 / 接口 / 枚举 | `PascalCase` | `GamePhase` / `SimEvent` / `WeaponId` |
| 函数 / 变量 | `camelCase` | `step` / `rallyHits` |
| 常量(调参) | `UPPER_SNAKE_CASE`,集中在 `core/constants.ts` | `PLAYER_SPEED_MAX` |
| 状态名 | 全局 FSM 全大写 | `GamePhase.PLAY` |
| Shader 文件 | `core/data` 不可见 shader;shader 全部在 `engine/shaders/` | `engine/shaders/rc.frag` |
| 注释 | 中文注释;公共接口必须有一行用途说明 | — |

编码标准:TypeScript **strict**(`tsconfig.app.json` 已开 `noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/noImplicitOverride`);`as const` 优先;禁止 `any`(如确需则局部注释豁免并交 agent-qa 复核);禁止硬编码魔法数(一律进 `constants.ts` 或 `data/*.ts`)。

### 3.2 技术栈表(Stack Table — 已锁定版本)

| 依赖 | 版本 | 用途 | 所属代理 |
|---|---|---|---|
| vite | ^6.0.0 | 构建 / HMR / dev server 5184 | agent-ui(构建脚本) |
| typescript | ^5.6.0 | 类型检查门(strict) | 全员 |
| @vitejs/plugin-react | ^4.3.0 | React 插件 | agent-ui |
| react / react-dom | ^19.0.0 | UI 覆盖层 | agent-ui |
| @types/react / @types/react-dom | ^19.0.0 | 类型 | agent-ui |
| three / @types/three | ^0.170.0 | 渲染器 / EffectComposer / ShaderMaterial | agent-engine |
| zustand | ^5.0.0 | UI 状态(仅 UI 层) | agent-ui |
| tailwindcss | ^3.4.0 | UI 样式 | agent-ui |
| autoprefixer / postcss | ^10.4.0 / ^8.4.0 | CSS 管线 | agent-ui |
| tweakpane(**可选,仅 DEV**) | ^4.x | 仅 DEV 调参;RC / 武器 / 面具参数面板 | agent-engine |
| node | ≥ 20.19(推荐 22 LTS) | 运行期 | — |
| npm | ≥ 10 | 包管理 | — |

> 注:`package.json` 已就绪,**禁止**任何 agent 擅自增删依赖;确需新依赖 → 向 TDD 契约所有者提变更(§0 冻结规则)。

### 3.3 数据布局(Data Layout)

**intro sprite atlas 合同(2026-08-09 用户批准)**:
- actor/effect atlas cell=`64×64`;actor pivot=`[32,54]`;static lamp strip cell=`64×64`;ground/brick tile cell=`48×48`;所有纹理 `nearest`。
- 只有批准 manifest 中 9 项可加载。source SHA-256 漂移、缺文件、尺寸不为 1024×1024或生成物不一致均 fail closed。
- `npm run sprites:check`/`node scripts/process-intro-sprites.mjs --check` 只校验，不改生成物。

**运行时内存布局**:
- 模拟权威状态:`Simulation` 内部(`core/simulation/Simulation.ts`)——单真相源。
- UI 可见状态:`src/store.ts`(zustand)——仅由 `GameEngine` 的事件同步驱动,**禁止 UI 直接改模拟**。
- 持久化(localStorage,引擎适配层 `engine/storage.ts` 读写,`core/types.ts` 冻结键名):

| StorageKey | 键名 | 内容形状 | 说明 |
|---|---|---|---|
| `stats` | `hotline-shanghai.v1.stats` | `PersistedStats` | `totalMissions / bestScoreByMission / bestRatingByMission / lastMissionAt` |
| `settings` | `hotline-shanghai.v1.settings` | `{ muted: boolean; volume: number; rcQuality: 'low' \| 'med' \| 'high' }` | 音频 / RC 质量 |
| `unlocks` | `hotline-shanghai.v1.unlocks` | `{ masks: MaskId[]; missions: MissionId[] }` | 面具 / 任务解锁 |

- 持久化读写只发生在:`SimEvent missionEnd` 事件、菜单"Reset"按钮、settings toggle。版本化键名(`.v1`)为 schema 演进预留。
- **存档兼容策略**:读取失败 / 形状不符 → 静默回退默认值并覆盖,**不抛错**。

### 3.4 DEV 钩子(DEV Hooks)

```ts
// engine/devtools.ts — 仅 import.meta.env.DEV 时注入
declare global {
  interface Window {
    __gameManifest?: () => string;   // describeWorld() + describeRules() + describeEntities() + 当前 sim 快照
    __sim?: unknown;                  // Simulation 实例(只读调试)
    __simEvents?: () => SimEvent[];   // 最近 N 个事件
    __rcPipeline?: unknown;           // RC 管线状态(只读)
  }
}
```

- `__gameManifest()` 返回:`describeWorld()`(当前房间 / 任务 / 光源)+ `describeRules()`(物理常量表)+ `describeEntities()`(id 列表)+ 当前 sim 状态快照(world-as-text)。
- `__simEvents()` 返回:最近 64 个 SimEvent(debug 用)。
- `__rcPipeline` 返回:`{ activeCascades, resolutionScale, ditherEnabled, lastFrameTimeMs, lightCount, jfaPasses, propagationRate, mixFactor, degraded }`(调试用;形状与 §15.6 一致)。
- 生产构建(`import.meta.env.DEV === false`)不注册、不引用。

### 3.5 性能预算表(Performance Budget,v3 加 0.2ms 给 lightField)

基准 60 FPS @ 1080p(16.67ms/帧)。**超预算 = 优先级 1 bug**,M 里程碑验收硬指标。

| 指标 | 预算 | 硬上限 | 备注 |
|---|---|---|---|
| 帧时间(渲染) | ≤ 12ms | 14ms | 含 RC 全管线(≈9.5ms)+ lightField 0.2ms + 模拟/音频/UI(≤1.5ms) |
| **RC prepscene** | ≤ 1ms | 2ms | 单 pass,写 seed(occlusion + emission 合并) |
| **RC JFA**(`log2(min(W,H))` passes,1080p ≈ 10-11) | ≤ 2.5ms | 4ms | 9 邻域跳距减半;每 pass 可跳过跳距 1 |
| **RC distfield** | ≤ 0.5ms | 1ms | 距离场提取 |
| **RC cascade × 3** | ≤ 4.5ms(3 × 1.5ms) | 6ms(3 × 2ms) | 关键路径;v3.2 起按 zone 调整:`lilong=1` / `bund=2` / `concession=3` / `creek=3+0.3x 衰减` |
| **RC final + dither** | ≤ 1ms | 2ms | 合成 + 4×4 Bayer |
| **`lightField.update`**(v3 新增) | **≤ 0.2ms** | **0.4ms** | `glReadPixels` 8×8 downsample,~8KB;final-pass 后调 |
| 帧时间(模拟) | ≤ 0.5ms | 1ms | 固定步 1/60 |
| 帧时间(音频) | ≤ 0.5ms | 1ms | Web Audio 节点调度 |
| 帧时间(UI/DOM) | ≤ 0.5ms | 1ms | 仅覆盖层 |
| 像素 sprite 总数 | ≤ 800 | 1200 | 16×16 像素块 |
| RC 中间 framebuffer | 3 × 1920×1080 RGBA8 + 1 × 240×135 R32F(lightField) | 6 × 1920×1080 | 减少 viewport 见 §3.6 |
| 同时音频声部 | ≤ 6 voices | 8 voices | 优先级抢占(§4.4) |
| 活动 RC 光源 | ≤ 16 | 32 | 超过 → 优先级排序,丢最远 |
| WebGL 对象 | — | 泄漏 0 | rAF 循环外禁用 resize 创建 |
| 内存预算 | ≤ 256 MB + 0.13 MB(lightField) | 512 MB | RC 中间 FB 占大头 |

> v3 总预算 ≈9.7ms / 硬上限 15ms(原 9.5ms 加 0.2ms lightField)。
>
> v3.2 按 zone 动态预算参考(每 zone 上限 ≤ 通用预算,zone 内 cascade 数由 §4.4.8 `ZonePalette.cascadeCount` 决定):
>
> | zone | cascade 数 | 衰减倍数 | 单帧 RC 预算 | 关键约束 |
> |------|----------|---------|------------|---------|
> | `lilong` | 1 | 0.6x | **≤ 0.3ms** | M1 范围,最简 case,保"漆黑+1 灯笼" |
> | `bund` | 2 | 1.0x | ≤ 3ms | 蒸汽波 HM 主场 |
> | `concession` | 3 | 1.0x | ≤ 4.5ms | noir + 雨滴高光 |
> | `creek` | 3 | 0.3x | ≤ 4.5ms | 雾衰减,范围压缩 |

### 3.6 性能降级路径(Performance Degradation,autopilot,v3 加 lightSmash 硬底)

```ts
// engine/PerfWatchdog.ts
if (rollingAvgFrameTime > 14ms for 3 frames) {
  applyDegradation('RC_CASCADE_REDUCE');    // cascade 3 → 2
}
if (rollingAvgFrameTime > 14ms for 6 frames) {
  applyDegradation('RC_HALF_RES');          // 1080p → 540p(仅 RC)
}
if (rollingAvgFrameTime > 14ms for 9 frames) {
  applyDegradation('RC_GI_SINGLE_PASS');   // gi.frag 单 pass(§15.3),RC_OFF 前最后一档
}
if (rollingAvgFrameTime > 14ms for 12 frames) {
  applyDegradation('RC_OFF');              // RC 全关,回退纯 base color(性能优先)
}
if (rollingAvgFrameTime < 10ms for 120 frames) {
  removeDegradation();                       // 自动恢复
}

// v3 新增:RcCascade==0 时屏蔽 lightSmash 机制(C8 决策)
if (rcPipelineState.activeCascades === 0) {
  lightField.setMode('disabled');   // 所有 sampleAt 返回 0(仅视觉;玩法读 lamp.invalidated 布尔)
  playPowerOutageAnimation(0.3s);   // 停电动画
  hud.showMessage('照明失效,机制退回');// HUD 提示
}

// v3.2 新增:zone-aware 退化(lilong 不可归零)
const currentZone = currentRoom.zone ?? 'lilong';
if (rcPipelineState.activeCascades === 0 && currentZone === 'lilong') {
  // lilong = M1 范围,1 cascade 即"最简 case",不可继续退化
  // 强制回到 cascade=1(等同 base color + 单灯光晕),保游戏可玩
  rcPipelineState.activeCascades = 1;
  // 不播停电动画(避免"全黑"破坏 lilong 已几乎全黑的设计)
}
// 其他 zone(bund/concession/creek)cascade=0 行为同 v3.1
```

降级状态可由 `__rcPipeline` 读出。**不**写入 localStorage(只在本次会话生效)。

---

## 4. 游戏机制即架构(Mechanics → Architecture)

### 4.1 机制→模块映射

| 机制 | core 模块 | engine 模块 | 触发事件 |
|---|---|---|---|
| 玩家移动 | `simulation/player.ts` | `engine/InputManager.ts`(按键)+ `engine/SceneManager.ts`(渲染) | (无事件) |
| **F 模式切换** | `simulation/player.ts`(mode + 硬直) | `engine/InputManager.ts`(F 键) | `modeSwitch` |
| 玩家攻击(按模式) | `simulation/weapons.ts`(子弹 / 挥砍 / 投掷) | `engine/InputManager.ts`(LMB) | `fire` / `melee` / `throw` |
| **E 拾取 / 长按投掷** | `simulation/weapons.ts` | `engine/InputManager.ts`(E 键 hold) | `weaponPicked` / `weaponThrown` |
| 一击必杀 | `simulation/damage.ts` | — | `enemyKilled` / `playerKilled` |
| 武器拾取 | `simulation/weapons.ts` | — | `weaponPicked` |
| 面具拾取 | `simulation/masks.ts` | — | `maskPicked` |
| 敌人 AI | `simulation/enemyAI.ts` | — | `enemyAlert` / `enemyAttack` |
| 任务进度 | `simulation/mission.ts` | `engine/GameEngine.ts`(FSM) | `roomEnter` / `roomClear` / `missionEnd` |
| 评分 | `simulation/mission.ts` | `engine/GameEngine.ts`(显示) | `missionEnd` |
| **RC 光源触发** | `simulation/rcnodes.ts`(注册光源) | `engine/RcPipeline.ts`(管线渲染) | `fire` / `throw` / `roomEnter` |
| 灯光物理(动 / 静态) | `core/data/lights.ts`(配方)+ `simulation/rcnodes.ts`(活动态) | `engine/RcPipeline.ts` | (持续每帧) |
| 音频合成 | `data/sfx.ts`(配方数据) | `engine/AudioManager.ts` | `sfx` |
| 暂停 / 死亡 | `simulation/pauseAndDeath.ts` | `engine/GameEngine.ts` | `playerKilled` |

### 4.2 主循环(Main Loop)

```
rAF 回调 (engine/GameEngine.ts)
  ↓
  beginFrame()                    // 帧时间累加
  ↓
  while accumulator >= FIXED_DT (1/60) {
    accumulator -= FIXED_DT
    sim.step(FIXED_DT)            // 模拟推进一固定步
  }
  ↓
  // 视觉层使用真实 elapsed dt
  sceneManager.update(elapsedDt)  // camera follow, sprite 位置
  audioManager.update(elapsedDt)  // voice 调度
  ↓
  sceneManager.render(snapshot)   // Canvas2D source/base scene
  rcPresenter.render(snapshot) {  // source → planes → 独立 WebGL2 RcPipeline
    1. prepscene pass: scene → seed 纹理(occlusion + emission)
    2. prepjfa: 种子编码
    3. JFA × log2(min(W,H)): 9 邻域跳距减半 → 最近 seed 距离场
    4. distfield: 距离场提取
    5. cascade × N: intro N=1, twoLoop=true(直射→间接)
    6. final pass: scene + radiance + dither → screen
  }
  ↓
  store.sync(sim.snapshot())      // 同步到 zustand(每 2 帧 1 次)
  ↓
  endFrame()
```

**关键点**:
- 模拟固定步 1/60,渲染 rAF 可变。
- 音频节点调度走 Web Audio 内置时间轴。
- 每 2 帧 sync 一次到 zustand(避免 React 过度 re-render)。
- RC 管线独立于主循环的固定步,**按帧**(rAF 节奏)运行,因为它处理的是视觉。
- `GeometricLightField` 是 gameplay 单真相源；`RcPresenter`/`RcPipeline` 不决定 exposed/shielded/lightSmash。WebGL2 不可用或 context lost 时显示 Canvas2D source，玩法不变。

### 4.3 全局 FSM 规格(Global FSM)

```
                    ┌────────────────────────────────┐
                    │                                │
                    ↓                                │
              ┌──────────┐    click "PLAY"           │
   start ────→│  TITLE   │ ──────────────────────┐  │
              └──────────┘                       │  │
                    │ click "CONTINUE" / 选择  │  │
                    ↓                            ↓  │
              ┌──────────┐                     ┌──────────┐
              │  BRIEF   │ Tab / Enter         │  MISSION │
              │(电话文本)│ ──────────────────→ │  SELECT  │
              └──────────┘                     └──────────┘
                    │                                  │ click 任务
                    ↓                                  ↓
              ┌──────────────────────────────────────────────┐
              │  MISSION (FSM 详见 §4.3.1)                  │
              │  LOADING → BRIEF_IN → ROOM_1 → ... → END  │
              └──────────────────────────────────────────────┘
                                  │ missionEnd
                                  ↓
                            ┌──────────┐
                            │ SCORE    │ → Mask Select → Mission Select
                            └──────────┘
```

**GamePhase 枚举**(冻结):
```ts
export const GamePhase = {
  TITLE: 'TITLE',
  BRIEF: 'BRIEF',
  MISSION_SELECT: 'MISSION_SELECT',
  MISSION_LOADING: 'MISSION_LOADING',
  MISSION_BRIEF_IN: 'MISSION_BRIEF_IN',
  MISSION_PLAY: 'MISSION_PLAY',
  MISSION_DEATH: 'MISSION_DEATH',
  MISSION_END: 'MISSION_END',
  SCORE: 'SCORE',
  MASK_SELECT: 'MASK_SELECT',
} as const;
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];
```

#### 4.3.1 Mission 子 FSM

```
MISSION_LOADING (load mission, restore stats)
  ↓ load done
MISSION_BRIEF_IN (打字机文本,3-5s)
  ↓ done / Tab
MISSION_PLAY
  ├ ROOM_1 → clear → ROOM_2 → clear → ROOM_3 → clear → END
  └ playerKilled → MISSION_DEATH → 1.2s → ROOM_1(同任务 reset)
MISSION_END
  ↓ 评分
SCORE → Mask Select → Mission Select
```

**Room 子 FSM**:
```
ROOM_ENTER (1s fade-in, 敌人摆位)
  ↓
ROOM_PLAY (走位 / 开火 / 拾取)
  ├ enemies == 0 → ROOM_CLEAR
  └ playerKilled → DEATH
ROOM_CLEAR (0.8s 展示清除效果 + 灯全亮)
  ↓
ROOM_EXIT (0.5s fade-out, 切下一房间)
```

### 4.4 默认数值表(冻结,所有引用 = 这里的值)

#### 4.4.1 玩家

| 字段 | 值 | 字段 | 值 |
|---|---|---|---|
| `PLAYER_SPEED_MAX` | 8 u/s | `PLAYER_ACCEL` | 60 u/s² |
| `PLAYER_DECEL` | 80 u/s² | `PLAYER_BOUND_X` | v3 改 = 相机/房间推导(原 ±16) |
| `PLAYER_BOUND_Y` | v3 改 = 相机/房间推导(原 ±9) | `PLAYER_RADIUS` | 0.5 u |
| `PLAYER_MELEE_RANGE` | 1.4 u | `PLAYER_MELEE_ARC_DEG` | 60° |
| `PLAYER_MELEE_DURATION` | 0.2s | `PLAYER_DASH_SPEED` | 14 u/s |
| `PLAYER_DASH_DURATION` | 0.2s | `PLAYER_DASH_COOLDOWN` | 1.0s |
| `PLAYER_DODGE_INVULN` | 0.4s | `PLAYER_DODGE_COOLDOWN` | 1.5s |
| `PLAYER_RELOAD_DURATION` | 1.5s | `PLAYER_HITS_TO_KILL_BOSS` | 3 |
| **`MODE_SWITCH_DURATION`** | **0s**(v3 R13 覆盖) | **`THROW_HOLD_DURATION`** | **0.25s** |
| `AIMFOCUS_PUSH_DIST` | 0.4 u(M6 新增) | `LMB_LIGHT_PRIORITY_RANGE` | 2.0 u(M=0 拆灯优先) |
| ~~`LIGHT_SHIELD_THRESHOLD`~~ | ~~0.30~~(2026-08-15 废弃) | ~~`LIGHT_EXPOSED_THRESHOLD`~~ | ~~0.10~~(2026-08-15 废弃) |
| `BREAKABLE_LIGHT_HP` | 2(v3 新增,§4.6;印刷间硬灯 = 3) | `LIGHT_POOL_DOWN_S` | 0.1(灯碎到敌人转半盲) |
| `LAMP_FLICKER_HZ` | 12(D8 默认) | `LAMP_FLICKER_AMP` | 0.4-0.6 |
| `FLASH_RADIUS` | 0.4 u(`lampmaker` 闪灯) | `FLASH_DURATION` | 0.5s |
| `FORTUNETELLER_FAKE_LIGHT` | 1 盏随机假灯 | `FORTUNETELLER_DARKNESS_S` | 0.3s |
| ~~`SHADOW_SHOT_MISS`~~ | ~~true~~(2026-08-15 废弃:暗处不再让敌弹落空,而是半盲) | `ENEMY_AIM_TELEGRAPH_S` | 0.4(敌弹瞄准电报,HM "!") |

#### 4.4.2 武器(v1 锁 8 件,冻结)

| ID | `damage` | `ammo` | `fireRate` | `reloadTime` | `range` | `spread` | `type` |
|---|---|---|---|---|---|---|---|
| `knife` | 1 | ∞ | 5.0/s | 0 | 1.4 | 0 | melee |
| `bat` | 1 | ∞ | 1.5/s | 0 | 2.0 | 0 | melee |
| `mauser_c96` | 1 | 10 | 2.0/s | 1.5 | 24 | 0.01 | ranged |
| `boxer` | 1 | 20 | 10.0/s | 2.0 | 18 | 0.05 | ranged |
| `thompson` | 1 | 50 | 12.0/s | 3.0 | 20 | 0.04 | ranged |
| `mosin` | 1 | 5 | 1.0/s | 2.5 | 64 | 0.005 | ranged |
| `grenade` | 1 (AoE) | 3 | 1.0/s | 0 | 12 | 0 | throw |
| `throwing_knife` | 1 (2 backstab) | 5 | 1.5/s | 0 | 16 | 0 | throw |

> 单位:`damage` = 击数(都是 1 击必杀,除 BOSS);`ammo` = 弹匣;`fireRate` = 1/s;`range` = 最大射程 u;`spread` = 0..1 角度标准差。

#### 4.4.2b 武器扩展路线(M2+ 里程碑,非 v1 冻结;签名同 4.4.2)

| 批次 | 新增 ID(草案) | 类型 | 说明 |
|---|---|---|---|
| M2 | `axe` / `stiletto` | melee | 斧(慢 1.0/s,范围 2.4)/ 短刀(极快 8.0/s,范围 1.0) |
| M2 | `shotgun` / `revolver` | ranged | 霰弹(3 弹扇形 0.2 spread)/ 左轮(6 发,1.5/s) |
| M2 | `molotov` / `cleaver` | throw | 燃烧瓶(持续 3s 火场 + 光源)/ 菜刀(抛物线,可回收) |
| M3 | `bayonet` / `nunchaku` / `brick` | melee/throw | 刺刀(冲刺攻击)/ 双截棍(两段)/ 砖头(极速短距) |
| M3 | `browning` / `sniper` / `flare_gun` | ranged | 勃朗宁(中速 8/s)/ 狙击(超长 96u)/ 信号枪(照明 + 点燃) |
| M4+ | 其余至 35 件 | 混合 | 每件必须差异手感,禁止纯数值换皮 |

#### 4.4.3 面具(v3 锁 6 + 3 = 9 个,冻结;权威规范 = `docs/design/09-blindside-integration.md §6`)

| ID | 名称 | 效果 | 参数 |
|---|---|---|---|
| `actor` | 戏子 | 入场 0.5s 慢动作 + 头 0.5s 玩家视为暗中 | `slowMoDuration=0.5s, slowMoFactor=0.3, startInShadow=true` |
| `runner` | 帮工 | 拾取武器直接满弹 | `ammoRefill=true` |
| `righteous` | 蒙面义士 | 近战范围 +0.5u + 近战拆灯范围 +1.0u | `meleeRangeBonus=0.5u, lightSmashRangeBonus=1.0u` |
| `dancer` | 舞女 | 翻滚冷却 -50% + 翻滚期间生 0.6u 临时光池 | `dodgeCooldownMult=0.5, dodgeLightPool=0.6u` |
| `waiter` | 茶馆跑堂 | 敌人视野/听觉 -30% + 玩家暗中阈值 0.10 → 0.20 | `enemySenseMult=0.7, exposedThresholdBonus=+0.10` |
| `officer` | 军爷 | 持枪移动 +20% | `playerSpeedMult=1.2, requiresWeapon='ranged'` |
| `lampmaker` 🆕 | 灯匠 | Shift+朝灯 0.4s = 闪烁(强度减半);空手 LMB 双击 = 脚下 0.4u 光池 0.5s;**4s 单房 cooldown** | `flickerOnHold=true, flashOnDoubleLMB=true, roomCooldownS=4.0` |
| `darkwatch` 🆕 | 暗哨 | 暗中见敌人红描边;光下见灯精确辐射半径 | `shadowOutline=true, lightOutline=true` |
| `fortuneteller` 🆕 | 算命先生 | 入场时 1 随机灯变假灯(强度 0 视觉正常);首次交互后揭示,全房灯熄 0.3s | `fakeLight=1, revealDarknessS=0.3` |

> v3 新增 3 个面具均围绕"光暗反制"主题;M1.0 spike 期间 `lampmaker` 提前实现作为机制验证面具(M2 起全 9 个)。

#### 4.4.3b 面具扩展路线(M2+ 里程碑,非 v1 冻结;签名同 4.4.3,新增 `MaskEffect` kind 需走 `[TDD-CONTRACT-CHANGE]`)

| 批次 | 新增 ID(草案) | 效果 |
|---|---|---|
| M2 | `tiger` | 击杀后 0.5s 移动 +40%(对标 HM 虎头) |
| M2 | `pig` | 枪械掉落率 +50%(对标 HM 猪头) |
| M2 | `owl` | 隐藏密道 / 收集品发光可见(对标 HM 猫头鹰) |
| M3 | `fox` | 枪声传播半径 -50%(潜行) |
| M3 | `wolf` | 敌人视野 +50% 且仇恨锁定玩家(挑战型) |
| M3 | `horse` | 翻滚后 0.3s 内下一击必杀(处决链) |
| M4+ | 其余至 25 个 | 每个都是玩法钩子 |

#### 4.4.4 敌人

| 字段 | 值 | 字段 | 值 |
|---|---|---|---|
| `ENEMY_VIEW_DISTANCE` | 8 u | `ENEMY_VIEW_ARC_DEG` | 60° |
| `ENEMY_HEAR_DISTANCE` | 4 u | `ENEMY_FIRE_DISTANCE` | 14 u |
| `ENEMY_SPEED_PATROL` | 3 u/s | `ENEMY_SPEED_ALERT` | 5 u/s |
| `ENEMY_REACT_TIME` | 0.4s | `ENEMY_FIRE_RATE` | 1.5/s |
| `ENEMY_HITS_TO_KILL` | 1(`lightShielded=false` 时) | `BOSS_HITS` | 3 |
| **`FLASHLIGHT_CONE_ARC_DEG`** | **50**(`flashlight_patrol` 灯锥) | **`FLASHLIGHT_SWEEP_HZ`** | **0.6** |
| `ENEMY_SHIELD_BLOCKED` | emit `attackBlocked` event | `ENEMY_INVULN_WHILE_LIT` | true(§4.6) |

> v3 新增 `flashlight_patrol` archetype:视野 = RC 灯锥(`ENEMY_VIEW_*` 退化;灯被拆 = 视野退回 8u 60° 几何锥)。详见 [09-§5](docs/design/09-blindside-integration.md)。

#### 4.4.5 任务 / 房间

| 字段 | 值 | 字段 | 值 |
|---|---|---|---|
| `MISSION_DURATION_TARGET` | 180s | `ROOM_ENTER_FADE` | 1.0s |
| `ROOM_CLEAR_DELAY` | 0.8s | `ROOM_EXIT_FADE` | 0.5s |
| `DEATH_RESPAWN_DELAY` | 1.2s | `BRIEF_TYPEWRITER_SPEED` | 0.04s/字 |
| `TASKS_TOTAL` | 4 | `HIDDEN_TASK_REQUIRED_S` | 3 |
| `SCORE_S_THRESHOLD` | 90 | `SCORE_A_THRESHOLD` | 75 |
| `SCORE_B_THRESHOLD` | 60 | `SCORE_C_THRESHOLD` | 0 |

#### 4.4.6 RC 管线(v2,按 demo 真实算法)

| 字段 | 值 | 字段 | 值 |
|---|---|---|---|
| `RC_CASCADE_COUNT` | 3 | `RC_BASE_RAY_COUNT` | 4 |
| `RC_BASE_INTERVAL_PX` | 6 | `RC_JFA_PASSES` | `log2(min(W,H))`(720×480 work source;RC work buffers 按 0.5 缩放) |
| `RC_JFA_RESOLUTION_SCALE` | 0.5 | `RC_LIGHT_RADIUS_FALLOFF` | inverse-square |
| `RC_LIGHT_INTENSITY_GAMMA` | 2.2 | `RC_MAX_ACTIVE_LIGHTS` | 16 |
| `RC_HALF_RES_SCALE` | 0.5 | `RC_DITHER_MATRIX` | 4×4 Bayer |
| `RC_RAY_BUDGET_PER_PIXEL` | 16 | `RC_RAY_BUDGET_TOTAL_HARD_CAP` | 64 |
| `RC_MAX_RAY_STEPS` | 128(demo 常量) | `RC_EPS` | 0.0005(demo 常量) |
| **`RC_PROPAGATION_RATE`** | **0.85**(demo 默认风格) | **`RC_MIX_FACTOR`** | **0.5** |
| `RC_PERF_DEGRADE_FRAMES` | 3 (>10ms) | `RC_RECOVERY_FRAMES` | 120 (<8ms) |

> `RC_PROPAGATION_RATE`(光传播衰减,用于 lighting 合并)与 `RC_MIX_FACTOR`(scene 色 / 上一帧光混合比)对应 demo `rc.frag` / `gi.frag` 同名 uniform,进 Tweakpane 调参面板。

#### 4.4.7 RC 光源(8 类;v3 增 `breakable` / `hp` 字段)

| ID | 颜色 | 强度 | 半径 | 触发 | TTL | `breakable` | `hp` |
|---|---|---|---|---|---|---|---|
| `muzzle_flash` | `#ffaa3a` | 1.0 | 8u | 远程开火 | 0.05s | — | — |
| `explosion` | `#ffaa3a` | 2.0 | 6u | 手雷爆炸 | 0.2s | — | — |
| `oil_lamp` | `#ffc966` | 0.4 | 5u | 静态道具 | static | **true** | **2** |
| `neon_sign` | `#3ad8ff` | 0.6 | 12u | 静态道具(脉动) | static | **true** | **2** |
| `searchlight` | `#e0e0ff` | 0.8 | 16u | 静态道具(旋转) | static | **true** | **2** |
| `surgical` | `#ffffff` | 0.7 | 8u | 静态道具 | static | false(医生灯,剧情用) | — |
| `disco` | `#ff5cb4` ↔ `#3ad8ff` | 0.5 | 10u | 静态道具(脉动) | static | false(舞厅剧情) | — |
| `blood_splash` | `#d8201a` | 0.3 | 2u | 击杀瞬间 | 0.5s | — | — |

> v3 起 5 个静态灯里 3 个(`oil_lamp` / `neon_sign` / `searchlight`)可拆,`hp=2`(印刷间硬灯在房间布局里 override 为 3)。拆灯 = `BREAKABLE_LIGHT_HP` 扣 1,终击 = `invalidateLight` + RC 下一帧重算。

#### 4.4.8 调色板(§7 Art Direction 数值)

| 名称 | hex | 用途 |
|---|---|---|
| `PAL_INK` | #0a0910 | 弄堂深处墨色 / 玩家风衣 |
| `PAL_PLASTER` | #2a2638 | 灰泥墙地面(v1.1 提亮) |
| `PAL_RUST` | #7a2a1c | 木门铁锈 / 墙(v1.1 提亮) |
| `PAL_TEAL` | #1a5a5a | 苏州河水 |
| `PAL_LANTERN` | #e54a1a | 红灯笼 / 旗袍(v1.1 核心橙红) |
| `PAL_NEON` | #ff2a44 | 老式霓虹(v1.1 核心红霓虹) |
| `PAL_PAPER` | #e8dca0 | 黄包车票 / 纸 |
| `PAL_IVORY` | #f5e6b8 | 米色蒙面 / 旗袍边 |
| `PAL_JADE` | #2a9a6a | 翡翠配饰 |
| `PAL_STEEL` | #4a4a52 | 步枪 / 玩家帽 |
| `PAL_MUZZLE` | #ffaa3a | 枪火高亮 |
| `PAL_BLOOD` | #d8201a | 血(v1.1 提饱和) |

**HM-借鉴色(v1.1 新增,02 §3 对照真机)**:`PAL_STRIPE_PURPLE` #6a3a8a / `PAL_STRIPE_TEAL` #2a8a7a / `PAL_STRIPE_PINK` #c84a7a(条带地板)/ `PAL_WALL_RED_BRICK` #8a3a2a / `PAL_WALL_BLUE_BLOCK` #3a5a8a / `PAL_WALL_PLASTER_W` #c8b896(砖块墙)/ `PAL_FLOOR_PLASTER` #5a5048 / `PAL_FLOOR_WOOD` #6a4a2a(地板)/ `PAL_EXTERIOR_GRAY` #4a4a5a(室外)/ `PAL_NEON_CYAN` #2a9aff(霓虹青变体)。

**viewport(v1.1)**:`VIEWPORT_W`=32 / `VIEWPORT_H`=18 / `TILE_PIXELS`=60(1920÷32)/ `STRIPE_HEIGHT`=2(条带地板每 2u 换色)。

**Zone palette(v3.2 新增,02 v1.2 §3.1 / §10.5 锁定)**:

```ts
// 4 个 atmospheric zones 的视觉签名(双 cascade 配色 + ambient + 性能特征)
export type ZoneId = 'bund' | 'concession' | 'lilong' | 'creek';

export interface ZonePalette {
  primary: string;        // 主光 cascade 染色(短/主)
  secondary: string;      // 辅光 cascade 染色(中/辅)
  ambient: string;        // ambient 基底色(整场 ambient light tint)
  cascadeCount: number;   // RC cascade 数(1-6,zone 决定)
  decayMul: number;       // 衰减倍数(<1 = 衰减更快,>1 = 衰减更慢)
}

export const ZONE_PALETTES: Record<ZoneId, ZonePalette> = {
  bund:       { primary: '#ff00aa', secondary: '#00ffff', ambient: '#1a0a14', cascadeCount: 2, decayMul: 1.0 },  // 外滩霓虹,蒸汽波 HM
  concession: { primary: '#d4a44a', secondary: '#5a8a9a', ambient: '#0a141a', cascadeCount: 3, decayMul: 1.0 },  // 法租界夜雨,1940s noir
  lilong:     { primary: '#c8341a', secondary: '#3a1410', ambient: '#050408', cascadeCount: 1, decayMul: 0.6 },  // 弄堂灯笼,暗处可杀(M1)
  creek:      { primary: '#c8a830', secondary: '#3a6a4a', ambient: '#0a1a0a', cascadeCount: 3, decayMul: 0.3 },  // 苏州河雾夜,工业 horror
};
```

**Zone × Light kind 默认绑定(可在 RoomLayout.decorativeLights[] 显式 override)**:

| Zone | 默认 light kind | 视觉理由 |
|------|----------------|---------|
| `bund` | `neon_sign` / `disco` | 霓虹牌 = 该 zone 的视觉签名 |
| `concession` | `surgical` / `neon_sign` | 路灯 + 远处霓虹散射 |
| `lilong` | `oil_lamp` | 单灯 = 整个 zone 几乎全黑(1 cascade + 0.6x 衰减) |
| `creek` | `searchlight` | 探照灯扫雾 + 雾衰减 0.3x |

**约束**:
- `ZonePalette.cascadeCount` 是**上限**,M1 范围 = `lilong=1`(最简 case)
- `decayMul` 与 `RC_PROPAGATION_RATE=0.85` 复合使用:`effective_decay = base * decayMul`
- 4 个 zone 的所有 hex 全部从 `references/sprite-gen-vaporwave/{02,06,07,...}.png` 提取,不是拍脑袋
- 跨 zone 房间禁止(02 §0.7);同 mission 房间必须同 zone
- M1 房间 `m1_workshop` 必须 = `lilong`;M2+ 再扩到 bund/concession/creek

### 4.5 状态转移表(FSM Transition Table)

#### 4.5.1 Global FSM

| From | Event | To | Side Effect |
|---|---|---|---|
| TITLE | click "PLAY" / Enter | MISSION_SELECT | load unlocks from localStorage |
| MISSION_SELECT | click mission card | MISSION_LOADING | reset sim, set current mission |
| MISSION_LOADING | load done | MISSION_BRIEF_IN | show typewriter text |
| MISSION_BRIEF_IN | done / Tab | MISSION_PLAY | enter first room |
| MISSION_PLAY | playerKilled | MISSION_DEATH | freeze sim, start respawn timer |
| MISSION_DEATH | 1.2s | MISSION_PLAY | reset to room 1, keep mission score |
| MISSION_PLAY | roomClear AND last room | MISSION_END | emit `missionEnd` event |
| MISSION_END | 1.5s | SCORE | calculate score |
| SCORE | click "CONTINUE" | MASK_SELECT | unlock mask if S-rank |
| MASK_SELECT | click mask | MISSION_SELECT | persist stats |
| * | Esc | TITLE | (confirm dialog) |

#### 4.5.2 Room FSM

| From | Event | To | Side Effect |
|---|---|---|---|
| ROOM_ENTER | 1.0s timer done | ROOM_PLAY | enable player input, activate enemies |
| ROOM_PLAY | enemies.allDead | ROOM_CLEAR | start 0.8s timer |
| ROOM_PLAY | playerKilled | DEATH | (mission-level handler) |
| ROOM_CLEAR | 0.8s timer done | ROOM_EXIT | start 0.5s timer |
| ROOM_EXIT | 0.5s timer done | (next room) ROOM_ENTER | load next room layout |

#### 4.5.3 玩家模式切换(Player Mode FSM,v3 简化)

```
MODE_MELEE ──F 键──→ MODE_RANGED (v3: 瞬时, 0s 硬直)
MODE_RANGED ──F 键──→ MODE_MELEE (v3: 瞬时, 0s 硬直)
```

| From | Event | To | Side Effect |
|---|---|---|---|
| MODE_MELEE | F | MODE_RANGED | 播放拔枪音,`modeSwitch` 事件(v3: 无 0.15s 硬直) |
| MODE_RANGED | F | MODE_MELEE | 播放收枪音,`modeSwitch` 事件(v3: 无 0.15s 硬直) |
| * | 空手 | MODE_MELEE | 无武器时强制近战(拳头 1 击) |

> v3 削减 `MODE_SWITCHING` 中间态;`MODE_SWITCH_DURATION=0` 见 §4.4.1 玩家表。

#### 4.5.4 玩家动作 — LMB 优先级(新增,v3)

```
LMB 触发(每 tick):
  aimTarget in LMB_LIGHT_PRIORITY_RANGE (=2.0u) AND aimTarget.isBreakableLight:
    → lightSmash event;BREAKABLE_LIGHT_HP--
  else 按玩家模式打敌(沿用 v2 行为)
    → 近战/远程直接击杀(无光甲,2026-08-15 修正)
    → 亮处击杀(!isAmbientDark)→ triggerAlarm 刷增援;暗处安静击杀不触发
```

#### 4.5.5 敌人状态机 + INVULNERABLE 强制检查(新增,v3)

```
PATROL → (cone sees player AND not playerInShadow) → ALERT
ALERT  → (0.4s 未追击) → PATROL
ALERT  → (player in attack range) → ATTACK
ATTACK → (0.4s 瞄准提示) → FIRE
FIRE   → 命中玩家(若玩家 not in shadow)= OHK
FIRE   → 命中玩家(若玩家 in shadow) = 100% miss(SHADOW_SHOT_MISS)
ATTACK → (player escaped / in shadow) → ALERT

[v3 强制检查,每 tick]
  IF enemy.lightShielded == true AND enemy.state != DEAD:
    REFUSE all setDead attempts;player hit = emit attackBlocked
  IF enemy.lightShielded == false:
    damage calc 沿用 v2 (OHK)
```

---

## 4.6 光暗反制层 — v3 新增(The Light/Shadow Layer,2026-08-09)

> 本节是 v3 整合的**契约层**摘要。完整规范 = [docs/design/09-blindside-integration.md §2-§7](docs/design/09-blindside-integration.md)。

### 4.6.1 `LightField` 接口(冻结)

```ts
// core/world/lightField.ts (新, agent-core.1 所有)
export interface LightField {
  /** 每帧从 RC pipeline 同步;Simulation 不直接调 RC,只读已写入的 cache */
  sampleAt(worldPos: Vec2): number;        // 0..1 归一化辐射强度
  isShielded(entityPos: Vec2): boolean;    // sampleAt > LIGHT_SHIELD_THRESHOLD (0.30)
  isExposed(entityPos: Vec2): boolean;     // sampleAt > LIGHT_EXPOSED_THRESHOLD (0.10)
  invalidateLight(lightId: EntityId): void;// 灯破坏时调用,触发下一帧 RC 重算
}
```

**关键不变量**:
- `sampleAt` 只读,Sim 不直接写 RC framebuffer
- 灯的破坏是"lazy 失效":本帧敌人仍警觉,`LIGHT_POOL_DOWN_S=0.1` 后转半盲(`DARK_VISION_MULT=0.5`)
- ~~`LIGHT_SHIELD_THRESHOLD=0.30`,`LIGHT_EXPOSED_THRESHOLD=0.10`~~(2026-08-15 废弃:光不再是护甲)

### 4.6.2 灯(LightSource)类型 + 状态

```ts
// core/data/lights.ts 新增
export type LightSourceState = 'intact' | 'damaged' | 'flickering' | 'dead';

export interface LightSource {
  id: EntityId;
  kind: 'oil_lamp' | 'neon_sign' | 'searchlight' | 'surgical' | 'disco' | 'temporary';
  pos: Vec2;
  state: LightSourceState;
  hp: number;                // 0..BREAKABLE_LIGHT_HP(默认 2)
  intensity: number;          // 0..1(v3 新增,可被 lampmaker 减半)
  flickerHz?: number;         // lampmaker 闪灯时 12 Hz
  flickerAmp?: number;        // 0.4-0.6
  invalidated: boolean;       // true = 下一帧 RC 重算 + 0.1s 池坍缩
}
```

### 4.6.3 玩家拆灯 / 投灯 / 闪灯动作

| 动作 | 输入 | 触发条件 | 副作用 |
|------|------|----------|--------|
| `lightSmash` | LMB(aimTarget 是灯,距离 ≤ 2.0u) | 灯 `breakable=true` | `hp--`;若 `hp=0` → `invalidateLight` + `state='dead'` |
| `lightDestroy` | LMB 续击触发 | `hp=0` | emit `lightDestroyed`;RC 下一帧重算 |
| `throwAtLight` | E 长按 0.25s + 鼠标指向灯 | 投出当前武器 | 武器落地为 `temporary` 光源 1.5s(强度 0.4) |
| `flash` | 空手 LMB 双击(仅 `lampmaker`) | `lampmaker.active` | 玩家脚下生 `temporary` 光源 0.5s |
| `hold` | Shift + 朝灯 0.4s(仅 `lampmaker`) | 灯 `breakable=true` | 灯 `flickering`,强度 0.4-0.6 区间脉动 12Hz |

### 4.6.4 敌弹(0.4s 瞄准电报 → 子弹 → OHK,2026-08-15 重写)

```ts
// core/simulation/Simulation.ts 内联(废弃 enemyAI.ts)
// 警告窗口归零 → 敌弹而非直接 killPlayer
if (this.warningRemaining === 0) {
  this.enemyFire(owner);                        // 从敌人视觉中心朝玩家发子弹
  this.warningRemaining = ENEMY_AIM_TELEGRAPH_S; // 仍可见则继续连射
}

// 敌弹命中玩家(子弹循环 else 分支)
if (b.ownerId !== 'player' && distance(b, playerVisual) <= PLAYER_RADIUS) {
  if (damagePlayer(this.player)) this.killPlayer('bullet'); // OHK
}
```

> 旧"敌人受光护甲"(`tryDamageEnemy` / `lightField.isShielded` / `attackBlocked` 光甲)已于 2026-08-15 删除;近战/远程直接 `damageEnemy`,亮处击杀 `triggerAlarm` 刷增援。

### 4.6.5 CPU-side cache 实现要求

```ts
// core/world/lightField.ts 实现
export class LightFieldCache {
  private readonly downsample: Float32Array;   // 8×8 block 降采样,~2040 floats
  private gl: WebGL2RenderingContext;
  
  update(x: number, y: number, w: number, h: number): void {
    // 每帧 RC final-pass 之后,glReadPixels 一次
    // cost: ~0.2ms / 帧(8KB read)
  }
  
  sampleAt(worldPos: Vec2): number {
    // 双线性插值 downsample
  }
}
```

**性能约束**:8×8 downsample / 帧(1080p);加入 §3.5 性能预算 0.2ms。降级到 cascade=0 时,`lightField` *不* 读取(空实现,所有敌人 = `lightShielded=false` 走 v2 行为)。

### 4.6.6 BOSS 改造(v3 D4 待定)

- v2 老路:BOSS 自身不发光,房间 3-5 个静态灯
- v3 新路(v3 默认):BOSS 自身 0.7u 永久光(`surgical` 类),玩家必须先拆周围 3-5 个灯 + 走 BOSS 身后才能打 — M1.0 spike 期间 playtest 决定

### 4.6.7 评分加成(沿用 v2 阈值 + v3 全拆灯加成)

| 等级 | 阈值 | v3 加成 |
|------|------|---------|
| S | ≥ 90 | + `全拆灯`(每个房间所有可破坏灯 *在房间 clear 前* 被拆)= **+5 分** |
| A | ≥ 75 | + `拆灯率 ≥ 50%` = +2 分 |
| B | ≥ 60 | + `拆灯率 ≥ 25%` = +1 分 |
| C | < 60 | 无加成 |

> v3 起,S-rank *必要条件* = 全拆灯 + 时间 + 0 受击 + 全拾取。M2+ 启用 S 评。

---

## 4.7 v3 决策点 — D1-D8 待 M1.0 spike 实证

| # | 决策点 | 默认 | 备选 | 决定者 |
|---|--------|------|------|--------|
| D1 | `BREAKABLE_LIGHT_HP` | 2 | 3(硬灯) | agent-engine.1 |
| D2 | `LIGHT_SHIELD_THRESHOLD` | 0.30 | 0.20 / 0.40 | agent-qa(playtest) |
| D3 | `LIGHT_EXPOSED_THRESHOLD` | 0.10 | 0.05 / 0.15 | agent-qa |
| D4 | BOSS 自身是否发光 | 是(0.7u) | 否(沿用 v2) | M1.0 spike playtest |
| D5 | RC 降级到 0 时是否禁用 lightSmash | 禁用 + "停电"动画 | 始终启用 | agent-core.4 |
| D6 | `lampmaker` 闪灯输入 | Shift + 朝灯 + 0.4s | Shift + LMB 双击 | agent-input |
| D7 | 投掷武器命中灯 = 扣多少 HP | 按 `damage`(grenade=1, knife=0) | 全部统一 1 | agent-core.2 |
| D8 | 灯闪烁的物理含义 | 12Hz 幅 0.4-0.6 | 8Hz 幅 0.3-0.7 | agent-engine.3 |

> **D1-D8 必须在 M1.0 spike 的 3 天内玩过 1 个完整房间** 才有意义。spike 不接受"还没玩就拍"。

---

## 5. 契约速写(冻结,真实 TS)

> **本节是最高优先级**。所有 coder 必须按下面的类型签名实现。
> 完整源码在 `src/core/types.ts` / `src/core/constants.ts` / `src/core/simulation/Simulation.ts`(M1 由 agent-core 实现)。
> **v2 变更**:`WeaponMode` 类型、`Player.mode` / `Player.modeSwitchTimer`、输入 `toggleMode` / `throwWeapon`、`SimEvent.modeSwitch` / `weaponThrown`。

### 5.1 `core/types.ts`(冻结)

```ts
// ─── 基础类型 ───
export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };

export const GamePhase = {
  TITLE: 'TITLE',
  BRIEF: 'BRIEF',
  MISSION_SELECT: 'MISSION_SELECT',
  MISSION_LOADING: 'MISSION_LOADING',
  MISSION_BRIEF_IN: 'MISSION_BRIEF_IN',
  MISSION_PLAY: 'MISSION_PLAY',
  MISSION_DEATH: 'MISSION_DEATH',
  MISSION_END: 'MISSION_END',
  SCORE: 'SCORE',
  MASK_SELECT: 'MASK_SELECT',
} as const;
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

// ─── 武器模式(v2 新增)───
export type WeaponMode = 'melee' | 'ranged' | 'throwing';
//   'throwing' = E 长按投掷当前武器时激活(瞬时,0.25s hold)
//   空手时 LMB = 拳头(1 击);投掷唯一入口 = E 长按(v2-cut 裁决 R16)

// ─── 武器 ───
export type WeaponId =
  | 'knife' | 'bat'
  | 'mauser_c96' | 'boxer' | 'thompson' | 'mosin'
  | 'grenade' | 'throwing_knife';
// M2+ 扩展 ID 通过同类型字面量扩展(axe / shotgun / molotov / ...)

export type WeaponType = 'melee' | 'ranged' | 'throw';

export interface WeaponSpec {
  id: WeaponId;
  nameZh: string;
  nameEn: string;
  type: WeaponType;
  damage: number;          // 击数(1 击必杀,除 BOSS)
  ammo: number;            // 弹匣(∞ 用 Infinity)
  fireRate: number;        // 1/s
  reloadTime: number;      // 秒
  range: number;           // u
  spread: number;          // 0..1 角度标准差
  projectileSpeed?: number; // u/s(ranged 适用,默认 60)
  explosionRadius?: number; // u(throw 适用,手雷)
  silent?: boolean;        // 不触发 ENEMY_HEAR(飞刀)
}

// ─── 面具 ───
export type MaskId =
  | 'actor' | 'runner' | 'righteous' | 'dancer' | 'waiter' | 'officer';
// M2+ 扩展 ID: tiger / pig / owl / fox / wolf / horse / ...

export interface MaskSpec {
  id: MaskId;
  nameZh: string;
  nameEn: string;
  description: string;
  effect: MaskEffect;
}

export type MaskEffect =
  | { kind: 'slowMoOnRoomEnter'; slowMoDuration: number; slowMoFactor: number }
  | { kind: 'ammoRefillOnPickup' }
  | { kind: 'meleeRangeBonus'; bonus: number }
  | { kind: 'dodgeCooldownMult'; multiplier: number }
  | { kind: 'enemySenseMult'; multiplier: number }
  | { kind: 'playerSpeedMult'; multiplier: number; requiresWeapon: 'ranged' | 'melee' | 'any' };
// M2+ 新 kind(如 killSpeedMult / dropRateMult / hiddenReveal)必须走 [TDD-CONTRACT-CHANGE]

// ─── 实体 ───
export interface Player {
  position: Vec2;
  velocity: Vec2;
  facingAngle: number;       // 弧度
  hp: number;                // 1(等于一击毙命)
  ammo: number;
  reloading: number;         // 0..reloadTime
  weapon: WeaponId | null;   // null = 空手(拳头)
  mode: WeaponMode;          // v2:当前模式(melee / ranged)
  modeSwitchTimer: number;   // v2:0..MODE_SWITCH_DURATION(切换硬直)
  activeMask: MaskId | null;
  dodgeTimer: number;        // 0..PLAYER_DODGE_INVULN
  dodgeCooldown: number;     // 0..PLAYER_DODGE_COOLDOWN
  dashTimer: number;
  dashCooldown: number;
  kills: number;             // 本任务
  hitsTaken: number;         // 本任务
}

export type EnemyArchetype = 'soldier' | 'policeman' | 'spy' | 'boss' | 'flashlight_patrol';

export interface Enemy {
  id: string;
  archetype: EnemyArchetype;
  position: Vec2;
  velocity: Vec2;
  facingAngle: number;
  hp: number;                // boss=3, 其他=1
  state: 'patrol' | 'suspicious' | 'alert' | 'engaging';
  weapon: WeaponId;          // 简化:都是单发手枪
  patrolTarget: Vec2 | null; // patrol 时随机选
  lastSeenPlayerAt: Vec2 | null;
  alertTimer: number;
  fireCooldown: number;
  // v3.7 哨塔大院：role 是位置/玩法不变式；tower_guard 全 FSM 禁止平移。
  role: 'ground_patrol' | 'tower_guard';
  patrolAxis: 'horizontal' | 'vertical' | 'static';
  patrolLength: number;
  awareness: 'none' | 'suspicious' | 'detected';
  lastSuspiciousPosition: Vec2 | null;
}

export interface Bullet {
  id: string;
  ownerId: 'player' | string;  // 'player' 或 enemy.id
  position: Vec2;
  velocity: Vec2;
  damage: number;
  weaponId: WeaponId;
  ttl: number;               // 秒
}

export interface MeleeSwing {
  ownerId: 'player' | string;
  position: Vec2;
  facingAngle: number;
  range: number;
  arcDeg: number;
  ttl: number;
  damage: number;
  weaponId: WeaponId;
}

export interface Grenade {
  id: string;
  position: Vec2;
  velocity: Vec2;
  timer: number;             // 1.5s 后爆
  radius: number;
  damage: number;
}

export interface ThrownWeapon {   // v2:E 长按投掷的武器(地上弹跳物,可被捡回)
  id: string;
  weaponId: WeaponId;
  position: Vec2;
  velocity: Vec2;
  spin: number;              // 渲染旋转
  ttl: number;
}

// ─── 房间 ───
export type TileChar = '.' | '#' | 'D' | 'L' | 'N' | 'S' | 'X';
//   '.' = 地板  '#' = 墙    'D' = 门    'L' = 油灯  'N' = 霓虹  'S' = 探照灯   'X' = 静态掩体

export interface EnemySpawn {
  position: Vec2;
  archetype?: EnemyArchetype;
  role?: 'ground_patrol' | 'tower_guard';
  patrolAxis?: 'horizontal' | 'vertical' | 'static';
  patrolLength?: number;
  facingAngle?: number;
}

export interface RoomLayout {
  id: string;
  nameZh: string;
  width: number;             // tile
  height: number;            // tile
  tileSize: number;          // u/tile,默认 1
  tiles: string[];           // 每行一字符串
  playerSpawn: Vec2;         // tile coords
  enemySpawns: EnemySpawn[];
  weaponSpawns: { tile: Vec2; weaponId: WeaponId }[];
  maskSpawns: { tile: Vec2; maskId: MaskId }[];
  exitTile: Vec2 | null;
  // v1.1 新增(全部可选,旧房间数据零迁移):
  floorPalette?: string[];        // 2-3 个 hex,每 STRIPE_HEIGHT u 横条切换(条带地板)
  wallPattern?: WallPattern;      // 墙砖块/材质图案('red_brick' | 'blue_block' | 'plaster' | 'wood')
  furniture?: FurniturePlacement[];      // 标志家具(沙发/圆桌/床/书架/盆栽/冰箱/茶桌/麻将桌等)
  decorativeLights?: DecorativeLight[];  // 装饰光源(霓虹/油灯/探照灯,与 'L'/'N'/'S' tile 并存)
  // v3.2 新增(可选,旧房间数据零迁移;缺省 = 'lilong',见 §4.4.8 Zone palette):
  zone?: ZoneId;                  // atmospheric zone 决定 RC cascade 数 + cascade 染色 + 衰减曲线(§0.2)
}

export interface Mission {
  id: string;
  nameZh: string;
  rooms: RoomLayout[];
  finalBossId: string;       // 对应某个 enemy.id
  brief: string;             // 打字机文本
  ratingS: number;           // 分
  ratingA: number;
  ratingB: number;
}

// ─── 评分 ───
export type Rating = 'S' | 'A' | 'B' | 'C';

export interface MissionScore {
  missionId: string;
  timeSeconds: number;
  pickupRate: number;        // 0..1
  hitsTaken: number;
  total: number;             // 0..100
  rating: Rating;
}

// ─── RC 光源 ───
export type RcLightKind =
  | 'muzzle_flash' | 'explosion'
  | 'oil_lamp' | 'neon_sign' | 'searchlight' | 'surgical' | 'disco'
  | 'blood_splash';

export interface RcLightSpec {
  kind: RcLightKind;
  colorHex: string;          // '#rrggbb'
  intensity: number;         // 0..N
  radius: number;            // u
  ttl?: number;              // 秒,静态光源不设
  pulse?: 'sine' | 'rotate' | null;  // 静态光源可选脉动 / 旋转
  pulseHz?: number;
}

export interface ActiveRcLight {
  id: string;
  kind: RcLightKind;
  position: Vec2;
  colorRgb: { r: number; g: number; b: number };
  intensity: number;
  radius: number;
  ttl: number;               // 剩余 TTL(秒),静态 = Infinity
}

// ─── 事件(模拟 → 引擎 / UI)───
export type SimEvent =
  | { kind: 'fire'; ownerId: 'player' | string; weaponId: WeaponId; position: Vec2; angle: number }
  | { kind: 'melee'; ownerId: 'player' | string; weaponId: WeaponId; position: Vec2; angle: number }
  | { kind: 'throw'; ownerId: 'player' | string; weaponId: WeaponId; position: Vec2; velocity: Vec2 }
  | { kind: 'explosion'; position: Vec2; radius: number; damage: number }
  | { kind: 'enemyKilled'; enemyId: string; position: Vec2 }
  | { kind: 'playerKilled'; position: Vec2 }
  | { kind: 'weaponPicked'; weaponId: WeaponId }
  | { kind: 'maskPicked'; maskId: MaskId }
  | { kind: 'modeSwitch'; to: WeaponMode }          // v2 新增:F 切换
  | { kind: 'weaponThrown'; weaponId: WeaponId; position: Vec2 } // v2 新增:E 长按投掷
  | { kind: 'enemyAlert'; enemyId: string; position: Vec2 }
  | { kind: 'enemyAttack'; enemyId: string; position: Vec2 }
  | { kind: 'rcLightSpawned'; light: ActiveRcLight }
  | { kind: 'rcLightExpired'; lightId: string }
  | { kind: 'roomEnter'; roomId: string }
  | { kind: 'roomClear'; roomId: string }
  | { kind: 'missionEnd'; score: MissionScore }
  | { kind: 'sfx'; recipeId: string; volume?: number }
  | { kind: 'phaseChanged'; from: GamePhase; to: GamePhase };

// ─── 持久化 ───
export interface PersistedStats {
  totalMissions: number;
  bestScoreByMission: Record<string, number>;
  bestRatingByMission: Record<string, Rating>;
  lastMissionAt: number;       // unix ms
}

export interface PersistedSettings {
  muted: boolean;
  volume: number;              // 0..1
  rcQuality: 'low' | 'med' | 'high';
}

export interface PersistedUnlocks {
  masks: MaskId[];
  missions: MissionId[];
}

export type MissionId = 'm1_workshop' | 'm2_teahouse' | 'm3_print' | 'm4_postman';

// ─── 输入(v2 增补 toggleMode / throwWeapon)───
export type PlayerInput =
  | { kind: 'move'; dir: Vec2 }
  | { kind: 'aim'; angle: number }
  | { kind: 'attackStart' }          // LMB 按下(按当前 mode 攻击)
  | { kind: 'attackEnd' }
  | { kind: 'toggleMode' }           // F:切换近战 / 远程(v2)
  | { kind: 'interactStart' }        // E 按下(v2:拾取 / 开门)
  | { kind: 'throwStart' }           // E 长按 0.25s 后进入投掷(v2)
  | { kind: 'throwEnd' }
  | { kind: 'dash' }
  | { kind: 'dodge' }
  | { kind: 'reload' }
  | { kind: 'pause' }
  | { kind: 'quitToTitle' };

// ─── Simulation 接口 ───
export interface ISimulation {
  readonly phase: GamePhase;
  step(dt: number): void;
  input(action: PlayerInput): void;
  snapshot(): SimSnapshot;
  events: SimEvent[];          // 最近 N 个
}

export interface SimSnapshot {
  phase: GamePhase;
  player: Player;
  enemies: Enemy[];
  bullets: Bullet[];
  melee: MeleeSwing[];
  grenades: Grenade[];
  thrownWeapons: ThrownWeapon[];   // v2 新增
  activeLights: ActiveRcLight[];
  currentRoom: RoomLayout | null;
  currentMission: Mission | null;
  missionScore: MissionScore | null;
  lights: Record<RcLightKind, RcLightSpec>;
}
```

### 5.2 `core/constants.ts`(冻结,节选)

```ts
// 玩家(§4.4.1)
export const PLAYER_SPEED_MAX = 8;
export const PLAYER_ACCEL = 60;
export const PLAYER_DECEL = 80;
export const PLAYER_BOUND_X: [number, number] = [-16, 16];
export const PLAYER_BOUND_Y: [number, number] = [-9, 9];
export const PLAYER_RADIUS = 0.5;
export const PLAYER_MELEE_RANGE = 1.4;
export const PLAYER_MELEE_ARC_DEG = 60;
export const PLAYER_MELEE_DURATION = 0.2;
export const PLAYER_DASH_SPEED = 14;
export const PLAYER_DASH_DURATION = 0.2;
export const PLAYER_DASH_COOLDOWN = 1.0;
export const PLAYER_DODGE_INVULN = 0.4;
export const PLAYER_DODGE_COOLDOWN = 1.5;
export const PLAYER_RELOAD_DURATION = 1.5;
export const PLAYER_HITS_TO_KILL_BOSS = 3;
// v2:模式切换硬直 / E 长按投掷阈值
export const MODE_SWITCH_DURATION = 0.15;
export const THROW_HOLD_DURATION = 0.25;

// 武器(§4.4.2)— 完整数据在 core/data/weapons.ts
export const WEAPON_TABLE: Record<WeaponId, WeaponSpec> = { ... };

// 面具(§4.4.3)— 完整数据在 core/data/masks.ts
export const MASK_TABLE: Record<MaskId, MaskSpec> = { ... };

// 敌人(§4.4.4)
export const ENEMY_VIEW_DISTANCE = 8;
export const ENEMY_VIEW_ARC_DEG = 60;
export const ENEMY_HEAR_DISTANCE = 4;
export const ENEMY_FIRE_DISTANCE = 14;
export const ENEMY_SPEED_PATROL = 3;
export const ENEMY_SPEED_ALERT = 5;
export const ENEMY_REACT_TIME = 0.4;
export const ENEMY_FIRE_RATE = 1.5;
export const ENEMY_HITS_TO_KILL = 1;
export const BOSS_HITS = 3;

// 任务(§4.4.5)
export const MISSION_DURATION_TARGET = 180;
export const ROOM_ENTER_FADE = 1.0;
export const ROOM_CLEAR_DELAY = 0.8;
export const ROOM_EXIT_FADE = 0.5;
export const DEATH_RESPAWN_DELAY = 1.2;
export const BRIEF_TYPEWRITER_SPEED = 0.04;
export const TASKS_TOTAL = 4;
export const HIDDEN_TASK_REQUIRED_S = 3;
export const SCORE_S_THRESHOLD = 90;
export const SCORE_A_THRESHOLD = 75;
export const SCORE_B_THRESHOLD = 60;
export const SCORE_C_THRESHOLD = 0;

// RC 管线(§4.4.6)— v2 按 radiance-cascades-demo 真实算法
export const RC_CASCADE_COUNT = 3;
export const RC_BASE_RAY_COUNT = 4;
export const RC_BASE_INTERVAL_PX = 6;
export const RC_JFA_PASSES = -1;     // -1 = 运行时按 log2(min(W,H)) 计算
export const RC_JFA_RESOLUTION_SCALE = 0.5;
export const RC_LIGHT_RADIUS_FALLOFF = 'inverse-square';
export const RC_LIGHT_INTENSITY_GAMMA = 2.2;
export const RC_MAX_ACTIVE_LIGHTS = 16;
export const RC_HALF_RES_SCALE = 0.5;
export const RC_DITHER_MATRIX_SIZE = 4;
export const RC_RAY_BUDGET_PER_PIXEL = 16;
export const RC_RAY_BUDGET_TOTAL_HARD_CAP = 64;
export const RC_MAX_RAY_STEPS = 128;   // demo rc.frag 常量
export const RC_EPS = 0.0005;          // demo rc.frag 常量
export const RC_PROPAGATION_RATE = 0.85;
export const RC_MIX_FACTOR = 0.5;
export const RC_PERF_DEGRADE_FRAMES = 3;
export const RC_RECOVERY_FRAMES = 120;

// RC 光源(§4.4.7)— 完整数据在 core/data/lights.ts
export const RC_LIGHT_TABLE: Record<RcLightKind, RcLightSpec> = { ... };

// 调色板(§4.4.8,v1.1 推更饱和对照 HM 真机)
export const PAL_INK = '#0a0910';
export const PAL_PLASTER = '#2a2638';
export const PAL_RUST = '#7a2a1c';
export const PAL_TEAL = '#1a5a5a';
export const PAL_LANTERN = '#e54a1a';
export const PAL_NEON = '#ff2a44';
export const PAL_PAPER = '#e8dca0';
export const PAL_IVORY = '#f5e6b8';
export const PAL_JADE = '#2a9a6a';
export const PAL_STEEL = '#4a4a52';
export const PAL_MUZZLE = '#ffaa3a';
export const PAL_BLOOD = '#d8201a';
// HM-借鉴色(v1.1):条带地板 / 砖块墙 / 霓虹青
export const PAL_STRIPE_PURPLE = '#6a3a8a';
export const PAL_STRIPE_TEAL = '#2a8a7a';
export const PAL_STRIPE_PINK = '#c84a7a';
export const PAL_WALL_RED_BRICK = '#8a3a2a';
export const PAL_WALL_BLUE_BLOCK = '#3a5a8a';
export const PAL_WALL_PLASTER_W = '#c8b896';
export const PAL_FLOOR_PLASTER = '#5a5048';
export const PAL_FLOOR_WOOD = '#6a4a2a';
export const PAL_EXTERIOR_GRAY = '#4a4a5a';
export const PAL_NEON_CYAN = '#2a9aff';
// viewport(v1.1):32×18u,1080p 下每 tile 60 像素
export const VIEWPORT_W = 32;
export const VIEWPORT_H = 18;
export const TILE_PIXELS = 60;
export const STRIPE_HEIGHT = 2;
// Zone palette(v3.2,§4.4.8)— 4 atmospheric zones 的视觉签名
export const ZONE_PALETTES: Record<ZoneId, ZonePalette> = {
  bund:       { primary: '#ff00aa', secondary: '#00ffff', ambient: '#1a0a14', cascadeCount: 2, decayMul: 1.0 },
  concession: { primary: '#d4a44a', secondary: '#5a8a9a', ambient: '#0a141a', cascadeCount: 3, decayMul: 1.0 },
  lilong:     { primary: '#c8341a', secondary: '#3a1410', ambient: '#050408', cascadeCount: 1, decayMul: 0.6 },
  creek:      { primary: '#c8a830', secondary: '#3a6a4a', ambient: '#0a1a0a', cascadeCount: 3, decayMul: 0.3 },
};
```

### 5.3 `engine/RcPipeline.ts` 接口契约(冻结)

```ts
// engine/RcPipeline.ts
import type { RoomLayout, ActiveRcLight } from '../core/types';

export interface RcPipelineConfig {
  cascadeCount: number;       // 1..3
  baseRayCount: number;       // 2..8
  baseIntervalPx: number;     // demo uBaseInterval(像素)
  jfaPasses: number;          // -1 = 自动(log2(min(W,H)))| 0..13 手动
  resolutionScale: number;    // 0.5 | 1.0
  ditherEnabled: boolean;
  propagationRate: number;    // v2 demo uPropagationRate
  mixFactor: number;          // v2 demo uMixFactor
}

export interface RcPipelineState {
  activeCascades: number;
  resolutionScale: number;
  ditherEnabled: boolean;
  lastFrameTimeMs: number;
  lightCount: number;
  jfaPasses: number;          // v2:实际执行的 JFA pass 数
  propagationRate: number;    // v2
  mixFactor: number;          // v2
  degraded: boolean;
}

export interface IRcPipeline {
  init(canvas: HTMLCanvasElement, config: RcPipelineConfig): Promise<void>;
  resize(width: number, height: number): void;
  render(
    sceneTexture: WebGLTexture,        // 来自 SceneManager 的全场景纹理
    lights: ActiveRcLight[],           // 来自 Simulation
    roomGeometry: RoomLayout,          // 用于 mask 生成
  ): void;
  state(): RcPipelineState;
  setConfig(partial: Partial<RcPipelineConfig>): void;
  destroy(): void;
}
```

---

## 6. 模块文件树(完整 src/ 布局)

```
src/
├── core/                                # 平台纯净(零 THREE / 零 DOM / 零 zustand)
│   ├── types.ts                         # 全部类型定义(§5.1 冻结)
│   ├── constants.ts                     # 全部 UPPER_SNAKE 常量(§5.2 冻结)
│   ├── math.ts                          # vec2 / lerp / clamp / distance / angle utils
│   ├── data/
│   │   ├── weapons.ts                   # WEAPON_TABLE(8 件,签名 = §4.4.2;扩展表 35 件路线)
│   │   ├── masks.ts                     # MASK_TABLE(6 个,签名 = §4.4.3;扩展表 25 个路线)
│   │   ├── lights.ts                    # RC_LIGHT_TABLE(8 类,签名 = §4.4.7)
│   │   ├── enemies.ts                   # 敌人 archetype 模板
│   │   ├── missions.ts                  # 4 个任务房间布局
│   │   ├── palette.ts                   # 调色板(§4.4.8 hex 列表)
│   │   └── sfx.ts                       # 音频合成配方
│   ├── world/
│   │   ├── WorldManifest.ts             # describeWorld() / describeRules() / describeEntities()
│   │   ├── roomTokenizer.ts             # string[] → tile grid
│   │   └── tileMap.ts                   # tile 查询(墙 / 灯 / 门)
│   └── simulation/
│       ├── Simulation.ts                # 协调器(实现 ISimulation)
│       ├── player.ts                    # 移动 / 冲刺 / 翻滚 / 模式切换(F)
│       ├── weapons.ts                   # 开火 / 换弹 / 拾取 / E 长按投掷
│       ├── enemyAI.ts                   # patrol → suspicious → alert → engaging
│       ├── damage.ts                    # 一击必杀 + BOSS 3 击
│       ├── masks.ts                     # 面具效果 dispatcher
│       ├── mission.ts                   # 任务 / 房间 / 评分
│       ├── rcnodes.ts                   # RC 光源注册(静态 + 活动)
│       ├── events.ts                    # SimEvent queue
│       └── pauseAndDeath.ts             # 暂停 / 死亡
│
├── engine/                              # 平台适配
│   ├── GameEngine.ts                    # 协调器(rAF 主循环)
│   ├── SceneManager.ts                  # 场景渲染(Three.js + 程序化 sprite)
│   ├── InputManager.ts                  # 键鼠输入(F / E hold / LMB / Shift / Space)
│   ├── AudioManager.ts                  # Web Audio 合成
│   ├── RcPipeline.ts                    # ⭐ 2D Radiance Cascades 全管线(§5.3)
│   ├── PerfWatchdog.ts                  # 帧时间监控 + 降级调度
│   ├── storage.ts                       # localStorage 适配
│   ├── devtools.ts                      # window.__gameManifest() / __sim / __rcPipeline
│   ├── shaders/                         # v2 按 demo 命名对齐
│   │   ├── fullscreen.vert              # GLSL 300 es,RC 通用顶点(demo default.vert)
│   │   ├── prepscene.frag               # 场景 → seed 纹理(occlusion + emission)
│   │   ├── prepjfa.frag                 # 种子编码
│   │   ├── jfa.frag                     # jump flood 单 pass(跳距减半)
│   │   ├── distfield.frag               # 距离场提取
│   │   ├── rc.frag                      # cascade probes(demo 原式)
│   │   ├── gi.frag                      # 单 pass GI 降级备选(demo 原式)
│   │   ├── final.frag                   # composite + dither
│   │   └── broken.frag                  # dev 测试
│   ├── postfx/
│   │   └── PostProcessPipeline.ts       # WebGL2 framebuffer 编排
│   └── sprites/
│       ├── PixelRenderer.ts             # 程序化 sprite 渲染
│       └── LightSprite.ts               # 灯位图块
│
├── store.ts                             # zustand UI 状态(仅 UI 可改)
├── components/
│   ├── HUD.tsx                          # HP / 弹药 / 当前武器+模式 / 任务进度
│   ├── MissionBrief.tsx                 # 电话文本(打字机效果)
│   ├── MissionSelect.tsx                # 任务选择
│   ├── MaskSelect.tsx                   # 面具选择
│   ├── ScoreOverlay.tsx                 # 评分
│   ├── DevPanel.tsx                     # RC 参数调参(DEV only)
│   ├── MainMenu.tsx                     # 标题
│   └── DeathScreen.tsx                  # 死亡 / 重试
│
├── App.tsx                              # 根组件
└── main.tsx                             # 入口
```

---

## 7. 每 Tick 数据流

```
[input] 键鼠 ──→ InputManager ──→ Simulation.input(action)(含 toggleMode / throwStart)
                                              ↓
                                       Simulation.step(FIXED_DT)
                                              ↓
                                       emit SimEvent(含 modeSwitch / weaponThrown)
                                              ↓
                                       events.push(...)
                                              ↓
[render] GameEngine.update()
              ├─ SceneManager.update(dt)         ← camera follow, sprite 位置
              ├─ AudioManager.update(dt)         ← voice 调度
              ├─ RcPipeline.render(sceneTex, lights, room) ← 6-stage(§15)
              │     ├─ prepscene pass
              │     ├─ prepjfa
              │     ├─ JFA × log2(min(W,H))
              │     ├─ distfield
              │     ├─ cascade × 3(ping-pong)
              │     └─ final + dither
              └─ store.sync(sim.snapshot())      ← 每 2 帧 1 次
                                              ↓
[ui]    React 渲染 HUD / 任务简报 / 死亡画面
```

---

## 8. 构建创建(里程碑 + 验收标准)

### 8.1 M0(本次,设计冻结)

- **交付**:`GDD.md` v2 + `TDD.md` v2 + `AGENTS.md` + `package.json` + `vite.config.ts` + `tsconfig.*` + `index.html` + 完整目录结构 stub
- **验收**:`npx tsc -b --noEmit` 0 error + 浏览器加载 `index.html` 渲染占位画面(灰底 + 标题文字)
- **签核**:agent-qa + 用户

### 8.2 M1(单房间 + RC 全管线验证,v3 重切 = 命题证明 + 拆灯机制)

#### 8.2.0 M1.0 BLINDSIDE Spike(3 天,2026-08-09 起,v3 整合入口)

> **M1.0 必须在 M1.1 之前完成**。目标:跑通"一间房 + 一个灯 + 一个敌人 + 拆灯 + 击杀"端到端,产出 D1-D8 决策值。
> 完整规范见 [docs/design/09-blindside-integration.md §13](docs/design/09-blindside-integration.md)。

| 日 | 任务 | 关键文件 | 验收 |
|----|------|----------|------|
| Day 1 | `LightField` 接口 + `glReadPixels` 8×8 downsample;`flashlight_patrol` archetype 数据 | `core/world/lightField.ts`(新),`core/data/enemies.ts` | unit test 3 通过;TS 0 error |
| Day 2 | RC 管线追加 `uLightShieldThreshold` / `uLightExposedThreshold`;`final.frag` 写 lightField cache | `engine/shaders/{rc,gi,final}.frag` | `__rcPipeline.state()` 新字段可见 |
| Day 3 | `BREAKABLE_LIGHT_HP=2` 默认,灯碎 → `invalidateLight` → 敌人状态切换;写 `09-playtest-notes-m1.0.md` 填 D1-D8 决策点 | `core/simulation/damage.ts` + `engine/RcPipeline.ts` | 玩:拆灯后 0.1s 敌人可被 OHK;白光闪 + sfx;D1-D8 全部填值 |

**M1.0 验收**:
- `tsc -b --noEmit` 0 error
- 玩家在暗中(灯灭):敌人半盲,可近身安静击杀
- 玩家在光下(灯亮):敌人警觉,0.4s 电报后敌弹 OHK(v3 `ENEMY_AIM_TELEGRAPH_S=0.4`)
- 拆灯 0.1s 后灯池内敌人转半盲(`DARK_VISION_MULT=0.5`)
- `09-playtest-notes-m1.0.md` 8 个决策点全部有数据

#### 8.2.1 M1.1 主线(沿用 v3 §0.1 M1 范围)

- **交付**:
  - 1 个最小房间(v3 像素锚定 1920×1080,tile 基准 48px,相机始终容纳整个房间)
  - RC v3 阶段:无 RC 基线 → 单级 final-pass(油灯 + 霓虹 + 枪火);cascade 3 级 = M2 性能目标
  - 1 件武器(knife)+ 拳头(空手近战 + 拆灯)+ 0 面具(M2 起全 9 个)
  - 1 个 `flashlight_patrol` 敌人(RC 灯锥视野)
  - 1 油灯 + 1 霓虹(均 breakable)
  - 简单 HUD(弹药 + 拆灯计数;无 S/A/B/C 评分,M1 = 通过 / 失败)
- **验收**:
  - `tsc -b --noEmit` 0 error
  - 浏览器 60 FPS @ 1080p 稳定(RC cascade=1)
  - 击杀时枪火瞬时亮起(RC 验证)
  - 油灯 / 霓虹常亮 + 可拆
  - 拆灯 0.1s 后敌人转半盲 + 可近身安静击杀
  - F 切换 = 瞬时(0s 硬直)
  - AimFocus(M6)Shift 长按可用
  - 死亡清空武器/弹药/击杀数,任务 Room 1 重开
- **签核**:agent-qa + 用户

#### 8.2.2 M1 子批次(沿用 MVP-PLAN,顺移 3 天)

| Sub-batch | 目标 | 关键文件 | Agent | 估时 |
|-----------|------|----------|-------|------|
| **M1.0** | **BLINDSIDE spike**(lightField + 拆灯端到端) | `core/world/lightField.ts` + `core/simulation/damage.ts` + `engine/shaders/{final,rc,gi}.frag` | agent-core.1 + agent-engine.1 + agent-engine.3 | 3 天 |
| **M1.1** | Simulation + 玩家移动 + F 切换 + LMB 拆灯优先 | `core/simulation/Simulation.ts` + `core/simulation/player.ts` | agent-core.4 | 4-5 天(v3 §0.1 输入手感预算) |
| **M1.2** | 1 个最小房间(像素锚定 layout) | `core/data/missions.ts` + `core/data/enemies.ts`(`flashlight_patrol` 数据) | agent-core.3 | 1-2 天 |
| **M1.3** | RC final-pass(单级,非 6 阶段) | `engine/shaders/{fullscreen.vert, prepscene.frag, final.frag}` | agent-engine.2-3 | 3-4 天 |
| **M1.4** | 1 件武器(knife)+ 拳头 + LMB 拆灯优先 + 0 面具 | `core/data/weapons.ts` + `core/simulation/weapons.ts` | agent-core.2 | 1-2 天 |
| **M1.5** | GameEngine + SceneManager + InputManager + HUD 集成 | `engine/{GameEngine,SceneManager,InputManager}.ts` + `components/HUD.tsx` | agent-engine.1 + agent-ui | 2-3 天 |
| **M1.6** | **lampmaker 面具提前实现 + 验证**(M7 推进) | `core/data/masks.ts` + `components/MaskSelect.tsx`(临时调试入口) | agent-core.2 + agent-ui | 1 天 |

**M1 验收**(M1.0 + M1.1-M1.6 全部完成):
- 上 8.2.1 + 8.2.0 全部
- `lampmaker` 闪灯 / 按灯已 ship,可作为机制验证
- AimFocus / ReloadIndicator / ThrowArc 三项 M3 子机制在 M1.6 一起 ship(降 UI 集成成本)

### 8.3 M2(任务 1 完整)

- **交付**:
  - 任务 1 (`m1_workshop`) 3 个房间 + BOSS
  - 8 件武器 + E 长按投掷
  - 6 个面具
  - 评分系统
  - 死亡 / 重试流程
  - RC 性能调优(含 `uPropagationRate` / `uMixFactor` 调参)
- **验收**:`tsc -b --noEmit` 0 error + 任务 1 完整通关 + 评分 S/A/B/C + 0 console error
- **签核**:agent-qa + 用户

### 8.4 M3(全 4 任务)

- **交付**:
  - 任务 2 / 3 / 4(含隐藏)
  - 标题 / 任务选择 / 面具选择 / 死亡 UI
  - 音频完整合成
- **验收**:4 任务可全通 + 隐藏任务可见性条件正确 + 0 console error
- **签核**:agent-qa + 用户

### 8.5 M4(调优 + 部署)

- **交付**:
  - RC 性能调优 + 降级路径
  - Web Audio 调音
  - localStorage 存档
  - 浏览器冒烟测试(零 console error)
  - Vite build 通过 + 部署 preview
- **签核**:agent-qa + 用户

---

## 9. 资源管理与文件格式

- **资源 = 零文件**。所有 sprite / 音频 / 地图全部程序化:
  - sprite:`engine/sprites/PixelRenderer.ts` 程序化绘制 16×16 像素块(用 `ImageData` 写 canvas)。
  - 音频:`core/data/sfx.ts` 配方 + `engine/AudioManager.ts` 实时 `AudioContext` 合成。
  - 地图:`core/data/missions.ts` ASCII 字符串 → `core/world/roomTokenizer.ts` 解析。
- **shader**:GLSL 300 es,放 `engine/shaders/`,运行时通过 Vite `?raw` 导入;**移植源 = `radiance-cascades-demo/res/shaders/`(rc.frag / prepscene.frag / prepjfa.frag / jfa.frag / distfield.frag / gi.frag / final.frag / default.vert)**,按 §15 契约做 GLSL 330 → 300 es 迁移。
- **持久化**:localStorage,3 个键(见 §3.3)。
- **外部网络资源**:无。

---

## 10. 分支政策

- `master` = 部署分支
- `feature/m1-rc-pipeline` = M1 期间 RC 管线开发
- `feature/m2-mission1` = M2 任务 1
- `feature/m3-all-missions` = M3 全任务
- 每次合并必须 `npx tsc -b --noEmit` 0 error
- 每次合并前必须由 agent-qa 跑浏览器冒烟(若 M1+ 有可运行页面)

---

## 11. 工具指令

| 用途 | 命令 |
|------|------|
| 安装 | `npm install`(M1 第一次) |
| 开发 | `npm run dev` → http://localhost:5184 |
| 构建 | `npm run build` |
| 类型检查 | `npx tsc -b --noEmit` |

---

## 12. 风险登记册

| 风险 | 概率 | 影响 | 对策 |
|------|------|------|------|
| **RC WebGL2 1080p 掉帧(JFA 10-11 pass)** | 高 | 高 | M1 必搭降级路径;M1 末强制 playtest;`RC_CASCADE_COUNT` 默认 3,可降到 2;JFA 跳距下限设 2 |
| **RC 软光吃像素颗粒** | 高 | 中 | dither 回压(M2 实现);强度 0.5 兜底 |
| **1937 历史敏感度** | 中 | 高 | GDD §2.4 处理原则;M2 任务文本评审 |
| **一击必杀 → 太难** | 中 | 中 | Room 1 强制教学 + 0.4s 翻滚无敌 |
| **F 切换手感(硬直 0.15s 太慢 / 太快)** | 中 | 中 | `MODE_SWITCH_DURATION` 进调参面板;M1 末 playtest 定案 |
| **E 长按投掷误触(拾取 vs 投掷)** | 中 | 中 | 0.25s hold 阈值 + 投掷时有准星提示;可走 `[TDD-CONTRACT-CHANGE]` |
| **AI 视野冲突(RC 灯下高 / 暗处低)** | 中 | 中 | M1 末实测;不行就 RC 光源 → 视野距离 直接挂钩 |
| **音频刺耳** | 中 | 中 | 短音 + lowpass;M2 末耳机 playtest |
| **DONE 时间不够** | 中 | 中 | §8 + 砍清单硬纪律;每周末 review |
| **Three.js EffectComposer 集成 RC 兼容** | 中 | 中 | M1 优先用 raw WebGL2 framebuffer 编排;Three.js 仅做 SceneManager |

---

## 13. 验证计划

- **M0**:`npx tsc -b --noEmit` 0 error + 占位页面加载
- **M1 起**:`tsc -b --noEmit` 0 error + 浏览器冒烟(60 FPS 验证 + 视觉对比)
- **每个 M 末**:agent-qa 用 kilo-playwright MCP 跑过 5 个测试点 + 截图
- **M4 末**:完整 4 任务通关测试 + RC 性能打点

---

## 14. 代理任务拆分(原子级,文件所有权白名单)

> KIMI3 DDD 多代理工作流:每个 agent 只改白名单内的文件。

### 14.1 agent-core(M1 起)

**职责**:实现 core/ 全部纯逻辑,**零** THREE / 零 DOM / 零 zustand。
**白名单**:
- `src/core/types.ts`(初始化 §5.1 全部类型,含 v2 `WeaponMode` / `ThrownWeapon` / `PlayerInput`)
- `src/core/constants.ts`(初始化 §5.2 全部常量,含 v2 `MODE_SWITCH_DURATION` / `THROW_HOLD_DURATION` / `RC_JFA_PASSES=-1` / `RC_PROPAGATION_RATE` / `RC_MIX_FACTOR`)
- `src/core/math.ts`
- `src/core/data/weapons.ts`
- `src/core/data/masks.ts`
- `src/core/data/lights.ts`
- `src/core/data/enemies.ts`
- `src/core/data/missions.ts`
- `src/core/data/palette.ts`
- `src/core/data/sfx.ts`
- `src/core/world/WorldManifest.ts`
- `src/core/world/roomTokenizer.ts`
- `src/core/world/tileMap.ts`
- `src/core/simulation/Simulation.ts`
- `src/core/simulation/player.ts`(含 F 模式切换 / 硬直)
- `src/core/simulation/weapons.ts`(含 E 长按投掷)
- `src/core/simulation/enemyAI.ts`
- `src/core/simulation/damage.ts`
- `src/core/simulation/masks.ts`
- `src/core/simulation/mission.ts`
- `src/core/simulation/rcnodes.ts`
- `src/core/simulation/events.ts`
- `src/core/simulation/pauseAndDeath.ts`

**M1 子任务**(可拆分):
- **agent-core.1**:types.ts + constants.ts + math.ts(冻结签名,含 v2 增补)
- **agent-core.2**:data/{weapons,masks,lights,palette}.ts
- **agent-core.3**:data/{enemies,missions,sfx}.ts
- **agent-core.4**:simulation/{Simulation,player,weapons,events}.ts(含 mode switch / throw hold)
- **agent-core.5**:simulation/{enemyAI,damage,masks,mission,rcnodes,pauseAndDeath}.ts
- **agent-core.6**:world/{WorldManifest,roomTokenizer,tileMap}.ts

### 14.2 agent-engine(M1 起,**本项目最重**)

**职责**:实现 engine/ 全部平台适配 + RC 管线 + shader(移植 `radiance-cascades-demo` 算法到 WebGL2)。
**白名单**:
- `src/engine/GameEngine.ts`
- `src/engine/SceneManager.ts`
- `src/engine/InputManager.ts`(F / E hold / LMB / Shift / Space)
- `src/engine/AudioManager.ts`
- `src/engine/RcPipeline.ts` ⭐
- `src/engine/PerfWatchdog.ts`
- `src/engine/storage.ts`
- `src/engine/devtools.ts`
- `src/engine/shaders/*.vert`
- `src/engine/shaders/*.frag`
- `src/engine/postfx/PostProcessPipeline.ts`
- `src/engine/sprites/PixelRenderer.ts`
- `src/engine/sprites/LightSprite.ts`

**M1 子任务**:
- **agent-engine.1**:GameEngine + SceneManager + InputManager 骨架
- **agent-engine.2**:RcPipeline + PostProcessPipeline 骨架(6-stage 编排)
- **agent-engine.3**:shader/fullscreen.vert + prepscene.frag + prepjfa.frag + jfa.frag(demo 移植)
- **agent-engine.4**:shader/distfield.frag + rc.frag + gi.frag + final.frag(demo 移植 + dither)
- **agent-engine.5**:AudioManager + storage + devtools + PerfWatchdog

### 14.3 agent-audio(M1 起)

**职责**:Web Audio 合成 + 配方。
**白名单**:
- `src/engine/AudioManager.ts`(与 engine 协作)
- `src/core/data/sfx.ts`(配方数据)
- `docs/design/03-audio-direction.md`

### 14.4 agent-ui(M0 起)

**职责**:React UI 覆盖层。
**白名单**:
- `src/main.tsx`
- `src/App.tsx`
- `src/store.ts`
- `src/components/*.tsx`
- `src/index.html`
- `src/tailwind.config.js`
- `src/postcss.config.js`

**M0 子任务**:
- **agent-ui.0**:**仅写 M0 阶段的占位 `App.tsx` + `main.tsx`**(灰底 + 标题文字 + 加载状态)

### 14.5 agent-qa(M0 起,无文件所有权)

**职责**:集成验证 + 浏览器冒烟。
- M0:`tsc -b` + 页面加载验证
- M1+:kilo-playwright MCP 跑过 5 个测试点 + 截图

---

## 15. 2D RC 管线契约(本项目最重模块,独立章节)

> 详细 RC 管线设计见 `docs/design/04-radiance-cascades-pipeline.md`(v2 需按 demo 更新)。
> **移植源**:`C:\Git-repo-3rd\Radiance_Cascade_repos\radiance-cascades-demo\res\shaders\` — rc.frag / prepscene.frag / prepjfa.frag / jfa.frag / distfield.frag / gi.frag / final.frag / default.vert。
> 本节冻结 agent-engine 的接口、pass 顺序、probe 数学与 Shader 清单;GLSL 330 core → 300 es 迁移时只改语法,不改算法。

### 15.1 RC 管线 6 阶段总览

```
[1] prepscene pass    SceneManager 的全场景纹理(occlusion + emission 两路)→
                       texture: sceneSeed(RGBA: 地板=编码纹理坐标 seed / 墙=空 / 光源=光色)
[2] prepjfa pass      sceneSeed → jfaSeed(统一格式,alpha=有无 seed)
[3] JFA × log2(min(W,H)) passes(跳距 n/2, n/4, ..., 1;9 邻域)
                       → 每像素 RG=最近 seed 的纹理坐标,B=距离
[4] distfield pass    jfaSeed(final) → texture: sceneSdf(R=到最近墙的归一化距离)
[5] cascade × N(默认 3,ping-pong FB)
                       sceneSdf + sceneSeed(光) + 灯位表 →
                       texture: sceneRadiance(RGB=间接光, A=占位)
[6] final pass        sceneTexture + sceneRadiance + dither(4×4 Bayer)→
                       default framebuffer(屏幕)
```

### 15.2 Probe 数学(冻结,demo rc.frag 原式)

```glsl
// 每 pass 计算(索引 index = 0..cascadeCount-1)
probeAmount  = pow(uBaseRayCount, index);            // 该级 probe 总数
spacing      = sqrt(probeAmount);                    // 每维 probe 数
size         = 1.0 / vec2(spacing);                  // probe 屏幕尺寸(uv 域)
position     = mod(fragCoord, size) * spacing;       // 在 probe 内的相对坐标
rayCount     = pow(uBaseRayCount, index + 1);        // 角度分辨率(指数增长)
intervalStart = (index == 0) ? 0.0
              : a * pow(uBaseRayCount, index)   / min(W, H);   // a = uBaseInterval(px)
intervalEnd   = a * pow(uBaseRayCount, index + 1) / min(W, H);

// 每 ray:radiance_interval(uv, dir, a, b)
//   距离场步进,MAX_RAY_STEPS=128,EPS=0.0005
//   命中表面 → 采样 scene 色(可选 mix 上级 lighting + uPropagationRate)
//   未命中 → 从 uLastPass(上级 cascade)采样合并(merge)
radiance = Σ(ray samples) / uBaseRayCount + ambient
```

- `RC_BASE_RAY_COUNT=4` 时:cascade 0 → 4 ray / cascade 1 → 16 ray / cascade 2 → 64 ray。
- 角度按 `(index / rayCount) * TWO_PI` 均分;方向需乘宽高比修正(`vec2(cos(angle) * min(W,H)/max(W,H), sin(angle))`)。
- 合并条件:`deltaRadiance.a == 0.0`(该区间无命中)时从 `uLastPass` 取上级 probe 的对应 uv(`p.position / up.spacing` 偏移,clamp 到像素范围)。

### 15.3 RC Shader 清单(全部 GLSL 300 es,移植自 demo;v3.1 增光暗机制 uniforms)

| Shader | 职责 | 输入纹理 | 输出纹理 | Uniforms 关键 |
|---|---|---|---|---|
| `fullscreen.vert` | 全屏三角形(demo default.vert) | — | — | `aPosition` |
| `prepscene.frag` | seed 纹理(occlusion + emission 合并) | sceneTexture(RGBA) | sceneSeed RGBA | `uOcclusionMap`, `uEmissionMap`, `uBrushSize`, `uBrushColor`(灯位) |
| `prepjfa.frag` | 种子编码 | sceneSeed | jfaSeed RGBA(UV 编码) | — |
| `jfa.frag` | 单 pass jump flood(9 邻域,跳距减半) | jfaSeed(prev) | jfaSeed(next) | `uJumpSize` |
| `distfield.frag` | 距离场提取 | jfaSeed(final) | sceneSdf R | — |
| `rc.frag` | cascade probes(demo 原式) | sceneSdf + sceneSeed + uLastPass | cascadeBuffer RGBA | `uCascadeIndex`, `uCascadeAmount`, `uBaseRayCount`, `uBaseInterval`, `uPropagationRate`, `uMixFactor`, `uAmbientColor`, `uSrgb` |
| `gi.frag` | 单 pass GI 备选(降级 RC_OFF 前最后一档) | sceneSdf + sceneSeed + uLastFrame | giBuffer RGBA | `uRayCount`, `uNoise`, `uPropagationRate`, `uMixFactor` |
| `final.frag` | **v3.1 改**:composite + dither + **写 lightField 缓存** | sceneTexture + cascadeBuffer | default framebuffer + **1 × 240×135 R32F `uLightField`** | `uDitherEnabled`, `uTime`, **`uLightShieldThreshold=0.30`**, **`uLightExposedThreshold=0.10`**, `uLightFieldOut`(缓存输出) |
| `broken.frag` | dev 测试 | — | default framebuffer | — |

**v3.1 final.frag 关键变更**(BLINDSIDE 整合):
```glsl
// final.frag (GLSL 300 es) 片段
uniform float uLightShieldThreshold;   // 0.30 (LIGHT_SHIELD_THRESHOLD)
uniform float uLightExposedThreshold;  // 0.10 (LIGHT_EXPOSED_THRESHOLD)
layout(location=0) out vec4 fragColor;
layout(location=1) out float lightField;  // 1 × 240×135 R32F

void main() {
  // ... 沿用 v2 composite + dither
  fragColor = vec4(sceneColor.rgb * radiance.rgb + ditherNoise, 1.0);
  
  // v3.1: 写 lightField cache(CPU 端 glReadPixels 8×8 降采样)
  // 评估 = cascadeBuffer.a (已归一化辐射强度 0..1)
  lightField = cascadeBuffer.a;
}
```

**CPU 端 LightFieldCache**(`core/world/lightField.ts`):
- `glReadPixels(0, 0, 240, 135, R32F, FLOAT)` — 8×8 downsample,~0.2ms / 帧
- `sampleAt(worldPos)` 双线性插值 downsample → 返回 0..1
- 0.4ms 硬上限(§3.5 预算表)
- RC 降级到 cascade=0 时,`update()` 空实现,`sampleAt()` 恒返回 0(v3.1 §3.6 硬底联动)

### 15.4 RC 管线 API 契约

```ts
// engine/RcPipeline.ts — 完整实现由 agent-engine 负责
// 接口见 §5.3

// v3.1 扩展(v3 整合 — 详见 §4.6 / 09)
export interface RcPipelineConfig {
  cascadeCount: number;       // 1..3
  baseRayCount: number;       // 2..8
  baseIntervalPx: number;     // demo uBaseInterval(像素)
  jfaPasses: number;          // -1 = 自动(log2(min(W,H)))| 0..13 手动
  resolutionScale: number;    // 0.5 | 1.0
  ditherEnabled: boolean;
  propagationRate: number;    // v2 demo uPropagationRate
  mixFactor: number;          // v2 demo uMixFactor
  // v3.1:
  lightShieldThreshold: number;    // 0.30 → uLightShieldThreshold uniform
  lightExposedThreshold: number;   // 0.10 → uLightExposedThreshold uniform
  lightFieldEnabled: boolean;      // false = 禁用 lightField cache(CPU 端不读)
  lightFieldResolution: { w: number; h: number };  // 默认 240×135(1080p 下 8×8 降采样)
}

export interface RcPipelineState {
  activeCascades: number;
  resolutionScale: number;
  ditherEnabled: boolean;
  lastFrameTimeMs: number;
  lightCount: number;
  jfaPasses: number;          // v2:实际执行的 JFA pass 数
  propagationRate: number;    // v2
  mixFactor: number;          // v2
  degraded: boolean;
  // v3.1:
  lightShieldThreshold: number;
  lightExposedThreshold: number;
  lightFieldEnabled: boolean;
  lightFieldLastUpdateMs: number;   // 上次 glReadPixels 耗时
}
```

**关键实现要求**:
- **WebGL2 上下文**(不用 WebGL1)
- **3 个 framebuffer 乒乓 + 1 × 240×135 R32F lightField FB**(v3.1 增 1 个,~0.13MB)
- **所有 pass 用全屏三角形**(`fullscreen.vert`)
- **JFA pass 数**:运行时 `log2(min(W,H))` 取整(1080p ≈ 10-11),跳距序列 `2^⌊log2(minW)⌋, ..., 1`;`setConfig({ jfaPasses: n })` 可手动覆盖(截断序列,降级用)
- **降级路径**:cascade 数 3 → 2 → 1 → 0;resolution 1.0 → 0.5;仍超 → `gi.frag` 单 pass → 最后 RC 全关回退 base color;cascade=0 时 `lightFieldEnabled=false`,CPU 端 cache 不更新,`lightField.sampleAt()` 恒返回 0(§3.6 硬底联动)
- **dither 回压**:4×4 Bayer matrix,`final.frag` 内置;可被 `setConfig({ ditherEnabled: false })` 关闭
- **v3.1 lightField cache**:final-pass 同时写光场 cache(fragColor + lightField 两个 attachment),CPU 端 `glReadPixels` 8×8 downsample;每帧 1 次,成本 ~0.2ms(§3.5 预算)
- **PROD 性能**:`tsc -b` 0 error + 浏览器 60 FPS @ 1080p(§3.5 预算)

### 15.5 RC 性能硬约束

- 单帧 RC 全管线 ≤ 9.5ms(预算,= §3.5 分项之和)/ 15ms(硬上限),见 §3.5
- cascade 1 / 2 / 3 之间用 ping-pong framebuffer
- `RC_MAX_ACTIVE_LIGHTS = 16`(超过则按"距离屏幕中心"排序丢远)
- JFA 中间 pass 数量是 1080p 的主要成本,降级时**优先截断跳距序列尾部**(跳距 1 的 pass 可跳过,代价是 ±1px 精度)

### 15.6 RC 调试接口(DEV only,v3.1 增 lightField 字段)

- `__rcPipeline.state()` 返回:`{ activeCascades, resolutionScale, ditherEnabled, lastFrameTimeMs, lightCount, jfaPasses, propagationRate, mixFactor, degraded, lightShieldThreshold, lightExposedThreshold, lightFieldEnabled, lightFieldLastUpdateMs }`
- DEV 模式下 `DevPanel.tsx` 提供 Tweakpane 调参面板(实时改 `RC_CASCADE_COUNT` / `RC_BASE_RAY_COUNT` / `RC_BASE_INTERVAL_PX` / `RC_PROPAGATION_RATE` / `RC_MIX_FACTOR` / dither 开关 / jfaPasses / **LIGHT_SHIELD_THRESHOLD** / **LIGHT_EXPOSED_THRESHOLD** / **lightFieldEnabled**)
- v3.1 新增 `__lightField` 调试对象:返回 `LightFieldCache.downsample`(`Float32Array(240*135=32400)`)只读快照,可在 DevTools console 可视化(M1.0 spike 调参)

---

## 附录 A:文档版本

| 版本 | 日期 | 作者 | 变更 |
|------|------|------|------|
| v1 | 2026-08-08 | Mavis (设计阶段) | 初稿,与 GDD v1 对账 |
| v2 | 2026-08-08 | Mavis (设计阶段) | F 切换 / E 长按投掷 / 武器面具铺量 / RC 按 demo 真实算法(JFA log2、probe 数学、propagationRate、mixFactor)/ 背景淞沪 |

## 附录 B:依赖文档

- GDD(设计层权威):`GDD.md`(根目录 v2 瘦身版;v1/v2 原始版存档于 `v2/`)
- 设计细节:`docs/design/01..04-*.md`(v2 需同步 01 / 04)
- 里程碑 + agent 拆分:`MVP-PLAN.md`
- 项目级规则:`AGENTS.md`
- RC 技术参考:`C:\Git-repo-3rd\Radiance_Cascade_repos\radiance-cascades-demo`(C++/Raylib;`res/shaders/rc.frag` 等为移植源)
- v1 基线:`../TDD.md`(v1 冻结契约,本文件继承其未改动部分)
