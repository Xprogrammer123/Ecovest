import React from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Recommended from "./components/recommended";
import LineChartt from "./components/linechart";

import { Disc2, Zap, TrendingUp, Globe, Leaf } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#f8f9f8]">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <Header />

        <div className=" grid grid-cols-2 gap-5">
          <div className="portfolio text-white rounded-3xl p-10 relative overflow-hidden">
            <p className="text-2xl text-base mb-3">Portfolio value</p>
            <h1 className="text-5xl font-bold mt-1 mb-20">₦3,725,020</h1>
            <div className="flex items-center font-normal gap-2 mb-3">
              <div className="w-14 h-12 rounded-lg bg-base/20 flex items-center justify-center">
                <TrendingUp className="w-10 h-9 text-white" />
              </div>
              <p className="text-white text-2xl font-bold ml-2">
                ₦125k today
                <p className="text-[#8b8b8b] text-sm font-semibold">
                  +12.3% this month
                </p>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-7 h-7 text-gray-500" />
                  <p className="font-medium text-lg text-gray-700">
                    Predicted Growth (6 mo)
                  </p>
                </div>
                <span className="bg-green-500 text-white text-lg font-semibold px-5 py-1.5 rounded-full">
                  +5.8%
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-8 h-8 text-base" />
                    <p className="font-medium text-lg text-gray-700">
                      Sustainability Score
                    </p>
                  </div>
                  <span className="font-semibold text-base text-lg">
                    85/100
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 bg-gray-100 mb-3">
                  <div
                    className="bg-base h-3 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <p className="text-base text-lg mt-1 text-right">
                  Excellent alignment with SDG goals
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 ">
              <button className="bg-base text-white py-3 px-2 rounded-xl font-medium w-1/2 flex items-center justify-center space-x-2">
                <Zap className="w-6 h-6" />
                <span className="text-lg">Simulate</span>
              </button>

              <button className="bg-base text-white py-3 px-2 rounded-xl font-medium w-1/2 flex items-center justify-center space-x-2">
                <Disc2 className="w-6 h-6" />
                <span className="text-lg">Invest</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <LineChartt />

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4 ">
              <div className="w-14 h-12 rounded-lg bg-base/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-base mt-1" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Your Impact</p>
                <p className="text-sm text-gray-600">
                  Your portfolio has offset <b className="text-base">5 tons</b>{" "}
                  of CO₂, and supported{" "}
                  <b className="text-base">2 renewable energy projects</b>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Recommended />
      </main>
    </div>
  );
};

export default Dashboard;
