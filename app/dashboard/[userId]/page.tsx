"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

const DashboardPage = () => {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Action states
  const [actionLoading, setActionLoading] = useState(false);
  const [simModalOpen, setSimModalOpen] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);
  const [simResult, setSimResult] = useState<any>(null);
  const [simError, setSimError] = useState<string | null>(null);
  const [simProgress, setSimProgress] = useState<number>(0);

  // --- Fetch Dashboard
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const userId = localStorage.getItem("user")?.replace(/"/g, "");
      if (!userId) {
        setError("Please log in to view your dashboard.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        if (response.status === 401) setError("Please log in to view your dashboard.");
        else throw new Error("Failed to fetch dashboard data");
        return;
      }

      const result: DashboardData = await response.json();
      setData(result);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Something went wrong while loading your dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // --- Open Simulate Modal and fetch AI recommendations
  const openSimModal = async () => {
    setSimModalOpen(true);
    setSelectedRecommendation(null);
    setSimResult(null);
    setSimError(null);
    setSimProgress(0);
    setActionLoading(true);

    try {
      const userId = localStorage.getItem("user")?.replace(/"/g, "");
      if (!userId) throw new Error("User not logged in");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/generate`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch recommendations");

      const data = await res.json();
      setAiRecommendations(data.aiPortfolio ?? []);
    } catch (err: any) {
      console.error("AI generate error:", err);
      setSimError(err?.message || "Failed to generate recommendations");
    } finally {
      setActionLoading(false);
    }
  };

  // --- Simulate selected recommendation
  const handleSimulateRecommendation = async (recommendation: any) => {
    setSelectedRecommendation(recommendation);
    setSimResult(null);
    setSimError(null);
    setSimProgress(0);
    setActionLoading(true);

    const progressInterval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) clearInterval(progressInterval);
        return Math.min(prev + Math.floor(Math.random() * 10 + 5), 100);
      });
    }, 300);

    try {
      const amount = recommendation.minimum_investment ?? 25000;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invest/simulate`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendation, amount }),
      });
      if (!res.ok) throw new Error("Simulation failed");
      const json = await res.json();

      await new Promise<void>((resolve) => {
        const check = setInterval(() => {
          if (simProgress >= 100) {
            clearInterval(check);
            resolve();
          }
        }, 100);
      });

      setSimResult(json);
    } catch (err: any) {
      console.error(err);
      setSimError(err?.message || "Simulation failed");
    } finally {
      setActionLoading(false);
    }
  };

  // --- Invest handler
  const handleInvest = async () => {
    if (!selectedRecommendation) return;
    const amount = selectedRecommendation.minimum_investment ?? 25000;
    const confirm = window.confirm(
      `Confirm investment of ₦${amount.toLocaleString()} into "${selectedRecommendation.name}"?`
    );
    if (!confirm) return;

    try {
      setActionLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invest`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendation: selectedRecommendation, amount }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.message || "Investment failed");
      }

      await fetchDashboard();
      localStorage.removeItem("selectedRecommendation");
      setSimModalOpen(false);
      setSelectedRecommendation(null);
      setSimResult(null);
      alert("Investment successful!");
    } catch (err: any) {
      console.error("Invest error:", err);
      alert(err?.message || "Investment failed.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="h-64 bg-gray-200 rounded-3xl"></div>
          <div className="h-64 bg-gray-200 rounded-3xl"></div>
        </div>
        <div className="h-72 bg-gray-200 rounded-2xl"></div>
        <div className="h-40 bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-20">
        <p className="text-red-500 text-lg font-medium mb-4">{error}</p>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-base text-white rounded-full font-semibold hover:bg-base/90 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <Header userName={data?.fullName ?? "User"} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {/* Portfolio Value */}
        <div className="portfolio text-white rounded-3xl relative overflow-hidden sm:p-10 p-5">
          <p className="text-2xl mb-3">Portfolio Value</p>
          <h1 className="text-3xl md:text-4xl lg:5xl font-bold mt-1 mb-16">
            ₦{data?.demoBalance.toLocaleString() ?? "0"}
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
                  style={{ width: `${data?.sustainabilityScore ?? 0}%` }}
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
              onClick={openSimModal}
              disabled={actionLoading}
            >
              <Zap className="w-6 h-6" />
              <span>{actionLoading ? "Loading..." : "Simulate"}</span>
            </button>

            <button
              className="bg-base text-white py-3 px-4 rounded-xl font-medium flex-1 flex items-center justify-center space-x-2"
              onClick={handleInvest}
              disabled={actionLoading || !selectedRecommendation}
            >
              <Disc2 className="w-6 h-6" />
              <span>{actionLoading ? "Processing..." : "Invest"}</span>
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
                <b className="text-base">{data?.investments?.length ?? 0} active investments</b>
                {data?.investmentGoal === "sdg" && " contributing to SDG goals"}
                {data?.investmentGoal === "both" && " balancing profit and impact"}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Recommended />

      {/* Simulation Modal */}
      {simModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              setSimModalOpen(false);
              setSelectedRecommendation(null);
              setSimResult(null);
              setSimError(null);
              setSimProgress(0);
            }}
          ></div>

          <div className="relative bg-white rounded-2xl p-6 w-[95%] max-w-xl shadow-xl z-60 animate-fade-in">
            <h3 className="text-lg font-semibold mb-3">Simulate Investment</h3>

            {!selectedRecommendation ? (
              <div className="grid gap-4">
                {simError && <p className="text-red-500 mb-2">{simError}</p>}
                {aiRecommendations.slice(0, 4).map((rec, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{rec.name}</p>
                      <p className="text-sm text-gray-500">
                        Min Investment: ₦{rec.minimum_investment?.toLocaleString() ?? "0"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSimulateRecommendation(rec)}
                      className="px-3 py-2 bg-base text-white rounded-lg"
                      disabled={actionLoading}
                    >
                      {actionLoading ? "Simulating..." : "Simulate Investment"}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {/* Animated progress */}
                {!simResult && !simError && (
                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-gray-700">Calculating projections...</p>
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-base h-3 rounded-full transition-all duration-500"
                        style={{ width: `${simProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{simProgress}%</span>
                  </div>
                )}

                {simError && <p className="text-red-500 mb-4">{simError}</p>}

                {simResult && (
                  <div className="space-y-3 mt-2">
                    <p className="text-sm text-gray-700">
                      Projection: <span className="font-semibold">{simResult.projection}</span>
                    </p>
                    {simResult.annualizedReturn && (
                      <p className="text-sm text-gray-700">
                        Annualized return: <span className="font-semibold">{simResult.annualizedReturn}</span>
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-5 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedRecommendation(null)}
                    className="px-4 py-2 rounded-lg border"
                  >
                    Back
                  </button>
                  {simResult && (
                    <button
                      onClick={handleInvest}
                      className="px-4 py-2 bg-base text-white rounded-lg"
                      disabled={actionLoading}
                    >
                      Invest
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
