import React, {FC, useState} from 'react';
import classNames from "classnames";
import {R} from "@/resources/R";
import './Input.css';

interface IProps {
    labelText: string;
    errorText?: string;
    inputProps:  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

export const Input: FC<IProps> = ({labelText, errorText, inputProps}) => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const onChangeVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
    }


    return (
        <div className='input-container'>
            <label className={'input-label'}>{labelText}</label>
            <div style={{
                position: 'relative',
            }}>
                <input
                    className={classNames('input', {
                        'input_error': !!errorText,
                        'input_password': inputProps.type === 'password'
                    })}
                    {...inputProps}
                    type={passwordVisibility ? 'text' : inputProps.type}

                />
                {inputProps.type === 'password' &&
                    <img alt={'Пароль'}
                         className={'input__visibility-image'}
                         src={passwordVisibility ? R.images.visibility : R.images.visibility_off}
                         onClick={onChangeVisibility}/>}
                {!!errorText && <div className="input-error">{errorText}</div>}
            </div>

        </div>
    )
}
