import React, {FC} from "react";
import './Root.css';
import {Outlet} from "react-router-dom";
import {NavItem} from "./parts/NavItem";

export const Root = () => {
    return (<div className={'container'}>
            <nav>
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
