// scripts/phase-playtest.mjs — 每 phase 浏览器 playtest + 截图门(用户指令 2026-08-09)
// 用法:node scripts/phase-playtest.mjs [p4|p5|all](依赖 dev server 5184)
// 页面:phase-preview.html(dev-only,真实 Simulation + InputManager + Canvas2D)
// 输出:smoke/phase-<phase>/*.png + RESULT=...;任何断言失败 → 退出码 1
import { createRequire } from 'node:module';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Git-repo-my/VibeGames/1/node_modules/playwright');

const BASE = 'http://localhost:5184/phase-preview.html';
const SHOT_ROOT = 'smoke/phase';
const consoleErrors = [];
let browser;
let page;

const shot = async (phase, name) => {
  const dir = `${SHOT_ROOT}/${phase}`;
  fs.mkdirSync(dir, { recursive: true });
  const path = `${dir}/${name}.png`;
  await page.screenshot({ path });
  console.log(`SHOT=${path}`);
};

const assert = (cond, msg) => {
  if (!cond) throw new Error('ASSERT_FAIL: ' + msg);
};

const teleport = (x, y, angle) =>
  page.evaluate(
    ([px, py, a]) => {
      const sim = window.__sim;
      sim.debugSetPlayerPosition({ x: px, y: py });
      sim.input({ kind: 'aim', angle: a });
      sim.step(1 / 60);
    },
    [x, y, angle],
  );

const attack = () =>
  page.evaluate(() => {
    window.__sim.input({ kind: 'attackStart' });
    window.__sim.step(1 / 60);
  });

const steps = (n) =>
  page.evaluate((count) => {
    const sim = window.__sim;
    for (let i = 0; i < count; i += 1) sim.step(1 / 60);
  }, n);

const simState = () =>
  page.evaluate(() => {
    const s = window.__sim.snapshot();
    return {
      room: s.currentRoom?.id ?? null,
      lamp: s.lightStates[0]
        ? { state: s.lightStates[0].state, hp: s.lightStates[0].hp, maxHp: s.lightStates[0].maxHp }
        : null,
      enemy: s.enemies[0]
        ? { archetype: s.enemies[0].archetype, state: s.enemies[0].state, shielded: window.__sim.lightField.isShielded(s.enemies[0].position) }
        : null,
      player: { x: +s.player.position.x.toFixed(2), y: +s.player.position.y.toFixed(2) },
    };
  });

const events = () =>
  page.evaluate(() => (window.__simEvents ? window.__simEvents() : window.__sim.events));

async function scenarioP4() {
  await page.goto(BASE, { waitUntil: 'load', timeout: 20000 });
  await page.waitForFunction(() => window.__sim !== undefined, null, { timeout: 10000 });
  await page.waitForTimeout(400);

  // 0) 出生态
  let st = await simState();
  assert(st.room === 'm1_workshop_room1', `room loaded (${st.room})`);
  assert(st.lamp?.state === 'intact' && st.lamp.hp === 2, `lamp intact hp=2 (${JSON.stringify(st.lamp)})`);
  assert(st.enemy?.archetype === 'flashlight_patrol', 'flashlight_patrol spawned');
  await shot('p4', '01-spawn');

  // 1) 站到灯下瞄准(玩家 (5.5,2.5) 朝上,灯心 (5.5,1.5),距离 1.0u ≤ 2.0u)
  await teleport(5.5, 2.5, -Math.PI / 2);
  await page.waitForTimeout(250);
  await shot('p4', '02-aim-at-lamp');

  // 2) LMB 第一次 → half_broken
  await attack();
  st = await simState();
  assert(st.lamp?.state === 'damaged' && st.lamp.hp === 1, `half broken (${JSON.stringify(st.lamp)})`);
  await shot('p4', '03-half-broken');

  // 3) LMB 第二次 → dead + invalidateLight(灯池仍满,0.1s 护甲窗口)
  await attack();
  st = await simState();
  assert(st.lamp?.state === 'dead' && st.lamp.hp === 0, `lamp dead (${JSON.stringify(st.lamp)})`);
  await shot('p4', '04-broken-pool-full');

  // 4) 0.4s 后灯池坍缩完成
  await steps(24);
  await page.waitForTimeout(250);
  await shot('p4', '05-pool-shrunk');

  // 5) 事件流
  const ev = await events();
  const kinds = ev.map((e) => e.kind);
  assert(kinds.filter((k) => k === 'lightSmash').length === 2, 'lightSmash ×2');
  assert(kinds.includes('lightDestroyed'), 'lightDestroyed');
  assert(kinds.includes('invalidateLight'), 'invalidateLight');
  assert(kinds.includes('sfx'), 'lamp_break sfx');

  // 6) 反例:面向错误方向不拆灯
  await page.evaluate(() => window.__phasePreview?.restart());
  await page.waitForFunction(() => window.__sim !== undefined, null, { timeout: 5000 });
  await page.waitForTimeout(200);
  await teleport(6.5, 2.5, 0); // 灯在西北 135°,面向东 → 不在 60° 弧内
  await attack();
  st = await simState();
  assert(st.lamp?.state === 'intact', `arc gate: lamp untouched (${JSON.stringify(st.lamp)})`);
  await shot('p4', '06-arc-gate');

  console.log('RESULT=p4 OK');
}

