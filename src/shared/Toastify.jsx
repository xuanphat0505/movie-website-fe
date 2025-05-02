import { toast } from "react-toastify";

export const toastSuccess = (message) => {
  return toast.success(message, {
    autoClose: 2000,
    pauseOnHover: false,
    position: "bottom-right",
    className:"custom-toast"
  });
};
export const toastWarn = (message) => {
  return toast.warn(message, {
    autoClose: 2000,
    pauseOnHover: false,
    position: "bottom-right",
    className:"custom-toast"
  });
};
export const toastError = (message) => {
  return toast.error(message, {
    autoClose: 2000,
    pauseOnHover: false,
    position: "bottom-right",
    className:"custom-toast"
  });
};
