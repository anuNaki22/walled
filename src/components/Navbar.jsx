import NavItems from "./NavItems";
import logo from "../assets/logo.png";

const MENU = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "Transfer",
    link: "/dashboard/transfer", // Update sesuai nested routes
  },
  {
    title: "Topup",
    link: "/dashboard/topup", // Update sesuai nested routes
  },
  {
    title: "Sign Out",
    link: "/",
  },
];

function Navbar() {
  return (
    <nav className="flex mx-auto w-screen justify-between items-center px-8 py-6 bg-white">
      <img src={logo} alt="walled logo" className="w-20 h-auto" />
      <NavItems menu={MENU} />
    </nav>
  );
}

export default Navbar;
