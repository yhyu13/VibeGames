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
  // key -> the track that danmaku took when it first appeared.
  const tracksRef = useRef(new Map<string, { family: TrackFamily; track: number }>());

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
  const rendered = useMemo(() => {
    const held = tracksRef.current;
    const keys = items.map((item) => `${item.id}-${item.sequence}`);
    // A flight is over when its key has left the array; that is what frees its track.
    const live = new Set(keys);
    for (const key of [...held.keys()]) if (!live.has(key)) held.delete(key);
    const taken = new Set<string>();
    for (const entry of held.values()) taken.add(`${entry.family}:${entry.track}`);

    return items.map((item, index) => {
      const key = keys[index]!;
      const family = familyOf(item.style);
      let entry = held.get(key);
      if (!entry) {
        // The first track of this family that no other flying danmaku holds. When there are more
        // danmaku in the air than the stage has tracks the last one is shared — the scroll family
        // peaks at 8 against 6 tracks — but a shared track is then a real shortage, not an
        // accident of arithmetic.
        const count = TRACK_COUNT[family];
        let track = 0;
        while (track < count - 1 && taken.has(`${family}:${track}`)) track += 1;
        entry = { family, track };
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
