import React, {FC} from 'react';
import classNames from "classnames";
import './Input.css';

interface IProps {
    labelText: string;
    errorText?: string;
    inputProps:  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

export const Input: FC<IProps> = ({labelText, errorText, inputProps}) => {
    return (
        <div className='input-container'>
            <label className={'input-label'}>{labelText}</label>
            <input
                className={classNames('input', {
                    'input_error': !!errorText
                })}
                {...inputProps}
            />
            {!!errorText && <div className="input-error">{errorText}</div>}
        </div>
    )
}
