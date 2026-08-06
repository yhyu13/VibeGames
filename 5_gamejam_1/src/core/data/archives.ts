// core/data/archives.ts — 挑战者档案（TDD §5.4 冻结形状，02 §2 转写）
// L_ARCH_01..06：02 §2.2 前任挑战者档案（落款 + 评价正文）。
// L_ARCH_07..10：02 §2.3 档案反应 ×4 转写为"魔王批注"预设（补齐冻结契约 L_ARCH_01..10，文本全部出自 02）。
// ARCHIVE_GEN_TEMPLATES：上轮实录生成模板（01 §11 L_ARCH_GEN），占位符 {round}/{verdict}/{script} 由引擎填数。

import type { ArchiveEntry } from '../types';

export const ARCHIVE_PRESETS: ArchiveEntry[] = [
  {
    id: 'L_ARCH_01',
    name: '热心小勇者',
    lines: ['第一次打 Boss！好激动！最后被秒了但超帅的！ ｜（落款画了一个歪歪扭扭的爱心）'],
  },
  {
    id: 'L_ARCH_02',
    name: '毒舌老手',
    lines: ['走位跟老太太过马路似的。建议改行当史莱姆。'],
  },
  {
    id: 'L_ARCH_03',
    name: '认真记录者',
    lines: ['二阶段台词不错，但念到第三句的时候手在抖。扣一星。'],
  },
  {
    id: 'L_ARCH_04',
    name: '温柔来客',
    lines: ['虽然输了，但谢谢你带来的这场表演。下次我会更强地来。'],
  },
  {
    id: 'L_ARCH_05',
    name: '匆忙路人',
    lines: ['赶时间，随便打的。哦对了，你的王座挺好看。'],
  },
  {
    id: 'L_ARCH_06',
    name: '匿名（字迹犹豫）',
    lines: ['兄弟，你知道你是在表演，对吧？……算了，你就当不知道吧。'],
  },
  {
    id: 'L_ARCH_07',
    name: '魔王批注',
    lines: ['（盯着爱心看了很久）……幼稚。……幼稚，但我收下了。'],
  },
  {
    id: 'L_ARCH_08',
    name: '魔王批注',
    lines: ['手在抖……连你都看出来了。'],
  },
  {
    id: 'L_ARCH_09',
    name: '魔王批注',
    lines: ['（低头看王座）……你觉得好看，是吧。……嗯。'],
  },
  {
    id: 'L_ARCH_10',
    name: '魔王批注',
    lines: ['（把档案轻轻合上）演得……很差吗？……不对。你是怎么看出来这是演的？'],
  },
];

export const ARCHIVE_GEN_TEMPLATES: { name: string; lines: string[] }[] = [
  {
    name: '魔王自录 · 常规',
    lines: ['第 {round} 轮演出实录：剧本《{script}》，总评 {verdict}。'],
  },
  {
    name: '旁观者记 · 传闻',
    lines: [
      '传闻说，第 {round} 轮那场《{script}》，魔王得了个 {verdict}。',
      '传闻还说，散场后，他把档案翻到了新的一页。',
    ],
  },
  {
    name: '匿名短笺',
    lines: [
      '第 {round} 轮，《{script}》演完，{verdict}。',
      '没有署名。落款处画了一道歪歪扭扭的爱心。',
    ],
  },
];
