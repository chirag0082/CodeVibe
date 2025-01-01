import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Store/slice/userSlice";

const useSendToUserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const useSendToUserLogin = (errorMessage) => {
    const displayMessage = errorMessage?.trim()
      ? errorMessage
      : "Token Expired. Please Login Again";

    message.warning(displayMessage);
    dispatch(logout());
    navigate("/login");
  };

  return useSendToUserLogin;
};

export default useSendToUserLogin;
