import React, {useEffect} from "react";
import './Root.css';
import {Outlet, useNavigate} from "react-router-dom";
import {NavItem} from "./parts/NavItem";

export const Root = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('learning')
    }, [])
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
