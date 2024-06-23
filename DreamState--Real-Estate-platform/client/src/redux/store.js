import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

// combine all reducers 
const rootReducer = combineReducers({
    user: userReducer
})

// create persist reducer (to store the user login ingo into localstorage)
const persistConfig = {
    key: 'root',
    storage,
    version: 1
}
const persistedReducer = persistReducer(persistConfig, rootReducer)


//configure the store
export const store =  configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

//make the store persist using persistor
export const persistor = persistStore(store)
