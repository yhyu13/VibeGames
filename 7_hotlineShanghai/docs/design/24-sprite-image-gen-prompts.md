# 24 — Sprite Image Generation Prompts

> 用途:为 intro scene 生成运行时 PNG sprite sheet。本文件是**权威标准**;代码与 manifest
> (`src/engine/sprites/intro-manifest.ts`) 以实际管线为准。生成结果必须经过人工像素修整后
> 才能接入游戏(§9 验收门)。
> 修订快照:2026-08-10。**本版将旧 48×48 契约更正为管线实际的 64×64 输出单元**(见 §1)。

## 0. 管线对齐(重要更正)

旧的 48×48 帧契约来自早期管线,已过时。当前 `scripts/process-intro-sprites.mjs` + 运行时
manifest 使用以下真实数字,生成与验收**一律以本节为准**:

- 源 sheet:**1024×1024**,RGBA PNG,透明背景,sRGB。
- 角色源槽位 **128×128**,裁切归一化后输出单元 **64×64**,锚点(脚底中心)**`(32,54)`**。
- 玩家源网格 **8 列 × 7 行**,输出 **8 列 × 8 行**。
- 巡逻兵源网格 **6 列 × 8 行**(行方向沿用 §4 实测重排)。
- 装饰 prop:64×64 单元,锚点 `(32,32)`,角色 `tile`(§7)。
- 渲染:nearest-neighbor,只用整数倍缩放,禁止运行时平滑。

## 1. 冻结资产合同

- 格式:RGBA PNG,透明背景,sRGB。
- 角色方向顺序:`N / NE / E / SE / S / SW / W / NW`(见 §4 源行映射)。
- 玩家每方向:`idle ×1 / walk ×4 / knife_attack ×3`,共 64 帧。
- 巡逻兵每方向:`idle ×1 / walk ×4 / alert ×1`,共 48 帧。
- 角色锚点:脚底中心 `(32,54)`;所有帧位置一致(源 128 槽内脚底位于同一 y)。
- 描边:1px 深色内描边 + 1px 阵营外描边。玩家外描边**冷青**,敌人外描边**暖橙**。
- 油灯:3 态 strip,`intact / damaged / broken`。
- 环境 tile / 装饰 prop:64×64 单元。
- 首批范围:玩家、`flashlight_patrol`、油灯、红砖墙、石库门、深色地面、晾衣杆、火花、玻璃。
- 追加范围(2026-08-10):`exit` 出口门、`sandbag` 沙袋、`neon_sign` 霓虹招牌(§7)。
- 本批不修改 P5 玩法逻辑。

## 2. 通用风格前缀

每条生成 prompt 前置以下文本:

```text
Production-ready pixel-art sprite for a top-down 2D action game set in 1937 Shanghai. Visual direction: Hotline Miami energy filtered through restrained Republican-era Shanghai vaporwave. Match the supplied reference image's costume language, silhouette, palette, and atmosphere, but output a clean isolated runtime sprite rather than concept art. Crisp hard-edged pixel clusters, deliberate hand-placed pixel appearance, three-value material ramps, strong silhouette at actual size, transparent background, no antialiasing, no blur, no bloom, no soft glow, no cast shadow, no environment, no text, no UI, no watermark.
```

## 3. 通用负面提示词

```text
concept art, illustration, painterly, photorealistic, 3D render, isometric, side view, front portrait, smooth vector art, anti-aliased edges, subpixel detail, blurry pixels, soft brush, gradient background, glow halo, bloom, lens flare, cast shadow, floor plane, scenery, frame, border, labels, typography, UI, watermark, multiple unrelated characters, cropped body, inconsistent scale, inconsistent anchor, extra limbs, malformed hands, oversized head, chibi proportions
```

## 4. 角色源行映射(实测)

生成图"有八行"不代表八行方向一致。运行时按**源图实际朝向**重排,禁止按假设顺序贴标签
(`25-intro-scene-lessons.md §4`)。以下为 `process-intro-sprites.mjs` 中登记的真实行号;
重新生成后若实际朝向不同,**必须同步更新本映射并重跑管线**:

```text
player: { N:0, NE:6, E:2, SE:1, S:3, SW:1, W:2, NW:6 }   # SW/W 取 SE/E 水平镜像
patrol: { N:4, NE:5, E:2, SE:1, S:0, SW:1, W:2, NW:5 }   # SW/W 取 SE/E 水平镜像
镜像朝向集合:{ NE, SW, W }
```

## 5. 完整玩家 Sheet Prompt(重绘 R1)

