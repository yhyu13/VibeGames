// core/data/diary.ts — 日记条目（TDD §5.4 冻结形状，02 §6.3 转写）
// countsAsNotGoodEnough：L_DIARY_02/05/07 三条"我不够好"变体（01 §6 同计数，措辞微不同）。

import type { DiaryEntry } from '../types';

export const DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: 'L_DIARY_01',
    text: '我又忘词了。四百年的台词，三百年的练习，说忘就忘。',
    mood: 'negative',
  },
  {
    id: 'L_DIARY_02',
    text: '今天演得不够好。他说不定觉得我很可笑。',
    mood: 'negative',
    countsAsNotGoodEnough: true,
  },
  {
    id: 'L_DIARY_03',
    text: '观众走后，房间会嘲笑我。我听见了。',
    mood: 'negative',
  },
  {
    id: 'L_DIARY_04',
    text: '今天他躲开了我所有的攻击。他真厉害。我也……不错吧？',
    mood: 'positive',
  },
  {
    id: 'L_DIARY_05',
    text: '我不够好。这句话写下来，比说出来轻一点。',
    mood: 'negative',
    countsAsNotGoodEnough: true,
  },
  {
    id: 'L_DIARY_06',
    text: '今天有观众。有观众的日子，就是好日子。',
    mood: 'positive',
  },
  {
    id: 'L_DIARY_07',
    text: '如果我不是魔王，只是一个想被记住的人——那我是谁？',
    mood: 'negative',
    countsAsNotGoodEnough: true,
  },
  {
    id: 'L_DIARY_08',
    text: '我坚持到了谢幕。坚持本身就是一件可以写下来的事。',
    mood: 'positive',
  },
  {
    id: 'L_DIARY_09',
    text: '也许我不需要每次都被记住。我只需要今天，认真过完了。',
    mood: 'positive',
  },
];
