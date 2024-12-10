import React from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image-1.png";
import logo from "../assets/logo-login.png";

function Login() {
  const navigate = useNavigate(); // Hook untuk navigasi

  // Periksa apakah user sudah login
  const checkLoginStatus = () => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/dashboard"); // Jika sudah login, langsung arahkan ke dashboard
    }
  };

  // Jalankan saat komponen pertama kali dimuat
  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("isLoggedIn", "true"); // Tandai user sudah login
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-white text-black">
      {/* Bagian Form */}
      <div className="flex flex-col justify-center items-center px-10 md:px-20 w-full md:w-1/2 space-y-8">
        <div>
          <img src={logo} alt="Logo" />
        </div>
        <form className="flex flex-col mt-24 gap-y-5" onSubmit={handleLogin}>
          <input
            className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
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
          <button
            type="submit"
            className="w-full py-3 bg-[#19918F] text-white font-bold text-lg rounded-lg hover:bg-darkcyan/90"
          >
            Login
          </button>
        </form>
        {/* Link Daftar */}
        <p className="text-sm text-black">
          Belum punya akun?{" "}
          <a href="/register" className="text-darkcyan font-bold">
            Daftar di sini
          </a>
        </p>
      </div>
      {/* Bagian Gambar */}
      <div className="hidden md:block w-1/2 h-full">
        <img
          src={image1}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
