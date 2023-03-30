import React from 'react';
import {Outlet} from "react-router-dom";
import {useAppSelector} from "@/hooks/redux";
import {Loading} from "../Loading/Loading";
import {NavItem} from "./parts/NavItem";
import {useDispatch} from "react-redux";
import {userLogout} from "@/redux/actions/user.actions";
import './Layout.css';

export const Layout = () => {
    const dispatch: any = useDispatch();
    const {isLoading} = useAppSelector(state => state.userReducer);

    if (isLoading) {
        return <Loading/>
    }

    return (<div className={'container font-face-gm'}>
        <nav>
            <div className={'filler'}/>
            <ul className={'sidebar'}>
                <NavItem text={'Обучение'} link='/learning'/>
                <NavItem text={'Профиль'} link='/profile'/>
                <NavItem text={'Выход'} link='/' onClick={() => {
                    dispatch(userLogout())
                }}/>
            </ul>

        </nav>
        <div className={'content'}>
            {<Outlet/>}
        </div>
    </div>)
}
