# .checks — smoke gate notes

Mirrors `6_patapon3D/.checks/` layout. Unlike patapon (which compiles TS check
files via `tsconfig.checks.json`), this demo's gate is a single self-contained
Playwright script at `scripts/smoke.mjs` and is driven by `npm run check`
(= `node scripts/smoke.mjs`). It needs no TS build step.

- It spawns the Vite dev server itself (port 5210, `strictPort`).
- It loads Playwright from the machine-wide bun cache
  (`file:///C:/Users/XINDONG/.bun/install/cache/playwright-core@1.57.0@@@1/index.mjs`)
  — no project-level playwright dependency.
- It runs headless Chromium with SwiftShader (`--use-gl=swiftshader`) so it works
  on machines without a GPU.
- Output screenshot: `smoke/raytrace-demo.png`.
