// components/GameOverScreen.tsx — 被吃相 结算 (hearts empty → the run's loss state).
import { LAYERS } from '../core/data/levels'
import type { GameState } from '../core/types'

export function GameOverScreen({ sim }: { sim: GameState }) {
  const mins = Math.floor(sim.elapsed / 60)
  const secs = Math.floor(sim.elapsed % 60)
  const totalDust = LAYERS.reduce((n, l) => n + l.shards.length, 0)
  return (
    <div className="victory gameover">
      <h1>被吃相。</h1>
      <p className="victory-sub">四相尽蚀，相核熄灭。塔记住了你的步伐。</p>
      <div className="victory-stats">
        <div>达到 {sim.layer.name} · 第 {sim.player.layer} 层</div>
        <div>相尘 {sim.player.phaseDust} / {totalDust}</div>
        <div>时间 {mins}:{String(secs).padStart(2, '0')}</div>
        <div>切相 {sim.player.switches} 次</div>
        <div>最佳切相 {sim.bestSwitches[sim.layer.id] ?? sim.player.switches} 次</div>
      </div>
      {/* 被吃相 lives in the footer, not the stats block: the block is THIS climb, the footer is the
          tower's ledger — same home as 累积相尘. The count includes the death that just happened. */}
      <p className="victory-hint">按 R 重新登塔 · 累积相尘 {sim.totalPhaseDust} · 被吃相共 {sim.totalDeaths} 次</p>
    </div>
  )
}
