// components/VictoryScreen.tsx — 登顶结算 (full tower: 5 floors, 20 相尘).
import { LAYERS } from '../core/data/levels'
import type { GameState } from '../core/types'

export function VictoryScreen({ sim }: { sim: GameState }) {
  const mins = Math.floor(sim.elapsed / 60)
  const secs = Math.floor(sim.elapsed % 60)
  const totalDust = LAYERS.reduce((n, l) => n + l.shards.length, 0)
  // bestSwitches[layerId] = min RUN-CUMULATIVE switches at that layer's gate (switches never resets),
  // so the final layer's value IS the min switches to clear the tower. Summing the per-layer prefixes
  // would inflate it 3–5×.
  const bestTotal = sim.bestSwitches[sim.layer.id] ?? sim.player.switches
  return (
    <div className="victory">
      <h1>塔顶，到了。</h1>
      <p className="victory-sub">五层相阶皆明。四相塔，记住了你。</p>
      <div className="victory-stats">
        <div>相尘 {sim.player.phaseDust} / {totalDust}</div>
        <div>时间 {mins}:{String(secs).padStart(2, '0')}</div>
        <div>切相 {sim.player.switches} 次</div>
        <div>最佳切相 {bestTotal} 次</div>
        <div>被吃相 {sim.player.deaths} 次</div>
      </div>
      <p className="victory-hint">按 R 重新登塔 · 累积相尘 {sim.totalPhaseDust}</p>
    </div>
  )
}
