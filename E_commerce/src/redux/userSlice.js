import {
    createSlice
} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        userLastSavedCart: null,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logOut: (state) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = null;
        },
        registerStart: (state) => {
            state.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        registerFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logOut,
    registerStart,
    registerSuccess,
    registerFailure
} = userSlice.actions;

export default userSlice.reducer;