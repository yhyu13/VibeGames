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
    death.input({ kind: 'move', dir: { x: target.x - player.position.x, y: target.y - player.position.y }, speedMode: 'sprint' }); death.step(1 / 60);
  }
  death.input({ kind: 'move', dir: { x: 0, y: 0 }, speedMode: 'walk' }); assert.ok(count(death, 'detectionWarning') >= 1, 'sustained sweep must create a warning episode'); assert.equal(count(death, 'playerKilled'), 1); assert.equal(death.snapshot().phase, 'MISSION_DEATH');

  const blocked = new Simulation(); blocked.start();
  blocked.player.position = { x: 3.3, y: 4 };
  blocked.enemies[0].position = { x: 4, y: 4 };
  blocked.input({ kind: 'move', dir: { x: 1, y: -1 }, speedMode: 'walk' }); step(blocked, .22); blocked.input({ kind: 'move', dir: { x: 0, y: 0 }, speedMode: 'walk' }); aimAt(blocked, blocked.snapshot().enemies[0].position); blocked.input({ kind: 'attackStart' });
  assert.equal(count(blocked, 'attackBlocked'), 1); assert.equal(blocked.snapshot().enemies[0].hp, 1, 'lit enemy survives melee');

  const sim = new Simulation(); sim.start();
  sim.player.position = { x: 4, y: 2 }; sim.enemies[0].position = { x: 4, y: 4 };
  sim.input({ kind: 'move', dir: { x: 1, y: -1 }, speedMode: 'walk' }); step(sim, .57); sim.input({ kind: 'move', dir: { x: 0, y: 0 }, speedMode: 'walk' });
  const lamp = sim.snapshot().lightSources[0]; aimAt(sim, lamp.position); sim.input({ kind: 'attackStart' }); sim.input({ kind: 'attackStart' });
  assert.equal(count(sim, 'lightSmash'), 2); step(sim, .12); assert.equal(count(sim, 'invalidateLight'), 1);
  const target = sim.snapshot().enemies[0].position; sim.player.position = { x: target.x - 0.7, y: target.y }; aimAt(sim, target); sim.input({ kind: 'attackStart' });
  assert.equal(count(sim, 'enemyKilled'), 1); assert.equal(count(sim, 'missionEnd'), 0); assert.equal(sim.snapshot().phase, 'MISSION_PLAY');
  // v3.6 S5:出 A 房 → 进 B 房(不计分);B 房快进(击杀全部 + 传送出口)→ SCORE
  const exit = sim.snapshot().currentRoom.exitTile; sim.player.position = { x: exit.x, y: exit.y }; step(sim, .1);
  assert.equal(count(sim, 'missionEnd'), 0, 'exit A advances to room B, not mission end');
  const snapB = sim.snapshot();
  assert.equal(snapB.currentRoom.id, 'm1_backroom'); assert.equal(snapB.phase, 'MISSION_PLAY');
  assert.equal(snapB.enemies.length, 2, 'room B spawns two enemies');
  assert.ok(snapB.spawnGraceRemaining > 0, 'room enter resets grace');
  assert.ok(count(sim, 'roomEnter') >= 2, 'roomEnter emitted for both rooms');
  sim.enemies.forEach((e) => { e.hp = 0; });
  sim.player.position = { ...snapB.currentRoom.exitTile }; step(sim, .1);
  assert.equal(count(sim, 'missionEnd'), 1); assert.equal(sim.snapshot().phase, 'SCORE'); assert.ok(sim.snapshot().missionScore);
  sim.input({ kind: 'attackStart' }); assert.equal(count(sim, 'enemyKilled'), 1, 'dead enemy cannot emit another kill');
  sim.start(); assert.equal(sim.snapshot().player.hp, 1); assert.equal(sim.snapshot().lightSources[0].hp, 2); assert.equal(sim.snapshot().enemies[0].hp, 1); assert.equal(sim.snapshot().missionScore, null);
  assert.equal(sim.snapshot().currentRoom.id, 'm1_intro_scene', 'reset returns to room A'); assert.equal(sim.snapshot().enemies.length, 1, 'room A has one enemy');
  // v3.6 S2(a):子弹击杀"光下无敌"敌人(受光护甲只对近战生效)——灯完好 + 无 attackBlocked
  const shot = new Simulation(); shot.start();
  shot.player.position = { x: 4, y: 6.5 }; shot.enemies[0].position = { x: 4, y: 4 };
  assert.equal(shot.snapshot().lightSources[0].state, 'intact', 'lamp intact → enemy lit');
  aimAt(shot, { x: 4, y: 4 }); shot.input({ kind: 'fireStart' });
  assert.equal(shot.snapshot().player.ammo, 5, 'fire consumes one round');
  step(shot, .5);
  assert.equal(count(shot, 'enemyKilled'), 1, 'bullet kills lit enemy'); assert.equal(count(shot, 'attackBlocked'), 0, 'bullet bypasses lit armor');
  // v3.6 S2(b):R 掷枪 → weaponThrown + 掷后回到 ∞ 小刀;掷枪后 LMB 不得开火(R3 免费近战门)
  const thr = new Simulation(); thr.start();
  thr.input({ kind: 'throwStart' });
  assert.equal(count(thr, 'weaponThrown'), 1); assert.equal(thr.snapshot().player.weapon, 'knife'); assert.equal(thr.snapshot().player.mode, 'melee');
  thr.input({ kind: 'fireStart' }); assert.equal(count(thr, 'fire'), 0, 'LMB after throw must not fire');
  // v3.6 S3(c):宽限期后,冲刺脚步噪音(r4)→ 巡逻兵起疑;纯听觉不得触发视觉警告
  // (冲刺路径与起疑查看方向相反,保证全程不进入敌锥 2.5u 近距——否则"被看见"警告是正确行为)
  const hear = new Simulation(); hear.start();
  hear.player.position = { x: 2, y: 4 }; hear.enemies[0].position = { x: 4, y: 4 };
  step(hear, 1.1); // 过宽限期(B01:期间听觉归零)
  hear.input({ kind: 'move', dir: { x: 0, y: 1 }, speedMode: 'sprint' }); step(hear, .6); hear.input({ kind: 'move', dir: { x: 0, y: 0 }, speedMode: 'walk' });
  assert.equal(hear.snapshot().enemies[0].awareness, 'suspicious', 'sprint footsteps must raise suspicion');
  assert.equal(count(hear, 'detectionWarning'), 0, 'hearing alone must not raise visual warning');
  // v3.6 S3(d):LOS 墙规则单元断言——'#' 挡声挡视;'X' 挡视不挡声
  await build({ entryPoints: ['src/core/world/lineOfSight.ts', 'src/core/world/tileMap.ts', 'src/core/data/missions.ts'], outdir: tempDir, bundle: true, platform: 'node', format: 'esm', logLevel: 'silent' });
  const { hasLineOfSight } = await import(`${pathToFileURL(join(tempDir, 'world', 'lineOfSight.js')).href}?t=${Date.now()}`);
  const { buildTileMap } = await import(`${pathToFileURL(join(tempDir, 'world', 'tileMap.js')).href}?t=${Date.now()}`);
  const { MISSIONS } = await import(`${pathToFileURL(join(tempDir, 'data', 'missions.js')).href}?t=${Date.now()}`);
  const mapA = buildTileMap(MISSIONS[0].rooms[0]);
  assert.equal(hasLineOfSight(mapA, { x: 4, y: 4 }, { x: 4, y: -1.5 }, 'sound'), false, '# wall between blocks sound');
  assert.equal(hasLineOfSight(mapA, { x: 2, y: 1.5 }, { x: 2, y: 4.5 }, 'sound'), true, 'X cover does not block sound');
  assert.equal(hasLineOfSight(mapA, { x: 2, y: 1.5 }, { x: 2, y: 4.5 }, 'vision'), false, 'X cover blocks vision');
  assert.equal(hasLineOfSight(mapA, { x: 4, y: 2.5 }, { x: 4, y: 4 }, 'vision'), true, 'clear column keeps vision');
  // v3.6 S4(e):警报传播——A 发现玩家即呼叫(r6);声索通畅的 B 起疑,被 '#' 墙隔开的 B 无动于衷
  const prop = new Simulation(); prop.start();
  prop.enemies.push({ ...prop.enemies[0], id: 'patrol_2', position: { x: 7, y: 1.5 } });
  step(prop, 1.1); // 过宽限期
  const alpha = prop.snapshot().enemies[0];
  prop.player.position = { x: alpha.position.x + Math.cos(alpha.facingAngle) * 1.5, y: alpha.position.y + Math.sin(alpha.facingAngle) * 1.5 };
  step(prop, .1);
  assert.ok(count(prop, 'enemyAlert') >= 1, 'alert entry emits enemyAlert');
  assert.equal(prop.snapshot().enemies[1].awareness, 'suspicious', 'shout propagates to nearby patrol');
  const wallProp = new Simulation(); wallProp.start();
  wallProp.enemies.push({ ...wallProp.enemies[0], id: 'patrol_2', position: { x: 4, y: -1.5 } });
  step(wallProp, 1.1);
  const wAlpha = wallProp.snapshot().enemies[0];
  wallProp.player.position = { x: wAlpha.position.x + Math.cos(wAlpha.facingAngle) * 1.5, y: wAlpha.position.y + Math.sin(wAlpha.facingAngle) * 1.5 };
  step(wallProp, .1);
  assert.ok(count(wallProp, 'enemyAlert') >= 1, 'alert entry emits enemyAlert (wall case)');
  assert.equal(wallProp.snapshot().enemies[1].state, 'patrol', '# wall blocks shout propagation');
  console.log('Combat loop check: PASS (sweep, grace, guarded warning, reset, lamp invalidation, OHK, two-room-advance, repeated-event guards, bullet-vs-lit-armor, throw-gun, footstep-hearing, los-wall-rules, shout-propagation)');
} finally { await rm(tempDir, { recursive: true, force: true }); }
