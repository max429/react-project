import {IUser} from "@/interfaces/user.interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUser} from "../actions/user.actions";

interface UserState {
    data: IUser;
    isLoading: boolean;
    isLogged: boolean;
    error: string;
}

const initialState: UserState = {
    data: {},
    isLoading: false,
    isLogged: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action){
            state.isLogged = true;
        },
        logout(state, action){
            state.isLogged = false;
        }
    },
    extraReducers: {
        [fetchUser.pending.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }

});

export const { login, logout } = userSlice.actions

export default userSlice.reducer;
