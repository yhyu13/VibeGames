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

async function pixelDump(page, label) {
  const data = await page.evaluate(() => {
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    // Return per-canvas luminance arrays so we can tell which canvas is which.
    return canvases.map((canvas) => {
      const sample = document.createElement('canvas');
      sample.width = 720;
      sample.height = 480;
      const context = sample.getContext('2d', { willReadFrequently: true });
      context.drawImage(canvas, 0, 0, sample.width, sample.height);
      const pixels = context.getImageData(0, 0, sample.width, sample.height).data;
      const out = new Uint8Array(720 * 480);
      for (let i = 0, j = 0; i < pixels.length; i += 4, j += 1) {
        out[j] = Math.round(pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722);
      }
      return {
        width: canvas.width,
        height: canvas.height,
        opacity: getComputedStyle(canvas).opacity,
        data: Array.from(out),
      };
    });
  });
  return { label, data };
}

test('RC placement / dither / muzzle self-check', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);
  await page.waitForTimeout(300);

  // Freeze a deterministic frame: hold enemies static so RC seeds are stable.
  await page.evaluate(() => {
    const sim = window.__sim;
    for (const enemy of sim.enemies) {
      enemy.patrolAxis = 'static';
      enemy.state = 'engaging';
      enemy.awareness = 'none';
      enemy.velocity = { x: 0, y: 0 };
    }
  });
  await page.waitForTimeout(300);
  const base = await pixelDump(page, 'base');
  await page.screenshot({ path: `${output}/rc-fix-base.png` });

  // Muzzle flash: fire once while pointing into a dark room direction.
  // Sample emission immediately after the fire so the 0.08s ttl is still alive.
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.input({ kind: 'aim', angle: 0 });
    sim.input({ kind: 'fireStart' });
    sim.step(1 / 60);
    // Hold the muzzle flash alive for reliable capture (0.08s is too brief for screenshots).
    const muzzle = sim.activeLights.find((light) => light.kind === 'muzzle_flash');
    if (muzzle) muzzle.ttl = 0.2;
  });
  await page.waitForTimeout(16);
  await page.screenshot({ path: `${output}/rc-fix-muzzle-live.png` });
  const activeLights = await page.evaluate(() => {
    const snap = window.__sim.snapshot();
    return {
      active: snap.activeLights.map((light) => ({
        kind: light.kind,
        position: light.position,
        ttl: light.ttl,
        radius: light.radius,
        intensity: light.intensity,
      })),
      player: snap.player.position,
      melee: snap.melee.map((swing) => ({ position: swing.position, facing: swing.facingAngle, ttl: swing.ttl })),
      bullets: snap.bullets.map((bullet) => ({ position: bullet.position, velocity: bullet.velocity })),
    };
  });
  console.log('ACTIVE_LIGHTS', JSON.stringify(activeLights));
  const emissionStats = await page.evaluate(() => {
    const planes = window.__rcPresenterPlanes;
    if (!planes) return null;
    const data = planes.emission.data;
    const hits = [];
    for (let y = 0; y < 480; y += 1) {
      for (let x = 0; x < 720; x += 1) {
        const i = (y * 720 + x) * 4;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        if (r > 0 || g > 0 || b > 0) hits.push({ x, y, r, g, b });
      }
    }
    // Group by warm muzzle color (r > g > b) near the player area to find the seed.
    const muzzle = hits.filter((h) => h.r > 150 && h.g > 80 && h.g < 200 && h.b < 100);
    const player = hits.filter((h) => h.x >= 100 && h.x <= 260 && h.y >= 330 && h.y <= 440);
    const bbox = (list) => {
      if (list.length === 0) return null;
      const xs = list.map((h) => h.x), ys = list.map((h) => h.y);
      return {
        minX: Math.min(...xs), maxX: Math.max(...xs),
        minY: Math.min(...ys), maxY: Math.max(...ys),
        count: list.length,
        sample: list.slice(0, 8),
      };
    };
    return { hits, muzzle, player, muzzleBBox: bbox(muzzle), playerBBox: bbox(player) };
  });
  console.log('EMISSION_HITS', JSON.stringify(emissionStats?.hits.slice(0, 80)));
  console.log('EMISSION_COUNT', emissionStats?.hits.length ?? -1);
  console.log('EMISSION_MUZZLE_BBOX', JSON.stringify(emissionStats?.muzzleBBox));
  console.log('EMISSION_PLAYER_BBOX', JSON.stringify(emissionStats?.playerBBox));
  const muzzle = await pixelDump(page, 'muzzle');

  assertNoConsoleErrors();
});

