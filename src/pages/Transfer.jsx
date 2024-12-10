import { useState, useEffect } from "react";
import ActionButton from "../components/ActionButton";

function Transfer() {
  const [amount, setAmount] = useState(0);
  const [isBalanceLacking, setIsBalanceLacking] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Ambil data user dari db.json saat pertama kali
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        // Anggap kita menggunakan akun pertama di db.json sebagai pengguna aktif
        setCurrentUser(data.users[0]);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleTransfer = async () => {
    if (!currentUser) return;

    const url = `http://localhost:3000/users/${currentUser.id}`;

    try {
      const newBalance = Number(currentUser.balance) - amount;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ balance: newBalance.toString() }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Transfer berhasil:", updatedUser);
        alert("Transfer berhasil!");
        setCurrentUser(updatedUser);
      } else {
        alert("Gagal melakukan transfer.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan transfer:", error);
    }
  };

  const handleSubmit = () => {
    if (!currentUser) return;

    if (currentUser.balance < amount) {
      setIsBalanceLacking(true);
    } else {
      setIsBalanceLacking(false);
      handleTransfer();
    }
  };

  return (
    <section className="w-full px-16 pt-12 bg-[#fafbfd] text-black">
      <div className="w-1/2 mx-auto">
        <h1 className="font-bold text-5xl">Transfer</h1>
        <div className="mt-6 shadow-[0_0_10px_0_rgba(91,91,91,0.1)] bg-white py-[56px] px-[56px] rounded-[20px]">
          <div
            className="w-full flex shadow-[0_0_10px0_rgba(91, 91, 91, 0.1)];
"
          >
            <button className="absolute z-50 py-4 px-8 bg-[#EDEDED] rounded-[20px] font-bold text-2xl">
              <label htmlFor="to">To</label>
            </button>
            <select
              name="to"
              id="to"
              className="relative w-full bg-[#FAFBFD] text-[#737373] py-5 pr-4 pl-8 ml-[70px] rounded-[10px] border-r-8 border-transparent outline-none"
            >
              <option value="900782139">900782139 (Giz)</option>
            </select>
          </div>
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
          <p className="mt-2.5 text-[#26AA99] font-semibold">
            Balance: IDR{" "}
            {new Intl.NumberFormat("id-ID").format(currentUser?.balance)}
          </p>
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
            <ActionButton onClick={handleSubmit}>Transfer</ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transfer;
