# 11_blackhole — 100-item prioritized enhancement roadmap

Kerr rotating-black-hole real-time physics visualizer (three.js 0.185 + zustand, per-pixel GLSL null-geodesic ray tracer). Priority ratio ~25/40/35 (P0/P1/P2). P0 = turn the visualizer into an interactive, communicative experience; P1 = deepen physics/UX and add audio/goals; P2 = stretch, platform, and scale.

## P0

- [P0] Guided cinematic tours — replayable camera+duration sequences that showcase lensing, frame dragging, and the D-shadow, turning a screensaver into a presentable experience (drives SceneManager camera + autoOrbit).
- [P0] Save/load parameter presets — persist `params` (mass, spin, disk temp/brightness/outer, stars, bloom, exposure, steps) to localStorage so users keep tuned scenes between visits (wraps zustand `setParam`).
- [P0] Preset library with transition animation — one-click named scenes (M87, Interstellar-style, Schwarzschild) that smoothly tween all params instead of snapping (tweens ControlPanel sliders + readout).
- [P0] Ready-to-play preset scenarios — curated starting "scenarios" (edge-on iconic ring, pole-on, D-shape at â≈0.9) so first-time users see something striking instantly (combines constants + camera defaults).
- [P0] Science mode with labeled overlays — toggle 3D lines calling out ISCO (pro/retro), ergosphere/static limit, horizon r₊, and photon ring, drawn from the same constants as `readouts.ts` so labels never drift from the physics.
- [P0] Side-by-side CPU vs GPU comparison — render identical params through `kerrTracePhotonAdaptive` (DOPRI5) and the GLSL ray tracer into split/half frames to expose GPU-vs-CPU accuracy differences (the DOPRI5 reference is exactly the missing validation path).
- [P0] Screenshot export — capture the current frame to PNG/WebP with a one-click button, making the screen-saver output shareable (canvas `toBlob`).
- [P0] UI/control polish pass — keyboard shortcuts (space pause, 1-5 preset, arrows orbit), slider drag/step refinement, and layout tidy-up across ControlPanel/HUD.
- [P0] On-frame physics overlays — render the ergosphere and photon ring directly into the live scene so "science mode" is visible while orbiting, not just on a table.
- [P0] Photon-ring highlighting — emphasize the n=1/n=2 lensed ring images so the user can find the iconic structure (uses the `index`-tagged crossings DOPRI5 already emits).
- [P0] Pointer tracer tool — click/raycast a pixel and run the CPU `kerrTracePhoton` on that one ray, showing λ, η, fate, and disk-hit count to make per-pixel physics tangible (bootstraps the CPU integrator into the render path).
- [P0] Camera transition system — smooth eased moves between orbit distance, polar angle, and FOV so preset switches feel like a guided dolly (tweens CAMERA_* constants).
- [P0] Info-dense readout toggle — expandable HUD showing all SI values (r₋, r₊, ergosphere, pro/retro ISCO, η) so science mode rivals a textbook table (extends HUD table).
- [P0] Frame-dragging visual toggle — overlay showing the azimuthal drift that dragging of the inertial frame causes, directly visualizing the a≠0 term in `kerrKeplerianOmega`.
- [P0] Spin→shadow shape tutorial overlay — an annotated guide that sweeps â and narrates how the shadow collapses to a D, teaching the core Kerr consequence (leveraging `kerrShadowOutline`).
- [P0] Greyscale "reset to canonical" presets — restore spin=0/0.9/0.998 with matching clear-sky settings so users can A/B the physics cleanly.
- [P0] Loop capture export — record N frames to a short WebM/GIF for shareable looping background footage (composes with screenshot export).
- [P0] Pause + frame scrub — freeze time and step the animated presets frame-by-frame so dynamic scenes can be studied instead of only watched.
- [P0] Deep-link preset URLs — encode the full `params` in the URL so any tuned scene can be shared and reopened exactly (serializes zustand params).
- [P0] Horizon label callouts — toggle text labels pinned to r₊ and r₋ so the geometry is legible at any camera angle (uses `kerrHorizons`).
- [P0] Collapsible parameter groups — group the 9 sliders + 3 toggles into Mass/Spin, Disk, Rendering sections to reduce ControlPanel overload.
- [P0] First-run quick-start overlay — a one-screen "here's what you're looking at" intro (ISCO, disk, shadow) replacing the blank-sky first impression.
- [P0] Accessibility baseline — ARIA labels on every slider/toggle and a live screen-reader text readout mirroring the HUD so the app is usable without sight.
- [P0] Regression screenshot harness — render the same params headlessly, diff against a checked-in baseline, to catch shader regressions on future changes (guards the GLSL).
- [P0] FPS-guarded quality easing — auto-drop `steps`/resolution when frame time targets the cost budget, keeping the experience smooth on weak GPUs (reads store `fps`).

