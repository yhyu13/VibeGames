# Patapong 3D - Verification Report (v2.0 divine drums)

> Date: 2026-08-09. Replaces the v1.0 report after the user's "Go B"
> decision: real Patapon DNA (4-beat command grammar, army vs boss).

## 1. TL;DR

v2.0 is implemented and verified headlessly:

- timing-only drum judgement (any key on the beat);
- 10-command grammar resolves on the 4th beat;
- 3-unit army (15 HP) vs Moloch (24 HP) with telegraph/defend/retreat/enrage;
- strategy matters: ATTACK spam loses, a defend/rally/attack cycle wins;
- idle play loses to boss auto-pressure in ~42s;
- intro scene: darkness -> click-to-start -> title -> 4-beat awakening
  (timing-only) -> Moloch roar -> menu;
- typecheck + production build green.

## 2. Automated gates

| Gate | Command | Result |
|---|---|---|
| Typecheck | `npx tsc -b --noEmit` | PASS, 0 errors |
| Build | `npm run build` | PASS, 2.18s; `index-Db8TQdBN.js` 748.6 kB (gzip 203.6 kB) |
| C.A.T audit | rg over core/components | PASS (no forbidden imports) |
| Stale-ref audit | rg aiRhythm/paddle/BALL/playerHit | PASS (only comments/legit strings) |

## 3. Gameplay verification (headless harness, seed 7)

### 3.1 Strategic play wins

Perfect timing; heuristic: march twice -> berserk once -> defend dangerous
telegraphs -> rally at low HP -> attack otherwise.

| Metric | Result |
|---|---|
| Time to VICTORY | 49.0s |
| Final HP | army 3 / Moloch 0 |
| Command mix | MARCH x2, BERSERK x1, ATTACK x4, RALLY x2 |
| Fever | 3x triggered (combo 8/16/24); max combo 36 |
| Boss turns | 9 telegraphs/attacks, enrage hit, all counterplay events fired |

### 3.2 Attack spam loses (strategy matters)

Perfect timing but ATTACK every command:

| Metric | Result |
|---|---|
| Outcome | DEFEAT at ~32s (army 0, Moloch 7.5) |
| Cause | no DEFEND/RALLY; boss attrition outpaces damage |

### 3.3 Idle loses (boss pressure)

| Metric | Result |
|---|---|
| Outcome | DEFEAT at ~42s |
| Boss attacks | 7 (auto-turn model) |
| Player misses | 33 (beat expiry) |

### 3.4 Unknown sequence

Random drums on every beat produce `commandFailed` (bar resets, combo kept)
and the chart keeps advancing - no deadlock.

## 4. What changed from v1.0

| Area | Change |
|---|---|
| Input | timing-only judgement (any drum on the beat); lane glyph decorative |
| Commands | 4-beat grammar, 10 commands in `core/data/commands.ts` |
| Combat | 3-unit army (5 HP each) vs Moloch (24 HP); proximity, fever, berserk scaling |
| Boss | telegraph/attack/enrage turn machine (`core/simulation/boss.ts`); `aiRhythm.ts` deleted |
| Turn model | pending attack lands when the next command resolves (DEFEND/RETREAT react); 6s stall fallback |
| Renderer | 3 army Patapons + scaled boss with horns (`VoxelRenderer` rewrite, 2 instanced meshes per character) |
| UI | HUD: boss bar, unit chips, command input slots, combo/fever; Menu: full command grammar preview; WinScreen: ARMY vs MOLOCH |
| Events | beatHit / commandResolved / commandFailed / bossTelegraph / bossAttack / bossHit |
| Storage | `patapong.v2.*` keys; `bossWins` stat |
| Balance | chart density 0.8-1.2 beats/s, NOTE_SCROLL_SPEED 1.6, boss 24 HP, RALLY +3, SLAM/FIREBALL toned down |

## 5. Known limitations / next steps

- **Visual smoke**: dev server/build green; a fresh browser pass is
  recommended before shipping (canvas render, boss telegraph visuals, HUD).
- **Balance**: verified winnable by a heuristic, but player feel needs a
  human playtest; tune via `core/constants.ts` (TDD 4.2-4.4).
- **Boss variety**: 3 attacks; more patterns are a recipe, not a rework.
- **No test suite** by project rule; the harness pattern above is the
  regression check.
- **v1.0 docs removed**: `MVP-PLAN.md` and `docs/design/01/03/04` were deleted
  on 2026-08-09 (superseded by GDD/TDD v2.0 + this report); v2.0 work is
  tracked here.

## 6. Sign-off

- agent-qa: verified 2026-08-09 (gates + harness)
- mavis: pending
- user: pending (playtest recommended)

## 7. Intro scene milestone (2026-08-09)

Implemented per `docs/design/05-intro-scene-plan.md`:

- `IntroDirector` (engine) owns the MENU-phase timeline: boot (CLICK TO
  START, autoplay-safe) -> title -> reveal -> awaken -> ready.
