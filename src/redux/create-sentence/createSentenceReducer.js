import { getAdjectivesChoices, getConnectorsChoices, getNounsChoices, getParticlesChoices, getPrepositionsChoices, getVerbChoices } from '../../helpers/utils'
import { ACTIONS } from './createSentenceActions'

const INIT_STATE = {
    verbChoices: {},
    nounChoices: {},
    adjectiveChoices: {},
    particleChoices: {},
    prepositionChoices: {},
    connectorChoices: {},
    levelOneSentences: []
}
export const createSentenceReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.INIT_WORD_CHOICE_TBLS:
            return {
                verbChoices: getVerbChoices(action.payload.verbs.allVerbs),
                nounChoices: getNounsChoices(action.payload.nouns.allNouns),
                adjectiveChoices: getAdjectivesChoices(action.payload.adjectives.allAdjectives),
                particleChoices: getParticlesChoices(action.payload.particles.allParticles),
                prepositionChoices: getPrepositionsChoices(action.payload.prepositions.allPrepositions),
                connectorChoices: getConnectorsChoices(action.payload.connectors.allConnectors)
            }
        case ACTIONS.ADD_LEVEL_ONE_SENTENCE:
            return {
                ...state,
                levelOneSentences: [...state.levelOneSentences, action.payload]
            }
        default:
            return { ...state }
    }
}