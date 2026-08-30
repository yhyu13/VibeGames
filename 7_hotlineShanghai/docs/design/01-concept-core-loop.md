# 01 — Concept & Core Loop

> **本文档从 v3.1 起只保留"概念层 + Why"**。所有数值 / 契约 / 接口 / 里程碑以
> [GDD.md](../../GDD.md) §1-§3 + [TDD.md](../../TDD.md) v4 §2-§6 + [GAME-SOP.md](../../GAME-SOP.md) §8 为准(MVP-PLAN.md 已废弃,2026-08-30)。
> 与上述三文件冲突时,以此三文件为准。

## 1. 一句话 + Tension 轴

- **Pitch**:迈阿密热线手感 + 1937 淞沪会战 / 孤岛抗日 + 真 2D Radiance Cascades 实时光影
- **Tension 轴**(v3.1 改写):**不是"打不打得过",也不是"每开一枪之后世界怎么亮",而是"光池坍缩的那一瞬间"** —
  玩家必须在"灯亮敌人警觉 / 灯灭半盲可杀"的节拍里,精准拆灯制造暗场,再趁 0.1s 灯池坍缩期近身安静击杀。
  [TDD v4 §5 行为契约](../../TDD.md)(LMB 拆灯优先 + 光=警觉开关)
- **Tone**:1937 弄堂 / 战地 + 复古电子 + 暗战紧张

### 1.1 视觉参照(本项目自截图)

| 场景 | 截图 | 用途 |
|------|------|------|
| 标题壳(开场) | [../../old/m0-mainmenu.png](../../old/m0-mainmenu.png) | v3 重置后仅剩的标题壳参照 |
| 房间实机(M0 末) | [../../old/m1-room1-gameplay.png](../../old/m1-room1-gameplay.png) | v3 前的"RC + 像素锚定"实机 |
| 房间定稿(M1 候) | [../../old/final-room1-frozen.png](../../old/final-room1-frozen.png) | 像素取整 + walk 4 帧定稿样张 |
| M0 任务选择 → 面具 → 房间 → 拾取 → knife → 结算 | [../../old/smoke-01-title.png](../../old/smoke-01-title.png) … [../../old/smoke-07-end.png](../../old/smoke-07-end.png)(2026-08-30 归档) | v2 端到端流程截图(M3 后已删) |
| 家具 + 霓虹(美术参考) | [../../references/05-furniture-neon.png](../../references/05-furniture-neon.png) | 油灯 / 霓虹 / 探照灯的"灯芯亮区"取样 |
| HM 真机对照(32 张) | [../../references/hotline-miami-screenshots/](../../references/hotline-miami-screenshots/) | 调色板 / 条带地板 / 砖块墙基准 |

## 2. 核心循环(Macro,v3.1 改写)

```
Title → 1 Mission (v3 = 1 + 4,只 ship 1 任务 = m1_workshop)
  ↓
Room 1 (教学) → Room 2 (节奏) → Room 3 (高潮 / BOSS)
  ↓
Death → 清空武器/弹药/面具/击杀数 → Room 1 重开(B14 定稿)
  ↓
Mission End → 通过/失败(M1)→ S/A/B/C(M2+,§4.6.7 加分规则) → Mask Select
```

- 单任务:3-5 分钟(数据见 [GDD §1.2](../../GDD.md))
- 单房间:60-120s
- **单击必杀**(OHK);光 = 警觉开关(§3.1 改写,详见 [TDD v4 §5.1](../../TDD.md))
- 死亡 = HM 范式,装备清空,1.2s 重开 Room 1

## 3. 房间内循环(Meso)

```
Enter Room (1s fade-in)
  ↓
Observe (RC 灯光先开,玩家看清房间 + 灯池分布)
  ↓
Engage (近战 / 远程 / 投掷 / 拆灯;LMB 在 2u 内优先拆灯,§3.1)
  ↓
Search (拾武器 / 拾面具,6 个面具(数据冻结);lampmaker/darkwatch/fortuneteller 是 M2+ 计划,未入码)
  ↓
Exit (0.5s fade-out, 切下一房间;全拆灯 = S 评条件,§3.2)
```

