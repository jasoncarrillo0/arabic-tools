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

export const uploadAccordionSummaryProps = {
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    paddingRight: '1rem'
}

export const SUCCESS_SNACKBAR = {
    variant: "success",
    anchorOrigin: {
        horizontal: "center",
        vertical: "top"
    }
}

export const ERR_SNACKBAR = {
    variant: "error",
    anchorOrigin: {
        horizontal: "center",
        vertical: "top"
    }
}

export const CONNECTORS_COLS   = ["English", "Arabic", "Phonetic"];
export const PARTICLES_COLS    = ["English", "Arabic", "Phonetic"];
export const PREPOSITIONS_COLS = ["English", "Arabic", "Phonetic"];
export const VERBS_COLS        = ["English", "Arabic", "Type", "Phonetic", "Unique I Verb"];
export const NOUNS_COLS        = ["English", "Arabic", "Phonetic"];
export const ADJECTIVE_COLS    = ["English", "Arabic", "Unique Female", "Unique Plural"];
export const DICT_FIREBASE_ID  = "LQfFjOUM7OpbHrpnanQB";
export const SENTENCES_FIREBASE_ID = "R0PrMISyj24V56pqddmg";
export const UPLOAD_WORDS      = {
    "adjectives": ADJECTIVE_COLS,
    "verbs": VERBS_COLS,
    "particles": PARTICLES_COLS,
    "connectors": CONNECTORS_COLS,
    "nouns": NOUNS_COLS,
    "prepositions": PREPOSITIONS_COLS
}

// must follow the rules: each entry contains only one colon
export const SENTENCE_LEVELS = {
    "Level One": ["verb only"], 
    "Level Two": ["verb", "noun w/ taa marbutah"],
    "Level Three": ["verb", "noun w/ taa marbutah + sun/moon letter"],
    "Level Four": ["verb", "noun w/ taa marbutah or sun/moon letter", "adjective"]
}

export const SENTENCE_COLLECTION_NAMES = {
    LEVEL_ONE: "levelOne",
    LEVEL_TWO: "levelTwo",
    LEVEL_THREE: "levelThree",
    LEVEL_FOUR: "levelFour",
    LEVEL_FIVE: "levelFive",
    LEVEL_SIX: "levelSix",
    LEVEL_SEVEN: "levelSeven",
    LEVEL_EIGHT: "levelEight"
}

export const SENTENCE_INIT_STATE = {
    arabic: "",
    english: ""
}