# 24 — Sprite Image Generation Prompts

> 用途:为 intro scene 生成首批运行时 PNG sprite sheet。视觉参考只来自
> `references/sprite-gen-v2-archive/sprite-gen-vaporwave/`。生成结果必须经过人工像素修整后才能接入游戏。

## 1. 冻结资产合同

- 格式:RGBA PNG,透明背景,sRGB。
- 角色帧:48×48 px。
- 角色方向顺序:`N / NE / E / SE / S / SW / W / NW`。
- 玩家每方向:`idle ×1 / walk ×4 / knife_attack ×3`,共 64 帧。
- 巡逻兵每方向:`idle ×1 / walk ×4 / alert ×1`,共 48 帧。
- 角色锚点:脚底中心 `(24,40)`;所有帧位置一致。
- 描边:1px 深色内描边 + 1px 阵营外描边。玩家外描边冷青,敌人外描边暖橙。
- 油灯:每帧 24×32 px,`intact / damaged / broken` 三态。
- 环境 tile:48×48 px。
- 渲染:nearest-neighbor,只用整数倍缩放,禁止运行时平滑。
- 首批范围:玩家、`flashlight_patrol`、油灯、红砖墙、石库门、深色地面、晾衣杆/电线、拆灯火花与玻璃碎片。
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

## 4. 小样 Prompts

### 4.1 玩家持刀小样 — SE

**输入参考**:`references/sprite-gen-v2-archive/sprite-gen-vaporwave/01-player-knife.png`

```text
[COMMON STYLE PREFIX]

ONE character only: a 1937 Shanghai underground resistance agent, top-down three-quarter view facing southeast, holding a knife. Fedora, dark trench coat, ivory face wrap, and a vivid lantern-red scarf as the key recognition anchor. Restrained palette: ink black, steel gray, ivory, rust red, plus a thin cold-cyan player faction outline. Strong readable knife silhouette and forward combat posture.

Canvas is exactly 48×48 pixels. Keep the full character inside the frame. Place the feet at anchor pixel (24,40). Transparent background. This is one isolated SE-facing idle-ready combat sprite, not a sprite sheet and not concept art.

[COMMON NEGATIVE PROMPT]
```

输出:`references/sprite-samples/player-48-se.png`

### 4.2 巡逻兵小样 — SW

**输入参考**:`references/sprite-gen-v2-archive/sprite-gen-vaporwave/03-soldier.png`

```text
[COMMON STYLE PREFIX]

ONE enemy only: a 1937 Shanghai flashlight patrol soldier, top-down three-quarter view facing southwest. Military-green uniform with dark and light ramps, steel helmet, compact handheld flashlight clearly visible, and a small muted-red armband accent. Use a thin warm-orange enemy faction outline. Historically grounded silhouette with aggressive Hotline-style readability. Do not render the flashlight cone; only render the flashlight prop.

Canvas is exactly 48×48 pixels. Keep the full character inside the frame. Place the feet at anchor pixel (24,40). Transparent background. This is one isolated SW-facing patrol sprite, not a sprite sheet and not concept art.

[COMMON NEGATIVE PROMPT]
```

输出:`references/sprite-samples/patrol-48-sw.png`

### 4.3 油灯三态小样

**输入参考**:`references/sprite-gen-v2-archive/sprite-gen-vaporwave/05-furniture-neon.png`

```text
[COMMON STYLE PREFIX]

A compact production pixel-art sprite strip for one 1930s Shanghai wall-mounted oil lantern. Exactly THREE states arranged left to right: intact with steady flame; damaged with cracked glass, bent frame, and weak flame; fully broken and extinguished with blackened bent frame and missing glass. Maintain exactly the same anchor, scale, and silhouette across all three states. Palette: black iron, dark rust, warm amber glass, lantern-orange flame, soot.

Each state occupies exactly 24×32 pixels. Put exactly 2 transparent pixels between frames. Total strip size is 76×32 pixels. Transparent background. No glow halo and no wall behind the lantern.

[COMMON NEGATIVE PROMPT]
```

输出:`references/sprite-samples/oil-lamp-3state.png`

## 5. 完整玩家 Sheet Prompt

**输入参考**:
- `references/sprite-gen-v2-archive/sprite-gen-vaporwave/01-player-knife.png`
- `references/sprite-gen-v2-archive/sprite-gen-vaporwave/02-player-pistol.png`
- `references/sprite-gen-v2-archive/sprite-gen-vaporwave/07-lilong-lantern-player.png`

```text
[COMMON STYLE PREFIX]

Create one coherent 48×48-frame sprite sheet for the same underground resistance agent in every frame. Preserve exact costume, proportions, palette, outline, and foot anchor across the entire sheet: fedora, ivory face wrap, dark trench coat, lantern-red scarf, knife, cold-cyan faction outline.

Directions are rows in this exact order: N, NE, E, SE, S, SW, W, NW.
Frames are columns in this exact order: idle 1; walk 1; walk 2; walk 3; walk 4; knife attack wind-up; knife attack strike; knife attack recover.
The result contains 8 rows × 8 columns = 64 frames. Every cell is exactly 48×48 pixels. Total image size is exactly 384×384 pixels. Feet remain anchored at local cell coordinate (24,40). Walk cycle has clear alternating footwork and scarf motion. Attack cycle has readable anticipation, full knife extension, and recovery without changing body scale.

Transparent background. No gutters between cells. No labels or grid lines.

[COMMON NEGATIVE PROMPT]
```

输出:`public/sprites/player-knife-48.png`

## 6. 完整巡逻兵 Sheet Prompt

