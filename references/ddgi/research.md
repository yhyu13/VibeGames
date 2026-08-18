# DDGI — Dynamic Diffuse Global Illumination: Research Notes

> Systematic research on the DDGI algorithm (Majercik et al., JCGT 2019) and the three.js / web landscape for implementing it. Paired with [implementation-plan.md](implementation-plan.md).

## TL;DR

DDGI is a **real-time, world-space, ray-traced global-illumination** technique. It places a sparse 3D grid of **irradiance probes** in the scene; every frame, each probe casts ~256 rays (spherical Fibonacci, per-frame rotation) and accumulates radiance into an **octahedral** irradiance texture plus a **depth-moments** texture. At shading time, a surface point trilinearly blends the 8 surrounding probes, with a **Chebyshev inequality test** (variance-shadow-mapping style, on the stored depth mean/variance) rejecting occluded probes, and per-texel **hysteresis** (EMA, α≈0.97) smoothing the result over time. This gives infinite-bounce diffuse GI that sees around corners and off-screen, at a fraction of full path-tracing cost — at the price of light leaking around thin geometry, which a family of mitigations keeps in check.

For three.js, the practical substrate is **WebGPU compute shaders + `three-mesh-bvh/webgpu`** (real compute, real atomics, GPU BVH traversal). No official three.js DDGI exists — only *baked* `LightProbeGrid` and screen-space SSGI. The only packaged three.js DDGI (`speedball-gi`) is one month old and single-author. **Recommendation: self-author a DDGI probe system on `three-mesh-bvh/webgpu`** (see the impl plan).

---

## 1. What DDGI is and why it exists

DDGI ("Dynamic Diffuse Global Illumination with Ray-Traced Irradiance Fields", Majercik, Guertin, Nowrouzezahrai, McGuire — JCGT 8(2), 2019) is the dynamic generalization of **precomputed irradiance probes**.

| Technique | Sees off-screen? | Dynamic (runtime) occlusion? | Bounce GI? | Cost |
|---|---|---|---|---|
| SSAO | No (screen-space) | Yes | No (contact shadow only) | Very low |
| SSGI | No (screen-space) | Yes | 1 bounce | Low–med |
| Classic light probes / Enlighten | Yes (world) | **No (baked)** | Yes | Near-free at runtime |
| **DDGI** | **Yes (world)** | **Yes (ray-traced)** | **Infinite** | Med (1–2 M rays/frame) |
| Full path tracing | Yes | Yes | Yes | High |

