// components/HUD.tsx — phase wheel + 相尘 count + contextual tutorial hints (worldview-first §3 beats).
import { PHASE_ICON, PHASE_LABEL } from '../core/constants'
import type { GameState, Vec3 } from '../core/types'

const ORDER: Array<'solid' | 'liquid' | 'gas' | 'plasma'> = ['solid', 'liquid', 'gas', 'plasma']

function dist(a: Vec3, b: Vec3): number {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
}

// Contextual hint = the in-world teaching beats of the 5-minute script.
function hintFor(sim: GameState): string | null {
  const p = sim.player
  const shard = (id: string) => sim.shards.find((s) => s.id === id)
  const collected = sim.shards.filter((s) => s.collected).length
  const pipeMouth = sim.layer.pipes[0]?.points[0]
  const wireStart = sim.layer.wires[0]?.points[0]
  const wireEnd = sim.layer.wires[0]?.points[sim.layer.wires[0].points.length - 1]
  const vent = sim.layer.vents[0]

  // exploration ladder (2026-08-14 playtest): four phases = four routes up the tower; gate needs 3 shards
  if (collected === 0 && sim.elapsed < 30 && p.switches === 0) return '四相各有一条路 · 按 1/2/3/4 选一条上塔'
  if (collected === 0 && p.switches > 0 && p.switches < 3 && p.grounded) return '四相各有一条路 · 换一相探索'
  if (collected === 1) return '已集 1 枚 · 还差 2 枚 — 还有没走过的相'
  if (collected === 2) return '已集 2 枚 · 再集 1 枚金门即开'
  if (pipeMouth && p.phase === 'solid' && dist(p.position, pipeMouth) < 4 && !shard('s2')?.collected) {
    return '跳起时按 2 — 相弹：切相不改动量'
  }
  if (p.phase === 'liquid' && !shard('s2')?.collected) return '按住空格 · 游泳控制 · 顺流而上'
  if (vent && p.phase === 'gas' && dist(p.position, vent.position) < 5 && !shard('s4')?.collected) {
    return '按住空格 · 乘风悬浮 · 别向东飘进雷云'
  }
  if (p.phase === 'gas' && !shard('s4')?.collected) return '息相轻盈 · 按住空格悬停'
  if (wireStart && p.phase === 'solid' && dist(p.position, wireStart) < 5 && !shard('s3')?.collected) {
    return '按 4 · 沿电线滑行'
  }
  if (p.phase === 'plasma' && wireEnd && dist(p.position, wireEnd) < 2.5) return '空格 · 跳线离场，切相落地'
  const open = sim.shards.filter((s) => s.collected).length >= 3
  if (open && dist(p.position, sim.layer.exit) > 3) return '金门已开 · 登顶'
  return null
}

export function HUD({ sim }: { sim: GameState }) {
  const collected = sim.shards.filter((s) => s.collected).length
  const hint = hintFor(sim)
  return (
    <div className="hud">
      <div className="hud-phase-wheel">
        {ORDER.map((p) => (
          <span key={p} className={'phase-icon' + (sim.player.phase === p ? ' active' : '')} data-phase={p}>
            {PHASE_ICON[p]}
          </span>
        ))}
      </div>
      <div className="hud-stats">
        <div className="hud-shards">相尘 {collected} / {sim.shards.length}</div>
        <div className="hud-layer">{sim.layer.name} · {PHASE_LABEL[sim.player.phase]}</div>
        <div className="hud-switches">切相 {sim.player.switches} 次 · 坠落 {sim.player.deaths} 次</div>
      </div>
      {hint && <div className="hud-hint">{hint}</div>}
      <div className="hud-keys">1/2/3/4 切相 · 空格 跳 · R 重生 · Esc 暂停</div>
    </div>
  )
}
