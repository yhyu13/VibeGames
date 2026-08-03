import type {
  ConditionProfile,
  DefenseUnit,
  MessageCardId,
  MutatorDefinition,
  MutationOffer,
  NetworkNodeId,
  PopulationSegment,
  PrimaryTarget,
  Projectile,
  PropagandaSegmentState,
  RunEvent,
  ShipState,
} from "../core/types";
import { MAX_RUN_DAYS, ORBIT_RADIUS, PLAYABLE_PITCH } from "../core/types";
import { hashStringToSeed, mulberry32, type Rng } from "../core/rng";
import { createEquipped, getWeapon, weaponPool } from "./weapons";
import { generateConditionProfile } from "./conditions";
import { generateMutationOffers } from "./mutations";
import { applyMessage, createSegments, DEFAULT_HAND, drawMessageHand, totalConviction } from "./propaganda";
import { createNodes, systemShutdownReached, validateSolution } from "./virus";
import { resolveDayEscalation } from "./countermeasures";
import {
  applyDamageToShip,
  applyDot,
  fireWeapon,
  pointDefenseIntercept,
  stepProjectiles,
} from "./combat";
import { hullForChassis } from "./meta";

export interface InputState {
  yaw: number;
  pitch: number;
  fire: boolean;
  weaponIndex: number;
}

export interface RunSettings {
  seed: number | string;
  meta: { unlocks: { weapons: string[]; loadoutSlots: number; chassis: number } };
  eventHandler?: (event: RunEvent) => void;
  dayAutoAdvanceSeconds?: number;
}

export interface Nuke {
  id: string;
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  target: "ship" | "defense";
  alive: boolean;
}

export interface RunSim {
  day: number;
  status: "setup" | "active" | "victory" | "defeat";
  winCondition: "annihilation" | "systemShutdown" | "totalConversion" | null;
  profile: ConditionProfile;
  ship: ShipState;
  defenses: DefenseUnit[];
  projectiles: Projectile[];
  nukes: Nuke[];
  segments: PropagandaSegmentState[];
  messageHand: ReturnType<typeof drawMessageHand>;
  nodes: ReturnType<typeof createNodes>;
  primaryTargets: PrimaryTarget[];
  mutationsTaken: MutatorDefinition[];
  pendingMutations: MutationOffer[] | null;
  pendingPuzzleNode: NetworkNodeId | null;
  actionsUsed: { major: boolean; minor: boolean };
  bloodless: boolean;
  lastEvents: RunEvent[];
  nextDayIn: number;
  combatTime: number;
  over: boolean;

  start(): void;
  setInput(input: InputState): void;
  tick(dt: number): void;
  endDay(): void;
  acceptMutation(id: string): void;
  declineMutations(): void;
  broadcastMessage(segment: PopulationSegment, card: MessageCardId): void;
  beginHack(node: NetworkNodeId): void;
  solvePuzzle(node: NetworkNodeId, attempt: unknown): boolean;
  abortHack(): void;
  doomsday(): void;
  repair(amount: number): void;
  synthWeapon(a: string, b: string): void;
  destroyTarget(id: string): void;
}

interface RunCtx {
  seed: number;
  rng: Rng;
  battleRng: Rng;
  input: InputState;
  idCounter: number;
  turretCooldowns: Map<string, number>;
}

const PRIMARY_TARGET_DEFS: PrimaryTarget[] = [
  { id: "spaceStation", name: "Space Station", hp: 200, maxHp: 200, position: { x: 0, y: 0, z: -30 } },
  { id: "defenseNexus", name: "Defense Nexus", hp: 150, maxHp: 150, position: { x: 20, y: 5, z: -18 } },
  { id: "capitalShield", name: "Capital Shield", hp: 180, maxHp: 180, position: { x: -18, y: -6, z: -20 } },
];

