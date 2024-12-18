import { useState, useEffect } from "react";
import ActionButton from "../components/ActionButton";

function Topup() {
  const [amount, setAmount] = useState(0);
  const [isBalanceLacking, setIsBalanceLacking] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data user dari API saat pertama kali
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage

      if (token) {
        try {
          const response = await fetch(
            "https://walled-api.vercel.app/profile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Gagal mengambil data pengguna");
          }

          const data = await response.json();
          setCurrentUser(data.data); // Menyimpan data pengguna ke state
        } catch (error) {
          console.error("Gagal mengambil data pengguna:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleTopup = async () => {
    if (!currentUser) return;

    const token = localStorage.getItem("token"); // Ambil token dari localStorage

    try {
      const response = await fetch(
        "https://walled-api.vercel.app/transactions/topup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Menambahkan Bearer Token di header
          },
          body: JSON.stringify({
            amount: amount,
            description: "Top-up balance",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal melakukan top-up.");
      }

      const result = await response.json();
      console.log("Top-up berhasil:", result);
      alert("Top-up berhasil!");

      // Perbarui saldo pengguna setelah top-up
      setCurrentUser((prevState) => ({
        ...prevState,
        wallet: {
          ...prevState.wallet,
          balance: prevState.wallet.balance + amount,
        },
      }));
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan top-up:", error);
    }
  };

  const handleSubmit = () => {
    if (!currentUser) return;

    if (currentUser.wallet.balance < amount) {
      setIsBalanceLacking(true);
    } else {
      setIsBalanceLacking(false);
      handleTopup();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="w-full px-16 pt-12 bg-[#fafbfd] text-black">
      <div className="w-1/2 mx-auto">
        <h1 className="font-bold text-5xl">Topup</h1>
        <div className="mt-6 shadow-[0_0_10px_0_rgba(91,91,91,0.1)] bg-white py-[56px] px-[56px] rounded-[20px]">
          <div className="pt-5 px-8 pb-9 mt-7 bg-[#FAFBFD] rounded-[20px]">
            <h2 className="font-semibold">Amount</h2>
            <span className="font-semibold">IDR</span>
            <input
              name="amount"
              type="number"
              onChange={handleAmountChange}
              className="bg-[#FAFBFD] outline-none ml-2 mt-2 font-semibold"
            />
          </div>

          <div className="w-full flex shadow-[0_0_10px0_rgba(91, 91, 91, 0.1)];">
            <button className="absolute z-50 py-4 px-8 bg-[#EDEDED] rounded-[20px] font-bold text-2xl">
              <label htmlFor="to">From</label>
            </button>
            <select
              name="to"
              id="to"
              className="relative w-full bg-[#FAFBFD] text-[#737373] py-5 pr-4 pl-8 ml-[100px] rounded-[10px] border-r-8 border-transparent outline-none"
            >
              <option value="900782139">BYOND</option>
              <option value="900782139">BSI Mobile</option>
              <option value="900782139">Credit Card</option>
            </select>
          </div>

          <div className="py-4 px-8 mt-7 bg-[#FAFBFD] rounded-[20px]">
            <label htmlFor="notes" className="font-semibold">
              Notes:
            </label>
            <input
              name="notes"
              type="text"
              className="bg-[#fafbfd] outline-none ml-2"
            />
          </div>
          {isBalanceLacking && (
            <p className="mt-2 text-red-500">Maaf, saldo Anda kurang</p>
          )}
          <div className="flex flex-col mt-[60px]">
            <ActionButton onClick={handleSubmit}>Topup</ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Topup;
