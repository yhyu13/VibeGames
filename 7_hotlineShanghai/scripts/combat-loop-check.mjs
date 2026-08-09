import { strict as assert } from 'node:assert';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const tempDir = await mkdtemp(join(tmpdir(), '7hs-combat-loop-'));
const bundlePath = join(tempDir, 'check.mjs');
const count = (sim, kind) => sim.events.filter((event) => event.kind === kind).length;
const step = (sim, seconds) => { for (let i = 0; i < Math.ceil(seconds * 60); i++) sim.step(1 / 60); };
const aimAt = (sim, target) => { const p = sim.snapshot().player.position; sim.input({ kind: 'aim', angle: Math.atan2(target.y - p.y, target.x - p.x) }); };

try {
  await build({ entryPoints: ['src/core/simulation/Simulation.ts'], outfile: bundlePath, bundle: true, platform: 'node', format: 'esm', logLevel: 'silent' });
  const { Simulation } = await import(`${pathToFileURL(bundlePath).href}?t=${Date.now()}`);
  const sweep = new Simulation(); sweep.start(); let maxDelta = 0; let previous = sweep.snapshot().enemies[0].facingAngle;
  for (let i = 0; i < 120; i++) { sweep.step(1 / 60); const angle = sweep.snapshot().enemies[0].facingAngle; const delta = Math.abs(Math.atan2(Math.sin(angle - previous), Math.cos(angle - previous))); maxDelta = Math.max(maxDelta, delta / (1 / 60)); previous = angle; }
  assert.ok(maxDelta < 120, 'flashlight sweep must remain readable');
  const death = new Simulation(); death.start();
  const initialAngle = death.snapshot().enemies[0].facingAngle; step(death, .25); assert.notEqual(death.snapshot().enemies[0].facingAngle, initialAngle, 'flashlight sweep must advance deterministically');
  assert.equal(count(death, 'detectionWarning'), 0, 'spawn grace blocks detection');
  step(death, .8);
  // Follow a point directly inside the moving flashlight cone until the warning resolves.
  for (let i = 0; i < 180 && death.snapshot().phase === 'MISSION_PLAY'; i++) {
    const snap = death.snapshot(); const enemy = snap.enemies[0]; const player = snap.player;
    const target = { x: enemy.position.x + Math.cos(enemy.facingAngle) * 1.5, y: enemy.position.y + Math.sin(enemy.facingAngle) * 1.5 };
    death.input({ kind: 'move', dir: { x: target.x - player.position.x, y: target.y - player.position.y } }); death.step(1 / 60);
  }
  death.input({ kind: 'move', dir: { x: 0, y: 0 } }); assert.ok(count(death, 'detectionWarning') >= 1, 'sustained sweep must create a warning episode'); assert.equal(count(death, 'playerKilled'), 1); assert.equal(death.snapshot().phase, 'MISSION_DEATH');

  const blocked = new Simulation(); blocked.start();
  blocked.input({ kind: 'move', dir: { x: 1, y: -1 } }); step(blocked, .22); blocked.input({ kind: 'move', dir: { x: 0, y: 0 } }); aimAt(blocked, blocked.snapshot().enemies[0].position); blocked.input({ kind: 'attackStart' });
  assert.equal(count(blocked, 'attackBlocked'), 1); assert.equal(blocked.snapshot().enemies[0].hp, 1, 'lit enemy survives melee');

  const sim = new Simulation(); sim.start();
  sim.input({ kind: 'move', dir: { x: 1, y: -1 } }); step(sim, .57); sim.input({ kind: 'move', dir: { x: 0, y: 0 } });
  const lamp = sim.snapshot().lightSources[0]; aimAt(sim, lamp.position); sim.input({ kind: 'attackStart' }); sim.input({ kind: 'attackStart' });
  assert.equal(count(sim, 'lightSmash'), 2); step(sim, .12); assert.equal(count(sim, 'invalidateLight'), 1);
  const target = sim.snapshot().enemies[0].position; sim.input({ kind: 'move', dir: { x: -1, y: 1 } }); step(sim, .27); sim.input({ kind: 'move', dir: { x: 0, y: 0 } }); aimAt(sim, target); sim.input({ kind: 'attackStart' });
  assert.equal(count(sim, 'enemyKilled'), 1); assert.equal(count(sim, 'missionEnd'), 0); assert.equal(sim.snapshot().phase, 'MISSION_PLAY');
  const exit = sim.snapshot().currentRoom.exitTile; sim.input({ kind: 'move', dir: { x: exit.x - sim.snapshot().player.position.x, y: exit.y - sim.snapshot().player.position.y } }); step(sim, 1.5); sim.input({ kind: 'move', dir: { x: 0, y: 0 } });
  assert.equal(count(sim, 'missionEnd'), 1); assert.equal(sim.snapshot().phase, 'SCORE'); assert.ok(sim.snapshot().missionScore);
  sim.input({ kind: 'attackStart' }); assert.equal(count(sim, 'enemyKilled'), 1, 'dead enemy cannot emit another kill');
  sim.start(); assert.equal(sim.snapshot().player.hp, 1); assert.equal(sim.snapshot().lightSources[0].hp, 2); assert.equal(sim.snapshot().enemies[0].hp, 1); assert.equal(sim.snapshot().missionScore, null);
  console.log('Combat loop check: PASS (sweep, grace, guarded warning, reset, lamp invalidation, OHK, victory, repeated-event guards)');
} finally { await rm(tempDir, { recursive: true, force: true }); }
