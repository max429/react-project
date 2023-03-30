import React from 'react';
import {BrowserRouter, createHashRouter, HashRouter, Route, RouterProvider, Routes} from "react-router-dom";
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
import {TrainingCardsPage} from "./pages/Tasks/TrainingCards/TrainingCardsPage";
import 'react-tooltip/dist/react-tooltip.css';
import {LoginPage} from "@/pages/LoginPage/LoginPage";
import {RegistrationPage} from "@/pages/RegistrationPage/RegistrationPage";
import {ProtectedRoute} from "@/components/ProtectedRoute/ProtectedRoute";


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
                path: '/learning/learning-cards',
                element: <LearningCardsPage/>,
            },
            {
                path: '/learning/training-cards',
                element: <TrainingCardsPage/>,
            }
        ]
    },
]);

export const App = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route  element={
                        <ProtectedRoute>
                            <Layout/>
                        </ProtectedRoute>
                    }>
                        <Route path={'/learning'} element={<LearningPage/>}/>
                        <Route path={"/profile"} element={<ProfilePage/>}/>
                        <Route path={"/learning/choose-translate"} element={<ChooseTranslatePage/>}/>
                        <Route path={"/learning/find-word"} element={<FindWordPage/>}/>
                        <Route path={"/learning/collect-word"} element={<CollectWordPage/>}/>
                        <Route path={"/learning/learning-cards"} element={<LearningCardsPage/>}/>
                        <Route path={"/learning/training-cards"} element={<TrainingCardsPage/>}/>
                    </Route>
                    <Route>
                        <Route path={"/"} element={<LoginPage/>}/>
                        <Route path={"/register"} element={<RegistrationPage/>}/>
                    </Route>
                </Routes>
            </HashRouter>
        </Provider>
    )
}
