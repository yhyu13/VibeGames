# PRISM LEDGE — 100 项优先级增强路线图 (enhancements-100)

> 概念展 `9_3dplatform`（棱镜断崖）的提升路线。当前仓库**没有可玩的游戏**——只有 `GDD.md`/`TDD.md` 设计契约、`concepts/` 十二概念草稿、`showcase/` 十二张渲染截图、`concepts/README.md` 选型矩阵。P0 的全部关注点：**把 PRISM LEDGE 从概念展变成真正能跑的 three.js+Vite 平台跳跃游戏**。P1/P2 是其余 11 个概念的可玩展位、双层管线、音频/无障碍/榜单。
> 比例 P0/P1/P2 = 25 / 40 / 35。

## P0

- [P0] Scaffold three.js+Vite+TS+React project at repo root — `package.json`/`index.html`/`src/` up, dev server on 5186 (strictPort per `TDD.md`), because today the folder has no build and the game literally does not run.
- [P0] Boot strapped three `0.185.0` WebGL2 renderer + `three/webgpu` import map — the pinned stack in `TDD.md` is the two-tier foundation every later item builds on.
- [P0] PlayerController movement — WASD/arrows at 8 m/s with grounded accel/decel — the base verb every reading ("jump distance reads fair") in `GDD.md` §4 depends on.
- [P0] Jump (11 m/s) + variable jump height (release = velocity × 0.5) — precision-platformer verticality is the whole genre; `TDD.md` §4 freezes these numbers before code.
- [P0] Double jump (9.5 m/s) — the gap-crossing freedom that turns the three islands from corridors into playgrounds.
- [P0] Dash verb (Shift, 14 m/s × 0.18s = 2.5 m burst, 0.5 s cooldown) — the v0.1.1 merge from Aurora Ascent that `GDD.md` §6 records; it's the 4th movement verb.
- [P0] Coyote time 0.10 s + jump buffer 0.12 s — the two "fairness" inputs from `TDD.md` §4 that stop cheap-feeling ledge deaths.
- [P0] Slow-mo toggle (hold L, 0.5× up to 2 s, 8 s cooldown) while the island timer stays real wall-clock — the v0.1.1 accessibility + double-jump timing aid, and the speedrun-honesty contract.
- [P0] Fixed 3/4 low-angle follow camera at player+(0,4.2,6.5), damped spring, lookAt +1 — the Patapon homage frame that makes RT reflections visible every second (`GDD.md` §2).
- [P0] Pure physics/collision core (AABB + BVH solids, zero engine) — `TDD.md` §3 calls the pure core the ship contract; no physics lib.
- [P0] Three sinking islands modeled — Lighthouse Isle, Mist Harbor, Lantern Room — the frozen 3-island scope from `GDD.md` §2, each 2–3 min.
- [P0] Sinking-island idle animation + warm dusk atmosphere — the "sinking dusk islands" fantasy is the one-line pitch.
- [P0] 8 required 光棱 light-prism collectibles per island (24 total) — the required collect that gates each exit.
- [P0] 2 bonus 幽光棱 ghost prisms per island, visible ONLY in reflective surfaces — the v0.1.1 reflection-only gimmick that is PRISM LEDGE's signature mechanic.
- [P0] Exit gate opens on 8/8 prisms with a light-beam reveal — the beacon that closes each island's loop (`GDD.md` §3 beat 收集/登顶).
- [P0] Fall-below-island → respawn at last checkpoint, prisms kept, timer keeps real time — the speedrun-honest death rule from `GDD.md` §2.
- [P0] Checkpoint system + per-island checkpoint visual beacon/audio cue — the respawn anchor the whole loop rides on.
- [P0] localStorage save `9-3dplatform.v1.progress` (best times + prism counts) — the exact key `GDD.md` §2 freezes; this is the persistence contract.
- [P0] Speedrun timer (real-time, honest across slow-mo/respawn) — S/A/B ranking needs a trustworthy clock; slow-mo must not cheat it.
- [P0] GamePhase state machine level_intro → playing → pause → level_clear → victory — the five-beat skeleton in `GDD.md` §2 that orders every screen.
- [P0] Raster tier: PBR meshes + `MeshPhysicalMaterial` (clearcoat ceramic keeper, transmission glass, metalness brass/water) — the ship-guarantee tier `TDD.md` §1 locks for every browser.
- [P0] SSR screen-space ray-traced reflections (raster tier) — the mirror-glimpse that must exist even without WebGPU.
- [P0] WebGPU TSL compute ray tracer (BVH, 1 spp + temporal reprojection + bilateral denoise, 0.75× scale) behind `STRETCH_FLAGS.rayTracer` + `?rt=1/0` — the core engineering risk `TDD.md` §1 names as self-authored.
- [P0] RT↔raster ghost-prism read parity — ghost prisms must reveal on both tiers, "parity by construction" per `GDD.md` §2.
- [P0] HUD (prism counter, timer, checkpoint, RT badge) with Chinese-first UI text — the repo-convention Chinese UI `GDD.md` §2 requires.

