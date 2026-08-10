# Patapong 3D - Technical Design Document (TDD) v2.0

> **Frozen contract**: all coders/agents implement against this file.
> Interface signatures, state names and default values in sections 4/5 are
> frozen. Changes require: (1) changelog row below, (2) notify all agents,
> (3) a dedicated `[TDD-CONTRACT-CHANGE]` commit.

| Version | Date | Change |
|---|---|---|
| v0.1 | 2026-08-07 | Pong clone (abandoned) |
| v1.0 | 2026-08-09 | 4-key 1v1 rhythm fighter |
| v1.0.1 | 2026-08-09 | AI timing gate, chart order, squash/juice/FeverOverlay, doc fixes |
| **v2.0** | **2026-08-09** | **Divine-drums rewrite: timing-only judgement, 4-beat command grammar (10 commands), 3-unit army vs 1 boss (Moloch), telegraph/defend/retreat/enrage turn model. `aiRhythm.ts` removed (replaced by `boss.ts`).** |
| v2.1 | 2026-08-10 | Runtime revival: full v2 battle playable again (intro → battle handoff in `main.tsx`). Global voxel raytracer (`RaytraceAdapter`) is the default renderer for intro AND gameplay behind the `SceneRenderer` contract; raster PBR is the automatic fallback. Moonlit water in the raytrace fragment shader; 7-step quality ladder (0-6) with raster swap at sustained max level. No frozen §4/§5 signature or value changed. |

## 1. Stack (locked)

| Dep | Version | Use |
|---|---|---|
| vite | ^6.0.0 | build / dev server **5183** (strictPort) |
| typescript | ^5.6.0 | strict typecheck |
| react / react-dom | ^19.0.0 | UI overlays |
| three / @types/three | ^0.170.0 | rendering |
| zustand | ^5.0.0 | UI state |
| tailwindcss | ^3.4.0 | HUD styles |
| @vitejs/plugin-react | ^4.3.0 | React plugin |

No new dependencies. No runtime asset files (`references/` is art-direction
only). No test/lint/format tooling in this project; typecheck is the gate and
the headless esbuild+node harness (see `verification-report.md`) is the
de-facto regression check.

## 2. Architecture (C.A.T)

```
src/
├── core/          # platform-pure: zero three/react/zustand/DOM
│   ├── types.ts             # frozen contracts (v2.0)
│   ├── constants.ts         # frozen numeric tables (v2.0)
│   ├── math.ts
│   ├── data/
│   │   ├── commands.ts      # 10-command grammar (frozen)
│   │   ├── colors.ts / patapons.ts / court.ts / audience.ts / sfx.ts / songSeeds.ts
│   └── simulation/
│       ├── Simulation.ts    # orchestrator (frozen interface)
│       ├── rhythm.ts        # scroll + timing-only judgement
│       ├── commands.ts      # (none - command table lives in data/commands.ts)
│       ├── combat.ts        # unit/boss damage + heal
│       ├── boss.ts          # telegraph / attack / enrage turn machine
│       ├── fever.ts         # Fever at combo 8/16/24 + MIRACLE
│       ├── juiceEvents.ts   # juice emission helpers
│       ├── squash.ts        # squash apply/decay
│       ├── matchOver.ts     # VICTORY / DEFEAT
│       ├── events.ts        # EventBus
│       ├── songGenerator.ts # charts from songSeeds
│       └── describe.ts
├── engine/        # platform adapters
│   ├── GameEngine.ts        # rAF + fixed-step sim + dispatch + stats persist
│   ├── IntroDirector.ts     # MENU-phase intro timeline (boot/title/reveal/awaken/ready)
│   ├── SceneManager.ts      # PBR scene, lights, audience
│   ├── InputManager.ts      # W/A/S/D drums + R/Esc/M commands
│   ├── AudioManager.ts      # Web Audio synth from recipes
│   ├── VoxelRenderer.ts     # court + 3-unit army + boss (instanced)
│   ├── NoteRenderer.ts      # 4-lane beat scroll (decorative drums)
│   ├── ParticleSystem.ts / CameraShake.ts / PerfWatchdog.ts / postfx.ts
│   ├── devtools.ts          # __sim / __gameManifest / __simEvents (DEV)
│   └── storage.ts           # patapong.v2.* localStorage
├── components/    # read only the zustand store
│   ├── HUD.tsx              # boss bar + army chips + command input + combo
│   ├── IntroScene.tsx       # intro cinematic overlay (reads store.intro)
│   ├── Menu.tsx             # command grammar preview + stats
│   ├── ReadyCountdown.tsx / RhythmBar.tsx / JudgementOverlay.tsx
│   ├── FeverOverlay.tsx / WinScreen.tsx / PerfBadge.tsx
├── store.ts       # zustand mirror + judgementFeed
├── App.tsx / main.tsx / styles.css
```

