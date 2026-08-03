import type { Puzzle } from '../game/virus';
import { el, clear, btn } from './dom';

export interface MinigameResult {
  success: boolean;
  solved: boolean;
  time: number;
}

export async function runVirusMinigame(
  container: HTMLElement,
  puzzle: Puzzle,
  onAbort: () => void,
): Promise<MinigameResult> {
  return new Promise((resolve) => {
    clear(container);
    const root = el('div', 'screen');
    const title = el('h2', undefined, 'VIRUS INJECTION');
    const sub = el('p', 'sub', 'Watch the pattern, repeat it on the pads.');
    const pads = el('div', 'pads');
    const timerText = el('div');
    timerText.style.textAlign = 'center';
    timerText.style.fontSize = '20px';
    const status = el('p', 'sub');
    status.textContent = 'Watching...';

    const padEls: HTMLElement[] = [];
    for (let i = 0; i < puzzle.pads; i++) {
      const pad = el('div', 'pad');
      pad.addEventListener('click', () => {
        pad.classList.add('press');
        setTimeout(() => pad.classList.remove('press'), 120);
        onPad(i);
      });
      padEls.push(pad);
      pads.appendChild(pad);
    }

    const row = el('div', 'row');
    row.style.justifyContent = 'center';
    row.appendChild(btn('Abort', () => {
      resolve({ success: false, solved: false, time: 0 });
      onAbort();
    }));
    root.append(title, sub, pads, timerText, status, row);
    container.appendChild(root);

    const started = performance.now();
    let timeLeft = puzzle.timeLimit;
    const timer = setInterval(() => {
      timeLeft = puzzle.timeLimit - (performance.now() - started) / 1000;
      timerText.textContent = `${Math.max(0, timeLeft).toFixed(1)}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        status.textContent = 'Time out. Node defended.';
        setTimeout(() => resolve({ success: false, solved: false, time: puzzle.timeLimit }), 900);
      }
    }, 100);

    const input: number[] = [];
    const canClick = { v: false };

    async function playSequence(): Promise<void> {
      status.textContent = 'Watching...';
      await new Promise((r) => setTimeout(r, 600));
      for (let i = 0; i < puzzle.sequence.length; i++) {
        const idx = puzzle.sequence[i];
        padEls[idx].classList.add('lit');
        await new Promise((r) => setTimeout(r, 420));
        padEls[idx].classList.remove('lit');
        await new Promise((r) => setTimeout(r, 180));
      }
      status.textContent = 'Your turn.';
      canClick.v = true;
    }

    function onPad(i: number): void {
      if (!canClick.v) return;
      input.push(i);
      if (input.length === puzzle.sequence.length) {
        canClick.v = false;
        const solved = input.every((v, k) => v === puzzle.sequence[k]);
        if (solved) {
          status.textContent = 'INJECTED. Node compromised.';
          clearInterval(timer);
          setTimeout(() => resolve({ success: true, solved: true, time: puzzle.timeLimit - timeLeft }), 700);
        } else {
          status.textContent = 'Pattern mismatch — defenses hold.';
          clearInterval(timer);
          setTimeout(() => resolve({ success: false, solved: false, time: puzzle.timeLimit - timeLeft }), 900);
        }
      }
    }

    void playSequence();
  });
}