**输入参考**:
- `references/sprite-gen-v2-archive/sprite-gen-vaporwave/03-soldier.png`
- `references/sprite-gen-v2-archive/sprite-gen-vaporwave/07-lilong-lantern-player.png`

```text
[COMMON STYLE PREFIX]

Create one coherent 48×48-frame sprite sheet for the same flashlight patrol soldier in every frame. Preserve exact uniform, helmet, body proportions, flashlight size, palette, warm-orange faction outline, and foot anchor across the entire sheet. The flashlight must remain attached to the same hand and point with the body direction. Do not render a light cone.

Directions are rows in this exact order: N, NE, E, SE, S, SW, W, NW.
Frames are columns in this exact order: idle; walk 1; walk 2; walk 3; walk 4; alert.
The result contains 8 rows × 6 columns = 48 frames. Every cell is exactly 48×48 pixels. Total image size is exactly 288×384 pixels. Feet remain anchored at local cell coordinate (24,40). Walk cycle has clear alternating footwork. Alert frame raises the flashlight and stiffens the silhouette without changing body scale.

Transparent background. No gutters between cells. No labels or grid lines.

[COMMON NEGATIVE PROMPT]
```

输出:`public/sprites/flashlight-patrol-48.png`

## 7. 环境 Tile Prompts

### 7.1 红砖墙

```text
[COMMON STYLE PREFIX]

One seamless top-down 48×48 pixel red-brick wall tile for a 1937 Shanghai lilong. Dark rust mortar, irregular hand-laid brick sizes, chipped corners, soot and age, three-value brick ramp, strong pixel clusters. Tile seamlessly on all four edges. No perspective facade, no objects, no lighting gradient.

[COMMON NEGATIVE PROMPT]
```

### 7.2 石库门

```text
[COMMON STYLE PREFIX]

One top-down 48×48 pixel Shikumen doorway tile: dark carved wooden double door set into aged red brick and a narrow gray stone frame, brass latch as a tiny warm anchor, readable from a top-down game camera. Match the red-brick tile edges. Transparent pixels are not required; fill the tile. No perspective street scene.

[COMMON NEGATIVE PROMPT]
```

### 7.3 深色弄堂地面

```text
[COMMON STYLE PREFIX]

One seamless top-down 48×48 pixel lilong ground tile: nearly black worn stone slabs, subtle dark burgundy and blue-gray variation, damp stains expressed as hard pixel clusters rather than gradients, sparse cracks, 90 percent dark-value coverage. Tile seamlessly on all four edges.

[COMMON NEGATIVE PROMPT]
```

### 7.4 晾衣杆与电线 Overlay

```text
[COMMON STYLE PREFIX]

A transparent 48×48 pixel environmental overlay containing one diagonal bamboo laundry pole and two thin sagging utility wires seen from above. Dark brown bamboo with one ivory cloth strip and one muted-red cloth strip as small visual anchors. Crisp silhouette, sparse detail, no wall or floor background.

[COMMON NEGATIVE PROMPT]
```

## 8. 拆灯特效 Prompts

### 8.1 火花

```text
[COMMON STYLE PREFIX]

A 4-frame pixel-art spark burst sprite sheet for a broken oil lantern. Each frame is 24×24 pixels, arranged left to right, total 96×24 pixels. Eight sharp amber and ivory sparks expand rapidly and fade to dark rust. Transparent background, fixed center anchor (12,12), no smoke, no glow halo.

[COMMON NEGATIVE PROMPT]
```

### 8.2 玻璃碎片

```text
[COMMON STYLE PREFIX]

A 4-frame pixel-art glass-shard burst sprite sheet for a broken oil lantern. Each frame is 24×24 pixels, arranged left to right, total 96×24 pixels. Six distinct angular amber-glass shards rotate and spread from the fixed center anchor (12,12), then darken. Transparent background, hard pixel edges, no blur and no glow halo.

[COMMON NEGATIVE PROMPT]
```

## 9. 人工验收门

每张生成图必须同时通过:

1. 文件尺寸与合同完全一致。
2. alpha 背景干净,边缘没有白边或半透明脏像素。
3. 角色脚底锚点逐帧误差 ≤1 px。
4. 角色比例、服装和配色逐帧一致,没有生成漂移。
5. 玩家红围巾和冷青描边在 1× 预览中可见。
6. 巡逻兵手电和暖橙描边在 1× 预览中可见。
7. walk 循环首尾连续,attack/alert 不改变角色整体尺寸。
8. nearest-neighbor 放大 4× 后没有抗锯齿、模糊或非预期渐变。
9. 实机暗背景中玩家与敌人可在 0.5s 内区分。
10. 未通过项必须人工修图;禁止仅凭生成模型首稿直接接入。

## 10. 生成顺序

1. 先生成 §4 三个小样。
2. 人工确认人物比例、描边、锚点和油灯三态。
3. 再生成 §5-§6 完整角色 sheets。
4. 修正角色一致性后生成 §7 环境 tiles。
5. 最后生成 §8 特效并进行浏览器合成验证。

当前状态:prompt 已冻结;2026-08-09 已用 `openai/gpt-image-2` 生成首批 raw 图,全部未过 §9 验收门。

- 小样与 raw 归档:`references/sprite-samples/` 与 `references/sprite-samples/raw-gen-2026-08-09/`
- 状态明细:`references/sprite-samples/GENERATION_STATUS.md`
- `public/sprites/` 故意保持为空(禁止未修整首稿直接接入)
- 共性失败:实际输出为高分辨率 RGB 像素风渲染,不是合同尺寸的 RGBA 1× 运行时 sprite
- 下一步:人工像素修整到精确合同尺寸后,再拷入 `public/sprites/`
