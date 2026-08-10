/**
 * scripts/smoke.mjs — Playwright 端到端冒烟(6_patapon3D)
 *
 * 流程(intro-only):
 *   intro    启动 → W A W A 四拍输入 → flight/impact → 标题卡(ending)→ REPLAY
 * 断言:
 *   - 全程零 console error / warning,零 texSubImage3D 报错,零 pageerror
 *   - 各阶段 store/DOM 到达预期态(title-card / phase / winner)
 *   - 1280×720 与 390×844 各采 2s 帧时间并打印 avg/p95
 * 截图输出到 smoke/(含 intro 低机位水面截图)。
 *
 * 运行:先起 dev server(npm run dev,端口 5183),再 `node scripts/smoke.mjs`。
 * 环境变量:SMOKE_URL(默认 http://localhost:5183)、P3D_CHROME(chrome.exe 路径)。
 *
 * Playwright 来源:bun 缓存的 playwright-core(项目无 node_modules 依赖,
 * 遵循 CLAUDE.md "no new deps";本脚本为一次性验证工具,不进构建)。
 */

import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'file:///C:/Users/XINDONG/.bun/install/cache/playwright-core@1.57.0@@@1/index.mjs';

const BASE = process.env.SMOKE_URL ?? 'http://localhost:5183';
const CHROME =
  process.env.P3D_CHROME ??
  'C:/Users/XINDONG/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const OUT = fileURLToPath(new URL('../smoke/', import.meta.url));

const failures = [];
function check(name, ok, detail = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures.push(name);
}

/** 收集 console/pageerror 到 problems */
function watchConsole(page, label, problems) {
  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error' || msg.type() === 'warning') {
      problems.push(`[${label}] console.${msg.type()}: ${text}`);
    }
    if (/texSubImage3D/i.test(text)) {
      problems.push(`[${label}] texSubImage3D: ${text}`);
    }
  });
  page.on('pageerror', (err) => problems.push(`[${label}] pageerror: ${err.message}`));
}

/** 2 秒帧时间采样(rAF delta) */
async function sampleFrameTimes(page) {
  return page.evaluate(
    () =>
      new Promise((resolve) => {
        const deltas = [];
        let last = performance.now();
        const t0 = last;
        const tick = (now) => {
          deltas.push(now - last);
          last = now;
          if (now - t0 < 2000) requestAnimationFrame(tick);
          else {
            deltas.sort((a, b) => a - b);
            const avg = deltas.reduce((s, v) => s + v, 0) / deltas.length;
            const p95 = deltas[Math.floor(deltas.length * 0.95)] ?? 0;
            resolve({ frames: deltas.length, avg: +avg.toFixed(2), p95: +p95.toFixed(2) });
          }
        };
        requestAnimationFrame(tick);
      }),
  );
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const problems = [];
  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl'],
  });

  // ─── 桌面 1280×720:intro 全流程 + battle 全流程 ───
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await ctx.newPage();
  watchConsole(page, 'desktop', problems);

  await page.goto(BASE, { waitUntil: 'load' });
  await page.waitForSelector('#three-canvas-container canvas', { timeout: 15000 });
  await page.waitForSelector('.input-panel', { timeout: 15000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}intro-water.png` }); // 低机位前景水带(z 6.75..16.75)
  check('intro boot (canvas + input panel)', true);

  const webgl2 = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl2'));
  check('webgl2 context available', webgl2);

  // 四拍输入 W A W A(ATTACK;timing-only,窗口内任意鼓皆有效)
  for (const key of ['w', 'a', 'w', 'a']) {
    await page.keyboard.press(key);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(600); // 160ms launch 延迟 + 飞行初段
  await page.screenshot({ path: `${OUT}intro-flight.png` });

  await page.waitForSelector('.title-card', { timeout: 20000 });
  await page.screenshot({ path: `${OUT}intro-ending.png` });
  const title = await page.textContent('.title-card h2');
  check('intro ending (title card)', title?.includes('PATAPON') ?? false, title ?? '');

  const introPerf = await sampleFrameTimes(page);
  console.log(`  perf intro 1280x720: avg ${introPerf.avg}ms p95 ${introPerf.p95}ms (${introPerf.frames} frames)`);

  // ── REPLAY:标题卡按钮 → 回到输入阶段 ──
  await page.click('.title-card button');
  await page.waitForSelector('.input-panel:not(.is-hidden)', { timeout: 10000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}intro-replay.png` });
  check('replay returns to input', true);
  await ctx.close();

  // ─── 移动 390×844:启动 + 帧时间采样 ───
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mpage = await mctx.newPage();
  watchConsole(mpage, 'mobile', problems);
  await mpage.goto(BASE, { waitUntil: 'load' });
  await mpage.waitForSelector('#three-canvas-container canvas', { timeout: 15000 });
  await mpage.waitForTimeout(1000);
  await mpage.screenshot({ path: `${OUT}intro-mobile.png` });
  const mobilePerf = await sampleFrameTimes(mpage);
  console.log(`  perf intro 390x844: avg ${mobilePerf.avg}ms p95 ${mobilePerf.p95}ms (${mobilePerf.frames} frames)`);
  check('mobile boot (canvas)', true);
  await mctx.close();

  await browser.close();

  // ─── console 断言(最后统一判定,便于一次看全) ───
  check('zero console errors/warnings/pageerrors', problems.length === 0, problems.slice(0, 8).join('\n'));

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
