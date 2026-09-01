# 6_patapon3D — 100 项增强路线图(P0/P1/P2)

> 现状:仅 intro 醒觉展示可玩。v2.0 战斗 FSM 已冻结为纯模块(`src/core/`),但零接线——全项目只有 `src/engine/IntroEngine.ts` + `src/intro/` 这一条醒觉演出在跑,`Simulation.ts` 的 MENU→SONG→MATCH_OVER、军队 vs Moloch、10 条命令语法、boss 攻击回合、fever、失败判定、`PersistedStats` 全部未接入。P0 核心 = 把这块冻结的模拟解冻跑通。

## P0 (must-do, unblocks the game)

- [P0] Wire a real GameEngine that calls `Simulation.step(dt)` — 这套 MENU→SONG→MATCH_OVER FSM 写在 `src/core/simulation/Simulation.ts`,但只被 intro 演出替代,战斗从未被 step,先把主循环接上。
- [P0] Drive all UI updates from `Simulation.snapshot()` instead of the intro-cinematic state — `SimSnapshot`(phase/army/boss/rhythm/fever)已经是只读契约,渲染器必须消费它而不是 intro 的 `IntroState`。
- [P0] Build a menu → song → match-over → resume flow around the FSM — `GamePhase` 在 `core/types.ts` 定义了 MENU/SONG/MATCH_OVER,却没有任何东西从 intro 转入 SONG(`startMatch()` 白写了)。
- [P0] Make defeat reachable: all 3 units dead = BOSS wins — `checkMatchOver()` 在 `matchOver.ts` 已达 `livingUnits()===0 → 'BOSS'`,但现在战斗不进 SONG,失败永远不发生,先让失败成立。
- [P0] Show a real boss HP bar that drains — `constants.ts` 给了 `BOSS_HP_MAX=24`,`damageBoss()` 已在改 `boss.hp`,但 UI 只在 intro 装饰里碰过它,玩家看不到血量。
- [P0] Show per-unit HP on the 3-patapon squad — `UNIT_HP_MAX=5` + `damageUnit()` 已置 `unit.hp`/`state='defeat'`,没有可见血条玩家无法预判要不要 DEFEND/RALLY。
- [P0] Replace "4 beats = win" with a real boss-hp victory — `hitBoss()` 在 `Simulation.ts` 已按命令扣 `boss.hp`,把当前"四拍即胜"的占位判定换成真实扣血到 0 才 win。
- [P0] Render the Moloch model driven by `BossState`, not a static intro prop — `patapons.ts` 已有 `boss-moloch` 模板(红身/黄角),`introScene`/`stageVisuals` 把它按 `boss.state` 动起来。
- [P0] Render the 3 patapon army as voxel units with per-command poses — `UnitState`(march/attack/charge/defend/volley/hit/defeat)已冻结,渲染端要按 state 摆姿态,否则命令无视觉反馈。
- [P0] Surface the boss telegraph so the player can react — `BossState.telegraph` + `startTelegraph()` 在 `boss.ts` 已持有"下一击",现在没人渲染该来的 SWIPE/SLAM/FIREBALL 预警。
- [P0] Let DEFEND produce visible negation — `executeBossAttack()` 用 `defendTurns>0` 减半伤害,但要加盾闪提示玩家才知道防住了。
- [P0] Let RETREAT visibly dodge — `retreatTurns>0` 触发 dodged,给一个可读的"闪避"特效与回落动画。
- [P0] Apply a real difficulty ramp (HP→enrage→faster) — `BOSS_ENRAGE_HP=12` + `startTelegraph` 已在 `boss.ts` 处理 enrage 后更快出手,把它做成一个玩家能感知的 phase-2,而不是只有数字。
- [P0] Persist best-score / wins-losses across sessions — `PersistedStats`(totalMatches/p1Wins/bossWins/longestCombo)与 `persist` SimEvent 都在,需要一个后端把 `STORAGE_KEY_STATS` 真正写进 localStorage。
- [P0] Add hit-stop so each boss hit lands with crunch — `damageBoss` 已发 `bossHit`+juice,在结算瞬间冻结模拟一小段,打击感会立刻上一个台。
- [P0] Consume the `cameraShake` SimEvent — `CAMERA_SHAKE_*` 常量与 `cameraShake` 事件已定义,`IntroEngine` 却从不消费;boss 攻击/命中时震屏。
- [P0] Give a miss real stakes beyond resetting the 4-beat bar — `applyMiss()` 已清 combo+commandBeats,再加一个"miss 给 boss 进攻窗口"的后果,节奏才有重量。
- [P0] Make MARCH's proximity payoff legible — `proximityBonus()` 在 `combat.ts` 给 0..0.5 加成,视觉上呈现"贴近=更高伤害"信号,MARCH 才不是空跑。
- [P0] Flash the DOM command bar on every accepted beat — `emitBeatJuice()`/`beatHit` 已在发事件,命令栏要对每次命中做节拍脉冲,不然鼓点没有即时反馈。
- [P0] Show a FEVER meter + countdown — `fever.ts` 在 combo 8/16/24 触发 slow-mo + 伤害×1.5,一个可见的计量条与剩余时间让玩家追着 combo 打。
- [P0] Make the ending a real WIN and real LOSE screen — `matchOver.ts` 返回 P1 或 BOSS;把当前 RITUAL COMPLETE 卡牌 gateway 成胜利结算与失败结算两条路。
- [P0] Make RALLY's heal readable — `healUnit()` 已回血,配上愈合数字/粒子,玩家才知道这命令值不值得读。
- [P0] Add a pause that actually stops the sim — 围绕 `Simulation.step()` 做 pause/resume,战斗中途得能喘口气,不然高强度打不完。
- [P0] Add a beat-anticipation lane so timing is learnable — `expireNotes()` + `NOTE_SCROLL_SPEED` 暗示了下落音符,渲染一条会滚的节拍道,玩家才知道什么时候敲。
- [P0] Route W/A/S/D into `setP1Input()` for the match, not just the intro — `KEY_NOTES` 映射现在硬编码在 `IntroEngine.ts`,同一套四键要喂给 `Simulation` 的 `NoteType`。

