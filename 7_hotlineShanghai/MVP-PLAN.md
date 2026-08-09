# Hotline Shanghai / 热线上海 — MVP Plan

> 4 周非 jam 周期(M0→M1→M2→M3→M4)。
> 沿用 KIMI3 DDD 多代理工作流 + C.A.T 架构 + 6_patapong3D 的子批次拆分模式。

## v1.1 决策锁定(2026-08-08)

| ID | 决策 | 值 | 来源 |
|----|------|----|----|
| D1 | 调色板饱和度 | 80% HM + 20% 上海(完整 hex 列表在 `02-art-direction.md §3` 和 `core/constants.ts`) | 用户 review |
| D2 | 敌人密度 / 房间 | 2-5 敌(RC 配合暗杀 + 强攻平衡) | 用户 review |
| D3 | viewport | 32u × 18u,每 tile 60 像素(PLAYER_BOUND = `[-16,16] × [-9,9]`) | 用户 review |
| D4 | mask 流 | HM 范式 = 任务 intro(mask 立绘 + 任务预览 + 3-4s 进 play;无独立简报) | 用户 review |

> 这 4 个决策进入 TDD 冻结契约(`TDD.md §0`),改需走 `[TDD-CONTRACT-CHANGE]` 流程。

## v3 重切(2026-08-09,评审入档)

> 触发:B33 重置(关卡/场景/移动归档 `_archive-2026-08-09/`)+ 设计评审。**v3 覆盖后文 v2 里程碑表**(旧表仅作参考)。

