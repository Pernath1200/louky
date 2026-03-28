/** Morphological role of the word part in English words. */
export type PartType = 'prefix' | 'root' | 'suffix'

/**
 * Thematic buckets for Hub filter chips (separate from prefix/root/suffix).
 * Map spreadsheet “category” or tag columns to these literals when importing.
 */
export type HubTag = 'mostCommon' | 'feelings' | 'body' | 'astrology'

/** One English word the learner can build / that contains the part (Builder + Reveal). */
export interface PossibleWord {
  word: string
  definition: string
  sentence: string
}

/**
 * Single row: matches spreadsheet export columns.
 * CSV/JSON import: id, part, meaning, origin, type, examples (JSON array or delimited), hubTags, possibleWords (JSON array of objects).
 */
export interface WordPart {
  id: string
  part: string
  meaning: string
  origin: string
  type: PartType
  /** 3–4 showcase lemmas */
  examples: string[]
  hubTags: HubTag[]
  possibleWords: PossibleWord[]
}

/** From `Layout` via `<Outlet context={...} />` so navigations stay under the Louky base path. */
export type LoukyOutletContext = { basePath: string }
