import React from 'react';
import {
    BrowserRouter,
    createHashRouter,
    createRoutesFromElements,
    HashRouter,
    Route,
    RouterProvider,
    Routes
} from "react-router-dom";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import 'react-tooltip/dist/react-tooltip.css';

import {ErrorPage} from "./pages/ErrorPage/ErrorPage";
import {LearningPage} from "./pages/LearningPage/LearningPage";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage";
import {ChooseTranslatePage} from "./pages/Tasks/ChooseTranslate/ChooseTranslatePage";
import {FindWordPage} from "./pages/Tasks/FindWord/FindWordPage";
import {CollectWordPage} from "./pages/Tasks/CollectWord/CollectWordPage";
import {LearningCardsPage} from "./pages/Tasks/LearningCards/LearningCardsPage";
import {Layout} from "./components/Layout/Layout";
import {TrainingCardsPage} from "./pages/Tasks/TrainingCards/TrainingCardsPage";
import {LoginPage} from "@/pages/LoginPage/LoginPage";
import {ProtectedRoute} from "@/components/ProtectedRoute/ProtectedRoute";
import './App.css';


const router = createHashRouter(createRoutesFromElements(
    <Route errorElement={<ErrorPage/>}>
        <Route element={
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
        </Route>
    </Route>
))

export const App = () => {
    return (
        <Provider store={store}>
           <RouterProvider router={router}/>
        </Provider>
    )
}
