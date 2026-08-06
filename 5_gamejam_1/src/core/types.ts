// core/types.ts — 冻结契约（TDD v1.0 §5 转写）
// 平台纯净层：禁止导入 three/react/zustand/DOM。
// 修改需走 TDD §0 冻结规则（契约变更流程）。

export interface Vector3 { x: number; y: number; z: number; }

// ============ 全局 FSM（冻结名，01 小写名见注释） ============
export type GamePhase =
  | 'MENU'            // 01: menu
  | 'WAIT'            // 01: wait
  | 'SENSE'           // 01: sense
  | 'PERFORM'         // 01: perform / freeMode（performMode 区分）
  | 'EVALUATE'        // 01: evaluate
  | 'DIARY'           // 01: diary
  | 'ENDING_NORMAL'   // 01: ending A/B/early
  | 'ENDING_HIDDEN'   // 01: hidden（⛔ stretch，STRETCH_FLAGS 门控）
  | 'PAUSE';

export type PerformMode = 'scripted' | 'freePlay';
export type EndingVariant = 'curtainA' | 'curtainB' | 'early';

// ============ Boss 内部 FSM（冻结名） ============
export type BossInnerState =
  | 'IDLE' | 'ALERT' | 'PERFORM' | 'HIT' | 'RECOVER'
  | 'BREAK_CHARACTER' | 'EVALUATE';

// ============ 焦虑 / 评分 ============
export type AnxietyBand = 'calm' | 'nervous' | 'shaky' | 'panic';
export type Verdict = 'perfect' | 'qualified' | 'fail';
export type RatingAxisId = 'mobility' | 'delivery' | 'visual' | 'remembered'; // A1..A4

// ============ 内容 / 剧本 ============
export type ScriptId = 'dignity' | 'tragic' | 'mad' | 'freePlay';
export type BeatType = 'move' | 'attack' | 'line' | 'vfx';

// ============ 事件载荷类型 ============
export type SoundKind =
  | 'step' | 'throneCreak' | 'armorRattle' | 'swordSwing' | 'swordDrop'
  | 'impact' | 'dodgeWhiff' | 'paper' | 'breath' | 'gong'
  | 'piano' | 'stringTremolo' | 'barrageWhoosh' | 'silence';
export type FxKind = 'bloomPulse' | 'vignette' | 'screenFlash' | 'shake' | 'lightSweep' | 'dust';
export type BossAnimKind =
  | 'idleSway' | 'armorFiddle' | 'standUp' | 'swordRaise' | 'attack'
  | 'knockdown' | 'hairTidy' | 'breakCharacter' | 'kneelPanic' | 'pickUpSword' | 'bow';
export type MusicMode = 'calm' | 'tense' | 'freeplay' | 'ending';
export type Speaker = 'boss' | 'system';

// ============ 持久化键（冻结键名，TDD §3.3） ============
export type StorageKey = 'diary' | 'archive' | 'stats' | 'settings';
export const STORAGE_KEY: Record<StorageKey, string> = {
  diary: 'bossAnxiety.v1.diary',
  archive: 'bossAnxiety.v1.archive',
  stats: 'bossAnxiety.v1.stats',
  settings: 'bossAnxiety.v1.settings',
} as const;

// ============ 实体接口 ============

/** BossState — 模拟权威实体，engine 按 id 调和 mesh */
export interface BossState {
  id: 'boss';
  innerState: BossInnerState;
  pos: Vector3;
  rot: Vector3;
  hp: number;
  maxHp: number;            // 100
  anxiety: number;          // 0-100，隐藏值
  seen: number;             // 被看见度 0-100（A4 轴，灯光代理）
  band: AnxietyBand;        // 派生缓存，每 tick 更新
  script: ScriptId | null;
  stageIndex: number;       // 0-2（3 阶段）
  beatIndex: number;
  performMode: PerformMode;
  recovering: boolean;      // HIT→RECOVER 子行为中
  knockdownCount: number;   // ≥3 → 提前谢幕
  breakdownTimer: number;   // 恐慌崩溃/捡剑等特殊计时
  anim: BossAnimKind;       // 当前动画请求（engine 消费）
}

/** PlayerPresence — 01 §10.2 更名，字段不变（冻结） */
export interface PlayerPresence {
  approachSpeed: number;        // 0.6-1.5 m/s（S05/S06 判定源）
  distanceToThrone: number;     // 0-40 m（Sense→Perform 转移条件）
  dodgeCount: number;           // 本轮闪避次数
  hitsLanded: number;           // 本轮命中次数
  dodgeTimingQuality: 0 | 0.5 | 1; // 完美 ±0.18s=1 / 普通 ±0.35s=0.5 / 其余 0
  barrageActive: boolean;       // 弹幕是否显示中（S07 源）
  aggression: number;           // 派生：0.5×approachSpeed + 0.5×hitRate
  lingerTime: number;           // 轮末停留秒数（A4 证据）
  state: 'approaching' | 'engaging' | 'retreating' | 'gone';
}

