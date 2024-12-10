import { useNavigate, useLocation } from "react-router-dom";

function NavItems({ menu }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Menghapus sesi (misalnya token, login status) dari localStorage
    localStorage.removeItem("isLoggedIn");

    // Navigasi ke halaman login
    navigate("/login", { replace: true }); // Menggunakan `{ replace: true }` agar pengguna tidak bisa kembali dengan tombol Back
  };

  return (
    <div className="flex gap-x-8">
      {menu.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer ${
            location.pathname === item.link
              ? "text-[#19918F] font-bold"
              : "text-black"
          }`}
          onClick={
            item.title === "Sign Out" ? handleLogout : () => navigate(item.link)
          }
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default NavItems;
