import React from 'react';
import {useRouteError, isRouteErrorResponse} from "react-router-dom";
import './ErrorPage.css';

export const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className={'error'}>
            <h1>
                Oops!
            </h1>

            <p>
                Sorry, an unexpected error has occurred.
            </p>

            {isRouteErrorResponse(error) ?
                <p>
                <i>{error.statusText}</i>
            </p> :
                <p>
                    <i>
                    {"Unknown Error"}
                </i>
            </p>
            }
        </div>
    )
}
