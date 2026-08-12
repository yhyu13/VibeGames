// scripts/rc-offset-probe.spec.js — 精确测量 RC 合成与 2D 场景的对齐偏移
// 修正 rc-fix-selfcheck 的 float 索引 bug:所有像素访问一律用整数坐标。
// 输出:
//   ALIGN_PROBE  = 每个光源/玩家: emission seed 质心 vs RC 合成光斑质心 vs 2D sprite 质心
//   ALIGN_CORR   = RC 画布 vs 2D 画布的梯度互相关偏移 (dx, dy)
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
  await page.waitForTimeout(300);
}

/** 抓取指定画布的 720x480 亮度 + RGB 数组(整数索引安全);which = 'source' | 'rc' */
async function canvasData(page, which) {
  return page.evaluate((w) => {
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    const isRc = (item) => getComputedStyle(item).opacity === '1';
    const canvas = w === 'rc' ? canvases.find(isRc) : canvases.find((item) => !isRc(item));
    if (!canvas) return null;
    const sample = document.createElement('canvas');
    sample.width = 720; sample.height = 480;
    const ctx = sample.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(canvas, 0, 0, 720, 480);
    const d = ctx.getImageData(0, 0, 720, 480).data;
    const lum = new Float32Array(720 * 480);
    const rgb = new Uint8Array(720 * 480 * 3);
    for (let i = 0, j = 0; i < d.length; i += 4, j += 1) {
      lum[j] = d[i] * 0.2126 + d[i + 1] * 0.7152 + d[i + 2] * 0.0722;
      rgb[j * 3] = d[i]; rgb[j * 3 + 1] = d[i + 1]; rgb[j * 3 + 2] = d[i + 2];
    }
    return { lum: Array.from(lum), rgb: Array.from(rgb) };
  }, which);
}

/** 区域内 luma 加权质心(整数坐标;返回屏幕 px + 房间坐标) */
function centroidIn(lum, cx, cy, radius, minLuma) {
  let sx = 0, sy = 0, sw = 0, count = 0, peak = 0, peakX = 0, peakY = 0;
  const x0 = Math.max(0, Math.round(cx) - radius), x1 = Math.min(719, Math.round(cx) + radius);
  const y0 = Math.max(0, Math.round(cy) - radius), y1 = Math.min(479, Math.round(cy) + radius);
  for (let y = y0; y <= y1; y += 1) {
    for (let x = x0; x <= x1; x += 1) {
      const l = lum[y * 720 + x];
      if (l >= minLuma) { sx += x * l; sy += y * l; sw += l; count += 1; }
      if (l > peak) { peak = l; peakX = x; peakY = y; }
    }
  }
  return sw > 0
    ? { count, sw: Math.round(sw), cx: sx / sw, cy: sy / sw, peakX, peakY, peak: Math.round(peak) }
    : { count: 0, sw: 0, cx: null, cy: null, peakX, peakY, peak: Math.round(peak) };
}

/** 颜色条件质心:r,g,b 谓词 */
function colorCentroidIn(rgb, cx, cy, radius, pred) {
  let sx = 0, sy = 0, sw = 0, count = 0;
  const x0 = Math.max(0, Math.round(cx) - radius), x1 = Math.min(719, Math.round(cx) + radius);
  const y0 = Math.max(0, Math.round(cy) - radius), y1 = Math.min(479, Math.round(cy) + radius);
  for (let y = y0; y <= y1; y += 1) {
    for (let x = x0; x <= x1; x += 1) {
      const i = (y * 720 + x) * 3;
      const r = rgb[i], g = rgb[i + 1], b = rgb[i + 2];
      if (pred(r, g, b)) { sx += x; sy += y; sw += 1; count += 1; }
    }
  }
  return count > 0 ? { count, cx: sx / count, cy: sy / count } : { count: 0, cx: null, cy: null };
}

/** 梯度互相关:在 dx,dy ∈ [range] 中找 RC 相对 SRC 的偏移 */
function correlationOffset(srcLum, rcLum, range) {
  const W = 720, H = 480;
  const grad = (lum) => {
    const g = new Float32Array(W * H);
    for (let y = 1; y < H - 1; y += 1) {
      for (let x = 1; x < W - 1; x += 1) {
        const i = y * W + x;
        g[i] = Math.abs(lum[i + 1] - lum[i - 1]) + Math.abs(lum[i + W] - lum[i - W]);
      }
    }
    return g;
  };
  const gs = grad(srcLum), gr = grad(rcLum);
  let best = { dx: 0, dy: 0, score: -1 };
  const x0 = 80, x1 = W - 80, y0 = 60, y1 = H - 60;
  for (let dy = -range; dy <= range; dy += 1) {
    for (let dx = -range; dx <= range; dx += 1) {
      let score = 0;
      for (let y = y0; y < y1; y += 2) {
        for (let x = x0; x < x1; x += 2) {
          const i = y * W + x;
          score += gr[i] * gs[(y + dy) * W + (x + dx)] * 0.01;
        }
      }
      if (score > best.score) best = { dx, dy, score: Math.round(score) };
    }
  }
  return best;
}

