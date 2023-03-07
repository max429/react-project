import React from 'react';
import {useGetChaptersQuery} from "../../redux/api/chaptersApi";
import {Loading} from "../../components/Loading/Loading";
import './Learning.css'
import {Chapter} from "./parts/Chapter/Chapter";
import {useAppSelector} from "../../hooks/redux";

export const Learning = () => {
    const {data = [], isLoading} = useGetChaptersQuery(null);
    const user = useAppSelector((state) => state.userReducer.data);

    console.log('Learning');

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
