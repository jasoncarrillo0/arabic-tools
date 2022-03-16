import { ACTIONS } from "./adjectiveActions"

const ADJECTIVES_INIT_STATE = {
    allAdjectives: []
}


export const adjectivesReducer = (state = ADJECTIVES_INIT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.SET_ALL_ADJECTIVES:
            return {
                ...state,
                allAdjectives: action.payload
            }
        default:
            return {
                ...state
            }
    }
}