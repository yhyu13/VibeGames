/**
 * components/IntroScene.tsx - v2.0 intro cinematic (觉醒仪式)
 *
 * Read-only overlay driven by store.intro (IntroDirector owns the timeline).
 * Renders only while phase === 'MENU' and the intro is not complete; the
 * classic Menu.tsx takes over once intro.complete is true.
 */

import type { NoteType } from '../core/types';
import { usePatapongStore } from '../store';

const DRUM_KEY: Record<NoteType, string> = {
  PATA: 'W',
  PON: 'A',
  DON: 'S',
  CHAKA: 'D',
};

const DRUM_COLOR: Record<NoteType, string> = {
  PATA: '#3affc8',
  PON: '#ffd83a',
  DON: '#3a8aff',
  CHAKA: '#ff3a8a',
};

const DRUM_ORDER: NoteType[] = ['PATA', 'PON', 'DON', 'CHAKA'];

export function IntroScene() {
  const phase = usePatapongStore((s) => s.phase);
  const intro = usePatapongStore((s) => s.intro);
  const sendUiCommand = usePatapongStore((s) => s.sendUiCommand);

  if (phase !== 'MENU' || intro.complete) return null;

  const { stage, beats, nextBeatIn, flash } = intro;
  const awakening = stage === 'awaken' && beats.length >= 4;

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* boot: pure black before the first drum */}
      {stage === 'boot' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black">
          <div className="intro-ring" style={{ animationDelay: `${-(1 - nextBeatIn)}s` }} />
          <p className="intro-breathe text-sm tracking-[0.45em] text-[#ffd83a]/90">
            CLICK TO START
          </p>
        </div>
      )}

      {/* title */}
      {stage === 'title' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70">
          <h1 className="pata-menu-in bg-gradient-to-r from-[#3affc8] via-[#ffd83a] to-[#ff3aaa] bg-clip-text font-arcade text-8xl font-black italic tracking-tight text-transparent drop-shadow-[0_0_40px_rgba(255,216,58,0.4)]">
            PATAPONG 3D
          </h1>
          <p className="intro-fade-in text-xs tracking-[0.6em] text-white/70">
            DIVINE DRUMS 路 ARMY vs BOSS
          </p>
        </div>
      )}

      {/* reveal: you are the drummer */}
      {stage === 'reveal' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black/50">
          <p className="intro-fade-in text-xl tracking-[0.45em] text-white/90">
            YOU ARE THE DRUMMER
          </p>
          <div className="flex gap-4">
            {DRUM_ORDER.map((note, i) => (
              <div
                key={note}
                className="intro-card-in flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-lg border-2 bg-black/60"
                style={{ borderColor: DRUM_COLOR[note], animationDelay: `${0.15 + i * 0.12}s` }}
              >
                <span className="font-arcade text-3xl font-bold" style={{ color: DRUM_COLOR[note] }}>
                  {DRUM_KEY[note]}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-white/70">{note}</span>
              </div>
            ))}
          </div>
          <p className="intro-breathe text-sm tracking-[0.35em] text-[#ffd83a]/90">
            CLICK TO BEGIN
          </p>
        </div>
      )}

      {/* awaken: beat metronome + 4 beat slots */}
      {stage === 'awaken' && (
        <div className="absolute inset-0 flex flex-col items-center justify-end gap-6 pb-[12vh]">
          {!awakening ? (
            <>
              <p className="intro-breathe text-base tracking-[0.4em] text-[#ffd83a]">
                TAP ANY DRUM ON THE BEAT
              </p>
              <div className="flex gap-5">
                {DRUM_ORDER.map((note, i) => {
                  const filled = i < beats.length;
                  const color = filled ? DRUM_COLOR[beats[i]!] : 'rgba(255,255,255,0.18)';
                  return (
                    <div
                      key={note}
                      className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg border-2 transition-all duration-150"
                      style={{
                        borderColor: filled ? color : 'rgba(255,255,255,0.25)',
                        background: filled ? `${color}22` : 'rgba(0,0,0,0.5)',
                        boxShadow: filled ? `0 0 22px ${color}88` : 'none',
                      }}
                    >
                      <span className="font-arcade text-2xl font-bold" style={{ color: filled ? color : 'rgba(255,255,255,0.35)' }}>
                        {filled ? DRUM_KEY[beats[i]!] : DRUM_KEY[note]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div
                className="intro-ring intro-ring-small"
                style={{ animationDelay: `${-(1 - nextBeatIn)}s` }}
              />
            </>
          ) : (
            <p className="intro-breathe text-2xl font-bold tracking-[0.35em] text-white">
              THE ARMY AWAKENS
            </p>
          )}
        </div>
      )}

      {/* SKIP (never in ready; ready renders Menu instead) */}
      <button
        type="button"
        onClick={() => sendUiCommand('skipIntro')}
        className="btn-pata pointer-events-auto absolute right-4 top-4 rounded border border-white/25 bg-black/50 px-4 py-1.5 text-xs tracking-[0.25em] text-white/60 hover:text-white"
      >
        SKIP &gt;&gt;
      </button>

      {/* awakening white flash */}
      <div
        className="pointer-events-none absolute inset-0 bg-white"
        style={{ opacity: flash * 0.85 }}
      />
    </div>
  );
}
