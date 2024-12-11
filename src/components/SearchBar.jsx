import React from "react";
import { useState } from "react";
import { Search } from "react-feather";

const Searchbar = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="p-10 w-96 relative">
      <div className="absolute top-[50%] transform translate-y-[-50%] left-12 text-gray-400">
        <Search />
      </div>
      <input
        type="text"
        className="w-full sm:flex-1 px-12 py-2 placeholder-gray-400 bg-white rounded-md font-medium border focus:outline-none focus:ring-[#2ED4BF] text-gray-950 focus:border-[#2ED4BF]"
        placeholder="Search..."
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        onChange={(event) => {}}
      />
    </div>
  );
};

export default Searchbar;
