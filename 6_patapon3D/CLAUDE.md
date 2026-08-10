# CLAUDE.md

Load-bearing facts for coding agents working on this repo. Cross-checked
against source on 2026-08-09 (v2.0 divine-drums rewrite).

## What this is

**Active build (2026-08-10): intro-only shell.** `main.tsx` starts
`IntroEngine` and nothing else; battle engine/render files were deleted
(2026-08-10). The platform-pure battle sim in `src/core/` remains for a
future battle renderer. Do not assume the documented v2 battle currently runs.

**Patapong 3D** - a drum-driven god game in the spirit of Patapon. The player
is the **divine drummer** commanding a **3-unit voxel army** against **one big
boss** (Moloch). NOT a Pong clone, NOT a 1v1 fighter (that was v1.0).

- W/A/S/D = drums PATA / PON / DON / CHAKA.
- Any drum inside the beat window counts (timing-only judgement).
- 4 successful beats complete the awakening ritual.
- The battle implementation was removed 2026-08-10 (intro-only directive);
  core sim remains in `src/core/` for a future battle renderer.

Zero **runtime** asset files; `references/` is art-direction only.
Dev server port **5183** (strictPort; siblings use 3000/5173/5184).

## Commands

```bash
npm install        # first time only (node_modules NOT committed)
npm run dev        # http://localhost:5183
npm run typecheck  # tsc -b --noEmit (the only automated gate)
npm run build      # tsc -b && vite build -> dist/ (not committed)
npm run preview
```

No test/lint/format tooling in this project; do not add it. Headless gameplay
checks are done by bundling a throwaway harness with esbuild + node (pattern
documented in `verification-report.md`). One sanctioned exception:
`scripts/smoke.mjs` (Playwright loaded from the machine-wide bun cache — no
project dependency) drives the intro end-to-end, screenshots in `smoke/`.

## Architecture (C.A.T)

```
src/
├── core/          # platform-pure (no three/react/zustand/DOM)
│   ├── types.ts / constants.ts / math.ts
│   ├── data/      # commands.ts (10-command grammar), colors, patapons,
│   │              # court, audience, sfx, songSeeds
│   └── simulation/ # Simulation, rhythm, combat, boss, fever, juiceEvents,
│                   # squash, matchOver, events, songGenerator, describe
├── engine/        # GameEngine, IntroDirector, SceneManager, InputManager,
│                  # AudioManager, VoxelRenderer (army+boss), NoteRenderer,
│                  # ParticleSystem, CameraShake, PerfWatchdog, postfx, storage
├── components/    # IntroScene, HUD, Menu, ReadyCountdown, RhythmBar,
│                  # JudgementOverlay, FeverOverlay, WinScreen, PerfBadge
├── store.ts / App.tsx / main.tsx / styles.css
```

Hard rules: core leaks side effects only as `SimEvent`; engine consumes core
via `snapshot()`/`drainEvents()`; components read only the zustand store
(live judgement feedback flows through `store.judgementFeed`); no magic
numbers; no `any`; no new deps; no runtime assets.

## Drum & command invariants (read before touching input)

- The 4 keys are W/A/S/D = PATA/PON/DON/CHAKA. `KEY_TO_NOTE` lives in
  `engine/InputManager.ts`; drum labels in `components/Menu.tsx` and
  `components/HUD.tsx`.
- The beat chart is **timing-only**: the note's lane/type glyph is decorative.
  `judgeBeat()` in `core/simulation/rhythm.ts` ignores which key was pressed.
- The command grammar is frozen in `core/data/commands.ts`: exactly
  `COMMAND_LENGTH = 4` beats, 10 commands, unique sequences. `lookupCommand()`
  is the single resolver.
- Adding a command = add a row to `data/commands.ts` + `CommandName` in
  `core/types.ts` + a case in `Simulation.executeCommand()` + constants +
  Menu/HUD previews + GDD/TDD tables.
- The 4th beat resolves the command **inside `Simulation.resolveCommand()`**;
  engine/UI handlers must never try to advance sim state.

## State advancement contract

- A beat is consumed by `onBeatHit` (marks the note resolved, advances
  `activeNoteIndex`). A beat expiry (>200ms) is an auto-miss that also
  advances the note.
