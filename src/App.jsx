import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "./assets/logo.png";
import NavItems from "./components/NavItems";

function App() {
  const menu = [
    {
      title: "Dashboard",
      link: "#",
    },
    {
      title: "Transfer",
      link: "#",
    },
    {
      title: "Topup",
      link: "#",
    },
    {
      title: "Sign Out",
      link: "#",
    },
  ];

  return (
    <>
      <nav className="flex items-center w-screen justify-between bg-white py-4 px-8">
        <img src={logo} alt="" />
        <div className="flex gap-x-8">
          <NavItems menu={menu} />
        </div>
      </nav>
    </>
  );
}

export default App;
