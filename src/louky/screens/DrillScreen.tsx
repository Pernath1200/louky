import { Check, ChevronRight, X } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { ProgressHeader } from '../components/ProgressHeader'
import type { LoukyOutletContext } from '../types'
import { getWordPartById, WORD_PARTS } from '../wordPartsData'
import { useLoukyStore } from '../useLoukyStore'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function DrillScreen() {
  const navigate = useNavigate()
  const { basePath: base } = useOutletContext<LoukyOutletContext>()

  const streak = useLoukyStore((s) => s.streak)
  const drillQueue = useLoukyStore((s) => s.drillQueue)
  const drillIndex = useLoukyStore((s) => s.drillIndex)
  const drillFeedback = useLoukyStore((s) => s.drillFeedback)
  const startDrillAllShuffled = useLoukyStore((s) => s.startDrillAllShuffled)
  const answerDrill = useLoukyStore((s) => s.answerDrill)
  const drillNext = useLoukyStore((s) => s.drillNext)

  const [selected, setSelected] = useState<string | null>(null)

  const currentId = drillQueue[drillIndex]
  const current = currentId ? getWordPartById(currentId) : undefined

  const choices = useMemo(() => {
    if (!current) return []
    const pool = WORD_PARTS.filter((w) => w.id !== current.id).map((w) => w.meaning)
    const unique = Array.from(new Set(pool)).filter((m) => m !== current.meaning)
    const picks = shuffle(unique).slice(0, 3)
    const four = shuffle([current.meaning, ...picks])
    return four
  }, [current])

  const handlePick = useCallback(
    (meaning: string) => {
      if (!current || drillFeedback.status === 'answered') return
      setSelected(meaning)
      const explanation = `${current.meaning} — ${current.origin}.`
      answerDrill(meaning, current.meaning, explanation)
    },
    [current, drillFeedback.status, answerDrill],
  )

  const handleNext = () => {
    setSelected(null)
    drillNext()
  }

  if (!drillQueue.length || !current) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
        <p className="text-lg font-medium text-slate-200">No drill session yet</p>
        <p className="max-w-sm text-sm text-slate-400">
          Start from the Hub with a part’s Drill button, or shuffle every part here.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              startDrillAllShuffled()
              setSelected(null)
            }}
            className="min-h-11 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
          >
            Shuffle all parts
          </button>
          <button
            type="button"
            onClick={() => navigate(`${base}/hub`)}
            className="min-h-11 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Back to Hub
          </button>
        </div>
      </div>
    )
  }

  const answered = drillFeedback.status === 'answered'

  return (
    <div className="flex flex-1 flex-col space-y-4 pb-2">
      <div>
        <h1 className="text-xl font-semibold text-white">Word part drill</h1>
        <p className="mt-1 text-sm text-slate-400">Pick the meaning. Instant feedback, then Next.</p>
      </div>

      <ProgressHeader
        label="Drill progress"
        current={drillIndex + 1}
        total={drillQueue.length}
        streak={streak}
      />

      <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 px-4 py-10 shadow-inner shadow-black/40">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-300/80">
          What does this mean?
        </p>
        <p className="mb-8 text-center font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {current.part}
        </p>

        <fieldset className="w-full max-w-md space-y-3" disabled={answered}>
          <legend className="sr-only">Choose the correct meaning</legend>
          {choices.map((m) => {
            const isSel = selected === m
            const showResult = answered && isSel
            const isCorrectChoice = m === current.meaning
            const wasCorrect =
              drillFeedback.status === 'answered' && drillFeedback.correct
            return (
              <label
                key={m}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition duration-200 ${
                  showResult
                    ? wasCorrect
                      ? 'border-emerald-500/60 bg-emerald-500/15'
                      : 'border-rose-500/60 bg-rose-500/15'
                    : answered && isCorrectChoice
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-slate-700/80 bg-slate-900/60 hover:border-violet-500/40'
                }`}
              >
                <input
                  type="radio"
                  name="meaning"
                  className="h-4 w-4 accent-violet-500"
                  checked={isSel}
                  onChange={() => handlePick(m)}
                />
                <span className="flex-1 text-left text-sm text-slate-100">{m}</span>
                {showResult &&
                  (wasCorrect ? (
                    <Check className="h-5 w-5 text-emerald-400" aria-label="Correct" />
                  ) : (
                    <X className="h-5 w-5 text-rose-400" aria-label="Incorrect" />
                  ))}
              </label>
            )
          })}
        </fieldset>

        {answered && drillFeedback.status === 'answered' && (
          <div
            className={`mt-6 w-full max-w-md rounded-2xl border px-4 py-3 text-sm ${
              drillFeedback.correct
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'
                : 'border-rose-500/40 bg-rose-500/10 text-rose-100'
            }`}
          >
            <p className="font-medium">{drillFeedback.correct ? 'Nice.' : 'Not quite.'}</p>
            <p className="mt-1 text-slate-200/90">{drillFeedback.explanation}</p>
          </div>
        )}
      </div>

      <button
        type="button"
        disabled={!answered}
        onClick={handleNext}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-950/50 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  )
}
