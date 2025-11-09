import React, { useEffect, useState } from "react";
import { fetchExpenses } from "../api";
import dayjs from "dayjs";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const MEMBERS = [
  { id: 1, name: "Sourav" },
  { id: 2, name: "Sourik" },
  { id: 3, name: "Kousik" },
];

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    load();
    // refresh every 10s to approximate real-time (optional)
    const t = setInterval(load, 10000);
    return () => clearInterval(t);
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchExpenses();
      // If backend returns nested, adjust here.
      setExpenses(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const spentBy = (id) =>
    expenses
      .filter((e) => Number(e.addedBy) === id)
      .reduce((s, e) => s + Number(e.amount || 0), 0);

  return (
    <div className="max-w-md mx-auto pb-28">
      {/* Individual spent */}
      <div className="rounded-xl bg-gray-600 p-4 mb-4">
        <h2 className="text-2xl text-center font-bold mb-4">Contributions</h2>
        {MEMBERS.map((m) => (
          <div
            key={m.id}
            className="flex justify-between py-4 border-b last:border-b-0"
          >
            <div className="text-lg">{m.name}</div>
            <div className="text-lg">{spentBy(m.id).toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Expenses list */}
      <div className="rounded-xl bg-gray-600 p-4 mb-48">
        <h2 className="text-2xl text-center font-bold mb-4">Expenses</h2>
        {loading && <div className="text-center mb-4">Loading...</div>}
        {!loading && expenses.length === 0 && (
          <div className="text-center text-gray-300">No expenses yet</div>
        )}
        <div className="space-y-3">
          {expenses
            .slice()
            .reverse()
            .map((exp) => (
              <div
                key={exp.id || Math.random()}
                className="bg-gray-700 rounded-lg p-3 flex"
              >
                <div className="flex-1">
                  <div className="text-sm text-gray-300">
                    {dayjs(exp.createdAt || exp.date || new Date()).format(
                      "DD MMM YYYY, hh:mm A"
                    )}
                  </div>
                  <div className="text-lg font-medium mt-1">{exp.note}</div>
                  <div className="text-sm text-pink-300 mt-1">
                    {exp.expenseType || "Other"}
                  </div>
                  <div className="flex mt-2 text-sm">
                    <div className="mr-4">
                      By:{" "}
                      {MEMBERS.find((m) => Number(m.id) === Number(exp.addedBy))
                        ?.name || exp.addedBy}
                    </div>
                    <div>Mode: {exp.paymentType}</div>
                  </div>
                </div>
                <div className="ml-3 flex items-center">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-semibold">
                    ₹{Number(exp.amount).toFixed(0)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom summary (floating above the bottom bar) */}
      
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto flex px-4">
        <button
          disabled={true}
          onClick={""}
          className="w-1/2 bg-yellow-400 p-4 text-black text-medium font-semibold rounded-l-xl"
        >
          Total: ₹{totalAmount.toFixed(2)}
        </button>
        <button
          disabled={false}
          onClick={() => navigate("/add")}
          className="w-1/2 bg-red-500 p-4 text-white text-medium font-semibold rounded-r-xl"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}
