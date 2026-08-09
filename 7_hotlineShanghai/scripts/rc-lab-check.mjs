// scripts/rc-lab-check.mjs —— RC Lab 自动门禁（headless Chromium + SwiftShader）
//
// 用法（先启动 dev server）：
//   npm run dev
//   npm run rc-lab:check
//
// 页面自动运行全部场景（跳过 stress），断言窗口.__rcLab.lastReport.ok；
// 输出 JSON 摘要 + 截图 smoke/rc-lab.png；失败退出码非 0。
import { createRequire } from 'node:module';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Git-repo-my/VibeGames/1/node_modules/playwright');

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
  const report = await page.evaluate(() => window.__rcLab.lastReport);

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
