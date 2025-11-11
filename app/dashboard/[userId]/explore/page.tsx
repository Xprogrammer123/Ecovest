"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, TrendingUp, Disc2 } from "lucide-react";
import { investApi } from "@/lib/investApi";
import InvestModal from "../../components/investmodal";

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
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/generate`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch recommendations");
        const data = await res.json();
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

  const handleInvest = async (item: Recommendation, amount: number) => {
    try {
      const userData = localStorage.getItem("user");
      const userId = userData ? JSON.parse(userData)?.id : null;

      if (!userId) {
        alert("User ID not found. Please log in again.");
        router.push("/auth/login");
        return;
      }

      // Call API simulate + create
      await investApi.simulate(item, amount);
      await investApi.create(item, amount);

      localStorage.setItem("selectedRecommendation", JSON.stringify(item));

      router.push(`/dashboard/${userId}`);
    } catch (err) {
      console.error("Investment error:", err);
      alert("Failed to create investment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-2xl"></div>
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
    <div className="px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search investments or describe your goals..."
          className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-base/60"
        />
        <div className="flex flex-wrap gap-2">
          {["All Sectors", "SDG Focus", "Risk Level", "Min. Investment"].map((f) => (
            <button key={f} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {recommendations.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <p className="text-lg font-semibold text-black mb-1">{item.name}</p>
            <p className="text-gray-500 text-sm mb-2 font-semibold">{item.sector}</p>
            <p className="text-black text-sm mb-3 line-clamp-2">{item.description}</p>

            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-base font-semibold">
                <div className="w-12 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <span>{item.expected_return_percent}% (annum)</span>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold text-gray-900">
                  ₦{item.minimum_investment.toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs">Min. Investment</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-700 mb-4">
              <Globe size={18} className="text-green-600" />
              <span className="text-sm">
                Sustainability Score <span className="font-semibold">{item.sustainability_score}/100</span>
              </span>
            </div>

            <button
              className="w-full bg-base text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
              onClick={() => setSelectedRecommendation(item)}
            >
              <Disc2 className="w-6 h-6 text-white" />
              <span className="font-semibold text-lg">Invest</span>
            </button>
          </div>
        ))}
      </div>

      {selectedRecommendation && (
        <InvestModal
          isOpen={!!selectedRecommendation}
          recommendation={selectedRecommendation}
          onClose={() => setSelectedRecommendation(null)}
          onInvest={(amount) => handleInvest(selectedRecommendation, amount)}
        />
      )}
    </div>
  );
};

export default Explore;
