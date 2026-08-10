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

Single viewport, no scroll (v1.2 — world + beat-overlay layout, replacing the v1.1 bottom band):
- **Top band**: HUD (wealth/cognition/stamina/mood, turn counter "回合 N/8")
- **Below HUD (conditional)**: ⚡ special-event banner (v1.1) — appears only on shock turns, tinted `--gain`/`--loss` via `color-mix` at 14-16% fill + 40% ring, never a third color; carries icon + label + "无预兆" + wealth% and mood delta
- **World (always mounted)**: the campus map — buildings sited geographically (宿舍 south, 图书馆 center hub, 教学楼 east, 食堂 west, 社团中心 northwest, 贵人办公室 northeast), hub paths as dashed strokes, player token gliding between buildings, and the 3 locked city cells as a desaturated skyline strip beyond the north gate (top edge), always visible, never entered
- **Beat overlay (one at a time)**: a dimmed backdrop (~45% ink) + a single center card that swaps per beat — opening (出身定型) / DiceRoller / EventModal / InvestPanel — and a WIDE card for the results beat: AICoachPanel left, 平行命运 card right (dashed `--city-locked-fog` border on a faint `--city-locked` wash (5%): the alt trajectory is visually "colder" than the player's warm campus world, echoing the locked-cell thesis). Cards scale 0.96→1 + fade in over 300ms on entry; summary stays a full takeover.

## 4. Motion / juice (the P4–P7 checklist)

- **Dice roll**: 2 dice faces cycle rapidly (~60ms/frame, 8 frames) then settle; formula breakdown (`7 + (−2) + 0 + (+1) + 0 = 6`) types in term-by-term, 120ms/term.
- **Token glide** (v1.2): the player token glides building-to-building across the map to the CLICKED destination (CSS transition on left/top, 600ms ease-in-out, one smooth arc), never teleports; dice no longer move the token.
- **Number ticks**: wealth/cognition/stamina/mood deltas count up/down over 400ms (`requestAnimationFrame` easing), colored `--gain`/`--loss`, with a `+` or `−` prefix that never disappears mid-count.
- **Outcome tier flash**: screen-edge vignette pulse colored by tier (red-ish for 大失败, green for 大成功, gold for 觉醒成功), 1 pulse, 250ms, never repeats within a turn.
- **AI coach reveal**: line types out character-by-character (18ms/char, matches a "teacher writing on the board" pace, not instant-dump); the 4D attribution bar for the dominant dimension fills last, after the text finishes.
- **Micro-awakening toast** (30%/turn per source doc): small gold banner slides in from top, auto-dismiss after 3s, does not block turn progression.
- **⚡ special-event flash** (v1.1): banner scales 0.96→1 + fades in over 500ms, once per shock turn — a shock should feel abrupt (无预兆), so no idle looping animation and no warm-up tween.

## 5. Typography

System font stack only (`-apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`) — no webfont files. Numbers use `font-variant-numeric: tabular-nums` so tick-up animations don't jitter column widths.

## 6. Forbidden list

- ❌ No particle systems / canvas confetti libraries — this is a board-game UI, juice comes from CSS transitions + color, not particles (keeps bundle at zero extra deps).
- ❌ No warming up locked cells for "encouragement" — the cold-lock contrast must stay stark through the whole intro; softening it defeats the scene's thesis.
- ❌ No real photos/illustrations — emoji + CSS only, consistent with repo's zero-asset-file convention.
