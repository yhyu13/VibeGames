// core/constants.ts — frozen numeric tables (TDD §4).
export const GRAVITY_BASE = 30
export const PHASE_GRAVITY: Record<'solid' | 'liquid' | 'gas' | 'plasma', number> = {
  solid: 1.0, liquid: 0.6, gas: 0.18, plasma: 0.9, // plasma falls when off-wire (wires own velocity while riding)
}
export const MOVE_SPEED: Record<'solid' | 'liquid' | 'gas' | 'plasma', number> = {
  solid: 8, liquid: 7, gas: 7, plasma: 8,
}
export const JUMP_VELOCITY: Record<'solid' | 'liquid' | 'gas' | 'plasma', number> = {
  solid: 11, liquid: 9, gas: 8.5, plasma: 0,
}
// air feel (polish U1): gas = hover while holding jump; liquid = swim control (polish U2)
export const GAS_HOVER_ACCEL = 11       // m/s² upward while jumpHeld in gas (net +5.6 vs gravity 5.4)
export const GAS_HOVER_MAX_VY = 4       // m/s cap
export const GAS_MAX_FALL = 3           // m/s sink cap in gas (air is floaty, not stone)
export const LIQUID_MAX_FALL = 4        // m/s sink cap in liquid
export const LIQUID_SWIM_ACCEL = 3      // m/s² upward while jumpHeld in liquid
export const LIQUID_SWIM_MAX_VY = 2.5   // m/s cap
export const PHASE_SWITCH_COOLDOWN = 0.15
export const PIPE_FLOW_SPEED = 4
export const VENT_IMPULSE = 14
export const WIRE_SLIDE_SPEED = 12
export const WIRE_EXIT_JUMP = 8.5
export const COYOTE_TIME = 0.10
export const JUMP_BUFFER_TIME = 0.12
export const MAX_FALL_SPEED = 25
export const PLAYER_RADIUS = 0.35
export const PLAYER_HALF_HEIGHT = 0.6
export const SHARD_COLLECT_RADIUS = 0.7
export const GATE_OPEN_SHARDS = 3
export const PIPE_CAPTURE_RADIUS = 1.2   // 极致时刻② 100% 成功率兜底 (worldview-first §4)
export const WIRE_CAPTURE_RADIUS = 1.0
export const VENT_CAPTURE_RADIUS = 1.4
export const INTRO_DURATION = 2.5        // layer intro card

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
