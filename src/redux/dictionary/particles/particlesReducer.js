import { ACTIONS } from "./particlesActions"

const PARTICLES_INIT_STATE = {
    allParticles: []
}


export const particlesReducer = (state = PARTICLES_INIT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.SET_ALL_PARTICLES:
            return {
                ...state,
                allParticles: action.payload
            }
        default:
            return {
                ...state
            }
    }
}