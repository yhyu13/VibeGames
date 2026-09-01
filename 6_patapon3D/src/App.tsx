/**
 * App.tsx — intro → battle 根组件
 *
 * 战斗 UI 100% 由 SimSnapshot(phase/army/boss/rhythm/fever)驱动,由 GameEngine
 * 每 STORE_SYNC_INTERVAL 帧整体写入 store;组件只读,绝不反写模拟(冻结契约)。
 * 控制流:menu(intro title card)→ SONG(battle HUD)→ MATCH_OVER(win/lose card)→ 重赛/回菜单。
 * intro 觉醒演出仅在 phase === 'MENU' 时展示;开打后隐藏,intro.complete 只作 title card 是否出现的开关。
 */

import { usePatapongStore } from './store';
import type { NoteType } from './intro/types';
import { INTRO_COMMANDS } from './intro/rhythm';
import { PerfBadge } from './components/PerfBadge';

const NOTE_KEY: Record<NoteType, string> = { PATA: 'W', PON: 'A', DON: 'S', CHAKA: 'D' };
const COMMAND_HINT = '4-beat command: W A W A = ATTACK · S A S A = DEFEND · D A D A = VOLLEY';

export function App() {
  const intro = usePatapongStore((state) => state.intro);
  const send = usePatapongStore((state) => state.sendUiCommand);
  const phase = usePatapongStore((state) => state.phase);
  const army = usePatapongStore((state) => state.army);
  const boss = usePatapongStore((state) => state.boss);
  const rhythm = usePatapongStore((state) => state.rhythm);
  const winner = usePatapongStore((state) => state.winner);
  const stats = usePatapongStore((state) => state.stats);
  const judgementFeed = usePatapongStore((state) => state.judgementFeed);

  const inMenu = phase === 'MENU';
  const inSong = phase === 'SONG';
  const inMenuCard = inMenu && intro.complete;

  const bossPct = Math.max(0, Math.min(1, boss.hp / boss.maxHp));

  // 失败是否因军队全灭(而非仅占位)
  const allUnitsDown = army.units.length > 0 && army.units.every((u) => u.state === 'defeat');

  return (
    <main className="intro-shell">
      <div id="three-canvas-container" className="stage-canvas" />

      {/* ── intro 觉醒演出(仅菜单阶段) ── */}
      {inMenu && !intro.complete && (
        <>
          <div className={`edge-beat ${intro.timing === 'miss' ? 'miss' : ''}`} />
          <aside className="command-reference">
            <h2>DRUM COMMANDS</h2>
            {INTRO_COMMANDS.map((command) => (
              <div className={command.name === intro.selectedCommand ? 'command active' : 'command'} key={command.name}>
                <b>{command.name}</b>
                <span>{command.keys.join(' ')}</span>
              </div>
            ))}
          </aside>
          <section className="input-panel">
            <h1>{intro.message}</h1>
            <p>Tap W A W A while the bright edge pulse is visible</p>
            <label>CURRENT INPUT</label>
            <div className="input-slots">
              {[0, 1, 2, 3].map((index) => (
                <span className={intro.input[index] ? 'filled' : ''} key={index}>
                  {intro.input[index] ? `${NOTE_KEY[intro.input[index]!]} ${intro.grades[index] ?? ''}` : '_'}
                </span>
              ))}
            </div>
            <p>ATTACK POWER {Math.round(intro.power * 100)}%</p>
          </section>
          <div className="control-hint">W=PATA · A=PON · S=DON · D=CHAKA · R=REPLAY</div>
        </>
      )}

      {/* ── MENU title card:intro 完成后 → START BATTLE / REPLAY ── */}
      {inMenuCard && (
        <section className="title-card">
          <h2>PATAPON 3D</h2>
          <p>THE DRUMS COMMAND. THE ARMY ANSWERS.</p>
          <p>
            {intro.finalCommand ?? 'ATTACK'} · POWER {Math.round(intro.power * 100)}% · GRADE{' '}
            {intro.finalGrade ?? 'OFF BEAT'}
          </p>
          <div className="title-actions">
            <button onClick={() => send('startMatch')}>START BATTLE ⚔</button>
            <button onClick={() => send('replay')}>REPLAY ↻</button>
          </div>
        </section>
      )}

      {/* ── SONG:战斗 HUD(100% 快照驱动) ── */}
      {inSong && (
        <section className="battle-hud">
          <div className="hud-top">
            <span className="hud-phase">PATA-PON BATTLE</span>
            <span className="hud-combo">COMBO {rhythm.combo}</span>
            {judgementFeed && (
              <span className={`hud-feed ${judgementFeed.judgement === 0 ? 'miss' : ''}`}>
                {judgementFeed.type ? `${NOTE_KEY[judgementFeed.type]} ` : ''}
                {judgementFeed.judgement === 300 ? 'PERFECT' : judgementFeed.judgement === 100 ? 'GOOD' : judgementFeed.judgement === 50 ? 'OK' : 'MISS'}
              </span>
            )}
          </div>

          <div className="boss-panel">
            <div className="boss-label">
              <span>{boss.enraged ? 'MOLOCH — ENRAGED 🔥' : 'MOLOCH'}</span>
              <span>{Math.max(0, Math.ceil(boss.hp))} / {boss.maxHp}</span>
            </div>
            <div className="hp-bar">
              <div className="hp-fill boss" style={{ width: `${bossPct * 100}%` }} />
            </div>
            <div className="boss-state">
              {boss.telegraph ? `NEXT: ${boss.telegraph}` : boss.state === 'attack' ? 'ATTACKING' : 'IDLE'}
            </div>
          </div>

          <div className="squad-panel">
            {army.units.map((unit) => {
              const pct = unit.maxHp > 0 ? Math.max(0, unit.hp / unit.maxHp) : 0;
              return (
                <div className={`unit-card ${unit.state}`} key={unit.id}>
                  <span className="unit-name">{unit.characterId.replace('pata-', '')}</span>
                  <div className="hp-bar">
                    <div className="hp-fill unit" style={{ width: `${pct * 100}%` }} />
                  </div>
                  <span className="unit-state">{unit.state === 'defeat' ? 'DOWN' : unit.hp.toFixed(0)}</span>
                </div>
              );
            })}
          </div>

          <div className="command-beats">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={rhythm.commandBeats[i] ? 'filled' : ''}>
                {rhythm.commandBeats[i] ? NOTE_KEY[rhythm.commandBeats[i]!] : '_'}
              </span>
            ))}
          </div>
          <p className="hud-hint">{COMMAND_HINT}</p>
        </section>
      )}

      {/* ── MATCH_OVER:真实胜负结算 → 重赛 / 回菜单 ── */}
      {phase === 'MATCH_OVER' && (
        <section className="result-card">
          <h2>{winner === 'P1' ? 'VICTORY' : 'DEFEAT'}</h2>
          <p>
            {winner === 'P1'
              ? 'Moloch falls. The drums command, the army answers.'
              : allUnitsDown ? 'The army has fallen. Moloch prevails.' : 'Moloch prevails.'}
          </p>
          <p className="result-tallies">
            COMBO {rhythm.maxCombo} · WINS {stats?.p1Wins ?? 0} — {stats?.bossWins ?? 0} ·
            TOTAL {stats?.totalMatches ?? 0}
          </p>
          <div className="title-actions">
            <button onClick={() => send('rematch')}>REMATCH ↻</button>
            <button onClick={() => send('toMenu')}>MENU</button>
          </div>
        </section>
      )}

      <PerfBadge />
    </main>
  );
}
