// core/data/archives.ts — 挑战者档案（预设 + 轮末生成）

import type { ArchiveEntry } from '../types';

export const ARCHIVE_PRESETS: ArchiveEntry[] = [
  {
    id: 'L_ARCH_01',
    name: '见习勇者 · 阿凯',
    lines: ['第一次挑战最终 Boss。', '被 Boss 的气场震住了，忘记拔剑。', '评价：输了，但不丢人。'],
  },
  {
    id: 'L_ARCH_02',
    name: '独行骑士 · 白露',
    lines: ['挑战三次，三次都走错门。', '第四次终于见到 Boss 本人。', '评价：Boss 看起来比我紧张。'],
  },
  {
    id: 'L_ARCH_03',
    name: '流浪法师 · 灰烬',
    lines: ['声称见过所有结局。', '在 Boss 谢幕时悄悄鼓掌。', '评价：值得收藏的演出。'],
  },
  {
    id: 'L_ARCH_GEN_1',
    name: '匿名观众',
    lines: ['只发过一条弹幕。', '弹幕内容已加密。', '评价：想再看一次。'],
    generated: true,
  },
];
