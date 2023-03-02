import React, {useState} from 'react';
import './App.css';
import {useGetUsersQuery, useAddUserMutation, useDeleteUserMutation} from "./redux/api/testApi";
import {useGetChaptersQuery} from "./redux/api/chaptersApi";

export const App = () => {
    const {data = [], isLoading} = useGetChaptersQuery(null);
    const [name, setName] = useState('');
    if (isLoading) {
        return (<div>Загрузка...</div>)
    }
    return (
        <div style={{
            display: 'flex'
        }}>
           <div id={'leftSidebar'}>
               <div id={'sidebarButton'}>
                   <span>Обучение</span>
               </div>
               <div id={'sidebarButton'}>
                   <span>Профиль</span>
               </div>
           </div>
           <main id={'sidebar'}>
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
                           return (<div
                               id={'dot'}
                               style={{
                                   marginLeft: (taskIndex % 4) * (offsetDirection === 'left' ? -offset : offset)
                               }}
                               key={task.id}>

                           </div>)
                       })}
                   </div>)
               })}
           </main>
            <div id={'rightSidebar'}>
                <span>Статистика</span>
            </div>
        </div>
    )
};
