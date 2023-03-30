import React, {useEffect, useState} from 'react';
import {Button} from "@/components/Button/Button";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchUser, userLogin} from "@/redux/actions/user.actions";
import {login} from "@/redux/reducers/UserSlice";
import './LoginPage.css';
import {Input} from "@/components/Input/Input";

interface SignInData {
    password: string;
    email: string;
}

export const LoginPage = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors} } = useForm<SignInData>();

    const [error, setError] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            handleLogin(Number(userId))
        }
    }, [])

    const handleLogin = (userId: number) => {
        dispatch(login({}))
        dispatch(fetchUser(userId));
        navigate('/learning')
    }


    const onLogin = (data: SignInData) => {
        dispatch(userLogin({...data})).unwrap().then((userId: number) => {
            localStorage.setItem('userId', userId.toString());
            handleLogin(userId);
        }).catch((error: string) => {
            setError(error);
        });
    }

    return (<form onSubmit={handleSubmit(onLogin)} noValidate className={'login-form'}>
        <Input labelText={'Email'} errorText={errors.email?.message} inputProps={{
            type: 'email',
            onInput: () => {
                setError('');
            },
            ...register('email', {
                required: {
                    value: true,
                    message: 'Пожалуйста заполните поле'
                },

                pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Неверный email',
                }
            })
        }}/>
        <Input labelText={'Пароль'} errorText={errors.password?.message}  inputProps={{
            type: 'password',
            onInput: () => {
                setError('');
            },
            ...register('password', {
                required: {
                    value: true,
                    message: 'Пожалуйста заполните поле'
                },
            })
        }}/>
        {!!error && <div className={'login-form__error'}>
            {error}
        </div>}

        <Button text={'Войти'} className={'login-form__button'}/>
        <Button text={'Регистрация'} className={'login-form__registration-button'} onClick={() => {

        }} type={'button'}/>
    </form>)
}
