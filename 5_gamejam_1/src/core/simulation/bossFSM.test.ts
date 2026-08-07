// src/core/simulation/bossFSM.test.ts — B01–B09 转移 / 击倒≥3 规则 / 恐慌崩溃（TDD §4.4.1–§4.4.2 冻结）
import { describe, expect, it } from 'vitest';
import {
  PANIC_DROP,
  PANIC_KNEEL_TIME,
  SWORD_DROP_CHANCE,
  SWORD_PICKUP_TIME,
} from '../constants';
import {
  afterBreakdown,
  isPanicBreakdown,
  nextBossState,
  PANIC_BREAKDOWN,
  shouldDropSword,
  SWORD_DROP,
  type BossFlags,
} from './bossFSM';

const flags = (over: Partial<BossFlags> = {}): BossFlags => ({
  hpZero: false,
  knockdowns: 0,
  inPerform: false,
  interrupt: false,
  recoverDone: false,
  breakDone: false,
  ...over,
});

describe('frozen special-behavior constants', () => {
  it('panic breakdown kneels 2s and resets anxiety to 70', () => {
    expect(PANIC_KNEEL_TIME).toBe(2);
    expect(PANIC_DROP).toBe(70);
    expect(PANIC_BREAKDOWN.kneelTime).toBe(PANIC_KNEEL_TIME);
    expect(PANIC_BREAKDOWN.fallTo).toBe(PANIC_DROP);
  });

  it('sword drop: 5% chance in panic band, 1.2s pickup', () => {
    expect(SWORD_DROP_CHANCE).toBe(0.05);
    expect(SWORD_PICKUP_TIME).toBe(1.2);
    expect(SWORD_DROP.chance).toBe(SWORD_DROP_CHANCE);
    expect(SWORD_DROP.pickupTime).toBe(SWORD_PICKUP_TIME);
  });
});

describe('B01–B09 transitions', () => {
  it('B01 IDLE → ALERT', () => {
    expect(nextBossState('IDLE', flags())).toBe('ALERT');
  });

  it('B02 ALERT → PERFORM only when inPerform', () => {
    expect(nextBossState('ALERT', flags())).toBe('ALERT');
    expect(nextBossState('ALERT', flags({ inPerform: true }))).toBe('PERFORM');
  });

  it('B03 PERFORM hp≤0 with knockdowns <3 → HIT', () => {
    expect(nextBossState('PERFORM', flags({ hpZero: true, knockdowns: 0 }))).toBe('HIT');
    expect(nextBossState('PERFORM', flags({ hpZero: true, knockdowns: 2, inPerform: true }))).toBe('HIT');
  });

  it('B03 knockdown ≥3 blocks the HIT transition (no knockdown on 3rd+ hit)', () => {
    expect(nextBossState('PERFORM', flags({ hpZero: true, knockdowns: 3, inPerform: true }))).toBe('PERFORM');
  });

  it('B03 is checked before B06/B08 (priority)', () => {
    expect(nextBossState('PERFORM', flags({ hpZero: true, knockdowns: 1, interrupt: true, inPerform: true }))).toBe('HIT');
    expect(nextBossState('PERFORM', flags({ hpZero: true, knockdowns: 1, inPerform: false }))).toBe('HIT');
  });

  it('B04 HIT → RECOVER after recoverDone', () => {
    expect(nextBossState('HIT', flags({ recoverDone: true }))).toBe('RECOVER');
    expect(nextBossState('HIT', flags())).toBe('HIT');
  });

  it('B05 RECOVER → PERFORM after recoverDone', () => {
    expect(nextBossState('RECOVER', flags({ recoverDone: true }))).toBe('PERFORM');
    expect(nextBossState('RECOVER', flags())).toBe('RECOVER');
  });

  it('B06 PERFORM interrupt → BREAK_CHARACTER', () => {
    expect(nextBossState('PERFORM', flags({ interrupt: true, inPerform: true }))).toBe('BREAK_CHARACTER');
  });

  it('B07 BREAK_CHARACTER → PERFORM after breakDone', () => {
    expect(nextBossState('BREAK_CHARACTER', flags({ breakDone: true }))).toBe('PERFORM');
    expect(nextBossState('BREAK_CHARACTER', flags())).toBe('BREAK_CHARACTER');
  });

  it('B08 PERFORM end (no inPerform) → EVALUATE', () => {
    expect(nextBossState('PERFORM', flags({ inPerform: false }))).toBe('EVALUATE');
  });

  it('B09 EVALUATE is stable (Simulation resets to IDLE on round reset)', () => {
    expect(nextBossState('EVALUATE', flags())).toBe('EVALUATE');
  });

  it('PERFORM with no triggers stays PERFORM', () => {
    expect(nextBossState('PERFORM', flags({ inPerform: true }))).toBe('PERFORM');
  });
});

describe('panic breakdown and sword drop helpers', () => {
  it('isPanicBreakdown fires at anxiety 100', () => {
    expect(isPanicBreakdown(100)).toBe(true);
    expect(isPanicBreakdown(99.999)).toBe(false);
    expect(isPanicBreakdown(150)).toBe(true);
  });

  it('afterBreakdown resets to 70 (kneel ends)', () => {
    expect(afterBreakdown()).toBe(PANIC_DROP);
  });

  it('shouldDropSword only in panic band at 5%', () => {
    expect(shouldDropSword('panic', () => 0)).toBe(true);
    expect(shouldDropSword('panic', () => 0.0499999)).toBe(true);
    expect(shouldDropSword('panic', () => 0.05)).toBe(false);
    expect(shouldDropSword('panic', () => 0.9)).toBe(false);
    expect(shouldDropSword('shaky', () => 0)).toBe(false);
    expect(shouldDropSword('calm', () => 0)).toBe(false);
  });
});
