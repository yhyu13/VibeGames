// 出口开启判据的守卫:灯灭即可撤离,清场不是条件。
//
// 这条规则此前**没有任何仪器能看见**。combat-loop-check 在走到出口之前(第 79 行打灭灯)
// 已经满足了两个条件,所以它对"要不要清场"这件事一视同仁 —— 旧规则和新规则它都绿。于是
// 「清场才能撤离」可以被改回来而没有任何东西会红,正是 bug-217 那一类:一个不会失败的对照。
//
// 本脚本走生产 Simulation(esbuild 打包真模块,不桩任何东西),断言三件事:
//   1. 灯没灭 → 站在出口上也不通关。任务本身仍然是必须做的,这不是"出口随便走"。
//   2. 灯灭了而场上**还有活敌** → 通关。这是本轮改动的核心,也是旧代码唯一会红的地方。
//   3. snapshot.exitActive 与灯态一致、与守卫存活数无关 —— HUD 照着它写字,它必须和放行一致。
//
// 判据的唯一实现是 Simulation.exitOpen();本脚本不重述那条规则,只用生产输入去撞它。

import { strict as assert } from 'node:assert';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const tempDir = await mkdtemp(join(tmpdir(), '7hs-exit-rule-'));
const bundlePath = join(tempDir, 'check.mjs');

/** 走到油灯旁,用生产输入(RMB 近战两下)把灯打灭 —— 不直接改 state,否则测的是自己的桩。 */
function breakLamp(sim) {
  const lamp = sim.snapshot().lightSources[0];
  sim.player.position = { x: lamp.position.x - 0.7, y: lamp.position.y };
  const player = sim.snapshot().player;
  const aim = Math.atan2(lamp.position.y - player.position.y, lamp.position.x - player.position.x);
  sim.input({ kind: 'aim', angle: aim });
  sim.input({ kind: 'attackStart' });
  sim.input({ kind: 'attackStart' });
  // 光池坍缩有 0.1s 确认窗:state 变 dead 后才算灯灭。
  for (let i = 0; i < 10 && sim.snapshot().lightSources[0].state !== 'dead'; i++) sim.step(1 / 60);
  assert.equal(sim.snapshot().lightSources[0].state, 'dead', '两下近战必须真的把灯打灭,否则下面的用例不成立');
}

const finished = (sim) => sim.events.some((e) => e.kind === 'missionEnd');

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

  // ── 1. 灯还亮着:站在出口上不通关 ───────────────────────────────────────────
  const lit = new Simulation();
  lit.start();
  const litExit = lit.snapshot().currentRoom.exitTile;
  assert.ok(litExit, '本房间必须声明出口格,否则这个脚本什么也没测');
  assert.ok(lit.enemies.some((e) => e.hp > 0), '用例 1 需要场上确实有活敌');
  lit.player.position = { x: litExit.x, y: litExit.y };
  for (let i = 0; i < 30; i += 1) lit.step(1 / 60);
  assert.equal(lit.snapshot().objective, 'break_lamp', '灯没灭时目标仍是打灯');
  assert.equal(lit.snapshot().exitActive, false, '灯亮着,出口就是关的');
  assert.ok(!finished(lit), '灯没灭就站在出口上,不许通关 —— 任务本身还是必须做的');

  // ── 2. 灯灭了、守卫还活着:通关。这是被删掉的那条"清场"要求的反面 ──────────
  const out = new Simulation();
  out.start();
  breakLamp(out);
  const alive = out.enemies.filter((e) => e.hp > 0).length;
  assert.ok(alive > 0, `守卫必须还活着(${alive} 个),否则这条用例退化成旧规则,证明不了任何事`);
  const outExit = out.snapshot().currentRoom.exitTile;
  out.player.position = { x: outExit.x, y: outExit.y };
  out.step(1 / 60);
  assert.equal(out.snapshot().exitActive, true, '灯灭了出口就该开');
  assert.equal(out.snapshot().objective, 'escape', '目标链里已经没有击杀这一站');
  assert.ok(finished(out), `灯灭 + 出口 + 场上还有 ${alive} 个活敌 → 必须通关`);

  console.log(`Exit rule check: PASS (灯灭即出口开启;撤离时场上仍有 ${alive} 个活敌,目标链无击杀站)`);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
