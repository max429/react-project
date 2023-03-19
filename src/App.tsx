import React from 'react';
import {createHashRouter, RouterProvider} from "react-router-dom";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";
import {LearningPage} from "./pages/LearningPage/LearningPage";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage";
import {ChooseTranslatePage} from "./pages/Tasks/ChooseTranslate/ChooseTranslatePage";
import {FindWordPage} from "./pages/Tasks/FindWord/FindWordPage";
import {CollectWordPage} from "./pages/Tasks/CollectWord/CollectWordPage";
import {LearningCardsPage} from "./pages/Tasks/LearningCards/LearningCardsPage";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {Layout} from "./components/Layout/Layout";


const router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/learning",
                element: <LearningPage/>,
                //index: true,
            },
            {
                path: "/profile",
                element: <ProfilePage/>,
            },
            {
                path: '/learning/choose-translate',
                element: <ChooseTranslatePage/>,
            },
            {
                path: '/learning/find-word',
                element: <FindWordPage/>,
            },
            {
                path: '/learning/collect-word',
                element: <CollectWordPage/>,
            },
            {
                path: '/learning/learning-card',
                element: <LearningCardsPage/>,
            }
        ]
    },
]);

export const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}
