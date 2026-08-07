# Patapong 3D

> **3D 体素版 Pong,加角色质感和打击感 —— 每一记挥拍都像一记"啪嗒"(Pata)。**

![status](https://img.shields.io/badge/status-MVP%20v3%20shippable-green)
![stack](https://img.shields.io/badge/stack-Three.js%20%2B%20React%2019%20%2B%20zustand-blue)
![jam](https://img.shields.io/badge/cycle-Vibe%20Game%20Jam%2072h-orange)

---

## TL;DR

```bash
cd C:\Git-repo-my\VibeGames\6_patapong3D
npm install
npm run dev
# 打开 http://localhost:5183
```

- W / S — 上下移动左侧 P1 球拍
- Space — 首发球(READY 状态)
- R — Rematch(MATCH_OVER 状态)
- Esc — 退出菜单
- M — 静音
- 先到 7 分者胜(2-5 分钟一局)

---

## 是什么 / 不是什么

**是**:
- 🎮 3D 体素版街机 Pong(1v1 vs AI)
- 🎨 程序化几何 + Web Audio 合成(零资产文件)
- 💥 重度 juice 反馈层(camera shake + 粒子 + 合成音 + squash)
- 🏗️ C.A.T 架构(纯核心 / 平台适配 / UI 覆盖层)
- ⏱️ 72h Vibe Game Jam MVP

**不是**:
- ❌ 联机对战
- ❌ 复杂 AI(规则式追踪 + 5% 错位)
- ❌ 移动端 / Touch
- ❌ 移动资产文件 / 外部模型 / 音频文件
- ❌ 单人剧情 / 角色养成

---

## 项目结构

```
6_patapong3D/
├── AGENTS.md          # 项目级 agents 规则(必读)
├── README.md          # 本文件
├── GDD.md             # 游戏设计(权威)
├── TDD.md             # 技术设计(冻结契约)
├── MVP-PLAN.md        # Agent 派工表
├── verification-report.md
├── package.json       # 锁版本依赖
├── vite.config.ts     # 端口 5183
├── tsconfig.json / .app.json / .node.json
├── index.html
├── docs/
│   └── design/
│       ├── 01-concept-core-loop.md
│       ├── 02-art-direction.md
│       ├── 03-audio-direction.md
│       └── 04-ux-pacing.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── store.ts
    ├── styles.css
    ├── core/          # 平台纯净(零 THREE/DOM/zustand)
    │   ├── types.ts
    │   ├── constants.ts
    │   ├── math.ts
    │   ├── data/
    │   └── simulation/
    ├── engine/        # 平台适配(Three.js / Web Audio / DOM)
    └── components/    # React UI 覆盖层
```

---

## 文档地图

| 你想了解 | 文档 |
|---|---|
| 玩法 / 设计 | `GDD.md` §1-§5 |
| 美术 | `docs/design/02-art-direction.md` |
| 音频 | `docs/design/03-audio-direction.md` |
| 数值 | `TDD.md` §4.4 |
| 架构 | `TDD.md` §6 |
| 性能预算 | `TDD.md` §3.5 |
| 冻结类型 | `TDD.md` §5 |
| 执行计划 | `MVP-PLAN.md` |
| 验证 | `verification-report.md` |

---

## 贡献者

- **设计 / 文档**:`Mavis`(orchestrator,2026-08-07 初版)
- **实现**:agent-core / agent-engine / agent-ui 三 agent 并行 swarm(3 波迭代:V1 能玩 → V2 全量 juice → V3 可发版,2026-08-08)
- **验证**:agent-qa(Playwright 冒烟 + 截图像素分析 + 事件史核验,见 `verification-report.md`)

---

## 灵感来源(Reference)

- **Atari Pong(1972)** — 极简街机骨架
- **Patapon 1-3(PSP, 2007-2011)** — 打击感即玩法
- **3D Pong(2002 Shockwave / 2021 HTML5)** — Z 轴深度
- **Vlambeer(Nuclear Throne / Luftrausers)** — juice 设计语言
- **Minecraft / Blackvoxel** — 体素美学

---

## License

本项目是 VibeGames 个人项目仓库的一部分。代码 MIT(待定);内容(文档 / 命名)仅供学习交流。

---

*README v0.1 · 2026-08-07*
