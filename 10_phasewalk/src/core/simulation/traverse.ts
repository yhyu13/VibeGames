// core/simulation/traverse.ts — liquid pipes (polyline-param ride), gas vents, plasma wires (end-hold).
// Pure. Polish fixes U2/U3: pipe following is positional (arc-length advance along the centerline),
// so the player NEVER falls out at corners; wire riding stops at the far end (no jitter).
import { PIPE_CAPTURE_RADIUS, WIRE_CAPTURE_RADIUS } from '../constants'
import type { GameState, Vec3 } from '../types'

function segmentDist2(p: Vec3, a: Vec3, b: Vec3): number {
  const abx = b.x - a.x, aby = b.y - a.y, abz = b.z - a.z
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * abx + (p.y - a.y) * aby + (p.z - a.z) * abz) / (abx * abx + aby * aby + abz * abz || 1)))
  const cx = a.x + abx * t - p.x
  const cy = a.y + aby * t - p.y
  const cz = a.z + abz * t - p.z
  return cx * cx + cy * cy + cz * cz
}

// Arc-length polyline helpers.
function polylineParams(points: Vec3[]): { segs: number[]; total: number } {
  const segs: number[] = []
  let total = 0
  for (let i = 0; i < points.length - 1; i++) {
    segs.push(Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y, points[i + 1].z - points[i].z))
    total += segs[i]
  }
  return { segs, total }
}

function pointAt(points: Vec3[], arc: number, segs: number[]): Vec3 {
  let a = Math.max(0, Math.min(arc, segs.reduce((x, y) => x + y, 0)))
  for (let i = 0; i < points.length - 1; i++) {
    if (a <= segs[i] || i === points.length - 2) {
      const t = segs[i] > 0 ? a / segs[i] : 0
      return {
        x: points[i].x + (points[i + 1].x - points[i].x) * t,
        y: points[i].y + (points[i + 1].y - points[i].y) * t,
        z: points[i].z + (points[i + 1].z - points[i].z) * t,
      }
    }
    a -= segs[i]
  }
  return points[points.length - 1]
}

// Analytic nearest-point-on-polyline → arc length (no sampling — coarse sampling causes
// a fixed point: nearest sample lags behind the true arc and the flow advance snaps back).
function nearestArc(points: Vec3[], p: Vec3, segs: number[]): number {
  let bestArc = 0
  let bestD2 = Infinity
  let arc = 0
  for (let i = 0; i < points.length - 1; i++) {
    const abx = points[i + 1].x - points[i].x
    const aby = points[i + 1].y - points[i].y
    const abz = points[i + 1].z - points[i].z
    const len2 = abx * abx + aby * aby + abz * abz || 1
    const t = Math.max(0, Math.min(1,
      ((p.x - points[i].x) * abx + (p.y - points[i].y) * aby + (p.z - points[i].z) * abz) / len2,
    ))
    const cx = points[i].x + abx * t - p.x
    const cy = points[i].y + aby * t - p.y
    const cz = points[i].z + abz * t - p.z
    const d2 = cx * cx + cy * cy + cz * cz
    if (d2 < bestD2) {
      bestD2 = d2
      bestArc = arc + segs[i] * t
    }
    arc += segs[i]
  }
  return bestArc
}

// Liquid: ride along the pipe centerline (positional, arc-length advance).
// Returns true while riding.
export function applyPipes(s: GameState, dt: number): boolean {
  if (s.player.phase !== 'liquid') return false
  for (const pipe of s.layer.pipes) {
    const segs = polylineParams(pipe.points).segs
    let near = false
    for (let i = 0; i < pipe.points.length - 1; i++) {
      if (segmentDist2(s.player.position, pipe.points[i], pipe.points[i + 1]) < PIPE_CAPTURE_RADIUS * PIPE_CAPTURE_RADIUS) {
        near = true
        break
      }
    }
    if (!near) continue
    const arc = nearestArc(pipe.points, s.player.position, segs)
    const next = pointAt(pipe.points, arc + pipe.flowSpeed * dt, segs)
    s.player.velocity.x = (next.x - s.player.position.x) / dt
    s.player.velocity.y = (next.y - s.player.position.y) / dt
    s.player.velocity.z = (next.z - s.player.position.z) / dt
    s.player.position = next
    s.player.grounded = false
    return true
  }
  return false
}

// Gas: vents add impulse while inside.
export function applyVents(s: GameState): void {
  if (s.player.phase !== 'gas') return
  for (const v of s.layer.vents) {
    const dx = s.player.position.x - v.position.x
    const dy = s.player.position.y - v.position.y
    const dz = s.player.position.z - v.position.z
    if (dx * dx + dz * dz < v.radius * v.radius && Math.abs(dy) < 4) {
      s.player.velocity.x += v.impulse.x * 0.016
      s.player.velocity.y += v.impulse.y * 0.016
      s.player.velocity.z += v.impulse.z * 0.016
    }
  }
}

// Plasma: ride the wire toward the far end; hold position at the end (no jitter).
// Returns 'riding' | 'atEnd' | false. Rising fast (>2.5 m/s) = released (exit jump).
export function applyWires(s: GameState, dt: number): 'riding' | 'atEnd' | false {
  if (s.player.phase !== 'plasma') return false
  if (s.player.velocity.y > 2.5) return false // released — let them fly off (wire exit jump)
  if (s.player.wireReleased) return false     // no re-capture until grounded or phase switch
  for (const wire of s.layer.wires) {
    const segs = polylineParams(wire.points).segs
    let near = false
    for (let i = 0; i < wire.points.length - 1; i++) {
      if (segmentDist2(s.player.position, wire.points[i], wire.points[i + 1]) < WIRE_CAPTURE_RADIUS * WIRE_CAPTURE_RADIUS) {
        near = true
        break
      }
    }
    if (!near) continue
    const arc = nearestArc(wire.points, s.player.position, segs)
    const total = segs.reduce((x, y) => x + y, 0)
    if (arc >= total - 0.4) {
      // hold at the end — wait for the player to jump off / switch phase
      s.player.position = wire.points[wire.points.length - 1]
      s.player.velocity.x = 0
      s.player.velocity.y = 0
      s.player.velocity.z = 0
      s.player.grounded = false
      return 'atEnd'
    }
    const next = pointAt(wire.points, arc + wire.slideSpeed * dt, segs)
    s.player.velocity.x = (next.x - s.player.position.x) / dt
    s.player.velocity.y = (next.y - s.player.position.y) / dt
    s.player.velocity.z = (next.z - s.player.position.z) / dt
    s.player.position = next
    s.player.grounded = false
    return 'riding'
  }
  return false
}
