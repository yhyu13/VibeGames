import { SkillDef } from '../types';

export const SKILLS: SkillDef[] = [
  { id: 1, name: '护盾', description: '生成3秒无敌护盾', cooldown: 15, duration: 3, icon: '🛡️' },
  { id: 2, name: '时间减速', description: '周围敌人减速50%', cooldown: 20, duration: 3, icon: '⏱️' },
  { id: 3, name: '全弹发射', description: '所有武器同时攻击', cooldown: 30, duration: 2, icon: '💥' },
  { id: 4, name: '修复', description: '恢复30%HP', cooldown: 25, duration: 0, icon: '❤️' },
  { id: 5, name: '电磁脉冲', description: '范围内敌人眩晕3秒', cooldown: 25, duration: 3, icon: '⚡' },
  { id: 6, name: '推进爆发', description: '3秒移速x3+无敌', cooldown: 20, duration: 3, icon: '🔥' },
];

export const SPECIAL_ATTACKS = {
  fullBeam: { name: '全屏光束', damage: 200, range: 100, gaugeCost: 100 },
  orbitalStrike: { name: '卫星轨道炮', damage: 500, range: 20, gaugeCost: 100 },
  mirage: { name: '分身突击', damage: 50, count: 3, gaugeCost: 100 },
};
