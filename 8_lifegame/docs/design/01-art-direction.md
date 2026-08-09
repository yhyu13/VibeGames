# Art Book — Intro Scene (Campus Zone)

Board-game/card UI, not an action scene: CSS grid + DOM, zero image/font asset files (matches repo-wide "zero assets" convention — everything below is achievable with CSS gradients, box-shadow, emoji glyphs, and system fonts).

## 1. Palette

| Token | Hex | Use |
|---|---|---|
| `--campus-warm` | `#F4E4C1` | lit campus cell background |
| `--campus-accent` | `#D97742` | campus cell border / current-position ring |
| `--city-locked` | `#3A3D42` | locked city cell background (desaturated, cold) |
| `--city-locked-fog` | `#6B6E73` | locked cell icon tint (silhouette, not full color) |
| `--ink` | `#1B1B1F` | body text |
| `--paper` | `#FBF7EE` | scene backdrop (aged paper, board-game feel) |
| `--gain` | `#2F8F5B` | positive number tick |
| `--loss` | `#C4453A` | negative number tick |
| `--awaken-gold` | `#E8B94A` | 觉醒成功 tier flash + micro-awakening toast |

**The one rule that matters**: `--city-locked` cells must read as *cold* against `--campus-warm` at a glance — this contrast **is** the intro scene's thesis (visibility gate), not decoration. Never warm up a locked cell; never grey out a campus cell.

## 2. Cell iconography (emoji glyphs, no image assets)

| Cell | Icon | Type | Locked? |
|---|---|---|---|
| 出身定型 (start) | 🏠 | start | no |
| 图书馆 | 📚 | learn | no |
| 公开课 | 🏫 | learn | no |
| 食堂兼职 | 🍜 | work | no |
| 社团 | 👥 | rest | no |
| 免费贵人 | 🎓 | mentor | no |
| 私董会 | 💼 | (city, preview) | **yes** |
| PE 圈 | 💎 | (city, preview) | **yes** |
| 投行内推 | 🏦 | (city, preview) | **yes** |

Locked cells render at 40% opacity, `grayscale(1)`, with a 🔒 badge overlay and a tooltip on hover: "出身差看不见 · 未解锁" (fades in, never auto-shows — discovery beat, not a lecture).

## 3. Layout

Single viewport, no scroll:
- **Top band**: HUD (wealth/cognition/stamina/mood, turn counter "回合 N/4")
- **Center**: Board — 6 campus cells in a hexagonal ring (CSS grid, `place-items: center`, cells positioned via `grid-template-areas`), 3 locked city cells fixed along the top-right edge, always visible, never entered
- **Bottom band**: context panel — swaps between DiceRoller / EventModal / InvestPanel / AICoachPanel depending on turn phase (one panel visible at a time, others `display:none` — no simultaneous modals)

## 4. Motion / juice (the P4–P7 checklist)

- **Dice roll**: 2 dice faces cycle rapidly (~60ms/frame, 8 frames) then settle; formula breakdown (`7 + (−2) + 0 + (+1) + 0 = 6`) types in term-by-term, 120ms/term.
- **Cell move**: token slides cell-to-cell along the ring path (CSS transition, 300ms ease-out per hop), never teleports.
- **Number ticks**: wealth/cognition/stamina/mood deltas count up/down over 400ms (`requestAnimationFrame` easing), colored `--gain`/`--loss`, with a `+` or `−` prefix that never disappears mid-count.
- **Outcome tier flash**: screen-edge vignette pulse colored by tier (red-ish for 大失败, green for 大成功, gold for 觉醒成功), 1 pulse, 250ms, never repeats within a turn.
- **AI coach reveal**: line types out character-by-character (18ms/char, matches a "teacher writing on the board" pace, not instant-dump); the 4D attribution bar for the dominant dimension fills last, after the text finishes.
- **Micro-awakening toast** (30%/turn per source doc): small gold banner slides in from top, auto-dismiss after 3s, does not block turn progression.

## 5. Typography

System font stack only (`-apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`) — no webfont files. Numbers use `font-variant-numeric: tabular-nums` so tick-up animations don't jitter column widths.

## 6. Forbidden list

- ❌ No particle systems / canvas confetti libraries — this is a board-game UI, juice comes from CSS transitions + color, not particles (keeps bundle at zero extra deps).
- ❌ No warming up locked cells for "encouragement" — the cold-lock contrast must stay stark through the whole intro; softening it defeats the scene's thesis.
- ❌ No real photos/illustrations — emoji + CSS only, consistent with repo's zero-asset-file convention.