## P1

- [P1] Ambient audio tied to spin — a generative drone whose pitch/harmonics track â and disk temp, giving the scene a sonic presence without a "soundtrack".
- [P1] Guided "find the photon ring" goal — a self-paced objective: locate and frame the n=1 photon ring, with a subtle success state when centered.
- [P1] "Tune the D-shape" goal — a mini challenge to dial spin until the shadow's analytic D-outline (from `kerrShadowOutline`) matches the render.
- [P1] WebGPU renderer option — an experimental path (WGSL port of the fragment shader) for faster ray marching and access to compute; gated behind a feature flag.
- [P1] Mobile touch + responsive layout — pointer/touch orbit, pinch-zoom, tap-to-inspect, and a compact HUD/ControlPanel that fits portrait.
- [P1] Colorblind-safe palettes — disk/star/overlay color presets (deuteranopia, protanopia, tritanopia) so the beaming red/blue asymmetry stays readable.
- [P1] Performance presets — Low/Medium/Ultra (steps, resolution scale, bloom, exposure path) with auto-detect from device capability.
- [P1] Physics explainer documentation — a README/notes page walking through Boyer–Lindquist, Carter separation, ISCO, and redshift, cross-referencing the actual functions.
- [P1] Live science annotation toasts — transient captions ("crossing ergosphere", "inside photon ring") as the camera moves, teaching through exploration.
- [P1] Photon-ring counting readout — surface how many lensed images a pixel produced (the DOPRI5 `index`) to quantify the ring hierarchy.
- [P1] Single-ray geodesic inspector panel — select a pixel, show the full (r,u,φ) trajectory, turning points, and winding count from the CPU tracer.
- [P1] ISCO sweep animation — animate prograde vs retrograde ISCO radii vs spin as a graph overlay to reveal Bardeen–Press–Teukolsky behavior.
- [P1] Relativistic beaming intensity toggle — switch the I_ν ∝ g³ beaming on/off to isolate Doppler asymmetry from redshift.
- [P1] Gravitational redshift/g readout — show the computed Doppler factor g for the front (approaching) vs back (receding) disk so users see the asymmetry numerically.
- [P1] Ink/paper scientific mode — a flat, label-heavy orthographic view with gridlines, for physics screenshots (builds on screenshot export).
- [P1] Lensing on/off with the same frame — render lensing off beside lensing on in split view to visually prove the bending (composes with the comparison mode).
- [P1] Disk-radiation temperature picker — presets (M87-ish, hot blue-white, cool red) bound to diskTempK so users don't hunt the slider.
- [P1] Starfield density/seed presets — a few curated sky/nebula looks to vary the backdrop without hand-tuning.
- [P1] Bloom/exposure auto-tonemapping — an "auto" mode that adapts brightness so extreme spin/disk combos stay legible.
- [P1] Adaptive step-count guide — a hint mapping desired fidelity to `steps` so users understand the quality/latency tradeoff.
- [P1] History of last N parameter states — undo/redo for slider changes so experimenting is reversible (extends store).
- [P1] Configurable camera FOV/limits — expose FOV and polar/distance bounds so power users can frame unusual presentations.
- [P1] Screenshot with metadata overlay — embed params (â, mass, disk temp) in the exported image caption for permanent record.
- [P1] Title/attribution screen — a small "about the physics / sources" panel crediting the geodesic equations.
- [P1] Time-lapse astronomical labels — optional "10⁸ M☉ · â 0.9" watermark so exported assets carry context.
- [P1] Ergonomic slider reformatting — physical units (km, solar masses, Kelvin) shown inline so values mean something to a physicist.
- [P1] Contrast/readability pass — increase HUD contrast on bright disks and add a backdrop panel behind the readout table.
- [P1] Right-click-lens note — surface the camera control hint ("drag orbit, wheel zoom, right-drag pan") as a dismissible overlay instead of static text.
- [P1] Reduced-motion mode — disable autoOrbit twinkle and camera shake for vestibular-sensitive users.
- [P1] Variable speed auto-orbit — slider for orbit rate so the screen-saver mood is controllable.
- [P1] Trackpad/keyboard coexistence — ensure drag-orbit doesn't fight wheel-zoom and both input paths feel identical.
- [P1] Perf overlay (frame time + integrator cost) — wire store `fps` into per-frame GPU/CPU cost bars for debugging slow machines.
- [P1] DPR-aware rendering — scale internal resolution on retina/high-DPI to keep pixel cost steady.
- [P1] WebGL capability guard — graceful fallback message + degraded settings (fewer steps, no bloom) on WebGL1/software renderers.
- [P1] Geodesic step-count dashboard — show live average steps per ray to make the cost model transparent.
- [P1] In-app gravity "cheat sheet" — a collapsible glossary of r_s, ISCO, ergosphere, photon sphere with the constants they come from.
- [P1] Spin-limit guard UI — clamp and explain the â→0.998 cap so users know why they can't go "more extreme".
- [P1] Two-view synchronized rendering — render side-by-side with the CPU tracer for a low-res reference to compare texture/beaming.
- [P1] Settings persistence for camera/UI prefs — remember last frame settings (not just params) on reload.
- [P1] Export presets as importable files — download/upload a JSON param set for sharing between machines.

