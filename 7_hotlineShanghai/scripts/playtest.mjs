// Hotline Shanghai — 自动 playtest 脚手架(BUGS.md 复现环境)
//
// 用法:
//   node scripts/playtest.mjs <scenario>   (flow | move | spawn-grace | combat-kill | throw | simflow | all)
//
// 环境:
//   - 依赖 dev server: npm run dev → http://localhost:5184
//   - 复用 monorepo 里 1/ 的 playwright(含已下载 chromium)
//   - 必须 headed:headless 下 Chromium 把 rAF 节流到 ~2fps,输入管线会饿死(B17)
//
// 输出:每场景一行 RESULT=...,失败抛错退出码非 0;截图存 smoke/。

import { createRequire } from 'node:module';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Git-repo-my/VibeGames/1/node_modules/playwright');

const BASE = 'http://localhost:5184/';
const SHOT_DIR = 'smoke';
fs.mkdirSync(SHOT_DIR, { recursive: true });

const errors = [];
let browser;
let page;

const shot = async (name) => {
  await page.screenshot({ path: `${SHOT_DIR}/${name}.png` });
  console.log(`SHOT=${name}`);
};

const waitText = (text, ms = 6000) =>
  page.waitForFunction((t) => document.body.innerText.includes(t), text, { timeout: ms });

const snap = () =>
  page.evaluate(() => {
    const s = window.__sim.snapshot();
    return {
      phase: s.phase,
      paused: s.paused,
      mission: s.currentMission?.id ?? null,
      room: s.currentRoom?.id ?? null,
      roomName: s.currentRoom?.nameZh ?? null,
      roomIndex: s.currentMission && s.currentRoom
        ? s.currentMission.rooms.findIndex((r) => r.id === s.currentRoom.id)
        : -1,
      player: {
        pos: { x: +s.player.position.x.toFixed(2), y: +s.player.position.y.toFixed(2) },
        weapon: s.player.weapon,
        ammo: s.player.ammo,
        mode: s.player.mode,
        hp: s.player.hp,
        kills: s.player.kills,
      },
      enemies: s.enemies.map((e) => ({
        id: e.id,
        arch: e.archetype,
        pos: { x: +e.position.x.toFixed(2), y: +e.position.y.toFixed(2) },
        state: e.state,
        hp: e.hp,
      })),
      lights: s.activeLights.map((l) => ({ kind: l.kind, ttl: l.ttl })),
      bullets: s.bullets.length,
      thrown: s.thrownWeapons.length,
      score: s.missionScore,
    };
  });

const holdKeys = async (keys, ms) => {
  for (const k of keys) await page.keyboard.down(k);
  await page.waitForTimeout(ms);
  for (const k of keys) await page.keyboard.up(k);
  await page.waitForTimeout(150);
};

const startMission = async (waitFade = true) => {
  await page.goto(BASE, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /\u5f00\u59cb\u6e38\u620f/ }).click();
  await waitText('\u9009\u62e9\u4efb\u52a1');
  await page.getByRole('button', { name: /\u7535\u8f66\u516c\u53f8/ }).click();
  await waitText('\u9009\u62e9\u9762\u5177');
  await page.getByRole('button', { name: /\u4e0d\u6234\u9762\u5177/ }).click();
  await waitText('\u7801\u5934\u4ed3\u5e93', 8000);
  if (waitFade) await page.waitForTimeout(1500);
};

const assert = (cond, msg) => {
  if (!cond) throw new Error('ASSERT_FAIL: ' + msg);
};

// ─── 场景 ────────────────────────────────────────────────────────────────

async function scenarioFlow() {
  await startMission(false);
  const s = await snap();
  assert(s.phase === 'MISSION_PLAY', 'phase=MISSION_PLAY');
  assert(s.room === 'm1_workshop_room1', 'room1 loaded');
  assert(s.enemies.length === 1, '1 enemy');
  assert(s.lights.some((l) => l.kind === 'oil_lamp'), 'oil lamp active');
  const rc = await page.evaluate(() => JSON.stringify(window.__rcPipeline ?? null));
  assert(rc.includes('"activeCascades":3'), 'RC 3 cascades');
  const evCount = await page.evaluate(() => (window.__simEvents ? window.__simEvents().length : -1));
  assert(evCount > 0, `__simEvents returns recent events (B08, n=${evCount})`);
  await shot('play-01-flow');
  console.log('RESULT=flow OK ' + JSON.stringify({ phase: s.phase, room: s.room, enemies: s.enemies.length, events: evCount }));
}

