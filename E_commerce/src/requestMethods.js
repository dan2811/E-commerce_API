import axios from "axios";

const BASE_URL = "https://backendapiecommerce.herokuapp.com/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

axios.defaults.headers.common = {'token': `Bearer ${TOKEN}` };

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

