import React, {FC, useEffect} from 'react';
import './SpeakerIcon.css';
import classNames from "classnames";

interface IProps {
    animationEnabled?: boolean;
}

export const SpeakerIcon:FC<IProps> = ({animationEnabled}) => {

    useEffect(() => {
        document.documentElement.style.setProperty('--speaker-color', animationEnabled ? 'green' : 'black');
    }, [animationEnabled])

    return (<span className={classNames('icon', 'speaker', {
            speaker_animation: animationEnabled
    })}/>
    )
}
