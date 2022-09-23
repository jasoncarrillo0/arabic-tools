export interface BaseWordFields {
    id: string
    arabic: string
    english: string
    phonetic: string
    timesUsed: number
}
export interface Connector extends BaseWordFields {}
export interface Noun extends BaseWordFields {}
export interface Preposition extends BaseWordFields {}
export interface Particle extends BaseWordFields {}
export interface Verb extends BaseWordFields {
    type?: string
    uniqueIverb?: string
}

// adjectives csv file doesn't have phonetic
export interface Adjective extends Omit<BaseWordFields, "phonetic"> {
    uniqueFemale?: string
    uniquePlural?: string
}
export type Word = Adjective | Noun | Verb | Connector | Preposition | Particle;
export type WordTypes = keyof DictionaryState;

export const EDITABLE_WORD_FIELDS = ["arabic", "english", "phonetic", "type", "uniqueIverb", "uniqueFemale", "uniquePlural"] as const;
export const ALL_WORD_FIELDS      = ["id", "arabic", "english", "phonetic", "timesUsed", "type", "uniqueIverb", "uniqueFemale", "uniquePlural"];
export const ALL_WORD_TYPES       = ["nouns", "adjectives", "verbs", "particles", "connectors", "prepositions"] as const;
export type EditableWordField     = typeof EDITABLE_WORD_FIELDS[number];

export interface DictionaryState {
    nouns: Noun[]
    adjectives: Adjective[]
    verbs: Verb[]
    particles: Particle[]
    connectors: Connector[]
    prepositions: Preposition[]
}

export const INIT_DICTIONARY_STATE: DictionaryState = {
    nouns: [], adjectives: [], verbs: [],
    particles: [], connectors: [], prepositions: []
}