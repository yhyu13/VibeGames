/**
 * core/types.ts — 冻结契约(参见 TDD §5.1)
 *
 * M1.1 由 agent-core 完成。任何后续变更走 TDD §0 流程。
 *
 * 硬规则:此文件**禁止** import three / react / zustand / 任何 DOM API
 * (C.A.T 架构硬规则,违反 = PR reject)
 *
 * 附加定义(M1.3 新增,不修改任何冻结签名):
 * - `UiCommand` — UI → 引擎命令(与 src/store.ts / engine/InputManager.ts 镜像对齐)
 */

// ─── 基础类型 ───

/** 三维向量(球拍 / 球 / 摄像机 / voxel 位置) */
export type Vec3 = { x: number; y: number; z: number };

/** 全局 FSM 状态(冻结字符串字面量) */
export const GamePhase = {
  MENU: 'MENU',
  READY: 'READY',
  PLAY: 'PLAY',
  POINT: 'POINT',
  MATCH_OVER: 'MATCH_OVER',
} as const;
export type GamePhase = (typeof GamePhase)[keyof typeof GamePhase];

/** 球拍 / 球击方 */
export type Side = 'P1' | 'AI';

// ─── 实体 ───

export interface Ball {
  position: Vec3;
  velocity: Vec3;
  /** 速度大小(u/s) */
  speed: number;
  /** 上次被哪方击中(用于撞方归因) */
  lastHitBy: Side | null;
  /** 当前 rally 累计击拍数(失分时清零) */
  rallyHits: number;
}

export interface Paddle {
  side: Side;
  position: Vec3;
  velocity: Vec3;
  /** AI 目标 Y(对 P1 不用) */
  targetY: number;
  /** 0..1,引擎读出后乘到 matrix(0 = 正常,1 = 最大 squash) */
  squashAmount: number;
  /** 查 core/data/paddles.ts 的 character 模板 id */
  characterId: string;
}

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

export interface Court {
  bounds: {
    minY: number;
    maxY: number;
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  };
  audience: AudienceMember[];
  floorVoxels: Voxel[];
  decorationVoxels: Voxel[];
}

// ─── 计分 ───

export interface Score {
  p1: number;
  ai: number;
  /** 7 */
  bestOf: number;
  /** 当前 rally 拍数(0..N) */
  rallyHits: number;
  /** 本局已触发的 milestone 阈值(避免重复触发) */
  milestonesHit: number[];
}

// ─── Juice 状态 ───

export interface JuiceState {
  cameraShake: { intensity: number; timeLeft: number };
  slowMo: { factor: number; timeLeft: number };
  paddleSquash: { P1: number; AI: number };
}

// ─── 模拟事件(详见 TDD §5.1) ───

export type SfxId =
  | 'pata'
  | 'pataPata'
  | 'pataPataPong'
  | 'pata3'
  | 'win'
  | 'lose'
  | 'audienceCheer'
  | 'bgPad';

export type SimEvent =
  | { type: 'hit'; payload: { side: Side; hitPoint: Vec3; hitForce: number } }
  | { type: 'point'; payload: { winner: Side; loserScore: number } }
  | { type: 'milestone'; payload: { hits: number; index: number } }
  | { type: 'matchOver'; payload: { winner: Side; finalScore: { p1: number; ai: number } } }
  | { type: 'paddleSquash'; payload: { side: Side; amount: number } }
  | { type: 'ballLaunch'; payload: { direction: Side } }
  | { type: 'cameraShake'; payload: { intensity: number; duration: number } }
  | { type: 'particleBurst'; payload: { position: Vec3; count: number; color: string } }
  | { type: 'sfx'; payload: { id: SfxId; volume: number } }
  | { type: 'audienceCheer'; payload: { intensity: 'small' | 'large' | 'max' } }
  | { type: 'slowmo'; payload: { factor: number; duration: number } }
  | { type: 'persist'; payload: { key: 'stats' | 'settings'; value: unknown } };

// ─── 模拟快照(UI 读这个,不是直接读 sim 内部) ───

export interface SimSnapshot {
  phase: GamePhase;
  ball: Ball;
  p1: Paddle;
  ai: Paddle;
  score: Score;
  juice: JuiceState;
  /** 调试用:当前激活的降级路径 */
  perfDegradation: PerfDegradation[];
}

export type PerfDegradation = 'PARTICLE_BURST_HALF' | 'BLOOM_OFF';

// ─── 配置 ───

export interface SimulationConfig {
  /** RNG seed,playtest 可复现 */
  seed: number;
  audioMuted: boolean;
  audioVolume: number;
}

// ─── 附加定义(非冻结契约;UI 命令桥,见 store.ts / InputManager.ts 镜像) ───

/** UI → 引擎命令(GameEngine.handleUiCommand 消费:startMatch / rematch → 开赛,toMenu → 回菜单) */
export type UiCommand = 'startMatch' | 'toMenu' | 'rematch';

// ─── 持久化 ───

export interface PersistedStats {
  totalMatches: number;
  p1Wins: number;
  aiWins: number;
  longestRally: number;
  lastMatchAt: number;
}

export interface PersistedSettings {
  muted: boolean;
  volume: number;
}