test('placement audit: emission seed vs RC glow vs sprite', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);
  await page.waitForTimeout(300);

  // Freeze deterministic state: remove enemies/cones/bullets, fixed elapsed.
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.elapsed = 0.5;
    sim.enemies = [];
    sim.bullets = [];
    sim.melee = [];
    sim.player.position = { x: 2, y: 10 };
    sim.player.velocity = { x: 0, y: 0 };
  });
  await page.waitForTimeout(400);

  const audit = await page.evaluate(() => {
    const snap = window.__sim.snapshot();
    const planes = window.__rcPresenterPlanes;
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    const canvasInfo = canvases.map((item, idx) => ({
      idx,
      width: item.width,
      height: item.height,
      visibility: getComputedStyle(item).visibility,
      opacity: getComputedStyle(item).opacity,
      zIndex: getComputedStyle(item).zIndex,
    }));
    const rcCanvas = canvases.find((item) => item.width === 720 && item.height === 480 && getComputedStyle(item).visibility !== 'hidden' && getComputedStyle(item).opacity !== '0');
    let rcPixelLuma = null;
    if (rcCanvas) {
      const s2 = document.createElement('canvas');
      s2.width = 720; s2.height = 480;
      const c2 = s2.getContext('2d', { willReadFrequently: true });
      c2.drawImage(rcCanvas, 0, 0);
      const d = c2.getImageData(0, 0, 720, 480).data;
      let sum = 0;
      for (let i = 0; i < d.length; i += 4) sum += d[i] * 0.2126 + d[i + 1] * 0.7152 + d[i + 2] * 0.0722;
      rcPixelLuma = sum / (720 * 480);
    }
    const sample = document.createElement('canvas');
    sample.width = 720;
    sample.height = 480;
    const ctx = sample.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(rcCanvas, 0, 0);
    const rcPixels = ctx.getImageData(0, 0, 720, 480).data;
    const em = planes.emission.data;
    let emTotal = 0;
    const emHits = [];
    for (let y = 0; y < 480; y += 4) {
      for (let x = 0; x < 720; x += 4) {
        const i = (y * 720 + x) * 4;
        const l = em[i] * 0.2126 + em[i + 1] * 0.7152 + em[i + 2] * 0.0722;
        if (l > 100) emHits.push({ x, y, l: Math.round(l), r: em[i], g: em[i + 1], b: em[i + 2] });
      }
    }
    emTotal = emHits.reduce((s, h) => s + h.l, 0);
    // Find all seed clusters for the searchlight color (202,202,230) in columns 500-540.
    const searchlightClusters = [];
    for (let y = 0; y < 480; y += 1) {
      let count = 0;
      for (let x = 500; x < 540; x += 1) {
        const i = (y * 720 + x) * 4;
        if (em[i] === 202 && em[i + 1] === 202 && em[i + 2] === 230) count += 1;
      }
      if (count > 4) searchlightClusters.push(y);
    }
    const neonClusters = [];
    for (let y = 0; y < 480; y += 1) {
      let count = 0;
      for (let x = 606; x < 640; x += 1) {
        const i = (y * 720 + x) * 4;
        if (em[i] > 20 && em[i + 1] > 100 && em[i + 2] > 120) count += 1;
      }
      if (count > 4) neonClusters.push(y);
    }
    const emSample = [
      { x: 514, y: 85, v: em[((85 * 720) + 514) * 4] },
      { x: 514, y: 28, v: em[((28 * 720) + 514) * 4] },
      { x: 445, y: 188, v: em[((188 * 720) + 445) * 4] },
      { x: 137, y: 394, v: em[((394 * 720) + 137) * 4] },
    ];
    const room = snap.currentRoom;
    const scale = Math.min(720 / (room.width + 2), 480 / (room.height + 2));
    const ox = Math.floor((720 - room.width * scale) / 2);
    const oy = Math.floor((480 - room.height * scale) / 2);

    // Peak position of a region: sum luma within 12px of expected center.
    // (2026-08-13 修复:循环边界取整,否则 float 索引取到 undefined → NaN 测量)
    const peak = (cx, cy, radius) => {
      let best = { l: -1, x: Math.round(cx), y: Math.round(cy) };
      const x0 = Math.max(0, Math.round(cx) - radius); const x1 = Math.min(719, Math.round(cx) + radius);
      const y0 = Math.max(0, Math.round(cy) - radius); const y1 = Math.min(479, Math.round(cy) + radius);
      for (let y = y0; y <= y1; y += 1) {
        for (let x = x0; x <= x1; x += 1) {
          const i = (y * 720 + x) * 4;
          const l = rcPixels[i] * 0.2126 + rcPixels[i + 1] * 0.7152 + rcPixels[i + 2] * 0.0722;
          if (l > best.l) best = { l, x, y };
        }
      }
      return best;
    };
    const toRoom = (x, y) => ({
      x: (x - ox) / scale - 0.5,
      y: (y - oy) / scale - 0.5,
    });
    const seedCenter = (light) => {
      const lx = Math.round(ox + (light.position.x + 0.5) * scale);
      const ly = Math.round(oy + (light.position.y + 0.5) * scale);
      let sumX = 0, sumY = 0, count = 0;
      for (let y = Math.max(0, ly - 8); y <= Math.min(479, ly + 8); y += 1) {
        for (let x = Math.max(0, lx - 8); x <= Math.min(719, lx + 8); x += 1) {
          const i = (y * 720 + x) * 4;
          const l = em[i] * 0.2126 + em[i + 1] * 0.7152 + em[i + 2] * 0.0722;
          if (l > 0) { sumX += x * l; sumY += y * l; count += l; }
        }
      }
      return count > 0 ? { x: sumX / count, y: sumY / count } : null;
    };

    const lights = snap.lightSources
      .filter((l) => !l.invalidated)
      .map((l) => ({
        kind: l.kind,
        position: l.position,
        expected: { x: ox + (l.position.x + 0.5) * scale, y: oy + (l.position.y + 0.5) * scale },
        seed: seedCenter(l),
        glow: peak(ox + (l.position.x + 0.5) * scale, oy + (l.position.y + 0.5) * scale, 14),
      }));

    // Player glow seed + sprite expected position.
    const playerExpected = { x: ox + (snap.player.position.x + 0.5) * scale, y: oy + (snap.player.position.y + 0.5) * scale };
    const playerSeed = seedCenter({ position: snap.player.position });
    const playerGlow = peak(playerExpected.x, playerExpected.y, 14);

    // Player-area probe: dump the emission seed bbox and rc composite peaks in a 60px box.
    const playerSeedHits = [];
    // 2026-08-13 修复:以下两处循环边界取整(float 索引 → undefined → NaN)
    const pex = Math.round(playerExpected.x);
    const pey = Math.round(playerExpected.y);
    for (let y = Math.max(0, pey - 40); y <= Math.min(479, pey + 40); y += 1) {
      for (let x = Math.max(0, pex - 40); x <= Math.min(719, pex + 40); x += 1) {
        const i = (y * 720 + x) * 4;
        const l = em[i] * 0.2126 + em[i + 1] * 0.7152 + em[i + 2] * 0.0722;
        if (l > 10) playerSeedHits.push({ x, y, l: Math.round(l), r: em[i], g: em[i + 1], b: em[i + 2] });
      }
    }
    const playerRcPeaks = [];
    for (let y = Math.max(0, pey - 60); y <= Math.min(479, pey + 60); y += 2) {
      for (let x = Math.max(0, pex - 60); x <= Math.min(719, pex + 60); x += 2) {
        const i = (y * 720 + x) * 4;
        const l = rcPixels[i] * 0.2126 + rcPixels[i + 1] * 0.7152 + rcPixels[i + 2] * 0.0722;
        playerRcPeaks.push({ x, y, l: Math.round(l), r: rcPixels[i], g: rcPixels[i + 1], b: rcPixels[i + 2] });
      }
    }
    playerRcPeaks.sort((a, b) => b.l - a.l);

    return {
      room: { scale, ox, oy },
      canvasInfo,
      rcPixelLuma,
      emTotal,
      emHitsCount: emHits.length,
      emHits: emHits.slice(0, 30),
      emSample,
      searchlightClusters,
      neonClusters,
      lights: lights.map((l) => ({
        ...l,
        seedRoom: l.seed ? toRoom(l.seed.x, l.seed.y) : null,
        glowRoom: toRoom(l.glow.x, l.glow.y),
      })),
      player: {
        expected: playerExpected,
        expectedRoom: toRoom(playerExpected.x, playerExpected.y),
        seed: playerSeed,
        seedRoom: playerSeed ? toRoom(playerSeed.x, playerSeed.y) : null,
        glow: playerGlow,
        glowRoom: toRoom(playerGlow.x, playerGlow.y),
        seedHits: playerSeedHits.slice(0, 20),
        seedHitsCount: playerSeedHits.length,
        rcPeaks: playerRcPeaks.slice(0, 20),
      },
    };
  });
  console.log('PLACEMENT_AUDIT', JSON.stringify(audit));
  await page.screenshot({ path: `${output}/rc-fix-audit.png` });
  assertNoConsoleErrors();
});

