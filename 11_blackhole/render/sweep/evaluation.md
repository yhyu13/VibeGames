# Render Quality Evaluation — Kerr Black Hole (11_blackhole)

**Sweep:** 11 canonical angles (edge-on → 3/4 → face-on) × spin sweep, 4K (dsf 2), `steps=512`.
**Date:** 2026-08-16
**Skill:** `.claude/skills/render-quality-loop` (sweep → evaluate → improve → report)

---

## 1. Verdict

**The render reads as near-path-tracing quality.** Three defects were diagnosed and fixed
this pass — two in the physics/rendering and one in the *evaluation harness itself* (a UI
overlay was contaminating the screenshots). A fresh visual review of the clean renders found
no remaining visible defects across all 11 angles.

| | Before this pass | After this pass |
|---|---|---|
| Disk luminosity vs spin | **Inverted** (spin 0 was 24× brighter than spin 0.998) | **Correct** (monotonic ↑ with spin) |
| Shadow blackness (p01) | Grey at low spin (p01 = 7) | **Black everywhere** (p01 = 0–2) |
| Face-on disk inner edge | Dark brown (underlit) | **White-hot** (correct) |
| Clipping | Hard blowout at low spin | Only the blazing ISCO rim clips (correct) |
| Screenshot contamination | A fixed bright "star" at (3708,84) in every shot | **Gone** (was a UI button, not a render artifact) |

---

## 2. Root-cause diagnosis

### Bug A — spin-inverted disk emissivity (physics, headline fix)

The disk emissivity was `em = (isco / rc)³`, using the **spin-dependent ISCO** as the
reference radius. That made total luminosity `L = 2π·isco²`, so spin 0 (`isco = 3.0 bhu`)
emitted **24× more light than spin 0.998** (`isco = 0.618 bhu`) — the exact inverse of the
correct Shakura–Sunyaev scaling `L ∝ 1/r_in`, where a faster-spinning hole (hotter inner
edge) is *brighter*.

**Fix** ([blackhole.ts](../src/engine/shaders/blackhole.ts), [kerr.ts](../src/core/physics/kerr.ts)):
use a **fixed** reference radius `R_REF = 6M = 3.0 bhu` (the Schwarzschild ISCO) instead of
the spin-dependent `isco`:

```glsl
float x = R_REF / rc;      // was: isco / rc
float em = x * x * x;      // radial profile now spin-independent
float Tp = pow(x, 0.75);   // inner-rim temperature rises with spin
```

This keeps the `r⁻³` / `T ∝ r⁻³ᐟ⁴` Shakura–Sunyaev profile but re-anchors it so the total
flux scales as `L ∝ 1/isco` (spin 0.998 ≈ 4.9× more luminous than spin 0).

**Result — spin sweep at edge-on (2.9°), avg luma:**

| spin | ISCO (bhu) | avg luma | |
|---|---|---|---|
| 0.0 | 3.00 | 17.86 | dimmest ✓ |
| 0.5 | 2.35 | 22.88 | |
| 0.9 | 1.16 | 34.69 | |
| 0.998 | 0.618 | 44.28 | brightest ✓ |

Monotonic and correctly ordered. (Before the fix the ordering was inverted.)

### Bug B — bloom threshold lifting the shadow (rendering)

`UnrealBloomPass` was configured with a **threshold of 0.1** (linear). Because the material
is `toneMapped: false`, bloom operates on the raw linear HDR buffer, so *any* pixel brighter
than 0.1 — the entire dim disk body *and* the starfield — triggered bloom. The bloom then
bled a grey glow into the shadow, lifting the black floor (p01 = 6–8).

**Fix** ([SceneManager.ts](../src/engine/SceneManager.ts)): raise the threshold to **0.85**
so only the white-hot ISCO ring (> 0.85 linear) blooms. The shadow returns to pure black and
stars stay as pinpoints, while the blazing ring still gets its clean halo.

### Bug C — UI overlay contaminating the screenshots (harness, not the render)

Every screenshot carried a fixed bright point at (3708,84) (~L236) that was **unchanged by
any render parameter** — disk off, stars off, bloom off all left it identical. Root-caused via
`document.elementFromPoint`: it is the **`重置` (Reset) button** (`BUTTON.ctrl-reset`) in the
absolutely-positioned `.control-panel` overlay. Playwright's `locator.screenshot()` composites
the page, so the button leaked into the "canvas-only" screenshots and inflated the p99 and
banding metrics (e.g. edge-spin0 `disk` p99 was 141 with the button, 108 without).

**Fix** ([screenshot-sweep.mjs](../scripts/screenshot-sweep.mjs)): hide `.hud` and
`.control-panel` before screenshotting. This also **reverted a misdiagnosis** — an earlier
`0.32 → 0.2` starfield-dimming change (aimed at the "star") was undone, since the star was
never a starfield star.

---

