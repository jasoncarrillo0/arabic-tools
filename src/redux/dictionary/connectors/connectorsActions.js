export const ACTIONS = {
    SET_ALL_CONNECTORS: "SET_ALL_CONNECTORS",
}

export function setAllConnectors(connectorsObj) {
    return {
        type: ACTIONS.SET_ALL_CONNECTORS,
        payload: connectorsObj
    }
}