import customToast from "./toast";

export function isNetworkError(err) {
    return !!err.isAxiosError && !err.response;
}


export const handleNetworkError = () => {
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
};


export const isEmpty = (arg) => {
    if (arg == null) {
        return true;
    } else if (typeof arg === "undefined") {
        return true;
    } else if (arg.length === 0) {
        return true;
    } else if (typeof arg === "object" && Object.keys(arg).length === 0) {
        return true;
    }
    return false;
};

let b64DecodeUnicode = str =>
    decodeURIComponent(
        Array.prototype.map.call(atob(str), c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''))

export let parseJwt = token =>
    JSON.parse(
        b64DecodeUnicode(
            token.split('.')[1].replace('-', '+').replace('_', '/')
        )
    )


export const handleCustomError = (error) => {
    const errorData = error.response?.data;

    if (errorData.errors) {
        // this part handles AJV errors
        return customToast({
            title: "Error",
            message:
                errorData.errors[0].key +
                " " +
                errorData.errors[0].message,
            icon: "error",
            duration: 3000,
        });
    } else if (errorData.msg) {

        // this part handles custom errors
        return customToast({
            title: "Error",
            message: errorData.msg,
            icon: "error",
            duration: 3000,
        });
    }
}
