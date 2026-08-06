// core/data/ratingAxes.ts — A1–A4 评分轴（TDD §5.4 冻结形状，02 §10 文案逐条转写）

import type { RatingAxisDef } from '../types';

export const RATING_AXES: RatingAxisDef[] = [
  {
    id: 'mobility',
    label: '走位流畅度',
    auto: false,
    thresholds: {
      1: '像生了锈的钟摆。',
      2: '勉强没踩到自己的披风。',
      3: '中规中矩的方块舞。',
      4: '有一段连我自己都惊讶的滑步。',
      5: '王座厅里没有比我更优雅的存在。',
    },
  },
  {
    id: 'delivery',
    label: '台词感染力',
    auto: false,
    thresholds: {
      1: '观众可能在数天花板裂缝。',
      2: '忘词两次，但眼神还行。',
      3: '有一句让人起了鸡皮疙瘩。',
      4: '有一整段，房间安静得能听见烛火。',
      5: '连我自己都被自己说动了。',
    },
  },
  {
    id: 'visual',
    label: '视觉效果',
    auto: false,
    thresholds: {
      1: '像一团会走路的阴影。',
      2: '特效是烛火自己给的。',
      3: '披风甩得还算有气势。',
      4: '有个瞬间，像油画。',
      5: '这一帧，我想裱起来。',
    },
  },
  {
    id: 'remembered',
    label: '有没有让玩家记住',
    auto: true,
    thresholds: {
      1: '他明天就会忘记我的名字。',
      2: '也许能记住"有个紫色的大个子"。',
      3: '他回去可能会跟朋友提起。',
      4: '他会记住那一击，和我说的那句话。',
      5: '多年以后，他会想：那场战斗，那个魔王，是真的。',
    },
  },
];
