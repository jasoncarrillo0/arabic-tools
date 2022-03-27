import { combineReducers } from 'redux';
import { createSentenceReducer } from './create-sentence/createSentenceReducer';
import { dictionaryReducer } from './dictionary/dictReducer';


export const rootReducer = combineReducers({
    dictionary: dictionaryReducer,
    createSentence: createSentenceReducer
});
