import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function Private_Routes() {
//   const isloggedin = useSelector((state) => state.todo.isloggedin);
    const isloggedin = localStorage.getItem("isloggedin")
  return isloggedin ? <Outlet /> : <Navigate to="/login" />;
}
