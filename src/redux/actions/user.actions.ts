import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk('users', async (id: number, thunkAPI) => {
    const url = `http://localhost:3000/users/${id}`;
    try {
        const response = await axios.get(url);
        return response.data
    } catch (e) {
        return thunkAPI.rejectWithValue('Ошибка')
    }
})
