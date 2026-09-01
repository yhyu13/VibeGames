// core/constants.ts — frozen numeric tables (TDD §4).
export const GRAVITY_BASE = 30
export const PHASE_GRAVITY: Record<'solid' | 'liquid' | 'gas' | 'plasma', number> = {
  solid: 1.0, liquid: 0.6, gas: 0.18, plasma: 0.9,
}
// v4: four DISTINCT movement verbs (no auto-ride). solid = precise jump; liquid = swim; gas = hover;
// plasma = burst (no jump).
export const MOVE_SPEED: Record<'solid' | 'liquid' | 'gas' | 'plasma', number> = {
  solid: 5.5, liquid: 6, gas: 6.5, plasma: 8,
}
// only SOLID jumps. liquid/gas climb via swim/hover; plasma via burst.
export const JUMP_VELOCITY: Record<'solid' | 'liquid' | 'gas' | 'plasma', number> = {
  solid: 11, liquid: 0, gas: 0, plasma: 0,
}
// gas = hover cruise while holding jump (air feel polish U1)
export const GAS_HOVER_ACCEL = 11       // m/s² upward while jumpHeld in gas (net +5.6 vs gravity 5.4)
export const GAS_HOVER_MAX_VY = 4       // m/s cap
export const GAS_MAX_FALL = 3           // m/s sink cap in gas (air is floaty, not stone)
// liquid = free swim (v4): hold jump = rise, release = drift down. Raised so liquid can climb the tower.
export const LIQUID_SWIM_ACCEL = 8      // 1/s lerp rate toward LIQUID_SWIM_MAX_VY while jumpHeld (exponential approach, NOT m/s²)
export const LIQUID_SWIM_MAX_VY = 5     // m/s rise cap
export const LIQUID_MAX_FALL = 4        // m/s sink cap in liquid
// plasma = 爆冲 (burst launch): jumpPressed fires a diagonal rocket, gravity 0.9 arcs it back down.
export const PLASMA_BURST_VY = 12       // vertical launch
export const PLASMA_BURST_H = 8         // horizontal impulse multiplier (× input.x/z)
export const BURST_COOLDOWN = 0.4       // s between bursts
export const PHASE_SWITCH_COOLDOWN = 0.15
export const COYOTE_TIME = 0.10
export const JUMP_BUFFER_TIME = 0.12
export const MAX_FALL_SPEED = 25
export const PLAYER_RADIUS = 0.35
export const PLAYER_HALF_HEIGHT = 0.6
export const SHARD_COLLECT_RADIUS = 0.7
export const GATE_OPEN_SHARDS = 3
export const PASSWORD_PAD_RADIUS = 0.9  // m — horizontal step-on radius for 密文石板 (password pads)

// — 被吃相 hearts / loss state (P0: a real loss state via player HP) —
export const PLAYER_MAX_HP = 4          // hearts — solid-bullet + hazard hits each cost 1; 0 = game_over
export const POST_HIT_IFRAMES = 1.2     // s — no re-hit while > 0 (post-hit invulnerability window)
export const POST_HIT_KNOCKBACK = 7     // m/s — horizontal pop away from the damage source on a hit
export const POST_HIT_POP_VY = 3        // m/s — small vertical pop so the knockback reads as a hit

// 相灵弹 (bullets) — v4
export const BULLET_RADIUS = 0.28
export const BULLET_LIFE = 6             // s before despawn
export const BULLET_REFLECT_SPEED = 16   // reflected bullet flies back toward its emitter
export const STAGE_MARGIN = 3            // m — play volume = hallHalf + margin on every axis: bullets cull past it, the player clamps to it (ceiling)
export const SOLIDIFY_RADIUS = 1.6       // solid phase freezes a phase-fluid pool within this range

export const PHASE_ORDER: Array<'solid' | 'liquid' | 'gas' | 'plasma'> = ['solid', 'liquid', 'gas', 'plasma']
export const PHASE_LABEL: Record<'solid' | 'liquid' | 'gas' | 'plasma', string> = {
  solid: '石相', liquid: '流相', gas: '息相', plasma: '焰相',
}
export const PHASE_ICON: Record<'solid' | 'liquid' | 'gas' | 'plasma', string> = {
  solid: '■', liquid: '◯', gas: '∴', plasma: '∿', // 折线 (art-direction §3.3 — NOT lightning)
}
// 音叉基频 (worldview-first §3 节奏铁律)
export const PHASE_FREQ: Record<'solid' | 'liquid' | 'gas' | 'plasma', number> = {
  solid: 220, liquid: 330, gas: 440, plasma: 660,
}

// — 渲染 / toon 视觉调参 (art-direction §3.4; 单一事实源,避免 0.4/0.45 与 0.15/1.03 魔法数漂移) —
export const GHOST_ALPHA = 0.15     // 四相同现 ghost layer 可见时的不透明度
export const GHOST_DESAT = 0.4      // ghost layer −40% 饱和度 (作用于 ramp 每阶 — 全 hue ramp 下白色 base color 无 hue 可降)
export const OUTLINE_SCALE = 1.03   // 反转壳描边外扩比例
