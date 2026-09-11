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

// Impact floor for the LANDING BEAT, m/s downward. Below it a touch-down is a step-off, not a
// landing: no squash, no thud. One constant because it is one event — and the comparison is made
// once, in GameSim, which publishes the verdict as `SimFeedback.landBeat`. The renderer and the
// audio each used to re-write `landImpact > LAND_BEAT_MIN_IMPACT` against this number; they now
// read the verdict and hold no copy of the floor to drift from, which is the point of publishing
// it rather than the constant.
export const LAND_BEAT_MIN_IMPACT = 7

// Below the world, m. The ground is a FINITE plate: 60x60 centred on the origin, 1 m thick, so its
// underside is y=-1 and its standable TOP is y=0. Read off the scene's own colliders, the standable
// tops are the floating pad at 3.3, the side ledge at 3.0, the raised island at 2.0 and the plate
// itself at 0 — so the lowest thing the keeper can stand on is the plate, and everything below that
// is not ground at all. A body under this line has left the arena sideways rather than missed a
// jump, and no amount of skill gets it back: the plate is the last thing to stand on, so once the
// body is past its edge there is nothing left to land on and nothing to steer toward.
// The margin is deliberate: 6 m below the plate's top surface (5 m past its underside), about
// 0.6 s of falling from rest, so the player sees themselves leave the level before it catches them
// instead of blinking straight to the spawn.
export const FALL_OUT_Y = -6

// Sim timestep.
export const FIXED_DT = 1 / 60
