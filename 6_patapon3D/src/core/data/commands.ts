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

/** 冻结表(GDD §3):顺序即展示顺序;HUD 命令条按本表实时读数(reachableCommands) */
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

/**
 * 已有拍 → 仍然可及的命令(空前缀 = 全表 10 条;满 4 拍 = 0 或 1 条)。
 *
 * 这不是第二个解析器:它按前缀过滤候选,不判定任何序列,**`lookupCommand()` 仍是唯一的
 * 解析入口**。HUD 命令条用它说「这 4 拍还能变成什么」—— 读数直接取自本表,所以表改了、
 * 读数跟着改;把手抄的命令清单写在界面上会漂移(旧 HUD 那行就手抄了 3 条,10 条里另外
 * 7 条在战斗中无处可查)。
 *
 * checks/check-v2-battle.ts 断言它是 `lookupCommand` 的原像:读数里列出的命令,一定有某个
 * 4 拍延伸真能解析出来;读数里没有的,一定不能。读数比解析器宽 = 界面在承诺一条按下去会
 * commandFailed 的命令;比解析器窄 = 界面在藏一条真能用的命令。两种都不许有。
 */
export function reachableCommands(prefix: readonly NoteType[]): readonly CommandDef[] {
  if (prefix.length > COMMAND_LENGTH) return [];
  return COMMANDS.filter((c) => prefix.every((n, i) => c.sequence[i] === n));
}
