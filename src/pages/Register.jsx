import { useNavigate } from "react-router-dom";
import axios from "axios"; // Tambahkan import axios
import image1 from "../assets/image-1.png";
import logo from "../assets/logo-login.png";
import ActionButton from "../components/ActionButton";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil data dari form
    const fullname = event.target.fullname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const phonenumber = event.target.phonenumber.value;

    try {
      // Kirim data ke backend menggunakan Axios
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          fullName: fullname,
          email,
          password,
          phonenumber,
        }
      );

      // Jika sukses, tampilkan pesan dan arahkan ke halaman login
      alert("Pendaftaran berhasil! Silakan login.");
      navigate("/login");
    } catch (error) {
      // Tampilkan pesan error jika terjadi kesalahan
      if (error.response) {
        alert(`Pendaftaran gagal: ${error.response.data.message}`);
      } else {
        alert("Pendaftaran gagal. Silakan coba lagi.");
      }
    }
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
            required
          />
          <input
            className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <input
            className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
            id="phonenumber"
            name="phonenumber"
            type="tel"
            placeholder="No HP"
            required
          />
          {/* Mengganti tombol dengan ActionButton */}
          <ActionButton type="submit">Daftar</ActionButton>
        </form>
        {/* Link Login */}
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
