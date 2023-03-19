import React from 'react';
import './Layout.css';
import {Outlet, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useEffect} from "react";
import {fetchUser} from "../../redux/actions/user.actions";
import {Loading} from "../Loading/Loading";
import {NavItem} from "./parts/NavItem";

export const Layout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {isLoading, data} = useAppSelector(state => state.userReducer);

    useEffect(() => {
        dispatch(fetchUser(1677675315369));
    }, [])
    useEffect(() => {
        if (Object.keys(data).length) {
            navigate('learning');
        }
    }, [data])

    if (isLoading) {
        return <Loading/>
    }

    return (<div className={'container'}>
        <nav>
            <div className={'filler'}/>
            <ul className={'sidebar'}>
                <NavItem text={'Обучение'} link='/learning'/>
                <NavItem text={'Профиль'} link='/profile'/>
            </ul>
        </nav>
        <div className={'content'}>
            {<Outlet/>}
        </div>
    </div>)
}
