# DDGI (Dynamic Diffuse Global Illumination) — Research & Implementation Plan

Index for this folder's research into DDGI and a plan to implement it in three.js.

| File | Purpose |
|---|---|
| [research.md](research.md) | The algorithm, end to end — probe grid, octahedral mapping, ray tracing, Chebyshev visibility, hysteresis, light-leak mitigations, parameter defaults, and a survey of every existing three.js DDGI / ray-tracing repo. |
| [implementation-plan.md](implementation-plan.md) | How to build it in **three.js r185 (WebGPU + TSL)** on `three-mesh-bvh/webgpu` — decisions, C.A.T architecture, data structures, per-frame passes, frozen parameters, milestones, verification gates, risks. |

**One-paragraph summary:** DDGI ray-traces a sparse world-space grid of irradiance probes every frame, storing octahedral irradiance + depth-moments per probe, and reconstructs infinite-bounce diffuse GI at shading time via trilinear interpolation + a Chebyshev visibility test. The practical three.js substrate is WebGPU compute + `three-mesh-bvh/webgpu` (no official three.js DDGI exists; the only packaged one, `speedball-gi`, is ~1 month old). The plan recommends self-authoring on `three-mesh-bvh`, building on this repo's frozen WebGPU BVH *contract* in `9_3dplatform` (design-doc-only — no code yet) and the Radiance Cascades fallback in `7_hotlineShanghai`.
