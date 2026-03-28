import { BookOpen, Layers, Orbit, Shuffle, Sparkles, Telescope, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { triggerLoukyConfetti } from '../components/ConfettiCelebration'
import {
  openClozemasterQueue,
  openLeibnizElements,
  openRogetCategory,
  openTwelveHouseTopic,
} from '../linkPlaceholders'
import type { LoukyOutletContext } from '../types'
import { getWordPartById, WORD_PARTS } from '../wordPartsData'
import { useLoukyStore } from '../useLoukyStore'

function normalize(w: string) {
  return w.trim().toLowerCase()
}

export function BuilderScreen() {
  const navigate = useNavigate()
  const { basePath: base } = useOutletContext<LoukyOutletContext>()

  const activePartId = useLoukyStore((s) => s.activePartId)
  const setActivePart = useLoukyStore((s) => s.setActivePart)
  const foundWordsByPart = useLoukyStore((s) => s.foundWordsByPart)
  const personalBestByPart = useLoukyStore((s) => s.personalBestByPart)
  const tryAddFoundWord = useLoukyStore((s) => s.tryAddFoundWord)
  const resetBuilderFound = useLoukyStore((s) => s.resetBuilderFound)

  const [input, setInput] = useState('')
  const [revealOpen, setRevealOpen] = useState(false)
  const [lastHint, setLastHint] = useState<string | null>(null)

  const part = activePartId ? getWordPartById(activePartId) : undefined

  const allowed = useMemo(() => {
    if (!part) return new Set<string>()
    return new Set(part.possibleWords.map((p) => normalize(p.word)))
  }, [part])

  const found = part ? (foundWordsByPart[part.id] ?? []) : []
  const totalY = part?.possibleWords.length ?? 0
  const pb = part ? (personalBestByPart[part.id] ?? 0) : 0

  const liveCheck = useMemo(() => {
    const n = normalize(input)
    if (!n || !part) return null
    if (found.includes(n)) return 'already' as const
    if (allowed.has(n)) return 'valid' as const
    return 'invalid' as const
  }, [input, part, found, allowed])

  useEffect(() => {
    if (!activePartId && WORD_PARTS[0]) setActivePart(WORD_PARTS[0].id)
  }, [activePartId, setActivePart])

  const submitWord = useCallback(() => {
    if (!part) return
    const n = normalize(input)
    if (!n) return
    if (!allowed.has(n)) {
      setLastHint('Not in this part’s vocabulary list — keep trying or tap Reveal.')
      return
    }
    const res = tryAddFoundWord(part.id, n, totalY)
    if (!res.added) {
      setLastHint('Already in your found list.')
      return
    }
    setLastHint('Added ✓')
    setInput('')
    if (res.newPersonalBest) triggerLoukyConfetti()
  }, [part, input, allowed, tryAddFoundWord, totalY])

  const missed = useMemo(() => {
    if (!part) return []
    const foundSet = new Set(found)
    return part.possibleWords.filter((p) => !foundSet.has(normalize(p.word)))
  }, [part, found])

  const pickRandomPart = () => {
    const i = Math.floor(Math.random() * WORD_PARTS.length)
    setActivePart(WORD_PARTS[i].id)
    setInput('')
    setLastHint(null)
    setRevealOpen(false)
  }

  if (!part) {
    return (
      <p className="py-12 text-center text-slate-400">
        No word parts loaded. Add data in{' '}
        <code className="text-violet-300">wordPartsData.ts</code>.
      </p>
    )
  }

  return (
    <div className="space-y-5 pb-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Word builder</h1>
        <p className="mt-1 text-sm text-slate-400">
          Type real words built from the active part. We validate against your curated list.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs font-medium text-slate-500" htmlFor="louky-part-select">
            Active part
          </label>
          <select
            id="louky-part-select"
            value={part.id}
            onChange={(e) => {
              setActivePart(e.target.value)
              setInput('')
              setLastHint(null)
              setRevealOpen(false)
            }}
            className="min-h-11 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none focus:border-violet-500/50"
          >
            {WORD_PARTS.map((w) => (
              <option key={w.id} value={w.id}>
                {w.part} — {w.meaning}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={pickRandomPart}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-3 text-sm font-medium text-slate-100 hover:border-fuchsia-500/50"
          >
            <Shuffle className="h-4 w-4" aria-hidden />
            Random
          </button>
        </div>

        <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3">
          <p className="font-mono text-2xl font-semibold text-violet-100">{part.part}</p>
          <p className="text-xs text-violet-200/70">{part.origin}</p>
        </div>

        <div>
          <label className="sr-only" htmlFor="louky-word-input">
            Type a word
          </label>
          <input
            id="louky-word-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setLastHint(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                submitWord()
              }
            }}
            placeholder="Type a word, then Enter…"
            className="min-h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-violet-500/50"
            autoComplete="off"
          />
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">Live:</span>
            {liveCheck === null && <span className="text-slate-600">—</span>}
            {liveCheck === 'valid' && (
              <span className="font-medium text-emerald-400">In vocabulary — press Enter</span>
            )}
            {liveCheck === 'already' && (
              <span className="font-medium text-amber-400">Already found</span>
            )}
            {liveCheck === 'invalid' && (
              <span className="font-medium text-rose-400/90">Not in this part’s list</span>
            )}
            {lastHint && <span className="text-slate-400">{lastHint}</span>}
          </div>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-slate-800 pt-3">
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-white">{found.length}</span> / {totalY} possible
            words
          </p>
          <p className="text-xs text-slate-500">
            Personal best for this part:{' '}
            <span className="font-medium text-slate-300">{pb}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRevealOpen(true)}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-fuchsia-600/90 px-4 text-sm font-semibold text-white hover:bg-fuchsia-500"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Reveal all possible
          </button>
          <button
            type="button"
            onClick={() => resetBuilderFound(part.id)}
            className="min-h-11 rounded-xl border border-slate-600 px-4 text-sm text-slate-300 hover:bg-slate-800"
          >
            Clear found
          </button>
          <button
            type="button"
            onClick={() => navigate(`${base}/hub`)}
            className="min-h-11 rounded-xl border border-slate-600 px-4 text-sm text-slate-300 hover:bg-slate-800"
          >
            Hub
          </button>
        </div>
      </div>

      {found.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Words you found
          </p>
          <ul className="flex flex-wrap gap-2">
            {found.map((w) => (
              <li
                key={w}
                className="rounded-lg bg-slate-800/80 px-2.5 py-1 font-mono text-xs text-violet-200"
              >
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {revealOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="louky-reveal-title"
        >
          <div className="max-h-[85vh] w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">
            <div className="border-b border-slate-800 px-5 py-4">
              <h2 id="louky-reveal-title" className="text-lg font-semibold text-white">
                All possible words
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Total in data: <span className="font-medium text-slate-200">{totalY}</span>. You
                missed <span className="font-medium text-fuchsia-300">{missed.length}</span>.
              </p>
            </div>
            <div className="max-h-[60vh] space-y-3 overflow-y-auto px-5 py-4">
              {missed.length === 0 ? (
                <p className="text-center text-sm text-emerald-400">You found every listed word.</p>
              ) : (
                missed.map((pw) => (
                  <div
                    key={pw.word}
                    className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-mono text-lg font-semibold text-white">{pw.word}</p>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          title="Clozemaster queue (placeholder)"
                          onClick={() => openClozemasterQueue(pw.word)}
                          className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:border-violet-500/50 hover:text-violet-200"
                        >
                          <BookOpen className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Roget category (placeholder)"
                          onClick={() => openRogetCategory(pw.word)}
                          className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:border-violet-500/50 hover:text-violet-200"
                        >
                          <Layers className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Leibniz elements (placeholder)"
                          onClick={() => openLeibnizElements(pw.word)}
                          className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:border-violet-500/50 hover:text-violet-200"
                        >
                          <Telescope className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="12-House topic (placeholder)"
                          onClick={() => openTwelveHouseTopic(pw.word)}
                          className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:border-violet-500/50 hover:text-violet-200"
                        >
                          <Orbit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{pw.definition}</p>
                    <p className="mt-2 text-xs italic text-slate-500">&ldquo;{pw.sentence}&rdquo;</p>
                    <p className="mt-3 rounded-lg bg-slate-800/60 px-3 py-2 text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">Breakdown: </span>
                      Contains <span className="font-mono text-violet-300">{part.part}</span> (
                      {part.meaning}) → <span className="text-slate-200">{pw.word}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-slate-800 px-5 py-3">
              <button
                type="button"
                onClick={() => setRevealOpen(false)}
                className="flex w-full min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-800 text-sm font-medium text-white hover:bg-slate-700"
              >
                <X className="h-4 w-4" aria-hidden />
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