// ============ 输入 / 单帧命令 ============
export interface BossControls {
  move: Vector3;            // WASD 走位意图（世界方向，y=0）
  attackPressed: boolean;   // LMB 边沿触发（beat 提示圈内出招）
  attackHeld: boolean;
}
export type UiCommand =
  | { kind: 'scriptPick'; script: ScriptId }          // 1/2/3
  | { kind: 'ratingSubmit'; stars: Record<RatingAxisId, number> }
  | { kind: 'diaryPick'; entryId: string | null }
  | { kind: 'dialogueChoice'; choice: 'A' | 'B' | 'C' } // 隐藏结局链
  | { kind: 'archiveFlip'; index: number }
  | { kind: 'pauseToggle' }
  | { kind: 'startRun' }
  | { kind: 'dialogueNext' }                            // 推进对白（跳过打字机/切下一条）
  | { kind: 'quitToTitle' };                            // 结局返回标题（重置 run）

export interface TickInput {
  time: number;             // 模拟时间（秒）
  dt: number;               // 固定 1/60
  player: PlayerPresence;   // 替身快照（playerModel 采样）
  controls: BossControls;   // 人类玩家（扮演 Boss）
  ui: UiCommand | null;     // 单帧 UI 命令（边沿）
}

// ============ 评分 / 轮次结果 ============
export interface RatingFacts {
  stanceAccuracy: number;   // 站位命中率 %
  jitterRatio: number;      // 移动抖动率 %
  lineCompleteness: number; // 台词完整率 %
  forgotLines: number;      // 忘词数
  maxCombo: number;         // 最大连击
  stagesCompleted: number;  // 0-3
  lingerTime: number;       // A4 证据
  barrageCount: number;     // A4 证据
}
export interface RoundResult {
  round: number;
  script: ScriptId;
  stagesCompleted: number;
  knockdowns: number;       // 本轮击倒数
  broken: boolean;          // 是否出戏
  axisRatings: Record<RatingAxisId, number>; // 1-5
  totalRating: number;      // 四轴均值 1-5
  verdict: Verdict;
  facts: RatingFacts;
  anxietyDelta: number;     // 本轮净变化（诊断用）
  playerScore: number | null; // 玩家涂鸦 1-5（可选）
}
export interface PersistedStats {
  totalRounds: number;
  notGoodEnoughCount: number;  // 3 → 隐藏链
  seenEndings: EndingVariant[];
  lastVerdicts: Verdict[];
}

// ============ 内容数据接口（core/data — 冻结形状） ============

export interface DialogueLine {
  id: string;            // 'L_DIG_101'（前缀_编号）
  text: string;          // 中文口语化，≤2 行
  speaker: Speaker;
  emotion?: string;      // 'calm'|'nervous'|'shaky'|'panic' 带内变体
  duration?: number;     // 展示秒数，默认按字数
}

export interface Beat {
  type: BeatType;
  duration: number;             // 秒
  targetPos?: Vector3;          // move：目标站位
  tolerance?: number;           // move 判定容差（默认 0.8m，A1 用）
  lineId?: string;              // line：台词锚点
  vfx?: FxKind;                 // vfx：仪式光效
  power?: number;               // attack：威力系数
}
export interface ScriptStage { id: string; beats: Beat[]; }
export interface ScriptDef {
  id: ScriptId;
  name: string;                 // 庄重威严 / 悲情独白 / 癫狂戏剧（mad ⛔ stretch）
  difficulty: number;           // S03：8 / 12 / 18
  stages: ScriptStage[];        // 3 阶段 × 2-3 beats
}

export interface ArchiveEntry {
  id: string;            // 'L_ARCH_01' | 'L_ARCH_GEN_1'
  name: string;
  lines: string[];
  generated?: boolean;   // true = 上轮实录生成（模板填数）
}
export interface BarrageLine { id: string; text: string; }        // L_BARRAGE_*
export interface DiaryEntry {
  id: string;            // L_DIARY_01..09
  text: string;
  mood: 'positive' | 'negative' | 'neutral';  // R09 / R10 / 无修正
  countsAsNotGoodEnough?: boolean;            // 01 §6：L_DIARY_02/05/07 同计数
}
export interface RatingAxisDef {
  id: RatingAxisId;
  label: string;         // 走位流畅度 / 台词感染力 / 视觉效果 / 有没有让玩家记住
  auto: boolean;         // A4 = true（系统代填）
  thresholds: Record<1 | 2 | 3 | 4 | 5, string>; // 星级证据文案
}

// ============ 世界清单（core/world/world.ts） ============
export interface WorldManifest {
  roomBounds: { min: Vector3; max: Vector3 };   // 王座厅边界
  thronePos: Vector3;
  stageMarkers: Vector3[];   // 剧本 move 目标点（站位锚）
  shadowPath: { from: Vector3; to: Vector3 };   // 走廊→王座 影子路径
  colliders: { center: Vector3; radius: number }[]; // 立柱
  lightAnchors: { candle: Vector3; spot: Vector3 };
}
