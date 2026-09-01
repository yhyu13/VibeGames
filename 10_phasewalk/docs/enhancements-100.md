# PHASEWALK 100-Item Prioritized Enhancement Roadmap

> Grounded on real shipped systems: `src/core/simulation/bullets.ts` (相灵弹 emitter + phase interaction), `src/core/simulation/GameSim.ts` (fixed-dt reducer + death/gate policy), `src/core/simulation/traps.ts` (phase_lock/phase_fence), `src/core/data/levels.ts` (F1–F5 + frozen boss records), `src/engine/ToonRenderer.ts` (full-hue toon ramp pipeline), `src/engine/PaperFX.ts` (paper grain). Current gap driving P0: the boss is frozen emitter data, there is no real loss state, and no win/goal beyond the golden gate.

## P0 — Make it a game with stakes (25)

- [P0] Convert frozen boss into a real active enemy — `levels.ts` boss records are static emitter data; a moving AI core turns 石翁/流姬/息童/焰司 from data into fight.
- [P0] Give the boss a chase/hunt behavior — today `aim:'player'` only tracks aim; a boss that closes distance creates real threat instead of a fixed turret (bullets.ts already supports reflect-kill).
- [P0] Add a real loss state via HP — `PlayerState` has no HP; 3–5 hearts on solid-hit turns "被吃相" into recoverable drama instead of a single silent respawn.
- [P0] Add fall-death — ground collides for all phases (collision.ts), so plunges are free; a pit-kill gives movement a cost and makes 无相区 meaningful.
- [P0] Add a lives/continue system — one death per jump is high friction; 3 lives per floor with a soft checkpoint makes boss practice fair.
- [P0] Make the golden gate a true win — `checkGate` in GameSim.ts flips to 'victory' with no real ending; a completion payoff (score, time, fanfare) closes the loop.
- [P0] Gate the exit on defeating the boss — the boss guard must be reflect-destroyed to pass (boss flag already blocks); enforce it as a designed boss-gate, not an optional ignore.
- [P0] Build a reusable enemy body/state model — emitters have no position channel for movement; an enemy entity (body + phase + HP + AI) is the substrate all P1 variety needs.
- [P0] Add enemy contact damage/knockback — a live enemy that lands on the player adds a second threat axis beside bullets (bullets.ts is currently the only damage source).
- [P0] Teach the reflect-to-kill loop as combat — plasma reflect (bullet.ts `reflected`) is the boss solver; a dedicated tutorial teaches it as an attack, not a puzzle quirk.
- [P0] Boss telegraphing/wind-up — bullets fire on a bare `interval`; a telegraphed lunge gives the player a readable dodge window and makes fights feel fair.
- [P0] Per-floor boss intro flip — a boss cut-in card per F1–F5 (like LayerIntro) frames each fight as the floor's climax and explains its phase counter.
- [P0] Player hit-recovery window (invulnerability frames) — respawnAtSpawn then instant re-hit is brutal; brief post-hit i-frames keep death readable and repeatable.
- [P0] Losing state clarity — a "how you died" readout (被吃相 / 无相区 / 燃尽) so the loss teaches rather than feels arbitrary.
- [P0] Zone-1 pacing pass — start the on-ramp gentler (fewer emitters on F1) so a new player learns phase-switch before combat; F1 currently stacks teaching bullets + boss + password gate.
- [P0] Boss attack variety per floor — each 守层者 should express its phase's antithesis (石翁 reshapes terrain, 流姬 drains liquid) per expansion-plan §2.3, not just fire faster.
- [P0] Enemy targeting that respects the player's phase — a boss that switches its own aim/overtone when you switch forces the 对抗式切相 loop into the boss fight.
- [P0] Success payoff on boss kill — a reward (shard burst, dust fountain, gate visual open) that makes the kill feel like a milestone, hooked into step/emitter events.
- [P0] Warm-up/soak tuning so a boss fight fits in a floor — bosses spawn near the exit at y≈8; rebalance arena size so a fight has room to dodge.
- [P0] Loss = progress state, not just frustration — death should return the player to a sensible reachable point, and the scoreboard should treat deaths as a visible stat (already tracked via `deaths`).
- [P0] Move the boss onto the floor's verb — put each boss fight in the terrain of its phase (stone steps / water column / wind shaft / flame net) so the climb and the battle are one idea.
- [P0] First enemy appears before the first boss — a basic moving enemy introduces combat before 石翁, so the boss isn't the first threat a player ever fights.
- [P0] Win-screen stats: time + min-switch + deaths — `elapsed`, `switches`, `deaths` already accumulate; surfacing them makes the golden gate a real scoring finish.
- [P0] Make phase-bullet reflection a deliberate attack (not accidental) — a plasma absorb that auto-homes needs a satisfying kill loop; tighten the absorb window so it feels earned.
- [P0] Difficulty ladder: boss HP scales but the solver stays pure — keep "reflect to kill, phase to survive" as the constant; tune number, never the rule (anti-feature: no stat-grind).

