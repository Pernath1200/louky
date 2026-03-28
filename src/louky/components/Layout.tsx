import { ArrowLeft, Flame } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import type { LoukyOutletContext } from '../types'
import { useLoukyStore } from '../useLoukyStore'
import { BottomTabs } from './BottomTabs'

export function Layout({ basePath }: { basePath: string }) {
  const streak = useLoukyStore((s) => s.streak)
  const root = basePath.replace(/\/$/, '')
  const location = useLocation()
  const onHub = location.pathname.endsWith('/hub') || location.pathname === root

  return (
    <div className="flex min-h-svh flex-col bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          {!onHub ? (
            <Link
              to={`${root}/hub`}
              className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-500/50 hover:bg-slate-800/80"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Back to Hub</span>
            </Link>
          ) : (
            <span className="min-h-11 min-w-11" aria-hidden />
          )}

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/90">
              Louky
            </p>
            <p className="text-xs text-slate-500">Word parts lab</p>
          </div>

          <div
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-100"
            title="Drill streak (resets on a wrong answer)"
          >
            <Flame className="h-4 w-4 text-amber-400" aria-hidden />
            {streak}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-28 pt-4">
        <Outlet context={{ basePath: root } satisfies LoukyOutletContext} />
      </main>

      <BottomTabs basePath={basePath} />
    </div>
  )
}
