// scripts/self-play.spec.js — real keyboard/mouse self-play gate.
// Two tests:
//   1) input chain (deterministic gate): real WASD movement + real mouse aim + real RMB
//      melee breaks the lamp (HP 2->1->0) + walk to exit -> SCORE. Enemies are neutralized
//      in setup only to skip the stealth choreography (design's job); the INPUT PATH is
//      100% real: keydown/keyup + mousemove/mousedown -> InputManager -> Simulation ->
//      melee -> lightSmash -> exit -> finishMission.
//   2) stealth bot (log-only, best-effort): full stealth clear via real input; the bot
//      reads the public sim snapshot for the cone/sweep timing. Full-clear mastery is
//      future bot engineering; this test documents the attempt without gating.
// Fills the "real keyboard/mouse E2E" gap called out in docs/design/25-intro-scene-lessons.md S8.
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

const CONE_HALF_DEG = 25;   // FLASHLIGHT_CONE_ARC_DEG 50 / 2
const CONE_MARGIN_DEG = 15; // sweep prediction margin (patrol cones sweep +-45deg @0.6Hz)

/** world coords -> page client coords (inverse of SceneManager.aimAngle) */
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
    return {
      phase: s.phase,
      player: { ...s.player.position, facing: s.player.facingAngle, hp: s.player.hp },
      enemies: s.enemies.map((e) => ({ id: e.id, x: e.position.x, y: e.position.y, facing: e.facingAngle, hp: e.hp, role: e.role, awareness: e.awareness, state: e.state })),
      lampsDestroyed: s.lampsDestroyed,
      objective: s.objective,
      exitActive: s.exitActive,
      deathCause: s.deathCause ?? null,
      spawnGrace: s.spawnGraceRemaining ?? 0,
    };
  });
}

/** angle diff (rad) + distance from player to an enemy */
function coneInfo(player, e) {
  const dx = player.x - e.x;
  const dy = player.y - e.y;
  const dist = Math.hypot(dx, dy);
  const angleToPlayer = Math.atan2(dy, dx);
  let diff = Math.abs(angleToPlayer - e.facing);
  while (diff > Math.PI) diff = Math.abs(diff - 2 * Math.PI);
  return { dist, diff };
}

/** is the player inside any enemy sight cone (live facing, predictive margin) */
function inAnyCone(player, enemies) {
  const thresholdDeg = CONE_HALF_DEG + CONE_MARGIN_DEG;
  for (const e of enemies) {
    if (e.hp <= 0) continue;
    const maxDist = e.role === 'tower_guard' ? 12 : 5;
    const { dist, diff } = coneInfo(player, e);
    if (dist > maxDist) continue;
    if (diff < (thresholdDeg * Math.PI) / 180) return true;
  }
  return false;
}

/** contact range (touching an enemy = instant death) */
function enemyNearby(player, enemies, radius = 0.8) {
  return enemies.some((e) => e.hp > 0 && Math.hypot(e.x - player.x, e.y - player.y) < radius);
}

/** tower is blind after the lamp breaks (game disables its cone check) */
function threats(snap) {
  return snap.enemies.filter((e) => e.hp > 0 && !(e.role === 'tower_guard' && snap.lampsDestroyed > 0));
}

/** hold keys until the player is within 0.45u of the target or timeout.
 *  options.waitFor: guard predicate (hold in place while false)
 *  options.sprint: after the guard passes, sprint without yielding to cones */
