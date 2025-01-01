import { useState, useCallback } from "react";
import axios from "axios";
import useSendToAdminLogin from "./useSendToAdminLogin";
import useSendToUserLogin from "./useSendToUserLogin";

const useApiRequest = () => {
  const sendToAdminLogin = useSendToAdminLogin();
  const sendToUserLogin = useSendToUserLogin();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = useCallback(
    async (options) => {
      const {
        url,
        method = "GET",
        data,
        params,
        headers = {},
        isForUser = false,
      } = options;

      const config = {
        method,
        url,
        ...(data && { data }),
        ...(params && { params }),
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };

      setLoading(true);
      setError(null);

      try {
        const response = await axios(config);
        return response.data;
      } catch (err) {
        console.error("Error with API request:", err);

        const errorMessage =
          err.response?.data?.message || "An error occurred. Please try again.";
        console.error("errorMessage::: ", errorMessage);
        setError(errorMessage);

        if (err.response?.status === 401) {
          // Handle unauthorized access
          isForUser
            ? sendToUserLogin(errorMessage)
            : sendToAdminLogin(errorMessage);
        }

        // Set error message

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [sendToAdminLogin, sendToUserLogin]
  );

  return { loading, error, makeRequest };
};

export default useApiRequest;
