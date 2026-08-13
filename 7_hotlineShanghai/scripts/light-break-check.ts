// M1.0 P4 acceptance:拆灯闭环 —— LMB 优先打灯 → HP-1 半碎 → HP=0 灯碎 →
// invalidateLight → 灯池 0.1s 满强度(护甲窗口)→ 0.3s 内坍缩到 0。
// 运行:node --experimental-strip-types scripts/light-break-check.ts
import { Simulation } from '../src/core/simulation/Simulation.ts';
import { BREAKABLE_LIGHT_HP } from '../src/core/constants.ts';

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

/** 房间内 0.5..9.5 × 0.5..8.5 网格平均光强度(几何场,全房间平均) */
function avgRoomLight(sim: Simulation): number {
  let total = 0;
  let n = 0;
  for (let y = 0.5; y <= 8.5; y += 1) {
    for (let x = 0.5; x <= 9.5; x += 1) {
      total += sim.lightField.sampleAt({ x, y });
      n += 1;
    }
  }
  return total / n;
}

// 0) 初始:灯 intact,hp = BREAKABLE_LIGHT_HP
const sim = new Simulation();
let snap = sim.snapshot();
const lamp = snap.lightStates[0];
check(lamp !== undefined, 'one breakable light in snapshot');
check(lamp?.hp === BREAKABLE_LIGHT_HP, `lamp hp starts at ${BREAKABLE_LIGHT_HP}`);
check(lamp?.state === 'intact', 'lamp starts intact');

// 1) 站在灯心(5.5,1.5)面朝 0 → LMB 第一次 → 半碎
sim.debugSetPlayerPosition({ x: 5.5, y: 1.5 });
sim.input({ kind: 'aim', angle: 0 });
sim.input({ kind: 'attackStart' });
sim.step(dt);
snap = sim.snapshot();
check(snap.lightStates[0]?.hp === 1, 'first smash hp=1 (half broken)');
check(snap.lightStates[0]?.state === 'damaged', 'lamp state damaged after first smash');
check(sim.events.filter((e) => e.kind === 'lightSmash').length === 1, 'lightSmash event ×1');
check(sim.events.filter((e) => e.kind === 'invalidateLight').length === 0, 'no invalidateLight while alive');

// 2) 第二次 LMB → 灯碎 + 事件流
sim.input({ kind: 'attackStart' });
sim.step(dt);
snap = sim.snapshot();
check(snap.lightStates[0]?.hp === 0, 'second smash hp=0 (broken)');
check(snap.lightStates[0]?.state === 'dead', 'lamp state dead after second smash');
const kinds = sim.events.map((e) => e.kind);
check(kinds.filter((k) => k === 'lightSmash').length === 2, 'lightSmash event ×2');
check(kinds.includes('lightDestroyed'), 'lightDestroyed event emitted');
check(kinds.includes('invalidateLight'), 'invalidateLight event emitted');
check(kinds.includes('sfx'), 'lamp_break sfx event emitted');

// 3) 灯池坍缩:击碎瞬间仍满强度(0.1s 护甲窗口),0.3s 后平均光强 < 40%(坍缩 >60%)
const sim2 = new Simulation();
sim2.debugSetPlayerPosition({ x: 5.5, y: 1.5 });
sim2.input({ kind: 'aim', angle: 0 });
const before = avgRoomLight(sim2);
check(before > 0, `room has lit pool before break (avg=${before.toFixed(4)})`);
sim2.input({ kind: 'attackStart' });
sim2.step(dt);
sim2.input({ kind: 'attackStart' });
sim2.step(dt);
const atBreak = avgRoomLight(sim2);
check(Math.abs(atBreak - before) < 1e-6, 'pool keeps full intensity at break (lazy invalidate)');
for (let i = 0; i < 4; i += 1) sim2.step(dt); // 累计 0.083s,仍处于 0.1s 护甲窗口内
const duringGrace = avgRoomLight(sim2);
check(Math.abs(duringGrace - before) < 1e-6, 'pool full during 0.1s shield grace window');
for (let i = 0; i < 14; i += 1) sim2.step(dt); // 累计 0.317s > 0.3s 坍缩完成
const after = avgRoomLight(sim2);
check(after < before * 0.4, `pool shrunk after 0.3s (avg ${before.toFixed(4)} → ${after.toFixed(4)})`);

// 4) 朝向反了(灯不在瞄准弧内)→ 不拆灯
const sim3 = new Simulation();
sim3.debugSetPlayerPosition({ x: 6.5, y: 2.5 });
sim3.input({ kind: 'aim', angle: 0 }); // 面向东,灯在西北 135°
sim3.input({ kind: 'attackStart' });
sim3.step(dt);
snap = sim3.snapshot();
check(snap.lightStates[0]?.state === 'intact', 'lamp untouched when not aimed (60° arc gate)');

if (failures > 0) {
  console.error(`${failures} case(s) failed`);
  process.exit(1);
}
console.log('light break check: all PASS');
