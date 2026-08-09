// scripts/smoke.mjs — Phase 0 / 真·浏览器 smoke test
// 用 Playwright 驱动 chromium,跑游戏,把关键状态打到 stdout + 截图
// 这是 reviewer Q7 "has anyone actually played" 的真答案

// 走 conda 内置 playwright 路径(monorepo 没装 npm 依赖)
import { chromium } from 'file:///C:/Users/yuhang/miniconda3/Lib/site-packages/playwright/driver/package/index.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const SHOTS_DIR = join(PROJECT_ROOT, 'smoke-shots');
mkdirSync(SHOTS_DIR, { recursive: true });

const URL = process.env.SMOKE_URL ?? 'http://localhost:5184';
const CHROMIUM = 'C:\\Users\\yuhang\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe';

async function dump(page, label) {
  const data = await page.evaluate(() => {
    const r = {};
    if (typeof window.__gameManifest === 'function') r.manifest = window.__gameManifest();
    if (window.__rcPipeline) r.rcState = window.__rcPipeline;
    if (window.__sim) r.simPhase = window.__sim.phase;
    // 从 store 读 UI phase(状态机驱动菜单)
    try {
      const stores = (window).__zustand_stores ?? [];
      // 通过 store 拿 UI phase
      const html = document.querySelector('div[class*="text-5xl"]');
      r.uiHint = html?.textContent?.trim() ?? null;
    } catch {}
    return r;
  });
  console.log(`\n=== ${label} ===`);
  console.log(`  sim.phase: ${data.simPhase}`);
  console.log(`  ui.hint:   ${data.uiHint}`);
  if (data.rcState) console.log(`  rc.frameTime: ${data.rcState.lastFrameTimeMs}ms lightCount=${data.rcState.lightCount} degraded=${data.rcState.degraded}`);
  return data;
}

async function shoot(page, name) {
  const path = join(SHOTS_DIR, `${name}.png`);
  await page.screenshot({ path, fullPage: false });
  console.log(`screenshot: ${path}`);
  return path;
}

const results = { steps: [], errors: [] };

(async () => {
  const browser = await chromium.launch({
    executablePath: CHROMIUM,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=swiftshader', '--enable-webgl'],
  });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await ctx.newPage();

  page.on('pageerror', (e) => results.errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      results.errors.push(`console.${msg.type()}: ${msg.text()}`);
    }
  });

  console.log(`opening ${URL} ...`);
  await page.goto(URL, { waitUntil: 'load', timeout: 30_000 });
  // 等游戏循环起来
  await page.waitForFunction(() => window.__sim !== undefined, null, { timeout: 15_000 }).catch(() => {});

  // Step 0: 标题屏
  await page.waitForTimeout(1500);
  results.steps.push({ step: 'title', data: await dump(page, 'TITLE') });
  await shoot(page, '00-title');

  // Step 1: 按 Enter 进 mission select
  await page.keyboard.press('Enter');
  await page.waitForTimeout(800);
  results.steps.push({ step: 'after-enter', data: await dump(page, 'AFTER ENTER') });
  await shoot(page, '01-after-enter');

  // Step 2: 点击第一个 mission 卡(电车公司)
  // 任务卡:第一张大约在 (320, 340) 范围
  await page.mouse.click(320, 340);
  await page.waitForTimeout(800);
  results.steps.push({ step: 'after-click-mission', data: await dump(page, 'AFTER CLICK MISSION') });
  await shoot(page, '02-after-click-mission');

  // Step 3: 多按几次 Space / Enter(覆盖 brief 跳过)
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Space');
    await page.waitForTimeout(400);
  }
  results.steps.push({ step: 'after-spaces', data: await dump(page, 'AFTER 5× SPACE') });
  await shoot(page, '03-after-spaces');

  // Step 4: 模拟玩家操作 — WASD 移动
  for (const k of ['KeyW', 'KeyD', 'KeyS', 'KeyA']) {
    await page.keyboard.down(k);
    await page.waitForTimeout(300);
    await page.keyboard.up(k);
  }
  await page.waitForTimeout(300);
  results.steps.push({ step: 'after-move', data: await dump(page, 'AFTER WASD') });
  await shoot(page, '04-after-move');

  // Step 5: 鼠标点击(射击)
  await page.mouse.move(640, 360);
  await page.mouse.click(640, 360);
  await page.waitForTimeout(800);
  results.steps.push({ step: 'after-fire', data: await dump(page, 'AFTER LMB') });
  await shoot(page, '05-after-fire');

  // Step 6: 鼠标移动 + 多次点击(测试 RC light 触发)
  for (let i = 0; i < 3; i++) {
    await page.mouse.move(400 + i*100, 360);
    await page.waitForTimeout(200);
    await page.mouse.click(400 + i*100, 360);
    await page.waitForTimeout(300);
  }
  results.steps.push({ step: 'after-spray', data: await dump(page, 'AFTER SPRAY') });
  await shoot(page, '06-after-spray');

  // Step 6: 写结果
  writeFileSync(join(SHOTS_DIR, 'smoke-result.json'), JSON.stringify(results, null, 2));
  console.log(`\n=== ERRORS (${results.errors.length}) ===`);
  for (const e of results.errors) console.log(`  ${e}`);

  await browser.close();
  console.log(`\ndone. shots: ${SHOTS_DIR}`);
  process.exit(results.errors.length > 0 ? 1 : 0);
})().catch((e) => {
  console.error('FATAL', e);
  process.exit(2);
});
