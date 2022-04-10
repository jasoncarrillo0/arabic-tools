import { getAdjectivesChoices, getConnectorsChoices, getNounsChoices, getParticlesChoices, getPrepositionsChoices, getVerbChoices } from '../../helpers/utils'
import { ACTIONS } from './createSentenceActions'

const INIT_STATE = {
    verbChoices: {},
    nounChoices: {},
    adjectiveChoices: {},
    particleChoices: {},
    prepositionChoices: {},
    connectorChoices: {},
    levelOneSentences: [],
    levelTwoSentences: [],
    levelThreeSentences: [],
    levelFourSentences: [],
    levelFiveSentences: [],
    levelSixSentences: []
}
export const createSentenceReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.INIT_WORD_CHOICE_TBLS:
            return {
                verbChoices: getVerbChoices(action.payload.verbs),
                nounChoices: getNounsChoices(action.payload.nouns),
                adjectiveChoices: getAdjectivesChoices(action.payload.adjectives),
                particleChoices: getParticlesChoices(action.payload.particles),
                prepositionChoices: getPrepositionsChoices(action.payload.prepositions),
                connectorChoices: getConnectorsChoices(action.payload.connectors)
            }
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