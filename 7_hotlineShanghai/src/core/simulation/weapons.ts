// src/core/simulation/weapons.ts — 开火 / 近战挥击 / E 长按投掷 / 换弹 / 拾取
// 机制对齐:TDD §4.4.2(武器表)、§5.1 契约(R16:空手 = 拳头、投掷唯一入口 = E 长按)
// core/ 平台纯净:零 THREE / 零 DOM / 零 zustand。
import type {
  Bullet,
  Grenade,
  MeleeSwing,
  Player,
  ThrownWeapon,
  Vec2,
  WeaponId,
  WeaponMode,
  WeaponSpec,
} from '../types';
import {
  PLAYER_MELEE_ARC_DEG,
  PLAYER_MELEE_DURATION,
  PLAYER_MELEE_RANGE,
  THROW_HOLD_DURATION,
} from '../constants';
import { WEAPON_TABLE } from '../data/weapons';
import { angleToVec } from '../math';

// ─── 本地命名常量(冻结表之外的弹道 / 投掷调参)───
const PROJECTILE_DEFAULT_SPEED = 60; // WeaponSpec.projectileSpeed 缺省(TDD §5.1 注释)
const THROW_SPEED = 16;              // E 长按投掷初速(u/s)
const THROW_DECEL = 8;               // 投掷物落地滚动摩擦减速度(u/s²)
const THROW_SPIN_RATE = 10;          // 地上武器自旋角速度(rad/s)
const THROWN_WEAPON_TTL = 10;        // 地上武器留存时间(s)
const GRENADE_FUSE = 1.5;            // 手雷引信(s,§4.4.2 注释 "1.5s 后爆")
const GRENADE_RADIUS_FALLBACK = 4;   // 手雷爆炸半径缺省(u)

let idSeq = 0;
const genId = (prefix: string): string =>
  `${prefix}_${Date.now().toString(36)}_${(idSeq += 1).toString(36)}`;

// 是否满足开火条件(未在换弹 / 冷却结束 / 弹匣非空)
export function canFire(weapon: WeaponSpec, ammo: number, reloading: number, fireCooldown: number): boolean {
  if (reloading > 0) return false;
  if (fireCooldown > 0) return false;
  if (weapon.ammo !== Infinity && ammo <= 0) return false;
  return true;
}

// 一次攻击的结果:远程生成子弹 / 近战生成挥击(附带下次攻击所需冷却 = 1/fireRate)
export type AttackResult =
  | { kind: 'ranged'; bullet: Bullet; cooldown: number }
  | { kind: 'melee'; swing: MeleeSwing; cooldown: number };

// LMB 攻击分发(按当前模式,§4.1 "按当前模式攻击"):
//   melee   → 近战挥击;空手 = 拳头 1 击(R16),拳头借用 knife 规格
//             (1.4u / 60° 与 PLAYER_MELEE_* 冻结值一致,注释于代码内)
//   ranged  → 开火(需持远程武器且弹匣非空)
//   throwing→ null(E 长按投掷中不可攻击)
// meleeRangeBonus 供面具修正(如 righteous 蒙面义士 +0.5u)。
export function playerAttack(player: Player, cooldown: number, meleeRangeBonus = 0): AttackResult | null {
  if (player.reloading > 0) return null;
  if (player.modeSwitchTimer > 0) return null; // F 切换硬直中不可攻击
  if (player.mode === 'throwing') return null;
  if (cooldown > 0) return null;

  if (player.mode === 'melee') {
    // 空手或未持近战类武器(如持枪 / 手雷时)→ 拳头挥击(借用 knife 规格)
    const heldId = player.weapon;
    let spec: WeaponSpec;
    let range: number;
    if (heldId !== null && WEAPON_TABLE[heldId].type === 'melee') {
      spec = WEAPON_TABLE[heldId];
      range = spec.range + meleeRangeBonus;
    } else {
      spec = WEAPON_TABLE.knife;
      range = PLAYER_MELEE_RANGE + meleeRangeBonus;
    }
    const swing: MeleeSwing = {
      ownerId: 'player',
      position: { x: player.position.x, y: player.position.y },
      facingAngle: player.facingAngle,
      range,
      arcDeg: PLAYER_MELEE_ARC_DEG,
      ttl: PLAYER_MELEE_DURATION,
      damage: spec.damage,
      weaponId: spec.id,
    };
    return { kind: 'melee', swing, cooldown: 1 / spec.fireRate };
  }

  if (player.mode === 'ranged') {
    if (player.weapon === null) return null;
    const spec = WEAPON_TABLE[player.weapon];
    if (spec.type !== 'ranged') return null; // 兜底:ranged 模式未持远程武器(normalizeMode 应已修正)
    if (!canFire(spec, player.ammo, player.reloading, cooldown)) return null;
    player.ammo -= 1;
    return { kind: 'ranged', bullet: makeBullet(player, spec), cooldown: 1 / spec.fireRate };
  }

  return null;
}

// 生成玩家子弹:朝向 + spread 扰动(角度标准差,弧度),射程 = range/速度
function makeBullet(player: Player, spec: WeaponSpec): Bullet {
  const speed = spec.projectileSpeed ?? PROJECTILE_DEFAULT_SPEED;
  const angle = player.facingAngle + (Math.random() * 2 - 1) * spec.spread;
  return {
    id: genId('bullet'),
    ownerId: 'player',
    position: { x: player.position.x, y: player.position.y },
    velocity: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
    damage: spec.damage,
    weaponId: spec.id,
    ttl: spec.range / speed,
  };
}

// 一次投掷的结果:手雷生成带引信的 Grenade;其余武器整件投出为可捡回的 ThrownWeapon
export type ThrowResult =
  | { grenade: Grenade }
  | { thrown: ThrownWeapon };