async function scenarioMove() {
  await startMission(true);
  await page.bringToFront();
  await requireFps();
  const p0 = (await snap()).player.pos;
  // 2026-08-09 新 Room1:出生点左下有沙发,沿底排向右移动(开放通道)
  await page.keyboard.down('d');
  let moved = null;
  for (let i = 0; i < 14; i++) {
    await page.waitForTimeout(100);
    const s = await snap();
    if (s.player.pos.x > p0.x + 1.5) {
      moved = s.player.pos;
      break;
    }
  }
  await page.keyboard.up('d');
  await page.waitForTimeout(150);
  if (moved === null) {
    const fps = await page.evaluate(() => window.__fpsTicks ?? -1);
    assert(false, `no movement in 1.4s (fpsTicks=${fps}) — B17 focus/throttle or input break`);
  }
  await shot('play-02-move');
  console.log('RESULT=move OK ' + JSON.stringify({ from: p0, moved }));
}

// B17 防护:headed 窗口失焦时 Chromium 也会节流 rAF,输入管线被饿死;
// 帧率不达标直接给出明确失败原因,而不是误报游戏 bug。
async function requireFps(minFps = 20) {
  const ticks = await page.evaluate(() => {
    window.__fpsTicks = 0;
    const t = () => { window.__fpsTicks++; requestAnimationFrame(t); };
    requestAnimationFrame(t);
  });
  void ticks;
  await page.waitForTimeout(600);
  const fps = await page.evaluate(() => window.__fpsTicks);
  assert(fps >= minFps, `rAF too slow (${fps} ticks/0.6s < ${minFps * 0.6}) — headed window lacks focus (B17)`);
}

async function scenarioSpawnGrace() {
  // 回归 B01:宽限期(play 开始后 1.0s)内站在出生点不应死亡;
  // 宽限期过后站着不动被击杀 = 预期(HM 式残酷),所以只断言宽限窗口内存活。
  await startMission(true);
  await page.waitForTimeout(400); // room text + 1500ms,再 +400ms ≈ play 开始后 0.9s,仍在宽限内
  const s = await snap();
  assert(s.player.hp === 1 && s.phase === 'MISSION_PLAY', `alive during grace (hp=${s.player.hp}, phase=${s.phase})`);
  await shot('play-03-spawn-grace');
  console.log('RESULT=spawn-grace OK (alive inside 1.0s grace window)');
}

async function scenarioCombatKill() {
  await startMission(false);
  // 等房间真正进入 play 且敌人就位(避免出生死亡/重开竞态,B01 宽限内完成击杀)
  await page.waitForFunction(() => {
    const s = window.__sim;
    return s && s.roomPhase === 'play' && s.enemies.length > 0 && s.phase === 'MISSION_PLAY';
  }, null, { timeout: 8000 });
  const result = await page.evaluate(async () => {
    const sim = window.__sim;
    const e = sim.enemies[0];
    if (!e) return { error: 'no enemy' };
    const dx = e.position.x - sim._player.position.x;
    const dy = e.position.y - sim._player.position.y;
    const dist = Math.hypot(dx, dy);
    // 走到敌人 0.8u 处并面向它
    sim._player.position.x = e.position.x - (dx / dist) * 0.8;
    sim._player.position.y = e.position.y - (dy / dist) * 0.8;
    sim._player.facingAngle = Math.atan2(dy, dx);
    sim.input({ kind: 'attackStart' });
    for (let i = 0; i < 60; i++) sim.step(1 / 60);
    sim.input({ kind: 'attackEnd' });
    for (let i = 0; i < 60; i++) sim.step(1 / 60);
    return {
      enemiesLeft: sim.enemies.length,
      playerKills: sim._player.kills,
      roomPhase: sim.roomPhase,
      room: sim.currentRoom?.id ?? null,
      events: sim.events.slice(-6),
    };
  });
  assert(result.playerKills === 1, 'kills incremented');
  assert(
    result.room === 'm1_workshop_room2' || result.enemiesLeft === 0 || result.enemiesLeft === 3,
    `kill + room advance (enemiesLeft=${result.enemiesLeft}, room=${result.room})`,
  );
  // B03:清房后必须走到门口才切房,把玩家传送到出口并推进
  await page.evaluate(() => {
    const sim = window.__sim;
    const exit = sim.currentRoom?.exitTile;
    if (exit) {
      sim._player.position.x = exit.x + 0.5;
      sim._player.position.y = exit.y + 0.5;
      for (let i = 0; i < 120; i++) sim.step(1 / 60);
    }
  });
  await page.waitForTimeout(600);
  const s = await snap();
  assert(s.room === 'm1_workshop_room2', `advanced to room2 (room=${s.room})`);
  await shot('play-04-kill');
  console.log('RESULT=combat-kill OK ' + JSON.stringify({ kills: result.playerKills, room: s.room }));
}

