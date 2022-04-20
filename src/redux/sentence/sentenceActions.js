export const ACTIONS = {
    ADD_LEVEL_ONE_SENTENCE: "ADD_LEVEL_ONE_SENTENCE",
    ADD_LEVEL_TWO_SENTENCE: "ADD_LEVEL_TWO_SENTENCE",
    ADD_LEVEL_THREE_SENTENCE: "ADD_LEVEL_THREE_SENTENCE",
    ADD_LEVEL_FOUR_SENTENCE: "ADD_LEVEL_FOUR_SENTENCE",
    ADD_LEVEL_FIVE_SENTENCE: "ADD_LEVEL_FIVE_SENTENCE",
    ADD_LEVEL_SIX_SENTENCE: "ADD_LEVEL_SIX_SENTENCE",


    DEL_LEVEL_ONE_SENTENCE: "DEL_LEVEL_ONE_SENTENCE",
    DEL_LEVEL_TWO_SENTENCE: "DEL_LEVEL_TWO_SENTENCE",
    DEL_LEVEL_THREE_SENTENCE: "DEL_LEVEL_THREE_SENTENCE",
    DEL_LEVEL_FOUR_SENTENCE: "DEL_LEVEL_FOUR_SENTENCE",
    DEL_LEVEL_FIVE_SENTENCE: "DEL_LEVEL_FIVE_SENTENCE",
    DEL_LEVEL_SIX_SENTENCE: "DEL_LEVEL_SIX_SENTENCE",

    REPLACE_LEVEL_ONE_SENTENCE: "REPLACE_LEVEL_ONE_SENTENCE",
    REPLACE_LEVEL_TWO_SENTENCE: "REPLACE_LEVEL_TWO_SENTENCE",
    REPLACE_LEVEL_THREE_SENTENCE: "REPLACE_LEVEL_THREE_SENTENCE",
    REPLACE_LEVEL_FOUR_SENTENCE: "REPLACE_LEVEL_FOUR_SENTENCE",
    REPLACE_LEVEL_FIVE_SENTENCE: "REPLACE_LEVEL_FIVE_SENTENCE",
    REPLACE_LEVEL_SIX_SENTENCE: "REPLACE_LEVEL_SIX_SENTENCE",

    SET_ALL_SENTENCES: "SET_ALL_SENTENCES"
}


export function setAllSentences(all) {
    return {
        type: ACTIONS.SET_ALL_SENTENCES,
        payload: all
    }
}


export function addLevelOneSentence(sentenceObj) {
    return {
        type: ACTIONS.ADD_LEVEL_ONE_SENTENCE,
        payload: sentenceObj
    }
}
export function delLevelOneSentence(id) {
    return {
        type: ACTIONS.DEL_LEVEL_ONE_SENTENCE,
        payload: id
    }
}
export function replaceLevelOneSentence(sentence) {
    return {
        type: ACTIONS.REPLACE_LEVEL_ONE_SENTENCE,
        payload: sentence
    }
}









export function addLevelTwoSentence(sentence) {
    return {
        type: ACTIONS.ADD_LEVEL_TWO_SENTENCE,
        payload: sentence
    }
}
export function delLevelTwoSentence(sentence, idx) {
    return {
        type: ACTIONS.DEL_LEVEL_TWO_SENTENCE,
        payload: { sentence, idx }
    }
}
export function replaceLevelTwoSentence(sentence) {
    return {
        type: ACTIONS.REPLACE_LEVEL_TWO_SENTENCE,
        payload: sentence
    }
}





export function addLevelThreeSentence(sentence) {
    return {
        type: ACTIONS.ADD_LEVEL_THREE_SENTENCE,
        payload: sentence
    }
}
export function delLevelThreeSentence(sentence, idx) {
    return {
        type: ACTIONS.DEL_LEVEL_THREE_SENTENCE,
        payload: { sentence, idx }
    }
}
export function replaceLevelThreeSentence(sentence, idx) {
    return {
        type: ACTIONS.REPLACE_LEVEL_THREE_SENTENCE,
        payload: { sentence, idx }
    }
}






export function addLevelFourSentence(sentence) {
    return {
        type: ACTIONS.ADD_LEVEL_FOUR_SENTENCE,
        payload: sentence
    }
}
export function delLevelFourSentence(sentence, idx) {
    return {
        type: ACTIONS.DEL_LEVEL_FOUR_SENTENCE,
        payload: { sentence, idx }
    }
}
export function replaceLevelFourSentence(sentence, idx) {
    return {
        type: ACTIONS.REPLACE_LEVEL_FOUR_SENTENCE,
        payload: { sentence, idx }
    }
}






export function addLevelFiveSentence(sentence) {
    return {
        type: ACTIONS.ADD_LEVEL_FIVE_SENTENCE,
        payload: sentence
    }
}
export function delLevelFiveSentence(sentence, idx) {
    return {
        type: ACTIONS.DEL_LEVEL_FIVE_SENTENCE,
        payload: { sentence, idx }
    }
}
export function replaceLevelFiveSentence(sentence, idx) {
    return {
        type: ACTIONS.REPLACE_LEVEL_FIVE_SENTENCE,
        payload: { sentence, idx }
    }
}





export function addLevelSixSentence(sentence) {
    return {
        type: ACTIONS.ADD_LEVEL_SIX_SENTENCE,
        payload: sentence
    }
}
export function delLevelSixSentence(sentence, idx) {
    return {
        type: ACTIONS.DEL_LEVEL_SIX_SENTENCE,
        payload: { sentence, idx }
    }
}
export function replaceLevelSixSentence(sentence, idx) {
    return {
        type: ACTIONS.REPLACE_LEVEL_SIX_SENTENCE,
        payload: { sentence, idx }
    }
}