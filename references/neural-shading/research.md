# SIGGRAPH 2026 Neural Shading — Findings for a Browser Demo

> Primary-source notes for implementing a Three.js + WebGPU/WebGL **neural material** intro scene. Numbers below are from the course repo and cited papers, **not** secondary articles.
>
> Companion location: `references/neural-shading/` (same convention as `references/ddgi/`).

## TL;DR

The SIGGRAPH 2026 course *Introduction to Neural Shading* is a teaching walk-up to **Zeltner et al. 2024 “Real-Time Neural Appearance Models”**: a **shared decoder MLP** + **per-texel latent code** approximates `f(uv, ωi, ωo)`. The course `neural/` path implements **eight additive steps**. The production-shaped decoder in the repo is:

```
latent z ∈ R^8  (bilinear sample of a 4096²×8 texture)
+ 6 direction channels  (raw ωi,ωo  or  Rusinkiewicz (wh, wd))
→ Linear 14→32  → leaky ReLU(0.01)
→ Linear 32→32  → leaky ReLU(0.01)
→ Linear 32→3   → exp  (steps 01–03)  or  scaled-sigmoid×1e5  (step 04+)
```

Later steps add **two learned shading frames** (decoder grows to **20 direction channels**) and a **training-only encoder** `29→64→64→64→8` that is **baked into the latent texture and dropped at runtime** (paper + slides; course step 07 still runs the encoder live as a teaching device).

**Browser port of the *proposition*** (latent texture + shared MLP ≈ BRDF) is feasible **without NVIDIA Cooperative Vector / Slang**. Do **not** port CoopVec, autodiff training, the 4096² latent, or the MDL ceramic teacher into the browser. Bake a small latent + decoder offline; evaluate a scalar `14→32→32→3` (or `8+6`) MLP in a fragment or compute shader.

**Do not train in-browser** for the intro scene. Course training is 100k Adam steps of 64×64 batches against an MDL teacher on Vulkan CoopVec. Ship precomputed weights.

---

## 1. What the course actually is