- Awaken = 60 BPM metronome, timing-only +/-200ms window; each hit opens one
  army eye; the 4th hit awakens the army (eyes flare, `commandResolve` +
  `audienceCheer`) while Moloch roars (`bossRoar` + white flash + shake +
  red particles).
- 4 drum pads added to the court (`DRUM_PAD_DEFS`), pulsing on every hit;
  `SceneManager` intro darkness/camera push; boss silhouette in the dark.
- UI: `IntroScene.tsx` renders the stages; the classic `Menu` appears after
  `intro.complete`; SKIP / click fast-forward.
- Gates: `npx tsc -b --noEmit` 0 errors; `npm run build` green (759.5 kB
  JS, 206.6 kB gzip).
- Manual playtest pending: user.

## 8. Intro-only recovery gate (2026-08-09)

The repository had regressed into a mixed v0.1 Pong / v2.0 intro state and no
longer passed TypeScript or production build. The user selected an
**intro-only shell** rather than restoring the complete v2.0 battle.

- Added a narrow intro runtime (`src/engine/IntroEngine.ts`) and isolated intro
  contracts/data (`src/intro/`) without deleting the dormant battle files.
- The active bundle now contains only the awakening ritual and its completion
  card; battle, HUD, rhythm chart, and command grammar are intentionally not
  reachable in this recovery build.
- `npx tsc -b --noEmit`: PASS, 0 errors.
- `npm run build`: PASS; 688.60 kB JS (187.21 kB gzip).
- Browser smoke at 1440x720: WebGL stage renders, intro overlay renders, SKIP
  reaches `RITUAL COMPLETE`, console has 0 errors.
- Visual assessment: composition and extreme-dark premise are readable, but
  character silhouettes remain primitive placeholders. P6 art polish is the
  next phase; image generation is not required.

## 9. Global voxel raytrace + battle revival (2026-08-10)

The v2 battle is live again: `main.tsx` runs the intro cinematic, then hands
the canvas to `GameEngine`. Both intro and gameplay render through the
`SceneRenderer` contract with `RaytraceAdapter` (global voxel DDA + moonlit
water) as default and `RasterAdapter` as automatic fallback (capability-probe
failure, or quality level 6 sustained 240 frames). Quality ladder 0-6: render
scale 1.0/0.8/0.66, water reflection sky-only, water waves 3->1, shadow 1-tap,
alternate-frame dynamic upload.

- `npm run harness` (tsc + check-voxel-physics + check-v2-battle): 35 PASS,
  0 FAIL.
- `node scripts/smoke.mjs` (Playwright 1.57 from the machine bun cache,
  headless chromium + swiftshader, dev server :5183): ALL PASS —
  - intro: boot -> W A W A four beats -> flight/impact -> title card
    (`PATAPON 3D` + final command/grade);
  - battle: MENU -> PLAY -> SONG -> deterministic `__sim`-driven ATTACK match
    -> MATCH_OVER (boss win, 24 hits, boss 7/24 HP) -> REMATCH -> SONG;
  - `?demo` route renders (route later removed with the patapong arena
    restyle, see below); mobile 390x844 boots;
  - zero console errors/warnings/pageerrors, zero texSubImage3D errors.
- Frame times under swiftshader (SOFTWARE GL — not representative of real
  GPUs): intro 1280x720 avg 177ms; battle 1280x720 avg 38ms; intro 390x844
  avg 62ms. The watchdog ladder visibly engaged under this extreme load
  (PerfBadge `RAYTRACE q6 · PARTICLE HALF · BLOOM OFF`) — degradation works
  as designed.
- Screenshots: `smoke/` (intro-water, intro-flight, intro-ending,
  battle-menu, battle-song, battle-matchover, battle-rematch, intro-mobile,
  demo).
- Real bugs caught by the smoke run and fixed:
  - capability probe uploaded a 2x2x2 R8 texture with default
    `UNPACK_ALIGNMENT=4`; strict GL (SwiftShader) rejected the 8-byte buffer
    and falsely fell back to raster — fixed with explicit
    `pixelStorei(UNPACK_ALIGNMENT, 1)`;
  - `mountainColor` early-return inside nested ifs tripped ANGLE X4000
    "potentially uninitialized variable" warnings — restructured to a single
    exit point.
- Manual playtest on real GPU: pending (user).

### 9.1 Patapon restyle of the battle arena (2026-08-10, user feedback)

User verdict: the raytraced battle arena still looked like v1 **patapong**
(neon floor / magenta ring / neon audience / neon pads). Deleted and restyled:

- `battleScene.ts` static layer is now a natural battlefield (grass/earth
  two-layer ground, background trees — same visual language as the intro);
  neon drum pads replaced by wooden war drums (earth body, hide skin, dark
  band; beat pulse kept).
- The `?demo` showcase (`src/demo/`, pure patapong stage disc) was deleted
  along with its `main.tsx` route; smoke script updated.
- `npm run typecheck`: PASS. `node scripts/smoke.mjs`: ALL PASS (same flows
  as §9 minus the demo route); new evidence shot `smoke/battle-song.png`.
