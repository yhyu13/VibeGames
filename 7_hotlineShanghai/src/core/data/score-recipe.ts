// src/core/data/score-recipe.ts — 结算屏印出的 S 级配方,唯一真源
//
// 这行字此前是 ScoreOverlay.tsx 里的一个字符串字面量,而同一句话在仓库里被手抄了十几处:
// score.ts 与 Simulation.ts 的注释、combat-loop:check 与 light-break:check、GDD §4.6、
// TDD §3、KNOWLEDGE、GAME-SOP、JOURNEY、BUGS B09。抄本多不算罪,没有仪器才是 ——
//
//   r33(2026-09-11)之前,Simulation.finishMission 用 `light.hp !== null` 过滤「可拆灯」,
//   而 types.ts 把 LightSource.hp 声明成 `hp: number`、不可拆的霓虹灯牌建的是 `hp: Infinity`:
//   一盏也滤不掉,`every(state === 'dead')` 恒假,+10 全拆灯加成从来没发出去过。在那段
//   时间里,一个 45 秒 0 受击全拾取通关的玩家拿到的是 83 分 A,而屏幕上那一行写着
//   「45s 内 …」—— 一句假话,当着一整套绿灯的测试、两个 check 和四份文档的面挂着,
//   没有任何一件仪器看过它。修好它是 r33 的事;让它不能再悄悄地假回去,是这个文件的事。
//
// 所以这里**不**把 45 换成算出来的 51。45 是 GDD §4.6 已公示的设计目标,改不改它是设计
// 决定(bug-405/413:r33 修好加成之后,真实上限是 51s,而公示的 45 是保守的),不是文案
// 修正 —— 屏幕自己把公示值改大,等于游戏单方面改契约,文档立刻变成谎话。
// 这里做的是把「这句承诺成立吗」变成一条会失败的条件:scripts/legend-check.mjs 的 E 段
// 拿真的 computeScore 去验它够不够得着,并把 ScoreOverlay 真渲染出来看它印了什么。

import { VERB_SEPARATOR } from './controls';

/**
 * S 级配方的公示时间上限(秒)。这是**设计目标**,不是从公式反推的结果:
 * S 奖励的是"安静、快速、不挨打地把活干完然后走人",GDD §4.6 / TDD §3 公示的就是 45。
 * 它必须真的够得着 —— 这一行只是那句承诺,验它的是 E 段,不是这里。
 */
export const S_RECIPE_TARGET_SECONDS = 45;

/**
 * 玩家以为要自己做到的几件事。前三条玩家真的能控制;最后一条(全拆灯)在结算那一刻
 * 必然成立,因为出口只在「那盏可拆灯已灭」时开启(Simulation.exitOpen)。那是既有设计
 * 事实,记录在 bug-405 —— 不在这行文案里单方面改掉。
 */
export const S_RECIPE_CLAUSES: readonly string[] = [
  `${S_RECIPE_TARGET_SECONDS}s 内`,
  '0 受击',
  '全拾取',
  '全拆灯',
];

/** 结算屏印的那一整行。分隔符与操作表同源(controls.ts 的 VERB_SEPARATOR),屏幕不发第二套标点。 */
export function sRecipeLine(): string {
  return `S 级配方:${S_RECIPE_CLAUSES.join(VERB_SEPARATOR)}`;
}
