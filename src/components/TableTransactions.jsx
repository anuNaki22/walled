import React, { useEffect, useState } from "react";

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
    <div className="p-10 overflow-x-auto mt-5 text-black">
      <table className="table-auto w-full text-left border-collapse border border-gray-300">
        <thead className="bg-gray-100">
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
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
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
  );
};

export default TableTransactions;
