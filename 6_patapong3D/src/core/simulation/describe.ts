/**
 * core/simulation/describe.ts — world-as-text 描述(用于 __gameManifest())
 *
 * M1.3 由 agent-core 实现。
 */

import type { Simulation } from './Simulation';

export function describeWorld(sim: Simulation): string {
  return sim.describeWorld();
}

export function describeRules(_sim: Simulation): string {
  return 'TODO M1.3: 物理常量表';
}

export function describeEntities(_sim: Simulation): string {
  return 'TODO M1.3: 实体 ID 列表';
}
