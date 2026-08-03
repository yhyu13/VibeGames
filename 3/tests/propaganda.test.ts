import { describe, expect, it } from 'vitest';
import { applyConversion, applyMessage, defaultSegments, isJammed, suspicionTick } from '../src/game/propaganda';
import { MESSAGES } from '../src/data/messages';
import { createRun } from '../src/game/run';
import { EventBus } from '../src/core/events';

describe('propaganda', () => {
  it('applyMessage raises conviction and suspicion', () => {
    const segs = defaultSegments();
    const card = MESSAGES[0];
    const res = applyMessage(segs, card, 1);
    const civilian = res.segments.find((s) => s.id === 'civilian')!;
    expect(civilian.conviction).toBe(card.conviction * 2);
    expect(civilian.suspicion).toBeGreaterThan(0);
    const military = res.segments.find((s) => s.id === 'military')!;
    expect(military.conviction).toBe(0);
  });

  it('conviction caps at 100 and converts on reaching it', () => {
    const segs = defaultSegments();
    const civilian = segs.find((s) => s.id === 'civilian')!;
    civilian.conviction = 90;
    const res = applyMessage(segs, MESSAGES[0], 1);
    const updated = res.segments.find((s) => s.id === 'civilian')!;
    expect(updated.conviction).toBe(100);
    expect(updated.converted).toBe(true);
    expect(res.newlyConverted).toContain('civilian');
  });

  it('already-converted segments are skipped', () => {
    const segs = defaultSegments();
    segs.find((s) => s.id === 'civilian')!.converted = true;
    const res = applyMessage(segs, MESSAGES[0], 10);
    const civilian = res.segments.find((s) => s.id === 'civilian')!;
    expect(civilian.conviction).toBe(0);
    expect(res.newlyConverted).toHaveLength(0);
  });

  it('isJammed triggers at 100 suspicion', () => {
    const segs = defaultSegments();
    expect(isJammed(segs)).toBe(false);
    segs[0].suspicion = 100;
    expect(isJammed(segs)).toBe(true);
  });

  it('suspicionTick decays suspicion but never below 0', () => {
    const segs = defaultSegments();
    segs[0].suspicion = 10;
    segs[1].suspicion = 100;
    const next = suspicionTick(segs);
    expect(next[0].suspicion).toBe(2);
    expect(next[1].suspicion).toBe(92);
  });

  it('applyConversion grants effects once', () => {
    const run = createRun(5, ['plasma-lance']);
    const bus = new EventBus();
    const mil = run.segments.find((s) => s.id === 'military')!;
    mil.converted = true;
    applyConversion(run, 'military', bus);
    expect(run.autoDisables).toBe(1);
    applyConversion(run, 'military', bus);
    expect(run.autoDisables).toBe(1);

    const sci = run.segments.find((s) => s.id === 'scientist')!;
    sci.converted = true;
    applyConversion(run, 'scientist', bus);
    expect(run.salvage).toBe(15);
  });
});