// E 长按投掷当前武器(R14 / R16 唯一投掷入口):
//   - 手雷:生成 Grenade(GRENADE_FUSE 后爆炸),弹匣余量 >0 则继续持有
//   - 其余(含飞刀 / 枪械 / 近战):整件投出,成为地上可捡回的 ThrownWeapon
export function throwCurrentWeapon(player: Player): ThrowResult | null {
  if (player.weapon === null) return null;
  const spec = WEAPON_TABLE[player.weapon];
  player.ammo -= 1;
  const dir = angleToVec(player.facingAngle);
  const velocity: Vec2 = { x: dir.x * THROW_SPEED, y: dir.y * THROW_SPEED };
  const origin: Vec2 = { x: player.position.x, y: player.position.y };

  if (spec.id === 'grenade') {
    const grenade: Grenade = {
      id: genId('grenade'),
      position: origin,
      velocity,
      timer: GRENADE_FUSE,
      radius: spec.explosionRadius ?? GRENADE_RADIUS_FALLBACK,
      damage: spec.damage,
    };
    if (player.ammo <= 0) player.weapon = null;
    return { grenade };
  }

  const thrown: ThrownWeapon = {
    id: genId('thrown'),
    weaponId: spec.id,
    position: origin,
    velocity,
    spin: 0,
    ttl: THROWN_WEAPON_TTL,
  };
  player.weapon = null;
  player.ammo = 0;
  return { thrown };
}

// E 长按投掷的 hold 状态机(E down → hold → 越过 THROW_HOLD_DURATION 阈值 → armed;
// throwEnd 时若 armed 则投出,否则取消并恢复 prevMode)。
export interface ThrowHold {
  holdTime: number;     // 已按住时长(s)
  armed: boolean;       // 是否已越过阈值(可投出)
  prevMode: WeaponMode; // 投掷前的模式,取消时恢复
}

// 推进 hold 计时;越过 THROW_HOLD_DURATION 阈值时返回 true(仅一次)
export function updateThrowHold(hold: ThrowHold, dt: number): boolean {
  hold.holdTime += dt;
  if (!hold.armed && hold.holdTime >= THROW_HOLD_DURATION) {
    hold.armed = true;
    return true;
  }
  return false;
}

// R 换弹:仅远程武器、弹匣未满、未在换弹中;reloadTime 取自武器表(§4.4.2)
export function tryReload(player: Player): void {
  if (player.weapon === null) return;
  const spec = WEAPON_TABLE[player.weapon];
  if (spec.type !== 'ranged') return;
  if (spec.ammo === Infinity) return;
  if (player.ammo >= spec.ammo) return;
  if (player.reloading > 0) return;
  player.reloading = spec.reloadTime;
}

// 拾取武器:装备并补满弹匣(∞ 弹保持 ∞)
export function pickupWeapon(player: Player, weaponId: WeaponId): void {
  player.weapon = weaponId;
  const spec = WEAPON_TABLE[weaponId];
  player.ammo = spec.ammo === Infinity ? Infinity : spec.ammo;
  player.reloading = 0;
}

// 子弹推进(移动 + TTL 衰减),返回本帧过期(已移除)的子弹
export function updateBullets(bullets: Bullet[], dt: number): Bullet[] {
  const expired: Bullet[] = [];
  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const b = bullets[i];
    b.position.x += b.velocity.x * dt;
    b.position.y += b.velocity.y * dt;
    b.ttl -= dt;
    if (b.ttl <= 0) {
      expired.push(b);
      bullets.splice(i, 1);
    }
  }
  return expired;
}

// 近战挥击推进(TTL 衰减),返回本帧过期(已移除)的挥击
export function updateMelee(melee: MeleeSwing[], dt: number): MeleeSwing[] {
  const expired: MeleeSwing[] = [];
  for (let i = melee.length - 1; i >= 0; i -= 1) {
    const m = melee[i];
    m.ttl -= dt;
    if (m.ttl <= 0) {
      expired.push(m);
      melee.splice(i, 1);
    }
  }
  return expired;
}

// 手雷推进(飞行 + 滚动摩擦 + 引信计时),返回本帧爆炸(已移除)的手雷
export function updateGrenades(grenades: Grenade[], dt: number): Grenade[] {
  const exploded: Grenade[] = [];
  for (let i = grenades.length - 1; i >= 0; i -= 1) {
    const g = grenades[i];
    g.position.x += g.velocity.x * dt;
    g.position.y += g.velocity.y * dt;
    const damp = Math.max(0, 1 - THROW_DECEL * dt);
    g.velocity.x *= damp;
    g.velocity.y *= damp;
    g.timer -= dt;
    if (g.timer <= 0) {
      exploded.push(g);
      grenades.splice(i, 1);
    }
  }
  return exploded;
}

// 地上武器推进(滚动摩擦 + 自旋 + TTL),返回本帧消失(已移除)的投掷物
export function updateThrownWeapons(thrownWeapons: ThrownWeapon[], dt: number): ThrownWeapon[] {
  const expired: ThrownWeapon[] = [];
  for (let i = thrownWeapons.length - 1; i >= 0; i -= 1) {
    const t = thrownWeapons[i];
    t.position.x += t.velocity.x * dt;
    t.position.y += t.velocity.y * dt;
    const damp = Math.max(0, 1 - THROW_DECEL * dt);
    t.velocity.x *= damp;
    t.velocity.y *= damp;
    t.spin += THROW_SPIN_RATE * dt;
    t.ttl -= dt;
    if (t.ttl <= 0) {
      expired.push(t);
      thrownWeapons.splice(i, 1);
    }
  }
  return expired;
}
