# _archive-2026-08-09/ — B33 重置归档

> **触发**:`BUGS B33` (2026-08-09 HIGH reset):关卡内容(4 任务 / 13 房间)、场景渲染(SceneManager / RcPipeline / shaders / postfx / sprites / PerfWatchdog)、玩家移动(InputManager / player.ts / collision.ts)整体移除并归档。
> **原因**:v2 末期视觉 clunky + 移动失效,用户决定清空重做。归档内容**可整体恢复**;GDD §6.3 / TDD §4.4.5 的关卡规格仍在,待后续决定是否同步清理。
> **路径规则**:归档内容**不**在正常 src/ 编译路径;但**保留可读**,以便回滚 / 考古 / 复现历史 bug。

## 1. 归档目录树

```
_archive-2026-08-09/
├── README.md                          ← 本文件(索引)
├── docs/
│   ├── design/
│   │   └── 08-level-design-workflow.md ← 08 关卡工作流(v3.1 重建前原版)
│   └── levels/
│       └── m1_workshop_room1.md        ← 房间蓝图 v2 原版(M3 后已删)
├── scripts/
│   └── level-design.mjs                ← 关卡 md → TS 校验器 v2 原版
└── src/
    ├── core/
    │   ├── data/
    │   │   └── missions.ts             ← 4 任务 / 13 房间 v2 原版
    │   └── simulation/
    │       ├── Simulation.ts           ← 协调器 v2 原版
    │       ├── collision.ts            ← 碰撞 / 视线 / 子弹 v2 原版
    │       └── player.ts               ← 玩家移动 v2 原版
    └── engine/
        ├── GameEngine.ts               ← 主引擎 v2 原版
        ├── InputManager.ts             ← 输入 v2 原版
        ├── PerfWatchdog.ts             ← 性能看门狗 v2 原版
        ├── RcPipeline.ts               ← RC 管线 v2 原版(参考用,新管线在 src 重建)
        ├── SceneManager.ts             ← 场景管理 v2 原版
        ├── postfx/
        │   └── PostProcessPipeline.ts  ← 后处理 v2 原版
        ├── shaders/                    ← RC shader v2 原版(7 份)
        │   ├── broken.frag             ← ⚠️ 失败样本,保留作"白屏"复现
        │   ├── distfield.frag
        │   ├── final.frag
        │   ├── fullscreen.vert
        │   ├── gi.frag
        │   ├── jfa.frag
        │   ├── prepjfa.frag
        │   ├── prepscene.frag
        │   └── rc.frag
        └── sprites/
            ├── LightSprite.ts          ← 灯光 sprite v2 原版
            └── PixelRenderer.ts        ← 像素渲染 v2 原版
```

## 2. 哪些可恢复(回滚到 v2 用)

| 文件 / 目录 | 用途 | 恢复条件 |
|-------------|------|----------|
| `src/engine/RcPipeline.ts` + `shaders/*` | RC 管线参考(v3 重建新管线时是起点) | M1 重建 RC 时 |
| `src/core/simulation/collision.ts` | 碰撞 / 视线 / 子弹数学 | M1.0 spike 之前参考 |
| `src/core/simulation/player.ts` | 玩家移动数学 | M1.0 spike 之前参考 |
| `src/core/data/missions.ts` | 4 任务 / 13 房间数据(可借鉴美术 / 节奏) | M2+ 扩到 4 任务时 |
| `docs/levels/m1_workshop_room1.md` | 房间蓝图 v2 原版 | M1 房间设计可借鉴 |
| `scripts/level-design.mjs` | 关卡 md → TS 校验器 | 关卡 >1 时 |

## 3. 哪些永久 deprecated

| 文件 | 原因 |
|------|------|
| `src/engine/shaders/broken.frag` | ⚠️ v2 编译失败的样本;保留是**为了复现 BUGS B24 白屏 bug**;**永远不**恢复到 src/ |
| `src/engine/InputManager.ts` | v2 解引用 `sim.input` 静默丢失输入(B22),v3 改了架构 |
| `src/engine/PerfWatchdog.ts` | v2 性能口径与 v3.1 不一致 |
| `src/engine/SceneManager.ts` | v2 接错房间 / RC 守卫跳过 |
| `src/engine/postfx/PostProcessPipeline.ts` | v2 framebuffer 编排与 v3.1 不一致 |
| `src/engine/sprites/*` | v2 占位 sprite,程序化生成已重构在 `src/core/data/sprites.ts` |
| `src/core/simulation/Simulation.ts` | v2 协调器,v3 改最小 stub |
| `docs/design/08-level-design-workflow.md` | v2 版,已重建为 v3.2 版(在 `docs/design/08-level-design-workflow.md`) |

## 4. 触发回滚 / 考古的操作

```bash
# 1. 读归档(只读)
ls _archive-2026-08-09/src/engine/shaders/

# 2. 复制一个文件出来参考(不要直接 import)
cp _archive-2026-08-09/src/engine/RcPipeline.ts /tmp/rc-pipeline-v2.ts

# 3. 如果确实需要"完全回滚"到 v2(基本不会发生,只用于 BUGS 复现):
#    a. 整体替换 src/(已破坏 _archive/)
#    b. 跑 scripts/playtest.mjs 复盘 v2 实测
#    c. 修复后,**不要**回填到 src/ —— 把修复打到 v3 上
```

## 5. 状态

| 项 | 状态 |
|----|------|
| 归档目录 | ✅ 2026-08-09 创建(B33) |
| 归档索引(本 README) | ✅ 2026-08-09 v3.1 补 |
| 归档文件原状保留 | ✅ 100% |
| 归档内容引到任何新文档 | ❌(禁止;新文档只引 src/) |
