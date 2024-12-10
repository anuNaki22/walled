import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image-1.png";
import logo from "../assets/logo-login.png";
import ActionButton from "../components/ActionButton";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Untuk menangani kondisi loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Periksa apakah user sudah login
  const checkLoginStatus = () => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/dashboard"); // Arahkan langsung ke dashboard
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Jalankan pengecekan saat komponen pertama kali dimuat
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email dan Password harus diisi!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }
      const users = await response.json();

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", user.email);
        localStorage.setItem("fullname", user.fullname);
        localStorage.setItem("accountNumber", user.accountNumber);
        localStorage.setItem("balance", user.balance);

        navigate("/dashboard");
      } else {
        alert("Email atau password salah!");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat memuat data pengguna.");
      console.error(error);
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
        <form className="flex flex-col mt-24 gap-y-5">
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
            onClick={handleLogin}
            disabled={isLoading} // Tombol nonaktif saat sedang memuat
          >
            {isLoading ? "Loading..." : "Login"}
          </ActionButton>
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
