import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./rootReducer";
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage'


let middlewares = [];
if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

const rootConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet
}

const persistedReducer = persistReducer(rootConfig, rootReducer);


export const store     = createStore(persistedReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);