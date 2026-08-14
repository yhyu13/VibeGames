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
  // 灯在模拟里存的是瓦片角 (4,3),视觉中心 = +0.5 (4.5,3.5)。玩家实际瞄准的是视觉中心,
  // 若站在 y=3.0 的瓦片边界行,毛瑟 C96 的 ±0.01 散布会把弹道压到上一行(row 2),
  // 而 (2,2) 是 X 掩体会挡弹 → 偶发 miss(回归测试不容许非确定性)。
  // 故把玩家放在视觉中心行(y=3.5),沿行中线水平射击,弹道全程落在 row 3 的空地内。
  const lampVisual = { x: lampBullet.position.x + 0.5, y: lampBullet.position.y + 0.5 };
  simBullet.player.position = { x: lampVisual.x - 1.2, y: lampVisual.y };
  simBullet.input({ kind: 'aim', angle: Math.atan2(lampVisual.y - simBullet.player.position.y, lampVisual.x - simBullet.player.position.x) });
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
