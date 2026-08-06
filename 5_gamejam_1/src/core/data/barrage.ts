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
