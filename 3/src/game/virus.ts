import type { NodeId, NodeState, RunState } from '../core/types';
import type { EventBus } from '../core/events';
import { RNG } from '../core/rng';
import { pushLog } from './propaganda';

export const NODE_IDS: NodeId[] = ['power', 'defense', 'missile', 'media', 'orbital'];

export const NODE_NAMES: Record<NodeId, string> = {
  power: 'Power Grid',
  defense: 'Defense Grid',
  missile: 'Missile Command',
  media: 'Media Net',
  orbital: 'Orbital Control',
};

export const NODE_EFFECTS: Record<NodeId, string> = {
  power: 'Disables one defense per day.',
  defense: 'All turret and fighter HP halved.',
  missile: 'Incoming nuclear missiles sabotaged.',
  media: 'All future propaganda +50%.',
  orbital: 'Orbital debris cleared (2 fewer per day).',
};

export function defaultNodes(): NodeState[] {
  return NODE_IDS.map((id) => ({ id, compromised: false }));
}

export interface Puzzle {
  pads: number;
  sequence: number[];
  timeLimit: number;
}

export function generatePuzzle(seed: number, node: NodeId, day: number, cortexBonus: number): Puzzle {
  const rng = new RNG(seed ^ hash(node));
  const difficulty = Math.min(4 + day, 8);
  const pads = 4 + Math.floor(day / 3);
  const len = 3 + Math.floor(difficulty / 2);
  const sequence: number[] = [];
  for (let i = 0; i < len; i++) sequence.push(rng.int(0, pads - 1));
  return { pads, sequence, timeLimit: 8 + difficulty * 1.2 + cortexBonus };
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function checkPuzzle(puzzle: Puzzle, input: number[]): boolean {
  if (input.length !== puzzle.sequence.length) return false;
  return input.every((v, i) => v === puzzle.sequence[i]);
}

export function compromise(run: RunState, nodeId: NodeId, bus: EventBus): void {
  const node = run.nodes.find((n) => n.id === nodeId);
  if (!node || node.compromised) return;
  node.compromised = true;
  switch (nodeId) {
    case 'power':
      run.autoDisables += 1;
      break;
    case 'defense':
      run.profile.defenseHpMod -= 0.3;
      break;
    case 'missile':
      run.missileSabotaged = true;
      break;
    case 'media':
      run.profile.propagandaMult += 0.5;
      break;
    case 'orbital':
      break;
  }
  bus.emit('node:compromised', { id: nodeId });
  pushLog(run, `${NODE_NAMES[nodeId]} compromised: ${NODE_EFFECTS[nodeId]}`, bus);
}

export function shutdownCount(run: RunState): number {
  return run.nodes.filter((n) => n.compromised).length;
}
