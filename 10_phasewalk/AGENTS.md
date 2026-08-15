# 10_phasewalk — Project AGENTS.md

> Project-level rules for agents working in this directory. The monorepo root `../AGENTS.md` is the umbrella rule set; this file is its child. Promoted from `9_3dplatform/concepts/05-phasewalk.md` on 2026-08-13.

## 1. One-liner

PHASEWALK (四相行者) — a 3D platform puzzle where **4 phase-layers (solid/liquid/gas/plasma) are visible simultaneously** like stacked sheets of paper; you stand only on your own phase, and switching phase = switching level. Air-switch (相弹) is the double-jump. Visual: **toon-shading 3D, paper-cut shadow-puppet style** (user preference; frozen in `docs/design/01-art-direction.md`). Ship scope: 5-floor 四相塔 intro scene, 7 verbs (4 move + 3 matter, 分离 frozen M2+) + switch, 20 相尘, 相灵 as 相灵眼 emitters + 相灵弹 bullets + 相位陷阱 (相锁区/逆相栅); full 相灵 bosses frozen to M3.

## 2. Scope discipline

- **This is NOT the 9_3dplatform PBR/RT project** — it is a toon-shading WebGL2 raster project. No ray tracing, no `MeshPhysicalMaterial` ceremony, **no bloom**. `MeshToonMaterial` + gradientMap ramp + inverted-hull outline is the whole pipeline (TDD §5). The art contract's forbidden list (art-direction.md §3.5) is binding: no reflections, no ghost blur, no Sobel main outline, no cross-phase colors.
- **4-layer legibility is the core risk** (review.md S/W①): current phase 100% alpha + ink outline; ghost layers 15% alpha, −40% saturation, 0.15m parallax, render radius 8m (TDD §4 toon params). Any change to these numbers requires the art-direction.md §4 validation gate (10 testers, ≥9/10 point at the solid layer within 5s).
- **One verb per milestone**: M1 = switch, M2 = 相弹 mastery, M3 = adversarial switching (expansion-plan §5). No new phases ever (4 相 = world boundary; 叠相 is a *combination*, not a 5th phase).
- **相弹 law is frozen**: momentum conserved, gravity multiplier switches instantly, zero special cases (TDD §4). Do not add velocity multipliers to make it "feel better" — tune gravity multipliers instead, and only via playtest numbers.
- Zero assets: procedural geometry + canvas-generated paper grain/ramp maps + Web Audio recipes. No test suite: `tsc -b --noEmit` + browser playtest are the gates.

## 3. Stack + commands

Vite 6 + React 19 + TypeScript strict + zustand 5 + three **0.185.0**. Dev server port **5187** (strictPort — 3000/5173/5183/5185/5186 taken). `npm run dev` / `npm run build` (= `tsc -b && vite build`). `node_modules/`/`dist/` NOT committed (own `.gitignore`); first run needs `npm install`.

## 4. Architecture (C.A.T)

`src/core/` platform-pure (types/constants, `data/levels.ts` + `data/sfx.ts`, `simulation/` = phasePhysics/collision/bullets/pickups/GameSim). `src/engine/` adapters: SceneManager (4-layer graph), ToonRenderer (ramp + outline + ghost swap), PaperFX, CameraRig (tower cutaway 3/4), InputManager, AudioManager, ParticleSystem, devtools (`window.__sim` / `__phase` / `__teleport` / `__shards` / `__beginPlay`), storage. `src/store.ts` (zustand) wraps GameSim; components = thin overlays. Fixed dt 1/60, deterministic.

## 5. Frozen contracts

`types.ts` / `constants.ts` / `data/levels.ts` immutable after M1 scaffold: `GameState`, `PlayerState`, `InputState`, `LayerData`, `stepPlayer()`, `step()`, and TDD §4 numeric tables (phase gravity multipliers, 相弹 law, toon params). Level content = data only. Doc set = JOURNEY.md (制作全景索引) + GDD.md + TDD.md + art-direction.md + story-world.md + review.md + expansion-plan.md; code changes must ship with doc changes in the same commit (intro-scene-until-perfect §5.7).

M3 thaw (2026-08-15, 相位陷阱 — adversarial switching): additive only, authorized by expansion-plan §5.3. New `Trap` type + `LayerData.traps` field in `types.ts`/`levels.ts`; new `simulation/traps.ts` (`resolveTraps` as a `step()` PRE-step + `isPhaseLocked`); `collision.ts` fence branch. No existing contract, step order, or TDD §4 table changed.

M3 thaw 2 (2026-08-15, 相灵守层者): additive — `Emitter.boss?: boolean`; `gateOpen()` now requires no live boss (shards ≥3 AND boss reflect-destroyed). The gate rule thawed from "≥3/4 相尘" to "≥3/4 相尘 AND no live 守层者". No step order or TDD §4 table changed.

## 6. Known simplifications (see TDD.md for the trace)

- 相灵 v0.2 = 相灵眼 emitters + 相灵弹 bullets; 相灵守层者 boss v0.4 (M3) = 追踪开火的守门眼（石翁/流姬/息童/焰司，F1–F4），焰相反射摧毁才开门
- 相位陷阱 v0.3 (M3) = 相锁区 (phase_lock: 区内禁止切相) + 逆相栅 (phase_fence: 只放行本相) — F3 息井教学两处
- No bloom/no point lights (皮影只有一盏幕布灯 — art contract)
- F1 启示厅 v4 = **compact central-tower hall (14×14m), four converging phase routes up the tower** (worldview-first 5-minute script, `docs/design/00-worldview-first.md` — the FIRST doc to read): 固=西面石阶跳 / 液=自由泳 / 气=开放缺口飘 / 焰=爆冲台+反射拆发射器; route platforms carry 锁链金 outlines (`Platform.gold`); gate needs 3/4 shards → must master ≥3 phases. **Ground collides for ALL phases — falling is NEVER lethal** (v2 void-death removed; that was frustration, not difficulty). Death = hazards (无相区 all-phase patches, 雷云 gas-only directional fence placed OFF the taught path) + 固相中弹 (solid-phase bullet hit), respawn at spawn + phase reset — never same-point retry. F2–F4 teach one phase each; F5 = 4-phase finale.
- Exit gate opens at ≥3/4 相尘 AND no live 相灵守层者 (M3: the floor's boss eye must be reflect-destroyed) — hardcore line still allows missing 1 相尘
- 无相者 absent from intro scene (narrative via the gray 无相区 at spawn)
