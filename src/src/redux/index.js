
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlice} from "./user/slice"
import { homeSlice} from "./home/slice"
import {bikeSlice} from "./bikes/slice";
import {manageUsersSlice} from "./manage_users/slice";
const middleware = [
    ...getDefaultMiddleware()
];
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        home: homeSlice.reducer,
        bikes: bikeSlice.reducer,
        manage_users: manageUsersSlice.reducer,
    },
    middleware,
});
export default store;
