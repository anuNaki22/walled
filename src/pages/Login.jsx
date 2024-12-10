import { useNavigate } from "react-router-dom";
import image1 from "../assets/image-1.png";
import logo from "../assets/logo-login.png";

function Login() {
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleLogin = (event) => {
    event.preventDefault(); // Mencegah reload halaman
    navigate("/dashboard"); // Mengarahkan ke halaman dashboard
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-white">
      {/* Bagian Form */}
      <div className="flex flex-col justify-center items-center px-10 md:px-20 w-full md:w-1/2 space-y-8">
        <div>
          <img src={logo} alt="Logo" />
        </div>
        <form className="w-full space-y-6" onSubmit={handleLogin}>
          {/* Input Email dengan Floating Label */}
          <div className="relative w-full">
            <input
              id="email"
              type="email"
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-lg bg-[#FAFBFD] text-black focus:ring-2 focus:ring-slate-400 focus:outline-none"
              required
            />
            <label
              htmlFor="email"
              className="absolute text-black font-semibold left-3 top-1/2 transform -translate-y-1/2 scale-100 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-2 peer-focus:scale-90 peer-focus:text-black peer-valid:top-2 peer-valid:scale-90 peer-valid:text-black"
            >
              Email
            </label>
          </div>
          {/* Input Password dengan Floating Label */}
          <div className="relative w-full">
            <input
              id="password"
              type="password"
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-lg bg-[#FAFBFD] text-black focus:ring-2 focus:ring-slate-400 focus:outline-none"
              required
            />
            <label
              htmlFor="password"
              className="absolute text-black font-semibold left-3 top-1/2 transform -translate-y-1/2 scale-100 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-2 peer-focus:scale-90 peer-focus:text-black peer-valid:top-2 peer-valid:scale-90 peer-valid:text-black"
            >
              Password
            </label>
          </div>
          {/* Button Login */}
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