| Fact | Source |
|---|---|
| Course title *Introduction to Neural Shading*, Sunday 19 July 2026, 9:00–12:15 PDT, Room 515 A | [shader-slang.org/landing/siggraph-26](https://shader-slang.org/landing/siggraph-26/) |
| Materials repo `shader-slang/neural-shading-s26` | [github.com/shader-slang/neural-shading-s26](https://github.com/shader-slang/neural-shading-s26) |
| Slides PDF (292 pages) | [slides/Neural_Shading_Course_Slides_2026.pdf](https://github.com/shader-slang/neural-shading-s26/raw/refs/heads/main/slides/Neural_Shading_Course_Slides_2026.pdf) |
| Instructors on title slide: Benedikt Bitterli, Chris Cummings, Kai Zhang, Shannon Woods (NVIDIA) | slides p.2 |
| Agenda: Fundamentals → first MLP → neural texture → autodiff → hardware accel → **simple neural materials** → compression vs learning | slides p.3 |
| Related HPG 2026 talk: `neural.slang` standard module for inline NNs | [same landing page](https://shader-slang.org/landing/siggraph-26/); slides PDF `/assets/downloads/neural_slang_hot3d.pdf` |
| Python examples need `slangpy` 0.43.1 (bundles Slang 2026.12) | [repo README](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/README.md) |
| `neural/` **requires Windows/Linux + NVIDIA GPU** (Vulkan CoopVec). `mipmap/`, `network/`, UTracer run on macOS/Metal (UTracer uses scalar decoder on Metal) | README “Platform Support” |

The repo is **not** a game engine. It is four tracks:

1. `autodiff/` — `fwd_diff` / `bwd_diff` toys.
2. `mipmap/` — train a mip chain with a loss (S2025 carry-forward).
3. `network/` — image-fitting MLP, ending at a **4-channel 32×32 latent** reconstructing `slangstars.png`.
4. `neural/` — **the 8-step neural *material*** (SVBRDF), plus `utracer/` viewer and `materials/` MDL teachers.

---

## 2. The eight neural-material steps (repo, not slides sketches)

Each step is `python neural/step_XX_*/run.py`. READMEs and `run.py` / `.slang` are the contract. Slides sometimes show a **4-latent teaching sketch** (p.189 `LinearLayer<4+6,32>`); **the runnable code uses 8 latents**.

| Step | Directory | What it adds | Decoder I/O | Still in runtime eval? |
|---|---|---|---|---|
| 01 | `step_01_latent_texture` | Direct-opt latent + decoder vs ceramic MDL. Uniform UV + **uniform hemisphere** `(wi, wo)`. | `8 + 6 → 32 → 32 → 3`, `exp` | Latent + decoder |
| 02 | `step_02_rusinkiewicz_sampling` | Same net. Training samples are **uniform Rusinkiewicz (θh, θd, φh, φd)**. Inputs still raw `wi, wo`. | same | same |
| 03 | `step_03_rusinkiewicz_parameterization` | Decoder sees **`(wh, wd)`** instead of `(wi, wo)`. | same widths, different 6 dirs | same |
| 04 | `step_04_activations` | Hidden **leaky ReLU** kept; RGB **`scaled_sigmoid` with scale `1e5`** instead of `exp`. | same | same |
| 05 | `step_05_color_augmentation` | Train-time RGB **permute/duplicate**, annealed 1→0 over 10k iters. Render/val unaugmented. | same | same |
| 06 | `step_06_shading_frame_rotation` | **2 learned frames** from latent via `Linear(8 → 12)`. Rotate `wh, wd` into both frames. | **`8 + 12 → 32 → 32 → 3`** | Latent + frame layer + decoder |
| 07 | `step_07_encoder_network` | Replace trainable latent with **encoder MLP**. On-screen “latents” are encoder previews. | encoder `29→64×3→8`; decoder as 06 | **Encoder still live in this sample** |
| 08 | `step_08_multi_instance_training` | Population: **64→16→4→1** nets, batches **8²→16²→32²→64²**. Python loop, not packed dispatch. | same as 07 | same |

Sources: the eight `README.md` files under `neural/step_*` and the `run.py` constants quoted in §3.

**What 01 does *not* include** (README): no Rusinkiewicz, no color aug, no direction parameterization, no encoder.

**Teacher.** All eight steps match `materials/ceramic` via `MDLCeramicMaterialInstance(...).eval(sd, wo, sg)` — an NVIDIA MDL ceramic export, **not** a GGX uber-shader. Velvet exists alongside ceramic (`materials/velvet/`) but is not the default teacher.

**Viewer.** `python utracer/main.py --checkpoint path` (omit checkpoint → non-neural scene). Env: `data/brown_photostudio_02_2k.hdr`. Mesh: `data/shaderball.glb`.

---

## 3. Exact architecture numbers (repo)

### 3.1 Shared constants

From [`neural/common/latent_texture.py`](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/neural/common/latent_texture.py) and [`.slang`](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/neural/common/latent_texture.slang):

| Symbol | Value | Notes |
|---|---|---|
| `kLatentTextureNumLatents` / `LATENT_TEXTURE_NUM_LATENTS` | **8** | Hard fail if constructed with another count |
| Latent init | `U(-0.01, 0.01)` float32, seed 1 | Direct optimization |
| Sample | Bilinear, `uv * (size-1)`, clamp | 4 taps per channel, `[ForceUnroll]` |
| Optimizer | Adam on **float32** latents | Separate from fp16 weights |

From [`neural/common/adam.slang`](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/neural/common/adam.slang):

| Adam | Value |
|---|---|
| β1 | 0.9 |
| β2 | 0.999 |
| ε | 1e-8 |
| NaN guard | primal/grad/step all sanitized |

From [`neural/common/linear_layer.py`](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/neural/common/linear_layer.py):

| Weights | Value |
|---|---|
| Dtype | **float16** |
| Init | Xavier `sqrt(6/(in+out))`, uniform |
| Bias init | zeros fp16 |
| `USE_COOPVEC_LINEAR` | **True** (Vulkan required) |
| Scalar fallback | exists in `linear_layer.slang` `#else` — nested `row/col` loops, `MaxIters` on rows |

### 3.2 Step 01 decoder (minimal neural BRDF)

[`neural/step_01_latent_texture/run.py`](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/neural/step_01_latent_texture/run.py) + [`latent_texture.slang`](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/neural/step_01_latent_texture/latent_texture.slang):

| Item | Value |
|---|---|
| `LATENT_RESOLUTION` | **4096 × 4096 × 8** |
| `HIDDEN_WIDTH` | **32** |
| Layer 0 | `Linear(8+6, 32)` |
| Layer 1 | `Linear(32, 32)` |
| Layer 2 | `Linear(32, 3)` |
| Hidden act | `leaky_relu(x, 0.01)` |
| Output act | `exp(x)` |
| `kMinCos` | 1e-3 (reject grazing samples) |
| Batch | 64 × 64 |
| Val batch | 512 × 512 |
| LR | cosine 1e-3 → 1e-5 over **100_000** iters |
| Steps / frame | 16 |
| Checkpoint | every 16×1024 opts |
| Loss | mean abs `power_log` (p=3) of RGB vs teacher |
| Metric | mean log-L1 of `log(1+max(x,0))` |
| Preview | 1024² path-traced panels, 16 hemisphere lights / pixel / frame |

**Parameter count (decoder only, ignoring latent):**

```
32×(14+1) + 32×(32+1) + 3×(32+1) = 480 + 1056 + 99 = 1635
```

fp16 → **3.27 KiB**. The **latent** at course res is `4096² × 8 × 4 B = 512 MiB` fp32 — not a browser asset.

### 3.3 Rusinkiewicz (steps 02–03)

Sampling (step 02 README + step 03 slang `sample_uniform_rusinkiewicz`):

```
θh, θd ∈ [0, π/2]
φh, φd ∈ [0, 2π]
uniform in that 4D box → cartesian (wi, wo) via rotate_y / rotate_z
reject if min(wi.z, wo.z) ≤ 1e-3
```

Parameterization (step 03 `rusinkiewicz_parameterize`, also slides p.214):

```
wh = normalize(wi + wo)
v  = float3(wh.y, -wh.x, 0)
wd = wi * wh.z + cross(v, wi) + dot(v, wi) * v / (1 + wh.z)
```

Decoder then consumes `wh.xyz, wd.xyz` as the six direction inputs. This is the **Rusinkiewicz half/difference** frame ([Rusinkiewicz 1998](https://www.cs.princeton.edu/~smr/papers/brdf_change_of_basis.pdf)); Zeltner §2.1 notes Zheng/Sztrajman use it, and that **it “did not provide much benefit” in *their* decoder** — they instead rotate into **learned shading frames**. The course **keeps both**: Rusinkiewicz coords **and** (from step 06) two learned frames.

### 3.4 Output activation (step 04)

[`activations.slang`](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/neural/step_04_activations/activations.slang):

```
kDecoderOutputScale = 1e5
scaled_sigmoid(x):
  neg_exp = exp(-abs(x))
  positive = S / (S * neg_exp + 1)
  negative = S * neg_exp / (neg_exp + S)
  return x > 0 ? positive : negative
```

Rationale (slides p.198): BSDF eval is **unbounded**; mirrors dump huge energy into one direction; `exp` was unstable. Power-log loss (`p=3`) compresses the dynamic range during training.

### 3.5 Shading-frame rotation (step 06)

[`shading_frame_rotation.slang`](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/neural/step_06_shading_frame_rotation/shading_frame_rotation.slang) / `run.py`:

| Item | Value |
|---|---|
| `NUM_ROTATION_FRAMES` | **2** |
| `ROTATION_FRAME_ELEMENTS` | **6** (n.xyz + t.xyz) |
| `frame_decoder` | `Linear(8 → 12)` |
| Reconstruct | `n = normalize(n + (0,0,1))`, `t = normalize(t + (1,0,0))`, `b = cross(n, t)` |
| Apply | `to_local(w) = (dot(w,t), dot(w,b), dot(w,n))` on **both** `wh` and `wd` |
| Decoder in | `8 latents + 2×3 wh + 2×3 wd` = **20** direction channels, **28** total |
| Layer 0 | `Linear(8+12, 32)` |

This is the course’s copy of Zeltner §4.2 (“transformation to learned shading frames”). Slides p.232–238: **MLPs cannot multiply activations with each other**, so they cannot implement `T(z) · ω` inside the MLP; the rotation is a **fixed-function prior** inserted between latent and decoder.

### 3.6 Encoder (step 07)

[`encoder_network.slang`](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/neural/step_07_encoder_network/encoder_network.slang) / `run.py`:

| Item | Value |
|---|---|
| `kNumBsdfLayers` | 2 |
| `kBsdfLayerInputs` | **14** = n3 + t3 + albedo3 + roughness2 + weight3 |
| `kEncoderInputs` | **29** = 2×14 + 1 (mip sentinel; comment: “original pipeline stores 1 + mip_level”) |
| Encoder | `29 → 64 → 64 → 64 → 8`, leaky ReLU on the three hidden layers, **linear** on the last |
| Decoder / rotation | identical to step 06 |
| `bake_latent_texture` | compute kernel writes encoder(uv) into an `RWTensor` (used for checkpoint previews) |

**Runtime vs training (this is the load-bearing distinction):**

- **Zeltner §5.1** ([arXiv:2305.02678v2](https://arxiv.org/html/2305.02678v2)): encoder maps material parameters `k(x)` → `z(x)` during **phase 1**; after convergence the latent texture is **initialized by evaluating the encoder at every texel, then the encoder is dropped**. Finetune latents + decoder only. “Because the encoder only participates in training, it has no impact on the evaluation cost during rendering.”
- **Slides p.256** heading: *“After training: Bake your latents.”* Diagram: encoder MLP `64-64-64-8` consumes BRDF parameters → latent texture; runtime is latent + decoder.
- **Course step 07** still **calls `encoder.forward` inside `Network.eval`** (teaching: you can watch the encoder). The bake kernel is for previews/checkpoints, not the live eval path.

For a browser demo: **bake**. Do not run the 29→64³ encoder per fragment.

### 3.7 Multi-instance (step 08)

From the step 08 README and `run.py`:

```
64 nets ×  8×8  batches
16 nets × 16×16
 4 nets × 32×32
 1 net  × 64×64
```

100k iters total, prune on log-L1 at each quarter. Explicitly **not** the packed multi-instance trainer from the original neural-appearance system — “Python simply loops.” Checkpoints: `networks.npz` of all active nets; preview from the current best.

### 3.8 Teaching `network/` track (not a BRDF)

[`network/step_05_latent_texture.py`](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/network/step_05_latent_texture.py) / `.slang`:

| Item | Value |
|---|---|
| Latent | **32 × 32 × 4** |
| Decoder | `4 → 32 → 32 → 3`, leaky ReLU, **exp** |
| Teacher | `slangstars.png` (an image, not a BRDF) |
| Loss | gamma-space squared error |

Slides p.83 count for a **UV→RGB** 2→32→32→3 net: 67 biases + 1184 weights = **1251** params. That is the “first MLP in a shader” lab, not the material.

---

## 4. Zeltner / NVIDIA neural appearance (what the course is teaching)

Paper: Tizian Zeltner, Fabrice Rousselle, Andrea Weidlich, Petrik Clarberg, Jan Novák, Benedikt Bitterli, Alex Evans, Tomáš Davidovič, Simon Kallweit, Aaron Lefohn. **Real-Time Neural Appearance Models.** *ACM TOG* 43(3), Article 33, June 2024. DOI [10.1145/3659577](https://doi.org/10.1145/3659577). arXiv [2305.02678v2](https://arxiv.org/abs/2305.02678). Project: [research.nvidia.com/labs/rtr/neural_appearance_models](https://research.nvidia.com/labs/rtr/neural_appearance_models/). Author PDF: [nvidia_neural_materials_author_paper.pdf](https://research.nvidia.com/labs/rtr/neural_appearance_models/assets/nvidia_neural_materials_author_paper.pdf).

| Paper fact | Number / claim | Where |
|---|---|---|
| Latent code | **8-D** `z` | §4, Fig. 4 |
| Decoder shown in Fig. 3 | “8-channel latent texture + MLP **(3×64)**” | Fig. 3 caption |
| Learned frames | **N = 2** normals+tangents from one linear layer | §4.2 |
| Encoder | MLP on stacked layer parameters (albedo, roughness, n, t, …); LEAN-prefiltered for coarse MIPs | §5.1 |
| Encoder fate | **Dropped after baking the latent pyramid** | §5.1, Fig. 6 |
| Hierarchical latent | MIP pyramid; finest = source texture res; **Russian-roulette** between levels (not trilinear) | §4.1 |
| Train sampling | Uniform UV; **Rusinkiewicz half/diff** for `(ωi, ωo)` | §5.2 |
| Loss | **L1 in log space** (Zheng et al. 2021); sampler uses KL vs current BRDF | §5.2 |
| Schedule | 300k iters × two 65k batches; ~40B samples; **4–5 h / material on RTX 4090** | §5.2 |
| Precision | Train FP32, infer **FP16** (range fits) | §5.2, Fig. 7 |
| Runtime | Fully fused MLPs **inside RT / fragment shaders** via tensor-core CoopVec | §7 |
| Not pursued | Energy conservation, reciprocity, delta lobes, refraction (preliminary) | §3, §9 |

**Course vs paper decoder width:** course uses **2×32 hidden** (plus 32→3); paper’s quality figure uses **3×64**. Course is the *teaching* size. RTXNS Simple Inferencing (Disney BRDF stand-in) is **30→32→32→32→4** with frequency encoding — a different task (fit Disney, no latent texture).

Ceramic teapot in the paper (Table 1): 37 graph nodes, 5 layers, 121 parameters, 5 textures (11 channels), **1174 MTexels**. The course ceramic MDL is the same *family* of teacher.

---

## 5. Neural *texture compression* is a different product

Do not conflate NTC with neural *materials*.

| | Neural appearance (Zeltner / this course) | NTC (Vaidyanathan et al. / RTXNTC) |
|---|---|---|
| Approximates | `f(x, ωi, ωo)` (SVBRDF eval) | The **PBR texture set** (albedo/normal/ARM/…) |
| Runtime input | `z(uv)` + directions | Feature-grid sample + pos enc + LOD |
| Decoder | 8+dirs → small MLP → RGB *reflectance* | ~`4C0+C1+12+1` → **2×64 GELU** → N channels |
| Paper | TOG 2024 / arXiv 2305.02678 | SIGGRAPH 2023 TOG 42(4) Art. 88 / [arXiv 2305.17105](https://arxiv.org/abs/2305.17105) |
| SDK | [RTXNS](https://github.com/NVIDIA-RTX/RTXNS) | [RTXNTC](https://github.com/NVIDIA-RTX/RTXNTC) v0.10.0-beta |
| Course pointer | README “Useful Resources” | same |

NTC decoder (paper §4.4): two hidden layers of **64**, no output activation, **hardGELU** approx. Feature pyramid of two grids per MIP. This is **texture decompression**, then you still run a classical BRDF. A browser NTC demo is a different intro scene.

Rainer et al. (cited by Zeltner §2.1): [Rainer 2019](https://arxiv.org/) autoencoder over **reflectance measurements** (not material params); [Rainer 2020] follow-up. Course encoder follows Zeltner (encode **parameters**), not Rainer (encode measured slices).

---

## 6. Hardware: Cooperative Vector vs what browsers have

### 6.1 `VK_NV_cooperative_vector`

[Vulkan proposal](https://docs.vulkan.org/features/latest/features/proposals/VK_NV_cooperative_vector.html): SIMT-per-invocation **matrix-vector** multiply (`coopVecMatMulAddNV`) so each thread evaluates its own MLP using tensor cores. Explicitly **not** `VK_KHR_cooperative_matrix` (subgroup-shared matrices). Example in the proposal: **6 → 32 → 32 → 8** fp16 MLP.

API extras: `vkConvertCooperativeVectorMatrixNV` (host + device) to pack weights into `TrainingOptimal` / `InferencingOptimal` layouts; `vkGetPhysicalDeviceCooperativeVectorPropertiesNV` for type combos.

RTXNS README: Vulkan path needs **RTX 20-series+**, Vulkan SDK 1.3.296, driver **≥ 572.16**. DX12 path is **Agility SDK preview** (1.721 / SM 6.10 LinAlg) — “DO NOT SHIP” per RTXNTC docs.

Course `linear_layer.slang` `#if USE_COOPVEC_LINEAR` calls `coopVecMatMulAdd`, `coopVecOuterProductAccumulate`, `coopVecReduceSumAccumulate` with custom `[BackwardDerivativeOf]` because CoopVec autodiff needs the array boundary converted by hand.

### 6.2 WebGPU / WGSL — Cooperative Vector is **not** in browsers

Checked against primary specs, not blogs:

| Surface | Status on 2026-08-25 |
|---|---|
| [WebGPU `GPUFeatureName`](https://gpuweb.github.io/gpuweb/#gpufeaturename) | Has `shader-f16`, `subgroups`, `subgroup-size-control`. **No** `cooperative-vector`, **no** `coop-vec`. |
| [WGSL](https://gpuweb.github.io/gpuweb/wgsl/) | `f16` via enable `f16` (requires API feature `shader-f16`). `dot`, `fma`, matrices up to 4×4. **No** CoopVec types. |
| [gpuweb proposal `subgroup-matrix.md`](https://github.com/gpuweb/gpuweb/blob/main/proposals/subgroup-matrix.md) | **Status: Draft** (created 2025-10-02, issue [#4195](https://github.com/gpuweb/gpuweb/issues/4195)). This is **cooperative *matrix*** (subgroup-shared), **not** NV cooperative *vector* (per-lane). Compute-only. |
| [Khronos GDC 2026 WebGPU slides](https://www.khronos.org/assets/uploads/developers/presentations/3D_on_the_Web_2026_-_GDC_2026_WebGL%2BWebGPU_Update.pdf) | “Subgroup-based cooperative matrix multiplication” listed under **“standardization process on back burner.”** |
| Chrome “What’s New in WebGPU” through 151–152 | No CoopVec feature. |
| Slang target | [User guide “Supported Compilation Targets → WebGPU”](https://shader-slang.org/slang/user-guide/targets.html): **“Slang support for WebGPU is a work in progress.”** Emits WGSL; no CoopVec mapping. |

**Implication:** a browser demo must use the **scalar** mat-vec the course already ships in `linear_layer.slang` `#else` (and that UTracer uses on Metal). That path is exactly what WGSL can express.

`shader-f16` is optional — feature-detect; fall back to `f32` weights. Packed `dot4U8Packed` exists in WGSL but is the wrong precision for this MLP.

---

## 7. What we CAN port to Three.js + WebGPU/WebGL

### Yes (the proposition)

1. **Latent texture** as `RGBA16F` / `RGBA32F` (two 4-channel textures for 8-D, or one `rg32float` array). Bilinear sample in the fragment shader — hardware already does the 4-tap the course wrote by hand.
2. **Shared decoder MLP** `14→32→32→3` (or `20→32→32→3` if we include two frames) as unrolled `dot`s. ~1.6k fp16 weights in a uniform / storage buffer.
3. **Rusinkiewicz `(wh, wd)`** — a handful of float3 ops, no extra data.
4. **Learned shading frames** — one extra `8→12` layer + `normalize`/`cross`/`to_local`. Cheap.
5. **Split-screen teacher vs neural** on a shader ball / plane, env-map lighting like the course’s `sample_env_map` + `1/(2π)` hemisphere MIS.

### No (not for an intro scene)

| Piece | Why not |
|---|---|
| CoopVec / `TrainingOptimal` layouts | Not in WebGPU; NV-only |
| Slang `bwd_diff` training loop | WGSL has no autodiff |
| 4096²×8 fp32 latent | 512 MiB; overkill to *prove* the idea |
| Live encoder `29→64³` | Training-only in the paper; 3× the decoder |
| MDL ceramic teacher | Needs the course’s MDL runtime (`BSD-3-Clause` NVIDIA headers + Slang) |
| Step 08 population | Orchestration, not the visual proposition |
| NTC feature-grid decoder | Different paper/SDK |
| In-shader Adam | Possible in compute, pointless vs baking |

### WebGL2 fallback

A 14→32→32→3 MLP in GLSL ES 3.00 fragment shaders is fine (loops of 32, or fully unrolled). No `f16` — use `float`. No compute. Latent as two `RGBA16F` if `EXT_color_buffer_float` / `OES_texture_float_linear` allow; else `RGBA8` quantized latents (quality hit). Prefer WebGPU; keep WebGL as a scalar-f32 fallback.

---

## 8. Recommended smallest intro scene

**Proposition to prove:** *a latent texture + one shared MLP approximates `BRDF(uv, ωi, ωo)` well enough that a lit surface matches a classical teacher.*

Ship **one plane or shader-ball**, one env map, two viewports (teacher | neural), one HUD readout (MSE / rel-L1). No path tracer.

| Choice | Recommendation | Why |
|---|---|---|
| Teacher | **GGX + Lambert** (Disney-ish, 1 specular lobe) authored in WGSL/TSL | Course teacher is MDL ceramic; we cannot run that in-browser. GGX is the standard real-time stand-in (RTXNS Simple Inferencing does Disney the same way). |
| Latent | **256² × 8**, fp16 (two RGBA16F) ≈ **1.0 MiB** | Course 4096² is a gigatexel-scale problem (Zeltner §5). 256² is enough to show spatial variation (rust / glaze / prints). |
| Decoder | **`8+6 → 32 → 32 → 3`**, leaky ReLU 0.01, **scaled-sigmoid 1e5** or `exp` | Matches course steps 03–04. 1635 params. |
| Directions | **Rusinkiewicz `(wh,wd)`** in the shader | Cheap prior; course step 03 is the first quality jump. Skip learned frames for v1 (step 06). |
| Encoder | **None at runtime** | Bake `z(uv)` offline from `(albedo, roughness, normal)` or from the GGX params themselves. |
| Shading frames | v1: **no**. v1.1: one frame (`8→6`) if GGX normal maps look “stuck.” | MLP cannot rotate; only add if the teacher is normal-mapped. |
| Weights | **JSON or binary Uniform buffer**, row-major fp32 or fp16 | Converted from a tiny offline trainer. |
| Compare | Freeze camera; same `ωi` construction as course (`normalize((0.5,0.5,1)−(uv,0))`) plus a movable point light | Makes “neural ≈ teacher” visually checkable. |

**Success criteria:** neural panel is recognizably the same material (highlight shape + albedo map) at 1 spp env-map; decoder < 0.2 ms at 1080p on an integrated GPU; zero CoopVec.

That is smaller than course step 01 (no 4k latent, no MDL, no autodiff) and still **the same sentence** as slides p.186–190: “pass directions to a network… and then texture it.”

---

## 9. WGSL / TSL implementation notes (no code dump)

### 9.1 Layout

Store each `Linear(in, out)` as:

- `weights`: `out × in` **row-major** fp32 (or fp16 in a `vec2<u32>` pack). Course scalar path is `weights.load(neuron, input)` = **rows = outputs**.
- `bias`: `out` floats.
- Uniform-buffer cap is 64 KiB default — 1635×4 B = 6.5 KiB, fine. Do **not** use CoopVec `TrainingOptimal` packing.

TSL (`three` WebGPU nodes): a `Fn` that takes `float[]` / `vecN` and does the three layers. Three.js `TSL` has `float`, `vec3`, `loop({ start, end })` — for width 32, **unroll in JS when generating the node graph** (course comment: DXC hangs on `ForceUnroll` of big nets; WGSL compilers are happier with 32).

### 9.2 Mat-vec

WGSL has no `mat14x32`. Two portable styles:

1. **Arrays + explicit loops** (matches course scalar `LinearLayer.forward`).
2. **Pack 32-wide activations as two `mat4x4` + leftovers** and use `dot` on `vec4` chunks — better occupancy, same math.

Do **not** wait for `subgroupMatrixMultiply`: draft, compute-only, and it is **matrix-matrix**, not per-pixel mat-vec.

### 9.3 Activations

```
leaky_relu(x) = select(x * 0.01, x, x > 0)
```

Output: start with `exp(x)` if the teacher is in a small range; switch to the course `scaled_sigmoid` (scale `1e5`) if highlights blow up. Keep the **same** activation used at train time.

### 9.4 Latent fetch

Prefer **hardware bilinear** on 4-channel textures:

- `tex0`: z0..z3, `tex1`: z4..z7, both `rgba16float`, `filterable` (needs `float32-filterable` only if you store fp32).
- Course bilinear is on a **non-normalized integer grid** (`uv * (size-1)`). If using `textureSample`, match that: either pad + use `textureSampleLevel` with UVs computed the same way, or `textureLoad` four corners (exactly the Slang).

8-channel as a 2D array texture (`texture_2d_array<f32>`, layer = channel) also works; bilinear then is manual.

### 9.5 Directions

Build `wi, wo` in the **shading frame** (n = +Z in the course’s flat-plane teacher). Then:

```
wh = normalize(wi + wo)
v  = vec3(wh.y, -wh.x, 0)
wd = wi * wh.z + cross(v, wi) + dot(v, wi) * v / (1 + wh.z)
```

Concatenate `z[8], wh, wd` → 14-vector. Guard `wh.z ≈ -1` (division).

### 9.6 Precision

- Feature-detect `adapter.features.has('shader-f16')`.
- Course inference is fp16 weights / fp32 latents. In WGSL, mixed: `f16` weights, `f32` accumulators (`dot` promotes).
- Without `shader-f16`, store fp32 weights (still only 6.5 KiB).

### 9.7 Cost sanity

Per fragment, step-01 decoder:

```
14×32 + 32×32 + 32×3  MACs = 448 + 1024 + 96 = 1568 MACs
+ 64 leaky ReLUs + 3 exp/sigmoid
```

Trivial next to a GGX + IBL stack. The **texture fetch** (8 bilinear channels) dominates before the MLP does. This is why Zeltner spent the tensor cores: they were inlining **inside a path tracer at many hits**, not a single deferred blob.

---

## 10. Train in-browser vs bake weights

| Option | Verdict |
|---|---|
| **Bake offline, ship weights + latent** | **Do this.** Matches Zeltner runtime and slides p.256. |
| Train in-browser with Adam on a GGX teacher | Technically possible (JS or a compute shader with manual backprop). Course needs **100k × 4096 samples/iter** and Slang autodiff + CoopVec. A toy 256² latent + 10k steps of 32² batches on CPU/GPU compute could work as a **lab**, not as the shipped intro. |
| Fake / random weights | Will not prove the proposition. The MLP with random Xavier weights is brown noise. |
| Distill RTXNS `disney.ns.bin` | **License: NVIDIA RTX SDK** — not Apache. Do not ship that blob. |

**Practical trainer (outside the browser, one Python file):**

1. Teacher: the same GGX the fragment shader will use (bit-identical).
2. Sample `uv ~ U[0,1]²`, `(wi,wo)` via Rusinkiewicz as in step 03.
3. Optimize latent 256²×8 + decoder 14→32→32→3 with Adam (β 0.9/0.999), LR cosine 1e-3→1e-5, L1-of-power-log or log-L1.
4. Export: `latent.bin` (fp16), `weights.json` (row-major fp32).

Do **not** reimplement Slang `bwd_diff` in WGSL for v1.

If a live “watch it learn” moment is wanted: run **50–200 steps** of the `network/step_05` **image** MLP (4→32→32→3, 32² latent) on a canvas — that is the course’s *first* neural texture lab — and keep the BRDF demo baked.

---

## 11. License / asset constraints

### Course repo (`neural-shading-s26`)

| Path | License | Can we use in a VibeGames demo? |
|---|---|---|
| Code (`neural/`, `network/`, `mipmap/` shaders & Python) | **Apache-2.0 WITH LLVM-exception** ([LICENSE](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/LICENSE), [REUSE.toml](https://raw.githubusercontent.com/shader-slang/neural-shading-s26/main/REUSE.toml)) | Yes, with NOTICE. LLVM exception relaxes binary embedding of compiled snippets. |
| `materials/ceramic/**`, `materials/velvet/**`, `mdl_runtime.slangh` | **BSD-3-Clause**, Copyright 2025 NVIDIA | Yes with NVIDIA copyright retained. **Do not** pretend it is Apache. |
| `data/brown_photostudio_02_2k.hdr` | **CC0-1.0**, Sergej Majboroda / [Poly Haven](https://polyhaven.com/a/brown_photostudio_02) | Yes. |
| `data/shaderball.glb` | **CC0-1.0** | Yes. |
| `mipmap/PavingStones070_2K.*`, `network/slangstars.png` | Apache (S2025 carry-forward) | Yes. |

SPDX package supplier: **The Khronos Group, Inc.** Copyright 2024–2026.

### RTXNS / RTXNTC

[RTXNS LICENSE.MD](https://raw.githubusercontent.com/NVIDIA-RTX/RTXNS/main/LICENSE.MD) is the **NVIDIA RTX SDK license** (Feb 23, 2024): non-transferable, no sublicense of the SDK as a product, distribution only **as object code inside an application with material additional functionality**, required notice *“This software contains source code provided by NVIDIA Corporation.”* DX12 CoopVec preview is explicitly non-ship. **Do not vendor RTXNS/RTXNTC into this monorepo as the demo’s core.** Reimplement the tiny scalar MLP; cite the papers.

### Slang autodiff docs

[shader-slang.org/slang/user-guide/autodiff](https://shader-slang.org/slang/user-guide/autodiff) — `fwd_diff` / `bwd_diff`, `DifferentialPair<T>`, `[Differentiable]`. Relevant as the **training** stack the course uses; not available in WGSL.

---

## 12. Concrete “do this / don’t do this” for the intro scene

**Do**

- Treat **step 03 architecture** as the demo net: 8-D latent, Rusinkiewicz 6-D, 32-wide two-layer decoder.
- Bake latents; decoder in the fragment shader; teacher is GGX in the same shader for A/B.
- Keep weights < 8 KiB and latent ≤ 1–4 MiB.
- Cite Zeltner 2024 + the course repo in the demo README.

**Don’t**

- Don’t block on CoopVec, Slang-in-browser, or `subgroup_matrix`.
- Don’t train 100k steps in the page load.
- Don’t ship 4096² latents or the MDL runtime.
- Don’t copy RTXNS `disney.ns.bin`.
- Don’t start with NTC (wrong paper) or NeuMIP displacement (wrong problem).
- Don’t use slides’ **4-latent** snippet as the implementation contract — the repo is 8.

---

## 13. Citations (every claim’s owner)

### Course / Slang

1. Slang at SIGGRAPH 2026 landing — https://shader-slang.org/landing/siggraph-26/
2. Course repo README — https://github.com/shader-slang/neural-shading-s26
3. Course slides PDF — https://github.com/shader-slang/neural-shading-s26/raw/refs/heads/main/slides/Neural_Shading_Course_Slides_2026.pdf
4. Slang autodiff user guide — https://shader-slang.org/slang/user-guide/autodiff
5. Slang compilation targets (WebGPU WIP) — https://shader-slang.org/slang/user-guide/targets.html
6. Step READMEs — `neural/step_01_latent_texture/README.md` … `step_08_multi_instance_training/README.md`
7. `neural/common/latent_texture.py`, `latent_texture.slang`, `linear_layer.py`, `linear_layer.slang`, `adam.slang`
8. `neural/step_01_latent_texture/run.py`, `latent_texture.slang`
9. `neural/step_03_rusinkiewicz_parameterization` slang (parameterize + sampling)
10. `neural/step_04_activations/activations.slang`
11. `neural/step_06_shading_frame_rotation/run.py`, `shading_frame_rotation.slang`
12. `neural/step_07_encoder_network/run.py`, `encoder_network.slang`
13. `neural/step_08_multi_instance_training/README.md`, `run.py`
14. LICENSE / REUSE.toml / THIRD_PARTY_NOTICES.md of neural-shading-s26
15. `network/step_05_latent_texture.py` (4-latent image MLP)

### Hardware / SDKs

16. VK_NV_cooperative_vector proposal — https://docs.vulkan.org/features/latest/features/proposals/VK_NV_cooperative_vector.html
17. RTXNS — https://github.com/NVIDIA-RTX/RTXNS ; QuickStart — https://raw.githubusercontent.com/NVIDIA-RTX/RTXNS/main/docs/QuickStart.md ; SimpleInferencing — https://raw.githubusercontent.com/NVIDIA-RTX/RTXNS/main/docs/SimpleInferencing.md ; `NetworkConfig.h` (30/32/4)
18. RTXNTC — https://github.com/NVIDIA-RTX/RTXNTC
19. RTXNS license — https://raw.githubusercontent.com/NVIDIA-RTX/RTXNS/main/LICENSE.MD

### Papers

20. Zeltner et al. 2024, *Real-Time Neural Appearance Models*, TOG 43(3) — https://doi.org/10.1145/3659577 — https://arxiv.org/abs/2305.02678 — https://arxiv.org/html/2305.02678v2 — https://research.nvidia.com/labs/rtr/neural_appearance_models/
21. Vaidyanathan et al. 2023, *Random-Access Neural Compression of Material Textures*, TOG 42(4) Art. 88 — https://doi.org/10.1145/3592407 — https://arxiv.org/abs/2305.17105 — https://research.nvidia.com/labs/rtr/neural_texture_compression/
22. Rusinkiewicz 1998, *A New Change of Variables for Efficient BRDF Representation* — cited by the course slang + Zeltner §2.1.

### WebGPU

23. WebGPU ED 25 Aug 2026 — https://gpuweb.github.io/gpuweb/ (`GPUFeatureName` list, `shader-f16`)
24. WGSL ED 25 Aug 2026 — https://gpuweb.github.io/gpuweb/wgsl/
25. gpuweb subgroup-matrix proposal (Draft) — https://github.com/gpuweb/gpuweb/blob/main/proposals/subgroup-matrix.md
26. Khronos GDC 2026 WebGL/WebGPU update — https://www.khronos.org/assets/uploads/developers/presentations/3D_on_the_Web_2026_-_GDC_2026_WebGL%2BWebGPU_Update.pdf

---

## 14. Open gaps (do not invent)

- Course **does not publish trained checkpoints** in the Git tree (they are written under `neural/step_*/runs/` at train time). A demo must train its own GGX student or ship self-trained weights.
- Exact **paper encoder width** beyond “simple MLP” + the figure `64×4 → 8` is in the PDF figures; the **course encoder is 29→64→64→64→8** — use the course numbers for implementation.
- Whether Slang’s WGSL backend can emit the **scalar** `LinearLayer` `#else` path today was not executed here; the portable plan is to **hand-write WGSL/TSL**, not to run `slangc -target wgsl` on the CoopVec sources.
- WebGPU `subgroup_matrix` being “on the back burner” means even a *future* browser path is **cooperative matrix (compute)**, still not NV CoopVec in a fragment shader. Plan as if fragment scalar mat-vec is the forever path for this demo.