export function createRunSim(settings: RunSettings): RunSim {
  const seed = typeof settings.seed === "string" ? hashStringToSeed(settings.seed) : settings.seed;
  const ctx: RunCtx = {
    seed,
    rng: mulberry32(seed),
    battleRng: mulberry32(seed ^ 0x5f3759df),
    input: { yaw: 0, pitch: 0, fire: false, weaponIndex: 0 },
    idCounter: 0,
    turretCooldowns: new Map(),
  };
  const profile = generateConditionProfile(seed, 3);

  const unlocked = settings.meta.unlocks.weapons.map(getWeapon);
  const pool = weaponPool(seed, 1);
  const loadoutSpecs = dedupeById([...pool, ...unlocked]).slice(0, settings.meta.unlocks.loadoutSlots);
  if (loadoutSpecs.length === 0) loadoutSpecs.push(getWeapon("plasmaLance"));

  const maxHull = hullForChassis(settings.meta.unlocks.chassis);
  const ship: ShipState = {
    hull: maxHull,
    maxHull,
    hullWeaversRepair: 0,
    armor: { kinetic: 0.1 },
    immunityType: null,
    yaw: 0,
    pitch: 0,
    weapons: loadoutSpecs.map(createEquipped),
    activeWeaponIndex: 0,
    systems: { hull: 3, weaponBay: 3, broadcastArray: 3, cortex: 3 },
    speed: 1.1,
    morale: 100,
  };

  const sim: RunSim = {
    day: 0,
    status: "setup",
    winCondition: null,
    profile,
    ship,
    defenses: [],
    projectiles: [],
    nukes: [],
    segments: createSegments(),
    messageHand: drawMessageHand(DEFAULT_HAND),
    nodes: createNodes(seed, 1),
    primaryTargets: PRIMARY_TARGET_DEFS.map((t) => ({ ...t, hp: t.maxHp })),
    mutationsTaken: [],
    pendingMutations: null,
    pendingPuzzleNode: null,
    actionsUsed: { major: false, minor: false },
    bloodless: true,
    lastEvents: [],
    nextDayIn: settings.dayAutoAdvanceSeconds ?? 0,
    combatTime: 0,
    over: false,
    start: () => startRun(sim, ctx),
    setInput: (i) => setInput(sim, ctx, i),
    tick: (dt) => tick(sim, ctx, dt),
    endDay: () => endDay(sim, ctx),
    acceptMutation: (id) => acceptMutation(sim, ctx, id),
    declineMutations: () => {
      sim.pendingMutations = null;
    },
    broadcastMessage: (seg, card) => broadcastMessage(sim, ctx, seg, card),
    beginHack: (node) => beginHack(sim, node),
    solvePuzzle: (node, attempt) => solvePuzzle(sim, ctx, node, attempt),
    abortHack: () => {
      sim.pendingPuzzleNode = null;
    },
    doomsday: () => doomsday(sim, ctx),
    repair: (amount) => repair(sim, amount),
    synthWeapon: (a, b) => synthWeapon(sim, a, b),
    destroyTarget: (id) => destroyTarget(sim, id),
  };
  return sim;
}

function dedupeById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Map<string, T>();
  for (const it of items) seen.set(it.id, it);
  return [...seen.values()];
}

function emit(sim: RunSim, event: RunEvent): void {
  sim.lastEvents.push(event);
  if (sim.lastEvents.length > 50) sim.lastEvents.shift();
}

function startRun(sim: RunSim, ctx: RunCtx): void {
  sim.status = "active";
  sim.day = 1;
  emit(sim, { type: "dayStarted", day: sim.day });
  const esc = resolveDayEscalation(sim.day, sim.profile, ctx.seed, sim.defenses, {
    compromisedNodes: compromisedList(sim),
    rallyBlocked: false,
  });
  sim.defenses.push(...esc.spawned);
}

function setInput(sim: RunSim, ctx: RunCtx, next: InputState): void {
  ctx.input.yaw = clamp(next.yaw, -1, 1);
  ctx.input.pitch = clamp(next.pitch, -1, 1);
  ctx.input.fire = next.fire;
  ctx.input.weaponIndex = next.weaponIndex;
  if (sim.ship.weapons[next.weaponIndex]) {
    sim.ship.activeWeaponIndex = next.weaponIndex;
  }
}

