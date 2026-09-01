# AGENTS.md — 纯白枪骑兵 Pure White Lancer

> 本文档为 4 文档底线之一（依据 `.claude/docs/GAME-STUDIO-SOP.md` v1.0）。当前版本声明于本文档与本目录 `TDD.md` 头部；数值一律以 `TDD.md` 为唯一事实源。

## 游戏是什么

基于 phixcat 2008 年 Flash 原作《纯白枪骑兵》（`reference/206206.swf`）的 **3D 第三人称空战射击重制版**：一台纯白机甲在太空/虚空中全 3D 飞行，鼠标瞄准、锁定、波次生存 + Boss 战。当前引擎栈为 Vite + React 19 + TypeScript(strict) + Three.js + Zustand + Tailwind + Web Audio（全部零外部资源文件）。

## 目录结构（de-facto，以实际存在为准）

```
4_chunbai/
├── new_game/                 # ★ 当前可运行的游戏本体（Vite 应用）
│   ├── index.html / package.json / vite.config.ts / tailwind.config.js
│   ├── dist/                 # 已提交的构建产物
│   └── src/
│       ├── main.tsx / App.tsx          # 入口 + 屏幕路由（menu/pve/pause/result）
│       ├── store.ts                    # zustand 全局状态（单玩家）
│       ├── core/                       # ★ C.A.T 平台无关核心（零 THREE/DOM/store 依赖）
│       │   ├── types.ts / constants.ts / math.ts
│       │   ├── data/                   # weapons / enemies / bosses / skills 数据表（只读）
│       │   ├── simulation/             # Simulation.ts + enemyAI.ts + bossAttacks.ts + events.ts
│       │   └── world/                  # world.ts（WorldManifest 事实源）+ worldText.ts（token 化）
│       ├── engine/                     # ★ 平台适配层（Three.js / DOM / Web Audio / store）
│       │   ├── GameEngine.ts (534 行)  # 编排器：固定步长主循环 + 事件分发 + mesh 对账
│       │   ├── SceneManager.ts / InputManager.ts / AudioManager.ts / postfx.ts
│       └── components/                 # GameCanvas / HUD / Menu / PauseMenu / ResultScreen
├── src/                      # FFDec 反编译原版 SWF 资源（buttons/fonts/frames）— 参考专用，不参与构建
├── reference/                # 原版 206206.swf、纯白枪骑兵2011.exe、ffdec 反编译工具、d.md 操作笔记
├── registered_agents.json / task_agent_mapping.json   # swarm 任务簿记（当前均为空 {}）
└── console-dump*.txt / debug.log / *.png              # 运行/调试/截图留存
```

## 怎么运行 / 构建

```bash
cd new_game
npm install          # 首次
npm run dev          # 开发服务器，固定端口 3000（vite.config.ts, host 0.0.0.0）
npm run build        # 生产构建 = tsc -b && vite build（构建门禁）
npm run preview      # 预览生产产物
```

- **类型检查门禁**：`npx tsc -b --noEmit` 必须 0 错误（每个提交前）。
- **禁止**：`src/` 与 `reference/` 下任何原版反编译资源不参与构建、不得改动。
- 运行时数值断言（冒烟基线）见 `TDD.md` §构建验收与 `new_game/verification-report.md`。

## 当前状态（2026-09-01 反推）

- **运行态**：单玩家 PVE 波次生存竞技场，屏幕流 `menu → pve → pause/result`。`screen: 'menu' | 'pve' | 'pause' | 'result'`（`store.ts` / `App.tsx`）。
- **已实现**（从实际代码 + `verification-report.md` 核实）：全 3D 飞行（WASD + Shift/Ctrl 升降）、鼠标屏幕空间瞄准、锁定系统（Tab 切换、软锁定、提前量圈）、6 武器数据表（1-3 常驻）、波次敌种解锁、Boss 相位、机动（助推/闪避/急停）、必杀（Z）、C0 开场序列、Bloom 后处理（`postfx.ts`）、Web Audio 合成音效、C.A.T 架构（core/engine 拆分）、`window.__gameManifest()` dev 钩子。
- **未实现 / 仅在文档中的愿景**（`new_game/implementation-plan.md` §R2-8 规划，代码中无对应文件）：**Roguelike 选关地图**（无 `MapScreen.tsx`、无 `core/data/map.ts`、`store` 无 `'map'` screen、无跨局持久化）；乱入中 Boss；关卡制胜利结算。当前为**无限波次**生存（`WAVE_INTERVAL`/`BOSS_WAVE_INTERVAL`）。

## 版本

当前版本：**1.0.0**（见 `new_game/package.json`）。版本声明只出现在本文件与 `TDD.md` 头部。

## 规则

1. 数值唯一事实源 = `TDD.md`；`AGENTS.md`/`GDD.md` 不复制数值。
2. 版本只在 `AGENTS.md` + `TDD.md` 头部声明。
3. 任何引用的 `path` 必须存在，否则加 `[待确认]`。
4. 改动涉及行为/结构时，回写 `new_game/design-doc.md` / `TDD.md` / `verification-report.md`。
