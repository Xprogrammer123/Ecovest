"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Recommended from "../components/recommended";
import LineChartt from "../components/linechart";
import { Disc2, Zap, TrendingUp, Globe, Leaf } from "lucide-react";
import { Investment } from "@/app/types/investment";

interface DashboardData {
  fullName: string;
  demoBalance: number;
  portfolioValue: number;
  invested: number;
  predictedGrowth: number;
  sustainabilityScore: number;
  investmentGoal?: "sdg" | "profit" | "both";
  investments: Investment[];
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  useEffect(() => {
    const fetchDashboard = async () => {
      console.log("Fetching dashboard data...");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${userId}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Response status:", response.status);

        const text = await response.text();
        console.log("Raw response:", text);

        if (!response.ok) {
          console.error("Fetch failed:", response.statusText);
          setError("Failed to load dashboard");
          return;
        }

        const result = JSON.parse(text);
        console.log("Dashboard data:", result);
        setData(result);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p>{error}</p>
        <button
          onClick={() => router.push("/auth/login")}
          className="mt-4 px-4 py-2 bg-base text-white rounded-xl"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f9f8]">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <Header userName={data?.fullName ?? "User"} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Portfolio Value */}
          <div className="portfolio text-white rounded-3xl relative overflow-hidden p-10">
            <p className="text-2xl mb-3">Portfolio Value</p>
            <h1 className="text-4xl md:text-5xl font-bold mt-1 mb-16">
              ₦{data?.portfolioValue.toLocaleString() ?? "0"}
            </h1>
            <div className="flex items-center font-normal gap-3">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xl font-semibold">
                  ₦{data?.invested.toLocaleString() ?? "0"} invested
                </p>
                <p className="text-[#d4d4d4] text-sm font-medium">
                  +{data?.predictedGrowth.toFixed(1) ?? 0}% expected return
                </p>
              </div>
            </div>
          </div>

          {/* Growth + Sustainability */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-7 h-7 text-gray-500" />
                  <p className="font-medium text-lg text-gray-700">
                    Predicted Growth
                  </p>
                </div>
                <span className="bg-green-500 text-white text-lg font-semibold px-5 py-1.5 rounded-full">
                  +{data?.predictedGrowth.toFixed(1) ?? 0}%
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-8 h-8 text-base" />
                    <p className="font-medium text-lg text-gray-700">
                      Sustainability Score
                    </p>
                  </div>
                  <span className="font-semibold text-lg">
                    {data?.sustainabilityScore ?? 0}/100
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-base h-3 rounded-full transition-all"
                    style={{
                      width: `${data?.sustainabilityScore ?? 0}%`,
                    }}
                  ></div>
                </div>

                <p className="text-gray-500 text-sm text-right">
                  {data?.investmentGoal === "sdg"
                    ? "Excellent"
                    : data?.investmentGoal === "both"
                    ? "Good"
                    : "Moderate"}{" "}
                  alignment with SDG goals
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-5">
              <button
                className="bg-base text-white py-3 px-4 rounded-xl font-medium flex-1 flex items-center justify-center space-x-2"
                onClick={() => router.push("/simulate")}
              >
                <Zap className="w-6 h-6" />
                <span>Simulate</span>
              </button>

              <button
                className="bg-base text-white py-3 px-4 rounded-xl font-medium flex-1 flex items-center justify-center space-x-2"
                onClick={() => router.push("/invest")}
              >
                <Disc2 className="w-6 h-6" />
                <span>Invest</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <LineChartt investments={data?.investments ?? []} />

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-14 h-12 rounded-lg bg-base/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-base mt-1" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Your Impact</p>
                <p className="text-sm text-gray-600">
                  Your portfolio has{" "}
                  <b className="text-base">
                    {data?.investments?.length ?? 0} active investments
                  </b>
                  {data?.investmentGoal === "sdg" &&
                    " contributing to SDG goals"}
                  {data?.investmentGoal === "both" &&
                    " balancing profit and impact"}
                  .
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
