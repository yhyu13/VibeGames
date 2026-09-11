import { COMMANDS, lookupCommand, reachableCommands } from '../src/core/data/commands.js';
import { BOSS_AUTO_TURN_S, COMMAND_LENGTH, FIXED_DT } from '../src/core/constants.js';
import { judgeBeat } from '../src/core/simulation/rhythm.js';
import { executeBossAttack, pickBossAttack } from '../src/core/simulation/boss.js';
import { Simulation } from '../src/core/simulation/Simulation.js';
import { makeRng } from '../src/core/math.js';
import type { ArmyState, BossState, NoteType } from '../src/core/types.js';

declare const process: { exitCode?: number };
const check = (name: string, value: boolean): void => {
  console.log(`${value ? 'PASS' : 'FAIL'} ${name}`);
  if (!value) process.exitCode = 1;
};

// ── command grammar:10 条、每条 4 拍、序列唯一;lookupCommand 双向一致 ──
check('command table has 10 rows', COMMANDS.length === 10);
check('every command is 4 beats', COMMANDS.every((c) => c.sequence.length === COMMAND_LENGTH));
check('command sequences unique', new Set(COMMANDS.map((c) => c.sequence.join(','))).size === COMMANDS.length);
check(
  'lookupCommand resolves every row',
  COMMANDS.every((c) => lookupCommand(c.sequence) === c.name),
);
check('lookupCommand rejects unknown + wrong length', lookupCommand(['DON', 'DON', 'DON', 'DON']) === null && lookupCommand(['PATA']) === null);

// ── 命令条读数:HUD 说「还可及的命令」,它必须恰是 lookupCommand 的原像 ──
// 读数比解析器宽 = 界面在承诺一条按下去会 commandFailed 的命令;比解析器窄 = 界面在藏一条
// 真能用的命令。全枚举 0..4 拍的前缀(1+4+16+64+256 = 341 个,含 256 条整句),逐个与「哪些
// 命令真能被某个 4 拍延伸解析出来」比对 —— 后者按定义直接枚举算,不经 reachableCommands,
// 否则是自证。
const NOTE_TYPES: readonly NoteType[] = ['PATA', 'PON', 'DON', 'CHAKA'];
const ALL_SEQUENCES: NoteType[][] = [];
for (let code = 0; code < NOTE_TYPES.length ** COMMAND_LENGTH; code++) {
  const seq: NoteType[] = [];
  let rest = code;
  for (let i = 0; i < COMMAND_LENGTH; i++) {
    seq.push(NOTE_TYPES[rest % NOTE_TYPES.length]!);
    rest = Math.floor(rest / NOTE_TYPES.length);
  }
  ALL_SEQUENCES.push(seq);
}
const ALL_PREFIXES: NoteType[][] = [];
for (let len = 0; len <= COMMAND_LENGTH; len++) {
  const seen = new Set<string>();
  for (const seq of ALL_SEQUENCES) {
    const prefix = seq.slice(0, len);
    const key = prefix.join(',');
    if (!seen.has(key)) {
      seen.add(key);
      ALL_PREFIXES.push(prefix);
    }
  }
}
// 枚举本身也是仪器:它少了或空了,下面那条「一致」就是对着空气断言
check('enumerated every 4-beat line and every prefix of one', ALL_SEQUENCES.length === 4 ** COMMAND_LENGTH && ALL_PREFIXES.length === 341);

/** 前缀能长成的命令(按定义枚举算,不调用 reachableCommands) */
const resolvableFrom = (prefix: readonly NoteType[]): string => {
  const names = new Set<string>();
  for (const seq of ALL_SEQUENCES) {
    if (!prefix.every((n, i) => seq[i] === n)) continue;
    const name = lookupCommand(seq);
    if (name) names.add(name);
  }
  return [...names].sort().join(',');
};
const barMismatches = ALL_PREFIXES.filter(
  (prefix) => reachableCommands(prefix).map((c) => c.name).sort().join(',') !== resolvableFrom(prefix),
);
check('command-bar readout is exactly the preimage of lookupCommand', barMismatches.length === 0);
for (const prefix of barMismatches.slice(0, 6)) {
  console.log(`  ${prefix.join(' ') || '(empty)'}: readout [${reachableCommands(prefix).map((c) => c.name).join(',')}] vs resolver [${resolvableFrom(prefix)}]`);
}

// 读数里最值钱的两句,单独钉住 —— 它们是被表算出来的,不是手抄的
check('DON never opens a command, and the bar says so', reachableCommands(['DON']).length === 0);
check('PATA opens exactly four', reachableCommands(['PATA']).map((c) => c.name).sort().join(',') === 'ATTACK,BERSERK,CHARGE,MARCH');

