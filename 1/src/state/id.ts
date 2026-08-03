// Branded IDs to prevent accidental cross-type string mixing.

export type Brand<T, B extends string> = T & { readonly __brand: B };

export type RegionId = Brand<string, 'RegionId'>;
export type WeaponId = Brand<string, 'WeaponId'>;
export type AdaptationId = Brand<string, 'AdaptationId'>;
export type BurdenId = Brand<string, 'BurdenId'>;
export type ConditionId = Brand<string, 'ConditionId'>;
export type ElementId = Brand<string, 'ElementId'>;
export type FactionId = Brand<string, 'FactionId'>;
export type CommanderId = Brand<string, 'CommanderId'>;
export type ArchetypeId = Brand<string, 'ArchetypeId'>;
export type ProjectileId = Brand<string, 'ProjectileId'>;
export type DefenseId = Brand<string, 'DefenseId'>;
export type MissileId = Brand<string, 'MissileId'>;

export type OrbitalLane = 'high' | 'low' | 'atmosphere';

export const asRegionId = (s: string): RegionId => s as RegionId;
export const asWeaponId = (s: string): WeaponId => s as WeaponId;
export const asAdaptationId = (s: string): AdaptationId => s as AdaptationId;
export const asBurdenId = (s: string): BurdenId => s as BurdenId;
export const asConditionId = (s: string): ConditionId => s as ConditionId;
export const asElementId = (s: string): ElementId => s as ElementId;
export const asFactionId = (s: string): FactionId => s as FactionId;
export const asCommanderId = (s: string): CommanderId => s as CommanderId;
export const asArchetypeId = (s: string): ArchetypeId => s as ArchetypeId;
export const asProjectileId = (s: string): ProjectileId => s as ProjectileId;
export const asDefenseId = (s: string): DefenseId => s as DefenseId;
export const asMissileId = (s: string): MissileId => s as MissileId;