function tick(sim: RunSim, ctx: RunCtx, dt: number): void {
  if (sim.status !== "active") return;
  sim.combatTime += dt;

  sim.ship.yaw += ctx.input.yaw * sim.ship.speed * dt;
  sim.ship.pitch = clamp(sim.ship.pitch + ctx.input.pitch * sim.ship.speed * 0.8 * dt, -PLAYABLE_PITCH, PLAYABLE_PITCH);

  for (const w of sim.ship.weapons) {
    w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
    if (w.spec.special === "doomsday" && ctx.input.fire && w.charge < 1) {
      w.charge = Math.min(1, w.charge + dt / w.spec.chargeTime);
    }
  }

  if (ctx.input.fire) {
    const fired = fireWeapon(sim.ship, sim.ship.activeWeaponIndex, sim.profile, sim.mutationsTaken, () => nextId(ctx));
    if (fired.length > 0) sim.projectiles.push(...fired);
  }

  stepProjectiles(sim.projectiles, sim.defenses, sim.ship, sim.profile, sim.mutationsTaken, dt, (p, d) => {
    if (p.special === "doomsday") {
      for (const t of sim.primaryTargets) {
        if (t.hp > 0 && dist3(t.position, p.position) < 6) {
          t.hp = 0;
          sim.bloodless = false;
          emit(sim, { type: "defenseDestroyed", id: t.id, kind: "spaceStation" });
        }
      }
    }
    if (d.kind === "spaceStation" || d.kind === "nukeSilo") sim.bloodless = false;
    if (d.hp <= 0) {
      sim.bloodless = sim.bloodless && d.kind !== "spaceStation" && d.kind !== "nukeSilo";
      emit(sim, { type: "defenseDestroyed", id: d.id, kind: d.kind });
    }
  });

  applyDot(sim.projectiles, sim.defenses, sim.profile, sim.mutationsTaken, dt);

  const missileBonus = sim.mutationsTaken.some((m) => m.bane.missileInterceptionBonus) ? 1 : 0;
  pointDefenseIntercept(sim.projectiles, sim.defenses, missileBonus, () => ctx.battleRng.next());

  stepDefenses(sim, ctx, dt);
  stepNukes(sim, ctx, dt);

  sim.projectiles = sim.projectiles.filter((p) => p.alive);
  sim.defenses = sim.defenses.filter((d) => d.hp > 0);
  sim.nukes = sim.nukes.filter((n) => n.alive);

  checkWin(sim);
  if (sim.status !== "active") return;

  // Day progression: auto-advance after a major action (dayAutoAdvanceSeconds),
  // otherwise manual via endDay(). Also a hard cap so a stuck run can't hang forever.
  if (sim.nextDayIn > 0 && sim.actionsUsed.major) {
    sim.nextDayIn -= dt;
    if (sim.nextDayIn <= 0) {
      sim.nextDayIn = 0;
      advanceDay(sim, ctx);
    }
  }
}

function stepDefenses(sim: RunSim, ctx: RunCtx, dt: number): void {
  const sp = shipPos(sim);
  for (const d of sim.defenses) {
    if (d.hp <= 0 || d.disabled) continue;
    const cd = ctx.turretCooldowns.get(d.id) ?? 0;
    if (cd > 0) {
      ctx.turretCooldowns.set(d.id, cd - dt);
      continue;
    }
    if (d.kind === "spaceStation" || d.kind === "turret") {
      const dir = normalize(toward(d.position, sp));
      const spread = d.kind === "spaceStation" ? 2 : 1;
      for (let i = 0; i < spread; i++) {
        sim.projectiles.push({
          id: nextId(ctx),
          weaponId: d.kind,
          type: d.kind === "spaceStation" ? "energy" : "kinetic",
          damage: d.kind === "spaceStation" ? 8 : 6,
          position: { ...d.position },
          direction: spread > 1 ? rotateY(dir, (i - (spread - 1) / 2) * 0.3) : dir,
          speed: d.kind === "spaceStation" ? 30 : 26,
          pierceLeft: 0,
          splashRadius: 0,
          dot: null,
          fromPlayer: false,
          hostile: true,
          alive: true,
          special: "none",
        });
      }
      ctx.turretCooldowns.set(d.id, d.kind === "spaceStation" ? 2.2 : 1.6 + ctx.battleRng.next() * 1.2);
    }
  }
}

