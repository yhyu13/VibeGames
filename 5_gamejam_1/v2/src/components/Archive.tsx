import { useUiStore } from '../store';

export default function Archive() {
  const archive = useUiStore((s) => s.archive);

  return (
    <div className="v2-panel absolute left-4 top-24 z-20 w-64 rounded-xl p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-indigo-100">挑战者档案</span>
        <span className="text-[10px] text-indigo-300/60">{archive.entries.length}</span>
      </div>
      <div className="flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
        {archive.entries.map((entry) => (
          <div key={entry.id} className="rounded-lg border border-indigo-400/10 bg-indigo-500/5 px-3 py-2">
            <div className="text-[11px] font-bold text-amber-200/90">{entry.name}</div>
            <div className="mt-0.5 text-[10px] leading-relaxed text-indigo-200/70">
              {entry.lines.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
