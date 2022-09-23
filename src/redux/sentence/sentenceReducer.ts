import { ReduxAction } from '../rootReducer'
import { Sentence, SentenceState, SENTENCES_INIT_STATE, SentenceTypes } from './interfaces'
import { ACTIONS } from './sentenceActionTypes'



export const sentenceReducer = (state: SentenceState = SENTENCES_INIT_STATE, action: ReduxAction): SentenceState => {
    switch (action.type) {
        case ACTIONS.SET_ALL_SENTENCES:
            return {
                ...action.payload
            }
        case ACTIONS.ADD_LEVEL_ONE_SENTENCE:
            return {
                ...state,
                levelOneSentences: [...state.levelOneSentences, action.payload]
            }
        case ACTIONS.REPLACE_SENTENCE:
            return {
                ...state,
                [action.payload.collection]: [
                    ...(state[action.payload.collection as SentenceTypes] as Sentence[]).filter(sentence => sentence.id !== action.payload.sentence.id),
                    action.payload.sentence
                ]
            }
        case ACTIONS.DELETE_SENTENCE:
            return {
                ...state,
                [action.payload.collection]: [
                    ...(state[action.payload.collection as SentenceTypes] as Sentence[]).filter(sentence => sentence.id !== action.payload.id)
                ]
            }
        default:
            return { ...state }
    }
}