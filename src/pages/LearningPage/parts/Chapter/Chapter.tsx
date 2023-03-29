import React, {FC} from 'react';
import {IChapter} from "@/interfaces/chapters.interface";
import {IUser} from "@/interfaces/user.interface";
import {TaskWrapper} from "../Task/TaskWrapper";
import './Chapter.css';

interface IProps {
    data: IChapter;
    index: number;
    userData: IUser;
}

export const Chapter: FC<IProps> = ({data, index, userData}) => {

    const {tasks, name, id} = data;

    return (<div className={'chapter'}>

        <div className={'chapter__header'}>
            <span>Раздел {index + 1}</span>
            <span className={'chapter__header-name'}>{name}</span>
        </div>

        {tasks.map((task, taskIndex) => {
            return (<TaskWrapper
                key={task.id}
                chapterIndex={index}
                taskIndex={taskIndex}
                userData={userData}
                task={task}
                chapterId={id}
            />)
        })}

    </div>)
}
