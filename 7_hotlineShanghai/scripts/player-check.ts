// M1.0 P2 acceptance:移动加速 / 减速 / 撞墙 / 瞄准 / knife 拾取 / 近战挥击(Simulation 端到端)。
// 运行:node --experimental-strip-types scripts/player-check.ts
import { Simulation } from '../src/core/simulation/Simulation.ts';

let failures = 0;
function check(cond: boolean, msg: string): void {
  if (cond) {
    console.log(`PASS ${msg}`);
  } else {
    console.error(`FAIL ${msg}`);
    failures += 1;
  }
}

const dt = 1 / 60;

// 0) 出生点不贴墙:向左应能自由移动(回归:B33 移动失效复现点)
const spawnCheck = new Simulation();
spawnCheck.input({ kind: 'move', dir: { x: -1, y: 0 } });
for (let i = 0; i < 10; i += 1) spawnCheck.step(dt);
const s0 = spawnCheck.snapshot();
check(s0.player.position.x < 2.3, `spawn not stuck to left wall (x=${s0.player.position.x.toFixed(3)})`);

// 1) 向右移动 1s:加速到上限,被右墙(边界 tile 9)挡住,速度清 0
const sim = new Simulation();
sim.input({ kind: 'move', dir: { x: 1, y: 0 } });
for (let i = 0; i < 60; i += 1) sim.step(dt);
let snap = sim.snapshot();
check(snap.player.position.x >= 8.4 && snap.player.position.x <= 8.5, `wall blocks right (x=${snap.player.position.x.toFixed(3)})`);
check(Math.abs(snap.player.velocity.x) < 0.05, `velocity zeroed on wall (vx=${snap.player.velocity.x.toFixed(3)})`);

// 2) 向左 0.5s 再松手:速度回落到 ~0(减速)
sim.input({ kind: 'move', dir: { x: -1, y: 0 } });
for (let i = 0; i < 30; i += 1) sim.step(dt);
snap = sim.snapshot();
check(snap.player.velocity.x < -7, `accelerates left (vx=${snap.player.velocity.x.toFixed(3)})`);
sim.input({ kind: 'move', dir: { x: 0, y: 0 } });
for (let i = 0; i < 30; i += 1) sim.step(dt);
snap = sim.snapshot();
check(Math.abs(snap.player.velocity.x) < 0.5, `decelerates after release (vx=${snap.player.velocity.x.toFixed(3)})`);

// 3) 瞄准角度生效
sim.input({ kind: 'aim', angle: Math.PI / 2 });
sim.step(dt);
snap = sim.snapshot();
check(Math.abs(snap.player.facingAngle - Math.PI / 2) < 1e-6, 'aim sets facingAngle');

// 4) 沿底排向右走到 knife(6,5)附近 → E 拾取
const fresh = new Simulation();
fresh.input({ kind: 'move', dir: { x: 1, y: 0 } });
for (let i = 0; i < 60; i += 1) {
  fresh.step(dt);
  const p = fresh.snapshot().player.position;
  const dx = p.x - 6.5;
  const dy = p.y - 5.5;
  if (dx * dx + dy * dy <= 1.5 * 1.5) break;
}
fresh.input({ kind: 'interactStart' });
fresh.step(dt);
snap = fresh.snapshot();
check(snap.player.weapon === 'knife', `knife picked up (weapon=${snap.player.weapon})`);

// 5) knife 近战挥击:产生 swing + melee 事件
fresh.input({ kind: 'attackStart' });
snap = fresh.snapshot();
check(snap.melee.length === 1, 'melee swing created');
check(fresh.events.some((e) => e.kind === 'melee'), 'melee event emitted');

if (failures > 0) {
  console.error(`${failures} case(s) failed`);
  process.exit(1);
}
console.log('player check: all PASS');
