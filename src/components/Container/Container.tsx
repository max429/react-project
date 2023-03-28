import React from 'react';
import './Container.css'
import classNames from "classnames";

export const TaskContainer = ({children, classes}: {children: any; classes?: string | string[]}) => {
    return (<div className={classNames('task-container', classes)}>
        {children}
    </div>)
}
