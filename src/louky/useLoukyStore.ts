/**
 * Shared Louky client state. Persisted: `streak`, `personalBestByPart` (localStorage `louky-store`).
 * Drill streak resets to 0 on a wrong answer. Builder “found” words are session-only (not persisted).
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PartType } from './types'
import type { HubTag } from './types'
import { WORD_PARTS } from './wordPartsData'

/** Streak: increases on each correct Drill answer; resets to 0 on a wrong answer (tunable). */
const STORAGE_KEY = 'louky-store'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export type HubTypeFilter = 'all' | PartType
export type HubTagFilter = 'all' | HubTag

export type DrillFeedback =
  | { status: 'idle' }
  | { status: 'answered'; correct: boolean; explanation: string }

interface LoukyState {
  streak: number

  hubSearch: string
  typeFilter: HubTypeFilter
  tagFilter: HubTagFilter
  setHubSearch: (v: string) => void
  setTypeFilter: (v: HubTypeFilter) => void
  setTagFilter: (v: HubTagFilter) => void

  drillQueue: string[]
  drillIndex: number
  drillFeedback: DrillFeedback
  startDrillFromPart: (partId: string) => void
  startDrillAllShuffled: () => void
  answerDrill: (chosenMeaning: string, correctMeaning: string, explanation: string) => void
  drillNext: () => void
  clearDrill: () => void

  activePartId: string | null
  foundWordsByPart: Record<string, string[]>
  personalBestByPart: Record<string, number>
  setActivePart: (id: string | null) => void
  tryAddFoundWord: (partId: string, normalizedWord: string, totalPossible: number) => { added: boolean; newPersonalBest: boolean }
  resetBuilderFound: (partId: string) => void
}

export const useLoukyStore = create<LoukyState>()(
  persist(
    (set, get) => ({
      streak: 0,

      hubSearch: '',
      typeFilter: 'all',
      tagFilter: 'all',
      setHubSearch: (v) => set({ hubSearch: v }),
      setTypeFilter: (v) => set({ typeFilter: v }),
      setTagFilter: (v) => set({ tagFilter: v }),

      drillQueue: [],
      drillIndex: 0,
      drillFeedback: { status: 'idle' },

      startDrillFromPart: (partId) => {
        const allIds = WORD_PARTS.map((w) => w.id)
        const rest = shuffle(allIds.filter((id) => id !== partId))
        set({
          drillQueue: [partId, ...rest],
          drillIndex: 0,
          drillFeedback: { status: 'idle' },
        })
      },

      startDrillAllShuffled: () => {
        const allIds = shuffle(WORD_PARTS.map((w) => w.id))
        set({
          drillQueue: allIds,
          drillIndex: 0,
          drillFeedback: { status: 'idle' },
        })
      },

      answerDrill: (chosenMeaning, correctMeaning, explanation) => {
        const correct = chosenMeaning.trim() === correctMeaning.trim()
        set((s) => ({
          drillFeedback: {
            status: 'answered',
            correct,
            explanation,
          },
          streak: correct ? s.streak + 1 : 0,
        }))
      },

      drillNext: () => {
        const { drillQueue, drillIndex } = get()
        const next = drillIndex + 1
        if (next >= drillQueue.length) {
          set({ drillFeedback: { status: 'idle' }, drillIndex: 0, drillQueue: [] })
        } else {
          set({ drillIndex: next, drillFeedback: { status: 'idle' } })
        }
      },

      clearDrill: () =>
        set({ drillQueue: [], drillIndex: 0, drillFeedback: { status: 'idle' } }),

      activePartId: WORD_PARTS[0]?.id ?? null,
      foundWordsByPart: {},
      personalBestByPart: {},

      setActivePart: (id) => set({ activePartId: id }),

      tryAddFoundWord: (partId, normalizedWord, totalPossible) => {
        const state = get()
        const prev = state.foundWordsByPart[partId] ?? []
        if (prev.includes(normalizedWord)) {
          return { added: false, newPersonalBest: false }
        }
        const nextList = [...prev, normalizedWord]
        const count = nextList.length
        const prevBest = state.personalBestByPart[partId] ?? 0
        const beatBest = count > prevBest
        set({
          foundWordsByPart: { ...state.foundWordsByPart, [partId]: nextList },
          personalBestByPart: beatBest
            ? { ...state.personalBestByPart, [partId]: Math.min(count, totalPossible) }
            : state.personalBestByPart,
        })
        return { added: true, newPersonalBest: beatBest }
      },

      resetBuilderFound: (partId) =>
        set((s) => {
          const next = { ...s.foundWordsByPart }
          delete next[partId]
          return { foundWordsByPart: next }
        }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (s) => ({
        streak: s.streak,
        personalBestByPart: s.personalBestByPart,
      }),
    },
  ),
)
