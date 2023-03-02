import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
]);

createRoot(document.getElementById('app')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
