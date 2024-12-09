import image1 from "../assets/image-1.png";
import logo from "../assets/logo-login.png";

function Register() {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-white">
      {/* Bagian Form */}
      <div className="flex flex-col justify-center items-start px-10 md:px-20 w-full md:w-1/2 space-y-6">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="justify-center" />
          <h1 className="text-4xl font-lexend font-bold">Register</h1>
        </div>
        <form className="w-full space-y-4">
          {/* Input Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Masukkan email Anda"
              className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-slate-400 bg-[#FAFBFD]"
              required
            />
          </div>
          {/* Input Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Masukkan password Anda"
              className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-slate-400 bg-[#FAFBFD]"
              required
            />
          </div>
          {/* Button Register */}
          <button
            type="submit"
            className="w-full py-3 bg-[#19918F] text-white font-bold text-lg rounded-lg hover:bg-darkcyan/90"
          >
            Register
          </button>
        </form>
        {/* Link Daftar */}
        <p className="text-sm text-gray-600">
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
          alt="Register Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Register;
