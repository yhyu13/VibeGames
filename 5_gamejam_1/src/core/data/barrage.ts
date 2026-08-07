// core/data/barrage.ts — 攻略弹幕（TDD §5.4 冻结形状，01 §11 L_BARRAGE_01..06 规格）
// 短、攻略向、略带损；首条为 01 §11 示例原文，其余沿同一风格（剑抖/忘词/披风/走位）。

import type { BarrageLine } from '../types';

export const BARRAGE_LINES: BarrageLine[] = [
  { id: 'L_BARRAGE_01', text: '他剑在抖！往左闪！' },
  { id: 'L_BARRAGE_02', text: '他忘词了！趁现在快输出！' },
  { id: 'L_BARRAGE_03', text: '别踩他披风！……算了踩了也没事。' },
  { id: 'L_BARRAGE_04', text: '他走位像老太太！预判他下一步！' },
  { id: 'L_BARRAGE_05', text: '第三句必卡壳！倒数三秒！' },
  { id: 'L_BARRAGE_06', text: '王座后面没陷阱。真的。……你信我。' },
];

export const ATTACK_REACTION_LINES = {
  cheer: [
    { id: 'L_REACT_CHEER_01', text: '哦哦哦这剑帅！' },
    { id: 'L_REACT_CHEER_02', text: '正拍！再来一下！' },
    { id: 'L_REACT_CHEER_03', text: '魔王今天真上班了！' },
  ],
  heckle: [
    { id: 'L_REACT_HECKLE_01', text: '站那儿别动！让他打！' },
    { id: 'L_REACT_HECKLE_02', text: '差一点就帅到了！' },
    { id: 'L_REACT_HECKLE_03', text: '拍子在前面等你呢！' },
  ],
  mock: [
    { id: 'L_REACT_MOCK_01', text: '空气掉血了吗？' },
    { id: 'L_REACT_MOCK_02', text: '这剑专门吓灰尘的！' },
    { id: 'L_REACT_MOCK_03', text: '重来吧，我们当没看见。' },
  ],
} satisfies Record<'cheer' | 'heckle' | 'mock', BarrageLine[]>;
