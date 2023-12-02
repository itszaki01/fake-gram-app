import { configureStore,combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { apiService } from "../services/emptySplitService/apiService";
import { authReducer } from "../feature/auth/authSlice";

const rootReducer = combineReducers({
    auth:authReducer,
    [apiService.reducerPath]: apiService.reducer,

})

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiService.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);