## P1 (strong value)

- [P1] Command chart/hint panel showing the 4-beat sequence to memorize — C 侧 `COMMANDS` 表已冻结,把 MARCH/ATTACK/DEFEND 等序列直接画给新玩家抄。
- [P1] Boss phase-2 visual (color shift + faster telegraphs) — enrage 已有数据,补一层"突然变红变快"的视觉叙事。
- [P1] Third boss phase with a new attack — `ATTACKS` 只有 SWIPE/SLAM/FIREBALL,加一个蓄力 AOE 让结局更有记忆点。
- [P1] Unit roles: divide the 3 patapons into attacker / shield / support — 现在 `ARMY_UNIT_COUNT=3` 同质,拆成枪手/盾卫/奶妈让命令针对性更强。
- [P1] Formation front/back-row bonus — 已有 `UNIT_Z_OFFSETS` 前后错开,给前后排不同承伤/输出让阵型有意义。
- [P1] Anticipation metronome / ritual chanting to teach the rhythm — 玩家是靠听力记住 PATA-PON 的,加节拍引导音比看谱更 Patapon。
- [P1] Distinct hit / death / command-succeed stings — `SfxId` 已有 15 个 recipe,细化到"具体命令成功"的音色区分。
- [P1] Boss roar on telegraph — `SfxId.bossRoar` 已在类型里,triggger 在 `startTelegraph` 时放,预警听觉化。
- [P1] Win / lose jingles — `SfxId.win`/`lose` 已定义但没人放,matchOver 时用它们收尾。
- [P1] Score system from judgement quality + combo + kill speed — `JUDGEMENT_*` 分值已在 constants,把每局计成总分。
- [P1] Combo milestone popups at x8/x16/x24 — `FEVER_TRIGGERS` 已定义,命中这些连击时给醒目提示。
- [P1] Fever screen treatment (tint + slow-mo + vignette) — slow-mo 因子已有,配一层全屏滤镜让 fever 有"高潮"感。
- [P1] Victory grade (S/A/B/C) from accuracy — 用判定质量对命中率评级,给重玩一个目标。
- [P1] Longest-combo + max-damage record rows — `PersistedStats.longestCombo` 已存在,补 max-damage 并把它们展示出来。
- [P1] Contextual tutorial that teaches each command as you first need it — 比静态 how-to-play 更有效,跟着 DEMAND 弹出。
- [P1] Toggleable command reminder overlay for newcomers — 老手可关,新手可开,降低上手摩擦。
- [P1] Floating damage numbers on the boss per command — `damageDealt` 事件已带 amount,直接在命中处弹字。
- [P1] Unlock songs / harder commands as you win — `SONG_COUNT=3` + `SONG_SEEDS` 已支持多谱面,胜利解锁更高难度谱面。
- [P1] Victory celebration sequence (army dance + crowd cheer) — `audienceCheer` 事件已定义,赢时让 12 个观众(见 `audience.ts`)动起来。
- [P1] Make the audience bounce to the beat — `AudienceMember.bounceAmount` 字段在 `audience.ts` 已存在但恒为 0,把它接到节拍事件。
- [P1] Difficulty selector (Easy/Normal/Hard scaling HP + damage + auto-turn) — `BOSS_AUTO_TURN_S`/`BOSS_HP_MAX` 都是常量,做一个倍率档位表。
- [P1] Seed-able reproducible runs — `SimulationConfig.seed` + `makeRng` 已支持,对外暴露种子便于回放与测试。
- [P1] Mobile touch: 4 on-screen drum pads — `DRUM_PAD_DEFS` 在 `court.ts` 已造型定位,把它们变成可点的触控板。
- [P1] Menu screen with Play / How-to / Best-score — intro 直接开打,需要一个真正的标题菜单承载入口。
- [P1] A polished How-to-play screen — `docs/how-to-play.md` 已是现成素材,内嵌进游戏而非只放文档。
- [P1] Result screen with full stat breakdown (accuracy, damage, commands used) — 一局打完把数字摊开,满足复盘欲。
- [P1] Replay last match for score-chasing — 刷新纪录是核心钩子,存一帧回放实现重打。
- [P1] Finish-time / speed-run timer display — 给速通玩家一个时钟。
- [P1] Keyboard remapping for accessibility — `KEY_NOTES` 硬编码在 `IntroEngine.ts`,做成可配置。
- [P1] Colorblind mode (lane color + glyph) — `Lane` 注释已提 glyph 装饰,配一个色盲配色并把 glyph 显性化。
- [P1] Visual-only cues toggle for sound-averse players — 把音频提示的可视替代做成开关。
- [P1] Left/right-hand input parity so one-handed play works — W/A/S/D 全在左手,加右侧触控或 Q/E 等覆盖。
- [P1] On-device best-score leaderboard — `PersistedStats` 数据驱动一个本地排行榜。
- [P1] Boss intro cutscene with flavor text — Moloch 有个登场,战斗才有仪式感。
- [P1] Command-cooldown tuning so no single command dominates — 现在可以每 4 拍无限 ATTACK,给节奏需求加深度。
- [P1] Hit-vs-kill distinction: on-death unit ragdoll/poof — `state='defeat'` 已支持,补一个死亡动画让损失可读。
- [P1] Charge-up wind-up for CHARGE so it reads as risky/high-reward — `CHARGE_DAMAGE=4.0` 全游戏最高,给前摇动作让它配得上风险。
- [P1] Boss counter-attack that punishes over-aggression (e.g. punish during CHARGE). — 让无脑高伤有代价,回合制张力更强。
- [P1] Per-command audio difference (PATA-PON chant vs CHAKA volley) — 命令音乐差异化,听音便知自己锤了什么。
- [P1] Skip/accelerate the intro cinematic once seen — 演出好但别挡重玩,加 skip。