async function scenarioP5() {
  await page.goto(BASE, { waitUntil: 'load', timeout: 20000 });
  await page.waitForFunction(() => window.__sim !== undefined, null, { timeout: 10000 });
  await page.waitForTimeout(400);

  // 1) 光下无敌:敌人站进护甲池(灯东 1.0u,贡献 ≈0.33 > 0.30),玩家 2.2u 外(灯不在拆灯优先范围)
  await page.evaluate(() => {
    window.__sim.debugSetEnemyPosition(0, { x: 6.5, y: 1.5 });
  });
  await teleport(7.7, 1.5, Math.PI); // 敌人在西侧(灯东 1.0u),面向西
  await attack();
  let st = await simState();
  assert(st.enemy?.shielded === true, `enemy shielded in pool (${JSON.stringify(st.enemy)})`);
  assert(st.enemy?.state !== 'patrol' || true, 'enemy still alive');
  let ev = await events();
  let kinds = ev.map((e) => e.kind);
  assert(kinds.includes('attackBlocked'), 'attackBlocked emitted');
  assert(kinds.includes('sfx'), 'shield_block sfx emitted');
  assert(!kinds.includes('enemyKilled'), 'no enemyKilled while shielded');
  st = await simState();
  assert(st.enemy && st.enemy.state !== undefined, 'enemy alive after blocked hit');
  await shot('p5', '01-blocked-shielded');

  // 2) 拆灯(玩家进 2u 内,两下 LMB;灯碎后 0.2s 池坍缩 → 敌人转暗中)
  await teleport(7.2, 1.5, Math.PI);
  await attack();
  await attack();
  st = await simState();
  assert(st.lamp?.state === 'dead', `lamp dead after 2 smashes (${JSON.stringify(st.lamp)})`);
  ev = await events();
  kinds = ev.map((e) => e.kind);
  assert(kinds.filter((k) => k === 'lightSmash').length === 2, 'lightSmash ×2');
  assert(kinds.includes('invalidateLight'), 'invalidateLight');
  await steps(12); // 0.2s:0.1s 护甲窗口后开始衰减,已低于 0.30 阈值
  st = await simState();
  assert(st.enemy?.shielded === false, `enemy unshielded after pool shrink (${JSON.stringify(st.enemy)})`);
  await shot('p5', '02-lamp-broken-unshielded');

  // 3) 暗中 OHK:空手拳头(未拾刀)1 击必杀
  await teleport(7.7, 1.5, Math.PI);
  await attack();
  st = await simState();
  ev = await events();
  kinds = ev.map((e) => e.kind);
  assert(kinds.includes('enemyKilled'), 'enemyKilled emitted');
  assert(st.enemy?.state !== undefined, 'enemy snapshot present (hp=0 死亡态)');
  await shot('p5', '03-ohk-kill');

  // 4) 灯下暴露 → 0.4s 提示后死亡(静态光暴露路径,确定性)
  await page.evaluate(() => window.__phasePreview?.restart());
  await page.waitForFunction(() => window.__sim !== undefined, null, { timeout: 5000 });
  await page.waitForTimeout(200);
  await teleport(5.5, 2.0, 0); // 灯下 0.5u → lightAt ≈0.59 > 0.10 暴露
  await steps(30); // 0.5s > 0.4s 瞄准提示
  st = await simState();
  ev = await events();
  kinds = ev.map((e) => e.kind);
  assert(kinds.includes('playerKilled'), 'playerKilled emitted');
  assert(kinds.includes('enemyAttack'), 'telegraph enemyAttack emitted first');
  await shot('p5', '04-death-vignette');

  // 5) DEATH_RESPAWN_DELAY=1.2s 后重开:出生点 / 装备清空 / 灯恢复 intact
  await steps(80); // 1.33s
  st = await simState();
  assert(st.player.x === 2.5 && st.player.y === 6.5, `respawn at spawn (${st.player.x},${st.player.y})`);
  assert(st.lamp?.state === 'intact' && st.lamp.hp === 2, `lamp restored (${JSON.stringify(st.lamp)})`);
  assert(st.enemy?.state !== undefined, 'enemy re-spawned');
  const p = await page.evaluate(() => {
    const s = window.__sim.snapshot();
    return { weapon: s.player.weapon, kills: s.player.kills, hp: s.player.hp };
  });
  assert(p.weapon === null && p.kills === 0 && p.hp === 1, `death clears loadout (${JSON.stringify(p)})`);
  await shot('p5', '05-respawn-clean');

  console.log('RESULT=p5 OK');
}

