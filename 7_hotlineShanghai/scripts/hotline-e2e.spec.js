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
  // 生产呈现禁用 4×4 Bayer 回压;残余的类抖动纹只能是半分辨率上采样/探针插值造成。
  // 用 poll 等待首个 RC 帧呈现(创建时 config.ditherEnabled 仍是 true,首帧 render 覆盖后变 false)
  await expect.poll(() => page.evaluate(() => window.__rcPipeline.ditherEnabled)).toBe(false);
}

async function rcPerformance(page, sampleMs = 1500) {
  return page.evaluate(async (duration) => {
    const frameTimes = [];
    const started = performance.now();
    let previous = started;
    await new Promise((resolve) => {
      const sample = (now) => {
        if (now - started >= duration) {
          resolve();
          return;
        }
        frameTimes.push(now - previous);
        previous = now;
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    frameTimes.sort((a, b) => a - b);
    const percentile = (fraction) => frameTimes[Math.min(frameTimes.length - 1, Math.floor(frameTimes.length * fraction))] ?? 0;
    return {
      frames: frameTimes.length,
      averageFrameMs: frameTimes.reduce((sum, value) => sum + value, 0) / Math.max(1, frameTimes.length),
      p95FrameMs: percentile(0.95),
      rcFrameMs: window.__rcPipeline.lastFrameTimeMs,
      resolutionScale: window.__rcPipeline.resolutionScale,
    };
  }, sampleMs);
}

async function canvasLuminance(page, tile = null) {
  return page.evaluate((region) => {
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    const canvas = canvases.find((item) => getComputedStyle(item).visibility !== 'hidden' && getComputedStyle(item).opacity !== '0') ?? canvases[0];
    let sx = 0; let sy = 0; let sw = canvas.width; let sh = canvas.height;
    if (region !== null) {
      const room = window.__sim.snapshot().currentRoom;
      const scale = Math.min(canvas.width / (room.width + 2), canvas.height / (room.height + 2));
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

async function canvasPixelLuminance(page, tile) {
  return page.evaluate((position) => {
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    const canvas = canvases.find((item) => getComputedStyle(item).visibility !== 'hidden' && getComputedStyle(item).opacity !== '0') ?? canvases[0];
    const room = window.__sim.snapshot().currentRoom;
    const scale = Math.min(canvas.width / (room.width + 2), canvas.height / (room.height + 2));
    const ox = (canvas.width - room.width * scale) / 2;
    const oy = (canvas.height - room.height * scale) / 2;
    const sample = document.createElement('canvas');
    sample.width = sample.height = 1;
    const context = sample.getContext('2d', { willReadFrequently: true });
    context.drawImage(canvas, Math.round(ox + position.x * scale), Math.round(oy + position.y * scale), 1, 1, 0, 0, 1, 1);
    const pixel = context.getImageData(0, 0, 1, 1).data;
    return pixel[0] * 0.2126 + pixel[1] * 0.7152 + pixel[2] * 0.0722;
  }, tile);
}

async function sceneLandmarkSignature(page, tile, radius = 0.42) {
  return page.evaluate(({ position, radiusWorld }) => {
    // Sample the Canvas2D source before RC propagation so this gate verifies
    // semantic level art rather than treating nearby radiance as the prop.
  const canvas = [...document.querySelectorAll('#game-canvas canvas')].find((item) => item.width === 720 && item.height === 480 && getComputedStyle(item).opacity === '0') ?? document.querySelector('#game-canvas canvas');
    const room = window.__sim.snapshot().currentRoom;
    const scale = Math.min(canvas.width / (room.width + 2), canvas.height / (room.height + 2));
    const ox = (canvas.width - room.width * scale) / 2;
    const oy = (canvas.height - room.height * scale) / 2;
    const radiusPx = Math.max(3, Math.round(scale * radiusWorld));
    const cx = Math.round(ox + position.x * scale);
    const cy = Math.round(oy + position.y * scale);
    const sample = document.createElement('canvas');
    sample.width = sample.height = radiusPx * 2 + 1;
    const context = sample.getContext('2d', { willReadFrequently: true });
    context.drawImage(canvas, cx - radiusPx, cy - radiusPx, sample.width, sample.height, 0, 0, sample.width, sample.height);
    const pixels = context.getImageData(0, 0, sample.width, sample.height).data;
    let luminance = 0; let chroma = 0; let lit = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i]; const g = pixels[i + 1]; const b = pixels[i + 2];
      luminance += r * 0.2126 + g * 0.7152 + b * 0.0722;
      chroma += Math.max(r, g, b) - Math.min(r, g, b);
      if (Math.max(r, g, b) > 52) lit += 1;
    }
    const count = pixels.length / 4;
    return { luminance: luminance / count, chroma: chroma / count, litRatio: lit / count };
  }, { position: tile, radiusWorld: radius });
}

async function canvasContrast(page) {
  return page.evaluate(() => {
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    const canvas = canvases.find((item) => getComputedStyle(item).visibility !== 'hidden' && getComputedStyle(item).opacity !== '0') ?? canvases[0];
    const room = window.__sim.snapshot().currentRoom;
    const scale = Math.min(canvas.width / (room.width + 2), canvas.height / (room.height + 2));
    const ox = Math.round((canvas.width - room.width * scale) / 2);
    const oy = Math.round((canvas.height - room.height * scale) / 2);
    const sample = document.createElement('canvas');
    sample.width = Math.round(room.width * scale);
    sample.height = Math.round(room.height * scale);
    const context = sample.getContext('2d', { willReadFrequently: true });
    context.drawImage(canvas, ox, oy, sample.width, sample.height, 0, 0, sample.width, sample.height);
    const pixels = context.getImageData(0, 0, sample.width, sample.height).data;
    const luminance = [];
    for (let i = 0; i < pixels.length; i += 16) {
      luminance.push(pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722);
    }
    luminance.sort((a, b) => a - b);
    const percentile = (fraction) => luminance[Math.min(luminance.length - 1, Math.floor(luminance.length * fraction))];
    return { dark: percentile(0.1), bright: percentile(0.9) };
  });
}

test('darkness combat loop and visual light gate', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);

  const spawnSafety = await page.evaluate(() => {
    const sim = window.__sim;
    const snap = sim.snapshot();
    const nearest = Math.min(...snap.enemies.map((enemy) => Math.hypot(enemy.position.x - snap.player.position.x, enemy.position.y - snap.player.position.y)));
    for (let i = 0; i < 75; i++) sim.step(1 / 60);
    return {
      nearest,
      warnings: sim.recentEvents.filter((event) => event.kind === 'detectionWarning').length,
    };
  });
  expect(spawnSafety.nearest).toBeGreaterThanOrEqual(4);
  expect(spawnSafety.warnings).toBe(0);
  const landmarks = await page.evaluate(() => {
    const snap = window.__sim.snapshot();
    const room = snap.currentRoom;
    const tokenPosition = (token) => {
      const y = room.tiles.findIndex((row) => row.includes(token));
      const x = y >= 0 ? room.tiles[y].indexOf(token) : -1;
      if (x < 0 || y < 0) throw new Error(`semantic token ${token} missing`);
      return { x: x + 0.5, y: y + 0.5 };
    };
    const tower = snap.enemies.find((enemy) => enemy.role === 'tower_guard');
    return {
      roomId: room.id,
      tower: { ...tower.position },
      searchlight: { ...snap.lightSources.find((light) => light.kind === 'searchlight').position },
      lamp: { ...snap.lightSources.find((light) => light.kind === 'oil_lamp').position },
      neon: tokenPosition('N'),
      exit: tokenPosition('D'),
      pickup: {
        x: room.weaponSpawns[0].tile.x + 0.5,
        y: room.weaponSpawns[0].tile.y + 0.5,
      },
    };
  });
  expect(landmarks.roomId).toBe('m1_tower_compound');
  expect(landmarks.tower).toEqual(landmarks.searchlight);
  const landmarkSignatures = {
    tower: await sceneLandmarkSignature(page, { x: landmarks.tower.x + 0.5, y: landmarks.tower.y + 0.5 }, 0.6),
    lamp: await sceneLandmarkSignature(page, { x: landmarks.lamp.x + 0.5, y: landmarks.lamp.y + 0.5 }, 0.45),
    neon: await sceneLandmarkSignature(page, landmarks.neon, 0.46),
    exit: await sceneLandmarkSignature(page, landmarks.exit, 0.46),
    pickup: await sceneLandmarkSignature(page, landmarks.pickup, 0.42),
  };
  for (const [name, signature] of Object.entries(landmarkSignatures)) {
    expect(signature.litRatio, `${name} signature=${JSON.stringify(signature)}`).toBeGreaterThan(0.025);
    expect(signature.chroma, `${name} signature=${JSON.stringify(signature)}`).toBeGreaterThan(3);
  }
  await page.screenshot({ path: `${output}/hotline-e2e-safe-spawn.png` });
  const playerTile = await page.evaluate(() => {
    const player = window.__sim.snapshot().player.position;
    return { x: player.x + 0.5, y: player.y + 0.5 };
  });
  const playerGlow = await canvasPixelLuminance(page, playerTile);
  const nearbyDark = await canvasPixelLuminance(page, { x: 4.2, y: 10 });
  expect(playerGlow - nearbyDark, `player=${playerGlow.toFixed(2)}, dark=${nearbyDark.toFixed(2)}`).toBeGreaterThan(3);
  expect(await page.evaluate(() => window.__rcPipeline.resolutionScale)).toBe(0.5);
  const performanceSample = await rcPerformance(page);
  console.log('RC_PERF', JSON.stringify(performanceSample));
  expect(performanceSample.frames).toBeGreaterThan(25);
  expect(performanceSample.averageFrameMs).toBeLessThan(35);
  expect(performanceSample.p95FrameMs).toBeLessThanOrEqual(50.01);
  expect(performanceSample.rcFrameMs).toBeLessThan(50);

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

  await page.evaluate(() => {
    const sim = window.__sim;
    const tower = sim.enemies.find((enemy) => enemy.role === 'tower_guard');
    if (!tower || tower.patrolAxis !== 'static') throw new Error('static tower guard missing');
    if (sim.snapshot().enemies.filter((enemy) => enemy.role === 'ground_patrol').length !== 3) throw new Error('expected three ground patrols');
  });
  await page.screenshot({ path: `${output}/hotline-e2e-tower-compound.png` });

  const poweredTower = await page.evaluate(() => {
    const sim = window.__sim;
    const tower = sim.enemies.find((enemy) => enemy.role === 'tower_guard');
    const hp = tower.hp;
    const previousEventCount = sim.recentEvents.length;
    sim.player.position = { x: tower.position.x, y: tower.position.y + 0.7 };
    sim.input({ kind: 'aim', angle: -Math.PI / 2 });
    sim.input({ kind: 'attackStart' });
    const newEvents = sim.recentEvents.slice(previousEventCount);
    const result = {
      hpBefore: hp,
      hpAfter: tower.hp,
      blocked: newEvents.some(
        (event) => event.kind === 'attackBlocked' && event.enemyId === tower.id,
      ),
    };
    sim.start();
    return result;
  });
  expect(poweredTower).toEqual({ hpBefore: 1, hpAfter: 1, blocked: true });

  await page.waitForTimeout(250);
  const lampFixture = await page.evaluate(() => {
    const sim = window.__sim;
    const lamp = sim.snapshot().lightSources[0];
    const player = { x: lamp.position.x - 2.5, y: lamp.position.y };
    sim.player.position = player;
    // Hold every cone emitter constant so this fixture measures the lamp/searchlight
    // contribution rather than enemy patrol/awareness changes caused by the smash.
    for (const enemy of sim.enemies) {
      enemy.patrolAxis = 'static';
      enemy.state = 'engaging';
      enemy.awareness = 'none';
      enemy.velocity = { x: 0, y: 0 };
      enemy.facingAngle = Math.atan2(player.y - enemy.position.y, player.x - enemy.position.x) + Math.PI;
    }
    return {
      lamp: { ...lamp.position },
      enemyStates: sim.enemies.map((enemy) => ({
        id: enemy.id,
        position: { ...enemy.position },
        facingAngle: enemy.facingAngle,
        state: enemy.state,
        awareness: enemy.awareness,
        patrolAxis: enemy.patrolAxis,
      })),
    };
  });
  // Sample only after the renderer has presented the comparison position.
  // The old fixture sampled the stale pre-teleport frame for the intact scene.
  await page.waitForTimeout(250);
  const intactLuminance = await canvasLuminance(page, { x: lampFixture.lamp.x, y: lampFixture.lamp.y + 0.75 });
  const intactContrast = await canvasContrast(page);
  await page.screenshot({ path: `${output}/hotline-e2e-intact.png` });

  const broken = await page.evaluate((fixture) => {
    const sim = window.__sim;
    const lamp = sim.snapshot().lightSources[0];
    sim.player.position = { x: lamp.position.x - 0.7, y: lamp.position.y };
    sim.input({ kind: 'aim', angle: Math.atan2(lamp.position.y - sim.player.position.y, lamp.position.x - sim.player.position.x) });
    sim.input({ kind: 'attackStart' });
    sim.input({ kind: 'attackStart' });
    for (let i = 0; i < 30; i++) sim.step(1 / 60);
    sim.player.position = { x: lamp.position.x - 2.5, y: lamp.position.y };
    for (const expected of fixture.enemyStates) {
      const enemy = sim.enemies.find((candidate) => candidate.id === expected.id);
      if (!enemy) throw new Error(`enemy ${expected.id} missing from lamp fixture`);
      enemy.position = { ...expected.position };
      enemy.facingAngle = expected.facingAngle;
      enemy.state = expected.state;
      enemy.awareness = expected.awareness;
      enemy.patrolAxis = expected.patrolAxis;
      enemy.velocity = { x: 0, y: 0 };
    }
    return sim.snapshot();
  }, lampFixture);
  expect(broken.lightSources[0].hp).toBe(0);
  expect(broken.activeLights.some((light) => light.id === 'oil_lamp_1')).toBe(false);
  expect(broken.activeLights.length).toBeGreaterThan(0);
  await expect.poll(() => page.evaluate(() => window.__rcPipeline.lightCount)).toBe(broken.activeLights.length);
  await page.waitForTimeout(250);
  const brokenLuminance = await canvasLuminance(page, { x: lampFixture.lamp.x, y: lampFixture.lamp.y + 0.75 });
  const brokenContrast = await canvasContrast(page);
  expect(intactContrast.bright - intactContrast.dark, `contrast=${JSON.stringify(intactContrast)}`).toBeGreaterThan(18);
  expect(brokenContrast.bright - brokenContrast.dark, `contrast=${JSON.stringify(brokenContrast)}`).toBeGreaterThan(18);
  console.log('RC_LAMP_LUMA', JSON.stringify({
    intact: intactLuminance,
    broken: brokenLuminance,
    delta: intactLuminance - brokenLuminance,
  }));
  expect(intactLuminance - brokenLuminance, `intact=${intactLuminance.toFixed(2)}, broken=${brokenLuminance.toFixed(2)}`).toBeGreaterThan(4);
  await page.screenshot({ path: `${output}/hotline-e2e-broken.png` });

  await page.evaluate(() => {
    const sim = window.__sim;
    const lamp = sim.snapshot().lightSources[0];
    sim.player.position = { x: lamp.position.x - 0.7, y: lamp.position.y };
    sim.input({ kind: 'aim', angle: Math.atan2(lamp.position.y - sim.player.position.y, lamp.position.x - sim.player.position.x) });
    sim.input({ kind: 'attackStart' });
    sim.input({ kind: 'attackStart' });
    for (let i = 0; i < 30; i++) sim.step(1 / 60);
    sim.enemies.forEach((enemy) => { enemy.hp = 0; });
    const exit = sim.snapshot().currentRoom.exitTile;
    sim.player.position = { ...exit };
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
test('ranged fire remains available in the compound', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);
  const result = await page.evaluate(() => {
    const sim = window.__sim;
    for (let i = 0; i < 66; i++) sim.step(1 / 60); // 过宽限期
    sim.player.position = { x: 8, y: 6 };
    sim.enemies[0].position = { x: 9, y: 6 };
    sim.enemies[0].patrolAxis = 'static'; // 灯完好,敌在光下:近战必被格挡
    sim.enemies[0].state = 'engaging';
    const target = { x: 9, y: 6 };
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
