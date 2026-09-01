# JOURNEY — VibeGames（仓库级旅程）

> 一份仓库级时间轴：记录「我」（掌舵方向）与「你」（并肩实现）如何把 VibeGames 从一个 Flash 重制实验，养成 14 款独立游戏 + 一套可复用的「Claude Game Studio」工作流。
>
> 每个游戏另有自己的 `JOURNEY.md` 记录各自的决定日志；本文件只记录**跨游戏、跨项目**的演进。

---

## 0. 铁律与信条（仓库级）

- **零运行时资源**：所有游戏不 ship 图片/模型/音频文件/网络调用。几何程序化生成、材质代码烘焙、声音 Web Audio 合成。
- **C.A.T 架构**：每个项目一个平台纯净的 `core/`（纯 TS，禁 THREE/DOM/React）→ `engine/` 适配器 → 薄 `components/` overlay。
- **Doc-driven**：GDD（设计权威）+ TDD（数值/契约权威）+ 代码同 commit。文档与代码漂移 = 缺陷。
- **1 个完美的 intro scene > 100 个 80% 的关卡**：打磨优先于堆量。

---

## 1. 起源 —— Alien Invader（`1/` `2/` `3/`）

| 我 | 你 |
|---|---|
| 想重制记忆里「半忘掉的 Flash 经典」 | 落地第一款：Alien Invader —— 你是入侵者，地球反击 |
| 想用同一命题试不同引擎/范式 | 复刻三版：`1/`（preact-signals）、`2/`（zustand）、`3/`（裸 Three.js 无 React） |

这三版是仓库的「完成品参考系」，之后的项目都从它的 C.A.T 分层与零资产纪律长出来。

---

## 2. 从重制到实验（`4`–`11`）

| 我 | 你 |
|---|---|
| 想直接重制 Flash 原作 `4_chunbai` | 反推反编译 Flash 参考，3D 纯白机甲 vs 纯黑虚空，roguelite 战争进行曲 |
| 想用 72 小时 game-jam 逼自己出成品 | `5_gamejam_1`：Boss 的焦虑 —— 你演最终 Boss，恐惧的是「今晚表演不够好」 |
| 想要有节奏感的 3D 神鼓 | `6_patapon3D`：神圣鼓手，四拍指令语法驱动三只体素 Patapon |
| 想要「真光照」而不是假发光 | `7_hotlineShanghai`：Hotline Miami × 1937 上海孤岛 × 真 2D Radiance Cascades |
| 想做一个「出身决定命运」的模拟器 | `8_lifegame`：股神模拟器 —— 出生彩票就是机制，把「信息差」做成承重墙 |
| 想做一个「光线追踪本身就是卖点」的平台跳跃 | `9_3dplatform`：PRISM LEDGE —— 自研 WebGPU TSL 光线追踪收集品 |
| 想玩「四个世界叠成纸」的相位切换 | `10_phasewalk`：四相行者 —— 切相位即切换关卡，气液固等离子 |
| 想对广义相对论表一次白 | `11_blackhole`：Kerr 黑洞 —— 每像素沿 Kerr 测地线数值积分 |

---

## 3. 向渲染技术深水区（`12`–`14`）

| 我 | 你 |
|---|---|
| 想真正做一次实时全局光照探针 | `12_ddgi`：DDGI 探针系统（three.js r185 + WebGPU + TSL） |
| 想做一个「不扣扳机」的卫星操作游戏 | `13_spysatellite`：EYE-13 夜视 SAR 卫星，无线电操作员，一个庭院 90 秒 |
| 想用一张 8 维潜变量纹理证明命题 | `14_neuraltexture`：NEURAL TEXTURE —— 8-D latent + 1635 参数 Decoder MLP 实时近似陶瓷 SVBRDF |

---

## 4. Claude Game Studio 的成型

随着项目增多，一个趋势浮现：**后面的游戏（`6`–`14`）自发长出了同一套文档地板** —— `AGENTS.md`（规则+状态）、`GDD.md`（设计权威）、`TDD.md`（数值/契约权威）、`JOURNEY.md`（决定日志）。`7_hotlineShanghai` 更进一步，在多轮文档漂移后产出了自己的 `GAME-SOP.md`（一致性标准 + 三条硬规则）。

| 我 | 你 |
|---|---|
| 意识到这套「四文档地板 + 一致性纪律」是宝贵的可复用资产 | 把 `.claude/` 里 49 个分层 agent + ~90 个 slash command + 7 阶段流水线系统化 |
| 想让它从「各项目自己重新发现」变成「开箱即用的 SOP」 | 2026-09-01 产出仓库级 `GAME-STUDIO-SOP.md`，把四文档地板 + 三硬规则 + 七阶段流水线固化成一条可执行 recipe |

---

## 5. SOP 标准化（2026-09-01）

| 我 | 你 |
|---|---|
| 要求把 SOP 落成文件，并用 subagent 同时审计 `4`–`14` 每个游戏 | 写入 `.claude/docs/GAME-STUDIO-SOP.md`，派 11 个并行 subagent 逐游戏审计四文档地板 |
| 要求每个游戏有一份可核对的 conform 状态 | 每个游戏产出 `SOP-CONFORMANCE.md`：底线状态 + 当前阶段 + 剩余差距 |

**审计结果（`4`–`14`）**：

| 游戏 | 审计前地板 | 处理 |
|---|---|---|
| `4_chunbai` | ✗ 四文档全缺 | 由代码反推补齐 AGENTS/GDD/TDD/JOURNEY |
| `5_gamejam_1` | △ 有 TDD + boss 设计稿 | 补 AGENTS/GDD/JOURNEY |
| `6`/`7`/`8`/`9`/`10`/`11`/`13`/`14` | ✓ 地板完备 | 仅审计 + 产出 conform 记录 |
| `12_ddgi` | △ 缺 GDD/TDD | 补 GDD/TDD |
| `7_hotlineShanghai` | ✓ + 自己的 GAME-SOP | 参考实现，零差距 |

**发现并已修复的两处真实差距（2026-09-01）**：

1. ✅ `14_neuraltexture` 引用了不存在的 `references/neural-shading/research.md`（SOP §1 规则三「引用必须解析」）→ 已改指向既有的 `从-PBR-贴图到潜变量-plus-MLP：拆解-SIGGRAPH-2026.md`。
2. ✅ `5_gamejam_1` 两套并行实现（主目录 v1 0.1.0 shipped + `v2/` 2.0.0 重写）→ 已定：v2 为活跃主线，v1 为 shipped 遗留构建；契约迁移仍为后续项。

---

## 6. 下一步

- 让 `4_chunbai`/`5_gamejam_1`/`12_ddgi` 走 `/adopt` 生成 epics/stories，正式纳入生产流程。
- 完成 `5_gamejam_1` v2 的契约迁移（TDD 从 v1 迁移到 v2 冻结）。
- 考虑把 SOP 的「四文档地板」检查做成 CI 门（`gate-check` 的仓库级版本）。
