import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // to avoid render issues

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Check if the token exists
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Prevents showing content before login state is checked
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login if not logged in
  }

  return children; // Render the protected children if logged in
};

export default ProtectedRoute;
