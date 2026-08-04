import { useGameStore } from "../state/store";
import {
  NODE_LABELS,
  NODE_EFFECTS,
  NETWORK_NODES,
} from "../logic/virus";
import {
  POPULATION_SEGMENTS,
  SEGMENT_LABELS,
} from "../logic/propaganda";
import { ARSENAL } from "../logic/weapons";
import type { AudioSynth } from "../audio/synth";

let audio: AudioSynth | null = null;
let rafId = 0;

export function initUI(root: HTMLElement, synth: AudioSynth): void {
  audio = synth;
  root.innerHTML = "";
  const container = document.createElement("div");
  container.id = "ui-root";
  root.appendChild(container);

  const render = (): void => {
    const state = useGameStore.getState();
    container.innerHTML = "";
    switch (state.screen) {
      case "menu":
        container.appendChild(renderMenu(state));
        break;
      case "condition":
        container.appendChild(renderCondition(state));
        break;
      case "loadout":
        container.appendChild(renderLoadout(state));
        break;
      case "run":
        container.appendChild(renderRunHud(state));
        break;
      case "victory":
      case "defeat":
        container.appendChild(renderEnd(state));
        break;
    }
  };

  render();
  useGameStore.subscribe(render);

  // HUD sub-updates for moving parts (hull bar, day, meters) — cheap re-render throttle
  const hudTick = (): void => {
    const s = useGameStore.getState();
    if (s.screen === "run") updateRunHudDynamic(s);
    rafId = requestAnimationFrame(hudTick);
  };
  rafId = requestAnimationFrame(hudTick);
}

