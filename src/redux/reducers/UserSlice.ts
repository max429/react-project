import {IUser} from "../../interfaces/user.interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUser} from "../actions/user.actions";

interface UserState {
    data: IUser;
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    data: {},
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
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

export default userSlice.reducer;
