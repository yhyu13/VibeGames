import { Vector3 } from '../types';

/** 平台无关的仿真事件 — 由 Simulation 发出，由适配层（渲染/音频/UI）消费。 */
export type SoundKind =
  | 'shoot'
  | 'hit'
  | 'explosion'
  | 'dodge'
  | 'special'
  | 'specialAnnounce'
  | 'glitch'
  | 'bossWarning'
  | 'bossAnnounce';

export type SimEvent =
  | { type: 'sound'; sound: SoundKind; param?: string; freq?: number }
  | { type: 'explosion'; pos: Vector3; color: string; size: number }
  | { type: 'fx'; fx: 'edgePulse' | 'timeDilation' | 'shake'; value?: number };
