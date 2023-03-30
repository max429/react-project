import React, {FC} from 'react';
import {InputType} from "@/utils/types";
import './Checkbox.css';

interface IProps {
    labelText: string;
    errorText?: string;
    inputProps: InputType;
}

export const Checkbox: FC<IProps> = ({errorText, inputProps, labelText}) => {
    return (
        <div className={'checkbox-container'}>
            <label htmlFor={'checkbox'}>{labelText}</label>
            <input id={'checkbox'} className={'checkbox'} type={'checkbox'} {...inputProps}/>
            {!!errorText && <div className={'checkbox-error'}>
                {errorText}
            </div>}
        </div>
    )
}