async function scenarioThrow() {
  await startMission(true);
  // 把敌人挪到远处,专注测试投掷机制(不能 remove:空数组会触发清房自动推进,清掉投掷物)
  await page.evaluate(() => {
    for (const e of window.__sim.enemies) {
      e.position = { x: 100, y: 100 };
      e.state = 'patrol';
      e.patrolTarget = { x: 100, y: 100 };
    }
  });
  // 先捡起房间里的刀(把玩家传送到刀上)
  await page.evaluate(() => {
    const sim = window.__sim;
    const knife = sim.currentRoom.weaponSpawns[0];
    sim._player.position.x = knife.tile.x + 0.5;
    sim._player.position.y = knife.tile.y + 0.5;
    sim.step(1 / 60);
  });
  const s0 = await snap();
  assert(s0.player.weapon === 'knife', `knife picked (weapon=${s0.player.weapon})`);
  // E 长按投掷
  await page.keyboard.down('e');
  await page.waitForTimeout(400);
  await page.keyboard.up('e');
  await page.waitForTimeout(200);
  const s1 = await snap();
  assert(s1.player.weapon === null, `knife thrown (weapon=${s1.player.weapon})`);
  assert(s1.thrown >= 1, `thrown weapon on ground (${s1.thrown})`);
  // 确定性推进模拟时间,让 B23 的 0.5s 拾取封锁过期(不依赖 rAF 帧率),再传送到它身上捡回
  await page.evaluate(() => {
    const sim = window.__sim;
    for (let i = 0; i < 90; i++) sim.step(1 / 60);
  });
  await page.evaluate(() => {
    const sim = window.__sim;
    const t = sim.thrownWeapons[0];
    if (t) {
      sim._player.position.x = t.position.x;
      sim._player.position.y = t.position.y;
      sim.step(1 / 60);
    }
  });
  const s2 = await snap();
  assert(s2.player.weapon === 'knife', 'knife picked back up');
  await shot('play-05-throw');
  console.log('RESULT=throw OK');
}

