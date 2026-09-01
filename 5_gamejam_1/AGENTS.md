# AGENTS.md — 《Boss 的焦虑》（Boss Anxiety）

> 项目规则 + 当前状态。依据 `.claude/docs/GAME-STUDIO-SOP.md` v1.0 的 4-doc 底线补建。生成日期：2026-09-01。
> 设计权威：`GDD.md` · 数值/契约权威：`TDD.md` · 决策日志：`JOURNEY.md`

## 版本

- 当前契约版本：`v1.0`（`TDD.md` 冻结契约；变更日志见 TDD §0）
- 主目录 shipped 构建：`0.1.0`（`package.json`）
- 独立重制版：`v2/` → `boss-anxiety-v2` `2.0.0`（端口 5174）

> 版本只应在 `AGENTS.md` 与 `TDD.md` 头部声明一次，其余文档不自行报告版本。

## 这是什么游戏

你扮演 RPG 最终 Boss——一个在空房间里排练谢幕、却发现直播间有人进来的演员。焦虑来自"我是否被看见 / 表演够不够精彩"，而非输赢。一轮 `等 → 察觉 → 上场表演 → 自评` 约 5–8 分钟，无 Game Over，循环到结局条件。

> 概念 / 机制细节见 `boss-anxiety-gdd.md`；设计层分解见 `docs/design/01–05`（01 为设计层权威）。

## 当前状态（2026-09-01）

- **主目录 v1（0.1.0）已 shipped**：有 `dist/` 产物与 `verification-report.md`（M0–M5、V3 全验证记录）。实现为 WASD 走位 + 鼠标节奏 + B 站式观众弹幕。
- **v2 重制版进行中**：`v2/` 独立项目，三样验证门（`npx tsc -b --noEmit` + `npm test` + `npm run build`）已通过；最近一次提交修复黑屏、落地相机相对 WASD、收紧节奏（见 git log `8e086fe`）。
- **两套实现关系（2026-09-01 定）**：v2（2.0.0）为活跃主线，v1（0.1.0）为已 shipped 的遗留构建。契约（TDD v1.0）当前反映 v1；v2 契约迁移为后续跟踪项。

## 如何运行 / 构建

```bash
# 主目录 v1（端口 5173）
cd 5_gamejam_1
npm run dev        # 本地开发
npm run build      # tsc -b && vite build → dist/
npm run typecheck  # tsc -b --noEmit
npm test           # vitest 单测

# v2 重制版（独立目录，端口 5174）
cd 5_gamejam_1/v2
npm install        # 首次
npm run dev
npm run build
npm test
```

验证门 = `typecheck`（`npx tsc -b --noEmit`）+ `npm test` + `npm run build`。

## 规则（硬性）

1. **一份数值只存在一处**：数值只在 `TDD.md`。任何文档引用数值时指向 TDD，不得转抄；`boss-anxiety-gdd.md` / `GDD.md` 只引用、不复制。
2. **版本只声明一次**：当前版本只出现在 `AGENTS.md` + `TDD.md` 头部。
3. **每个引用都必须可解析**：文档引用的路径必须存在；否则删除、补建或标 `[待确认]`。
4. **C.A.T 架构硬规则**（TDD §2.2）：`src/core/` 平台纯净（零 THREE / 零 DOM / 零 zustand），副作用只以 `SimEvent` 泄漏；`src/engine/` 是平台适配层。
5. **零资产文件**：全部程序化几何 + Web Audio 合成，不引入外部素材文件。
6. **冻结契约不可擅自改**：`TDD.md` v1.0 起 §5 契约速写与 §4 冻结数值不得擅自修改；需调整须按 TDD §0 冻结规则走（更新变更日志 → §2.6 记裁决 → 通知全部代理）。
7. **doc 与 code 同步提交**：改代码同时更新其 GDD / TDD；doc 脱离 code 视为缺陷。
8. 反向补档时**不发明机制/数值**，未知一律标 `[待确认]`。

## 文档清单（4-doc 底线）

| 文档 | 角色 | 状态 |
|---|---|---|
| `AGENTS.md` | 规则 + 当前状态 | ✓ 本文件 |
| `GDD.md` | 设计权威 | ✓ 规范版，指向 `boss-anxiety-gdd.md` |
| `TDD.md` | 数值 / 契约权威 | ✓ 已存在（v1.0 冻结） |
| `JOURNEY.md` | 决策日志 | ✓ |

设计层：`docs/design/01-concept-core-loop.md`（权威）· 02 内容 · 03 美术 · 04 音频 · 05 UX。玩法文档：`docs/how-to-play.md`（v2/v3）· `docs/v1/how-to-play.md`（v1 归档）。
