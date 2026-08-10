# Intro Scene Plan — Campus Zone (小镇做题家 × Web 2.0)

## 1. One line + why

Four dice-driven turns through the campus zone, ending with a look at three permanently locked finance cells at the horizon. Why now: this is the slice of "Stock God Simulator" that `ch04-ch05.pdf` fully specifies with real numbers — dice formula, event payouts, visibility rule. `ch01-ch02.pdf` (worldview + era slices) arrived mid-build and confirms the surrounding narrative (三维命运: origin x era x cognition, the 5-step awakening flow, free/paid mentor odds) without adding a concrete origin→home-era lookup table, so the D1 simplification below still holds. `outline.pdf`'s own Q1 roadmap milestone ("1 origin x 1 era x 1 board segment") independently confirms this is the right scope to cut to. Ch07/Ch09 (mentor system, investment strategy library) still don't exist anywhere.

## 2. Scope (frozen)

See `GDD.md` §2 for the authoritative frozen/data-frozen/M2+ split. Restated tersely: 1 origin (town-exam-kid), 1 era (Web 2.0, era-mod frozen at 0), 1 zone (campus, 6 cells), 3 locked city cells (decorative, not entered), mocked investing, scripted AI coach, 4 turns, one summary screen.

## 3. Scene spec

**Map (v1.2)**: a real campus map, not a ring — 6 clickable buildings sited geographically (🏠 宿舍 south → 📚 图书馆 center hub → 🏫 教学楼 east / 🍜 食堂 west / 👥 社团中心 northwest / 🎓 贵人办公室 northeast), hub paths drawn between them. The player picks each turn's destination (free movement — dice no longer move the token; tiers scale the drawn event's outcome). Each building draws from its own weighted event table (opportunity/neutral/trap, weights 2/3/1; 贵人办公室 keeps its probability roll). 3 locked city cells (💼🔒 / 💎🔒 / 🏦🔒) sit as a grey skyline beyond the north gate, visible from turn 1, never enterable.

**Entities**: 1 player token (origin badge shown on hover: "小镇做题家 · −2 骰子修正"). No NPCs/enemies — this is a solo economic sim, not combat.

**Palette constraint**: see `docs/design/01-art-direction.md` §1 — warm campus vs. cold locked cells is the non-negotiable visual contract.

## 4. Art asset checklist (tier, per skill §5.2 — all CSS/emoji, zero image files)

- **Tier 1 MUST (9)**: 6 campus cell icons + 3 locked city cell icons (art doc §2)
- **Tier 2 juice MUST (6)**: dice roll animation, cell-move token slide, number tick-up/down, outcome-tier vignette flash, AI coach typed-reveal, micro-awakening toast
- **Tier 3 nice-to-have (3)**: HUD bar fill animations, hover tooltip on locked cells, summary-screen bar-chart reveal
- **Tier 4 optional (2)**: subtle board background texture (CSS gradient noise), turn-counter pulse

## 5. Program implementation (P0–P7)

| Phase | Goal | Sub-tasks | Verify |
|---|---|---|---|
| **P0** | Scaffold | Vite+React+TS+zustand project, `core/types.ts` + `constants.ts` stubs | `tsc -b --noEmit` 0 errors |
| **P1** | Board renders | `Board.tsx` + `Cell.tsx`, 6 campus + 3 locked cells laid out, static | Browser: board visible, locked cells greyed |
| **P2** | Dice + move | `dice.ts` (2d6+mods), `DiceRoller.tsx`, token slides on roll | Browser: roll → token moves correct # cells |
| **P3** | Event resolution | `events.ts`, `EventModal.tsx`, 2-choice picker, applies deltas to `PlayerState` | Browser: HUD numbers update on choice |
| **P4** | Investment step | `invest.ts`, `assets.ts` (3 mocked assets, 8-tick curve), `InvestPanel.tsx` + juice | Browser: allocate → pnl resolves → wealth ticks |
| **P5** | AI coach | `attribution.ts`, `coachLines.ts`, `AICoachPanel.tsx`, typed reveal + 4D bars | Browser: coach line matches dominant dimension |
| **P6** | Full loop wiring | `Simulation.ts` orchestrator, `IntroScene.tsx` sequences 4 turns end-to-end, micro-awakening toast | Browser: 4 turns run without state desync |
| **P7** | HUD + summary | `HUD.tsx` polish, `SummaryScreen.tsx` (recap + gap-teaser vs 金融世家 static numbers) | Browser: 10x playtest, 0 console errors |