async function moveTo(page, tx, ty, timeoutMs, label, options = {}) {
  const t0 = Date.now();
  const keys = [];
  const setKeys = async (dir, sprint = false) => {
    const want = [];
    if (dir.x > 0.2) want.push('KeyD');
    if (dir.x < -0.2) want.push('KeyA');
    if (dir.y > 0.2) want.push('KeyS');
    if (dir.y < -0.2) want.push('KeyW');
    if (sprint) want.push('ShiftLeft');
    for (const k of keys) if (!want.includes(k)) await page.keyboard.up(k);
    for (const k of want) if (!keys.includes(k)) await page.keyboard.down(k);
    keys.length = 0;
    keys.push(...want);
  };
  while (Date.now() - t0 < timeoutMs) {
    const snap = await snapshot(page);
    if (snap.phase !== 'MISSION_PLAY') {
      await setKeys({ x: 0, y: 0 });
      const alive = snap.enemies.filter((e) => e.hp > 0);
      const nearest = alive.map((e) => ({ e, d: Math.hypot(e.x - snap.player.x, e.y - snap.player.y) })).sort((a, b) => a.d - b.d)[0];
      console.log(`SELFPLAY_DEATH ${label}: cause=${JSON.stringify(snap.deathCause)} at=(${snap.player.x.toFixed(2)},${snap.player.y.toFixed(2)}) nearest=${JSON.stringify(nearest)}`);
      return false;
    }
    const p = snap.player;
    const dx = tx - p.x;
    const dy = ty - p.y;
    if (Math.hypot(dx, dy) < 0.45) {
      await setKeys({ x: 0, y: 0 });
      return true;
    }
    if (options.waitFor !== undefined && !options.waitFor(snap)) {
      await setKeys({ x: 0, y: 0 });
      await page.waitForTimeout(80);
      continue;
    }
    if (options.sprint === true) {
      await setKeys({ x: dx, y: dy }, true);
      await page.waitForTimeout(60);
      continue;
    }
    // cone sweeping near/over the player: sidestep perpendicular to the cone axis
    // (toward the side away from the enemy), not straight away (corners trap)
    const foes = threats(snap);
    const marginRad = ((CONE_HALF_DEG + CONE_MARGIN_DEG) * Math.PI) / 180;
    let retreat = { x: 0, y: 0 };
    for (const e of foes) {
      const { dist, diff } = coneInfo(p, e);
      if (diff < marginRad && dist < 3.5) {
        const perp = { x: -Math.sin(e.facing), y: Math.cos(e.facing) };
        const away = { x: p.x - e.x, y: p.y - e.y };
        const side = (perp.x * away.x + perp.y * away.y) > 0 ? 1 : -1;
        retreat.x += perp.x * side;
        retreat.y += perp.y * side;
      }
    }
    const retreatLen = Math.hypot(retreat.x, retreat.y);
    if (retreatLen > 0.1) {
      await setKeys({ x: retreat.x / retreatLen, y: retreat.y / retreatLen });
      await page.waitForTimeout(60);
      continue;
    }
    if (enemyNearby(p, foes)) {
      await setKeys({ x: 0, y: 0 });
      await page.waitForTimeout(60);
    } else {
      await setKeys({ x: dx, y: dy });
      await page.waitForTimeout(60);
    }
  }
  await setKeys({ x: 0, y: 0 });
  return false;
}

/** aim the mouse at a world target (visual center = position + 0.5) */
async function aimAt(page, x, y) {
  const c = await worldToClient(page, x + 0.5, y + 0.5);
  await page.mouse.move(Math.round(c.x), Math.round(c.y));
  await page.waitForTimeout(80);
}

/** right-button melee without moving the mouse (a click at (0,0) would re-aim!) */
async function rmb(page) {
  await page.mouse.down({ button: 'right' });
  await page.waitForTimeout(40);
  await page.mouse.up({ button: 'right' });
}

/** mean luma of a region on the 720x480 RC canvas */
async function regionLuma(page, cx, cy, radius) {
  return page.evaluate(({ cx, cy, radius }) => {
    const canvases = [...document.querySelectorAll('#game-canvas canvas')];
    const rc = canvases.find((c) => getComputedStyle(c).opacity === '1');
    const s = document.createElement('canvas');
    s.width = 720; s.height = 480;
    const ctx = s.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(rc, 0, 0, 720, 480);
    const d = ctx.getImageData(0, 0, 720, 480).data;
    let sum = 0;
    let n = 0;
    for (let y = Math.max(0, cy - radius); y <= Math.min(479, cy + radius); y += 1) {
      for (let x = Math.max(0, cx - radius); x <= Math.min(719, cx + radius); x += 1) {
        const i = (y * 720 + x) * 4;
        sum += d[i] * 0.2126 + d[i + 1] * 0.7152 + d[i + 2] * 0.0722;
        n += 1;
      }
    }
    return sum / n;
  }, { cx, cy, radius });
}

