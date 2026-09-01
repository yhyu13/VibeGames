# 7_hotlineShanghai — 100-item prioritized enhancement roadmap

Priority legend: **P0** = ship-critical / core-loop deepening. **P1** = high-value breadth (new systems, content hooks). **P2** = polish / accessibility / platform / experiments. Ratios ~25/40/35.

Grounded in read systems: enemy AI archetypes & flashlight-cone vision (`src/core/data/enemies.ts`), 8-weapon OHK table (`src/core/data/weapons.ts`), RC-as-gameplay light-smash/BLINDSIDE (`docs/design/01-concept-core-loop.md`, `09-blindside-integration.md`), noise broadcast system (`docs/design/27-noise-broadcast-system.md`), mission→room→S/A/B/C scoring (`src/core/simulation/mission.ts`), death-respawn (`src/core/simulation/pauseAndDeath.ts`), 6-mask roster, `engine/storage.ts`, `engine/AudioManager.ts`, `RcPipeline.ts`.

## P0

- [P0] Enemy dodge/flank behavior — currently `patrol→suspicious→alert` is linear; add strafe + perpendicular flank so rooms don't read as a firing line.
- [P0] Cover-seeking AI — `sandbags occlude vision but not sound`; have alerted enemies path to `X` cover tiles before shooting to make cover matter.
- [P0] Light-aware awareness tier — enemies already go 半盲 in dark; make them *actively retreat to lamplight* when a nearby lamp goes dark (BLINDSIDE core, in `enemies.ts`).
- [P0] Relight-response AI — lampmaker-adjacent: an enemy that hears a `lamp_smash` should run to relight/inspect, forcing the player to time the kill.
- [P0] Melee weapon feel pass — knife/bat share damage=1 and only differ in range/fireRate; give distinct hitboxes, knockback, and swing arcs.
- [P0] Weapon variety round 1 — add shot/scope/akimbo variants off the existing `WeaponSpec` (spread/projectileSpeed/ammo already structured in `weapons.ts`).
- [P0] Combo/multiplier scoring juice — `mission.ts` scores time/pickups/hits; add a kill-streak multiplier on top so clean speedruns feel rewarded.
- [P0] Style-links per room (HM signature) — award chained kills within a short window across rooms; feeds the existing S/A/B/C rating.
- [P0] Kill feedback juice — hit-stop, red flash direction, camera kick; the OHK combat in `weapons.ts` needs weight the pixel look is begging for.
- [P0] Checkpoint/save at room boundaries — death currently wipes to Room 1; persist room cleared-state via `engine/storage.ts` so mid-mission isn't a full reset.
- [P0] Level select / mission select screen — title flow only offers 1 mission; wire `mission.rooms` array into a selectable mission list.
- [P0] Chapter progression gating — unlock next mission on S/A rating; `MISSION_DURATION_TARGET` already gives a clean rating gate to hang progression off.
- [P0] Post-death mode (HM-style) — after death, let the player hold a key to replay the *same room* not the whole mission, honoring the 1.2s timer in `pauseAndDeath.ts`.
- [P0] Respawn-in-place instead of full task reset — keep the run feeling urgent, restore only the current room’s enemy set.
- [P0] RC light as stealth objective — add "stay in shadow" rooms where the only winning strategy is darkness; prove the lighting is gameplay not decoration.
- [P0] Light-aware detection delay — enemies shouldn't instantly spot in light; add the inverse of `DARK_VISION_MULT` so darting between pools is a live skill.
- [P0] Light-pool manipulation verb — currently only smash; add a toggle/throw lamp that re-arms a pool, giving a second light verb beside LMB smash.
- [P0] Shooting kills in light triggers alarm already — surface that risk in the HUD so the light/dark tension is legible (tie to `triggerAlarm` in the cycle doc).
- [P0] Ranged OHK is trivially safe — reduce aim-assist/auto-fire or add recoil so ranged needs the same commitment as melee.
- [P0] Weapon pickup → hand swap friction — `E` pickup and `F` swap exist; make thrown-weapon retrieval (HM signature) fluid with a single key path.
- [P0] Thrown weapon stays & can be recovered — `clatter` noise already tracks landed weapons; let the player reclaim them for the silent kill loop.
- [P0] Mask gameplay hooks round 1 — masks are frozen data with one hook each; implement the first 2 so masks are mechanical not cosmetic.
- [P0] Enemy count / spawn tuning per room — `ENEMY_ARCHETYPES` templates make this a data change; balance rooms so 60-120s clears are hit consistently.
- [P0] Death → reason readout — show "spotted in light / shot by flashlight patrol" so the kill-cause is telegraphed (see `flashlight_patrol` invulnWhileLit).
- [P0] First-run tutorial integration — the intro scene exists (`intro-scene-until-perfect` skill); wire the teach-LMB-smash beat directly into Room 1.

