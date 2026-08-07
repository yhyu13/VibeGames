/**
 * engine/devtools.ts — window.__gameManifest / __sim(DEV only)
 *
 * M1.4 由 agent-engine 接入。
 */

import type { Simulation } from '../core/simulation/Simulation';
import { describeWorld, describeRules, describeEntities } from '../core/simulation/describe';

export function installDevtools(sim: Simulation): void {
  if (!import.meta.env.DEV) return;
  (window as unknown as { __sim?: Simulation }).__sim = sim;
  (window as unknown as { __gameManifest?: () => string }).__gameManifest = () => {
    return [
      '=== Patapong 3D — World Manifest ===',
      '',
      '[World]',
      describeWorld(sim),
      '',
      '[Rules]',
      describeRules(sim),
      '',
      '[Entities]',
      describeEntities(sim),
    ].join('\n');
  };
  (window as unknown as { __simEvents?: () => unknown[] }).__simEvents = () => sim.recentEvents(64);
}
