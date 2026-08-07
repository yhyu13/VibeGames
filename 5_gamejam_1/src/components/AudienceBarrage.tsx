import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { AudienceBarrageStyle } from '../core/data/audienceBarrage';
import { useUiStore } from '../store';

const NORMAL_LANES = [4, 9, 15, 78, 84, 90];

function itemStyle(style: AudienceBarrageStyle, lane: number, sequence: number): CSSProperties {
  const delay = Math.min(0.72, (sequence % 8) * 0.09);
  if (style === 'top') return { top: '3.5%', animationDelay: `${delay}s` };
  if (style === 'bottom') return { bottom: '4%', animationDelay: `${delay}s` };
  if (style === 'meme') {
    return {
      top: `${18 + (lane % 3) * 24}%`,
      [lane % 2 === 0 ? 'left' : 'right']: '1.5%',
      animationDelay: `${delay}s`,
    };
  }
  return {
    top: `${NORMAL_LANES[lane % NORMAL_LANES.length]}%`,
    animationDelay: `${delay}s`,
    animationDuration: style === 'fast' ? '4.2s' : '9.5s',
  };
}

export default function AudienceBarrage() {
  const items = useUiStore((state) => state.audienceBarrage);
  const rendered = useMemo(() => items.map((item, index) => ({
    ...item,
    className: `audience-barrage-item audience-barrage-${item.style}`,
    styleValue: itemStyle(item.style, index, item.sequence),
  })), [items]);

  if (rendered.length === 0) return null;
  return (
    <div className="audience-barrage-layer no-select" aria-label="观众弹幕">
      {rendered.map((item) => (
        <span
          key={`${item.id}-${item.sequence}`}
          className={item.className}
          style={item.styleValue}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
