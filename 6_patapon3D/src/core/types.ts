/**
 * core/types.ts — v2.0 冻结契约(参见 TDD §5)
 *
 * v2.0 divine-drums:timing-only 判定 + 4 拍命令语法(10 条)+ 3 单位军队 vs
 * 1 个 boss(Moloch)。任何变更走 TDD §0 流程:changelog + 通知 +
 * `[TDD-CONTRACT-CHANGE]` commit。
 *
 * 硬规则:此文件**禁止** import three / react / zustand / 任何 DOM API。
 */

// ─── 基础类型 ───

/** 三维向量(单位 / boss / 粒子 / 相机位置) */
export type Vec3 = { x: number; y: number; z: number };

/** 全局 FSM(冻结字符串字面量;READY 声明保留但当前流程不用:MENU -> SONG -> MATCH_OVER) */
export const GamePhase = {
  MENU: 'MENU',
  READY: 'READY',
  SONG: 'SONG',
  MATCH_OVER: 'MATCH_OVER',
} as const;
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

/** 对战双方(玩家军队 / boss) */
export type Side = 'P1' | 'BOSS';

/** 4 条鼓道(0=PATA 1=PON 2=DON 3=CHAKA;glyph 装饰用,判定 timing-only) */
export type Lane = 0 | 1 | 2 | 3;

/** 鼓名(冻结,TDD §5) */
export type NoteType = 'PATA' | 'PON' | 'DON' | 'CHAKA';

/** 判定分值(冻结:PERFECT 300 / GOOD 100 / NORMAL 50 / MISS 0) */
export type Judgement = 300 | 100 | 50 | 0;

/** 10 条命令(冻结,TDD §5 / GDD §3) */
export type CommandName =
  | 'MARCH'
  | 'ATTACK'
  | 'DEFEND'
  | 'CHARGE'
  | 'RALLY'
  | 'VOLLEY'
  | 'RETREAT'
  | 'BERSERK'
  | 'HEAVY'
  | 'MIRACLE';

/** boss 攻击(冻结,TDD §5) */
export type BossAttack = 'SWIPE' | 'SLAM' | 'FIREBALL';

// ─── 实体 ───

/** 军队单位瞬时状态(渲染姿态由 state + stateTimeLeft + squashAmount 驱动) */
export type UnitState =
  | 'idle'
  | 'march'
  | 'attack'
  | 'charge'
  | 'heavy'
  | 'volley'
  | 'defend'
  | 'retreat'
  | 'hit'
  | 'defeat';

export interface Unit {
  id: string;
  side: Side;
  hp: number;
  maxHp: number;
  position: Vec3;
  state: UnitState;
  stateTimeLeft: number;
  /** 1 = 正常;>1 = 压扁回弹中(引擎映射到 matrix) */
  squashAmount: number;
  /** 查 core/data/patapons.ts 的 character 模板 id */
  characterId: string;
}

export interface ArmyState {
  units: Unit[];
  /** 阵型世界 X(MARCH/RETREAT 移动;单位 position 由此派生) */
  formationOffset: number;
  /** 剩余减半回合(DEFEND) */
  defendTurns: number;
  /** 剩余闪避回合(RETREAT) */
  retreatTurns: number;
  /** 剩余双倍伤害回合(BERSERK) */
  berserkTurns: number;
  lastCommand: CommandName | null;
}

/** boss 瞬时状态(telegraph 期间 state='telegraph' 且 telegraph 字段持有攻击种类) */
export type BossStateKind = 'idle' | 'telegraph' | 'attack' | 'hit';

export interface BossState {
  hp: number;
  maxHp: number;
  position: Vec3;
  state: BossStateKind;
  stateTimeLeft: number;
  /** 已预告、将于下个命令结算时落地的攻击(null = 无预告) */
  telegraph: BossAttack | null;
  enraged: boolean;
  attackCount: number;
  squashAmount: number;
}

// ─── 节奏 ───

/** 谱面音符:time 为命中时刻(s),type 为装饰 glyph,status 由判定推进 */
export interface BeatNote {
  time: number;
  type: NoteType;
  status: 'pending' | 'hit' | 'miss';
}

