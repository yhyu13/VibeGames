# AGENTS.md

Monorepo of standalone web game remakes (VibeGames). Each top-level directory (`1/`, `2/`, `3/`, `4_chunbai/`, `5_gamejam_1/`, `6_patapong3D/`) is an independent Vite project with its own `package.json`, `node_modules`, and build. There is **no root package.json** — never run npm at the repo root; run commands inside the specific project dir.

## Projects

- `1/` — Alien Invader (completed). Three.js + `@preact/signals-core` + IndexedDB. Code at `1/src`. Docs: `1/GDD.md`, `1/TDD.md`, `1/README.md`.
- `2/` — alien-invader variant (Three.js + zustand). Code at `2/game/`; docs at `2/GDD.md`, `2/TDD.md`.
- `3/` — alien-invader variant (Three.js, no React). Docs at `3/GDD.md`, `3/TDD.md`; screenshots in `3/showcase/`.
- `4_chunbai/` — **active project**: Pure White Lancer (纯白枪骑兵), a 3D remake of the 2008 Flash game by phixcat.
- `5_gamejam_1/` — **game jam project**: 《Boss 的焦虑》(Boss Anxiety), 72h jam single-act emotional boss-fight (Three.js + React 19 + zustand + Web Audio, zero assets). Gameplay evolved to **v2: mouse-rhythm attacks + audience barrage** (see `docs/how-to-play.md`). Docs: `boss-anxiety-gdd.md`, `TDD.md` (frozen contract, v1.2), `docs/design/01..05-*.md` (DDD), `docs/how-to-play.md`, `verification-report.md`. C.A.T architecture like 4_chunbai: `src/core/` pure (simulation/ + world/ + data/), `src/engine/` adapters, `src/store.ts` + `components/` overlays, dev server on port 5173.
- `6_patapong3D/` — **game jam project (v2.0 divine drums, 2026-08-09)**: Patapong 3D = **drum-driven god game (Patapon spirit)**: divine drummer + 3-unit army vs boss Moloch (NOT Pong — v0.1 abandoned; v1.0 1v1 fighter replaced 2026-08-09). 4 drums (W/A/S/D) = PATA/PON/DON/CHAKA, timing-only judgement ±60/120/200 ms, **4-beat command grammar (10 commands)**, army 15 HP vs boss 24 HP, 3 songs × 60s, Fever at combo 8/16/24 (slowmo [0.8, 0.7, 0.6]). PBR Patapon art (RoomEnvironment + ACES Filmic tone mapping, see `docs/design/PATAPONG-ART-REFERENCE.md`); `references/` keeps only the army reference + raw Patapon screenshots (stale Pong/1v1 images deleted 2026-08-09). 72h game-jam project, 1P (divine drummer) vs Moloch. Stack: Vite 6 + React 19 + Three.js 0.170 + zustand 5 + Web Audio, **zero runtime assets**, C.A.T architecture like 5_gamejam_1: `src/core/` pure (types/constants/math/data/simulation), `src/engine/` adapters (SceneManager w/ PBR upgrade, VoxelRenderer w/ Patapon fighters, NoteRenderer for 4 lanes, AudioManager w/ SFX_RECIPES, ParticleSystem, CameraShake, postfx, storage, devtools), `src/store.ts` + `components/` overlays (HUD, Menu, ReadyCountdown, RhythmBar, JudgementOverlay, WinScreen, PerfBadge, IntroScene). Docs: `GDD.md` v2.0 (divine drums design), `TDD.md` v2.0 (frozen contract w/ §4 numerical tables + §5 TS signatures), `docs/design/02-art-direction.md` (Art Book), `docs/design/05-intro-scene-plan.md` (intro scene plan), `docs/design/PATAPONG-ART-REFERENCE.md` (PBR rules), `verification-report.md`, project-level `AGENTS.md`. Dev server on port **5183** (avoid 5173 jam + 3000 chunbai conflict). **v2.0 status**: divine-drums rewrite: `data/commands.ts` + `simulation/boss.ts` + army/boss `VoxelRenderer` + HUD/Menu/WinScreen + intro scene, `npx tsc -b --noEmit` passes 0 errors, `npm run build` green. Pong-specific files (paddles.ts, aiPaddle.ts, ballPhysics.ts, paddleControl.ts, rallyCounter.ts, scoreTracker.ts, PointOverlay.tsx, MilestoneToast.tsx) deleted. `node_modules/` and `dist/` are NOT committed for this project (private deploy; first run needs `npm install`).

## 4_chunbai (active work)

- `new_game/` — the real app: Vite 6 + React 19 + Three.js + Tailwind + zustand. Dev server on port 3000 (`vite.config.ts`). Source in `new_game/src/`: `core/` (platform-agnostic, zero THREE/DOM/store: `types.ts`, `constants.ts`, `math.ts`, `data/` tables, `simulation/` = Simulation + enemyAI + bossAttacks + events, `world/` = WorldManifest + tokenizers), `engine/` (platform adapters: GameEngine orchestrator, SceneManager, InputManager, AudioManager, postfx), `store.ts`, `components/`. C.A.T architecture: `core/` is the pure game core, `engine/` binds it to the Web platform; DEV builds expose `window.__gameManifest()` (world-as-text) and `window.__sim`.
- `new_game/design-doc.md` — the spec, but its file tree (`systems/`, `entities/`) predates the implementation; actual code lives in `core/` + `engine/`. Follow the code, not the doc's tree.
- `src/` (4090 files) — FFDec-decompiled original Flash resources (sprites, shapes, sounds, scripts, symbolClass, ...). **Reference only — never edit; not part of the Vite build.**
- `reference/` — original game assets: `206206.swf`, `纯白枪骑兵2011 .exe`, `ffdec/` decompiler, screenshots, and `d.md` (original controls/gameplay notes: WASD move, mouse aim, LMB shoot, R/F vertical, Q boost, E brake, Space intercept missiles, 1-4 weapons, Z AI mode, Enter pause). Source of truth for remake fidelity.

