# Intro Sprite + RC Polish Design

## Goal

Replace the P4 debug rectangles with curated generated sprites and environment art, route the intro scene through the real `RcPipeline`, then self-play until the single-scene loop is polished and complete. The user explicitly expanded scope on 2026-08-09 with “self play review until polished work until done”; this supersedes the earlier P5 exclusion.

## Asset Pipeline

- This is an explicit user-approved contract change from procedural-only art to curated runtime PNGs. The implementation commit must synchronize `AGENTS.md`, `GDD.md`, `TDD.md`, `docs/levels/m1_intro_scene.md`, `docs/design/02-art-direction.md`, and `docs/design/05-character-design.md`; PNGs are permitted only for this intro-scene visual set.
- Source images remain under `references/sprite-samples/`.
- `scripts/process-intro-sprites.mjs` consumes an explicit, ordered input manifest and writes only `public/sprites/intro/`. It removes exterior checker pixels using border-connected low-chroma/high-luma classification, hardens alpha after edge decontamination, extracts fixed source slots with manual overrides, and fails closed on unexpected dimensions, empty frames, clipping, or dirty edges. Two clean runs must produce byte-identical outputs and hashes.
- Runtime output uses true RGBA. Actor frames are packed into controlled atlases with metadata; environment images remain individual textures.
- This design supersedes the generated-sheet dimensions in `24-sprite-image-gen-prompts.md`: actor atlas frames use 64×64 logical cells with foot pivot `(32,54)` to avoid clipping generated attack poses. Environment gameplay tiles remain 48×48. The processor emits exact cells, direction/action ordering, pivots, and integer nearest-neighbor rendering metadata.
- Player uses generated directional frames for idle/walk/knife attack. Patrol uses generated idle/walk/alert frames. Facing angles select the nearest authored direction; character bitmaps are not continuously rotated.
- A typed `IntroSpriteManifest` records atlas URL/hash/dimensions, frame rectangles, pivots, directions, actions, FPS, and fallback IDs. Required assets preload before play; failure uses the existing procedural debug renderer without blocking gameplay.
- Generated images require a human approval gate over black/magenta/green backgrounds and 1×/4× previews. The script cannot promote an unapproved source automatically.

### Frozen source/output manifest

- Approval file: `references/sprite-samples/approved-intro-assets.json`. Each entry contains relative source path, SHA-256, role, source slot layout, and output IDs. The user approval in this session authorizes the current byte hashes; the processor rejects any later hash drift.
- Player source: `player-knife-sheet.png`, initial 8 columns ×7 rows of 128×128 source slots. Output atlas `public/sprites/intro/player-knife.png`: 8 direction rows in `N,NE,E,SE,S,SW,W,NW` order and 8 columns `idle,walk0,walk1,walk2,walk3,attack0,attack1,attack2`; missing authored cells use the nearest same-direction approved pose and are recorded in metadata. Size 512×512.
- Patrol source: `flashlight-patrol-sheet.png`, 8 rows of 128px and six manually bounded columns recorded in the approval manifest. Output `public/sprites/intro/flashlight-patrol.png`: direction rows in the same order and columns `idle,walk0,walk1,walk2,walk3,alert`; size 384×512.
- Lamp source: `油灯三态小样.png`, source x bands `[0,338)`, `[338,677)`, `[677,1024)`. Output `public/sprites/intro/oil-lamp.png`: three 64×64 cells `intact,damaged,dead`; size 192×64.
- Static outputs: `ground.png`, `brick.png`, `shikumen.png`, `laundry.png`, `spark.png`, and `glass.png`; exact source paths and crop/slot bounds live in the approval manifest and are part of its reviewed hash.
- Runtime manifest: `src/engine/sprites/intro-manifest.ts`, generated from the approval manifest with URLs, frame IDs, rectangles, pivots, FPS, and hashes.
- Alpha classification uses border-connected pixels with luminance ≥0.90 and chroma ≤0.035 as definite checker candidates; pixels within RGB Euclidean distance 0.08 of either dominant border checker color are candidates. Only border-connected candidates become transparent. Output alpha is binary 0/255; RGB for transparent pixels is zero. A frame fails when foreground touches a cell edge, occupies fewer than 16 pixels, or extends beyond the normalized cell.
- Preload is atomic. Player, patrol, lamp, ground, brick, and Shikumen are required; laundry and effects are optional. Any required failure discards every loaded curated bitmap and activates the complete procedural fallback. Optional failure disables only that overlay/effect.

## Renderer

- `SceneManager` keeps a hidden/offscreen Canvas2D source canvas and adds a visible WebGL2 RC canvas.
- Base scene drawing uses curated ground, brick, Shikumen, laundry/wire, actor, lamp, spark, and glass assets.
- The source frame excludes the old fake radial gradient.
- `SceneManager` produces exact same-size planes:
  - `sceneColor`: material colors and sprites.
  - `occlusion`: opaque black blockers, opaque white open space.
  - `emission`: opaque black base plus colored active-light disks.
- Static occlusion is cached until room geometry changes. Scene and emission are updated each rendered frame.
- Tile topology, room dimensions, collision, entity coordinates, camera mapping, and lamp position remain unchanged. Ground covers open tiles; brick covers `#`; Shikumen decorates the existing north-wall lamp bay; laundry/wires are non-colliding, non-occluding overlays; `X` remains the existing blocker art.
- A geometry revision increments only on room load or topology change. Occlusion rebuilds on revision, RC-size change, or DPR policy change. Lamp destruction changes emission only.

## RC Bridge

