# EYE-13 — 100-item enhancement roadmap

Prioritized against the current one-block, ~90s, heavily-scripted linear build.
Grounding systems: `CourtyardTile`, `OrbitShell`, `CameraRig`, `radio.ts`, `tracking.ts`,
`sensor.ts`, `courtyard.ts`, `types.ts`, `constants.ts`, `HUD`, `RadioLog`, `EndCard`, `store`.

## P0

- [P0] Wrong-click consequence ladder — clicking a non-accepted entity during a live beat currently just `beatFail`s; feed the kill team false intel that visibly changes their next move instead, so "the click is the answer" has real teeth (`radio.ts` accept test).
- [P0] Intel-confidence meter gating the shot — each wrong call drains a confidence bar, and the shot only fires cleanly above a floor, giving "no lying" measurable weight instead of silent pass/fail.
- [P0] Branching end outcomes per missed beat — a wrong answer to "Canopy still covering?" tells KT the VIP is exposed (they fire early = miss) whereas a wrong "Police inbound?" stalls the team; each `RADIO_BEATS` entry gets its own consequence + `EndCard` copy.
- [P0] Time-remaining score bonus — `EndCard` currently shows bare `score/7`; add `beats + (MISSION_TIME - elapsed)` points so a fast 7/7 beats a slow 7/7 (endcard + HUD SHOT countdown).
- [P0] Tight-window difficulty — make `RADIO_BEATS[].window` scale down 30% in a "tight" flag so the same 90s script becomes a reflex test rather than a still life.
- [P0] Limited-look heat budget — cap SAR pull-time per run so you cannot pierce cloud forever; `sensor.ts` heat rise/cool becomes a hard resource, not just an overheat scare.
- [P0] VIP-uncertainty decoys — add 1-2 decoy "principal" blobs with the same `0x7cffd4` vip heat so click-lock is a judgment call, not "find the cyan label" (CourtyardTile HEAT + addBlob).
- [P0] Beat 7 re-confirm after canopy — the GO window must be re-acquired once the VIP clears the canopy, turning beat 7 from a click into a real timing check (`radio.ts` beat-7 `NO LOCK` branch).
- [P0] Data-driven level config — lift wing offsets / canopy geometry / blob counts / alley markers out of `courtyard.ts` into a `LevelConfig` so a second block costs no new engine (`CourtyardTile` reads only constants today).
- [P0] Second courtyard: motorcade — moving van + 2 pedestrians with a new `RADIO_BEATS` set (window/prompt/accept) reusing the exact 7-beat skeleton (`world.ts lerpPath` already animates vehicles).
- [P0] Third courtyard: rooftop extraction — a whole-roof canopy that breaks lock far more often and forces steeper zoom discipline (harder lock windows).
- [P0] Post-completion mission dossier — winning should surface time, beats, wrong calls, and per-beat answer delay from `radio.log` (+ RadioLog tx log) instead of a count line.
- [P0] Debrief replay with wrong-call diff — re-watch your run's camera/TX path with your failed beats highlighted as a learning loop (CameraRig + radio.log).
- [P0] Campaign mode — chain the three courtyards under one continuous mission timer and a cumulative heat budget (`GameSim` + `MISSION_TIME`).
- [P0] Per-run best persisted to localStorage — a "personal best" target in store.ts so 7/7 has something to chase between runs.
- [P0] Per-level abort tuning — expose `FAILS_TO_ABORT` as level data so abort pressure can be dialed per courtyard rather than a frozen 2 (`constants.ts`).
- [P0] Kill-team reacts to intel quality — pass all 7 and KT holds steady; pass 6 and they hesitate before the shot, making the finale a reward for cleanliness.
- [P0] False-principal lock penalty — clicking a guard first makes KT "lock the wrong man" and costs you a re-lock window before the real VIP (tracking.tryLock only accepts `vip`).
- [P0] Commit-the-shot wind-up — after GO, defend the lock for `LOCK_SHOT_HOLD` (2s) while the canopy may swing overhead, making the existing drop a visible mini-boss (`constants.ts` + tracking canopy timer).
- [P0] KT-pip-as-clue — wrong intel moves the `kt` kill-team blob, and their new position becomes the answer to a later beat, so mistakes ripple instead of reset (`courtyard.ts` kt entity).
- [P0] Fail-cascade keeps the run alive — losing lock burns the current beat (BLIND) but doesn't abort, giving a fighting last-30s instead of instant restart (radio + tracking).
- [P0] First-run tutorial — teach exactly the 7 beats with hover/label prompts on the first pass, then drop into unscripted mode (CourtyardTile raycast highlight).
- [P0] No-consequence practice flag — a settings switch that disables abort so a new player learns the choreography before replay depth engages.
- [P0] Progressive finale unlock — only 4 beats begin the run; the last 3 surface only if you reach beat 4 clean, gating the good ending on performance (radio data + results).
- [P0] Guard the GO against a same-frame click-and-lock — tighten `radio.ts` beat-7 so a fresh lock in the same tick never passes GR, forcing deliberate re-confirm teaching.

