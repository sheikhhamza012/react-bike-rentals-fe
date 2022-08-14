import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import {api, bike_api, getBearerToken, rental_api, user_api} from "../utils";
import {message} from 'antd'

export const get_bikes = createAsyncThunk(
    "bikes/get_bikes",
    async () => {
        return fetch(`${bike_api}/`, {
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
export const delete_bike = createAsyncThunk(
    "bikes/delete_bike",
    async (id,{getState,dispatch}) => {
        return fetch(`${bike_api}/`+id, {
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
                dispatch(get_bikes())
                return
            });
    }
);

export const create_bike = createAsyncThunk(
    "bikes/create_bike",
    async (params,{getState,dispatch}) => {
        return fetch(`${bike_api}/`, {
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
                dispatch(get_bikes())
                return
            });
    }
);

export const update_bike = createAsyncThunk(
    "bikes/update_bike",
    async ({id,params},{getState,dispatch}) => {
        return fetch(`${bike_api}/`+id, {
            headers: {
                "Content-Type": "application/json",
                "service-name": "prior-auth",
                authorization:getBearerToken()
            },
            method: "put",
            body:JSON.stringify(params)
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if(json.error){
                    throw(json.error)
                }
                dispatch(get_bikes())
                return
            });
    }
);
