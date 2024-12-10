import { useNavigate, useLocation } from "react-router-dom";

function NavItems({ menu, theme }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Menghapus sesi (misalnya token, login status) dari localStorage
    localStorage.removeItem("isLoggedIn");

    // Navigasi ke halaman login
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex gap-x-8">
      {menu.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer ${
            location.pathname === item.link
              ? `${
                  theme === "dark"
                    ? "text-blue-300 font-bold"
                    : "text-[#19918F] font-bold"
                }`
              : `${theme === "dark" ? "text-white" : "text-black"}`
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
