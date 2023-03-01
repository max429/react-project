import React, {useState} from 'react';
import './App.css';
import {useGetUsersQuery, useAddUserMutation, useDeleteUserMutation} from "./redux/testApi";

export const App = () => {
    const {data = [], isLoading} = useGetUsersQuery(null);
    const [addUser, {isError}] = useAddUserMutation();
    const [deleteUser, {}] = useDeleteUserMutation();
    const [name, setName] = useState('');
    console.log('data', data);
    if (isLoading) {
        return (<div>Загрузка...</div>)
    }

    const handleAddUser = async () => {
        if (name) {
            await addUser({name, id: new Date().getTime()}).unwrap();
            setName('');
        }
    }

    const handleDeleteUser = async (id: number) => {
        await deleteUser(id).unwrap()
    }

    return (
        <div>
            <input value={name} onChange={(event) => {
                setName(event.target.value);
            }}/>
            <button onClick={handleAddUser}>
                Добавить пользователя
            </button>
            <ul>
                {data.map((item) => {
                    return (
                        <div id={'item'} key={item.id}>
                            <li id={'item_name'}>{item.name}</li>
                            <button onClick={() => handleDeleteUser(item.id)}>
                                Удалить
                            </button>
                        </div>

                    )
                })}
            </ul>
        </div>
    )
};
