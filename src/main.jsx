import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import App from "./App.jsx";
import Transfer from "./pages/Transfer.jsx";
import Topup from "./pages/Topup.jsx";
import Register from "./pages/Register.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route untuk Login */}
        {/* Tetap sebagai rute default */}
        <Route index element={<Login />} />
        {/* Login diakses via /login */}
        <Route path="/login" element={<Login />} /> {/* Route untuk Register */}
        <Route path="/register" element={<Register />} />
        {/* Dashboard Layout dengan Sub-routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<App />} />{" "}
          {/* Default content untuk /dashboard */}
          <Route path="transfer" element={<Transfer />} />{" "}
          {/* /dashboard/transfer */}
          <Route path="topup" element={<Topup />} /> {/* /dashboard/topup */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
