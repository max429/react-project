import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import './NavItem.css'

interface INavItem {
    link: string;
    text: string;
    onClick?: () => void;
}

export const NavItem: FC<INavItem> = ({link, text, onClick}) => {
    return ( <li className={'nav-item'}>
        <NavLink to={link} className={({isActive}) => classNames(
            'nav-item__link',
            { 'nav-item__link_active': isActive }
        )} onClick={onClick}>
            {text}
        </NavLink>
    </li>)
}
