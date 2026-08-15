// components/HUD.tsx — phase wheel + 相尘 count + contextual tutorial hints (worldview-first §3 beats).
// v4: hints teach the four movement verbs (跳/泳/飘/爆冲) + bullet interactions, not the old auto-ride.
import { PHASE_ICON, PHASE_LABEL } from '../core/constants'
import type { GameState, Vec3 } from '../core/types'

const ORDER: Array<'solid' | 'liquid' | 'gas' | 'plasma'> = ['solid', 'liquid', 'gas', 'plasma']

function dist(a: Vec3, b: Vec3): number {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
}

// Contextual hint = the in-world teaching beats of the 5-minute script.
function hintFor(sim: GameState): string | null {
  const p = sim.player
  const collected = sim.shards.filter((s) => s.collected).length
  const pool = sim.layer.phaseFluids[0]
  const poolCenter = pool ? { x: (pool.min.x + pool.max.x) / 2, y: (pool.min.y + pool.max.y) / 2, z: (pool.min.z + pool.max.z) / 2 } : null
  const poolNear = pool && !pool.solidified && p.phase === 'solid' && poolCenter && dist(p.position, poolCenter) < 3.2

  // exploration ladder: four phases = four routes up the tower; gate needs 3 shards
  if (collected === 0 && p.switches === 0 && sim.elapsed < 30) return '四相各有一路 · 按住 Tab 上下左右选相'
  if (poolNear) return '走近相液池 · 石相会把它凝成桥，跨过无相区'
  if (collected === 0 && p.switches > 0 && p.switches < 3 && p.grounded) return '四相各有一路 · 换一相探索'
  if (collected === 1) return '已集 1 枚 · 还差 2 枚 — 还有没走过的相'
  if (collected === 2) return '已集 2 枚 · 再集 1 枚金门即开'
  if (p.phase === 'solid') return '空格 跳 · 西面石阶登顶'
  if (p.phase === 'liquid') return '按住空格 上浮 · 松手下沉'
  if (p.phase === 'gas') return '按住空格 悬浮 · 子弹直接穿过'
  if (p.phase === 'plasma') return '按空格 爆冲 · 焰相把子弹反射回去'
  const open = collected >= 3
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
        <div className="hud-switches">切相 {sim.player.switches} 次 · 被吃相 {sim.player.deaths} 次</div>
      </div>
      {hint && <div className="hud-hint">{hint}</div>}
      <div className="hud-keys">Tab 切相 · 空格 跳/浮/爆 · R 重生 · Esc 暂停</div>
    </div>
  )
}
