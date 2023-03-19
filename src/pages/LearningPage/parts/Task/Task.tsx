import React, {FC, useEffect, useState} from 'react';
import './Task.css';
import classNames from "classnames";
import {IChapterTask} from "../../../../interfaces/chapters.interface";
import {NavLink} from "react-router-dom";
import LOCK_IMAGE from '../../../../images/lock.png';

export type TaskState = 'passed' | 'current' | 'locked';
interface IProps {
    margin: number;
    taskState: TaskState;
    data: IChapterTask;
    chapterId: number;
}

export const Task: FC<IProps> = ({margin, taskState, data, chapterId}) => {
    const {type} = data;
    const [isHintVisible, setIsHintVisible] = useState(false);
    useEffect(() => {
        const handler = (e: any) => {
            const { target } = e;
            console.log('target.className', target.className);
            if (target instanceof HTMLElement) {
                if (isHintVisible) {
                    setIsHintVisible(false);
                }
            }
        }
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler);
    }, [isHintVisible])
    return (
        <div className={'task'} style={{marginLeft: margin}}>
            {taskState === 'current' && <div className={'task__top-hint'} >
                Начать
            </div>}
            <NavLink to={'/learning/' + type} onClick={(e) => {
                 if (taskState === 'locked') {
                    e.preventDefault();
                    setTimeout(() => {
                        setIsHintVisible(!isHintVisible);
                    })
                } else {
                }
            }} state={{words: data.words}} draggable={false}>
                <div className={classNames('task__circle', `task__circle_type_${taskState}`, `id_${chapterId}_${data.id}`)}>
                    {taskState === 'locked' && <img src={LOCK_IMAGE} alt={''} className={'task__circle-image'} draggable={false}/>}
                </div>
            </NavLink>
             <div
                className={classNames('task__hint', {
                    'task__hint_visible': isHintVisible
                })}
                onClick={(e) => {
                e.stopPropagation()
            }}>
                Пройдите уровни выше, чтобы открыть доступ
            </div>
        </div>
    )
}
