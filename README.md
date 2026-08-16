# VibeGames

A monorepo of standalone web games — remakes of half-remembered Flash classics, 72-hour game-jam experiments, and straight-up physics flexes. Every project is its own Vite app with its own `package.json` and build; no two games share a world, but all of them share a discipline: **zero runtime assets** (procedural geometry, Web Audio synthesis, pure TypeScript) and a **C.A.T architecture** (a platform-pure `core/` wrapped by engine adapters and thin React overlays).

There is no root `package.json`. Run `npm` inside the project you want to play.

---

## The games at a glance

| Dir | Game | The vibe | Status |
|---|---|---|---|
| `1/` | Alien Invader | You are the invader. Earth is the target — and it fights back. | Complete |
| `2/` | Alien Invader (zustand) | Same war, different engine. | Playable |
| `3/` | Alien Invader (no React) | Pure Three.js invasion loop. | Playable |
| `4_chunbai/` | 纯白枪骑兵 Pure White Lancer | A white mech, black void, and a war-march with a hidden ambush. | Active |
| `5_gamejam_1/` | Boss 的焦虑 Boss Anxiety | You are the final boss — and you're terrified of being a bad performance. | Shipped |
| `6_patapon3D/` | Patapong 3D | You are the divine drum; the army obeys only the beat. | Intro showcase |
| `7_hotlineShanghai/` | 热线上海 Hotline Shanghai | Hotline Miami, 1937 Shanghai, real light physics. | Intro polished |
| `8_lifegame/` | 股神模拟器 Stock God Simulator | The birth lottery is the game mechanic. | Intro complete |
| `9_3dplatform/` | PRISM LEDGE 棱镜断崖 | A collectathon where the ray tracer is the point. | Design-doc only |
| `10_phasewalk/` | PHASEWALK 四相行者 | Four worlds stacked like paper; switching phase is switching level. | In progress |
| `11_blackhole/` | Kerr 旋转黑洞 | A spinning black hole, ray-traced per pixel, in your browser. | Playable |

---

## 1. Alien Invader

**You are the invader this time.** An alien warship hangs in orbit over a stylized Earth, and the planet is not a passive health bar — it hardens infrastructure, fills orbit with hazards, and eventually fires nuclear missiles straight up your hull.

Raw firepower is only one path. Between bombardments you broadcast propaganda to turn humanity against itself and inject computer viruses to cripple Earth's networks from within. The most elegant invasions are **puzzle-solved, not brute-forced** — sometimes the winning move is a weapon that is never fired. Roguelike by design: Earth's conditions, resistances, and defense archetypes are randomized, and every rogue mutation you stack makes you stronger while handing Earth a new way to hurt you.

*Three.js orthographic 2.5D, `@preact/signals-core` state, IndexedDB save/load, procedural WebAudio. The completed reference build this repo grew out of.*

## 2 & 3. Alien Invader variants

The same premise, rebuilt twice as engine experiments. `2/` re-implements it on Three.js + zustand; `3/` strips out React entirely for a bare Three.js take. Both keep the core loop: seven escalating days, an adaptive counter-engine that reads your habits and telegraphs its answer, and the choice between annihilation and infiltration.

## 4. 纯白枪骑兵 (Pure White Lancer)

A 3D remake of phixcat's 2008 Flash original — and a pure-white mech against pure-black void. WASD flight in full 3D, mouse-aimed gunnery, lock-on, and an afterburner dash that leaves Sandevistan-style afterimages as space-dust streams past to sell the speed.

It's a roguelite war-march: a four-tier node map where you pick your path up toward the final weapon — normal battles, high-risk elites, scarce resupply — while an **unannounced mid-boss** can crash the fight and burn the resources you'd saved for the end. Death takes everything but the route knowledge; only the starting three weapons persist. Resource anxiety is the design: "am I good enough" is a question you answer by the path you choose.

## 5. Boss 的焦虑 (Boss Anxiety)

You play the final boss of an RPG, sitting in your throne room waiting for the hero to arrive — and your real fear isn't losing the fight. It's **whether tonight's performance was good enough**.

A 5–8 minute single-act about being seen. Pick a script — 庄重威严 / 癫狂戏剧 / 悲情独白 — then perform three attack phases while anxiety makes your hands tremble and your lines go blank. The audience watching on a B-station-style barrage is both the crowd and the mirror. After the fight you rate yourself 1–5 stars and write in a diary; write "我不够好" three times and you unlock the hidden ending: the boss refuses to fight and asks, *"你为什么一定要杀我?"*

## 6. Patapong 3D

**You are the divine drummer.** W/A/S/D are PATA / PON / DON / CHAKA — tap any drum on the beat (timing-only), string four beats into a command grammar, and your three tiny voxel Patapons march, attack, defend, and rally against Moloch.

PBR ceramic armies staged under a warm rim light on a dark platform, Fever slow-mo at combo 8/16/24, and an opening ritual where four beats wake the army in darkness and Moloch roars back. Pure Patapon spirit — the god conducts, the army obeys, and the boss telegraphs before it strikes.

