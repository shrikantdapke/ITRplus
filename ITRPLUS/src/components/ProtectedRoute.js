// src/components/ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute will either render the component or redirect the user to the login page if not logged in
function ProtectedRoute({ user, children }) {
  // Check if the user is logged in
  if (!user) {
    // If the user is not logged in, redirect them to the login page
    return <Navigate to="/login" />;
  }

  // If the user is logged in, allow access to the protected route
  return <>{children}</>;
}

export default ProtectedRoute;