test('alignment probe: seeds vs RC glow vs 2D sprites + global correlation', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await start(page);
  await page.evaluate(() => {
    const sim = window.__sim;
    sim.elapsed = 0.5;
    sim.enemies = [];
    sim.bullets = [];
    sim.melee = [];
    sim.player.position = { x: 2, y: 10 };
    sim.player.velocity = { x: 0, y: 0 };
  });
  await page.waitForTimeout(500);

  const roomInfo = await page.evaluate(() => {
    const snap = window.__sim.snapshot();
    const room = snap.currentRoom;
    const scale = Math.min(720 / (room.width + 2), 480 / (room.height + 2));
    const ox = Math.floor((720 - room.width * scale) / 2);
    const oy = Math.floor((480 - room.height * scale) / 2);
    const lights = snap.lightSources
      .filter((l) => !l.invalidated)
      .map((l) => ({
        kind: l.kind,
        pos: l.position,
        screen: { x: ox + (l.position.x + 0.5) * scale, y: oy + (l.position.y + 0.5) * scale },
      }));
    return {
      scale, ox, oy, room: { w: room.width, h: room.height },
      lights,
      player: { pos: snap.player.position, screen: { x: ox + (snap.player.position.x + 0.5) * scale, y: oy + (snap.player.position.y + 0.5) * scale } },
    };
  });

  // 抓取 2D source 画布(opacity 0)与 RC 画布(opacity 1)
  const src = await canvasData(page, 'source');
  const rc = await canvasData(page, 'rc');
  if (!src || !rc) throw new Error('canvas capture failed');

  // 打开调试染色:RC radiance 层以纯品红覆盖在压暗 base 上 → 品红斑块质心 = RC 实际光斑位置
  await page.evaluate(() => {
    window.__rcSetConfig({ debugTint: [1, 0, 1] });
  });
  await page.waitForTimeout(400);
  const rcTint = await canvasData(page, 'rc');
  if (!rcTint) throw new Error('tinted RC canvas capture failed');
  await page.screenshot({ path: `${output}/rc-offset-tint.png` });

  // emission 种子平面
  const em = await page.evaluate(() => {
    const planes = window.__rcPresenterPlanes;
    if (!planes) return null;
    const d = planes.emission.data;
    const lum = new Float32Array(720 * 480);
    const rgb = new Uint8Array(720 * 480 * 3);
    for (let i = 0, j = 0; i < d.length; i += 4, j += 1) {
      lum[j] = d[i] * 0.2126 + d[i + 1] * 0.7152 + d[i + 2] * 0.0722;
      rgb[j * 3] = d[i]; rgb[j * 3 + 1] = d[i + 1]; rgb[j * 3 + 2] = d[i + 2];
    }
    return { lum: Array.from(lum), rgb: Array.from(rgb) };
  });

  const toRoom = (x, y) => ({
    x: (x - roomInfo.ox) / roomInfo.scale - 0.5,
    y: (y - roomInfo.oy) / roomInfo.scale - 0.5,
  });

  const measure = (name, screen) => {
    const cx = Math.round(screen.x), cy = Math.round(screen.y);
    // 1) emission 种子质心(±10px)
    const seed = centroidIn(em.lum, cx, cy, 10, 1);
    // 2) RC 合成光斑质心:亮区 luma>=40(±26px)
    const glow = centroidIn(rc.lum, cx, cy, 26, 40);
    // 3) 品红染色光斑质心:RC radiance 层在 (r>120 && g<70 && b>120)(±30px)
    const tint = colorCentroidIn(rcTint.rgb, cx, cy, 30, (r, g, b) => r > 120 && g < 70 && b > 120);
    // 4) 2D 场景该处最亮像素(油灯/霓虹/角色 sprite 位置)
    const artPeak = (() => {
      let peak = { l: 0, x: cx, y: cy };
      for (let y = Math.max(0, cy - 10); y <= Math.min(479, cy + 10); y += 1) {
        for (let x = Math.max(0, cx - 10); x <= Math.min(719, cx + 10); x += 1) {
          const l = src.lum[y * 720 + x];
          if (l > peak.l) peak = { l, x, y };
        }
      }
      return peak;
    })();
    const out = {
      name,
      expected: { x: screen.x, y: screen.y },
      seed: seed.cx !== null ? { x: seed.cx, y: seed.cy } : null,
      glow: glow.cx !== null ? { x: glow.cx, y: glow.cy } : null,
      tint: tint.cx !== null ? { x: tint.cx, y: tint.cy } : null,
      artPeak: { x: artPeak.x, y: artPeak.y },
      off: {
        seedVsArt: seed.cx !== null ? { dx: seed.cx - artPeak.x, dy: seed.cy - artPeak.y } : null,
        glowVsArt: glow.cx !== null ? { dx: glow.cx - artPeak.x, dy: glow.cy - artPeak.y } : null,
        seedVsGlow: seed.cx !== null && glow.cx !== null ? { dx: seed.cx - glow.cx, dy: seed.cy - glow.cy } : null,
        tintVsSeed: tint.cx !== null && seed.cx !== null ? { dx: tint.cx - seed.cx, dy: tint.cy - seed.cy } : null,
        tintVsArt: tint.cx !== null ? { dx: tint.cx - artPeak.x, dy: tint.cy - artPeak.y } : null,
      },
      glowRoom: glow.cx !== null ? toRoom(glow.cx, glow.cy) : null,
      seedRoom: seed.cx !== null ? toRoom(seed.cx, seed.cy) : null,
      tintRoom: tint.cx !== null ? toRoom(tint.cx, tint.cy) : null,
    };
    return out;
  };

  const results = [];
  for (const light of roomInfo.lights) results.push(measure(light.kind, light.screen));
  results.push(measure('player', roomInfo.player.screen));

  const corr = correlationOffset(src.lum, rc.lum, 6);
  console.log('ALIGN_PROBE', JSON.stringify({
    room: roomInfo,
    results,
    correlation: corr,
  }));
  await page.screenshot({ path: `${output}/rc-offset-probe.png` });

  // 关掉染色,恢复正常画面
  await page.evaluate(() => {
    window.__rcSetConfig({ debugTint: [0, 0, 0] });
  });
  await page.waitForTimeout(200);

  // 灯亮 vs 灯灭可测差异(房间中心区 luma 均值必须明显不同)
  const lampLuma = await page.evaluate(() => {
    const s = document.createElement('canvas');
    s.width = 720; s.height = 480;
    const ctx = s.getContext('2d', { willReadFrequently: true });
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    const rcCanvas = canvases.find((c) => getComputedStyle(c).opacity === '1');
    ctx.drawImage(rcCanvas, 0, 0, 720, 480);
    const d = ctx.getImageData(0, 0, 720, 480).data;
    let sum = 0, n = 0;
    for (let y = 120; y < 360; y += 2) {
      for (let x = 200; x < 520; x += 2) {
        const i = (y * 720 + x) * 4;
        sum += d[i] * 0.2126 + d[i + 1] * 0.7152 + d[i + 2] * 0.0722;
        n += 1;
      }
    }
    return sum / n;
  });
  console.log('LAMP_LUMA', JSON.stringify({ lampLuma }));
  assertNoConsoleErrors();
});

