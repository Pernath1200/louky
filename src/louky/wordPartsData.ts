/**
 * WORD PARTS DATA — sample + import instructions
 *
 * Replace `SAMPLE_WORD_PARTS` below with your full export from the Greek / Latin / Germanic
 * spreadsheet batches (same column semantics). Suggested CSV columns:
 *
 *   id, part, meaning, origin, type, examples, hubTags, possibleWords
 *
 * - examples: JSON array string, e.g. ["a","b","c"] OR pipe-separated — normalize in import script.
 * - hubTags: JSON array of mostCommon | feelings | body | astrology
 * - possibleWords: JSON array of { word, definition, sentence }
 *
 * Alternatively: keep a separate `wordParts.full.json` and `export const WORD_PARTS = full as WordPart[]`.
 *
 * Builder “dictionary” validation uses only `possibleWords[].word` (trim + lowercase).
 */

import type { WordPart } from './types'

export const SAMPLE_WORD_PARTS: WordPart[] = [
  {
    id: 'anti-1',
    part: 'anti-',
    meaning: 'against; opposite',
    origin: 'Greek (anti)',
    type: 'prefix',
    examples: ['antibiotic', 'antidote', 'antisocial', 'antithesis'],
    hubTags: ['mostCommon', 'body'],
    possibleWords: [
      {
        word: 'antibiotic',
        definition: 'A drug that kills bacteria or slows their growth.',
        sentence: 'The doctor prescribed an antibiotic for the infection.',
      },
      {
        word: 'antidote',
        definition: 'A substance that counteracts a poison.',
        sentence: 'They rushed to find an antidote after the bite.',
      },
      {
        word: 'antisocial',
        definition: 'Avoiding others; harmful to social order.',
        sentence: 'He denied being antisocial—he just liked quiet evenings.',
      },
      {
        word: 'antithesis',
        definition: 'A direct opposite; a contrasting idea.',
        sentence: 'Her calm was the antithesis of his panic.',
      },
    ],
  },
  {
    id: 'bio-1',
    part: 'bio-',
    meaning: 'life',
    origin: 'Greek (bios)',
    type: 'root',
    examples: ['biology', 'biography', 'symbiosis', 'biome'],
    hubTags: ['mostCommon', 'body'],
    possibleWords: [
      {
        word: 'biology',
        definition: 'The study of living organisms.',
        sentence: 'She majored in biology before medical school.',
      },
      {
        word: 'biography',
        definition: 'A written account of someone’s life.',
        sentence: 'The biography revealed unknown details about the poet.',
      },
      {
        word: 'symbiosis',
        definition: 'A close interaction between two different species.',
        sentence: 'Coral and algae live in symbiosis on the reef.',
      },
      {
        word: 'biome',
        definition: 'A large ecological community (e.g. tundra, rainforest).',
        sentence: 'The desert biome receives almost no rainfall.',
      },
    ],
  },
  {
    id: 'chrono-1',
    part: 'chrono-',
    meaning: 'time',
    origin: 'Greek (chronos)',
    type: 'root',
    examples: ['chronology', 'chronic', 'synchronize', 'anachronism'],
    hubTags: ['mostCommon', 'astrology'],
    possibleWords: [
      {
        word: 'chronology',
        definition: 'The order of events in time.',
        sentence: 'Historians debated the chronology of the dynasty.',
      },
      {
        word: 'chronic',
        definition: 'Long-lasting (often of disease or habit).',
        sentence: 'He managed chronic pain with physical therapy.',
      },
      {
        word: 'synchronize',
        definition: 'To make things happen at the same time.',
        sentence: 'Let’s synchronize our watches before the hike.',
      },
      {
        word: 'anachronism',
        definition: 'Something placed in the wrong historical period.',
        sentence: 'A digital watch in a medieval film is an anachronism.',
      },
    ],
  },
  {
    id: 'circum-1',
    part: 'circum-',
    meaning: 'around',
    origin: 'Latin (circum)',
    type: 'prefix',
    examples: ['circumference', 'circumnavigate', 'circumspect', 'circumstance'],
    hubTags: ['mostCommon'],
    possibleWords: [
      {
        word: 'circumference',
        definition: 'The distance around a circle.',
        sentence: 'They measured the tree’s circumference at chest height.',
      },
      {
        word: 'circumnavigate',
        definition: 'To sail or travel all the way around.',
        sentence: 'Magellan’s crew was first to circumnavigate the globe.',
      },
      {
        word: 'circumspect',
        definition: 'Cautious; considering all sides.',
        sentence: 'A circumspect investor avoids reckless bets.',
      },
      {
        word: 'circumstance',
        definition: 'A condition or fact affecting a situation.',
        sentence: 'Under no circumstance should you share that password.',
      },
    ],
  },
  {
    id: 'con-1',
    part: 'con-',
    meaning: 'together; with (intensive)',
    origin: 'Latin (cum)',
    type: 'prefix',
    examples: ['connect', 'congregate', 'consensus', 'conspire'],
    hubTags: ['mostCommon'],
    possibleWords: [
      {
        word: 'connect',
        definition: 'To join or link.',
        sentence: 'The bridge connects the two towns.',
      },
      {
        word: 'congregate',
        definition: 'To gather in a group.',
        sentence: 'Fans began to congregate outside the stadium.',
      },
      {
        word: 'consensus',
        definition: 'General agreement.',
        sentence: 'The team reached consensus on the deadline.',
      },
      {
        word: 'conspire',
        definition: 'To plot together secretly.',
        sentence: 'They conspired to smuggle the documents.',
      },
    ],
  },
  {
    id: 'cred-1',
    part: 'cred-',
    meaning: 'believe; trust',
    origin: 'Latin (credere)',
    type: 'root',
    examples: ['credible', 'credential', 'incredible', 'credulity'],
    hubTags: ['mostCommon', 'feelings'],
    possibleWords: [
      {
        word: 'credible',
        definition: 'Believable; trustworthy.',
        sentence: 'She offered a credible explanation for the delay.',
      },
      {
        word: 'credential',
        definition: 'Proof of qualification or identity.',
        sentence: 'Teachers must show their credentials.',
      },
      {
        word: 'incredible',
        definition: 'Hard to believe; amazing.',
        sentence: 'The view from the summit was incredible.',
      },
      {
        word: 'credulity',
        definition: 'A tendency to believe too readily.',
        sentence: 'The scam preyed on public credulity.',
      },
    ],
  },
  {
    id: 'de-1',
    part: 'de-',
    meaning: 'down; away; reversal',
    origin: 'Latin (de)',
    type: 'prefix',
    examples: ['decline', 'deflect', 'devalue', 'detach'],
    hubTags: ['mostCommon'],
    possibleWords: [
      {
        word: 'decline',
        definition: 'To decrease or politely refuse.',
        sentence: 'Sales declined after the recall.',
      },
      {
        word: 'deflect',
        definition: 'To turn aside (blame, attention, a missile).',
        sentence: 'He tried to deflect criticism with a joke.',
      },
      {
        word: 'devalue',
        definition: 'To reduce the worth of something.',
        sentence: 'Inflation can devalue savings.',
      },
      {
        word: 'detach',
        definition: 'To unfasten or separate.',
        sentence: 'Detach the hose before storing the machine.',
      },
    ],
  },
  {
    id: 'derm-1',
    part: 'derm-',
    meaning: 'skin',
    origin: 'Greek (derma)',
    type: 'root',
    examples: ['dermatology', 'epidermis', 'hypodermic', 'taxidermy'],
    hubTags: ['body', 'mostCommon'],
    possibleWords: [
      {
        word: 'dermatology',
        definition: 'The branch of medicine dealing with the skin.',
        sentence: 'She referred me to dermatology for the rash.',
      },
      {
        word: 'epidermis',
        definition: 'The outer layer of skin.',
        sentence: 'Sunburn damages the epidermis.',
      },
      {
        word: 'hypodermic',
        definition: 'Under the skin (e.g. a needle).',
        sentence: 'A hypodermic needle delivers medicine subcutaneously.',
      },
      {
        word: 'taxidermy',
        definition: 'Preparing animal skins for display.',
        sentence: 'The museum’s taxidermy looked eerily lifelike.',
      },
    ],
  },
  {
    id: 'dis-1',
    part: 'dis-',
    meaning: 'apart; not; reversal',
    origin: 'Latin (dis-)',
    type: 'prefix',
    examples: ['distract', 'disrupt', 'displace', 'dismiss'],
    hubTags: ['mostCommon', 'feelings'],
    possibleWords: [
      {
        word: 'distract',
        definition: 'To draw attention away.',
        sentence: 'Noise from the hall began to distract the class.',
      },
      {
        word: 'disrupt',
        definition: 'To interrupt or disturb severely.',
        sentence: 'Storms disrupted flights nationwide.',
      },
      {
        word: 'displace',
        definition: 'To move something from its place.',
        sentence: 'The flood displaced thousands of families.',
      },
      {
        word: 'dismiss',
        definition: 'To send away; to reject as unimportant.',
        sentence: 'The judge decided to dismiss the case.',
      },
    ],
  },
  {
    id: 'eu-1',
    part: 'eu-',
    meaning: 'good; well',
    origin: 'Greek (eu)',
    type: 'prefix',
    examples: ['euphoria', 'eulogy', 'euphemism', 'eugenics'],
    hubTags: ['feelings', 'mostCommon'],
    possibleWords: [
      {
        word: 'euphoria',
        definition: 'A feeling of intense happiness or confidence.',
        sentence: 'Winning the title sent fans into euphoria.',
      },
      {
        word: 'eulogy',
        definition: 'A speech praising someone, often at a funeral.',
        sentence: 'Her brother gave a moving eulogy.',
      },
      {
        word: 'euphemism',
        definition: 'A mild word substituted for a blunt one.',
        sentence: '“Passed away” is a euphemism for “died”.',
      },
      {
        word: 'eugenics',
        definition: 'The discredited idea of “improving” humans by selective breeding.',
        sentence: 'The novel explores the horrors of state eugenics programs.',
      },
    ],
  },
  {
    id: 'geo-1',
    part: 'geo-',
    meaning: 'earth',
    origin: 'Greek (gē)',
    type: 'root',
    examples: ['geology', 'geography', 'geothermal', 'perigee'],
    hubTags: ['mostCommon', 'astrology'],
    possibleWords: [
      {
        word: 'geology',
        definition: 'Science of Earth’s physical structure and history.',
        sentence: 'Geology explains how those cliffs formed.',
      },
      {
        word: 'geography',
        definition: 'Study of places, landscapes, and human–environment relations.',
        sentence: 'She teaches geography at the high school.',
      },
      {
        word: 'geothermal',
        definition: 'Heat from within the Earth.',
        sentence: 'Iceland uses geothermal energy widely.',
      },
      {
        word: 'perigee',
        definition: 'The point where the moon or a satellite is nearest Earth.',
        sentence: 'A supermoon occurs near perigee.',
      },
    ],
  },
  {
    id: 'hemi-1',
    part: 'hemi-',
    meaning: 'half',
    origin: 'Greek (hēmi)',
    type: 'prefix',
    examples: ['hemisphere', 'hemiplegia', 'hemicycle', 'hemistich'],
    hubTags: ['body', 'astrology'],
    possibleWords: [
      {
        word: 'hemisphere',
        definition: 'Half of a sphere; half of Earth’s globe.',
        sentence: 'Brazil lies mostly in the Southern Hemisphere.',
      },
      {
        word: 'hemiplegia',
        definition: 'Paralysis on one side of the body.',
        sentence: 'After the stroke, he experienced hemiplegia.',
      },
      {
        word: 'hemicycle',
        definition: 'A semicircular structure or arrangement.',
        sentence: 'The chamber seats formed a grand hemicycle.',
      },
      {
        word: 'hemistich',
        definition: 'Half a line of verse.',
        sentence: 'The fragment ends with a broken hemistich.',
      },
    ],
  },
  {
    id: 'hyper-1',
    part: 'hyper-',
    meaning: 'over; above; excessive',
    origin: 'Greek (hyper)',
    type: 'prefix',
    examples: ['hyperactive', 'hyperbole', 'hypertension', 'hyperlink'],
    hubTags: ['mostCommon', 'body'],
    possibleWords: [
      {
        word: 'hyperactive',
        definition: 'Abnormally or excessively active.',
        sentence: 'The puppy was hyperactive after its nap.',
      },
      {
        word: 'hyperbole',
        definition: 'Deliberate exaggeration for effect.',
        sentence: 'Saying “I’m starving” is common hyperbole.',
      },
      {
        word: 'hypertension',
        definition: 'Chronically high blood pressure.',
        sentence: 'Diet and exercise help manage hypertension.',
      },
      {
        word: 'hyperlink',
        definition: 'A clickable reference to another document or location.',
        sentence: 'Click the hyperlink to open the study.',
      },
    ],
  },
  {
    id: 'inter-1',
    part: 'inter-',
    meaning: 'between; among',
    origin: 'Latin (inter)',
    type: 'prefix',
    examples: ['interact', 'intermediate', 'international', 'interpret'],
    hubTags: ['mostCommon'],
    possibleWords: [
      {
        word: 'interact',
        definition: 'To act on or communicate with each other.',
        sentence: 'Children learn to interact through play.',
      },
      {
        word: 'intermediate',
        definition: 'In the middle; between levels.',
        sentence: 'This course is for intermediate Spanish learners.',
      },
      {
        word: 'international',
        definition: 'Involving more than one country.',
        sentence: 'The treaty required international cooperation.',
      },
      {
        word: 'interpret',
        definition: 'To explain the meaning of; to translate orally.',
        sentence: 'How you interpret the poem may differ from mine.',
      },
    ],
  },
  {
    id: 'ject-1',
    part: '-ject',
    meaning: 'throw; cast',
    origin: 'Latin (jacere)',
    type: 'suffix',
    examples: ['reject', 'project', 'inject', 'trajectory'],
    hubTags: ['mostCommon'],
    possibleWords: [
      {
        word: 'reject',
        definition: 'To refuse to accept.',
        sentence: 'The committee decided to reject the proposal.',
      },
      {
        word: 'project',
        definition: 'To throw forward; a planned undertaking.',
        sentence: 'They project steady growth for next year.',
      },
      {
        word: 'inject',
        definition: 'To force a liquid in (e.g. with a syringe).',
        sentence: 'Nurses must inject the vaccine at the correct angle.',
      },
      {
        word: 'trajectory',
        definition: 'The path of something moving through space.',
        sentence: 'The rocket’s trajectory curved toward the east.',
      },
    ],
  },
  {
    id: 'mal-1',
    part: 'mal-',
    meaning: 'bad; ill',
    origin: 'Latin (malus)',
    type: 'prefix',
    examples: ['malfunction', 'malice', 'malnutrition', 'malady'],
    hubTags: ['body', 'feelings'],
    possibleWords: [
      {
        word: 'malfunction',
        definition: 'Failure to work properly.',
        sentence: 'A sensor malfunction triggered the alarm.',
      },
      {
        word: 'malice',
        definition: 'Desire to harm others; evil intent.',
        sentence: 'The judge found no evidence of malice.',
      },
      {
        word: 'malnutrition',
        definition: 'Poor nutrition due to lack of food or imbalance.',
        sentence: 'Aid workers treated children for malnutrition.',
      },
      {
        word: 'malady',
        definition: 'A disease or ailment.',
        sentence: 'Ancient texts describe curious maladies.',
      },
    ],
  },
  {
    id: 'mis-1',
    part: 'mis-',
    meaning: 'wrong; badly',
    origin: 'Germanic / Old English (mis-)',
    type: 'prefix',
    examples: ['misunderstand', 'mislead', 'misfortune', 'misgiving'],
    hubTags: ['mostCommon', 'feelings'],
    possibleWords: [
      {
        word: 'misunderstand',
        definition: 'To interpret incorrectly.',
        sentence: "Don't misunderstand—I'm grateful for your help.",
      },
      {
        word: 'mislead',
        definition: 'To deceive or give a wrong idea.',
        sentence: 'The headline misled readers about the study.',
      },
      {
        word: 'misfortune',
        definition: 'Bad luck.',
        sentence: 'She bore her misfortune with quiet dignity.',
      },
      {
        word: 'misgiving',
        definition: 'A feeling of doubt or apprehension.',
        sentence: 'He had misgivings about signing the contract.',
      },
    ],
  },
  {
    id: 'neo-1',
    part: 'neo-',
    meaning: 'new; revived form',
    origin: 'Greek (neos)',
    type: 'prefix',
    examples: ['neoclassical', 'neonatal', 'neologism', 'neolithic'],
    hubTags: ['mostCommon'],
    possibleWords: [
      {
        word: 'neoclassical',
        definition: 'Reviving classical style or ideas.',
        sentence: 'The courthouse has neoclassical columns.',
      },
      {
        word: 'neonatal',
        definition: 'Relating to newborn infants.',
        sentence: 'Neonatal care has improved survival rates.',
      },
      {
        word: 'neologism',
        definition: 'A newly coined word or expression.',
        sentence: '“Selfie” was a neologism that went global.',
      },
      {
        word: 'neolithic',
        definition: 'Of the later Stone Age, when farming began.',
        sentence: 'They found neolithic tools near the river.',
      },
    ],
  },
  {
    id: 'path-1',
    part: 'path-',
    meaning: 'feeling; suffering; disease',
    origin: 'Greek (pathos)',
    type: 'root',
    examples: ['sympathy', 'apathy', 'pathology', 'empathy'],
    hubTags: ['feelings', 'body', 'mostCommon'],
    possibleWords: [
      {
        word: 'sympathy',
        definition: 'Shared sorrow; compassion.',
        sentence: 'Friends offered sympathy after the loss.',
      },
      {
        word: 'apathy',
        definition: 'Lack of interest or concern.',
        sentence: 'Voter apathy was high that year.',
      },
      {
        word: 'pathology',
        definition: 'Study of disease; the manifestation of disease.',
        sentence: 'The biopsy confirmed the pathology report.',
      },
      {
        word: 'empathy',
        definition: 'Understanding another’s feelings from their perspective.',
        sentence: 'Therapists train to respond with empathy.',
      },
    ],
  },
  {
    id: 'phil-1',
    part: 'phil-',
    meaning: 'love; fondness',
    origin: 'Greek (philein)',
    type: 'root',
    examples: ['philosophy', 'bibliophile', 'philanthropy', 'philharmonic'],
    hubTags: ['feelings', 'mostCommon'],
    possibleWords: [
      {
        word: 'philosophy',
        definition: 'Love of wisdom; a system of thought.',
        sentence: 'Eastern philosophy shaped her worldview.',
      },
      {
        word: 'bibliophile',
        definition: 'A lover of books.',
        sentence: 'The shop catered to bibliophiles and collectors.',
      },
      {
        word: 'philanthropy',
        definition: 'Charitable giving or love of humankind.',
        sentence: 'Their philanthropy funded three new clinics.',
      },
      {
        word: 'philharmonic',
        definition: 'Fond of music (in orchestra names).',
        sentence: 'We heard the city philharmonic last night.',
      },
    ],
  },
  {
    id: 'psych-1',
    part: 'psych-',
    meaning: 'mind; spirit',
    origin: 'Greek (psychē)',
    type: 'root',
    examples: ['psychology', 'psychic', 'psychosis', 'psychedelic'],
    hubTags: ['feelings', 'body', 'mostCommon'],
    possibleWords: [
      {
        word: 'psychology',
        definition: 'Science of mind and behavior.',
        sentence: 'He studies developmental psychology.',
      },
      {
        word: 'psychic',
        definition: 'Relating to the mind; claimed extrasensory perception.',
        sentence: 'She doesn’t believe in psychic readings.',
      },
      {
        word: 'psychosis',
        definition: 'A severe mental disorder with lost contact with reality.',
        sentence: 'Medication can stabilize acute psychosis.',
      },
      {
        word: 'psychedelic',
        definition: 'Mind-manifesting; vivid hallucinatory experience or style.',
        sentence: 'The poster had psychedelic colors.',
      },
    ],
  },
  {
    id: 're-1',
    part: 're-',
    meaning: 'again; back',
    origin: 'Latin (re-)',
    type: 'prefix',
    examples: ['rewrite', 'return', 'reflect', 'restore'],
    hubTags: ['mostCommon'],
    possibleWords: [
      {
        word: 'rewrite',
        definition: 'To write again; revise completely.',
        sentence: 'The editor asked her to rewrite the ending.',
      },
      {
        word: 'return',
        definition: 'To go or give back.',
        sentence: 'Please return the keys by noon.',
      },
      {
        word: 'reflect',
        definition: 'To throw back light; to think deeply.',
        sentence: 'Glass reflects light; mirrors double your image.',
      },
      {
        word: 'restore',
        definition: 'To bring back to a former condition.',
        sentence: 'Volunteers helped restore the old theater.',
      },
    ],
  },
  {
    id: 'scope-1',
    part: '-scope',
    meaning: 'instrument for viewing',
    origin: 'Greek (skopein)',
    type: 'suffix',
    examples: ['microscope', 'telescope', 'periscope', 'stethoscope'],
    hubTags: ['body', 'mostCommon'],
    possibleWords: [
      {
        word: 'microscope',
        definition: 'Optical instrument for viewing tiny objects.',
        sentence: 'Cells are visible only under a microscope.',
      },
      {
        word: 'telescope',
        definition: 'Instrument for viewing distant objects.',
        sentence: 'We aimed the telescope at Jupiter.',
      },
      {
        word: 'periscope',
        definition: 'Tube with mirrors for seeing from cover.',
        sentence: 'The submarine used a periscope near the surface.',
      },
      {
        word: 'stethoscope',
        definition: 'Instrument for listening to heart/lungs.',
        sentence: 'The doctor warmed the stethoscope gently.',
      },
    ],
  },
  {
    id: 'tele-1',
    part: 'tele-',
    meaning: 'far; at a distance',
    origin: 'Greek (tēle)',
    type: 'prefix',
    examples: ['telephone', 'television', 'telepathy', 'telemetry'],
    hubTags: ['mostCommon'],
    possibleWords: [
      {
        word: 'telephone',
        definition: 'Device for voice communication over distance.',
        sentence: 'Alexander Graham Bell patented the telephone.',
      },
      {
        word: 'television',
        definition: 'System for transmitting moving images.',
        sentence: 'They canceled cable television last year.',
      },
      {
        word: 'telepathy',
        definition: 'Communication of thoughts without known senses.',
        sentence: 'Science fiction often features telepathy.',
      },
      {
        word: 'telemetry',
        definition: 'Remote measurement and transmission of data.',
        sentence: 'The rocket sent telemetry to mission control.',
      },
    ],
  },
  {
    id: 'un-1',
    part: 'un-',
    meaning: 'not; reversal',
    origin: 'Germanic / Old English (un-)',
    type: 'prefix',
    examples: ['unhappy', 'uncertain', 'undo', 'unwind'],
    hubTags: ['mostCommon', 'feelings'],
    possibleWords: [
      {
        word: 'unhappy',
        definition: 'Not happy; sad or displeased.',
        sentence: 'He was unhappy with the verdict.',
      },
      {
        word: 'uncertain',
        definition: 'Not sure; not known exactly.',
        sentence: 'The outcome remains uncertain.',
      },
      {
        word: 'undo',
        definition: 'To reverse an action.',
        sentence: 'Press Ctrl+Z to undo the last edit.',
      },
      {
        word: 'unwind',
        definition: 'To relax after stress.',
        sentence: 'She likes to unwind with a walk.',
      },
    ],
  },
]

/** Active dataset — swap this export when replacing sample with full import. */
export const WORD_PARTS: WordPart[] = SAMPLE_WORD_PARTS

const byId = new Map<string, WordPart>(WORD_PARTS.map((w) => [w.id, w]))

export function getWordPartById(id: string): WordPart | undefined {
  return byId.get(id)
}
