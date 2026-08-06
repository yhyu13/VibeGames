# AGENTS.md

Monorepo of standalone web game remakes (VibeGames). Each top-level directory (`1/`, `2/`, `3/`, `4_chunbai/`) is an independent Vite project with its own `package.json`, `node_modules`, and build. There is **no root package.json** — never run npm at the repo root; run commands inside the specific project dir.

## Projects

- `1/` — Alien Invader (completed). Three.js + `@preact/signals-core` + IndexedDB. Code at `1/src`. Docs: `1/GDD.md`, `1/TDD.md`, `1/README.md`.
- `2/` — alien-invader variant (Three.js + zustand). Code at `2/game/`; docs at `2/GDD.md`, `2/TDD.md`.
- `3/` — alien-invader variant (Three.js, no React). Docs at `3/GDD.md`, `3/TDD.md`; screenshots in `3/showcase/`.
- `4_chunbai/` — **active project**: Pure White Lancer (纯白枪骑兵), a 3D remake of the 2008 Flash game by phixcat.
- `5_gamejam_1/` — **game jam project**: 《Boss 的焦虑》(Boss Anxiety), 72h jam single-act emotional boss-fight (Three.js + React 19 + zustand + Web Audio, zero assets). Docs: `boss-anxiety-gdd.md`, `TDD.md` (frozen contract), `docs/design/01..05-*.md` (DDD), `verification-report.md`. Same C.A.T architecture as 4_chunbai: `src/core/` pure (simulation/ + world/ + data/), `src/engine/` adapters, dev server on port 5173.

## 4_chunbai (active work)

- `new_game/` — the real app: Vite 6 + React 19 + Three.js + Tailwind + zustand. Dev server on port 3000 (`vite.config.ts`). Source in `new_game/src/`: `core/` (platform-agnostic, zero THREE/DOM/store: `types.ts`, `constants.ts`, `math.ts`, `data/` tables, `simulation/` = Simulation + enemyAI + bossAttacks + events, `world/` = WorldManifest + tokenizers), `engine/` (platform adapters: GameEngine orchestrator, SceneManager, InputManager, AudioManager, postfx), `store.ts`, `components/`. C.A.T architecture: `core/` is the pure game core, `engine/` binds it to the Web platform; DEV builds expose `window.__gameManifest()` (world-as-text) and `window.__sim`.
- `new_game/design-doc.md` — the spec, but its file tree (`systems/`, `entities/`) predates the implementation; actual code lives in `core/` + `engine/`. Follow the code, not the doc's tree.
- `src/` (4090 files) — FFDec-decompiled original Flash resources (sprites, shapes, sounds, scripts, symbolClass, ...). **Reference only — never edit; not part of the Vite build.**
- `reference/` — original game assets: `206206.swf`, `纯白枪骑兵2011 .exe`, `ffdec/` decompiler, screenshots, and `d.md` (original controls/gameplay notes: WASD move, mouse aim, LMB shoot, R/F vertical, Q boost, E brake, Space intercept missiles, 1-4 weapons, Z AI mode, Enter pause). Source of truth for remake fidelity.

## Commands

- `5_gamejam_1`: `npm run dev` (port 5173), `npm run build` (= `tsc -b && vite build`), typecheck: `npx tsc -b --noEmit`. No test suite — typecheck is the verification gate.
- `4_chunbai/new_game`: `npm run dev` (port 3000), `npm run build` (= `tsc -b && vite build`), typecheck: `npx tsc -b --noEmit`. No test suite — typecheck is the verification gate.
- `1/`: `npm run typecheck`, `npm run test:unit` (vitest), `npm run test:e2e` (playwright), `npm run lint` (eslint), `npm run format` (prettier).
- `2/game/`: `npm run typecheck`, `npm run test` (vitest run), `npm run test:e2e` (playwright).
- `3/`: `npm run build` (= `tsc && vite build`), `npm run test` (vitest), `npm run lint`.

## Git quirks

- Default branch is `master`; remote `github.com/yhyu13/VibeGames`.
- `4_chunbai/new_game/node_modules/` (5777 files) **is committed** — don't delete it, and a plain `npm install` is not needed. Projects `1`/`2`/`3` ignore node_modules via their own `.gitignore`; `4_chunbai` has none.
- Build output `4_chunbai/new_game/dist/` is committed (index.html + hashed assets) — commit rebuilt dist alongside source changes.
- Root `.gitignore` only ignores `.playwright-mcp/`.
- `registered_agents.json` / `task_agent_mapping.json` (at root and in `4_chunbai/`) are multi-agent workflow bookkeeping, currently empty `{}` — leave alone unless orchestrating agents.
- `kimi3.md` — research notes on the KIMI3 DDD multi-agent game-gen workflow this repo follows (design docs → scaffold → parallel coder agents on git branches → tsc self-validation → build). `game-page.txt` — accessibility-tree dump of the deployed game page (used to verify deployments).

## Conventions

- Each project ships a design doc (GDD/TDD, or `design-doc.md`) that drives development; keep them in sync with code changes.
- Assets are procedural (procedural geometry, Web Audio synthesis, zero asset files); original Flash assets are reference-only for fidelity.
- TypeScript strict everywhere; pass `tsc` typecheck before committing.
