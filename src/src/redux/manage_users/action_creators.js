import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import {api, bike_api, getBearerToken, rental_api, user_api} from "../utils";
import {message} from 'antd'

export const get_users = createAsyncThunk(
    "manage_users/get_users",
    async () => {
        return fetch(`${user_api}/`, {
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
                return json.users
            });
    }
);
export const create_user = createAsyncThunk(
    "manage_users/create_user",
    async (params,{dispatch}) => {
        return fetch(`${user_api}/`, {
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
                dispatch(get_users())
                return
            });
    }
);
export const delete_user = createAsyncThunk(
    "manage_users/delete_user",
    async (id,{dispatch}) => {
        return fetch(`${user_api}/`+id, {
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
                dispatch(get_users())
                return
            });
    }
);
export const update_user = createAsyncThunk(
    "manage_users/update_user",
    async ({id,params},{dispatch}) => {
        return fetch(`${user_api}/`+id, {
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
                dispatch(get_users())
                return
            });
    }
);
