import {configureStore} from "@reduxjs/toolkit";
import {chaptersApi} from "./api/chaptersApi";
import userReducer from './reducers/UserSlice'

export const store = configureStore({
    reducer: {
        userReducer,
        [chaptersApi.reducerPath]: chaptersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chaptersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
