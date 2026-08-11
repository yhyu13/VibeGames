// Hotline Shanghai 视觉回归检查(B24-B28 验证)
// 用法:node scripts/visual-check.mjs (依赖 dev server 5184 + headed Chromium)
// 输出:smoke/vis2-*.png + 一行 JSON(RC state / activeLights / console errors)
import { createRequire } from 'node:module';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Git-repo-my/VibeGames/1/node_modules/playwright');

const BASE = 'http://localhost:5184/';
const SHOT_DIR = 'smoke';
fs.mkdirSync(SHOT_DIR, { recursive: true });

let browser;
let page;
const consoleErrors = [];

const shot = async (name) => {
  await page.screenshot({ path: `${SHOT_DIR}/${name}.png` });
  console.log(`SHOT=${name}`);
};

const waitText = (text, ms = 6000) =>
  page.waitForFunction((t) => document.body.innerText.includes(t), text, { timeout: ms });

const startMission = async () => {
  await page.goto(BASE, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /\u5f00\u59cb\u6e38\u620f/ }).click();
  await waitText('\u9009\u62e9\u4efb\u52a1');
  await page.getByRole('button', { name: /\u7535\u8f66\u516c\u53f8/ }).click();
  await waitText('\u9009\u62e9\u9762\u5177');
  await page.getByRole('button', { name: /\u4e0d\u6234\u9762\u5177/ }).click();
  await waitText('\u7801\u5934\u4ed3\u5e93', 8000);
  await page.waitForTimeout(800);
  // 视觉采样稳定性:把敌人挪到沙发后并冻结行动,避免站桩被打死污染帧
  await page.evaluate(() => {
    const sim = window.__sim;
    for (const e of sim.enemies) {
      e.position = { x: 7.5, y: 1.5 };
      e.velocity = { x: 0, y: 0 };
      e.state = 'patrol';
      e.alertTimer = 9999;
      e.fireCooldown = 9999;
    }
  });
  await page.waitForTimeout(400);
};

const rcState = () =>
  page.evaluate(() => ({
    rc: window.__rcPipeline ?? null,
    lights: window.__sim.snapshot().activeLights.map((l) => ({
      kind: l.kind,
      radius: l.radius,
      intensity: l.intensity,
      ttl: l.ttl,
      pos: { x: +l.position.x.toFixed(1), y: +l.position.y.toFixed(1) },
    })),
    phase: window.__sim.snapshot().phase,
  }));

try {
  browser = await chromium.launch({ headless: false });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  page = await ctx.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(String(err)));

  await startMission();
  await page.bringToFront();
  const state0 = await rcState();
  await shot('vis2-idle');

  // walk 帧:向右下移动 ~0.5s
  await page.keyboard.down('d');
  await page.waitForTimeout(250);
  await page.keyboard.down('s');
  await page.waitForTimeout(350);
  await shot('vis2-walk');
  await page.keyboard.up('d');
  await page.keyboard.up('s');
  await page.waitForTimeout(200);

  // 开枪 → muzzle flash RC 光源
  await page.mouse.move(640, 100);
  await page.mouse.down('left');
  await page.waitForTimeout(80);
  await shot('vis2-muzzle-hold');
  await page.mouse.up();
  const state1 = await rcState();
  await shot('vis2-muzzle');

  // RC 全关对比:证明 radiance 是真实贡献
  await page.evaluate(() => window.__rcSetConfig({ cascadeCount: 0, lightScale: 0, ambientIntensity: 0 }));
  await page.waitForTimeout(400);
  await shot('vis2-rc-zero');
  await page.evaluate(() => window.__rcSetConfig({ cascadeCount: 3, lightScale: 1.6, ambientIntensity: 0.01 }));
  await page.waitForTimeout(400);
  const state2 = await rcState();
  await shot('vis2-rc-restore');

  console.log(
    'RESULT=' +
      JSON.stringify({
        phase: state0.phase,
        lights: state0.lights,
        rcBefore: state0.rc,
        rcAfterFire: state1.rc,
        rcRestored: state2.rc,
        consoleErrors,
      }),
  );
} finally {
  if (browser) await browser.close();
}
