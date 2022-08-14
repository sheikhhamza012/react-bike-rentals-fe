import {createSlice} from "@reduxjs/toolkit";
import {login, login_with_token, register} from './action_creators'
import {message} from 'antd'
import {removeBearerToken, setBearerToken} from "../utils";
export const userSlice = createSlice({
    name: 'login-slice',
    initialState: {
        isLoading:false
    },
    reducers: {},
    extraReducers:builder => (
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true;
        }),
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            message.error(action.error.message);

        }),
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            setBearerToken(action.payload?.token);
            state.userObj = action.payload?.user;
        }),
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        }),
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            message.error(action.error.message);
        }),
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            setBearerToken(action.payload?.token);
            state.userObj = action.payload?.user;
        }),
        builder.addCase(login_with_token.pending, (state, action) => {
            state.isLoading = true;
        }),
        builder.addCase(login_with_token.rejected, (state, action) => {
            state.isLoading = false;
            message.error(action.error.message);
        }),
        builder.addCase(login_with_token.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userObj = action.payload?.user;
        }),
        builder.addCase("LOGOUT", (state, action) => {
            state.isLoading = false;
            removeBearerToken()
            state.userObj = undefined;
            window.location = '/'
        })
    )
})