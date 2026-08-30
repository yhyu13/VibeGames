# 角色需求 — 设计师（Designer）

> 蒸馏自本项目实际走过的路：两次重置（`GDD.md` §0.5）都源于"范围超卖 + 数值双写 + 光当装饰"。设计师的第一技能不是想点子，是**砍点子并让每个保留项可验收**。
> 权威链见 [`../../GAME-SOP.md`](../../GAME-SOP.md) §2；本表数值一律引用 TDD，不自造。

## 使命一句话

把"每开一枪之后，世界怎么亮起来"（`GDD.md` §1 张力轴）做成可玩的单场景闭环，并在扩展时守住 1+4 任务结构（`GDD.md` §0.5 V4）。

## 必读（30 分钟路径）

1. [`GAME-SOP.md`](../../GAME-SOP.md) §0-§2（权威链 + 硬规则）
2. `GDD.md` §1 / §4 / §12（高概念 / 操作 / 光暗机制）
3. `docs/design/09-blindside-integration.md` §1-§3（BLINDSIDE 权威）
4. [`docs/levels/m1_intro_scene.md`](../levels/m1_intro_scene.md)（当前唯一关卡蓝图）

## 技能需求（蒸馏）

| 技能 | 项目内的具体形态 | 验收证据 |
|------|----------------|---------|
| 范围裁剪 | 把 4 任务/8 武器/6 面具砍成 1 房闭环可玩（v3 判决 V1-V9） | GDD §0.5 判决表 |
| 机制即叙事 | 光 = 警觉开关：灯亮 0.4s 电报→敌弹 OHK、灯灭半盲可近身、亮处击杀刷增援 | GDD §12 / `09-blindside-integration.md` |
| 数值引用纪律 | 设计文档不写数值副本，只写"见 TDD §x"（D3 教训：AGENTS 6 vs 9 面具打架） | GAME-SOP §2 硬规则 1 |
| 关卡布局语言 | 用 tile 蓝图表达：油灯 (4,3) 靠墙断塔楼视线、小刀 (2,9) 出生点旁（B66 重排） | `docs/levels/m1_intro_scene.md` |
| 敏感度把关 | 敌对 NPC 按职能命名，不写族群刻板；文案过 checklist | GDD §2.4 |
| 节奏手感判据 | F 切换硬直 0s、死亡清空重开（HM 范式）；用"快感优先"拒绝难度峰值设计 | GDD §0.5 V5/V6 |

## 交付物

- GDD 层设计变更（走 `GAME-SOP.md` §7 S2 契约流程，若触碰冻结数值）
- 关卡蓝图（`docs/levels/NN-*.md`，tile 级，TS 由蓝图合入）
- 玩家可见文案（任务简报/HUD/结算），PR 附新旧文本对照

## 验收门

- `npm run e2e:playtest` 4/4 + `npm run self-play:check` 3/3（玩法闭环证据，见 `BUGS.md` B66/B67 验证行）
- 新机制必须有可证伪的失败条件（例如：拆灯后敌人必须转为可击杀，`light-break:check`）

## 禁止事项

- 禁止复活已砍任务（夜航船/墨水账，GDD §4.6）
- 禁止在 GDD/AGENTS 写数值副本
- 禁止把 RC 当玩法依据（RC visual-only，几何 LOS 才是权威，`AGENTS.md:41`）
