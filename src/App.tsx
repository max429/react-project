import React from 'react';
import './App.css';
import Image from './images/logo.png';

export const App = () => (
    <div>
        <h1>Hello React 1</h1>
        <img src={Image} alt={'Logo'}/>
    </div>
);
