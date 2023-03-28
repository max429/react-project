import React, {FC} from 'react';
import {NavLink, NavLinkProps} from "react-router-dom";


interface IProps {
    disabled?: boolean;
    children: any
}

type div = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const CustomNavLink: FC<IProps & NavLinkProps> = ({children, disabled, ...props}) => {
    return disabled ? <div {...props as div}>
        {children}
    </div> : <NavLink {...props}>
        {children}
    </NavLink>
}
