/**
 * core/data/commands.ts — 10 条鼓命令语法(冻结,见 GDD §3 / TDD §5)
 *
 * 每条命令 = COMMAND_LENGTH(4)个鼓名序列。序列全表唯一。
 * `lookupCommand()` 是唯一解析器;新增命令需走 TDD §0 冻结契约流程。
 */

import { COMMAND_LENGTH } from '../constants.js';
import type { CommandName, NoteType } from '../types.js';

export interface CommandDef {
  name: CommandName;
  sequence: readonly NoteType[];
}

/** 冻结表(GDD §3):顺序即展示顺序(Menu/HUD 预览共用) */
export const COMMANDS: readonly CommandDef[] = [
  { name: 'MARCH', sequence: ['PATA', 'PATA', 'PATA', 'PON'] },
  { name: 'ATTACK', sequence: ['PATA', 'PON', 'PATA', 'PON'] },
  { name: 'DEFEND', sequence: ['PON', 'PON', 'PATA', 'PATA'] },
  { name: 'CHARGE', sequence: ['PATA', 'PATA', 'PATA', 'CHAKA'] },
  { name: 'RALLY', sequence: ['PON', 'PON', 'PON', 'PON'] },
  { name: 'VOLLEY', sequence: ['CHAKA', 'CHAKA', 'PATA', 'PATA'] },
  { name: 'RETREAT', sequence: ['PON', 'PON', 'CHAKA', 'CHAKA'] },
  { name: 'BERSERK', sequence: ['PATA', 'PATA', 'PON', 'PON'] },
  { name: 'HEAVY', sequence: ['PON', 'PATA', 'PON', 'CHAKA'] },
  { name: 'MIRACLE', sequence: ['CHAKA', 'DON', 'PATA', 'PON'] },
] as const;

const keyOf = (seq: readonly NoteType[]): string => seq.join(',');

const LOOKUP: ReadonlyMap<string, CommandName> = new Map(
  COMMANDS.map((c) => [keyOf(c.sequence), c.name]),
);

/** 4 拍序列 → 命令名;未知序列返回 null(调用方发 commandFailed) */
export function lookupCommand(sequence: readonly NoteType[]): CommandName | null {
  if (sequence.length !== COMMAND_LENGTH) return null;
  return LOOKUP.get(keyOf(sequence)) ?? null;
}