**输入参考**:
- `references/sprite-gen-v2-archive/sprite-gen-vaporwave/01-player-knife.png`
- `references/sprite-gen-v2-archive/sprite-gen-vaporwave/02-player-pistol.png`
- `references/sprite-gen-v2-archive/sprite-gen-vaporwave/07-lilong-lantern-player.png`

> 重绘目标(审计发现):恢复**猩红灯笼红围巾**(鲜明红,禁止偏橙/锈色);削减画面中的暖橙;
> 加粗/加密冷青阵营描边使其≥敌人描边密度;让 `attack1`(挥砍伸刀)帧与 idle/walk 同密度。

```text
[COMMON STYLE PREFIX]

Create one coherent top-down sprite sheet for the same underground resistance agent in every frame. Preserve exact costume, proportions, palette, outline, and foot anchor across the entire sheet: fedora, ivory face wrap, dark trench coat, scarlet lantern-red scarf (vivid red, never orange or rust), knife, thin cold-cyan faction outline around the whole silhouette. Minimize warm-orange/rust tones so the player never reads as the orange-outlined enemy.

Directions are rows in this exact order: N, NE, E, SE, S, SW, W, NW.
Frames are columns in this exact order: idle 1; walk 1; walk 2; walk 3; walk 4; knife attack wind-up; knife attack strike; knife attack recover.
The result contains 8 rows x 8 columns of 64x64 frames, total 512x512 pixels. Each character occupies roughly the central 60% of the 64x64 cell; feet stay anchored at local cell coordinate (32,54). Walk cycle has clear alternating footwork and scarf motion. Attack cycle has readable anticipation, a FULL-DENSITY knife-extension strike frame (same body scale and pixel density as idle/walk, not sparse), and recovery without changing body scale.

Transparent background. No gutters between cells. No labels or grid lines.

[COMMON NEGATIVE PROMPT]
```

输出源:`references/sprite-samples/player-knife-sheet.png`(1024×1024,128 槽)。

## 6. 完整巡逻兵 Sheet Prompt(重绘 R2)

**输入参考**:
- `references/sprite-gen-v2-archive/sprite-gen-vaporwave/03-soldier.png`
- `references/sprite-gen-v2-archive/sprite-gen-vaporwave/07-lilong-lantern-player.png`

> 重绘目标(审计发现):底色从近黑/蓝青改为可读的**军绿**明暗 ramp,中间调提亮使其在深色地面
> 上清晰可辨;保留暖橙阵营描边。

```text
[COMMON STYLE PREFIX]

Create one coherent top-down sprite sheet for the same flashlight patrol soldier in every frame. Preserve exact uniform, helmet, body proportions, flashlight size, and foot anchor across the entire sheet. Uniform base is military green with a readable dark/light value ramp (not near-black and not teal-blue); mid tones bright enough to read against near-black ground. Thin warm-orange faction outline around the whole silhouette. The flashlight stays attached to the same hand and points with the body direction; do NOT render a light cone.

Directions are rows in this exact order: N, NE, E, SE, S, SW, W, NW.
Frames are columns in this exact order: idle; walk 1; walk 2; walk 3; walk 4; alert.
The result contains 8 rows x 6 columns of 64x64 frames, total 384x512 pixels. Each character occupies roughly the central 60% of the 64x64 cell; feet stay anchored at local cell coordinate (32,54). Walk cycle has clear alternating footwork. Alert frame raises the flashlight and stiffens the silhouette without changing body scale.

Transparent background. No gutters between cells. No labels or grid lines.

[COMMON NEGATIVE PROMPT]
```

输出源:`references/sprite-samples/flashlight-patrol-sheet.png`(1024×1024,128 槽)。

## 7. 装饰 Prop Prompts(新增 A1-A3)

> 全部为单帧,64×64 单元,锚点 `(32,32)`,管线角色 `tile`。接入后 `SceneManager` 会优先用
> sprite、缺图时回退到手绘几何(当前即回退态)。

### 7.1 出口门(exit)

```text
[COMMON STYLE PREFIX]

One top-down doorway prop: a dark carved wooden double door set into an aged red-brick frame with a narrow stone lintel, and a small green lantern/glow accent as the exit goal anchor. Readable from a top-down game camera. Single 64x64 cell, transparent background, hard pixel edges, no people, no street scene.

[COMMON NEGATIVE PROMPT]
```

### 7.2 沙袋(sandbag)

```text
[COMMON STYLE PREFIX]

One top-down stack of sandbags: two layered rows of bulging tan/khaki sandbags with dark stitch seams and worn patches, crisp hard-edged pixel clusters, strong silhouette at actual size. Single 64x64 cell, transparent background.

[COMMON NEGATIVE PROMPT]
```

