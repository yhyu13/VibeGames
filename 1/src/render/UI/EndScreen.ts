// End screen: shown on victory or defeat.

import type { RunOutcome } from '../../state/types.js';

export class EndScreen {
  readonly root: HTMLDivElement;

  constructor() {
    this.root = document.createElement('div');
    this.root.id = 'end-screen';
    Object.assign(this.root.style, {
      position: 'fixed',
      inset: '0',
      background: 'rgba(5,6,16,0.95)',
      display: 'none',
      placeItems: 'center',
      color: '#e8e8f0',
      fontFamily: 'ui-monospace, "Cascadia Mono", monospace',
      pointerEvents: 'auto',
      zIndex: '1000',
    });
    document.body.appendChild(this.root);
  }

  show(outcome: RunOutcome, ticks: number, onRestart: () => void): void {
    const titleMap: Record<RunOutcome['kind'], string> = {
      annihilation: 'ANNIHILATION',
      submission: 'SUBMISSION',
      digital: 'DIGITAL DOMINION',
      fracture: 'FRACTURE',
      hybrid: 'HYBRID VICTORY',
      defeat: 'DEFEAT',
    };
    const title = titleMap[outcome.kind];
    const subtitle =
      outcome.kind === 'defeat'
        ? `Reason: ${(outcome as { reason: string }).reason}`
        : outcome.kind === 'hybrid'
          ? `Variant: ${(outcome as { id: string }).id}`
          : '';
    this.root.style.display = 'grid';
    this.root.innerHTML = `
      <div style="text-align:center">
        <div style="font-size:48px;color:#9b6cff;letter-spacing:0.2em">${title}</div>
        <div style="margin-top:8px;color:#6cffff">${subtitle}</div>
        <div style="margin-top:24px;opacity:0.7">Run length: ${(ticks / 60).toFixed(1)}s</div>
        <button id="end-restart" style="margin-top:24px;padding:10px 20px;background:#9b6cff;color:#000;border:none;cursor:pointer;font-family:inherit;font-weight:bold">INVADE AGAIN</button>
      </div>`;
    const btn = this.root.querySelector('#end-restart') as HTMLButtonElement;
    btn.addEventListener('click', () => {
      this.hide();
      onRestart();
    });
  }

  hide(): void {
    this.root.style.display = 'none';
  }
}