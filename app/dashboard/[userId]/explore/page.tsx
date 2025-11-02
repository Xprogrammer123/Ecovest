"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, TrendingUp, Disc2, Search } from "lucide-react";

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
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 h-72 rounded-2xl shadow-sm"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 font-semibold mb-4">{error}</p>
        <button
          onClick={() => router.refresh()}
          className="bg-base text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      {/* Top Bar */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search investments or describe your goals..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-base focus:border-transparent outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All Sectors", "SDG Focus", "Risk Level", "Min. Investment"].map(
            (filter) => (
              <button
                key={filter}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

      {/* Investment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-[#1C1C1C] mb-1">
                {item.name}
              </h2>
              <p className="text-gray-500 text-sm font-medium mb-2">
                {item.sector}
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {item.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center">
                      <TrendingUp className="text-base w-6 h-6 text-[#1C1C1C]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {item.expected_return_percent}% p.a.
                      </p>
                      <p className="text-xs text-gray-500">Expected Return</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-[#1C1C1C]">
                    ₦{item.minimum_investment.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Min. Investment</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>
                    Sustainability Score:{" "}
                    <span className="font-semibold text-black">
                      {item.sustainability_score}/100
                    </span>
                  </span>
                </div>
                <p className="text-xs text-gray-500">{item.risk_level} Risk</p>
              </div>
            </div>

            <button
              onClick={() => handleInvest(item)}
              className="mt-6 w-full bg-base text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold text-base hover:opacity-90 transition"
            >
              <Disc2 className="w-6 h-6 text-white" />
              Invest
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