## P1

- [P1] Outcome copy per beat — each missed `RADIO_BEATS` entry gets its own KT reaction line + red `EndCard` copy instead of one generic abort.
- [P1] New EndReasons — extend `types.ts` union with `falseintel` / `panic` and map each to distinct `EndCard` copy so endings feel authored.
- [P1] Per-beat answer latency in the TX log — show seconds-to-answer in RadioLog so players self-coach on reflex.
- [P1] RECHECK auto-tag — after two fails on a beat, radio auto-transmits a corrective "RECHECK" so the fail is readable (`radio.ts` `NOJOY`/`LATE` tags).
- [P1] Procedural courtyard variants — jitter wing offsets, canopy position, and blob radii within bounds each run (CourtyardTile reads a variant seed).
- [P1] Shuffled beat pool — draw 7 of ~12 question prompts per run so no two games ask the same sequence (RADIO_BEATS).
- [P1] Radio static bed — a looping low static under the SFX recipes in `AudioManager` to sell the headset fantasy.
- [P1] Spoken beat callouts — TTS or recorded voice reads each prompt aloud so it's audible, not HUD-only.
- [P1] Audible window-open whoosh — a doppler cue when a beat opens so the player isn't glued to the HUD (sfx.ts).
- [P1] Final-GO music swell — a rising bed on beat 7 to signal the climax.
- [P1] Ambient satellite hum + city drone in orbit — quiet atmosphere under the OrbitShell night scene.
- [P1] Touch-drag zoom — single-finger drag maps to `CameraRig.setZoom01` for phones (InputManager).
- [P1] Touch hold-SAR + tap-to-lock — map Space/SAR and LMB to touch gestures with no mouse (InputManager).
- [P1] Responsive HUD + safe-area/orientation — reflow HUD/RadioLog/EndCard for portrait and notched phones (styles.css).
- [P1] Full keyboard play — arrow-key zoom, Space SAR, Enter click-center, so the clicker is 100% non-mouse (InputManager).
- [P1] Larger, colorblind-safe blob targets — bump pick radii and shift the cyan/orange heat pair for deuteranopia (CourtyardTile HEAT).
- [P1] Screen-reader HUD labels — describe lock pip / heat / clock via aria so the game is auditable (HUD.tsx).
- [P1] Reduce-motion toggle — disable cloud/scan rotation and zoom easing for vestibular comfort (OrbitShell + CourtyardTile scan).
- [P1] Colorblind palette mode — switch heat from cyan/green to blue/orange via `PALETTE` in constants.ts.
- [P1] Instanced blob meshes — reuse one geometry instead of per-entity `SphereGeometry` in CourtyardTile to cut allocation churn.
- [P1] Single raycast hit test — collapse per-frame picking into one object-space pass in `CourtyardTile.pick()`.
- [P1] Cloud LOD — drop cloud sphere segments once zoom passes threshold (OrbitShell).
- [P1] Dynamic pixel-ratio scaling — cap `devicePixelRatio` for low-end and scale resolution under load (App renderer).
- [P1] Bake star noise — collapse 900 Points into one atlas so the shell draws lighter (OrbitShell).
- [P1] i18n strings table — extract 7 beat prompts + EndCard copy into keyed strings so translations drop in (courtyard.ts + EndCard).
- [P1] Locale packs — ship zh/ja/es/fr; the prompt/txTag text is currently inline and untranslatable.
- [P1] Rebindable controls — store key/button map in settings and let InputManager read it.
- [P1] Settings screen — volume, brightness, difficulty (windows + heat budget), and control scheme in one overlay (store + new Settings component).
- [P1] Pause runtime ref — show the live heat + TX log inside Pause.tsx so a pause is informative, not blank.
- [P1] Audio volume sliders — separate SFX/music levels wired to AudioManager.
- [P1] Time-attack mode — a visible best-time chain on the HUD clock.
- [P1] Ghost replay — overlay your prior run's camera path for comparison (CameraRig record).
- [P1] Scorecard image share — render a canvas grade card (beats + time) at end to post (EndCard).
- [P1] S/A/B/C end grade — replace bare `7/7` with a graded letter driven by beats + time (EndCard).
- [P1] Persistent best-runs — load/save top runs to localStorage in store.ts so replay depth outlives a tab.
- [P1] Easy-window flag — scale `RADIO_BEATS[].window` by 1.5× for accessibility onboarding.
- [P1] Entity hover label — during SAR, hovering a blob shows its id so players learn target identity (CourtyardTile raycast).
- [P1] Police-car entity — add a new pickable `EntityId` + proprietary beat for vehicle variety (courtyard.ts + types).
- [P1] 2P read-along co-op — a second screen of beats read by a partner, per the GDD M2 2P-radio scope.
- [P1] Post-shot follow — one confirmation frame after the shot that holds the VIP-down state before the EndCard, so the kill lands.

