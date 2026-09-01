# 14_neuraltexture — 100-item Prioritized Enhancement Roadmap

Grounded in `src/` (NeuralMaterial / SceneManager / train / material / bake) and `docs/`. Pitch: turn a frozen 3-ball proof into an interactive, multi-material, fallback-capable instrument for the neural-SVBRDF proposition.
Ratio: P0 25 / P1 40 / P2 35.

## P0

- [P0] In-page live bake — stream `trainDecoder({onStep})` into the browser so the decoder visibly trains, turning a one-shot intro into an instrument (train.ts already emits per-step loss).
- [P0] Live loss-curve sparkline — render `history[]` as a chart that appends each step, making "is it converging?" visible rather than asserted by a single BAKED_VAL_L1 number.
- [P0] Live latent-atlas update — recompute `BAKED_LATENT` and hot-swap the atlas `DataTexture`/storage buffer mid-bake so the 8-D code visibly redraws as the encoder stays fixed.
- [P0] WebGL2 fallback renderer — add a non-WebGPU path so GPU-less browsers still show the teacher/neural/error trio instead of the current hard error string (main.ts only checks `navigator.gpu`).
- [P0] Path-traced reference ball — add an importance-sampled Monte-Carlo GGX ball as a real "truth" so the analytic teacher itself is validated, not just the neural decode vs teacher.
- [P0] Compare-view toggle — let the shared material cycle teacher / neural / error via key+UI instead of the view being baked into `worldPos.x` (three-identical-material hack).
- [P0] Error map punch-through — blend the ×8 error over the neural render on the sphere so residual reads spatially on the surface, not as a detached flat heatmap.
- [P0] Light orbit pause + manual drag — grab and park the key light (override `setLightAngle`) so highlight comparison is not hostage to the auto orbit.
- [P0] Key-light intensity/color slider — expose `KEY_LIGHT_COLOR`/distance falloff live so highlight contrast can be tuned to the viewer, not frozen in constants.
- [P0] Re-train controls (start/pause/resume/step-limit/seed) — wrap `trainDecoder` in a small state machine that streams new weights into the shader without a page reload.
- [P0] Orbit speed + direction control — decouple auto-rotate speed and reverse so slow highlight sweep can be studied at leisure.
- [P0] Log-domain loss readout — label the loss axis explicitly as log-L1 (`log(1+max(x,0))`) since the raw number is log-compressed and otherwise misleading.
- [P0] Train/val split line — plot held-out `validateLogL1` against train loss online and auto-stop on plateau, replacing the one-shot end-of-bake val.
- [P0] Best-checkpoint keeper — retain the lowest-val weight set during bake instead of last-step weights, so a val-spike late in training can't ship a worse decode.
- [P0] Warm-start re-bake — allow re-baking from current in-memory weights to demo local-vs-global minima live (train.ts already accepts a weight input shape).
- [P0] Hover pixel-probe — sample the latent code + teacher/neural/error at the cursor under the pointer and show the 8-D vector, making the latent legible.
- [P0] Material registry — replace the closed-form `materialAt` with a swappable registry so a second case doesn't require re-baking file edits by hand.
- [P0] Second family: smooth metal — a pure metallic sphere (no veins) to prove the decoder isn't overfit to the kintsugi glaze case.
- [P0] Third family: rough plastic — a diffuse-dominant dielectric so a low-spec, wide-lobe surface is shown to decode cleanly, not just sharp glaze.
- [P0] Anisotropic case — a brushed tangent-stretched highlight to stress where the isotropic Rusinkiewicz `nt_wd` parameterization breaks.
- [P0] NTC variant — a compact/compressed latent encoding to probe whether the 8-D code can be made smaller without perceptible error (course-spec "NTC" hook).
- [P0] Error-scale slider — make the hardcoded `×8` a live control; JOURNEY already flags error×8 as an open discussion point.
- [P0] Per-material val log-L1 build gate — run `validateLogL1` per material at bake end and fail the build above a threshold, replacing human-inspection sign-off.
- [P0] Per-view fitness readout — bind a small "val log-L1 = x" tag to each ball so the comparison is quantitative, not just eyeballing highlight shape.
- [P0] Universal view hotkeys + UI — make teacher/neural/error and probe switches reachable by button, not an undocumented keyboard shortcut.

## P1