## 4. 击杀瞬间循环(Micro,v3.1 改写)

```
AimFocus (Shift 长按, M6,AIMFOCUS_PUSH_DIST=0.4u)
  ↓
LMB 触发(每 tick):
  aimTarget in LMB_LIGHT_PRIORITY_RANGE (=2.4u,constants.ts:83) AND aimTarget.isBreakableLight:
    → lightSmash event;BREAKABLE_LIGHT_HP--    (v3.1 拆灯)
  else 按玩家模式打敌(沿用 v2 行为)
    → 直接 OHK(无光甲,2026-08-15 修正);亮处击杀 → triggerAlarm 刷增援
  ↓
Enemy hit → Enemy KIA + blood_splash RC light (0.5s TTL) +
             muzzle_flash RC light (0.05s TTL, on player if ranged) +
             白闪 + 击杀确认 sfx(0.15s)v3.1 #5 入档
  ↓
灯被拆 → LIGHT_POOL_DOWN_S=0.1s 后灯池坍缩,敌人半盲(视锥 ×DARK_VISION_MULT)   (v3.1)
  ↓
~150ms 后下一个循环
```

**输入对齐(Hotline Miami 范式)**:
- **F** 切换近战 / 远程(**0s 硬直**,v3 R13 覆盖;沿用 HM 节奏)
- **LMB** 单攻击键 + 拆灯优先(2u 内);空手 = 拳头
- **E** 拾取 / 开门;**长按 0.25s = 投掷当前武器**(投掷唯一入口)
- **Shift** 长按 = AimFocus,冻结瞄准 + 推远 0.4u(用于精准射灯 / 抛物线预览)
- 鼠标瞄准 = HM 右摇杆

## 5. 数值对账(全部冻结,见 TDD v4 §3+§5)

> 完整数字表在 [TDD v4 §3+§4](../../TDD.md) + [TDD v4 §5](../../TDD.md)。
> v3.1 新增 14 个光暗/拆灯常量(见 [TDD v4 §3](../../TDD.md) 与 [09-§13](09-blindside-integration.md))。

## 6. 为什么这样设计(Why)

- **一击必杀** = Hotline Miami DNA,节奏感全靠
- **F 切换 + 单攻击键** = HM 原版节奏核心,近战/远程共用一根攻击手指,逼迫快速决策
- **任务式(电话指令)** = 30-60s 一局,适合 vibe game 体量
- **淞沪会战 + 孤岛(血战上海滩同源)** = 顶视角 + 一击必杀 + 暗处突然动手 = 暗战比正面战场更适合 8-bit 美学;隐藏任务落在四行仓库残垣做背景高潮
- **2D RC 真光影** = 弄堂的"灯下黑"质感是本项目核心辨识度,假光会毁
- **6 面具(数据冻结)各 1 个玩法钩子;灯匠/暗哨/算命先生是 M2+ 计划(未入码)**围绕"光暗"主题,让面具不只是颜色
- **8 武器(v1 冻结)→ 35 武器(M2+ 铺量)** = v1 锁 8 件(2 近战 + 4 远程 + 2 投掷)够 M1 命题证明,M2 起按手感差异铺
- **v3.1 光暗是玩法** = BLINDSIDE(茫室)核心机制直迁:灯下无敌 + 暗处可杀 = 玩家必须主动管理灯池(拆 / 闪 / 投),而不是被动躲子弹

> 完整 BLINDSIDE 整合的 7 条提案 / 决策 / 风险 / spike 计划 = [`09-blindside-integration.md`](09-blindside-integration.md)。
> 评审笔记已归档 `old/docs-design/06-blindside-lessons.md`(2026-08-30)。
