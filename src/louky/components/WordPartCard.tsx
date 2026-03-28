import { BookOpen, Hammer } from 'lucide-react'
import type { WordPart } from '../types'

export function WordPartCard({
  item,
  onDrill,
  onBuild,
}: {
  item: WordPart
  onDrill: () => void
  onBuild: () => void
}) {
  const typeLabel =
    item.type === 'prefix' ? 'Prefix' : item.type === 'suffix' ? 'Suffix' : 'Root'

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4 shadow-lg shadow-black/20 transition duration-200 hover:border-violet-500/40 hover:shadow-violet-950/30">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-2xl font-semibold tracking-tight text-violet-200">
            {item.part}
          </p>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{typeLabel}</p>
        </div>
        <span className="rounded-lg bg-slate-800/80 px-2 py-1 text-[10px] text-slate-400">
          {item.origin}
        </span>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-slate-300">{item.meaning}</p>
      <p className="mb-3 text-[11px] text-slate-500">
        <span className="font-semibold text-slate-400">Examples: </span>
        {item.examples.slice(0, 4).join(' · ')}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={onDrill}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600/90 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-violet-950/40 transition hover:bg-violet-500 active:scale-[0.98]"
        >
          <BookOpen className="h-4 w-4" aria-hidden />
          Drill
        </button>
        <button
          type="button"
          onClick={onBuild}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-600/80 bg-slate-800/80 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:border-fuchsia-500/50 hover:bg-slate-800 active:scale-[0.98]"
        >
          <Hammer className="h-4 w-4" aria-hidden />
          Build
        </button>
      </div>
    </article>
  )
}
