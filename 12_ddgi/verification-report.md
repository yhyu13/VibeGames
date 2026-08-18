# 12_ddgi — Verification Report

> DDGI probe system (impl-plan M1–M3). Updated 2026-08-18.

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

## M3 — Shading-time query (GI applied to surfaces) ✅

- `DdgiMaterialNode.ts` builds the query as a `wgslFn` (research.md §6): surface bias (normal + view), grid→trilinear over the 8 surrounding probes, wrap-shading, **Chebyshev visibility rejection** against the distance atlas (`σ²/(σ²+v²)` + cube + floor, ×2 undo blend ÷2), octahedral bilinear atlas sampling, then the decode chain (pow(sample, γ·0.5) → normalize → square → ×2π).
- Manual bilinear via `textureLoad` (no sampler binding dependency) + `ddgi_octEncode` / `ddgi_sampleBilinear` WGSL helpers.
- `main.ts` lights the Cornell box with a **custom lambert node material**: `color = albedo × (direct N·L + DDGI indirect)`; the three.js DirectionalLight/AmbientLight are gone — direct light is a shader uniform, GI is the query output.
- `DdgiSystem` accepts a pre-built volume (the query needs the volume before the scene meshes exist).

### Browser verification

- **0 GPU errors** after fixes; scene renders with the warm emissive card's GI bleeding onto nearby walls, dim direct sun elsewhere, and the thick wall still occluding (leak behavior).
- Compute field intact: probe 41 brightest near the card (warm emissive (5,1.5,0.5) → lower avg than the M2 white card).

### Debugging log (worth keeping)

5. `wgslFn` with `texture_2d<f32>` params + `textureLoad(tex, ivec2, 0)` works in the fragment pass — no sampler needed.
6. WGSL `let` is immutable — the query's final `irr = irr * irr` needed `var irr`.
7. TSL `mul`/`add` function overloads are finicky with color×vec3; use method chaining (`a.mul(b.rgb)`) and type the query return as `Node<'vec3'>`.

## Not done (per plan §0 non-goals / M3+)

- Indirect bounce term in trace radiance (probes sampling probes) — M3/M4.
- Border wrap (opposite-edge) — deferred from M2, still same-edge clamp.
- WebGL2 fallback (baked `LightProbeGrid`) — plan §1 fallback ladder.
- Relocation/classification kernels — M4.
- §10.0 gate: demo scene named as v1 consumer (user decision 2026-08-18).
