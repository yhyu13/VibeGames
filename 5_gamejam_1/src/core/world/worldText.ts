// core/world/worldText.ts — 世界即文本 tokenizers（TDD §3.4 / C.A.T Phase 3）
// 纯函数：把世界清单 + 规则 + 实体状态序列化为 LLM/调试可读文本。

import { WORLD } from './world';
import type { SimState } from '../simulation/Simulation';

export function describeWorld(): string {
  const b = WORLD.roomBounds;
  return [
    '【世界清单 world】',
    `- 王座厅边界: x[${b.min.x},${b.max.x}] y[${b.min.y},${b.max.y}] z[${b.min.z},${b.max.z}]`,
    `- 王座位置: (${WORLD.thronePos.x}, ${WORLD.thronePos.y}, ${WORLD.thronePos.z})`,
    `- 站位锚点: ${WORLD.stageMarkers.map((m) => `(${m.x},${m.z})`).join(' ') }`,
    `- 玩家影子路径: (${WORLD.shadowPath.from.x},${WORLD.shadowPath.from.z}) → (${WORLD.shadowPath.to.x},${WORLD.shadowPath.to.z})`,
    `- 立柱碰撞体: ${WORLD.colliders.length} 根`,
    `- 灯光锚点: 烛火(${WORLD.lightAnchors.candle.x},${WORLD.lightAnchors.candle.y}) 顶光(${WORLD.lightAnchors.spot.x},${WORLD.lightAnchors.spot.y})`,
  ].join('\n');
}

export function describeRules(): string {
  // 由 agent-core 填充：控制、胜负、轮次表、焦虑 S/R 表摘要、评分规则
  return '【规则 rules】\n- TODO agent-core: 填充规则摘要（控制方式 / 胜负 / 轮次表 / 焦虑来源与衰减 / 评分轴）';
}

export function describeEntities(simState: SimState): string {
  const boss = simState.boss;
  return [
    '【实体 entities】',
    `- Boss: state=${boss.innerState} hp=${boss.hp}/${boss.maxHp} anxiety=${boss.anxiety} band=${boss.band} seen=${boss.seen} script=${boss.script ?? 'none'} stage=${boss.stageIndex + 1}/3 beat=${boss.beatIndex} knockdowns=${boss.knockdownCount}`,
    `- 全局阶段: ${simState.phase} round=${simState.round}`,
    `- 玩家替身: ${simState.player.state} distance=${simState.player.distanceToThrone.toFixed(1)}m hits=${simState.player.hitsLanded} dodges=${simState.player.dodgeCount}`,
  ].join('\n');
}

export function buildPromptContext(simState: SimState): string {
  return [describeWorld(), describeRules(), describeEntities(simState)].join('\n\n');
}
