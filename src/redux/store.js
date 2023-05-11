import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import profileSlice from "./profileSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    profile: profileSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools : process.env.NODE_ENV !== "production",
    middleware: [thunk]
})

export const persistor = persistStore(store)