## P1 — Content, variety, and juice (40)

- [P1] Boss fights get real phases (arena gimmicks per boss) — each fight's arena reinforces its phase, turning every 守层者 into a mini-teaching-set piece.
- [P1] Unit variety that leverages each phase layer — a solid-phase chaser that walks the stairs, a liquid-phase skimmer, a gas-phase drifting wisp, a plasma-phase burst jumper; each counters a different verb.
- [P1] Enemies that switch phase to chase you — a hunter that mirrors your current phase forces same-layer awareness instead of pure bullet-dodge.
- [P1] A dedicated "carrier" enemy you must phase-host — a bullet sponge you have to intercept with the right phase over bullets.ts' phase rules.
- [P1] NG+ descending tower (M2+) — climb from F5 down with reversed phase order; fresh difficulty from an existing verb set (expansion-plan §3.4), near-zero new systems.
- [P1] NG+ enhanced boss variants — bosses gain one new attack in NG+, reusing the enemy AI you build for P0.
- [P1] Ending A / Ending B selection — the 20-dust "all or minimal" vote already exists in expansion-plan §3.3; wire the totalPhaseDust count into the victory screen.
- [P1] Dual-ending content: reunify vs coexist — two distinct end cards + a shard-flavor epilogue, so the dust economy has narrative weight.
- [P1] Expand shards toward a 6-zone map progression — the E0 tower is an intro-scene demo; the 盐滩/运河城/风谷/雷原/无相荒原/裂变眼 zones (expansion-plan §3.1) are the real campaign.
- [P1] Zone system stub: selectable zone hub — a map screen that gates zones behind tower clears, giving the game a body beyond 5 floors.
- [P1] More dust/collectibles per floor — currently exactly 4 shards; add optional secret dust (15–20) with a completion tracker to reward exploration.
- [P1] Dash/combo juice: momentum-preserving phase-cancel — a switch mid-jump that keeps velocity (相弹 momentum rule in phasePhysics.ts) chained into a satisfying "combo of verbs".
- [P1] Hit-stop / freeze-frame on reflect-kill — a 60–90ms freeze on a destroyed emitter (bullets.ts `destroyed`) adds punch to the plasma solver.
- [P1] Combo counter on chains — silent-timed switching is invisible; a small "x2 x3" flourish rewards rapid verb-modulation and gives speed-runners a skill lever.
- [P1] Screen shake on death / burst — burst (plasma 爆冲) and boss kills deserve camera feedback; CameraRig is the natural home.
- [P1] Particle feedback per verb — PaperFX/ParticleSystem already exist; give jump/swim/hover/burst distinct trails so the movement verbs read (currently feedback is minimal outside audio).
- [P1] Audio layer: adaptive music per phase — switch the music bed on phase change; the four-phase switch is a strong musical cliff.
- [P1] Audio layer: positional enemy cues — a steered SFX for incoming bullets/boss tells the player where the threat is without reading the screen.
- [P1] Boss theme sting per 守层者 — each boss gets a one-shot musical intro, escalating tension on the final floor.
- [P1] Depth-of-field / vignette on danger (low HP) — an HP system needs a screen-state signal so low-health moments feel urgent.
- [P1] Phase-switch visual flourish via the toon palette — reuse PHASE_PALETTE (ToonRenderer.ts) for a brief full-screen tint wipe on switch; cheap and very on-brand.
- [P1] Emitter/boss destroyed animation — a PaperFX burst when a reflected bullet destroys an emitter; right now destroyed state just culls (bullets.ts splice).
- [P1] Shadow/ghost trail for the double-jump — the ghost-layer pipeline (ToonRenderer.ts) can render an after-image for the air-swap/jump, teaching the timing.
- [P1] Password-gate feedback (correct vs wrong step) — stepPassword has events; give solved/wrong distinct audio + a pad flicker so the 密文石板 reads clearly.
- [P1] Fence/lock telegraphing — traps.ts is silent; draw an animated phase-fence border and a 相锁区 vignette so adversarial phase pressure is legible before you're inside.
- [P1] Extend adversarial traps past F3 — traps exist only on F3; add lock/fence combos to F2, F4, F5 so the 对抗式切相 theme recurs.
- [P1] Moving platforms (M2+ deferred) — `Platform.kind:'moving'` + `move` are typed but unimplemented; one moving platform per floor adds real level design range.
- [P1] Phase-fluid depth (M2+ 相液池) — solidifyFluids exists but only one pool in F1; a multi-pool bridge/drain puzzle is a natural second use.
- [P1] Resonant platforms (two-phase press) — typed in expansion-plan §2.2 as a local-coop semantic; implement the semantics as a balanced single-player phase puzzle.
- [P1] Progressive gate unlock narration — a short line per floor as you climb, tying the four 守层者 into the 相核 story.
- [P1] Boss HP bar / 守层者 meter UI — HUD.tsx is solid; add a boss meter so the player sees the reflect-progress and understands the fight.
- [P1] Speed-run timer mode with min-switch leaderboard — `bestSwitches` is per-layer and `switches` run-cumulative; a tracked speedrun rank directly rewards the "fewest switches" skill (expansion-plan §3.4).
- [P1] Replay/ghost of a best run — reuse the fixed-dt GameState to replay inputs; a ghost teaches optimal verb chains.
- [P1] Difficulty select (casual / normal / expert) — tune emitter interval + boss HP/tracking aggressiveness; solves the "one death = restart" friction for casual players.
- [P1] Casual mode: extra i-frames + no fall-death — gives a lower-stakes on-ramp without changing the core rules.
- [P1] Enemy telegraph colors keyed to phase — a hunter about to mirror your phase flashes that phase's palette; uses the existing 4-color system for readability.
- [P1] Player death cause funnel + tips — the "how you died" (P0) expands into a short tip ("try gas next time") that turns a loss into a lesson.
- [P1] Burst-launch air cancels for advanced movement — a plasma burst that can be buffered into a second burst creates a skill ceiling within the existing burstBuffer system.
- [P1] Collectible token currency for the 相尘 shop — expansion-plan §3.4 skins that change the toon palette (never mechanics); turns dust into a reward loop.
- [P1] Phase-skin cosmetics — recolored PHASE_PALETTE per unlock; fully procedural (zero assets), drives the shop without touching gameplay.

