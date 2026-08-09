# AGENTS.md

> Hotline Shanghai / 热线上海 — Hotline Miami-style 俯视角像素射击 + 1937 上海抗战背景 + 2D Radiance Cascades 实时光影。
> VibeGames monorepo 子项目,**v3.1 重冻结(2026-08-09)**。本文档是项目级规则权威;数据契约看 `TDD.md`,设计看 `GDD.md`,里程碑看 `MVP-PLAN.md`,bug 看 `BUGS.md`,设计细节看 `docs/design/`(9 份 01-09)。

---

## 项目状态

- **阶段**:**v3.1 重冻结**(2026-08-09)。**B33 重置**:关卡 / 场景 / 移动实现已归档 `_archive-2026-08-09/`(归档目录有 README 索引);app = 标题壳(stub Simulation + GameEngine)
- **设计文档**:`GDD.md` v3(权威,§0.5 重置判决)/ `TDD.md` v3.1(冻结契约,§0.1 + §4.6 + §15.3-§15.4 BLINDSIDE 整合)/ `MVP-PLAN.md` v3.1 / `docs/design/01-09.md`(9 份,完整地图见 [`docs/design/README.md`](docs/design/README.md));v1/v2 原始版存档于 `v2/` + 归档模块在 `_archive-2026-08-09/`
- **代码状态**:M1.0 spike(标题壳 + `core/world/lightField.ts` + `flashlight_patrol` archetype 数据);M1.0 Day 2-3 待最小垂直切片重建(标题 → 1 房间 → knife → 1 敌)
- **端口**:**5184**(避 4_chunbai=3000 / 5_gamejam_1=5173 / 6_patapong3D=5183)
- **node_modules**:M0 阶段未提交,首次运行 `npm install` 初始化

## v3.1 范围(冻结,2026-08-09 改写)

- **任务**:1 + 4 = 5 个(m1_workshop ship + m2-m4 设计阶段);M1 = 命题证明 = 1 房 / knife / 1 敌 / 光暗机制
- **房间**:M1 = 1 房(码头仓库 lilong);M2+ 扩到 13 房(3-4 房 / 任务)
- **武器**:M1 ship = knife 1 件;v1 锁 8 件(2 近战 + 4 远程 + 2 投掷)够 M1 命题;M2+ 按手感差异铺到 35 件
- **面具**:9 个(6 v1 + 3 v3.1 = `lampmaker` / `darkwatch` / `fortuneteller`;`lampmaker` M1.6 提前 ship 作为机制验证面具)
- **敌人**:5 个 archetype(soldier / policeman / spy / boss + v3.1 `flashlight_patrol`);M1 房间固定 `flashlight_patrol`
- **机制**:v3.1 BLINDSIDE 整合(B29 ADOPTED + B34-B39),权威规范 [`docs/design/09-blindside-integration.md`](docs/design/09-blindside-integration.md)

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
2. **零资产文件**:所有 sprite / 音频 / 地图全部程序化(Web Audio 合成 + 程序化几何 / ASCII 地图 → 像素块)。
3. **2D RC 必须是真实现**(M2 性能目标):游戏光照层 = 真实 Radiance Cascades 全管线(scene prep → JFA → cascade probes → composite),不是 fake additive。M1 先 ship 几何光场(09 §13),RC 暂不可用(用户指令)。
4. **v3.1 范围**:1+4 任务 / 1+13 房 / 8 → 35 武器 / 9 面具 / 5 敌人 archetype(含 `flashlight_patrol`)/ 1 BOSS。详见上节。
5. **TDD 是冻结契约**:`TDD.md` §5 契约速写的类型签名 / 状态名 / 默认数值 = 最高优先级。改契约走 [`11-contract-change-procedure.md`](docs/design/11-contract-change-procedure.md) 流程。
6. **v3.1 光暗机制**:阴影中敌弹落空 / 灯下必中(B29 #1,核心机制);9 面具 / 拆灯 / 巡逻手电 / lightField 联动,权威规范 [`docs/design/09-blindside-integration.md`](docs/design/09-blindside-integration.md)。

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
│   ├── pipeline.ts           # 6 阶段管线算法参考(未来 src/engine/RcPipeline.ts 起点)
│   ├── scenes.ts             # 6 个测试场景 + 断言
│   ├── verify.ts             # 逐场景运行 + 数据驱动断言
│   └── shaders/              # 干净 GLSL ES 3.00(零运行时补丁)
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
