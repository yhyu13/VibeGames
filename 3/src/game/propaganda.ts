import type { MessageCard, RunState, SegmentId, SegmentState } from '../core/types';
import type { EventBus } from '../core/events';

export const SEGMENT_IDS: SegmentId[] = ['civilian', 'military', 'scientist', 'government'];

export const SEGMENT_NAMES: Record<SegmentId, string> = {
  civilian: 'Civilians',
  military: 'Military',
  scientist: 'Scientists',
  government: 'Government',
};

export const SEGMENT_EFFECTS: Record<SegmentId, string> = {
  civilian: 'Civilian converts inspire others: +5 conviction to all segments.',
  military: 'Military converts disarm one defense per day.',
  scientist: 'Scientist converts leak tech: +5 salvage.',
  government: 'Government converts boost all future propaganda by 50%.',
};

export function defaultSegments(): SegmentState[] {
  return SEGMENT_IDS.map((id) => ({ id, conviction: 0, suspicion: 0, converted: false }));
}

export interface MessageResult {
  segments: SegmentState[];
  newlyConverted: SegmentId[];
}

export function applyMessage(segments: SegmentState[], card: MessageCard, mult: number): MessageResult {
  const next = segments.map((s) => ({ ...s }));
  const newlyConverted: SegmentId[] = [];
  for (const s of next) {
    if (s.converted) continue;
    const segMult = card.segments[s.id] ?? 0;
    if (segMult === 0) continue;
    s.conviction = Math.min(100, s.conviction + card.conviction * segMult * mult);
    s.suspicion = Math.min(100, s.suspicion + card.suspicion * (0.4 + 0.6 * segMult) * mult);
    if (s.conviction >= 100 && !s.converted) {
      s.converted = true;
      newlyConverted.push(s.id);
    }
  }
  return { segments: next, newlyConverted };
}

export function isJammed(segments: SegmentState[]): boolean {
  return segments.some((s) => s.suspicion >= 100);
}

export function suspicionTick(segments: SegmentState[]): SegmentState[] {
  return segments.map((s) => ({ ...s, suspicion: Math.max(0, s.suspicion - 8) }));
}

export function applyConversion(run: RunState, id: SegmentId, bus: EventBus): void {
  const seg = run.segments.find((s) => s.id === id);
  if (!seg || !seg.converted) return;
  if (run.convertedApplied.includes(id)) return;
  run.convertedApplied.push(id);
  switch (id) {
    case 'civilian':
      for (const s of run.segments) if (!s.converted) s.conviction = Math.min(100, s.conviction + 5);
      break;
    case 'military':
      run.autoDisables += 1;
      break;
    case 'scientist':
      run.salvage += 5;
      bus.emit('salvage:changed', { salvage: run.salvage });
      break;
    case 'government':
      run.profile.propagandaMult += 0.5;
      break;
  }
  pushLog(run, `${SEGMENT_NAMES[id]} converted: ${SEGMENT_EFFECTS[id]}`, bus);
}

export function pushLog(run: RunState, text: string, bus: EventBus): void {
  run.log.push(text);
  bus.emit('log', { text });
}
