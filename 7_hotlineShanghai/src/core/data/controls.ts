// src/core/data/controls.ts — 操作表(唯一真源)
//
// 为什么这一行是数据而不是在组件里写一遍字面量:
// 标题画面和战斗 HUD 曾经各抄了一份同样的字符串。BUGS.md B66 记录过这对孪生字符串
// 漂移一次(改了 HUD,忘了改标题),round #16 只是把两份手动改回相等 —— 没有任何东西
// 阻止它再漂一次。所以这里存一份;scripts/legend-check.mjs 守着"不许出现第二份"。
//
// 共用一份解决了漂移,但标题画面**不再印它**了。原因不是漂移,是那句话在标题上是假的:
// 九条里没有一条在标题上管用,而屏幕不会告诉玩家这一点。现在标题只印它自己接的键
// (`SCREEN_VERBS.title`),战斗那一行印在它成立的那一屏 —— HUD,也就是开局第一帧。
//
// 键位本身不在这里:真源是 src/engine/InputManager.ts(+ App.tsx 的 Esc)。
// 这个文件只负责"教什么",不负责"键位是什么";legend-check 负责把两边对上,
// 所以一个不再存在的键位不会留在这张表里冒充可用的操作。
//
// 一张表不够,因为**同一句话不是对每一屏都成立**,而这件事是被量出来的而不是推出来的:
// `.vts-probes/hs-keys.mjs` 把表里教的每一个键,都拿到印它的那一屏上按一次,读界面有没有
// 任何变化。原表把 `Space 翻滚 · Tab 暂停 · Esc 返回标题` 三条件成"只有标题画面教的条目",
// 而这三条在标题屏上**全是死的** —— Space 与 Tab 的接线都在 InputManager(window 级、不
// 分相位),引擎在 `phase !== GP.MISSION_PLAY` 时把暂停丢掉(GameEngine.ts),Esc 在
// App.tsx 里明确跳过 TITLE(你就是从那儿来的)。同一屏上真正有反应的 Enter(→ 选择任务)
// 反而一个字都没教。脸谱屏也一样:Enter 与 Esc 是活的,夹在中间的 Tab 不是。
//
// 所以分组改成按"哪一屏"分,不按"算不算战斗条目"分。分组之后 legend-check 的 F 段才能
// 问出那个问题 —— 这一屏印的键,在这一屏上按下去真的会发生事吗。

/**
 * 战斗中常驻显示在 HUD 右下角的操作条目。顺序即显示顺序。
 *
 * 只有 HUD 印它,而且只有战斗那一屏印 —— 九条全靠 InputManager 的 window 级接线,
 * 引擎在非战斗相位既不步进也不累积输入,所以在别的屏上按它们不会发生任何事。
 * `Space 翻滚` 原先在最上面那张"只有标题画面教"的表里:它**只**出现在标题上(死的),
 * 而 HUD 里没有它。接线一直在(C 段按得到),教的位置反了。现在它和其余八条一起,
 * 只印在它管用的那一屏。
 */
export const CONTROL_VERBS: readonly string[] = [
  'WASD 慢走',
  'Shift+WASD 冲刺',
  'Space 翻滚',
  '鼠标瞄准',
  'LMB 射击',
  'RMB 挥刀',
  'R 掷枪',
  'E 拾取',
  'F 切换',
];

/** 非战斗画面各自印的那一行。键是画面,值是**在这一屏上按下去真的会发生事**的那些操作。 */
export type ScreenWithVerbs = 'title' | 'mask' | 'paused';

const BACK_TO_TITLE = 'Esc 返回标题';

/**
 * 每一屏只教它自己这一屏能按的键。
 *
 * `paused` 不在原来的表里(暂停遮罩自己手抄了一行),收进来是因为它是同一类东西:
 * 一句印在屏幕上、玩家会照着按的话。三条都是量出来的 —— Enter 在标题与脸谱屏上进入下一屏,
 * Esc 在脸谱屏与暂停遮罩上回到标题,`Tab 继续` 在暂停时把 `paused` 从 true 翻回 false。
 * 同一个 Tab 在标题与脸谱屏上什么也不会发生,所以它只出现在这一行里。
 */
export const SCREEN_VERBS: Readonly<Record<ScreenWithVerbs, readonly string[]>> = {
  title: ['Enter 开始游戏'],
  mask: ['Enter 开打', BACK_TO_TITLE],
  paused: ['Tab 继续', BACK_TO_TITLE],
};

/** 条目之间的分隔符 —— 两个画面必须用同一个,否则同一个列表会长得不一样。 */
export const VERB_SEPARATOR = ' · ';

/** 战斗条目行 —— HUD 与标题画面第一行都用它,所以两边不可能各长各的。 */
export function hudVerbs(): string {
  return CONTROL_VERBS.join(VERB_SEPARATOR);
}
