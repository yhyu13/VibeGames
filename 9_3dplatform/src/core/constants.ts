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

// --- Squash & stretch: the body's SHAPE, which the sim owns ---
// These were magic numbers in the renderer, mapping sim telemetry (an impact speed, a launch speed,
// a spent press) onto a scale. They live in core/ now because the shape is not a drawing decision:
// the collision box is built from it, so the renderer holding its own copy was a second opinion
// about a fact the sim had already fixed. The failure that produced was measurable — the drawn body
// rose clear of the box the world resolved against, and under the level's one overhang it drew
// itself inside the ceiling while the collider stopped it outside.
export const LAND_SQUASH_PER_IMPACT = 0.03 // squash per m/s of touchdown impact
export const LAND_SQUASH_MAX = 0.45 // the hardest fall this level can produce saturates here
export const LAUNCH_STRETCH_PER_SPEED = 0.03 // stretch per m/s of launch speed
export const LAUNCH_STRETCH_MAX = 0.4
export const DENIED_SQUASH = 0.18 // a spent air-jump press: one fixed, small squeeze
// How each beat splits across the two axes. A landing goes WIDE and short, a launch goes TALL and
// thin, otherwise the pair would read as one effect that merely changes size.
export const LAND_SQUASH_WIDE = 0.55
export const LAUNCH_STRETCH_THIN = 0.35
export const DENIED_SQUASH_WIDE = 0.5
// Decay, /s. Applied against the real frame delta, not the fixed step: "crosses out fast" is a
// wall-clock claim, so at 144 Hz the beat must fade over the same milliseconds it does at 60.
export const SQUASH_DECAY = 14
export const DENIED_DECAY = 30

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
