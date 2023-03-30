import React, {useEffect} from 'react';
import {Button} from "@/components/Button/Button";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {fetchUser, userLogin} from "@/redux/actions/user.actions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "@/redux/reducers/UserSlice";

interface SignInData {
    password: string;
    email: string;
}

export const LoginPage = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors} } = useForm<SignInData>();

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
        });
    }

    return (<form onSubmit={handleSubmit(onLogin)} noValidate>
        <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
                type='email'
                className='form-input'
                {...register('email', {
                    required: {
                        value: true,
                        message: 'Пожалуйста заполните поле'
                    },
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Неверный email',
                    }
                })}
                required
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className='form-group'>
            <label htmlFor='password'>Пароль</label>
            <input
                type='password'
                className='form-input'
                {...register('password', {
                    required: {
                        value: true,
                        message: 'Пожалуйста заполните поле'
                    },
                })}
                required
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <Button text={'Войти'}/>
    </form>)
}
