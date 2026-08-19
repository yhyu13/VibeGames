# JOURNEY — 12_ddgi（DDGI 动态漫反射全局光照探针系统）

> 一份双栏时间轴，记录「ME」与「YOU」把一份 DDGI 调研文档一路推进到**能跑、能验证、能提交**的独立 WebGPU 工程的过程。
>
> - **ME** = 掌舵的人：定方向、给反馈、拍板取舍、提醒别把别人的活卷进来。
> - **YOU** = 并肩的人：审计、设计、写代码、排障、自测、写文档、提交。
>
> 共同的信条：**CPU/GPU 数值一致** —— 常量只有单一来源（`core/constants.ts`），WGSL 里的每一个数字都要能追溯到它；改核心数学必须同步改 WGSL，无 drift 窗口。

---

## 0. 起源 —— 先 crit 一份调研文档

| ME | YOU |
|---|---|
| 抛来三份 `references/ddgi/` 调研/实施文档，让先 crit | 逐字读 `research.md` / `implementation-plan.md` / `README.md`，并核对仓库实际路径 |
| —— | 给出批评：**1 处事实错误**（`9_3dplatform/src/core/bvh.ts` 根本不存在——那是 TDD 里的冻结契约，不是现有代码）+ **孤儿化问题**（没有任何工程需要 DDGI）+ 3 个被低估的风险（getShapecastFn 是 WGSL 字符串不是一文件适配器 / 无 groupshared 内存意味着热路径重写 / 材质集成要 double bookkeeping）+ 若干小项 |

---

## 1. 文档收敛 —— 修事实错误、加 §10.0 门

| ME | YOU |
|---|---|
| 报告已按批评修好：bvh.ts 事实、§10.0 门、风险、小项；还坦白早前的 chat 摘要重复了同一个 bvh.ts 错误 | 逐条核验修复属实；又揪出两处残留：**标题行仍写「reusing 9_3dplatform WebGPU BVH ray tracer」**（过誉，一屏之隔的 §2 已改）、**§10 标题「resolve before M2」与「门控 M1」自相矛盾**，且里程碑表没把门接上 |
| 「now close the gap based on plan」 | 修掉两处残留：标题改「frozen … contract — design-doc-only」；§10 改名「Gates & open questions」+ M1 验收格前加「Blocked on the §10.0 consumer gate」 |

---

## 2. 立项决策 —— §10.1 落点 + §10.0 消费者

| ME | YOU |
|---|---|
| 「now impl ddgi」 | **没有直接动手**，先问两个结构性问题：§10.1 落点（独立工程 vs 9_3dplatform 内）与 §10.0 消费者门（demo 算不算消费者）——因为落点决定 BVH 基底和项目骨架，猜错就是返工 |
| 拍板：独立 `12_ddgi/` Vite 工程（three r185 + three-mesh-bvh/webgpu）+ **demo 场景即 v1 消费者**，门就此满足 | 按 repo 惯例建独立工程：Vite 6 + TS strict + vitest，端口 5189（5188 已被 11_blackhole 占） |

---

## 3. M1 —— 纯数学 core + 黄金向量单测

| ME | YOU |
|---|---|
| —— | 写 `core/`：octahedral、fibonacci（球面 Fibonacci + Arvo 四元数旋转）、probeGrid（三线性/wrapShading/surface-bias）、chebyshev（σ²/(σ²+v²)+立方+crush+地板）、hysteresis（EMA 双分支方向不对称）、moments（÷2Σcosθ、E[d]/E[d²]）、constants |
| —— | 50 条手算黄金向量测试；**抓出 3 处我自己的期望错误**，其中最有价值的一条：hysteresis 的两个分支是方向排他的——暗变触发 history-drop、亮变触发 impulse clamp——忠实于 RTXGI 原公式，不是对称实现 |
| 要求门禁全绿 | `npx tsc --noEmit` 0 错误；`vitest` 50/50；`npm run build` 绿 |

---

## 4. M2 —— WebGPU trace/blend/border

