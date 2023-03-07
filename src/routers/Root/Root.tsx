import React, {useEffect} from "react";
import './Root.css';
import {Outlet, useNavigate} from "react-router-dom";
import {NavItem} from "./parts/NavItem";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchUser} from "../../redux/actions/user.actions";
import {Loading} from "../../components/Loading/Loading";

export const Root = () => {
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
