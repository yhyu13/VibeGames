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
    ['史瓦西半径 r_s', `${fmt(readout.rsKm)} km`],
    ['光子球 1.5 r_s', `${fmt(readout.photonSphereKm)} km`],
    ['ISCO 3 r_s', `${fmt(readout.iscoKm)} km`],
    ['影子半径 b_crit', `${fmt(readout.bCritKm)} km`],
    ['俘获截面', `${fmt(readout.captureAreaKm2)} km²`],
    ['ISCO 轨道速度', `${readout.iscoSpeedC.toFixed(2)} c`],
  ]

  return (
    <div className="hud">
      <h1 className="hud-title">SCHWARZSCHILD 视界</h1>
      <p className="hud-sub">黑洞引力透镜可视化 · 测地线逐像素光线追踪</p>
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