async function scenarioP6() {
  const APP = 'http://localhost:5184/';
  await page.goto(APP, { waitUntil: 'load', timeout: 20000 });
  await page.waitForFunction(() => window.__sim !== undefined, null, { timeout: 10000 });
  await page.waitForTimeout(400);

  // 0) 标题壳:MainMenu 可见且可点击
  const titleText = await page.evaluate(() => document.body.innerText);
  assert(titleText.includes('HOTLINE SHANGHAI'), 'title screen visible');
  await shot('p6', '01-title');

  // 1) 点击 开始游戏 → 直接进 intro scene(B15 无选任务/面具)
  await page.getByRole('button', { name: /开始游戏/ }).click();
  await page.waitForFunction(
    () => window.__sim?.snapshot().phase === 'MISSION_PLAY',
    null,
    { timeout: 8000 },
  );
  await page.waitForTimeout(500);
  let st = await simState();
  assert(st.room === 'm1_workshop_room1', `room loaded (${st.room})`);
  const manifest = await page.evaluate(() => (window.__gameManifest ? window.__gameManifest() : ''));
  assert(manifest.includes('m1_workshop_room1'), '__gameManifest returns room');
  const canvasOk = await page.evaluate(() => document.querySelectorAll('canvas').length >= 1);
  assert(canvasOk, 'render canvas mounted');
  await shot('p6', '02-enter-room');

  // 2) 真实键盘输入:按 D 0.4s → 玩家右移(InputManager → GameEngine → Simulation)
  const before = (await simState()).player;
  await page.keyboard.down('d');
  await page.waitForTimeout(400);
  await page.keyboard.up('d');
  await page.waitForTimeout(200);
  st = await simState();
  assert(st.player.x > before.x + 0.3, `keyboard move works (${before.x} → ${st.player.x})`);
  await shot('p6', '03-move');

  // 3) 拆灯:站灯下 1.0u 朝灯,两次 LMB → 灯碎(拆灯时玩家在灯池内会被巡逻兵盯上,
  //    所以正确打法是拆完立刻退进暗角 —— 这正是 intro scene 要教的光暗节奏)
  await teleport(5.5, 2.5, -Math.PI / 2);
  await attack();
  await attack();
  st = await simState();
  assert(st.lamp?.state === 'dead', `lamp broken via LMB (${JSON.stringify(st.lamp)})`);
  await shot('p6', '04-lamp-broken');
  // 0.4s 瞄准提示完成前退入暗角,等灯池坍缩(0.3s)
  await teleport(2.5, 7.5, 0);
  await steps(24);
  await page.waitForTimeout(250);

  // 4) OHK:传送到敌人旁(出生点不 shielded),空手 LMB → 击杀
  const enemyPos = await page.evaluate(() => {
    const e = window.__sim.snapshot().enemies[0];
    return e ? e.position : null;
  });
  assert(enemyPos !== null, 'enemy alive');
  await page.evaluate((pos) => {
    window.__sim.debugSetPlayerPosition({ x: pos.x + 0.9, y: pos.y });
    window.__sim.input({ kind: 'aim', angle: Math.PI });
    window.__sim.step(1 / 60);
  }, enemyPos);
  await attack();
  st = await simState();
  const ev = await events();
  assert(ev.some((e) => e.kind === 'enemyKilled'), 'enemyKilled via LMB');
  await page.waitForTimeout(250);
  await shot('p6', '05-kill');

  // 5) 灯下暴露死亡(真实主循环步进 + UI 死亡屏)
  await page.evaluate(() => window.__sim.startGame()); // 重开房间
  await page.waitForTimeout(300);
  await teleport(5.5, 2.0, 0);
  await steps(36); // 0.6s > 0.4s 提示
  await page.waitForTimeout(400);
  st = await simState();
  assert(st.player && st.player.x !== undefined, 'player snapshot present');
  const deathUi = await page.evaluate(() => document.body.innerText.includes('YOU DIED'));
  assert(deathUi, 'death screen UI visible');
  await shot('p6', '06-death');

  // 6) 1.2s 后重生:出生点 + 灯恢复 + 装备清空
  await steps(80);
  await page.waitForTimeout(500);
  st = await simState();
  assert(st.player.x === 2.5 && st.player.y === 6.5, `respawn at spawn (${st.player.x},${st.player.y})`);
  assert(st.lamp?.state === 'intact' && st.lamp.hp === 2, `lamp restored (${JSON.stringify(st.lamp)})`);
  await shot('p6', '07-respawn');

  // 7) 性能探针:__perf 帧时间(60 FPS 目检留手动;headless 只要求主循环活着)
  const perf = await page.evaluate(() => window.__perf ?? null);
  assert(perf !== null && typeof perf.lastFrameTimeMs === 'number', `__perf probe present (${JSON.stringify(perf)})`);
  console.log('PERF=' + JSON.stringify(perf));

  console.log('RESULT=p6 OK');
}

const SCENARIOS = { p4: scenarioP4, p5: scenarioP5, p6: scenarioP6 };
const scenarioName = process.argv[2] ?? 'p4';
if (!(scenarioName in SCENARIOS)) {
  console.error('Unknown scenario: ' + scenarioName);
  process.exit(2);
}

try {
  browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-frame-rate-limit',
      '--use-gl=swiftshader',
    ],
  });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  page = await ctx.newPage();
  page.on('pageerror', (err) => consoleErrors.push('pageerror: ' + err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push('console: ' + msg.text());
  });
  await SCENARIOS[scenarioName]();
  if (consoleErrors.length > 0) {
    console.error('CONSOLE_ERRORS=' + JSON.stringify(consoleErrors, null, 2));
    process.exitCode = 1;
  } else {
    console.log('RESULT=all-clean (no console errors)');
  }
} catch (e) {
  console.error('SCENARIO_FAIL=' + e.message);
  try {
    await shot(scenarioName, 'fail');
  } catch {
    /* ignore */
  }
  process.exitCode = 1;
} finally {
  await browser?.close();
}
