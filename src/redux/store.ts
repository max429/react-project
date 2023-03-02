import {configureStore} from "@reduxjs/toolkit";
import {testApi} from "./api/testApi";
import {chaptersApi} from "./api/chaptersApi";

export const store = configureStore({
    reducer: {
        [testApi.reducerPath]: testApi.reducer,
        [chaptersApi.reducerPath]: chaptersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(testApi.middleware, chaptersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
