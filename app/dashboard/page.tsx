"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const data = [
    { month: "Jan", value: 2 },
    { month: "Feb", value: 4 },
    { month: "Mar", value: 6 },
    { month: "Apr", value: 8 },
    { month: "May", value: 9 },
    { month: "Jun", value: 10 },
    { month: "Jul", value: 11 },
    { month: "Aug", value: 12 },
    { month: "Sep", value: 13 },
    { month: "Oct", value: 14 },
    { month: "Nov", value: 15 },
    { month: "Dec", value: 17 },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white h-screen p-6 flex flex-col justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold text-green-900 mb-8">ECOVEST</h1>

          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded-lg bg-green-900 text-white font-medium">
              Overview
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
              Explore
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
              Portfolio
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
              Simulator
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
              Profile
            </button>
          </nav>
        </div>

        <div className="text-xs text-gray-400 mt-8">v1.0</div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Overview</h2>
            <p className="text-gray-500 text-sm">
              Your portfolio and impact updates are ready.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white rounded-full shadow px-4 py-2">
            <img
              src="/logo.png"
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">Judah Oyedele</span>
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="mt-8 grid grid-cols-12 gap-6">
          {/* Portfolio Value Card */}
          <div className="col-span-7 bg-gradient-to-r from-green-900 to-green-600 text-white p-6 rounded-2xl relative overflow-hidden shadow-lg">
            <img
              src="/logo.png"
              alt="background"
              className="absolute top-0 right-0 w-full h-full  object-cover"
            />
            <div className="relative z-10">
              <p className="text-sm">Portfolio value</p>
              <h3 className="text-4xl font-bold mt-2">₦3,725,020</h3>
              <p className="text-sm text-white/80 mt-1">
                ₦125k today · +2.3% this month
              </p>

              <div className="mt-6 flex gap-3">
                <button className="bg-white/10 border border-white/30 px-4 py-2 rounded-lg text-sm">
                  Withdraw
                </button>
                <button className="bg-white text-green-900 px-4 py-2 rounded-lg text-sm font-semibold">
                  Add Funds
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-5 flex flex-col gap-6">
            {/* Growth Card */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-sm font-semibold text-gray-700">
                Predicted Growth (6 mo)
              </h3>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-2xl font-bold text-green-800">+5.8%</p>
                  <p className="text-xs text-gray-500">vs last period</p>
                </div>
                <div className="w-1/2">
                  <div className="bg-gray-200 rounded-full h-3 relative">
                    <div
                      className="absolute left-0 top-0 h-3 bg-green-800 rounded-full"
                      style={{ width: "58%" }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Sustainability score 85/100
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-green-900 text-white py-2 rounded-lg font-medium">
                  Simulate
                </button>
                <button className="flex-1 border border-green-900 text-green-900 py-2 rounded-lg font-medium">
                  Invest
                </button>
              </div>
            </div>

            {/* Impact Card */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Your Impact
              </h3>
              <p className="text-sm text-gray-600">
                Your portfolio has offset{" "}
                <strong>5 tons</strong> of CO₂ and supported{" "}
                <strong>2</strong> renewable energy projects.
              </p>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-8 bg-white rounded-2xl shadow p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Monthly Performance
          </h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#14532d"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
