import React, {FC} from 'react';
import './Task.css';
import classNames from "classnames";
import {IChapterTask} from "../../../../interfaces/chapters.interface";
import {NavLink} from "react-router-dom";

export type TaskState = 'passed' | 'current' | 'locked';
interface IProps {
    margin: number;
    taskState: TaskState;
    data: IChapterTask;
}

export const Task: FC<IProps> = ({margin, taskState, data}) => {
    const {type} = data;
    return (
        <div className={'task'} style={{marginLeft: margin}}>
            {taskState === 'current' && <div className={'task__top-hint'} >
                Начать
            </div>}
            <NavLink to={'/' + type} state={{words: data.words}}>
                <div className={classNames('task__circle', `task__circle_type_${taskState}`)}/>
            </NavLink>
        </div>
    )
}
