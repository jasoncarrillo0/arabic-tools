import { ACTIONS } from "./connectorsActions"

const CONNECTORS_INIT_STATE = {
    allConnectors: []
}


export const connectorsReducer = (state = CONNECTORS_INIT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.SET_ALL_CONNECTORS:
            return {
                ...state,
                allConnectors: action.payload
            }
        default:
            return {
                ...state
            }
    }
}