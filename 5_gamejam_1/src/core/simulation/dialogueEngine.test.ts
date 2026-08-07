import { describe, expect, it } from 'vitest';
import { ATTACK_REACTION_LINES } from '../data/barrage';
import { LINE_POOLS } from '../data/lines';
import { pickBloopLine } from './dialogueEngine';
import { buildAttackFeedbackEvents } from './attackFeedback';

describe('attack reaction content', () => {
  it('ships three lines for every audience reaction tier', () => {
    expect(ATTACK_REACTION_LINES.cheer).toHaveLength(3);
    expect(ATTACK_REACTION_LINES.heckle).toHaveLength(3);
    expect(ATTACK_REACTION_LINES.mock).toHaveLength(3);
  });

  it('ships and selects three L_BLOOP self-deprecation lines', () => {
    expect(LINE_POOLS.BLOOP).toHaveLength(3);
    expect(pickBloopLine(() => 0)?.id).toBe('L_BLOOP_001');
    expect(pickBloopLine(() => 0.999)?.id).toBe('L_BLOOP_003');
  });

  it('emits cheer barrage and judgement for a perfect hit', () => {
    expect(buildAttackFeedbackEvents('perfect', 'cheer', true, 4, 4, () => 0)).toEqual([
      { type: 'barrage', text: '哦哦哦这剑帅！', duration: 4 },
      { type: 'attackJudgement', judgement: 'perfect', hit: true, combo: 4, maxCombo: 4, reaction: 'cheer' },
    ]);
  });

  it('emits mock barrage, L_BLOOP dialogue, and judgement for a miss', () => {
    const events = buildAttackFeedbackEvents('miss', 'mock', false, 0, 3, () => 0);
    expect(events.map((event) => event.type)).toEqual(['barrage', 'dialogue', 'attackJudgement']);
    expect(events[1]).toMatchObject({ type: 'dialogue', lineId: 'L_BLOOP_001', pool: 'L_BLOOP' });
  });
});