function stepNukes(sim: RunSim, _ctx: RunCtx, dt: number): void {
  const sp = shipPos(sim);
  for (const n of sim.nukes) {
    if (!n.alive) continue;
    n.position.x += n.velocity.x * dt;
    n.position.y += n.velocity.y * dt;
    n.position.z += n.velocity.z * dt;
    if (n.target === "ship" && dist3(n.position, sp) < 1.8) {
      const r = applyDamageToShip(sim.ship, 30, "radiation", sim.profile);
      emit(sim, { type: "damageTaken", amount: r.applied });
      n.alive = false;
      if (r.dead) declareDefeat(sim, "Ship destroyed by nuclear strike.");
    }
  }
}

function endDay(sim: RunSim, ctx: RunCtx): void {
  if (sim.status !== "active") return;
  sim.nextDayIn = 0;
  advanceDay(sim, ctx);
}

function advanceDay(sim: RunSim, ctx: RunCtx): void {
  if (sim.status !== "active") return;

  if (sim.ship.morale <= 0) {
    declareDefeat(sim, "Crew morale collapsed.");
    return;
  }
  if (sim.ship.hullWeaversRepair > 0) {
    sim.ship.hull = Math.min(sim.ship.maxHull, sim.ship.hull + sim.ship.maxHull * sim.ship.hullWeaversRepair);
  }
  for (const m of sim.mutationsTaken) {
    if (m.bane.crewMoraleDecay) sim.ship.morale = Math.max(0, sim.ship.morale - 6);
  }
  const hackBack = sim.mutationsTaken.some((m) => m.bane.hackBack);
  if (hackBack && sim.day % 3 === 0) {
    const keys = Object.keys(sim.ship.systems) as (keyof ShipState["systems"])[];
    const key = keys[Math.floor(ctx.rng.next() * keys.length)];
    sim.ship.systems[key] = Math.max(1, sim.ship.systems[key] - 1);
  }

  sim.day += 1;
  sim.actionsUsed = { major: false, minor: false };
  sim.nextDayIn = 0;
  emit(sim, { type: "dayStarted", day: sim.day });

  const esc = resolveDayEscalation(sim.day, sim.profile, ctx.seed, sim.defenses, {
    compromisedNodes: compromisedList(sim),
    rallyBlocked: totalConviction(sim.segments) >= 50,
  });
  sim.defenses.push(...esc.spawned);
  if (esc.nukeFired) {
    launchNuke(sim, ctx);
    emit(sim, { type: "nukeFired", atShip: true });
  }
  if (esc.threats.length > 0) emit(sim, { type: "earthEscalated", threats: esc.threats });

  if (sim.mutationsTaken.some((m) => m.bane.orbitMines) && ctx.rng.chance(0.5)) {
    const r = applyDamageToShip(sim.ship, 8, "kinetic", sim.profile);
    if (r.applied > 0) emit(sim, { type: "damageTaken", amount: r.applied });
  }

  if ((sim.day - 1) % 2 === 0) {
    const offers = generateMutationOffers(ctx.seed, sim.day, sim.mutationsTaken.map((m) => m.id));
    if (offers.length > 0) {
      sim.pendingMutations = offers;
      emit(sim, { type: "mutationOffered", offers });
    }
  }

  if (sim.ship.hull <= 0) {
    declareDefeat(sim, "Ship destroyed.");
    return;
  }
  if (sim.day > MAX_RUN_DAYS) {
    declareDefeat(sim, "Earth outlasted your invasion.");
  }
}

