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

async function canvasLuminance(page) {
  return page.evaluate(() => {
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    const canvas = canvases.find((item) => getComputedStyle(item).visibility !== 'hidden') ?? canvases[0];
    const sample = document.createElement('canvas');
    sample.width = canvas.width;
    sample.height = canvas.height;
    const context = sample.getContext('2d', { willReadFrequently: true });
    context.drawImage(canvas, 0, 0);
    const pixels = context.getImageData(0, 0, sample.width, sample.height).data;
    let sum = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      sum += pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722;
    }
    return sum / (pixels.length / 4);
  });
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
  const intactLuminance = await canvasLuminance(page);
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
  expect(broken.activeLights).toHaveLength(0);
  await expect.poll(() => page.evaluate(() => window.__rcPipeline.lightCount)).toBe(0);
  await page.waitForTimeout(250);
  const brokenLuminance = await canvasLuminance(page);
  expect(intactLuminance - brokenLuminance, `intact=${intactLuminance.toFixed(2)}, broken=${brokenLuminance.toFixed(2)}`).toBeGreaterThan(0.5);
  await page.screenshot({ path: `${output}/hotline-e2e-broken.png` });

  await page.evaluate(() => {
    const sim = window.__sim;
    const enemy = sim.snapshot().enemies[0];
    sim.player.position = { x: enemy.position.x - 0.7, y: enemy.position.y };
    sim.input({ kind: 'aim', angle: Math.atan2(enemy.position.y - sim.player.position.y, enemy.position.x - sim.player.position.x) });
    sim.input({ kind: 'attackStart' });
  });
  await page.evaluate(() => {
    const sim = window.__sim;
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
