import { describe, expect, it } from 'vitest';
import { AUDIENCE_BARRAGE_LINES } from '../data/audienceBarrage';
import type { AudienceBarrageLine } from '../data/audienceBarrage';
import { createAudienceBarrageScheduler } from './audienceBarrage';

describe('audience barrage data', () => {
  it('contains 120 lines, 25% nonsense, all scenes/styles, and three script pools', () => {
    expect(AUDIENCE_BARRAGE_LINES).toHaveLength(120);
    expect(AUDIENCE_BARRAGE_LINES.filter((line) => line.nonsense)).toHaveLength(30);
    expect(new Set(AUDIENCE_BARRAGE_LINES.map((line) => line.scene)).size).toBe(10);
    expect(new Set(AUDIENCE_BARRAGE_LINES.map((line) => line.style)).size).toBe(6);
    for (const script of ['dignity', 'tragic', 'mad']) {
      expect(AUDIENCE_BARRAGE_LINES.filter((line) => line.script === script)).toHaveLength(3);
    }
    expect(AUDIENCE_BARRAGE_LINES.slice(0, 6).map((line) => line.text)).toEqual([
      '他剑在抖！往左闪！',
      '他忘词了！趁现在快输出！',
      '别踩他披风！……算了踩了也没事。',
      '他走位像老太太！预判他下一步！',
      '第三句必卡壳！倒数三秒！',
      '王座后面没陷阱。真的。……你信我。',
    ]);
  });
});

describe('audience barrage scheduler', () => {
  it('is deterministic for the same seed', () => {
    const a = createAudienceBarrageScheduler(42);
    const b = createAudienceBarrageScheduler(42);
    expect(a.burst({ scene: 'ambient', size: 8 })).toEqual(b.burst({ scene: 'ambient', size: 8 }));
    expect(a.burst({ scene: 'move', size: 4 })).toEqual(b.burst({ scene: 'move', size: 4 }));
  });

  it.each([2, 4, 8] as const)('creates a %i item burst', (size) => {
    const scheduler = createAudienceBarrageScheduler(size);
    expect(scheduler.burst({ scene: 'ambient', size })).toHaveLength(size);
  });

  it('does not repeat ordinary lines within the recent ten', () => {
    const pool: AudienceBarrageLine[] = Array.from({ length: 12 }, (_, index) => ({
      id: `ordinary-${index}`,
      text: `ordinary ${index}`,
      scene: 'ambient',
      style: 'normal',
    }));
    const scheduler = createAudienceBarrageScheduler(7, pool);
    const picked = [
      ...scheduler.burst({ scene: 'ambient', size: 8 }),
      ...scheduler.burst({ scene: 'ambient', size: 2 }),
    ];
    expect(new Set(picked.map((line) => line.id)).size).toBe(10);
  });

  it('fills depleted bursts only by replaying short reactions', () => {
    const pool: AudienceBarrageLine[] = [
      { id: 'ordinary', text: 'ordinary', scene: 'move', style: 'normal' },
      { id: 'short', text: '走！', scene: 'move', style: 'fast', repeatable: true },
    ];
    const scheduler = createAudienceBarrageScheduler(5, pool);
    const first = scheduler.burst({ scene: 'move', size: 2 });
    const second = scheduler.burst({ scene: 'move', size: 4 });
    expect(first).toHaveLength(2);
    expect(second.map((line) => line.id)).toEqual(['short', 'short', 'short', 'short']);
  });

  it('allows repeatable short reactions to repeat', () => {
    const pool: AudienceBarrageLine[] = [{
      id: 'short', text: '好！', scene: 'perfect', style: 'fast', repeatable: true,
    }];
    const scheduler = createAudienceBarrageScheduler(9, pool);
    expect(scheduler.burst({ scene: 'perfect', size: 4 }).map((line) => line.id)).toEqual([
      'short', 'short', 'short', 'short',
    ]);
  });

  it('limits every event burst to one nonsense line', () => {
    const pool: AudienceBarrageLine[] = Array.from({ length: 10 }, (_, index) => ({
      id: `nonsense-${index}`,
      text: `nonsense ${index}`,
      scene: 'combo',
      style: 'meme',
      nonsense: true,
    }));
    pool.push({ id: 'plain', text: 'plain', scene: 'combo', style: 'normal', repeatable: true });
    const scheduler = createAudienceBarrageScheduler(3, pool);
    const burst = scheduler.burst({ scene: 'combo', size: 8 });
    expect(burst).toHaveLength(8);
    expect(burst.filter((line) => line.nonsense)).toHaveLength(1);
  });
});
