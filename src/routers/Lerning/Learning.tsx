import React, {useState} from 'react';
import {Task, TaskType} from "../../components/Task/Task";
import {useGetChaptersQuery} from "../../redux/api/chaptersApi";
import {IUser} from "../../interfaces/test.interface";
import {Loading} from "../../components/Loading/Loading";
import './Learning.css'

export const Learning = () => {
    const {data = [], isLoading} = useGetChaptersQuery(null);

    const [user, setUser] = useState<IUser>({
        "name": "dfsfdsfs",
        "id": 1677675315369,
        "passedTasks": []
    })
    if (isLoading) {
        return (<Loading/>)
    }
    let previousTask: any = null;
    return (
        <div>
            <main className={'learning'}>
                {data.map((item, chapterIndex) => {
                    const isEven = chapterIndex % 2 === 0;
                    let offsetDirection = isEven ? 'right' : 'left';
                    return (<div key={item.id} style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <div id={'chapter'}>
                            <span>Раздел {chapterIndex + 1}</span>
                            <span id={'chapter_name'}>{item.name}</span>
                        </div>
                        {item.tasks.map((task, taskIndex) => {
                            let offset = 60;
                            if ((isEven && offsetDirection === 'right' || !isEven && offsetDirection === 'left') &&
                                taskIndex % 4 === 3 ||
                                (!isEven && offsetDirection === 'right' || isEven && offsetDirection === 'left') &&
                                taskIndex % 3 === 1) {
                                offset = 20
                            }
                            const margin = (taskIndex % 4) * (offsetDirection === 'left' ? -offset : offset)
                            let type: TaskType = 'locked';
                            const {passedTasks} = user;

                            if (!passedTasks?.length && !chapterIndex && !taskIndex) {
                                type = 'current';
                            } else if (passedTasks?.length) {
                                for (let i = 0; i < passedTasks.length; i++) {
                                    if (passedTasks[i].taskId === task.id &&
                                        passedTasks[i].chapterId === item.id) {
                                        type = 'passed';
                                    }
                                }
                            }
                            if (type === 'locked' && previousTask?.type === 'passed') {
                                type = 'current';
                            }
                            previousTask = {...task, type: type};
                            return (<Task margin={margin} index={taskIndex} key={task.id} type={type}/>)
                        })}
                    </div>)
                })}
            </main>
           {/* <div className={'statistic'}>
                <div></div>
                <span>Статистика</span>
            </div>*/}
        </div>
    )
}
