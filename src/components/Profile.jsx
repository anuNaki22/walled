import photoProfile from "../assets/photo-profile.png";
import { useState } from "react";
import viewIcon from "../assets/view.png";
import sentIcon from "../assets/icon-sent.png";
import addIcon from "../assets/icon-add.png";

const Profile = () => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="w-full relative p-10 h-auto text-left text-base text-black font-open-sans">
      <b className="top-0 left-0 text-5xl">Good Morning, Chelsea</b>
      <div className="top-16 left-0 text-lg pt-5">
        Check all your incoming and outgoing transactions here
      </div>
      <img
        className="absolute top-5 right-10 w-20 h-20 object-contain rounded-full border-2 border-transparent hover:border-[#19918F] hover:border-8"
        alt="photo profile"
        src={photoProfile}
      />
      <div className="absolute top-16 right-40 text-right w-40">
        Personal Account
      </div>
      <b className="absolute top-10 right-40 text-right w-40">
        Chelsea Immanuela
      </b>
      {/* Account Number and Balance */}
      <div className="flex mt-[4.5rem] gap-x-12 text-2xl">
        <div className="bg-[#19918F] p-12 rounded-2xl w-1/5 text-white">
          <p>Account No.</p>
          <p className="mt-3 font-bold">100899</p>
        </div>
        <div className="bg-white p-12 rounded-2xl w-full text-black flex items-center justify-between">
          <div>
            <p>Balance</p>
            <span className="flex items-center mt-3 gap-x-2">
              <p className="font-bold">
                {showBalance ? "Rp10.000.000,00" : "Rp ********"}
              </p>
              <img
                src={viewIcon}
                alt="view"
                className="w-8 h-8 object-cover cursor-pointer"
                onClick={() => setShowBalance((prev) => !prev)}
              />
            </span>
          </div>
          <div className="flex gap-x-2">
            <img src={addIcon} alt="add" className="w-12 h-12 cursor-pointer" />
            <img
              src={sentIcon}
              alt="sent"
              className="w-12 h-12 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
