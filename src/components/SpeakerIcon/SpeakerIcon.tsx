import React, {FC} from 'react';
import './SpeakerIcon.css';
import classNames from "classnames";

interface IProps {
    animationEnabled?: boolean;
}

export const SpeakerIcon:FC<IProps> = ({animationEnabled}) => {
    return (<span className={classNames('icon', 'speaker', {
            speaker_animation: animationEnabled
    })}/>
    )
}
