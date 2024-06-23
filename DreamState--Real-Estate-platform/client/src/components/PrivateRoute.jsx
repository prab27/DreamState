import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  // this return the child route (Outlet) if user logged-in otherwise navigate to sign-in
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