## P1

- [P1] Booth 01 SHADOWSTEP playable — rotating lamp rewrites terrain via `raycastBvh` solidMap — RT-shadows-as-collision is the 3-star concept and a natural spike on the same BVH.
- [P1] Booth 02 ECHO FORGE playable — cast 2-seconds-ago echo platforms, 3 echoes live — the "stand on your own past" novelty from `concepts/README.md` 对比矩阵.
- [P1] Booth 03 FERRO playable — place N/S magnet poles, body trails as liquid-metal thread — the pure-field slide verb gives a distinct movement feel.
- [P1] Booth 04 KALEIDO playable — 6 mirrored selves share one input/one life, sync-lock to close petal platforms — the highest RT-theme fit per the selection matrix (★★★ true mirrors).
- [P1] Booth 05 PHASEWALK mini-moment — 4 stacked phase layers, air-switch momentum — already promoted to `10_phasewalk/`; a cheap tribute booth reuses the sim.
- [P1] Booth 06 SONAR playable — dual-frequency ping, 2-s vision, memory navigation — high-risk but a genuinely different "visibility is a resource" read.
- [P1] Booth 07 BONE TOWER playable — dismantle legs/arms as bone bridges, 6-bone economy — "body is consumable" is the most memorable case in `docs/exhibition.md`.
- [P1] Booth 08 COMPASS ROT playable — rotatable gravity, whip-swing with tangential momentum — motion-risk but razor-distinct from PRISM LEDGE's fixed up.
- [P1] Booth 09 JENGA REACH playable — pull blocks, tower tilts 15°, physics negotiation — the build-destroy climb from `docs/exhibition.md`, Plan B flagged.
- [P1] Booth 10 WEATHERVANE playable — one island, four season state-machines, winter freezes lake to a mirror — the strongest RT showcase (★★★ ice mirror) and a direct renderer showcase.
- [P1] Booth 11 INKLINE playable — draw red/blue/green ink platforms in the 1.2-s fall — the "path is drawn, not found" creativity verb.
- [P1] Booth 12 ORBITFALL playable — Kepler orbital platforming, eat debris to shrink orbit — pure-math sim closest to `01_shadowstep`'s "cheapest to build" read.
- [P1] Booth-select hub screen — pick any of 12 mini-moments from one menu — turns the concept exhibition (`docs/exhibition.md`) into an explorable kiosk instead of 12 disjoint scenes.
- [P1] Frozen "extreme moment" scene per booth — each booth opens on its one wow frame (e.g. `showcase/screens/06-sonar.png` 98%-black cave) before interaction.
- [P1] Booth 01 intro scene first — 12° low sun into a courtyard where 90% of ground is shadow — the exact intro-scene-until-perfect case that led `concepts/README.md` to rank 01 top.
- [P1] Procedural SFX catalogue — jump/double-jump/land/collect/checkpoint/gate/clear/fall recipes — the zero-audio-file constraint in `GDD.md` §2 needs synthesized cues, no assets.
- [P1] Procedural ambient pads — one per island (sea/dawn, harbor/dusk, lantern/night) — three 2–3 min islands need distinct mood without any audio file.
- [P1] Procedural ambient layer — wind, lapping sea, drifting fog — cheap depth that sells the sinking-dusk fantasy on hardware with audio.
- [P1] Feature-flag `STRETCH_FLAGS.rayTracer` auto-detect + graceful raster fallback on non-WebGPU browsers — the progressive-enhancement contract `GDD.md` §2 freezes.
- [P1] RT badge + `?rt=1/0` force toggle — the debug/test affordances `TDD.md` §5 specifies for the ray tracer.
- [P1] RT temporal reprojection + bilateral denoise — the accumulation-survives-moving-camera fix `TDD.md` records as a v0.1.1 change.
- [P1] RT adaptive resolution scale / 30 fps target on weak GPUs — the perf budget "adaptive drop to 30" line in `GDD.md` §4.
- [P1] Raster↔RT material/mood equivalence matrix + audit — the art bible `docs/design/01-art-direction.md` demands the raster tier look ~90% as good.
- [P1] Ceramic/brass/water/glass shader cheat-sheet pass — transcribe `6_patapong3D`'s PBR look onto real meshes per `GDD.md` §6 provenance.
- [P1] Post pipeline — bloom + vignette + film grain — the ACES-Filmic warm look is part of the ship definition, not polish.
- [P1] SSAO + 2048 soft shadows + low-angle warm sun — the light rig that makes jump readability (the whole thesis) possible.
- [P1] Screenshot/vista mode — freeze camera, export a clean frame — the RT tier doubles as "screenshot mode" per `GDD.md` §4 replayability.
- [P1] In-game debug camera + spawn teleport tool — the playtest harness behind `TDD.md`'s "browser playtest is the gate."
- [P1] Pause menu (mute, restart island, quit to menu) — the paused phase in `GDD.md` §2 needs real UI, not just a phase enum.
- [P1] Accessibility: remappable keyboard bindings — movement/access keys are person-specific; reroute cheaply and universally.
- [P1] Accessibility: slow-mo surfaced as an explicit timing aid toggle — the v0.1.1 slow-mo was merged partly for accessibility; make it discoverable.
- [P1] Accessibility: photosensitivity — reduce/disable bloom flash on collect and gate beam — flashes are frequent; a safe mode is non-negotiable.
- [P1] Accessibility: colorblind-safe prism distinction — required vs ghost prisms must differ by shape/pattern, not only hue — the ghost gimmick breaks if reflection-vs-reality relies on color.
- [P1] Accessibility: full-screen high-contrast HUD mode — timer/counter/checkpoint readability at a glance for low-vision players.
- [P1] Accessibility: assistive correct-angle / reduced move-speed mode — gentler tuning for players who find the precision platforming an obstacle.
- [P1] Gamepad input support — the M2+ route `GDD.md` §2 names; a platformer lives on a pad and it costs one input layer.
- [P1] Mobile/touch virtual joystick + jump/dash/slow-mo buttons — the M2+ route; widens the audience past desktop.
- [P1] Best-run ghost replay — replay your best run as a translucent keeper — the M2+ ghost replay `GDD.md` §2 punts; it's the fastest replayability win.
- [P1] Ghost-prism 100% tracker + per-island completion state — the 6 ghost prisms are the 100% chase; surface progress as a table.
- [P1] S/A/B rank by per-island time + total (S ≤ 1:30 / A ≤ 2:15) — the exact ranking band `GDD.md` §3 freezes.
- [P1] zh/en string table + Chinese-first UI copy pass — the repo-convention Chinese-first text needs an extraction path before any localization.

