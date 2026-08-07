// core/types.ts — V2 冻结契约（平台纯净层，禁止导入 three/react/zustand/DOM）

export interface Vector3 { x: number; y: number; z: number; }

// ============ 全局 FSM ============
export type GamePhase =
  | 'MENU'
  | 'WAIT'
  | 'SENSE'
  | 'PERFORM'
  | 'EVALUATE'
  | 'DIARY'
  | 'ENDING_NORMAL'
  | 'ENDING_HIDDEN'
  | 'PAUSE';

export type PerformMode = 'scripted' | 'freePlay';
export type EndingVariant = 'curtainA' | 'curtainB' | 'early' | 'hidden';

// ============ Boss 内部 FSM ============
export type BossInnerState =
  | 'IDLE' | 'ALERT' | 'PERFORM' | 'HIT' | 'RECOVER'
  | 'BREAK_CHARACTER' | 'EVALUATE';

// ============ 焦虑 / 评分 ============
export type AnxietyBand = 'calm' | 'nervous' | 'shaky' | 'panic';
export type AttackJudgement = 'perfect' | 'good' | 'normal' | 'miss';
export type AudienceReaction = 'cheer' | 'heckle' | 'mock';
export type Verdict = 'perfect' | 'qualified' | 'fail';
export type RatingAxisId = 'mobility' | 'delivery' | 'visual' | 'remembered';

// ============ 内容 / 剧本 ============
export type ScriptId = 'dignity' | 'tragic' | 'mad' | 'freePlay';
export type BeatType = 'move' | 'attack' | 'line' | 'vfx';

// ============ 事件载荷类型 ============
export type SoundKind =
  | 'step' | 'throneCreak' | 'armorRattle' | 'swordSwing' | 'swordDrop'
  | 'impact' | 'dodgeWhiff' | 'paper' | 'breath' | 'gong'
  | 'piano' | 'stringTremolo' | 'barrageWhoosh' | 'silence'
  | 'heartbeat' | 'perfectHit' | 'goodHit' | 'normalHit' | 'missHit'
  | 'crowdChatter' | 'crowdBurst' | 'swordClash' | 'cameraShutter';
export type FxKind = 'bloomPulse' | 'vignette' | 'screenFlash' | 'shake' | 'lightSweep' | 'dust' | 'sparkle' | 'hitStop';
export type BossAnimKind =
  | 'idleSway' | 'armorFiddle' | 'standUp' | 'swordRaise' | 'attack'
  | 'knockdown' | 'hairTidy' | 'breakCharacter' | 'kneelPanic' | 'pickUpSword' | 'bow' | 'windup';
export type MusicMode = 'calm' | 'tense' | 'freeplay' | 'ending';
export type Speaker = 'boss' | 'system' | 'audience';

// ============ 持久化键 ============
export type StorageKey = 'diary' | 'archive' | 'stats' | 'settings';
export const STORAGE_KEY: Record<StorageKey, string> = {
  diary: 'bossAnxiety.v2.diary',
  archive: 'bossAnxiety.v2.archive',
  stats: 'bossAnxiety.v2.stats',
  settings: 'bossAnxiety.v2.settings',
} as const;

// ============ 实体接口 ============

export interface BossState {
  id: 'boss';
  innerState: BossInnerState;
  pos: Vector3;
  rot: Vector3;
  facingYaw: number;            // V2：面向 yaw（走位时面向移动方向 / 目标）
  hp: number;
  maxHp: number;
  anxiety: number;              // 0-100 隐藏值
  seen: number;                 // 被看见度 0-100（A4 轴，灯光/观众代理）
  band: AnxietyBand;
  script: ScriptId | null;
  stageIndex: number;
  beatIndex: number;
  performMode: PerformMode;
  recovering: boolean;
  knockdownCount: number;
  breakdownTimer: number;
  anim: BossAnimKind;
}

export interface PlayerPresence {
  pos: Vector3;                 // V2：替身实时位置（追赶/逃离时移动）
  approachSpeed: number;
  distanceToThrone: number;
  dodgeCount: number;
  hitsLanded: number;
  dodgeTimingQuality: 0 | 0.5 | 1;
  barrageActive: boolean;
  aggression: number;
  lingerTime: number;
  state: 'approaching' | 'engaging' | 'retreating' | 'gone';
  windup: number;               // V2：下次攻击前摇进度 0-1（出招预告）
  attacking: boolean;           // V2：正在攻击（命中结算用）
}

// ============ 输入 / 单帧命令 ============
export interface BossControls {
  move: Vector3;                // WASD 走位意图（相机相对 → 引擎转世界）
  attackPressed: boolean;
  attackHeld: boolean;
}

