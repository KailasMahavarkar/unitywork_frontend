import Swal from "sweetalert2";


// REFERENCE TOAST OBJECT
// toastType: {
// 	message?: string;
// 	position?: SweetAlertPosition;
// 	icon?: SweetAlertIcon;
// 	timer?: number;
// }
const customToast = (toast) => {
    let timer = toast.timer || 2000;
    let position = toast.position || "top-end";
    let icon = toast.icon || "success";
    let message = toast.message || "Success";

    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    Toast.fire({
        icon: icon,
        title: message,
    });
};

export const networkDownToast = () => {
    customToast({
        message: "Network down",
        position: "top-right",
        icon: "error",
        timer: 3000,
    });
};

export const serverDownToast = () => {
    customToast({
        message: "Network error",
        position: "top-right",
        icon: "error",
        timer: 3000,
    });
};


export const toast = {
    networkDownToast,
    serverDownToast,
};

export default customToast;
