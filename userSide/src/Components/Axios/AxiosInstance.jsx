import React, { useEffect } from "react";

import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ContextProvider } from "../AuthPorvider/AuthProvider";
import useAuth from "../AuthPorvider/useAuth";

// export default axiosInstance;
const axiosInstance = axios.create({
  baseURL: "https://server-side-mocha-kappa.vercel.app",
  withCredentials: true,
});
export default function useAxiosInstance() {
  // const navigate = useNavigate();
  const { logOut } = useAuth() || {};

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logOut?.()
            .then(() => console.log("Logged out successfully"))
            .catch((e) => console.error("Logout error:", e.message));
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
}
