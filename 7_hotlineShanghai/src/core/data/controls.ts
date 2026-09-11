// src/core/data/controls.ts — 操作表(唯一真源)
//
// 为什么这一行是数据而不是两个组件里各写一遍的字面量:
// 标题画面和战斗 HUD 教的是同一套操作,但它们各抄了一份同样的字符串。
// BUGS.md B66 记录过这对孪生字符串漂移一次(改了 HUD,忘了改标题),
// round #16 只是把两份手动改回相等 —— 没有任何东西阻止它再漂一次。
// 所以这里存一份,两个组件都读它;scripts/legend-check.mjs 守着"不许出现第二份"。
//
// 键位本身不在这里:真源是 src/engine/InputManager.ts(+ App.tsx 的 Esc)。
// 这个文件只负责"教什么",不负责"键位是什么";legend-check 负责把两边对上,
// 所以一个不再存在的键位不会留在这张表里冒充可用的操作。

/** 战斗中常驻显示在 HUD 右下角的操作条目。顺序即显示顺序。 */
export const CONTROL_VERBS: readonly string[] = [
  'WASD 慢走',
  'Shift+WASD 冲刺',
  '鼠标瞄准',
  'LMB 射击',
  'RMB 挥刀',
  'R 掷枪',
  'E 拾取',
  'F 切换',
];

/**
 * 只有标题画面教的条目。战斗里它们要么无效(Space 在暂停时不响应)、
 * 要么已经由画面本身说明(Esc 返回标题),所以不进 HUD。
 */
export const TITLE_ONLY_VERBS: readonly string[] = ['Space 翻滚', 'Tab 暂停', 'Esc 返回标题'];

/** 条目之间的分隔符 —— 两个画面必须用同一个,否则同一个列表会长得不一样。 */
export const VERB_SEPARATOR = ' · ';

/** 战斗条目行 —— HUD 与标题画面第一行都用它,所以两边不可能各长各的。 */
export function hudVerbs(): string {
  return CONTROL_VERBS.join(VERB_SEPARATOR);
}