- `RcPipeline.render({ width, height, sceneColor, occlusion, emission, lightCount })` reuses exactly three persistent upload textures, reallocates only on dimension change, and updates via `texSubImage2D`.
- `RcFrameImages` remains the CPU API and `RcFrameInput` remains the same-context GPU API. CPU `ImageData` is opaque, unpremultiplied RGBA8, top-left origin; upload uses `UNPACK_FLIP_Y_WEBGL=false` and `UNPACK_PREMULTIPLY_ALPHA_WEBGL=false`. `RcPipeline` owns and destroys the three upload textures.
- All three planes are generated directly at 480×432 (10×9 tiles ×48), then integer-scaled to the visible 16:9 canvas with letterboxing. RC config is `cascadeCount=1`, `twoLoop=true`, `resolutionScale=1`, `ditherEnabled=true`, `zone='lilong'`.
- `zone` is SceneManager metadata, not a `RcPipelineConfig` field; it resolves to the listed concrete parameters before pipeline construction.
- The RC canvas itself keeps a 10:9 CSS aspect ratio and is centered inside the 16:9 host; the host supplies the `#050408` letterbox. Backing store remains 480×432. CSS size is `scale=min(hostWidth/480,hostHeight/432)` with proportional downscaling on small viewports; no backing-store stretch occurs. Pointer mapping uses the centered canvas rectangle and is DPR-independent.
- The WebGL canvas is authoritative when healthy. Canvas2D remains visible as a fallback if WebGL2 initialization fails or the context is lost.
- Initialization is non-fatal. On `webglcontextlost`, prevent default, suspend RC, and reveal Canvas2D; on restoration recreate the pipeline and resume. Repeated failure remains on Canvas2D. Listeners/resources are removed in `destroy()`.
- Geometric light remains gameplay authority. RC is visual-only and cannot change lamp HP, invalidation timing, shield state, input, or simulation events.
- The existing DEV contract exposes a live `window.__rcPipeline` state object updated each frame; changing it to a method facade is out of scope.
- Authoritative DEV shape is the state object described by TDD: `{ activeCascades,resolutionScale,ditherEnabled,lastFrameTimeMs,lightCount,jfaPasses,degraded,... }`. It is absent before initialization, updated after each RC frame, marked `degraded=true` during fallback/context loss, and deleted on destroy.
- Plane contracts are strict: equal dimensions; occlusion pixels are only opaque black/white; emission background is opaque black. Automated validation rejects every off-contract pixel.
- Full plane validation runs in `npm run intro-assets:check` and DEV on geometry/emission buffer rebuild, not every production frame. Rejection switches to Canvas2D fallback and records a console error in DEV.

## Polish

- The room reads as a narrow Shanghai lilong, not a rectangular test arena: dark stone floor, aged red brick, Shikumen facade, overhead laundry/wires, vignette, and sparse damp highlights.
- Player red scarf/cyan outline and patrol orange outline remain readable under RC.
- Lamp states use the generated three-state art.
- First hit emits sparks and shake; destruction emits sparks plus glass shards, stronger shake, and the existing light-collapse transition.
- HUD remains minimal and existing mechanics are unchanged.
- Expanded-loop polish includes deterministic flashlight sweep, detection warning/death/retry, lit-enemy block, dark-enemy OHK, score/replay, and HUD trim to implemented controls only.

## Verification

- Asset processor validates dimensions, alpha, nonempty frame bounds, and atlas metadata.
- `npm run sprites:process` is idempotent and validates dimensions, alpha, frame bounds, anchors, hashes, and plane-safe output.
- `npm run typecheck`, `npm run light-break:check`, and `npm run build` pass. With the dev server running, `npm run rc-lab:check` passes.
- Browser playtest captures intact, damaged, and broken states.
- Browser console has zero errors.
- Live `__rcPipeline` reports one active cascade, one light before destruction, zero afterward, finite timings, and no degradation in the capture run.
- The three screenshots visibly show sprite art, lilong environment detail, RC illumination, and a substantial light-off contrast.
- Captures use 1280×720, DPR 1, fixed spawn/aim path, and named `playtest-polish-{intact,damaged,broken}.png`. A fixed 96×96 lamp ROI must lose at least 40% mean luminance after invalidation.
- Regression assertions require HP `2→1→0`, events `lightSmash×2` and `invalidateLight×1`, active lights `1→1→0`, unchanged entity/lamp coordinates and room topology, and no P5 combat events.
- Resource soak runs at least 10,000 RC frames with stable upload texture identity, no steady-state target recreation, no increase in live texture/framebuffer counts, and `glError=NO_ERROR`; resize and destroy are separately checked.
- Final gates are `npm run intro-polish:check`, `npm run combat-loop:check`, and `npm run e2e:playtest`; final screenshots are `smoke/hotline-e2e-{intact,broken,detection-death,retry,score-replay}.png` with zero browser console errors.

## Milestones

1. Contract/doc synchronization and deterministic asset processor.
2. Typed manifest, preload, and pivot-aware Canvas2D sprite renderer with fallback.
3. Exact scene/occlusion/emission plane generation.
4. Persistent RC uploads and one-cascade lilong presentation.
5. Context-loss fallback, DEV state, soak checks, and three-state browser verification.

## Final Scope And Limits

- P5/P6/P7 are complete and verified: enemy damage, player death/retry, win/score/replay, rendering/input, HUD trim, and browser e2e are in scope under the explicit polish-loop expansion.
- New generated concepts or additional characters.
- Shared-context Three.js/WebGL renderer rewrite.
- Full production animation cleanup beyond the intro scene.
- RC authority remains exactly one visual-only cascade; gameplay light decisions remain geometric. Non-blocking limits are boxy composition, sparse Shikumen/laundry layering, scaled silhouette detail, lamp-off contrast, and static capture coverage of short-lived juice.
