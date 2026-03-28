import { Flame } from 'lucide-react'

/** Drill (or builder) progress bar + optional streak copy for emphasis below the main header. */
export function ProgressHeader({
  label,
  current,
  total,
  streak,
}: {
  label: string
  current: number
  total: number
  streak: number
}) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="mb-4 space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="inline-flex items-center gap-1 font-medium text-amber-200/90">
          <Flame className="h-3.5 w-3.5" aria-hidden />
          Streak {streak}
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-slate-800"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-right text-[11px] text-slate-500">
        {current} / {total}
      </p>
    </div>
  )
}
