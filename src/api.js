import axios from "axios";
import { handleNetworkError, isNetworkError } from "./helper";
import { MODE, SERVER_URL } from './env';

const API_URL = MODE === "dev" ? "http://localhost:2000" : SERVER_URL

export const api = axios.create({
    baseURL: API_URL
})


// this interceptor will handle network related errors
api.interceptors.response.use((response) => response, (error) => {
    // check network error
    if (isNetworkError(error)) {
        return handleNetworkError();
    }
});

export default api;