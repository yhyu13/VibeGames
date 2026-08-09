// src/components/DevPanel.tsx — RC 调参面板(仅 DEV;App 中 lazy + IS_DEV 门控,生产构建不挂载)
// 面板只发命令,不碰引擎:每次改动 → setRcConfig + sendUiCommand({ kind: 'setRcConfig' }),M1 引擎消费。
import * as React from 'react';
import { IS_DEV, RC_DEFAULTS, sendUiCommand, useUiStore } from '../store';
import type { UiRcConfig } from '../store';
import { RC_LIGHT_SCALE, RC_AMBIENT_INTENSITY } from '../core/constants';

export function DevPanel(): React.JSX.Element | null {
  const rcConfig = useUiStore((s) => s.rcConfig);
  const rcState = useUiStore((s) => s.rcState);
  const setRcConfig = useUiStore((s) => s.setRcConfig);
  const setShowDevPanel = useUiStore((s) => s.setShowDevPanel);

  // 兜底防护:即便被加载(不应发生),生产构建也渲染空
  if (!IS_DEV) return null;

  // store.UiRcConfig 尚未登记 lightScale/ambientIntensity(store.ts 不在本次
  // 白名单),此处扩展读取 + 常量兜底,经 setRcConfig 命令通道下发
  const panelRc = rcConfig as UiRcConfig & { lightScale?: number; ambientIntensity?: number };
  const lightScale = panelRc.lightScale ?? RC_LIGHT_SCALE;
  const ambientIntensity = panelRc.ambientIntensity ?? RC_AMBIENT_INTENSITY;

  const emit = (config: Partial<UiRcConfig>): void => {
    setRcConfig(config);
    sendUiCommand({ kind: 'setRcConfig', config });
  };

  const row = (label: string, value: string, control: React.JSX.Element): React.JSX.Element => (
    <label className="block">
      <div className="flex justify-between text-xs text-shanghai-paper">
        <span>{label}</span>
        <span className="text-shanghai-muzzle">{value}</span>
      </div>
      {control}
    </label>
  );

  return (
    <div className="clip-corner border-2 border-shanghai-neon bg-shanghai-ink/95 p-3 text-shanghai-paper">
      <div className="flex items-center justify-between text-sm tracking-widest text-shanghai-neon">
        <span>DEV · RC 调参</span>
        <button
          type="button"
          className="cursor-pointer border border-shanghai-paper/40 px-1 leading-none transition-colors hover:border-shanghai-muzzle hover:text-shanghai-muzzle"
          onClick={() => setShowDevPanel(false)}
        >
          ✕
        </button>
      </div>
      <div className="mt-3 space-y-3 text-sm">
        {row('传播衰减 propagationRate', rcConfig.propagationRate.toFixed(2), (
          <input
            type="range"
            min={0.5}
            max={1}
            step={0.01}
            value={rcConfig.propagationRate}
            className="w-full accent-shanghai-lantern"
            onChange={(e) => emit({ propagationRate: e.currentTarget.valueAsNumber })}
          />
        ))}
        {row('混合比 mixFactor', rcConfig.mixFactor.toFixed(2), (
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={rcConfig.mixFactor}
            className="w-full accent-shanghai-lantern"
            onChange={(e) => emit({ mixFactor: e.currentTarget.valueAsNumber })}
          />
        ))}
        {row('光增益 uLightScale', lightScale.toFixed(2), (
          <input
            type="range"
            min={0}
            max={4}
            step={0.05}
            value={lightScale}
            className="w-full accent-shanghai-lantern"
            onChange={(e) =>
              emit({ lightScale: e.currentTarget.valueAsNumber } as Partial<UiRcConfig>)
            }
          />
        ))}
        {row('环境光 ambientIntensity', ambientIntensity.toFixed(2), (
          <input
            type="range"
            min={0}
            max={2}
            step={0.01}
            value={ambientIntensity}
            className="w-full accent-shanghai-lantern"
            onChange={(e) =>
              emit({ ambientIntensity: e.currentTarget.valueAsNumber } as Partial<UiRcConfig>)
            }
          />
        ))}
        {row('Cascade 数', String(rcConfig.cascadeCount), (
          <select
            value={rcConfig.cascadeCount}
            className="w-full cursor-pointer bg-shanghai-plaster text-shanghai-ivory"
            onChange={(e) => emit({ cascadeCount: Number(e.currentTarget.value) })}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        ))}
        {row('分辨率 resolutionScale', rcConfig.resolutionScale.toFixed(1), (
          <select
            value={rcConfig.resolutionScale}
            className="w-full cursor-pointer bg-shanghai-plaster text-shanghai-ivory"
            onChange={(e) => emit({ resolutionScale: Number(e.currentTarget.value) })}
          >
            <option value={0.5}>0.5(半分辨率)</option>
            <option value={1}>1.0</option>
          </select>
        ))}
        <label className="flex items-center gap-2 text-xs text-shanghai-paper">
          <input
            type="checkbox"
            checked={rcConfig.ditherEnabled}
            className="accent-shanghai-lantern"
            onChange={(e) => emit({ ditherEnabled: e.currentTarget.checked })}
          />
          抖动回压 dither
        </label>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <button
          type="button"
          className="cursor-pointer border border-shanghai-paper/40 px-2 py-0.5 transition-colors hover:border-shanghai-muzzle hover:text-shanghai-muzzle"
          onClick={() =>
            emit({
              ...RC_DEFAULTS,
              lightScale: RC_LIGHT_SCALE,
              ambientIntensity: RC_AMBIENT_INTENSITY,
            } as Partial<UiRcConfig>)
          }
        >
          重置默认
        </button>
        <span className={rcState?.degraded ? 'text-shanghai-lantern' : 'text-shanghai-jade'}>
          {rcState
            ? `${rcState.lastFrameTimeMs.toFixed(1)}ms · 光${rcState.lightCount} · JFA${rcState.jfaPasses}${rcState.degraded ? ' · 降级' : ' · OK'}`
            : '无 RC 状态(M1)'}
        </span>
      </div>
      <div className="mt-2 text-[10px] leading-4 text-shanghai-steel">
        Ctrl+Shift+D 开关面板 · 生产构建不加载本模块
      </div>
    </div>
  );
}
