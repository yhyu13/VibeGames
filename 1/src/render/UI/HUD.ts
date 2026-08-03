// HUD: in-DOM overlay, signal-driven.

import { effect } from '@preact/signals-core';
import type { RunState } from '../../state/types.js';
import { tierOf } from '../../state/ship/Instability.js';

export class HUD {
  readonly root: HTMLDivElement;
  private bars = {
    hull: this.makeBar('HULL'),
    shield: this.makeBar('SHIELD'),
    energy: this.makeBar('ENERGY'),
    heat: this.makeBar('HEAT'),
    signal: this.makeBar('SIGNAL'),
    instability: this.makeBar('INSTABILITY'),
  };
  private earthPanel: HTMLDivElement;
  private counterPanel: HTMLDivElement;
  private missilePanel: HTMLDivElement;
  private phasePanel: HTMLDivElement;

  constructor(private run: RunState) {
    this.root = document.createElement('div');
    this.root.id = 'hud';
    Object.assign(this.root.style, {
      position: 'fixed',
      inset: '0',
      pointerEvents: 'none',
      fontFamily: 'ui-monospace, "Cascadia Mono", monospace',
      color: '#e8e8f0',
      fontSize: '12px',
      letterSpacing: '0.04em',
      userSelect: 'none',
    });

    const top = document.createElement('div');
    Object.assign(top.style, {
      position: 'absolute',
      top: '12px',
      left: '12px',
      right: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
    });
    this.phasePanel = document.createElement('div');
    Object.assign(this.phasePanel.style, {
      padding: '6px 10px',
      border: '1px solid #9b6cff',
      background: 'rgba(5,6,16,0.7)',
    });
    top.appendChild(this.phasePanel);
    this.counterPanel = document.createElement('div');
    Object.assign(this.counterPanel.style, {
      padding: '6px 10px',
      border: '1px solid #ff5b6c',
      background: 'rgba(5,6,16,0.7)',
      maxWidth: '360px',
    });
    top.appendChild(this.counterPanel);
    this.root.appendChild(top);

    const shipPanel = document.createElement('div');
    Object.assign(shipPanel.style, {
      position: 'absolute',
      bottom: '12px',
      left: '12px',
      padding: '10px',
      border: '1px solid #9b6cff',
      background: 'rgba(5,6,16,0.7)',
      minWidth: '220px',
    });
    for (const b of Object.values(this.bars)) shipPanel.appendChild(b.root);
    this.root.appendChild(shipPanel);

    this.earthPanel = document.createElement('div');
    Object.assign(this.earthPanel.style, {
      position: 'absolute',
      bottom: '12px',
      right: '12px',
      padding: '10px',
      border: '1px solid #6cffff',
      background: 'rgba(5,6,16,0.7)',
      minWidth: '240px',
    });
    this.root.appendChild(this.earthPanel);

    this.missilePanel = document.createElement('div');
    Object.assign(this.missilePanel.style, {
      position: 'absolute',
      top: '60px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '6px 12px',
      border: '1px solid #ff5b6c',
      background: 'rgba(5,6,16,0.85)',
      display: 'none',
    });
    this.root.appendChild(this.missilePanel);

    document.body.appendChild(this.root);

    this.bindEffects();
  }

  private makeBar(label: string) {
    const root = document.createElement('div');
    Object.assign(root.style, { marginBottom: '4px' });
    const labelEl = document.createElement('div');
    labelEl.textContent = label;
    Object.assign(labelEl.style, { fontSize: '10px', opacity: 0.7 });
    const bar = document.createElement('div');
    Object.assign(bar.style, {
      width: '200px',
      height: '6px',
      background: '#1a1a26',
      border: '1px solid #3a3a55',
      position: 'relative',
      marginTop: '2px',
    });
    const fill = document.createElement('div');
    Object.assign(fill.style, {
      height: '100%',
      width: '100%',
      background: '#9b6cff',
      transition: 'width 0.15s',
    });
    bar.appendChild(fill);
    root.appendChild(labelEl);
    root.appendChild(bar);
    const value = document.createElement('span');
    Object.assign(value.style, { float: 'right', fontSize: '10px' });
    labelEl.appendChild(value);
    return { root, fill, value };
  }

  private setBar(bar: { fill: HTMLDivElement; value: HTMLSpanElement }, v: number, color: string) {
    bar.fill.style.width = `${Math.max(0, Math.min(100, v))}%`;
    bar.fill.style.background = color;
    bar.value.textContent = `${Math.round(v)}`;
  }

  private bindEffects(): void {
    const earth = this.run.earth;
    const ship = this.run.ship;

    effect(() => {
      this.setBar(this.bars.hull, ship.hull.value, '#ff5b6c');
      this.setBar(this.bars.shield, ship.shield.value, '#6cffff');
      this.setBar(this.bars.energy, ship.energy.value, '#9b6cff');
      this.setBar(this.bars.heat, ship.heat.value, '#ffaa4a');
      this.setBar(this.bars.signal, ship.signal.value, '#ffb86c');
      this.setBar(this.bars.instability, ship.instability.value, '#ff5b6c');
    });

    effect(() => {
      const tier = tierOf(ship.instability.value);
      this.bars.instability.root.style.color = tier === 'collapse' ? '#ff5b6c' : '';
    });

    effect(() => {
      this.phasePanel.textContent = `PHASE ${earth.escalationPhase.value}/5 · RESPONSE ${Math.round(earth.responseClock.value)}`;
    });

    effect(() => {
      const next = earth.nextCounter.value;
      const active = earth.activeCounter.value;
      if (next) {
        this.counterPanel.textContent = `⚠ INCOMING: ${next.name} — ${next.description}`;
        this.counterPanel.style.borderColor = '#ffaa4a';
      } else if (active) {
        this.counterPanel.textContent = `ACTIVE COUNTER: ${active.name}`;
        this.counterPanel.style.borderColor = '#ff5b6c';
      } else {
        this.counterPanel.textContent = '';
        this.counterPanel.style.borderColor = '#9b6cff';
      }
    });

    effect(() => {
      const e = earth;
      this.earthPanel.innerHTML = `
        <div>PLANETARY INTEGRITY <b>${Math.round(e.planetaryIntegrity.value)}</b></div>
        <div>HUMAN RESOLVE <b>${Math.round(e.humanResolve.value)}</b></div>
        <div>PANIC <b>${Math.round(e.globalPanic.value)}</b></div>
        <div>UNITY <b>${Math.round(e.humanUnity.value)}</b></div>
        <div>NETWORK <b>${Math.round(e.networkControl.value)}</b></div>
        <div>EXPOSURE <b>${Math.round(e.alienExposure.value)}</b></div>
      `;
    });
  }

  showMissileWarning(text: string): void {
    this.missilePanel.textContent = text;
    this.missilePanel.style.display = 'block';
  }

  hideMissileWarning(): void {
    this.missilePanel.style.display = 'none';
  }

  destroy(): void {
    this.root.remove();
  }
}