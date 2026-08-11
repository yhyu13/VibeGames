# AGENTS.md

> Hotline Shanghai / 热线上海 — Hotline Miami-style 俯视角像素射击 + 1937 上海抗战背景 + 2D Radiance Cascades 实时光影。
> VibeGames monorepo 子项目,**v3.7 哨塔大院重冻结(2026-08-10)**。本文档是项目级规则权威;数据契约看 `TDD.md`,设计看 `GDD.md`,当前关卡蓝图看 `docs/levels/m1_intro_scene.md`,bug 看 `BUGS.md`,设计细节索引看 [`docs/design/README.md`](docs/design/README.md)。缺失的历史 `MVP-PLAN.md` 引用属于文档债务,不得假称已同步。

---

## 项目状态

- **阶段**:**P5 / P6 / P7 与本轮 self-play polish 已完成并验证**(2026-08-09)。用户以“self play review until polished work until done”明确扩展原 sprite+RC 视觉任务范围；P5 不再 pending / out-of-scope。
- **设计文档**:`GDD.md` v3(权威,§0.5 重置判决)/ `TDD.md` v3.1(冻结契约,§0.1 + §4.6 + §15.3-§15.4 BLINDSIDE 整合)/ `MVP-PLAN.md` v3.1 / `docs/design/01-09.md`(9 份,完整地图见 [`docs/design/README.md`](docs/design/README.md));v1/v2 原始版存档于 `v2/` + 归档模块在 `_archive-2026-08-09/`
- **代码状态**:连接式 `m1_tower_compound` 单房闭环已实现：3 名地面巡逻 + 1 名静态哨塔守卫；中央油灯为探照灯电源，断电后可中和塔守；玩家具 C96 射击、R 掷枪、RMB knife、score/replay。`SceneManager` 以 Canvas2D 绘制 sprite/base scene，`RcPresenter` 转成 planes，独立 WebGL2 `RcPipeline` 固定 3 cascades / `baseIntervalPx=6` / 0.5 resolution work buffers / twoLoop；当前 frame override 关闭 dither。几何 LOS/LightField 是 gameplay 权威，RC 仅 visual-only。
- **端口**:**5184**(避 4_chunbai=3000 / 5_gamejam_1=5173 / 6_patapong3D=5183)
- **node_modules**:M0 阶段未提交,首次运行 `npm install` 初始化

## v3.1 范围(冻结,2026-08-09 改写 → 2026-08-09 再次重冻结为单场景)

- **任务 / 房间**:**1 个 intro scene**(mission `m1_workshop` / room `m1_tower_compound`) = THE game。蓝图 = [`docs/levels/m1_intro_scene.md`](docs/levels/m1_intro_scene.md)。M1 命题证明 = 1 个连接式哨塔大院 / 3 ground patrols + 1 static tower guard / 拆电→清敌→撤离。
- **武器**:M1 ship = knife 1 件;数据冻结 8 件(2 近战 + 4 远程 + 2 投掷),其他 7 件 M2+ 启用。
- **面具**:**9 个数据冻结**(6 v1 + 3 v3.1 = `lampmaker` / `darkwatch` / `fortuneteller`),intro scene 暂不 ship `MaskSelect` 流程(`lampmaker` M1.6 提前 ship 作机制验证面具)。
- **敌人**:5 个 archetype 数据冻结(soldier / policeman / spy / boss + v3.1 `flashlight_patrol`);intro scene 固定 `flashlight_patrol`。
- **机制**:v3.1 BLINDSIDE 整合(B29 ADOPTED + B34-B39),权威规范 [`docs/design/09-blindside-integration.md`](docs/design/09-blindside-integration.md)。

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

