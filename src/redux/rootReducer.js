import { combineReducers } from 'redux';
import { sentenceReducer } from './sentence/sentenceReducer';
import { dictionaryReducer } from './dictionary/dictReducer';


export const rootReducer = combineReducers({
    dictionary: dictionaryReducer,
    sentences: sentenceReducer
});
