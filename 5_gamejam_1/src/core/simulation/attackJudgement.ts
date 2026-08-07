import type { AnxietyBand, AttackJudgement, AudienceReaction, ScriptId } from '../types';
import {
  ATTACK_GOOD_WINDOW_MULT,
  ATTACK_NORMAL_WINDOW_MULT,
  ATTACK_PERFECT_WINDOW,
  ATTACK_WINDOW_DIFFICULTY_REFERENCE,
  BAND_TEMPO,
  BPM_BASE,
  ROUND_TABLE,
  S_SCRIPT_DIFFICULTY,
} from '../constants';
import { clamp } from '../math';

export interface AttackWindows {
  perfect: number;
  good: number;
  normal: number;
}

export function nearestBeatOffset(time: number, tempo: number): number {
  if (!Number.isFinite(time) || !Number.isFinite(tempo) || tempo <= 0) return Infinity;
  const beatDuration = 60 / tempo;
  return Math.abs(time - Math.round(time / beatDuration) * beatDuration);
}

export function attackWindows(round: number, script: ScriptId, band: AnxietyBand): AttackWindows {
  const roundIndex = clamp(Math.trunc(round) - 1, 0, ROUND_TABLE.length - 1);
  const roundScale = ROUND_TABLE[roundIndex].attackWindowScale;
  const difficulty = S_SCRIPT_DIFFICULTY[script] ?? ATTACK_WINDOW_DIFFICULTY_REFERENCE;
  const difficultyScale = ATTACK_WINDOW_DIFFICULTY_REFERENCE / difficulty;
  const tempoScale = BPM_BASE / BAND_TEMPO[band];
  const perfect = ATTACK_PERFECT_WINDOW * roundScale * difficultyScale * tempoScale;
  return {
    perfect,
    good: perfect * ATTACK_GOOD_WINDOW_MULT,
    normal: perfect * ATTACK_NORMAL_WINDOW_MULT,
  };
}

export function judgeAttackTiming(
  time: number,
  round: number,
  script: ScriptId,
  band: AnxietyBand,
): AttackJudgement {
  const offset = nearestBeatOffset(time, BAND_TEMPO[band]);
  const windows = attackWindows(round, script, band);
  if (offset <= windows.perfect) return 'perfect';
  if (offset <= windows.good) return 'good';
  if (offset <= windows.normal) return 'normal';
  return 'miss';
}

export function attackHits(judgement: AttackJudgement, hitChance: number, rng: () => number): boolean {
  if (judgement === 'perfect') return true;
  if (judgement === 'miss') return false;
  return rng() < clamp(hitChance, 0, 1);
}

export interface AttackOutcome {
  hit: boolean;
  combo: number;
  maxCombo: number;
  reaction: AudienceReaction;
}

export function resolveAttackJudgement(
  judgement: AttackJudgement,
  hitChance: number,
  combo: number,
  maxCombo: number,
  rng: () => number,
): AttackOutcome {
  const hit = attackHits(judgement, hitChance, rng);
  const nextCombo = hit ? combo + 1 : 0;
  const reaction: AudienceReaction = judgement === 'perfect' && hit
    ? 'cheer'
    : judgement === 'miss' || !hit
      ? 'mock'
      : 'heckle';
  return { hit, combo: nextCombo, maxCombo: Math.max(maxCombo, nextCombo), reaction };
}
