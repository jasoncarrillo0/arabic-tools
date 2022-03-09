import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./rootReducer";
import logger from 'redux-logger';
let middlewares = [];
if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}


export const store = createStore(rootReducer, applyMiddleware(...middlewares));