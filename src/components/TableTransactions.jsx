import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";
import { useNavigate } from "react-router-dom";

const TableTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage

        const response = await fetch(
          "https://walled-api.vercel.app/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Sertakan token di header
            },
          }
        );

        // if (response.status === 200) {
        //   console.log(response.data);
        // }

        // Hapus token jika respons Unauthorized (401)
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const responseData = await response.json();
        // console.log(responseData.data[0]?.recipient_id);
        // console.log(responseData.data.map(transaction => transaction.transaction_id));
        // console.log(responseData.data);

        if (responseData.data[0]?.recipient_id !== "71") console.log("CEK");
        setTransactions(responseData.data); // Ambil data dari response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex items-center text-black">
        <SearchBar />
        <div className="ml-auto flex items-center">
          <div className="flex gap-x-4 items-center mr-10">
            <p className="text-[#737373]">Show</p>
            <select
              name="limit"
              id="limit"
              className="text-[#737373] py-3 px-4 rounded-md border-r-8 border-transparent bg-white shadow-md"
            >
              <option value="10">Limit 10 transactions</option>
              <option value="20">Limit 20 transactions</option>
            </select>
          </div>
          <div className="flex gap-x-2 items-center mr-10">
            <p className="text-[#737373] mr-3">Sort by</p>
            <select
              name="date"
              id="date"
              className="text-[#737373] py-3 px-4 rounded-md border-r-8 border-transparent bg-white shadow-md"
            >
              <option value="date">Date</option>
            </select>
            <select
              name="sortby"
              id="sortby"
              className="text-[#737373] py-3 px-4 rounded-md border-r-8 border-transparent bg-white shadow-md"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pr-10 pl-10 overflow-x-auto text-black">
        <table className="table-auto w-full text-left border-collapse border border-white">
          <thead className="bg-white">
            <tr>
              <th className="px-4 py-2 border border-gray-300">
                Transaction ID
              </th>
              <th className="px-4 py-2 border border-gray-300">Date & Time</th>
              <th className="px-4 py-2 border border-gray-300">Type</th>
              <th className="px-4 py-2 border border-gray-300">Recipient</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr
                  key={transaction.transaction_id}
                  className={`${
                    index % 2 === 1 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 border border-gray-300">
                    {transaction.transaction_id}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(transaction.transaction_date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {transaction.transaction_type}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {transaction.recipient_fullname} (
                    {transaction.recipient_email})
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {transaction.description}
                  </td>
                  {/* <td
                    className={`px-4 py-2 border border-gray-300 font-bold text-green-500`}
                  >
                    + Rp {parseInt(transaction.amount).toLocaleString()}
                  </td> */}
                  <td
                    className={`px-4 py-2 border border-gray-300 font-bold ${
                      transaction.transaction_type === "DEBIT" ||
                      (transaction.transaction_type === "transfer" &&
                        transaction.recipient_walelt_id !== "32")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.transaction_type === "DEBIT" ||
                    (transaction.transaction_type === "transfer" &&
                      transaction.recipient_walelt_id !== "32")
                      ? `- Rp ${parseInt(transaction.amount).toLocaleString()}`
                      : `+ Rp ${parseInt(transaction.amount).toLocaleString()}`}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-2 text-center border border-gray-300"
                >
                  No transactions available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableTransactions;
