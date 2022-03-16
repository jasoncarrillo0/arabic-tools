export const ACTIONS = {
    SET_ALL_PARTICLES: "SET_ALL_PARTICLES",
}

export function setAllParticles(particlesObj) {
    return {
        type: ACTIONS.SET_ALL_PARTICLES,
        payload: particlesObj
    }
}