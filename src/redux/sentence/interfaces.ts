import { ALL_WORD_TYPES, WordTypes } from "../dictionary/interfaces"

export interface BaseSentence {
    id: string
    arabic: string
    english: string
    words: SentenceWord[]
}
export interface SentenceWord {
    id: string // maintain a ref for updating timesUsed
    arabic: string
    english: string
    wordType: WordTypes
}

export interface LevelOneSentence extends BaseSentence {
    nounsLimit: 1
    verbsLimit: 1
}

export interface LevelTwoSentence extends BaseSentence {
    nounsLimit: 2
    verbsLimit: 1
}

export type Sentence = LevelOneSentence | LevelTwoSentence;
export type SentenceDocument = Omit<Sentence, "id">;


export type SentenceTypes = keyof SentenceState;


export interface SentenceState {
    levelOneSentences: LevelOneSentence[]
    levelTwoSentences: LevelTwoSentence[]
}

export const SENTENCES_INIT_STATE: SentenceState = {
    levelOneSentences: [],
    levelTwoSentences: []
}








// sentence collection information, to serve as a single source of truth
export type SentenceLevelInfoKeys    = "LEVEL_ONE" | "LEVEL_TWO" | "LEVEL_THREE";
export type SentenceCollectionNames  = keyof SentenceState;
export type SentenceCollectionTitles = "Level One" | "Level Two" | "Level Three";
export type PracticeSentenceElements = "verb" | "noun w/ taa marbutah" | "noun w/ taa marbutah AND sun/moon letter" | "noun w/ taa marbutah OR sun/moon letter" | "adjective";

export type SentenceLevel = {
    formattedTitle: SentenceCollectionTitles
    elements: PracticeSentenceElements[]
    wordTypesUsed: typeof ALL_WORD_TYPES[number][]
};

export type SentenceCollectionInfo  = {
    [key in SentenceCollectionNames]: SentenceLevel
}