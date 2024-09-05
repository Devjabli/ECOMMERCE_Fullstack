import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoutes() {
  const { userInfo } = useSelector((state) => state.authUser);
  const location = useLocation();
  return userInfo && userInfo.email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ prev: location }} replace />
  );
}

export default PrivateRoutes;
