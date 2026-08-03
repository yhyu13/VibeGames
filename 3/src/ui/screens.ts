import type { EventBus } from '../core/events';
import type { MetaStore } from '../game/meta';
import type { MajorAction, MinorAction, NodeId, RunState, SegmentId } from '../core/types';
import { el, clear, btn, meter } from './dom';
import { ALL_WEAPONS, MAX_LOADOUT } from '../core/types';
import { WEAPON_COSTS } from '../game/meta';
import { getWeapon } from '../data/weapons';
import { getMutation, MUTATION_IDS } from '../data/mutations';
import { MESSAGES } from '../data/messages';
import { SEGMENT_NAMES } from '../game/propaganda';
import { NODE_NAMES, NODE_EFFECTS } from '../game/virus';
import { RNG } from '../core/rng';
import { difficultyName, conditionSummary, primaryTargets, describeProfile } from '../game/run';

export interface ScreenCallbacks {
  startRun(weaponIds: string[], daily: boolean): void;
  executeMajor(action: MajorAction, nodeId?: NodeId): void;
  executeMinor(action: MinorAction): void;
  endDay(): void;
  goMenu(): void;
  buyWeapon(id: string): boolean;
  buyMutation(id: string): boolean;
  upgradeWeapon(id: string): boolean;
  synthesize(a: string, b: string): boolean;
  mutate(id: string): void;
  applyPropaganda(cardIds: string[]): void;
  attackNode(nodeId: NodeId): void;
  newRunFromResults(): void;
}

export interface ScreenCtx {
  ui: HTMLElement;
  bus: EventBus;
  meta: MetaStore;
  run: RunState | null;
  cb: ScreenCallbacks;
}

export function showScreen(ctx: ScreenCtx, build: (root: HTMLElement) => void): void {
  clear(ctx.ui);
  const root = el('div', 'screen');
  build(root);
  ctx.ui.appendChild(root);
}

function logBlock(ctx: ScreenCtx): HTMLElement {
  const feed = el('div', 'log-feed');
  for (const line of ctx.run?.log.slice(-40) ?? []) feed.appendChild(el('div', undefined, line));
  return feed;
}

function segmentMeters(run: RunState): HTMLElement {
  const box = el('div');
  for (const s of run.segments) {
    const m = meter(`${SEGMENT_NAMES[s.id]}${s.converted ? ' (CONVERTED)' : ''}`, s.conviction, 100, s.converted ? '#33ffcc' : '#33aaff');
    box.appendChild(m.root);
  }
  return box;
}

function suspicionBadges(run: RunState): HTMLElement {
  const box = el('div');
  for (const s of run.segments) {
    if (s.suspicion >= 100) box.appendChild(el('div', undefined, `⚠ ${SEGMENT_NAMES[s.id]} suspicious — jamming!`));
  }
  return box;
}

export function showMenu(ctx: ScreenCtx): void {
  showScreen(ctx, (root) => {
    const { meta } = ctx;
    const title = el('h1', 'title', 'ALIEN INVADER');
    const sub = el('p', 'sub', 'Invade Earth. Or convert it. Intelligence is optional.');
    const stats = el('p', 'sub', `Alienium: ${meta.save.alienium} · Runs: ${meta.save.stats.runs} · Wins: ${meta.save.stats.wins} · Bloodless: ${meta.save.stats.bloodlessWins}`);

    const loadoutLabel = el('h2', undefined, 'LOADOUT');
    const loadout = el('div', 'card');
    const owned = meta.ownedWeapons();
    const selected = new Set<string>([...owned.slice(0, 2)]);
    const selText = el('p', 'sub', `Select up to ${MAX_LOADOUT} weapons.`);
    const checkboxes = el('div', 'col');
    for (const id of ALL_WEAPONS) {
      if (!owned.includes(id)) continue;
      const w = getWeapon(id);
      const row = el('label', 'row');
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = selected.has(id);
      box.style.pointerEvents = 'auto';
      box.addEventListener('change', () => {
        if (box.checked) {
          if (selected.size >= MAX_LOADOUT) {
            box.checked = false;
            return;
          }
          selected.add(id);
        } else {
          selected.delete(id);
        }
        selText.textContent = `Selected ${selected.size}/${MAX_LOADOUT}`;
      });
      const info = el('span', undefined, `${w.name} — ${w.description} [${w.type}]`);
      row.append(box, info);
      checkboxes.appendChild(row);
    }
    loadout.append(loadoutLabel, checkboxes, selText);

    const row = el('div', 'row');
    row.style.justifyContent = 'center';
    const startBtn = btn('Launch Invasion', () => ctx.cb.startRun([...selected], false), 'btn primary');
    const dailyBtn = btn('Daily Invasion (seeded)', () => ctx.cb.startRun([...selected], true));
    const shopBtn = btn('Arsenal', () => showShop(ctx));
    const helpBtn = btn('How to Play', () => showHelp(ctx));
    row.append(startBtn, dailyBtn, shopBtn, helpBtn);
    root.append(title, sub, stats, loadout, row, logBlock(ctx));
  });
}

