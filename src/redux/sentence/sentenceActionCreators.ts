import { LevelOneSentence, Sentence, SentenceState, SentenceTypes } from './interfaces'
import { ACTIONS } from './sentenceActionTypes'

export function setAllSentences(all: SentenceState) {
    return {
        type: ACTIONS.SET_ALL_SENTENCES,
        payload: all
    }
}


export function addLevelOneSentence(sentence: LevelOneSentence) {
    return {
        type: ACTIONS.ADD_LEVEL_ONE_SENTENCE,
        payload: sentence
    }
}



export function replaceSentenceInState(sentence: Sentence, collection: SentenceTypes) {
    
    return {
        type: ACTIONS.REPLACE_SENTENCE,
        payload: { sentence, collection }
    }
}


export function deleteSentenceInState(id: Sentence["id"], collection: SentenceTypes) {
    
    return {
        type: ACTIONS.DELETE_SENTENCE,
        payload: { id, collection }
    }
}
