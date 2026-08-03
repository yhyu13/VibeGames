import type { CombatHud } from '../combat/combatScene';
import type { WeaponStats } from '../core/types';
import { el, clear, btn, barIn } from './dom';

export interface HudActions {
  onExpedite(): void;
  onAbort(): void;
}

export class CombatHudView implements CombatHud {
  root: HTMLElement;
  private hullBar: (v: number) => void;
  private hullText: HTMLElement;
  private timerBar: (v: number) => void;
  private timerText: HTMLElement;
  private weaponsBox: HTMLElement;
  private targetsBox: HTMLElement;
  private logBox: HTMLElement;
  private onEndCb?: (result: { victory: boolean; hullLoss: number; destroyedIds: string[] }) => void;
  private actions: HudActions;

  constructor(actions: HudActions) {
    this.actions = actions;
    this.root = el('div', 'hud');
    this.root.id = 'combat-hud';

    const top = el('div', 'hud-top');
    const hullPanel = el('div', 'hud-panel');
    const hullLabel = el('div', undefined, 'HULL');
    hullLabel.style.fontSize = '12px';
    hullLabel.style.color = 'var(--dim)';
    this.hullText = el('div');
    this.hullText.style.fontSize = '18px';
    const hullBar = barIn(100, 100, '#33ffcc', 180);
    this.hullBar = hullBar.set;
    hullPanel.append(hullLabel, this.hullText, hullBar.root);

    const timerPanel = el('div', 'hud-panel');
    const timerLabel = el('div', undefined, 'ASSAULT WINDOW');
    timerLabel.style.fontSize = '12px';
    timerLabel.style.color = 'var(--dim)';
    this.timerText = el('div');
    this.timerText.style.fontSize = '18px';
    const timerBar = barIn(100, 100, '#ffaa33', 180);
    this.timerBar = timerBar.set;
    timerPanel.append(timerLabel, this.timerText, timerBar.root);

    const targetsPanel = el('div', 'hud-panel');
    targetsPanel.style.minWidth = '300px';
    const tLabel = el('div', undefined, 'TARGETS');
    tLabel.style.fontSize = '12px';
    tLabel.style.color = 'var(--dim)';
    this.targetsBox = el('div');
    targetsPanel.append(tLabel, this.targetsBox);

    const logPanel = el('div', 'hud-panel');
    logPanel.style.flex = '1';
    this.logBox = el('div', 'hud-log');
    logPanel.appendChild(this.logBox);
    top.append(hullPanel, timerPanel, targetsPanel, logPanel);

    const bottom = el('div', 'hud-bottom');
    const weaponsPanel = el('div', 'hud-panel');
    const wLabel = el('div', undefined, 'WEAPONS  (1-3 switch, LMB fire)');
    wLabel.style.fontSize = '12px';
    wLabel.style.color = 'var(--dim)';
    this.weaponsBox = el('div');
    weaponsPanel.append(wLabel, this.weaponsBox);

    const ctrl = el('div', 'col');
    const hint = el('div', undefined, 'WASD move · Space/C up/down · Shift boost · Mouse aim · Esc release cursor');
    hint.style.fontSize = '12px';
    hint.style.color = 'var(--dim)';
    const buttons = el('div', 'row');
    buttons.append(
      btn('Expedite Battle', () => this.actions.onExpedite(), 'btn small'),
      btn('Abort Assault', () => this.actions.onAbort(), 'btn small warn'),
    );
    ctrl.append(hint, buttons);
    bottom.append(weaponsPanel, ctrl);

    this.root.append(top, bottom);
  }

  setHull(hull: number, max: number): void {
    this.hullBar(hull);
    this.hullText.textContent = `${Math.max(0, Math.round(hull))} / ${max}`;
  }

  setTimer(t: number, _max: number): void {
    this.timerBar(t);
    this.timerText.textContent = `${Math.ceil(t)}s`;
  }

  setWeapons(weapons: WeaponStats[], active: number): void {
    clear(this.weaponsBox);
    weapons.forEach((w, i) => {
      const slot = el('div', 'weapon-slot');
      if (i === active) slot.classList.add('active');
      slot.textContent = `${i + 1}. ${w.name} [${w.type}]`;
      this.weaponsBox.appendChild(slot);
    });
  }

  setTargets(targets: { name: string; hp: number; maxHp: number; kind: string }[]): void {
    clear(this.targetsBox);
    for (const t of targets) {
      const line = el('div', 'target-line');
      const name = el('span', undefined, t.name);
      const hp = el('span', undefined, `${t.hp}/${t.maxHp}`);
      line.append(name, hp);
      this.targetsBox.appendChild(line);
    }
  }

  addLog(text: string): void {
    const line = el('div', undefined, text);
    this.logBox.appendChild(line);
    while (this.logBox.childElementCount > 40) this.logBox.removeChild(this.logBox.firstChild!);
    this.logBox.scrollTop = this.logBox.scrollHeight;
  }

  onEnd(result: { victory: boolean; hullLoss: number; destroyedIds: string[] }): void {
    this.onEndCb?.(result);
  }

  onEndHook(cb: (result: { victory: boolean; hullLoss: number; destroyedIds: string[] }) => void): void {
    this.onEndCb = cb;
  }

  dispose(): void {
    this.root.remove();
  }
}
