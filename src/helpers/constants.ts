import { OptionsObject } from "notistack";
import { createBrowserHistory } from 'history';
import { WordTypes } from "src/redux/dictionary/interfaces";
import { SentenceCollectionInfo } from "src/redux/sentence/interfaces";
export const BROWSER_HISTORY = createBrowserHistory();

export const SUCCESS_SNACKBAR: OptionsObject = {
    variant: "success",
    anchorOrigin: {
        horizontal: "center",
        vertical: "top"
    }
}

export const ERR_SNACKBAR: OptionsObject = {
    variant: "error",
    anchorOrigin: {
        horizontal: "center",
        vertical: "top"
    }
}


export const WARN_SNACKBAR: OptionsObject = {
    variant: "warning",
    anchorOrigin: {
        horizontal: "center",
        vertical: "top"
    },
    persist: true
}


export const SENTENCE_COLLECTION_INFO: SentenceCollectionInfo = {
    levelOneSentences: {
        formattedTitle: "Level One",
        elements: ["verb", "noun w/ taa marbutah"],
        wordTypesUsed: ["nouns", "verbs"]
    },
    levelTwoSentences: {
        formattedTitle: "Level Two",
        elements: ["verb", "noun w/ taa marbutah OR sun/moon letter", "adjective"],
        wordTypesUsed: ["verbs", "nouns"]
    }
}


type CsvDictionaryColumns = {
    [key in WordTypes]: string[]
}
export const CSV_DICTIONARY_COLS: CsvDictionaryColumns = {
    nouns: ["english", "arabic", "phonetic"],
    verbs: ["english", "arabic", "type", "phonetic", "unique i verb"],
    adjectives: ["english", "arabic", "unique female", "unique plural"],
    prepositions: ["english", "arabic", "phonetic"],
    connectors: ["english", "arabic", "phonetic"],
    particles: ["english", "arabic", "phonetic"]
}


