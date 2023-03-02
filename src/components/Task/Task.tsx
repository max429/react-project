import React, {FC} from 'react';
import './Task.css';

export type TaskType = 'passed' | 'current' | 'locked'
interface IProps {
    margin: number;
    index: number;
    type: TaskType;
}

export const Task: FC<IProps> = ({margin, index, type}) => {
    return (
        <div style={{
            marginLeft: margin,
            position: "relative",
            display: 'flex',
            justifyContent: 'center'
        }}>
            {type === 'current' && <div className={'task_top_hint'}>
                Начать
            </div>}
            <div
                className={'task' + ` ${type}`}
            >

            </div>
        </div>
    )
}
