import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";

const TableTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Ambil transaksi pengguna tertentu (misal berdasarkan email dari localStorage)
        const userEmail = localStorage.getItem("email");
        const user = data.find((user) => user.email === userEmail);

        if (user && user.transactions) {
          setTransactions(user.transactions);
        } else {
          setTransactions([]);
        }
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
        {/* <div className="ml-auto flex items-center">
          <span className="text-gray-700">Show</span>
          <FilterButton />
        </div> */}
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
              <th className="px-4 py-2 border border-gray-300">Date & Time</th>
              <th className="px-4 py-2 border border-gray-300">Type</th>
              <th className="px-4 py-2 border border-gray-300">From / To</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 1 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 border border-gray-300">
                    {transaction.dateTime}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {transaction.type}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {transaction.fromTo}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {transaction.description}
                  </td>
                  <td
                    className={`px-4 py-2 border border-gray-300 font-bold ${
                      transaction.type === "DEBIT"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.type === "DEBIT"
                      ? `- Rp ${parseInt(transaction.amount).toLocaleString()}`
                      : `+ Rp ${parseInt(transaction.amount).toLocaleString()}`}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
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
