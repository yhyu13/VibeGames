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
  const lamp = sim.snapshot().lightSources[0];
  sim.player.position = { x: lamp.position.x - 0.7, y: lamp.position.y };
  const player = sim.snapshot().player;
  sim.input({ kind: 'aim', angle: Math.atan2(lamp.position.y - player.position.y, lamp.position.x - player.position.x) });
  sim.input({ kind: 'attackStart' });
  assert.equal(sim.snapshot().lightSources[0].hp, 1, 'the first RMB only damages the lamp once');
  sim.input({ kind: 'attackStart' });
  assert.equal(sim.events.filter((event) => event.kind === 'lightSmash').length, 2);
  assert.ok(sim.snapshot().activeLights.some((light) => light.id === lamp.id), 'lamp light remains during the confirmation window');
  assert.ok(!sim.snapshot().activeLights.some((light) => light.kind === 'searchlight'), 'breaking the power lamp disables the tower searchlight immediately');
  for (let i = 0; i < 7; i++) sim.step(1 / 60);
  assert.equal(sim.events.filter((event) => event.kind === 'invalidateLight').length, 2, 'tower power and lamp each invalidate once');
  assert.ok(!sim.snapshot().activeLights.some((light) => light.id === lamp.id), 'lamp light is removed after invalidation');
  assert.ok(sim.snapshot().activeLights.length >= 1, 'non-breakable decorative lights survive lamp invalidation');
  console.log('P4 light break check: PASS (production Simulation, 2 RMB, tower power disabled, lamp-only delayed invalidation)');
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