function acceptMutation(sim: RunSim, ctx: RunCtx, id: string): void {
  const offer = sim.pendingMutations?.find((o) => o.mutation.id === id);
  if (!offer) return;
  const m = offer.mutation;
  sim.mutationsTaken.push(m);
  if (m.benefit.repairPerDay) sim.ship.hullWeaversRepair = Math.max(sim.ship.hullWeaversRepair, m.benefit.repairPerDay);
  if (m.benefit.immunityType) sim.ship.immunityType = m.benefit.immunityType;
  if (m.benefit.virusSpeed) {
    for (const n of sim.nodes) n.attemptsLeft = Math.min(5, n.attemptsLeft + m.benefit.virusSpeed);
  }
  sim.pendingMutations = null;
  emit(sim, { type: "mutationAccepted", id });
  void ctx;
}

function broadcastMessage(sim: RunSim, ctx: RunCtx, segment: PopulationSegment, card: MessageCardId): void {
  if (sim.status !== "active" || sim.actionsUsed.major) return;
  const seg = sim.segments.find((s) => s.segment === segment);
  if (!seg || seg.converted || seg.jammedUntilDay > sim.day) return;
  const scientistsConverted = sim.segments.find((s) => s.segment === "scientist")?.converted ?? false;
  const power = sim.mutationsTaken.reduce((acc, m) => acc * (m.benefit.propagandaPower ?? 1), 1);
  const result = applyMessage(seg, card, {
    day: sim.day,
    propagandaPower: power,
    propagandaMod: sim.profile.effective.propagandaMod,
    scientistsConverted,
  });
  sim.actionsUsed.major = true;
  if (result.converted) emit(sim, { type: "segmentConverted", segment });
  void ctx;
}

function beginHack(sim: RunSim, nodeId: NetworkNodeId): void {
  if (sim.status !== "active" || sim.actionsUsed.major) return;
  if (sim.pendingPuzzleNode) return;
  const node = sim.nodes.find((n) => n.node === nodeId);
  if (!node || node.compromised || node.attemptsLeft <= 0) return;
  sim.pendingPuzzleNode = nodeId;
}

function solvePuzzle(sim: RunSim, ctx: RunCtx, nodeId: NetworkNodeId, attempt: unknown): boolean {
  if (sim.status !== "active" || sim.pendingPuzzleNode !== nodeId) return false;
  const node = sim.nodes.find((n) => n.node === nodeId);
  if (!node || node.compromised) return false;
  const ok = validateSolution(node.puzzle, attempt);
  if (!ok) {
    node.attemptsLeft -= 1;
    if (node.attemptsLeft <= 0) sim.pendingPuzzleNode = null;
    return false;
  }
  node.compromised = true;
  node.puzzle.solved = true;
  sim.pendingPuzzleNode = null;
  sim.actionsUsed.major = true;
  emit(sim, { type: "nodeCompromised", node: nodeId });
  if (nodeId === "powerGrid") {
    const d = sim.defenses.find((x) => x.hp > 0 && !x.disabled);
    if (d) d.disabled = true;
  }
  if (systemShutdownReached(sim.nodes)) {
    declareVictory(sim, "systemShutdown");
  }
  void ctx;
  return true;
}

function doomsday(sim: RunSim, ctx: RunCtx): void {
  const idx = sim.ship.weapons.findIndex((w) => w.spec.special === "doomsday");
  if (idx < 0) return;
  const eq = sim.ship.weapons[idx];
  if (eq.charge < 1) return;
  eq.charge = 0;
  eq.cooldownRemaining = eq.spec.cooldown;
  sim.bloodless = false;
  const fired = fireWeapon(sim.ship, idx, sim.profile, sim.mutationsTaken, () => nextId(ctx));
  if (fired.length > 0) sim.projectiles.push(...fired);
}

