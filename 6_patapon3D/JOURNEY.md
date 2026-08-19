# JOURNEY — 6_patapon3D（Patapong 3D 神圣之鼓）

> 一份双栏时间轴，记录「我」与「你」在把一个 Patapon 精神续作从 Pong 一路改到**全局体素光线追踪**、并最终决定用 **ReSTIR（Route A：WebGL2 Reservoir-lite）** 替换暴力光线追踪的过程中，各自做了什么。
>
> - **我** = 掌舵的人：定方向、给反馈、拍板取舍、立下铁律。
> - **你** = 并肩的人：审计、设计、写代码、自测、写文档、提交。
>
> 共同的信条：**视觉与玩法一体** —— 光线追踪不是炫技，是月夜氛围的本体；改视觉必同步改契约（GDD/TDD/design doc），无 drift 窗口。

---

## 0. 项目起源 —— 从 Pong 到神圣之鼓

| 我 | 你 |
|---|---|
| 立项 `6_patapon3D`，想要一个 Patapon 精神的 3D 复刻 | 搭起 Vite + React 19 + three 独立项目，dev server 5183（strictPort） |
| v0.1 起步（2026-08-07） | 做了个 **Pong clone** —— 方向不对，TDD 记为 `v0.1 Pong clone (abandoned)` |
| 承认 v0.1 走错方向，废弃 | 保留教训：TDD changelog 从 v0.1 一路记到现在，每次大改都有归档行 |

---

## 1. v1.0 —— 4 键 1v1 节奏格斗

| 我 | 你 |
|---|---|
| 换方向：4-key 1v1 rhythm fighter | 实现 W/A/S/D 四键打击、判定窗口、combo/连击、FeverOverlay |
| 要求节奏判定要严格、谱面要合理 | 补 v1.0.1：AI timing gate、chart order、squash/juice 手感、FeverOverlay 视觉 |
| —— | 全部 v1.0/v1.0.1 通过 typecheck + build（2026-08-09） |

---

## 2. v2.0 —— 「Go B」神圣之鼓改写

| 我 | 你 |
|---|---|
| 拍板 **Go B**：丢掉 1v1，做真 Patapon DNA —— 4 拍指令语法 + 军队 vs Boss | 全面重写：timing-only 判定（任何鼓点在拍上即算）、10 指令语法（4 拍解析一条命令）、3 人军队（15 HP）vs Moloch（24 HP）、telegraph/defend/retreat/enrage 回合模型 |
| 要 Fever：combo 8/16/24 慢动作 [0.8/0.7/0.6] | 实现 `fever.ts` + MIRACLE；3 首歌 × 60s 由 `songSeeds` 程序化生成 |
| 要「觉醒仪式」开场：黑暗 → 4 拍觉醒 → Moloch 咆哮 → 菜单 | 实现 intro 觉醒 cinematic（`9e33ebe`）；PBR Patapon 美术（RoomEnvironment + ACES Filmic tone mapping） |
| —— | 移除 `aiRhythm.ts` → `boss.ts`；headless harness 验证：策略性玩法 49s 胜利、无脑 ATTACK 32s 败北、挂机 42s 被压死 —— **策略有意义** |

---

## 3. 崩溃与修复 —— intro-only 恢复门

| 我 | 你 |
|---|---|
| 仓库一度回归成 v0.1 Pong / v2.0 混合态，tsc 与 build 双双不通过 | 审计确认损坏面；不擅自删战斗文件 |
| 拍板：先恢复 **intro-only shell**，战斗暂不接回 | 新建窄运行时 `IntroEngine` + `src/intro/` 独立契约/数据，战斗文件休眠保留（`verification-report §8`）；tsc/build 恢复绿 |
| 要求 intro 在 WebGL 下真能跑 | 浏览器 smoke：intro 渲染、SKIP 到 `RITUAL COMPLETE`、0 console 错误 |

---

## 4. v2.1 —— 全局体素光线追踪 + 战斗复活

| 我 | 你 |
|---|---|
| 拍板：**战斗复活**（`250e165` 是显式 `[TDD-CONTRACT-CHANGE]`） | 恢复 v2 战斗 core（types/constants/data/simulation），`SceneRenderer` 契约 + 双渲染器 |
| 要全局体素光追成为 intro 与 gameplay 的默认渲染器（raster 自动回退） | `VoxelRaycaster`：两级 DDA（4³ 宏格剪枝，等效均匀网格 BVH）+ 5-tap 软阴影 + 3-tap 单反弹 GI + 程序化夜空/远山/ACES；`capability.ts` 探测 WebGL2 + Data3DTexture |
| 要月光水面：前景水池、Fresnel、月光带 | `d3287ff` 前景月光水池（3 层正弦波、单次反射、质量阶梯可降） |
| 性能要稳：降级阶梯 + 回退 | `bc6f8f3` watchdog 质量阶梯 0-6（render scale / 阴影 tap / GI tap / 隔帧上传）+ raster 回退；`3b3ea38` Playwright smoke 脚本 |
| 要求零 console/WebGL 错误 | smoke：intro 与 battle 全流程 ALL PASS，0 console error（`verification-report §9`） |

