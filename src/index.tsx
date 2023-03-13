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
import {FindWordPage} from "./routers/Tasks/FindWord/FindWordPage";
import {CollectWordPage} from "./routers/Tasks/CollectWord/CollectWordPage";

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
            },
            {
                path: '/find-word',
                element: <FindWordPage/>,
            },
            {
                path: '/collect-word',
                element: <CollectWordPage/>,
            }
        ]
    },
]);

createRoot(document.getElementById('app')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
