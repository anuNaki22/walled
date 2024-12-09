import photoProfile from "../assets/photo-profile.png";

const Profile = () => {
  return (
    <div className="w-full relative p-10 h-auto text-left text-base text-black font-open-sans">
      <b className="top-0 left-0 text-4xl">Good Morning, Chelsea</b>
      <div className="top-16 left-0 text-lg">
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
    </div>
  );
};

export default Profile;