const LAMP_WORLD = { x: 11, y: 4 };
const EXIT_WORLD = { x: 15, y: 10 };

/** ambush kill: stand 1u beside a patrol lane (90deg off its cone), melee as it passes */
async function ambushKill(page, ax, ay, role, label, timeoutMs = 40000) {
  const ok = await moveTo(page, ax, ay, timeoutMs, `${label}: ambush point`);
  if (!ok) return false;
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const snap = await snapshot(page);
    if (snap.phase !== 'MISSION_PLAY') return false;
    const t = snap.enemies.find((e) => e.role === role && e.hp > 0);
    if (!t) return true;
    await aimAt(page, t.x, t.y);
    if (Math.hypot(t.x - snap.player.x, t.y - snap.player.y) < 2.2) {
      await rmb(page);
      await page.waitForTimeout(450);
      const s2 = await snapshot(page);
      if (s2.phase !== 'MISSION_PLAY') return false;
      if (!s2.enemies.some((e) => e.role === role && e.hp > 0)) return true;
    }
    await page.waitForTimeout(120);
  }
  return false;
}

/** deterministic input-chain playthrough (enemies neutralized for the choreography) */
async function playInputChain(page, attempt) {
  const log = [];
  const snap = await snapshot(page);
  log.push(`t0 phase=${snap.phase} spawn=(${snap.player.x},${snap.player.y})`);
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    const sim = window.__sim;
    for (const enemy of sim.enemies) enemy.hp = 0;
  });
  const lampBefore = await regionLuma(page, 445, 188, 18);
  await page.screenshot({ path: `${output}/self-play-input-${attempt}-start.png` });
  log.push(`lampLumaBefore=${Math.round(lampBefore)}`);

  const waypoints = [
    { x: 12, y: 10, note: 'WASD bottom corridor east' },
    { x: 12, y: 5, note: 'WASD up column x12' },
    { x: 11, y: 5, note: 'WASD to lamp south' },
  ];
  for (const wp of waypoints) {
    const ok = await moveTo(page, wp.x, wp.y, 45000, wp.note);
    log.push(`wp(${wp.x},${wp.y}) ${ok ? 'OK' : 'FAIL'} ${wp.note}`);
    if (!ok) return { log, ok: false };
  }
  await aimAt(page, LAMP_WORLD.x, LAMP_WORLD.y);
  await rmb(page);
  await page.waitForTimeout(450);
  await rmb(page);
  await page.waitForTimeout(500);
  const s2 = await snapshot(page);
  log.push(`afterRMBx2 lampsDestroyed=${s2.lampsDestroyed} objective=${s2.objective} exitActive=${s2.exitActive}`);
  if (s2.lampsDestroyed < 1) return { log, ok: false, reason: 'lamp not broken by real RMB' };
  const lampAfter = await regionLuma(page, 445, 188, 18);
  log.push(`lampLumaAfter=${Math.round(lampAfter)} (before ${Math.round(lampBefore)})`);
  await page.screenshot({ path: `${output}/self-play-input-${attempt}-lamp-broken.png` });

  await moveTo(page, EXIT_WORLD.x, EXIT_WORLD.y, 45000, 'walk to exit');
  // reaching the exit triggers the score (moveTo reports false on phase != PLAY = success)
  await page.waitForTimeout(2000);
  const s4 = await snapshot(page);
  log.push(`final phase=${s4.phase} objective=${s4.objective}`);
  await page.screenshot({ path: `${output}/self-play-input-${attempt}-end.png` });
  return { log, ok: s4.phase === 'MISSION_END' || s4.phase === 'SCORE', finalPhase: s4.phase };
}

