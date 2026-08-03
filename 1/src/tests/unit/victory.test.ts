import { describe, it, expect } from 'vitest';
import { detectEnding, adjustAnnihilation, adjustDigital, adjustSubmission, adjustFracture } from '../../state/progression/VictoryPaths.js';
import { signal } from '../../state/signals.js';
import { createEarthState } from '../../state/earth/EarthState.js';
import { asCommanderId, asArchetypeId } from '../../state/id.js';
import type { RunState } from '../../state/types.js';

function makeRun(): RunState {
  return {
    seed: signal(1),
    commander: asCommanderId('harvester'),
    archetype: asArchetypeId('harvester'),
    earth: createEarthState(),
    ship: { hull: signal(100) } as never,
    victory: {
      annihilation: signal(0),
      submission: signal(0),
      digital: signal(0),
      fracture: signal(0),
    },
    events: signal([]),
    encounter: signal(null),
    clock: signal(0),
    outcome: signal(null),
  };
}

describe('VictoryPaths', () => {
  it('returns null when no path is met', () => {
    const run = makeRun();
    expect(detectEnding(run)).toBeNull();
  });

  it('annihilation triggers when planetary integrity reaches 0', () => {
    const run = makeRun();
    adjustAnnihilation(run, 0.6);
    run.earth.planetaryIntegrity.value = 0;
    expect(detectEnding(run)?.kind).toBe('annihilation');
  });

  it('digital triggers when network control reaches 100', () => {
    const run = makeRun();
    run.earth.networkControl.value = 100;
    expect(detectEnding(run)?.kind).toBe('digital');
  });

  it('submission triggers when panic high and resolve low', () => {
    const run = makeRun();
    adjustSubmission(run, 0.6);
    run.earth.globalPanic.value = 80;
    run.earth.humanResolve.value = 20;
    expect(detectEnding(run)?.kind).toBe('submission');
  });

  it('fracture triggers when unity collapses', () => {
    const run = makeRun();
    adjustFracture(run, 0.6);
    run.earth.humanUnity.value = 10;
    expect(detectEnding(run)?.kind).toBe('fracture');
  });
});