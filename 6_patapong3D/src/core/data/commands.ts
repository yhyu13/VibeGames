/**
 * core/data/commands.ts - v2.0 command grammar (frozen)
 *
 * 10 commands from 4-beat drum sequences. The player chooses the drums; the
 * 4th successful beat resolves the sequence.
 */

import type { CommandName, NoteType } from '../types';

export interface CommandDef {
  name: CommandName;
  beats: readonly [NoteType, NoteType, NoteType, NoteType];
  label: string;
  description: string;
}

export const COMMANDS: readonly CommandDef[] = [
  {
    name: 'MARCH',
    beats: ['PATA', 'PATA', 'PATA', 'PON'],
    label: 'MARCH',
    description: 'Army advances toward the boss',
  },
  {
    name: 'ATTACK',
    beats: ['PATA', 'PON', 'PATA', 'PON'],
    label: 'ATTACK',
    description: 'Standard attack',
  },
  {
    name: 'DEFEND',
    beats: ['PON', 'PON', 'PATA', 'PATA'],
    label: 'DEFEND',
    description: 'Guard the next boss attack',
  },
  {
    name: 'CHARGE',
    beats: ['PATA', 'PATA', 'PATA', 'CHAKA'],
    label: 'CHARGE',
    description: 'Heavy charge attack',
  },
  {
    name: 'RALLY',
    beats: ['PON', 'PON', 'PON', 'PON'],
    label: 'RALLY',
    description: 'Heal the whole army',
  },
  {
    name: 'VOLLEY',
    beats: ['CHAKA', 'CHAKA', 'PATA', 'PATA'],
    label: 'VOLLEY',
    description: 'Ranged barrage, no approach needed',
  },
  {
    name: 'RETREAT',
    beats: ['PON', 'PON', 'CHAKA', 'CHAKA'],
    label: 'RETREAT',
    description: 'Fall back and dodge the next attack',
  },
  {
    name: 'BERSERK',
    beats: ['PATA', 'PATA', 'PON', 'PON'],
    label: 'BERSERK',
    description: 'Double attack damage for 2 boss turns',
  },
  {
    name: 'HEAVY',
    beats: ['PON', 'PATA', 'PON', 'CHAKA'],
    label: 'HEAVY',
    description: 'Slow heavy smash',
  },
  {
    name: 'MIRACLE',
    beats: ['CHAKA', 'DON', 'PATA', 'PON'],
    label: 'MIRACLE',
    description: 'Instant Fever',
  },
] as const;

export function lookupCommand(beats: readonly NoteType[]): CommandDef | null {
  if (beats.length !== 4) return null;
  for (const command of COMMANDS) {
    if (command.beats.every((beat, i) => beat === beats[i])) return command;
  }
  return null;
}
