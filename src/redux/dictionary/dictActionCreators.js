import { DICT_ACTION_TYPES } from './dictActionTypes'





export function replaceVerb(id, newVerb) {
    return {
        type: DICT_ACTION_TYPES.REPLACE_VERB,
        payload: { id, newVerb }
    }
}


export function replaceNoun(id, newNoun) {
    return {
        type: DICT_ACTION_TYPES.REPLACE_NOUN,
        payload: { id, newNoun }
    }
}




export function setAllVerbs(verbsObject) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_VERBS,
        payload: verbsObject
    }
}

export function setAllPrepositions(prepObject) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_PREPOSITIONS,
        payload: prepObject
    }
}

export function setAllParticles(particlesObj) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_PARTICLES,
        payload: particlesObj
    }
}

export function setAllNouns(nounsObject) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_NOUNS,
        payload: nounsObject
    }
}

export function setAllConnectors(connectorsObj) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_CONNECTORS,
        payload: connectorsObj
    }
}

export function setAllAdjectives(adjectiveObject) {
    return {
        type: DICT_ACTION_TYPES.SET_ALL_ADJECTIVES,
        payload: adjectiveObject
    }
}


export function setDictionary(dictObj) {
    return {
        type: DICT_ACTION_TYPES.SET_DICTIONARY,
        payload: dictObj
    }
}