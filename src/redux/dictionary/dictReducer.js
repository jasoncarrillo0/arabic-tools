import { combineReducers } from "redux";
import { adjectivesReducer } from "./adjectives/adjectiveReducer";
import { connectorsReducer } from "./connectors/connectorsReducer";
import { nounsReducer } from "./nouns/nounReducer";
import { particlesReducer } from "./particles/particlesReducer";
import { prepositionsReducer } from "./prepositions/prepositionReducer";
import { verbsReducer } from "./verbs/verbReducer";


export const dictionaryReducer = combineReducers({
    verbs: verbsReducer,
    nouns: nounsReducer,
    adjectives: adjectivesReducer,
    prepositions: prepositionsReducer,
    connectors: connectorsReducer,
    particles: particlesReducer
});