test('placement diff-centroid: RC on vs off in identical frame', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.elapsed = 0.5;
    sim.enemies = [];
    sim.bullets = [];
    sim.melee = [];
    sim.player.position = { x: 2, y: 10 };
    sim.player.velocity = { x: 0, y: 0 };
  });
  await page.waitForTimeout(400);

  const off = await pixelDump(page, 'off');
  const before = await page.evaluate(() => ({
    cascades: window.__rcPipeline.activeCascades,
    dither: window.__rcPipeline.ditherEnabled,
    degraded: window.__rcPipeline.degraded,
  }));
  await page.evaluate(() => {
    window.__rcSetConfig({ cascadeCount: 0 });
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${output}/rc-place-off.png` });
  const after = await page.evaluate(() => ({
    cascades: window.__rcPipeline.activeCascades,
    dither: window.__rcPipeline.ditherEnabled,
    degraded: window.__rcPipeline.degraded,
  }));
  const on = await pixelDump(page, 'on');
  await page.evaluate(() => {
    window.__rcSetConfig({ cascadeCount: 3 });
  });

  // Diff centroid around each expected light center (720x480 plane coords).
  // The visible RC canvas is the one with opacity 1 and 720x480; source has opacity 0.
  const pickVisible = (dump) => dump.data.find((c) => c.opacity !== '0' && c.width === 720) ?? dump.data[0];
  const analysisHalf = await page.evaluate(({ offData, onData }) => {
    const room = window.__sim.snapshot().currentRoom;
    const scale = Math.min(720 / (room.width + 2), 480 / (room.height + 2));
    const ox = Math.floor((720 - room.width * scale) / 2);
    const oy = Math.floor((480 - room.height * scale) / 2);
    const toRoom = (x, y) => ({ x: (x - ox) / scale - 0.5, y: (y - oy) / scale - 0.5 });
    const diffCount = onData.reduce((acc, v, i) => acc + (Math.abs(v - offData[i]) > 1 ? 1 : 0), 0);
    let diffSum = 0;
    for (let i = 0; i < onData.length; i += 1) diffSum += Math.abs(onData[i] - offData[i]);
    // Global diff centroid + hottest region
    let gx = 0, gy = 0, gw = 0, hotCount = 0, hotBBox = { minX: 9999, minY: 9999, maxX: -1, maxY: -1 }, hotSum = 0;
    for (let y = 0; y < 480; y += 1) {
      for (let x = 0; x < 720; x += 1) {
        const i = y * 720 + x;
        const d = Math.abs(onData[i] - offData[i]);
        if (d > 1) { gx += x * d; gy += y * d; gw += d; }
        if (d > 20) {
          hotCount += 1; hotSum += d;
          if (x < hotBBox.minX) hotBBox.minX = x;
          if (x > hotBBox.maxX) hotBBox.maxX = x;
          if (y < hotBBox.minY) hotBBox.minY = y;
          if (y > hotBBox.maxY) hotBBox.maxY = y;
        }
      }
    }
    const hotRoom = hotBBox.maxX >= 0
      ? { min: toRoom(hotBBox.minX, hotBBox.minY), max: toRoom(hotBBox.maxX, hotBBox.maxY) }
      : null;
    const points = [
      { name: 'lamp', x: ox + 11.5 * scale, y: oy + 4.5 * scale },
      { name: 'searchlight', x: ox + 13.5 * scale, y: oy + 1.5 * scale },
      { name: 'neon', x: ox + 16.5 * scale, y: oy + 1.5 * scale },
      { name: 'player', x: ox + 2.5 * scale, y: oy + 10.5 * scale },
    ];
    const centroid = (cx, cy, radius) => {
      let sx = 0, sy = 0, sw = 0, peak = { l: 0, x: Math.round(cx), y: Math.round(cy) };
      let maxDiff = 0;
      let maxDiffAt = null;
      // 2026-08-13 修复:循环边界取整(float 索引 → undefined → NaN)
      const x0 = Math.max(0, Math.round(cx) - radius); const x1 = Math.min(719, Math.round(cx) + radius);
      const y0 = Math.max(0, Math.round(cy) - radius); const y1 = Math.min(479, Math.round(cy) + radius);
      for (let y = y0; y <= y1; y += 1) {
        for (let x = x0; x <= x1; x += 1) {
          const i = y * 720 + x;
          const d = onData[i] - offData[i];
          if (d > maxDiff) { maxDiff = d; maxDiffAt = { x, y }; }
          if (d <= 1) continue;
          sx += x * d; sy += y * d; sw += d;
          if (d > peak.l) peak = { l: d, x, y };
        }
      }
      return sw > 0
        ? { centroidRoom: toRoom(sx / sw, sy / sw), peak: toRoom(peak.x, peak.y), sw: Math.round(sw), maxDiff, maxDiffAt: maxDiffAt ? toRoom(maxDiffAt.x, maxDiffAt.y) : null }
        : { sw: 0, maxDiff, maxDiffAt: maxDiffAt ? toRoom(maxDiffAt.x, maxDiffAt.y) : null };
    };
    return {
      diffCount,
      diffSum,
      globalCentroid: gw > 0 ? toRoom(gx / gw, gy / gw) : null,
      hotCount,
      hotSum,
      hotBBox,
      hotRoom,
      offSample: [offData[136 * 720 + 137], offData[85 * 720 + 514], offData[394 * 720 + 137]],
      onSample: [onData[136 * 720 + 137], onData[85 * 720 + 514], onData[394 * 720 + 137]],
      points: points.map((p) => ({ name: p.name, expectedRoom: toRoom(p.x, p.y), result: centroid(p.x, p.y, 34) })),
    };
  }, { offData: pickVisible(off).data, onData: pickVisible(on).data });
  console.log('PLACEMENT_DIFF_HALF', JSON.stringify({ before, after, analysis: analysisHalf }));

  // Debug: which canvas is RC vs source? Dump colors at known points from both canvases.
  const canvasProbe = await page.evaluate(() => {
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    return canvases.map((canvas, idx) => {
      const s = document.createElement('canvas');
      s.width = 720; s.height = 480;
      const c = s.getContext('2d', { willReadFrequently: true });
      c.drawImage(canvas, 0, 0, 720, 480);
      const d = c.getImageData(0, 0, 720, 480).data;
      const at = (x, y) => {
        const i = (y * 720 + x) * 4;
        return [d[i], d[i + 1], d[i + 2]];
      };
      return {
        idx,
        opacity: getComputedStyle(canvas).opacity,
        zIndex: getComputedStyle(canvas).zIndex,
        tower: at(514, 85),
        lamp: at(445, 188),
        player: at(137, 394),
        void: at(20, 20),
      };
    });
  });
  console.log('CANVAS_PROBE', JSON.stringify(canvasProbe));

  // Now re-enable RC at full resolution and repeat.
  await page.evaluate(() => {
    window.__rcSetConfig({ cascadeCount: 3, resolutionScale: 1 });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${output}/rc-place-full.png` });
  const onFull = await pixelDump(page, 'onFull');
  const analysisFull = await page.evaluate(({ offData, onData }) => {
    const room = window.__sim.snapshot().currentRoom;
    const scale = Math.min(720 / (room.width + 2), 480 / (room.height + 2));
    const ox = Math.floor((720 - room.width * scale) / 2);
    const oy = Math.floor((480 - room.height * scale) / 2);
    const toRoom = (x, y) => ({ x: (x - ox) / scale - 0.5, y: (y - oy) / scale - 0.5 });
    const points = [
      { name: 'lamp', x: ox + 11.5 * scale, y: oy + 4.5 * scale },
      { name: 'searchlight', x: ox + 13.5 * scale, y: oy + 1.5 * scale },
      { name: 'neon', x: ox + 16.5 * scale, y: oy + 1.5 * scale },
      { name: 'player', x: ox + 2.5 * scale, y: oy + 10.5 * scale },
    ];
    const centroid = (cx, cy, radius) => {
      let sx = 0, sy = 0, sw = 0, peak = { l: 0, x: Math.round(cx), y: Math.round(cy) }, maxDiff = 0, maxDiffAt = null;
      // 2026-08-13 修复:循环边界取整(float 索引 → undefined → NaN)
      const x0 = Math.max(0, Math.round(cx) - radius); const x1 = Math.min(719, Math.round(cx) + radius);
      const y0 = Math.max(0, Math.round(cy) - radius); const y1 = Math.min(479, Math.round(cy) + radius);
      for (let y = y0; y <= y1; y += 1) {
        for (let x = x0; x <= x1; x += 1) {
          const i = y * 720 + x;
          const d = onData[i] - offData[i];
          if (d > maxDiff) { maxDiff = d; maxDiffAt = { x, y }; }
          if (d <= 1) continue;
          sx += x * d; sy += y * d; sw += d;
          if (d > peak.l) peak = { l: d, x, y };
        }
      }
      return sw > 0
        ? { centroidRoom: toRoom(sx / sw, sy / sw), peak: toRoom(peak.x, peak.y), sw: Math.round(sw), maxDiff, maxDiffAt: maxDiffAt ? toRoom(maxDiffAt.x, maxDiffAt.y) : null }
        : { sw: 0, maxDiff, maxDiffAt: maxDiffAt ? toRoom(maxDiffAt.x, maxDiffAt.y) : null };
    };
    return { points: points.map((p) => ({ name: p.name, expectedRoom: toRoom(p.x, p.y), result: centroid(p.x, p.y, 34) })) };
  }, { offData: pickVisible(off).data, onData: pickVisible(onFull).data });
  console.log('PLACEMENT_DIFF_FULL', JSON.stringify(analysisFull));
  assertNoConsoleErrors();
});

