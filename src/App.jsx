import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "./assets/logo.png";
import NavItems from "./components/NavItems";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

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

  const handleClick = (activeTab) => {
    setActiveTab(activeTab);
  };

  return (
    <>
      {/* <nav className="fixed top-0 left-0 flex items-center w-screen justify-between bg-white py-4 px-8 z-50 shadow-md"> */}
      <nav className="flex items-center w-screen justify-between bg-white py-4 px-8">
        <img src={logo} alt="" />
        <div className="flex gap-x-8">
          <NavItems
            menu={menu}
            activeTab={activeTab}
            handleClick={setActiveTab}
          />
        </div>
      </nav>
    </>
  );
}

export default App;
