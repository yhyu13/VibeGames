// core/data/diary.ts — 日记词条（V2：玩家可打字自定义）

import type { DiaryEntry } from '../types';

export const DIARY_ENTRIES: DiaryEntry[] = [
  { id: 'L_DIARY_01', text: '今天观众很少，但掌声是真的。', mood: 'positive' },
  { id: 'L_DIARY_02', text: '又忘词了。这个魔王当得像个笑话。', mood: 'negative', countsAsNotGoodEnough: true },
  { id: 'L_DIARY_03', text: '舞台灯好亮，亮到看不见台下。', mood: 'neutral' },
  { id: 'L_DIARY_04', text: '他们笑了——这次不是因为嘲笑。', mood: 'positive' },
  { id: 'L_DIARY_05', text: '我怕的不是输，是被看完。', mood: 'negative', countsAsNotGoodEnough: true },
  { id: 'L_DIARY_06', text: '披风洗了三次，剑擦了一下午。', mood: 'neutral' },
  { id: 'L_DIARY_07', text: '今晚根本不该开播。', mood: 'negative', countsAsNotGoodEnough: true },
  { id: 'L_DIARY_08', text: '有一瞬间，我真的在演我自己。', mood: 'positive' },
  { id: 'L_DIARY_09', text: '如果还有明天，我想再演一次。', mood: 'positive' },
];