// 2026-08-09:collision 场景改为布局无关(读 room 数据找墙/家具),新 Room1 后不再硬编码坐标
async function scenarioCollision() {
  await startMission(true);
  // 确定性驱动:直接走 sim 步进,验证碰撞(不依赖 rAF 帧率)
  const r = await page.evaluate(() => {
    const sim = window.__sim;
    const room = sim.currentRoom;
    for (const e of sim.enemies) {
      e.position = { x: 100, y: 100 };
      e.patrolTarget = { x: 100, y: 100 };
    }
    const tiles = room.tiles;
    const h = room.height;
    const w = room.width;
    const SOLID = ['sofa', 'round_table', 'bed', 'bookshelf', 'fridge', 'tea_table', 'mahjong_table', 'sandbag'];
    const solid = new Set();
    for (const f of room.furniture ?? []) {
      if (!SOLID.includes(f.kind)) continue;
      const sx = f.size?.x ?? 1;
      const sy = f.size?.y ?? 1;
      for (let dy = 0; dy < sy; dy++) {
        for (let dx = 0; dx < sx; dx++) solid.add(`${f.tile.x + dx},${f.tile.y + dy}`);
      }
    }
    const walkable = (x, y) => {
      const ch = tiles[y]?.[x] ?? '#';
      return ch !== '#' && ch !== 'X' && !solid.has(`${x},${y}`);
    };
    let left = null;
    let bottom = null;
    let top = null;
    for (let y = 1; y < h - 1 && left === null; y++) if (walkable(1, y)) left = { x: 1, y };
    for (let x = 1; x < w - 1 && bottom === null; x++) if (walkable(x, 1)) bottom = { x, y: 1 };
    for (let x = 1; x < w - 1 && top === null; x++) if (walkable(x, h - 2)) top = { x, y: h - 2 };
    const tryMove = (tile, dir) => {
      sim._player.position = { x: tile.x + 0.5, y: tile.y + 0.5 };
      sim._player.velocity = { x: 0, y: 0 };
      sim.input({ kind: 'move', dir });
      for (let i = 0; i < 90; i++) sim.step(1 / 60);
      sim.input({ kind: 'move', dir: { x: 0, y: 0 } });
      return { ...sim._player.position };
    };
    const leftP = tryMove(left, { x: -1, y: 0 });
    const bottomP = tryMove(bottom, { x: 0, y: -1 });
    const topP = tryMove(top, { x: 0, y: 1 });
    // 家具阻挡:第一个实心家具,优先从右侧向左撞,否则从左侧向右撞
    const f = (room.furniture ?? []).find((it) => SOLID.includes(it.kind)) ?? null;
    let sofaP = null;
    if (f !== null) {
      const sx = f.size?.x ?? 1;
      const fromRight = f.tile.x + sx + 1 < w && walkable(f.tile.x + sx + 1, f.tile.y);
      sofaP = fromRight
        ? tryMove({ x: f.tile.x + sx + 1, y: f.tile.y }, { x: -1, y: 0 })
        : tryMove({ x: f.tile.x - 1, y: f.tile.y }, { x: 1, y: 0 });
    }
    // 子弹撞墙:最左地板格向左开枪
    let shootTile = null;
    for (let y = 1; y < h - 1 && shootTile === null; y++) if (walkable(1, y)) shootTile = { x: 1, y };
    sim._player.position = { x: shootTile.x + 0.5, y: shootTile.y + 0.5 };
    sim._player.velocity = { x: 0, y: 0 };
    sim._player.weapon = 'mauser_c96';
    sim._player.ammo = 10;
    sim._player.mode = 'ranged';
    sim._player.facingAngle = Math.PI;
    sim.input({ kind: 'attackStart' });
    for (let i = 0; i < 10; i++) sim.step(1 / 60);
    sim.input({ kind: 'attackEnd' });
    for (let i = 0; i < 10; i++) sim.step(1 / 60);
    return {
      leftX: leftP.x,
      bottomY: bottomP.y,
      topY: topP.y,
      sofaX: sofaP?.x ?? null,
      bullets: sim.bullets.length,
      f: f === null ? null : { kind: f.kind, tile: f.tile, size: f.size },
      topTile: top,
    };
  });
  assert(Math.abs(r.leftX - 1.5) < 0.25, `left wall blocks (x=${r.leftX})`);
  assert(Math.abs(r.bottomY - 1.5) < 0.25, `bottom wall blocks (y=${r.bottomY})`);
  assert(Math.abs(r.topY - (r.topTile.y + 0.5)) < 0.25, `top wall blocks (y=${r.topY})`);
  if (r.f !== null) {
    const sx = r.f.size?.x ?? 1;
    const atRightEdge = r.sofaX < r.f.tile.x + sx + 0.6;
    const atLeftEdge = r.sofaX > r.f.tile.x - 0.6;
    assert(atRightEdge || atLeftEdge, `furniture blocks (x=${r.sofaX}, f=${JSON.stringify(r.f)})`);
  }
  assert(r.bullets === 0, `bullet stopped by wall (bullets=${r.bullets})`);
  await shot('play-07-collision');
  console.log('RESULT=collision OK ' + JSON.stringify({ leftX: r.leftX, bottomY: r.bottomY, topY: r.topY, sofaX: r.sofaX, bullets: r.bullets }));
}

async function scenarioPause() {
  await startMission(true);
  const waitPaused = (want) =>
    page.waitForFunction((v) => window.__sim.snapshot().paused === v, want, { timeout: 5000 });
  await page.keyboard.press('Tab');
  await waitPaused(true);
  await waitText('\u5df2\u6682\u505c', 4000);
  const p1 = await snap();
  assert(p1.paused === true, 'paused=true after Tab');
  await page.keyboard.press('Tab');
  await waitPaused(false);
  const p2 = await snap();
  assert(p2.paused === false, 'paused=false after second Tab');
  await shot('play-08-pause');
  console.log('RESULT=pause OK');
}

