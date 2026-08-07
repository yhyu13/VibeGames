import type { AttackJudgement, AudienceReaction } from '../types';
import { BARRAGE_ACTIVE_WINDOW } from '../constants';
import { ATTACK_REACTION_LINES } from '../data/barrage';
import type { SimEvent } from './events';
import { pickBloopLine } from './dialogueEngine';

export function buildAttackFeedbackEvents(
  judgement: AttackJudgement,
  reaction: AudienceReaction,
  hit: boolean,
  combo: number,
  maxCombo: number,
  rng: () => number,
): SimEvent[] {
  const events: SimEvent[] = [];
  const pool = ATTACK_REACTION_LINES[reaction];
  if (pool.length > 0) {
    const line = pool[Math.floor(rng() * pool.length) % pool.length];
    events.push({ type: 'barrage', text: line.text, duration: BARRAGE_ACTIVE_WINDOW });
  }
  if (reaction === 'mock') {
    const line = pickBloopLine(rng);
    if (line) events.push({ type: 'dialogue', lineId: line.id, pool: 'L_BLOOP', speaker: line.speaker });
  }
  events.push({ type: 'attackJudgement', judgement, hit, combo, maxCombo, reaction });
  return events;
}
