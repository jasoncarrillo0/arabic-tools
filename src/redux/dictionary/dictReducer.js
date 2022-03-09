import { ACTION_TYPES } from "./dictActions"

const INIT_STATE = {
    adjectives: [],
    nouns: [],
    particles: [],
    prepositions: []
}
export const dictionaryReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_ADJECTIVES:
            return {
                ...state,
                adjectives: action.payload
            }
        default:
            return {
                ...state
            }
    }
}