// core/data/ratingAxes.ts — 四轴自评定义

import type { RatingAxisDef } from '../types';

export const RATING_AXES: RatingAxisDef[] = [
  {
    id: 'mobility',
    label: '走位流畅度',
    auto: false,
    thresholds: {
      1: '几乎没离开王座',
      2: '站了几个位，但总是慢半拍',
      3: '该到的位置都到了',
      4: '走位干脆，节奏很稳',
      5: '行云流水，观众以为你在跳舞',
    },
  },
  {
    id: 'delivery',
    label: '台词感染力',
    auto: false,
    thresholds: {
      1: '忘词忘到只剩沉默',
      2: '念完了，但语气像念说明书',
      3: '关键句都说到位了',
      4: '有几句话让弹幕刷了屏',
      5: '全场屏息——你真的是演员',
    },
  },
  {
    id: 'visual',
    label: '视觉效果',
    auto: false,
    thresholds: {
      1: '披风都是歪的',
      2: '站姿还算有样',
      3: '灯光给足了面子',
      4: '挥剑的瞬间很上镜',
      5: '每一帧都能当直播封面',
    },
  },
  {
    id: 'remembered',
    label: '有没有让玩家记住',
    auto: true,
    thresholds: {
      1: '没人记得这场演出',
      2: '观众中途就走了几个',
      3: '有人截图留念',
      4: '弹幕开始刷你的名字',
      5: '这场演出会被剪进传说',
    },
  },
];
