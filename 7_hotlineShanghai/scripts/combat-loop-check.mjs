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
  const initial = new Simulation(); initial.start();
  const initialSnapshot = initial.snapshot();
  const room = initialSnapshot.currentRoom;
  const coverTiles = new Set();
  for (let y = 0; y < room.tiles.length; y++) {
    for (let x = 0; x < room.tiles[y].length; x++) {
      if (room.tiles[y][x] === 'X') coverTiles.add(`${x},${y}`);
    }
  }
  const visibleSandbags = new Set((room.furniture ?? []).filter((item) => item.kind === 'sandbag').map((item) => `${item.tile.x},${item.tile.y}`));
  assert.deepEqual([...visibleSandbags].sort(), [...coverTiles].sort(), 'every solid X tile has exactly one visible sandbag and vice versa');
  for (const spawn of room.enemySpawns.filter((item) => item.role === 'ground_patrol' && item.patrolAxis !== 'static')) {
    const length = Math.max(1, spawn.patrolLength ?? 3);
    for (let offset = 0; offset <= length; offset++) {
      const x = spawn.position.x + (spawn.patrolAxis === 'horizontal' ? offset : 0);
      const y = spawn.position.y + (spawn.patrolAxis === 'vertical' ? offset : 0);
      assert.ok(x >= 0 && x < room.width && y >= 0 && y < room.height, `patrol route stays in bounds at (${x},${y})`);
      assert.ok(room.tiles[y][x] !== '#' && room.tiles[y][x] !== 'X', `patrol route stays walkable at (${x},${y})`);
    }
  }
  const initialPlayer = initialSnapshot.player.position;
  const nearestGuard = Math.min(...initialSnapshot.enemies.map((enemy) => Math.hypot(enemy.position.x - initialPlayer.x, enemy.position.y - initialPlayer.y)));
  assert.ok(nearestGuard >= 4, `spawn must open in a safe pocket (nearest=${nearestGuard.toFixed(2)}u)`);
  step(initial, 1.25);
  assert.equal(count(initial, 'detectionWarning'), 0, 'stationary player remains safe after spawn grace');

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
  const deathEvent = death.events.find((e) => e.kind === 'playerKilled');
  assert.equal(deathEvent?.cause, 'bullet', 'enemy fire kills the player by bullet');

  const collision = new Simulation(); collision.start();
  collision.enemies.forEach((enemy) => { enemy.hp = 0; });
  collision.player.position = { x: 4.5, y: 2.5 };
  collision.input({ kind: 'move', dir: { x: 1, y: 0 }, speedMode: 'sprint' }); step(collision, .6);
  collision.input({ kind: 'move', dir: { x: 0, y: 0 }, speedMode: 'walk' });
  assert.ok(collision.snapshot().player.position.x < 4.7, `internal wall blocks movement (x=${collision.snapshot().player.position.x})`);

  // 光=警觉开关(非护甲):灯还亮时近战不再被挡,亮处击杀会拉响警报刷增援。
  const loudKill = new Simulation(); loudKill.start();
  loudKill.player.position = { x: 2.3, y: 9 };
  loudKill.enemies[0].position = { x: 3, y: 9 };
  aimAt(loudKill, loudKill.snapshot().enemies[0].position); loudKill.input({ kind: 'attackStart' });
  assert.equal(count(loudKill, 'attackBlocked'), 0, 'melee is no longer blocked while lit');
  assert.equal(loudKill.snapshot().enemies[0].hp, 0, 'lit enemy is killable by melee');
  assert.equal(count(loudKill, 'enemyKilled'), 1, 'loud melee kill emits once');
  assert.ok(loudKill.snapshot().enemies.length > 4, 'loud kill spawns reinforcements');

  const sim = new Simulation(); sim.start();
  const lamp = sim.snapshot().lightSources[0]; sim.player.position = { x: lamp.position.x - 0.7, y: lamp.position.y };
  aimAt(sim, lamp.position); sim.input({ kind: 'attackStart' }); sim.input({ kind: 'attackStart' });
  assert.equal(count(sim, 'lightSmash'), 2); step(sim, .12); assert.ok(count(sim, 'invalidateLight') >= 2, 'lamp and tower searchlight both invalidate');
  const target = sim.snapshot().enemies[0].position; sim.player.position = { x: target.x - 0.7, y: target.y }; aimAt(sim, target); sim.input({ kind: 'attackStart' });
  assert.equal(count(sim, 'enemyKilled'), 1); assert.equal(count(sim, 'missionEnd'), 0); assert.equal(sim.snapshot().phase, 'MISSION_PLAY');
  assert.equal(sim.snapshot().currentRoom.id, 'm1_tower_compound'); assert.equal(sim.snapshot().enemies.length, 4, 'compound spawns three ground patrols and one tower guard');
  const tower = sim.snapshot().enemies.find((e) => e.role === 'tower_guard');
  assert.ok(tower, 'tower guard is present'); assert.equal(tower.patrolAxis, 'static');
  const towerAnchor = { ...tower.position };
  step(sim, 1);
  const unpoweredTower = sim.snapshot().enemies.find((e) => e.role === 'tower_guard');
  assert.deepEqual(unpoweredTower.position, towerAnchor, 'tower guard remains positionally static after power loss');
  assert.deepEqual(unpoweredTower.velocity, { x: 0, y: 0 }, 'tower guard has no translational velocity');
  const poweredTower = new Simulation(); poweredTower.start();
  const liveTower = poweredTower.enemies.find((e) => e.role === 'tower_guard');
  // 光=警觉(非护甲):通电塔卫不再无敌,子弹可击杀(塔卫失明由 destroyTowerPower 单独门控)。
  // B68:子弹自玩家视觉中心发射。塔楼正下 (13,2) 是沙袋 X,旧位置 (13,1.8) 的中心会落在
  // 沙袋内,子弹一出生即被挡,到不了塔卫。改放塔楼左侧空地 (11,1),水平射击塔卫。
  poweredTower.player.position = { x: 11, y: 1 };
  aimAt(poweredTower, liveTower.position); poweredTower.input({ kind: 'fireStart' }); step(poweredTower, .5);
  assert.equal(liveTower.hp, 0, 'powered tower is killable (no light armor)'); assert.equal(count(poweredTower, 'attackBlocked'), 0, 'no blocked feedback against tower');
  assert.ok(!sim.snapshot().activeLights.some((light) => light.kind === 'searchlight'), 'power lamp disables tower beam');
  sim.enemies.forEach((e) => { e.hp = 0; });
  const exit = sim.snapshot().currentRoom.exitTile; sim.player.position = { ...exit }; step(sim, .1);
  assert.equal(count(sim, 'missionEnd'), 1); assert.equal(sim.snapshot().phase, 'SCORE'); assert.ok(sim.snapshot().missionScore);
  sim.input({ kind: 'attackStart' }); assert.equal(count(sim, 'enemyKilled'), 1, 'dead enemy cannot emit another kill');
  sim.start(); assert.equal(sim.snapshot().player.hp, 1); assert.equal(sim.snapshot().lightSources[0].hp, 2); assert.equal(sim.snapshot().enemies[0].hp, 1); assert.equal(sim.snapshot().missionScore, null);
  assert.equal(sim.snapshot().currentRoom.id, 'm1_tower_compound', 'reset returns to compound'); assert.equal(sim.snapshot().enemies.length, 4, 'reset restores all four guards');
  // v3.6 S2(a):子弹击杀地面巡逻兵(光不再是护甲)——灯完好 + 无 attackBlocked
  const shot = new Simulation(); shot.start();
  const shotTarget = shot.enemies[0];
  // B68:子弹自玩家视觉中心发射,命中判定也按中心。(9,6) 是墙砖,旧角坐标弹道靠 0.35 半径
  // "擦墙"命中;改放开放行 row 5(全程 '.')的 (11,5),水平射击中心命中,无墙/掩体。
  shot.player.position = { x: 8, y: 5 }; shotTarget.position = { x: 11, y: 5 }; shotTarget.patrolAxis = 'static'; shotTarget.state = 'engaging'; shotTarget.facingAngle = Math.PI;
  assert.equal(shot.snapshot().lightSources[0].state, 'intact', 'lamp intact → enemy lit');
  aimAt(shot, { x: 11, y: 5 }); shot.input({ kind: 'fireStart' });
  assert.equal(shot.snapshot().player.ammo, 5, 'fire consumes one round');
  step(shot, .2);
  assert.equal(count(shot, 'fire'), 1, 'ranged fire emits exactly once'); assert.equal(count(shot, 'attackBlocked'), 0, 'ground-target shot is not rejected by tower gate'); assert.equal(shotTarget.hp, 0, 'clear ranged shot kills a ground patrol'); assert.equal(count(shot, 'enemyKilled'), 1, 'ranged kill emits once');
  // v3.6 S2(b):R 掷枪 → weaponThrown + 掷后回到 ∞ 小刀;掷枪后 LMB 不得开火(R3 免费近战门)
  const thr = new Simulation(); thr.start();
  thr.input({ kind: 'throwStart' });
  assert.equal(count(thr, 'weaponThrown'), 1); assert.equal(thr.snapshot().player.weapon, 'knife'); assert.equal(thr.snapshot().player.mode, 'melee');
  thr.input({ kind: 'fireStart' }); assert.equal(count(thr, 'fire'), 0, 'LMB after throw must not fire');
  // v3.6 S3(c):宽限期后,冲刺脚步噪音(r4)→ 巡逻兵起疑;纯听觉不得触发视觉警告
  // (冲刺路径与起疑查看方向相反,保证全程不进入敌锥 2.5u 近距——否则"被看见"警告是正确行为)
  const hear = new Simulation(); hear.start();
  hear.player.position = { x: 2, y: 7 }; hear.enemies[0].position = { x: 2, y: 9 }; hear.enemies[0].patrolAxis = 'static';
  step(hear, 1.1); // 过宽限期(B01:期间听觉归零)
  hear.input({ kind: 'move', dir: { x: 1, y: 0 }, speedMode: 'sprint' }); step(hear, .1); hear.input({ kind: 'move', dir: { x: 0, y: 0 }, speedMode: 'walk' });
  assert.ok(count(hear, 'enemyAlert') === 0, 'footsteps alone must not raise an alert');
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
  assert.ok(prop.snapshot().enemies.length >= 4, 'alert fixture preserves the four-guard compound');
  // Cross-wall shout fixture: place a patrol behind the west divider and raise an alert on the east side.
  const wallProp = new Simulation(); wallProp.start();
  step(wallProp, 1.1);
  const wallClone = { ...wallProp.enemies[0], id: 'wall_patrol', position: { x: 3.5, y: 4.5 }, state: 'patrol', awareness: 'none', lastSuspiciousPosition: null, patrolAxis: 'static' };
  wallProp.enemies.push(wallClone);
  wallProp.enemies[1].position = { x: 7.5, y: 3.5 };
  wallProp.raiseAlert(wallProp.enemies[1]);
  assert.equal(wallClone.state, 'patrol', '# wall blocks shout propagation');
  console.log('Combat loop check: PASS (light=alert gate, loud-kill reinforcement, enemy fire bullet OHK, sweep, grace, warning, lamp/power invalidation, collision, reset, bullet, throw, hearing, LOS, alert propagation)');
} finally { await rm(tempDir, { recursive: true, force: true }); }