test('point-source placement: synthetic light at known tile', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.elapsed = 0.5;
    sim.enemies = [];
    sim.bullets = [];
    sim.melee = [];
    sim.player.position = { x: 2, y: 10 };
    sim.player.velocity = { x: 0, y: 0 };
    // Add a bright synthetic point light at an empty tile (8,8) -> visual (8.5,8.5).
    sim.activeLights.push({
      id: 'test_point',
      kind: 'muzzle_flash',
      position: { x: 8, y: 8 },
      colorRgb: { r: 1, g: 0.6, b: 0.2 },
      intensity: 2,
      radius: 4,
      ttl: Infinity,
    });
  });
  await page.waitForTimeout(400);
  const pointProbe = await page.evaluate(() => {
    const snap = window.__sim.snapshot();
    const planes = window.__rcPresenterPlanes;
    const em = planes.emission.data;
    const hits = [];
    for (let y = 280; y < 460; y += 1) {
      for (let x = 300; x < 480; x += 1) {
        const i = (y * 720 + x) * 4;
        const l = em[i] * 0.2126 + em[i + 1] * 0.7152 + em[i + 2] * 0.0722;
        if (l > 20) hits.push({ x, y, l: Math.round(l), r: em[i], g: em[i + 1], b: em[i + 2] });
      }
    }
    return {
      active: snap.activeLights.map((l) => ({ kind: l.kind, position: l.position, ttl: l.ttl })),
      hits: hits.slice(0, 20),
      hitsCount: hits.length,
    };
  });
  console.log('POINT_PROBE', JSON.stringify(pointProbe));
  await page.screenshot({ path: `${output}/rc-point-on.png` });
  await page.evaluate(() => {
    window.__rcSetConfig({ cascadeCount: 0 });
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${output}/rc-point-off.png` });
  await page.evaluate(() => {
    window.__rcSetConfig({ cascadeCount: 3, resolutionScale: 1 });
  });
  assertNoConsoleErrors();
});

test('final user-visible captures: restart + muzzle', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${output}/final-clean-play.png` });

  // Muzzle flash capture (hold ttl for a stable frame).
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.input({ kind: 'aim', angle: 0 });
    sim.input({ kind: 'fireStart' });
    sim.step(1 / 60);
    const muzzle = sim.activeLights.find((light) => light.kind === 'muzzle_flash');
    if (muzzle) muzzle.ttl = 0.2;
  });
  await page.waitForTimeout(80);
  await page.screenshot({ path: `${output}/final-muzzle-flash.png` });

  // Death + restart capture (clear transient effects path).
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.killPlayer();
  });
  await expect(page.getByText('YOU DIED')).toBeVisible();
  await page.getByRole('button', { name: '重新开始' }).click();
  await expect.poll(() => page.evaluate(() => window.__sim.snapshot().phase)).toBe('MISSION_PLAY');
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${output}/final-restart-clean.png` });

  assertNoConsoleErrors();
});
