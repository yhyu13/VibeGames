// Nuclear missile lifecycle and interception helpers.

import type { Missile } from '../types.js';
import { asMissileId } from '../id.js';
import type { RNG } from '../rng.js';

let counter = 0;
function nextId() { counter++; return asMissileId(`m-${counter}`); }

export function launchMissile(sourceRegion: Missile['sourceRegion'], warhead: Missile['warheadType'] = 'nuclear'): Missile {
  return {
    id: nextId(),
    sourceRegion,
    target: 'player',
    phase: 'launch',
    eta: 6.0,
    warheadType: warhead,
    intercepted: false,
  };
}

export function tickMissile(m: Missile, dt: number): void {
  if (m.intercepted) return;
  m.eta -= dt;
  if (m.phase === 'launch' && m.eta < 4.5) m.phase = 'ascent';
  if (m.phase === 'ascent' && m.eta < 3.0) m.phase = 'orbit';
  if (m.phase === 'orbit' && m.eta < 1.0) m.phase = 'terminal';
}

export function interceptMissile(m: Missile, rng: RNG): boolean {
  const r = rng.next();
  if (m.phase === 'launch' || m.phase === 'ascent') {
    m.intercepted = true;
    return true;
  }
  if (m.phase === 'orbit' && r < 0.7) {
    m.intercepted = true;
    return true;
  }
  if (m.phase === 'terminal' && r < 0.3) {
    m.intercepted = true;
    return true;
  }
  return false;
}

export function isMissileLive(m: Missile): boolean {
  return !m.intercepted && m.eta > 0;
}