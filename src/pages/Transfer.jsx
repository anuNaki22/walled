import { useState, useEffect } from "react";
import ActionButton from "../components/ActionButton";

function Transfer() {
  const [amount, setAmount] = useState(0);
  const [isBalanceLacking, setIsBalanceLacking] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [recipientWalletId, setRecipientWalletId] = useState(""); // Start with an empty value
  const [loading, setLoading] = useState(true);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

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
            throw new Error("Failed to fetch user data.");
          }

          const data = await response.json();
          setCurrentUser(data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
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

  const handleTransfer = async () => {
    if (!currentUser || !recipientWalletId) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://walled-api.vercel.app/transactions/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: amount,
            recipientWalletId: recipientWalletId,
            description: "Transfer payment",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Transfer failed.");
      }

      const result = await response.json();
      console.log("Transfer successful:", result);
      alert("Transfer successful!");

      // Update the user's balance after the transfer
      setCurrentUser((prevState) => ({
        ...prevState,
        wallet: {
          ...prevState.wallet,
          balance: prevState.wallet.balance - amount,
        },
      }));
    } catch (error) {
      console.error("Error during transfer:", error);
      alert("An error occurred during the transfer.");
    }
  };

  const handleSubmit = () => {
    // console.log("Recipient Wallet ID:", recipientWalletId);
    if (!currentUser) return;

    if (currentUser.wallet.balance < amount) {
      setIsBalanceLacking(true);
    } else {
      setIsBalanceLacking(false);
      handleTransfer();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="w-full px-16 pt-12 bg-[#fafbfd] text-black">
      <div className="w-1/2 mx-auto">
        <h1 className="font-bold text-5xl">Transfer</h1>
        <div className="mt-6 shadow-[0_0_10px_0_rgba(91,91,91,0.1)] bg-white py-[56px] px-[56px] rounded-[20px]">
          <div className="w-full flex shadow-[0_0_10px0_rgba(91, 91, 91, 0.1)]">
            <button className="absolute z-50 py-4 px-8 bg-[#EDEDED] rounded-[20px] font-bold text-2xl">
              <label htmlFor="to">To</label>
            </button>
            <select
              name="to"
              id="to"
              className="relative w-full bg-[#FAFBFD] text-[#737373] py-5 pr-4 pl-8 ml-[70px] rounded-[10px] border-r-8 border-transparent outline-none"
              value={recipientWalletId}
              onChange={(e) => {
                console.log("Selected recipientWalletId:", e.target.value);
                setRecipientWalletId(e.target.value);
              }}
            >
              <option value="123000001">123000001 (Mas Giz)</option>
              <option value="123000002">123000002 (Rahmat)</option>
              <option value="123000003">123000003 (Baetris)</option>
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
            {new Intl.NumberFormat("id-ID").format(
              currentUser?.wallet?.balance
            )}
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
            <p className="mt-2 text-red-500">Sorry, insufficient balance</p>
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