## P2

- [P2] Online leaderboard posting — submit best time + prism count to a tiny backend — the data-frozen leaderboard backend `GDD.md` §2 lists as not ship-reachable.
- [P2] Global leaderboard page (best time, 100%, ghost count) — makes the speedrun loop social and returns visitors.
- [P2] Settings: graphics quality tier (low/medium/high) — lets weak GPUs preselect raster vs RT without knowing WebGPU internals.
- [P2] Settings: resolution scale + DPR slider — ties into the 0.75× RT scale and the DPR cap in `TDD.md`.
- [P2] Settings: SFX/music volume sliders — basic but expected audio control; zero assets keeps it a pure mixer.
- [P2] Settings: screen-shake toggle + camera FX intensity — motion-safety for the fall/respawn bounce.
- [P2] Settings: language switcher (zh / en) — the i18n string table becomes user-facing, not just dev-facing.
- [P2] Fourth island (DLC/endgame) — the M2+ route in `GDD.md` §2 extends the 3-island arc into a real campaign.
- [P2] Shard magnet power-up — data-frozen in `GDD.md` §2; a collectible that pulls far prisms adds a traversal choice.
- [P2] Dash/wall-jump extra movement verbs — data-frozen; wall-jump was explicitly cut from scope and could return as depth.
- [P2] Moving hazards in Mist Harbor — the moving-platform island is the natural home for timed threat.
- [P2] Boss / clock-tower finale — data-frozen in `GDD.md` §2 gives the campaign a climax beyond pacing.
- [P2] Keeper skins (alternate lantern styles) — multiple cosmetic keepers with zero asset cost (procedural).
- [P2] Local achievement system — 100% island, ghost-prism hunter, sub-1:30 S-ranks as called-out wins.
- [P2] Ghost-prism hint toast on screenshot mode — turns the reflection gimmick into a teachable moment.
- [P2] RT denoiser upgrade to SVGF — the named M2+ upgrade `GDD.md` §2; cleaner reflections at same sample count.
- [P2] SSR/RT parity cleanup pass — close the residual visual drift between tiers the equivalence matrix flags.
- [P2] Mobile low-poly LOD + fog fade tier — keeps 60 fps on phones where the RT tier is off entirely.
- [P2] Cold-load shader prewarm (target ≤ 1.5 s) — the `GDD.md` §4 perf budget; compile hot shaders before first frame.
- [P2] Dev perf overlay (draw calls, tris, light count) — the ≤30 draw calls / ≤40k tris budget needs a live meter.
- [P2] Day-1 patch checklist run — the launch-checklist skill catches the small regressions a feature climb always leaves.
- [P2] Changelog + patch-notes ritual — keeps the "record real bugs once playtesting starts" promise in `GDD.md` §6.
- [P2] Post-launch balance pass — retune jump readouts / S-rank bands against real playtime data.
- [P2] WebGL1 geometry fallback tier — the oldest browsers get a workable frame instead of a black screen.
- [P2] Procedural audio engine upgrade (synthesized pads mixer with low-pass) — richer shore wind than raw oscillator loops.
- [P2] Spatial audio (PannerNode) — source collect chimes/falls in 3D so direction-of-next-prism becomes an audio cue.
- [P2] Mobile haptics (vibration on collect/fall) — cheap tactile feedback on touch devices.
- [P2] Ghost-prism directional indicator fallback — for players whose hardware/reflections can't show a ghost, a subtle "look here" marker preserves the hunt.
- [P2] Tutorial hologram / intro-scene replay — re-trigger the 5-second reflection reveal for onboarding.
- [P2] Text-to-speech for on-screen UI — reads timer/prism-count aloud for screen-reader-first players.
- [P2] Single-button / switch-input mode — one button performs context jumps; the far end of the accessibility spectrum.
- [P2] Screen-reader menu semantics (ARIA roles on HUD) — the UI overlays in React 19 need labels, not just visuals.
- [P2] 60 fps validation checklist on a mid desktop — the `GDD.md` §4 perf definition as a repeatable regression gate.
- [P2] Production build + deploy preview / itch.io embed pipeline — the repo has no deplol; a `vite build` artifact + embedded iframe makes it shareable.
- [P2] RT showcase marketing clip auto-generator — record a scripted ghost-glimpse beat to cut a 5-second promo GIF.
