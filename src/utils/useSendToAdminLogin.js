import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Store/slice/adminSlice";

const useSendToAdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendToAdminLogin = (errorMessage) => {
    const displayMessage = errorMessage?.trim()
      ? errorMessage
      : "Token Expired. Please Login Again";

    message.warning(displayMessage);
    dispatch(logout());
    navigate("/admin-login");
  };

  return sendToAdminLogin;
};

export default useSendToAdminLogin;
