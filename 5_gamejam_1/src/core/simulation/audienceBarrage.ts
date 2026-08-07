import { AUDIENCE_BARRAGE_LINES } from '../data/audienceBarrage';
import type { AudienceBarrageLine, AudienceScene } from '../data/audienceBarrage';
import type { ScriptId } from '../types';
import { mulberry32 } from '../math';

export type AudienceBurstSize = 2 | 4 | 8;

export interface AudienceBurstRequest {
  scene: AudienceScene;
  size: AudienceBurstSize;
  script?: ScriptId | null;
}

export interface ScheduledAudienceBarrage extends AudienceBarrageLine {
  sequence: number;
}

export interface AudienceBarrageScheduler {
  burst(request: AudienceBurstRequest): ScheduledAudienceBarrage[];
  recentIds(): readonly string[];
  reset(seed?: number): void;
}

export function createAudienceBarrageScheduler(
  seed = 1,
  pool: readonly AudienceBarrageLine[] = AUDIENCE_BARRAGE_LINES,
): AudienceBarrageScheduler {
  let rng = mulberry32(seed);
  let recent: string[] = [];
  let sequence = 0;

  const reset = (nextSeed = seed): void => {
    rng = mulberry32(nextSeed);
    recent = [];
    sequence = 0;
  };

  const burst = ({ scene, size, script }: AudienceBurstRequest): ScheduledAudienceBarrage[] => {
    const scenePool = pool.filter((entry) => (
      entry.scene === scene
      && (!entry.script || entry.script === script)
      && (entry.repeatable || !recent.includes(entry.id))
    ));
    const candidates = [...scenePool];
    const ordinaryCandidates = candidates.filter((entry) => !entry.repeatable);
    const repeatableCandidates = candidates.filter((entry) => entry.repeatable);
    const result: ScheduledAudienceBarrage[] = [];
    let nonsenseUsed = false;

    while (result.length < size && (candidates.length > 0 || repeatableCandidates.length > 0)) {
      const ordinaryEligible = ordinaryCandidates.filter((entry) => !entry.nonsense || !nonsenseUsed);
      const repeatableEligible = repeatableCandidates.filter((entry) => !entry.nonsense || !nonsenseUsed);
      const eligible = ordinaryEligible.length > 0 ? ordinaryEligible : repeatableEligible;
      if (eligible.length === 0) break;
      const selected = eligible[Math.floor(rng() * eligible.length)];
      if (!selected) break;
      result.push({ ...selected, sequence: ++sequence });
      nonsenseUsed ||= Boolean(selected.nonsense);
      recent.push(selected.id);
      if (recent.length > 10) recent.shift();
      if (!selected.repeatable) {
        candidates.splice(candidates.indexOf(selected), 1);
        ordinaryCandidates.splice(ordinaryCandidates.indexOf(selected), 1);
      }
    }
    return result;
  };

  return { burst, recentIds: () => [...recent], reset };
}