1. **C.A.T 硬规则**:`core/` 零 THREE / 零 DOM / 零 zustand 导入;`engine/` 平台适配。详细边界 + 数据流图见 [`docs/design/10-architecture-cat.md`](docs/design/10-architecture-cat.md)。
2. **运行时 PNG 唯一例外(用户批准)**:只允许 intro curated set。批准清单/源文件哈希以 `references/sprite-samples/approved-intro-assets.json` 为准，生成流程以 `scripts/process-intro-sprites.mjs` 为准，输出只进入 `public/sprites/intro/` + 生成的 `src/engine/sprites/intro-manifest.ts`。不得扩展为通用外部资产政策；音频/地图仍程序化。
3. **2D RC 是真实 WebGL2 管线**:`RcPresenter` 专职桥接 Canvas2D scene source 与 `RcPipeline`;intro 固定 3 cascades / `baseIntervalPx=6` / `resolutionScale=0.5` / `twoLoop=true`;dither 的有效值以每帧 override 为准。敌人视锥 emission 与玩家随身暖光仅 visual-only；几何 LOS/LightField 独立决定暴露、护甲与拆灯，不从 RC 像素反推 gameplay。
4. **v3.7 范围(重冻结)**:**1 个 `m1_tower_compound` intro scene / 1 房** / 3 地面巡逻 + 1 全 FSM 静态塔守 / 中央电源油灯 + 探照灯 / C96+knife+掷枪 / 数据冻结 8 武器 / 9 面具(暂不 ship 选面具流程) / 5 敌人 archetype。详见上节。
5. **TDD 是冻结契约**:`TDD.md` §5 契约速写的类型签名 / 状态名 / 默认数值 = 最高优先级。改契约走 [`11-contract-change-procedure.md`](docs/design/11-contract-change-procedure.md) 流程。
6. **v3.1 光暗机制**:阴影中敌弹落空 / 灯下必中(B29 #1,核心机制);9 面具 / 拆灯 / 巡逻手电 / lightField 联动,权威规范 [`docs/design/09-blindside-integration.md`](docs/design/09-blindside-integration.md)。
7. **Intro 实战教训**:修改输入/伤害、视野、sprite atlas、Canvas↔WebGL 方向、RC 亮度或任务闭环前，先读 [`docs/design/25-intro-scene-lessons.md`](docs/design/25-intro-scene-lessons.md)。该文档记录真实玩家路径与自动测试产生偏差的已验证原因。

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
├── rc-lab/                   # ⭐ RC 算法测试台(独立 WebGL2 + 确定性场景断言)
│   ├── README.md
│   ├── index.html
│   ├── main.ts               # 页面入口 + window.__rcLab 调试钩子
│   ├── pipeline.ts           # 6 阶段管线算法原型
│   ├── port-check.ts         # 用同一套断言验证 src/engine/RcPipeline.ts 移植版
│   ├── scenes.ts             # 6 个测试场景 + 断言
│   ├── verify.ts             # 逐场景运行 + 数据驱动断言
│   └── shaders/              # 干净 GLSL ES 3.00(零运行时补丁)
├── rc-showcase/              # RC 展示场景(游戏侧 RcPipeline 实时渲染 1937 客厅)
├── docs/
│   └── design/
│       ├── 01-concept-core-loop.md
│       ├── 02-art-direction.md
│       ├── 03-audio-direction.md
│       ├── 04-radiance-cascades-pipeline.md
│       ├── ...
│       └── 25-intro-scene-lessons.md
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
    │   ├── RcPresenter.ts    # Canvas2D scene planes → 独立 WebGL2 RC canvas
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
- **移植状态**:`src/engine/RcPipeline.ts` + `src/engine/shaders/*` 已从 rc-lab 移植并接入 `SceneManager → RcPresenter → RcPipeline`;输入契约为同尺寸 occlusion/emission/sceneColor 三个 planes。当前 intro 固定单 cascade，实验室/历史多 cascade 数据不代表游戏运行配置。

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
- 无 vitest；最终浏览器门使用 Playwright `npm run e2e:playtest`。
- **最终门**:`npm run intro-polish:check` + `npm run combat-loop:check` + `npm run e2e:playtest`。最终截图:`smoke/hotline-e2e-intact.png`、`smoke/hotline-e2e-broken.png`、`smoke/hotline-e2e-detection-death.png`、`smoke/hotline-e2e-retry.png`、`smoke/hotline-e2e-score-replay.png`；P4 / sprite 接线基线图保留作历史对照。

## 已知风险

- **RC 性能**:WebGL2 1080p 3 级 cascade + JFA `log2(min(W,H))`≈10-11 pass 可能掉帧;M1 必须搭降级路径(降 cascade 数 / 降分辨率 / gi.frag 单 pass / 关闭 RC)。
- **1937 历史敏感度**:所有 NPC / 任务 / 文本避免污名化,把日军写成可识别的"占领军制服",不直接写"日本兵"加负面刻板;民间人士可中性化处理。
- **像素艺术 + RC 的对比**:RC 让暗部柔光过度,会"吃掉"像素颗粒感 — 必须给 RC 输出加 dither(抖动)或像素化后处理回压到 16-bit 风格。
- **非阻塞 polish 上限**:规则方盒构图、石库门/晾衣层次、缩放后的角色轮廓、灯灭反差与短时粒子关键帧仍可继续提升；这些不阻塞已验证的单场景闭环，也不授权扩展 PNG manifest 或增加 RC cascade。