## P2 — Platform, accessibility, polish (35)

- [P2] Full mobile touch controls — a swipe/phase-wheel + jump button; RadialMenu.tsx already shows the phase wheel can be tapped.
- [P2] Responsive HUD for small screens — HUD.tsx and RadialMenu need a compact layout; the game is web-first so phone-play matters.
- [P2] Color-blind mode via phase icons + not just hue — the four phases differ mainly by ramp hue in ToonRenderer.ts; add distinct glyphs/patterns so color-blind players can read layers.
- [P2] High-contrast outline toggle — the inverted-hull outline already exists (ToonRenderer.ts); a thicker accessibility preset helps low-vision users.
- [P2] Remappable controls — InputManager is fixed; exposure to rebinding is cheap and expected.
- [P2] Text scaling / UI size options — small HUD text is an easy win for accessibility.
- [P2] Reduce-motion toggle — suppress screen-shake, flashes, and depth-of-field; important for vestibular-safe play.
- [P2] Subtitle/caption the audio cues — every phase/boss sting gets a text caption for hard-of-hearing players.
- [P2] Screen-reader-friendly menus — the menu flow should announce focus; the DOM-based HUD can support ARIA.
- [P2] Pause menu polish — PauseScreen.tsx exists; add settings (volume, rebind), controls reference, and quit-to-menu.
- [P2] Performance: instanced emitters/bullets — bullets.ts allocates objects per shot; an object pool or instanced mesh cuts GC churn on dense F4.
- [P2] Performance: fixed-draw-call batching — there are many `static` boxes; merge platform geometry so the toon pipeline stays at 60fps.
- [P2] Performance: shadow filtering config — createRenderer sets BasicShadowMap; test PCF for quality without the perf cliff.
- [P2] Performance: LOD/outline culling for distant enemies — cull outline shells beyond a camera distance (CameraRig) to keep boss arenas cheap.
- [P2] Texture-atlas the paper grain — PaperFX grain per-material; a shared grain atlas reduces binds in the toon pass.
- [P2] Dev save/quickload — storage.ts exists; add a dev-flag quick-save to skip a floor while tuning.
- [P2] Visual timeline scrub in devtools — devtools.ts can plot the fixed-dt steps; a scrubber speeds up playtest iteration.
- [P2] Deterministic replay harness — GameSim is a pure reducer; an input-capture harness enables bug-fix reproduction before shipping.
- [P2] Web Audio unlock / routing fixes — AudioManager should handle browser autoplay-policy unlock on first input.
- [P2] Audio ducking during heavy combat — lower the music bed when bullets/bosses are active so the phase cues stay audible.
- [P2] Kill the diagonal-movement dead-feel — a tiny camera lag or aim assist (CameraRig) reduces the floating feel on tight jumps.
- [P2] Landing dust puff — recreate a small PaperFX puff on `landed` (StepEvents already returns it) so landings ground the player.
- [P2] Burst launch flash + plume — particle+paper flash on plasma 爆冲 makes the launch verb feel weighty.
- [P2] Swarm/hopper low-detail enemy for dense floors — a cheap moving enemy that reuses the enemy body without boss complexity.
- [P2] Tutorial UI: phase-verb callout cards — LayerIntro exists; one-line verb cards ("固=跳 / 液=泳 / 气=飘 / 焰=爆冲") on the intro make the verb set explicit.
- [P2] Onboarding easter-egg-free first run — keep the first 30s threat-free so the phase-switch itself is absorbed before combat.
- [P2] Crowd-friendly "one more try" cadence — a short restart-to-floor (already in GameSim.restartLayer) tuned to be near-instant, so retries feel fast, not punitive.
- [P2] Localization-ready string table — the text is Chinese-first (layer names, HUD); externalize strings so a localize pass is trivial.
- [P2] i18n: English / zh-CN toggle — cheap given the string table; opens the demo to the non-Chinese audience.
- [P2] Save-file schema + migration path — storage.ts persists bestSwitches/totalPhaseDust; version the schema so future zones don't break saves.
- [P2] Analytics-lite: deaths/first-gate funnel (opt-in) — local telemetry to find where players get stuck, guiding the pacing P0 fixes.
- [P2] Accessibility: no-timing puzzle variant — offer a permanent "step" mode for password gates so they never hard-block on reflexes.
- [P2] Physics stall-guard — a stuck-in-geometry escape key (respawn to last grounded point) keeps glitches from soft-locking a run.
- [P2] Music muffle behind menus — courtesy audio handling when PauseScreen/S radial is open.
- [P2] Cleaner loading / no-asset boost — the game is procedural, so a fast, dependency-free boot is a selling point; keep scripts lean on Vite.
- [P2] Docs: from intro-scene to campaign pitch — write a short "this became a game" framing (expansion-plan §1 milestone table) so the P0 core-loop reads as a pitch, not a tech demo.
