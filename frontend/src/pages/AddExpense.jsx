import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../api";
import dayjs from "dayjs";

const MEMBERS = [
  { id: 1, name: "Sourav" },
  { id: 2, name: "Sourik" },
  { id: 3, name: "Kousik" },
];

const CATEGORIES = ["Grocery", "Travel", "Food", "Shopping", "Other"];
const PAYMENT_MODES = ["Cash", "UPI", "Card"];

export default function AddExpense() {
  const navigate = useNavigate();
  const now = dayjs();
  const [date, setDate] = useState(now.format("YYYY-MM-DD"));
  const [time, setTime] = useState(now.format("HH:mm"));
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(MEMBERS[0].id);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [paymentMode, setPaymentMode] = useState(PAYMENT_MODES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    if (!amount || Number(amount) <= 0) {
      setError("Amount must be > 0");
      return;
    }
    if (!description) {
      setError("Description is required");
      return;
    }

    const iso = dayjs(`${date}T${time}`).toISOString();
    const payload = {
      groupId: 1,
      addedBy: Number(paidBy),
      amount: Number(amount),
      moneyFlow: "OUT",
      expenseType: category,
      paymentType: paymentMode,
      note: description,
      createdAt: iso,
    };

    setLoading(true);
    try {
      await addExpense(payload);
      navigate("/");
    } catch (e) {
      console.error(e);
      setError("Failed to add - check backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto  pb-32">
      <div className="bg-gray-600 rounded-xl p-3 mb-4">
          <label className="block font-bold mb-2 mr-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 mb-3 text-white border-none"
          />
          {/* Time Input */}
          <label className="block font-bold mb-2 mr-2">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 mb-3 text-white border-none"
          />

        <label className="block font-bold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 h-28 mb-3"
        />

        <label className="block font-bold mb-2">Amount (₹)</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          min="0"
          step="1"
          className="w-full p-3 rounded-lg bg-gray-700 mb-3"
          placeholder="Amount in rupees"
        />

        <label className="block font-bold mb-2">Paid By</label>
        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 mb-3"
        >
          {MEMBERS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <label className="block font-bold mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 mb-3"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label className="block font-bold mb-2">Payment mode</label>
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 mb-3"
        >
          {PAYMENT_MODES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <div className="text-red-300 mb-3">{error}</div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto flex px-4">
        <button
          disabled={false}
          onClick={() => navigate("/")}
          className="w-1/2 bg-yellow-400 p-4 text-black text-medium font-semibold rounded-l-xl"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={submit}
          className="w-1/2 bg-red-500 p-4 text-white text-medium font-semibold rounded-r-xl"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}
