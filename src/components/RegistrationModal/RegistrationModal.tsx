import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {Input} from "@/components/Input/Input";
import {Button} from "@/components/Button/Button";
import {registrationValidationRules} from "@/utils/validationRules";
import {Checkbox} from "@/components/Checkbox/Checkbox";
import './RegistrationModal.css';

interface IRegistrationFields {
    email: string;
    password: string;
    confirmPassword: string;
    consent: boolean;
}

export const RegistrationModal = ({modalVisible}: {modalVisible: boolean}) => {
    const {register, formState: {errors}, watch, handleSubmit, trigger, getValues, reset} = useForm<IRegistrationFields>();

    const onRegister = () => {

    }

    useEffect(() => {
        if (!modalVisible) {
            reset();
        }
    }, [modalVisible])


    const onPasswordChange = async () => {
        if (getValues('confirmPassword').length) {
            await trigger('confirmPassword');
        }
    }

    return (<form onSubmit={handleSubmit(onRegister)} noValidate>
        <Input
            labelText={'Email'}
            errorText={errors.email?.message}
            inputProps={{
                type: 'email',
                ...register('email', registrationValidationRules.email)
            }}
        />
        <Input
            labelText={'Пароль'}
            errorText={errors.password?.message}
            inputProps={{
                type: 'password',
                onInput: onPasswordChange,
                ...register('password', registrationValidationRules.password)
            }}
        />
        <Input
            labelText={'Повторите пароль'}
            errorText={errors.confirmPassword?.message}
            inputProps={{
                type: 'password',
                ...register('confirmPassword', {
                    ...registrationValidationRules.confirmPassword,
                    validate: (val: string) => {
                        if (watch('password') != val) {
                            return "Пароли не совпадают";
                        }
                    },
                })
            }}
        />
        <Checkbox labelText={'Согласие с политикой'} errorText={errors.consent?.message} inputProps={{
            ...register('consent', registrationValidationRules.consent)
        }}/>
        <Button text={'Регистрация'} className={'registration-form__registration-button'}/>
    </form>)
}
