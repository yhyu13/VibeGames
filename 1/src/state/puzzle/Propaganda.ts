// Propaganda Network puzzle: deploy messages through a shifting social graph.
// Functional MVP implementation per GDD §9.2.

import type { PuzzleState, PuzzleInput, PuzzleUpdate } from './Puzzle.js';
import { emptyOutcome } from './Puzzle.js';
import type { PuzzleOutcome } from '../types.js';
import { createRng, type RNG } from '../rng.js';

interface PropagandaData {
  rng: RNG;
  audiences: PropagandaAudience[];
  selectedIndex: number;
  deployedMessages: string[];
  counterHits: number;
}

interface PropagandaAudience {
  id: number;
  name: string;
  resists: 'fear' | 'hope' | 'division' | 'proof';
  accepts: 'fear' | 'hope' | 'division' | 'proof';
  converted: boolean;
}

const MESSAGE_KINDS: ReadonlyArray<'fear' | 'hope' | 'division' | 'proof'> = ['fear', 'hope', 'division', 'proof'];

export function initPropaganda(id: string, seed: number, timer: number): PuzzleState {
  const rng = createRng(seed);
  const audiences: PropagandaAudience[] = [];
  for (let i = 0; i < 6; i++) {
    const k = MESSAGE_KINDS[i % 4]!;
    audiences.push({
      id: i,
      name: `Audience ${i + 1}`,
      resists: k,
      accepts: MESSAGE_KINDS[(i + 2) % 4]!,
      converted: false,
    });
  }
  return {
    id,
    kind: 'propaganda',
    remaining: timer,
    success: null,
    outcome: null,
    data: {
      rng,
      audiences,
      selectedIndex: 0,
      deployedMessages: [],
      counterHits: 0,
    } satisfies PropagandaData,
  };
}

export const updatePropaganda: PuzzleUpdate = (state, dt, input, detectionBoost = 1) => {
  const data = state.data as unknown as PropagandaData;
  // Propaganda uses counter_hits as its detection proxy; cyber-hunter accelerates it.
  if (detectionBoost > 1) {
    data.counterHits = Math.min(100, data.counterHits + 0.5 * dt * (detectionBoost - 1));
  }

  if (input.primary) {
    const aud = data.audiences[data.selectedIndex]!;
    if (!aud.converted) {
      const msg = aud.accepts;
      aud.converted = true;
      data.deployedMessages.push(msg);
      // If we used their resist kind recently, counter-hit
      if (data.deployedMessages.length > 1 && data.deployedMessages[data.deployedMessages.length - 2] === aud.resists) {
        data.counterHits++;
      }
    }
  }

  if (input.secondary) {
    data.selectedIndex = (data.selectedIndex + 1) % data.audiences.length;
  }

  // Win condition: convert >= 4 audiences
  const converted = data.audiences.filter((a) => a.converted).length;
  if (converted >= 4) {
    const outcome: PuzzleOutcome = {
      ...emptyOutcome(),
      resolveDelta: -8,
      unityDelta: -6,
      panicDelta: 4,
    };
    state.success = true;
    state.outcome = outcome;
  }
  if (data.counterHits >= 4 || state.remaining <= 0) {
    state.success = false;
    state.outcome = { ...emptyOutcome(), resolveDelta: -2 };
  }
  state.remaining -= dt;
  return state;
};