import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showDefaultNoti = (
  message = "Action Successful",
  type = "success"
) => {
  toast[type](message, {
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    position: "top-right",
    style: {
      top: "-20px", // Adjust the top position
    },
  });
};

export const notifyAndLogError = ({ error, notification, success }) => {
  error && console.error("Caught", error);
  success
    ? showDefaultNoti(success, "success")
    : notification
    ? showDefaultNoti(notification, "error")
    : showDefaultNoti(error, "error");
};
