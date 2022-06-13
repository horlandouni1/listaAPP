import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AppContext from "../../context/AppContext";

const PrivateRoute = () => {
  const { state } = useContext(AppContext);

  return state.auth ? <Outlet /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;
