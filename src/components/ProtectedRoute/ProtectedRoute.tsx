import React, {FC} from 'react';
import {useAppSelector} from "@/hooks/redux";
import {Navigate, useLocation} from "react-router-dom";

interface IProps {
   children: any;
}

export const ProtectedRoute: FC<IProps> = ({children}) => {
    const userIsLogged = useAppSelector((state) => state.userReducer.isLogged);
    const location = useLocation();
    if (!userIsLogged) {
        return <Navigate to="/" replace state={{from: location}}/>;
    }
    return (
        <>
            {children}
        </>
    )
}
