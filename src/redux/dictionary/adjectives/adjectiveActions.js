export const ACTIONS = {
    SET_ALL_ADJECTIVES: "SET_ALL_ADJECTIVES",
}

export function setAllAdjectives(adjectiveObject) {
    return {
        type: ACTIONS.SET_ALL_ADJECTIVES,
        payload: adjectiveObject
    }
}