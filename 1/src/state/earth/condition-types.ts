import type { ConditionId, ElementId } from '../id.js';

export interface ConditionDef {
  id: ConditionId;
  name: string;
  resistance: ElementId;
  weakness: ElementId;
  effect: string;
  valid: boolean;
}