| 决策 | v2 | v3 |
|------|----|----|
| D3 viewport | 32×18u / 60px tile | **像素锚定** 1920×1080,tile 48px,相机容纳房间(不露 void) |
| M1 范围 | 1 房 + RC 全管线 + F 切换 | **命题证明**:1 房 / knife / 1 敌人(锥形视野+0.4s 瞄准提示)/ 1 油灯 + 1 霓虹 / 0 面具 / 0 任务 UI / HUD 仅弹药;**先无 RC 基线 → 再单级 final-pass** |
| 光暗 | RC = 视觉 | **机制**:阴影中敌弹落空 / 灯下必中(B29 #1 采纳) |
| 任务 | 4 | **1 + 4**(砍 2/3;任务 4 = 孤岛邮差,4 幕环境变化) |
| 武器 / 面具(v1) | 8 / 6 | **5 / 4**(小刀、毛瑟、汤普森、手雷、飞刀;戏子、帮工、蒙面义士、舞女) |
| F 切换硬直 | 0.15s | **0s** |
| 死亡 | 保留装备 | **清空装备**(HM 范式,B14 定稿) |
| 评分 | S/A/B/C | M1 通过/失败;S/A/B/C 后置 |
| 手感预算 | M1.1 2-3 天 | **4-5 天**,移动手感是 M1 主交付 |
| RC 里程碑 | M1.3-M1.4 6-8 天 | 先 no-RC → final-pass;cascade = M2 性能目标 |
| 敏感度 | 原则 | 07 §6 checklist + Mavis 签核(人审门) |
| 音频 | HM synth | 先 1937 声景(汽笛/叫卖/评弹),synth 只留节奏反馈 |

### M1(重切,2026-08-09 起 1 周 = M1.0 spike 3 天 + M1.1-M1.6 5 天)

- **交付**:Title → 直接进 1 个房间;玩家走位手感可玩;knife 一击;1 敌人锥形视野 + 0.4s 瞄准提示;油灯 + 霓虹 RC(先 no-RC 基线,再 final-pass);**光下无敌 / 暗处可杀**可感知 + **玩家可拆灯**;HUD 仅弹药。
- **验收**:`tsc` 0 error;浏览器 60 FPS;"走进灯下被瞄 → 退回阴影弹全落空"可复现 + "空手 LMB 朝灯 2u 内 = 拆灯"可复现;无 console error;D1-D8 决策点全部填值。
- **子批次(强制顺序)**:
  1. **M1.0 BLINDSIDE spike(3 天,M1.1 前置,2026-08-09 起,authoritative spec = `docs/design/09-blindside-integration.md` §13)**:
     - Day 1:`LightField` 接口 + `glReadPixels` 8×8 downsample;`flashlight_patrol` archetype 数据
     - Day 2:RC 管线追加 `uLightShieldThreshold` / `uLightExposedThreshold`;`final.frag` 写 lightField cache
     - Day 3:`BREAKABLE_LIGHT_HP=2` 默认,灯碎 → `invalidateLight` → 敌人状态切换;写 `09-playtest-notes-m1.0.md` 填 D1-D8
  2. **M1.1 输入手感(4-5 天,agent-core + agent-engine)**:移动 / 瞄准 / knife / 翻滚 + **LMB 拆灯优先(2u 内)**
  3. **M1.2 房间 + 敌人(1 房 / `flashlight_patrol` 锥形视野 / 0.4s 提示 / 光暗命中规则,agent-core)**
  4. **M1.3 无 RC 渲染基线(纯 base color,agent-engine)**
  5. **M1.4 RC final-pass 单级 + 油灯 / 霓虹 + 拆灯视觉(agent-engine)**
  6. **M1.5 HUD 弹药 + 拆灯计数 + devtools + smoke(agent-ui + agent-qa)**
  7. **M1.6 `lampmaker` 面具提前实现 + 验证**(M7 推进,1 天)

### M2-M4(重切)

- **M2**:任务 1 完整(3 房间 + 特务 BOSS 1 模式)+ 5 武器 + 4 面具 + 死亡清空 + HM mask-intro 流 + 评分 S/A/B/C 回归
- **M3**:任务 4 孤岛邮差(4 幕环境变化)+ FlashlightPatrol 巡逻手电(B29 #2)+ 投掷弧线预览(B29 #3)+ ReloadIndicator(B29 #7)
- **M4**:cascade 3 级性能目标 + 1937 声景调音 + 浏览器冒烟 + 部署 + sprite 流水线(07 §6 人审门)

---

## 总览

> ⚠️ 以下 M0-M4 表为 **v2 规划**,已被上方 v3 重切覆盖,仅作历史参考。

| 阶段 | 周期 | 目标 | 关键交付 | 签核 |
|------|------|------|----------|------|
| **M0** | 2026-08-08 | 设计冻结 + 骨架 | GDD v2 / TDD v2 / 项目骨架 / `tsc -b` 0 error | agent-qa + 用户 |
| **M1** | M0 后 1 周 | 单房间 + RC 全管线 | 1 最小房间 + 1 件武器 + 走位 + F 切换 + 开火 + RC 6 阶段跑通 | agent-qa + 用户 |
| **M2** | M1 后 1 周 | 任务 1 完整 | 任务 1 全 3 房间 + BOSS + 评分 + 面具 + 死亡 | agent-qa + 用户 |
| **M3** | M2 后 1 周 | 全 4 任务 | 任务 2 / 3 / 4(含隐藏)+ 标题 / 选择 / 面具 UI | agent-qa + 用户 |
| **M4** | M3 后 1 周 | 调优 + 发布 | RC 性能调优 + 降级路径 + Web Audio 调音 + 浏览器冒烟 + 部署 | agent-qa + 用户 |

## M0 子批次(已完成,2026-08-08)

| Sub-batch | 状态 | 交付 |
|-----------|------|------|
| M0.1 设计文档 | ✅ | `GDD.md` v2 + `TDD.md` v2 + `AGENTS.md` |
| M0.2 项目骨架 | ✅ | `package.json` + `vite.config.ts` + `tsconfig.*` + `index.html` + `tailwind.config.js` + `.gitignore` |
| M0.3 核心 stub | ✅ | `core/types.ts` + `core/constants.ts` + `core/math.ts` + 全部 `core/data/*.ts` + `core/world/*.ts` + `core/simulation/*.ts` |
| M0.4 引擎 stub | ✅ | `engine/GameEngine.ts` + `SceneManager.ts` + `InputManager.ts` + `AudioManager.ts` + `RcPipeline.ts` + `PerfWatchdog.ts` + `storage.ts` + `devtools.ts` + `postfx/PostProcessPipeline.ts` + `sprites/*` |
| M0.5 UI 占位 | ✅ | `App.tsx` + `main.tsx` + `store.ts` + `index.css` |
| M0.6 验证 | ✅ | `npx tsc -b --noEmit` 0 error + 浏览器加载占位画面 |

## M1 子批次(规划)

| Sub-batch | 目标 | 关键文件 | Agent | 估时 |
|-----------|------|----------|-------|------|
| **M1.1** | Simulation 协调器实现 + 玩家移动 + F 模式切换(0.15s 硬直) | `core/simulation/Simulation.ts` + `core/simulation/player.ts` | agent-core.4 | 2-3 天 |
| **M1.2** | 1 个最小房间(8×6 tile + 1 油灯 + 1 敌人) | `core/data/missions.ts` | agent-core.3 | 1-2 天 |
| **M1.3** | RC 管线 prepscene + JFA shader | `engine/shaders/{fullscreen.vert, prepscene.frag, prepjfa.frag, jfa.frag, distfield.frag}` | agent-engine.2-3 | 3-4 天 |
| **M1.4** | RC cascade + gi + final + dither shader | `engine/shaders/{rc.frag, gi.frag, final.frag}` | agent-engine.4 | 3-4 天 |
| **M1.5** | GameEngine + SceneManager + InputManager 集成 | `engine/{GameEngine.ts, SceneManager.ts, InputManager.ts}` | agent-engine.1 | 2-3 天 |
| **M1.6** | HUD + 1 件武器(knife)+ 空手拳头 + F 切换验证 + 击杀显示 | `components/HUD.tsx` + `core/simulation/weapons.ts` | agent-ui + agent-core.4 | 1-2 天 |

**M1 验收**:
- `tsc -b` 0 error
- 浏览器 60 FPS @ 1080p
- 击杀时枪火瞬时亮起(RC 验证)
- 油灯常亮(RC 验证)
- F 切换拔刀 / 拔枪音效(0.15s 硬直)
- 玩家可走位 / 击杀敌人

## M2 子批次(规划)

| Sub-batch | 目标 | 关键文件 | Agent | 估时 |
|-----------|------|----------|-------|------|
| **M2.1** | 任务 1 全部 3 房间布局 | `core/data/missions.ts` | agent-core.3 | 2-3 天 |
| **M2.2** | 8 件武器全部 | `core/data/weapons.ts` + `core/simulation/weapons.ts` | agent-core.2 + .4 | 2-3 天 |
| **M2.3** | 6 个面具全部 | `core/data/masks.ts` + `core/simulation/masks.ts` | agent-core.2 + .5 | 2-3 天 |
| **M2.4** | 任务 BOSS + AI 完整 | `core/simulation/enemyAI.ts` | agent-core.5 | 3-4 天 |
| **M2.5** | 评分系统 + 死亡 / 重试流程 | `core/simulation/mission.ts` + `components/{ScoreOverlay, DeathScreen}.tsx` | agent-core.5 + agent-ui | 2-3 天 |
| **M2.6** | RC 性能调优 + 降级路径 | `engine/PerfWatchdog.ts` + `engine/RcPipeline.ts` | agent-engine.5 | 2-3 天 |

**M2 验收**:
- 任务 1 完整通关
- 评分 S/A/B/C 正确
- 0 console error
- 60 FPS @ 1080p 稳定

## M3 子批次(规划)

| Sub-batch | 目标 | 关键文件 | Agent | 估时 |
|-----------|------|----------|-------|------|
| **M3.1** | 任务 2 / 3 / 4 房间布局 | `core/data/missions.ts` | agent-core.3 | 3-4 天 |
| **M3.2** | 隐藏任务(孤岛邮差) | `core/data/missions.ts` + `core/simulation/mission.ts` | agent-core.3 + .5 | 1-2 天 |
| **M3.3** | 标题 / 任务选择 / 面具选择 UI | `components/{MainMenu, MissionSelect, MaskSelect}.tsx` | agent-ui | 2-3 天 |
| **M3.4** | Web Audio 完整合成 | `engine/AudioManager.ts` + `core/data/sfx.ts` | agent-audio | 2-3 天 |
| **M3.5** | localStorage 存档 / 解锁 | `engine/storage.ts` | agent-engine.5 | 1-2 天 |

**M3 验收**:
- 4 任务可全通
- 隐藏任务可见性条件正确
- 0 console error
- 60 FPS @ 1080p 稳定

## M4 子批次(规划)

| Sub-batch | 目标 | 关键文件 | Agent | 估时 |
|-----------|------|----------|-------|------|
| **M4.1** | RC 性能调优到稳 60 FPS | `engine/RcPipeline.ts` + `engine/PerfWatchdog.ts` | agent-engine | 2-3 天 |
| **M4.2** | Web Audio 调音 | `engine/AudioManager.ts` | agent-audio | 1-2 天 |
| **M4.3** | 浏览器冒烟 + 部署 | (运维)+ `scripts/smoke.mjs` 回归 | agent-qa | 1-2 天 |
| **M4.4** | DevPanel(Tweakpane)调参 | `components/DevPanel.tsx` | agent-engine | 1 天 |
| **M4.5** | BLINDSIDE B29 提案落地 | 见 `06-blindside-lessons.md §4.2` | agent-engine + agent-core | 2-3 天 |
| **M4.6** | 真实 sprite 替换(走 `07-sprite-gen-tasks.md`) | image_gen → char-grid 映射 | agent-engine + 用户手工 | 3-5 天 |

**M4 验收**:
- 4 任务可全通 + 60 FPS 稳定
- localStorage 跨会话保留
- 部署 preview URL 可访问
- DevPanel 实时调参可用
- BLINDSIDE 7 条 B29 提案至少落地 4 条(灯下无敌/暗处可杀、AimFocus、投掷弧线、击杀确认)

## M5+ 真 sprite 流水线(参考 `07-sprite-gen-tasks.md`)

- **范围**:5 角色 × 8 方向 × 6 帧 + 12 家具 + 3 特效 = ~50 张参考图
- **流程**:
  1. 跑 `image_synthesize` 出参考 PNG(透明背景,16×16 网格感,调色板按 TDD §4.4.8 +
     `05 §3`:核心 8 色 + 角色补充色,允许 ±10%)
  2. 人工/小脚本按"最近色"映射到 16 色调色板 → char-grid 字符串
  3. 替换 `core/data/sprites.ts` 当前 placeholder
- **零资产约束不变**:PNG 不进 repo,只当映射参考
- **不在 M4 之前做**:Phase 0/1/2 优先让一关完美,真 sprite 是 M5 升级

## 可砍清单(⛔ Cut-First,任何 M 末时间紧优先)

- ⛔ 血溅瞬时光源 → 静态血点
- ⛔ 探照灯旋转动画 → 固定方向
- ⛔ 任务 4(孤岛邮差)→ DLC
- ⛔ 舞厅旋转灯脉动 → 恒定光
- ⛔ dither 回压 → 纯 RC
- ~~F 切换硬直 0.15s~~ → **已定稿 0s**(v3)
- ⛔ DevPanel → 不写
- ⛔ BOSS 3 击 → 1 击
- ⛔ 评分系统 → 通过/失败(v3 M1)
- ⛔ 任务 2 / 3(夜航船 / 墨水账)→ 已砍(v3)

## Stretch Goals

- 面具 6 → 25 / 武器 8 → 35(对标 Hotline Miami)
- 排行榜(localStorage)
- 关卡编辑器
- 黑白胶片模式
- 真实历史人物致敬

## 代理分工(沿用 TDD §14)

- **agent-core**:core/ 全部(纯逻辑)
- **agent-engine**(最重):engine/ + RC 管线 + shader
- **agent-audio**:Web Audio 合成 + 配方
- **agent-ui**:React UI + zustand store
- **agent-qa**:集成验证,无文件所有权

## 已知风险

| 风险 | 概率 | 影响 | 缓解 |
|------|------|------|------|
| RC 性能 1080p 掉帧 | 高 | 高 | M1 必搭降级路径 |
| RC 软光吃像素颗粒 | 高 | 中 | dither 回压 |
| RC 与像素颗粒的根本冲突 | 高 | 高 | v3:光暗机制 + 像素锚定 viewport;先无 RC 基线再开 RC,判断 RC 是否值得 |
| 1937 历史敏感度 | 中 | 高 | §2.4 处理原则 |
| 一击必杀太难 | 中 | 中 | Room 1 教学 + 翻滚无敌 |
| AI 视野冲突 | 中 | 中 | M1 末实测 |
| 移动手感不达标 | 高 | 高 | M1 手感预算 4-5 天,专门验收"走位是否顺手" |

## 验证门

- **M0**:`tsc -b` 0 error + 占位页面加载
- **M1+**:`tsc -b` 0 error + 浏览器冒烟(60 FPS + 光暗机制可复现:"灯下被瞄 / 阴影中弹落空")
- **每周末**:review + 砍清单评估
