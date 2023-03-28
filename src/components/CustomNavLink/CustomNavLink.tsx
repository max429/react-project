import React, {FC} from 'react';
import {NavLink, NavLinkProps} from "react-router-dom";
import {DivType} from "../../utils/types";


interface IProps {
    disabled?: boolean;
    children: any
}

export const CustomNavLink: FC<IProps & NavLinkProps> = ({children, disabled, ...props}) => {
    return disabled ? <div {...props as DivType}>
        {children}
    </div> : <NavLink {...props}>
        {children}
    </NavLink>
}
