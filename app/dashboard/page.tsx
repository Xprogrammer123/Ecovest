// import React from "react";

// const page = () => {
//   return (
//     <div className="flex justify-center h-screen w-screen items-center flex-col text-center">
//       <h1 className="font-semibold text-base text-2xl">ECOVEST</h1>
//       This is the app.
//       <h1>Lets continue this shii guy</h1>
//     </div>
//   );
// };

// export default page;

"use client";
import React from "react";
import { Home, User, BarChart3 } from "lucide-react"; // For icons

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-md flex flex-col justify-between py-8 px-6 rounded-r-3xl">
        <div>
          <h1 className="text-2xl font-bold text-green-900 mb-8">ECOVEST</h1>

          <nav className="flex flex-col gap-3">
            {/* Active item */}
            <button className="flex items-center gap-3 px-4 py-3 bg-green-800 text-white rounded-xl font-medium transition">
              <Home size={18} /> Overview
            </button>

            <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition">
              <User size={18} /> Advisor
            </button>

            <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition">
              <BarChart3 size={18} /> Simulator
            </button>
          </nav>
        </div>

        {/* <p className="text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Ecovest
        </p> */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <h2 className="text-3xl font-bold mb-2">Overview</h2>
        <p className="text-gray-600 mb-10">
          Your portfolio and impact updates are ready.
        </p>

        {/* Total Invested card */}
        <div className="bg-green-800 text-white rounded-2xl p-8 w-fit shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm bg-white/20 px-3 py-1 rounded-full">
              +2.3% this month
            </p>
          </div>
          <h3 className="text-lg opacity-90">Total Invested</h3>
          <p className="text-5xl font-bold tracking-wide mt-2 mb-4">
            ₦312,020
          </p>
          <button className="bg-white text-green-900 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition">
            View full breakdown
          </button>
        </div>
      </main>
    </div>
  );
}
