import { EnemyDef, EnemyType } from '../types';

export const ENEMY_DEFS: EnemyDef[] = [
  { type: EnemyType.Scout, name: '侦察兵', hp: 20, speed: 12, damage: 5, attackRange: 20, alertRange: 40, score: 10, color: '#44aaff', size: 1 },
  { type: EnemyType.Assault, name: '突击兵', hp: 40, speed: 18, damage: 10, attackRange: 15, alertRange: 35, score: 20, color: '#ff6644', size: 1.2 },
  { type: EnemyType.Sniper, name: '狙击手', hp: 15, speed: 8, damage: 25, attackRange: 50, alertRange: 60, score: 25, color: '#ff00ff', size: 0.8 },
  { type: EnemyType.Shield, name: '护盾兵', hp: 60, speed: 10, damage: 8, attackRange: 18, alertRange: 30, score: 30, color: '#00ffff', size: 1.5 },
  { type: EnemyType.Bomber, name: '自爆兵', hp: 10, speed: 25, damage: 40, attackRange: 3, alertRange: 30, score: 15, color: '#ff0000', size: 0.8 },
  { type: EnemyType.Commander, name: '指挥官', hp: 80, speed: 8, damage: 15, attackRange: 25, alertRange: 50, score: 50, color: '#ffaa00', size: 1.3 },
];

export function getEnemyDef(type: EnemyType): EnemyDef {
  return ENEMY_DEFS.find(e => e.type === type) || ENEMY_DEFS[0];
}
