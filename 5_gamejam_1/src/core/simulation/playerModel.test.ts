// src/core/simulation/playerModel.test.ts — 替身逼近速度 / 闪避窗口 / 弹幕调度（TDD §4.4.2 冻结）
import { describe, expect, it } from 'vitest';
import type { BossState, GamePhase } from '../types';
import {
  BARRAGE_ACTIVE_WINDOW,
  PLAYER_APPROACH_MAX,
  PLAYER_APPROACH_MIN,
  PLAYER_DODGE_NORMAL_WINDOW,
  PLAYER_DODGE_PERFECT_WINDOW,
  ROUND_TABLE,
} from '../constants';
import { sample, type PlayerRunCtx } from './playerModel';

const makeBoss = (): BossState => ({
  id: 'boss',
  innerState: 'PERFORM',
  pos: { x: 0, y: 0, z: 0 },
  rot: { x: 0, y: 0, z: 0 },
  hp: 100,
  maxHp: 100,
  anxiety: 30,
  seen: 0,
  band: 'calm',
  script: null,
  stageIndex: 0,
  beatIndex: 0,
  performMode: 'scripted',
  recovering: false,
  knockdownCount: 0,
  breakdownTimer: 0,
  anim: 'idleSway',
});

const makeCtx = (over: Partial<PlayerRunCtx>): PlayerRunCtx => ({
  round: 1,
  time: 0,
  phase: 'WAIT',
  boss: makeBoss(),
  barrageActive: false,
  ...over,
});

const seq = (vals: number[]): (() => number) => {
  const q = [...vals];
  return () => (q.length > 0 ? (q.shift() as number) : 0.5);
};

describe('frozen player constants (TDD §4.4.2)', () => {
  it('approach speed bounds and dodge windows', () => {
    expect(PLAYER_APPROACH_MIN).toBe(0.6);
    expect(PLAYER_APPROACH_MAX).toBe(1.5);
    expect(PLAYER_DODGE_PERFECT_WINDOW).toBe(0.18);
    expect(PLAYER_DODGE_NORMAL_WINDOW).toBe(0.35);
    expect(BARRAGE_ACTIVE_WINDOW).toBe(4);
  });

  it('ROUND_TABLE matches the frozen round table', () => {
    expect(
      ROUND_TABLE.map((r) => [r.approachSpeed, r.damage, r.dodgeNormal, r.dodgePerfect, r.barrageMax, r.anxietyBase, r.seenCarry]),
    ).toEqual([
      [1.0, 20, 0.2, 0.1, 1, 30, 0],
      [1.15, 22, 0.3, 0.15, 2, 34, 0.6],
      [1.3, 25, 0.4, 0.2, 3, 38, 0.6],
      [1.5, 30, 0.5, 0.25, 3, 42, 0.6],
    ]);
  });
});

describe('approachSpeed', () => {
  it('stays within [0.6, 1.5] across the rng sweep while moving', () => {
    for (let i = 0; i <= 20; i++) {
      const r = i / 20;
      const p = sample(makeCtx({ phase: 'SENSE', time: 3 }), () => r);
      expect(p.approachSpeed).toBeGreaterThanOrEqual(PLAYER_APPROACH_MIN);
      expect(p.approachSpeed).toBeLessThanOrEqual(PLAYER_APPROACH_MAX);
    }
  });

  it('R1 mid rng → table base ±10% (0.9–1.05)', () => {
    const p = sample(makeCtx({ phase: 'SENSE', time: 3 }), () => 0.5);
    expect(p.approachSpeed).toBeCloseTo(0.9 + (1.05 - 0.9) * 0.5);
  });

  it('is 0 in non-moving phases', () => {
    for (const phase of ['EVALUATE', 'DIARY', 'MENU', 'PAUSE', 'ENDING_NORMAL', 'ENDING_HIDDEN'] as GamePhase[]) {
      expect(sample(makeCtx({ phase, time: 10 }), () => 0.5).approachSpeed).toBe(0);
    }
  });
});

describe('distanceToThrone', () => {
  it('starts at 40m in WAIT and converges to 8m during SENSE', () => {
    expect(sample(makeCtx({ phase: 'WAIT', time: 0 }), () => 0.5).distanceToThrone).toBe(40);
    expect(sample(makeCtx({ phase: 'SENSE', time: 6 }), () => 0.5).distanceToThrone).toBeCloseTo(24);
    expect(sample(makeCtx({ phase: 'SENSE', time: 12 }), () => 0.5).distanceToThrone).toBeCloseTo(8);
  });

  it('closes to 1.5m while engaging (PERFORM)', () => {
    expect(sample(makeCtx({ phase: 'PERFORM', time: 12 }), () => 0.5).distanceToThrone).toBeCloseTo(1.5);
  });

  it('resets to 40m when leaving/gone', () => {
    expect(sample(makeCtx({ phase: 'EVALUATE', time: 12 }), () => 0.5).distanceToThrone).toBe(40);
    expect(sample(makeCtx({ phase: 'MENU', time: 12 }), () => 0.5).distanceToThrone).toBe(40);
  });
});

