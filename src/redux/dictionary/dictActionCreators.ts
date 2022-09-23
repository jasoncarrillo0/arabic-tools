import { DICT_ACTION_TYPES } from './dictActionTypes'
import { Adjective, Connector, DictionaryState, Noun, Particle, Preposition, Verb, Word, WordTypes } from './interfaces'




export function addWordInState(newWord: Word, wordType: WordTypes) {
    return {
        type: DICT_ACTION_TYPES.ADD_WORD,
        payload: { newWord, wordType }
    }
}
export function replaceWordInState(id: string, newWord: Word, wordType: WordTypes) {
    return {
        type: DICT_ACTION_TYPES.REPLACE_WORD,
        payload: { id, newWord, wordType }
    }
}
export function deleteWordInState(id: string, wordType: WordTypes) {
    return {
        type: DICT_ACTION_TYPES.DELETE_WORD,
        payload: { id, wordType }
    }
}







// initial state actions
export function setAllVerbs(verbsArr: Verb[]) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_VERBS,
        payload: verbsArr
    }
}

export function setAllPrepositions(prepArr: Preposition[]) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_PREPOSITIONS,
        payload: prepArr
    }
}

export function setAllParticles(particles: Particle[]) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_PARTICLES,
        payload: particles
    }
}

export function setAllNouns(nouns: Noun[]) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_NOUNS,
        payload: nouns
    }
}

export function setAllConnectors(connectors: Connector[]) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_CONNECTORS,
        payload: connectors
    }
}

export function setAllAdjectives(adjectives: Adjective[]) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_ADJECTIVES,
        payload: adjectives
    }
}


export function setDictionary(dictObj: DictionaryState) {
    return {
        type: DICT_ACTION_TYPES.SET_DICTIONARY,
        payload: dictObj
    }
}