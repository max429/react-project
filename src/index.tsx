import React from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Root} from "./routers/Root/Root";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";
import {Learning} from "./routers/Lerning/Learning";
import {Profile} from "./routers/Profile/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/learning",
                element: <Learning/>,
            },
            {
                path: "/profile",
                element: <Profile/>,
            }
        ]
    },
]);

createRoot(document.getElementById('app')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
