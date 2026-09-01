# 《Boss 的焦虑》— 游戏设计文档（GDD.md）· 设计权威

> 本文档是**规范的设计权威（Design Authority）**，回答"为什么做成这样（机制 / 愿景）"。
> 数值与接口契约以 `TDD.md` 为准；Boss 具体设计细节见 `boss-anxiety-gdd.md`；设计层分解见 `docs/design/01–05`。
> 依据 `.claude/docs/GAME-STUDIO-SOP.md` v1.0 的 4-doc 底线要求补建。生成日期：2026-09-01。

---

## 1. 一句话概念（High Concept）

你扮演 RPG 里的**最终 Boss**。玩家会来挑战你，但真正让你紧张的从来不是"打不打得过"——
而是**"我今天表演够不够精彩"**。这是一个关于表演焦虑的单幕戏。

> Genre：动作 + 情感叙事 / 单幕戏 / 一轮 5–8 分钟
> Tone：黑色幽默 + 意外的温柔（舞台只有一个 Boss 房）
> Tension 轴：不是"输赢"，而是"我是否被看见"

（概念细节、Tone、情绪参考见 `boss-anxiety-gdd.md` §1、§4。）

---

## 2. 核心循环（Core Loop）

```
等 (Wait) → 察觉玩家 (Sense) → 上场表演 (Perform) → 自评 (Self-Evaluate) → 循环
```

- **Wait**：Boss 独坐王座，翻看历任挑战者档案与评价
- **Sense**：玩家从远处走来，Boss 进入准备态
- **Perform**：按"剧本"演出，但焦虑会让动作变形
- **Self-Evaluate**：战斗结束自评 1–5 星并写评语，评语影响下一轮心态

> 逐字机制定义（每阶段时长、判定、节奏）见 `boss-anxiety-gdd.md` §2；可运行实现与 FSM 见 `TDD.md` §4 与 `docs/design/01-concept-core-loop.md`。

---

## 3. 设计支柱（Pillars）

1. **表演焦虑（Performance Anxiety）**——玩家越"专业"，Boss 越慌；焦虑是驱动一切的核心张力。
2. **过程即叙事**——每次挥剑、忘词、谢幕都是故事的一部分，而非通关工具。
3. **被看见（Being Seen）**——Boss 真正想要的是"被记住这场表演"，不是赢。

---

## 4. 核心机制概览

| 机制 | 作用 | 详见 |
|---|---|---|
| 焦虑值 Anxiety Meter（0–100，隐藏） | 影响攻速 / 台词完整度 / 攻击威力 | `boss-anxiety-gdd.md` §3.1 |
| 表演评分 Performance Rating | 战斗结束自评（走位 / 台词 / 视觉 / 记忆度） | `boss-anxiety-gdd.md` §3.2 |
| 剧本选择 Pattern Picker | 每轮从 3 个剧本挑一个，可被玩家打断 | `boss-anxiety-gdd.md` §3.3 |
| 自我关怀日记（隐藏机制） | 连写 N 次"我不够好"解锁隐藏结局 | `boss-anxiety-gdd.md` §3.4 |

> 具体数值（焦虑源 / 衰减 / 评分档 / 结局条件）一律以 `TDD.md` §4.4.2 冻结数值为准，本文档**不复制数值**。

---

## 5. 技术边界（谁权威）

| 事项 | 权威文档 |
|---|---|
| 设计层分解（核心循环 / 内容 / 美术 / 音频 / UX） | `docs/design/01-concept-core-loop.md`（01 为设计层权威）· 02–05 |
| Boss 概念与机制细节 | `boss-anxiety-gdd.md`（概念层） |
| 数值 / 接口契约 / FSM | `TDD.md`（冻结契约所有者） |
| 当前状态 / 规则 | `AGENTS.md` |
| 决策历史 | `JOURNEY.md` |

**约定**：一份数值只存在一处（`TDD.md`）。本文档与 `boss-anxiety-gdd.md` 只引用、不转抄数值；若与 01 / TDD 冲突，以 `TDD.md` §2.6 裁决为准。

---

## 6. 当前已知的版本分歧（待确认）

仓库内并存两套实现：

- **v1（0.1.0）**：主目录 `5_gamejam_1/` 的 shipped 版本，契约见 `TDD.md` v1.0，验证记录见 `verification-report.md`（M0–M5、V3）。
- **v2（2.0.0，`boss-anxiety-v2`）**：`5_gamejam_1/v2/` 下的独立重制项目（端口 5174），在 v1/v2 玩法（鼠标节奏 + 观众弹幕）之上重写引擎与 UI。`docs/how-to-play.md` 描述 v2 目标玩法。

两套实现的最终关系（v2 是否取代 v1、契约是否迁移）`[待确认]`。