export type UiCommand =
  | { kind: 'scriptPick'; script: ScriptId }
  | { kind: 'ratingSubmit'; stars: Record<RatingAxisId, number> }
  | { kind: 'diaryPick'; entryId: string | null }
  | { kind: 'diaryCustom'; text: string }                     // V2：玩家打字（STRETCH_ON）
  | { kind: 'dialogueChoice'; choice: 'A' | 'B' | 'C' }
  | { kind: 'archiveFlip'; index: number }
  | { kind: 'pauseToggle' }
  | { kind: 'startRun' }
  | { kind: 'restartRun' }                                    // V2：结局重开
  | { kind: 'dialogueNext' }
  | { kind: 'quitToTitle' }
  | { kind: 'barrageToggle'; enabled: boolean }               // V2：弹幕设置
  | { kind: 'barrageDensity'; density: 'standard' | 'sparse' }
  | { kind: 'soundToggle'; enabled: boolean };

export interface TickInput {
  time: number;
  dt: number;
  player: PlayerPresence;
  controls: BossControls;
  ui: UiCommand | null;
  /** V2：引擎节奏谱每帧注入的判定结果（边沿） */
  rhythm: { judgement: AttackJudgement; early: boolean; combo: number } | null;
  /** V2：本帧是否有弹幕爆发（S07 焦虑源） */
  barrageBurst: boolean;
}

// ============ 评分 / 轮次结果 ============
export interface RatingFacts {
  stanceAccuracy: number;
  jitterRatio: number;
  lineCompleteness: number;
  forgotLines: number;
  maxCombo: number;
  perfectCount: number;         // V2：完美命中数（评语证据）
  stagesCompleted: number;
  lingerTime: number;
  barrageCount: number;
}

export interface RoundResult {
  round: number;
  script: ScriptId;
  stagesCompleted: number;
  knockdowns: number;
  broken: boolean;
  axisRatings: Record<RatingAxisId, number>;
  totalRating: number;
  verdict: Verdict;
  facts: RatingFacts;
  anxietyDelta: number;
  playerScore: number | null;
}

export interface PersistedStats {
  totalRounds: number;
  notGoodEnoughCount: number;
  seenEndings: EndingVariant[];
  lastVerdicts: Verdict[];
  bestCombo: number;            // V2：生涯最佳连击
  perfectTotal: number;         // V2：生涯完美总数
  viewerPeak: number;           // V2：生涯观众峰值
}

// ============ 内容数据接口 ============

export interface DialogueLine {
  id: string;
  text: string;
  speaker: Speaker;
  emotion?: string;
  duration?: number;
}

export interface Beat {
  type: BeatType;
  duration: number;
  targetPos?: Vector3;
  tolerance?: number;
  lineId?: string;
  vfx?: FxKind;
  power?: number;
  rhythm?: {                    // V2：attack beat 直接携带鼠标谱配置
    style: 'dignity' | 'tragic' | 'mad';
    targetCount: number;
    bpm: number;
    holdCount?: number;         // V2：长按目标数（R3+）
    movingCount?: number;       // V2：绑定替身的移动目标数（R3+）
  };
}

export interface ScriptStage { id: string; beats: Beat[]; }
export interface ScriptDef {
  id: ScriptId;
  name: string;
  difficulty: number;
  chartStyle: 'dignity' | 'tragic' | 'mad';
  stages: ScriptStage[];
}

export interface ArchiveEntry {
  id: string;
  name: string;
  lines: string[];
  generated?: boolean;
}

export interface BarrageLine {
  id: string;
  text: string;
  style: 'normal' | 'top' | 'bottom' | 'fast' | 'emoji' | 'meme' | 'sc';
  scene: string;                // 触发场景：ambient/entrance/script/move/perfect/combo/miss/forgot/knockdown/break/evaluate/ending
}

export interface DiaryEntry {
  id: string;
  text: string;
  mood: 'positive' | 'negative' | 'neutral';
  countsAsNotGoodEnough?: boolean;
}

export interface RatingAxisDef {
  id: RatingAxisId;
  label: string;
  auto: boolean;
  thresholds: Record<1 | 2 | 3 | 4 | 5, string>;
}

// ============ 世界清单 ============
export interface WorldManifest {
  roomBounds: { min: Vector3; max: Vector3 };
  thronePos: Vector3;
  stageMarkers: Vector3[];
  shadowPath: { from: Vector3; to: Vector3 };
  colliders: { center: Vector3; radius: number }[];
  lightAnchors: { candle: Vector3; spot: Vector3 };
  cameraAnchor: Vector3;        // V2：设计相机位置
}
