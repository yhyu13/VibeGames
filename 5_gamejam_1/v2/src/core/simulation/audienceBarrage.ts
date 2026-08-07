// core/simulation/audienceBarrage.ts — 观众弹幕调度器（平台纯净）

import { mulberry32, pick } from '../math';
import { AUDIENCE_BARRAGE_LINES, REPEAT_WORDS } from '../data/audienceBarrage';
import type { BarrageLine } from '../types';

export type AudienceBurstSize = 2 | 4 | 8;
export type AudienceScene = 'ambient' | 'entrance' | 'script' | 'move' | 'perfect' | 'combo' | 'miss' | 'forgot' | 'knockdown' | 'break' | 'evaluate' | 'ending' | 'nervous';

export interface ScheduledAudienceBarrage extends BarrageLine {
  sequence: number;
  density: 'standard' | 'sparse';
}

export interface AudienceScheduler {
  /** 事件爆发：聚合窗口内 2/4/8 条 */
  burst(opts: { scene: AudienceScene; size: AudienceBurstSize; script?: string | null; density?: 'standard' | 'sparse' }): ScheduledAudienceBarrage[];
  /** 环境弹幕：3-5 条慢速滚动 */
  ambient(opts: { density?: 'standard' | 'sparse' }): ScheduledAudienceBarrage[];
}

const SCENE_STYLES: Partial<Record<AudienceScene, string[]>> = {
  perfect: ['fast', 'emoji', 'normal', 'top', 'sc'],
  combo: ['fast', 'emoji', 'normal', 'bottom', 'sc'],
  miss: ['fast', 'emoji', 'normal'],
  forgot: ['fast', 'normal', 'sc'],
  knockdown: ['fast', 'emoji', 'normal', 'bottom', 'sc'],
  break: ['normal', 'fast'],
  ending: ['normal', 'emoji', 'bottom', 'top'],
  evaluate: ['normal', 'top'],
  entrance: ['normal', 'emoji', 'sc'],
  script: ['normal', 'fast'],
  move: ['normal', 'fast'],
  nervous: ['normal', 'sc'],
  ambient: ['normal', 'meme'],
};

export function createAudienceBarrageScheduler(seed: number): AudienceScheduler {
  const rand = mulberry32(seed);
  const recent: string[] = [];

  const pickLine = (scene: AudienceScene, density: 'standard' | 'sparse'): ScheduledAudienceBarrage => {
    const styles = SCENE_STYLES[scene] ?? ['normal'];
    const pool = AUDIENCE_BARRAGE_LINES.filter(
      (l) => l.scene === scene || (scene === 'combo' && l.scene === 'perfect'),
    );
    let line: BarrageLine;
    if (scene === 'ambient' && rand() < 0.25) {
      line = { id: `REP_${Math.floor(rand() * 9999)}`, text: pick(rand, REPEAT_WORDS), style: 'fast', scene: 'ambient' };
    } else if (pool.length > 0) {
      const candidates = pool.filter((l) => !recent.includes(l.text));
      line = candidates.length > 0 ? candidates[Math.floor(rand() * candidates.length)] : pool[Math.floor(rand() * pool.length)];
    } else {
      line = { id: `GEN_${Math.floor(rand() * 9999)}`, text: pick(rand, REPEAT_WORDS), style: pick(rand, styles) as BarrageLine['style'], scene };
    }
    // 复读词不入去重表，普通内容近 10 条不重复
    if (!REPEAT_WORDS.includes(line.text)) {
      recent.push(line.text);
      if (recent.length > 10) recent.shift();
    }
    return { ...line, sequence: Math.floor(rand() * 1e9), density };
  };

  return {
    burst({ scene, size, script, density = 'standard' }) {
      const count = density === 'sparse' ? Math.max(1, Math.floor(size / 2)) : size;
      const out: ScheduledAudienceBarrage[] = [];
      for (let i = 0; i < count; i++) out.push(pickLine(scene, density));
      if (script && scene === 'perfect' && rand() < 0.2) {
        // 偶尔追加一条针对剧本的起哄
        out.push({
          id: `SCRIPT_${Math.floor(rand() * 9999)}`,
          text: script === 'mad' ? '癫疯的演技！' : script === 'tragic' ? '这眼泪是真的吗' : '威严起来了',
          style: 'fast',
          scene,
          sequence: Math.floor(rand() * 1e9),
          density,
        });
      }
      return out;
    },
    ambient({ density = 'standard' }) {
      const count = density === 'sparse' ? 2 : 3 + Math.floor(rand() * 3);
      const out: ScheduledAudienceBarrage[] = [];
      for (let i = 0; i < count; i++) out.push(pickLine('ambient', density));
      return out;
    },
  };
}