## P1

- [P1] Boss fight mini-arc — `boss` archetype + `finalBossId` exist; give the Thompson boss a multi-phase arena with lamp-timing windows.
- [P1] Boss telegraphs — wind-up flash + audio ramp before the boss fires, making the fight readable at 3 hp.
- [P1] Elite enemy pass — `spy` archetype (fast boxer) already exists; add a shuriken/knife elite that mirrors the player's thrown-weapon trick.
- [P1] Gun attachments / mods — barrel, sight, silencer on `WeaponSpec`; silencer drastically shifts the `gunshot` noise radius in doc-27.
- [P1] Weapon unlock tree — tie new guns to mission ratings so progression has a reward loop behind the score gates.
- [P1] Story beat cards — interleave 1-line 1937 vignettes between rooms (lore text between `isRoomCleared` advances).
- [P1] Mission intro phone-call text — present each mission's objective + mask via the existing mission-select flow, per HM framing.
- [P1] Radio/ambient audio channel — `AudioManager.ts` exists; add a period-appropriate radio loop that dims when an alarm is raised.
- [P1] Music state machine — calm/combat/alarm stems keyed to `awareness` max-severity already exposed in the snapshot.
- [P1] Difficulty modes — Easy (more hits, longer react) / Normal / Hard (shorter `REACT_TIME`, tighter light windows) via data overrides.
- [P1] Hard-lock each-mode best score — separate S/A/B/C leaderboard per difficulty so modes aren't just tags.
- [P1] Survival / endless mode — procedurally chain cleared rooms from `mission.rooms` data; scores the combo system on a long run.
- [P1] Mission timer + lives display — surface `MISSION_DURATION_TARGET` countdown and HUD lives/health so the 3-5 min target is felt.
- [P1] Pickup % HUD — tie `pickupRate` (already scored) into on-screen counter to teach the S-rank greed loop.
- [P1] Kill-speed medal per room — reward clearing a room under a per-room par, feeding the time factor in `calculateRating`.
- [P1] New room archetype layouts — underground/basement with tight lampposts; exercises the light-pool verbs in a different spatial read.
- [P1] Vertical-asymmetry rooms — rooftop/channel layouts that challenge the top-down DDA in `lineOfSight.ts`.
- [P1] Light-density rooms — a neon-dense bazaar where smashing lights cascades blindness; stress the `lamp_smash` radius interplay.
- [P1] Cinematic death cam — slow-mo + pull on the killing blow; reuses the blood_splash RC light timing in the cycle doc.
- [P1] Slow-mo on multi-kill — brief time dilation on a 3+ kill to sell the style-link chain.
- [P1] Screen-shake tuning profile — per-weapon shake in `weapons.ts` so a Mosin thump reads different from a Boxer rattle.
- [P1] Weapon pickup sparkle in light — show a glint when an armed pickup is inside a light pool, teaching the "grab in light = risky" trade.
- [P1] Sound cue for lamp pool state — a click/hiss when the pool collapses to telegraph the 0.1s window audibly.
- [P1] Enemy patrol route editing — expose `patrolAxis/patrolLength` from `P1`-level designer tooling so level builders author loops, not random walks.
- [P1] Turret/static emplacement — a fixed mount gun on `X` cover; an easy data archetype that adds room variety fast.
- [P1] Stun/nonlethal options — a bat choke or smoke that knocks out instead of kill, enabling a no-kill stealth run variant.
- [P1] Smoke grenade weapon — adds a `NoiseKind`/light-blocking verb that pairs with the existing throw path.
- [P1] Flashbang weapon — temporary cone-blind enemy; one entry in `weapons.ts` + a light event, high payoff for the light system.
- [P1] Leaning/peek verb — an edge-peek that extends `enemy` reaction gamble without leaving the light-pool rhythm.
- [P1] Dodge-roll cooldown — a tight i-frame roll on Shift, giving a defensive verb beyond "don't get seen."
- [P1] Run-and-gun rebalance — make firing on the move accurate by default so aggressive play is viable vs pure ambush.
- [P1] Enemy alert spread cap — doc-27 shout is single-level; add an optional 2-level chain on Hard that the LOS sound rules already permit.
- [P1] Cover-graze bullets — bullets already blocked by `X`; let sandbag-adjacent shots ping off wood for audio+particles.
- [P1] Breakable doors — doors that slam shut on alert to funnel enemies, adding spatial dynamics to room reclaim.
- [P1] Ammo scarcity draw — fewer spare mags so the melee/thrown loop (the actual fun) gets chosen more.
- [P1] Telemetry hooks — log room-clear time, hits-taken, weapons-used to `storage.ts` for playtest tuning.
- [P1] Controller support — gamepad aim + triggers; hotline's one-stick feel is a natural fit for the existing mouse-aim sim.
- [P1] Rebindable keys — expose input mapping (F/E/Switch/LMB/SMB) so the tight loop is configurable.
- [P1] Enemy alert state variety — add a `search` state (isLost/checkBehind) so alerted enemies that lost sight actively hunt instead of standing at the last-seen spot.
- [P1] Pause menu with real options — volume, screen shake, aim-assist have nowhere to live; add a settings shell around `togglePause`.

