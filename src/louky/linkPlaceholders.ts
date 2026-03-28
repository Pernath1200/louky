/**
 * External deep-link stubs — replace with real URLs or in-app navigators.
 * Each function is safe to call from the Builder “missed words” link row.
 */

export function openClozemasterQueue(word: string): void {
  // TODO: deep link into Clozemaster collection / search for `word`
  console.info('[Louky] Clozemaster queue placeholder', word)
}

export function openRogetCategory(word: string): void {
  // TODO: map lemma → Roget’s Thesaurus category or open search
  console.info('[Louky] Roget category placeholder', word)
}

export function openLeibnizElements(word: string): void {
  // TODO: open Leibniz “elements” / concept graph entry for `word`
  console.info('[Louky] Leibniz elements placeholder', word)
}

export function openTwelveHouseTopic(word: string): void {
  // TODO: route to relevant 12-house astrology topic for `word`
  console.info('[Louky] 12-House topic placeholder', word)
}
