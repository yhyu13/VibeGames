import { useMemo } from 'react';
import { useUiStore } from '../store';

// B 站式弹幕层：6 条轨道横滚 + 顶部/底部大字 + 表情牌 + 醒目留言
// 中央 60% 安全区避开谱面目标；轨道集中在上下边缘。

const LANES = [
  { top: '5%', speed: 6.5 },
  { top: '11%', speed: 7.5 },
  { top: '17.5%', speed: 9 },
  { top: '78%', speed: 8 },
  { top: '85%', speed: 6.5 },
  { top: '91.5%', speed: 7 },
];

const MEME_SPOTS = [
  { left: '3%', top: '40%' },
  { left: '82%', top: '44%' },
  { left: '5%', top: '62%' },
  { left: '80%', top: '64%' },
];

function laneOf(seq: number, text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return (seq + h) % LANES.length;
}

function durationFor(style: string, speed: number): number {
  if (style === 'fast' || style === 'emoji') return Math.max(1.6, speed * 0.55);
  return speed;
}

export default function AudienceBarrage() {
  const items = useUiStore((s) => s.audienceBarrage);

  const rendered = useMemo(
    () =>
      items.map((item) => {
        const lane = laneOf(item.sequence, item.text);
        return { item, lane, duration: durationFor(item.style, LANES[lane].speed) };
      }),
    [items],
  );

  if (rendered.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {rendered.map(({ item, lane, duration }) => {
        const key = `${item.sequence}-${item.id}`;
        switch (item.style) {
          case 'top':
            return (
              <div key={key} className="barrage-top">
                {item.text}
              </div>
            );
          case 'bottom':
            return (
              <div key={key} className="barrage-bottom">
                {item.text}
              </div>
            );
          case 'meme': {
            const spot = MEME_SPOTS[lane % MEME_SPOTS.length];
            return (
              <div key={key} className="barrage-meme" style={spot}>
                {item.text}
              </div>
            );
          }
          case 'sc':
            return (
              <div key={key} className="barrage-sc">
                {item.text}
              </div>
            );
          default: {
            const styleClass = item.style === 'fast' ? 'barrage-fast' : item.style === 'emoji' ? 'barrage-emoji' : 'barrage-normal';
            return (
              <div
                key={key}
                className={`barrage-lane ${styleClass}`}
                style={{ top: LANES[lane].top, animationDuration: `${duration}s` }}
              >
                {item.text}
              </div>
            );
          }
        }
      })}
    </div>
  );
}
