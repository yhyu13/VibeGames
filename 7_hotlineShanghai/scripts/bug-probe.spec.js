// scripts/bug-probe.spec.js — diagnostic probe for the live bullet aim/trajectory bug.
// Invoked via scripts/run-e2e.mjs with scripts/playwright.bug-probe.config.mjs.
// Reads window.__sim internals through the real GameEngine loop (real InputManager aim),
// dumps the raw aim/bullet/lamp state so the live-vs-sim divergence can be pinned down.
import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const { test } = await import(pathToFileURL(process.env.PLAYWRIGHT_TEST_PATH).href);
const output = 'smoke';
mkdirSync(output, { recursive: true });

test('probe: live aim -> fire -> bullet trajectory', async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto('/');
  await page.locator('button').first().click();
  await page.waitForFunction(() => window.__sim?.snapshot().phase === 'MISSION_PLAY');
  await page.waitForTimeout(500);

  // deterministic setup: freeze enemies, teleport player beside the lamp on a clear lane
  await page.evaluate(() => {
    const sim = window.__sim;
    for (const e of sim.enemies) e.hp = 0;
    sim.player.position = { x: 1, y: 3 };
    sim.player.weapon = 'mauser_c96';
    sim.player.mode = 'ranged';
    sim.player.ammo = 6;
    sim.player.reloading = 0;
    sim.playerFireCooldown = 0;
  });

  // aim at the lamp visual center (4.5, 3.5) via REAL mouse move
  const client = await page.evaluate(() => {
    const canvas = document.querySelector('#game-canvas canvas');
    const rect = canvas.getBoundingClientRect();
    const room = window.__sim.snapshot().currentRoom;
    const scaleCss = Math.min(rect.width / (room.width + 2), rect.height / (room.height + 2));
    const originX = (rect.width - room.width * scaleCss) / 2;
    const originY = (rect.height - room.height * scaleCss) / 2;
    return { x: rect.left + originX + 4.5 * scaleCss, y: rect.top + originY + 3.5 * scaleCss };
  });
  await page.mouse.move(Math.round(client.x), Math.round(client.y));
  await page.waitForTimeout(120);

  const stateBefore = await page.evaluate(() => {
    const s = window.__sim.snapshot();
    return {
      playerPos: { ...s.player.position },
      facing: s.player.facingAngle,
      ammo: s.player.ammo,
      mode: s.player.mode,
      weapon: s.player.weapon,
      lampHp: s.lightSources[0].hp,
    };
  });

  await page.mouse.down({ button: 'left' });
  await page.waitForTimeout(40);
  await page.mouse.up({ button: 'left' });

  const stateAfterFire = await page.evaluate(() => {
    const s = window.__sim.snapshot();
    const lamp = s.lightSources[0];
    return {
      ammo: s.player.ammo,
      fireEvents: window.__sim.events.filter((e) => e.kind === 'fire').length,
      bullets: s.bullets.map((b) => ({ x: +b.position.x.toFixed(3), y: +b.position.y.toFixed(3), vx: +b.velocity.x.toFixed(1), vy: +b.velocity.y.toFixed(1), ttl: +b.ttl.toFixed(3) })),
      lampHp: lamp.hp,
      lampState: lamp.state,
    };
  });

  // step 8 ticks (~0.133s) and observe bullet progress
  for (let i = 0; i < 8; i++) {
    await page.evaluate(() => window.__sim.step(1 / 60));
  }
  const stateAfterStep = await page.evaluate(() => {
    const s = window.__sim.snapshot();
    return {
      bullets: s.bullets.map((b) => ({ x: +b.position.x.toFixed(3), y: +b.position.y.toFixed(3) })),
      lampHp: s.lightSources[0].hp,
      lampState: s.lightSources[0].state,
      lightSmash: window.__sim.events.filter((e) => e.kind === 'lightSmash').length,
    };
  });

  console.log('PROBE_STATE_BEFORE', JSON.stringify(stateBefore));
  console.log('PROBE_STATE_AFTER_FIRE', JSON.stringify(stateAfterFire));
  console.log('PROBE_STATE_AFTER_STEP', JSON.stringify(stateAfterStep));
  await page.screenshot({ path: `${output}/bug-probe.png` });
});
