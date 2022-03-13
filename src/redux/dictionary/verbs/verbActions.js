export const ACTIONS = {
    SET_ALL_VERBS: "SET_ALL_VERBS",
}

export function setAllVerbs(verbsObject) {
    return {
        type: ACTIONS.SET_ALL_VERBS,
        payload: verbsObject
    }
}