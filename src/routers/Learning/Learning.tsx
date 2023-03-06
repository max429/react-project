import React, {useState} from 'react';
import {useGetChaptersQuery} from "../../redux/api/chaptersApi";
import {IUser} from "../../interfaces/test.interface";
import {Loading} from "../../components/Loading/Loading";
import './Learning.css'
import {Chapter} from "./parts/Chapter/Chapter";

export const Learning = () => {
    const {data = [], isLoading} = useGetChaptersQuery(null);

    const [user] = useState<IUser>({
        "name": "dfsfdsfs",
        "id": 1677675315369,
        "passedTasks": [],
        currentTask: {
            chapterId: 1,
            taskId: 1,
        }
    })
    if (isLoading) {
        return (<Loading/>)
    }

    return (
        <div>
            <main className={'learning'}>
                {data.map((item, chapterIndex) => {
                    return (<Chapter key={item.id} index={chapterIndex} data={item} userData={user}/>)
                })}
            </main>
           {/* <div className={'statistic'}>
                <div></div>
                <span>Статистика</span>
            </div>*/}
        </div>
    )
}
