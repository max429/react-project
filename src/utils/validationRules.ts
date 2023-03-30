const requiredField = {
    value: true,
    message: 'Пожалуйста заполните поле'
}

const passwordMinLength = {
    value: 8,
    message: "Пароль должен содержать минимум 8 символов"
}

const emailPattern = {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Неверный email',
}

export const loginValidationRules = {
    email: {
        required: requiredField,
        pattern: emailPattern,
    },
    password: {
        required: requiredField,
    }
};
export const registrationValidationRules = {
    email: {
        required: requiredField,
        pattern: emailPattern,
    },
    password: {
        required: requiredField,
        minLength: passwordMinLength,
    },
    confirmPassword: {
        required: requiredField,
    },
    consent: {
        required: {
            value: true,
            message: 'Необходимо принять согласие'
        },
    }
};
