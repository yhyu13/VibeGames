import type { MessageCard, MessageCardId, PopulationSegment, PropagandaSegmentState } from "../core/types";

export const POPULATION_SEGMENTS: PopulationSegment[] = ["civilian", "military", "scientist", "government"];

export const SEGMENT_LABELS: Record<PopulationSegment, string> = {
  civilian: "Civilians",
  military: "Military",
  scientist: "Scientists",
  government: "Government",
};

const MESSAGE_DECK: MessageCard[] = [
  { id: "slogan", name: "Slogan", conviction: 12, suspicion: 4, scientistSynergy: 1 },
  { id: "doctoredFootage", name: "Doctored Footage", conviction: 20, suspicion: 10, scientistSynergy: 1.5 },
  { id: "deepfake", name: "Deepfake Drop", conviction: 16, suspicion: 8, scientistSynergy: 1.25 },
  { id: "defectorCall", name: "Defector Call", conviction: 24, suspicion: 14, scientistSynergy: 2 },
  { id: "disinfoBlitz", name: "Disinfo Blitz", conviction: 30, suspicion: 22, scientistSynergy: 1.5 },
];

const DECK_BY_ID = new Map(MESSAGE_DECK.map((c) => [c.id, c]));

export function getMessageCard(id: MessageCardId): MessageCard {
  const c = DECK_BY_ID.get(id);
  if (!c) throw new Error(`Unknown message card: ${id}`);
  return c;
}

export function createSegments(): PropagandaSegmentState[] {
  return POPULATION_SEGMENTS.map((segment) => ({
    segment,
    conviction: 0,
    suspicion: 0,
    converted: false,
    jammedUntilDay: 0,
  }));
}

export function drawMessageHand(ids: MessageCardId[]): MessageCard[] {
  return ids.map(getMessageCard);
}

export const DEFAULT_HAND: MessageCardId[] = ["slogan", "doctoredFootage", "defectorCall"];

export interface PropagandaEffect {
  convictionGained: number;
  suspicionGained: number;
  jammed: boolean;
  converted: boolean;
  multiplier: number;
}

/**
 * Apply a message card to a segment. Pure.
 * - scientistSynergy multiplies the effect if the scientist segment is already converted.
 * - propagandaPower (from mutations) scales conviction.
 * - propagandaMod (from Condition Profile) scales both conviction and suspicion.
 * - suspicion >= 100 jams the array (suspicion resets to 50, jammed until day+2).
 * - conviction >= 100 converts the segment.
 */
export function applyMessage(
  segment: PropagandaSegmentState,
  cardId: MessageCardId,
  ctx: {
    day: number;
    propagandaPower: number;
    propagandaMod: number;
    scientistsConverted: boolean;
  }
): PropagandaEffect {
  if (segment.converted || segment.jammedUntilDay > ctx.day) {
    return { convictionGained: 0, suspicionGained: 0, jammed: false, converted: segment.converted, multiplier: 0 };
  }
  const card = getMessageCard(cardId);
  let mult = ctx.propagandaMod * ctx.propagandaPower;
  if (ctx.scientistsConverted) mult *= card.scientistSynergy;
  const convictionGained = card.conviction * mult;
  const suspicionGained = card.suspicion * mult;
  segment.conviction = Math.min(100, segment.conviction + convictionGained);
  segment.suspicion = Math.min(100, segment.suspicion + suspicionGained);
  let converted: boolean = segment.converted;
  if (segment.conviction >= 100) converted = true;
  segment.converted = converted;
  const jammed = segment.suspicion >= 100 && !converted;
  if (jammed) {
    segment.suspicion = 50;
    segment.jammedUntilDay = ctx.day + 2;
  }
  return {
    convictionGained,
    suspicionGained,
    jammed,
    converted,
    multiplier: mult,
  };
}

export function totalConviction(segments: PropagandaSegmentState[]): number {
  return segments.reduce((sum, s) => sum + s.conviction, 0) / segments.length;
}