- A miss resets `rhythm.combo` and `rhythm.commandBeats`. An unknown 4-beat
  sequence emits `commandFailed` and resets the bar but keeps the combo.
- The boss's pending attack fires inside `resolveCommand` (after the new
  command's effect, so DEFEND/RETREAT from that command apply) and also on a
  6s stall (`BOSS_AUTO_TURN_S`).
- `damageBoss` must NOT clobber the boss `telegraph` state (see combat.ts
  comment) or the pending attack is lost.

## Boss turn model

- After every command: pending telegraphed attack lands, then a new telegraph
  starts. Boss attacks: SWIPE (1 to all), SLAM (1 to all), FIREBALL (2 to one
  random unit). Enrage below 12 HP: x1.5 damage + glow.
- DEFEND halves the next attack; RETREAT dodges it; BERSERK doubles attack
  damage for 2 turns; MARCH/RETREAT move the formation and proximity scales
  melee damage up to +50%.

## Frozen contracts

`core/types.ts` + `core/constants.ts` are the source of truth; TDD 4/5 mirrors
them. Changes need the TDD changelog, agent notification, and a
`[TDD-CONTRACT-CHANGE]` commit.

## FSM

`MENU -> SONG -> MATCH_OVER` in practice (READY is declared but unused).
The **intro cinematic runs inside MENU**: `IntroDirector` owns the timeline
(boot -> title -> reveal -> awaken -> ready), the classic `Menu` overlay
appears only after `store.intro.complete`. Commands: PLAY -> `startMatch`,
R -> `rematch`, Esc -> `toMenu`, M -> mute toggle, SKIP -> `skipIntro`.
Any drum key starts/skips the cinematic; a canvas click fast-forwards.

## Performance & watchdog

Budget table lives in TDD 3 (draw calls < 10 / 15 cap; voxels <= 1500;
particles <= 200; voices <= 6). `PerfWatchdog`: 30-frame rolling average >
14ms for 3 consecutive windows -> `PARTICLE_BURST_HALF`; 6 -> `BLOOM_OFF`;
recovery at < 10ms for 120 windows.

`MAX_FRAME_ACCUM = 5` caps the fixed-step backlog (no spiral of death when the
tab is backgrounded). `STORE_SYNC_INTERVAL = 2` cuts React re-render churn;
the sim still runs at 60Hz.

## Dev hooks (DEV only)

- `window.__sim` - live Simulation instance
- `window.__gameManifest()` - `describeWorld()` + `describeRules()` +
  `describeEntities()` (NO snapshot)
- `window.__simEvents()` - last 64 SimEvents

Owned exclusively by `engine/devtools.ts`; do not re-register in main.tsx.

## Storage

`patapong.v2.stats` = `{ totalMatches, p1Wins, bossWins, longestCombo,
lastMatchAt }` (engine writes on `matchOver`); `patapong.v2.settings` =
`{ muted, volume }`.

## Extension recipes

- **Retune balance**: edit `core/constants.ts` + TDD 4 tables together
  (frozen values need the changelog/commit flow).
- **Add a command**: `data/commands.ts` + `types.ts` + `Simulation` switch +
  constants + Menu/HUD preview + GDD/TDD.
- **Add a boss attack**: `BossAttack` union in types.ts + `pickBossAttack` +
  `executeBossAttack` in boss.ts + a recipe in `data/sfx.ts` + renderer
  telegraph/impact visuals + GDD.
- **Add an SFX**: recipe in `data/sfx.ts` + `SfxId` union in types.ts.
- **Add a song**: `data/songSeeds.ts` only.

## Docs map

- `GDD.md` - design authority (divine drums, commands, boss)
- `TDD.md` - frozen contract + numbers
- `AGENTS.md` - project agent rules
- `docs/design/02-art-direction.md` - v2.0 art direction (Art Book)
- `docs/design/05-intro-scene-plan.md` - intro scene plan (single-scene scope)
- `verification-report.md` - evidence

## Commit discipline

Typecheck gate before every commit; English message, Chinese PR description;
no force-push/amend on pushed commits; do not commit `dist/` or
`node_modules/`.
