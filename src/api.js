import axios from "axios";
import { handleNetworkError, isNetworkError } from "./helper";

export const api = axios.create({
    baseURL: 'http://localhost:2000'
})


// this interceptor will handle network related errors
api.interceptors.response.use((response) => response, (error) => {
    // check network error
    if (isNetworkError(error)){
        return handleNetworkError();
    }
});

export default api;