import { strict as assert } from 'node:assert';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const tempDir = await mkdtemp(join(tmpdir(), '7hs-light-break-'));
const bundlePath = join(tempDir, 'check.mjs');
const damageBundlePath = join(tempDir, 'damage.mjs');

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

  // ── C7 全拆灯加成:结算屏印着「S 级配方:45s 内 · 0 受击 · 全拾取 · 全拆灯」,这一节就照这句话
  // 在**生产模拟**里跑一遍,看它落在哪个等级。计分问的「可拆灯」必须和 lightSmash 门控的字段是同一个:
  // finishMission 曾写成 `filter((l) => l.hp !== null)`,而 LightSource.hp 声明为 `hp: number`(永不为
  // null),不可拆的霓虹灯牌/探照灯建的是 `hp: Infinity` —— 过滤器一盏也没滤掉,`every(dead)` 恒假,
  // +10 从未发放。判据落在玩家看到的那一屏:等级。
  await build({ entryPoints: ['src/core/simulation/damage.ts'], outfile: damageBundlePath, bundle: true, platform: 'node', format: 'esm', logLevel: 'silent' });
  const { lightSmash } = await import(`${pathToFileURL(damageBundlePath).href}?t=${Date.now()}`);
  // 必须问一个没人动过的房间:上面的 sim 早已把它的灯拆了,而 lightSmash 对 dead 灯一律拒收 ——
  // 那不是门控的分歧,是复用了一个已被消耗的房间。
  const freshRoom = new Simulation();
  freshRoom.start();
  const roomLights = freshRoom.snapshot().lightSources;
  assert.ok(roomLights.every((light) => light.state === 'intact'), 'the rule-agreement probe starts from an untouched room');
  for (const light of roomLights) {
    // 用生产规则自己问一遍:拆得掉 ⇔ 灯自己的 breakable 字段。计分和这条规则得是同一把尺子。
    // (传浅拷贝:lightSmash 会扣目标 hp)
    assert.equal(lightSmash({ ...light }, 0, 'melee').hit, light.breakable, `${light.id}: smashable ⇔ breakable`);
  }
  // hp 不是可空哨兵,所以任何 `hp !== null` 的过滤都滤不掉东西 —— 这正是旧写法恒真的原因。
  assert.ok(roomLights.every((light) => typeof light.hp === 'number' && light.hp !== null), 'LightSource.hp is a number on every light, never a nullable sentinel');

  /** 照结算屏印的那句话跑一遍:拆掉每一盏可拆灯、拾齐每一把武器、耗满 45s,再走到出口。
   *  返回结算屏拿到的那份 missionScore,以及**结算那一刻**每盏灯的状态 —— 后者才是这一节的判据:
   *  场上仍有没死的灯(不可拆的霓虹灯牌),而 +10 照样要发。 */
  const settle = ({ seconds }) => {
    const run = new Simulation();
    run.start();
    for (const enemy of run.enemies) enemy.hp = 0; // 守卫与灯火账无关
    for (const lamp of run.snapshot().lightSources.filter((l) => l.breakable)) {
      run.player.position = { x: lamp.position.x - 0.7, y: lamp.position.y };
      const p = run.snapshot().player;
      run.input({ kind: 'aim', angle: Math.atan2(lamp.position.y - p.position.y, lamp.position.x - p.position.x) });
      run.input({ kind: 'attackStart' });
      run.input({ kind: 'attackStart' });
      for (let i = 0; i < 7; i++) run.step(1 / 60); // 等 invalidation 走完
    }
    // 拾取只在 interactStart 上触发(tryPickup),量的是玩家到 tile 中心 +0.5 的距离,范围 PICKUP_RANGE
    for (const spawn of run.snapshot().currentRoom.weaponSpawns) {
      run.player.position = { x: spawn.tile.x + 0.5, y: spawn.tile.y + 0.5 };
      run.input({ kind: 'interactStart' });
      run.step(1 / 60);
    }
    for (let i = 0; i < seconds * 60; i++) run.step(1 / 60);
    run.player.position = { ...run.snapshot().currentRoom.exitTile };
    run.step(1 / 60);
    return { score: run.snapshot().missionScore, lights: run.snapshot().lightSources.map((l) => ({ id: l.id, breakable: l.breakable, state: l.state })) };
  };

  const recipe = settle({ seconds: 45 });
  assert.ok(recipe.score, 'the recipe run reaches the results screen');
  assert.equal(recipe.score.lampBonus, 10, 'breaking every breakable lamp pays the C7 +10');
  assert.equal(recipe.score.pickupBonus, 5, 'picking up every weapon pays the full-pickup +5');
  assert.equal(recipe.score.hitsTaken, 0, 'the recipe run takes no hits');
  // 判据的区分能力在这里:结算那一刻场上还有没死的灯 —— 若计分问的是「所有灯都死了吗」,
  // 这盏不可拆的霓虹灯牌就会把 +10 永远挡住(这正是修掉的那条 bug),而它现在必须照发。
  const stillLit = recipe.lights.filter((l) => l.state !== 'dead');
  assert.ok(stillLit.length >= 1, `scoring happens with lights still burning (${stillLit.map((l) => `${l.id}:${l.state}`).join(', ')})`);
  assert.ok(stillLit.every((l) => !l.breakable), 'every light still burning is one the smash rule refuses');
  assert.ok(recipe.score.rating === 'S', `the S recipe printed on the results screen settles at S (got ${recipe.score.total} ${recipe.score.rating})`);
  console.log(`  S recipe end-to-end: ${recipe.score.timeSeconds.toFixed(1)}s / ${recipe.score.hitsTaken} hits / pickup ${recipe.score.pickupRate} / lamp +${recipe.score.lampBonus} → ${recipe.score.total} ${recipe.score.rating} · still burning: ${stillLit.map((l) => l.id).join(', ')}`);

  console.log('P4 light break check: PASS (production Simulation, RMB melee + LMB bullets, tower power disabled, lamp-only delayed invalidation, C7 all-lamp S recipe settles at S)');
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
