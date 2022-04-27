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
                nouns: [...state.nouns.filter(noun => noun.id !== action.payload.id), action.payload.newNoun]
            }
        case DICT_ACTION_TYPES.REPLACE_VERB:
            return {
                ...state,
                verbs: [...state.verbs.filter(verb => verb.id !== action.payload.id), action.payload.newVerb]
            }
        case DICT_ACTION_TYPES.DELETE_ADJECTIVE:
            return {
                ...state,
                adjectives: [...state.adjectives.filter(word => word.id !== action.payload)]
            }
        case DICT_ACTION_TYPES.DELETE_NOUN:
            return {
                ...state,
                nouns: [...state.nouns.filter(word => word.id !== action.payload)]
            }
        case DICT_ACTION_TYPES.DELETE_VERB:
            return {
                ...state,
                verbs: [...state.verbs.filter(word => word.id !== action.payload)]
            }
        case DICT_ACTION_TYPES.DELETE_CONNECTOR:
            return {
                ...state,
                connectors: [...state.connectors.filter(word => word.id !== action.payload)]
            }
        case DICT_ACTION_TYPES.DELETE_PARTICLE:
            return {
                ...state,
                particles: [...state.particles.filter(word => word.id !== action.payload)]
            }
        case DICT_ACTION_TYPES.DELETE_PREPOSITION:
            return {
                ...state,
                prepositions: [...state.prepositions.filter(word => word.id !== action.payload)]
            }
        default:
            return {
                ...state,
            };
    }
}