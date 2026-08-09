import { strict as assert } from 'node:assert';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const tempDir = await mkdtemp(join(tmpdir(), '7hs-light-break-'));
const bundlePath = join(tempDir, 'check.mjs');

try {
  await build({
    entryPoints: ['src/core/simulation/Simulation.ts'],
    outfile: bundlePath,
    bundle: true,
    platform: 'node',
    format: 'esm',
    logLevel: 'silent',
  });
  const { Simulation } = await import(`${pathToFileURL(bundlePath).href}?t=${Date.now()}`);
  const sim = new Simulation();
  sim.start();
  sim.input({ kind: 'move', dir: { x: 1, y: -1 } });
  for (let i = 0; i < 34; i++) sim.step(1 / 60);
  sim.input({ kind: 'move', dir: { x: 0, y: 0 } });
  const lamp = sim.snapshot().lightSources[0];
  const player = sim.snapshot().player;
  sim.input({ kind: 'aim', angle: Math.atan2(lamp.position.y - player.position.y, lamp.position.x - player.position.x) });
  sim.input({ kind: 'attackStart' });
  assert.equal(sim.snapshot().lightSources[0].hp, 1, 'the first LMB only damages the lamp once');
  sim.input({ kind: 'attackStart' });
  assert.equal(sim.events.filter((event) => event.kind === 'lightSmash').length, 2);
  assert.equal(sim.snapshot().activeLights.length, 1, 'light remains during the confirmation window');
  for (let i = 0; i < 7; i++) sim.step(1 / 60);
  assert.equal(sim.events.filter((event) => event.kind === 'invalidateLight').length, 1);
  assert.equal(sim.snapshot().activeLights.length, 0);
  console.log('P4 light break check: PASS (production Simulation, 2 LMB, 2 smash events, 1 invalidation)');
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
