// scripts/rc-lab-check.mjs —— historical direct-import RC Lab runner
//
// Kept for reference only. The maintained portable gate is:
//   npm run rc-lab:check
// It resolves cached Playwright through npm exec and runs rc-lab-check.spec.js,
// including the standalone lab, production port, showcase, and intro-copy routes.
// Direct execution of this file still requires an installed `playwright` package.
import fs from 'node:fs';
import { chromium } from 'playwright';

const BASE = 'http://localhost:5184/rc-lab/';
const SHOT_DIR = 'smoke';
fs.mkdirSync(SHOT_DIR, { recursive: true });

const errors = [];
let browser;
let page;

try {
  browser = await chromium.launch({
    headless: true,
    // --use-angle=swiftshader：本机 headless 下 --use-gl=swiftshader 会触发 WebGL context lost
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-angle=swiftshader', '--enable-webgl'],
  });
  page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push('console.error: ' + msg.text());
  });

  await page.goto(BASE, { waitUntil: 'load', timeout: 30_000 });
  // 页面同步自动跑；等 __rcLab 就绪且 done
  await page.waitForFunction(() => window.__rcLab?.status === 'done', null, { timeout: 180_000 });
  // 等游戏侧移植版（src/engine/RcPipeline）同一套断言跑完
  await page.waitForFunction(() => window.__rcPortCheck?.status === 'done', null, { timeout: 180_000 });
  const report = await page.evaluate(() => window.__rcLab.lastReport);
  const portReport = await page.evaluate(() => window.__rcPortCheck.lastReport);

  if (report === null || report === undefined) {
    throw new Error('__rcLab.lastReport 为空');
  }

  const perScene = report.scenes.map((s) => ({
    id: s.sceneId,
    ok: s.ok,
    checks: `${s.checks.filter((c) => c.pass).length}/${s.checks.length}`,
    totalMs: +s.variants[0]?.timings?.total.toFixed(1) ?? 0,
    diffPixels: s.determinism.diffPixels,
    error: s.error ?? null,
  }));
  console.log(
    'RESULT=' +
      JSON.stringify({
        ok: report.ok,
        totalChecks: report.totalChecks,
        passedChecks: report.passedChecks,
        failedChecks: report.failedChecks,
        totalMs: +report.totalMs.toFixed(0),
        scenes: perScene,
      }),
  );

  await page.screenshot({ path: `${SHOT_DIR}/rc-lab.png` });
  console.log(`screenshot: ${SHOT_DIR}/rc-lab.png`);

  if (!report.ok) throw new Error(`RC Lab 存在失败断言（failed=${report.failedChecks}）`);
  if (portReport === null || !portReport.ok) {
    throw new Error(`src/engine/RcPipeline 移植版失败（failed=${portReport?.failedChecks ?? 'n/a'}）`);
  }
  console.log(
    `PORT_OK checks=${portReport.passedChecks}/${portReport.totalChecks} totalMs=${+portReport.totalMs.toFixed(0)}`,
  );

  // RC 展示场景（游戏侧管线，实时渲染）
  await page.goto('http://localhost:5184/rc-showcase/', { waitUntil: 'load', timeout: 30_000 });
  await page.waitForFunction(() => window.__rcShowcase?.status === 'done', null, { timeout: 60_000 });
  const showcase = await page.evaluate(() => window.__rcShowcase.getState());
  if (!(showcase.fps > 0) || !(showcase.activeCascades > 0)) {
    throw new Error(`rc-showcase 异常: ${JSON.stringify(showcase)}`);
  }
  console.log(`SHOWCASE_OK ${JSON.stringify(showcase)}`);
  await page.screenshot({ path: `${SHOT_DIR}/rc-showcase.png` });
  console.log(`screenshot: ${SHOT_DIR}/rc-showcase.png`);

  if (errors.length > 0) {
    console.error('CONSOLE_ERRORS=' + JSON.stringify(errors));
    throw new Error('页面存在 console/page error');
  }
  console.log('RESULT=all-clean');
} catch (e) {
  console.error('RC_LAB_CHECK_FAIL=' + e.message);
  if (errors.length > 0) console.error('CONSOLE_ERRORS=' + JSON.stringify(errors, null, 2));
  if (page) {
    try {
      await page.screenshot({ path: `${SHOT_DIR}/rc-lab-fail.png` });
    } catch {
      /* ignore */
    }
  }
  process.exitCode = 1;
} finally {
  await browser?.close();
}
