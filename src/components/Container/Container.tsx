import React from 'react';
import './Container.css'

export const TaskContainer = ({children}: {children: any}) => {
    return (<div className={'task-container'}>
        {children}
    </div>)
}
