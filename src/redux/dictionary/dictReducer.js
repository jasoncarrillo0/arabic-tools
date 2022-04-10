import { DICT_ACTION_TYPES } from './dictActionTypes'

export const dictionaryReducer = (state = {}, action) => {
    switch (action.type) {
        case DICT_ACTION_TYPES.SET_DICTIONARY:
            return {
                ...action.payload
            }
        default:
            return {
                ...state
            }
    }
}