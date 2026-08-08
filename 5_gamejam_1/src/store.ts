// src/store.ts — zustand UI store（TDD §5.5 冻结切片，仅 UI 状态）
// 由 GameEngine 事件同步写入；UI 只读消费。禁止 UI 直接改模拟。

import { create } from 'zustand';
import type {
  AnxietyBand, ArchiveEntry, BeatType, DiaryEntry, EndingVariant, GamePhase,
  RatingAxisId, RatingFacts, Speaker, Vector3,
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
  /** 上次判定是否早于节拍点（osu 式早晚箭头） */
  lastJudgementEarly: boolean;
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
  rating: UiStore['rating'];
  dialogueQueue: UiStore['dialogue']['queue'];
  activeDialogue: UiStore['dialogue']['active'];
  diaryOpen: boolean;
  diaryOptions: DiaryEntry[];
  diaryWriteCount: number;
  diaryCountdown: number;
  archiveEntries: ArchiveEntry[];
  archiveUnread: number;
}

export interface UiStore {
  // runState：当前阶段与轮次（镜像 sim.phase）
  runState: { phase: GamePhase; round: number; paused: boolean; runActive: boolean };
  // anxiety：HUD 代理（弦乐走音/手抖指示），不显示数字
  anxiety: { band: AnxietyBand; shakeIntensity: number; stringDetune: number };
  // beat：当前节拍（节拍圈 / 走位目标）
  beat: BeatInfo | null;
  rhythm: RhythmInfo;
  audienceBarrage: ScheduledAudienceBarrage[];
  // rating：自评表
  rating: {
    sheetOpen: boolean;
    axes: Record<RatingAxisId, { stars: number; auto: boolean; evidence?: string }>;
    facts: RatingFacts | null;
    submitted: boolean;
    countdown: number;
  };
  // dialogue：对白队列（排队播放）
  dialogue: {
    queue: { lineId: string; text: string; speaker: Speaker }[];
    active: { lineId: string; text: string; speaker: Speaker } | null;
  };
  // diary：日记 UI
  diary: { open: boolean; options: DiaryEntry[]; writeCount: number; countdown: number };
  // archive：挑战者档案侧栏
  archive: { entries: ArchiveEntry[]; unread: number };
  // menu：标题/暂停/结局屏
  menu: { screen: 'title' | 'intro' | 'pause' | 'ending'; endingVariant?: EndingVariant };
  // actions（由组件调用，转发为 engine 命令，不直改模拟）
  setPhase(p: GamePhase): void;
  setRhythmFixture(rhythm: RhythmInfo): void;
  setAudienceFixture(items: ScheduledAudienceBarrage[]): void;
  pushDialogue(d: UiStore['dialogue']['active']): void;
  openRating(r: UiStore['rating']): void;
  openDiary(d: UiStore['diary']): void;
  setMenu(s: UiStore['menu']['screen']): void;
  syncFromEngine(snapshot: UiSnapshot): void; // 引擎事件聚合后的批量同步
}

export const EMPTY_RHYTHM: RhythmInfo = {
  active: false,
  chart: null,
  elapsed: 0,
  targetIndex: 0,
  combo: 0,
  lastJudgement: null,
  lastJudgementEarly: false,
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
  anxiety: { band: 'calm', shakeIntensity: 0, stringDetune: 0 },
  beat: null,
  rhythm: EMPTY_RHYTHM,
  audienceBarrage: [],
  rating: { sheetOpen: false, axes: emptyRatingAxes(), facts: null, submitted: false, countdown: 10 },
  dialogue: { queue: [], active: null },
  diary: { open: false, options: [], writeCount: 0, countdown: 8 },
  archive: { entries: [], unread: 0 },
  menu: { screen: 'title' },
  setPhase: (p) => set((s) => ({ runState: { ...s.runState, phase: p } })),
  setRhythmFixture: (rhythm) => set({ rhythm }),
  setAudienceFixture: (audienceBarrage) => set({ audienceBarrage }),
  pushDialogue: (d) =>
    set((s) => {
      const queue = d ? [...s.dialogue.queue, d] : s.dialogue.queue;
      const active = s.dialogue.active ?? queue.shift() ?? null;
      return { dialogue: { queue, active } };
    }),
  openRating: (r) => set({ rating: r }),
  openDiary: (d) => set({ diary: d }),
  setMenu: (screen) => set((s) => ({ menu: { ...s.menu, screen } })),
  syncFromEngine: (snap) =>
    set(() => ({
      runState: { phase: snap.phase, round: snap.round, paused: snap.paused, runActive: snap.runActive },
      anxiety: { band: snap.anxietyBand, shakeIntensity: snap.shakeIntensity, stringDetune: snap.stringDetune },
      beat: snap.beat,
      rhythm: snap.rhythm,
      audienceBarrage: snap.audienceBarrage,
      rating: snap.rating,
      dialogue: { queue: snap.dialogueQueue, active: snap.activeDialogue },
      diary: { open: snap.diaryOpen, options: snap.diaryOptions, writeCount: snap.diaryWriteCount, countdown: snap.diaryCountdown },
      archive: { entries: snap.archiveEntries, unread: snap.archiveUnread },
    })),
}));
