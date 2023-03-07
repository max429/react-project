import React, {FC, useEffect, useState} from 'react';
import './ProgressBar.css';
import classNames from "classnames";

interface IProps {
    data: boolean[];
    length: number;
}

export const ProgressBar: FC<IProps> = ({data, length}) => {
    useEffect(() => {
        document.documentElement.style.setProperty('--progress-item-width', 100 / length + '%');
    }, [])
    return (
        <div className={'progress-bar'}>
            {data.map((item, index) => {
                return (<div key={index} className={classNames('progress-bar__item', {
                    'progress-bar__item_correct': item,
                    'progress-bar__item_incorrect': !item,
                    'progress-bar__item_first': index === 0,
                    'progress-bar__item_last': index === length - 1
                })}/>)
            })}
        </div>
    )
}
