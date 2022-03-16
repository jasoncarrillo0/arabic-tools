import { ACTIONS } from "./prepositionActions"

const PREPOSITIONS_INIT_STATE = {
    allPrepositions: []
}


export const prepositionsReducer = (state = PREPOSITIONS_INIT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.SET_ALL_PREPOSITIONS:
            return {
                ...state,
                allPrepositions: action.payload
            }
        default:
            return {
                ...state
            }
    }
}