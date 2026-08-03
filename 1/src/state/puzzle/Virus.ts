// Computer Virus puzzle: route an alien program through a network while Earth isolates nodes.
// Functional MVP implementation per GDD §9.3.

import type { PuzzleState, PuzzleInput, PuzzleUpdate } from './Puzzle.js';
import { emptyOutcome } from './Puzzle.js';
import type { PuzzleOutcome } from '../types.js';
import { createRng, type RNG } from '../rng.js';

interface VirusData {
  rng: RNG;
  nodes: VirusNode[];
  cursor: number;          // current node index
  captured: number;
  detection: number;       // 0..100
  trace: number;           // 0..100, rises while player moves
  winAt: number;
}

interface VirusNode {
  id: number;
  type: 'gateway' | 'data' | 'security' | 'firewall' | 'core';
  x: number;
  y: number;
  connections: number[];
  captured: boolean;
}

export function initVirus(id: string, seed: number, timer: number): PuzzleState {
  const rng = createRng(seed);
  const nodes: VirusNode[] = [];
  // Build a simple chain of 8 nodes
  for (let i = 0; i < 8; i++) {
    nodes.push({
      id: i,
      type: i === 0 ? 'gateway' : i === 7 ? 'core' : (i % 2 === 1 ? 'security' : 'data'),
      x: (i % 4) * 0.3 + 0.05,
      y: Math.floor(i / 4) * 0.5 + 0.25,
      connections: i < 7 ? [i + 1] : [],
      captured: false,
    });
  }
  nodes[0]!.captured = true;
  return {
    id,
    kind: 'virus',
    remaining: timer,
    success: null,
    outcome: null,
    data: {
      rng,
      nodes,
      cursor: 0,
      captured: 1,
      detection: 0,
      trace: 0,
      winAt: 8,
    } satisfies VirusData,
  };
}

export const updateVirus: PuzzleUpdate = (state, dt, input, detectionBoost = 1) => {
  const data = state.data as unknown as VirusData;
  data.trace = Math.min(100, data.trace + 4 * dt);
  data.detection = Math.min(100, data.detection + 2 * dt * detectionBoost);

  // Capture current node if input
  if (input.primary) {
    const node = data.nodes[data.cursor]!;
    if (!node.captured) {
      if (node.type === 'security' && data.detection < 60) {
        // block
      } else {
        node.captured = true;
        data.captured++;
      }
    } else {
      // advance to next
      const next = node.connections[0];
      if (typeof next === 'number') {
        data.cursor = next;
      }
    }
  }

  if (input.secondary) {
    // stealth: reduces trace
    data.trace = Math.max(0, data.trace - 30 * dt);
  }

  // Win condition
  if (data.captured >= data.winAt) {
    const outcome: PuzzleOutcome = { ...emptyOutcome(), networkDelta: 25, unityDelta: -2 };
    state.success = true;
    state.outcome = outcome;
  }
  // Lose conditions
  if (data.detection >= 100 || state.remaining <= 0) {
    state.success = false;
    state.outcome = { ...emptyOutcome(), networkDelta: data.captured >= 4 ? 5 : 0 };
  }
  state.remaining -= dt;
  return state;
};