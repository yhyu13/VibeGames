// Full drive: TITLE -> startGame -> MISSION_SELECT -> 只此一院 -> MASK_SELECT -> 红脸 -> play -> shot.
import { pathToFileURL } from 'node:url';
const pw = await import(pathToFileURL('C:/Users/XINDONG/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs').href);
const { chromium } = pw;
const url = process.env.INTRO_URL || 'http://localhost:5184/';
const out = process.argv[2] || 'smoke/_intro_shot.png';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);
const body = () => page.evaluate(() => document.body.innerText);
const clickText = async (t) => {
  const l = page.locator('button').filter({ hasText: t }).first();
  console.log(`[${t}] count=`, await l.count());
  await l.click();
};

// 1 title -> start
await clickText('开始游戏');
await page.waitForTimeout(1000);
console.log('phase1:', JSON.stringify((await body()).slice(0,24)));
// 2 mission -> 只此一院
await clickText('只此一院');
await page.waitForTimeout(1000);
console.log('phase2:', JSON.stringify((await body()).slice(0,24)));
// 3 mask -> 红脸
await clickText('红脸');
await page.waitForTimeout(3200);
console.log('phase3:', JSON.stringify((await body()).slice(0,60)));
await page.screenshot({ path: out });
console.log('shot ->', out);
await browser.close();