---

## 5. Patapon 重风格化 —— 用户验收翻车后

| 我 | 你 |
|---|---|
| **验收翻车**：「光追后的战斗场地还像 v1 patapong」（霓虹地板/品红环/霓虹观众/霓虹鼓垫） | 承认：发光系调色板把 Patapon 美学做成了夜店 |
| 拍板：重风格化为自然战场 + 木制战鼓 | `7afee59`：草地/泥土双层地面、背景树（与 intro 同一视觉语言）、霓虹鼓垫 → 木身兽皮战鼓；删除 `?demo` 纯 patapong 展示台 |
| —— | smoke 重跑 ALL PASS；新增证据截图 `smoke/battle-song.png`（`verification-report §9.1`） |

---

## 6. 定稿 —— intro-only 光追展示（当前基线）

| 我 | 你 |
|---|---|
| 最终拍板：**intro-only 为 approved build**（战斗休眠），`main.tsx -> IntroEngine` | `73f7f6d` 移除战斗运行时；觉醒 cinematic 走 raytrace 默认 / raster 回退；AGENTS.md 锁定 v2.0 intro-only |
| —— | TDD v2.1 记录全历程；光追渲染器成为 intro 默认视觉路径（月夜 + 水面 + 质量阶梯） |

---

## 7. 今天 —— ReSTIR 调研与路线决策（2026-08-18）

| 我 | 你 |
|---|---|
| 要求调研：6 的「暴力光线追踪」能否换成 ReSTIR，并以 `D:\GitRepo-My\RTXDI-Library`（CMakeLists.txt）为参照 | 产出 `RESTIR.md` 调研分析：现状 = 每像素 ~10 条 DDA 光线、零跨帧复用；ReSTIR = Reservoir 时空重采样（初始采样 → 时间 → 空间 → 着色，无偏）；给出三档闭合路径 |
| 指出关键事实：当前 intro-only、WebGL2 无 compute | 核对：A 路线（WebGL2 Reservoir-lite，ping-pong FBO，先例 `7_hotlineShanghai/rc-lab`）在冻结栈内可行；B 路线（完整 ReSTIR PT / Hybrid Shift）需 WebGPU + three r185，违背 three 0.170 冻结栈 |
| **拍板：走 A 路线（WebGL2 Reservoir-lite）**，并把选择写入本 JOURNEY.md | 更新 `docs/design/2026-08-10-global-voxel-raytrace-water-design.md` 采样契约（禁逐像素抖动 → 双模：确定性基线 / ReSTIR 随机初始采样 + 时间收敛去噪）；`RESTIR.md` 待确认项标记已决 |

**A 路线承诺**：GI 3-tap → 1 条随机次级光线 + Reservoir 时间复用；阴影 5-tap → 1-tap + 复用；有效采样数逐帧累积（M），光线数每像素从 ~10 降到 ~3。按 `RESTIR.md` 里程碑 M1（core/reservoir.ts 纯函数 + 运动矢量）→ M2（3-pass 拆分 + 时间重采样）→ M3（空间重采样）→ M4（质量阶梯/回退）→ RC（验证 + 文档同步）推进。

---

## 8. M1 + M2 落地 —— ReSTIR 从纸面到着色器（2026-08-18）

| 我 | 你 |
|---|---|
| GO M1：先做纯函数 + 运动矢量，验收要 tsc + golden 向量 + smoke 不回归 | `core/reservoir.ts`：Reservoir 6 字段 + combineCandidate/combineReservoirs/finalizeReservoir/luminance/packNormal/packAgeM（忠实移植 RTXDI GI/Reservoir.hlsli + TypePacking.hlsli）；`checks/check-reservoir.ts` 31 项 golden 向量；`SceneContract.CameraState` 加 `motionVector`，`IntroEngine`/`RaytraceAdapter`/`VoxelRaycaster` 接零矢量 |
| GO M2：Pass 拆分 + 时间重采样 | `VoxelRaycaster` 单 pass 直出 → 3 附件 MRT（color + GI reservoir + surface）ping-pong + blit pass；GI 3-tap 确定性 → 1 随机余弦次级光线 + Reservoir 时间重采样（`MakeGIReservoir`/`CombineGIReservoirs`/`FinalizeGIResampling` 逐式对照 RTXDI）；阴影 5-tap → 1-tap 随机太阳盘 + 时间 EMA 复用 |
| —— | 表面校验（oct 法线 + 深度 + M>0）拒绝 disocclusion；M clamp=20 替代 age 上限；水面/天空像素写 M=0 历史 |
| —— | 三门复跑：tsc 0 error、harness（含 check-reservoir 31 PASS）绿、build 绿、smoke ALL PASS 零 console 错误、全流程到预期态 |

