import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function DashboardLayout() {
  return (
    <div>
      <Navbar /> {/* Navbar tampil di semua halaman di bawah /dashboard */}
      <div className="p-4">
        <Outlet /> {/* Tempat untuk menampilkan konten dari child route */}
      </div>
    </div>
  );
}

export default DashboardLayout;