## P2

- [P2] Orbit establish shot — a slow drift-in before the courtyard fades, selling scale (CameraRig ease-in).
- [P2] Sun-glint / debris ambience — subtle moving specks on the limb for variety (OrbitShell).
- [P2] Weightless sway — a soft periodic camera drift to sell microgravity (CameraRig).
- [P2] Rain-cell weather — a second cloud mass that shifts pierce timing per run (OrbitShell cloud).
- [P2] Multiple canopy shapes — rectangular / pergola / full-roof variants per level (CourtyardTile addCanopy).
- [P2] Vehicle variety — pickup, sedan, and van share one blob with different heat signatures (van entity).
- [P2] Laser-pip detail — the lock pip wobbles as heat builds, telegraphing overheat (HUD lock pip).
- [P2] Ground speckle — procedural courtyard break-up so the grid isn't flat (CourtyardTile floor).
- [P2] Beat captions — subtitle each prompt to accompany TTS help.
- [P2] Random KT callsigns — vary the kill-team name per run for flavor (txTag).
- [P2] GO-window tick — an audible tick-tock during the final 4s (sfx).
- [P2] Touch haptic SAR — long-press-to-SAR vibrates on mobile.
- [P2] Gamepad rumbles — motors on lock-acquire/drop for pads.
- [P2] Gamepad mapping — triggers zoom, face buttons click (InputManager).
- [P2] PWA install — run as an installed app via manifest.
- [P2] Hash-seed reruns — append `?seed=` to make procedures deterministic/repeatable.
- [P2] Beat time-scrubber — devtools jump to any beat to tune timing (devtools.ts).
- [P2] Replay-last-10s debug — snap back to diagnose a late beat.
- [P2] Tree-split cold start — code-split OrbitShell vs tile to cut initial parse (App import).
- [P2] WebGL-fallback message — friendly unsupported-device screen.
- [P2] Vignette/scanline toggle — so screenshots capture clean output (styles.css).
- [P2] Perfect-play smoke test — a headless sim asserting 7/7 to catch regressions (GameSim.test.ts).
- [P2] RNG injection — make procedural courtyards testable via a seeded generator (store + LevelConfig).
- [P2] Latency telemetry — log per-beat click latency in dev for window tuning.
- [P2] Hidden calibration readout — clicking the scan line toggles a SAR calibration easter egg.
- [P2] Rotating title lore — a flavor line each reload on the boot screen.
- [P2] `INTEL DONE` badge — a distinct mark only on a flawless 7/7 (EndCard).
- [P2] Aspect handling — portrait/ultrawide HUD and CameraRig horizon adjustments.
- [P2] Idle re-stage — no input for 10s gently nudges zoom toward orbit (CameraRig).
- [P2] Average-answer stat — show mean beats-per-second on the debrief (radio.log).
- [P2] Perf badge toggle — a small fps readout (recordFrameTime already installed).
- [P2] Locale number formatting — the `T+` clock / ALT digits respect locale.
- [P2] GO-window drill — a dedicated quick-restart practice mode for just beat 7 (EndCard line).
- [P2] Cloud drift seed — two reruns never pixel-match the cloud motion (OrbitShell).
- [P2] Dev-blog from the doc — write up the design + roadmap to the existing `docs/zhihu` channel as a marketing P2.
