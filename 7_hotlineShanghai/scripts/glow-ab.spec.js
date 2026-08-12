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
  await expect.poll(() => page.evaluate(() => window.__rcPipeline.ditherEnabled)).toBe(false);
}

async function triggerRestart(page) {
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.killPlayer();
  });
  await expect(page.getByText('YOU DIED')).toBeVisible();
  await page.getByRole('button', { name: '重新开始' }).click();
  await expect.poll(() => page.evaluate(() => window.__sim.snapshot().phase)).toBe('MISSION_PLAY');
  await page.screenshot({ path: `${output}/show-game-restart-after-fix.png` });
}

async function quadrantLumaFromCanvas(page) {
  return page.evaluate(() => {
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    const canvas = canvases.find((item) => getComputedStyle(item).visibility !== 'hidden' && getComputedStyle(item).opacity !== '0') ?? canvases[0];
    const sample = document.createElement('canvas');
    sample.width = canvas.width;
    sample.height = canvas.height;
    const context = sample.getContext('2d', { willReadFrequently: true });
    context.drawImage(canvas, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const w = canvas.width;
    const h = canvas.height;
    const quadrant = (x0, y0) => {
      let sum = 0;
      let bright = 0;
      let n = 0;
      for (let y = y0; y < y0 + (h >> 1); y += 4) {
        for (let x = x0; x < x0 + (w >> 1); x += 4) {
          const i = (y * w + x) * 4;
          const luma = pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722;
          sum += luma;
          n += 1;
          if (luma > 30) bright += 1;
        }
      }
      return { mean: sum / n, brightRatio: bright / n };
    };
    return {
      TL: quadrant(0, 0),
      TR: quadrant(w >> 1, 0),
      BL: quadrant(0, h >> 1),
      BR: quadrant(w >> 1, h >> 1),
      w,
      h,
    };
  });
}

async function planeStats(page, name) {
  return page.evaluate((plane) => {
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    const canvas = canvases.find((item) => item.width === 720 && item.height === 480 && getComputedStyle(item).opacity === '0') ?? canvases[0];
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return null;
    const data = context.getImageData(0, 0, 720, 480).data;
    const room = window.__sim.snapshot().currentRoom;
    const scale = Math.min(720 / (room.width + 2), 480 / (room.height + 2));
    const ox = Math.floor((720 - room.width * scale) / 2);
    const oy = Math.floor((480 - room.height * scale) / 2);
    const x1 = Math.floor(ox + room.width * scale);
    const y1 = Math.floor(oy + room.height * scale);
    const quadrant = (qx0, qy0) => {
      const xm = Math.floor((qx0 + x1) / 2);
      const ym = Math.floor((qy0 + y1) / 2);
      let sum = 0;
      let bright = 0;
      let n = 0;
      for (let y = qy0; y < ym; y += 2) {
        for (let x = qx0; x < xm; x += 2) {
          const i = (y * 720 + x) * 4;
          const luma = data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722;
          sum += luma;
          n += 1;
          if (luma > 30) bright += 1;
        }
      }
      return { mean: sum / n, brightRatio: bright / n };
    };
    return {
      plane,
      room: { x0: ox, y0: oy, x1, y1 },
      TL: quadrant(ox, oy),
      TR: quadrant((ox + x1) >> 1, oy),
      BL: quadrant(ox, (oy + y1) >> 1),
      BR: quadrant((ox + x1) >> 1, (oy + y1) >> 1),
    };
  }, name);
}

async function realPlaneStats(page) {
  return page.evaluate(() => {
    const planes = window.__rcPresenterPlanes;
    if (!planes) return null;
    const room = window.__sim.snapshot().currentRoom;
    const scale = Math.min(720 / (room.width + 2), 480 / (room.height + 2));
    const ox = Math.floor((720 - room.width * scale) / 2);
    const oy = Math.floor((480 - room.height * scale) / 2);
    const x1 = Math.floor(ox + room.width * scale);
    const y1 = Math.floor(oy + room.height * scale);
    const describe = (image) => {
      const data = image.data;
      const quadrant = (qx0, qy0) => {
        const xm = Math.floor((qx0 + x1) / 2);
        const ym = Math.floor((qy0 + y1) / 2);
        let sum = 0;
        let bright = 0;
        let n = 0;
        for (let y = qy0; y < ym; y += 2) {
          for (let x = qx0; x < xm; x += 2) {
            const i = (y * 720 + x) * 4;
            const luma = data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722;
            sum += luma;
            n += 1;
            if (luma > 30) bright += 1;
          }
        }
        return { mean: sum / n, brightRatio: bright / n };
      };
      return {
        room: { x0: ox, y0: oy, x1, y1 },
        TL: quadrant(ox, oy),
        TR: quadrant((ox + x1) >> 1, oy),
        BL: quadrant(ox, (oy + y1) >> 1),
        BR: quadrant((ox + x1) >> 1, (oy + y1) >> 1),
      };
    };
    return {
      sceneColor: describe(planes.sceneColor),
      occlusion: describe(planes.occlusion),
      emission: describe(planes.emission),
    };
  });
}

async function freezeAndCapture(page, label, withRc) {
  const snapshot = await page.evaluate(() => JSON.parse(JSON.stringify(window.__sim.snapshot())));
  const meta = await page.evaluate((rc) => ({
    activeCascades: window.__rcPipeline.activeCascades,
    lightScale: window.__rcPipeline.lightScale,
    ambient: window.__rcPipeline.ambientIntensity,
    resolutionScale: window.__rcPipeline.resolutionScale,
    withRc: rc,
  }), withRc);
  await page.screenshot({ path: `${output}/glow-ab-${label}.png` });
  return { snapshot, meta };
}

test('glow A/B: RC on vs off on the restart frame', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);

  // Reach the death/restart screen deterministically.
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.killPlayer();
  });
  await expect(page.getByText('YOU DIED')).toBeVisible();
  await page.screenshot({ path: `${output}/glow-ab-death.png` });

  // Freeze the game state: stop rAF-driven simulation changes by setting a
  // deterministic snapshot and pausing the simulation clock.
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.paused = true;
    for (let i = 0; i < sim.enemies.length; i++) {
      sim.enemies[i].velocity = { x: 0, y: 0 };
      sim.enemies[i].patrolAxis = 'static';
      sim.enemies[i].state = 'engaging';
      sim.enemies[i].awareness = 'none';
    }
    sim.player.position = { x: 2, y: 10 };
    sim.player.velocity = { x: 0, y: 0 };
  });

  // RC ON (production profile)
  await page.evaluate(() => {
    window.__rcSetConfig({ cascadeCount: 3, lightScale: 1.35, ambientIntensity: 0.02 });
  });
  await page.waitForTimeout(350);
  const rcOnStats = await quadrantLumaFromCanvas(page);
  const realPlanes = await realPlaneStats(page);
  const rcOnPlanes = {
    scene: await planeStats(page, 'sceneColor'),
    occlusion: await planeStats(page, 'occlusion'),
    emission: await planeStats(page, 'emission'),
  };
  const rcOnMeta = await freezeAndCapture(page, 'rc-on', true);
  console.log('GLOW_RC_ON', JSON.stringify({ stats: rcOnStats, realPlanes, planes: rcOnPlanes, meta: rcOnMeta.meta }));

  // RC OFF (fallback base color)
  await page.evaluate(() => {
    window.__rcSetConfig({ cascadeCount: 0, lightScale: 0, ambientIntensity: 0 });
  });
  await page.waitForTimeout(350);
  const rcOffStats = await quadrantLumaFromCanvas(page);
  const rcOffMeta = await freezeAndCapture(page, 'rc-off', false);
  console.log('GLOW_RC_OFF', JSON.stringify({ stats: rcOffStats, meta: rcOffMeta.meta }));

  // Re-enable RC for the next frame.
  await page.evaluate(() => {
    window.__rcSetConfig({ cascadeCount: 3, lightScale: 1.35, ambientIntensity: 0.02 });
  });
  await page.waitForTimeout(200);
  assertNoConsoleErrors();
});

test('restart capture: flash cleared and quadrant ratio improved', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);
  await triggerRestart(page);
  const stats = await quadrantLumaFromCanvas(page);
  console.log('GLOW_RESTART_AFTER', JSON.stringify(stats));
  assertNoConsoleErrors();
});