Hard rules: core has no platform imports; side effects are `SimEvent`s;
engine consumes core via `snapshot()`/`drainEvents()`; components never
import Simulation/engine (live feedback flows through `store.judgementFeed`);
no magic numbers; no `any`; no new deps; no runtime assets.

## 3. Performance budget (60 FPS @ 1080p)

| Metric | Budget | Hard cap |
|---|---|---|
| Frame time render/sim/audio/UI | <= 8 / 0.5 / 0.5 / 0.5 ms | 12 / 1 / 1 / 1 ms |
| Active voxels | <= 4222 | 4500 |
| Triangles | < 55k | 65k |
| Material instances | < 8 | 12 |
| Draw calls | <= 9 | 12 |
| Particles | <= 200 | 256 |
| Audio voices | <= 6 | 8 |
| WebGL leaks | 0 | 0 |

`PerfWatchdog`: 30-frame rolling avg > 14ms for 3 consecutive windows ->
`PARTICLE_BURST_HALF`; 6 consecutive -> `BLOOM_OFF`; avg < 10ms for 120
consecutive windows -> clear. (TDD 3.6)

## 4. Frozen numeric tables (source: `core/constants.ts`)

### 4.1 Drums & judgement

| Key | Drum | | Window | ms |
|---|---|---|---|---|
| W | PATA | | PERFECT | 60 |
| A | PON | | GOOD | 120 |
| S | DON | | NORMAL | 200 |
| D | CHAKA | | MISS beyond | 200 |

### 4.2 Command system

| Field | Value | | Field | Value |
|---|---|---|---|---|
| COMMAND_LENGTH | 4 | | MARCH_DISTANCE | 0.8 |
| ATTACK_DAMAGE | 2.0 | | CHARGE_DAMAGE | 4.0 |
| HEAVY_DAMAGE | 3.0 | | VOLLEY_DAMAGE | 1.5 |
| RALLY_HEAL | 3 | | DEFEND_REDUCTION | 0.5 |
| BERSERK_TURNS | 2 | | BERSERK_DAMAGE_MULT | 2.0 |
| PROXIMITY_MAX_BONUS | 0.5 | | PROXIMITY_FULL_RANGE | 8 |

### 4.3 Army / boss

| Field | Value | | Field | Value |
|---|---|---|---|---|
| ARMY_UNIT_COUNT | 3 | | UNIT_HP_MAX/START | 5 |
| ARMY_INITIAL_X | -4 | | ARMY_MIN/MAX_X | -5 / 4.5 |
| BOSS_HP_MAX/START | 24 | | BOSS_INITIAL_X | 6 |
| BOSS_SWIPE_DAMAGE | 1 | | BOSS_SLAM_DAMAGE | 1 |
| BOSS_FIREBALL_DAMAGE | 2 | | BOSS_ENRAGE_HP | 12 |
| BOSS_ENRAGE_DAMAGE_MULT | 1.5 | | BOSS_AUTO_TURN_S | 6 |

### 4.4 Fever

| Field | Value |
|---|---|
| FEVER_TRIGGERS | [8, 16, 24] (successful beats) |
| FEVER_SLOWMO_FACTORS | [0.8, 0.7, 0.6] |
| FEVER_DURATIONS | [3, 3, 3] s |
| FEVER_DAMAGE_MULT | 1.5 |

### 4.5 Loop / storage

