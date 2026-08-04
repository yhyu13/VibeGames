import { WeaponDef, ProjectileType, FireMode } from '../types';

export const WEAPONS: WeaponDef[] = [
  { id: 1, name: '光束机枪', type: ProjectileType.Bullet, damage: 5, fireRate: 0.1, speed: 40, spread: 0.05, color: '#4488ff', unlockLevel: 1, description: '快速连射的基础光束武器', lockRange: 0, fireMode: FireMode.FreeFire },
  { id: 2, name: '追踪导弹', type: ProjectileType.Missile, damage: 20, fireRate: 0.8, speed: 20, spread: 0, color: '#ff6644', unlockLevel: 2, description: '自动追踪目标的导弹', lockRange: 60, fireMode: FireMode.LockRequired },
  { id: 3, name: '光束加农', type: ProjectileType.Beam, damage: 50, fireRate: 1.2, speed: 60, spread: 0, color: '#00ffff', unlockLevel: 3, description: '高穿透力的蓄力光束', lockRange: 80, fireMode: FireMode.LockRequired },
  { id: 4, name: '散射弹幕', type: ProjectileType.Spread, damage: 8, fireRate: 0.4, speed: 30, spread: 0.3, color: '#ffff00', unlockLevel: 4, description: '扇形扩散的近距离火力', lockRange: 0, fireMode: FireMode.FreeFire },
  { id: 5, name: '狙击光束', type: ProjectileType.Sniper, damage: 80, fireRate: 1.5, speed: 100, spread: 0, color: '#ff00ff', unlockLevel: 5, description: '远程高精度狙击', lockRange: 120, fireMode: FireMode.LockRequired },
  { id: 6, name: '浮游炮', type: ProjectileType.Funnel, damage: 12, fireRate: 0.3, speed: 15, spread: 0.1, color: '#00ff88', unlockLevel: 6, description: '自动攻击周围的浮游兵器', lockRange: 40, fireMode: FireMode.LockShortRange },
];

export function getWeapon(id: number): WeaponDef {
  return WEAPONS.find(w => w.id === id) || WEAPONS[0];
}
