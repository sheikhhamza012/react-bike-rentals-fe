import {createSlice} from "@reduxjs/toolkit";
import {
    cancel_reservation,
    get_available_bikes,
    get_my_reservations,
    get_rentals, give_rate,
    login,
    login_with_token,
    register,
    reserve
} from './action_creators'
import {message} from 'antd'
import {removeBearerToken, setBearerToken} from "../utils";
export const homeSlice = createSlice({
    name: 'home-slice',
    initialState: {
        isLoading:false,
        showBikesReserved:true
    },
    reducers: {},
    extraReducers:builder => (
        builder.addCase("SWITCH_RESERVATION_VIEW", (state, action) => {
            state.showBikesReserved = action.payload;
        }),
        builder.addCase(get_rentals.pending, (state, action) => {
            state.isLoading= true

        }),
        builder.addCase(get_rentals.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(get_rentals.fulfilled, (state, action) => {
            state.isLoading= false
            state.rentals = action.payload
        }),
        builder.addCase(get_available_bikes.pending, (state, action) => {
            state.isLoading= true

        }),
        builder.addCase(get_available_bikes.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(get_available_bikes.fulfilled, (state, action) => {
            state.isLoading= false
            state.bikes = action.payload
        }),
        builder.addCase(reserve.pending, (state, action) => {
            state.isLoading= true

        }),
        builder.addCase(reserve.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(reserve.fulfilled, (state, action) => {
            state.isLoading= false
            window.location='/my_reservations'
        }),
        builder.addCase(get_my_reservations.pending, (state, action) => {
            state.isLoading= true

        }),
        builder.addCase(get_my_reservations.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(get_my_reservations.fulfilled, (state, action) => {
            state.isLoading= false
            state.my_reservations = action.payload
        }),
        builder.addCase(cancel_reservation.pending, (state, action) => {
            state.isLoading= true

        }),
        builder.addCase(cancel_reservation.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(cancel_reservation.fulfilled, (state, action) => {
            state.isLoading= false
        }),
        builder.addCase(give_rate.pending, (state, action) => {
            state.isLoading= true

        }),
        builder.addCase(give_rate.rejected, (state, action) => {
            state.isLoading= false
            message.error(action.error.message)
        }),
        builder.addCase(give_rate.fulfilled, (state, action) => {
            message.success("your rating has been recorded")
            state.isLoading= false
        })
    )
})