function showHelp(ctx: ScreenCtx): void {
  showScreen(ctx, (root) => {
    root.appendChild(el('h2', undefined, 'HOW TO PLAY'));
    const lines = [
      'Each day: pick ONE major action (assault, propaganda, virus, doomsday) and spend minor actions.',
      'ASSAULT: real-time 3D battle. Destroy all targets before the window closes. WASD move, mouse aim, LMB fire, Shift boost, Esc to release cursor.',
      'PROPAGANDA: broadcast message cards to convert population segments. Watch suspicion — heavy suspicion jams your broadcasts.',
      'VIRUS: solve the pad-pattern puzzle to compromise network nodes. 4 of 5 nodes = humanity surrenders without a shot.',
      'MUTATIONS: powerful upgrades, each carries a Bane that strengthens Earth. Choose wisely.',
      'Wins: destroy all 3 primary targets, convert all segments, or shut down 5 network nodes.',
      'Bloodless runs pay double. Your hull is your only life — missiles WILL come.',
    ];
    for (const l of lines) root.appendChild(el('p', undefined, l));
    const row = el('div', 'row');
    row.style.justifyContent = 'center';
    row.appendChild(btn('Back', () => showMenu(ctx)));
    root.appendChild(row);
  });
}

function showShop(ctx: ScreenCtx): void {
  showScreen(ctx, (root) => {
    root.appendChild(el('h2', undefined, `ARSENAL — Alienium: ${ctx.meta.save.alienium}`));
    for (const id of ALL_WEAPONS) {
      if (ctx.meta.ownedWeapons().includes(id)) continue;
      const w = getWeapon(id);
      const card = el('div', 'card');
      const head = el('div', 'row');
      head.style.justifyContent = 'space-between';
      const name = el('h3', undefined, w.name);
      const cost = el('span', undefined, `${WEAPON_COSTS[id]} alienium`);
      head.append(name, cost);
      const desc = el('p', 'sub', w.description);
      const buyBtn = btn('Acquire', () => {
        if (ctx.cb.buyWeapon(id)) {
          buyBtn.disabled = true;
          buyBtn.textContent = 'Owned';
          root.querySelector('h2')!.textContent = `ARSENAL — Alienium: ${ctx.meta.save.alienium}`;
        }
      });
      card.append(head, desc, buyBtn);
      root.appendChild(card);
    }
    const row = el('div', 'row');
    row.style.justifyContent = 'center';
    row.appendChild(btn('Back', () => showMenu(ctx)));
    root.appendChild(row);
  });
}

export function showScan(ctx: ScreenCtx): void {
  const run = ctx.run!;
  showScreen(ctx, (root) => {
    root.appendChild(el('h2', undefined, `DAY ${run.day} — ${run.earthName}`));
    root.appendChild(el('p', 'sub', `Difficulty: ${difficultyName(run)} · Seed: ${run.seed}`));
    const cond = el('div', 'card');
    cond.appendChild(el('h3', undefined, 'EARTH CONDITION PROFILE'));
    for (const line of conditionSummary(run)) cond.appendChild(el('p', undefined, line));
    cond.appendChild(el('p', 'sub', describeProfile(run)));
    root.appendChild(cond);

    const targetCard = el('div', 'card');
    targetCard.appendChild(el('h3', undefined, 'PRIMARY TARGETS'));
    for (const t of primaryTargets(run)) {
      const m = meter(t.name, t.hp, t.maxHp, t.destroyed ? '#33ffcc' : '#ff5533');
      targetCard.appendChild(m.root);
    }
    root.appendChild(targetCard);

    root.appendChild(el('h3', undefined, 'MAJOR ACTION (pick one)'));
    const major = el('div', 'row');
    const jammed = run.day <= run.jammedUntil;
    const doomReady = run.day > run.doomsdayUsed + 2;
    major.appendChild(btn(`⚔ Assault Earth`, () => ctx.cb.executeMajor('assault'), 'btn primary'));
    major.appendChild(btn(jammed ? `Propaganda (JAMMED)` : `Propaganda`, () => ctx.cb.executeMajor('propaganda'), 'btn'));
    major.appendChild(btn(`Virus`, () => ctx.cb.executeMajor('virus'), 'btn'));
    major.appendChild(btn(doomReady ? `Doomsday Ray` : `Doomsday (charging)`, () => ctx.cb.executeMajor('doomsday'), 'btn warn'));
    if (jammed) major.appendChild(el('p', 'sub', 'Suspicion jammed your broadcast array.'));
    root.appendChild(major);

    root.appendChild(el('h3', undefined, 'MINOR ACTIONS (spend freely once each)'));
    const minor = el('div', 'row');
    minor.appendChild(btn(`Repair (+15 hull, 2 salvage)`, () => ctx.cb.executeMinor('repair'), 'btn small'));
    minor.appendChild(btn(`Resupply (+6 salvage)`, () => ctx.cb.executeMinor('resupply'), 'btn small'));
    minor.appendChild(btn(`Deploy Drone (5 salvage → disable 1 defense/day)`, () => ctx.cb.executeMinor('drone'), 'btn small'));
    minor.appendChild(btn(`Analyze (reduce all suspicion)`, () => ctx.cb.executeMinor('analyze'), 'btn small'));
    root.appendChild(minor);
    root.appendChild(el('p', 'sub', 'Salvage: ' + run.salvage));
    root.appendChild(logBlock(ctx));
  });
}

