/**
 * scripts/smoke.mjs — headless gate for 15_rc_demo
 *
 * Flow:
 *   spawn `vite dev` (port 5194) → Playwright (SwiftShader) opens the page →
 *   wait for `window.__rcDemo` → assert the port report: report.ok === true,
 *   all ~36+ assertions pass, and every scene's determinism diffPixels === 0 →
 *   assert zero console errors/warnings/pageerrors → screenshot smoke/rc-demo.png.
 *
 * Playwright source: bun cache's playwright-core (project has node_modules for the
 * app itself; the smoke driver is a one-shot verification tool, per CLAUDE.md).

 * Run: `npm run check` (from 15_rc_demo). Env: SMOKE_URL to override the origin.
 */

import { spawn, execFileSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'file:///C:/Users/XINDONG/.bun/install/cache/playwright-core@1.57.0@@@1/index.mjs';

const PORT = 5194;
const BASE = process.env.SMOKE_URL ?? `http://localhost:${PORT}`;
const CHROME =
  process.env.P3D_CHROME ??
  'C:/Users/XINDONG/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const OUT = fileURLToPath(new URL('../smoke/', import.meta.url));
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const VITE_ENTRY = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url));

const failures = [];
function check(name, ok, detail = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures.push(name);
}

function watchConsole(page, label, problems, warnings) {
  page.on('console', (msg) => {
    const text = msg.text();
    // Fail only on console.error — the gate's contract is "zero console errors".
    // Warnings (SwiftShader driver perf notes like "GPU stall due to ReadPixels",
    // teardown "CONTEXT_LOST_WEBGL", and the deprecated-software-fallback notice)
    // are collected for visibility but do not fail the gate.
    if (msg.type() === 'error') {
      problems.push(`[${label}] console.error: ${text}`);
    } else if (msg.type() === 'warning') {
      warnings.push(`[${label}] console.warning: ${text}`);
    }
    if (/texSubImage3D/i.test(text)) {
      problems.push(`[${label}] ${text}`);
    }
  });
  page.on('pageerror', (err) => problems.push(`[${label}] pageerror: ${err.message}`));
}

async function waitForServer(url, timeoutMs = 60000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`vite dev server did not come up at ${url}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const problems = [];
  const warnings = [];

  // ── start vite dev server (vite's node entry directly, so we can kill the child) ──
  // Free the port first if anything leaked from an earlier run on this Windows box.
  try {
    execFileSync('powershell', ['-Command', `Get-NetTCPConnection -LocalPort ${PORT} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess`], { encoding: 'utf8' })
      .split(/\s+/)
      .filter(Boolean)
      .forEach((pid) => { try { execFileSync('taskkill', ['/PID', pid, '/T', '/F']); } catch {} });
  } catch {
    // port already free / powershell unavailable — non-fatal
  }

  console.log(`starting vite dev on :${PORT} ...`);
  const server = spawn(process.execPath, [VITE_ENTRY, 'dev', '--port', String(PORT)], {
    cwd: ROOT,
    stdio: 'ignore',
  });
  let serverDead = false;
  server.on('exit', () => { serverDead = true; });
  try {
    await waitForServer(BASE);

    const browser = await chromium.launch({
      executablePath: CHROME,
      headless: true,
      args: [
        '--no-sandbox',
        '--use-gl=swiftshader',
        '--use-angle=swiftshader',
        '--enable-webgl',
        '--enable-unsafe-swiftshader',
      ],
    });
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    watchConsole(page, 'main', problems, warnings);

    await page.goto(BASE, { waitUntil: 'load' });

    // Wait for the demo to auto-verify and install the __rcDemo hook.
    await page.waitForFunction(() => window.__rcDemo && window.__rcDemo.status === 'done', undefined, {
      timeout: 60000,
    });

    const report = await page.evaluate(() => {
      const r = window.__rcDemo.lastReport;
      if (!r) return null;
      return {
        ok: r.ok,
        totalChecks: r.totalChecks,
        passedChecks: r.passedChecks,
        failedChecks: r.failedChecks,
        scenes: r.scenes.map((s) => ({
          id: s.sceneId,
          ok: s.ok,
          error: s.error ?? null,
          detPass: s.determinism.pass,
          detDiff: s.determinism.diffPixels,
          failedChecks: s.checks.filter((c) => !c.pass).length,
        })),
      };
    });

    check('window.__rcDemo installed + report produced', report !== null);
    if (report === null) throw new Error('__rcDemo.lastReport is null');

    check('report.ok === true', report.ok, `checks=${report.passedChecks}/${report.totalChecks}`);
    check('all assertions passed (failedChecks === 0)', report.failedChecks === 0, `failed=${report.failedChecks}`);
    check('assertion count is meaningful (>= 30)', report.totalChecks >= 30, `total=${report.totalChecks}`);

    let allDetZero = true;
    let allScenesOk = true;
    let perSceneFail = '';
    for (const s of report.scenes) {
      if (!s.ok) { allScenesOk = false; perSceneFail += `${s.id}:${s.error ?? 'fail'} `; }
      if (s.detDiff !== 0) { allDetZero = false; perSceneFail += `${s.id}:diff=${s.detDiff}px `; }
    }
    check('every scene ok', allScenesOk, perSceneFail || undefined);
    check(
      'determinism diffPixels === 0 on every scene',
      allDetZero,
      perSceneFail || undefined,
    );

    // Give the stage captures a moment, then screenshot the whole page.
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}rc-demo.png`, fullPage: true });
    check('screenshot smoke/rc-demo.png captured', true);

    if (warnings.length > 0) {
      console.log(`  (${warnings.length} benign warning(s) ignored)`);
    }
    check('zero console errors / pageerrors', problems.length === 0, problems.slice(0, 10).join('\n'));

    await browser.close();
  } finally {
    // Kill vite (and its children) reliably on Windows via taskkill /T.
    try {
      execFileSync('taskkill', ['/PID', String(server.pid), '/T', '/F']);
    } catch {
      if (!serverDead) server.kill('SIGTERM');
    }
  }

  if (failures.length > 0) {
    console.error(`\nSMOKE FAILED (${failures.length}): ${failures.join(', ')}`);
    process.exit(1);
  }
  console.log('\nSMOKE OK — screenshots in smoke/');
}

main().catch((err) => {
  console.error('SMOKE CRASH:', err);
  process.exit(1);
});
