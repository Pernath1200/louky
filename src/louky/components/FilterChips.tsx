import type { HubTagFilter, HubTypeFilter } from '../useLoukyStore'

const typeOptions: { key: HubTypeFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'prefix', label: 'Prefix' },
  { key: 'root', label: 'Root' },
  { key: 'suffix', label: 'Suffix' },
]

const tagOptions: { key: HubTagFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'mostCommon', label: 'Most Common' },
  { key: 'feelings', label: 'Feelings' },
  { key: 'body', label: 'Body' },
  { key: 'astrology', label: 'Astrology' },
]

function chipClass(active: boolean) {
  return `min-h-9 shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition duration-200 ${
    active
      ? 'border-violet-500/70 bg-violet-600/30 text-violet-100 shadow-[0_0_20px_-8px_rgba(139,92,246,0.8)]'
      : 'border-slate-700/80 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-slate-200'
  }`
}

export function FilterChips({
  typeFilter,
  tagFilter,
  onType,
  onTag,
}: {
  typeFilter: HubTypeFilter
  tagFilter: HubTagFilter
  onType: (v: HubTypeFilter) => void
  onTag: (v: HubTagFilter) => void
}) {
  return (
    <div className="space-y-3">
      <div>
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Type
        </p>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={chipClass(typeFilter === key)}
              onClick={() => onType(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Topic
        </p>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={chipClass(tagFilter === key)}
              onClick={() => onTag(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
