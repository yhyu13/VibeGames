// Frozen numeric tables from TDD.md §4. Physics: all m/s² / m/s / s.
export const GRAVITY = 30
export const MOVE_SPEED = 8
export const AIR_CONTROL = 0.85
export const GROUND_ACCEL = 60
export const GROUND_DECEL = 60
export const JUMP_VELOCITY = 11
export const DOUBLE_JUMP_VELOCITY = 9.5
export const JUMP_RELEASE_FACTOR = 0.5 // velocity × 0.5 on jump release (variable height)
export const COYOTE_TIME = 0.1
export const JUMP_BUFFER_TIME = 0.12
export const MAX_FALL_SPEED = 25
export const PLAYER_RADIUS = 0.35 // m, horizontal — treated as AABB half-width
export const PLAYER_HALF_HEIGHT = 0.6 // m, AABB half-height (total 1.2 m)

// Sim timestep.
export const FIXED_DT = 1 / 60