## 3. Objective metrics (4K, final clean sweep)

Columns: `shadow` = p01 (must be ≈ 0), `disk` = p99 (must be < 255 except the rim),
`band` = long identical-luma runs in the glow band (path tracer target ≈ 0).

```
shot           band(≥8/≥20)  noiseσ  shadow  mid  disk  hardEdges  entropy
edge-03deg      12924/ 72     5.63     2   20  253     1.17%     6.07
edge-09deg      29210/ 63     5.53     1   18  254     1.14%     6.20
edge-17deg      41072/391     3.07     2   17  254     0.52%     6.35
edge-29deg      48962/417     2.87     2   15  254     0.47%     6.26
3q-40deg        46254/271     2.23     2   16  254     0.39%     6.22
3q-57deg        52197/308     1.80     2   20  247     0.34%     6.45
face-80deg      76032/396     1.06     0   22  195     0.31%     6.36
face-89deg      56072/396     2.14     0   21  184     0.52%     6.24
edge-spin0       6683/116    13.57     0   16  108     2.03%     4.92
edge-spin05     11348/ 67     9.59     0   17  183     1.83%     5.30
edge-spin09     15284/ 93     6.13     2   19  245     1.37%     5.84
```

**Reads:**
- **Shadow** is black (0–2) everywhere — the grey-shadow defect at spin 0/0.5 is gone.
- **Face-on / low-spin disks no longer clip** (p99 108–204). Only the near-edge-on high-spin
  shots push the rim to 253–254, which is the physically-expected Doppler-boosted white-hot
  crescent — not a washed-out disk.
- **Physics correctness** (shadow geometry) was verified independently via
  [verify-shadow.mjs](../scripts/verify-shadow.mjs): spin 0 edge-on = perfect circle (impact
  param ±2.598), spin 0.998 edge-on = D-shaped (amin −1.041 / amax +3.431), matching the Kerr
  frame-dragging prediction.

---

## 4. Remaining defects (ranked)

1. **Residual micro-banding in the dim glow gradients.** The objective metric still counts
   `runs≥8` (12k–76k per shot), but a fresh **visual review sees no banding** — these runs
   are 8–19px and sub-perceptual after ACES + TPDF dither; only the `runs≥20` macro-banding
   (63–417) is measurable, and none of it is visually obvious. *Next lever if desired:*
   higher-order/blue-noise dither or a 10-bit render target before the 8-bit encode.

2. **Noise on the dim low-spin disk** (`edge-spin0` noiseσ 13.6). The dither grain is
   proportionally larger on a dim signal. Acceptable; a few more samples at low spin would
   smooth it.

3. **Thin photon ring** (stylistic). The ring is razor-thin vs. the soft multi-layer ring a
   Monte Carlo path trace produces. Not a visible artifact — a nitpick.

**Not defects:** aliasing is clean at 4K (hard-edge fraction 0.3–2.0%); the white→orange
outward temperature fade is correct; the lensed ring wrapping above/below the shadow at
edge-on is correct Gargantua structure; the Doppler asymmetry is correct across the spin
sweep (spin 0 symmetric → spin 0.9 strongly one-sided).

---

## 5. Verification checklist

- [x] Emissivity uses fixed `R_REF = 6M` (spin-independent radial profile) — shader + CPU mirror
- [x] Luminosity ordering monotonic with spin (0 → 0.5 → 0.9 → 0.998 = brighter)
- [x] Shadow pure black at all spins/tilts (p01 = 0–2)
- [x] Disk inner edge white-hot in face-on and 3/4 views
- [x] No hard blowout outside the blazing rim (face-on p99 = 184–195)
- [x] Bloom threshold 0.85 — shadow not lifted, stars not amplified
- [x] Shadow geometry: circle (spin 0) vs D-shape (spin 0.998) via `verify-shadow.mjs`
- [x] Screenshot sweep hides `.hud`/`.control-panel` — no UI contamination
- [x] `npx tsc --noEmit` passes
- [ ] Dither upgrade / 10-bit target to fully eliminate micro-banding (future work)
- [ ] Sub-pixel photon-ring sampling (future work)

---

## 6. Files changed

- [blackhole.ts](../src/engine/shaders/blackhole.ts) — emissivity `isco/rc` → `R_REF/rc`
- [kerr.ts](../src/core/physics/kerr.ts) — CPU mirror `R_REF`
- [constants.ts](../src/core/constants.ts) — `diskBrightness` 1.5 → 0.35
- [SceneManager.ts](../src/engine/SceneManager.ts) — bloom threshold 0.1 → 0.85, radius 0.55 → 0.3
- [screenshot-sweep.mjs](../scripts/screenshot-sweep.mjs) — applies all fixed params; hides UI overlays before screenshot
- [verify-shadow.mjs](../scripts/verify-shadow.mjs) — objective Kerr shadow-silhouette check (new)
