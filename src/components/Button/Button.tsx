import React, {FC} from 'react';
import './Button.css';
import {ButtonType} from "../../utils/types";
import classNames from "classnames";

interface IProps extends ButtonType{
    text: string;
}

export const Button: FC<IProps> = ({text, ...props}) => {
    return <button {...props} className={classNames('button', props.className)}>
        {text}
    </button>
}