// ── judgeBeat 窗口边界(冻结:60/120/200ms) ──
check(
  'judgeBeat windows',
  judgeBeat(60) === 300 && judgeBeat(61) === 100 && judgeBeat(120) === 100 && judgeBeat(121) === 50 && judgeBeat(200) === 50 && judgeBeat(201) === 0,
);

// ── boss 回合模型(纯函数):defend 减半 / retreat 闪避 / enrage ×1.5 / fireball 单目标 ──
const mkArmy = (): ArmyState => ({
  units: [0, 1, 2].map((i) => ({
    id: `u${i}`, side: 'P1' as const, hp: 5, maxHp: 5,
    position: { x: -4, y: 0, z: i }, state: 'idle' as const, stateTimeLeft: 0, squashAmount: 1, characterId: 'pata-emerald',
  })),
  formationOffset: -4, defendTurns: 0, retreatTurns: 0, berserkTurns: 0, lastCommand: null,
});
const mkBoss = (telegraph: BossState['telegraph']): BossState => ({
  hp: 24, maxHp: 24, position: { x: 6, y: 0, z: 0 }, state: 'telegraph', stateTimeLeft: 0.3,
  telegraph, enraged: false, attackCount: 0, squashAmount: 1,
});

{
  const army = mkArmy(); const boss = mkBoss('SWIPE');
  const r = executeBossAttack(boss, army, makeRng(1));
  check('swipe hits all living for 1', r !== null && army.units.every((u) => u.hp === 4) && boss.telegraph === null);
}
{
  const army = mkArmy(); army.defendTurns = 1; const boss = mkBoss('SLAM');
  executeBossAttack(boss, army, makeRng(1));
  check('defend halves slam to 0.5', army.units.every((u) => u.hp === 4.5));
}
{
  const army = mkArmy(); army.retreatTurns = 1; const boss = mkBoss('SWIPE');
  const r = executeBossAttack(boss, army, makeRng(1));
  check('retreat dodges entirely', r?.dodged === true && army.units.every((u) => u.hp === 5));
}
{
  const army = mkArmy(); const boss = mkBoss('FIREBALL'); boss.enraged = true;
  executeBossAttack(boss, army, makeRng(1));
  const hit = army.units.filter((u) => u.hp < 5);
  check('enraged fireball hits exactly one for 3', hit.length === 1 && hit[0]!.hp === 2);
}
check('pickBossAttack deterministic', pickBossAttack(makeRng(7)) === pickBossAttack(makeRng(7)));

// ── 端到端:脚本化输入 → ATTACK 命令 + boss 回合;同种子同脚本 → 同快照 ──
const ATTACK_SEQ: readonly NoteType[] = ['PATA', 'PON', 'PATA', 'PON'];
const playScript = (seed: number): { sim: Simulation; events: string[] } => {
  const sim = new Simulation({ seed });
  sim.startMatch();
  sim.drainEvents();
  const events: string[] = [];
  let seqIndex = 0;
  for (let i = 0; i < 60 * 10 && seqIndex < ATTACK_SEQ.length; i++) {
    const snap = sim.snapshot();
    const note = snap.rhythm.charts[snap.rhythm.songIndex]?.[snap.rhythm.activeNoteIndex];
    if (note && snap.rhythm.songTime >= note.time) {
      sim.setP1Input({ type: ATTACK_SEQ[seqIndex]! });
      seqIndex += 1;
    }
    sim.step(FIXED_DT);
    for (const e of sim.drainEvents()) events.push(e.type);
  }
  return { sim, events };
};

{
  const { sim, events } = playScript(42);
  const snap = sim.snapshot();
  check('scripted ATTACK resolves', events.includes('commandResolved'));
  check('boss took damage', snap.boss.hp < snap.boss.maxHp && events.includes('bossHit'));
  check('boss attacked back after command', events.includes('bossAttack'));
  check('new telegraph issued', events.filter((e) => e === 'bossTelegraph').length >= 1);
  check('combo reached 4', snap.rhythm.maxCombo >= 4);
}
{
  const a = playScript(42).sim.snapshot();
  const b = playScript(42).sim.snapshot();
  check('deterministic snapshots for scripted input', JSON.stringify(a) === JSON.stringify(b));
}
{
  const sim = new Simulation({ seed: 42 });
  sim.startMatch();
  sim.drainEvents();
  let attacked = false;
  for (let i = 0; i < Math.ceil((BOSS_AUTO_TURN_S + 1) / FIXED_DT); i++) {
    sim.step(FIXED_DT);
    if (sim.drainEvents().some((e) => e.type === 'bossAttack')) attacked = true;
  }
  check('stall auto-turn fires boss attack', attacked);
}
