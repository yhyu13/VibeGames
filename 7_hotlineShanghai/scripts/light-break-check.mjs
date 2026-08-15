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

  // B66 回归:子弹拆灯与近战同权——灯死即启动光池坍缩 + 塔楼断电。
  // 旧版只有近战路径触发 invalidationTimer,子弹拆灯后 lamp.invalidated 永不为真 →
  // RC 种子盘继续画 → 灯碎了光池仍亮(RC 视觉 artifact)。本段用 fireStart 走真实弹道验证。
  const simBullet = new Simulation();
  simBullet.start();
  for (const enemy of simBullet.enemies) enemy.hp = 0; // 中和敌人,避免巡逻兵挡弹引入不确定性
  const lampBullet = simBullet.snapshot().lightSources[0];
  // B68:子弹自玩家视觉中心(+0.5)发射,沿行中线行进,不再落在瓦片边界行被 (2,2) X 掩体裁剪。
  // 玩家放角落 (3,3)→中心 (3.5,3.5);瞄准灯视觉中心 (4.5,3.5),与 live aimAngle 的 center 约定一致。
  // 一步(1u)即达灯中心,验证"首弹 hp 2→1"。
  const lampVisual = { x: lampBullet.position.x + 0.5, y: lampBullet.position.y + 0.5 };
  simBullet.player.position = { x: 3, y: 3 };
  const pc = { x: simBullet.player.position.x + 0.5, y: simBullet.player.position.y + 0.5 };
  simBullet.input({ kind: 'aim', angle: Math.atan2(lampVisual.y - pc.y, lampVisual.x - pc.x) });
  simBullet.input({ kind: 'fireStart' });
  simBullet.step(1 / 60);
  assert.equal(simBullet.snapshot().lightSources[0].hp, 1, 'first bullet damages the lamp (hp 2→1)');
  for (let i = 0; i < 30; i += 1) simBullet.step(1 / 60); // C96 fireRate 2/s → 0.5s 冷却
  simBullet.input({ kind: 'fireStart' });
  simBullet.step(1 / 60);
  assert.equal(simBullet.snapshot().lightSources[0].hp, 0, 'second bullet destroys the lamp (hp 1→0)');
  assert.equal(simBullet.snapshot().lightSources[0].state, 'dead', 'lamp dead via bullets');
  assert.ok(!simBullet.snapshot().activeLights.some((light) => light.kind === 'searchlight'), 'bullet break disables the tower searchlight immediately');
  for (let i = 0; i < 7; i += 1) simBullet.step(1 / 60);
  assert.equal(simBullet.snapshot().lightSources[0].invalidated, true, 'lamp invalidated after bullet-triggered countdown');
  assert.ok(!simBullet.snapshot().activeLights.some((light) => light.id === lampBullet.id), 'lamp light removed after bullet-triggered invalidation');
  console.log('P4 light break check: PASS (production Simulation, RMB melee + LMB bullets, tower power disabled, lamp-only delayed invalidation)');
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