`FIXED_DT = 1/60`, `MAX_FRAME_ACCUM = 5`, `STORE_SYNC_INTERVAL = 2`,
`NOTE_SCROLL_SPEED = 1.6`, `SONG_COUNT = 3`, `SONG_DURATION_S = 60`.
Storage keys: `patapong.v2.stats`, `patapong.v2.settings`.

## 5. Frozen signatures (`src/core/types.ts`)

- `NoteType = 'PATA'|'PON'|'DON'|'CHAKA'`; `Judgement = 300|100|50|0`
- `CommandName = 'MARCH'|'ATTACK'|'DEFEND'|'CHARGE'|'RALLY'|'VOLLEY'|'RETREAT'|'BERSERK'|'HEAVY'|'MIRACLE'`
- `BossAttack = 'SWIPE'|'SLAM'|'FIREBALL'`; `Side = 'P1'|'BOSS'`
- `Unit { id, side, hp, maxHp, position, state, stateTimeLeft, squashAmount, characterId }`
- `ArmyState { units, formationOffset, defendTurns, retreatTurns, berserkTurns, lastCommand }`
- `BossState { hp, maxHp, position, state, stateTimeLeft, telegraph, enraged, attackCount, squashAmount }`
- `RhythmState { songTime, songIndex, charts, activeNoteIndex, noteScrollSpeed, commandBeats, commandJudgements, combo, maxCombo }`
- `SimSnapshot { phase, army, boss, rhythm, fever, perfDegradation }`
- `Simulation { step(dt), startMatch(), toMenu(), rematch(), snapshot(), setP1Input({type}), onEvent(), drainEvents(), describeWorld/Rules/Entities(), recentEvents(n) }`
- `SimEvent` union: songStart/songEnd, beatHit, playerMiss, commandResolved, commandFailed, bossTelegraph, bossAttack, bossHit, feverStart/feverEnd, damageDealt, healApplied, unitSquash, cameraShake, particleBurst, sfx, audienceCheer, matchOver, persist.

## 6. Gameplay contracts

- **Timing-only judgement**: any drum inside the window counts; the lane
  glyph is decorative.
- **Command resolution**: 4 successful beats; unknown sequences emit
  `commandFailed` and reset the bar (combo is kept).
- **Miss**: out-of-window tap or beat expiry resets combo + bar.
- **Boss turn model**: after every command the pending telegraphed attack
  lands (DEFEND applies, RETREAT dodges), then a new telegraph starts. Stall
  > `BOSS_AUTO_TURN_S` triggers the attack without a command.
- **Enrage**: boss HP <= `BOSS_ENRAGE_HP` -> damage x1.5, glow, faster
  telegraph event duration.
- **Fever**: combo 8/16/24, slow-mo affects sim only (audio unaffected).
- **Match over**: boss HP 0 -> P1 wins; all units defeated -> BOSS wins.

## 7. Commands

```bash
cd C:\Git-repo-my\VibeGames\6_patapong3D
npm install        # first time (node_modules not committed)
npm run dev        # http://localhost:5183
npm run typecheck  # tsc -b --noEmit (gate)
npm run build      # tsc -b && vite build -> dist/ (not committed)
```

No lint/test/format commands exist in this project; do not add them.

## 8. Branch / commit policy

One commit per sub-batch; gate = typecheck 0 errors; English commit message,
Chinese PR description; no force-push/amend on pushed commits.

## 9. Active intro runtime

`main.tsx -> IntroEngine` is the active graph. `IntroEngine` owns the fixed-step
ATTACK input timeline and Three.js adapter. Surface ellipsoids are sampled once
into cube-only `InstancedMesh` shells (Patapons 22-grid, Moloch 40-grid); no
character uses `SphereGeometry`. The arrow uses semi-implicit Euler gravity.
Moloch impact compacts its body instance range, reveals a reserved dark interior
batch, and activates 20-64 entries in a preallocated debris pool. The impact
hold is five 60 Hz ticks. Replay restores cached voxel activity without
regeneration or new dependencies. The warm point light is local; fullscreen
impact flashes are forbidden.
