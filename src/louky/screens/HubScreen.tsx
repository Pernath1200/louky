import { Search } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { FilterChips } from '../components/FilterChips'
import { WordPartCard } from '../components/WordPartCard'
import type { LoukyOutletContext } from '../types'
import { WORD_PARTS } from '../wordPartsData'
import { useLoukyStore } from '../useLoukyStore'

export function HubScreen() {
  const navigate = useNavigate()
  const { basePath: base } = useOutletContext<LoukyOutletContext>()

  const hubSearch = useLoukyStore((s) => s.hubSearch)
  const typeFilter = useLoukyStore((s) => s.typeFilter)
  const tagFilter = useLoukyStore((s) => s.tagFilter)
  const setHubSearch = useLoukyStore((s) => s.setHubSearch)
  const setTypeFilter = useLoukyStore((s) => s.setTypeFilter)
  const setTagFilter = useLoukyStore((s) => s.setTagFilter)
  const startDrillFromPart = useLoukyStore((s) => s.startDrillFromPart)
  const setActivePart = useLoukyStore((s) => s.setActivePart)

  const filtered = useMemo(() => {
    const q = hubSearch.trim().toLowerCase()
    return WORD_PARTS.filter((w) => {
      if (typeFilter !== 'all' && w.type !== typeFilter) return false
      if (tagFilter !== 'all' && !w.hubTags.includes(tagFilter)) return false
      if (!q) return true
      const blob = [w.part, w.meaning, ...w.examples].join(' ').toLowerCase()
      return blob.includes(q)
    })
  }, [hubSearch, typeFilter, tagFilter])

  return (
    <div className="space-y-5 transition-opacity duration-300">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-white">Word Parts Hub</h1>
        <p className="mt-1 text-sm text-slate-400">
          Search, filter, then drill meanings or build real words from each part.
        </p>
      </div>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          aria-hidden
        />
        <input
          type="search"
          value={hubSearch}
          onChange={(e) => setHubSearch(e.target.value)}
          placeholder="Search part, meaning, or examples…"
          className="min-h-12 w-full rounded-2xl border border-slate-800 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-violet-500/0 transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/30"
          aria-label="Search word parts"
        />
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4">
        <FilterChips
          typeFilter={typeFilter}
          tagFilter={tagFilter}
          onType={setTypeFilter}
          onTag={setTagFilter}
        />
      </div>

      <p className="text-xs text-slate-500">
        Showing <span className="font-medium text-slate-300">{filtered.length}</span> of{' '}
        {WORD_PARTS.length} parts
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((item) => (
          <WordPartCard
            key={item.id}
            item={item}
            onDrill={() => {
              startDrillFromPart(item.id)
              navigate(`${base}/drill`)
            }}
            onBuild={() => {
              setActivePart(item.id)
              navigate(`${base}/builder`)
            }}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 py-10 text-center text-sm text-slate-500">
          No parts match these filters. Try clearing search or choosing All.
        </p>
      )}
    </div>
  )
}
