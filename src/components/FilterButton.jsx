import React, { useState } from "react";
import { ChevronDown } from "react-feather";

const FilterButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="p-10 w-96 relative text-black">
      {/* Dropdown Button */}
      <div
        className="relative cursor-pointer flex items-center justify-between px-4 py-2 bg-[#fff] rounded-md font-medium border border-gray-400 text-gray-700 focus:outline-none focus:ring-[#2ED4BF] focus:border-[#2ED4BF]"
        onClick={toggleDropdown}
      >
        <span>Filter Options</span>
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Last 10 Transactions
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Last 30 Transactions
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Last 60 Transactions
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
