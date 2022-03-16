export const ACTIONS = {
    SET_ALL_PREPOSITIONS: "SET_ALL_PREPOSITIONS",
}

export function setAllPrepositions(prepObject) {
    return {
        type: ACTIONS.SET_ALL_PREPOSITIONS,
        payload: prepObject
    }
}