| ME | YOU |
|---|---|
| —— | 啃 `three-mesh-bvh/webgpu` 0.9.14 源码（BVHComputeData + getShapecastFn + NodeProxy + WGSLTagFnNode），并用官方 `webgpu_gpuPathTracingSimple` example + speedball 源码确认真实调用约定，不猜 API |
| —— | 三个 compute kernel（trace → blend irradiance → blend distance → border）+ 每物体 `emissive` 注入 BVH transform 缓冲（子类扩展 40-float stride）+ 探针 gizmo + atlas 叠层 + `window.__ddgi` 调试钩子 |
| —— | 浏览器排障踩了 **3 个坑**（详见 verification-report）：① three r185 的 wgslFn 解析器不剥 `// fn` 标记（那是 wgslTagFn 的约定）；② 非 struct storage buffer 被包成 `{ value: array<T> }`，WGSL 必须写 `.value[i]`；③ 首帧 impulse clamp 仍生效（冷启动只到 25%，忠实原公式） |
| 要验证漏光测试 | 浏览器 0 GPU 错误；**75 探针 × 256 射线 → 4 探针点亮**（全在卡片视线内），厚墙后全暗（hitFrac=1 但非自发光 → 0 辐射）——厚墙漏光在探针层被证伪 |

---

## 5. 代码评审

| ME | YOU |
|---|---|
| 接受 review 建议 | 4 个并行评审子代理：安全（零发现）/ 逻辑（抓到 phantom-thread 越界）/ 性能（updateTransforms 每帧重算 + 射线每帧全量重传）/ 死代码+重复（7 处） |
| —— | 出评审结论 **NEEDS CHANGES**：1 个真 bug（dispatch 尾线程无 `probeIdx` 护栏，幽灵探针每帧越界读 + 写垃圾 tile）+ 常量 drift（0.97/0.25/0.1/50/1.5 硬编码成 WGSL 字面量，冻结表无人引用） |

---

## 6. 修复与验收

| ME | YOU |
|---|---|
| 你自己动手修完并报告（GateGuard hook 会拦每个文件的第一次编辑，曾短暂留下三个文件半编辑态，你补全了才跑门禁）；还补了我漏掉的 **trace kernel guard**（评审只标了 blend+border，漏了 75×256 恰被 64 整除所以 trace 才没炸）和 **gamma = 1/γ**（0.2 是硬编码的 1/5，是最隐蔽的一处 drift） | 逐条核验：五处 guard 到位、六常量插值进 WGSL、tile 尺寸从 `PROBE_*_INTERIOR_TEXELS + 2` 派生、`probeGrid` 用 `PROBE_MAX_RAY_DISTANCE_FACTOR`、border wrap 偏离留 NOTE（「Resolve before M3」） |
| —— | 重跑门禁：tsc 0 / 50/50 / build 绿；浏览器 0 GPU 错误（75 探针 5 点亮——护栏清掉了幽灵 tile 垃圾，0.05 阈值边界探针归位） |

---

## 7. 清理与提交

| ME | YOU |
|---|---|
| 清理：两个调试日志已删、截图挪进 `12_ddgi/showcase/`；**提醒：`6_patapon3D/` 有一批无关改动，提交别卷进来** | 核对工作树；`git add 12_ddgi references/ddgi` 精确限定路径 → 提交 **`08f927c`（36 文件，5223 行）** |
| —— | 复查确认：提交里**零个** `6_patapon3D` 文件；树变干净是因为并行会话自己交了 **`ffbcb29 feat(restir): M1 reservoir…`**——两条线各自成 commit，没混也没丢 |

---

## 8. 贯穿全程的约定（我们共同的合同）

| ME 定的铁律 | YOU 的执行方式 |
|---|---|
| **CPU/GPU 数值一致** | 常量单一来源于 `core/constants.ts`，WGSL 只做 `${}` 插值；改 core 必同步 WGSL |
| **缓冲访问语法** | three r185 把非 struct storage buffer 包成 `{ value: array<T> }`，一律写 `ddgi_x.value[i]`（含 `bvh_transforms.value[…]`） |
| **`// fn` 标记的归属** | 只属于 `three-mesh-bvh/webgpu` 的 `wgslTagFn`；three 自带 `wgslFn` 的 kernel 字符串必须直接以 `fn compute(` 开头 |
| **门禁四道** | typecheck 0 / vitest 全绿 / build 成功 / 浏览器 0 GPU 错误 + `readProbeSummary()` 可调用 |
| **只读 vs 读写 storage** | probeData/rayDir `.toReadOnly()`；rayData read_write；atlas 用 `rgba16float` read_write（RG16F 非 WGSL 可写格式） |

---

## 9. M3 —— 把 GI 真正照到表面上

