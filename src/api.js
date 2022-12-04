import axios from "axios";
import { handleNetworkError, isNetworkError } from "./helper";

const MODE = process.env.MODE || "dev"
const SERVER_URL = process.env.SERVER_URL || 'https://unitybackend.up.railway.app'

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