/**
 * Parameter control panel: sliders + toggles bound to the zustand store.
 */
import { useStore } from '../store'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  format: (v: number) => string
}

function Slider({ label, value, min, max, step, onChange, format }: SliderProps) {
  return (
    <label className="ctrl-row">
      <span className="ctrl-label">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <span className="ctrl-val">{format(value)}</span>
    </label>
  )
}

interface ToggleProps {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="ctrl-toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  )
}

export function ControlPanel() {
  const params = useStore((s) => s.params)
  const setParam = useStore((s) => s.setParam)
  const reset = useStore((s) => s.reset)

  return (
    <div className="control-panel">
      <div className="ctrl-header">
        <span>渲染参数</span>
        <button className="ctrl-reset" onClick={reset}>
          重置
        </button>
      </div>

      <Slider
        label="黑洞质量"
        value={Math.log10(params.massMsun)}
        min={0}
        max={12}
        step={0.01}
        onChange={(v) => setParam('massMsun', Math.pow(10, v))}
        format={(v) => `10^${v.toFixed(1)} M☉`}
      />
      <Slider
        label="自旋 â"
        value={params.spin}
        min={0}
        max={0.998}
        step={0.01}
        onChange={(v) => setParam('spin', v)}
        format={(v) => v.toFixed(3)}
      />
      <Slider
        label="盘温度"
        value={params.diskTempK}
        min={1500}
        max={40000}
        step={100}
        onChange={(v) => setParam('diskTempK', v)}
        format={(v) => `${Math.round(v).toLocaleString('en-US')} K`}
      />
      <Slider
        label="盘亮度"
        value={params.diskBrightness}
        min={0}
        max={3}
        step={0.05}
        onChange={(v) => setParam('diskBrightness', v)}
        format={(v) => v.toFixed(2)}
      />
      <Slider
        label="盘外半径"
        value={params.diskOuter}
        min={4}
        max={60}
        step={1}
        onChange={(v) => setParam('diskOuter', v)}
        format={(v) => `${Math.round(v)} r_s`}
      />
      <Slider
        label="星空密度"
        value={params.starDensity}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => setParam('starDensity', v)}
        format={(v) => v.toFixed(2)}
      />
      <Slider
        label="辉光强度"
        value={params.bloomStrength}
        min={0}
        max={4}
        step={0.05}
        onChange={(v) => setParam('bloomStrength', v)}
        format={(v) => v.toFixed(2)}
      />
      <Slider
        label="曝光"
        value={params.exposure}
        min={0.2}
        max={3}
        step={0.05}
        onChange={(v) => setParam('exposure', v)}
        format={(v) => v.toFixed(2)}
      />
      <Slider
        label="测地线步数"
        value={params.steps}
        min={16}
        max={256}
        step={8}
        onChange={(v) => setParam('steps', v)}
        format={(v) => `${Math.round(v)}`}
      />

      <div className="ctrl-divider" />
      <Toggle label="自动环绕" checked={params.autoOrbit} onChange={(v) => setParam('autoOrbit', v)} />
      <Toggle label="吸积盘" checked={params.showDisk} onChange={(v) => setParam('showDisk', v)} />
      <Toggle label="引力透镜" checked={params.lensing} onChange={(v) => setParam('lensing', v)} />

      <p className="ctrl-hint">拖拽旋转 · 滚轮缩放 · 右键平移关闭</p>
    </div>
  )
}
