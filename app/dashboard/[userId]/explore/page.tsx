"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, TrendingUp } from "lucide-react";

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
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="p-8">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {item.name}
            </h3>
            <p className="text-gray-500 text-sm mb-2">{item.sector}</p>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {item.description}
            </p>

            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="flex items-center gap-2 text-base text-gray-700">
                  <TrendingUp size={18} />
                  <span>{item.expected_return_percent} (annum)</span>
                </div>
                <p className="text-gray-500 text-xs">Expected return</p>
              </div>

              <div className="text-right">
                <p className="text-gray-700 font-semibold">
                  ₦{item.minimum_investment.toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs">Minimum Investment</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Globe size={18} />
                <span className="text-sm">
                  Sustainability Score {item.sustainability_score}/100
                </span>
              </div>
            </div>

            <button
              onClick={() => handleInvest(item)}
              className="w-full py-2.5 bg-[#3b7d3b] text-white font-semibold rounded-xl hover:bg-[#2f682f] transition-all"
            >
              Invest
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
