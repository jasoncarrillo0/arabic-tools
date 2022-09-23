import { ReduxAction } from '../rootReducer';
import { DICT_ACTION_TYPES } from './dictActionTypes'
import { DictionaryState, INIT_DICTIONARY_STATE, Word, WordTypes } from './interfaces';


export const dictionaryReducer = (state: DictionaryState = INIT_DICTIONARY_STATE, action: ReduxAction): DictionaryState => {
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


        // optimizations: using new format
        case DICT_ACTION_TYPES.DELETE_WORD:
            return {
                ...state,
                [action.payload.wordType as WordTypes]: [
                    ...(state[action.payload.wordType as WordTypes] as Word[]).filter(word => word.id !== action.payload.id)
                ]
            }
        case DICT_ACTION_TYPES.REPLACE_WORD:
            return {
                ...state,
                [action.payload.wordType as WordTypes]: [
                    ...(state[action.payload.wordType as WordTypes] as Word[]).filter(word => word.id !== action.payload.id),
                    action.payload.newWord
                ]
            }
        case DICT_ACTION_TYPES.ADD_WORD:
            return {
                ...state,
                [action.payload.wordType as WordTypes]: [
                    ...(state[action.payload.wordType as WordTypes]),
                    action.payload.newWord
                ]
            }
        default:
            return {
                ...state,
            };
    }
}