import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // Jika pengguna belum login, redirect ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, render komponen anak
  return children;
};

export default ProtectedRoute;
