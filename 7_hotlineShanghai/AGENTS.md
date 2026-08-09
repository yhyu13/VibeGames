# AGENTS.md

> Hotline Shanghai / 热线上海 — Hotline Miami-style 俯视角像素射击 + 1937 上海抗战背景 + 2D Radiance Cascades 实时光影。
> VibeGames monorepo 子项目,M0 设计阶段(2026-08-08)。本文档是项目级权威,与本文档冲突的代码视为 bug。

---

## 项目状态

- **阶段**:v3 重冻结(2026-08-09)。**B33 重置**:关卡 / 场景 / 移动实现已归档 `_archive-2026-08-09/`,app = 标题壳(stub Simulation + GameEngine);设计重判见 GDD §0.5 / TDD §0.1 / MVP-PLAN v3
- **设计文档**:`GDD.md` v3(权威,§0.5 重置判决)/ `TDD.md` v3(冻结契约,§0.1 覆盖)/ `docs/design/01..04-*.md`(01+04 已同步 v2;07 已加 §6 人审门)/ `MVP-PLAN.md`(v3 重切);v1/v2 原始版存档于 `v2/`
- **代码状态**:标题壳;M1 按 MVP-PLAN v3 重切 —— 命题证明(1 房间 / knife / 1 敌人 / 光暗机制,先无 RC 基线再单级 final-pass)
- **端口**:**5184**(避 4_chunbai=3000 / 5_gamejam_1=5173 / 6_patapong3D=5183)
- **node_modules**:M0 阶段未提交,首次运行 `npm install` 初始化

## 设计一句话

> 迈阿密热线手感 + 1937 上海孤岛时期的地下抵抗 + **2D Radiance Cascades**(枪火/霓虹/油灯/爆炸全部是真实 RC 光源,不是 fake lighting)

## 关键参考

| 维度 | 参考 | 路径 |
|------|------|------|
| **手感** | Hotline Miami(2012, Dennaton Games) | 顶视角 + 一击必杀 + 节奏 + 面具 |
| **历史题材** | 血战上海滩(2003, 欢乐数码) + 战上海 / 八百 | 1937 抗战孤岛期,虹口 / 苏州河 / 法租界 |
| **光影算法** | 2D Radiance Cascades | `C:\Git-repo-3rd\Radiance_Cascade_repos\radiance-cascades-demo` |
| **架构** | C.A.T(同 4_chunbai / 5_gamejam_1) | `core/` 平台纯净 / `engine/` 平台适配 |

## 关键约束(必须在 M1 前重读)

