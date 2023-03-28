import React, {FC, useState} from 'react';
import './Task.css';
import classNames from "classnames";
import {IChapterTask} from "../../../../interfaces/chapters.interface";
import LOCK_IMAGE from '../../../../images/lock.png';
import {CustomNavLink} from "../../../../components/CustomNavLink/CustomNavLink";
import {SvgCrossIcon} from "../../../../components/svg/SvgCrossIcon";

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

    function changeHintState(e: React.MouseEvent, state?: boolean) {
        if (taskState === 'locked') {
            e.preventDefault();
            if (typeof state === "boolean") {
                setTimeout(() => {
                    setIsHintVisible(state);
                })
            }
        } else {
        }
    }


    return (
        <div className={'task'} style={{marginLeft: margin}}>
            {taskState === 'current' && <div className={'task__top-hint'} >
                Начать
            </div>}
            <CustomNavLink
                to={'/learning/' + type}
                disabled={taskState === 'locked'}
                onMouseLeave={(e) => changeHintState(e, false)}
                onMouseEnter={(e) => changeHintState(e, true)}
                onClick={changeHintState}
                state={{words: data.words}}
                draggable={false}>
                <div className={classNames('task__circle-container', `task__circle-container_type_${taskState}`)}>
                    <div className={classNames('task__circle', `task__circle_type_${taskState}`)}
                         >
                        {taskState === 'locked' && <img src={LOCK_IMAGE} alt={''} className={'task__circle-image'} draggable={false}/>}
                    </div>
                    <div
                        className={classNames('task__hint', {
                            'task__hint_visible': isHintVisible
                        })}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation()
                        }}>
                        <div style={{
                            position: "absolute",
                            cursor: 'pointer',
                            top: 0,
                            right: 0,
                            padding: 5
                        }} onClick={() => {
                            setIsHintVisible(false);
                        }}>
                           <SvgCrossIcon/>
                        </div>
                        Пройдите уровни выше, чтобы открыть доступ
                    </div>
                </div>
            </CustomNavLink>
        </div>
    )
}
