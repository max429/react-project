import {configureStore} from "@reduxjs/toolkit";
import {usersApi} from "./api/usersApi";
import {chaptersApi} from "./api/chaptersApi";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [chaptersApi.reducerPath]: chaptersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware, chaptersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
