# 28 — Sprite 生成验收与改进方案（实测 + 接入版）

> 目的：按 `24-sprite-image-gen-prompts.md` 的提示词与 §9 验收门，**真实生成** sprite，实测是否
> 符合预期，并把达标的接入管线。
> 快照：2026-09-01（修订：本轮已真实生成 §7 三个 prop 并接入；player/patrol 方向不达标，未接入）。
> 生成通道：`llm-proxy.tapsvc.com` Hermes custom gateway 的 `/images/generations`（OpenAI 兼容），
> 用 `gpt-image-1.5` / `gpt-image-2`。视觉校验：同网关的 `gemini-3.1-flash-image` 多模态模型。
> 可复用工具：`scripts/gen-intro-sprites.py`、`scripts/gen-actors.py`、`scripts/make-sprite-alpha.py`、
> `scripts/ask-vision.py`、`scripts/measure-generated-intro.py`、`scripts/append-props-manifest.py`、
> `scripts/shoot-intro.mjs`。

## 0. 一句话结论

**本轮用 gpt-image-1.5/gpt-image-2 真实生成了 §7 三个 prop（exit / sandbag / neon_sign），
其中 exit、sandbag 一次达标，neon_sign 首版生成出了人物、换 gpt-image-2 重生成后达标。
三个 prop 已按 §10接入管线（12 资产 `--check` 全绿），sandbag 已接通 `SceneManager` sprite-first
渲染并经实机截图确认生效。**
**player / patrol 两个 actor sheet 虽生成成功且配色/质量达标，但「8 方向行」排布不达标
（多行朝向重复，非 8 个不同朝向），故暂未接入，需按 §3.2 的分向生成方案重做。**

## 1. 生成结果 vs 预期（§9 门禁逐项）

### 1.1 §7 三个 prop —— 全部达标并接入

| 资产 | 生成模型 | 首次生成结果 | 是否达标 | 视觉要点（gemini 确认） |
|---|---|---|---|---|
| exit 出口门 | gpt-image-1.5 | 雕花木门 + 红砖框 + 石框 + 绿色方灯笼 | ✅ 达标 | §7.1 契约；干净可读 |
| sandbag 沙袋 | gpt-image-1.5 | 米褐色沙袋堆叠 + 深棕描边 | ✅ 达标 | §7.2 契约；多袋堆叠 |
| neon_sign 霓虹 | gpt-image-1.5 → **gpt-image-2** | 初版：**旁站一个黑帮人物 + 霓虹**❌ → 重生成：仅霓虹招牌（青红管字"新新百貨"）✅ | ✅ 达标（v2） | §7.3 契约；**首版违反 no people** |

- **neon_sign 首版失败原因**：负面提示词里的 `no people` 对 gpt-image-1.5 拦截失效，模型补了角色的语境角色。
  换 `gpt-image-2` + 提示词显式强调「single isolated object, absolutely no person」后成功。
- 三个 prop 生成背景为近白/棋盘格（gpt-image-2 更懂 transparent），经
  `scripts/make-sprite-alpha.py` 确定性透明化（色差法，背景 250 灰白 → alpha 0），半透明脏像素 0。
- **已接入**：`approved-intro-assets.json` 追加三条（role=tile，64px，pivot(32,32)），
  `npm run sprites:process` 输出 `public/sprites/intro/{exit,sandbag,neon-sign}.png`，12/12 `--check` 绿。
- **sandbag 已真正渲染**：`SceneManager.drawSandbag` 改为 sprite-first（先 `drawStatic('sandbag')` 失败回退手绘），
  实机截图（`smoke/_intro_shot.png`）gemini 确认沙袋是**精细像素 sprite（含纹理缝线），非扁矩形**，无渲染错误。
- exit / neon_sign 保持手绘（exit 只有 active/封锁两态，封锁态点名的是那盏没灭的灯、不再报剩余守卫数；neon_sign 有脉动亮度 gameplay 语义，
  单帧 sprite 会遮蔽，故不无脑替换）。

### 1.2 player / patrol sheet —— 生成成功但方向不达标（未接入）

用 gpt-image-1.5 生成了完整 sheet，gemini + 连通域实测：

| 门禁 | 玩家 | 巡逻兵 | 证据 |
|---|---|---|---|
| 尺寸 1024² / 8×8 格 | ✅ | ✅（6 列×8 行） | gpt-image-2 版玩家确为 8×8 |
| 服装/配色 | ✅ | ✅ | 帽/风衣/鲜红围巾/刀；军绿 uniform+ramp |
| 红围巾鲜明红非橙 | ✅（red_pink 0.406，orange 0.028） | — | 色相分数 |
| 冷青描边 | ✅ | — | cyan_teal 0.158 |
| 军绿底可辨 | — | ✅ | green + midtone，contrast 3.55× |
| **8 方向行不一致** | ❌ | ❌ | 玩家行1-3 同朝南、行4-6 同朝东、行7-8 重复；巡逻兵行也重复 |
| **背景** | 白实心（gpt-1.5）/ 棋盘格（gpt-2） | 白实心 | 需 removeChecker 处理 |
| **attack1 同密度（§9-7）** | ⚠️ 1.5 版 attack1 0.249 < idle/walk 0.29（-14%） | — | 违反「伸刀帧不稀疏」 |

> **核心不达标点**：方向。扩散模型无法用单条 prompt 精确排「8 行 = 8 个不同朝向」——它只会做
> 2-3 个朝向然后复制。这正是 `25-intro-scene-lessons.md §4`「生成图有八行≠八行方向一致」的复现。
> **因此 player/patrol 未接入**（接入会导致播放器侧向移动时朝向错乱）。

## 2. 改进方案（分层）

