import type { Projectile, ShipState } from "../core/types";
import { ORBIT_RADIUS } from "../core/types";

export interface InterpFrame<T> {
  prev: T;
  curr: T;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpVec3(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }, t: number): { x: number; y: number; z: number } {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t) };
}

export function lerpProjectile(prev: Projectile[], curr: Projectile[], alpha: number): Projectile[] {
  const map = new Map(curr.map((p) => [p.id, p]));
  return curr.map((p) => {
    const old = prev.find((x) => x.id === p.id);
    if (!old) return p;
    return { ...p, position: lerpVec3(old.position, p.position, alpha) };
  });
}

export function interpolateShip(prev: ShipState, curr: ShipState, alpha: number): ShipState {
  return {
    ...curr,
    yaw: lerp(prev.yaw, curr.yaw, alpha),
    pitch: lerp(prev.pitch, curr.pitch, alpha),
  };
}

export function shipWorldPosition(ship: ShipState): { x: number; y: number; z: number } {
  const cosP = Math.cos(ship.pitch);
  return {
    x: ORBIT_RADIUS * cosP * Math.cos(ship.yaw),
    y: ORBIT_RADIUS * Math.sin(ship.pitch),
    z: -ORBIT_RADIUS * cosP * Math.sin(ship.yaw),
  };
}
