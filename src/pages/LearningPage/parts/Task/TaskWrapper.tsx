import React, {FC} from 'react';
import {Task, TaskState} from "./Task";
import {IUser} from "@/interfaces/user.interface";
import {IChapterTask} from "@/interfaces/chapters.interface";

interface IProps {
    chapterIndex: number;
    chapterId: number;
    taskIndex: number;
    userData: IUser;
    task: IChapterTask;
}
export const TaskWrapper: FC<IProps> =
    ({chapterIndex, taskIndex, userData, task, chapterId}) => {

    const isEven = chapterIndex % 2;
    let offsetDirection = isEven ? 'right' : 'left';
    const {passedTasks, currentTask} = userData;
    let offset = 60;
    if ((isEven && offsetDirection === 'right' || !isEven && offsetDirection === 'left') &&
        taskIndex % 4 === 3 ||
        (!isEven && offsetDirection === 'right' || isEven && offsetDirection === 'left') &&
        taskIndex % 3 === 1) {
        offset = 20
    }
    const margin = (taskIndex % 4) * (offsetDirection === 'left' ? -offset : offset);
    let taskState: TaskState = 'locked';

    if (!passedTasks?.length && !chapterIndex && !taskIndex ||
        currentTask?.taskId === task.id && currentTask?.chapterId === chapterId) {
        taskState = 'current';
    }  else if (passedTasks?.length) {
        for (let i = 0; i < passedTasks.length; i++) {
            if (passedTasks[i].taskId === task.id &&
                passedTasks[i].chapterId === chapterId) {
                taskState = 'passed';
            }
        }
    }
    return (<Task margin={margin} taskState={taskState} data={task} chapterId={chapterId}/>)
}
