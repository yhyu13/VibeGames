// M1.0 P3+P5 acceptance:敌人生成 / 手电锥视野 / 0.4s 瞄准提示 / 阴影隐身 / 受光护甲 /
// 灯下暴露 0.4s 后玩家死亡(P5 OHK 语义;旧的"站着被提示后继续存活"检查已随 P5 作废)。
// 运行:node --experimental-strip-types scripts/enemy-check.ts
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
const sim = new Simulation();

// 1) 敌人生成:flashlight_patrol,初始巡逻
let snap = sim.snapshot();
check(snap.enemies.length === 1, 'one enemy spawned');
check(snap.enemies[0]?.archetype === 'flashlight_patrol', 'enemy is flashlight_patrol');
check(snap.enemies[0]?.state === 'patrol', 'enemy starts patrol');

// 2) 受光护甲:灯心 shielded;敌人出生点(距灯 ~3.2u)当前不 shielded(D2 待 playtest 调阈值/衰减)
check(sim.lightField.isShielded({ x: 5.5, y: 1.5 }) === true, 'lamp center shields');
check(
  sim.lightField.isShielded(snap.enemies[0].position) === false,
  'enemy spawn outside shield pool (D2 待调)',
);

// 3) 玩家进手电锥(右上方)→ alert + lastSeen 更新(立即 break,不等 0.4s 提示被击杀)
sim.debugSetPlayerPosition({ x: 6.5, y: 2.5 });
let sawAlert = false;
for (let i = 0; i < 60; i += 1) {
  sim.step(dt);
  if (sim.snapshot().enemies[0]?.state === 'alert') {
    sawAlert = true;
    break;
  }
}
check(sawAlert, 'flashlight cone sees player → alert');
const alerted = sim.snapshot().enemies[0];
check(
  alerted?.state === 'alert' && alerted.lastSeenPlayerAt !== null,
  'alert state + lastSeenPlayerAt set',
);

// 4) 玩家在 0.4s 提示完成前移入暗角(右下)→ 视野失效,回 patrol(不被击杀)
sim.debugSetPlayerPosition({ x: 8.5, y: 7.5 });
let backToPatrol = false;
for (let i = 0; i < 30; i += 1) {
  sim.step(dt);
  if (sim.snapshot().enemies[0]?.state === 'patrol') {
    backToPatrol = true;
    break;
  }
}
check(backToPatrol, 'shadow hides player → back to patrol (before telegraph)');

// 5) 灯下暴露(P5):玩家站灯下 0.5u(lightAt≈0.59 > 0.10)→ 0.4s 提示后 playerKilled
const sim2 = new Simulation();
sim2.debugSetPlayerPosition({ x: 5.5, y: 2.0 });
let sawTelegraph = false;
let sawDeath = false;
for (let i = 0; i < 90; i += 1) {
  sim2.step(dt);
  if (sim2.events.some((e) => e.kind === 'enemyAttack')) sawTelegraph = true;
  if (sim2.events.some((e) => e.kind === 'playerKilled')) {
    sawDeath = true;
    break;
  }
}
check(sawTelegraph, 'telegraph 0.4s → enemyAttack event');
check(sawDeath, 'lit player dies after telegraph (playerKilled)');

if (failures > 0) {
  console.error(`${failures} case(s) failed`);
  process.exit(1);
}
console.log('enemy check: all PASS');
