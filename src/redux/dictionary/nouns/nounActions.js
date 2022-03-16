export const ACTIONS = {
    SET_ALL_NOUNS: "SET_ALL_NOUNS",
}

export function setAllNouns(nounsObject) {
    return {
        type: ACTIONS.SET_ALL_NOUNS,
        payload: nounsObject
    }
}