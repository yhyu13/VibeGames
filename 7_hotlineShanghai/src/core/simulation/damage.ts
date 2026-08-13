// src/core/simulation/damage.ts — 一击必杀 + BOSS 3 击 + 投掷物不杀 BOSS
// 纯函数:只修改传入实体状态,击杀判定以返回值暴露给协调器(派发 enemyKilled / playerKilled)。
// 规则来源:GDD §4.2(玩家一击毙命 / 敌人一击毙命 / BOSS 3 击 / 投掷物不杀 BOSS)。
import type { Enemy, LightSource, LightSourceState, Player } from '../types';
import { BREAKABLE_LIGHT_DAMAGE_MELEE, BREAKABLE_LIGHT_DAMAGE_THROW, ENEMY_HITS_TO_KILL, BOSS_HITS, LMB_LIGHT_PRIORITY_RANGE } from '../constants';

// 伤害来源:'weapon' = 子弹 / 近战;'throw' = 投掷物命中;'explosion' = 爆炸
export type DamageSource = 'weapon' | 'throw' | 'explosion';

// 该 archetype 需要的击杀数(普通敌人 1 击,BOSS 3 击,冻结 §4.4.4)
export function hitsToKill(archetype: Enemy['archetype']): number {
  return archetype === 'boss' ? BOSS_HITS : ENEMY_HITS_TO_KILL;
}

// 对敌人造成伤害;返回 true = 该敌人已死亡。
// 例外(GDD §4.2):BOSS 免疫投掷物与爆炸(投掷物不杀 BOSS),只能被子弹 / 近战命中 3 次。
export function damageEnemy(enemy: Enemy, dmg: number, source: DamageSource = 'weapon'): boolean {
  if (enemy.archetype === 'boss' && (source === 'throw' || source === 'explosion')) return false;
  enemy.hp -= dmg;
  return enemy.hp <= 0;
}

// 对玩家造成伤害;返回 true = 玩家死亡(一击必杀)。
// 翻滚无敌期间(dodgeTimer > 0,上限 PLAYER_DODGE_INVULN=0.4s)免疫伤害;
// 每次实际受击计入 player.hitsTaken(供任务评分使用)。
export function damagePlayer(player: Player): boolean {
  if (player.dodgeTimer > 0) return false;
  player.hitsTaken += 1;
  player.hp -= 1;
  return player.hp <= 0;
}

export interface LightSmashResult {
  hit: boolean;
  destroyed: boolean;
  hp: number;
  state: LightSourceState;
}

export function lightSmash(target: LightSource, aimDist: number, cause: 'melee' | 'throw' | 'weapon'): LightSmashResult {
  if (!target.breakable || target.state === 'dead' || aimDist > LMB_LIGHT_PRIORITY_RANGE) {
    return { hit: false, destroyed: false, hp: target.hp, state: target.state };
  }
  // B66:'weapon'(子弹)伤害与近战一致(1 击)——射击拆灯 = 玩家最自然的直觉路径,
  // 旧版只有近战/投掷能伤灯,玩家对灯连射无反馈
  const damage = cause === 'melee' || cause === 'weapon' ? BREAKABLE_LIGHT_DAMAGE_MELEE : BREAKABLE_LIGHT_DAMAGE_THROW;
  target.hp = Math.max(0, target.hp - damage);
  target.state = target.hp === 0 ? 'dead' : target.hp === 1 ? 'damaged' : 'intact';
  return { hit: true, destroyed: target.hp === 0, hp: target.hp, state: target.state };
}
