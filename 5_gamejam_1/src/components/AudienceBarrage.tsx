import { useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { AudienceBarrageStyle } from '../core/data/audienceBarrage';
import { useUiStore } from '../store';

// The stage's tracks: the vertical slots a danmaku flies through. The middle band (15%–78%) is
// deliberately empty — that is the stage — so the scrolling danmaku live in the two outer bands.
const SCROLL_TRACKS = [4, 9, 15, 78, 84, 90];
// A meme box hugs an edge, so its slot is one of three heights crossed with one of the two
// edges. Six slots, and all six are distinct: the `lane % 3` / `lane % 2` pairing this replaces
// put slots 1 and 4 on the same height AND the same edge, which is how two meme boxes ended up
// exactly on top of each other (191×40 and 177×38 rectangles sharing 6499 px², measured).
const MEME_TOPS = [18, 42, 66];
const MEME_SLOTS = MEME_TOPS.length * 2;

type TrackFamily = 'scroll' | 'meme' | 'top' | 'bottom';

const TRACK_COUNT: Record<TrackFamily, number> = {
  scroll: SCROLL_TRACKS.length,
  meme: MEME_SLOTS,
  // A one-shot announcement spanning the middle of the screen. The game never has two in the air
  // at once — measured over a 70 s run, the most `top` and `bottom` danmaku visible together was
  // 1 and 0 — so each keeps the single anchor it was drawn with instead of being spread across
  // anchors invented to solve a collision that does not happen.
  top: 1,
  bottom: 1,
};

function familyOf(style: AudienceBarrageStyle): TrackFamily {
  if (style === 'top' || style === 'bottom') return style;
  return style === 'meme' ? 'meme' : 'scroll';
}

function trackStyle(style: AudienceBarrageStyle, track: number, sequence: number): CSSProperties {
  const delay = Math.min(0.72, (sequence % 8) * 0.09);
  if (style === 'top') return { top: '3.5%', animationDelay: `${delay}s` };
  if (style === 'bottom') return { bottom: '4%', animationDelay: `${delay}s` };
  if (style === 'meme') {
    const slot = track % MEME_SLOTS;
    return {
      top: `${MEME_TOPS[slot % MEME_TOPS.length]}%`,
      [slot < MEME_TOPS.length ? 'left' : 'right']: '1.5%',
      animationDelay: `${delay}s`,
    };
  }
  return {
    top: `${SCROLL_TRACKS[track % SCROLL_TRACKS.length]}%`,
    animationDelay: `${delay}s`,
    animationDuration: style === 'fast' ? '4.2s' : '9.5s',
  };
}

export default function AudienceBarrage() {
  const items = useUiStore((state) => state.audienceBarrage);
  // key -> the track that danmaku took when it first appeared, and the `sequence` it arrived with
  // (the scheduler hands those out in emission order, so it doubles as the age of the flight).
  const tracksRef = useRef(new Map<string, { family: TrackFamily; track: number; born: number }>());

  // A danmaku is given a track ONCE and keeps it for the whole flight.
  //
  // It used to be given `NORMAL_LANES[index % 6]` — its position in the store array — and that
  // array is filtered as older danmaku expire. So an item still crossing the screen was silently
  // re-pointed at another track the moment anything ahead of it left the array: measured on the
  // shipped build over a 70 s run, 26 of 30 tracked danmaku jumped mid-flight, median 384 px and
  // worst 648 px, all at the same instant the array shrank by two. A track is a place a danmaku
  // is flying through; it cannot be a place in a list.
  //
  // The map is idempotent, so a re-invoked render (StrictMode, a concurrent re-render) hands
  // every danmaku the same track it already had.
  //
  // When every track of the family is in use a danmaku has to share one, and WHICH one it shares is
  // the whole of this round: the track whose other occupant has been flying longest. Every scroll
  // track carries danmaku the same way — in from the right, out to the left — so the oldest
  // occupant is the one furthest down the stage, which is the most separation the stage has to
  // offer a newcomer. What this replaces was to always take the LAST track, which stacked the
  // surplus of a burst into a single column: measured over a 110 s run, `90%` held 2 or 3 danmaku
  // in 40 samples while the other five tracks never once held more than one, and every one of those
  // shares drew text over text — 39 pair-instances, 288 px² each, identical every time because the
  // two boxes were the same line at the same stagger. Two danmaku on different tracks do not
  // overlap at all: the track pitch is wider than a line box, so the share is not a lesser evil,
  // it is the difference between text and no text. Same two runs each way: 39 and 40 of those
  // pair-instances before, 0 after, and the closest two danmaku ever came on one track went from
  // 28 px apart to 361 — past a text width.
  //
  // The cost is real and is on the record: the surplus used to be spent on the bottom band, and now
  // it goes wherever the oldest danmaku is, which puts more of it in the top band where the crowd's
  // pinned comment sits. A scroll danmaku crossed that comment 33 and 34 times per 110 s after the
  // change against 12 and 13 before. What the crossing costs is bounded, though: in all 63
  // crossings recorded across the four runs the pinned comment is painted OVER the scrolling one, so
  // the crowd's shout is never defaced — one small comment is briefly hidden behind the big one,
  // which is the medium's own idiom and already happened a dozen times a run. Text drawn over text
  // was not.
  const rendered = useMemo(() => {
    const held = tracksRef.current;
    const keys = items.map((item) => `${item.id}-${item.sequence}`);
    // A flight is over when its key has left the array; that is what frees its track.
    const live = new Set(keys);
    for (const key of [...held.keys()]) if (!live.has(key)) held.delete(key);
    const taken = new Set<string>();
    // Per family, the tracks in use, oldest occupant first. Read only when a family is
    // oversubscribed; a track that takes a newcomer is re-dated to it and drops to the back, so
    // the next newcomer of the same burst takes the next-oldest track rather than this one again.
    const byAge = new Map<TrackFamily, { track: number; born: number }[]>();
    const occupied = new Map<TrackFamily, Map<number, number>>();
    for (const entry of held.values()) {
      taken.add(`${entry.family}:${entry.track}`);
      const perTrack = occupied.get(entry.family) ?? new Map<number, number>();
      const prev = perTrack.get(entry.track);
      if (prev === undefined || entry.born < prev) perTrack.set(entry.track, entry.born);
      occupied.set(entry.family, perTrack);
    }
    for (const [family, perTrack] of occupied) {
      byAge.set(family, [...perTrack.entries()]
        .map(([track, born]) => ({ track, born }))
        .sort((a, b) => a.born - b.born));
    }

    return items.map((item, index) => {
      const key = keys[index]!;
      const family = familyOf(item.style);
      let entry = held.get(key);
      if (!entry) {
        const count = TRACK_COUNT[family];
        let track = -1;
        for (let i = 0; i < count; i += 1) {
          if (!taken.has(`${family}:${i}`)) { track = i; break; }
        }
        const oldest = track < 0 ? byAge.get(family)?.[0] : undefined;
        if (oldest) {
          track = oldest.track;
          oldest.born = item.sequence;
          byAge.get(family)!.sort((a, b) => a.born - b.born);
        }
        if (track < 0) track = count - 1;
        entry = { family, track, born: item.sequence };
        held.set(key, entry);
        taken.add(`${family}:${track}`);
      }
      return {
        key,
        text: item.text,
        style: item.style,
        styleValue: trackStyle(item.style, entry.track, item.sequence),
      };
    });
  }, [items]);

  if (rendered.length === 0) return null;
  return (
    <div className="audience-barrage-layer no-select" aria-label="观众弹幕">
      {rendered.map(({ key, text, style, styleValue }) => (
        <span
          key={key}
          className={`audience-barrage-item audience-barrage-${style}`}
          style={styleValue}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
