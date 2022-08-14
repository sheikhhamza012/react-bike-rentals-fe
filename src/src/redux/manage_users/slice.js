import {createSlice} from "@reduxjs/toolkit";
import {delete_bike, get_bikes, update_bike, create_bike, get_users, create_user, update_user} from './action_creators'
import {message} from 'antd'
import {removeBearerToken, setBearerToken} from "../utils";
export const manageUsersSlice = createSlice({
    name: 'manage-users-slice',
    initialState: {
        isLoading:false,
    },
    reducers: {},
    extraReducers:builder => (
        builder.addCase(get_users.pending, (state, action) => {
            state.isLoading= true
        }),
        builder.addCase(get_users.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(get_users.fulfilled, (state, action) => {
            state.isLoading= false
            state.users_list = action.payload
        }),
        builder.addCase(create_user.pending, (state, action) => {
            state.isLoading= true
        }),
        builder.addCase(create_user.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(create_user.fulfilled, (state, action) => {
            state.isLoading= false
        }),
        builder.addCase(update_user.pending, (state, action) => {
            state.isLoading= true
        }),
        builder.addCase(update_user.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(update_user.fulfilled, (state, action) => {
            state.isLoading= false
        })
    )
})