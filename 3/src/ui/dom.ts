export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function clear(node: HTMLElement): void {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function btn(label: string, onClick: () => void, className = 'btn'): HTMLButtonElement {
  const b = el('button', className, label);
  b.addEventListener('click', onClick);
  return b;
}

export function meter(label: string, value: number, max: number, color = 'var(--accent)'): { root: HTMLElement; set: (v: number, m?: number) => void } {
  const root = el('div', 'meter');
  const lab = el('div', 'label');
  const name = el('span', undefined, label);
  const val = el('span', undefined, `${Math.round(value)}/${Math.round(max)}`);
  lab.append(name, val);
  const track = el('div', 'track');
  const fill = el('div', 'fill');
  fill.style.background = color;
  track.appendChild(fill);
  root.append(lab, track);
  const set = (v: number, m?: number) => {
    const maxV = m ?? max;
    fill.style.width = `${Math.max(0, Math.min(100, (v / maxV) * 100))}%`;
    val.textContent = `${Math.round(v)}/${Math.round(maxV)}`;
  };
  set(value, max);
  return { root, set };
}

export function barIn(value: number, max: number, color: string, widthPx: number): { root: HTMLElement; set: (v: number) => void } {
  const track = el('div', 'track');
  track.style.width = `${widthPx}px`;
  const fill = el('div', 'fill');
  fill.style.background = color;
  track.appendChild(fill);
  const set = (v: number) => {
    fill.style.width = `${Math.max(0, Math.min(100, (v / max) * 100))}%`;
  };
  set(value);
  return { root: track, set };
}
