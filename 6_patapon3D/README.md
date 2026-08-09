# Patapong 3D

Active build: an intro-only dense-voxel PBR showcase. Enter the ATTACK command
`W A W A` to make the three minions dance and fire a ballistic arrow into
Moloch, producing a persistent crater and pooled physical voxel debris. Use
`W/A/S/D` for PATA/PON/DON/CHAKA and `R` to replay.

> **Current recovery build:** intro-only awakening ritual. The v2.0 battle
> design remains documented, but its mixed legacy implementation is dormant
> and excluded from the active TypeScript/build graph.

> **A drum-driven god game in the spirit of Patapon**: you are the divine
> drummer commanding an army of small Patapons against one big boss.
> Every drum hit feels like a "Pata".

![status](https://img.shields.io/badge/status-v2.0%20divine%20drums-yellow)
![stack](https://img.shields.io/badge/stack-Three.js%20%2B%20React%2019%20%2B%20zustand-blue)
![jam](https://img.shields.io/badge/cycle-Vibe%20Game%20Jam%2072h-orange)

## TL;DR

```bash
cd C:\Git-repo-my\VibeGames\6_patapong3D
npm install
npm run dev
# open http://localhost:5183
```

- **W / A / S / D** = drums PATA / PON / DON / CHAKA.
- Tap any drum on the beat (timing-only judgement, +/-60/120/200 ms).
- **Current executable:** 4 successful beats awaken the army and reach the
  `RITUAL COMPLETE` card. The command table below is the planned battle design,
  not active gameplay in this recovery build.

| Sequence | Command | Effect |
|---|---|---|
| P-P-P-PON | MARCH | advance toward the boss |
| P-O-P-O | ATTACK | standard attack |
| O-O-P-P | DEFEND | halve next boss damage |
| P-P-P-CHAKA | CHARGE | heavy attack |
| O-O-O-O | RALLY | heal the army |
| C-C-P-P | VOLLEY | ranged barrage |
| O-O-C-C | RETREAT | dodge next attack |
| P-P-O-O | BERSERK | double damage 2 turns |
| O-P-O-C | HEAVY | slow smash |
| C-D-P-O | MIRACLE | instant Fever |

- 3-unit army (5 HP each) vs **Moloch** (24 HP): SWIPE / SLAM / FIREBALL,
  enrage below 12 HP.
- Combo 8/16/24 = Fever (slow-mo + 1.5x damage).
- The 3-song battle loop is currently dormant.
- Intro: CLICK TO START -> title -> tap any drum on the beat (4 hits) ->
  the army awakens, Moloch roars, the completion card appears.

## What it is / isn't

**Is**:
- 🥁 Divine-drums input (you are the god, not a fighter)
- 🎬 Intro awakening ritual: darkness, 4-beat awaken, Moloch roar
- 👥 3-unit voxel army marching / attacking / defending on your commands
- 👹 One big boss with telegraphed attacks, defend/retreat counterplay, enrage
- 🎛️ Web Audio synthesized drums, PBR voxel art, camera shake + particles
- 🧱 C.A.T architecture (pure core / platform adapters / UI overlays)
- 🏃 72h Vibe Game Jam MVP, zero runtime asset files

**Isn't**:
- ❌ Side-scrolling levels with enemy waves
- ❌ Class evolution / progression / equipment
- ❌ Multiplayer / touch controls
- ❌ External asset files (`references/` is art-direction only)

## Project structure

```
6_patapong3D/
├── AGENTS.md / README.md / CLAUDE.md
├── GDD.md (design) / TDD.md (frozen contract)
├── verification-report.md
├── docs/design/02-art-direction.md + 05-intro-scene-plan.md + PATAPONG-ART-REFERENCE.md
├── references/          # art-direction references only (never imported)
└── src/
    ├── core/            # platform-pure: types, constants, math, data/, simulation/
    │   └── simulation/  # Simulation, rhythm, commands, combat, boss, fever,
    │                    # juiceEvents, squash, matchOver, events, songGenerator
    ├── engine/          # GameEngine, IntroDirector, SceneManager, VoxelRenderer,
    │                    # NoteRenderer, AudioManager, particles, postfx, storage
    ├── components/      # IntroScene, HUD, Menu, RhythmBar, JudgementOverlay,
    │                    # FeverOverlay, ReadyCountdown, WinScreen, PerfBadge
    ├── store.ts / App.tsx / main.tsx / styles.css
```

## Docs

| Want | Read |
|---|---|
| Design / commands / boss | `GDD.md` |
| Frozen contracts / numbers | `TDD.md` |
| First-contact agent guide | `CLAUDE.md` |
| Art direction / intro scene | `docs/design/02-art-direction.md` / `docs/design/05-intro-scene-plan.md` |
| Milestone evidence | `verification-report.md` |

## Credits

- Design / docs / lead: Mavis (v0.1 Pong 2026-08-07 -> v1.0 4-key fighter ->
  v2.0 divine drums 2026-08-09)
- Implementation: agent-core / agent-engine / agent-ui swarm
- Verification: agent-qa headless harness + browser smoke

## License

Part of the VibeGames personal repo. Code MIT (pending); content for
learning/non-commercial use.

---

*README v2.0 - 2026-08-09 - divine drums rewrite*