/** stealth bot (log-only best effort; full-clear mastery is future bot engineering) */
async function playStealthBot(page, attempt) {
  const log = [];
  const snap = await snapshot(page);
  log.push(`t0 phase=${snap.phase} spawn=(${snap.player.x},${snap.player.y}) enemies=${snap.enemies.length}`);
  await page.waitForTimeout(1100);
  const waypoints = [
    { x: 12, y: 10, note: 'spawn sprint bottom corridor', sprint: true },
    { x: 11, y: 5, note: 'sprint north column to lamp south', sprint: true },
  ];
  for (const wp of waypoints) {
    const ok = await moveTo(page, wp.x, wp.y, 45000, wp.note);
    log.push(`wp(${wp.x},${wp.y}) ${ok ? 'OK' : 'FAIL'} ${wp.note}`);
    if (!ok) return { log, ok: false };
  }
  await aimAt(page, LAMP_WORLD.x, LAMP_WORLD.y);
  await rmb(page);
  await page.waitForTimeout(350);
  await rmb(page);
  await page.waitForTimeout(400);
  const s2 = await snapshot(page);
  log.push(`afterRMBx2 lampsDestroyed=${s2.lampsDestroyed} objective=${s2.objective}`);
  await page.screenshot({ path: `${output}/self-play-stealth-${attempt}.png` });
  if (s2.lampsDestroyed < 1) return { log, ok: false, reason: 'lamp not broken' };
  const towerOk = await ambushKill(page, 12, 1, 'tower_guard', 'tower');
  log.push(`tower kill ${towerOk ? 'OK' : 'FAIL'}`);
  if (!towerOk) return { log, ok: false };
  const k1 = await ambushKill(page, 10, 9, 'ground_patrol', 'patrol(10,8)', 45000);
  log.push(`patrol(10,8) kill ${k1 ? 'OK' : 'FAIL'}`);
  if (!k1) return { log, ok: false };
  const k2 = await ambushKill(page, 8, 5, 'ground_patrol', 'patrol(7,5)', 45000);
  log.push(`patrol(7,5) kill ${k2 ? 'OK' : 'FAIL'}`);
  if (!k2) return { log, ok: false };
  const k3 = await ambushKill(page, 6, 10, 'ground_patrol', 'patrol(6,9)', 45000);
  log.push(`patrol(6,9) kill ${k3 ? 'OK' : 'FAIL'}`);
  if (!k3) return { log, ok: false };
  await moveTo(page, EXIT_WORLD.x, EXIT_WORLD.y, 45000, 'walk to exit');
  await page.waitForTimeout(2000);
  const s4 = await snapshot(page);
  log.push(`final phase=${s4.phase} objective=${s4.objective}`);
  await page.screenshot({ path: `${output}/self-play-stealth-${attempt}-end.png` });
  return { log, ok: s4.phase === 'MISSION_END' || s4.phase === 'SCORE', finalPhase: s4.phase };
}

test('self-play input chain: real keyboard/mouse to lamp break to exit', async ({ page }) => {
  test.setTimeout(300_000);
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await page.goto('/');
  await page.locator('button').first().click();
  await page.waitForFunction(() => window.__sim?.snapshot().phase === 'MISSION_PLAY');
  const result = await playInputChain(page, 1);
  console.log('SELF_PLAY_INPUT', JSON.stringify(result));
  expect(result.ok, `input chain failed: ${result.log.join(' | ')}`).toBe(true);
  assertNoConsoleErrors();
});

test('self-play stealth bot: best-effort full-clear (log only)', async ({ page }) => {
  test.setTimeout(300_000);
  const assertNoConsoleErrors = rejectConsoleErrors(page);
  await page.goto('/');
  await page.locator('button').first().click();
  await page.waitForFunction(() => window.__sim?.snapshot().phase === 'MISSION_PLAY');
  const result = await playStealthBot(page, 1);
  console.log('SELF_PLAY_STEALTH', JSON.stringify(result));
  assertNoConsoleErrors();
});
