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
import {Learning} from "./routers/Learning/Learning";
import {Profile} from "./routers/Profile/Profile";
import {ChooseTranslatePage} from "./routers/Tasks/ChooseTranslate/ChooseTranslatePage";

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
            },
            {
                path: '/choose-translate',
                element: <ChooseTranslatePage/>,
            }
        ]
    },
]);

createRoot(document.getElementById('app')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