test('frame introspection: title -> play canvases & phases', async ({ page }) => {
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await page.goto('/');
  await page.waitForTimeout(500);
  const title = await page.evaluate(() => ({
    phase: window.__sim?.snapshot().phase ?? null,
    canvases: [...document.querySelectorAll('#game-canvas canvas')].map((c) => ({
      w: c.width, h: c.height, opacity: getComputedStyle(c).opacity, visibility: getComputedStyle(c).visibility,
    })),
    rcCascades: window.__rcPipeline?.activeCascades ?? null,
  }));
  await page.screenshot({ path: `${output}/intro-title.png` });
  await page.getByRole('button', { name: '开始游戏' }).click();
  await page.waitForFunction(() => window.__sim?.snapshot().phase === 'MISSION_PLAY');
  await page.waitForTimeout(500);
  const play = await page.evaluate(() => ({
    phase: window.__sim.snapshot().phase,
    room: window.__sim.snapshot().currentRoom?.id,
    canvases: [...document.querySelectorAll('#game-canvas canvas')].map((c) => ({
      w: c.width, h: c.height, opacity: getComputedStyle(c).opacity, visibility: getComputedStyle(c).visibility, z: getComputedStyle(c).zIndex,
    })),
    rc: {
      cascades: window.__rcPipeline.activeCascades,
      dither: window.__rcPipeline.ditherEnabled,
      lastFrameTimeMs: window.__rcPipeline.lastFrameTimeMs,
      lightCount: window.__rcPipeline.lightCount,
      degraded: window.__rcPipeline.degraded,
    },
  }));
  await page.screenshot({ path: `${output}/intro-play.png` });
  console.log('FRAME_INTRO', JSON.stringify({ title, play }));
  assertNoConsoleErrors();
});
