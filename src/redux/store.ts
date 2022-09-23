import { applyMiddleware, legacy_createStore } from "redux";
import { rootReducer } from "./rootReducer";
import logger from 'redux-logger';


let middlewares = [];
if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}
export const store = legacy_createStore(rootReducer, applyMiddleware(...middlewares));
