import { DICT_ACTION_TYPES } from './dictActionTypes'

export const dictionaryReducer = (state = {}, action) => {
    switch (action.type) {
        case DICT_ACTION_TYPES.SET_DICTIONARY:
            return {
                ...action.payload,
            };
        case DICT_ACTION_TYPES.SET_ALL_ADJECTIVES:
            return {
                ...state,
                adjectives: action.payload,
            };
        case DICT_ACTION_TYPES.SET_ALL_CONNECTORS:
            return {
                ...state,
                connectors: action.payload,
            };
        case DICT_ACTION_TYPES.SET_ALL_NOUNS:
            return {
                ...state,
                nouns: action.payload,
            };
        case DICT_ACTION_TYPES.SET_ALL_PARTICLES:
            return {
                ...state,
                particles: action.payload,
            };
        case DICT_ACTION_TYPES.SET_ALL_PREPOSITIONS:
            return {
                ...state,
                prepositions: action.payload,
            };
        case DICT_ACTION_TYPES.SET_ALL_VERBS:
            return {
                ...state,
                verbs: action.payload,
            };
        case DICT_ACTION_TYPES.REPLACE_NOUN:
            return {
                ...state,
                nouns: [...state.nouns.filter(noun => noun !== action.payload.id), action.payload.newNoun]
            }
        case DICT_ACTION_TYPES.REPLACE_VERB:
            return {
                ...state,
                verbs: [...state.verbs.filter(verb => verb !== action.payload.id), action.payload.newVerb]
            }
        default:
            return {
                ...state,
            };
    }
}