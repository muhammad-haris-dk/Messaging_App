import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function Public_Routes() {
  const isloggedin = localStorage.getItem("isloggedin");
  return !isloggedin ? <Outlet /> : <Navigate to="/" />;
}
