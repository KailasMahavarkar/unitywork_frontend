import axios from "axios";
import env from './env.js';
import customToast from "./toast";


export const api = axios.create({
    baseURL: env.SERVER_URL
})


// this interceptor will handle network related errors
api.interceptors.response.use(
    (response) => response, (error) => {
        const networkErrorFlag = !!error.isAxiosError && !error.response;

        // check network error
        if (networkErrorFlag) {
            if (!window.navigator.onLine) {
                // internet is not working
                return customToast({
                    message: "Internet connection is not available",
                    icon: "error",
                });
            }

            return customToast({
                message: "Server is not available",
                icon: "error",
            });
        }


        return Promise.reject(error);

    });

export default api;