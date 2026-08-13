// scripts/playability-gif.spec.js — capture a playability GIF sequence.
// Drives the real-input path (WASD -> aim -> RMB break lamp -> walk to exit) and
// screenshots a frame every ~125ms into smoke/gif-frames/. Stitch with ffmpeg:
//   ffmpeg -framerate 8 -i smoke/gif-frames/frame-%03d.png \
//     -vf "scale=360:240:flags=neighbor,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
//     -loop 0 docs/playability.gif
// Enemies are neutralized in setup (same as self-play input chain): the INPUT PATH
// is real, only the stealth choreography is skipped.
import { mkdirSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const { test } = await import(pathToFileURL(process.env.PLAYWRIGHT_TEST_PATH).href);
const outDir = 'smoke/gif-frames';
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const LAMP_WORLD = { x: 11, y: 4 };
const EXIT_WORLD = { x: 15, y: 10 };

function worldToClient(page, x, y) {
  return page.evaluate(([wx, wy]) => {
    const canvas = document.querySelector('#game-canvas canvas');
    const rect = canvas.getBoundingClientRect();
    const room = window.__sim.snapshot().currentRoom;
    const scaleCss = Math.min(rect.width / (room.width + 2), rect.height / (room.height + 2));
    const originX = (rect.width - room.width * scaleCss) / 2;
    const originY = (rect.height - room.height * scaleCss) / 2;
    return { x: rect.left + originX + wx * scaleCss, y: rect.top + originY + wy * scaleCss };
  }, [x, y]);
}

async function snapshot(page) {
  return page.evaluate(() => {
    const s = window.__sim.snapshot();
    return { phase: s.phase, player: { ...s.player.position }, lampsDestroyed: s.lampsDestroyed };
  });
}

async function holdUntil(page, tx, ty, timeoutMs, onFrame) {
  const t0 = Date.now();
  const keys = [];
  const setKeys = async () => {
    const snap = await snapshot(page);
    const want = [];
    const dx = tx - snap.player.x;
    const dy = ty - snap.player.y;
    if (dx > 0.3) want.push('KeyD');
    if (dx < -0.3) want.push('KeyA');
    if (dy > 0.3) want.push('KeyS');
    if (dy < -0.3) want.push('KeyW');
    for (const k of keys) if (!want.includes(k)) await page.keyboard.up(k);
    for (const k of want) if (!keys.includes(k)) await page.keyboard.down(k);
    keys.length = 0;
    keys.push(...want);
    return snap;
  };
  while (Date.now() - t0 < timeoutMs) {
    const snap = await setKeys();
    if (snap.phase !== 'MISSION_PLAY') return false;
    await onFrame();
    if (Math.hypot(tx - snap.player.x, ty - snap.player.y) < 0.45) return true;
    await page.waitForTimeout(125);
  }
  return false;
}

async function aimAt(page, x, y) {
  const client = await worldToClient(page, x + 0.5, y + 0.5);
  await page.mouse.move(Math.round(client.x), Math.round(client.y));
}

async function rmb(page) {
  await page.mouse.down({ button: 'right' });
  await page.waitForTimeout(40);
  await page.mouse.up({ button: 'right' });
}

test('capture playability GIF frames', async ({ page }) => {
  let frame = 0;
  const capture = async () => {
    await page.screenshot({ path: `${outDir}/frame-${String(frame).padStart(3, '0')}.png` });
    frame += 1;
  };

  await page.goto('/');
  await page.getByRole('button', { name: '开始游戏' }).click();
  await page.waitForFunction(() => window.__sim?.snapshot().phase === 'MISSION_PLAY');
  await page.waitForTimeout(500);
  await page.evaluate(() => { for (const enemy of window.__sim.enemies) enemy.hp = 0; });

  // 1) hold the intact lamp pool on screen for ~1s
  for (let i = 0; i < 8; i += 1) { await capture(); await page.waitForTimeout(125); }

  // 2) WASD across the compound to the lamp
  await holdUntil(page, 12, 10, 45000, capture);
  await holdUntil(page, 12, 5, 45000, capture);
  await holdUntil(page, 11, 5, 45000, capture);

  // 3) break the lamp (real RMB x2), hold the collapse
  await aimAt(page, LAMP_WORLD.x, LAMP_WORLD.y);
  await rmb(page);
  for (let i = 0; i < 3; i += 1) { await capture(); await page.waitForTimeout(125); }
  await rmb(page);
  for (let i = 0; i < 8; i += 1) { await capture(); await page.waitForTimeout(125); }

  // 4) walk to the exit and reach SCORE
  await holdUntil(page, EXIT_WORLD.x, EXIT_WORLD.y, 45000, capture);
  for (let i = 0; i < 8; i += 1) { await capture(); await page.waitForTimeout(125); }

  console.log(`GIF_FRAMES captured=${frame} finalPhase=${(await snapshot(page)).phase}`);
});