| ME | YOU |
|---|---|
| 诚实纠偏：「GI 输入那半是好的，但场景还没被 GI 照亮」——M1+M2 只算出了探针场，没接入任何材质 | 承认之前「GI verified」的说法过誉了；核对代码：`main.ts` 仍是 `DirectionalLight`+`AmbientLight`，atlas 只喂了 debug 叠层，没有 `DdgiMaterialNode` |
| 拍板材质集成方案：**自定义 lambert 节点材质**（albedo × (direct N·L + DDGI indirect)），不碰 three 内部 | 写 `DdgiMaterialNode.ts` 查询 `wgslFn`（research §6）：surface bias → 三线性 8 探针 → wrap → **Chebyshev 拒绝**（σ²/(σ²+v²)+cube+floor，×2 回退 ÷2）→ 八面体双线性采样 → decode（pow(sample, γ·0.5) → 归一 → 平方 → ×2π） |
| —— | 手动双线性用 `textureLoad`（不依赖 sampler 绑定），新增 `ddgi_octEncode`/`ddgi_sampleBilinear` 两个 WGSL 辅助；`main.ts` 换成自定义 lambert，删掉三盏 three 灯 |
| —— | 踩两个坑：WGSL `let` 不可变（结尾 `irr = irr * irr` 要 `var`）；TSL `mul`/`add` 函数重载对 color×vec3 报错（改方法链 `a.mul(b.rgb)` + 查询返回 `Node<'vec3'>`） |
| 要验证「真的照到了」 | tsc 0 / 50/50 / build 绿；浏览器 0 GPU 错误；截图可见卡片附近暖色 GI 渗出、厚墙后仍暗；探针场完好（probe 41 最亮，暖色 emissive 拉低了平均值） |

---

## 10. 尾声 —— bounce 与 border-wrap 在前

| ME | YOU |
|---|---|
| M3 落地，但还没说「开工」bounce | 下一步：trace 反弹项（探针采样探针 → 无限反弹）+ border wrap（opposite-edge）+ M4 relocation/classification；等你的 GO |
| —— | 继续观察 → 找问题 → 改 → 验证 → 再观察 |

> 这段旅程没有「完成」。从一份被 crit 出事实错误的调研文档，到一份能点亮卡片、能证伪厚墙漏光的 WebGPU 探针系统，再到**GI 终于照到墙面上**——每一次你拍板一个落点、纠一次偏、我踩出一个真坑、跑绿一道门，12_ddgi 就离「动态 GI 可交付」近一寸。下一寸，等下一轮。

---

## 11. RenderDoc 调试尝试与代码审计

| ME | YOU |
|---|---|
| 要求「用 `.claude/skills/renderdoc-gpu-debug` 调试 ddgi algo，结果 dump 到 report doc」 | 先跑 `rdc doctor`，确认 RenderDoc 环境基本可用（Python 模块 1.41 / renderdoccmd 1.45，仅 VC++ build tools 缺失） |
| —— | 发现本机没有 Chrome Canary，而 WebGPU RenderDoc 捕获需要 Chrome v144+ 的 D3D12 注入路径；`Google Chrome for Testing 151` 注入成功但始终不注册 API |
| —— | 通过 winget 安装 **Chrome Canary 153.0.8010.0**；调整捕获脚本匹配 GPU startup dialog 标题 `Google Chrome Gpu`；注入仍成功，但 `CreateTargetControl(...).GetAPI()` 仍为空，无 `RegisterAPI`/`NewCapture` 消息 |
| —— | 判定**当前环境无法生成可用 `.rdc`**，转入 Fallback：按 Recipe 7 思路做代码审计 + 运行时 `window.__ddgi.readProbeSummary()` 检查 |
| —— | 运行时：dev server 正常，`WebGPU: OK`，控制台 0 错误；75 探针 × 256 射线数据返回；命中分数偏高但平均辐射低，与 backface 被误计为 hit 的现象吻合 |
| —— | 审计定位 3 个可修 bug：① `DdgiProbeVolume.regenerateRayDirs()` 每 probe 独立随机旋转（破坏空间/时间一致性）；② `DdgiSystem.readProbeSummary()` 把 backface 计入 hitFraction；③ `blendKernels` distance 模式未剔除 backface，污染 Chebyshev moments |
| —— | 审计定位 3 个已知/待确认缺口：④ border 仍是 same-edge clamp（M3 需 opposite-edge wrap）；⑤ distance 归一化 `2·Σw` 对 `cos^50` 权重是否合适待验证；⑥ trace 仅采 emissive，无间接反弹 |
| —— | 生成 `renderdoc-ddgi-debug-report.md`，记录捕获失败根因、运行时数据、6 项发现、修复优先级与解锁 GPU 捕获的后续步骤 |
| 要求更新 JOURNEY.md 并 push | 追加本节并提交 |
