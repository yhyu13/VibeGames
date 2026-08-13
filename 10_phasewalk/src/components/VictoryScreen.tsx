// components/VictoryScreen.tsx — 登顶结算 (prototype: single layer).
import type { GameState } from '../core/types'

export function VictoryScreen({ sim }: { sim: GameState }) {
  const mins = Math.floor(sim.elapsed / 60)
  const secs = Math.floor(sim.elapsed % 60)
  return (
    <div className="victory">
      <h1>塔，还高着。</h1>
      <p className="victory-sub">启示厅已明。四相之阶，在你脚下。</p>
      <div className="victory-stats">
        <div>相尘 {sim.totalPhaseDust} / 4</div>
        <div>时间 {mins}:{String(secs).padStart(2, '0')}</div>
        <div>切相 {sim.player.switches} 次</div>
      </div>
      <p className="victory-hint">原型结束 · 按 R 重新开始</p>
    </div>
  )
}
