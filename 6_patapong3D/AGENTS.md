# 6_patapong3D — AGENTS.md(项目级)

> **这是项目级 agents 规则**。本仓库根 `AGENTS.md` 是 monorepo 总规则;本文件是其下级。
> 6_patapong3D = 3D 体素版 Pong + juice 反馈层,Vibe Game Jam 72h MVP。

---

## 1. 一句话

Patapong 3D = 3D 体素 Pong + 角色质感 + 打击感(每击拍 = 完整 juice)。**先到 7 分胜,2-5 分钟一局,纯前端,零资产文件**。

---

## 2. 文档驱动设计(DDD)

本文档是 monorepo KIMI3 DDD 工作流的项目级入口。**所有改动前先看文档**:

| 想知道什么 | 看哪个文档 |
|---|---|
| **设计是什么** | `GDD.md` ← 起点 |
| **设计 vs 实现冲突谁说了算** | `GDD.md` 是设计层权威;`TDD.md` 是技术层权威;冲突时以 **TDD §2.6 裁决表** 为准 |
| **技术怎么实现** | `TDD.md` ← 起点 |
| **数值表 / 冻结契约** | `TDD.md` §4.4 / §4.5 / §5 |
| **美术细节** | `docs/design/02-art-direction.md` |
| **音频细节** | `docs/design/03-audio-direction.md` |
| **UX / 节奏** | `docs/design/04-ux-pacing.md` |
| **谁什么时候干什么** | `MVP-PLAN.md` ← sub-batch 派工表 |
| **每个 M 验证证据** | `verification-report.md` |
| **如何跑** | `README.md` |

**冻结规则**(TDD §0):
- `TDD.md` §5(契约速写)与 §4(FSM / 数据表)中的签名、状态名、默认数值**不得擅自修改**
- 改这些需要:① 改 TDD 变更日志 ② 通知全部 agent 重读 ③ 独立 commit `[TDD-CONTRACT-CHANGE]`

---

## 3. 架构:C.A.T(沿用 4_chunbai / 5_gamejam_1)

```
src/
├── core/        # 平台纯净,零 THREE / DOM / zustand 导入
│   ├── types.ts
│   ├── constants.ts
│   ├── math.ts
│   ├── data/    # colors / paddles / court / audience / sfx
│   └── simulation/  # Simulation + ballPhysics / paddleControl / aiPaddle / scoreTracker / rallyCounter / juiceEvents
├── engine/      # 平台适配:Three.js / Web Audio / DOM 在此
│   ├── GameEngine.ts          # rAF + 固定步 sim + render 编排
│   ├── SceneManager.ts        # scene + camera + lights
│   ├── InputManager.ts        # 键盘
│   ├── AudioManager.ts        # Web Audio 合成
│   ├── VoxelRenderer.ts       # 4 个 InstancedMesh 共享
│   ├── ParticleSystem.ts      # 粒子 TTL + matrix
│   ├── CameraShake.ts
│   ├── PerfWatchdog.ts        # 性能监控 + 自动降级
│   ├── postfx.ts              # UnrealBloom + Vignette
│   ├── devtools.ts            # window.__gameManifest / __sim
│   └── storage.ts             # localStorage 适配
├── components/  # React UI 覆盖层
│   ├── HUD.tsx
│   ├── Menu.tsx
│   ├── ReadyCountdown.tsx
│   ├── PointOverlay.tsx
│   ├── WinScreen.tsx
│   └── PerfBadge.tsx          # DEV 性能降级提示
├── store.ts     # zustand(只读 sim snapshot,不写)
├── App.tsx
├── main.tsx
└── styles.css   # Tailwind 入口
```

**硬规则**:
- `core/` 内部**禁止** import `three` / `react` / `zustand` / 任何 DOM API
- side effect **只能** 通过 `SimEvent` 类型事件泄漏
- `engine/` 是 `core/` 的消费者(通过 `sim.snapshot()` + `sim.onEvent()`)
- `components/` 只能通过 zustand store 读 sim,不能直接 import `Simulation`

**违反以上规则 = 立即 PR reject**(agent-qa 责任)。

---

## 4. 技术栈(锁版本,TDD §3.2)

| 依赖 | 版本 | 用途 |
|---|---|---|
| vite | ^6.0.0 | 构建 / HMR / dev server 5183 |
| typescript | ^5.6.0 | 类型门 strict |
| react / react-dom | ^19.0.0 | UI 覆盖层 |
| three / @types/three | ^0.170.0 | 渲染 |
| zustand | ^5.0.0 | UI 状态 |
| tailwindcss | ^3.4.0 | HUD 样式 |
| @vitejs/plugin-react | ^4.3.0 | React 插件 |
| postcss / autoprefixer | ^8.4.0 / ^10.4.0 | CSS |

**禁止**:
- 任何新依赖(72h 禁装)
- 任何外部资产文件(零资产纪律,5_gamejam_1 沿用)
- 任何 Lint / Test / Format 命令(本项目无测试套件,72h 不写)

---

## 5. 命令

```bash
cd C:\Git-repo-my\VibeGames\6_patapong3D
npm install      # 首次必须(node_modules 不提交)
npm run dev      # 启动,端口 5183,打开 http://localhost:5183
npm run build    # tsc + vite build,输出到 dist/(不提交)
npm run preview  # 预览生产构建
npx tsc -b --noEmit  # 类型门
```

**严禁**:
- `npm install <新包>` — 走 TDD 变更流程
- 在仓库根目录运行 npm — 本目录是独立 Vite 项目,根目录无 package.json

---

## 6. 文件所有权白名单(本项目 3 agent)

| Agent | 拥有 | 不拥有 |
|---|---|---|
| **agent-core** | `src/core/**` 全集 | engine / components / store / App |
| **agent-engine** | `src/engine/**` 全集 | core / components / store / App |
| **agent-ui** | `src/components/**` + `src/App.tsx` + `src/main.tsx` + `src/store.ts` + `src/styles.css` | core / engine |
| **agent-qa** | **无所有权**(仅验证) | 一切 |

冲突文件走 `mavis` 仲裁。详见 `MVP-PLAN.md` §6.2。

---

## 7. Commit 纪律(严格)

- 每个 sub-batch 1 commit(`M1.1` / `M1.2` / ... / `M3.5`)
- commit gate = `npx tsc -b --noEmit` 0 error
- commit message 用英文,**PR 描述**用中文
- 禁止 force push / rebase / amend 已 push 的 commit

---

## 8. 并行会话注意(monorepo 共享 git)

- 顶层 `AGENTS.md` 提示:多个 session 在本仓库并行工作;本项目与其他 5 个项目互不冲突
- `git commit` 偶发 `index.lock` transient 失败 — retry,不要删 lock
- 提交前先 `git status` 确认本项目外的文件未被卷入

---

## 9. 性能红线(违反 = P1 bug)

- 60 FPS @ 1080p 稳定(详见 `TDD.md` §3.5)
- Draw call < 10
- 总三角形 < 30k
- 粒子峰值 ≤ 200
- 音频 voices ≤ 6 active
- WebGL 对象泄漏 = 0

启用 `PerfWatchdog` 自动降级(关 bloom / 砍粒子)—— 详见 `TDD.md` §3.6。

---

## 10. 快速链接

- GDD:`./GDD.md`
- TDD:`./TDD.md`
- MVP 计划:`./MVP-PLAN.md`
- 设计子文档:`./docs/design/`
- 验证报告:`./verification-report.md`
- 顶层 monorepo 规则:`../AGENTS.md`

---

*项目级规则 v0.1 · 2026-08-07*
