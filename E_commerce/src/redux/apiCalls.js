import {
    useDispatch as dispatch
} from "react-redux";
import {
    publicRequest
} from "../requestMethods";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailure
} from "./userSlice";
import {
    newCartStart,
    newCartSuccess,
    newCartFailure
} from "./cartRedux.js";


export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await publicRequest.post("auth/register", user);
        dispatch(registerSuccess(res.data));
    } catch (err) {
        dispatch(registerFailure());
    }
};

export const newCart = async (dispatch, cart) => {
    dispatch(newCartStart());
    try {
        const res = await publicRequest.post("carts/",  cart);
        dispatch(newCartSuccess(res.data));
    } catch (err) {
        dispatch(newCartFailure());
    }
}