## P2 (nice-to-have / stretch)

- [P2] Multiple boss designs beyond Moloch (skin / palette swaps) — `patapons.ts` 模板化,再出几只 boss 拉周期。
- [P2] Multiple arena reskins (court palette variants) — `colors.ts` 与 `court.ts` 已程序化,换配色即新场地。
- [P2] Deeper lore codex unlocked per win — build 世界观黏性,给 Patapon 文化留钩子。
- [P2] A hero unit that levels across runs (P1 meta-progression) — 让玩家不是只为一局,这是长留存关键。
- [P2] Equipment / upgrade slots for units — 进一步拉长养成,但属 stretch。
- [P2] Endless mode with escalating ramp — 给高手一个"能打多久"的挑战。
- [P2] Daily seeded challenge — 每天同一个种子,榜单可比。
- [P2] Achievement system (win with no misses, first enrage, etc.) — 低成本奖励层。
- [P2] Cloud-sync of stats across devices — 本地榜单升值。
- [P2] Web Share of the victory card — 让玩家晒战绩,自传播。
- [P2] Ghost replay of your best run — 观战自己巅峰一把。
- [P2] Cosmetic drum skins — 无属性外观,变现/个性化也适用。
- [P2] Particles on every accepted beat, not just impacts — 全鼓点粒子雨,气氛拉满(注意 PARTICLE 预算 256)。
- [P2] Vignette / bloom post toggle — `PerfDegradation.BLOOM_OFF` 已预留,把这两个后处理做成可开关。
- [P2] Instanced voxel rendering / LOD for perf — 大量体素时提升帧率下限。
- [P2] Live framerate badge from the PerfBadge component — `components/PerfBadge.tsx` 已存在,常驻显示帧率。
- [P2] WebGPU ray-trace reflections toggle — raytrace adapter 已存在,作为高配开关。
- [P2] Voice-over shouting PATA/PON/DON/CHAKA — 中文/多语配音增强神圣感。
- [P2] Haptic feedback (vibrate API) on mobile — 触觉鼓点。
- [P2] Live audio-reactive background — `SfxId.bgPad` 已在类型里,让背景随节拍呼吸。
- [P2] Camera auto-framing on each command — 镜头跟随军队/boss 的行动。
- [P2] Slow-mo on the finishing blow — 决胜一击的戏剧性定格。
- [P2] Persistent debris / combat scars that don't fully reset — 战场留下记忆点,与 intro 弹坑一脉相承。
- [P2] Easter eggs (secret command) — 彩蛋钩子,增加被发现惊喜。
- [P2] Localization of UI strings — README/GDD 已是中文向,补 i18n。
- [P2] Polish for an itch.io publish build — 打包 + 页面 + 封面。
- [P2] Large-print HUD accessibility mode — 高可读性大字号。
- [P2] Contrast-safe court palette — WCAG 友好配色档。
- [P2] Screen-shake intensity slider — 防晕动,给玩家自控。
- [P2] Mouse / touch hold-to-drum input option — 适配点击流与触屏。
- [P2] Audio-only "just listen" mode — 纯听节奏的禅模式。
- [P2] Smooth HP-bar lerp animation — 掉血拖尾更顺滑。
- [P2] Damage falloff visualization (proximity ring) — 把近身加成画成地盘。
- [P2] Built-in record/share tooling — 一键录制战报。
- [P2] Theme / how-to-play parity with the other VibeGames titles — 与同仓游戏统一元 UI 与美术语言,形成作品集一致感。
