export const ACTION_TYPES = {
    SET_ADJECTIVES: "SET_ADJECTIVES",
    SET_VERBS: "SET_VERBS",
    SET_NOUNS: "SET_NOUNS",
    SET_PARTICLES: "SET_PARTICLES",
    SET_PREPOSITIONS: "SET_PREPOSITIONS"
}

export function setAdjectives(arr) {
    return {
        type: ACTION_TYPES.SET_ADJECTIVES,
        payload: arr
    }
}