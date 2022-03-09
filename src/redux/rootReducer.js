import { combineReducers } from 'redux';
import { dictionaryReducer } from './dictionary/dictReducer';
export const rootReducer = combineReducers({
    dictionary: dictionaryReducer
});