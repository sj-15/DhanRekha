import { useNavigate } from "react-router-dom";

export default function Footer({ isDisabled, onClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto flex px-4">
      <div className="w-1/2 bg-yellow-400 p-4 text-black text-center font-medium rounded-l-xl">
        Total Amount
      </div>
      <button
        disabled={isDisabled}
        onClick={onClick}
        className="w-1/2 bg-red-500 p-4 text-white text-medium font-semibold rounded-r-xl"
      >
        Add Expense
      </button>
    </div>
  );
}
