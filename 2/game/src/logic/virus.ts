import type { NetworkNodeId, NetworkNodeState, VirusPuzzle } from "../core/types";
import { mulberry32, type Rng } from "../core/rng";

export const NETWORK_NODES: NetworkNodeId[] = [
  "powerGrid",
  "defenseGrid",
  "missileCommand",
  "mediaNet",
  "orbitalControl",
];

export const NODE_LABELS: Record<NetworkNodeId, string> = {
  powerGrid: "Power Grid",
  defenseGrid: "Defense Grid",
  missileCommand: "Missile Command",
  mediaNet: "Media Net",
  orbitalControl: "Orbital Control",
};

export const NODE_EFFECTS: Record<NetworkNodeId, string> = {
  powerGrid: "Disable 1 defense per day",
  defenseGrid: "Auto-disable turrets in combat",
  missileCommand: "Sabotage incoming nukes",
  mediaNet: "+Propaganda effectiveness",
  orbitalControl: "Lower orbital obstacle coverage",
};

export type VirusPuzzleKind = "pattern" | "routing" | "timing";

interface PatternData {
  target: string[];
  options: string[][];
  solution: string[];
}

interface RoutingData {
  graph: Array<{ from: number; to: number; cost: number }>;
  start: number;
  end: number;
  solution: number[];
}

interface TimingData {
  windows: number[][]; // [start, end] per beat
  solution: number[];
}

function generatePattern(rng: Rng, difficulty: number): VirusPuzzle {
  const tokens = ["A", "B", "C", "D"];
  const len = Math.min(3 + Math.floor(difficulty / 2), 6);
  const target: string[] = [];
  for (let i = 0; i < len; i++) target.push(rng.pick(tokens));
  const solution = target.slice();
  const options: string[][] = [solution];
  const seen = new Set([solution.join(",")]);
  while (options.length < 4) {
    const candidate = target.map(() => rng.pick(tokens));
    const key = candidate.join(",");
    if (!seen.has(key)) {
      seen.add(key);
      options.push(candidate);
    }
  }
  const shuffled = rng.shuffle(options);
  return {
    kind: "pattern",
    difficulty,
    data: { target, options: shuffled },
    solution: shuffled.findIndex((o) => o.join(",") === solution.join(",")),
    solved: false,
  };
}

function generateRouting(rng: Rng, difficulty: number): VirusPuzzle {
  const n = Math.min(4 + Math.floor(difficulty / 2), 8);
  const graph: Array<{ from: number; to: number; cost: number }> = [];
  for (let i = 0; i < n - 1; i++) {
    graph.push({ from: i, to: i + 1, cost: 1 + Math.floor(rng.next() * 3) });
  }
  for (let i = 0; i < n; i++) {
    const j = Math.floor(rng.next() * n);
    if (j !== i) graph.push({ from: i, to: j, cost: 1 + Math.floor(rng.next() * 3) });
  }
  const start = 0;
  const end = n - 1;
  const solution = dijkstra(n, graph, start, end);
  return {
    kind: "routing",
    difficulty,
    data: { graph, start, end },
    solution,
    solved: false,
  };
}

function dijkstra(n: number, graph: Array<{ from: number; to: number; cost: number }>, start: number, end: number): number[] {
  const adj = new Map<number, Array<{ to: number; cost: number }>>();
  for (const e of graph) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from)!.push({ to: e.to, cost: e.cost });
  }
  const dist = new Array(n).fill(Infinity);
  const prev = new Array(n).fill(-1);
  dist[start] = 0;
  const visited = new Array(n).fill(false);
  while (true) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!visited[i] && (u === -1 || dist[i] < dist[u])) u = i;
    }
    if (u === -1 || dist[u] === Infinity) break;
    visited[u] = true;
    if (u === end) break;
    for (const e of adj.get(u) ?? []) {
      const alt = dist[u] + e.cost;
      if (alt < dist[e.to]) {
        dist[e.to] = alt;
        prev[e.to] = u;
      }
    }
  }
  const path: number[] = [];
  for (let cur = end; cur !== -1; cur = prev[cur]) path.unshift(cur);
  return path.length > 1 ? path : [start, end];
}

function generateTiming(rng: Rng, difficulty: number): VirusPuzzle {
  const beats = Math.min(3 + Math.floor(difficulty / 3), 8);
  const windows: number[][] = [];
  const solution: number[] = [];
  let t = 0;
  for (let i = 0; i < beats; i++) {
    const start = t + Math.floor(rng.next() * 3);
    const width = 2 + Math.floor(rng.next() * 3);
    windows.push([start, start + width]);
    solution.push(start + 1 + Math.floor(rng.next() * Math.max(1, width - 2)));
    t = start + width + 1;
  }
  return {
    kind: "timing",
    difficulty,
    data: { windows },
    solution,
    solved: false,
  };
}

export function generatePuzzle(kind: VirusPuzzleKind, difficulty: number, seed: number): VirusPuzzle {
  const rng = mulberry32(seed ^ (difficulty * 1315423911));
  switch (kind) {
    case "pattern":
      return generatePattern(rng, difficulty);
    case "routing":
      return generateRouting(rng, difficulty);
    case "timing":
      return generateTiming(rng, difficulty);
  }
}

export function validateSolution(puzzle: VirusPuzzle, attempt: unknown): boolean {
  const a = puzzle.solution;
  const b = attempt;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => v === b[i]);
  }
  return a === b;
}

export function createNodes(seed: number, techLevel: number): NetworkNodeState[] {
  const kinds: VirusPuzzleKind[] = ["pattern", "routing", "timing"];
  return NETWORK_NODES.map((node, i) => ({
    node,
    compromised: false,
    puzzle: generatePuzzle(kinds[i % 3], Math.max(1, Math.round(techLevel + i / 2)), seed + i * 977),
    attemptsLeft: 3,
  }));
}

export function compromiseCount(nodes: NetworkNodeState[]): number {
  return nodes.filter((n) => n.compromised).length;
}

export function systemShutdownReached(nodes: NetworkNodeState[]): boolean {
  return compromiseCount(nodes) >= 4;
}
