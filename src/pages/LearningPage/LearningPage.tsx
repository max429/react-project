import React from 'react';
import {Loading} from "../../components/Loading/Loading";
import {Chapter} from "./parts/Chapter/Chapter";
import {useAppSelector} from "../../hooks/redux";
import {useGetChaptersQuery} from "../../redux/api/chaptersApi";
import './LearningPage.css';

export const LearningPage = () => {
    const {data = [], isLoading} = useGetChaptersQuery(null);
    const user = useAppSelector((state) => state.userReducer.data);

    if (isLoading) {return <Loading/>}

    return (
        <div>
            <main className={'learning'}>

                {data.map((item, chapterIndex) =>
                   (<Chapter
                       key={item.id}
                       index={chapterIndex}
                       data={item}
                       userData={user}
                   />)
                )}

            </main>

        </div>
    )
}