**性能真相（诚实的翻车）**：M2 在 SwiftShader 软件光栅化下帧时**回归**——intro 1280×720 从 177ms → **405ms**。根因不是 bug：ReSTIR 优化的是**光线数**（~10 → ~3 条 DDA），真 GPU 上才是实打实的算力节省；而 SwiftShader 带宽主导，M2 的 3×RGBA16F MRT + blit + 3 次历史采样把带宽成本抬到了光线收益之上。M1 里程碑里「SwiftShader 帧时下降 ≥2×」的验收是我**当初的错误假设**（把软件光栅化的带宽瓶颈当成了真 GPU 的光线数瓶颈），已在 `RESTIR.md` 更正。

**待拍板**：① 接受「真 GPU 优化、SwiftShader 回归」（验收改真 GPU 帧时）；② Checkerboard 半分辨率历史（带宽减半）；③ LogLuv 打包降 RGBA8。三者互不阻塞，M3 空间重采样可先行。

---

## 9. RenderDoc GPU 调试 —— 用 frame debugger 实锤 ReSTIR 毒化与修复（2026-08-20）

| 我 | 你 |
|---|---|
| 要求：用 `.claude/skills/renderdoc-gpu-debug` 调试 `9_3dplatform` 的 ReSTIR，并 dump 报告 | 审计发现 `9_3dplatform/` 仍只有设计文档，全仓库唯一 ReSTIR 实现在 `6_patapon3D/src/engine/raytrace/VoxelRaycaster.ts`；路径更正后在该项目执行 |
| 要 GPU 级证据，不要只看 console | `rdc capture` 注入 Chromium（Playwright 1234）D3D11 后端，捕获 `restir_frame600.rdc`；`rdc script` 扫描全部 `R16G16B16A16_FLOAT` 历史/MRT 纹理 |
| 接受真 GPU 调试结果 | **首次捕获实锤**：279 个非有限 texel（152 个 `+Inf` weight + 127 个 `-Inf` radiance/NaN）；`rdc debug pixel` 逐指令定位根因为 DDA 退化轴产生垃圾负 `t` → 雾项溢出 `-Inf` → 时间反馈自锁毒化；另发现 GI 估计器缺少 cosθ 项导致 1/cosθ 放大 |
| 要求修复并复测 | 落地 F0a/F0b/F0d/F1 护栏：退化轴 `tMax=+Inf`、命中检查 `t>=0`、候选 radiance `clamp(0,10)`、历史读写侧 clamp / 写侧 `finalW` 上限 6e4 |
| 复测必须再次 GPU 捕获 | 今日新捕获 `restir_verify_20260820_frame300.rdc`：全部 6 张 `R16G16B16A16_FLOAT` 纹理 **0 非有限 texel**；原毒化像素 (25,326) reservoir 已变为有限小量；抽查 surface M=20，收敛健康 |
| 报告要入库并推送 | 产出 `docs/renderdoc-restir-debug-report.md`（诊断）+ `docs/renderdoc-restir-fix-verification-report.md` + 配图目录；后者已 commit `974c198` 并 push 到 `origin/master` |

**关键认知更新**：ReSTIR 的 temporal 反馈是自锁双刃剑——一旦历史 reservoir 出现 ±Inf/NaN，没有护栏就会永久毒化；frame debugger 是发现这种跨帧传播的最可靠手段，console log 无法看到上一帧历史纹理里的值。

---

## 10. 贯穿全程的约定（我们共同的合同）

| 我定的铁律 | 你的执行方式 |
|---|---|
| **改视觉必同步契约** | 每次改渲染/视觉，GDD/TDD/design doc 同步进同一批改动，无 drift 窗口 |
| **契约冻结即守约** | TDD §4/§5 签名/数值冻结；改动走 changelog + 显式 `[TDD-CONTRACT-CHANGE]` commit（`250e165` 是范例） |
| **质量阶梯与回退优先** | raytrace 永远是默认 + raster 兜底；watchdog 阶梯 0-6；游戏状态在渲染器切换时不得重置 |
| **零新增依赖 / 零运行时资源** | three 0.170 锁定；程序化美术 + Web Audio 配方 |
| **确定性 vs 随机性按契约** | 2026-08-18 起：确定性（基线）与 Reservoir 随机初始采样（ReSTIR 模式）双轨并存，静态颗粒由时间收敛消除而非禁抖 |

---

## 11. 尾声 —— 旅程还在继续

| 我 | 你 |
|---|---|
| M1/M2 已 GO 并落地；性能方向（真 GPU 验收 / Checkerboard / LogLuv）待拍板 | 下一步：M3 空间重采样（4–8 邻居 Reservoir 合并）可先行；性能方向定后收尾 M4/RC |
| —— | 继续观察 → 找问题 → 改 → 验证 → 再观察 |

> 这段旅程没有「完成」。从 Pong 被否、1v1 被改写、仓库崩溃被救回、光追被验收翻车又重风格化，到 ReSTIR 从调研、纯函数、运动矢量一路落进着色器——每一次你踩出一个真问题、跑绿一道门、同步一份契约，6 就离「视觉与玩法一体」近一寸。下一寸，等下一轮。
