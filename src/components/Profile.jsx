import photoProfile from "../assets/photo-profile.png";
import { useEffect, useState } from "react";
import viewIcon from "../assets/view.png";
import ActionButton from "./ActionButton";
import plusIcon from "../assets/plus.svg";
import sendIcon from "../assets/send.svg";
import { useTheme } from "../context/ThemeContext"; // Import ThemeContext
import clsx from "clsx";

const Profile = () => {
  const { theme } = useTheme(); // Mengambil tema dari konteks
  const [showBalance, setShowBalance] = useState(true);
  const [userData, setUserData] = useState(null); // State untuk menyimpan data user dari db.json
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem("email");

      if (email) {
        try {
          const response = await fetch("http://localhost:3000/users");
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const users = await response.json();
          const user = users.find((user) => user.email === email);

          if (user) {
            setUserData(user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>No user data found</div>;

  const bgPrimary = theme === "dark" ? "bg-blue-900" : "bg-[#19918F]";
  const textPrimary = theme === "dark" ? "text-gray-800" : "text-black";
  const photoBorder = theme === "dark" ? "border-blue-900" : "border-[#19918F]";
  const cardBg =
    theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-black";

  return (
    <div
      className={`w-full relative p-10 h-auto text-left text-base font-open-sans ${textPrimary}`}
    >
      <b className="top-0 left-0 text-5xl">
        Good Morning, {userData?.fullname || "User"}
      </b>
      <div className="top-16 left-0 text-lg pt-5">
        Check all your incoming and outgoing transactions here
      </div>
      <img
        className={`absolute top-5 right-10 w-20 h-20 object-contain rounded-full border-2 border-transparent hover:border-[#19918F] hover:border-8`}
        // className={clsx(
        //   "absolute top-5 right-10 w-20 h-20 object-contain rounded-full border-2 border-transparent hover:border-8",
        //   { [photoBorder]: true }
        // )}
        alt="photo profile"
        src={photoProfile}
      />
      <div className="absolute top-16 right-40 text-right w-40">
        Personal Account
      </div>
      <b className="absolute top-10 right-40 text-right w-40">
        {userData?.email || "User"}
      </b>
      {/* Account Number and Balance */}
      <div className="flex mt-[4.5rem] gap-x-12 text-xl">
        <div className={`${bgPrimary} p-12 rounded-2xl w-1/5 text-white`}>
          <p>Account No.</p>
          <p className="mt-3 font-bold text-2xl">
            {userData?.accountNumber || "N/A"}
          </p>
        </div>
        <div
          className={`${cardBg} p-12 rounded-2xl w-full flex items-center justify-between`}
        >
          <div>
            <p>Balance</p>
            <span className="flex items-center mt-3 gap-x-2">
              <p className="font-bold text-2xl">
                {showBalance
                  ? `Rp ${Number(userData?.balance || 0).toLocaleString(
                      "id-ID"
                    )}`
                  : "Rp ********"}
              </p>
              <img
                src={viewIcon}
                alt="view"
                className="w-8 h-8 object-cover cursor-pointer"
                onClick={() => setShowBalance((prev) => !prev)}
              />
            </span>
          </div>
          <div className="flex gap-x-6">
            <ActionButton>
              <img src={plusIcon} alt="plus icon" className="w-4 h-4" />
            </ActionButton>
            <ActionButton>
              <img src={sendIcon} alt="send icon" className="w-4 h-4" />
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
