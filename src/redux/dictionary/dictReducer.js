import { combineReducers } from "redux";
import { verbsReducer } from "./verbs/verbReducer";

export const dictionaryReducer = combineReducers({
    verbs: verbsReducer
});