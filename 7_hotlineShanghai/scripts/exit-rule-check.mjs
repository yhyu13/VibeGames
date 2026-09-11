// 出口开启判据的守卫:灯灭即可撤离,清场不是条件。
//
// 这条规则此前**没有任何仪器能看见**。combat-loop-check 在走到它自己的出口断言之前就已经红了
// (scripts/combat-loop-check.mjs:56:脚本化的玩家走进手电锥里不再致死,playerKilled 0 !== 1),
// 两个版本上红法一样,所以"要不要清场"这件事它同样看不见 —— 绿的那版、红的那版都看不见。于是
// 「清场才能撤离」可以被改回来而没有任何东西会红,正是 bug-217 那一类:一个不会失败的对照。
//
// 本脚本走生产 Simulation(esbuild 打包真模块,不桩任何东西),断言四件事:
//   1. 灯没灭 → 站在出口上也不通关。任务本身仍然是必须做的,这不是"出口随便走"。
//   2. 灯灭了而场上**还有活敌** → 通关。这是本轮改动的核心,也是旧代码唯一会红的地方。
//   3. snapshot.exitActive 与灯态一致、与守卫存活数无关 —— HUD 照着它写字,它必须和放行一致。
//   4. 出口方块自己写的那句话也只在说这件事:封锁时点名的是灯(「断电后开启」),不再报剩余守卫
//      数。第 4 条是后加的:判据确实只此一处,但"屏幕上写的"不止一处,方块本身被漏掉过一回。
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
const scenePath = join(tempDir, 'scene.mjs');

/**
 * 只记下 fillText 的 2D 上下文:出口方块画了什么字,就是它对外说的唯一一句话。
 * `document` 桩必须在 import SceneManager 之前装好 —— 那个模块在顶层就要 canvas。
 */
function fakeCtx() {
  const texts = [];
  const noop = () => {};
  return {
    texts, save: noop, restore: noop, beginPath: noop, rect: noop, clip: noop, arc: noop,
    fill: noop, fillRect: noop, strokeRect: noop, translate: noop, scale: noop, rotate: noop,
    moveTo: noop, lineTo: noop, stroke: noop,
    fillText: (s) => texts.push(String(s)),
    _fill: '', _stroke: '', _font: '', _lw: 1, _align: 'center',
    set fillStyle(v) { this._fill = v }, get fillStyle() { return this._fill },
    set strokeStyle(v) { this._stroke = v }, get strokeStyle() { return this._stroke },
    set font(v) { this._font = v }, get font() { return this._font },
    set lineWidth(v) { this._lw = v }, get lineWidth() { return this._lw },
    set textAlign(v) { this._align = v }, get textAlign() { return this._align },
  };
}
globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => fakeCtx(), style: {} }) };

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
  await build({
    entryPoints: ['src/engine/SceneManager.ts'],
    outfile: scenePath,
    bundle: true,
    platform: 'node',
    format: 'esm',
    logLevel: 'silent',
  });
  const { Simulation } = await import(`${pathToFileURL(bundlePath).href}?t=${Date.now()}`);
  const { SceneManager } = await import(`${pathToFileURL(scenePath).href}?t=${Date.now()}`);

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

  // ── 3. 出口方块自己写的那句话,也只在说这一条判据 ─────────────────────────────
  const doorLines = (sim) => {
    const sm = new SceneManager({ appendChild: () => {} }); // 只借它的 drawExit,画布挂在哪里无所谓
    const ctx = fakeCtx();
    const s = sim.snapshot();
    sm['drawExit'](ctx, s.currentRoom.exitTile, 40, s.exitActive);
    return ctx.texts;
  };
  const bail = (texts) => JSON.stringify(texts);

  const litDoor = new Simulation();
  litDoor.start();
  const litText = doorLines(litDoor);
  assert.ok(litText.includes('封锁'), `关着的出口要写「封锁」,实际写了 ${bail(litText)}`);
  // 先问"有没有把守卫数列出来",再问"有没有点名灯":前者是这一轮要删掉的那句话,先问它,
  // 失败信息才会指向真正的回归,而不是被后一条断言拦在前面。
  assert.ok(
    !litText.some((t) => /守卫|剩 /.test(t)),
    `关着的出口不许再报剩余守卫数:判据不看它,写了就是把站在门口的人指回清场循环 ${bail(litText)}`
  );
  assert.ok(
    litText.includes('断电后开启'),
    `关着的出口要点名真正的原因「断电后开启」,实际写了 ${bail(litText)}`
  );

  const outDoor = new Simulation();
  outDoor.start();
  breakLamp(outDoor);
  outDoor.step(1 / 60);
  const outText = doorLines(outDoor);
  assert.ok(outText.includes('撤离'), `开着的出口要写「撤离」,实际写了 ${bail(outText)}`);
  assert.ok(
    !outText.some((t) => /守卫|剩 /.test(t)),
    `开着的出口不该再附带任何条件 ${bail(outText)}`
  );

  console.log(`Exit rule check: PASS (灯灭即出口开启;撤离时场上仍有 ${alive} 个活敌,目标链无击杀站;封锁的出口写「断电后开启」而非守卫数)`);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
