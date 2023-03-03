import React, {FC, useEffect} from 'react';
import './Task.css';
import classNames from "classnames";

export type TaskType = 'passed' | 'current' | 'locked';
interface IProps {
    margin: number;
    index: number;
    type: TaskType;
}

export const Task: FC<IProps> = ({margin, type}) => {
    return (
        <div className={'task'} style={{marginLeft: margin}}>
            {type === 'current' && <div className={'task__top-hint'} >
                Начать
            </div>}
            <div className={classNames('task__circle', `task__circle_type_${type}`)}/>
        </div>
    )
}
