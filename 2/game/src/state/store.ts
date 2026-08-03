import { create } from "zustand";
import type {
  MessageCardId,
  NetworkNodeId,
  PopulationSegment,
} from "../core/types";
import { createRunSim, type RunSim } from "../logic/sim";
import { awardAlienium, type MetaProgress } from "../logic/meta";
import { loadMeta, saveMeta } from "./persistence";

export interface StartOptions {
  seed: number | string;
  meta: MetaProgress;
  dayAutoAdvance?: number;
}

export interface GameState {
  screen: Screen;
  meta: MetaProgress;
  sim: RunSim | null;
  profilePreviewSeed: number;
  events: RunEvent[];
  hudMessage: string | null;

  startNewRun(opts: StartOptions): void;
  beginSim(): void;
  tick(dt: number): void;
  setInput(input: { yaw: number; pitch: number; fire: boolean; weaponIndex: number }): void;
  setActiveWeapon(index: number): void;
  setHudMessage(msg: string | null): void;

  broadcast(segment: PopulationSegment, card: MessageCardId): void;
  beginHack(node: NetworkNodeId): void;
  solvePuzzle(node: NetworkNodeId, attempt: unknown): void;
  abortHack(): void;
  acceptMutation(id: string): void;
  declineMutations(): void;
  endDay(): void;
  doomsday(): void;
  repair(): void;
  synth(a: string, b: string): void;
  destroyTarget(id: string): void;

  purchaseWeapon(id: string): void;
  purchaseLoadoutSlot(): void;
  purchaseChassis(): void;
  finishRun(): void;
  backToMenu(): void;
}

export const useGameStore = create<GameState>()((set, get) => ({
  screen: "menu",
  meta: loadMeta(),
  sim: null,
  profilePreviewSeed: 42,
  events: [],
  hudMessage: null,

  startNewRun: (opts) => {
    const sim = createRunSim({
      seed: opts.seed,
      meta: { unlocks: opts.meta.unlocks },
      dayAutoAdvanceSeconds: opts.dayAutoAdvance,
    });
    set({ sim, screen: "condition", events: [], hudMessage: null });
  },

  beginSim: () => {
    const sim = get().sim;
    if (!sim) return;
    sim.start();
    set({ screen: "run", events: [...sim.lastEvents] });
  },

  tick: (dt) => {
    const sim = get().sim;
    if (!sim) return;
    sim.tick(dt);
    if (sim.over) {
      const event = sim.lastEvents[sim.lastEvents.length - 1];
      if (event && (event.type === "victory" || event.type === "defeat")) {
        const bloodless = sim.bloodless && sim.winCondition !== "annihilation";
        const base = 100;
        const alienium = awardAlienium(base, bloodless, sim.profile.effective.salvageMod);
        const nextMeta = { ...get().meta, alienium: get().meta.alienium + alienium };
        saveMeta(nextMeta);
        set({
          meta: nextMeta,
          screen: sim.status === "victory" ? "victory" : "defeat",
          events: [...sim.lastEvents],
        });
        return;
      }
    }
    set({ events: [...sim.lastEvents] });
  },

  setInput: (input) => {
    get().sim?.setInput(input);
  },

  setActiveWeapon: (index) => {
    const sim = get().sim;
    if (!sim) return;
    sim.setInput({ yaw: 0, pitch: 0, fire: false, weaponIndex: index });
  },

  setHudMessage: (msg) => set({ hudMessage: msg }),

  broadcast: (segment, card) => {
    const sim = get().sim;
    if (!sim) return;
    sim.broadcastMessage(segment, card);
    set({ events: [...sim.lastEvents] });
  },

  beginHack: (node) => {
    const sim = get().sim;
    if (!sim) return;
    sim.beginHack(node);
    set({ events: [...sim.lastEvents] });
  },

  solvePuzzle: (node, attempt) => {
    const sim = get().sim;
    if (!sim) return;
    sim.solvePuzzle(node, attempt);
    set({ events: [...sim.lastEvents] });
  },

  abortHack: () => {
    get().sim?.abortHack();
  },

  acceptMutation: (id) => {
    const sim = get().sim;
    if (!sim) return;
    sim.acceptMutation(id);
    set({ events: [...sim.lastEvents] });
  },

  declineMutations: () => {
    get().sim?.declineMutations();
  },

  endDay: () => {
    const sim = get().sim;
    if (!sim) return;
    sim.endDay();
    set({ events: [...sim.lastEvents] });
  },

  doomsday: () => {
    get().sim?.doomsday();
  },

  repair: () => {
    get().sim?.repair(20);
  },

  synth: (a, b) => {
    const sim = get().sim;
    if (!sim) return;
    sim.synthWeapon(a, b);
    set({ events: [...sim.lastEvents] });
  },

  destroyTarget: (id) => {
    get().sim?.destroyTarget(id);
  },

  purchaseWeapon: (id) => {
    const meta = get().meta;
    const next = { ...meta, unlocks: { ...meta.unlocks, weapons: [...meta.unlocks.weapons, id] }, alienium: meta.alienium - 30 };
    saveMeta(next);
    set({ meta: next });
  },

  purchaseLoadoutSlot: () => {
    const meta = get().meta;
    const next = { ...meta, unlocks: { ...meta.unlocks, loadoutSlots: Math.min(5, meta.unlocks.loadoutSlots + 1) }, alienium: meta.alienium - 60 };
    saveMeta(next);
    set({ meta: next });
  },

  purchaseChassis: () => {
    const meta = get().meta;
    const next = { ...meta, unlocks: { ...meta.unlocks, chassis: Math.min(2, meta.unlocks.chassis + 1) }, alienium: meta.alienium - 50 };
    saveMeta(next);
    set({ meta: next });
  },

  finishRun: () => {
    set({ screen: "menu", sim: null, events: [] });
  },

  backToMenu: () => {
    set({ screen: "menu", sim: null, events: [] });
  },
}));
