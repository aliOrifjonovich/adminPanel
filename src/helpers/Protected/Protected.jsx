import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ isProtected, children }) {
  if (isProtected) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default Protected;
