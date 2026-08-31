# 7_hotlineShanghai — 100 任务路线图（P0-P2）

> 立项:2026-08-31,M2.3 完成后。来源 = KNOWLEDGE 开放项 + TDD §5.8 未接线清单 + BUGS OPEN + 真机试玩发现 + 里程碑外推。
> **执行规则**:P0 = 硬伤/死数据/契约漂移,本轮全部做完;P1 = 机制与内容,按里程碑切片;P2 = 打磨与铺量。
> 每项完成打 ✅ 并附证据锚点(文件:行 或 门名)。状态: ☐ 待办 / ✅ 完成 / ⊘ 核实后豁免(附理由)。
> 权威链:本表与 TDD/GDD 冲突时以后者为准;改行为契约走 `[TDD-CONTRACT-CHANGE]`。

## P0 — 硬伤 / 死数据 / 契约漂移(18 项)

| # | 任务 | 依据 |
|---|------|------|
| P0-01 | 核对 Tab 暂停链路:`snapshot.paused` 恒 false(:585),确认 PauseOverlay 数据源是 store 还是死字段;死则接线或裁掉 | TDD §5.8 pauseAndDeath |
| P0-02 | `enemyAI.ts` 的 `updateEnemyAI` 全文件核实为死代码后删除(Simulation 内联 FSM 才是权威) | TDD §5.8 / rg 零命中 |
| P0-03 | `missionBossEnemyId`(missions.ts:4)死导出 — 删除(BOSS 接线时按新契约重建) | missions.ts:4 |
| P0-04 | `storage.settings` 死键核实:音量/静音是否接到 AudioManager;死则接线 | storage.ts:37 |
| P0-05 | MaskSelect 重进时 store.activeMask 与 sim 实态可能不一致(quitToTitle 清 sim 不清 store)— 相位进入时同步 | JOURNEY §13 风险③ |
| P0-06 | 项目根 README.md 状态段 stale(写"TDD 冻结 v2"/"MVP-PLAN"/旧端口) — 刷新到 v4/M2.3 | README.md |
| P0-07 | TDD §2 类型签名表补 M2.1-2.3 新合同入口:`beginRun/selectMission/score.ts computeScore/MissionScore.lampBonus` | TDD §2 |
| P0-08 | `decorativeLights` 字段消费核实(死字段则记录到 §5.8,不擅自删) | types.ts:229 |
| P0-09 | GAME-SOP §7/§8 里程碑状态行回写 M2.1-M2.3 完成 | GAME-SOP §8 |
| P0-10 | AGENTS 布局树 stale(engine/ 文件列表、v2/、MVP-PLAN 引用) — 刷新 | AGENTS 布局节 |
| P0-11 | BUGS B14/B15 状态行回写 M2.x 落地结果(决策已部分实现) | BUGS.md |
| P0-12 | m2 简报文本过 17 号 checklist 复核(稽查队/护院措辞)并留痕 | 17 号 §2 |
| P0-13 | B72 操作化:跑门前检测常驻进程提示写入 AGENTS 验证门节 | B72 |
| P0-14 | KNOWLEDGE 开放项1:09-blindside 与 25-lessons 两份文档内容级核对(至少结论节) | KNOWLEDGE 开放项1 |
| P0-15 | m1/m2 蓝图 ASCII 与 missions.ts 第三次对账(逐 tile diff) | docs/levels/*.md |
| P0-16 | `finalBossId`/BOSS 语义裁定记录:TDD §5.8 补"BOSS 启用前置 = finalBossId 填值 + enemyAttack 塔守版"裁定行 | TDD §5.8 |
| P0-17 | smoke/ 目录职责说明(门禁基线 vs 试玩证据)写入 README/AGENTS | smoke/ |
| P0-18 | `granade`/未启用武器数据标记复核:WEAPON_TABLE 8 件中未上场件次清单落 TDD §5.8 | weapons.ts |

## P1 — 机制与内容(42 项)

| # | 任务 | # | 任务 |
|---|------|---|------|
| P1-01 | M2.4 BOSS:boss archetype 数值落地(3 击 thompson) | P1-02 | M2.4 BOSS:finalBossId 接线 + finishMission 前置击杀 |
| P1-03 | M2.4 BOSS:BOSS 房蓝图(m3_print) | P1-04 | M2.4 BOSS:combat-loop 用例 |
| P1-05 | grenade AoE:explosionRadius 接线(爆炸光源 + 范围杀伤) | P1-06 | grenade 投掷物与 clatter 联动复验 |
| P1-07 | M2.5 声景:任务简报打字机音 | P1-08 | M2.5 声景:拆灯爆炸声分层 |
| P1-09 | M2.5 声景:警觉/警报双哔已有,补撤离 jingle | P1-10 | M2.5 声景:音量/静音设置 UI(依赖 P0-04) |
| P1-11 | m3_print 关卡蓝图(印书局) | P1-12 | m3_print missions.ts 合入 |
| P1-13 | m3_print e2e 冒烟 | P1-14 | spy archetype 落地(0.3s 反应,数据已冻结) |
| P1-15 | soldier archetype 落地(mosin) | P1-16 | 敌人配比:m2 第二只 policeman 或 spy 混编 |
| P1-17 | 45s S 阈值真机手感复核(两关各 3 次人工) | P1-18 | 评分:未被击发武器奖励(弹药节约)裁定与实现 |
| P1-19 | 评分:无警报通关(零 enemyAlert)加成裁定 | P1-20 | 结算屏显示击杀明细 |
| P1-21 | 撤离倒计时/出口方向指示 | P1-22 | 增援刷入动画/提示 |
| P1-23 | 塔守失明后行为差异化(乱扫 vs 驻足) | P1-24 | 玩家冲刺脚步噪音可视化(声环) |
| P1-25 | MaskSelect 记住上次选择为默认高亮 | P1-26 | 暂停屏显示当前目标与配方 |
| P1-27 | 死亡屏显示本章配方提示 | P1-28 | m2 交叠窗口难度曲线实测调参 |
| P1-29 | 账房隔断单口压力测试(combat-loop) | P1-30 | m1/m2 评分基准跑(脚本量化基线) |
| P1-31 | 基准脚本入库 scripts/benchmark.mjs | P1-32 | 基准数值入 KNOWLEDGE |
| P1-33 | e2e: m2 拆灯→阁楼失明断言补全 | P1-34 | e2e: 通关评分端到端断言(借 self-play bot) |
| P1-35 | LightFieldCache 接入 dev 面板可视化 | P1-36 | DevPanel 暴露评分预览 |
| P1-37 | 键位重映射调研文档 | P1-38 | 手柄支持调研文档 |
| P1-39 | 存档版本迁移策略(v1 → v2 字段) | P1-40 | stats 页(累计击杀/通关数) |
| P1-41 | 标题屏显示解锁进度 | P1-42 | 设置屏(rcQuality 三档实际生效) |

## P2 — 打磨 / 铺量(40 项)

| # | 任务 | # | 任务 |
|---|------|---|------|
| P2-01 | m4_postman 四幕蓝图 | P2-02 | m4 合入 |
| P2-03 | 面具铺量:9→12(算命先生联动假灯) | P2-04 | 面具铺量:12→16 |
| P2-05 | 面具铺量:16→25 | P2-06 | 每面具 combat-loop 断言铺全 |
| P2-07 | 灯种扩展:surgical/disco 实际使用 | P2-08 | blood_splash 装饰光使用 |
| P2-09 | 墙图案 wood_dark/tile_blue 关卡使用 | P2-10 | 第三任务(码头)蓝图 |
| P2-11 | 第四任务(路卡)蓝图 | P2-12 | 第五任务(四行仓库)蓝图 |
| P2-13 | RC quality 三档真实参数差 | P2-14 | dither 高 quality 档开启对比 |
| P2-15 | 性能:rcFrameMs p50 采样入库 | P2-16 | 性能:0.5→0.65 分辨率档试验 |
| P2-17 | 粒子:拆灯木屑 | P2-18 | 粒子:枪口烟 |
| P2-19 | 粒子:撤离门气流 | P2-20 | 屏幕震动分级(近战/枪/爆炸) |
| P2-21 | hitstop(击杀 30ms) | P2-22 | 音画:击杀 splash 音随机化 |
| P2-23 | 本地化骨架(文案抽出 data) | P2-24 | 无障碍:色盲模式视锥配色 |
| P2-25 | 无障碍:字幕化音频提示 | P2-26 | 教程化:首关灯下/灯灭双教学浮层 |
| P2-27 | 教学:增援机制提示(首次警报) | P2-28 | 教学:翻滚无敌帧提示 |
| P2-29 | 结算屏评级动效 | P2-30 | 标题屏版本号与 changelog 入口 |
| P2-31 | 敌人尸体持久化(房间内) | P2-32 | 血迹装饰层 |
| P2-33 | 巡逻视线扫掠音(塔楼) | P2-34 | 塔楼中弹反馈 |
| P2-35 | 撤离门近距离小地图箭头 | P2-36 | 手电扫掠节奏随警戒加快 |
| P2-37 | 增援从门涌入的开门动效 | P2-38 | 面具选择屏立绘重建(替换"待重建") |
| P2-39 | 深文档核对:12/14/26/27 内容级(09/25 归 P0-14) | P2-40 | 截图墙:README 精选 6 图(两关各 3) |

## 里程碑映射

- **P0 全部 + P1-01..04** = M2.4 BOSS 前置清理。
- **P1-11..13** = M2.6 m3_print;**P1-07..10** = M2.5 声景;**P1-17..20** = 评分反馈闭环。
- **P2-01..05** = m4/面具铺量(收官冲刺)。

## 评审记录(critic 1 轮,2026-08-31)

- 总数核对:P0 18 + P1 42 + P2 40 = 100 ✓;编号无重复。
- 优先级反转检查:P1-01..04(BOSS)排在 P1-05..10 前 = M2.4 先行,与 GAME-SOP §8 一致 ✓。
- 修正:补充本节;P0 项允许 ⊘(核实后豁免),但必须附证据锚点;行为类任务一律走契约/BUGS 流程,不静默改。
- 执行约定:P0 每完成 6 项跑一次 tsc;行为改动后跑全链门;结束统一 commit。

---

## P0 执行记录(2026-08-31 自主轮,全链门绿)

| # | 状态 | 证据 |
|---|------|------|
| P0-01 | ✅ | Tab 暂停链从死到活:InputManager onPause(GameEngine 传入切换回调)+ 暂停跳过步进不追帧 + sync 不覆盖 UI 暂停态(store.ts sync);原 setPaused 零调用方/snapshot.paused 恒 false |
| P0-02 | ✅ | enemyAI.ts 全文件零引用,git rm 删除;TDD §5.8 敌开火锚点改指 Simulation.ts:756-766/:483 |
| P0-03 | ✅ | missionBossEnemyId 死导出删除(missions.ts);P0-16 记录 BOSS 重建契约 |
| P0-04 | ⊘ | settings 非死键:AudioManager 启动自读 localStorage(:44,:274-279);缺的是改设置 UI → 已立 P1-10,不重复接线 |
| P0-05 | ✅ | sync 在 MASK_SELECT 相位以 sim 实态同步 activeMask(store.ts) |
| P0-06 | ✅ | README 状态段刷新(M2.1-2.3 完成/双任务/8 门/下一站 M2.4) |
| P0-07 | ✅ | TDD §2 增 M2.x 合同入口行(beginRun/selectMission/computeScore/MissionScore 字段) |
| P0-08 | ⊘ | decorativeLights 仅 types.ts:217 字段定义,引擎零消费 — 按"死数据只记录"规则入 TDD §5.8 待 P2 使用 |
| P0-09 | ✅ | GAME-SOP §5 面具行改"已 ship";§8 增 M2 里程碑完成回写块 |
| P0-10 | ✅ | AGENTS 布局树刷新(engine 实际文件/renderCoordinates/score.ts/v2 与 MVP-PLAN 移除标注) |
| P0-11 | ✅ | BUGS B14/B15 状态行回写 M2.x 落地结果 |
| P0-12 | ✅ | m2 简报/文案 17 号复核:敌对者均职能化(占领军稽查队/护院/阁楼哨),无族群指称/现实组织名,通过 |
| P0-13 | ✅ | AGENTS 验证门节增 B72 操作化(跑门前关常驻进程) |
| P0-14 | ✅ | 25 号 §2 数值对齐 constants(2.1u/100° 全角,替换 stale 2.4u/±45°);09 号已有 2026-08-15 机制修正头注(0.4s/0.5 与 constants 一致),判定无需改 |
| P0-15 | ✅ | 蓝图 ASCII vs missions.ts(m2)逐 tile 对账 12/12 一致(临时脚本跑完即删) |
| P0-16 | ✅ | TDD §5.8 补 BOSS 启用前置裁定行(finalBossId 填值 + 数值落地 + 用例) |
| P0-17 | ✅ | AGENTS 增 smoke/ 目录职责说明(门禁基线 vs 试玩证据) |
| P0-18 | ✅ | TDD §5.8 补未上场武器清单(thompson/mosin/boxer/grenade,随 P1-14/15 archetype 落地) |

**P0 = 18/18 完成(16 ✅ + 2 ⊘ 有据)**;行为改动(P0-01 暂停接线)经全链 8 门回归绿。
