# 6_patapong3D - Project AGENTS.md (v2.0)

> Project-level rules for agents working in this directory. The monorepo root
> `../AGENTS.md` is the umbrella rule set; this file is its child.
> 6_patapong3D = drum-driven god game (Patapon spirit): divine drummer +
> 3-unit army vs one boss (Moloch). NOT Pong (v0.1) and NOT a 1v1 fighter
> (v1.0) - v2.0 adds the real Patapon DNA: 4-beat command grammar.

## 1. One-liner

Patapong 3D = **divine drums**. W/A/S/D = PATA/PON/DON/CHAKA; any drum on the
beat counts (timing-only); **4 successful beats resolve a command** (10
commands); commands march/attack/defend/rally the 3-unit army against Moloch
(24 HP, telegraphs, enrage). First to 0 HP loses (army 15 HP vs boss 24 HP),
~1-3 min/match, pure frontend, zero runtime asset files.

## 2. Doc-driven development

| Need | Doc |
|---|---|
| Design | `GDD.md` (v2.0 divine drums) |
| Frozen contract / numbers | `TDD.md` 4-5 |
| Command table | `GDD.md` 3 / `src/core/data/commands.ts` |
| First-contact agent guide | `CLAUDE.md` |
| Art direction / PBR | `docs/design/02-art-direction.md` / `docs/design/PATAPONG-ART-REFERENCE.md` |
| Intro scene plan | `docs/design/05-intro-scene-plan.md` |
| Milestone evidence | `verification-report.md` |
| How to run | `README.md` |

Frozen rules: `TDD.md` 4/5 signatures, state names and defaults must not be
changed casually; changes need the TDD changelog, all-agents notification, and
a dedicated `[TDD-CONTRACT-CHANGE]` commit. GDD is design authority; TDD is
technical authority; on conflict, TDD 2.6 wins.

## 3. Architecture (C.A.T)

```
src/
├── core/                 # platform-pure, zero three/react/zustand/DOM
│   ├── types.ts          # frozen (CommandName/BossAttack/Unit/BossState/...)
│   ├── constants.ts      # frozen numeric tables
│   ├── math.ts
│   ├── data/             # commands (10-command grammar), colors, patapons,
│   │                     # court, audience, sfx, songSeeds
│   └── simulation/       # Simulation + rhythm / commands (data) / combat /
│                         # boss / fever / juiceEvents / squash / matchOver /
│                         # events / songGenerator / describe
├── engine/               # platform adapters
│   ├── GameEngine.ts     # rAF + fixed-step sim + event dispatch + stats
│   ├── SceneManager.ts   # PBR scene (RoomEnvironment + ACES + 3-point lights)
│   ├── InputManager.ts   # W/A/S/D drums + R/Esc/M
│   ├── AudioManager.ts   # Web Audio synth from data/sfx.ts recipes
│   ├── VoxelRenderer.ts  # court + 3 army Patapons + boss (instanced)
│   ├── NoteRenderer.ts   # 4-lane beat scroll (decorative drums)
│   ├── ParticleSystem.ts / CameraShake.ts / PerfWatchdog.ts / postfx.ts
│   ├── devtools.ts       # __sim / __gameManifest / __simEvents (DEV only)
│   └── storage.ts        # patapong.v2.* localStorage
├── components/           # React overlays - read ONLY the zustand store
│   ├── HUD.tsx           # boss HP bar + army chips + command input + combo
│   ├── Menu.tsx          # command grammar preview + stats
│   ├── ReadyCountdown.tsx / RhythmBar.tsx / JudgementOverlay.tsx
│   ├── FeverOverlay.tsx / WinScreen.tsx / PerfBadge.tsx
├── store.ts              # zustand mirror + judgementFeed
├── App.tsx / main.tsx / styles.css
```

Hard rules:
- `core/` must not import three/react/zustand/DOM; side effects only via
  `SimEvent`.
- `engine/` consumes core via `snapshot()` + `drainEvents()`.
- `components/` never import `Simulation` or `engine/`; live feedback flows
  through `store.judgementFeed`.
- No magic numbers, no `any`, no new npm packages, no runtime assets.
- Violations = immediate PR reject.

## 4. Stack (locked)

vite ^6 / typescript ^5.6 / react 19 / three 0.170 / zustand 5 / tailwind 3.4
/ @vitejs/plugin-react ^4.3 / postcss+autoprefixer. **No new dependencies.**

## 5. Commands

```bash
cd C:\Git-repo-my\VibeGames\6_patapong3D
npm install      # first run only (node_modules not committed)
npm run dev      # port 5183 (strictPort; 4_chunbai=3000, 5_gamejam_1=5173)
npm run build    # tsc -b && vite build -> dist/ (not committed)
npm run preview
npx tsc -b --noEmit  # typecheck gate
```

No lint/test/format commands exist; do not introduce them.

## 6. File ownership

| Agent | Owns | Does not own |
|---|---|---|
| agent-core | `src/core/**` | engine/components/store/App |
| agent-engine | `src/engine/**` | core/components/store/App |
| agent-ui | `src/components/**` + App/main/store/styles | core/engine |
| agent-qa | nothing (verifies only) | everything |

## 7. Commit discipline

- One commit per sub-batch; gate = `npx tsc -b --noEmit` 0 errors + visual
  smoke.
- English commit message; Chinese PR description.
- No force-push / rebase / amend on pushed commits.
- `dist/`, `node_modules/`, `.kilo/`, `.playwright-mcp/`, `*.tsbuildinfo`
  are ignored; never commit them.

## 8. Parallel sessions (monorepo)

Other sessions work `4_chunbai/` / `5_gamejam_1/` / `7_hotlineShanghai/`
concurrently - never stage/commit their paths. `git commit` may hit a
transient `index.lock`; retry, never delete the lock while a session is
active. Before committing, check `git status` to keep this project's paths
clean.

## 9. Performance red lines

60 FPS @ 1080p; draw calls < 10 (hard 15); triangles < 30k; particles <= 200;
audio voices <= 6; WebGL leak 0. PerfWatchdog auto-degrades
(`PARTICLE_BURST_HALF` / `BLOOM_OFF`).

## 10. Quick links

- GDD: `./GDD.md` · TDD: `./TDD.md` · Intro scene: `./docs/design/05-intro-scene-plan.md`
- Agent guide: `./CLAUDE.md` · Design docs: `./docs/design/`
- PBR reference: `./docs/design/PATAPONG-ART-REFERENCE.md`
- Verification: `./verification-report.md` · Root rules: `../AGENTS.md`

---

*Project rules v2.0 - 2026-08-09 - divine drums rewrite*
