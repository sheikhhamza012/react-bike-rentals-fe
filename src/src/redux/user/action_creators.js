import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import {api, getBearerToken, user_api} from "../utils";
import {message} from 'antd'

export const register = createAsyncThunk(
    "user/register",
    async ({username,email,password}, {getState}) => {
        let state = getState() ;
        return fetch(`${user_api}/register`, {
            headers: {
                "Content-Type": "application/json",
                "service-name": "prior-auth",
            },
            body: JSON.stringify({
                username,email,password
            }),
            method: "post",
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if(json.error){
                    throw(json.error)
                }
                return json
            });
    }
);
export const login = createAsyncThunk(
    "user/login",
    async ({email,password}, {getState}) => {
        let state = getState() ;
        return fetch(`${user_api}/login`, {
            headers: {
                "Content-Type": "application/json",
                "service-name": "prior-auth",

            },
            body: JSON.stringify({
                email,password
            }),
            method: "post",
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if(json.error){
                    throw(json.error)
                }
                return json
            });
    }
);
export const login_with_token = createAsyncThunk(
    "user/login_with_token",
    async () => {
        return fetch(`${user_api}/user_from_token`, {
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
                return json
            });
    }
);
