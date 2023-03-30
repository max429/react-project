import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {login, logout} from "@/redux/reducers/UserSlice";

export const fetchUser = createAsyncThunk('users', async (id: number, thunkAPI) => {
    const url = `http://localhost:3000/users/${id}`;
    try {
        const response = await axios.get(url);
        return response.data
    } catch (e) {
        return thunkAPI.rejectWithValue('Ошибка')
    }
})

export const userLogin = createAsyncThunk('users/login', async (data: {email: string; password: string}, thunkAPI) => {
    const {email, password} = data;
    if (email === 'a@a.ru' && password === '123456') {
        thunkAPI.dispatch(login({}));
        return 1677675315369
    } else {
        return thunkAPI.rejectWithValue('Неверный логин или пароль')
    }
})



export const userLogout = () => {
    return (dispatch: any) => {
        dispatch(logout({}));
        localStorage.removeItem('userId');
    }
}


