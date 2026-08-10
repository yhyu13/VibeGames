# Global Voxel Raytrace and Moonlit Water Design

Status: approved direction
Project: `6_patapon3D`
Date: 2026-08-10

## Goal

Make the voxel ray-tracing renderer the default visual path for both the intro and gameplay, with no emissive-driven lighting. Add a foreground moonlit water pool that reflects the scene with animated waves while remaining outside gameplay collision.

## Visual Direction

- Real directional sun lighting with voxel shadow rays and contact occlusion.
- No emissive materials or bloom as the primary lighting mechanism.
- Night-sky gradient, moon, stars, atmospheric fog, and distant silhouettes remain procedural and asset-free.
- Voxel characters, drums, boss, audience, and arena share one material-ID voxel representation.
- A foreground water pool occupies the lower camera-facing portion of the scene and does not replace the battle arena.

## Renderer Architecture

### Shared renderer

`VoxelRaycaster` becomes a shared engine adapter used by intro and gameplay. The core simulation remains renderer-agnostic. The renderer consumes a snapshot plus scene/animation state and rebuilds or updates the GPU voxel grid.

Responsibilities:

- Maintain static arena voxels and dynamic entity voxels.
- Upload material IDs through `Data3DTexture`.
- Perform GLSL3 DDA traversal per pixel.
- Shade hits with sun diffuse, deterministic soft shadow taps, voxel AO, and specular response.
- Render procedural sky, moon, stars, fog, and distant background when no grid hit exists.
- Expose a capability/quality mode so unsupported or slow devices can use the existing raster PBR adapter.

### Default and fallback

- WebGL2 plus `Data3DTexture` support: raytrace path is default.
- Capability failure or sustained frame time over the quality threshold: switch to the existing raster PBR adapter.
- Fallback is explicit and observable through the existing performance/debug surface; gameplay state must not reset during a renderer switch.

### Lighting contract

- Sun direction and color are uniforms and may move slowly for intro drama.
- Gameplay may use a stable sun direction or a controlled time-of-day value.
- All visual brightness comes from direct/ambient lighting and sky sources; no object emissive contribution is used.
- Shadow sampling is deterministic to prevent static grain. The current five-tap sun-disk pattern is the baseline.

## Foreground Moonlit Water

### Placement

- A non-colliding foreground pool sits between the camera and the arena, below the primary combat read.
- The pool must not alter simulation bounds, unit positions, hit tests, or command timing.
- The pool is a renderer-only layer in the scene manifest.

### Reflection model

Use the approved performance-first mode:

- Low-resolution reflection buffer or reflected scene sample.
- Two or three deterministic Gerstner/sine wave layers for normal and UV distortion.
- Fresnel weighting: grazing angles reflect more sky/scene; near-normal angles retain dark blue water albedo.
- Moon reflection is a narrow, soft streak distorted by wave phase.
- Sun reflection remains available when the gameplay lighting direction is above the horizon.
- Character/arena reflection is approximate and may be clipped/faded near the pool edge.
- No recursive multi-bounce reflection.

### Water material

- Dark blue/purple non-emissive albedo.
- Low-to-medium roughness with controlled specular response.
- Physical-looking highlights come from the moon/sun lighting uniforms and reflected color, not emissive.
- Subtle depth/fog gradient hides the pool far edge.
- Mobile/low-quality mode reduces reflection resolution and wave samples before disabling the pool.

## Intro Integration

- Intro starts with the same raytrace renderer and water pool active in the scene manifest.
- Intro darkness reduces sun/ambient contribution and background exposure through lighting uniforms, not by changing material emissive values.
- Awakening beats may animate sun angle, moon reflection intensity, wave amplitude, and shadow softness, but must preserve deterministic non-noisy sampling.
- Existing intro input and state timeline remain unchanged.

## Gameplay Integration

- Gameplay snapshots feed the shared voxel renderer for army, boss, arena, drums, audience, particles where practical, and water foreground.
- Simulation remains the authority for positions, attacks, timing, and collisions.
- Renderer-only water and reflection animation uses elapsed render time and never feeds back into simulation.
- Existing camera shake and performance watchdog remain compatible with the raytrace adapter.

## Quality and Performance

Targets:

- Desktop: 60 FPS at the current showcase resolution where possible.
- Mobile/slow WebGL2: stable degraded mode with lower ray/ reflection quality.
- No console errors or WebGL texture upload warnings.
- Deterministic shadow taps with no visible salt-and-pepper noise.

Degradation order:

1. Reduce internal render scale.
2. Reduce water reflection resolution and wave layers.
3. Reduce shadow taps from five to one.
4. Reduce voxel grid quality or dynamic update frequency.
5. Switch to raster PBR fallback.

## Verification

- Typecheck and production build.
- Intro smoke test: boot, input, impact, ending, replay.
- Gameplay smoke test: menu, ready, play, hit/attack, match-over, replay.
- Browser screenshots at intro, active gameplay, impact, and water reflection angles.
- Console assertion: zero errors, warnings, and `texSubImage3D` upload errors.
- Performance sample over a fixed two-second window for desktop and mobile viewport sizes.