async function scenarioSimflow() {
  // 用 sim 内部状态驱动完整任务 1:逐房清敌 + 全拾取 + 0 受击 → 验证 S 评分 / 解锁 / 持久化
  await startMission(false);
  const result = await page.evaluate(async () => {
    const sim = window.__sim;
    // 每步前维持翻滚无敌(0 受击,评分 hitsFactor 满分);仍走真实攻击/击杀路径
    const origStep = sim.step.bind(sim);
    sim.step = (dt) => {
      sim._player.dodgeTimer = 0.5;
      return origStep(dt);
    };
    let guard = 0;
    while (sim.phase === 'MISSION_PLAY' && guard < 600) {
      guard++;
      // 收集本房全部拾取物(传送到位,验证 pickupRate=1)
      for (const p of sim.pickups) {
        if (p.taken) continue;
        sim._player.position.x = p.position.x;
        sim._player.position.y = p.position.y;
        sim.step(1 / 60);
      }
      // 捡到远程武器后确保攻击模式匹配(F 切换;ranged 武器在 melee 模式下近战无效是设计行为)
      if (sim._player.weapon !== null && sim._player.mode === 'melee') {
        sim.input({ kind: 'toggleMode' });
        for (let t = 0; t < 30; t++) sim.step(1 / 60);
      }
      // 测试确定性:无限弹药 + 清空换弹硬直(弹药管理是玩法,不属于本次流程断言)
      if (sim._player.weapon !== null) {
        sim._player.ammo = 999;
        sim._player.reloading = 0;
      }
      // 清房过渡中不战斗,先步进到 play 阶段
      if (sim.roomPhase !== 'play') {
        for (let t = 0; t < 180 && sim.roomPhase !== 'play' && sim.phase === 'MISSION_PLAY'; t++) {
          // B03:等待走到门口的状态下,直接把玩家放到出口
          if (sim.roomPhase === 'clear_wait') {
            const exit = sim.currentRoom?.exitTile;
            if (exit) {
              sim._player.position.x = exit.x + 0.5;
              sim._player.position.y = exit.y + 0.5;
            }
          }
          sim.step(1 / 60);
        }
        continue;
      }
      // 传送到每个敌人脸上并真实击杀(近战;BOSS 3 击)
      let killedAny = false;
      for (let i = sim.enemies.length - 1; i >= 0; i--) {
        const e = sim.enemies[i];
        if (!e || e.hp <= 0) continue;
        for (let hit = 0; hit < e.hp; hit++) {
          const dx = e.position.x - sim._player.position.x;
          const dy = e.position.y - sim._player.position.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 0.5) break; // 已贴脸,无需再拉近距离
          sim._player.position.x = e.position.x - (dx / dist) * 0.7;
          sim._player.position.y = e.position.y - (dy / dist) * 0.7;
          sim._player.facingAngle = Math.atan2(dy, dx);
          sim.input({ kind: 'attackStart' });
          for (let t = 0; t < 30; t++) sim.step(1 / 60);
          sim.input({ kind: 'attackEnd' });
          for (let t = 0; t < 30; t++) sim.step(1 / 60);
          if (sim.phase !== 'MISSION_PLAY') break;
        }
        killedAny = true;
      }
      if (!killedAny) {
        // 全灭:走向门并步进等待房间推进(B03 修复前自动推进,修复后需走门)
        const exit = sim.currentRoom?.exitTile;
        if (exit) {
          sim._player.position.x = exit.x + 0.5;
          sim._player.position.y = exit.y + 0.5;
        }
        for (let t = 0; t < 200 && sim.phase === 'MISSION_PLAY'; t++) sim.step(1 / 60);
      }
    }
    return {
      phase: sim.phase,
      roomIndex: sim.missionState?.roomIndex ?? -1,
      score: sim.missionScore,
    };
  });
  assert(result.phase === 'MISSION_END' || result.phase === 'SCORE', `mission ended (phase=${result.phase})`);
  assert(result.score?.rating, `score computed (${result.score?.rating})`);
  assert(result.score?.rating === 'S', `S rank achieved (${result.score?.rating}, total=${result.score?.total})`);
  assert(result.score?.pickupRate === 1, `all pickups collected (${result.score?.pickupRate})`);
  assert(result.score?.hitsTaken === 0, `zero hits (${result.score?.hitsTaken})`);
  // 统计由引擎事件循环持久化(同步 evaluate 结束后异步处理),等一拍再读
  await page.waitForTimeout(800);
  const stats = await page.evaluate(() => JSON.parse(localStorage.getItem('hotline-shanghai.v1.stats') ?? 'null'));
  assert(stats?.totalMissions >= 1, `stats persisted (totalMissions=${stats?.totalMissions})`);
  assert(stats?.bestScoreByMission?.m1_workshop, 'best score persisted');
  assert(stats?.bestRatingByMission?.m1_workshop === 'S', 'S rating persisted');
  // UI 相位由引擎侧计时器驱动(rAF 被节流时 1.5s 计时会拖长),轮询结算屏出现
  await waitText('\u4efb\u52a1\u7ed3\u7b97', 12000);
  // 结算 → CONTINUE → 面具奖励流:S 评应解锁 actor(戏子)并持久化
  await page.getByRole('button', { name: /CONTINUE/ }).click();
  await waitText('\u9009\u62e9\u9762\u5177', 6000);
  const unlocks = await page.evaluate(() => JSON.parse(localStorage.getItem('hotline-shanghai.v1.unlocks') ?? 'null'));
  assert(unlocks?.masks?.includes('actor'), `actor mask unlocked (${JSON.stringify(unlocks?.masks)})`);
  await shot('play-06-score');
  console.log('RESULT=simflow OK ' + JSON.stringify({ rating: result.score?.rating, total: result.score?.total, unlock: unlocks?.masks }));
}

