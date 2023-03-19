import React, {useState} from "react";
import './ProfilePage.css';

export const ProfilePage = () => {
    const [name, setName] = useState('');
    return (<div className={'profile'}>
        <div>
            <span>Имя</span>
            <input className={'input'} value={name} onChange={({target: {value}}) => {
                setName(value);
            }}/>
        </div>
    </div>)
}