export function destroyUI(): void {
  cancelAnimationFrame(rafId);
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderMenu(state: ReturnType<typeof useGameStore.getState>): HTMLElement {
  const wrap = el("div", "screen menu-screen");
  const title = el("h1", "title", "ALIEN INVADER");
  wrap.appendChild(title);
  const subtitle = el("p", "subtitle", "Humanity has no idea what's coming.");
  wrap.appendChild(subtitle);

  const seedLabel = el("label", "", "Seed");
  const seedInput = el("input");
  seedInput.type = "text";
  seedInput.value = String(Math.floor(Math.random() * 1_000_000));
  seedInput.id = "seed-input";
  const startBtn = el("button", "btn primary", "Start Invasion");
  startBtn.id = "start-run";
  startBtn.addEventListener("click", () => {
    audio?.play("uiClick");
    state.startNewRun({
      seed: seedInput.value || 42,
      meta: state.meta,
    });
  });

  const metaBox = el("div", "meta-box");
  const metaTitle = el("h3", "", `Alienium: ${state.meta.alienium}`);
  metaBox.appendChild(metaTitle);
  const unlocks = el("ul", "meta-list");
  const unlockRows: Array<[string, string, () => void]> = [];
  for (const w of ARSENAL.filter((x) => x.unlockTier > 0)) {
    const owned = state.meta.unlocks.weapons.includes(w.id);
    unlockRows.push([
      w.name,
      owned ? "Owned" : "30 Alienium",
      () => {
        if (owned) return;
        audio?.play("uiClick");
        state.purchaseWeapon(w.id);
      },
    ]);
  }
  if (state.meta.unlocks.loadoutSlots < 5) {
    unlockRows.push(["Loadout Slot", "60 Alienium", () => {
      audio?.play("uiClick");
      state.purchaseLoadoutSlot();
    }]);
  }
  if (state.meta.unlocks.chassis < 2) {
    unlockRows.push(["Chassis Upgrade", "50 Alienium", () => {
      audio?.play("uiClick");
      state.purchaseChassis();
    }]);
  }
  for (const [name, cost, action] of unlockRows) {
    const li = el("li");
    const label = el("span", "", name);
    const btn = el("button", "btn small", cost);
    btn.addEventListener("click", action);
    li.appendChild(label);
    li.appendChild(btn);
    unlocks.appendChild(li);
  }
  metaBox.appendChild(unlocks);

  wrap.append(seedLabel, seedInput, startBtn, metaBox);
  return wrap;
}

function renderCondition(state: ReturnType<typeof useGameStore.getState>): HTMLElement {
  const wrap = el("div", "screen condition-screen");
  const sim = state.sim;
  const title = el("h2", "", "Earth Condition Scan");
  wrap.appendChild(title);
  if (!sim) {
    wrap.appendChild(el("p", "", "No run in progress."));
    return wrap;
  }
  const list = el("div", "condition-list");
  for (const m of sim.profile.modifiers) {
    const card = el("div", "condition-card");
    card.appendChild(el("h3", "", m.name));
    card.appendChild(el("p", "", m.description));
    list.appendChild(card);
  }
  wrap.appendChild(list);
  const btn = el("button", "btn primary", "Choose Loadout");
  btn.id = "choose-loadout";
  btn.addEventListener("click", () => {
    audio?.play("uiClick");
    useGameStore.setState({ screen: "loadout" });
  });
  wrap.appendChild(btn);
  return wrap;
}

function renderLoadout(state: ReturnType<typeof useGameStore.getState>): HTMLElement {
  const wrap = el("div", "screen loadout-screen");
  wrap.appendChild(el("h2", "", "Invasion Package"));
  const sim = state.sim;
  if (!sim) return wrap;
  const list = el("div", "loadout-list");
  for (const w of sim.ship.weapons) {
    const card = el("div", "loadout-card");
    card.appendChild(el("h3", "", w.spec.name));
    card.appendChild(el("p", "", `${w.spec.type} · ${w.spec.damage} dmg`));
    list.appendChild(card);
  }
  wrap.appendChild(list);
  const btn = el("button", "btn primary", "Deploy");
  btn.id = "deploy";
  btn.addEventListener("click", () => {
    audio?.play("uiClick");
    state.beginSim();
  });
  wrap.appendChild(btn);
  return wrap;
}

function renderRunHud(state: ReturnType<typeof useGameStore.getState>): HTMLElement {
  const sim = state.sim;
  if (!sim) return el("div", "", "no sim");
  const wrap = el("div", "screen hud");
  wrap.id = "hud";

  const top = el("div", "hud-top");
  top.id = "hud-dynamic";
  wrap.appendChild(top);

  const panels = el("div", "hud-panels");
  panels.appendChild(renderPropagandaPanel(sim));
  panels.appendChild(renderVirusPanel(sim));
  wrap.appendChild(panels);

  if (sim.pendingMutations) wrap.appendChild(renderMutationModal(sim));
  if (sim.pendingPuzzleNode) wrap.appendChild(renderPuzzleModal(sim));

  const dayBtn = el("button", "btn", `End Day ${sim.day}`);
  dayBtn.id = "end-day";
  dayBtn.addEventListener("click", () => {
    audio?.play("uiClick");
    state.endDay();
  });
  wrap.appendChild(dayBtn);

  return wrap;
}

function updateRunHudDynamic(state: ReturnType<typeof useGameStore.getState>): void {
  const hud = document.getElementById("hud-dynamic");
  const sim = state.sim;
  if (!hud || !sim) return;
  hud.innerHTML = "";
  const hull = el("div", "stat", `Hull ${Math.ceil(sim.ship.hull)}/${sim.ship.maxHull}`);
  const day = el("div", "stat", `Day ${sim.day}/7`);
  const morale = el("div", "stat", `Morale ${Math.ceil(sim.ship.morale)}%`);
  const weapon = el("div", "stat", `Weapon: ${sim.ship.weapons[sim.ship.activeWeaponIndex]?.spec.name ?? "none"}`);
  const blood = el("div", "stat", sim.bloodless ? "BLOODLESS" : "blood spilled");
  hud.append(day, hull, morale, weapon, blood);
}

function renderPropagandaPanel(sim: NonNullable<ReturnType<typeof useGameStore.getState>["sim"]>): HTMLElement {
  const panel = el("div", "panel prop-panel");
  panel.appendChild(el("h3", "", "Propaganda"));
  for (const seg of sim.segments) {
    const row = el("div", "seg-row");
    const label = el("span", "seg-label", SEGMENT_LABELS[seg.segment]);
    const bar = el("div", "meter");
    const fill = el("div", "fill");
    fill.style.width = `${seg.conviction}%`;
    bar.appendChild(fill);
    row.appendChild(label);
    row.appendChild(bar);
    if (seg.converted) row.appendChild(el("span", "badge", "CONVERTED"));
    else if (seg.jammedUntilDay > sim.day) row.appendChild(el("span", "badge warn", "JAMMED"));
    panel.appendChild(row);
  }
  const hand = el("div", "card-hand");
  for (const card of sim.messageHand) {
    const c = el("button", "card", card.name);
    c.addEventListener("click", () => {
      audio?.play("uiClick");
      const target = POPULATION_SEGMENTS.find((s) => !sim.segments.find((x) => x.segment === s)?.converted);
      if (target) useGameStore.getState().broadcast(target, card.id);
    });
    hand.appendChild(c);
  }
  panel.appendChild(hand);
  return panel;
}

function renderVirusPanel(sim: NonNullable<ReturnType<typeof useGameStore.getState>["sim"]>): HTMLElement {
  const panel = el("div", "panel virus-panel");
  panel.appendChild(el("h3", "", "Virus Network"));
  for (const node of NETWORK_NODES) {
    const st = sim.nodes.find((n) => n.node === node);
    if (!st) continue;
    const row = el("div", "node-row");
    const label = el("span", "node-label", NODE_LABELS[node]);
    row.appendChild(label);
    if (st.compromised) {
      row.appendChild(el("span", "badge ok", "COMPROMISED"));
    } else {
      const btn = el("button", "btn small", `Hack (${st.attemptsLeft})`);
      btn.addEventListener("click", () => {
        audio?.play("uiClick");
        useGameStore.getState().beginHack(node);
      });
      row.appendChild(btn);
    }
    row.title = NODE_EFFECTS[node];
    panel.appendChild(row);
  }
  return panel;
}

function renderMutationModal(sim: NonNullable<ReturnType<typeof useGameStore.getState>["sim"]>): HTMLElement {
  const modal = el("div", "modal");
  modal.appendChild(el("h2", "", "Mutation Offered"));
  for (const offer of sim.pendingMutations ?? []) {
    const card = el("div", "mut-card");
    card.appendChild(el("h3", "", offer.mutation.name));
    card.appendChild(el("p", "", offer.mutation.benefitDescription));
    card.appendChild(el("p", "bane", `Bane: ${offer.mutation.baneDescription}`));
    const btn = el("button", "btn primary", "Take");
    btn.addEventListener("click", () => {
      audio?.play("convert");
      useGameStore.getState().acceptMutation(offer.mutation.id);
    });
    card.appendChild(btn);
    modal.appendChild(card);
  }
  const skip = el("button", "btn", "Decline");
  skip.addEventListener("click", () => useGameStore.getState().declineMutations());
  modal.appendChild(skip);
  return modal;
}

function renderPuzzleModal(sim: NonNullable<ReturnType<typeof useGameStore.getState>["sim"]>): HTMLElement {
  const nodeId = sim.pendingPuzzleNode;
  const modal = el("div", "modal");
  const node = sim.nodes.find((n) => n.node === nodeId);
  if (!node) return modal;
  modal.appendChild(el("h2", "", `Hack: ${NODE_LABELS[nodeId!]}`));
  const p = node.puzzle;
  if (p.kind === "pattern") {
    const data = p.data as { target: string[]; options: string[][] };
    modal.appendChild(el("p", "", `Match: ${data.target.join(" ")}`));
    data.options.forEach((opt, i) => {
      const btn = el("button", "btn", opt.join(" "));
      btn.addEventListener("click", () => {
        audio?.play("hack");
        useGameStore.getState().solvePuzzle(nodeId!, i);
      });
      modal.appendChild(btn);
    });
  } else if (p.kind === "routing") {
    const data = p.data as { start: number; end: number };
    modal.appendChild(el("p", "", `Route from node ${data.start} to node ${data.end}. (Simulate: solve via path A→...→B)`));
    const btn = el("button", "btn primary", "Solve (A→B)");
    btn.addEventListener("click", () => {
      audio?.play("hack");
      useGameStore.getState().solvePuzzle(nodeId!, p.solution);
    });
    modal.appendChild(btn);
  } else {
    modal.appendChild(el("p", "", "Timing puzzle: hit all windows."));
    const btn = el("button", "btn primary", "Solve");
    btn.addEventListener("click", () => {
      audio?.play("hack");
      useGameStore.getState().solvePuzzle(nodeId!, p.solution);
    });
    modal.appendChild(btn);
  }
  const abort = el("button", "btn", "Abort");
  abort.addEventListener("click", () => useGameStore.getState().abortHack());
  modal.appendChild(abort);
  return modal;
}

function renderEnd(state: ReturnType<typeof useGameStore.getState>): HTMLElement {
  const wrap = el("div", "screen end-screen");
  const victory = state.screen === "victory";
  wrap.appendChild(el("h1", victory ? "win" : "lose", victory ? "EARTH FALLS" : "INVASION REPELLED"));
  if (state.sim) {
    const cond = state.sim.winCondition ?? "none";
    wrap.appendChild(el("p", "", `Victory type: ${cond}`));
    wrap.appendChild(el("p", "", `Alienium earned: ${state.meta.alienium}`));
  }
  const btn = el("button", "btn primary", "Back to Menu");
  btn.addEventListener("click", () => {
    audio?.play("uiClick");
    state.finishRun();
  });
  wrap.appendChild(btn);
  return wrap;
}
