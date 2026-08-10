import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const { test, expect } = await import(pathToFileURL(process.env.PLAYWRIGHT_TEST_PATH).href);

const output = 'smoke';
mkdirSync(output, { recursive: true });

function rejectConsoleErrors(page) {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  return () => expect(errors, errors.join('\n')).toEqual([]);
}

async function start(page) {
  await page.goto('/');
  await page.getByRole('button', { name: '开始游戏' }).click();
  await page.waitForFunction(() => window.__sim?.snapshot().phase === 'MISSION_PLAY');
}

async function canvasLuminance(page, tile = null) {
  return page.evaluate((region) => {
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    const canvas = canvases.find((item) => getComputedStyle(item).visibility !== 'hidden' && getComputedStyle(item).opacity !== '0') ?? canvases[0];
    let sx = 0; let sy = 0; let sw = canvas.width; let sh = canvas.height;
    if (region !== null) {
      const room = window.__sim.snapshot().currentRoom;
      const scale = Math.min(canvas.width / 12, canvas.height / 11);
      const ox = (canvas.width - room.width * scale) / 2;
      const oy = (canvas.height - room.height * scale) / 2;
      sw = sh = Math.round(scale * 2);
      sx = Math.round(ox + region.x * scale - sw / 2);
      sy = Math.round(oy + region.y * scale - sh / 2);
    }
    const sample = document.createElement('canvas');
    sample.width = sw;
    sample.height = sh;
    const context = sample.getContext('2d', { willReadFrequently: true });
    context.drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);
    const pixels = context.getImageData(0, 0, sw, sh).data;
    let sum = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      sum += pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722;
    }
    return sum / (pixels.length / 4);
  }, tile);
}

test('darkness combat loop and visual light gate', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);

  const blocked = await page.evaluate(() => {
    const sim = window.__sim;
    const enemy = sim.snapshot().enemies[0];
    sim.player.position = { x: enemy.position.x - 0.7, y: enemy.position.y };
    sim.input({ kind: 'aim', angle: Math.atan2(enemy.position.y - sim.player.position.y, enemy.position.x - sim.player.position.x) });
    sim.input({ kind: 'attackStart' });
    return {
      hp: sim.snapshot().enemies[0].hp,
      blocked: sim.recentEvents.some((event) => event.kind === 'attackBlocked'),
    };
  });
  expect(blocked).toEqual({ hp: 1, blocked: true });

  await page.waitForTimeout(250);
  const lampTile = await page.evaluate(() => ({ ...window.__sim.snapshot().lightSources[0].position }));
  const intactLuminance = await canvasLuminance(page, lampTile);
  await page.screenshot({ path: `${output}/hotline-e2e-intact.png` });

  const broken = await page.evaluate(() => {
    const sim = window.__sim;
    const lamp = sim.snapshot().lightSources[0];
    sim.player.position = { x: lamp.position.x - 0.7, y: lamp.position.y };
    sim.input({ kind: 'aim', angle: Math.atan2(lamp.position.y - sim.player.position.y, lamp.position.x - sim.player.position.x) });
    sim.input({ kind: 'attackStart' });
    sim.input({ kind: 'attackStart' });
    for (let i = 0; i < 30; i++) sim.step(1 / 60);
    return sim.snapshot();
  });
  expect(broken.lightSources[0].hp).toBe(0);
  expect(broken.activeLights.some((light) => light.id === 'oil_lamp_1')).toBe(false);
  expect(broken.activeLights.length).toBeGreaterThan(0);
  await expect.poll(() => page.evaluate(() => window.__rcPipeline.lightCount)).toBe(broken.activeLights.length);
  await page.waitForTimeout(250);
  const brokenLuminance = await canvasLuminance(page, lampTile);
  expect(intactLuminance - brokenLuminance, `intact=${intactLuminance.toFixed(2)}, broken=${brokenLuminance.toFixed(2)}`).toBeGreaterThan(10);
  await page.screenshot({ path: `${output}/hotline-e2e-broken.png` });

  await page.evaluate(() => {
    const sim = window.__sim;
    const enemy = sim.snapshot().enemies[0];
    sim.player.position = { x: enemy.position.x - 0.7, y: enemy.position.y };
    sim.input({ kind: 'aim', angle: Math.atan2(enemy.position.y - sim.player.position.y, enemy.position.x - sim.player.position.x) });
    sim.input({ kind: 'attackStart' });
  });
  // v3.6 S5:出 A 房 → 进后间 B(不计分);B 房快进(清敌 + 传送出口)→ SCORE
  await page.evaluate(() => {
    const sim = window.__sim;
    const exit = sim.snapshot().currentRoom.exitTile;
    sim.player.position = { x: exit.x, y: exit.y };
    for (let i = 0; i < 3; i++) sim.step(1 / 60);
  });
  await expect.poll(() => page.evaluate(() => window.__sim.snapshot().currentRoom.id)).toBe('m1_backroom');
  await expect.poll(() => page.evaluate(() => window.__sim.snapshot().phase)).toBe('MISSION_PLAY');
  await page.screenshot({ path: `${output}/hotline-e2e-room-b.png` });
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.enemies.forEach((e) => { e.hp = 0; });
    const exit = sim.snapshot().currentRoom.exitTile;
    sim.player.position = { x: exit.x, y: exit.y };
    for (let i = 0; i < 3; i++) sim.step(1 / 60);
  });
  await expect.poll(() => page.evaluate(() => window.__sim.snapshot().phase)).toBe('SCORE');
  await expect(page.getByText('任务结算')).toBeVisible();
  await expect(page.getByRole('button', { name: '再战一次' })).toBeVisible();
  await page.screenshot({ path: `${output}/hotline-e2e-score-replay.png` });
  assertNoConsoleErrors();
});