1. **C.A.T 硬规则**:`core/` 零 THREE / 零 DOM / 零 zustand 导入;`engine/` 平台适配。
2. **零资产文件**:所有 sprite / 音频 / 地图全部程序化(Web Audio 合成 + 程序化几何 / ASCII 地图 → 像素块)。
3. **2D RC 必须是真实现**:游戏光照层 = 真实 Radiance Cascades 全管线(scene prep → JFA → cascade probes → composite),不是 fake additive。
4. **v1 范围**:8 武器 / 6 面具 / 4 任务(每任务 3-4 个房间)/ 1 敌人类型 + 1 BOSS。
5. **TDD 是冻结契约**:`TDD.md` §5 契约速写的类型签名 / 状态名 / 默认数值 = 最高优先级,改它要走 `[TDD-CONTRACT-CHANGE]` 流程。
6. **v3 光暗机制**:阴影中敌弹落空 / 灯下必中(B29 #1,核心机制);M1 先 ship 无 RC 基线,再单级 final-pass。

## 布局

```
7_hotlineShanghai/
├── AGENTS.md
├── README.md
├── GDD.md                    # 设计层权威(冻结 v2)
├── TDD.md                    # 技术契约(冻结 v2)
├── v2/                       # 存档(v1/v2 原始版,GDD/TDD 已提升到根目录)
├── MVP-PLAN.md               # 里程碑 + agent 拆分
├── package.json
├── vite.config.ts
├── tsconfig.{json,app.json,node.json}
├── index.html
├── postcss.config.js
├── tailwind.config.js
├── .gitignore
├── docs/
│   └── design/
│       ├── 01-concept-core-loop.md
│       ├── 02-art-direction.md
│       ├── 03-audio-direction.md
│       └── 04-radiance-cascades-pipeline.md
└── src/
    ├── core/                 # 平台纯净(零 THREE / 零 DOM / 零 zustand)
    │   ├── types.ts
    │   ├── constants.ts
    │   ├── math.ts
    │   ├── data/             # 武器表 / 面具表 / 敌人表 / 房间表 / 调色板 / 音效配方
    │   ├── world/            # 房间 tokenizer / tile 查询
    │   └── simulation/       # Simulation 协调器 + 子系统
    ├── engine/               # 平台适配
    │   ├── GameEngine.ts
    │   ├── SceneManager.ts
    │   ├── InputManager.ts
    │   ├── AudioManager.ts
    │   ├── RcPipeline.ts     # ⭐ 2D Radiance Cascades 后处理(本项目最重的引擎模块)
    │   ├── shaders/          # prepscene / prepjfa / jfa / distfield / rc / final
    │   ├── postfx/           # PostProcessPipeline:WebGL2 framebuffer 编排
    │   ├── sprites/          # 程序化 sprite 渲染(Canvas2D 或 WebGL2)
    │   ├── devtools.ts       # window.__gameManifest() / __sim
    │   ├── storage.ts
    │   └── PerfWatchdog.ts
    ├── store.ts              # zustand UI 状态
    ├── components/           # HUD / MissionBrief / MaskSelect / DevPanel / MainMenu
    ├── App.tsx
    └── main.tsx
```

## RC 测试台(rc-lab/,M1 前置)

- **用途**:先在隔离环境把 2D Radiance Cascades 算法本体跑对,再集成进游戏,保证一次成功(B33 教训:shader 编译失败/管线 no-op 导致全黑屏)。
- **访问**:`npm run dev` 后打开 `http://localhost:5184/rc-lab/`,进页面自动运行 7 个确定性场景 + 数据驱动断言(径向衰减 / 墙影 / 绕射 / 双色灯合并 / 家具房间 / 枪火 / 压力)。
- **门禁**:`npm run rc-lab:check`(headless Chromium + SwiftShader,输出 `smoke/rc-lab.png`)。
- **规则**:`rc-lab/shaders/*` 是**干净 GLSL ES 3.00**(禁止运行时字符串补丁);`rc-lab/pipeline.ts` 是未来 `src/engine/RcPipeline.ts` 的算法参考;改算法必须先让 rc-lab 全绿再动游戏代码。

> 2026-08-09 重置(B33):上表 engine/ 的 `SceneManager.ts` / `RcPipeline.ts` / `shaders/` / `postfx/` / `sprites/` / `PerfWatchdog.ts` / `InputManager.ts` 与 core/simulation 的 `player.ts` / `collision.ts` 已归档至 `_archive-2026-08-09/`,重建后恢复此布局。

## 命令

| 用途 | 命令 |
|------|------|
| 安装 | `npm install`(M1 第一次;M0 阶段还没必要) |
| 开发 | `npm run dev` → http://localhost:5184 |
| 构建 | `npm run build`(`tsc -b && vite build`) |
| 类型检查 | `npx tsc -b --noEmit`(M1 后才有意义) |

## 验证门

- **M0 设计阶段**:GDD/TDD 评审通过,无代码需求。
- **M1 起**:`npx tsc -b --noEmit` 零 error + 浏览器冒烟(零 console error,`window.__gameManifest()` 返回合法 JSON 文本)。
- 无 vitest,无 playwright(本项目没时间搭,沿用 6_patapong3D 简化策略)。

## 已知风险

- **RC 性能**:WebGL2 1080p 3 级 cascade + JFA `log2(min(W,H))`≈10-11 pass 可能掉帧;M1 必须搭降级路径(降 cascade 数 / 降分辨率 / gi.frag 单 pass / 关闭 RC)。
- **1937 历史敏感度**:所有 NPC / 任务 / 文本避免污名化,把日军写成可识别的"占领军制服",不直接写"日本兵"加负面刻板;民间人士可中性化处理。
- **像素艺术 + RC 的对比**:RC 让暗部柔光过度,会"吃掉"像素颗粒感 — 必须给 RC 输出加 dither(抖动)或像素化后处理回压到 16-bit 风格。
