// components/PauseScreen.tsx — pause overlay.
import type { GameState } from '../core/types'

export function PauseScreen({ sim }: { sim: GameState }) {
  void sim
  return (
    <div className="pause">
      <h1>静滞</h1>
      <p>Esc 继续 · R 重开本层</p>
    </div>
  )
}
