"use client";
import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp, Disc2 } from "lucide-react";

interface Recommendation {
  id: number;
  name: string;
  sector: string;
  expected_return_percent: string;
  risk_level: string;
}

const Recommended = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/ai/generate`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Please log in to see AI recommendations.");
          }
          throw new Error("Failed to fetch recommendations.");
        }

        const data = await res.json();
        setRecommendations(data.aiPortfolio || []);
      } catch (err: any) {
        console.error("AI fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // ✨ Shimmer Loading UI
  if (loading) {
    return (
      <div className="mt-6 bg-white rounded-2xl p-6 md:p-2 animate-pulse">
        <p className="text-xl md:text-2xl font-semibold mb-5">
          Generating AI recommendations...
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl p-5 bg-gray-200 h-48"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 bg-white rounded-2xl p-6 md:p-2 text-center">
        <p className="text-red-500 font-medium mb-4">{error}</p>
        <p className="text-gray-500 text-sm">
          Try logging in again or refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white rounded-2xl p-6 md:p-8">
      <p className="text-xl md:text-2xl font-semibold mb-5">
        Recommended for You
      </p>

      {recommendations.length === 0 ? (
        <p className="text-gray-500 text-center">
          No AI recommendations yet. Try generating again later.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-2xl p-2 flex flex-col justify-between shadow-sm bg-[#f8f9f8] transition hover:shadow-md"
            >
              <div>
                <p className="font-semibold text-[#1c1c1c] text-[17px] mb-1">
                  {rec.name}
                </p>
                <p className="text-[#777] text-sm mb-4">{rec.sector}</p>

                {/* Expected Return */}
                <div className="flex items-center font-normal gap-2 mb-3">
                  <div className="w-14 h-12 rounded-lg bg-white flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-base" />
                  </div>
                  <p className="text-[#426b1f] font-semibold ml-2">
                    {rec.expected_return_percent}%
                    <br />
                    <span className="text-[#8b8b8b] text-sm font-semibold">
                      Expected return
                    </span>
                  </p>
                </div>

                {/* Expected Risk */}
                <div className="flex items-center gap-2">
                  <div className="w-14 h-12 rounded-lg bg-white flex items-center justify-center">
                    <TrendingDown className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-[#c53b3b] font-semibold">
                    {rec.risk_level}
                    <br />
                    <span className="text-[#8b8b8b] text-sm font-semibold">
                      Expected risk
                    </span>
                  </p>
                </div>
              </div>

              <button className="mt-6 bg-base text-white py-3 rounded-lg flex items-center justify-center space-x-2">
                <Disc2 className="w-7 h-7 text-white" />
                <span className="text-lg font-bold">Invest</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommended;
