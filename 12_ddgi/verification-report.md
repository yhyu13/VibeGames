# 12_ddgi — Verification Report

> DDGI probe system (impl-plan M1–M2). Updated 2026-08-18.

## M1 — Core math (pure) ✅

- `src/core/`: octahedral, fibonacci (spherical-Fibonacci + Arvo quaternion rotation), probeGrid (trilinear/wrapShading/surface-bias), chebyshev (σ²/(σ²+v²) + cube + crush + floor), hysteresis (EMA, threshold-drop, impulse clamp, asymmetric by design), moments (÷2Σcosθ normalization, E[d]/E[d²]), constants (frozen RTXGI param table).
- **50/50 golden-vector unit tests pass** (hand-computed values; caught 3 of my own test-expectation errors, incl. the directional asymmetry of the hysteresis branches).
- `npx tsc --noEmit` 0 errors; `npm run build` green.

## M2 — Trace + blend (WebGPU) ✅

- `DdgiBvh` (BVHComputeData subclass): injects per-object `emissive: vec3f` into the transform buffer (extended struct, 40-float stride) — the demo light source.
- Kernels (TSL `wgslFn` compute): trace (per probe-ray raycast via `bvh_RaycastFirstHit`, miss/backface/frontface classification, emissive shading) → blend irradiance (6×6 interior, cosine accumulation, gamma-5 EMA) → blend distance (16×16 interior, moment accumulation, exponent-50 weighting, max-ray clamp) → octahedral border fill.
- CPU generates per-probe per-frame ray sets from the pure core (CPU/GPU parity).
- Debug: `window.__ddgi.readProbeSummary()` (rayData readback), probe gizmos colored by readback, live irradiance-atlas overlay.

### Browser verification (Playwright, dev server 5189)

- **0 GPU validation errors / 0 shader compile errors** after fixes.
- 75 probes × 256 rays: **4 probes lit** (all within card line-of-sight, brightest avgL 0.281 @ 53% hit), **71 dark** (incl. every wall-occluded probe; hitFrac=1 but non-emissive → 0 radiance). Thick-wall occlusion verified at probe level.

### Debugging log (worth keeping)

1. `wgslFn` parse failure: three r185 WGSL parser does not strip `// fn` markers (that's a `wgslTagFn` convention) — kernels must start directly with `fn compute(`.
2. Storage-buffer indexing: three wraps non-struct storage buffers as `{ value: array<T> }` — WGSL must use `ddgi_x.value[i]` (three-mesh-bvh's own generated code does the same).
3. First-frame hysteresis: impulse clamp (luminance > 0.1 → ×0.25) applies even on frame 1 — cold start reaches 25% of the value (faithful to RTXGI formula).
4. `textureLoad` on `texture_storage_2d<rgba16float, read_write>` works (no level arg).

## Not done (per plan §0 non-goals / M3+)

- Material query node (trilinear + Chebyshev at shading) — M3.
- Indirect bounce term in trace radiance (probes sampling probes) — M3.
- WebGL2 fallback (baked `LightProbeGrid`) — plan §1 fallback ladder.
- Relocation/classification kernels — M4.
- §10.0 gate: demo scene named as v1 consumer (user decision 2026-08-18).