Classic probe systems pre-bake irradiance and therefore **cannot resolve runtime visibility of dynamic geometry** → light and shadow **leaking**. DDGI fixes this with three ingredients (per NVIDIA's `Algorithms.md`):

1. **GPU ray tracing** recomputes per-probe irradiance each frame.
2. A **fast probe-update scheme** maintains per-probe **irradiance *and* distance** data.
3. A **statistics-based occlusion test** (Chebyshev) applied during interpolation.

**Why probes at all** (vs. screen-space or full path tracing): SSGI only sees what's on-screen and can't carry light around corners or from off-screen emitters. Full path tracing is too expensive for low-frequency diffuse at interactive rates. Probes form a **world-space irradiance field** — a sparse volumetric cache of incoming radiance queryable at *any* point (off-screen geometry, translucent surfaces, volumetrics that never appear in a GBuffer), and they support **infinite bounces** by having probes sample other probes. The trade-off is that probes capture only the **low-frequency diffuse** component; high-frequency detail must come from complementary passes (RTAO, screen-space contact shadows).

**The representation:** each probe stores, for every direction on the sphere, two things:
- **irradiance** `E(ω)` — radiance × cos θ integrated over the hemisphere, and
- **mean distance** `r(ω)` and **mean-squared distance** `r²(ω)` to the nearest surface.

The pair `(r, r²)` is a **radial Gaussian depth model** (mean μ, variance σ²) per texel that powers the Chebyshev visibility test.

---

## 2. The probe grid

A `DDGIVolume` is an axis-aligned (optionally rotated) grid defined by `origin`, per-axis `probeSpacing`, and per-axis `probeCounts`.

```
probeGridWorldPosition = probeCoords * probeSpacing
probeGridShift         = (probeSpacing * (probeCounts - 1)) * 0.5     // center about origin
probeWorldPosition     = probeGridWorldPosition - probeGridShift      // then rotate + translate
```

- **Spacing / density:** NVIDIA recommends **one probe every 2–3 m**. Notably, *sparser* grids often look better — dense grids localize each probe and reveal the grid structure. Use the minimum probe count that works.
- **Probe count:** `numProbes = probeCounts.x · probeCounts.y · probeCounts.z`. Probes are flattened with horizontal "planes" = texture-array slices; `probesPerPlane = probeCounts.x · probeCounts.z`, `probeIndex = planeIndex · probesPerPlane + (x + probeCounts.x · z)`.
- **Uniform spacing** within a volume; multi-resolution comes from *multiple volumes / cascades* (RTXGI's Infinite Scrolling Volume, and the 2021 "Scaling" follow-up paper), not per-probe variable resolution.

**Trilinear interpolation at a query point `x`:** find the **8 surrounding probes** (base = `floor` of grid coords, plus `+1` per axis), weight by fractional cell position `alpha = clamp((x - baseWorldPos)/probeSpacing, 0, 1)`.

**Per-probe backface / wrap-shading weight** (avoids the "no mutually-visible probe" failure when a surface detail's normal rules out every probe):

```
worldPosToProbe = normalize(probeWorldPos - x)
wrapShading     = (dot(worldPosToProbe, surfaceNormal) + 1) * 0.5
weight         *= wrapShading * wrapShading + 0.2          // squared, +0.2 floor so never → 0
```

**Surface bias** (applied to the *query position*, not the probe, to avoid self-occlusion):

```
surfaceBias = surfaceNormal * probeNormalBias + (-cameraDirection) * probeViewBias
// defaults: probeNormalBias = 0.1, probeViewBias = 0.1 (world units, scale-dependent)
```

---

## 3. Octahedral mapping

Each probe's sphere is unwrapped to a **single 2D square** via the **octahedral parameterization** (Cigolle et al. 2014). One continuous texture (no cube-map seams), supports hardware bilinear filtering.

**Encode** — unit direction → `[-1,1]²`:

```glsl
float2 octEncode(float3 direction) {
    float l1 = abs(direction.x) + abs(direction.y) + abs(direction.z);
    float2 uv = direction.xy * (1.0 / l1);
    if (direction.z < 0.0)
        uv = (1.0 - abs(uv.yx)) * signNotZero(uv.xy);   // fold lower hemisphere
    return uv;
}
```

**Decode** — `[-1,1]²` → unit direction:

```glsl
float3 octDecode(float2 c) {
    float3 d = float3(c.x, c.y, 1.0 - abs(c.x) - abs(c.y));
    if (d.z < 0.0)
        d.xy = (1.0 - abs(d.yx)) * signNotZero(d.xy);
    return normalize(d);
}
```

- **1-texel border:** DDGI textures carry a 1-texel border so hardware bilinear sampling interpolates correctly across the wrap/seam. Interior + 2 border texels = total per-side. Border texels copy the interior (corners copy diagonal neighbors, edges copy the wrapped opposite edge).
- **Resolution is asymmetric:** irradiance is stored **lower-res** than depth. RTXGI defaults: **6×6 interior (8×8 with border) irradiance** and **16×16 interior (18×18 with border) distance** per probe.

---

## 4. Ray tracing → radiance

**Ray distribution — spherical Fibonacci** (low-discrepancy, uniform on the sphere; *not* cosine-weighted at trace time — cosine weighting happens in the blend pass):

```glsl
float3 sphericalFibonacci(float i, float N) {
    const float b  = (sqrt(5.0) * 0.5 + 0.5) - 1.0;   // golden-ratio conjugate ≈ 0.618
    float phi      = TWO_PI * frac(i * b);            // golden angle
    float cosTheta = 1.0 - (2.0 * i + 1.0) * (1.0 / N);
    float sinTheta = sqrt(saturate(1.0 - cosTheta * cosTheta));
    return float3(cos(phi) * sinTheta, sin(phi) * sinTheta, cosTheta);
}
```

- **Per-frame jitter:** the whole Fibonacci set is **rotated by a random quaternion each frame** (James Arvo's Graphics Gems 3 method). The rotation applies only to *non-fixed* rays. This turns the low-discrepancy sequence into a temporally anti-aliased, blue-noise-like integration.
- **Ray budget:** `probeNumRays` rays per probe per frame — **default 256** (paper used 144–256); ~1–2 M rays/frame total. All probes updated every frame by default (RTXGI also allows lower-frequency / async updates, and the ISV only re-traces scrolled edge planes).
- **Fixed rays:** a stable, *non-rotated* subset (**32** default) used only for relocation/classification, not blending.
- **Hit classification** (per ray): `miss → distance = 1e27`; `backface → distance = -hitT · 0.2` (negated, 80%-shortened, marks + reduces influence); `frontface → radiance + hitT`.

---

## 5. Diffuse filtering — the blend pass

`DDGIProbeBlendingCS` runs **one thread per texel per probe** (thread group = `NUM_TEXELS × NUM_TEXELS`), compiled twice: radiance mode and distance mode.

**Radiance mode** — accumulate radiance × cos θ over all rays, weighted by the cosine between the texel's direction and each ray:

```glsl
probeOctantUV = octNormalizedCoords(threadCoords, interiorTexels);
probeRayDir   = octDecode(probeOctantUV);            // direction this texel represents
float4 result = 0;
for (rayIndex = 0; rayIndex < probeNumRays; rayIndex++) {
    rayDir = probeRayDirection(rayIndex);
    weight = max(0.0, dot(probeRayDir, rayDir));     // cosine weighting
    if (rayDistance < 0) { if (++backfaces >= maxBackfaces) return; continue; }  // reject backfaces
    result += float4(radiance * weight, weight);     // Σ L·cosθ, Σ cosθ
}
result.rgb *= 1.0 / (2.0 * max(result.a, epsilon));  // variance-reduced normalization
```

The `÷ (2·Σcosθ)` is a variance-reduction trick: cosine-weighted sampling has average `cosθ = 1/2`, so `Σcosθ ≈ N/2` and `÷(2·Σcosθ) ≈ ÷N`. The hemisphere solid angle `×2π` is applied at *query* time, not here.

**Distance mode** — store **both** `E[d]` and `E[d²]` (first two raw moments of the radial depth distribution):

```glsl
probeMaxRayDistance = length(probeSpacing) * 1.5;    // clamp far distances
weight = pow(weight, probeDistanceExponent);         // sharpen depth discontinuities (default 50)
for each ray:
    d = min(abs(rayDistance), probeMaxRayDistance);
    result += float4(d * weight, d*d * weight, 0, weight);   // Σ d·w, Σ d²·w, Σ w
result.rgb *= 1.0 / (2.0 * max(result.a, epsilon));
```

`variance = E[d²] − E[d]²` is the radial depth model's variance. Because depth is also `÷2`, the **sampler multiplies loaded depth by 2**.

**Backface rejection:** rays hitting backfaces are excluded from the radiance average; if > `probeRandomRayBackfaceThreshold = 0.1` of a probe's rays hit backfaces, the probe is assumed inside geometry and *nothing* is blended.

**Dual textures:** irradiance and distance are **separate texture arrays** (different resolution and format) — irradiance is the light, distance is the visibility-geometry proxy.

---

## 6. Visibility — the Chebyshev test

The depth texture stores `(mean, meanSq)` per texel = a **two-moment / variance-shadow-mapping** representation. At query time:

```glsl
float2 filteredDistance = 2.0 * probeDistance.SampleLevel(s, uv, 0).rg;  // ×2 undo blend ÷2
float  variance = abs(filteredDistance.x * filteredDistance.x - filteredDistance.y);  // σ² = E[d²]−E[d]²

float chebyshevWeight = 1.0;
float biasedDistToProbe = length(probeWorldPos - biasedWorldPos);
if (biasedDistToProbe > filteredDistance.x) {              // surface farther than mean → possibly occluded
    float v = biasedDistToProbe - filteredDistance.x;
    chebyshevWeight = variance / (variance + v * v);       // Chebyshev: P(X ≥ μ+v) ≤ σ²/(σ²+v²)
    chebyshevWeight = max(chebyshevWeight * chebyshevWeight * chebyshevWeight, 0.0);  // cube → contrast
}
weight *= max(0.05, chebyshevWeight);                       // never fully zero (fallback)
```

Additional shaping: a **crush threshold** keeps the curve continuous while killing tiny weights (`if weight < 0.2: weight *= weight²/0.2²`). The bound `σ²/(σ²+v²)` is the classic variance-shadow-mapping inequality — an upper bound on visibility probability given stored depth mean and variance.

**Storage formats:** depth `F16x2` (RG16F, `mean`+`meanSq`); irradiance `U32` (R10G10B10A2) or `F16x4` (RGBA16F); ray data `F32x2`/`F32x4`.

**Full query chain** (decode → integrate → normalize → tone-decode → solid angle):

```glsl
irradiance *= 1.0 / accumulatedWeights;   // normalize trilinear+Chebyshev weights
irradiance *= irradiance;                  // gamma-2 approximation of sRGB blend
irradiance *= TWO_PI;                      // hemisphere solid angle — completes the estimator
// on load, each probe value is decoded: probeIrradiance = pow(sample, gamma * 0.5)
```

---

## 7. Blending / hysteresis

Each texel is **exponentially-moving-average (EMA) blended** with its history to hide per-frame noise. `probeHysteresis` (history weight, **default 0.97** — close to 1 = stable; ≤0.9 = fast but flickers):

```glsl
result.rgb = pow(result.rgb, 1.0 / probeIrradianceEncodingGamma);   // tone-map into storage (gamma 5)
float3 delta = result.rgb - probeIrradianceMean;                    // history

float hysteresis = probeHysteresis;                                  // 0.97
if (dot(probeIrradianceMean, probeIrradianceMean) == 0) hysteresis = 0;  // first frame → converge instantly
if (maxComponent(probeIrradianceMean - result.rgb) > probeIrradianceThreshold)  // 0.25
    hysteresis = max(0.0, hysteresis - 0.75);                        // LARGE change → drop history fast
if (luminance(delta) > probeBrightnessThreshold)                     // 0.10
    delta *= 0.25;                                                   // clamp per-update impulse
newIrradiance = probeIrradianceMean + (1.0 - hysteresis) * delta;    // EMA
```

Distance is a plain lerp by hysteresis (no thresholds). The hysteresis (a) accumulates many samples over time to kill noise, and (b) reacts to dynamic lighting by temporarily dropping `h` by 0.75 on large changes. The unavoidable **latency** on lighting changes is a stated limitation.

**Defaults:** `probeIrradianceEncodingGamma = 5`, `probeIrradianceThreshold = 0.25`, `probeBrightnessThreshold = 0.10`.

---

## 8. Probe relocation & classification (optional robustness)

Two compute passes improve quality:

- **Relocation** (`ProbeRelocationCS`): if a probe lands inside geometry, nudge it. Detection counts **backface** hits among the **fixed rays**; if the ratio > `probeFixedRayBackfaceThreshold = 0.25`, the probe is likely inside a wall and is moved up to **45% of grid-cell distance** (staying in its voxel). Also keeps `probeMinFrontfaceDistance = 1.0` world unit from front-facing surfaces.
- **Classification** (`ProbeClassificationCS`): marks probes **active/inactive** to skip tracing + blending for useless probes. Phase 1 — inside geometry (backface fixed-ray ratio) → INACTIVE. Phase 2 — near front-facing geometry (stored distance vs. distance to the voxel's bounding planes) → ACTIVE else INACTIVE. State lives in the W channel of the `ProbeData` texture; inactive probes are skipped in blending and irradiance accumulation.

Both can run at lower frequency than the blend; relocation *moves* probes (offsets in `ProbeData.xyz`), classification only toggles a flag.

---

## 9. Light leaking and mitigations

**Why DDGI leaks:** each texel samples a large solid angle (low angular resolution), the grid is shallow relative to thin walls, and depth moments are aggregated over a whole texel — so the depth distribution can be **multi-modal** (a texel straddling a wall edge: half near, half far). The single-Gaussian Chebyshev bound then fails to reject the far surface and light leaks through.

**Mitigations** (documented in `DDGIVolume.md` + the paper):

| Mitigation | Mechanism |
|---|---|
| Wall thickness | represent walls with non-zero thickness ∝ probe density; **zero-thickness planes leak by construction** |
| Probe density | 2–3 m spacing; sparser grids often leak *less* (dense grids reveal grid structure) |
| Higher distance texel res | distance 16×16 vs irradiance 6×6 → finer angular granularity |
| Depth-range clamping | `probeMaxRayDistance = ‖spacing‖·1.5` caps far hits from poisoning moments |
| Chebyshev cube + crush | `cheb³` increases contrast; 0.05 floor + crush keep a smooth fallback |
| `probeViewBias` | pushes query point deeper where mean-distance variance is lower (needs per-scene tuning) |
| Per-texel depth | moments are per texel → directional visibility |
| Relocation / classification | keeps probes out of geometry / off useless locations |
| Contact-shadow fallback | DDGI is intentionally low-frequency; pair with RTAO / screen-space contact shadows |

---

## 10. Performance profile

- **Per-probe ray cost** ≈ `numProbes × numRays × (trace + hit)`. Dominant cost, but cheap because there are far fewer rays than full path tracing (a few probes vs. millions of pixels × bounces), rays only need first-hit diffuse radiance (no per-ray recursion — recursion happens *between probes*, amortized), and the signal is low-frequency so it can be heavily temporally filtered.
- **Memory (texture atlas), default settings** — a *demo-scale* volume (`4×4×3` = 48 probes × 256 rays ≈ 12k rays/frame) is trivially cheap (<1 MB); the numbers below are the *upper-bound* production scale:
  - Ray data `F32x2` = 8 bytes/ray → a 128×128×128 volume = 16,384 probes/plane × 256 rays × 8 B = **33.5 MB/plane** (largest resource).
  - Irradiance 6×6 interior (64 texels/probe) at U32 (4 B) or F16x4 (8 B).
  - Distance 16×16 interior (324 texels/probe) at F16x2 (4 B).
  - D3D12 caps a single resource at **4 GiB** → practical bound on volume size (~2 M probes).
- **Probe variability** (coefficient-of-variation per texel) lets the app *pause* tracing once converged and reactivate on light/geometry change — a major cost saver.
- **WebGPU vs WebGL2:** for GPGPU workloads, WebGPU compute is reported ~**20× faster** than WebGL2 fragment-shader tricks in one project's measurements (three-gpu-pathtracer issues #547 / three-mesh-bvh #735) — treat as an order-of-magnitude anecdote, not a benchmark.

---

## 11. Variants & alternatives

- **RTXGI (NVIDIA SDK):** the production DDGI. Adds infinite scrolling volumes, relocation + classification, probe variability, perceptual gamma-5 encoding, `R10G10B10A2`/`RG16F` storage, bindless resources. The 2021 "Scaling…for Production" (JCGT 10(2)) adds multi-volume/cascade handling and adaptive density.
- **Radiance Cascades (Alexander Sannikov):** replaces the uniform 3D grid with *directionally-aligned* cascading angular grids around the camera — sharper, direction-aware indirect light near the camera, but view/position-centric (not a true world-space field). **This repo already implements a 2D RC pipeline in `7_hotlineShanghai`** (`rc-lab/pipeline.ts`).
- **Surfel GI:** NVIDIA has been **superseding DDGI with surfel-based GI** (RTXGI's newer surfel path; ReSTIR GI). Surfels store per-texel/point light data on surfaces — better geometric fidelity, no volumetric grid, higher memory/update complexity. DDGI remains the simpler, widely-shipped reference.
- **Classic light probes / Enlighten / Unity probes:** baked, no runtime visibility — exactly the leaking DDGI fixes.
- **SSAO / SSGI:** complementary, not substitutes — SSAO is contact-shadow-only, SSGI is screen-space-only. `Algorithms.md` explicitly pairs DDGI + RTAO.

---

## 12. Key parameter reference (defaults)

| Parameter | Default | Meaning |
|---|---|---|
| `probeNumRays` | 256 (paper 144–256) | rays/probe/frame |
| `probeNumIrradianceInteriorTexels` | 6 (→ 8×8 w/ border) | irradiance angular res |
| `probeNumDistanceInteriorTexels` | 16 (→ 18×18 w/ border) | distance angular res |
| `probeHysteresis` | 0.97 | EMA history weight |
| `probeDistanceExponent` | 50 | depth-discontinuity sharpening |
| `probeIrradianceEncodingGamma` | 5 | storage tone curve |
| `probeIrradianceThreshold` | 0.25 | large-change detection |
| `probeBrightnessThreshold` | 0.10 | per-update impulse clamp |
| `probeRandomRayBackfaceThreshold` | 0.10 | inside-geometry reject |
| `probeFixedRayBackfaceThreshold` | 0.25 | relocation/classification |
| `probeViewBias` / `probeNormalBias` | 0.1 / 0.1 | world units, scale-dependent |
| `probeMinFrontfaceDistance` | 1.0 | world units |
| `probeMaxRayDistance` | `‖spacing‖·1.5` | far-hit clamp |
| `RTXGI_DDGI_NUM_FIXED_RAYS` | 32 | relocation/classification rays |
| probe spacing | 2–3 m | world units |

---

## 13. Existing three.js / web implementations (survey)

The decisive findings:

- **`speedball-gi`** is the **only packaged three.js DDGI** (MIT, WebGPU-only, on `three-mesh-bvh`), but v0.6.7, ~1 month old, single-author, ~11 stars, documented light-leaking + medium-scale limits, and a sharp "install before first render" footgun.
- **`three-mesh-bvh`** (MIT, 3.5k stars) is the **reuse anchor** — `three-mesh-bvh/webgpu` exports `BVHComputeData` + `getShapecastFn()`, which builds TLAS+BLAS storage buffers and generates WGSL traversal functions. This is exactly the ray-probe primitive DDGI needs, and both `speedball-gi` and `three-gpu-pathtracer` build on it. WebGL2 side provides `MeshBVHUniformStruct` + `BVHShaderGLSL` (texture-packed BVH for fragment shaders).
- **`three-gpu-pathtracer`** (MIT, ~1.8k stars) — full path tracer, not DDGI, but the canonical reference for scene/material flattening into GPU buffers and (new) WebGPU `PathTracerCore` compute architecture.
- **`erichlof/THREE.js-PathTracing-Renderer`** (CC0-1.0) — WebGL2 fragment-shader path tracer; demo-only, but public-domain shaders and a quadric-BVH reference.
- **NVIDIA `RTXGI-DDGI`** — the **authoritative algorithm reference** (HLSL/DXIL, DXR/VK), but under the **proprietary NVIDIA RTX SDK license** — *port the technique, do not copy the code*.
- **`xuechao-chen/DDGI`** — C++/GLSL paper reference, **no license file** (reference only).
- **Official three.js** has **no *dynamic* DDGI**. It ships **`LightProbeGrid`** (WebGPU `LightProbeGrid` + WebGL `LightProbeGridWebGL`) — a *baked/static* L2-SH irradiance grid (GPU-resident `bake()`, `bounces > 0` accumulates indirect) — plus an SSGI TSL node (`ssgi()`), and an **offline** path-tracer example (`webgl_renderer_pathtracer`: dynamic ray-traced GI, but not realtime). None of these is a realtime *probe-based* DDGI. `LightProbeGrid` ≠ DDGI (static bake vs. per-frame ray-traced probe update). A `LightProbeVolume` (irradiance volume) is a long-standing unmerged PR.
- **`Orillusion`** (TypeScript WebGPU engine) has a real **DDGI** (`DDGIProbeRenderer.ts`, irradiance volume, multi-bounce) — the closest open-source *WebGPU DDGI* source to study, but not three.js.
- **`jure/webgiya`** — surfel GI on WebGPU + three.js, vendors a patched `three-mesh-bvh` WebGPU backend; a strong WebGPU-GI pipeline reference.

### Comparison table

| Name | does-DDGI? | WebGL2 / WebGPU | License | Maturity | Reusability for a three.js DDGI |
|---|---|---|---|---|---|
| **speedball-gi** (npm) | **Yes (core)** | WebGPU only | MIT | Very low (v0.6.7, ~11 stars) | **Highest drop-in** — but young/leaky/med-scale |
| **three-mesh-bvh** | No (accel. struct) | **Both** | MIT | High (3.5k stars, active) | **Highest** — the GPU BVH layer to build rays on |
| **three-gpu-pathtracer** | No (full PT) | WebGL2 (legacy) + WebGPU (branch) | MIT | High | Med — borrow scene-flattening + WebGPU compute arch |
| **erichlof/THREE.js-PathTracing-Renderer** | No (full PT) | WebGL2 only | CC0-1.0 | Med-high (2.2k) | Low — demo shaders, not a library |
| **NVIDIA RTXGI-DDGI** | **Yes (reference)** | None (DX12/VK native) | NVIDIA proprietary | Med | Low (code) / **High (algorithm)** — port to WGSL |
| **xuechao-chen/DDGI** | **Yes (reference)** | None (C++/GLSL) | No license | Low (72 stars) | Low (code) / Med (reference) |
| **three.js `LightProbeGrid`** | No (baked SH probes) | Both | MIT (core) | High (official, r184+) | **High if baked/static is acceptable**; not DDGI |
| **three.js SSGI example** | No (screen-space) | WebGPU | MIT | Official | Low for DDGI |
| **jure/webgiya** | No (surfels) | WebGPU | MIT-ish (check) | Early | Med — WebGPU GI pipeline reference |
| **Orillusion** | **Yes (engine feature)** | WebGPU | engine license | Active | Med — WebGPU DDGI source (not three.js) |

---

## 14. Canonical source files (for the port)

The algorithm's exact shader math lives in the NVIDIA repo (HLSL). For a three.js/WGSL port, map these directly:

| NVIDIA file | Content to port |
|---|---|
| `rtxgi-sdk/shaders/ddgi/Irradiance.hlsl` | query / Chebyshev / trilinear / backface-wrap / surface-bias |
| `rtxgi-sdk/shaders/ddgi/ProbeBlendingCS.hlsl` | EMA blend + moment accumulation + border texels |
| `rtxgi-sdk/shaders/ddgi/include/ProbeOctahedral.hlsl` | oct encode / decode |
| `rtxgi-sdk/shaders/ddgi/include/ProbeRayCommon.hlsl` | ray direction + ray-data pack |
| `rtxgi-sdk/shaders/Common.hlsl` | spherical Fibonacci |
| `rtxgi-sdk/include/rtxgi/ddgi/DDGIVolume.h` | all defaults + volume config |

The octahedral atlases map to three.js `DataArrayTexture` (WebGL) / `StorageTexture` + `Storage3DTexture` (WebGPU). There is **no hardware ray tracing in the browser** — ray queries must use a software ray-marcher or `three-mesh-bvh` GPU traversal.

---

## Sources

- [RTXGI Algorithms.md](https://github.com/NVIDIAGameWorks/RTXGI-DDGI/blob/main/docs/Algorithms.md)
- [RTXGI DDGIVolume.md](https://github.com/NVIDIAGameWorks/RTXGI-DDGI/blob/main/docs/DDGIVolume.md)
- [RTXGI ShaderAPI.md](https://github.com/NVIDIAGameWorks/RTXGI-DDGI/blob/main/docs/ShaderAPI.md)
- [DDGI paper — JCGT 8(2) 2019](https://jcgt.org/published/0008/02/01/)
- [Scaling Probe-Based GI — JCGT 10(2) 2021](https://jcgt.org/published/0010/02/01/)
- [Cigolle et al. octahedral mapping](http://jcgt.org/published/0003/02/01/)
- [speedball-gi (npm)](https://www.npmjs.com/package/speedball-gi) · [cl0nazepamm/speedball](https://github.com/cl0nazepamm/speedball)
- [three-gpu-pathtracer](https://github.com/gkjohnson/three-gpu-pathtracer)
- [three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh) · [WEBGPU_API.md](https://github.com/gkjohnson/three-mesh-bvh/blob/master/WEBGPU_API.md)
- [erichlof path tracer](https://github.com/erichlof/THREE.js-PathTracing-Renderer)
- [xuechao-chen/DDGI](https://github.com/xuechao-chen/DDGI)
- [three.js LightProbeGrid WebGL PR #33125](https://github.com/mrdoob/three.js/pull/33125) · [WebGPU LightProbeGrid #33913](https://github.com/mrdoob/three.js/commit/9aff72325451713990c8bb62120e3399d334b569)
- [three.js SSGI example](https://github.com/mrdoob/three.js/blob/dev/examples/webgpu_postprocessing_ssgi_ballpool.html)
- [three.js TSL reference](https://github.com/mrdoob/three.js/blob/dev/docs/pages/TSL.html)
- [webgiya](https://github.com/jure/webgiya) · [Orillusion](https://github.com/Orillusion/orillusion) · [Shade DDGI forum thread](https://discourse.threejs.org/t/shade-webgpu-graphics/66969)
