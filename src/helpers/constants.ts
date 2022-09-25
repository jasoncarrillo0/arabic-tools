import { OptionsObject } from "notistack";
import { createBrowserHistory } from 'history';
import { ALL_WORD_TYPES, WordTypes } from "src/redux/dictionary/interfaces";
import { SentenceCollectionInfo } from "src/redux/sentence/interfaces";
export const BROWSER_HISTORY = createBrowserHistory();

export const ALL_VERBS = "to be	كان\
,to sleep	نام\
,to answer	جاوب\
,to arrange	رتّب\
,to ask	سأل\
,to attempt	 حاول\
,to be hungry	جاع\
,to become angry	عصّب\
,to become broken	نكسر\
,to begin	بلّش\
,to believe [s.o. or s.t.]	صدّق\
,to bring	جاب\
,to buy	شترى\
,to call	تلفن\
,to clean	نضّف\
,to close	سكّر\
,to complete	كمّل\
,to confirm	أكّد\
,to be sure	تأكّد\
,to continue	كفّى\
,to decide	قرّر\
,to deliver	وصّل\
,to die	مات\
,to drive	ساق\
,to enjoy	نبسط\
,to enter	فات\
,to establish	أسّس\
,to experience	ختبر\
,to explain	فسّر\
,to find	لاقى\
,to fly	طار\
,to get up  قام\
,to rise	قام\
,to go	راح\
,to hang	علّق\
,to happen/to be/to become	صار\
,to have to do [s.t.]	ضّطر\
,to help	ساعد\
,to honk	زمّر\
,to hurry	ستعجل\
,to improve	حسّن\
,to keep/to let/to stay	خلّى\
,to last	ضاين\
,to lie	كذّب\
,to live	عاش\
,to move	حرّك\
,to notice	لاحظ\
,to prefer	فضّل\
,to prepare	حضّر\
,to remove	شال\
,to say	قال\
,to see	شاف\
,to seem	بيّن\
,to share	شارك\
,to taste	داق\
,to teach	علّم\
,to tell	خبّر\
,to think	فكّر\
,to think(general)	عتقد\
,to translate	ترجم\
,to travel	سافر\
,to try	جرّب\
,to wake up	فاق\
,to work	شتغل\
";

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