## 6. Verification gates (must-run checklist)

```bash
npx tsc -b --noEmit
npm run build
npm run dev   # → http://localhost:5185, Playwright MCP: load, 0 console errors, 4 turns, summary renders
```

## 7. "Perfect" definition (4-dim)

See `GDD.md` §4 — restated: locked-cell contrast reads instantly (visual), every roll has distinct juice (feel), 60fps/≤1s load (performance), same 4-turn shape replays with different dice seeds and always lands the gap-teaser (replayability).

## 8. Known conflicts + decision points

| # | Conflict/gap | Decision | Trace |
|---|---|---|---|
| D1 | No origin↔home-era lookup table exists in `ch01-ch02.pdf` or `ch04-ch05.pdf` (the "主角时代" concept is named but never rendered into numbers) | Froze eraMod at 0 for the intro; documented in GDD.md §2 and TDD.md §4 | This doc, 2026-08-09; re-confirmed after ch01-ch02.pdf arrived mid-build |
| D2 | Source doc's investment step assumes a real 2013–2032 market API | Mocked with a deterministic 8-tick curve per asset; live API explicitly deferred (source doc's own appendix Q3 treats this as an MVP-later concern) | TDD.md §4 |
| D3 | Source doc's AI coach assumes a real LLM call | Scripted template lines keyed by (outcome tier × dominant attribution dimension), 班主任 persona only | TDD.md §2, art doc §4 |
| D4 | "解冻" — none this scope | No forbidden-list items needed unfreezing; art doc §6 forbidden list is authored fresh for this project, not inherited from another project | — |
| D5 | v1.1's ring + dice-driven movement read as an abstract board, not a campus (user design critique, 2026-08-10) | Real campus map with geographically sited buildings + free movement (click destination, token glides); dice tiers re-homed to scale event outcomes so the frozen formula/tiers stay meaningful | `docs/design/02-v1.2-campus-world-design.md` §2/§3, commit 269c31f |
| D6 | Critique: each location should mix opportunities and setbacks, not one fixed event | Per-location weighted event tables (opportunity/neutral/trap, weights 2/3/1); 贵人办公室 keeps its probability roll | design doc §3, `locationEvents.ts` |
| D7 | Critique: events/mood should interfere with investment information — only rational mood invests wisely, anything else is gambling | Mood→preview distortion on the frozen 30/60 bands (pessimistic <30 / rational 30–60 / overconfident >60); cognition ≥60 narrows the window 3→1 ticks; assets themselves never change | design doc §4, `invest.ts` infoQuality()/buildAssetPreviews() |
| D8 | v1.3 critique: investing available from turn 1 with no narrative cause; numeric tick row unreadable; no market news; 金融世家 should trade a real account | Turn-1 forced 开户 story beat unlocks the sim account (both choices unlock, no soft-lock; turn 1 skips the invest phase); K-line candles (history only, 红涨绿跌) replace the numeric ticks; per-asset 热点新闻 80% faithful to the tick it precedes; 真盘 deferred to M2+ as a playable-origin mode (twin mechanics untouched) | user critique 2026-08-10, `docs/design/03-v1.3-invest-fiction-design.md` |

## 9. Sequencing

MGP (P0–P7, minimal playable + polish) target: single session, no multi-day estimate needed — scope is deliberately small (4 turns, 1 zone, 1 origin). No external deadline; polish loop runs until the §7 checklist is met, per user's "do not stop" instruction — no user-in-loop stop condition available, so the stop condition for this run is: §7 checklist fully green + `tsc` clean + one full manual playtest trace confirms no dead-ends.

## 10. Polish loop

Observe (manual playtest trace) → find problems (visual/feel/perf, 3 buckets) → fix → re-verify (`tsc` + reload) → observe again. Runs inline during P4–P7 rather than as a separate pass, given the scene's small surface area.

## 11. File outputs

**New**: everything under `8_lifegame/src/`, `8_lifegame/package.json` + config files, `8_lifegame/GDD.md`, `8_lifegame/TDD.md`, `8_lifegame/docs/design/01-art-direction.md`, this file.
**Modified**: root `AGENTS.md` (append `8_lifegame` project entry, per repo convention).
**Archived**: none — greenfield project, nothing to deprecate.

## 12. Status

| Phase | Status |
|---|---|
| A/B audit + critic | done (this doc + GDD.md §2) |
| C enumerate | done (§4 above) |
| D plan | done (this doc) |
| E execute P0–P7 | next |
| Polish loop | pending P0–P7 |
