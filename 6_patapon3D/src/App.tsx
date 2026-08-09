import { usePatapongStore } from './store';
import type { NoteType } from './intro/types';
import { INTRO_COMMANDS } from './intro/rhythm';

const NOTE_KEY: Record<NoteType, string> = { PATA: 'W', PON: 'A', DON: 'S', CHAKA: 'D' };

export function App() {
  const intro = usePatapongStore((state) => state.intro);
  const replay = usePatapongStore((state) => state.sendUiCommand);
  return (
    <main className="intro-shell">
      <div id="three-canvas-container" className="stage-canvas" />
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
      {intro.complete && <section className="title-card"><h2>PATAPON 3D</h2><p>THE DRUMS COMMAND. THE ARMY ANSWERS.</p><p>{intro.finalCommand ?? 'ATTACK'} · POWER {Math.round(intro.power * 100)}% · GRADE {intro.finalGrade ?? 'OFF BEAT'}</p><button onClick={() => replay('replay')}>PLAY AGAIN</button></section>}
    </main>
  );
}
