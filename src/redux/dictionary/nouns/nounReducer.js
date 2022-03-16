import { ACTIONS } from "./nounActions"

const NOUNS_INIT_STATE = {
    allNouns: []
}


export const nounsReducer = (state = NOUNS_INIT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.SET_ALL_NOUNS:
            return {
                ...state,
                allNouns: action.payload
            }
        default:
            return {
                ...state
            }
    }
}