## 7. 热线上海 (Hotline Shanghai)

Hotline Miami's one-hit-kill top-down frenzy, transplanted to 1937 Shanghai's occupied island period. Gunfire, oil lamps, neon signs, and explosions are **real 2D Radiance Cascades light sources** — a genuine WebGL2 radiance field, not a fake glow.

Cut the central lamp and the tower guard goes half-blind; slip through Shikumen alleys in an opera mask; every shadow is physically computed. Geometry line-of-sight decides who sees you — the light is purely cosmetic, and it's the most beautiful cosmetic in the repo.

## 8. 股神模拟器 (Stock God Simulator)

A Monopoly-style life-and-investing sim about **the birth lottery** — and it wants you to *feel* the gap, not be told it. Who you're born as (小镇做题家, in the Web 2.0 era) silently greys out the board cells you're even allowed to see: three finance cells sit right next to you, permanently locked behind who your parents are.

Each week is one dice roll, one arrival, one ⚡ world event, one trade on a mocked 2015 paper account, and one AI-coach reading of *why* you made that call. A parallel-fate card runs the same dice as 金融世家 so you watch the counterfactual play out turn by turn. The investment advice is earned — zero reviewed trades means the coach says 「看不懂」, and cognition under 60 means trades teach you nothing.

## 9. PRISM LEDGE (棱镜断崖)

A 3-minute-per-island precision platformer collectathon where **the ray tracer is the selling point**. You are the last lantern keeper, climbing three sinking dusk islands to relight the great lighthouse — and the mirror-smooth tide pools, glass prisms, and burnished brass aren't decoration, they're the light physics that makes every jump readable.

Two render tiers, one game: a guaranteed raster PBR fallback ships everywhere, and a **self-authored WebGPU TSL ray tracer** (true reflections, up to two bounces) layers on top when the browser allows. Thirty prisms — two per island visible *only in reflections* — plus a dash and a slow-mo, all under a fixed 3/4 camera that turns every island into a screenshot.

## 10. PHASEWALK (四相行者)

A 3D platform-puzzle where **four worlds are stacked like sheets of paper, all visible at once**: solid, liquid, gas, plasma. You stand only on your own phase — switching phase is switching level, and air-switching (**相弹**) is your double-jump with momentum conserved.

Rendered in toon paper-cut shadow-puppet style — one幕布 lamp, ink outlines, ghost layers drifting at 15% alpha. Five floors of the 四相塔, 20 相尘 to collect, and bullets that kill you, disperse around you, pass straight through you, or bounce back to destroy the emitter — depending on the phase you chose to be standing in.

## 11. Kerr 旋转黑洞 (Black Hole)

Not a game — a love letter to general relativity. Every pixel is a ray numerically integrated along Kerr geodesics, rendering a **spinning black hole in real time**: the full Einstein ring, the asymmetric D-shaped shadow warped by frame-dragging, the dragged accretion disk, and the nested photon ring.

Drag to orbit, zoom to fall in, and tune spin â from 0 (Schwarzschild) to 0.998 to watch the shadow slide off-center toward the prograde side. The HUD computes real physics — Schwarzschild radius, inner/outer horizon, ergosphere, prograde/retrograde ISCO — while the light does what Einstein said it would.

---

## The craft

Every game is built on the same self-imposed rules:

- **Zero runtime assets.** No images, no models, no audio files, no network calls. Geometry is procedural, textures are generated, and every sound is synthesized in Web Audio.
- **C.A.T architecture.** A platform-pure `core/` (types, constants, data tables, simulation — no THREE, no DOM, no React) wrapped by `engine/` adapters and thin `components/` overlays. The rules are editable as data; the world can be dumped to text via `window.__gameManifest()` in DEV builds.
- **Doc-driven.** Each project pairs a GDD (design authority) with a TDD (frozen technical contract). Code and docs ship in the same commit.

## Running a game

```bash
cd <dir>          # e.g. cd 7_hotlineShanghai
npm install       # first run only (most projects don't commit node_modules)
npm run dev       # open the printed localhost URL
```

| Project | Dev port |
|---|---|
| `4_chunbai/new_game` | 3000 |
| `5_gamejam_1` | 5173 |
| `6_patapon3D` | 5183 |
| `7_hotlineShanghai` | 5184 |
| `8_lifegame` | 5185 |
| `9_3dplatform` | 5186 |
| `10_phasewalk` | 5187 |
| `11_blackhole` | 5188 |

`1/`, `2/game/`, and `3/` run their own Vite dev servers — see each project's own README for its commands. `npm run build` = `tsc -b && vite build` everywhere; `npx tsc -b --noEmit` is the typecheck gate.

---

## Not games (but part of the repo)

- `learning/blindside/` — a learning exercise on 2D light/shadow visibility, the seed that grew into Hotline Shanghai's Radiance Cascades pipeline.
- `references/sprite-gen-vaporwave/` — generated sprite references for Hotline Shanghai.
- `kimi3.md` — research notes on the KIMI3 document-driven, multi-agent game-gen workflow this repo follows.
