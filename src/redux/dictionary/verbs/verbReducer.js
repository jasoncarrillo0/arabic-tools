import { ACTIONS } from "./verbActions"

const VERBS_INIT_STATE = {
    allVerbs: []
}


export const verbsReducer = (state = VERBS_INIT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.SET_ALL_VERBS:
            return {
                ...state,
                allVerbs: action.payload
            }
        default:
            return {
                ...state
            }
    }
}