function repair(sim: RunSim, amount: number): void {
  if (sim.status !== "active" || sim.actionsUsed.minor) return;
  sim.ship.hull = Math.min(sim.ship.maxHull, sim.ship.hull + amount);
  sim.actionsUsed.minor = true;
}

function synthWeapon(sim: RunSim, a: string, b: string): void {
  const specA = getWeapon(a);
  const specB = getWeapon(b);
  const synth = {
    ...specA,
    id: `synth-${a}-${b}`,
    name: `${specA.name}+${specB.name}`,
    damage: Math.round((specA.damage + specB.damage) * 1.3),
    pierce: Math.max(specA.pierce, specB.pierce),
    spread: specA.spread + specB.spread,
  };
  if (sim.ship.weapons.length >= 3) sim.ship.weapons.pop();
  sim.ship.weapons.push(createEquipped(synth));
  sim.bloodless = false;
}

function destroyTarget(sim: RunSim, id: string): void {
  const t = sim.primaryTargets.find((x) => x.id === id);
  if (!t || t.hp <= 0) return;
  t.hp = 0;
  sim.bloodless = false;
  emit(sim, { type: "defenseDestroyed", id, kind: "spaceStation" });
  if (sim.primaryTargets.every((x) => x.hp <= 0)) declareVictory(sim, "annihilation");
}

function launchNuke(sim: RunSim, ctx: RunCtx): void {
  const rng = mulberry32(ctx.seed * 97 + sim.day * 13);
  const angle = rng.next() * Math.PI * 2;
  sim.nukes.push({
    id: nextId(ctx),
    position: { x: 40, y: 10, z: -30 },
    velocity: { x: Math.cos(angle) * 3, y: 0.4, z: Math.sin(angle) * 3 },
    target: "ship",
    alive: true,
  });
}

function compromisedList(sim: RunSim): NetworkNodeId[] {
  return sim.nodes.filter((n) => n.compromised).map((n) => n.node);
}

function checkWin(sim: RunSim): void {
  if (sim.status !== "active") return;
  if (sim.primaryTargets.every((t) => t.hp <= 0)) {
    declareVictory(sim, "annihilation");
    return;
  }
  if (systemShutdownReached(sim.nodes)) {
    declareVictory(sim, "systemShutdown");
    return;
  }
  if (totalConviction(sim.segments) >= 100) {
    declareVictory(sim, "totalConversion");
  }
}

function declareVictory(sim: RunSim, condition: "annihilation" | "systemShutdown" | "totalConversion"): void {
  if (sim.status === "victory" || sim.status === "defeat") return;
  sim.status = "victory";
  sim.winCondition = condition;
  sim.over = true;
  emit(sim, { type: "victory", winCondition: condition });
}

function declareDefeat(sim: RunSim, reason: string): void {
  if (sim.status === "victory" || sim.status === "defeat") return;
  sim.status = "defeat";
  sim.over = true;
  emit(sim, { type: "defeat", reason });
}

function shipPos(sim: RunSim): { x: number; y: number; z: number } {
  return {
    x: ORBIT_RADIUS * Math.cos(sim.ship.pitch) * Math.cos(sim.ship.yaw),
    y: ORBIT_RADIUS * Math.sin(sim.ship.pitch),
    z: -ORBIT_RADIUS * Math.cos(sim.ship.pitch) * Math.sin(sim.ship.yaw),
  };
}

function nextId(ctx: RunCtx): string {
  return `ent-${ctx.idCounter++}`;
}

function toward(from: { x: number; y: number; z: number }, to: { x: number; y: number; z: number }): { x: number; y: number; z: number } {
  return { x: to.x - from.x, y: to.y - from.y, z: to.z - from.z };
}

function normalize(v: { x: number; y: number; z: number }): { x: number; y: number; z: number } {
  const l = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) || 1;
  return { x: v.x / l, y: v.y / l, z: v.z / l };
}

function rotateY(v: { x: number; y: number; z: number }, ang: number): { x: number; y: number; z: number } {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
}

function dist3(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
