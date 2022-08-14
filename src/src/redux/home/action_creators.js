import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import {api, bike_api, getBearerToken, rental_api, user_api} from "../utils";
import {message} from 'antd'

export const get_rentals = createAsyncThunk(
    "home/get_rentals",
    async () => {
        return fetch(`${rental_api}/`, {
            headers: {
                "Content-Type": "application/json",
                "service-name": "prior-auth",
                authorization:getBearerToken()
            },
            method: "get",
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if(json.error){
                    throw(json.error)
                }
                return json.bikes
            });
    }
);
export const get_available_bikes = createAsyncThunk(
    "home/get_available_bikes",
    async (params) => {
        return fetch(`${bike_api}/filter_bikes`, {
            headers: {
                "Content-Type": "application/json",
                "service-name": "prior-auth",
                authorization:getBearerToken()
            },
            method: "post",
            body:JSON.stringify(params)
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if(json.error){
                    throw(json.error)
                }
                return json.bikes
            });
    }
);
export const reserve = createAsyncThunk(
    "home/reserve",
    async (params) => {
        return fetch(`${rental_api}/`, {
            headers: {
                "Content-Type": "application/json",
                "service-name": "prior-auth",
                authorization:getBearerToken()
            },
            method: "post",
            body:JSON.stringify(params)
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if(json.error){
                    throw(json.error)
                }
                return json.bikes
            });
    }
);
export const get_my_reservations = createAsyncThunk(
    "home/get_my_reservations",
    async () => {
        return fetch(`${rental_api}/my_reservations`, {
            headers: {
                "Content-Type": "application/json",
                "service-name": "prior-auth",
                authorization:getBearerToken()
            },
            method: "get",
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if(json.error){
                    throw(json.error)
                }
                return json.rentals
            });
    }
);
export const cancel_reservation = createAsyncThunk(
    "home/cancel_reservation",
    async (id,{getState,dispatch}) => {
        return fetch(`${rental_api}/`+id, {
            headers: {
                "Content-Type": "application/json",
                "service-name": "prior-auth",
                authorization:getBearerToken()
            },
            method: "delete",
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if(json.error){
                    throw(json.error)
                }
                dispatch(get_my_reservations())
                return
            });
    }
);
export const give_rate = createAsyncThunk(
    "home/give_rate",
    async ({bike_id,rate},{getState,dispatch}) => {
        return fetch(`${bike_api}/rate_bike/${bike_id}/${rate}`, {
            headers: {
                "Content-Type": "application/json",
                "service-name": "prior-auth",
                authorization:getBearerToken()
            },
            method: "get",
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if(json.error){
                    throw(json.error)
                }
                dispatch(get_available_bikes())
                dispatch(get_my_reservations())
                return
            });
    }
);
