// src/store.ts — zustand UI store（引擎事件聚合同步；UI 只读消费）

import { create } from 'zustand';
import type {
  AnxietyBand, ArchiveEntry, BeatType, DiaryEntry, EndingVariant, GamePhase,
  PersistedStats, RatingAxisId, RatingFacts, Speaker, Vector3,
} from './core/types';
import type { MouseRhythmChart, RhythmJudgement } from './core/simulation/mouseRhythm';
import type { ScheduledAudienceBarrage } from './core/simulation/audienceBarrage';

export interface BeatInfo {
  type: BeatType;
  duration: number;
  remaining: number;
  targetPos?: Vector3;
}

export interface RhythmInfo {
  active: boolean;
  chart: MouseRhythmChart | null;
  elapsed: number;
  targetIndex: number;
  combo: number;
  lastJudgement: RhythmJudgement | null;
  lastJudgementEarly: boolean;
  holdProgress: number | null;  // 长按中 0-1
  fixture: boolean;
}

export interface UiSnapshot {
  phase: GamePhase;
  round: number;
  paused: boolean;
  runActive: boolean;
  anxietyBand: AnxietyBand;
  shakeIntensity: number;
  stringDetune: number;
  beat: BeatInfo | null;
  rhythm: RhythmInfo;
  audienceBarrage: ScheduledAudienceBarrage[];
  barrageEnabled: boolean;
  barrageDensity: 'standard' | 'sparse';
  soundEnabled: boolean;
  shadowScreen: { x: number; y: number };
  viewers: number;
  rating: UiStore['rating'];
  dialogueQueue: UiStore['dialogue']['queue'];
  activeDialogue: UiStore['dialogue']['active'];
  diaryOpen: boolean;
  diaryOptions: DiaryEntry[];
  diaryWriteCount: number;
  diaryCountdown: number;
  archiveEntries: ArchiveEntry[];
  archiveUnread: number;
  bandPrompt: string | null;
  promptKey: number;
  stats: PersistedStats | null;
  ending: UiStore['ending'];
  scriptName: string | null;
}

export interface UiStore {
  runState: { phase: GamePhase; round: number; paused: boolean; runActive: boolean };
  scriptName: string | null;
  anxiety: { band: AnxietyBand; shakeIntensity: number; stringDetune: number; prompt: string | null; promptKey: number };
  beat: BeatInfo | null;
  rhythm: RhythmInfo;
  audienceBarrage: ScheduledAudienceBarrage[];
  barrageEnabled: boolean;
  barrageDensity: 'standard' | 'sparse';
  shadowScreen: { x: number; y: number };
  viewers: number;
  rating: {
    sheetOpen: boolean;
    axes: Record<RatingAxisId, { stars: number; auto: boolean; evidence?: string }>;
    facts: RatingFacts | null;
    submitted: boolean;
    countdown: number;
  };
  dialogue: {
    queue: { lineId: string; text: string; speaker: Speaker }[];
    active: { lineId: string; text: string; speaker: Speaker } | null;
    showChoice: boolean;
  };
  diary: { open: boolean; options: DiaryEntry[]; writeCount: number; countdown: number };
  archive: { entries: ArchiveEntry[]; unread: number };
  menu: { screen: 'title' | 'intro' | 'pause' | 'ending'; endingVariant?: EndingVariant; roundResult?: { round: number; verdict: string; totalRating: number; perfect: number; maxCombo: number } | null };
  ending: { variant: EndingVariant | null; stats: PersistedStats | null };
  soundEnabled: boolean;
  syncFromEngine(snapshot: UiSnapshot): void;
  setMenu(screen: UiStore['menu']['screen']): void;
  setBarrageSettings(enabled: boolean, density: 'standard' | 'sparse'): void;
  setSoundEnabled(enabled: boolean): void;
}

export const EMPTY_RHYTHM: RhythmInfo = {
  active: false,
  chart: null,
  elapsed: 0,
  targetIndex: 0,
  combo: 0,
  lastJudgement: null,
  lastJudgementEarly: false,
  holdProgress: null,
  fixture: false,
};

const emptyRatingAxes = (): UiStore['rating']['axes'] => ({
  mobility: { stars: 0, auto: false },
  delivery: { stars: 0, auto: false },
  visual: { stars: 0, auto: false },
  remembered: { stars: 0, auto: true },
});

export const useUiStore = create<UiStore>()((set) => ({
  runState: { phase: 'MENU', round: 1, paused: false, runActive: false },
  scriptName: null,
  anxiety: { band: 'calm', shakeIntensity: 0, stringDetune: 0, prompt: null, promptKey: 0 },
  beat: null,
  rhythm: EMPTY_RHYTHM,
  audienceBarrage: [],
  barrageEnabled: true,
  barrageDensity: 'standard',
  shadowScreen: { x: 0.5, y: 0.5 },
  viewers: 3,
  rating: { sheetOpen: false, axes: emptyRatingAxes(), facts: null, submitted: false, countdown: 10 },
  dialogue: { queue: [], active: null, showChoice: false },
  diary: { open: false, options: [], writeCount: 0, countdown: 8 },
  archive: { entries: [], unread: 0 },
  menu: { screen: 'title' },
  ending: { variant: null, stats: null },
  soundEnabled: true,
  syncFromEngine: (snap) =>
    set((s) => ({
      runState: { phase: snap.phase, round: snap.round, paused: snap.paused, runActive: snap.runActive },
      scriptName: snap.scriptName,
      anxiety: {
        band: snap.anxietyBand,
        shakeIntensity: snap.shakeIntensity,
        stringDetune: snap.stringDetune,
        prompt: snap.bandPrompt ?? s.anxiety.prompt,
        promptKey: snap.promptKey > 0 ? snap.promptKey : s.anxiety.promptKey,
      },
      beat: snap.beat,
      rhythm: snap.rhythm,
      audienceBarrage: snap.audienceBarrage,
      barrageEnabled: snap.barrageEnabled,
      barrageDensity: snap.barrageDensity,
      soundEnabled: snap.soundEnabled,
      shadowScreen: snap.shadowScreen,
      viewers: snap.viewers,
      rating: snap.rating,
      dialogue: { queue: snap.dialogueQueue, active: snap.activeDialogue, showChoice: snap.activeDialogue?.lineId === 'L_END_CHOICE' || snap.activeDialogue?.lineId === 'L_END_B' },
      diary: { open: snap.diaryOpen, options: snap.diaryOptions, writeCount: snap.diaryWriteCount, countdown: snap.diaryCountdown },
      archive: { entries: snap.archiveEntries, unread: snap.archiveUnread },
      ending: snap.ending,
    })),
  setMenu: (screen) => set((s) => ({ menu: { ...s.menu, screen } })),
  setBarrageSettings: (enabled, density) => set({ barrageEnabled: enabled, barrageDensity: density }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
}));