export function showPropaganda(ctx: ScreenCtx): void {
  const run = ctx.run!;
  const rng = new RNG(run.seed + run.day * 31337);
  const hand = rng.shuffle([...MESSAGES]).slice(0, 3);
  showScreen(ctx, (root) => {
    root.appendChild(el('h2', undefined, 'PROPAGANDA BROADCAST'));
    root.appendChild(el('p', 'sub', `Broadcast effectiveness x${run.profile.propagandaMult.toFixed(2)}. Pick up to 2 cards.`));
    const selected: string[] = [];
    const cards = el('div');
    for (const card of hand) {
      const c = el('div', 'card');
      const head = el('div', 'row');
      const name = el('h3', undefined, card.name);
      const eff = el('span', undefined, `conv ${card.conviction} · susp ${card.suspicion}`);
      head.append(name, eff);
      const text = el('p', undefined, `"${card.text}"`);
      const targets = el('p', 'sub', `Targets: ${(Object.keys(card.segments) as SegmentId[]).map((s) => SEGMENT_NAMES[s]).join(', ')}`);
      const useBtn = btn('Broadcast', () => {
        if (selected.includes(card.id)) {
          selected.splice(selected.indexOf(card.id), 1);
          useBtn.textContent = 'Broadcast';
        } else if (selected.length < 2) {
          selected.push(card.id);
          useBtn.textContent = 'Selected ✓';
        }
      }, 'btn small');
      c.append(head, text, targets, useBtn);
      cards.appendChild(c);
    }
    const metersTitle = el('h3', undefined, 'POPULATION SEGMENTS');
    const meters = segmentMeters(run);
    const susp = suspicionBadges(run);
    const go = btn('Send Broadcasts', () => ctx.cb.applyPropaganda(selected), 'btn primary');
    root.append(metersTitle, meters, susp, cards, go);
  });
}

export function showVirus(ctx: ScreenCtx): void {
  const run = ctx.run!;
  showScreen(ctx, (root) => {
    root.appendChild(el('h2', undefined, 'VIRUS INJECTION'));
    root.appendChild(el('p', 'sub', `Virus effectiveness x${run.profile.virusMult.toFixed(2)}. Compromise 4 of 5 nodes for System Shutdown.`));
    for (const node of run.nodes) {
      const rowEl = el('div', 'node-row');
      const name = el('span', undefined, `${NODE_NAMES[node.id]}${node.compromised ? ' ✓' : ''}`);
      const effect = el('span', undefined, NODE_EFFECTS[node.id]);
      rowEl.append(name, effect);
      if (!node.compromised) rowEl.appendChild(btn('Attack', () => ctx.cb.attackNode(node.id), 'btn small'));
      root.appendChild(rowEl);
    }
  });
}

