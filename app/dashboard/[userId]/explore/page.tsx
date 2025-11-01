"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, TrendingUp, Disc2 } from "lucide-react";

interface Recommendation {
  name: string;
  sector: string;
  description: string;
  expected_return_percent: string;
  duration: string;
  risk_level: string;
  minimum_investment: number;
  sustainability_score: number;
  why_it_fits_user: string;
}

const Explore = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/ai/generate`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch recommendations");

        const data = await response.json();
        setRecommendations(data.aiPortfolio || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleInvest = (item: Recommendation) => {
    localStorage.setItem("selectedRecommendation", JSON.stringify(item));
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="px-2 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 h-64 rounded-2xl"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="px-2 py-6">
      {/* Search + Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search investments or describe your goals..."
          className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-base"
        />

        <div className="flex flex-wrap gap-2">
          {["All Sectors", "SDG Focus", "Risk Level", "Min. Investment"].map(
            (f) => (
              <button
                key={f}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100"
              >
                {f}
              </button>
            )
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <p className="text-lg font-semibold text-black mb-1">{item.name}</p>
            <p className="text-gray-500 text-sm mb-2 font-semibold">
              {item.sector}
            </p>
            <p className="text-black text-sm mb-3 line-clamp-2">
              {item.description}
            </p>
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="flex items-center gap-2 text-base font-semibold">
                  <div className="w-12 h-10 rounded-lg bg-gray-300 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-base" />
                  </div>
                  <span>{item.expected_return_percent}% (annum)</span>
                </div>
                <p className="text-gray-500 text-xs">Expected return</p>
              </div>

              <div className="text-right">
                <p className="text-base font-semibold">
                  ₦{item.minimum_investment.toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs">Minimum Investment</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Globe size={20} className="text-base" />
                <span className="text-sm text-black">
                  Sustainability Score{" "}
                  <span className="text-right font-semibold">
                    {item.sustainability_score}/100
                  </span>
                </span>
              </div>
            </div>
            <button
              className="mt-6 bg-base text-white py-3 rounded-lg flex items-center justify-center space-x-2"
              onClick={() => handleInvest(item)}
            >
              <Disc2 className="w-7 h-7 text-white" />
              <span className="text-lg font-bold">Invest</span>
            </button>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
