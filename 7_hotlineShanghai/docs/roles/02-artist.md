# 角色需求 — 美术（Artist）

> 蒸馏自本项目实际教训：B11（viewport 假设错导致 void）、B21（调色板双源打架）、B24/B65（光过曝吃掉 sprite）。美术在本项目不是画得爽，是**在 RC 光照约束下保持像素可读**。

## 使命一句话

让一张新截图放进截图墙认得出是同一款游戏：16×16 像素 + 8 方向 + 唯一调色板 + RC 光下的可读性（`GAME-SOP.md` §4 视觉标准）。

## 必读

1. [`GAME-SOP.md`](../../GAME-SOP.md) §4（视觉标准）
2. `docs/design/02-art-direction.md`（调色板 / 像素 / 敏感度）
3. `docs/design/05-character-design.md`（8 方向 / 16×16 规格）
4. `docs/design/26-rc-sprite-visual-standard.md`（RC × sprite 视觉标准）
5. `docs/design/25-intro-scene-lessons.md`（动 sprite atlas 前必读，AGENTS 约束 7）

## 技能需求（蒸馏）

| 技能 | 项目内的具体形态 | 验收证据 |
|------|----------------|---------|
| 像素规格纪律 | 16×16 角色、8 方向步行动画（`strideFrame`/`lungeFrame` 派生）；tile-based 房间 | `docs/design/05-character-design.md` |
| 调色板单源 | 新色值先进 `src/core/data/` 调色板再使用；UI（tailwind/index.html）与 sprite 同源（B21 教训） | grep v1 hex = 0 残留 |
| 光照约束意识 | 知道 RC 生产 profile（3 cascades/`baseIntervalPx=6`/half-res）；懂得亮处 ≤1% 过曝白（B24 标准） | `smoke/hotline-e2e-intact.png` 基线对照 |
| 亮暗可读性 | 暗部保像素颗粒（dither 回压意识）；亮处保色相（B65 软膝后油灯暖橙 / 探照灯冷蓝可辨） | `BUGS.md` B65 实测 RGB |
| 资产例外边界 | 外部 PNG 仅 intro curated set；清单=`references/sprite-samples/approved-intro-assets.json`，流程=`scripts/process-intro-sprites.mjs`（`npm run sprites:process` / `intro-assets:check`） | `AGENTS.md:40` |
| 敏感度自审 | NPC 服装按职能可识别（占领军制服），不做族群刻板视觉 | GDD §2.4 |

## 交付物

- sprite（走 08 号 sprite spec；atlas 变更先读 25 号教训文档）
- intro curated PNG（只经 `scripts/process-intro-sprites.mjs` 产出进 `public/sprites/intro/`，manifest 自动生成）
- 调色板变更（同一 PR 内 data 表 + UI 同步，PR 描述声明改色）

## 验收门

- `npm run intro-polish:check` 绿 + 基线图对照（`smoke/hotline-e2e-*.png`）
- `npm run intro-assets:check` 绿（manifest/hash 一致）

## 禁止事项

- 禁止扩展 PNG manifest 为通用外部资产政策（音频/地图仍程序化，`AGENTS.md:40`）
- 禁止 additive 假光斑/渐变光贴图（B28 教训：假辉光自燃放大成灯管）
- 禁止私加色值绕过调色板