export function showBuild(ctx: ScreenCtx): void {
  const run = ctx.run!;
  const rng = new RNG(run.seed + run.day * 9973);
  const offers = rng.shuffle(MUTATION_IDS).slice(0, 3);
  showScreen(ctx, (root) => {
    root.appendChild(el('h2', undefined, `BUILD — Salvage: ${run.salvage}`));
    const row = el('div', 'row');
    row.appendChild(btn('Repair (+20 hull, 3 salvage)', () => ctx.cb.executeMinor('repair'), 'btn small'));
    row.appendChild(btn('Upgrade Weapon (+10 dmg, 6 salvage)', () => showUpgrade(ctx, () => showBuild(ctx)), 'btn small'));
    row.appendChild(btn('Synthesize (combine 2 weapons, 8 salvage)', () => showSynthesize(ctx, () => showBuild(ctx)), 'btn small'));
    row.appendChild(btn('Deploy Drone (5 salvage)', () => ctx.cb.executeMinor('drone'), 'btn small'));
    root.appendChild(row);

    root.appendChild(el('h3', undefined, 'MUTATION OFFERS (each brings a Bane)'));
    const mut = el('div');
    for (const id of offers) {
      const m = getMutation(id);
      const card = el('div', 'card');
      const head = el('div', 'row');
      const name = el('h3', undefined, m.name);
      head.appendChild(name);
      const benefit = el('p', undefined, `Benefit: ${m.benefit}`);
      const bane = el('p', 'sub', `Bane: ${m.bane}`);
      const take = btn('Take Mutation', () => {
        ctx.cb.mutate(id);
        take.disabled = true;
        take.textContent = 'Taken';
      }, 'btn small warn');
      card.append(head, benefit, bane, take);
      mut.appendChild(card);
    }
    root.appendChild(mut);
    root.appendChild(logBlock(ctx));
    const end = el('div', 'row');
    end.style.justifyContent = 'center';
    end.appendChild(btn('End Day', () => ctx.cb.endDay(), 'btn primary'));
    root.appendChild(end);
  });
}

function showUpgrade(ctx: ScreenCtx, back: () => void): void {
  const run = ctx.run!;
  showScreen(ctx, (root) => {
    root.appendChild(el('h2', undefined, 'UPGRADE WEAPON'));
    for (const id of run.ship.weaponIds) {
      const w = getWeapon(id);
      const row = el('div', 'row');
      const label = el('span', undefined, `${w.name} (+${run.ship.weaponMods[id] ?? 0} bonus)`);
      const up = btn('Upgrade (6 salvage)', () => {
        if (ctx.cb.upgradeWeapon(id)) up.disabled = true;
      }, 'btn small');
      row.append(label, up);
      root.appendChild(row);
    }
    root.appendChild(backBtn(back));
  });
}

function showSynthesize(ctx: ScreenCtx, back: () => void): void {
  const run = ctx.run!;
  const weapons = run.ship.weaponIds;
  showScreen(ctx, (root) => {
    root.appendChild(el('h2', undefined, 'SYNTHESIZE'));
    if (weapons.length < 2) {
      root.appendChild(el('p', 'sub', 'Need at least 2 weapons equipped.'));
      root.appendChild(backBtn(back));
      return;
    }
    for (let i = 0; i < weapons.length; i++) {
      for (let j = i + 1; j < weapons.length; j++) {
        const a = getWeapon(weapons[i]);
        const b = getWeapon(weapons[j]);
        const row = el('div', 'row');
        const label = el('span', undefined, `${a.name} + ${b.name} → hybrid`);
        const syn = btn('Combine (8 salvage)', () => {
          if (ctx.cb.synthesize(weapons[i], weapons[j])) {
            syn.disabled = true;
            syn.textContent = 'Synthesized';
          }
        }, 'btn small');
        row.append(label, syn);
        root.appendChild(row);
      }
    }
    root.appendChild(backBtn(back));
  });
}

function backBtn(back: () => void): HTMLButtonElement {
  return btn('Back', back, 'btn small');
}

export function showResults(ctx: ScreenCtx, outcome: RunState['outcome'], alienium: number): void {
  const run = ctx.run!;
  showScreen(ctx, (root) => {
    const titleMap: Record<string, string> = {
      annihilation: 'EARTH ANNIHILATED',
      shutdown: 'SYSTEM SHUTDOWN — HUMANITY SURRENDERS',
      conversion: 'TOTAL CONVERSION',
      defeat: 'SHIP DESTROYED',
      none: 'INVASION STALLED',
    };
    const t = el('h1', 'title', titleMap[outcome] ?? 'MISSION OVER');
    const bloodless = outcome === 'shutdown' || outcome === 'conversion';
    const sub = el('p', 'sub', `Day ${run.day} · ${run.earthName} · Seed ${run.seed}`);
    const reward = el('p', 'sub', `${bloodless ? 'BLOODLESS VICTORY BONUS! ' : ''}+${alienium} Alienium`);
    const row = el('div', 'row');
    row.style.justifyContent = 'center';
    row.appendChild(btn('New Invasion', () => ctx.cb.newRunFromResults(), 'btn primary'));
    row.appendChild(btn('Menu', () => ctx.cb.goMenu(), 'btn'));
    root.append(t, sub, reward, logBlock(ctx), row);
  });
}
