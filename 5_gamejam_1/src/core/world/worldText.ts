// core/world/worldText.ts — 世界即文本 tokenizers（TDD §3.4 / C.A.T Phase 3）
// 纯函数：把世界清单 + 规则 + 实体状态序列化为 LLM/调试可读文本。

import { WORLD } from './world';
import type { SimState } from '../simulation/Simulation';
import {
  A1_JITTER,
  A1_STANCE_HIT,
  A2_COMPLETENESS,
  A4_SEEN_5STAR,
  BAND_EFFECTS,
  COMBO_A3,
  KNOCKDOWN_EARLY_END,
  MAX_ROUNDS,
  PANIC_KNEEL_TIME,
  PERFORM_MAX_TIME,
  RATING_PERFECT,
  RATING_QUALIFIED,
  ROUND_TABLE,
  S_BARRAGE,
  S_BASE,
  S_FIRST_GLIMPSE,
  S_FORGOT,
  S_HESITATE,
  S_HIT,
  S_INTERRUPT,
  S_MISS,
  S_NORMAL_DODGE,
  S_PERFECT_DODGE,
  S_ROUND,
  S_STEADY_APPROACH,
  SENSE_TRIGGER_DIST,
} from '../constants';

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
  const rounds = ROUND_TABLE.map(
    (r, i) => `R${i + 1}: 逼近 ${r.approachSpeed}m/s · 伤害 ${r.damage} · 闪避 ${Math.round((r.dodgeNormal + r.dodgePerfect) * 100)}% · 弹幕 ≤${r.barrageMax} 条`,
  ).join(' | ');
  const bands = BAND_EFFECTS.map(
    (b) => `${b.band} 攻速×${b.attackSpeed} 完整率${Math.round(b.lineRate * 100)}% 威力×${b.power} 散射${b.spread}° 落空${b.miss * 100}%`,
  ).join('\n    ');
  return [
    '【规则 rules】',
    '- 操作: WASD 走位 · LMB 在攻击 beat 提示圈内出招 · 数字键 1/2/3 选剧本 · Enter 暂停',
    `- 目标: 完成 3 阶段剧本表演，总评 ≥${RATING_PERFECT} 完美 / ≥${RATING_QUALIFIED} 合格；击倒累计 ${KNOCKDOWN_EARLY_END} 次提前谢幕；无 Game Over`,
    `- 轮次表（共 ${MAX_ROUNDS} 轮）: ${rounds}`,
    `- 焦虑来源: 基线${S_BASE} · 轮次疲劳+${S_ROUND}×(R−1) · 首见+${S_FIRST_GLIMPSE} · 稳步逼近+${S_STEADY_APPROACH}/s · 犹豫+${S_HESITATE}/s · 弹幕+${S_BARRAGE}/条 · 命中+${S_HIT} · 完美闪避+${S_PERFECT_DODGE} · 普通闪避+${S_NORMAL_DODGE} · 落空+${S_MISS} · 忘词+${S_FORGOT} · 打断+${S_INTERRUPT}；焦虑 100 触发恐慌崩溃（跪地 ${PANIC_KNEEL_TIME}s 后回落 70）`,
    `- 焦虑衰减: 无源 3s 后 −2/s（<10 停止）；评估阶段 −4/s（最多 −40 不破 10）；分带效果:\n    ${bands}`,
    `- 评分轴（1–5 星）: A1 走位 站位≥${A1_STANCE_HIT}% 且抖动<${A1_JITTER}% → 5★ · A2 台词 完整率≥${A2_COMPLETENESS}% 且零忘词 → 5★ · A3 视觉 3/3 阶段且连击≥${COMBO_A3} → 5★ · A4 被看见 ≥${A4_SEEN_5STAR}（系统代填）`,
    `- 感知触发: 影子距离 <${SENSE_TRIGGER_DIST}m 进入 Perform；单阶段 ${PERFORM_MAX_TIME / 3}s、强制收尾 ${PERFORM_MAX_TIME}s`,
  ].join('\n');
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