### 2.1 方向问题 —— 分向单帧生成再拼接（必须做）

**不要**再用整张 8×8 sheet prompt。改为：**每个朝向单独生成 1 帧**（8 个方向 × 各 action），
再按 §4 的 `sourceRowMap` / 镜像规则拼 sheet。对模型更友好（单图只做 1 个朝向），且能逐向验收朝向正确性。
若某些动作（attack/walk）无法同朝向复用，则**逐方向 × 逐动作**生成后按帧序排入 `xBands`/`yBands`。
生成后必须用 `measure-generated-intro.py` + gemini 逐行核对朝向，命中全部 8 朝向才允许写入 manifest。

### 2.2 提示词修正（命中实测不达标点）

**玩家（§5）attack1 密度**——在「Knife attack cycle」后追加：
```text
The knife-attack strike frame must keep the SAME body and knife pixel density and the same bold 1px
cold-cyan outline weight as the idle and walk frames. The extended knife is a solid, fully-opaque
hand-placed pixel cluster — never a thin, translucent, fading, or lower-detail stroke. Body scale and
foot anchor do not change during the entire attack cycle; only the arm and knife translate.
```

**巡逻兵（§6）军绿可读性**——在「Uniform base is military green…」后追加：
```text
The uniform must read as a clearly visible military-green value ramp against near-black ground. Use a
dominant midtone green (e.g. olive/army green ~#4a5a3a to #6b7a4a) covering the torso, NOT near-black
shadow tones, and NOT teal-blue. Keep the midtone brightness high enough that the silhouette separates
from the dark ground at 1x. Retain the 1px warm-orange faction outline around the whole silhouette.
```

**通用（neon_sign 教训）**：对「must be single isolated object / no people」这类硬约束，用
`gpt-image-2`（对 no-people 拦截更准）比 `gpt-image-1.5` 可靠。建议 actor sheet 也优先用 gpt-image-2。

### 2.3 验收门可执行化（把 §9 变脚本判定）

- 自动化：`scripts/measure-generated-intro.py` 测 g1 尺寸、g2 alpha 干净、g3 foot anchor、
  g5/g6 配色、g9 暗背景对比度 >2×、g7 attack1 密度；`scripts/make-sprite-alpha.py` 做确定性透明化。
- 半自动：g4 比例一致、g7 attack1 同密度（≥ idle/walk ×0.9）——加断言阈值，未过则打回重生成。
- 需人工：**方向语义核验**（gemini 视觉 + 逐向 contact sheet），脚本无法替代（§25-4 教训）。
- 建议把 `measure-generated-intro.py` 固化为 `npm run intro-art:check` gate。

### 2.4 生成后端固证

生成通道就是 Hermes 已配置的 `llm-proxy.tapsvc.com` gateway（`/images/generations`），
可用模型：`gpt-image-1.5`、`gpt-image-2`、`bytedance-seed/seedream-5-pro`（在 /models 可见，
但 /images/generations 端点对 seedream/qwen 报 invalid model，仅 gpt-image-* 真正出图）、
`gemini-3-pro-image`/`gemini-3.1-flash-image`（多模态，可生图/读图）。
**不再需要 ComfyUI 本地堆栈**——纯 API 即可，省掉 8GB 卡带不动 SDXL/Flux 的问题。

## 3. 复核「是否符合预期」：诚实分三项

- **已验证（真实执行）**：§7 三个 prop 真实生成 + 透明化 + 接入管线（12/12 `--check` 绿、build、
  typecheck 通过）；sandbag sprite-first 实机截图确认渲染为精细像素。§9 各门的数值测量。
- **未达标 / 未接入**：player/patrol 方向 8 行非 8 朝向（违反 §9-9 / §25-4），未接入；
  neon_sign 首版出人物（已换模型重生成解决）。
- **风险 / 需你决定**：① player/patrol 是否按 §2.1 分向生成重做（方向正确性只能靠分向 + 人工核验）；
  ② 三个 prop 的 exit/neon 是否需要替换手绘（建议保留手绘以保语义）；③ `combat-loop-check.mjs:56`
  基线失败（playerKilled 0≠1，`master` 上稳定复现，非本轮引入）是否一并修——它不阻 sprite 接入但会让
  `intro-polish:check` 一直红。

## 4. 本轮改动清单（git diff 范围）

- `M references/sprite-samples/approved-intro-assets.json`：追加 exit/sandbag/neon_sign（含真实 sha256）。
- `M src/engine/sprites/intro-manifest.ts`：管线重新生成，含 12 资产。
- `M src/engine/SceneManager.ts`：`drawSandbag` sprite-first（先 `drawStatic` 失败回退手绘）。
- `A public/sprites/intro/{exit,sandbag,neon-sign}.png`：管线 64px 输出。
- `A references/sprite-samples/{exit,sandbag,neon-sign}-tile(-alpha).png`：AI 原始版 + 透明版。
- `A docs/design` 本文；`A scripts/{gen-intro-sprites,gen-actors,make-sprite-alpha,ask-vision,
  measure-generated-intro,accept-intro-sprites,append-props-manifest}.py` + `shoot-intro.mjs`。
- 原 `player-knife-sheet.png`/`flashlight-patrol-sheet.png` 曾被本轮生成覆盖，**已 `git checkout` 恢复 v2 原版**。

## 5. 下一步

**等你就 player/patrol 方向是否按 §2.1 分向重做拍板**。若做：我按 8 方向逐帧生成（gpt-image-2）、
逐向 gemini 核验朝向、拼 sheet 登记接入；若暂不做：本轮 §7 三个 prop 已完整落地（生成+验收+接入+sandbag实机验证），
可作为交付，player/patrol 方向问题列入待办。
