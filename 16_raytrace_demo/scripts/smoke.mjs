/**
 * scripts/smoke.mjs — headless 冒烟门(demo 版本)
 *
 * 参照 6_patapon3D/scripts/smoke.mjs 的既有做法:
 *   - Playwright 从机器级 bun 缓存加载(项目不引入 playwright 依赖)
 *   - Chromium headless + SwiftShader(软件 GL,保证无 GPU 的 CI 也能跑)
 *   - 断言 window.__rtDemo 暴露的 kind/fps,收集零 console error
 *
 * 本自包含门会自动拉起 vite dev(否则跑 `npm run dev`),导航、等待窗口钩子、
 * 截图到 smoke/raytrace-demo.png,任一失败即退出非零。
 *
 * 运行:`npm run check`(即 `node scripts/smoke.mjs`)。
 * 环境变量:SMOKE_URL(默认 http://localhost:5210)、P3D_CHROME(chrome.exe 路径)。
 */

import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'file:///C:/Users/XINDONG/.bun/install/cache/playwright-core@1.57.0@@@1/index.mjs';

const PORT = 5210;
const BASE = process.env.SMOKE_URL ?? `http://localhost:${PORT}`;
const CHROME =
  process.env.P3D_CHROME ??
  'C:/Users/XINDONG/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = fileURLToPath(new URL('../smoke/', import.meta.url));

const failures = [];
function check(name, ok, detail = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures.push(name);
}

const viteBin = `${ROOT}node_modules/vite/bin/vite.js`;
let viteProc = null;

async function waitForServer(url, timeoutMs) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const problems = [];

  // ── 启动 vite dev(独占端口) ──
  viteProc = spawn(process.execPath, [viteBin, 'dev', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: 'ignore',
  });
  const up = await waitForServer(BASE, 30000);
  if (!up) throw new Error(`vite dev did not come up at ${BASE}`);
  console.log(`  vite dev up at ${BASE}`);

  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    // SwiftShader:无 GPU 环境下软件光栅化 WebGL2
    args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl'],
  });

  let page;
  try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    page = await ctx.newPage();
    page.on('console', (msg) => {
      const text = msg.text();
      if (msg.type() === 'error' || msg.type() === 'warning') {
        problems.push(`[console.${msg.type()}] ${text}`);
      }
    });
    page.on('pageerror', (err) => problems.push(`[pageerror] ${err.message}`));

    await page.goto(BASE, { waitUntil: 'load' });

    // 等待 demo 钩子暴露(体素构建 + shader 编译在 SwiftShader 下较慢)
    await page.waitForFunction(() => window.__rtDemo !== undefined, null, {
      timeout: 60000,
    });

    // 等至少一帧 FPS 窗口刷出(首个 1s 窗口)
    await page.waitForTimeout(1800);

    const dbg = await page.evaluate(() => {
      const d = window.__rtDemo;
      return d ? { kind: d.kind, fps: d.fps, contextLost: d.contextLost } : null;
    });

    check('window.__rtDemo present', !!dbg, JSON.stringify(dbg));
    if (!dbg) throw new Error('no __rtDemo');

    check('kind = "raytrace"', dbg.kind === 'raytrace', `kind=${dbg.kind}`);
    check('fps > 0', dbg.fps > 0, `fps=${dbg.fps}`);
    check('context not lost', dbg.contextLost === false, `contextLost=${dbg.contextLost}`);

    await page.screenshot({ path: `${OUT}raytrace-demo.png` });
    console.log(`  screenshot -> ${OUT}raytrace-demo.png`);
  } finally {
    await browser.close();
  }

  // ── console 断言(最后统一判定) ──
  check('zero console errors/warnings/pageerrors', problems.length === 0, problems.slice(0, 8).join('\n'));

  if (failures.length > 0) {
    console.error(`\nSMOKE FAILED (${failures.length}): ${failures.join(', ')}`);
    process.exitCode = 1;
  } else {
    console.log('\nSMOKE OK — screenshot in smoke/raytrace-demo.png');
  }
}

main()
  .catch((err) => {
    console.error('SMOKE CRASH:', err);
    process.exitCode = 1;
  })
  .finally(() => {
    if (viteProc) {
      // 主动停掉 dev server(跨平台用 SIGTERM;Windows 下兼容)
      viteProc.kill();
    }
  });