## P2

- [P2] Colorblind mode for neon palette — the light/dark contrast is the core mechanic; add a deuteranopia/protanopia lamp tint override.
- [P2] High-contrast lamp outline — a luminance-independent outline so pool state reads in grayscale mode.
- [P2] UI text scaling — mission/score text should respect a size slider for readability.
- [P2] Accessibility quick-toggle — "reduce screen shake / reduce flashing" respecting the cinematic flash timing.
- [P2] Localization framework — `nameZh/nameEn` fields already in data; extract all strings to a locale table.
- [P2] Locale test pass — run a full playthrough in zh/en to catch hardcoded HUD strings.
- [P2] Mobile / touch controls — virtual stick + auto-aim for the RC mechanic; the sim is input-agnostic enough to port.
- [P2] WebGL fallback tier — RC pipeline is heavy; add a low-quality flag so weaker devices degrade gracefully.
- [P2] RC performance budget — profile `RcPipeline.ts` cascade intervals and merge passes for low-end GPUs.
- [P2] Per-light pooled-memory reuse — the RC buffer reallocates per frame; cache/copy from `lightField.ts` to cut GC churn.
- [P2] Offscreen visibility culling — cull sprites/RC lights outside the viewport before the render pass.
- [P2] Asset-lazy loading — load sprite sheets per mission (see `IntroSpriteRenderer`/`PixelRenderer`) instead of all at boot.
- [P2] Accessibility remap for one-handed — one-key attack + auto-turn option mirrors Hotline Miami's original two-button purity.
- [P2] Ghost/replay "best run" — replay your fastest S-rank via a recorded input log; strong for a vibe-game montage.
- [P2] Procedural room stitching — assemble rooms from `roomTokenizer.ts` tile chunks for seeded variety off the authored set.
- [P2] Seeded daily mission — one deterministic room order + weapon loadout per day; reuses the score gate for a daily leaderboard.
- [P2] Photo mode — free camera + RC-lit pause snapshot for screenshots.
- [P2] Steam-style achievements — S-rank all, no-hit mission, all-lamps-smashed, silent-room; hooks cleanly off the mission events.
- [P2] Analytics-dashboard tie-in — derive a heatmap of death locations per room from the telemetry.
- [P2] Alt-finish endings — 2-3 terminal cards keyed to final rating, so replay has a narrative pull.
- [P2] End-screen stat breakdown — expand `MissionScore` into a per-room time/acuracy ledger display.
- [P2] Gallery / codex of masks & weapons — lore-backed item slots, since data has zh/en names ready.
- [P2] In-game soundtrack toggle — allow the rc-lab audio channel to play standalone.
- [P2] CRT scanline / vignette toggle — film-grain filter pass for the retro look, off by default.
- [P2] Enemy variety skins — palette swaps per faction so a room of identical soldiers reads as units, not clones.
- [P2] Death-pile permanence — corpses stay as dark shadows (used by the blood_splash RC light) instead of disappearing instantly.
- [P2] Lantern carrying — pick up and place a lamp to re-light a region; the second light verb as a P2 experiment.
- [P2] Grapple/hook — a rooftop-hook weapon for the channel layers, as a far-future mobility toy.
- [P2] Mirrors/reflection surfaces — a tile that redirects light to break a hard darkness puzzle.
- [P2] Networked co-op (experimental) — shared noise state replication; doc-27 already gives a well-defined event model.
- [P2] Level editor — drag rooms + place lamps/enemies from `WorldManifest.ts` into a playable exported layout.
- [P2] Web-shareable screenshot link — serialize a run snapshot to a URL for community sharing.
- [P2] Benchmark mode — a fixed RC scene with an FPS readout for tuning, reusing rc-lab scenes.
- [P2] Controller rumble — map hit/damage/lampsmash to haptics where the platform allows.
- [P2] French/JP localization — extend the locale table beyond zh/en once the i18n shell lands.