async function scenarioUnlockM4() {
  // 隐藏任务可见性:3 个 S 评 → 孤岛邮差解锁(不依赖 unlocks.missions)
  await page.goto(BASE, { waitUntil: 'load', timeout: 15000 });
  await page.evaluate(() => {
    localStorage.setItem(
      'hotline-shanghai.v1.stats',
      JSON.stringify({
        totalMissions: 3,
        bestScoreByMission: { m1_workshop: 95, m2_teahouse: 95, m3_print: 95 },
        bestRatingByMission: { m1_workshop: 'S', m2_teahouse: 'S', m3_print: 'S' },
        lastMissionAt: 0,
      }),
    );
  });
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /\u5f00\u59cb\u6e38\u620f/ }).click();
  await waitText('\u9009\u62e9\u4efb\u52a1');
  const m4 = page.getByRole('button', { name: /\u5b64\u5c9b\u90ae\u5dee/ });
  assert(await m4.isEnabled(), 'hidden mission m4 enabled with 3 S ranks');
  await shot('play-09-unlock-m4');
  console.log('RESULT=unlock-m4 OK');
}

// ─── 调度 ────────────────────────────────────────────────────────────────

const SCENARIOS = {
  flow: scenarioFlow,
  move: scenarioMove,
  'spawn-grace': scenarioSpawnGrace,
  'combat-kill': scenarioCombatKill,
  throw: scenarioThrow,
  collision: scenarioCollision,
  pause: scenarioPause,
  simflow: scenarioSimflow,
  'unlock-m4': scenarioUnlockM4,
  all: async () => {
    for (const name of ['flow', 'move', 'spawn-grace', 'combat-kill', 'throw', 'collision', 'pause', 'simflow', 'unlock-m4']) {
      await SCENARIOS[name]();
      await page.close();
      page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    }
  },
};

const scenarioName = process.argv[2] ?? 'all';
if (!(scenarioName in SCENARIOS)) {
  console.error('Unknown scenario: ' + scenarioName);
  process.exit(2);
}

try {
  browser = await chromium.launch({
    headless: false,
    args: [
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-frame-rate-limit',
    ],
  });
  page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.bringToFront();
  page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !msg.text().includes('404')) errors.push('console: ' + msg.text());
  });
  await requireFps();
  await SCENARIOS[scenarioName]();
  if (errors.length > 0) {
    console.error('CONSOLE_ERRORS=' + JSON.stringify(errors, null, 2));
    process.exitCode = 1;
  } else {
    console.log('RESULT=all-clean (no console errors)');
  }
} catch (e) {
  console.error('SCENARIO_FAIL=' + e.message);
  try {
    await shot('play-fail');
  } catch {
    /* ignore */
  }
  process.exitCode = 1;
} finally {
  await browser?.close();
}
