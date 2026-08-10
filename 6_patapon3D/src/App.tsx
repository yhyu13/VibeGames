/**
 * App.tsx — v2.0 根组件
 *
 * intro 觉醒 cinematic(battleReady 前)+ 战斗 UI(Menu / HUD / WinScreen /
 * PerfBadge,各自按 phase 门控)。intro 完成后标题卡给出 ENTER THE ARENA
 * (发 'skipIntro' → main.tsx 的桥启动 battle 引擎)。
 */

import { usePatapongStore } from './store';
import type { NoteType } from './intro/types';
import { INTRO_COMMANDS } from './intro/rhythm';
import { HUD } from './components/HUD';
import { Menu } from './components/Menu';
import { PerfBadge } from './components/PerfBadge';
import { WinScreen } from './components/WinScreen';

const NOTE_KEY: Record<NoteType, string> = { PATA: 'W', PON: 'A', DON: 'S', CHAKA: 'D' };

export function App() {
  const intro = usePatapongStore((state) => state.intro);
  const battleReady = usePatapongStore((state) => state.battleReady);
  const send = usePatapongStore((state) => state.sendUiCommand);

  return (
    <main className="intro-shell">
      <div id="three-canvas-container" className="stage-canvas" />

      {/* intro 觉醒 UI(battle 接管后隐藏) */}
      {!battleReady && (
        <>
          <div key={`${intro.beatPulse}-${intro.timing}`} className={`edge-beat ${intro.timing === 'miss' ? 'miss' : ''}`} />
          <aside className={`command-reference ${intro.complete ? 'is-hidden' : ''}`}>
            <h2>DRUM COMMANDS</h2>
            {INTRO_COMMANDS.map((command) => <div className={command.name === intro.selectedCommand ? 'command active' : 'command'} key={command.name}><b>{command.name}</b><span>{command.keys.join(' ')}</span></div>)}
          </aside>
          <section className={`input-panel ${intro.complete ? 'is-hidden' : ''}`}>
            <h1>{intro.message}</h1>
            <p>Tap W A W A while the bright edge pulse is visible</p>
            <label>CURRENT INPUT</label>
            <div className="input-slots">{[0, 1, 2, 3].map((index) => <span className={intro.input[index] ? 'filled' : ''} key={index}>{intro.input[index] ? `${NOTE_KEY[intro.input[index]!]} ${intro.grades[index] ?? ''}` : '_'}</span>)}</div>
            <p>ATTACK POWER {Math.round(intro.power * 100)}%</p>
          </section>
          <div className={`control-hint ${intro.complete ? 'is-hidden' : ''}`}>W=PATA · A=PON · S=DON · D=CHAKA · R=REPLAY</div>
        </>
      )}

      {intro.complete && !battleReady && (
        <section className="title-card">
          <h2>PATAPON 3D</h2>
          <p>THE DRUMS COMMAND. THE ARMY ANSWERS.</p>
          <p>{intro.finalCommand ?? 'ATTACK'} · POWER {Math.round(intro.power * 100)}% · GRADE {intro.finalGrade ?? 'OFF BEAT'}</p>
          <button onClick={() => send('skipIntro')}>ENTER THE ARENA →</button>
        </section>
      )}

      {/* 战斗 UI(各自按 phase / battleReady 门控) */}
      <Menu />
      <HUD />
      <WinScreen />
      <PerfBadge />
    </main>
  );
}