describe('dodgeTimingQuality windows (±0.18s perfect / ±0.35s normal)', () => {
  const sampleTiming = (w: number) =>
    sample(makeCtx({ round: 1, phase: 'PERFORM', time: 60 }), seq([0.5, 0.5, w])).dodgeTimingQuality;

  it('perfect at 0 error', () => {
    expect(sampleTiming(0.5)).toBe(1);
  });

  it('perfect inside 0.18s and normal just outside', () => {
    expect(sampleTiming(0.6799999)).toBe(1); // err ≈ 0.18 − ε
    expect(sampleTiming(0.6800001)).toBe(0.5); // err ≈ 0.18 + ε
  });

  it('normal inside 0.35s and 0 just outside', () => {
    expect(sampleTiming(0.8499999)).toBe(0.5); // err ≈ 0.35 − ε
    expect(sampleTiming(0.8500001)).toBe(0); // err ≈ 0.35 + ε
    expect(sampleTiming(1)).toBe(0); // err = 0.5
  });
});

describe('attack/dodge derivation and aggression', () => {
  it('dodgeCount + hitsLanded = attempts and aggression blends speed + hit rate', () => {
    const p = sample(makeCtx({ round: 1, phase: 'PERFORM', time: 60 }), seq([0.5, 0.5, 0.5]));
    expect(p.dodgeCount).toBe(2);
    expect(p.hitsLanded).toBe(5);
    expect(p.aggression).toBeCloseTo(0.5 * 0.975 + 0.5 * (5 / 7));
  });
});

describe('barrage scheduling (4s on / 4s off during PERFORM)', () => {
  const active = (round: number, phase: GamePhase, time: number, barrageActive: boolean) =>
    sample(makeCtx({ round, phase, time, barrageActive }), () => 0.5).barrageActive;

  it('round 1 window aligns with elapsed time', () => {
    expect(active(1, 'PERFORM', 0, true)).toBe(true);
    expect(active(1, 'PERFORM', 3.9, true)).toBe(true);
    expect(active(1, 'PERFORM', 4, true)).toBe(false);
    expect(active(1, 'PERFORM', 7.9, true)).toBe(false);
    expect(active(1, 'PERFORM', 8, true)).toBe(true);
    expect(active(1, 'PERFORM', 120, true)).toBe(true);
  });

  it('round 2 offsets by the round cycle (elapsed = time − 120)', () => {
    expect(active(2, 'PERFORM', 121, true)).toBe(true);
    expect(active(2, 'PERFORM', 124, true)).toBe(false);
    expect(active(2, 'PERFORM', 128, true)).toBe(true);
  });

  it('only shows while engaging and only when the barrage is live', () => {
    expect(active(1, 'SENSE', 1, true)).toBe(false);
    expect(active(1, 'PERFORM', 1, false)).toBe(false);
  });
});

describe('player state and lingerTime', () => {
  it('state follows the global phase', () => {
    expect(sample(makeCtx({ phase: 'WAIT' }), () => 0.5).state).toBe('approaching');
    expect(sample(makeCtx({ phase: 'SENSE' }), () => 0.5).state).toBe('approaching');
    expect(sample(makeCtx({ phase: 'PERFORM' }), () => 0.5).state).toBe('engaging');
    expect(sample(makeCtx({ phase: 'EVALUATE' }), () => 0.5).state).toBe('retreating');
    expect(sample(makeCtx({ phase: 'DIARY' }), () => 0.5).state).toBe('retreating');
    expect(sample(makeCtx({ phase: 'MENU' }), () => 0.5).state).toBe('gone');
    expect(sample(makeCtx({ phase: 'PAUSE' }), () => 0.5).state).toBe('gone');
  });

  it('lingerTime is 2–4s during EVALUATE/DIARY and 0 otherwise', () => {
    expect(sample(makeCtx({ phase: 'EVALUATE' }), () => 0).lingerTime).toBeCloseTo(2);
    expect(sample(makeCtx({ phase: 'EVALUATE' }), () => 1).lingerTime).toBeCloseTo(4);
    expect(sample(makeCtx({ phase: 'PERFORM' }), () => 0.5).lingerTime).toBe(0);
  });
});
