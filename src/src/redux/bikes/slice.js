import {createSlice} from "@reduxjs/toolkit";
import {delete_bike, get_bikes, update_bike, create_bike} from './action_creators'
import {message} from 'antd'
import {removeBearerToken, setBearerToken} from "../utils";
export const bikeSlice = createSlice({
    name: 'bikes-slice',
    initialState: {
        isLoading:false,
    },
    reducers: {},
    extraReducers:builder => (
        builder.addCase(get_bikes.pending, (state, action) => {
            state.isLoading= true
        }),
        builder.addCase(get_bikes.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(get_bikes.fulfilled, (state, action) => {
            state.isLoading= false
            state.bikes_list = action.payload
        }),
        builder.addCase(delete_bike.pending, (state, action) => {
            state.isLoading= true
        }),
        builder.addCase(delete_bike.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(delete_bike.fulfilled, (state, action) => {
            state.isLoading= false
        }),
        builder.addCase(create_bike.pending, (state, action) => {
            state.isLoading= true
        }),
        builder.addCase(create_bike.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(create_bike.fulfilled, (state, action) => {
            state.isLoading= false
        }),
        builder.addCase(update_bike.pending, (state, action) => {
            state.isLoading= true
        }),
        builder.addCase(update_bike.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(update_bike.fulfilled, (state, action) => {
            state.isLoading= false
        })
    )
})