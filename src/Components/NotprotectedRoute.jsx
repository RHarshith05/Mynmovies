import React from "react";
import { Navigate } from "react-router-dom";

function NotProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
        return <Navigate to="/Home" />;
    }
    return children;
}

export default NotProtectedRoute;
