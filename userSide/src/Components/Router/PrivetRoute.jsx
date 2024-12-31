import React from "react";
import useAuth from "../AuthPorvider/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivetRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="h-[80vh] flex justify-center items-center ">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  if (user) return children;

  return <Navigate to={"/login"} state={{ from: location.pathname }} />;
}
