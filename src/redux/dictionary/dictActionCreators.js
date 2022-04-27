import { DICT_ACTION_TYPES } from './dictActionTypes'


export function deleteVerb(id) {
    return {
        type: DICT_ACTION_TYPES.DELETE_VERB,
        payload: id
    }
}


export function deleteNoun(id) {
    return {
        type: DICT_ACTION_TYPES.DELETE_NOUN,
        payload: id
    }
}

export function deleteAdjective(id) {
    return {
        type: DICT_ACTION_TYPES.DELETE_ADJECTIVE,
        payload: id
    }
}


export function deleteConnector(id) {
    return {
        type: DICT_ACTION_TYPES.DELETE_CONNECTOR,
        payload: id
    }
}


export function deleteParticle(id) {
    return {
        type: DICT_ACTION_TYPES.DELETE_PARTICLE,
        payload: id
    }
}


export function deletePreposition(id) {
    return {
        type: DICT_ACTION_TYPES.DELETE_PREPOSITION,
        payload: id
    }
}




export function addVerb(doc) {
    return {
        type: DICT_ACTION_TYPES.ADD_VERB,
        payload: doc
    }
}

export function addNoun(doc) {
    return {
        type: DICT_ACTION_TYPES.ADD_NOUN,
        payload: doc
    }
}


export function addAdjective(doc) {
    return {
        type: DICT_ACTION_TYPES.ADD_ADJECTIVE,
        payload: doc
    }
}


export function addPreposition(doc) {
    return {
        type: DICT_ACTION_TYPES.ADD_PREPOSITION,
        payload: doc
    }
}


export function addConnector(doc) {
    return {
        type: DICT_ACTION_TYPES.ADD_CONNECTOR,
        payload: doc
    }
}


export function addParticle(doc) {
    return {
        type: DICT_ACTION_TYPES.ADD_PARTICLE,
        payload: doc
    }
}








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