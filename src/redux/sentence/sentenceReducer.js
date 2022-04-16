import { ACTIONS } from './sentenceActions'

const INIT_STATE = {
    levelOneSentences: [],
    levelTwoSentences: [],
    levelThreeSentences: [],
    levelFourSentences: [],
    levelFiveSentences: [],
    levelSixSentences: []
}
export const sentenceReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.ADD_LEVEL_ONE_SENTENCE:
            return {
                ...state,
                levelOneSentences: [...state.levelOneSentences, action.payload]
            }
        case ACTIONS.ADD_LEVEL_TWO_SENTENCE:
            return {
                ...state,
                levelTwoSentences: [...state.levelTwoSentences, action.payload]
            }
        case ACTIONS.ADD_LEVEL_THREE_SENTENCE:
            return {
                ...state,
                levelThreeSentences: [...state.levelThreeSentences, action.payload]
            }
        default:
            return { ...state }
    }
}