## P2

- [P2] User-generated preset gallery — a small curated set of community/shared scenes integrated into the preset picker.
- [P2] Procedural soundscape variations — distinct audio themes for Schwarzschild vs near-extremal Kerr.
- [P2] Beam-across timeline of the disk — animated emissivity/temperature profile vs radius plots overlaid on the scene.
- [P2] Frame-dragging particle stream — advect test particles around the hole to visualize dragging beyond just the disk.
- [P2] Geodesics of test-particle orbits — chart ISCO/eccentric/plunging orbits to compare with photon threads.
- [P2] Möbius-mode false-color / custom colormaps — choose scientific (viridis, inferno) palettes for the disk instead of blackbody.
- [P2] VR/AR support stub — an XR mode that lets users walk around the hole (three.js `@types/webxr` already a dependency).
- [P2] DOM export of a static figure — save an SVG/PNG annotated diagram for slides (science mode + export).
- [P2] Storybook/slideshow autoplay — a keyframed narrator that cycles presets with captions for background exhibition use.
- [P2] Real astronomical parameter presets — preloaded M87*, Sgr A*, and Gargantua scales with accurate masses/spins.
- [P2] Grid/coordinate overlay — Boyer–Lindquist r and θ grid lines for pedagogic shots.
- [P2] Relativistic jet rendering — optional forward jet cone extending the visualizer toward a fuller picture of an AGN.
- [P2] Photon-ring zoom mode — auto-dolly to frame and magnify the thin n=1 ring for close inspection.
- [P2] Scriptable exposure/grade presets — a few filmic color grades (Interstellar, black-and-white) as one-click looks.
- [P2] Buffer/fade transition between presets — dissolve or crossfade rather than linear tween for a professional feel.
- [P2] In-shader performance profiler — a debug heatmap of per-pixel steps to spot costly regions.
- [P2] Reproducible-seed starfield — a fixed-seed toggle so the sky is deterministic across runs/screenshots.
- [P2] Animation-export framing presets — preset aspect ratios and resolutions (16:9, 4:3, 1080p, 4K) for the capture tools.
- [P2] Achievements-lite progress — milestones ("found the photon ring", "max spin") shown as a lightweight progress list.
- [P2] Localization of UI labels — consolidate the Chinese/English strings behind an i18n table.
- [P2] Reduced-resolution "physics-only" FAST mode — a quick low-step/no-bloom render for comparative study.
- [P2] Horizon-crossing showpiece — a scripted dolly that dives toward r₊ to dramatize the capture region.
- [P2] Lensed star-arc trail capture — enable a shutter mode that stills the lensed Einstein arcs for backdrops.
- [P2] Touch tap-to-inspect on mobile — a single-tap ray inspect with an on-screen readout panel.
- [P2] haptic feedback on goals — subtle vibration when a goal (photon ring) is completed on mobile.
- [P2] Disk inclination sweep — a preset that orbits camera from edge-on to pole-on to reveal the ring-to-donut morph.
- [P2] Export the exact shader source — a button to copy the GLSL for reuse/teaching.
- [P2] Live λ/η probe readout — show conserved impact parameters under a hovered pixel as first-class diagnostics.
- [P2] Deterministic regression corpus — a set of fixed (mass,spin,disk) cases fed to the screenshot harness for golden images.
- [P2] Thread-count / windings histogram — a plot of ray winding counts across the frame to visualize the photon shell.
- [P2] Base-64 preset sharing — compact one-line tokens to paste/share presets without a full URL.
- [P2] Event-log "physics transcript" — a running log of every user change (â 0.90 → 0.91) for reproducibility.
- [P2] Dark-light UI theme — a light background theme for use in bright rooms / on projector.
- [P2] Sci-fi HUD skin — an optional decorative HUD style (optional, purely aesthetic) without changing readability.
- [P2] Community roadmap voting scaffold — a placeholder file/panel for surfacing the most-requested features.
- [P2] Final documentation polish — an index that maps every physics constant to its source file for onboarding.