### 7.3 霓虹招牌(neon_sign)

```text
[COMMON STYLE PREFIX]

One small top-down 1930s Shanghai shop sign: thin glowing neon-tube letters (Chinese characters are fine, rendered as abstract readable tube shapes, no legible legalese) in cyan and lantern-red tubes, mounted on a dark iron bracket. Subtle glow suggested by bright tube cores, not a bloom halo. Single 64x64 cell, transparent background.

[COMMON NEGATIVE PROMPT]
```

## 8. 环境 Tile / 特效 Prompts

原 §7 环境 tile 与 §8 拆灯特效 prompt 保持不变(方向、比例未受影响):

- 红砖墙 `red-brick-wall-tile.png`(48→64 输出尺寸,内容同)。
- 石库门 `shikumen-doorway-tile.png`。
- 深色弄堂地面 `dark-lane-ground-tile.png`。
- 晾衣杆/电线 `laundry-wire-overlay.png`。
- 火花 `spark-burst-sheet.png`、玻璃碎片 `glass-shard-burst-sheet.png`。

## 9. 人工验收门

每张生成图必须同时通过:

1. 文件尺寸与合同完全一致(源 1024² / 输出 64²)。
2. alpha 背景干净,边缘没有白边或半透明脏像素。
3. 角色脚底锚点逐帧误差 ≤1 px。
4. 角色比例、服装和配色逐帧一致,没有生成漂移。
5. 玩家红围巾与冷青描边在 1× 预览中可见(红围巾为鲜明红,不是橙/锈)。
6. 巡逻兵手电与暖橙描边在 1× 预览中可见;军绿底在深色地面上可辨。
7. walk 循环首尾连续;attack/alert 不改变角色整体尺寸;`attack1` 伸刀帧与 idle/walk 同密度。
8. nearest-neighbor 放大 4× 后没有抗锯齿、模糊或非预期渐变。
9. 实机暗背景中玩家与敌人可在 0.5s 内区分。
10. 未通过项必须人工修图;禁止仅凭生成模型首稿直接接入。

## 10. 接入管线(激活新资产)

新增/重绘源 PNG 就位后,按以下步骤激活(**不要在源文件缺失时先行改 manifest**,否则
`process-intro-sprites.mjs --check` 会因缺 required source 而失败并拖垮 `intro-polish:check`):

1. 将源 PNG 放入 `references/sprite-samples/`。
2. 在 `references/sprite-samples/approved-intro-assets.json` 登记条目(含 `source`、真实
   `sha256`、`role`、`layout`、`output`)。新增 prop 示例:

   ```json
   { "id": "exit", "source": "exit-doorway-tile.png", "sha256": "<computed>", "role": "tile", "layout": { "xBands": [[0,1024]], "yBands": [[0,1024]] }, "output": { "file": "exit.png", "columns": 1, "rows": 1, "cell": 64 }, "required": true },
   { "id": "sandbag", "source": "sandbag-tile.png", "sha256": "<computed>", "role": "tile", "layout": { "xBands": [[0,1024]], "yBands": [[0,1024]] }, "output": { "file": "sandbag.png", "columns": 1, "rows": 1, "cell": 64 }, "required": true },
   { "id": "neon_sign", "source": "neon-sign-tile.png", "sha256": "<computed>", "role": "tile", "layout": { "xBands": [[0,1024]], "yBands": [[0,1024]] }, "output": { "file": "neon-sign.png", "columns": 1, "rows": 1, "cell": 64 }, "required": false }
   ```

   sha256 可用 `node -e "console.log(require('crypto').createHash('sha256').update(require('fs').readFileSync('references/sprite-samples/<file>.png')).digest('hex'))"` 计算。

3. 运行 `npm run sprites:process` 重新生成 `public/sprites/intro/*` 与
   `src/engine/sprites/intro-manifest.ts`。
4. 运行 `npm run intro-polish:check`(会执行资产 --check、typecheck、build、light-break、combat-loop)。
5. 重绘 R1/R2 时,同法更新对应 `player-knife-sheet.png` / `flashlight-patrol-sheet.png` 的 sha256 后重跑。

## 11. 生成顺序

1. 先人工验收 §5-§6 重绘的玩家/巡逻兵。
2. 再生成 §7 三个装饰 prop。
3. 最后跑 §10 接入管线并做浏览器合成验证。

当前状态:代码侧已支持 §7 三个 prop 的 sprite-first 渲染(缺图回退手绘);等待人工/图像工具
按 §5-§7 prompt 生成并修整源 PNG 后按 §10 激活。
