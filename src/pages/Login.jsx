import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import image1 from "../assets/image-1.png";
import logo from "../assets/logo-login.png";
import ActionButton from "../components/ActionButton";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Untuk menangani kondisi loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Periksa apakah user sudah login
  const checkLoginStatus = () => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard"); // Arahkan langsung ke dashboard
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Jalankan pengecekan saat komponen pertama kali dimuat
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault(); // Mencegah reload halaman
    if (!email || !password) {
      alert("Email dan Password harus diisi!");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Kirim data ke API
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      const { accessToken, user } = response.data;

      // Simpan token dan data user ke localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("email", user.email);
      localStorage.setItem("fullname", user.fullName);
      localStorage.setItem("balance", user.balance);

      alert("Login berhasil!");
      navigate("/dashboard"); // Arahkan ke halaman dashboard
    } catch (error) {
      // Tangani error dari backend
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "Login gagal. Coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Mengikat nilai email
          />
          <input
            className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Mengikat nilai password
          />
          {/* Mengganti tombol submit dengan ActionButton */}
          <ActionButton
            type="submit"
            disabled={isLoading} // Tombol nonaktif saat sedang memuat
          >
            {isLoading ? "Loading..." : "Login"}
          </ActionButton>
        </form>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
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
