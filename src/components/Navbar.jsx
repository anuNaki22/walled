import NavItems from "./NavItems";
import logo from "../assets/logo.svg";
import { useTheme } from "../context/ThemeContext"; // Import ThemeContext
import { Sun, Moon } from "react-feather"; // Import ikon dari React Feather

const MENU = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "Transfer",
    link: "/dashboard/transfer",
  },
  {
    title: "Topup",
    link: "/dashboard/topup",
  },
  {
    title: "Sign Out",
    link: "/",
  },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme(); // Ambil tema & fungsi toggle
  const bgColor = theme === "dark" ? "bg-blue-900" : "bg-white"; // Warna latar navbar

  return (
    <nav
      className={`flex mx-auto justify-between items-center px-8 py-6 ${bgColor}`}
    >
      <img src={logo} alt="walled logo" className="w-32 h-auto" />
      <div className="flex items-center gap-4">
        <NavItems menu={MENU} theme={theme} />
        {/* Ikon Toggle Tema */}
        <div
          className="cursor-pointer p-2 rounded-lg"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="text-yellow-400" size={24} />
          ) : (
            <Moon className="text-gray-600" size={24} />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
