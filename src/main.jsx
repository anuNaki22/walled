import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Tambahkan Navigate
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import App from "./App.jsx";
import Transfer from "./pages/Transfer.jsx";
import Topup from "./pages/Topup.jsx";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Rute publik */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Rute terproteksi */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<App />} />{" "}
            {/* Default content untuk /dashboard */}
            <Route
              path="transfer"
              element={
                <ProtectedRoute>
                  <Transfer />
                </ProtectedRoute>
              }
            />
            <Route
              path="topup"
              element={
                <ProtectedRoute>
                  <Topup />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* Redirect jika halaman tidak ditemukan */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