export interface RhythmState {
  /** 当前歌曲已进行时间(s,fever slow-mo 下走 sim dt) */
  songTime: number;
  songIndex: number;
  /** SONG_COUNT 张谱面,每张 SONG_DURATION_S 秒 */
  charts: BeatNote[][];
  /** 当前待判定音符下标(命中/过期都会推进) */
  activeNoteIndex: number;
  noteScrollSpeed: number;
  /** 当前命令已积累的鼓名(0..COMMAND_LENGTH) */
  commandBeats: NoteType[];
  /** 与 commandBeats 对齐的判定(quality = 平均映射) */
  commandJudgements: Judgement[];
  combo: number;
  maxCombo: number;
}

// ─── Fever ───

export interface FeverState {
  active: boolean;
  /** slow-mo 因子(只影响 sim dt,音频不受影响) */
  factor: number;
  timeLeft: number;
  damageMult: number;
  /** 触发层级(0..FEVER_TRIGGERS.length-1) */
  level: number;
}

// ─── Juice / 性能 ───

export type PerfDegradation = 'PARTICLE_BURST_HALF' | 'BLOOM_OFF';

// ─── SFX(冻结,与 core/data/sfx.ts 的 15 个 recipe 一一对应) ───

export type SfxId =
  | 'pata'
  | 'pon'
  | 'don'
  | 'chaka'
  | 'pataPata'
  | 'pata3'
  | 'pataPataPong'
  | 'feverStart'
  | 'audienceCheer'
  | 'commandResolve'
  | 'bossRoar'
  | 'bossHit'
  | 'win'
  | 'lose'
  | 'bgPad';

// ─── 模拟事件(冻结 union,TDD §5;core 唯一副作用出口) ───

export type SimEvent =
  | { type: 'songStart'; payload: { songIndex: number } }
  | { type: 'songEnd'; payload: { songIndex: number } }
  | { type: 'beatHit'; payload: { type: NoteType; judgement: Judgement; combo: number } }
  | { type: 'playerMiss'; payload: { type: NoteType | null } }
  | { type: 'commandResolved'; payload: { command: CommandName; quality: number } }
  | { type: 'commandFailed'; payload: { sequence: NoteType[] } }
  | { type: 'bossTelegraph'; payload: { attack: BossAttack } }
  | { type: 'bossAttack'; payload: { attack: BossAttack; damage: number; dodged: boolean } }
  | { type: 'bossHit'; payload: { damage: number; hp: number } }
  | { type: 'feverStart'; payload: { level: number; factor: number } }
  | { type: 'feverEnd'; payload: Record<string, never> }
  | { type: 'damageDealt'; payload: { target: 'boss' | 'unit'; amount: number; unitId?: string } }
  | { type: 'healApplied'; payload: { unitId: string; amount: number } }
  | { type: 'unitSquash'; payload: { unitId: string; amount: number } }
  | { type: 'cameraShake'; payload: { intensity: number; duration: number } }
  | { type: 'particleBurst'; payload: { position: Vec3; count: number; color: string } }
  | { type: 'sfx'; payload: { id: SfxId; volume: number } }
  | { type: 'audienceCheer'; payload: { intensity: 'small' | 'large' | 'max' } }
  | { type: 'matchOver'; payload: { winner: Side } }
  | { type: 'persist'; payload: { key: 'stats' | 'settings'; value: unknown } };

// ─── 场景体素(court / audience 数据文件使用) ───

export interface Voxel {
  position: Vec3;
  size: number;
  /** hex 字符串 */
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
}

export interface AudienceMember {
  id: string;
  position: Vec3;
  color: string;
  /** 0..1,引擎读出乘到 Y 偏移 */
  bounceAmount: number;
}

// ─── 模拟快照(UI / 渲染器只读这个) ───

export interface SimSnapshot {
  phase: GamePhase;
  army: ArmyState;
  boss: BossState;
  rhythm: RhythmState;
  fever: FeverState;
  perfDegradation: PerfDegradation[];
}

// ─── 配置 ───

export interface SimulationConfig {
  /** RNG seed,playtest 可复现 */
  seed: number;
  audioMuted: boolean;
  audioVolume: number;
}

// ─── UI 命令桥(与 engine/InputManager.ts 镜像) ───

export type UiCommand =
  | 'startMatch'
  | 'toMenu'
  | 'rematch'
  | 'toggleMute'
  | 'resetData'
  | 'skipIntro';

// ─── 持久化(冻结 storage shape,TDD §4.5) ───

export interface PersistedStats {
  totalMatches: number;
  p1Wins: number;
  bossWins: number;
  longestCombo: number;
  lastMatchAt: number;
}

export interface PersistedSettings {
  muted: boolean;
  volume: number;
}
