import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image-1.png";
import logo from "../assets/logo-login.png";

function Login() {
  const navigate = useNavigate();

  // Periksa apakah user sudah login
  const checkLoginStatus = () => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/dashboard"); // Arahkan langsung ke dashboard
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Jalankan pengecekan saat komponen pertama kali dimuat
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value; // Ambil nilai email dari formulir
    const password = event.target.password.value; // Ambil nilai password dari formulir

    // Validasi sederhana jika input kosong
    if (!email || !password) {
      alert("Email dan Password harus diisi!");
      return;
    }

    // Simpan status login ke localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email); // Simpan email untuk kebutuhan dashboard atau profil

    // Arahkan ke halaman dashboard
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
            className="w-full py-3 bg-[#19918F] text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-[#00FFFF] transition-all duration-200"
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
