/**
 * Heads-up display: title, physical readout (mass -> SI), and live FPS.
 */
import { useStore } from '../store'

function fmt(num: number): string {
  if (!isFinite(num)) return '—'
  if (Math.abs(num) >= 1e9) return num.toExponential(2)
  if (Math.abs(num) >= 1e4) return num.toLocaleString('en-US', { maximumFractionDigits: 0 })
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

function massLabel(massMsun: number): string {
  const e = Math.log10(massMsun)
  return `10^${e.toFixed(1)} M☉`
}

export function HUD() {
  const readout = useStore((s) => s.readout)
  const fps = useStore((s) => s.fps)
  const mass = useStore((s) => s.params.massMsun)

  const rows: Array<[string, string]> = [
    ['自旋 â = a/M', `${readout.spin.toFixed(3)}`],
    ['史瓦西半径 r_s', `${fmt(readout.rsKm)} km`],
    ['外视界 r₊', `${fmt(readout.outerHorizonKm)} km`],
    ['内视界 r₋', `${fmt(readout.innerHorizonKm)} km`],
    ['能层静态限', `${fmt(readout.ergosphereKm)} km`],
    ['顺行 ISCO', `${fmt(readout.iscoProKm)} km`],
    ['逆行 ISCO', `${fmt(readout.iscoRetroKm)} km`],
    ['吸积效率 η', `${(readout.accretionEfficiency * 100).toFixed(1)} %`],
  ]

  return (
    <div className="hud">
      <h1 className="hud-title">KERR 旋转黑洞</h1>
      <p className="hud-sub">旋转黑洞引力透镜 · 帧拖拽 + 不对称影子 + 拖拽吸积盘</p>
      <div className="hud-mass">质量 {massLabel(mass)}</div>
      <table className="hud-table">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <td>{k}</td>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="hud-fps">{fps} FPS</div>
    </div>
  )
}
