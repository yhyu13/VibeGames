# JOURNEY — rc-demo decisions

A short ME/YOU record of the port's decisions and the worst gotcha.

## Goal
Port the proven, assertion-green 2D Radiance Cascades pipeline out of
`7_hotlineShanghai/rc-lab/` (raw WebGL2) into a self-contained
Three.js + TypeScript + Vite project, keeping the RC algorithm and shader math
untouched so the rc-lab assertion suite is a true oracle. Validation = the
ported `verify.ts` + cross-impl `port-check` + headless Playwright gate all green.

## Decision — WebGL-first, WebGPU-ready
`RcBackend` interface + `backendFactory` so the demo and assertions never import
a GPU API. WebGL backend is the production path today; `RcWebgpuBackend` is a
documented throwing stub, and the factory's `'webgpu'` branch is wired but inert.

## Approach — RawShaderMaterial multi-pass
Preferred over wrapping the raw-GL `RcLabPipeline` behind three.js: three owns
both the GL context and the render targets, and mixing a hand-rolled GL state
machine with three's renderer is the most fragile option. Shaders stay
byte-identical (copied verbatim into `src/shaders/`); only the plumbing
changed: one fullscreen `THREE.BufferGeometry` (attribute `aPosition`, matching
`fullscreen.vert`'s `layout(location=0)`), one `THREE.WebGLRenderTarget` per
RC buffer (RGBA8, rc-lab sizes/filtering), and one `THREE.RawShaderMaterial` per
pass. Readback uses the public `renderer.readRenderTargetPixels` with rc-lab's
exact y-inversion, so the assertion engine sees identical coords.

## Worst gotcha — `#version` injection
The most time-costly trap was the RawShaderMaterial `glslVersion` option.
Setting `glslVersion: THREE.GLSL3` made three.js prepend a `#version 300 es`
line *in addition* to the one already at the top of our copied shaders — a
duplicate version directive that fails GLSL compilation. Since RawShaderMaterial
uses the source verbatim and the shaders already declare `#version 300 es`, the
fix was simply to **not set** `glslVersion`. A close second was remembering that
RawShaderMaterial does not auto-map a `position` attribute — the geometry must
expose `aPosition` (the vert's own attribute name), plus `frustumCulled=false`
to avoid unnecessary bounding-box work on the fullscreen triangle.

## Notes
- `renderer.autoClear` off; fullscreen draw covers targets.
- Input textures: `DataTexture` with `flipY = true` to mirror rc-lab's
  `UNPACK_FLIP_Y_WEBGL = 1` (top row = row 0), matching assertion expectations.
- 10 shader files exist in rc-lab (task text said 13; `prepjfa.frag` was listed
  twice and `rc.frag` is the unused demo-variant reference) — all 10 copied.
- `scripts/smoke.mjs` follows `6_patapon3D/scripts/smoke.mjs`: Playwright loaded
  from the machine-wide bun cache, `--use-angle=swiftshader`, headless.
