# 8_lifegame - Verification Report (intro scene v1.0)

> Date: 2026-08-09. First build — greenfield project, no prior version.

## 1. TL;DR

Intro scene implemented and verified:

- board renders 6 lit campus cells + 3 greyed/locked city cells from frame 1
  (visibility-gate "extreme case" reads immediately, no explanation needed);
- 2d6 + 4-modifier dice formula produces all 5 outcome tiers across repeated
  playtests (big_fail/fail/success/big_success/awaken all observed);
- full 5-step core loop (map -> dice -> event -> invest -> AI coach) wired
  end-to-end for 4 turns, then a summary screen with a restart button;
- typecheck + production build green;
- 6 full-session browser playtests (Python Playwright, headless chromium),
  0 console errors / 0 warnings across all 6 runs.

## 2. Automated gates

```
npx tsc -b --noEmit   -> 0 errors
npm run build          -> tsc -b && vite build, succeeded (212.76 kB JS / 68.31 kB gzip)
```

## 3. Manual browser playtest (Python Playwright, headless)

6 full 4-turn sessions run via `.playwright-mcp/playtest.py` against
`npm run dev` (port 5185). Each session: load -> roll dice x4 (with the
formula-breakdown + tier-colored panel) -> pick an event choice each turn ->
allocate + resolve a mocked investment each turn -> let the AI coach panel
finish its typed reveal -> advance -> summary screen with gap-teaser.

Result across all 6 runs: 0 console errors, 0 console warnings, summary
panel + restart button + gap-teaser bars all rendered every time.

## 4. Bugs found and fixed during the polish loop

- **Gap-teaser was too subtle**: scaling the 6.4x multiplier off a single
  4-turn session's tiny compounding (~0.5% gain) produced a nearly invisible
  ¥100,498 vs ¥103,187 comparison — undersold the game's entire thesis. Fixed
  by citing the source doc's own 32-round mid-level-player endgame numbers
  directly (¥2,085,000 vs ¥13,300,000) as a "if you kept playing" preview
  instead of a derived estimate. See `src/core/constants.ts`.
- **Micro-awakening toast never replayed**: `pendingMicroAwakening` was set
  `true` in `finishCoach` but never reset, so after the first occurrence
  React never remounted the toast `<div>` and its one-shot CSS animation
  never played again on subsequent turns. Fixed by resetting the flag in
  `startRoll` and keying the toast `<div>` on `player.turn` so each fresh
  occurrence gets a new DOM node. See `src/core/simulation/Simulation.ts`
  and `src/components/HUD.tsx`.
- **Summary screen left-aligned in empty space**: removing `<Board/>` on the
  `finished` branch left `.summary-panel` un-centered in the remaining
  `100vh`. Fixed with a `.summary-stage` flex-center wrapper.

## 5. "Perfect" checklist (GDD.md §4)

- Visual: locked-cell cold/grey vs. lit-campus warm contrast confirmed
  visible from the first screenshot, no interaction needed.
- Feel: all 5 dice tiers have distinct border/text colors + a matching coach
  line; event/invest/coach panels transition without dead ends across 6 runs.
- Performance: no WebGL, pure CSS-grid/DOM UI; build is ~68kB gzip; 0 jank
  observed in any playtest.
- Replayability: restart works, dice seed is fresh (timestamp-based) per
  session, 4-turn shape and gap-teaser punchline are consistent every run.
