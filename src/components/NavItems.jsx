import { Link, useLocation } from "react-router-dom";

function NavItems({ menu }) {
  const location = useLocation(); // Hook untuk mendapatkan path aktif
  const currentPath = location.pathname;

  return (
    <div className="flex gap-x-8">
      {menu.map((item, index) => (
        <Link
          to={item.link} // Gunakan `to` dari react-router-dom
          key={index}
          className={`${
            currentPath === item.link
              ? "text-[#19918F] font-bold"
              : "text-black"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default NavItems;
