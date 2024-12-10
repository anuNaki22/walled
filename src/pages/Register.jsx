import { useNavigate } from "react-router-dom";
import image1 from "../assets/image-1.png";
import logo from "../assets/logo-login.png";
import ActionButton from "../components/ActionButton";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault(); // Mencegah reload halaman
    // Anda bisa menambahkan validasi form di sini jika diperlukan
    navigate("/login"); // Arahkan ke halaman login
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-white text-black">
      {/* Bagian Form */}
      <div className="flex flex-col justify-center items-center px-10 md:px-20 w-full md:w-1/2 space-y-8">
        <div>
          <img src={logo} alt="Logo" />
        </div>
        <form className="flex flex-col mt-24 gap-y-5" onSubmit={handleRegister}>
          <input
            className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
            id="fullname"
            name="fullname"
            type="text"
            placeholder="Nama Lengkap"
          />
          <input
            className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <input
            className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
            id="phonenumber"
            name="phonenumber"
            type="tel"
            placeholder="No HP"
          />
          {/* Mengganti tombol dengan ActionButton */}
          <ActionButton onClick={handleRegister}>Daftar</ActionButton>
        </form>
        {/* Link Daftar */}
        <p className="text-sm text-black">
          Sudah punya akun?{" "}
          <a href="/login" className="text-darkcyan font-bold">
            Login di sini
          </a>
        </p>
      </div>
      {/* Bagian Gambar */}
      <div className="hidden md:block w-1/2 h-full">
        <img
          src={image1}
          alt="Register Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Register;