test('flashlight detection death and retry', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);
  await page.evaluate(() => {
    const sim = window.__sim;
    for (let i = 0; i < 90; i++) sim.step(1 / 60);
    const enemy = sim.snapshot().enemies[0];
    sim.player.position = {
      x: enemy.position.x + Math.cos(enemy.facingAngle) * 2,
      y: enemy.position.y + Math.sin(enemy.facingAngle) * 2,
    };
    for (let i = 0; i < 90 && sim.snapshot().phase === 'MISSION_PLAY'; i++) {
      const liveEnemy = sim.snapshot().enemies[0];
      sim.player.position = {
        x: liveEnemy.position.x + Math.cos(liveEnemy.facingAngle) * 2,
        y: liveEnemy.position.y + Math.sin(liveEnemy.facingAngle) * 2,
      };
      sim.step(1 / 60);
    }
  });
  await expect(page.getByText('YOU DIED')).toBeVisible();
  await page.screenshot({ path: `${output}/hotline-e2e-detection-death.png` });
  await page.getByRole('button', { name: '重新开始' }).click();
  await expect.poll(() => page.evaluate(() => window.__sim.snapshot().phase)).toBe('MISSION_PLAY');
  expect(await page.evaluate(() => window.__sim.snapshot().player.hp)).toBe(1);
  await page.screenshot({ path: `${output}/hotline-e2e-retry.png` });
  assertNoConsoleErrors();
});

// v3.6 S2:子弹击杀"光下无敌"敌人——受光护甲只对近战(RMB)生效,LMB 射击不受格挡
test('bullet kills lit enemy (ranged bypasses lit armor)', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);
  const result = await page.evaluate(() => {
    const sim = window.__sim;
    for (let i = 0; i < 66; i++) sim.step(1 / 60); // 过宽限期
    sim.player.position = { x: 4, y: 6.5 };
    sim.enemies[0].position = { x: 4, y: 4 }; // 灯完好,敌在光下:近战必被格挡
    const target = { x: 4, y: 4 };
    sim.input({ kind: 'aim', angle: Math.atan2(target.y - sim.player.position.y, target.x - sim.player.position.x) });
    sim.input({ kind: 'fireStart' });
    const ammoAfterFire = sim.snapshot().player.ammo;
    for (let i = 0; i < 30; i++) sim.step(1 / 60);
    return {
      ammoAfterFire,
      killed: sim.recentEvents.some((event) => event.kind === 'enemyKilled'),
      blocked: sim.recentEvents.some((event) => event.kind === 'attackBlocked'),
      enemyHp: sim.snapshot().enemies[0].hp,
    };
  });
  expect(result).toEqual({ ammoAfterFire: 5, killed: true, blocked: false, enemyHp: 0 });
  await page.screenshot({ path: `${output}/hotline-e2e-bullet-kill.png` });
  assertNoConsoleErrors();
});

// v3.6 S3/S4:噪音广播——枪声 r8(仅 # 墙阻挡)令巡逻兵起疑但无视觉警告;
// 警报传播:A 发现玩家即呼叫 r6,声索通畅的注入敌 B 起疑(克隆体重置 state/awareness,防复制起疑态)
test('noise broadcast: gunshot suspicion and alert shout propagation', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);
  const heard = await page.evaluate(() => {
    const sim = window.__sim;
    for (let i = 0; i < 66; i++) sim.step(1 / 60); // 过宽限期(B01:期间听觉归零)
    sim.player.position = { x: 2, y: 7 };
    sim.enemies[0].position = { x: 4, y: 4 };
    sim.input({ kind: 'aim', angle: 0 }); // 朝 +x 空放,子弹打墙不伤人
    sim.input({ kind: 'fireStart' });
    for (let i = 0; i < 6; i++) sim.step(1 / 60);
    return {
      awareness: sim.snapshot().enemies[0].awareness,
      warnings: sim.recentEvents.filter((event) => event.kind === 'detectionWarning').length,
      noises: sim.snapshot().noises.length,
    };
  });
  expect(heard.awareness).toBe('suspicious');
  expect(heard.warnings).toBe(0);
  expect(heard.noises).toBeGreaterThanOrEqual(1);
  const propagated = await page.evaluate(() => {
    const sim = window.__sim;
    sim.enemies.push({ ...sim.enemies[0], id: 'patrol_2', position: { x: 7, y: 1.5 }, state: 'patrol', awareness: 'none', lastSuspiciousPosition: null });
    const alpha = sim.snapshot().enemies[0];
    sim.player.position = { x: alpha.position.x + Math.cos(alpha.facingAngle) * 1.5, y: alpha.position.y + Math.sin(alpha.facingAngle) * 1.5 };
    for (let i = 0; i < 12; i++) sim.step(1 / 60);
    return {
      alerts: sim.recentEvents.filter((event) => event.kind === 'enemyAlert').length,
      second: sim.snapshot().enemies[1].awareness,
    };
  });
  expect(propagated.alerts).toBeGreaterThanOrEqual(1);
  expect(propagated.second).toBe('suspicious');
  await page.screenshot({ path: `${output}/hotline-e2e-propagation.png` });
  assertNoConsoleErrors();
});