- [P1] Metal set — a metalness sweep (0→1) across a family so the F0/albedo-metal interaction is shown, not frozen at one percentage.
- [P1] Plastic set — a roughness sweep at zero metallic so glossy-vs-matte dielectric is legible on its own.
- [P1] Fabric/micro-fiber set — a high-frequency non-GGX-ish surface to show the decoder's limits on off-spec lobes.
- [P1] Car-paint / clearcoat set — a coated double-lobe surface (dielectric over metal flake) to break single-GGX assumptions.
- [P1] Latent-resolution sweep 32/64/128 — compare quality vs the 64²×8 frozen choice and surface the memory/quality curve.
- [P1] Hidden-width sweep 16/32/64 — an architecture sweep so readers see where extra width stops buying accuracy (1635 params today).
- [P1] Decoder-depth variant — a 3 vs 4 hidden-layer toggle to probe the "how deep must the MLP be" question.
- [P1] Per-ball material split — each ball shows a different material family (vs three views of one), directly answering "does it generalize?"
- [P1] Materials × views grid — a lattice sweep (material rows × teacher/neural/error columns) for a classic research-grade figure at a glance.
- [P1] Key-light world gizmo — an in-scene draggable light handle instead of only the HUD angle number.
- [P1] Fill-light toggle + intensity — make the cold `FILL_LIGHT_DIR`/color adjustable so its role on glaze is studiable.
- [P1] Ambient slider — expose `AMBIENT` so the floor/ambient floor of the three balls is controllable.
- [P1] Tone-mapping exposure slider — a live `TONE_MAPPING_EXPOSURE` control (currently 0.85 frozen) to compare raw vs graded highlight.
- [P1] Env-reflection probe — a simple environment map so metal glaze/light picks up reflections beyond the single point key.
- [P1] Rim/back light — a third light to separate glossy body from dark background, a standard lab-light trick.
- [P1] Turntable auto-rotate view — an independent camera spin to distinguish surface highlights from camera parallax.
- [P1] Camera FOV + speed control — expose the 42° FOV and pan/dolly limits so framing is user-driven.
- [P1] Save/load camera preset + URL share — encode camera pose/light in the URL so a specific highlight claim is shareable.
- [P1] Per-mode cost meter — time teacher vs neural per frame side by side so "MLP is cheaper than GGX" is measured, not assumed.
- [P1] GPU-pipeline breakdown — surface draw/pipeline/swap timings via the devtools perf path to find where the frame actually burns.
- [P1] Shader monkey — live-edit leaky slope, exp clamp, light angle, and see the render update instantly (helpers are string-injected already).
- [P1] Asset memory meter — display latent bytes (64²×8×4) + weight bytes (1635×4) + page-level texture cost as a self-contained "we're tiny" stat.
- [P1] Bake wall-clock + steps/sec — a duration meter so the offline 8000-step bake is a known, communicated cost.
- [P1] Bake in a Web Worker — run `trainDecoder` off the main thread so the loss curve never janks the render loop.
- [P1] OffscreenCanvas rendering — option to render in a worker thread to isolate heavy WebGPU work under slow hardware.
- [P1] Renderer switcher (WGSL vs WebGL2) in settings — an explicit toggle so the fallback is demoable, not just an emergency path.
- [P1] First-load onboarding overlay — one line each for the three balls, auto-dismissed to a "?" button so the intro isn't unexplained.
- [P1] Collapsible/tabbed HUD — the read-only status becomes per-tooltip tabs instead of a single growing block.
- [P1] Error-map colorbar — a legend so a reader can map heat color back to an error magnitude ("this red is ~0.2 log-L1").
- [P1] Latent-tile tooltips — label Z0…Z7 on the atlas so the 8-D meaning is discoverable.
- [P1] Compact baked.ts — shrink the ~229 KB `src/engine/baked.ts` to a compact number format to cut bundle and parse time.
- [P1] Checked-in bake determinism hash — assert a reproducible seed/val hash so CI can tell a re-bake changed output.
- [P1] Light-gobo pattern — project a structured shape via the key light to drive high-frequency surface detail on purpose.
- [P1] Sphere LOD — raise tessellation only when the camera is near (currently a fixed 96×64, wastefully tall when distant).
- [P1] Raw `f_r·n·l` toggle — disable tone mapping to compare the raw predicted quantity vs the graded pixel, clarifying the pipeline step.
- [P1] Real SVBRDF test set mode — load an actual tileable material (e.g., a SURREAL sample) to prove generalization beyond the procedural sines.
- [P1] FPS budget governor — auto-drop pixel ratio or prop detail when frame time exceeds a threshold so low-end stays smooth.
- [P1] Per-family bake gating — bake each material family's gate threshold in code so adding a family is one entry, not a new manual pass.
- [P1] Latent channel reconstruction view — a debug screen showing what each of the 8 latent channels encodes (albedo vs gloss vs metal).
- [P1] Relative-importance of inputs — a probe showing how much `wh`/`wd` vs `z` drives the output, so the Rusinkiewicz contribution is visible.

