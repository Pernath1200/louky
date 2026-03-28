import { BookOpen, Hammer, LayoutGrid } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const tabClass =
  'flex min-h-11 min-w-[4.5rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 text-xs font-medium transition-colors duration-200'

export function BottomTabs({ basePath }: { basePath: string }) {
  const root = basePath.replace(/\/$/, '')

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800/80 bg-slate-950/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md"
      aria-label="Louky sections"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around gap-1">
        <NavLink
          to={`${root}/hub`}
          className={({ isActive }) =>
            `${tabClass} ${isActive ? 'bg-violet-600/25 text-violet-200' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`
          }
        >
          <LayoutGrid className="h-5 w-5 shrink-0" aria-hidden />
          Hub
        </NavLink>
        <NavLink
          to={`${root}/drill`}
          className={({ isActive }) =>
            `${tabClass} ${isActive ? 'bg-violet-600/25 text-violet-200' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`
          }
        >
          <BookOpen className="h-5 w-5 shrink-0" aria-hidden />
          Drill
        </NavLink>
        <NavLink
          to={`${root}/builder`}
          className={({ isActive }) =>
            `${tabClass} ${isActive ? 'bg-violet-600/25 text-violet-200' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`
          }
        >
          <Hammer className="h-5 w-5 shrink-0" aria-hidden />
          Builder
        </NavLink>
      </div>
    </nav>
  )
}