## Commands

- `5_gamejam_1`: `npm run dev` (port 5173), `npm run build` (= `tsc -b && vite build`), typecheck: `npx tsc -b --noEmit`, tests: `npm test` (vitest run — suites live next to code: `src/core/simulation/*.test.ts`, `src/engine/*.test.ts`). Typecheck + tests are the verification gates.
- `4_chunbai/new_game`: `npm run dev` (port 3000), `npm run build` (= `tsc -b && vite build`), typecheck: `npx tsc -b --noEmit`. No test suite — typecheck is the verification gate.
- `6_patapong3D`: `npm install` (first time, node_modules NOT committed unlike 4_chunbai), `npm run dev` (port 5183), `npm run build` (= `tsc -b && vite build`), typecheck: `npx tsc -b --noEmit`. No test suite. Intro-scene scope cut 2026-08-09; v2.0 work tracked in `verification-report.md`.
- `1/`: `npm run typecheck`, `npm run test:unit` (vitest), `npm run test:e2e` (playwright), `npm run lint` (eslint), `npm run format` (prettier).
- `2/game/`: `npm run typecheck`, `npm run test` (vitest run), `npm run test:e2e` (playwright).
- `3/`: `npm run build` (= `tsc && vite build`), `npm run test` (vitest), `npm run lint`.

## Git quirks

- Default branch is `master`; remote `github.com/yhyu13/VibeGames`.
- **Parallel sessions**: multiple sessions work this repo concurrently. `4_chunbai/` routinely has dozens of uncommitted changes (source refactors, screenshots, committed `node_modules/.vite` churn) from other sessions — never stage/commit 4_chunbai paths unless your task is 4_chunbai. `git commit` may fail with a transient `index.lock` (another session's) — retry; never delete the lock while a session is active.
- `4_chunbai/new_game/node_modules/` (5777 files) **is committed** — don't delete it, and a plain `npm install` is not needed. Projects `1`/`2`/`3` ignore node_modules via their own `.gitignore`; `5_gamejam_1` also ignores node_modules (own `.gitignore`: node_modules/, `.kilo/`, `.vite/`).
- Build output `4_chunbai/new_game/dist/` and `5_gamejam_1/dist/` are committed (index.html + hashed assets) — commit rebuilt dist alongside source changes.
- Root `.gitignore` only ignores `.playwright-mcp/`. There is no `kilo.json`.
- `registered_agents.json` / `task_agent_mapping.json` (at root and in `4_chunbai/`) are multi-agent workflow bookkeeping, currently empty `{}` — leave alone unless orchestrating agents.
- `kimi3.md` — research notes on the KIMI3 DDD multi-agent game-gen workflow this repo follows (design docs → scaffold → parallel coder agents on git branches → tsc self-validation → build). `game-page.txt` — accessibility-tree dump of the deployed game page (used to verify deployments).

## Multi-agent workflow lessons (hard-earned, kimi3.md + 5_gamejam_1 session)

- **Agent Manager worktree mode can silently fail or take minutes**: the repo includes 4_chunbai's committed node_modules, so each `git worktree add` materializes 10k+ files. Fallback that works: create worktrees manually (`git worktree add -b agent/<name> C:\Git-repo-my\VibeGames-wt\<name> master`), then start local-mode sessions or `task` subagents pointed at those worktrees. Clean up with `git worktree prune` + deleting leftover dirs.
- **Split big tasks into atomic chunks**: one-file/one-system tasks (e.g. "Simulation orchestrator" vs "6 pure modules") survive model output limits; monolithic prompts fail silently with no files written. Per-batch commits with `npx tsc -b --noEmit` green (feitian style: each batch = one commit + tsc).
- **Frozen contracts first**: transcribe the TDD's type/constant/event contracts into real TS stubs before fanning out coders; agents then compile against real signatures and empty data tables must be tolerated gracefully (fallback paths).
- 5_gamejam_1 stretch features: 癫狂戏剧 script + hidden ending are **implemented and ON** (`STRETCH_FLAGS.madScript` / `STRETCH_FLAGS.hiddenEnding` = true in `src/core/constants.ts`, shipped in M5); `playerTyping` remains off. Check the flags before assuming a stretch feature is unavailable.

## Conventions

- Each project ships a design doc (GDD/TDD, or `design-doc.md`) that drives development; keep them in sync with code changes (`verification-report.md` updated per milestone in 4_chunbai and 5_gamejam_1).
- Assets are procedural (procedural geometry, Web Audio synthesis, zero asset files); original Flash assets are reference-only for fidelity.
- TypeScript strict everywhere; pass `tsc` typecheck before committing.
- Browser smoke tests use the kilo-playwright MCP against the dev server: title → WAIT → SENSE → PERFORM → EVALUATE → DIARY → ENDING, zero console errors; DEV builds expose `window.__gameManifest()` / `window.__sim` for state checks.
