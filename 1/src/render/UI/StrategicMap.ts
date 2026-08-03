// Strategic map: DOM overlay showing regions, conditions, victory progress.

import { effect } from '@preact/signals-core';
import type { RunState } from '../../state/types.js';
import { REGION_DEFS_BY_ID } from '../../state/earth/regions.js';
import { CONDITION_DEFS_BY_ID } from '../../state/earth/conditions.js';
import { getRegionDef } from '../../state/earth/regions-layout.js';

export class StrategicMap {
  readonly root: HTMLDivElement;
  private mode: 'hidden' | 'visible' = 'hidden';

  constructor(private run: RunState) {
    this.root = document.createElement('div');
    this.root.id = 'strategic-map';
    Object.assign(this.root.style, {
      position: 'fixed',
      inset: '0',
      background: 'rgba(5,6,16,0.92)',
      display: 'none',
      pointerEvents: 'auto',
      padding: '24px',
      overflowY: 'auto',
      fontFamily: 'ui-monospace, "Cascadia Mono", monospace',
      color: '#e8e8f0',
      fontSize: '13px',
    });
    document.body.appendChild(this.root);
    this.render();
  }

  toggle(): void {
    this.mode = this.mode === 'hidden' ? 'visible' : 'hidden';
    this.root.style.display = this.mode === 'hidden' ? 'none' : 'block';
    if (this.mode === 'visible') this.render();
  }

  isVisible(): boolean {
    return this.mode === 'visible';
  }

  private render(): void {
    const earth = this.run.earth;
    const v = this.run.victory;
    const regionList = Object.values(earth.regions.value)
      .map((r) => {
        const def = REGION_DEFS_BY_ID[r.id] ?? getRegionDef(r.id);
        const vs = r.visualState.peek();
        return `<tr>
          <td>${def?.name ?? r.id}</td>
          <td style="color:${vs === 'destroyed' ? '#ff5b6c' : vs === 'damaged' ? '#ffaa4a' : '#9b6cff'}">${vs}</td>
          <td>${Math.round(r.hp.peek())}/${def?.defense.hp ?? 100}</td>
          <td>${def?.resistance ?? '-'}</td>
          <td>${def?.weakness ?? '-'}</td>
        </tr>`;
      }).join('');

    const conds = earth.activeConditions.value
      .map((c) => CONDITION_DEFS_BY_ID[c])
      .filter(Boolean)
      .map((c) => `<li><b>${c!.name}</b>: ${c!.effect}</li>`).join('');

    this.root.innerHTML = `
      <h2 style="color:#9b6cff;margin:0 0 16px">STRATEGIC MAP</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
        <div>
          <h3 style="color:#6cffff">EARTH</h3>
          <table style="border-collapse:collapse;width:100%">
            <thead><tr><th align="left">Region</th><th align="left">State</th><th align="left">HP</th><th align="left">Resist</th><th align="left">Weak</th></tr></thead>
            <tbody>${regionList}</tbody>
          </table>
        </div>
        <div>
          <h3 style="color:#ffb86c">VICTORY PROGRESS</h3>
          ${this.bar('Annihilation', v.annihilation.value)}
          ${this.bar('Submission', v.submission.value)}
          ${this.bar('Digital', v.digital.value)}
          ${this.bar('Fracture', v.fracture.value)}
          <h3 style="color:#6cff9b">CONDITIONS</h3>
          <ul>${conds || '<li>None</li>'}</ul>
        </div>
      </div>
      <p style="margin-top:16px;opacity:0.6">Press M to close</p>
    `;
  }

  private bar(label: string, v: number): string {
    const pct = Math.round(v * 100);
    return `<div style="margin:6px 0"><div>${label} <span style="float:right">${pct}%</span></div>
      <div style="height:8px;background:#1a1a26;border:1px solid #3a3a55">
        <div style="width:${pct}%;height:100%;background:#9b6cff"></div>
      </div></div>`;
  }
}