## P2

- [P2] README/docs refresh — document the encode→latent→Rusinkiewicz→MLP pipeline and a "how to add a material" walkthrough.
- [P2] Architecture Decision Records — ADRs for WebGPU-only + scalar MLP (no CoopVec/Slang), capturing why the 64²×8 and 8000-step choices were made.
- [P2] Per-material conformance template — a CI-generated per-family report (val log-L1, params, bytes) auto-published on bake.
- [P2] Latent-semantics doc — an annotated table of what each of the 8 latent numbers captures, bridging to the SIGGRAPH course steps.
- [P2] Mobile touch orbit — multi-touch look so the comparison works on a phone, not just desktop mouse.
- [P2] Mobile pixel-ratio/texture cap — guard against low-end GPUs by capping DPR and worst-case latent resolution on small screens.
- [P2] prefers-reduced-motion — disable auto-orbit and any animation for users who ask for reduced motion (a11y).
- [P2] High-contrast HUD mode — a theme that lifts the tiny dark HUD text against the `#05060a` background.
- [P2] Screen-reader status region — tie the readout to an `aria-live` region so the auto-updating stats are announced, not silent.
- [P2] Colorblind-safe error colormap — swap the luminance heatmap for a diverging/OKLab path so error reads across protanopia/deuteranopia.
- [P2] HUD i18n toggle — EN/中文 strings so the demonstration matches the zhihu-article audience it was written for.
- [P2] Snapshot export — a button to save a teacher/neural/error comparison PNG for embedding in docs or a talk.
- [P2] Highlight-sweep video capture — record a looped sweep as GIF/webm for a shareable artifact.
- [P2] Benchmark route — separate page sweeping all materials × latent/resolution, so the tradeoffs are a browsable table.
- [P2] Automated visual regression — pixel-diff teacher vs a golden image to catch shader-noise regressions that unit tests miss.
- [P2] Reconcile zhihu article — update `zhihu-article/` figures/text if the M2 work changes the visual claims.
- [P2] Static deployable build — make the Vite build publishable to GitHub Pages so the demo has a live URL.
- [P2] "How it works" deep-dive section — map each system to the SIGGRAPH course step numbers (01–03 decode, 06 frame, 07 encoder) in-app.
- [P2] Code-split baked.ts — lazy-load the big baked weights file so the landing happens before the payload (bundle currently ~230 KB of that file).
- [P2] Landing-fast path — defer bake-dependent HUD until the asset is loaded so first paint isn't blocked by a fat import.
- [P2] Decoder scratchpad — tap a voxel and read the in-flight MLP scratch `wh/wd` and hidden activations for a transparent peek.
- [P2] Parallel per-family bake — run each material family's bake in its own Worker concurrently so the M2 multi-comparison is fast.
- [P2] Residual histogram — plot per-material error distribution so it's clear where the decoder fails (specular tail vs diffuse).
- [P2] Training-log export — dump loss history to CSV/JSON for offline analysis or a paper-style curve.
- [P2] Regularization experiments — weight-decay/dropout toggle to test overfit-to-one-material and report the delta.
- [P2] Lighting-convention note in docs — actively document the "predicts `f_r·n·l`, then × light color/atten" contract so readers don't misread the pipeline.
- [P2] Reconstruction debug view — a full-frame "recover albedo/rough/metal from latent" preview to prove the 8-D code is information-preserving.
- [P2] HDR capture for the highlight — a high-dynamic codepath so the extreme specular peak isn't clipped before tonemapping.
- [P2] Contact-shadow under spheres — soft ground contact to anchor the three balls instead of them floating on the dark disc.
- [P2] Soft key-light shadow — a second pass for penumbra so the key light reads as a real lamp, not a dot.
- [P2] Restyle pedestals/floor — tighten the "night ceramic studio" props toward a cleaner instrument-panel look.
- [P2] CoopVec investigation doc — write up whether Cooperative Vector (+ a shared MLP across texels) is worth a future branch, since it was cut at intro freeze.
- [P2] Embeddability spike — drop the neural material into another VibeGames scene to prove it's a reusable node, not a single-demo shader.
- [P2] CPU↔WGSL parity test — assert `encodeLatent`/`materialAt`/`nt_decode` sampling is bit-stable between the CPU front-end and the WGSL kernel.
- [P2] Open-source packaging — add LICENSE + contribution note so the repo (with its zhihu article) is shippable as a standalone reference implementation.
