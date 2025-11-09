import React from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./components/Footer";

export default function App() {
  
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="max-w-md mx-auto p-4">
        
        <Outlet />
      </div>
    </div>
  );
}
